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
              <h5 class="card-title mt-2 mb-0">Links</h5>
            </div>
            <div class="card-datatable table-responsive table-overflow-hidden">
              <table class="align-middle mb-0 table table-hover" id="links-tables">
                <thead class="border-top">
                  <tr>
                    <th></th>
                    <!-- <th>SL</th> -->
                    <th>Link</th>
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
    <div class="modal fade" id="LinkCreate" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel1">Create Link</h5>
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
                <label for="nameBasic" class="form-label">URL</label>
                <input
                  type="text"
                  id="type_name"
                  class="form-control"
                  v-model="createLink.url"
                  placeholder="Enter valid url"
                />
                <div
                  v-if="validationErrors && validationErrors.url"
                  class="text-danger"
                >
                  {{ validationErrors.url[0] }}
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button type="button" @click="LinkCreate()" class="btn btn-primary">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Edit -->
    <div class="modal fade" id="OfferLinkEdit" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel1">Edit Link</h5>
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
                <label for="nameBasic" class="form-label">URL</label>
                <input
                  type="text"
                  id="type_name"
                  class="form-control"
                  v-model="createLink.url"
                  placeholder="Enter Valid Url"
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button type="button" @click="LinkUpdate()" class="btn btn-primary">
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
        { label: "Links", url: "" },
      ],
      createLink: {
        id: null, 
        url: "",
      },
      validationErrors: null,
    };
  },
  async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role == 'Super' || role == 'Admin') {
          this.getOffersLinks();
          this.$nextTick(() => {
            const dataTableWrapper = document.querySelectorAll(
              "#links-tables_wrapper .row.mx-2"
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
    getOffersLinks() {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl + "admin/offerlink/index", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          if ($.fn.DataTable.isDataTable("#links-tables")) {
            $("#links-tables").DataTable().destroy();
          }
          $("#links-tables").DataTable({
            data: res.data.data,
            columns: [
              { data: "id" },
              // { data: "id" },
              { data: "url" },
              {
                data: "pay_out",
                render: function (data, type, row) {
                  return (
                    '<div class="text-end links-datatables-action">' +
                    "<button data-id=" +
                    row.id +
                    ' class="rounded-circle btn-style-edit" data-bs-toggle="modal" data-bs-target="#OfferLinkEdit">' +
                    '<i class="far fa-edit fa-sm" data-id=' +
                    row.id +
                    "></i></button>" +
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
              searchPlaceholder: "Search Url",
              paginate: {
                previous: '<i class="fa-solid fa-chevron-left"></i>',
                next: '<i class="fa-solid fa-chevron-right"></i>',
              },
            },
            buttons: [
              {
                text:
                  '<span data-bs-toggle="modal" data-bs-target="#LinkCreate"><i class="ti ti-plus me-1 ti-xs"></i>Create Link</span>',
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
      $("#links-tables").on("click", ".links-datatables-action", (event) => {
        const target = $(event.target);
        const dataId = target.data("id");
        const dataClass = target.attr("class");

        if (
          dataClass === "rounded-circle btn-style-edit" ||
          dataClass === "far fa-edit fa-sm"
        ) {
          this.getLoader = true;
          axios
            .get(this.globalVariables.apiUrl + `admin/offerlink/edit/${dataId}`, {
              headers: { Authorization: "Bearer " + localStorage.getItem("token") },
            })
            .then((res) => {
              this.createLink.id = res.data.data.id;
              this.createLink.url = res.data.data.url;
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
                .delete(
                  this.globalVariables.apiUrl + `admin/offerlink/destroy/${dataId}`,
                  {
                    headers: {
                      Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                  }
                )
                .then((res) => {
                  toastr.success(res.data.message);
                  this.getOffersLinks();
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

    LinkCreate() {
      this.getLoader = true;
      axios
        .post(this.globalVariables.apiUrl + "admin/offerlink/store", this.createLink, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          const modal = document.getElementById("LinkCreate");
          const bootstrapModal = bootstrap.Modal.getInstance(modal);
          if (bootstrapModal) {
            bootstrapModal.hide();
          }
          toastr.success(res.data.message);
          this.getOffersLinks();
          this.createLink.url = "";
          this.createLink.id = "";
          this.validationErrors = null;
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

    LinkUpdate() {
      this.getLoader = true;
      axios
        .post(
          this.globalVariables.apiUrl + `admin/offerlink/update/${this.createLink.id}`,
          this.createLink,
          {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          }
        )
        .then((res) => {
          const modal = document.getElementById("OfferLinkEdit");
          const bootstrapModal = bootstrap.Modal.getInstance(modal);
          if (bootstrapModal) {
            bootstrapModal.hide();
          }
          toastr.success(res.data.message);
          this.getOffersLinks();
          this.createLink.id = "";
          this.createLink.url = "";
          this.validationErrors = null;
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
#links-tables_wrapper #links-tables_wrapper .row.mx-2 {
    display: none !important;
  }
#links-tables colgroup:nth-of-type(2) {
  display: none !important;
}
</style>
