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
              <div class="card-header pt-3 pb-1">
                <h5 class="card-title mb-0">
                  Admin Activities
                </h5>
              </div>
              <div class="card-body">
                <table class="align-middle mb-0 table table-hover" id="admin_activities_datatables">
                  <thead>
                    <tr>
                      <!-- <th></th> -->
                      <th>Date/Time</th>
                      <th>User Role</th>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Ip Address</th>
                      <th>Action Type</th>
                      <th>Module Affected</th>
                      <th>Details</th>
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
                              <a :class="checkfilter.showcolumn == 'Date / Time' ? 'check-active' : ''"
                                @click="clickFilters('created_at', 'search', 'Date / Time')">Date / Time 
                              </a>
                              <template v-if="applyfillters.includes('Date / Time')">
                                <span @click="removeSearch('Date / Time','created_at','search')" id="remove-to-search-list">x</span>
                              </template>
                            </li>
                            <li class="position-relative">
                              <a :class="checkfilter.showcolumn == 'Role' ? 'check-active' : ''"
                                @click="clickFilters('role_id', 'select', 'Role')">Role <i class="fa-solid fa-caret-down"></i>
                              </a>
                              <template v-if="applyfillters.includes('Role')">
                                <span @click="removeSearch('Role','role_id','select')" id="remove-to-search-list">x</span>
                              </template>
                            </li>
                            <li class="position-relative">
                              <a :class="checkfilter.showcolumn == 'Full Name' ? 'check-active' : ''"
                                @click="clickFilters('full_name', 'search', 'Full Name')">Full Name 
                              </a>
                              <template v-if="applyfillters.includes('Full Name')">
                                <span @click="removeSearch('Full Name','full_name','search')" id="remove-to-search-list">x</span>
                              </template>
                            </li>
                            <li class="position-relative">
                              <a :class="checkfilter.showcolumn == 'Email' ? 'check-active' : ''"
                                @click="clickFilters('email', 'search', 'Email')">Email 
                              </a>
                              <template v-if="applyfillters.includes('Email')">
                                <span @click="removeSearch('Email','email','search')" id="remove-to-search-list">x</span>
                              </template>
                            </li>
                            <li class="position-relative">
                              <a :class="checkfilter.showcolumn == 'Ip Address' ? 'check-active' : ''"
                                @click="clickFilters('ip_address', 'search', 'Ip Address')">Ip Address 
                              </a>
                              <template v-if="applyfillters.includes('Ip Address')">
                                <span @click="removeSearch('Ip Address','ip_address','search')" id="remove-to-search-list">x</span>
                              </template>
                            </li>
                            <li class="position-relative">
                              <a :class="checkfilter.showcolumn == 'Action Type' ? 'check-active' : ''"
                                @click="clickFilters('action_type', 'search', 'Action Type')">Action Type 
                              </a>
                              <template v-if="applyfillters.includes('Action Type')">
                                <span @click="removeSearch('Action Type','action_type','search')" id="remove-to-search-list">x</span>
                              </template>
                            </li>
                            <li class="position-relative">
                              <a :class="checkfilter.showcolumn == 'Module Affected' ? 'check-active' : ''"
                                @click="clickFilters('module_affected', 'search', 'Module Affected')">Module Affected 
                              </a>
                              <template v-if="applyfillters.includes('Module Affected')">
                                <span @click="removeSearch('Module Affected','module_affected','search')" id="remove-to-search-list">x</span>
                              </template>
                            </li>
                          </ul>
                        </div>
                        <div class="col-md-6 ps-4">
                          <div v-if="checkfilter.showcolumn != null && checkfilter.showcolumn != ''">
                            <p class="mt-3 mb-1 font-class">{{ checkfilter.showcolumn ?? '' }}</p>
                            <template v-if="checkfilter.showcolumn == 'Date / Time' && checkfilter.types.includes('search')"> 
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
                            <template v-if="checkfilter.showcolumn == 'Role' && checkfilter.types.includes('select')"> 
                              <div class="form-check mb-2">
                                <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['role_id']"
                                  type="checkbox" value="1" id="isemptyvalue">
                                <label class="form-check-label" for="isemptyvalue">
                                  is Empty
                                </label>
                              </div>
                              <div class="form-check mb-2">
                                <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                  v-model="checkfilter.notemptyValues['role_id']" type="checkbox" value="0" id="isnotemptyvalue">
                                <label class="form-check-label" for="isnotemptyvalue">
                                  is not Empty
                                </label>
                              </div>
                            </template>
                            <template v-if="checkfilter.showcolumn == 'Full Name' && checkfilter.types.includes('search')"> 
                              <div class="form-check mb-2">
                                <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['full_name']"
                                  type="checkbox" value="1" id="isemptyvalue">
                                <label class="form-check-label" for="isemptyvalue">
                                  is Empty
                                </label>
                              </div>
                              <div class="form-check mb-2">
                                <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                  v-model="checkfilter.notemptyValues['full_name']" type="checkbox" value="0" id="isnotemptyvalue">
                                <label class="form-check-label" for="isnotemptyvalue">
                                  is not Empty
                                </label>
                              </div>
                            </template>
                            <template v-if="checkfilter.showcolumn == 'Email' && checkfilter.types.includes('search')"> 
                              <div class="form-check mb-2">
                                <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['email']"
                                  type="checkbox" value="1" id="isemptyvalue">
                                <label class="form-check-label" for="isemptyvalue">
                                  is Empty
                                </label>
                              </div>
                              <div class="form-check mb-2">
                                <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                  v-model="checkfilter.notemptyValues['email']" type="checkbox" value="0" id="isnotemptyvalue">
                                <label class="form-check-label" for="isnotemptyvalue">
                                  is not Empty
                                </label>
                              </div>
                            </template>
                            <template v-if="checkfilter.showcolumn == 'Ip Address' && checkfilter.types.includes('search')"> 
                              <div class="form-check mb-2">
                                <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['ip_address']"
                                  type="checkbox" value="1" id="isemptyvalue">
                                <label class="form-check-label" for="isemptyvalue">
                                  is Empty
                                </label>
                              </div>
                              <div class="form-check mb-2">
                                <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                  v-model="checkfilter.notemptyValues['ip_address']" type="checkbox" value="0" id="isnotemptyvalue">
                                <label class="form-check-label" for="isnotemptyvalue">
                                  is not Empty
                                </label>
                              </div>
                            </template>
                            <template v-if="checkfilter.showcolumn == 'Action Type' && checkfilter.types.includes('search')"> 
                              <div class="form-check mb-2">
                                <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['action_type']"
                                  type="checkbox" value="1" id="isemptyvalue">
                                <label class="form-check-label" for="isemptyvalue">
                                  is Empty
                                </label>
                              </div>
                              <div class="form-check mb-2">
                                <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                  v-model="checkfilter.notemptyValues['action_type']" type="checkbox" value="0" id="isnotemptyvalue">
                                <label class="form-check-label" for="isnotemptyvalue">
                                  is not Empty
                                </label>
                              </div>
                            </template>
                            <template v-if="checkfilter.showcolumn == 'Module Affected' && checkfilter.types.includes('search')"> 
                              <div class="form-check mb-2">
                                <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['module_affected']"
                                  type="checkbox" value="1" id="isemptyvalue">
                                <label class="form-check-label" for="isemptyvalue">
                                  is Empty
                                </label>
                              </div>
                              <div class="form-check mb-2">
                                <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                  v-model="checkfilter.notemptyValues['module_affected']" type="checkbox" value="0" id="isnotemptyvalue">
                                <label class="form-check-label" for="isnotemptyvalue">
                                  is not Empty
                                </label>
                              </div>
                            </template>
                            <div>
                              <p>Have value</p>
                              <div>
                                <template v-if="checkfilter.showcolumn == 'Date / Time' && checkfilter.types.includes('search')">
                                  <label for="filtertext">Contains</label>
                                  <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['created_at']"
                                    class="form-control mb-2" id="filtertext" placeholder="Search here..">
                                </template>
                                <template v-if="checkfilter.showcolumn == 'Role' && checkfilter.types.includes('select')">
                                <template v-if="roles?.roles?.length > 0">
                                    <template v-for="(role,index) in roles?.roles" :key="index">
                                      <div class="form-check mb-2">
                                        <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['role_id']" class="form-check-input" type="checkbox" :value="role.id" :id="'dynamicid'+role.id">
                                        <label class="form-check-label" :for="'dynamicid'+role.id">
                                          {{ role.secondary_name ?? '' }}
                                        </label>
                                      </div>
                                    </template>
                                  </template>
                                </template>
                                <template v-if="checkfilter.showcolumn == 'Full Name' && checkfilter.types.includes('search')">
                                  <label for="filtertext">Contains</label>
                                  <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['full_name']"
                                    class="form-control mb-2" id="filtertext" placeholder="Search here..">
                                </template>
                                <template v-if="checkfilter.showcolumn == 'Email' && checkfilter.types.includes('search')">
                                  <label for="filtertext">Contains</label>
                                  <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['email']"
                                    class="form-control mb-2" id="filtertext" placeholder="Search here..">
                                </template>
                                <template v-if="checkfilter.showcolumn == 'Ip Address' && checkfilter.types.includes('search')">
                                  <label for="filtertext">Contains</label>
                                  <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['ip_address']"
                                    class="form-control mb-2" id="filtertext" placeholder="Search here..">
                                </template>
                                <template v-if="checkfilter.showcolumn == 'Action Type' && checkfilter.types.includes('search')">
                                  <label for="filtertext">Contains</label>
                                  <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['action_type']"
                                    class="form-control mb-2" id="filtertext" placeholder="Search here..">
                                </template>
                                <template v-if="checkfilter.showcolumn == 'Module Affected' && checkfilter.types.includes('search')">
                                  <label for="filtertext">Contains</label>
                                  <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['module_affected']"
                                    class="form-control mb-2" id="filtertext" placeholder="Search here..">
                                </template>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
                <div class="row justify-content-between align-items-center">
                <div class="col-md-3">
                  Showing {{ startPage }} to {{ endPage }} of {{ recordsTotal }} entries
                </div>
                <div class="pagination-controls col-md-9 d-flex justify-content-end align-items-center ">
                  <ul class="pagination mb-0">
                    <!-- Previous Button -->
                    <li class="paginate_button page-item previous" :class="{ disabled: currentPage === 1 }">
                      <button class="page-link" @click="getActiviteLog(currentPage - 1)" :disabled="currentPage === 1" >
                        <i class="fa-solid fa-chevron-left"></i>
                      </button>
                    </li>

                    <!-- Page Numbers -->
                    <template v-for="page in paginationPages" :key="page">
                      <li class="paginate_button page-item" :class="{ active: page === currentPage }">
                        <button class="page-link" @click="getActiviteLog(page)">
                          {{ page }}
                        </button>
                      </li>
                    </template>

                    <!-- Next Button -->
                    <li class="paginate_button page-item next" :class="{ disabled: currentPage === lastPage }">
                      <button  class="page-link" @click="getActiviteLog(currentPage + 1)" :disabled="currentPage === lastPage">
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
  import toastr from "toastr";
  import Swal from "sweetalert2";
  import "toastr/build/toastr.min.css";
  import Loader from "../../../../../include/loader.vue";
  import Breadcrumb from "../../../../../include/breadcrumb.vue";
  import { inject } from "vue";
  import { format } from "date-fns";
  import { fetchUserRole } from "@/services/userService";
  
  export default {
    setup() {
      const globalVariables = inject("globalVariables");
      return { globalVariables };
    },
    props : ['roles'],
    components: {
      Loader,
      Breadcrumb,
    },
    data() {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: "/dashboard" },
          { label: "Admin Activities", url: "" },
        ],
        getLoader: false,
        bulkactionids : {
          selectedIds: [],
        },
        countendData: "",
        currentPage: 1,
        lastPage: 1,
        recordsTotal : 0,
        startPage : 0,
        endPage : 0,
        searchInputValue : "",
        showHiddenExternalFilter: false,
        checkfilter: {
          columns: ['created_at'],
          showcolumn: "Date / Time",
          types : ['search'],
          emptyValues : {
            created_at : [],
            role_id : [],
            full_name : [],
            email : [],
            ip_address : [],
            action_type : [],
            module_affected : [],
          },
          notemptyValues : {
            created_at : [],
            role_id : [],
            full_name : [],
            email : [],
            ip_address : [],
            action_type : [],
            module_affected : [],
          },
          searchValues : {
            created_at : [],
            full_name : [],
            email : [],
            ip_address : [],
            action_type : [],
            module_affected : [],
          },
          selectedValues: {
            role_id : [],
          },
        },
        applyfillters : [],
      };
    },
    async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role == 'Super' || role == 'Admin') {
          this.getActiviteLog();
          this.$nextTick(() => {
            const dataTableWrapper = document.querySelectorAll('#admin_activities_datatables_wrapper .row.mx-2');
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
    getActiviteLog(page = 1, perPage = 10, searchValue = '') {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl + "admin/manage/activitie-log", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          params: { page: page, perPage: perPage, search: searchValue },
        })
        .then((res) => {
          this.countendData = res.data.data;
          const { data, current_page, last_page, recordsTotal } = res.data;
          this.currentPage = current_page;
          this.lastPage = last_page;
          this.recordsTotal = recordsTotal;
          this.startPage = (current_page - 1) * perPage + 1;
          this.endPage = Math.min(current_page * perPage, recordsTotal);
          if ($.fn.DataTable.isDataTable("#admin_activities_datatables")) {
            $("#admin_activities_datatables").DataTable().destroy();
          }
          var table = $("#admin_activities_datatables").DataTable({
            data: data,
            columns: [
              { 
                data: "created_at",
                render: function (data, type, row) {
                  if (!data) return "------";
                  const dt = new Date(data);
                  const date = dt.toISOString().slice(0, 10);
                  const time = dt.toTimeString().slice(0, 8);
                  return '<span title="'+ `${date}<br>${time}`+'">'+ `${date}<br>${time}`+'</span>';
                }
              },
              { 
                data: "user",
                render: function (data, type, row) {
                  if (!data.role.secondary_name) return "------";
                  return '<span title="'+data.role.secondary_name+'">'+data.role.secondary_name+'</span>';
                }
               },
              { 
                data: "user",
                render: function (data, type, row) {
                  if (data?.fname != null && data?.lname != null && data?.company_name != null) {
                    return '<span title="'+data.fname + ' ' + data.lname + ' (' + data.company_name + ')'+'">'+data.fname + ' ' + data.lname + ' (' + data.company_name + ')'+'</span>';
                  } else if (data?.fname != null && data?.lname != null) {
                    return '<span title="'+data.fname + ' ' + data.lname+'">'+data.fname + ' ' + data.lname+'</span>';
                  } else if (data?.fname != null && data?.company_name != null) {
                    return '<span title="'+data.fname + ' (' + data.company_name + ')'+'">'+data.fname + ' (' + data.company_name + ')'+'</span>';
                  } else if (data?.lname != null && data?.company_name != null) {
                    return '<span title="'+data.lname + ' (' + data.company_name + ')'+'">'+data.lname + ' (' + data.company_name + ')'+'</span>';
                  } else if (data?.fname != null) {
                    return '<span title="'+data.fname+'">'+data.fname+'</span>';
                  } else if (data?.lname != null) {
                    return '<span title="'+data.lname+'">'+data.lname+'</span>';
                  } else if (data?.company_name != null) {
                    return '<span title="'+data.company_name+'">'+data.company_name+'</span>';
                  } else {
                    return '----';
                  }

                } 
              },
              {
                 data: "user",
                  render: function (data, type, row) {
                    if (data?.email != null) {
                      return '<span title="'+data.email+'">'+data.email+'</span>';
                    } else {
                      return '----';
                    }
                  } 
               },
              { 
                data: "ip_address",
                render: function (data, type, row) {
                    if (row?.ip_address != null) {
                      return '<span title="'+row.ip_address+'">'+row.ip_address+'</span>';
                    } else {
                      return '----';
                    }
                } 
               },
              { 
                data: "action_type",
              render: function (data, type, row) {
                    if (row?.action_type != null) {
                      return '<span title="'+row.action_type+'">'+row.action_type+'</span>';
                    } else {
                      return '----';
                    }
                } 
              },
              { 
                data: "module_affected",
                render: function (data, type, row) {
                    if (row?.module_affected != null) {
                      return '<span title="'+row.module_affected+'">'+row.module_affected+'</span>';
                    } else {
                      return '----';
                    }
                } 
               },
              { 
                data: "description",
                render: function (data, type, row) {
                    if (row?.description != null) {
                      return '<span title="'+row.description+'">'+row.description+'</span>';
                    } else {
                      return '----';
                    }
                } 
               },
              
            ],
            initComplete: () => {
              $('#admin_activities_datatables').wrap('<div class="commonDataTablesClass"></div>');
              const table = $("#admin_activities_datatables").DataTable();
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
              const searchInput = $("#admin_activities_datatables_filter input");
              searchInput.val(this.searchInputValue);
              if (this.searchInputValue != '') {
                searchInput.focus();
              }

              searchInput.off().on("keyup", (e) => {
                const searchTerm = e.target.value;
                this.searchInputValue = searchTerm;
                this.getActiviteLog(1, perPage, searchTerm);
              });
              this.attachEventListenersOfButton();

              $('<style>')
                .prop('type', 'text/css')
                .html(`
                  .select-checkbox .sorting_asc,
                  .select-checkbox .sorting_desc,
                  .select-checkbox .sorting {
                    display: none !important;
                  }
                `)
                .appendTo('head');
            },
            // createdRow: function (row, data, dataIndex) {
            //   const perPage = 10;
            //   const rowNumber = (dataIndex + 1) + (page - 1) * perPage;
            //   $('td:eq(1)', row).html(rowNumber);
            // },
            columnDefs: [
            ],
            orderCellsTop: true,
            order: [[1, "asc"]], 
            dom:
              '<"row mx-2"' +
              '<"col-md-4"f>' +
              '<"col-md-8 dopp_tb d-flex justify-content-end align-items-center"l<"button-wrapper"B>>' +
              '<"col-md-3 d-none"p>>' +
              "t" +
              '<"row mx-2"' +
              '<"col-md-5 d-none"i>' +
              '<"col-md-7 d-none"p>>',
            displayLength: perPage,
            lengthMenu: [10, 20, 50, 100, 200],
            language: {
              sLengthMenu: "_MENU_",
              search: "",
              searchPlaceholder: "Search Activite Log",
              paginate: {
                previous: '<i class="fa-solid fa-chevron-left"></i>',
                next: '<i class="fa-solid fa-chevron-right"></i>',
              },
            },
            buttons: [
              {
                extend: "collection",
                className: "btn btn-label-primary dropdown-toggle me-3",
                text: '<i class="ti ti-screen-share me-1 ti-xs"></i>Export',
                buttons: [
                  {
                    extend: "print",
                    text: '<i class="ti ti-printer me-1 ti-xs text-primary"></i>Print',
                    className: "dropdown-item",
                    exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7] },
                  },
                  {
                    extend: "csv",
                    text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                    className: "dropdown-item",
                    exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7] },
                  },
                  {
                    extend: "excel",
                    text:
                      '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                    className: "dropdown-item",
                    exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7] },
                  },
                  {
                    extend: "pdf",
                    text:
                      '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                    className: "dropdown-item",
                    exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7] },
                  },
                  {
                    extend: "copy",
                    text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                    className: "dropdown-item",
                    exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7] },
                  },
                ],
              },
              {
                  className: "btn btn-primary me-2",
                  text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Date/Time</a></li><li><a class="dropdown-item" href="#" data-column="1">User Role</a></li><li><a class="dropdown-item" href="#" data-column="2">Full Name</a></li><li><a class="dropdown-item" href="#" data-column="3">Email</a></li><li><a class="dropdown-item" href="#" data-column="4">Ip Address</a></li><li><a class="dropdown-item" href="#" data-column="5">Action Type</a></li><li><a class="dropdown-item" href="#" data-column="6">Module Affected</a></li><li><a class="dropdown-item" href="#" data-column="7">Details</a></li></div></ul></div>',
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
          console.error(error);
          this.getLoader = false;
        });
    },

    attachEventListenersOfButton() {
      $("#admin_activities_datatables_wrapper").on("click", "button", (event) => {
        const target = $(event.target);
        const dataClass = target.attr("id");
        if(dataClass == 'all_filters'){
          this.showHiddenExternalFilter = !this.showHiddenExternalFilter;
        } 
      });
    },

    externalfilterreset(){
      this.checkfilter.columns = ['created_at'],
      this.checkfilter.showcolumn = "Date / Time",
      this.checkfilter.types = ['search'],
      this.checkfilter.emptyValues = {
        created_at : [],
        role_id : [],
        full_name : [],
        email : [],
        ip_address : [],
        action_type : [],
        module_affected : [],
      },
      this.checkfilter.notemptyValues = {
        created_at : [],
        role_id : [],
        full_name : [],
        email : [],
        ip_address : [],
        action_type : [],
        module_affected : [],
      },
      this.checkfilter.searchValues = {
        created_at : [],
        full_name : [],
        email : [],
        ip_address : [],
        action_type : [],
        module_affected : [],
      },
      this.checkfilter.selectedValues = {
        role_id : [],
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
              this.globalVariables.apiUrl + "admin/manage/activitie-log/search-get-data-all-filter",
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
    
              if ($.fn.DataTable.isDataTable("#admin_activities_datatables")) {
                const table = $("#admin_activities_datatables").DataTable();
                table.clear();
                table.rows.add(data ?? []);
                table.draw();
              } else {
               var table = $("#admin_activities_datatables").DataTable({
            data: data,
            columns: [
              { 
                data: "created_at",
                render: function (data, type, row) {
                  if (!data) return "------";
                  const dt = new Date(data);
                  const date = dt.toISOString().slice(0, 10);
                  const time = dt.toTimeString().slice(0, 8);
                  return '<span title="'+ `${date}<br>${time}`+'">'+ `${date}<br>${time}`+'</span>';
                }
              },
              { 
                data: "user",
                render: function (data, type, row) {
                  if (!data.role.secondary_name) return "------";
                  return '<span title="'+data.role.secondary_name+'">'+data.role.secondary_name+'</span>';
                }
               },
              { 
                data: "user",
                render: function (data, type, row) {
                  if (data?.fname != null && data?.lname != null && data?.company_name != null) {
                    return '<span title="'+data.fname + ' ' + data.lname + ' (' + data.company_name + ')'+'">'+data.fname + ' ' + data.lname + ' (' + data.company_name + ')'+'</span>';
                  } else if (data?.fname != null && data?.lname != null) {
                    return '<span title="'+data.fname + ' ' + data.lname+'">'+data.fname + ' ' + data.lname+'</span>';
                  } else if (data?.fname != null && data?.company_name != null) {
                    return '<span title="'+data.fname + ' (' + data.company_name + ')'+'">'+data.fname + ' (' + data.company_name + ')'+'</span>';
                  } else if (data?.lname != null && data?.company_name != null) {
                    return '<span title="'+data.lname + ' (' + data.company_name + ')'+'">'+data.lname + ' (' + data.company_name + ')'+'</span>';
                  } else if (data?.fname != null) {
                    return '<span title="'+data.fname+'">'+data.fname+'</span>';
                  } else if (data?.lname != null) {
                    return '<span title="'+data.lname+'">'+data.lname+'</span>';
                  } else if (data?.company_name != null) {
                    return '<span title="'+data.company_name+'">'+data.company_name+'</span>';
                  } else {
                    return '----';
                  }

                } 
              },
              {
                 data: "user",
                  render: function (data, type, row) {
                    if (data?.email != null) {
                      return '<span title="'+data.email+'">'+data.email+'</span>';
                    } else {
                      return '----';
                    }
                  } 
               },
              { 
                data: "ip_address",
                render: function (data, type, row) {
                    if (row?.ip_address != null) {
                      return '<span title="'+row.ip_address+'">'+row.ip_address+'</span>';
                    } else {
                      return '----';
                    }
                } 
               },
              { 
                data: "action_type",
              render: function (data, type, row) {
                    if (row?.action_type != null) {
                      return '<span title="'+row.action_type+'">'+row.action_type+'</span>';
                    } else {
                      return '----';
                    }
                } 
              },
              { 
                data: "module_affected",
                render: function (data, type, row) {
                    if (row?.module_affected != null) {
                      return '<span title="'+row.module_affected+'">'+row.module_affected+'</span>';
                    } else {
                      return '----';
                    }
                } 
               },
              { 
                data: "description",
                render: function (data, type, row) {
                    if (row?.description != null) {
                      return '<span title="'+row.description+'">'+row.description+'</span>';
                    } else {
                      return '----';
                    }
                } 
               },
              
            ],
            initComplete: () => {
              $('#admin_activities_datatables').wrap('<div class="commonDataTablesClass"></div>');
              const table = $("#admin_activities_datatables").DataTable();
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
              const searchInput = $("#admin_activities_datatables_filter input");
              searchInput.val(this.searchInputValue);
              if (this.searchInputValue != '') {
                searchInput.focus();
              }

              searchInput.off().on("keyup", (e) => {
                const searchTerm = e.target.value;
                this.searchInputValue = searchTerm;
                this.getActiviteLog(1, perPage, searchTerm);
              });
              this.attachEventListenersOfButton();

              $('<style>')
                .prop('type', 'text/css')
                .html(`
                  .select-checkbox .sorting_asc,
                  .select-checkbox .sorting_desc,
                  .select-checkbox .sorting {
                    display: none !important;
                  }
                `)
                .appendTo('head');
            },
            // createdRow: function (row, data, dataIndex) {
            //   const perPage = 10;
            //   const rowNumber = (dataIndex + 1) + (page - 1) * perPage;
            //   $('td:eq(1)', row).html(rowNumber);
            // },
            columnDefs: [
            ],
            orderCellsTop: true,
            order: [[1, "asc"]], 
            dom:
              '<"row mx-2"' +
              '<"col-md-4"f>' +
              '<"col-md-8 dopp_tb d-flex justify-content-end align-items-center"l<"button-wrapper"B>>' +
              '<"col-md-3 d-none"p>>' +
              "t" +
              '<"row mx-2"' +
              '<"col-md-5 d-none"i>' +
              '<"col-md-7 d-none"p>>',
            displayLength: perPage,
            lengthMenu: [10, 20, 50, 100, 200],
            language: {
              sLengthMenu: "_MENU_",
              search: "",
              searchPlaceholder: "Search Activite Log",
              paginate: {
                previous: '<i class="fa-solid fa-chevron-left"></i>',
                next: '<i class="fa-solid fa-chevron-right"></i>',
              },
            },
            buttons: [
              {
                extend: "collection",
                className: "btn btn-label-primary dropdown-toggle me-3",
                text: '<i class="ti ti-screen-share me-1 ti-xs"></i>Export',
                buttons: [
                  {
                    extend: "print",
                    text: '<i class="ti ti-printer me-1 ti-xs text-primary"></i>Print',
                    className: "dropdown-item",
                    exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7] },
                  },
                  {
                    extend: "csv",
                    text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                    className: "dropdown-item",
                    exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7] },
                  },
                  {
                    extend: "excel",
                    text:
                      '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                    className: "dropdown-item",
                    exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7] },
                  },
                  {
                    extend: "pdf",
                    text:
                      '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                    className: "dropdown-item",
                    exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7] },
                  },
                  {
                    extend: "copy",
                    text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                    className: "dropdown-item",
                    exportOptions: { columns: [0, 1, 2, 3, 4, 5, 6, 7] },
                  },
                ],
              },
              {
                  className: "btn btn-primary me-2",
                  text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Date/Time</a></li><li><a class="dropdown-item" href="#" data-column="1">User Role</a></li><li><a class="dropdown-item" href="#" data-column="2">Full Name</a></li><li><a class="dropdown-item" href="#" data-column="3">Email</a></li><li><a class="dropdown-item" href="#" data-column="4">Ip Address</a></li><li><a class="dropdown-item" href="#" data-column="5">Action Type</a></li><li><a class="dropdown-item" href="#" data-column="6">Module Affected</a></li><li><a class="dropdown-item" href="#" data-column="7">Details</a></li></div></ul></div>',
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
    },
  };
  </script>
  <style>
  #admin_activities_datatables colgroup:nth-of-type(2) {
      display: none !important;
  }
  #admin_activities_datatables .dt-checkboxes-cell{
      padding: 0.7rem 0.5rem !important;
  }
  </style>
  