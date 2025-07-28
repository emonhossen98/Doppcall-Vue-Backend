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
            <div
              class="card-header py-2 d-flex justify-content-between align-items-center"
            >
              <h5 class="card-title mb-0 mt-2">Subject</h5>
            </div>
            <div class="card-body">
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
                    <th>Created At</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
              <div id="externalFilters" v-if="showHiddenExternalFilter">
                <div>
                  <div class="row">
                    <div class="d-flex justify-content-between align-items-center border-bottom py-3 px-4">
                      <h5 class="mb-0">Apply Filter <template v-if="applyfillters.length > 0"><span class="badge bg-dark text-white">{{ applyfillters.length ?? 0 }}</span></template></h5>
                      <a class="clearallexternalfilter" @click="externalfilterreset()">Clear All</a>
                    </div>
                  </div>
                  <div class="row px-3" id="externalFiltersWrapper">
                    <div class="col-md-6 border-right">
                      <ul class="px-0 mt-3" id="offer-extra-filter">
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Name' ? 'check-active' : ''"
                            @click="clickFilters('name', 'search', 'Name')">Name 
                          </a>
                          <template v-if="applyfillters.includes('Name')">
                            <span @click="removeSearch('Name','name','search')" id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Status' ? 'check-active' : ''"
                            @click="clickFilters('status', 'select', 'Status')">Status  <i class="fa-solid fa-caret-down"></i> 
                          </a>
                          <template v-if="applyfillters.includes('Status')">
                            <span @click="removeSearch('Status','status','select')" id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Created At' ? 'check-active' : ''"
                            @click="clickFilters('created_at', 'search', 'Created At')">Created At 
                          </a>
                          <template v-if="applyfillters.includes('Created At')">
                            <span @click="removeSearch('Created At','created_at','search')" id="remove-to-search-list">x</span>
                          </template>
                        </li>
                      </ul>
                    </div>
                    <div class="col-md-6 ps-4">
                      <div v-if="checkfilter.showcolumn != null && checkfilter.showcolumn != ''">
                        <p class="mt-3 mb-1 font-class">{{ checkfilter.showcolumn ?? '' }}</p>
                        <template v-if="checkfilter.showcolumn == 'Name' && checkfilter.types.includes('search')"> 
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['name']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['name']" type="checkbox" value="0" id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <template v-if="checkfilter.showcolumn == 'Status' && checkfilter.types.includes('select')"> 
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['status']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['status']" type="checkbox" value="0" id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <template v-if="checkfilter.showcolumn == 'Created At' && checkfilter.types.includes('search')"> 
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['created_at']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['created_at']" type="checkbox" value="0" id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <div>
                          <p>Have value</p>
                          <div>
                            <template v-if="checkfilter.showcolumn == 'Name' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['name']"
                                class="form-control mb-2" id="filtertext" placeholder="Search here..">
                            </template>
                            <template v-if="checkfilter.showcolumn == 'Status' && checkfilter.types.includes('select')">
                              <div class="form-check mb-2">
                                <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['status']" class="form-check-input" type="checkbox" value="0" id="dynamicidstatus0">
                                <label class="form-check-label" for="dynamicidstatus0">
                                  Pending
                                </label>
                              </div>
                              <div class="form-check mb-2">
                                <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['status']" class="form-check-input" type="checkbox" value="1" id="dynamicidstatus1">
                                <label class="form-check-label" for="dynamicidstatus1">
                                  Approved
                                </label>
                              </div>
                              </template>
                            <template v-if="checkfilter.showcolumn == 'Created At' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['created_at']"
                                class="form-control mb-2" id="filtertext" placeholder="Search here..">
                            </template>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
            <h5 class="modal-title" id="exampleModalLabel1">Edit Ticket Subject</h5>
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
      bulkactionids : {
        selectedIds: [],
        status: "",
      },
      validationErrors: null,
      showHiddenExternalFilter: false,
      checkfilter: {
        columns: ['name'],
        showcolumn: "Name",
        types : ['search'],
        emptyValues : {
          name : [],
          status : [],
          created_at : [],
        },
        notemptyValues : {
          name : [],
          status : [],
          created_at : [],
        },
        searchValues : {
          name : [],
          created_at : [],
        },
        selectedValues: {
          status : [],
        },
      },
      applyfillters : [],
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
          var formateDate = this.formatDates;
          var table = $("#ticket_subject_datatables").DataTable({
            data: res.data,
            columns: [
              // { data: 'id' },
              { data: "id" },
              { data: "id" },
              { data: "name",
                render: function (data, type, row) {
                    if (row?.name != null) {
                      return '<span title="'+row.name+'">'+row.name+'</span>';
                    } else {
                      return '----';
                    }
                } 
               },
              { data: "convart_status" },
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
                data: "updated_at",
                render: function (data, type, row) {
                  return (
                    '<div class="subject_action d-flex align-items-center"><button type="button" data-bs-toggle="modal" data-bs-target="#SubjectInfoEdit" title="Edit" class="rounded-circle bg-transparent border-0 text-primary me-2" data-action="subject-edit" data-id=' +
                    row.id +
                    '><i class="far fa-edit fa-sm" data-action="subject-edit" data-id=' +
                    row.id +
                    '></i></button><button type="button" title="Delete" class="bg-transparent border-0 text-danger" data-action="subject-delete" data-id=' +
                    row.id +
                    '><i class="far fa-trash-alt fa-sm" data-action="subject-delete" data-id=' +
                    row.id +
                    '></i></button></div>'
                  );
                },
              },
            ],
            initComplete: () => {
              $('#ticket_subject_datatables').wrap('<div class="commonDataTablesClass"></div>');
              const table = $("#ticket_subject_datatables").DataTable();
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
              this.attachEventListenersOfButton();
              this.attachEventStatusChange();
              this.attachEventListeners();
              this.attachEventListenersBlulkAction();
              this.attachEventListenersBlulkActionSubmit();
            },
            createdRow: function (row, data, dataIndex) {
                $('td:eq(1)', row).html(dataIndex + 1);
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
              { targets: 4, orderable: false, className: 'dt-center' }
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
              searchPlaceholder: "Search Subject",
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
                    <option value="1">Bulk Publish</option>
                  </select>
                </div>
              `,
              className: "me-2 p-0 btn-primary d-none",
              attr: { id: "bulk-action-container" },
            },
              {
                extend: "collection",
                className: "btn btn-label-primary dropdown-toggle me-3",
                text: '<i class="ti ti-screen-share me-1 ti-xs"></i>Export',
                buttons: [
                  {
                    extend: "print",
                    text: '<i class="ti ti-printer me-1 ti-xs text-primary"></i>Print',
                    className: "dropdown-item",
                    exportOptions: { columns: [1, 2, 4] },
                  },
                  {
                    extend: "csv",
                    text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                    className: "dropdown-item",
                    exportOptions: { columns: [1, 2, 4] },
                  },
                  {
                    extend: "excel",
                    text: '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                    className: "dropdown-item",
                    exportOptions: { columns: [1, 2, 4] },
                  },
                  {
                    extend: "pdf",
                    text: '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                    className: "dropdown-item",
                    exportOptions: { columns: [1, 2, 4] },
                  },
                  {
                    extend: "copy",
                    text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                    className: "dropdown-item",
                    exportOptions: { columns: [1, 2, 4] },
                  },
                ],
              },
              {
                text:
                  '<span data-bs-toggle="modal" data-bs-target="#SubjectInfoCreate"><i class="ti ti-plus me-1 ti-xs"></i>Create</span>',
                className: "create-new btn btn-primary me-2",
              },
              {
                  className: "btn btn-primary me-2",
                  text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">SL</a></li><li><a class="dropdown-item" href="#" data-column="2">Name</a></li><li><a class="dropdown-item" href="#" data-column="3">Status</a></li><li><a class="dropdown-item" href="#" data-column="4">Created At</a></li><li><a class="dropdown-item" href="#" data-column="5">Action</a></li></div></ul></div>',
                },
                {
                  text:
                    '<span id="all_filters" class="all_filters"><i class="fa-solid fa-magnifying-glass me-1"></i>All Filters</span>',
                  className: "btn btn-primary",
                  attr: { id: "all_filters"},
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
    
    externalfilterreset(){
      this.checkfilter.columns = ['name'],
      this.checkfilter.showcolumn = "Name",
      this.checkfilter.types = ['search'],
      this.checkfilter.emptyValues = {
          name : [],
          status : [],
          created_at : [],
      },
      this.checkfilter.notemptyValues = {
          name : [],
          status : [],
          created_at : [],
      },
      this.checkfilter.searchValues = {
          name : [],
          created_at : [],
      },
      this.checkfilter.selectedValues = {
          status : [],
      },
      this.checkfilter.applyfillters = [],
      this.showHiddenExternalFilter = !this.showHiddenExternalFilter;
      this.clickCheckboxFilters();
    },
          
    clickFilters(value,type, key) {
      if (!Array.isArray(this.checkfilter.columns)) {
        this.checkfilter.columns = [];
      }
      if (!this.checkfilter.columns.includes(value)) {
          this.checkfilter.columns.push(value);
      }
      this.checkfilter.types.push(type);
      this.checkfilter.showcolumn = key;
      this.getFiltarOfExtranalFilter();
    },
      
    clickCheckboxFilters(value) {
      if (!Array.isArray(this.applyfillters)) {
        this.applyfillters = [];
      }
      if (value !== null && value !== undefined && !this.applyfillters.includes(value)) {
        this.applyfillters.push(value);
      }
      this.getFiltarOfExtranalFilter();
    },
      
    removeSearch(value, key, type) {
      if (!Array.isArray(this.applyfillters)) {
        this.applyfillters = [];
      }
      const index = this.applyfillters.indexOf(value);
      if (index > -1) {
        this.applyfillters.splice(index, 1);
        if (this.checkfilter.emptyValues.hasOwnProperty(key)) {
          this.checkfilter.emptyValues[key] = [];
        }

        if (this.checkfilter.notemptyValues.hasOwnProperty(key)) {
          this.checkfilter.notemptyValues[key] = [];
        }

        if (type == 'select') {
          if (this.checkfilter.selectedValues.hasOwnProperty(key)) {
            this.checkfilter.selectedValues[key] = [];
          }
        } else {
          if (this.checkfilter.searchValues.hasOwnProperty(key)) {
            this.checkfilter.searchValues[key] = [];
          }
        }
      }
      this.getFiltarOfExtranalFilter();
    },
    
    getFiltarOfExtranalFilter(perPage = 10,) {
    axios
      .post(
        this.globalVariables.apiUrl + "admin/tickets/subjects/search-get-data-all-filter",
        this.checkfilter,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        }
      )
      .then((res) => {
        if ($.fn.DataTable.isDataTable("#ticket_subject_datatables")) {
          const table = $("#ticket_subject_datatables").DataTable();
          table.clear();
          table.rows.add(res.data ?? []);
          table.draw();
        } else {
          var formateDate = this.formatDates;
           var table = $("#ticket_subject_datatables").DataTable({
            data: res.data,
            columns: [
              // { data: 'id' },
              { data: "id" },
              { data: "id" },
              { data: "name",
                render: function (data, type, row) {
                    if (row?.name != null) {
                      return '<span title="'+row.name+'">'+row.name+'</span>';
                    } else {
                      return '----';
                    }
                } 
               },
              { data: "convart_status" },
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
                data: "updated_at",
                render: function (data, type, row) {
                  return (
                    '<div class="subject_action d-flex align-items-center"><button type="button" data-bs-toggle="modal" data-bs-target="#SubjectInfoEdit" title="Edit" class="rounded-circle bg-transparent border-0 text-primary me-2" data-action="subject-edit" data-id=' +
                    row.id +
                    '><i class="far fa-edit fa-sm" data-action="subject-edit" data-id=' +
                    row.id +
                    '></i></button><button type="button" title="Delete" class="bg-transparent border-0 text-danger" data-action="subject-delete" data-id=' +
                    row.id +
                    '><i class="far fa-trash-alt fa-sm" data-action="subject-delete" data-id=' +
                    row.id +
                    '></i></button></div>'
                  );
                },
              },
            ],
            initComplete: () => {
              $('#ticket_subject_datatables').wrap('<div class="commonDataTablesClass"></div>');
              const table = $("#ticket_subject_datatables").DataTable();
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
              this.attachEventListenersOfButton();
              this.attachEventStatusChange();
              this.attachEventListeners();
              this.attachEventListenersBlulkAction();
              this.attachEventListenersBlulkActionSubmit();
            },
            createdRow: function (row, data, dataIndex) {
                $('td:eq(1)', row).html(dataIndex + 1);
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
              { targets: 4, orderable: false, className: 'dt-center' }
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
              searchPlaceholder: "Search Subject",
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
                    <option value="1">Bulk Publish</option>
                  </select>
                </div>
              `,
              className: "me-2 p-0 btn-primary d-none",
              attr: { id: "bulk-action-container" },
            },
              {
                extend: "collection",
                className: "btn btn-label-primary dropdown-toggle me-3",
                text: '<i class="ti ti-screen-share me-1 ti-xs"></i>Export',
                buttons: [
                  {
                    extend: "print",
                    text: '<i class="ti ti-printer me-1 ti-xs text-primary"></i>Print',
                    className: "dropdown-item",
                    exportOptions: { columns: [1, 2, 4] },
                  },
                  {
                    extend: "csv",
                    text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                    className: "dropdown-item",
                    exportOptions: { columns: [1, 2, 4] },
                  },
                  {
                    extend: "excel",
                    text: '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                    className: "dropdown-item",
                    exportOptions: { columns: [1, 2, 4] },
                  },
                  {
                    extend: "pdf",
                    text: '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                    className: "dropdown-item",
                    exportOptions: { columns: [1, 2, 4] },
                  },
                  {
                    extend: "copy",
                    text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                    className: "dropdown-item",
                    exportOptions: { columns: [1, 2, 4] },
                  },
                ],
              },
              {
                text:
                  '<span data-bs-toggle="modal" data-bs-target="#SubjectInfoCreate"><i class="ti ti-plus me-1 ti-xs"></i>Create</span>',
                className: "create-new btn btn-primary me-2",
              },
              {
                  className: "btn btn-primary me-2",
                  text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">SL</a></li><li><a class="dropdown-item" href="#" data-column="2">Name</a></li><li><a class="dropdown-item" href="#" data-column="3">Status</a></li><li><a class="dropdown-item" href="#" data-column="4">Created At</a></li><li><a class="dropdown-item" href="#" data-column="5">Action</a></li></div></ul></div>',
                },
                {
                  text:
                    '<span id="all_filters" class="all_filters"><i class="fa-solid fa-magnifying-glass me-1"></i>All Filters</span>',
                  className: "btn btn-primary",
                  attr: { id: "all_filters"},
                },
            ],
          });
        };
        this.getLoader = false;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
      // this.getSkeletonLoader = false;
      this.getLoader = false;
    });
    },

    attachEventListenersOfButton() {
      $("#ticket_subject_datatables_wrapper").on("click", "button", (event) => {
        const target = $(event.target);
        const dataClass = target.attr("id");
        if(dataClass == 'all_filters'){
          this.showHiddenExternalFilter = !this.showHiddenExternalFilter;
        } 
      });
    },



    formatDates(date) {
      return moment(date).format('D MMMM YYYY');
    },
    attachEventListenersBlulkAction() {
      $('#ticket_subject_datatables').on('change', '.row-checkbox', (event) => {
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
      $('#ticket_subject_datatables thead').on('change', 'input[type="checkbox"]', (event) => {
        const isChecked = event.target.checked;
        $('#ticket_subject_datatables tbody .row-checkbox').each((index, checkbox) => {
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
            const alertTitle = "Subject Want to Publish";
            this.bulkStatusChange(alertTitle);
          }else{
            this.bulkactionids.status = '0';
            const alertTitle = "Subject Want to Pending";
            this.bulkStatusChange(alertTitle);
          }
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
                this.globalVariables.apiUrl + "admin/tickets/subjects/bulk/delete",
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
                this.globalVariables.apiUrl + "admin/tickets/subjects/bulk/status",
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
                  this.getTicketsSubjects();
                  this.bulkactionids.selectedIds = [];
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
