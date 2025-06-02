<template>
  <div v-if="getLoader">
    <Loader></Loader>
  </div>
  <!-- Content wrapper -->
  <div class="content-wrapper">
    <!-- Content -->
    <!-- {{ allowtraffice }} -->
    <div class="container-fluid flex-grow-1 container-p-y">
      <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
      <div class="row mt-4">
        <div class="col-12">
          <div class="card">
            <div class="card-header pt-2 pb-0">
              <h5 class="card-title mb mt-2">Allow Traffic</h5>
            </div> 
            <div class="card-datatable table-responsive table-overflow-hidden" >
              <table class="align-middle mb-0 table table-hover" id="allow_tables">
                <thead class="border-top">
                  <tr>
                    <!-- <th></th> -->
                    <th></th>
                    <th>Name</th>
                    <th>ID</th>
                    <th class="text-end"  id="action-incompleted">Action</th>
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
    <div class="modal fade" id="TrafficInfoCreate" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel1">Create Allow Traffic</h5>
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
                  v-model="offersTrafficCreate.name"
                  class="form-control"
                  placeholder="Enter Traffic Name !"
                />
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
            <button type="button" @click="typeCreate" class="btn btn-primary">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Edit -->
    <div class="modal fade" id="TrafficInfoEdit" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel1">Edit Allow Traffic</h5>
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
                  v-model="offersTrafficCreate.name"
                  id="name"
                  class="form-control"
                  placeholder="Enter Traffic Name !"
                />
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
      offersTrafficCreate: {
        name: "",
      },
      allowtraffice: "",
      getLoader: false,
      breadcrumbs: [
        { label: "Dashboard", url: "/dashboard" },
        { label: "Allow Traffic", url: "" },
      ],
      bulkactionids : {
        selectedIds: [],
      },
      validationErrors: null,
    };
  },
  async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role == 'Super' || role == 'Admin') {
          this.getallowtraffice();
          this.$nextTick(() => {
            const dataTableWrapper = document.querySelectorAll(
              "#allow_tables_wrapper .row.mx-2"
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
    getallowtraffice() {
      (this.getLoader = true),
        axios
          .get(this.globalVariables.apiUrl + "admin/allow-traffic", {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          })
          .then((res) => {
            if ($.fn.DataTable.isDataTable("#allow_tables")) {
              $("#allow_tables").DataTable().destroy();
            }
            var table = $("#allow_tables").DataTable({
              data: res.data.getData,
              columns: [
                // { data: 'id' },
                // { data: 'id' },
                { data: "id" },
                { data: "title" },
                { data: "id" },
                { data: "" },
              ],
              initComplete: () => {
                const table = $("#allow_tables").DataTable();
                const dropdownItems = document.querySelectorAll('.dropdown-menu .dropdown-item');

                dropdownItems.forEach((item) => {
                  const columnAttr = item.getAttribute("data-column"); 
                  if (columnAttr === "all") {
                    item.addEventListener("click", function (e) {
                      e.preventDefault();
                      table.columns().visible(true);
                      dropdownItems.forEach((el) => {
                        if (el.getAttribute("data-column") !== "all") {
                          el.classList.add("active");
                        }
                      });
                    });
                  } else {
                    const columnIndex = parseInt(columnAttr);
                    const column = table.column(columnIndex);
                    if (column.visible()) {
                      item.classList.add("active");
                    }

                    item.addEventListener("click", function (e) {
                      e.preventDefault();

                      const currentVisible = column.visible();
                      column.visible(!currentVisible);

                      if (!currentVisible) {
                        item.classList.add("active");
                      } else {
                        item.classList.remove("active");
                      }
                    });
                  }
                });
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
                      '<div class="text-end allow-datatables-action"><button title="Edit" data-id=' +
                      full.id +
                      ' id="edit" data-bs-toggle="modal" data-bs-target="#TrafficInfoEdit" class="rounded-circle bg-transparent border-0 text-primary me-2"><i id="edit" class="far fa-edit fa-sm" data-id=' +
                      full.id +
                      '></i></button><button type="button"  title="Delete" id="delete" data-id=' +
                      full.id +
                      ' class="type-delete-btn border-0 rounded-circle bg-transparent border-0 text-danger"><i id="delete"  data-id="' +
                      full.id +
                      ' " class="far fa-trash-alt fa-sm"></i></button></div>'
                    );
                  },
                },
              ],
              order: [[3, "asc"]],
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
                searchPlaceholder: "Search Traffic",
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
                    </select>
                  </div>
                `,
                className: "me-2 p-0 btn-primary d-none",
                attr: { id: "bulk-action-container" },
              },
              {
                text:
                  '<span data-bs-toggle="modal" data-bs-target="#TrafficInfoCreate"><i class="ti ti-plus me-1 ti-xs"></i>Allow Traffic</span>',
                className: "create-new btn btn-primary me-2",
              },
              {
                  className: "btn btn-primary",
                  text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><li><a class="dropdown-item" href="#" data-column="all">All</a></li><li><a class="dropdown-item" href="#" data-column="0">SL</a></li><li><a class="dropdown-item" href="#" data-column="1">Name</a></li><li><a class="dropdown-item" href="#" data-column="2">ID</a></li><li><a class="dropdown-item" href="#" data-column="3">Action</a></li></ul></div>',
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
      $("#allow_tables").on("click", ".allow-datatables-action", (event) => {
        const target = $(event.target);
        const dataId = target.data("id");
        const dataClass = target.attr("id");

        if (dataClass === "edit") {
          (this.getLoader = true),
            axios
              .get(this.globalVariables.apiUrl + `admin/allow-traffic/edit/${dataId}`, {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") },
              })
              .then((res) => {
                this.offersTrafficCreate.name = res.data.allowTrafic.title;
                this.offersTrafficCreate.id = res.data.allowTrafic.id;
              })
              .catch((e) => {
                return e;
              })
              .finally(() => {
                this.getLoader = false;
              });
        } else if (dataClass === "delete") {
          this.delteOffersAllowTraffice(dataId);
        }
      });
    },

    attachEventListenersOfButton() {
      $("#allow_tables_wrapper").on("click", "button", (event) => {
        const target = $(event.target);
        const dataClass = target.attr("id");
        if (dataClass === "create") {
          this.$router.push("/admin-allow-traffic-create");
        }
      });
    },

    attachEventListenersBlulkAction() {
      $('#allow_tables').on('change', '.row-checkbox', (event) => {
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

      $('#allow_tables thead').on('change', 'input[type="checkbox"]', (event) => {
        const isChecked = event.target.checked;
        $('#allow_tables tbody .row-checkbox').each((index, checkbox) => {
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
                this.globalVariables.apiUrl + "admin/allow-traffic/bulk/delete",
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
                  this.getallowtraffice();
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

    // Delete Allow Tarffice
    delteOffersAllowTraffice(id) {
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
              .delete(this.globalVariables.apiUrl + `admin/allow-traffic/delete/${id}`, {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              })
              .then((res) => {
                toastr.success(res.data.message);
                this.getallowtraffice();
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
        .post(
          this.globalVariables.apiUrl + "admin/allow-traffic/store",
          this.offersTrafficCreate,
          {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          }
        )
        .then((res) => {
          toastr.success(res.data.message);
          this.getallowtraffice();

          // Reset form data and validation errors
          this.offersTrafficCreate = {
            name: "",
          };
          this.validationErrors = null;

          // Close the modal
          const modal = document.getElementById("TrafficInfoCreate");
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
      if (!this.offersTrafficCreate.id) {
        toastr.error("No type selected for update.");
        return;
      }
      this.getLoader = true;
      axios
      .post(this.globalVariables.apiUrl+`admin/allow-traffic/update/${this.offersTrafficCreate.id}`, this.offersTrafficCreate, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
        .then((res) => {
          toastr.success(res.data.message);
          this.getallowtraffice();

          // Reset form data and validation errors
          this.offersTrafficCreate = {
            id: null,
            name: "",
          };
          this.validationErrors = null;

          const modal = document.getElementById("TrafficInfoEdit");
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
#allow_tables colgroup:nth-of-type(2) {
  display: none !important;
}
#btn-style-edit {
  background: rgba(55, 125, 255, 0.15) !important;
  color: #377dff !important;
  padding: 7px 9px !important;
  border-radius: 50% !important;
  border: none !important;
  margin-right: 5px;
}
</style>
