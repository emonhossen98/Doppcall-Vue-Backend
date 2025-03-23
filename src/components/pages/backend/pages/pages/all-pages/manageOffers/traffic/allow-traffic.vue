<template>
  <div v-if="getLoader">
    <Loader></Loader>
  </div>
  <!-- Content wrapper -->
  <div class="content-wrapper">
    <!-- Content -->
    <!-- {{ allowtraffice }} -->
    <div class="container-xxl flex-grow-1 container-p-y">
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
    <div class="modal fade" id="TrafficInfoCreate" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog" role="document">
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
                    selectAllRender:
                      '<input type="checkbox" class="form-check-input ms-1">',
                  },
                  render: function () {
                    return '<input type="checkbox" class="dt-checkboxes form-check-input ms-1" >';
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
                      '<div class="text-end allow-datatables-action"><button data-id=' +
                      full.id +
                      ' id="edit" data-bs-toggle="modal" data-bs-target="#TrafficInfoEdit" class="rounded-circle btn-style-edit"><i id="edit" class="far fa-edit fa-sm" data-id=' +
                      full.id +
                      '></i></button><button type="button"  id="delete" data-id=' +
                      full.id +
                      ' class="type-delete-btn border-0 rounded-circle btn-style-danger"><i id="delete"  data-id="' +
                      full.id +
                      ' " class="far fa-trash-alt fa-sm"></i></button></div>'
                    );
                  },
                },
              ],
              order: [[2, "asc"]],
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
                  text:
                    '<span data-bs-toggle="modal" data-bs-target="#TrafficInfoCreate"><i class="ti ti-plus me-1 ti-xs"></i>Allow Traffic</span>',
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
