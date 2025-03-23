<template>
  <div v-if="getLoader">
    <Loader></Loader>
  </div>
  <!-- Content wrapper -->
  <div class="content-wrapper">
    <!-- {{ administationsubscribe }} -->
    <!-- Content -->
    <div class="container-xxl flex-grow-1 container-p-y">
      <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
      <div class="row mt-4">
        <div class="col-12">
          <div class="card ">
            <div class="card-header pb-0">
              <h5 class="card-title d-flex justify-content-between align-items-center">
                Subscriber
              </h5>
            </div>
            <div class="card-body table-responsive table-overflow-hidden">
              <table class="align-middle table-sm mb-0 table table-hover" id="subscribe_datatables" >
                <thead>
                  <tr>
                    <!-- <th></th> -->
                    <th></th>
                    <th>Sl</th>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- / Content -->
  </div>
  <!-- Content wrapper -->
</template>
<script>
import axios from "axios";
import toastr from "toastr";
import Swal from "sweetalert2";
import "toastr/build/toastr.min.css";
import Loader from "../../../../../include/loader.vue";
import Breadcrumb from "../../../../../include/breadcrumb.vue";
import { inject } from "vue";
import { fetchUserRole } from "@/services/userService";

export default {
  setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
  components: {
    Loader,
    Breadcrumb,
  },
  data() {
    return {
      breadcrumbs: [
        { label: "Dashboard", url: "/dashboard" },
        { label: "Subscriber", url: "" },
      ],
      getLoader: false,
      readData: {
        data: "",
      },
    };
  },
  async mounted() { 
    try {
      const { role, isAuthorized } = await fetchUserRole();
      if (role == 'Super' || role == 'Admin') {
        this.getLoader = true;
        this.getAdminSubscribe();
        this.$nextTick(() => {
          const dataTableWrapper = document.querySelectorAll('#subscribe_datatables_wrapper .row.mx-2');
          if (dataTableWrapper.length > 0) {
            dataTableWrapper[0].style.display = 'none';
            dataTableWrapper[1].style.display = 'none';
          }
        });
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  },
  methods: {
    getAdminSubscribe() {
      axios
        .get(this.globalVariables.apiUrl + "admin/system/subscribe/get-data", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          if ($.fn.DataTable.isDataTable("#subscribe_datatables")) {
            $('#subscribe_datatables').DataTable().destroy();
          }
          var table = $('#subscribe_datatables').DataTable({
            data: res.data,
            columns: [
              { data: null }, // First column (checkbox or other data)
              { data: null }, // Second column (Serial number)
              { data: 'id' },
              { data: 'email' },
              { data: 'convart_action' },
            ],
            initComplete: () => {
              this.attachEventListeners();
            },
            createdRow: function (row, data, dataIndex) {
              $('td:eq(1)', row).html(dataIndex + 1);
            },
            columnDefs: [
              {
                targets: 0, // Checkbox or first column
                orderable: false, 
                checkboxes: {
                  selectAllRender: '<input type="checkbox" class="form-check-input">',
                },
                render: function () {
                  return '<input type="checkbox" class="dt-checkboxes form-check-input">';
                },
                searchable: false,
              },
              {
                targets: 1, // Serial number column
                orderable: false, // Prevent sorting by SL number
                searchable: false, // Prevent searching by SL number
              },
            ],
            order: [[2, 'desc']], // Default sorting by ID column
            dom: '<"row mx-2"' +
              '<"col-md-4 px-0"f>' +
              '<"col-md-8 dopp_tb d-flex justify-content-end align-items-center"l<"button-wrapper"B>>' +
              '<"col-md-3 d-none"p>>' +
              't' +
              '<"row mx-2"' +
              '<"col-md-5"i>' +
              '<"col-md-7"p>>',
            displayLength: 10,
            lengthMenu: [10, 20, 50, 100, 200],
            language: {
              sLengthMenu: '_MENU_',
              search: '',
              searchPlaceholder: 'Search Subscriber',
              paginate: {
                previous: '<i class="fa-solid fa-chevron-left"></i>',
                next: '<i class="fa-solid fa-chevron-right"></i>',
              },
            },
            buttons: [
              {
                extend: 'collection',
                className: 'btn btn-label-primary dropdown-toggle me-3',
                text: '<i class="ti ti-screen-share me-1 ti-xs"></i>Export',
                buttons: [
                  {
                    extend: 'print',
                    text: '<i class="ti ti-printer me-1 ti-xs"></i>Print',
                    className: 'dropdown-item',
                    exportOptions: { columns: [2, 3] },
                  },
                  {
                    extend: 'csv',
                    text: '<i class="ti ti-file me-1 ti-xs"></i>Csv',
                    className: 'dropdown-item',
                    exportOptions: { columns: [2, 3] },
                  },
                  {
                    extend: 'excel',
                    text: '<i class="ti ti-file-spreadsheet me-1 ti-xs"></i>Excel',
                    className: 'dropdown-item',
                    exportOptions: { columns: [2, 3] },
                  },
                  {
                    extend: 'pdf',
                    text: '<i class="ti ti-file-description me-1 ti-xs"></i>Pdf',
                    className: 'dropdown-item',
                    exportOptions: { columns: [2, 3] },
                  },
                  {
                    extend: 'copy',
                    text: '<i class="ti ti-copy me-1 ti-xs"></i>Copy',
                    className: 'dropdown-item',
                    exportOptions: { columns: [2, 3] },
                  },
                ],
              },
            ],
          });
          this.getLoader = false;
        })
        .catch((e) => {
          return e;
        })
        .finally(() => {
          this.getLoader = false;
        });
    },
    attachEventListeners() {
      $("#subscribe_datatables").on("click", ".read-btn, .delete-btn", (event) => {
        const target = $(event.target);
        const dataId = target.data("id");
        const dataClass = target.attr("class");
        this.readData.data = dataId;
        if (dataClass === "btn-style-info rounded-circle read-btn" || dataClass === "fas fa-check fa-sm") {
          this.getLoader = true;
          axios.post(this.globalVariables.apiUrl + "admin/system/subscribes-read", this.readData, {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          })
          .then((res) => {
            toastr.success(res.data.message);
            this.getAdminSubscribe();
          })
          .catch((e) => {
            return e;
          })
          .finally(() => {
            this.getLoader = false;
          });
        } else if (dataClass === "btn-style-danger rounded-circle delete-btn" || dataClass === "fas fa-trash-alt fa-sm") {
          Swal.fire({
            text: "Are you sure you want to delete?",
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
          }).then((result) => {
            if (result.value) {
              (this.getLoader = true),
                axios
                  .post(this.globalVariables.apiUrl + "admin/system/subscribe/delete", this.readData, {
                    headers: {
                      Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                  })
                  .then((res) => {
                    toastr.success(res.data.message);
                    this.getAdminSubscribe();
                  })
                  .catch((e) => {
                    return e;
                  })
                  .finally(() => {
                    this.getLoader = false;
                  });
            }
          });
        }
      });
    },
  },
};
</script>
<style>
#subscribe_datatables colgroup:nth-of-type(2) {
	display: none !important;
}
#subscribe_datatables .dt-checkboxes-cell{
	padding: 0.7rem 0.5rem !important;
}
.btn-style-info {
  background: rgba(10, 187, 117, 0.15);
  color: #0abb75;
  display: inline-block;
  border-radius: 50%;
  border: none;
}
.btn-style-edit,
.btn-style-info {
  height: 30px;
  width: 30px;
  text-align: center;
  line-height: 30px;
  padding-top: 0;
  font-size: 14px;
  transition: 0.5s;
}
</style>
