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
              <h5 class="card-title mt-2 mb-0">Types</h5>
            </div>
            <div class="card-body">
              <table class="align-middle mb-0 table table-hover" id="types-tables">
                <thead class="border-top">
                  <tr>
                    <th></th>
                    <th>Type Name</th>
                    <th>ID</th>
                    <th>Created At</th>
                    <th class="text-end" id="action-incompleted">Action</th>
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
                          <a :class="checkfilter.showcolumn == 'ID' ? 'check-active' : ''"
                            @click="clickFilters('id', 'select', 'ID')">ID 
                          </a>
                          <template v-if="applyfillters.includes('ID')">
                            <span @click="removeSearch('ID','id','select')" id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Type' ? 'check-active' : ''"
                            @click="clickFilters('type', 'search', 'Type')">Type 
                          </a>
                          <template v-if="applyfillters.includes('Type')">
                            <span @click="removeSearch('Type','type','search')" id="remove-to-search-list">x</span>
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
                        <p class="mt-3 mb-1">{{ checkfilter.showcolumn ?? '' }}</p>
                        <template v-if="checkfilter.showcolumn == 'ID' && checkfilter.types.includes('search')"> 
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['id']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['id']" type="checkbox" value="0" id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <template v-if="checkfilter.showcolumn == 'Type' && checkfilter.types.includes('search')"> 
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['type']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['type']" type="checkbox" value="0" id="isnotemptyvalue">
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
                            <template v-if="checkfilter.showcolumn == 'ID' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['id']"
                                class="form-control mb-2" id="filtertext" placeholder="Search here..">
                            </template>
                            <template v-if="checkfilter.showcolumn == 'Type' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['type']"
                                class="form-control mb-2" id="filtertext" placeholder="Search here..">
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
    <div class="modal fade" id="TypeInfoCreate" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel1">New offer Type</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col mb-3">
                <label for="nameBasic" class="form-label">Name</label>
                <input type="text" id="type_name" class="form-control" v-model="offerType.type_name"
                  placeholder="Enter Type Name" />
                <div v-if="validationErrors && validationErrors.type_name" class="text-danger">
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
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col mb-3">
                <label for="nameBasic" class="form-label">Name</label>
                <input type="text" id="type_name" class="form-control" v-model="offerType.type_name"
                  placeholder="Enter Type Name" />
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
        { label: "Types", url: "" },
      ],
      offerType: {
        id: null, 
        type_name: "",
      },
      bulkactionids: {
        selectedIds: [],
      },
      validationErrors: null,
      showHiddenExternalFilter: false,
      checkfilter: {
        columns: ['id'],
        showcolumn: "ID",
        types : ['search'],
        emptyValues : {
          id : [],
          type : [],
          created_at : [],
        },
        notemptyValues : {
          id : [],
          type : [],
          created_at : [],
        },
        searchValues : {
          id : [],
          type : [],
          created_at : [],
        },
      },
      applyfillters : [],
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
          this.$nextTick(() => {
            if ($.fn.DataTable.isDataTable("#types-tables")) {
              $('#types-tables').DataTable().destroy();
              $('#types-tables').empty();
            }
            var formateDate = this.formatDates;
            $("#types-tables").DataTable({
              data: res.data.offerTypes,
              columns: [
                { data: "id" },
                { data: "type" },
                { data: "id" },
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
                      '<div class="text-end type-datatables-action">' +
                      '<button title="Edit" data-id=' +
                      row.id +
                      ' class="rounded-circle bg-transparent border-0 text-primary me-2" data-bs-toggle="modal" data-bs-target="#TypeInfoEdit">' +
                      '<i class="far fa-edit fa-sm" data-id=' +
                      row.id +
                      '></i></button>' +
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
                
                $('#types-tables').wrap('<div class="commonDataTablesClass"></div>');
                const table = $("#types-tables").DataTable();
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
                this.attachEventListenersOfButton();
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
              order: [[1, "desc"]],
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
                    '<span data-bs-toggle="modal" data-bs-target="#TypeInfoCreate"><i class="ti ti-plus me-1 ti-xs"></i>New Type</span>',
                  className: "create-new btn btn-primary me-2",
                },
                {
                  className: "btn btn-primary me-2 ",
                  text : '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">Type Name</a></li><li><a class="dropdown-item" href="#" data-column="2">ID</a></li><li><a class="dropdown-item" href="#" data-column="3">Created At</a></li><li><a class="dropdown-item" href="#" data-column="4">Action</a></li></div></ul></div>'
                },
                {
                  text:
                    '<span id="all_filters" class="all_filters"><i class="fa-solid fa-magnifying-glass me-1"></i>All Filters </span>',
                  className: "btn btn-primary",
                  attr: { id: "all_filters"},
                },
              ],
            });
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

    externalfilterreset(){
      this.applyfillters = [],
      this.checkfilter.columns = ['id'],
      this.checkfilter.showcolumn = "ID",
      this.checkfilter.emptyValues = {
          id : [],
          type : [],
          created_at : [],
      },
      this.checkfilter.notemptyValues = {
          id : [],
          type : [],
          created_at : [],
      },
      this.checkfilter.searchValues = {
          id : [],
          type : [],
          created_at : [],
      },
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
        if (this.checkfilter.searchValues.hasOwnProperty(key)) {
          this.checkfilter.searchValues[key] = [];
        }
      }
      this.getFiltarOfExtranalFilter();
    },


    getFiltarOfExtranalFilter(perPage = 10,) {
      axios
        .post(
          this.globalVariables.apiUrl + "admin/offers/types/search-get-data-dal-filter",
          this.checkfilter,
          {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") }
          }
        )
        .then((res) => {
          // this.$nextTick(() => {
            if ($.fn.DataTable.isDataTable("#types-tables")) {
            const table = $("#types-tables").DataTable();
            table.clear();
            table.rows.add(res.data.offerTypes ?? []);
            table.draw();
          } else {
            var formateDate = this.formatDates;
            $("#types-tables").DataTable({
              data: res.data.offerTypes,
              columns: [
                { data: "id" },
                { data: "type" },
                { data: "id" },
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
                      '<div class="text-end type-datatables-action">' +
                      '<button title="Edit" data-id=' +
                      row.id +
                      ' class="rounded-circle bg-transparent border-0 text-primary me-2" data-bs-toggle="modal" data-bs-target="#TypeInfoEdit">' +
                      '<i class="far fa-edit fa-sm" data-id=' +
                      row.id +
                      '></i></button>' +
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
                
                $('#types-tables').wrap('<div class="commonDataTablesClass"></div>');
                const table = $("#types-tables").DataTable();
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
                this.attachEventListenersOfButton();
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
              order: [[1, "desc"]],
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
                    '<span data-bs-toggle="modal" data-bs-target="#TypeInfoCreate"><i class="ti ti-plus me-1 ti-xs"></i>New Type</span>',
                  className: "create-new btn btn-primary me-2",
                },
                {
                  className: "btn btn-primary me-2 ",
                  text : '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">Type Name</a></li><li><a class="dropdown-item" href="#" data-column="2">ID</a></li><li><a class="dropdown-item" href="#" data-column="3">Created At</a></li><li><a class="dropdown-item" href="#" data-column="4">Action</a></li></div></ul></div>'
                },
                {
                  text:
                    '<span id="all_filters" class="all_filters"><i class="fa-solid fa-magnifying-glass me-1"></i>All Filters </span>',
                  className: "btn btn-primary",
                  attr: { id: "all_filters"},
                },
              ],
            });
          }
          // });
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


    formatDates(date) {
      return moment(date).format('D MMMM YYYY');
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
        }else if(dataClass == 'all_filters'){
          this.showHiddenExternalFilter = !this.showHiddenExternalFilter;
        }
      });
    },

    attachEventListenersBlulkAction() {
      $('#types-tables').on('change', '.row-checkbox', (event) => {
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

      $('#types-tables thead').on('change', 'input[type="checkbox"]', (event) => {
        const isChecked = event.target.checked;
        $('#types-tables tbody .row-checkbox').each((index, checkbox) => {
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
                this.globalVariables.apiUrl + "admin/offers/types/bulk/delete",
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
                  this.getOffersTypes();
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
