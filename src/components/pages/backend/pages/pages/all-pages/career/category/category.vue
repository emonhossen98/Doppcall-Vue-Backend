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
              <h5 class="card-title ms-1 mb-0">Category</h5>
            </div>
            <div class="card-body table-responsive table-overflow-hidden">
              <table
                class="align-middle mb-0 table table-hover"
                id="carrer_category_tables"
              >
                <thead>
                  <tr>
                    <!-- <th></th> -->
                    <th></th>
                    <!-- <th>SL</th> -->
                    <th>Name</th>
                    <th>Status</th>
                    <th class="text-end">Action</th>
                  </tr>
                </thead>
                <tbody></tbody>
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
                <label for="name" class="required mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  v-model="categoryCreate.name"
                  class="form-control mt-1"
                  placeholder="Enter Your Name!"
                />
                <div v-if="validationErrors && validationErrors.name" class="text-danger">
                  {{ validationErrors.name[0] }}
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col mb-3">
                <label for="status" class="required mb-1">Status</label><br />
                <select
                  id="status"
                  class="form-select mt-1"
                  v-model="categoryCreate.status"
                >
                  <option value="">Select Status</option>
                  <option value="1">Active</option>
                  <option value="2">Pending</option>
                </select>
                <div
                  v-if="validationErrors && validationErrors.status"
                  class="text-danger"
                >
                  {{ validationErrors.status[0] }}
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button type="button" @click="careerCategorySave" class="btn btn-primary">
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
                <label for="name" class="required">Name</label>
                <input
                  type="text"
                  id="name"
                  v-model="categoryUpdate.name"
                  class="form-control mt-1"
                  placeholder="Enter Your Name!"
                />
                <div v-if="validationErrors && validationErrors.name" class="text-danger">
                  {{ validationErrors.name[0] }}
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col mb-3">
                <label for="status" class="required">Status</label><br />
                <select
                  id="status"
                  class="form-select mt-1"
                  v-model="categoryUpdate.status"
                >
                  <option value="1">Active</option>
                  <option value="2">Pending</option>
                </select>
                <div
                  v-if="validationErrors && validationErrors.status"
                  class="text-danger"
                >
                  {{ validationErrors.status[0] }}
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button type="button" @click="careerCategoryUpdate()" class="btn btn-primary">
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
      getLoader: false,
      breadcrumbs: [
        { label: "Dashboard", url: "/dashboard" },
        { label: "Career Category", url: "" },
      ],
      categoryCreate: {
        name: "",
        status: "",
      },
      bulkactionids : {
        selectedIds: [],
        status: "",
      },
      categoryUpdate: {
        name: "",
        status: "",
      },
    };
  },
  async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role == 'Super' || role == 'Admin') {
          this.getCareerCategory();
          this.$nextTick(() => {
            const dataTableWrapper = document.querySelectorAll(
              "#carrer_category_tables_wrapper .row.mx-2"
            );
            if (dataTableWrapper.length > 0) {
              dataTableWrapper[0].style.display = "none";
              dataTableWrapper[1].style.display = "none";
            }
          });
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    },
  methods: {
    getCareerCategory() {
      (this.getLoader = true),
        axios
          .get(this.globalVariables.apiUrl + "admin/career/catagory", {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          })
          .then((res) => {
            if ($.fn.DataTable.isDataTable("#carrer_category_tables")) {
              $("#carrer_category_tables").DataTable().destroy();
            }
            var table = $("#carrer_category_tables").DataTable({
              data: res.data,
              columns: [
                // { data: 'id' },
                { data: "id" },
                // { data: 'id' },
                { data: "name" },
                { data: "convart_status" },
                { data: "" },
              ],
              initComplete: () => {
                // Using an arrow function here
                this.attachEventListeners();
                this.attachEventListenersBlulkAction();
                this.attachEventListenersBlulkActionSubmit();
              },
              createdRow: function (row, data, dataIndex) {
                $("td:eq(0)", row).html(dataIndex + 1);
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
                  searchable: false,
                },
                {
                  targets: -1,
                  title: "Actions",
                  searchable: false,
                  orderable: false,
                  render: function (data, type, full, meta) {
                    return (
                      '<div class="text-end type-datatables-action"><button title="Edit" data-bs-toggle="modal" data-bs-target="#CategoryInfoEdit" data-id=' +
                      full.id +
                      ' class="rounded-circle bg-transparent border-0 text-primary "><i class="far fa-edit fa-sm" data-id=' +
                      full.id +
                      '></i></button><button type="button" title="Delete" data-id=' +
                      full.id +
                      ' class="type-delete-btn border-0 rounded-circle bg-transparent border-0 text-danger "><i  data-id="' +
                      full.id +
                      ' " class="far fa-trash-alt fa-sm"></i></button></div>'
                    );
                  },
                },
              ],
              order: [[2, "desc"]],
              dom:
                '<"row mx-2"' +
                '<"col-md-4"f>' +
                '<"col-md-8 dopp_tb d-flex justify-content-end align-items-center"l<"button-wrapper"B>>' +
                '<"col-md-3 d-none"p>>' +
                "t" +
                '<"row mx-2"' +
                '<"col-md-5"i>' +
                '<"col-md-7"p>>',
              displayLength: 10,
              lengthMenu: [10, 20, 50, 100, 200],
              language: {
                sLengthMenu: "_MENU_",
                search: "",
                searchPlaceholder: "Search Category",
                paginate: {
                  previous: '<i class="fa-solid fa-chevron-left"></i>',
                  next: '<i class="fa-solid fa-chevron-right"></i>',
                },
              },
              buttons: [
                {
                  text: `
                    <div id="bulk-action-wrapper">
                      <select id="bulk-action-select" class="form-select form-select-sm">
                        <option value=""> ✓ Bulk Actions</option>
                        <option value="delete">Bulk Delete</option>
                        <option value="0">Bulk Pending</option>
                        <option value="1">Bulk Publish</option>
                      </select>
                    </div>
                  `,
                  className: "me-2 p-0 btn-primary d-none",
                  attr: { id: "bulk-action-container" },
                },
                {
                  text:
                    '<span data-bs-toggle="modal" data-bs-target="#CategoryInfoCreate"><i class="ti ti-plus me-1 ti-xs"></i>New Category</span>',
                  className: "create-new btn btn-primary",
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
      $("#carrer_category_tables").on("click", ".type-datatables-action", (event) => {
        const target = $(event.target);
        const dataId = target.data("id");
        const dataClass = target.attr("class");

        if (
          dataClass === "rounded-circle btn-style-edit" ||
          dataClass === "far fa-edit fa-sm"
        ) {
          this.getLoader = true,
          axios 
          .get(this.globalVariables.apiUrl+`admin/career/catagory/edit/${dataId}`,{
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          })
          .then((res) => {
            this.categoryUpdate.id = res.data.catagory.id;
            this.categoryUpdate.name = res.data.catagory.name;
            this.categoryUpdate.status = res.data.catagory.status;
          })
          .catch((error) => {
            return error;
          })
          .finally(() => {
            this.getLoader = false;
          });
        } else if (
          dataClass === "type-delete-btn border-0 rounded-circle btn-style-danger" ||
          dataClass === "far fa-trash-alt fa-sm"
        ) {
          Swal.fire({
            text: "Are you sure delete",
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
          }).then((result) => {
            if (result.value) {
              (this.getLoader = true),
                axios
                  .delete(
                    this.globalVariables.apiUrl +
                      `admin/career/catagory/delete/${dataId}`,
                    {
                      headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                      },
                    }
                  )
                  .then((res) => {
                    toastr.success(res.data.message);
                    this.getCareerCategory();
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
    attachEventListenersBlulkAction() {
      $('#carrer_category_tables').on('change', '.row-checkbox', (event) => {
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
      $('#carrer_category_tables thead').on('change', 'input[type="checkbox"]', (event) => {
        const isChecked = event.target.checked;
        $('#carrer_category_tables tbody .row-checkbox').each((index, checkbox) => {
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
        } else {
          if (action === "1") {
            this.bulkactionids.status = '1';
            const alertTitle = "Category Want to Approved";
            this.bulkStatusChange(alertTitle);
          } else{
            this.bulkactionids.status = '0';
            const alertTitle = "Category Want to Pending";
            this.bulkStatusChange(alertTitle);
          }
        }
        $('#bulk-action-select').val('');
      });
    },

    toggleBulkActionVisibility() {
      const bulkActionWrapper = $('#bulk-action-container');
      const bulkActionWrapperSecond = $('#bulk-action-container-second');
      if (this.bulkactionids.selectedIds.length > 0) {
        bulkActionWrapper?.removeClass('d-none');
      } else {
        bulkActionWrapper?.addClass('d-none');
      }

      if (this.bulkactionids.selectedIds.length > 0) {
        bulkActionWrapperSecond?.removeClass('d-none');
      } else {
        bulkActionWrapperSecond?.addClass('d-none');
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
                    this.globalVariables.apiUrl + "admin/career/catagory/bulk/delete",
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
                      this.getCareerCategory();
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
    
        bulkStatusChange(alertTitle) {
          Swal.fire({
            text: alertTitle,
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
          }).then((result) => {
            if (result.value) {
              (this.getLoader = true),
                axios
                  .post(
                    this.globalVariables.apiUrl + "admin/career/catagory/bulk/status",
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
                      this.getCareerCategory();
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
    careerCategorySave() {
      (this.getLoader = true),
        axios
          .post(
            this.globalVariables.apiUrl + "admin/career/catagory/store",
            this.categoryCreate,
            {
              headers: { Authorization: "Bearer " + localStorage.getItem("token") },
            }
          )
          .then((res) => {
            toastr.success(res.data.message);
            this.getCareerCategory();

            // Reset form data and validation errors
            this.categoryCreate = {
              name: "",
              status: "",
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
    careerCategoryUpdate() {
        this.getLoader = true,
        axios
          .put(this.globalVariables.apiUrl+`admin/career/catagory/update/${this.categoryUpdate.id}`, this.categoryUpdate, {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          })
          .then((res) => {
            toastr.success(res.data.message);
            this.getCareerCategory();

            // Reset form data and validation errors
            this.categoryUpdate = {
              name: "",
              status: "",
            };
            this.validationErrors = null;

            // Close the modal
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
#carrer_category_tables colgroup:nth-of-type(2) {
  display: none !important;
}
#carrer_category_tables .dt-checkboxes-cell {
  padding: 0.7rem 0.5rem !important;
}
</style>
