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
              <h5 class="card-title mt-2 mb-0">Links</h5>
            </div>
            <div class="card-body">
              <table class="align-middle mb-0 table table-hover" id="links-tables">
                <thead class="border-top">
                  <tr>
                    <th></th>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Categorie</th>
                    <th>Created By</th>
                    <th>Link</th>
                    <th>Status</th>
                    <th>Created At</th>
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
              <div class="col-12 mb-3">
                <label for="title" class="form-label required">Title</label>
                <input type="title" id="text" class="form-control" v-model="createLink.title" placeholder="Enter Your Title"/>
                <div v-if="validationErrors && validationErrors.title" class="text-danger">
                  {{ validationErrors.title[0] }}
                </div>
              </div>
              <div class="col-12 mb-3">
                <label for="date" class="form-label required">Date</label>
                <input type="date" id="date" class="form-control" v-model="createLink.date"/>
                <div v-if="validationErrors && validationErrors.date" class="text-danger">
                  {{ validationErrors.date[0] }}
                </div>
              </div>
              <div class="col-12 mb-3">
                <label for="nameBasic" class="form-label required">URL</label>
                <input type="text" id="type_name" class="form-control" v-model="createLink.url" placeholder="Enter valid url"/>
                <div v-if="validationErrors && validationErrors.url" class="text-danger">
                  {{ validationErrors.url[0] }}
                </div>
              </div>
              <div class="col-12 mb-3">
                <label for="select-category" class="form-label required">Select Category</label>
                <select class="form-select" id="select-category" v-model="createLink.category_id">
                  <template v-if="categoryOffers.length > 0">
                    <option value="0">Select Category</option>
                    <template v-for="(category,index) in categoryOffers" :key="index">
                      <option :value="category.id">{{ category.name ?? '' }}</option>
                    </template>
                  </template>
                  <template v-else>
                    <option class="text-danger" disabled>Category Not found</option>
                  </template>
                </select>
                <div v-if="validationErrors && validationErrors.category_id" class="text-danger">
                  {{ validationErrors.category_id[0] }}
                </div>
              </div>
              <div class="col-12 mb-3">
                <label for="status" class="form-label required">Status</label>
                <select v-model="createLink.status" id="status" class="form-select">
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
                <div v-if="validationErrors && validationErrors.status" class="text-danger">
                  {{ validationErrors.status[0] }}
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
              <div class="col-12 mb-3">
                <label for="title" class="form-label required">Title</label>
                <input type="title" id="text" class="form-control" v-model="createLink.title" placeholder="Enter Your Title"/>
                <div v-if="validationErrors && validationErrors.title" class="text-danger">
                  {{ validationErrors.title[0] }}
                </div>
              </div>
              <div class="col-12 mb-3">
                <label for="date" class="form-label required">Date</label>
                <input type="date" id="date" class="form-control" v-model="createLink.date"/>
                <div v-if="validationErrors && validationErrors.date" class="text-danger">
                  {{ validationErrors.date[0] }}
                </div>
              </div>
              <div class="col-12 mb-3">
                <label for="nameBasic" class="form-label required">URL</label>
                <input type="text" id="type_name" class="form-control" v-model="createLink.url" placeholder="Enter valid url"/>
                <div v-if="validationErrors && validationErrors.url" class="text-danger">
                  {{ validationErrors.url[0] }}
                </div>
              </div>
              <div class="col-12 mb-3">
                <label for="select-category" class="form-label required">Select Category</label>
                <select class="form-select" id="select-category" v-model="createLink.category_id">
                  <template v-if="categoryOffers.length > 0">
                    <option value="0">Select Category</option>
                    <template v-for="(category,index) in categoryOffers" :key="index">
                      <option :value="category.id">{{ category.name ?? '' }}</option>
                    </template>
                  </template>
                  <template v-else>
                    <option class="text-danger" disabled>Category Not found</option>
                  </template>
                </select>
                <div v-if="validationErrors && validationErrors.category_id" class="text-danger">
                  {{ validationErrors.category_id[0] }}
                </div>
              </div>
              <div class="col-12 mb-3">
                <label for="status" class="form-label required">Status</label>
                <select v-model="createLink.status" id="status" class="form-select">
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
                <div v-if="validationErrors && validationErrors.status" class="text-danger">
                  {{ validationErrors.status[0] }}
                </div>
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
import moment from "moment";

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
        id : null,
        date : "",
        url : "",
        title : "",
        category_id : "0",
        status : "1",
      },
      bulkactionids : {
        selectedIds: [],
      },
      categoryOffers : [],
      validationErrors: null,
    };
  },
  async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role == 'Super' || role == 'Admin') {
          this.getOffersLinks();
          this.getcategories();
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
    getcategories() {
      this.getLoader = true,
      axios
        .get(this.globalVariables.apiUrl+"admin/offers/categories", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          this.categoryOffers = res?.data?.categoryOffers;
          this.getLoader = false;
        })
        .catch((e) => {
          return e;
        })
        .finally(() => {
            this.getLoader = false;
        });
    },
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
          var formateDate = this.formatDates;
          $("#links-tables").DataTable({
            data: res.data.data,
            columns: [
              { data: "id" },
              {
                data: "title",
                render: function (data, type, row) {
                  if(row?.title != null){
                    return row?.title;
                  }else{
                    return '-----';
                  }
                },
              },
              {
                data: "date",
                render: function(data) {
                  if (!data) return '-----';

                  const date = new Date(data);
                  const options = { day: '2-digit', month: 'short', year: 'numeric' };
                  return date.toLocaleDateString('en-GB', options);
                }
              },
              {
                data: "category",
                render: function (data, type, row) {
                  if(row?.category != null){
                    return row?.category?.name;
                  }else{
                    return '-----';
                  }
                },
              },
              {
                data: "user_id",
                render: function (data, type, row) {
                  if(row?.user?.fname != null){
                    return row?.user?.fname;
                  }else{
                    return '-----';
                  }
                },
              },
              { data: "url" },
              {
                data: "status",
                render: function (data, type, row) {
                  if(row?.status == '1'){
                    return '<span class="badge bg-success">Active</span>';
                  }else{
                    return '<span class="badge bg-warning">Inactive</span>';
                  }
                },
              },
              {
                data: "created_at",
                render: function (data, type, row) {
                  if (row.created_at != null) {
                    return formateDate(row.created_at);
                  }
                  return "--------";
                },
              },
              {
                data: "pay_out",
                render: function (data, type, row) {
                  return (
                    '<div class="text-end links-datatables-action">' +
                    "<button title='Edit' data-id=" +
                    row.id +
                    ' class="rounded-circle bg-transparent border-0 text-primary me-2" data-bs-toggle="modal" data-bs-target="#OfferLinkEdit">' +
                    '<i class="far fa-edit fa-sm" data-id=' +
                    row.id +
                    "></i></button>" +
                    '<button title="Delete" type="button"  data-id=' +
                    row.id +
                    ' class="type-delete-btn border-0 rounded-circle bg-transparent border-0 text-danger">' +
                    '<i  data-id="' +
                    row.id +
                    '" class="far fa-trash-alt fa-sm"></i></button></div>'
                  );
                },
              },
            ],
            initComplete: () => {
              $('#links-tables').wrap('<div class="commonDataTablesClass"></div>');
              const table = $("#links-tables").DataTable();
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
                 $('.select-colunm-position').on('click', function (e) {
                  e.stopPropagation();
                });

                $('.select-colunm-position .dropdown-item').on('click', function (e) {
                  e.stopPropagation();
                });
              this.attachEventListeners();
              this.attachEventListenersBlulkAction();
              this.attachEventListenersBlulkActionSubmit();
              
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
              searchPlaceholder: "Search Url",
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
              extend: 'collection',
              className: 'btn btn-label-primary dropdown-toggle me-3',
              text: '<i class="ti ti-screen-share me-1 ti-xs"></i>Export',
              buttons: [
                {
                  extend: 'print',
                  text: '<i class="ti ti-printer me-1 ti-xs text-primary"></i>Print',
                  className: 'dropdown-item',
                  exportOptions: { columns: [1,2, 3, 4, 5, 6, 7] }
                },
                {
                  extend: 'csv',
                  text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                  className: 'dropdown-item',
                  exportOptions: { columns: [1,2, 3, 4, 5, 6, 7] }
                },
                {
                  extend: 'excel',
                  text: '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                  className: 'dropdown-item',
                  exportOptions: { columns: [1,2, 3, 4, 5, 6, 7] }
                },
                {
                  extend: 'pdf',
                  text: '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                  className: 'dropdown-item',
                  exportOptions: { columns: [1,2, 3, 4, 5, 6, 7] }
                },
                {
                  extend: 'copy',
                  text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                  className: 'dropdown-item',
                  exportOptions: { columns: [1,2, 3, 4, 5, 6, 7] }
                }
              ]
            },
              {
                text:
                  '<span data-bs-toggle="modal" data-bs-target="#LinkCreate"><i class="ti ti-plus me-1 ti-xs"></i>Create Link</span>',
                className: "create-new btn btn-primary me-2",
              },
              {
                  className: "btn btn-primary",
                  text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Bulk Delete</a></li><li><a class="dropdown-item" href="#" data-column="1">Title</a></li><li><a class="dropdown-item" href="#" data-column="2">Date</a></li><li><a class="dropdown-item" href="#" data-column="3">Categorie</a></li><li><a class="dropdown-item" href="#" data-column="4">Created By</a></li><li><a class="dropdown-item" href="#" data-column="5">Link</a></li><li><a class="dropdown-item" href="#" data-column="6">Status</a></li><li><a class="dropdown-item" href="#" data-column="7">Created At</a></li><li><a class="dropdown-item" href="#" data-column="8">Action</a></li></div></ul></div>',
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

    formatDates(date) {
      return moment(date).format('D MMMM YYYY');
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
              this.createLink.id = res?.data?.data?.id;
              this.createLink.title = res?.data?.data?.title;
              this.createLink.url = res?.data?.data?.url;
              if(res?.data?.data?.date != null){
                this.createLink.date = res?.data?.data?.date.split(' ')[0];
              }else{
                this.createLink.date = null;
              }
              this.createLink.category_id = res?.data?.data?.category_id;
              this.createLink.status = res?.data?.data?.status;
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

    attachEventListenersBlulkAction() {
      $('#links-tables').on('change', '.row-checkbox', (event) => {
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

      $('#links-tables thead').on('change', 'input[type="checkbox"]', (event) => {
        const isChecked = event.target.checked;
        $('#links-tables tbody .row-checkbox').each((index, checkbox) => {
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
                this.globalVariables.apiUrl + "admin/offerlink/bulk/delete",
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
                  this.getOffersLinks();
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
          this.createLink.date = null;
          this.createLink.category_id = "";
          this.createLink.title = "";
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
