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
            <div
              class="card-header py-2 d-flex justify-content-between align-items-center"
            >
              <h5 class="card-title mb-0 mt-2">Subject</h5>
            </div>
            <div class="card-body table-responsive table-overflow-hidden">
              <table
                class="align-middle mb-0 table table-hover"
                id="ticket_subject_datatables"
              >
                <thead>
                  <tr>
                    <!-- <th></th> -->
                    <th></th>
                    <th>SL</th>
                    <th>Name</th>
                    <th>Status</th>
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

    <!-- Modal Create -->
    <div class="modal fade" id="SubjectInfoCreate" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel1">New Subject Create</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="form-group mt-3">
                <label for="subject_name" class="required mb-1">Subject Name</label>
                <input
                  type="text"
                  v-model="subjectCreate.subject_name"
                  id="subject_name"
                  class="form-control"
                  required
                  placeholder="Enter Subject Name"
                />
                <div
                  v-if="validationErrors && validationErrors.subject_name"
                  class="text-danger"
                >
                  {{ validationErrors.subject_name[0] }}
                </div>
              </div>
              <div class="form-group">
                <div class="status_change mt-3">
                  <label class="switch">
                    <input
                      type="checkbox"
                      v-model="subjectCreate.status"
                      true-value="on"
                    />
                    <span class="slider"></span> </label
                  >Active Status
                </div>
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
            <button type="button" @click="subjectSave" class="btn btn-primary">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Edit -->
    <div class="modal fade" id="SubjectInfoEdit" tabindex="-1" aria-hidden="true">
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
              <div class="form-group mt-3">
                <label for="subject_name" class="required mb-1">Subject Name</label>
                <input
                  type="text"
                  v-model="subjectCreate.subject_name"
                  id="subject_name"
                  class="form-control"
                  required
                />
                <div
                  v-if="validationErrors && validationErrors.subject_name"
                  class="text-danger"
                >
                  {{ validationErrors.subject_name[0] }}
                </div>
              </div>
              <div class="form-group">
                <div class="status_change mt-3">
                  <label class="switch">
                    <input
                      type="checkbox"
                      v-model="subjectCreate.status"
                      true-value="1"
                      false-value="0"
                    />
                    <span class="slider"></span> </label
                  >Active Status
                </div>
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
            <button type="button" @click="subjectUpdate()" class="btn btn-primary">
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
      breadcrumbs: [
        { label: "Dashboard", url: "/dashboard" },
        { label: "Subjects", url: "" },
      ],
      getLoader: false,
      deleteSubject: {
        data: "",
      },
      statusChange: {
        data_id: "",
        status: "",
      },
      subjectCreate: {
        subject_name: "",
        status: false,
      },
      validationErrors: null,
    };
  },
  async mounted() { 
    try {
      const { role, isAuthorized } = await fetchUserRole();
      if (role == 'Super' || role == 'Admin') {
        this.getTicketsSubjects();
        this.$nextTick(() => {
          const dataTableWrapper = document.querySelectorAll(
            "#ticket_subject_datatables_wrapper .row.mx-2"
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
    getTicketsSubjects() {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl + "admin/tickets/subjects/get-data", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          if ($.fn.DataTable.isDataTable("#ticket_subject_datatables")) {
            $("#ticket_subject_datatables").DataTable().destroy();
          }
          var table = $("#ticket_subject_datatables").DataTable({
            data: res.data,
            columns: [
              // { data: 'id' },
              { data: "id" },
              { data: "id" },
              { data: "name" },
              { data: "convart_status" },
              {
                data: "updated_at",
                render: function (data, type, row) {
                  return (
                    '<div class="subject_action d-flex align-items-center"><button type="button" data-bs-toggle="modal" data-bs-target="#SubjectInfoEdit" class="rounded-circle btn-style-edit " data-id=' +
                    row.id +
                    '><i class="far fa-edit fa-sm" data-id=' +
                    row.id +
                    '></i></button><button type="button"  data-id=' +
                    row.id +
                    ' class="btn-style-danger"><i class="far fa-trash-alt fa-sm" data-id=' +
                    row.id +
                    "></i></button></div>"
                  );
                },
              },
            ],
            initComplete: () => {
              this.attachEventStatusChange();
              this.attachEventListeners();
              this.attachEventListenersOfButton();
            },
            columnDefs: [
              {
                targets: 0,
                orderable: false,
                checkboxes: {
                  selectAllRender: '<input type="checkbox" class="form-check-input">',
                },
                render: function () {
                  return '<input type="checkbox" class="dt-checkboxes form-check-input">';
                },
                searchable: false,
              },
            ],
            order: [[1, "asc"]],
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
              searchPlaceholder: "Search Subject",
              paginate: {
                previous: '<i class="fa-solid fa-chevron-left"></i>',
                next: '<i class="fa-solid fa-chevron-right"></i>',
              },
            },
            buttons: [
              {
                extend: "collection",
                className: "btn btn-label-primary dropdown-toggle me-3",
                text: '<i class="ti ti-screen-share me-1 ti-xs"></i>Export',
                buttons: [
                  {
                    extend: "print",
                    text: '<i class="ti ti-printer me-1 ti-xs"></i>Print',
                    className: "dropdown-item",
                    exportOptions: { columns: [2, 3] },
                  },
                  {
                    extend: "csv",
                    text: '<i class="ti ti-file me-1 ti-xs"></i>Csv',
                    className: "dropdown-item",
                    exportOptions: { columns: [2, 3] },
                  },
                  {
                    extend: "excel",
                    text: '<i class="ti ti-file-spreadsheet me-1 ti-xs"></i>Excel',
                    className: "dropdown-item",
                    exportOptions: { columns: [2, 3] },
                  },
                  {
                    extend: "pdf",
                    text: '<i class="ti ti-file-description me-1 ti-xs"></i>Pdf',
                    className: "dropdown-item",
                    exportOptions: { columns: [2, 3] },
                  },
                  {
                    extend: "copy",
                    text: '<i class="ti ti-copy me-1 ti-xs"></i>Copy',
                    className: "dropdown-item",
                    exportOptions: { columns: [2, 3] },
                  },
                ],
              },
              {
                text:
                  '<span data-bs-toggle="modal" data-bs-target="#SubjectInfoCreate"><i class="ti ti-plus me-1 ti-xs"></i>Create</span>',
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

    attachEventStatusChange() {
      $("#ticket_subject_datatables").on("click", ".status_change", (event) => {
        const target = $(event.target);
        const dataId = target.data("id");
        const dataStatus = target.prop("checked") == true ? 1 : 0;
        this.statusChange.data_id = dataId;
        this.statusChange.status = dataStatus;
        this.subjectStatusChange();
      });
    },

    // User Subject
    subjectStatusChange() {
      this.getLoader = true;
      axios
        .post(
          this.globalVariables.apiUrl + `admin/tickets/subjects/status`,
          this.statusChange,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          if (res.data.status == "success") {
            toastr.success(res.data.message);
            this.getTicketsSubjects();
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
    },

    attachEventListeners() {
      $("#ticket_subject_datatables").on("click", ".subject_action", (event) => {
        const target = $(event.target);
        const dataId = target.data("id");
        const dataClass = target.attr("class");
        if (
          dataClass === "btn-style-edit me-2 d-flex  align-items-center" ||
          dataClass === "far fa-edit fa-sm"
        ) {
          this.getLoader = true;
          axios
            .get(this.globalVariables.apiUrl + `admin/tickets/subjects/edit/${dataId}`, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((res) => {
              this.subjectCreate.id =
                res && res.data && res.data.subjectTicket && res.data.subjectTicket.id;
              this.subjectCreate.subject_name =
                res && res.data && res.data.subjectTicket && res.data.subjectTicket.name;
              if (
                res &&
                res.data &&
                res.data.subjectTicket &&
                res.data.subjectTicket &&
                res.data.subjectTicket.status == 1
              ) {
                this.subjectCreate.status = "1";
              } else {
                this.subjectCreate.status = "0";
              }
            })
            .catch((error) => {
              console.log(error);
            })
            .finally(() => {
              this.getLoader = false;
            });
        } else if (
          dataClass === "btn-style-danger" ||
          dataClass === "far fa-trash-alt fa-sm"
        ) {
          this.deleteSubject.data = dataId;
          this.delteSubject();
        }
      });
    },

    // User Subject
    delteSubject() {
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
            .post(
              this.globalVariables.apiUrl + `admin/tickets/subjects/delete`,
              this.deleteSubject,
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
            )
            .then((res) => {
              if (res.data.status == "success") {
                toastr.success(res.data.message);
                this.getTicketsSubjects();
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
    subjectSave() {
      this.getLoader = true;
      axios
        .post(
          this.globalVariables.apiUrl + "admin/tickets/subjects/store",
          this.subjectCreate,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          toastr.success(res.data.message);
          this.getTicketsSubjects();

          this.subjectCreate = {
            subject_name: "",
            status: false,
          };
          this.validationErrors = null;

          // Close the modal
          const modal = document.getElementById("SubjectInfoCreate");
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
    subjectUpdate() {
      this.getLoader = true;
      axios
        .post(
          this.globalVariables.apiUrl +
            `admin/tickets/subjects/update/${this.subjectCreate.id}`,
          this.subjectCreate,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          toastr.success(res.data.message);
          this.getTicketsSubjects();

          this.subjectCreate = {
            subject_name: "",
            status: false,
          };
          this.validationErrors = null;

          // Close the modal
          const modal = document.getElementById("SubjectInfoEdit");
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
#ticket_subject_datatables colgroup:nth-of-type(2) {
  display: none !important;
}
#ticket_subject_datatables .dt-checkboxes-cell {
  padding: 0.7rem 0.5rem !important;
}
.switch {
  position: relative;
  display: inline-block;
  width: 52px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 34px;
}

.slider::before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.2s;
  border-radius: 50%;
}
input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
