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
                <h5 class="card-title mt-2 mb-0">Questions</h5>
              </div>
              <div class="card-datatable table-responsive table-overflow-hidden">
                <table class="align-middle mb-0 table table-hover" id="questions-tables">
                  <thead class="border-top">
                    <tr>
                      <th></th>
                      <th>Title</th>
                      <th>Question</th>
                      <th>Created By</th>
                      <th>Status</th>
                      <th class="text-end" id="action-incompleted">Action</th>
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
      <div class="modal fade" id="offerQuestionCreate" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel1">Create Question</h5>
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
                  <input type="title" id="text" class="form-control" v-model="createquestion.title" placeholder="Enter Your Title"/>
                  <div v-if="validationErrors && validationErrors.title" class="text-danger">
                    {{ validationErrors.title[0] }}
                  </div>
                </div>
                <div class="col-12 mb-3">
                  <label for="nameBasic" class="form-label required">Question</label>
                  <textarea  v-model="createquestion.question" id="nameBasic"  placeholder="Enter your question" rows="7" class="form-control"></textarea>
                  <div v-if="validationErrors && validationErrors.question" class="text-danger">
                    {{ validationErrors.question[0] }}
                  </div>
                </div>
                <div class="col-12 mb-3">
                  <label for="status" class="form-label required">Status</label>
                  <select v-model="createquestion.status" id="status" class="form-select">
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
              <button type="button" @click="QuestionCreateSubmit()" class="btn btn-primary">
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Modal Edit -->
      <div class="modal fade" id="OfferQuestionEdit" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel1">Edit Question</h5>
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
                  <input type="title" id="text" class="form-control" v-model="createquestion.title" placeholder="Enter Your Title"/>
                  <div v-if="validationErrors && validationErrors.title" class="text-danger">
                    {{ validationErrors.title[0] }}
                  </div>
                </div>
                <div class="col-12 mb-3">
                  <label for="nameBasic" class="form-label required">Question</label>
                  <textarea  v-model="createquestion.question" id="nameBasic"  placeholder="Enter your question" rows="7" class="form-control"></textarea>
                  <div v-if="validationErrors && validationErrors.question" class="text-danger">
                    {{ validationErrors.question[0] }}
                  </div>
                </div>
                <div class="col-12 mb-3">
                  <label for="status" class="form-label required">Status</label>
                  <select v-model="createquestion.status" id="status" class="form-select">
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
              <button type="button" @click="QuestionUpdateSubmit()" class="btn btn-primary">
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
          { label: "Questions", url: "" },
        ],
        createquestion: {
          id : null,
          title : "",
          question : "",
          status : "1",
        },
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
            this.getOffersQuestion();
            this.$nextTick(() => {
              const dataTableWrapper = document.querySelectorAll(
                "#questions-tables_wrapper .row.mx-2"
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
      getOffersQuestion() {
        this.getLoader = true;
        axios
          .get(this.globalVariables.apiUrl + "admin/offer-question/index", {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          })
          .then((res) => {
            if ($.fn.DataTable.isDataTable("#questions-tables")) {
              $("#questions-tables").DataTable().destroy();
            }
            $("#questions-tables").DataTable({
              data: res.data.data,
              columns: [
                { data: "id" },
                {
                  data: "title",
                  render: function (data, type, row) {
                    if(row?.title != null){
                      return '<span title="'+row?.title+'">'+row?.title+'</span>';
                    }else{
                      return '-----';
                    }
                  },
                },
                {
                  data: "question",
                  render: function (data, type, row) {
                    if(row?.question != null){
                      return '<span title="'+row?.question+'">'+row?.question+'</span>';
                    }else{
                      return '-----';
                    }
                  },
                },
                {
                  data: "user_id",
                  render: function (data, type, row) {
                    if(row?.user?.fname != null){
                      return  '<span title="'+row?.user?.fname+'">'+row?.user?.fname+'</span>';
                    }else{
                      return '-----';
                    }
                  },
                },
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
                  data: "pay_out",
                  render: function (data, type, row) {
                    return (
                      '<div class="text-end questions-datatables-action">' +
                      "<button title='Edit' data-id=" +
                      row.id +
                      ' class="rounded-circle bg-transparent border-0 text-primary me-2" data-bs-toggle="modal" data-bs-target="#OfferQuestionEdit">' +
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
                    exportOptions: { columns: [1,2, 3, 4] }
                  },
                  {
                    extend: 'csv',
                    text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                    className: 'dropdown-item',
                    exportOptions: { columns: [1,2, 3, 4] }
                  },
                  {
                    extend: 'excel',
                    text: '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                    className: 'dropdown-item',
                    exportOptions: { columns: [1,2, 3, 4] }
                  },
                  {
                    extend: 'pdf',
                    text: '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                    className: 'dropdown-item',
                    exportOptions: { columns: [1,2, 3, 4] }
                  },
                  {
                    extend: 'copy',
                    text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                    className: 'dropdown-item',
                    exportOptions: { columns: [1,2, 3, 4] }
                  }
                ]
              },
                {
                  text:
                    '<span data-bs-toggle="modal" data-bs-target="#offerQuestionCreate"><i class="ti ti-plus me-1 ti-xs"></i>Create Question</span>',
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
        $("#questions-tables").on("click", ".questions-datatables-action", (event) => {
          const target = $(event.target);
          const dataId = target.data("id");
          const dataClass = target.attr("class");
          if (
            dataClass === "rounded-circle btn-style-edit" ||
            dataClass === "far fa-edit fa-sm"
          ) {
            this.getLoader = true;
            axios
              .get(this.globalVariables.apiUrl + `admin/offer-question/edit/${dataId}`, {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") },
              })
              .then((res) => {
                this.createquestion.id = res?.data?.data?.id;
                this.createquestion.title = res?.data?.data?.title;
                this.createquestion.question = res?.data?.data?.question;
                this.createquestion.status = res?.data?.data?.status;
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
                    this.globalVariables.apiUrl + `admin/offer-question/destroy/${dataId}`,
                    {
                      headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                      },
                    }
                  )
                  .then((res) => {
                    toastr.success(res.data.message);
                    this.getOffersQuestion();
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
        $('#questions-tables').on('change', '.row-checkbox', (event) => {
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
  
        $('#questions-tables thead').on('change', 'input[type="checkbox"]', (event) => {
          const isChecked = event.target.checked;
          $('#questions-tables tbody .row-checkbox').each((index, checkbox) => {
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
                  this.globalVariables.apiUrl + "admin/offer-question/bulk/delete",
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
                    this.getOffersQuestion();
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
  
      QuestionCreateSubmit() {
        this.getLoader = true;
        axios
          .post(this.globalVariables.apiUrl + "admin/offer-question/store", this.createquestion, {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          })
          .then((res) => {
            const modal = document.getElementById("offerQuestionCreate");
            const bootstrapModal = bootstrap.Modal.getInstance(modal);
            if (bootstrapModal) {
              bootstrapModal.hide();
            }
            toastr.success(res.data.message);
            this.getOffersQuestion();
            this.createquestion.title = "";
            this.createquestion.question = "";
            this.createquestion.id = "";
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

  
      QuestionUpdateSubmit() {
        this.getLoader = true;
        axios
          .post(
            this.globalVariables.apiUrl + `admin/offer-question/update/${this.createquestion.id}`,
            this.createquestion,
            {
              headers: { Authorization: "Bearer " + localStorage.getItem("token") },
            }
          )
          .then((res) => {
            const modal = document.getElementById("OfferQuestionEdit");
            const bootstrapModal = bootstrap.Modal.getInstance(modal);
            if (bootstrapModal) {
              bootstrapModal.hide();
            }
            toastr.success(res.data.message);
            this.getOffersQuestion();
            this.createquestion.id = "";
            this.createquestion.question = "";
            this.createquestion.title = "";
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
  #questions-tables_wrapper #questions-tables_wrapper .row.mx-2 {
      display: none !important;
    }
  #questions-tables colgroup:nth-of-type(2) {
    display: none !important;
  }
  </style>
  