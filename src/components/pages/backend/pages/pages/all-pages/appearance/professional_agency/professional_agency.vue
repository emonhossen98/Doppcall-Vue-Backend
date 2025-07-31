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
                <div class="card-header py-2">
                    <h5 class="card-title mt-2 mb-0">
                        Professional Agency List 
                    </h5>
                </div>
                <div class="card-body">
                    <table class="align-middle mb-0 table table-hover" id="professional_agency_tables">
                        <thead>
                            <tr>
                                <!-- <th></th> -->
                                <th></th>
                                <th>SL</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Created At</th>
                                <th>Operation</th>
                            </tr>
                        </thead>
                        <tbody>
                        
                        </tbody>
                    </table>
                    <div id="externalFilters" v-if="showHiddenExternalFilter">
                      <div>
                        <div class="row">
                          <div class="d-flex justify-content-between align-items-center border-bottom py-3 px-4">
                            <h5 class="mb-0">Apply Filter <template v-if="applyfillters.length > 0"><span
                                  class="badge bg-dark text-white">{{ applyfillters.length ?? 0 }}</span></template>
                            </h5>
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
                                  <span @click="removeSearch('Name', 'name', 'search')"
                                    id="remove-to-search-list">x</span>
                                </template>
                              </li>
                              <li class="position-relative">
                                <a :class="checkfilter.showcolumn == 'Created At' ? 'check-active' : ''"
                                  @click="clickFilters('created_at', 'search', 'Created At')">Created At
                                </a>
                                <template v-if="applyfillters.includes('Created At')">
                                  <span @click="removeSearch('Created At', 'created_at', 'search')"
                                    id="remove-to-search-list">x</span>
                                </template>
                              </li>
                            </ul>
                          </div>
                          <div class="col-md-6 ps-4">
                            <div v-if="checkfilter.showcolumn != null && checkfilter.showcolumn != ''">
                              <p class="mt-3 mb-1 font-class">{{ checkfilter.showcolumn ?? '' }}</p>
                              <template v-if="checkfilter.showcolumn == 'Name' && checkfilter.types.includes('search')">
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.emptyValues['name']" type="checkbox" value="1"
                                    id="isemptyvalue">
                                  <label class="form-check-label" for="isemptyvalue">
                                    is Empty
                                  </label>
                                </div>
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.notemptyValues['name']" type="checkbox" value="0"
                                    id="isnotemptyvalue">
                                  <label class="form-check-label" for="isnotemptyvalue">
                                    is not Empty
                                  </label>
                                </div>
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Created At' && checkfilter.types.includes('search')">
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.emptyValues['created_at']" type="checkbox" value="1"
                                    id="isemptyvalue">
                                  <label class="form-check-label" for="isemptyvalue">
                                    is Empty
                                  </label>
                                </div>
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.notemptyValues['created_at']" type="checkbox" value="0"
                                    id="isnotemptyvalue">
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
                                    <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                      v-model="checkfilter.searchValues['name']" class="form-control mb-2"
                                      id="filtertext" placeholder="Search here..">
                                  </template>
                                  <template v-if="checkfilter.showcolumn == 'Created At' && checkfilter.types.includes('search')">
                                    <label for="filtertext">Contains</label>
                                    <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                      v-model="checkfilter.searchValues['created_at']" class="form-control mb-2"
                                      id="filtertext" placeholder="Search here..">
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
        { label: "Appearance", url: "" },
        { label: "Professional Agency ", url: "" },
      ], 
      getLoader: false,
      bulkactionids : {
        selectedIds: [],
      },
      showHiddenExternalFilter: false,
      checkfilter: {
      columns: ['name'],
      showcolumn: "Name",
      types: ['search'],
      emptyValues: {
        name : [], 
        created_at : [],
      },
      notemptyValues: {
        name : [], 
        created_at : [],
      },
      searchValues: {
        name : [], 
        created_at : [],
      },
      selectedValues: {
      },
    },
    applyfillters: [],
     };
  },
  async mounted() { 
    try {
      const { role, isAuthorized } = await fetchUserRole();
      if (role == 'Super' || role == 'Admin') {
        this.getProfessionalData();
        this.$nextTick(() => {
          const dataTableWrapper = document.querySelectorAll('#professional_agency_tables_wrapper .row.mx-2');
          if (dataTableWrapper.length > 0) {
            dataTableWrapper[0].style.display = 'none';
            dataTableWrapper[1].style.display = 'none';
          }
        });
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
    document.addEventListener('click', (e) => {
      const target = e.target.closest('a[data-vue-route]');
      if (target) {
        e.preventDefault();
        const route = target.getAttribute('href');
        this.$router.push(route);
      }
    }, true);
  },
  methods: {
    getProfessionalData() {
      this.getLoader = true;
        axios.get(this.globalVariables.apiUrl+'admin/appearance/professional-agency', { headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}})
        .then((res) => {
          if ($.fn.DataTable.isDataTable("#professional_agency_tables")) {
          $('#professional_agency_tables').DataTable().destroy();
        }
          var table = $('#professional_agency_tables').DataTable({
            data: res.data.getDatas,
            columns: [
              // { data: 'id' },
              { data: 'id' },
              { data: 'id' },
              { data: 'convart_image' },
              { data: 'name' },
              { data: 'convart_created_at' },
              { data: '' }
            ],
            initComplete: () => { 
              $('#professional_agency_tables').wrap('<div class="commonDataTablesClass"></div>');
               const table = $("#professional_agency_tables").DataTable();
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
                searchable: false
              },
              {
                targets: -1,
                title: 'Actions',
                searchable: false,
                orderable: false,
                render: function (data, type, full, meta) {
                  return '<div class="professional_agency_action d-flex align-items-center"><a data-vue-route href="/admin-appearance-professional-agency-edit/'+full.id+'" title="Edit" class="bg-transparent border-0 text-primary me-2"><i class="far fa-edit fa-sm"></i></a><button type="button" id="delete-btn" title="Delete" data-id='+full.id +' class="bg-transparent border-0 text-danger"><i class="far fa-trash-alt fa-sm" id="delete-btn" data-id='+full.id +'></i></button></div>'; 
                }
              }
            ],
            order: [[1, 'desc']],
            dom: '<"row mx-2"' +
              '<"col-md-4 px-0"f>' + 
              '<"col-md-8 dopp_tb d-flex justify-content-end align-items-center"l<"button-wrapper"B>>' + 
              '<"col-md-3 d-none"p>>' +
              't' + 
              '<"row mx-2"' +
              '<"col-md-5"i>' + 
              '<"col-md-7"p>>', 
            displayLength: 10, 
            lengthMenu: [10, 20, 50, 100, 200], 
            language: {
              sLengthMenu: '_MENU_',
              search: '', 
              searchPlaceholder: 'Search Professional Agency',
              paginate: { 
                previous: '<i class="fa-solid fa-chevron-left"></i>',
                next: '<i class="fa-solid fa-chevron-right"></i>'
              }
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
                text: '<span id="create"><i class="ti ti-plus me-1 ti-xs"></i>Create</span>',
                className: 'create-new btn btn-primary me-2',
                attr: { id: 'create' },
              },
              {
                  className: "btn btn-primary  me-2",
                  text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">SL</a></li><li><a class="dropdown-item" href="#" data-column="2">Image</a></li><li><a class="dropdown-item" href="#" data-column="3">Created At</a></li><li><a class="dropdown-item" href="#" data-column="4">Action</a></li></div></ul></div>',
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
        created_at : [],
      },
      this.checkfilter.notemptyValues = {
        name : [], 
        created_at : [],
      },
      this.checkfilter.searchValues = {
        name : [], 
        created_at : [],
      },
      this.checkfilter.selectedValues = {
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
              this.globalVariables.apiUrl + "admin/appearance/professional-search-get-data-all-filter",
              this.checkfilter,
              {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") }
              }
            )
            .then((res) => {
              const { data, current_page, last_page,recordsTotal } = res.data;
              this.currentPage = current_page;
              this.lastPage = last_page;
              this.recordsTotal = recordsTotal;
              this.startPage = (current_page - 1) * perPage + 1;
              this.endPage = Math.min(current_page * perPage, recordsTotal);
    
              // if ($.fn.DataTable.isDataTable("#offer_datatables")) {
              //   $("#offer_datatables").DataTable().destroy();
              // }
    
              if ($.fn.DataTable.isDataTable("#professional_agency_tables")) {
                const table = $("#professional_agency_tables").DataTable();
                table.clear();
                table.rows.add(res.data.getDatas ?? []);
                table.draw();
              } else {
               var table = $('#professional_agency_tables').DataTable({
            data: res.data.getDatas,
            columns: [
              // { data: 'id' },
              { data: 'id' },
              { data: 'id' },
              { data: 'convart_image' },
              { data: 'name' },
              { data: 'convart_created_at' },
              { data: '' }
            ],
            initComplete: () => { 
              $('#professional_agency_tables').wrap('<div class="commonDataTablesClass"></div>');
               const table = $("#professional_agency_tables").DataTable();
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
                searchable: false
              },
              {
                targets: -1,
                title: 'Actions',
                searchable: false,
                orderable: false,
                render: function (data, type, full, meta) {
                  return '<div class="professional_agency_action d-flex align-items-center"><a data-vue-route href="/admin-appearance-professional-agency-edit/'+full.id+'" title="Edit" class="bg-transparent border-0 text-primary me-2"><i class="far fa-edit fa-sm"></i></a><button type="button" id="delete-btn" title="Delete" data-id='+full.id +' class="bg-transparent border-0 text-danger"><i class="far fa-trash-alt fa-sm" id="delete-btn" data-id='+full.id +'></i></button></div>'; 
                }
              }
            ],
            order: [[1, 'desc']],
            dom: '<"row mx-2"' +
              '<"col-md-4 px-0"f>' + 
              '<"col-md-8 dopp_tb d-flex justify-content-end align-items-center"l<"button-wrapper"B>>' + 
              '<"col-md-3 d-none"p>>' +
              't' + 
              '<"row mx-2"' +
              '<"col-md-5"i>' + 
              '<"col-md-7"p>>', 
            displayLength: 10, 
            lengthMenu: [10, 20, 50, 100, 200], 
            language: {
              sLengthMenu: '_MENU_',
              search: '', 
              searchPlaceholder: 'Search Professional Agency',
              paginate: { 
                previous: '<i class="fa-solid fa-chevron-left"></i>',
                next: '<i class="fa-solid fa-chevron-right"></i>'
              }
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
                text: '<span id="create"><i class="ti ti-plus me-1 ti-xs"></i>Create</span>',
                className: 'create-new btn btn-primary me-2',
                attr: { id: 'create' },
              },
              {
                  className: "btn btn-primary  me-2",
                  text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">SL</a></li><li><a class="dropdown-item" href="#" data-column="2">Image</a></li><li><a class="dropdown-item" href="#" data-column="3">Created At</a></li><li><a class="dropdown-item" href="#" data-column="4">Action</a></li></div></ul></div>',
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


    attachEventListenersBlulkAction() {
      $('#professional_agency_tables').on('change', '.row-checkbox', (event) => {
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
      $('#professional_agency_tables thead').on('change', 'input[type="checkbox"]', (event) => {
        const isChecked = event.target.checked;
        $('#professional_agency_tables tbody .row-checkbox').each((index, checkbox) => {
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
                this.globalVariables.apiUrl + "admin/appearance/professional/bulk/delete",
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
                  this.getProfessionalData();
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

    attachEventListeners() {
      $("#professional_agency_tables").on("click", ".professional_agency_action", (event) => {
        const target = $(event.target);
        const dataId = target.data("id");
        const dataClass = target.attr("id");
        if(dataClass === 'delete-btn'){
          this.delteLeadMethod(dataId);
        }
      });
    },

    attachEventListenersOfButton(){
      $("#professional_agency_tables_wrapper").on("click", "button", (event) => {
        const target = $(event.target);
        const dataClass = target.attr("id");
        if (dataClass === "create") {
          this.$router.push("/admin-appearance-professional-agency-create");
        } else if(dataClass == 'all_filters'){
          this.showHiddenExternalFilter = !this.showHiddenExternalFilter;
        }
      });
    },

     // Lead Method Delete
     delteLeadMethod(id) {
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
            .get(this.globalVariables.apiUrl+`admin/appearance/professional-agency/delete/${id}`, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((res) => {
                toastr.success(res.data.message);
                this.getProfessionalData();
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
  },
}
</script>

<style>
#professional_agency_tables colgroup:nth-of-type(2) {
	display: none !important;
}
#professional_agency_tables .dt-checkboxes-cell{
	padding: 0.7rem 0.5rem !important;
}
.agency_image {
	background: #595757;
	padding: 8px;
}
</style>