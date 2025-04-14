<template>
  <div v-if="getLoader">
    <Loader></Loader>
  </div>
  <!-- Content wrapper -->
  <div class="content-wrapper">
    <!-- {{ callmarketing }}  -->
    <!-- Content -->
    <div class="container-xxl flex-grow-1 container-p-y">
      <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
      <div class="row mt-4">
        <div class="col-12">
          <div class="card">
            <div class="card-header pt-2">
              <h5
                class="card-title d-flex justify-content-between align-items-center mb-0 mt-2 ms-1"
              >
                Call Marketing List
              </h5>
            </div>
            <div class="card-body table-responsive table-overflow-hidden">
              <table
                class="align-middle mb-0 table table-hover"
                id="call_marketing_tables"
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
    <div class="modal fade" id="callInfoCreate" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel1">Create Call Marketing</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-3">
                <label for="call_marketing_title" class="required"
                  >Call Marketing Title</label
                >
              </div>
              <div class="col-sm-9">
                <input
                  type="text"
                  required
                  v-model="callMarketingCreate.call_marketing_title"
                  id="call_marketing_title"
                  class="form-control"
                />
                <div
                  v-if="validationErrors && validationErrors.call_marketing_title"
                  class="text-danger"
                >
                  {{ validationErrors.call_marketing_title[0] }}
                </div>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-sm-3">
                <label for="call_marketing_description" class="required"
                  >Call Marketing Description</label
                >
              </div>
              <div class="col-sm-9">
                <input
                  type="text"
                  required
                  v-model="callMarketingCreate.call_marketing_description"
                  id="call_marketing_description"
                  class="form-control"
                />
                <div
                  v-if="validationErrors && validationErrors.call_marketing_description"
                  class="text-danger"
                >
                  {{ validationErrors.call_marketing_description[0] }}
                </div>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-sm-3">
                <label for="status" class="required">Status</label>
              </div>
              <div class="col-sm-9">
                <select
                  id="status"
                  v-model="callMarketingCreate.status"
                  class="form-select"
                >
                  <option value="">Select Status</option>
                  <option value="1">Publish</option>
                  <option value="0">Pending</option>
                </select>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-sm-3">
                <label for="image" class="required">Image</label>
              </div>
              <div class="row col-sm-9">
                <div class="col-sm-6">
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
                    v-if="callMarketingShowImage.image"
                    :src="callMarketingShowImage.image"
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
            <button type="button" @click="callCreate()" class="btn btn-primary">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Edit -->
    <div class="modal fade" id="callInfoEdit" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel1">Edit Call Marketing</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-3">
                <label for="call_marketing_title" class="required"
                  >Call Marketing Title</label
                >
              </div>
              <div class="col-sm-9">
                <input
                  type="text"
                  required
                  v-model="callMarketingUpdate.call_marketing_title"
                  id="call_marketing_title"
                  class="form-control"
                />
                <div
                  v-if="validationErrors && validationErrors.call_marketing_title"
                  class="text-danger"
                >
                  {{ validationErrors.call_marketing_title[0] }}
                </div>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-sm-3">
                <label for="call_marketing_description" class="required"
                  >Call Marketing Description</label
                >
              </div>
              <div class="col-sm-9">
                <input
                  type="text"
                  required
                  v-model="callMarketingUpdate.call_marketing_description"
                  id="call_marketing_description"
                  class="form-control"
                />
                <div
                  v-if="validationErrors && validationErrors.call_marketing_description"
                  class="text-danger"
                >
                  {{ validationErrors.call_marketing_description[0] }}
                </div>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-sm-3">
                <label for="status" class="required">Status</label>
              </div>
              <div class="col-sm-9">
                <select
                  id="status"
                  v-model="callMarketingUpdate.status"
                  class="form-select"
                >
                  <option value="">Select Status</option>
                  <option value="1">Publish</option>
                  <option value="0">Pending</option>
                </select>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-sm-3">
                <label for="image" class="required">Image</label>
              </div>
              <div class="row col-sm-9">
                <div class="col-sm-6">
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
                <div class="col-sm-6">
                  <img
                    v-if="callMarketingShowImage.image"
                    :src="callMarketingShowImage.image"
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
              @click="CallUpdate()"
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
        { label: "Call Marketing", url: "" },
      ],
      callMarketingCreate: {
        call_marketing_title: "",
        call_marketing_description: "",
        status: "",
        image: null,
      },
      callMarketingShowImage: {
        image: null,
      },
      bulkactionids : {
        selectedIds: [],
        status: "",
      },
      callMarketingUpdate: {
          call_marketing_title: "",
          call_marketing_description: "",
          status: "",
          image: null,
        },
        callMarketingShowImage : {
          image: null,
        },
    };
  },
  async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role == 'Super' || role == 'Admin') {
          this.getCallMarketing();
          this.$nextTick(() => {
            const dataTableWrapper = document.querySelectorAll(
              "#call_marketing_tables_wrapper .row.mx-2"
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
    getCallMarketing() {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl + "admin/about/call-marketing", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          if ($.fn.DataTable.isDataTable("#call_marketing_tables")) {
            $("#call_marketing_tables").DataTable().destroy();
          }
          // Initialize DataTable and store the instance in a variable
          var table = $("#call_marketing_tables").DataTable({
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
                    '<div class="text-end call-marketing-action"><button title="Edit" data-bs-toggle="modal" data-bs-target="#callInfoEdit" data-id="' +
                    full.id +
                    '" class="rounded-circle bg-transparent border-0 text-primary"><i class="far fa-edit fa-sm" data-id="' +
                    full.id +
                    '"></i></button><button type="button" title="Delete" data-id=' +
                    full.id +
                    ' class="call_marketing_delete_btn border-0 rounded-circle bg-transparent border-0 text-danger"><i  data-id="' +
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
              searchPlaceholder: "Search Call Marketing",
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
                      <option value="1">Bulk Approved</option>
                    </select>
                  </div>
                `,
                className: "me-2 p-0 btn-primary d-none",
                attr: { id: "bulk-action-container" },
              },
              {
                text:
                  '<span data-bs-toggle="modal" data-bs-target="#callInfoCreate"><i class="ti ti-plus me-1 ti-xs"></i>New Call Marketing</span>',
                className: "create-new btn btn-primary",
               
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
      $("#call_marketing_tables").on("click", ".call-marketing-action", (event) => {
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
            this.globalVariables.apiUrl+`admin/about/call-marketing/edit/${dataId}`, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
              },
            }
          )
          .then((res) => {
            this.callMarketingUpdate.id = res.data.call_merketing.id;
            this.callMarketingUpdate.call_marketing_title = res.data.call_merketing.title;
            this.callMarketingUpdate.call_marketing_description = res.data.call_merketing.description;
            this.callMarketingUpdate.status = res.data.call_merketing.status;
            this.callMarketingShowImage.image = this.globalVariables.appUrl+res.data.call_merketing.image;
          })
          .catch((error) => {
            return error;
          })
          .finally(() => {
            this.getLoader = false;
        });
        } else if (
          dataClass ===
            "call_marketing_delete_btn border-0 rounded-circle btn-style-danger" ||
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
                    `admin/about/call-marketing/delete/${dataId}`,
                  {
                    headers: {
                      Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                  }
                )
                .then((res) => {
                  toastr.success(res.data.message);
                  this.getCallMarketing();
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

    attachEventListenersBlulkAction() {
      $('#call_marketing_tables').on('change', '.row-checkbox', (event) => {
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
      $('#call_marketing_tables thead').on('change', 'input[type="checkbox"]', (event) => {
        const isChecked = event.target.checked;
        $('#call_marketing_tables tbody .row-checkbox').each((index, checkbox) => {
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
            const alertTitle = "Call Marketing Want to Approved";
            this.bulkStatusChange(alertTitle);
          } else{
            this.bulkactionids.status = '0';
            const alertTitle = "Call Marketing Want to Pending";
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
                this.globalVariables.apiUrl + "admin/about/call-marketing/bulk/delete",
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
                  this.getCallMarketing();
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
                this.globalVariables.apiUrl + "admin/about/call-marketing/bulk/status",
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
                  this.getCallMarketing();
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

    callCreate() {
      this.getLoader = true;
      axios
        .post(
          this.globalVariables.apiUrl+"admin/about/call-marketing/store",
          this.callMarketingCreate,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          toastr.success(res.data.message);
          this.getCallMarketing();

          this.callMarketingCreate = {
            call_marketing_title: "",
            call_marketing_description: "",
            status: "",
            image: null,
          };
          this.validationErrors = null;
          this.callMarketingShowImage = {
            image: null,
          };
          // Close the modal
          const modal = document.getElementById("callInfoCreate");
          const bootstrapModal = bootstrap.Modal.getInstance(modal);
          if (bootstrapModal) {
            bootstrapModal.hide();
          }
        })
        .catch((error) => {
          return error;
        })
        .finally(() => {
          this.getLoader = false;
      });
    },
    CallUpdate() {
        this.getLoader = true;
        axios
          .post(
            this.globalVariables.apiUrl+`admin/about/call-marketing/update/${this.callMarketingUpdate.id}`,
            this.callMarketingUpdate,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((res) => {
            toastr.success(res.data.message);
            this.getCallMarketing();
            // Reset form data and validation errors
          this.callMarketingUpdate = {
            call_marketing_title: "",
            call_marketing_description: "",
            status: "",
            image: null,
          };
          this.validationErrors = null;
          this.callMarketingShowImage = {
            image: null,
          };
          // Close the modal
          const modal = document.getElementById("callInfoEdit");
          const bootstrapModal = bootstrap.Modal.getInstance(modal);
          if (bootstrapModal) {
            bootstrapModal.hide();
          }
          })
          .catch((error) => {
            return error;
          })
          .finally(() => {
            this.getLoader = false;
        });
      },

    primaryLogo(event) {
        const file = event.target.files[0];
        this.callMarketingCreate.image = file;
        if (!file || file.type.indexOf('image/') === -1) return;
        const reader = new FileReader();
        reader.onload = () => {
          this.callMarketingShowImage.image = reader.result;
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
#call_marketing_tables colgroup:nth-of-type(2) {
  display: none !important;
}
#call_marketing_tables .dt-checkboxes-cell {
  padding: 0.7rem 0.5rem !important;
}
.imgpreview{
  width: 150px;
}
</style>
