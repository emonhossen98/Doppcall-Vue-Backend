<template>
    <div v-if="getLoader">
      <Loader></Loader>
    </div>
    <!-- Content wrapper -->
    <div class="content-wrapper">
      <!-- Content -->
      <div class="container-xxl flex-grow-1 container-p-y">
        <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
        <div class="row row-sm mt-4">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h5 class="card-title mt-2 mb-0">Cookie Consents</h5>
              </div>
  
              <div class="user-activities-table card-body">
                <table class="table table-sm" id="cookie_consents_tables">
                  <thead>
                    <tr>	 	 	 	 	
                        <!-- <th></th> -->
                        <th></th>
                        <th>SL</th>
                        <th>Domain</th>
                        <th>IP Address</th>
                        <th>User Location</th>
                        <th>Allow Date</th>
                    </tr>
                  </thead>
                  <tbody></tbody>
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
                                <a :class="checkfilter.showcolumn == 'Domain' ? 'check-active' : ''"
                                  @click="clickFilters('domain', 'search', 'Domain')">Domain
                                </a>
                                <template v-if="applyfillters.includes('Domain')">
                                  <span @click="removeSearch('Domain', 'domain', 'search')"
                                    id="remove-to-search-list">x</span>
                                </template>
                              </li>
                              <li class="position-relative">
                                <a :class="checkfilter.showcolumn == 'Ip Address' ? 'check-active' : ''"
                                  @click="clickFilters('ip_address', 'search', 'Ip Address')">Ip Address
                                </a>
                                <template v-if="applyfillters.includes('Ip Address')">
                                  <span @click="removeSearch('Ip Address', 'ip_address', 'search')"
                                    id="remove-to-search-list">x</span>
                                </template>
                              </li>
                              <li class="position-relative">
                                <a :class="checkfilter.showcolumn == 'Country' ? 'check-active' : ''"
                                  @click="clickFilters('country', 'search', 'Country')">Country
                                </a>
                                <template v-if="applyfillters.includes('Country')">
                                  <span @click="removeSearch('Country', 'country', 'search')"
                                    id="remove-to-search-list">x</span>
                                </template>
                              </li>
                              <li class="position-relative">
                                <a :class="checkfilter.showcolumn == 'Allow Date' ? 'check-active' : ''"
                                  @click="clickFilters('allow_date', 'search', 'Allow Date')">Allow Date
                                </a>
                                <template v-if="applyfillters.includes('Allow Date')">
                                  <span @click="removeSearch('Allow Date', 'allow_date', 'search')"
                                    id="remove-to-search-list">x</span>
                                </template>
                              </li>
                            </ul>
                          </div>
                          <div class="col-md-6 ps-4">
                            <div v-if="checkfilter.showcolumn != null && checkfilter.showcolumn != ''">
                              <p class="mt-3 mb-1 font-class">{{ checkfilter.showcolumn ?? '' }}</p>
                              <template v-if="checkfilter.showcolumn == 'Domain' && checkfilter.types.includes('search')">
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.emptyValues['domain']" type="checkbox" value="1"
                                    id="isemptyvalue">
                                  <label class="form-check-label" for="isemptyvalue">
                                    is Empty
                                  </label>
                                </div>
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.notemptyValues['domain']" type="checkbox" value="0"
                                    id="isnotemptyvalue">
                                  <label class="form-check-label" for="isnotemptyvalue">
                                    is not Empty
                                  </label>
                                </div>
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Ip Address' && checkfilter.types.includes('search')">
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.emptyValues['ip_address']" type="checkbox" value="1"
                                    id="isemptyvalue">
                                  <label class="form-check-label" for="isemptyvalue">
                                    is Empty
                                  </label>
                                </div>
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.notemptyValues['ip_address']" type="checkbox" value="0"
                                    id="isnotemptyvalue">
                                  <label class="form-check-label" for="isnotemptyvalue">
                                    is not Empty
                                  </label>
                                </div>
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Country' && checkfilter.types.includes('search')">
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.emptyValues['country']" type="checkbox" value="1"
                                    id="isemptyvalue">
                                  <label class="form-check-label" for="isemptyvalue">
                                    is Empty
                                  </label>
                                </div>
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.notemptyValues['country']" type="checkbox" value="0"
                                    id="isnotemptyvalue">
                                  <label class="form-check-label" for="isnotemptyvalue">
                                    is not Empty
                                  </label>
                                </div>
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Allow Date' && checkfilter.types.includes('search')">
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.emptyValues['allow_date']" type="checkbox" value="1"
                                    id="isemptyvalue">
                                  <label class="form-check-label" for="isemptyvalue">
                                    is Empty
                                  </label>
                                </div>
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.notemptyValues['allow_date']" type="checkbox" value="0"
                                    id="isnotemptyvalue">
                                  <label class="form-check-label" for="isnotemptyvalue">
                                    is not Empty
                                  </label>
                                </div>
                              </template>
                              <div>
                                <p>Have value</p>
                                <div>
                                  <template v-if="checkfilter.showcolumn == 'Domain' && checkfilter.types.includes('search')">
                                    <label for="filtertext">Contains</label>
                                    <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                      v-model="checkfilter.searchValues['domain']" class="form-control mb-2"
                                      id="filtertext" placeholder="Search here..">
                                  </template>
                                  <template v-if="checkfilter.showcolumn == 'Ip Address' && checkfilter.types.includes('search')">
                                    <label for="filtertext">Contains</label>
                                    <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                      v-model="checkfilter.searchValues['ip_address']" class="form-control mb-2"
                                      id="filtertext" placeholder="Search here..">
                                  </template>
                                  <template v-if="checkfilter.showcolumn == 'Country' && checkfilter.types.includes('search')">
                                    <label for="filtertext">Contains</label>
                                    <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                      v-model="checkfilter.searchValues['country']" class="form-control mb-2"
                                      id="filtertext" placeholder="Search here..">
                                  </template>
                                  <template v-if="checkfilter.showcolumn == 'Allow Date' && checkfilter.types.includes('search')">
                                    <label for="filtertext">Contains</label>
                                    <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                      v-model="checkfilter.searchValues['allow_date']" class="form-control mb-2"
                                      id="filtertext" placeholder="Search here..">
                                  </template>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                <div class="row justify-content-between align-items-center px-3 pb-3">
                  <div class="col-md-3">
                    Showing {{ startPage }} to {{ endPage }} of {{ recordsTotal }} entries
                  </div>
                  <div class="pagination-controls col-md-9 d-flex justify-content-end align-items-center ">
                    <ul class="pagination mb-0">
                      <!-- Previous Button -->
                      <li class="paginate_button page-item previous" :class="{ disabled: currentPage === 1 }">
                        <button class="page-link" @click="getresentUserActivites(currentPage - 1)" :disabled="currentPage === 1" >
                          <i class="fa-solid fa-chevron-left"></i>
                        </button>
                      </li>

                      <!-- Page Numbers -->
                      <template v-for="page in paginationPages" :key="page">
                        <li class="paginate_button page-item" :class="{ active: page === currentPage }">
                          <button class="page-link" @click="getresentUserActivites(page)">
                            {{ page }}
                          </button>
                        </li>
                      </template>

                      <!-- Next Button -->
                      <li class="paginate_button page-item next" :class="{ disabled: currentPage === lastPage }">
                        <button  class="page-link" @click="getresentUserActivites(currentPage + 1)" :disabled="currentPage === lastPage">
                          <i class="fa-solid fa-chevron-right"></i>
                        </button>
                      </li>
                    </ul>
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
  import Loader from "../../../../include/loader.vue";
  import Breadcrumb from "../../../../include/breadcrumb.vue";
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
          { label: "Cookie Consents ", url: "" },
        ],
        getLoader: false,
        currentPage: 1,
        lastPage: 1,
        recordsTotal : 0,
        startPage : 0,
        endPage : 0,
        searchInputValue : "",
        showHiddenExternalFilter: false,
      checkfilter: {
      columns: ['domain'],
      showcolumn: "Domain",
      types: ['search'],
      emptyValues: {
        ip_address : [],
        country : [],
        domain : [],
        allow_date : [],
      },
      notemptyValues: {
        ip_address : [],
        country : [],
        domain : [],
        allow_date : [],
      },
      searchValues: {
        ip_address : [],
        country : [],
        domain : [],
        allow_date : [],
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
          this.getresentUserActivites();
          this.$nextTick(() => {
            const dataTableWrapper = document.querySelectorAll('#cookie_consents_tables_wrapper .row.mx-2');
            if (dataTableWrapper.length > 0) {
              dataTableWrapper[0].style.display = 'none';
              dataTableWrapper[1].style.display = 'none';
            }
          }); 
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    },
    computed: {
      paginationPages() {
        const pages = [];
        const range = 2; 
        const start = Math.max(1, this.currentPage - range);
        const end = Math.min(this.lastPage, this.currentPage + range);

        for (let i = start; i <= end; i++) {
          pages.push(i);
        }
        if (start > 1) {
          pages.unshift(1);
          if (start > 2) pages.splice(1, 0, '...');
        }
        if (end < this.lastPage) {
          pages.push('...');
          pages.push(this.lastPage);
        }
        return pages;
      },
    },
    methods: {
      getresentUserActivites(page = 1, perPage = 10,searchValue = '') {
        this.getLoader = true;
        axios
          .get(this.globalVariables.apiUrl+`admin/cookie-consents/get-data`, {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
            params: { page: page, perPage: perPage,search: searchValue},
          })
          .then((res) => {
            const { data, current_page, last_page,recordsTotal } = res.data;
            this.currentPage = current_page;
            this.lastPage = last_page;
            this.recordsTotal = recordsTotal;

            this.startPage = (current_page - 1) * perPage + 1;
            this.endPage = Math.min(current_page * perPage, recordsTotal);

            if ($.fn.DataTable.isDataTable("#cookie_consents_tables")) {
              $('#cookie_consents_tables').DataTable().destroy();
            }
            var formateDate = this.formatDates;
        var table = $('#cookie_consents_tables').DataTable({
            data:data,
            columns: [
              // { data: 'id' },
              { data: 'id' },
              { data: 'id' },
              { data: 'domain' },
              { data: 'ip_address' },
              { data: 'country' },
              { data: 'convart_allow' }
            ],
            initComplete: () => {
              $('#cookie_consents_tables').wrap('<div class="commonDataTablesClass"></div>');
              const table = $("#cookie_consents_tables").DataTable();
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
              this.attachEventListenersForMenu();
              this.attachEventListenersForSearch();

              const searchInput = $("#cookie_consents_tables_filter input");
              searchInput.val(this.searchInputValue);
              if(this.searchInputValue != ''){
                  searchInput.focus();
              }

              searchInput.off().on("keyup", (e) => {
                const searchTerm = e.target.value;
                this.searchInputValue = searchTerm;
                this.getresentUserActivites(1, perPage, searchTerm);
              });
            },
            createdRow: function (row, data, dataIndex) {
              const perPage = 10; 
              const rowNumber = (dataIndex + 1) + (page - 1) * perPage;
              $('td:eq(1)', row).html(rowNumber);
            },
            columnDefs: [
              {
                targets: 0,
                orderable: false,
                checkboxes: {
                  selectAllRender: '<input type="checkbox" class="form-check-input">'
                },
                render: function () {
                  return '<input type="checkbox" class="dt-checkboxes form-check-input" >';
                },
                searchable: false
              },
            ],
            order: [[1, 'desc']],
            dom: '<"row mx-2"' +
              '<"col-md-4"f>' + 
              '<"col-md-8 dopp_tb d-flex justify-content-end align-items-center"l<"button-wrapper"B>>' + 
              '<"col-md-3 d-none"p>>' +
              't' + 
              '<"row mx-2"' +
              '<"col-md-5 d-none"i>' + 
              '<"col-md-7 d-none"p>>', 
            displayLength: perPage, 
            lengthMenu: [10, 20, 50, 100, 200], 
            language: {
              sLengthMenu: '_MENU_',
              search: '', 
              searchPlaceholder: 'Search Type',
              paginate: { 
                previous: '<i class="fa-solid fa-chevron-left"></i>',
                next: '<i class="fa-solid fa-chevron-right"></i>'
              }
            },
            buttons: [
              {
                  className: "btn btn-primary me-2",
                  text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">SL</a></li><li><a class="dropdown-item" href="#" data-column="2">Domain</a></li><li><a class="dropdown-item" href="#" data-column="3">IP Address</a></li><li><a class="dropdown-item" href="#" data-column="4">User Location</a></li><li><a class="dropdown-item" href="#" data-column="5">Allow Date</a></li></div></ul></div>',
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
          .catch((e) => {
            console.error(e);
          })
          .finally(() => {
            this.getLoader = false;
          });
      },

    externalfilterreset(){
      this.checkfilter.columns = ['domain'],
      this.checkfilter.showcolumn = "Domain",
      this.checkfilter.types = ['search'],
      this.checkfilter.emptyValues = {
        ip_address : [],
        country : [],
        domain : [],
        allow_date : [],
      },
      this.checkfilter.notemptyValues = {
        ip_address : [],
        country : [],
        domain : [],
        allow_date : [],
      },
      this.checkfilter.searchValues = {
        ip_address : [],
        country : [],
        domain : [],
        allow_date : [],
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
              this.globalVariables.apiUrl + "admin/cookie-consents-search-get-data-all-filter",
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
    
              if ($.fn.DataTable.isDataTable("#cookie_consents_tables")) {
                const table = $("#cookie_consents_tables").DataTable();
                table.clear();
                table.rows.add(data ?? []);
                table.draw();
              } else {
                var table = $('#cookie_consents_tables').DataTable({
            data:data,
            columns: [
              // { data: 'id' },
              { data: 'id' },
              { data: 'id' },
              { data: 'domain' },
              { data: 'ip_address' },
              { data: 'country' },
              { data: 'convart_allow' }
            ],
            initComplete: () => {
              $('#cookie_consents_tables').wrap('<div class="commonDataTablesClass"></div>');
              const table = $("#cookie_consents_tables").DataTable();
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
              this.attachEventListenersForMenu();
              this.attachEventListenersForSearch();

              const searchInput = $("#cookie_consents_tables_filter input");
              searchInput.val(this.searchInputValue);
              if(this.searchInputValue != ''){
                  searchInput.focus();
              }

              searchInput.off().on("keyup", (e) => {
                const searchTerm = e.target.value;
                this.searchInputValue = searchTerm;
                this.getresentUserActivites(1, perPage, searchTerm);
              });
            },
            createdRow: function (row, data, dataIndex) {
              const perPage = 10; 
              const rowNumber = (dataIndex + 1) + (page - 1) * perPage;
              $('td:eq(1)', row).html(rowNumber);
            },
            columnDefs: [
              {
                targets: 0,
                orderable: false,
                checkboxes: {
                  selectAllRender: '<input type="checkbox" class="form-check-input">'
                },
                render: function () {
                  return '<input type="checkbox" class="dt-checkboxes form-check-input" >';
                },
                searchable: false
              },
            ],
            order: [[1, 'desc']],
            dom: '<"row mx-2"' +
              '<"col-md-4"f>' + 
              '<"col-md-8 dopp_tb d-flex justify-content-end align-items-center"l<"button-wrapper"B>>' + 
              '<"col-md-3 d-none"p>>' +
              't' + 
              '<"row mx-2"' +
              '<"col-md-5 d-none"i>' + 
              '<"col-md-7 d-none"p>>', 
            displayLength: perPage, 
            lengthMenu: [10, 20, 50, 100, 200], 
            language: {
              sLengthMenu: '_MENU_',
              search: '', 
              searchPlaceholder: 'Search Type',
              paginate: { 
                previous: '<i class="fa-solid fa-chevron-left"></i>',
                next: '<i class="fa-solid fa-chevron-right"></i>'
              }
            },
            buttons: [
              {
                  className: "btn btn-primary me-2",
                  text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">SL</a></li><li><a class="dropdown-item" href="#" data-column="2">Domain</a></li><li><a class="dropdown-item" href="#" data-column="3">IP Address</a></li><li><a class="dropdown-item" href="#" data-column="4">User Location</a></li><li><a class="dropdown-item" href="#" data-column="5">Allow Date</a></li></div></ul></div>',
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

    attachEventListenersOfButton(){
      $("#cookie_consents_tables_wrapper").on("click", "button", (event) => {
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

    attachEventListenersForMenu() {
      $("#cookie_consents_tables_wrapper [name='cookie_consents_tables_length']").on("change", (event) => {
        this.getLoader = true;
        const target = $(event.target);
        const getSelectedValue = target.val();
        this.getresentUserActivites(1,getSelectedValue);
      });
    },

    attachEventListenersForSearch() {
      $("#cookie_consents_tables_wrapper #cookie_consents_tables_filter input").on("keyup", (event) => {
        const target = $(event.target);
        const getSearchValue = target.val();
        this.getresentUserActivites(1,10,getSearchValue);
      });
    },
    },
  };
  </script>
  
  <style>
  #cookie_consents_tables colgroup:nth-of-type(2) {
	display: none !important;
}
  .avatar-img {
    width: 50px;
    height: 50px;
    border-radius: 500%;
  }
  </style>
  