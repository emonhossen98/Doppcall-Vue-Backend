<template>
  <div v-if="getLoader">
      <Loader></Loader>
    </div>
  <!-- Content wrapper -->
  <div class="content-wrapper">
    <!-- Content -->
    <div class="container-fluid flex-grow-1 container-p-y">
      <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
      <div class="row mt-4">
        <div class="col-12">
          <div class="card">
            <div class="card-header pt-2 pb-0">
              <h5 class="card-title mb-0 mt-2">
                Categories
              </h5>
            </div>
            <div class="card-body table-responsive table-overflow-hidden">
              <table class="align-middle mb-0 table table-hover" id="categories-tables">
                <thead class="border-top">
                  <tr>
                    <!-- <th></th> -->
                    <th></th>
                    <th>Id</th>
                    <th>Category Name</th>
                    <th>Category ID</th>
                    <th class="text-end">Action</th>
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

    <!-- Modal Create -->
    <div class="modal fade" id="CategoryInfoCreate" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel1">Category Create</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col mb-3">
                <label for="nameBasic" class="form-label">Name</label>
                <input type="text" id="category" v-model="offersCategoeieCreate.category" class="form-control mt-2" placeholder="Enter Your Category Name ..">
                          <div v-if="validationErrors && validationErrors.category" class="text-danger">
                            {{ validationErrors.category[0] }}
                        </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button type="button" @click="typeCreate" class="btn btn-primary">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Edit -->
    <div class="modal fade" id="CategoryInfoEdit" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel1">Category Edit</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col mb-3">
                <label for="nameBasic" class="form-label">Name</label>
                <input type="text" id="category" v-model="offersCategoeieCreate.category" class="form-control mt-2" placeholder="Enter Your Category Name ..">
                              <div v-if="validationErrors && validationErrors.category" class="text-danger">
                                {{ validationErrors.category[0] }}
                            </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button type="button" @click="typeUpdate()" class="btn btn-primary">
              Update
            </button>
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
import "toastr/build/toastr.min.css";
import Swal from "sweetalert2";
import Loader from '../../../../../include/loader.vue';
import Breadcrumb from '../../../../../include/breadcrumb.vue';
import { inject } from "vue";
import { fetchUserRole } from "@/services/userService";

