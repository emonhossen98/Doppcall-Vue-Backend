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
            <div class="card-header pt-2 pb-0">
              <h5 class="card-title mt-2 mb-0">Types</h5>
            </div>
            <div class="card-datatable table-responsive table-overflow-hidden">
              <table class="align-middle mb-0 table table-hover" id="types-tables">
                <thead class="border-top">
                  <tr>
                    <th></th>
                    <th>SL</th>
                    <th>Type Name</th>
                    <th>ID</th>
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
    <div class="modal fade" id="TypeInfoCreate" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel1">New offer Type</h5>
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
                <input
                  type="text"
                  id="type_name"
                  class="form-control"
                  v-model="offerType.type_name"
                  placeholder="Enter Type Name"
                />
                <div
                  v-if="validationErrors && validationErrors.type_name"
                  class="text-danger"
                >
                  {{ validationErrors.type_name[0] }}
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
    <div class="modal fade" id="TypeInfoEdit" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel1">Edit offer Type</h5>
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
                <input
                  type="text"
                  id="type_name"
                  class="form-control"
                  v-model="offerType.type_name"
                  placeholder="Enter Type Name"
                />
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
        { label: "Types", url: "" },
      ],
      offerType: {
        id: null, // Added `id` to store the current offer type's id
        type_name: "",
      },
      validationErrors: null,
    };
  },
  async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role == 'Super' || role == 'Admin') {
          this.getOffersTypes();
          this.$nextTick(() => {
            const dataTableWrapper = document.querySelectorAll(
              "#types-tables_wrapper .row.mx-2"
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
    getOffersTypes() {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl + "admin/offers/types", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          if ($.fn.DataTable.isDataTable("#types-tables")) {
            $("#types-tables").DataTable().destroy();
          }
          $("#types-tables").DataTable({
            data: res.data.offerTypes,
            columns: [
              { data: "id" },
              { data: "id" },
              { data: "type" },
              { data: "id" },
              {
                data: "pay_out",
                render: function (data, type, row) {
                  return (
                    '<div class="text-end type-datatables-action">' +
                    '<button data-id=' +
                    row.id +
                    ' class="rounded-circle btn-style-edit" data-bs-toggle="modal" data-bs-target="#TypeInfoEdit">' +
                    '<i class="far fa-edit fa-sm" data-id=' +
                    row.id +
                    '></i></button>' +
                    '<button type="button"  data-id=' +
                    row.id +
                    ' class="type-delete-btn border-0 rounded-circle btn-style-danger">' +
                    '<i  data-id="' +
                    row.id +
                    '" class="far fa-trash-alt fa-sm"></i></button></div>'
                  );
                },
              },
            ],
            initComplete: () => {
              this.attachEventListeners();
              this.attachEventListenersOfButton();
            },
            columnDefs: [
              {
                targets: 0,
                orderable: false,
                checkboxes: {
                  selectAllRender:
                    '<input type="checkbox" class="form-check-input ms-1">',
                },
                render: function () {
                  return '<input type="checkbox" class="dt-checkboxes form-check-input ms-1" >';
                },
                searchable: false,
              },
            ],
            order: [[1, "asc"]],
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
              searchPlaceholder: "Search Type",
              paginate: {
                previous: '<i class="fa-solid fa-chevron-left"></i>',
                next: '<i class="fa-solid fa-chevron-right"></i>',
              },
            },
            buttons: [
              {
                text:
                  '<span data-bs-toggle="modal" data-bs-target="#TypeInfoCreate"><i class="ti ti-plus me-1 ti-xs"></i>New Type</span>',
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
      $("#types-tables").on("click", ".type-datatables-action", (event) => {
        const target = $(event.target);
        const dataId = target.data("id");
        const dataClass = target.attr("class");

        if (
          dataClass === "rounded-circle btn-style-edit" ||
          dataClass === "far fa-edit fa-sm"
        ) {
          this.getLoader = true;
          axios
            .get(this.globalVariables.apiUrl + `admin/offers/types/edit/${dataId}`, {
              headers: { Authorization: "Bearer " + localStorage.getItem("token") },
            })
            .then((res) => {
              // Set `id` and `type_name` when editing
              this.offerType.id = res.data.offerType.id;
              this.offerType.type_name = res.data.offerType.type;
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
              this.getLoader = true;
              axios
                .get(
                  this.globalVariables.apiUrl + `admin/offers/types/destroy/${dataId}`,
                  {
                    headers: {
                      Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                  }
                )
                .then((res) => {
                  toastr.success(res.data.message);
                  this.getOffersTypes();
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
    attachEventListenersOfButton() {
      $("#types-tables_wrapper").on("click", "button", (event) => {
        const target = $(event.target);
        const dataClass = target.attr("id");
        if (dataClass === "create") {
          this.$router.push("/admin-offers-types-create");
        }
      });
    },

    typeCreate() {
      this.getLoader = true;
      axios
        .post(
          this.globalVariables.apiUrl + "admin/offers/types/store",
          this.offerType,
          {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          }
        )
        .then((res) => {
          toastr.success(res.data.message);
          this.getOffersTypes();

          // Reset form data and validation errors
          this.offerType = {
            type_name: "",
          };
          this.validationErrors = null;

          // Close the modal
          const modal = document.getElementById("TypeInfoCreate");
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
      if (!this.offerType.id) {
        toastr.error("No type selected for update.");
        return;
      }
      this.getLoader = true;
      axios
        .post(
          this.globalVariables.apiUrl + `admin/offers/types/update/${this.offerType.id}`,
          this.offerType,
          {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          }
        )
        .then((res) => {
          toastr.success(res.data.message);
          this.getOffersTypes();

          // Reset form data and validation errors
          this.offerType = {
            id: null,
            type_name: "",
          };
          this.validationErrors = null;

          const modal = document.getElementById("TypeInfoEdit");
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
/* #types-tables_wrapper #types-tables_wrapper .row.mx-2 {
    display: none !important;
  } */
#types-tables colgroup:nth-of-type(2) {
  display: none !important;
}
</style>
