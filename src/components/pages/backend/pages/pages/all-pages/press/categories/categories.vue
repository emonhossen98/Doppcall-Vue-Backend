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
              <div class="card mt-3">
                  <div class="card-header pt-3">
                      <h5 class="card-title d-flex justify-content-between align-items-center mb-2">
                          Press Categories
                      </h5>
                  </div>
                  <div class="card-body table-responsive table-overflow-hidden">
                      <table class="align-middle mb-0 table table-hover" id="press_categiories_datatables">
                          <thead>
                              <tr>
                                <!-- <th></th> -->
                                <th></th>
                                <th>SL</th>
                                <th>Name</th>
                                <th>Slug</th>
                                <th>Status</th>
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
    data: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: "/dashboard" },
          { label: "Categories", url: "" },
        ],
        getLoader: false,
      };
    },
    async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role == 'Super' || role == 'Admin') {
          this.categoriesData();
          this.$nextTick(() => {
            const dataTableWrapper = document.querySelectorAll('#press_categiories_datatables_wrapper .row.mx-2');
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
      categoriesData() {
        this.getLoader = true;
        axios
          .get(
            this.globalVariables.apiUrl+"admin/pressCategories/index",
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((res) => {
            if ($.fn.DataTable.isDataTable("#press_categiories_datatables")) {
            $('#press_categiories_datatables').DataTable().destroy();
          }
            var table = $('#press_categiories_datatables').DataTable({
              data: res.data.categories,
              columns: [
                // { data: 'id' },
                { data: 'id' },
                { data: 'id' },
                { data: 'name' },
                { data: 'slug' },
                {
                  data: "updated_at",
                  render: function (data, type, row) {
                    if(row.status == 1){
                      return '<span class="badge bg-success">Publish</span>'
                    }else{
                      return '<span class="badge bg-danger">Pending</span>'
                    }
                  },
                },
                {
                  data: "created_at",
                  render: function (data, type, row) {
                    return (
                      '<div class="type-datatables-action"><button data-id='+ row.id + ' class="rounded-circle btn-style-edit"><i class="far fa-edit fa-sm" data-id='+ row.id + '></i></button><button type="button"  data-id='+ row.id + ' class="type-delete-btn border-0 rounded-circle btn-style-danger"><i  data-id="' + row.id + ' " class="far fa-trash-alt fa-sm"></i></button></div>'
                    );
                  },
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
                    return '<input type="checkbox" class="dt-checkboxes form-check-input">';
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
                searchPlaceholder: 'Search Categorie',
                paginate: { 
                  previous: '<i class="fa-solid fa-chevron-left"></i>',
                  next: '<i class="fa-solid fa-chevron-right"></i>'
                }
              },
              buttons: [
                {
                  text: '<span id="create"><i class="ti ti-plus me-1 ti-xs"></i>Create</span>',
                  className: 'create-new btn btn-primary',
                  attr: { id: 'create' },
                }
              ],
            });
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.getLoader = false;
          });
      },
  
  
      attachEventListeners() {
        $('#press_categiories_datatables').on('click', '.type-datatables-action', (event) => {
          const target = $(event.target);
          const dataId = target.data('id');
          const dataClass = target.attr('class');
          
          if(dataClass === 'rounded-circle btn-style-edit' || dataClass === 'far fa-edit fa-sm'){
            this.$router.push('/admin-press-categories-edit/'+dataId);
          }else if(dataClass === 'type-delete-btn border-0 rounded-circle btn-style-danger' || dataClass === 'far fa-trash-alt fa-sm'){
            this.deleteCategory(dataId);
          }
        });
      },
  
      attachEventListenersOfButton(){
        $("#press_categiories_datatables_wrapper").on("click", "button", (event) => {
          const target = $(event.target);
          const dataClass = target.attr("id");
          if (dataClass === "create") {
            this.$router.push("/admin-press-categorie-create");
          } 
        });
      },
  
      // Category Delete
      deleteCategory(id) {
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
              .delete(this.globalVariables.apiUrl+`admin/pressCategories/destroy/${id}`, {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              })
              .then((res) => {
                  toastr.success(res.data.message);
                  this.categoriesData();
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
  
  #press_categiories_datatables colgroup:nth-of-type(2) {
      display: none !important;
  }
  #press_categiories_datatables .dt-checkboxes-cell{
      padding: 0.7rem 0.5rem !important;
  }
  .btn-style-danger, .btn-style-edit, .btn-style-info {
      height: 30px;
      width: 30px;
      text-align: center;
      padding-top: 0;
      font-size: 14px;
      transition: .5s;
  }
  </style>