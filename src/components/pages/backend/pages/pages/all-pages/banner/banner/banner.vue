<template>
  <div v-if="getLoader">
    <Loader></Loader>
  </div>
    <!-- Content wrapper -->
    <div class="content-wrapper">
      <!-- Content -->
      <div class="container-xxl flex-grow-1 container-p-y">
        <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
        <div class="row mt-4">
            <div class="col-12">
            <div class="card">
                <div class="card-header py-2">
                    <h5 class="card-title mb-0 mt-2">
                      Banners 
                    </h5>
                </div>
                <div class="card-body">
                    <div class="table-responsive-sm table-overflow-hidden">
                        <table class="align-middle mb-0 table table-hover" id="bannars_tables">
                            <thead>
                                <tr>
                                  <!-- <th></th> -->
                                  <th></th>
                                  <th>SL</th>
                                  <th>Image</th>
                                  <th>Link</th>
                                  <th>status</th>
                                  <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        </div>
      </div>
      <!-- / Content -->
      <div class="content-backdrop fade"></div>
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
        { label: "Banners", url: "" },
      ],
      getLoader: false,
    };
  },
  async mounted() { 
    try {
      const { role, isAuthorized } = await fetchUserRole();
      if (role == 'Super' || role == 'Admin') {
        this.getManageBanners();
        this.$nextTick(() => {
          const dataTableWrapper = document.querySelectorAll('#bannars_tables_wrapper .row.mx-2');
          if (dataTableWrapper.length > 0) {
            dataTableWrapper[0].style.display = 'none';
            dataTableWrapper[1].style.display = 'none';
          }
        });
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
    document.addEventListener('click', (e) => {
      const target = e.target.closest('a[data-vue-route]');
      if (target) {
        e.preventDefault();
        const route = target.getAttribute('href');
        this.$router.push(route);
      }
    }, true);
  },
  methods: {
    getManageBanners() {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl+"admin/managebanners/banners", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },  
        })
        .then((res) => {
          if ($.fn.DataTable.isDataTable("#bannars_tables")) {
          $('#bannars_tables').DataTable().destroy();
        }
            var table = $('#bannars_tables').DataTable({
              data: res.data.banners,
              columns: [
                // { data: 'id' },
                { data: 'id' },
                { data: 'id' },
                { data: 'convart_image' },
                { data: 'link' },
                { data: 'convart_status' },
                {
                  data: "updated_at",
                  render: function (data, type, row) {
                    return (
                      '<div class="banner_action d-flex align-items-center"><a title="Edit" data-vue-route href="/admin-banners-edit/'+row.id+'" class="me-2 d-flex  align-items-center" data-action="delete-banner" data-id='+row.id+'><i class="far fa-edit fa-sm" data-id='+row.id+'></i></a><button type="button" title="Delete"  data-id='+row.id +' class="bg-transparent border-0 text-danger"><i data-action="delete-banner" class="far fa-trash-alt fa-sm" data-id='+row.id +'></i></button></div>'
                    );
                  }
                },
              ],
              initComplete: () => {
                this.attachEventListeners();
                this.attachEventListenersOfButton();
              },
              createdRow: function (row, data, dataIndex) {
                  $('td:eq(0)', row).html(dataIndex + 1);
              },
              columnDefs: [
                {
                  targets: 0,
                  orderable: false,
                  checkboxes: {
                    selectAllRender: '<input type="checkbox" class="form-check-input">'
                  },
                  render: function () {
                    return '<input type="checkbox" class="dt-checkboxes form-check-input" >';
                  },
                  searchable: false
                },
               
              ],
              order: [[2, 'desc']],
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
                searchPlaceholder: 'Search Banner',
                paginate: { 
                  previous: '<i class="fa-solid fa-chevron-left"></i>',
                  next: '<i class="fa-solid fa-chevron-right"></i>'
                }
              },
              buttons: [
                {
                  extend: 'collection',
                  className: 'btn btn-label-primary dropdown-toggle me-3',
                  text: '<i class="ti ti-screen-share me-1 ti-xs"></i>Export',
                  buttons: [
                    {
                      extend: 'print',
                      text: '<i class="ti ti-printer me-1 ti-xs text-primary"></i>Print',
                      className: 'dropdown-item',
                      exportOptions: { columns: [2, 3, 4] }
                    },
                    {
                      extend: 'csv',
                      text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                      className: 'dropdown-item',
                      exportOptions: { columns: [2, 3, 4] }
                    },
                    {
                      extend: 'excel',
                      text: '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                      className: 'dropdown-item',
                      exportOptions: { columns: [2, 3, 4] }
                    },
                    {
                      extend: 'pdf',
                      text: '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                      className: 'dropdown-item',
                      exportOptions: { columns: [2, 3, 4] }
                    },
                    {
                      extend: 'copy',
                      text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                      className: 'dropdown-item',
                      exportOptions: { columns: [2, 3, 4] }
                    }
                  ]
                },
                {
                  text: '<span id="create"><i class="ti ti-plus me-1 ti-xs"></i>Create</span>',
                  className: 'create-new btn btn-primary',
                  attr: { id: 'create' },
                }
              ],
            });
            this.getLoader = false;
            })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    attachEventListeners() {
      $("#bannars_tables").on("click", ".banner_action", (event) => {
        const target = $(event.target);
        const dataId = target.data("id");
        const dataClass = target.data("action");
        if(dataClass === 'delete-banner'){
          this.delteBanner(dataId);
        }
      });
    },

    attachEventListenersOfButton(){
      $("#bannars_tables_wrapper").on("click", "button", (event) => {
        const target = $(event.target);
        const dataClass = target.attr("id");
        if (dataClass === "create") {
          this.$router.push("/admin-banners-create");
        } 
      });
    },
    // 
  
     // User Delete
     delteBanner(id) {
      Swal.fire({
        text: "Are you sure delete",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.value) {
          this.getLoader = true;
          axios
            .delete(this.globalVariables.apiUrl+`admin/managebanners/banners/delete/${id}`, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((res) => {
                toastr.success(res.data.message);
                this.getManageBanners();
            })
            .catch((e) => {
              return e;
            })
            .finally(() => {
              this.getLoader = false;
            });
        }
      });
    },
  },
};
</script>
<style>

#bannars_tables colgroup:nth-of-type(2) {
	display: none !important;
}
#bannars_tables .dt-checkboxes-cell{
	padding: 0.7rem 0.5rem !important;
}
</style>