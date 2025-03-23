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
            <div class="card-header pt-2">
              <h5 class="card-title mt-2 ms-1 mb-0">Differentiates List</h5>
            </div>
            <div class="card-body table-responsive table-overflow-hidden">
              <table
                class="align-middle mb-0 table table-hover"
                id="differentiates_tables"
              >
                <thead>
                  <tr>
                    <!-- <th></th> -->
                    <th></th>
                    <th>Image</th>
                    <th>Differentiates Title</th>
                    <th>Differentiates Description</th>
                    <th>Status</th>
                    <th>Created At</th>
                    <th>Operation</th>
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
    <div class="modal fade" id="differentInfoCreate" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel1">Modal title</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <label for="differentiates_title" class="required"
                  >Differentiates Title</label
                >
              </div>
              <div class="col-sm-8">
                <input
                  type="text"
                  required
                  v-model="differentiatesCreate.differentiates_title"
                  id="differentiates_title"
                  class="form-control"
                  placeholder="Enter Differentiates Title"
                />
                <div
                  v-if="validationErrors && validationErrors.differentiates_title"
                  class="text-danger"
                >
                  {{ validationErrors.differentiates_title[0] }}
                </div>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-sm-4">
                <label for="differentiates_description" class="required"
                  >Differentiates Description</label
                >
              </div>
              <div class="col-sm-8">
                <input
                  type="text"
                  required
                  v-model="differentiatesCreate.differentiates_description"
                  id="differentiates_description"
                  class="form-control"
                  placeholder="Enter Differentiates Description"
                />
                <div
                  v-if="validationErrors && validationErrors.differentiates_description"
                  class="text-danger"
                >
                  {{ validationErrors.differentiates_description[0] }}
                </div>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-sm-4">
                <label for="status" class="required">Status</label>
              </div>
              <div class="col-sm-8">
                <select
                  id="status"
                  v-model="differentiatesCreate.status"
                  class="form-select"
                >
                  <option value="">Select Status</option>
                  <option value="1">Publish</option>
                  <option value="0">Pending</option>
                </select>
                <div
                  v-if="validationErrors && validationErrors.status"
                  class="text-danger"
                >
                  {{ validationErrors.status[0] }}
                </div>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-sm-4">
                <label for="image" class="required">Image</label>
              </div>
              <div class="row col-sm-8">
                <div class="col-sm-12">
                  <input
                    type="file"
                    accept="image/*"
                    ref="myFile"
                    @change="primaryLogo($event)"
                    class="form-control"
                    id="image"
                  />
                  <span
                    style="background: #e9fff7; font-size: 12px; cursor: help"
                    class="py-1 px-2 d-block"
                    >Valid image: jpg,png,svg,jpeg</span
                  >
                  <div
                    v-if="validationErrors && validationErrors.image"
                    class="text-danger"
                  >
                    {{ validationErrors.image[0] }}
                  </div>
                </div>
                <div class="col-sm-6">
                  <img
                    v-if="differentiatesShowImage.image"
                    :src="differentiatesShowImage.image"
                    class="imgpreview"
                  />
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
    <div class="modal fade" id="differentInfoEdit" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel1">Modal title</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <label for="differentiates_title" class="required"
                  >Differentiates Title</label
                >
              </div>
              <div class="col-sm-8">
                <input
                  type="text"
                  required
                  v-model="differentiatesUpdated.differentiates_title"
                  id="differentiates_title"
                  class="form-control"
                  placeholder="Enter Differentiates Title"
                />
                <div
                  v-if="validationErrors && validationErrors.differentiates_title"
                  class="text-danger"
                >
                  {{ validationErrors.differentiates_title[0] }}
                </div>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-sm-4">
                <label for="differentiates_description" class="required"
                  >Differentiates Description</label
                >
              </div>
              <div class="col-sm-8">
                <input
                  type="text"
                  required
                  v-model="differentiatesUpdated.differentiates_description"
                  id="differentiates_description"
                  class="form-control"
                  placeholder="Enter Differentiates Description"
                />
                <div
                  v-if="validationErrors && validationErrors.differentiates_description"
                  class="text-danger"
                >
                  {{ validationErrors.differentiates_description[0] }}
                </div>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-sm-4">
                <label for="status" class="required">Status</label>
              </div>
              <div class="col-sm-8">
                <select
                  id="status"
                  v-model="differentiatesUpdated.status"
                  class="form-select"
                >
                  <option value="">Select Status</option>
                  <option value="1">Publish</option>
                  <option value="0">Pending</option>
                </select>
                <div
                  v-if="validationErrors && validationErrors.status"
                  class="text-danger"
                >
                  {{ validationErrors.status[0] }}
                </div>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-sm-4">
                <label for="image" class="required">Image</label>
              </div>
              <div class="row col-sm-8">
                <div class="col-sm-8">
                  <input
                    type="file"
                    accept="image/*"
                    ref="myFile"
                    @change="primaryLogoUpdate($event)"
                    class="form-control"
                    id="image"
                  />
                  <span
                    style="background: #e9fff7; font-size: 12px; cursor: help"
                    class="py-1 px-2 d-block"
                    >Valid image: jpg,png,svg,jpeg</span
                  >
                  <div
                    v-if="validationErrors && validationErrors.image"
                    class="text-danger"
                  >
                    {{ validationErrors.image[0] }}
                  </div>
                </div>
                <div class="col-sm-4">
                  <img
                    v-if="differentiatesShowImage.image"
                    :src="differentiatesShowImage.image"
                    class="imgpreview"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button
              type="button"
              @click="offersDifferentiatesUpdate()"
              class="btn btn-primary"
            >
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
      getLoader: false,
      breadcrumbs: [
        { label: "Dashboard", url: "/dashboard" },
        { label: "Differentiates", url: "" },
      ],
      differentiatesCreate: {
        differentiates_title: "",
        differentiates_description: "",
        status: "",
        image: null,
      },
      differentiatesShowImage: {
        image: null,
      },
      differentiatesUpdated: {
        differentiates_title: "",
        differentiates_description: "",
        status: "",
        image: null,
      },
      userData : "",
    };
  },

   async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role == 'Super' || role == 'Admin') {
          this.getDifferentiates(); 
          this.$nextTick(() => {
            const dataTableWrapper = document.querySelectorAll(
              "#differentiates_tables_wrapper .row.mx-2"
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
    getDifferentiates() {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl + "admin/about/differentiates", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          if ($.fn.DataTable.isDataTable("#differentiates_tables")) {
            $("#differentiates_tables").DataTable().destroy();
          }
          // Initialize DataTable and store the instance in a variable
          var table = $("#differentiates_tables").DataTable({
            data: res.data,
            columns: [
              // { data: 'id' },
              // { data: 'id' },
              { data: "id" },
              { data: "convart_image" },
              { data: "title" },
              { data: "convart_dis" },
              { data: "convart_status" },
              { data: "convart_date" },
              { data: "" },
            ],
            initComplete: () => {
              // Using an arrow function here
              this.attachEventListeners();
              this.attachEventListenersOfButton();
            },
            createdRow: function (row, data, dataIndex) {
              $("td:eq(0)", row).html(dataIndex + 1);
            },
            columnDefs: [
              {
                targets: 0,
                orderable: false,
                checkboxes: {
                  selectAllRender: '<input type="checkbox" class="form-check-input">',
                },
                render: function () {
                  return '<input type="checkbox" class="dt-checkboxes form-check-input" >';
                },
                searchable: false,
              },
              {
                targets: 2,
                responsivePriority: 1,
              },
              {
                targets: 3,
                responsivePriority: 5,
              },
              {
                targets: -2,
              },
              {
                targets: -1,
                title: "Actions",
                searchable: false,
                orderable: false,
                render: function (data, type, full, meta) {
                  return (
                    '<div class="text-end differentiates-action-btn"><button data-bs-toggle="modal" data-bs-target="#differentInfoEdit" class="rounded-circle btn-style-edit" data-id=' +
                    full.id +
                    '><i class="far fa-edit fa-sm" data-id=' +
                    full.id +
                    '></i></button><button type="button"  data-id=' +
                    full.id +
                    ' class="differentiates_delete_btn border-0 rounded-circle btn-style-danger"><i  data-id="' +
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
              searchPlaceholder: "Search Differentiates",
              paginate: {
                previous: '<i class="fa-solid fa-chevron-left"></i>',
                next: '<i class="fa-solid fa-chevron-right"></i>',
              },
            },
            buttons: [
              {
                text:
                  '<span data-bs-toggle="modal" data-bs-target="#differentInfoCreate"><i class="ti ti-plus me-1 ti-xs"></i>New Differentiates</span>',
                className: "create-new btn btn-primary",
                attr: { id: "create" },
              },
            ],
          });
          this.getLoader = false;
        })
        .catch((error) => {
          return error;
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    attachEventListeners() {
      $("#differentiates_tables").on("click", ".differentiates-action-btn", (event) => {
        const target = $(event.target);
        const dataId = target.data("id");
        const dataClass = target.attr("class");
        if (
          dataClass === "rounded-circle btn-style-edit" ||
          dataClass === "far fa-edit fa-sm"
        ) {
          this.getLoader = true;
          axios
            .get(
              this.globalVariables.apiUrl + `admin/about/differentiates/edit/${dataId}`,
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
            )
            .then((res) => {
              this.differentiatesUpdated.id = res.data.differentiates.id;
              this.differentiatesUpdated.differentiates_title =
                res.data.differentiates.title;
              this.differentiatesUpdated.differentiates_description =
                res.data.differentiates.description;
              this.differentiatesUpdated.status = res.data.differentiates.status;
              this.differentiatesShowImage.image =
                this.globalVariables.appUrl + res.data.differentiates.image;
            })
            .catch((error) => {
              if (error.response && error.response.data && error.response.data.errors) {
                this.validationErrors = error.response.data.errors;
              }
            })
            .finally(() => {
              this.getLoader = false;
            });
        } else if (
          dataClass ===
            "differentiates_delete_btn border-0 rounded-circle btn-style-danger" ||
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
              this.getLoader = true;
              axios
                .get(
                  this.globalVariables.apiUrl +
                    `admin/about/differentiates/delete/${dataId}`,
                  {
                    headers: {
                      Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                  }
                )
                .then((res) => {
                  toastr.success(res.data.message);
                  this.getDifferentiates();
                })
                .catch((error) => {
                  return error;
                })
                .finally(() => {
                  this.getLoader = false;
                });
            }
          });
        }
      });
    },

    typeCreate() {
      this.getLoader = true;
      axios
        .post(
          this.globalVariables.apiUrl + "admin/about/differentiates/store",
          this.differentiatesCreate,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          toastr.success(res.data.message);
          this.getDifferentiates();

          // Reset form data and validation errors
          this.differentiatesCreate = {
            differentiates_title: "",
            differentiates_description: "",
            status: "",
            image: null,
          };
          this.validationErrors = null;
          this.differentiatesShowImage = {
            image: null,
          };
          // Close the modal
          const modal = document.getElementById("differentInfoCreate");
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
    offersDifferentiatesUpdate() {
      this.getLoader = true;
      axios
        .post(
          this.globalVariables.apiUrl +
            `admin/about/differentiates/update/${this.differentiatesUpdated.id}`,
          this.differentiatesUpdated,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          toastr.success(res.data.message);
          this.getDifferentiates();

          this.differentiatesShowImage = {
            image: null,
          };
          const modal = document.getElementById("differentInfoEdit");
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
    primaryLogo(event) {
      const file = event.target.files[0];
      this.differentiatesCreate.image = file;
      if (!file || file.type.indexOf("image/") === -1) return;
      const reader = new FileReader();
      reader.onload = () => {
        this.differentiatesShowImage.image = reader.result;
      };
      reader.readAsDataURL(file);
    },
    primaryLogoUpdate(event) {
      const file = event.target.files[0];
      this.differentiatesUpdated.image = file;
      if (!file || file.type.indexOf("image/") === -1) return;
      const reader = new FileReader();
      reader.onload = () => {
        this.differentiatesShowImage.image = reader.result;
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>

<style>
#differentiates_tables colgroup:nth-of-type(2) {
  display: none !important;
}
#differentiates_tables .dt-checkboxes-cell {
  padding: 0.7rem 0.5rem !important;
}
.imgpreview {
  width: 150px;
}
.rounded-circle {
	height: 32px !important;
	width: 32px !important;
}
</style>
