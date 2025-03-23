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
              <h5 class="card-title mb-0 mt-2">Manage Industry Verticals</h5>
            </div>
            <div class="card-body table-responsive table-overflow-hidden">
              <table class="align-middle mb-0 table table-hover" id="industrys_tables">
                <thead>
                  <tr>
                    <!-- <th></th> -->
                    <th></th>
                    <th>SL</th>
                    <th>Name</th>
                    <th>Status</th>
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
    <div class="modal fade" id="industryInfoCreate" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel1">Industry Verticals Create</h5>
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
                  v-model="industryData.name"
                  id="name"
                  class="form-control"
                  required
                  placeholder="Name"
                />
                <div v-if="validationErrors && validationErrors.name" class="text-danger">
                  {{ validationErrors.name[0] }}
                </div>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-sm-12 mb-1">
                <label for="status" class="required">Status</label>
              </div>
              <div class="col-sm-12">
                <select
                  v-model="industryData.status"
                  id="status"
                  class="form-select"
                  required
                >
                  <option value="">Select Status</option>
                  <option value="0">Pending</option>
                  <option value="1">Publish</option>
                </select>
                <div v-if="validationErrors && validationErrors.name" class="text-danger">
                  {{ validationErrors.name[0] }}
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button type="button" @click="industrySave" class="btn btn-primary">
              <i class="fas fa-check fa-sm me-2"></i>
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Edit -->
    <div class="modal fade" id="industryInfoEdit" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel1">Industry Verticals Edit</h5>
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
                  v-model="industryData.name"
                  id="name"
                  class="form-control"
                  required
                  placeholder="Name"
                />
                <div v-if="validationErrors && validationErrors.name" class="text-danger">
                  {{ validationErrors.name[0] }}
                </div>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-sm-12 mb-1">
                <label for="status" class="required">Status</label>
              </div>
              <div class="col-sm-12">
                <select
                  v-model="industryData.status"
                  id="status"
                  class="form-select"
                  required
                >
                  <option value="0">Pending</option>
                  <option value="1">Publish</option>
                </select>
                <div v-if="validationErrors && validationErrors.name" class="text-danger">
                  {{ validationErrors.name[0] }}
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button type="button" @click="industryUpdate()" class="btn btn-primary">
              <i class="fas fa-check fa-sm me-2"></i>
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
  data: () => {
    return {
      breadcrumbs: [
        { label: "Dashboard", url: "/dashboard" },
        { label: " Manage Industry Verticals ", url: "" },
      ],
      industryData: {
        name: "",
        status: "",
      },
      validationErrors: null,
      getLoader: false,
    };
  },
  async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role == 'Super' || role == 'Admin') {
          this.getIndustryData();
          this.$nextTick(() => {
            const dataTableWrapper = document.querySelectorAll(
              "#industrys_tables_wrapper .row.mx-2"
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
    getIndustryData() {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl + "admin/contacts/industry-verticals", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          if ($.fn.DataTable.isDataTable("#industrys_tables")) {
            $("#industrys_tables").DataTable().destroy();
          }
          var table = $("#industrys_tables").DataTable({
            data: res.data.getDatas,
            columns: [
              // { data: 'id' },
              { data: "id" },
              { data: "id" },
              { data: "name" },
              { data: "convart_status" },
              { data: "" },
            ],
            initComplete: () => {
              // Using an arrow function here
              this.attachEventListeners();
              this.attachEventListenersOfButton();
            },
            createdRow: function (row, data, dataIndex) {
              $("td:eq(1)", row).html(dataIndex + 1);
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
                targets: -1,
                title: "Actions",
                searchable: false,
                orderable: false,
                render: function (data, type, full, meta) {
                  return (
                    '<div class="industrys_action d-flex align-items-center"><button type="button" data-bs-toggle="modal" data-bs-target="#industryInfoEdit" id="edit-btn" class="btn-style-edit" data-id=' +
                    full.id +
                    '><i id="edit-btn" class="far fa-edit fa-sm" data-id=' +
                    full.id +
                    '></i></button><button type="button" id="delete-btn"  data-id=' +
                    full.id +
                    ' class="btn-style-danger"><i class="far fa-trash-alt fa-sm" id="delete-btn" data-id=' +
                    full.id +
                    "></i></button></div>"
                  );
                },
              },
            ],
            order: [[1, "desc"]],
            dom:
              '<"row mx-2"' +
              '<"col-md-4 px-0"f>' +
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
              searchPlaceholder: "Search Industrys",
              paginate: {
                previous: '<i class="fa-solid fa-chevron-left"></i>',
                next: '<i class="fa-solid fa-chevron-right"></i>',
              },
            },
            buttons: [
              {
                text:
                  '<span data-bs-toggle="modal" data-bs-target="#industryInfoCreate"><i class="ti ti-plus me-1 ti-xs"></i>Create</span>',
                className: "create-new btn btn-primary",
              },
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
      $("#industrys_tables").on("click", ".industrys_action", (event) => {
        const target = $(event.target);
        const dataId = target.data("id");
        const dataClass = target.attr("id");
        if (dataClass === "edit-btn") {
          this.getLoader = true;
          axios
            .get(
              this.globalVariables.apiUrl +
                `admin/contacts/industry-verticals/edit/${dataId}`,
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                  "Content-Type": "multipart/form-data",
                },
              }
            )
            .then((res) => {
              this.industryData.id = res.data.industry.id;
              this.industryData.name = res.data.industry.name;
              this.industryData.status = res.data.industry.status;
            })
            .catch((error) => {
              console.log(error);
            })
            .finally(() => {
              this.getLoader = false;
            });
        } else if (dataClass === "delete-btn") {
          this.deleteIndustry(dataId);
        }
      });
    },

    // Questions Delete
    deleteIndustry(id) {
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
                `admin/contacts/industry-verticals/delete/${id}`,
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
            )
            .then((res) => {
              toastr.success(res.data.message);
              this.getIndustryData();
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
    industrySave() {
      this.getLoader = true;
      axios
        .post(
          this.globalVariables.apiUrl + "admin/contacts/industry-verticals/store",
          this.industryData,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          toastr.success(res.data.message);
          this.getIndustryData();

          // Reset form data and validation errors
          this.industryData = {
            name: "",
            status: "",
          };
          this.validationErrors = null;

          // Close the modal
          const modal = document.getElementById("industryInfoCreate");
          const bootstrapModal = bootstrap.Modal.getInstance(modal);
          if (bootstrapModal) {
            bootstrapModal.hide();
          }
        })
        .catch((error) => {
          if (
            error &&
            error.response &&
            error.response.data &&
            error.response.data.errors
          ) {
            this.validationErrors = error.response.data.errors;
          }
        })
        .finally(() => {
          this.getLoader = false;
        });
    },
    industryUpdate() {
      this.getLoader = true;
      axios
        .post(
          this.globalVariables.apiUrl +"admin/contacts/industry-verticals/update",this.industryData,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          toastr.success(res.data.message);
          this.getIndustryData();

          // Reset form data and validation errors
          this.industryData = {
            name: "",
            status: "",
          };
          this.validationErrors = null;

          // Close the modal
          const modal = document.getElementById("industryInfoEdit");
          const bootstrapModal = bootstrap.Modal.getInstance(modal);
          if (bootstrapModal) {
            bootstrapModal.hide();
          }
        })
        .catch((error) => {
          if (
            error &&
            error.response &&
            error.response.data &&
            error.response.data.errors
          ) {
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
#industrys_tables colgroup:nth-of-type(2) {
  display: none !important;
}
#industrys_tables .dt-checkboxes-cell {
  padding: 0.7rem 0.5rem !important;
}
</style>
