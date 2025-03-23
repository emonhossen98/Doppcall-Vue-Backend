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
            <div class="card ">
                <div class="card-header py-2">
                    <h5 class="card-title mb-0 mt-2">
                    Index CountDown 
                    </h5>
                </div>
                <div class="card-body table-responsive table-overflow-hidden" >

                    <table class="align-middle mb-0 table table-hover" id="countdown_tables">
                        <thead>
                            <tr>
                                <!-- <th></th> -->
                                <th></th>
                                <th>SL</th>
                                <th>Symbol</th>
                                <th>Title</th>
                                <th>Number</th>
                                <th>Created At</th>
                                <th>Operation</th>
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
        { label: "Appearance", url: "" },
        { label: "Count Down ", url: "" },
      ], 
      getLoader: false,
     };
  },
  async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role == 'Super' || role == 'Admin') {
          this.getCountDownData();
          this.$nextTick(() => {
            const dataTableWrapper = document.querySelectorAll('#countdown_tables_wrapper .row.mx-2');
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
    getCountDownData() {
      this.getLoader = true;
        axios.get(this.globalVariables.apiUrl+'admin/appearance/countdown', { headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}})
        .then((res) => {
          if ($.fn.DataTable.isDataTable("#countdown_tables")) {
          $('#countdown_tables').DataTable().destroy();
        }
        var table = $('#countdown_tables').DataTable({
          data: res.data.getDatas,
          columns: [
            // { data: 'id' },
            { data: 'id' },
            { data: 'id' },
            { data: 'symbol' },
            { data: 'title' },
            { data: 'number' },
            { data: 'convart_created_at' },
            { data: '' }
          ],


          initComplete: () => { // Using an arrow function here
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
            {
              targets: -1,
              title: 'Actions',
              searchable: false,
              orderable: false,
              render: function (data, type, full, meta) {
                return '<div class="countdown_action d-flex align-items-center"><button type="button" id="edit-btn" class="btn-style-edit me-2 d-flex  align-items-center" data-id='+full.id+'><i id="edit-btn" class="far fa-edit fa-sm" data-id='+full.id+'></i></button><button type="button" id="delete-btn"  data-id='+full.id +' class="btn-style-danger"><i class="far fa-trash-alt fa-sm" id="delete-btn" data-id='+full.id +'></i></button></div>';
              }
            }
          ],
          order: [[2, 'desc']],
          dom: '<"row mx-2"' +
            '<"col-md-4"f>' + 
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
            searchPlaceholder: 'Search Count Down',
            paginate: { 
              previous: '<i class="fa-solid fa-chevron-left"></i>',
              next: '<i class="fa-solid fa-chevron-right"></i>'
            }
          },
          buttons: [
            {
              text: '<span id="create"><i class="ti ti-plus me-1 ti-xs"></i>New Count Down </span>',
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
      $("#countdown_tables").on("click", ".countdown_action", (event) => {
        const target = $(event.target);
        const dataId = target.data("id");
        const dataClass = target.attr("id");
        if(dataClass === 'edit-btn'){
         this.$router.push('/admin-appearance-countdown-edit/'+dataId);
        }else if(dataClass === 'delete-btn'){
          this.delteLeadMethod(dataId);
        }
      });
    },

    attachEventListenersOfButton(){
      $("#countdown_tables_wrapper").on("click", "button", (event) => {
        const target = $(event.target);
        const dataClass = target.attr("id");
        if (dataClass === "create") {
          this.$router.push("/admin-appearance-countdown-create");
        } 
      });
    },

     // Lead Method Delete
     delteLeadMethod(id) {
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
            .get(this.globalVariables.apiUrl+`admin/appearance/countdown/delete/${id}`, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((res) => {
                toastr.success(res.data.message);
                this.getCountDownData();
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
}
</script>
<style>
#countdown_tables colgroup:nth-of-type(2) {
	display: none !important;
}
#countdown_tables  .dt-checkboxes-cell{
	padding: 0.7rem 0.5rem !important;
}
</style>