export default {
  setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
  components:{
      Loader,
      Breadcrumb,
    },
  data() {
    return {
      offersCategoeieCreate: {
        category: "",
      },
      categories: "",
      bulkactionids : {
        selectedIds: [],
      },
      getLoader: false,
      breadcrumbs: [
        { label: "Dashboard", url: "/dashboard" },
        { label: "Categories", url: "" },
      ],
    };
  },
  async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role == 'Super' || role == 'Admin') {
          this.getcategories();
          this.$nextTick(() => {
            const dataTableWrapper = document.querySelectorAll('#categories-tables_wrapper .row.mx-2');
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
    getcategories() {
      this.getLoader = true,
      axios
        .get(this.globalVariables.apiUrl+"admin/offers/categories", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          if ($.fn.DataTable.isDataTable("#categories-tables")) {
          $('#categories-tables').DataTable().destroy();
        }
        var table = $('#categories-tables').DataTable({
          data: res.data.categoryOffers,
          columns: [
            // { data: 'id' },
            { data: 'id' },
            { data: 'id' },
            { data: 'name' },
            { data: 'id' },
            {
                data: "pay_out",
                render: function (data, type, full, meta) {
                  return '<div class="text-end categorie-action-btn"><button title="Edit" data-id='+ full.id + ' data-bs-toggle="modal" data-bs-target="#CategoryInfoEdit" class="rounded-circle bg-transparent border-0 me-2 text-primary"><i class="far fa-edit fa-sm" data-id='+ full.id + '></i></button><button title="Delete" type="button"  data-id='+ full.id + ' class="category-delete border-0 rounded-circle text-danger bg-transparent"><i  data-id="' + full.id + ' " class="far fa-trash-alt fa-sm"></i></button></div>'; ;
                }
              },
          ],
          initComplete: () => { 
            this.attachEventListeners();
            this.attachEventListenersBlulkAction();
            this.attachEventListenersBlulkActionSubmit();
          },
          createdRow: function (row, data, dataIndex) {
              $('td:eq(0)', row).html(dataIndex + 1);
          },
          columnDefs: [
            {
              targets: 0,
              orderable: false,
              checkboxes: {
                selectAllRender: '<input type="checkbox" class="form-check-input ms-1">',
              },
              render: function (data, type, row) {
                return `<input type="checkbox" class="dt-checkboxes form-check-input ms-1 row-checkbox" data-id="${row.id}">`;
              },
              searchable: false
            },
          ],
          order: [[3, 'desc']],
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
            searchPlaceholder: 'Search Category',
            paginate: { 
              previous: '<i class="fa-solid fa-chevron-left"></i>',
              next: '<i class="fa-solid fa-chevron-right"></i>'
            }
          },
          buttons: [
            {
              text: `
                <div id="bulk-action-wrapper">
                  <select id="bulk-action-select" class="form-select form-select-sm">
                    <option value=""> ✓ Bulk Actions</option>
                    <option value="delete">Bulk Delete</option>
                  </select>
                </div>
              `,
              className: "me-2 p-0 btn-primary d-none",
              attr: { id: "bulk-action-container" },
            },
            {
              text: '<span data-bs-toggle="modal" data-bs-target="#CategoryInfoCreate"><i class="ti ti-plus me-1 ti-xs"></i>New Category</span>',
              className: 'create-new btn btn-primary',
              attr: { id: 'create' },
            }
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
      $('#categories-tables').on('click', '.categorie-action-btn', (event) => {
        const target = $(event.target);
        const dataId = target.data('id');
        const dataClass = target.attr('class');
        if(dataClass === 'rounded-circle btn-style-edit' || dataClass === 'far fa-edit fa-sm'){
          this.getLoader = true,
        axios
          .get(this.globalVariables.apiUrl+`admin/offers/categories/edit/${dataId}`, {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          })
          .then((res) => {
            this.offersCategoeieCreate.category = res.data.categoryOffer && res.data.categoryOffer.name;
            this.offersCategoeieCreate.id = res.data.categoryOffer && res.data.categoryOffer.id;
          })
          .catch((error) => {
            return error;
          })
          .finally(() => {
            this.getLoader = false;
          });
        }else if(dataClass === 'category-delete border-0 rounded-circle btn-style-danger' || dataClass === 'far fa-trash-alt fa-sm'){
          Swal.fire({
            text: 'Are you sure delete',
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
          }).then((result) => {
            if (result.value) {
              this.getLoader = true,
              axios
                .get(this.globalVariables.apiUrl+`admin/offers/categories/destroy/${dataId}`, {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                })
                .then((res) => {
                    toastr.success(res.data.messaage);
                    this.getcategories();
                })
                .catch((e) => {
                  return e;
                })
                .finally(()=> {
                  this.getLoader = false;
                });
              } 
          });
        }
      });
    },

    attachEventListenersBlulkAction() {
      $('#categories-tables').on('change', '.row-checkbox', (event) => {
        const id = parseInt(event.target.dataset.id);
        if (event.target.checked) {
          if (!this.bulkactionids.selectedIds.includes(id)) {
            this.bulkactionids.selectedIds.push(id);
          }
        } else {
          this.bulkactionids.selectedIds = this.bulkactionids.selectedIds.filter(item => item !== id);
        }

        this.toggleBulkActionVisibility();
      });

      $('#categories-tables thead').on('change', 'input[type="checkbox"]', (event) => {
        const isChecked = event.target.checked;
        $('#categories-tables tbody .row-checkbox').each((index, checkbox) => {
          checkbox.checked = isChecked;
          const id = parseInt(checkbox.dataset.id);

          if (isChecked) {
            if (!this.bulkactionids.selectedIds.includes(id)) {
              this.bulkactionids.selectedIds.push(id);
            }
          } else {
            this.bulkactionids.selectedIds = [];
          }
        });

        this.toggleBulkActionVisibility();
      });
    },

    attachEventListenersBlulkActionSubmit() {
      $('#bulk-action-select').off().on('change', (e) => {
        const action = e.target.value;
        if (!action || this.bulkactionids.selectedIds.length === 0) {
          return;
        }
        if (action === 'delete') {
          this.bulkDelete();
        }
        $('#bulk-action-select').val('');
      });
    },

    toggleBulkActionVisibility() {
      const bulkActionWrapper = $('#bulk-action-container');
      if (this.bulkactionids.selectedIds.length > 0) {
        bulkActionWrapper?.removeClass('d-none');
      } else {
        bulkActionWrapper?.addClass('d-none');
      }
    },

    bulkDelete() {
      Swal.fire({
        text: 'Are Sure Delete',
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.value) {
          (this.getLoader = true),
            axios
              .post(
                this.globalVariables.apiUrl + "admin/offers/categories/bulk/delete",
                this.bulkactionids,
                {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }
              )
              .then((res) => {
                if (res.data.status == "success") {
                  toastr.success(res.data.message);
                  this.getcategories();
                } else {
                  toastr.error(res.data.message);
                }
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

    typeCreate() {
      this.getLoader = true;
      axios
      .post(this.globalVariables.apiUrl+"admin/offers/categories/store", this.offersCategoeieCreate, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
        .then((res) => {
          toastr.success('Category Create Successfuly');
          this.getcategories();

          // Reset form data and validation errors
          this.offersCategoeieCreate = {
            category: "",
          };
          this.validationErrors = null;

          // Close the modal
          const modal = document.getElementById("CategoryInfoCreate");
          const bootstrapModal = bootstrap.Modal.getInstance(modal);
          if (bootstrapModal) {
            bootstrapModal.hide();
          }
        })
        .catch((error) => {
          if (error.response && error.response.data && error.response.data.errors) {
            this.validationErrors = error.response.data.errors;
          }
        })
        .finally(() => {
          this.getLoader = false;
        });
    },
    typeUpdate() {
      if (!this.offersCategoeieCreate.id) {
        toastr.error("No type selected for update.");
        return;
      }
      this.getLoader = true;
      axios
        .post(this.globalVariables.apiUrl+`admin/offers/categories/update/${this.offersCategoeieCreate.id}`, this.offersCategoeieCreate, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          }
        )
        .then((res) => {
          toastr.success('Category Update Successfuly');
          this.getcategories();

          // Reset form data and validation errors
          this.offersCategoeieCreate = {
            id: null,
            category: "",
          };
          this.validationErrors = null;

          const modal = document.getElementById("CategoryInfoEdit");
          const bootstrapModal = bootstrap.Modal.getInstance(modal);
          if (bootstrapModal) {
            bootstrapModal.hide();
          }
        })
        .catch((error) => {
          if (error.response && error.response.data && error.response.data.errors) {
            this.validationErrors = error.response.data.errors;
          }
        })
        .finally(() => {
          this.getLoader = false;
        });
    },
  },
};
</script>
<style>
#categories-tables colgroup:nth-of-type(2) {
	display: none !important;
}
#categories-tables .dt-checkboxes-cell {
  padding: 11.2px 8px !important;
}
</style>