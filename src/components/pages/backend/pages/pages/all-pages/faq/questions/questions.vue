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
                <div class="card-header  py-2">
                    <h5 class="card-title mt-2 mb-0">
                        FAQ Questions 
                    </h5>
                </div>
                <div class="card-body">
                    <table class="align-middle mb-0 table table-hover" id="questions_tables">
                        <thead>
                            <tr>
                                <!-- <th></th> -->
                                <th></th>
                                <th>SL</th>
                                <th>Service Name</th>
                                <th>FAQ Questions</th>
                                <th>FAQ Answer</th>
                                <th>Status</th>
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
                      <h5 class="mb-0">Apply Filter <template v-if="applyfillters.length > 0"><span class="badge bg-dark text-white">{{ applyfillters.length ?? 0 }}</span></template></h5>
                      <a class="clearallexternalfilter" @click="externalfilterreset()">Clear All</a>
                    </div>
                  </div>
                  <div class="row px-3" id="externalFiltersWrapper">
                    <div class="col-md-6 border-right">
                      <ul class="px-0 mt-3" id="offer-extra-filter">
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Service Name' ? 'check-active' : ''"
                            @click="clickFilters('service_name', 'search', 'Service Name')">Service Name 
                          </a>
                          <template v-if="applyfillters.includes('Service Name')">
                            <span @click="removeSearch('Service Name','service_name','search')" id="remove-to-search-list">x</span>
                          </template>
                        </li>

                         <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'FAQ Questions' ? 'check-active' : ''"
                            @click="clickFilters('faq_questions', 'search', 'FAQ Questions')">FAQ Questions 
                          </a>
                          <template v-if="applyfillters.includes('FAQ Questions')">
                            <span @click="removeSearch('FAQ Questions','faq_questions','search')" id="remove-to-search-list">x</span>
                          </template>
                        </li>

                         <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'FAQ Answer' ? 'check-active' : ''"
                            @click="clickFilters('faq_answer', 'search', 'FAQ Answer')">FAQ Answer 
                          </a>
                          <template v-if="applyfillters.includes('FAQ Answer')">
                            <span @click="removeSearch('FAQ Answer','faq_answer','search')" id="remove-to-search-list">x</span>
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
                        <template v-if="checkfilter.showcolumn == 'Service Name' && checkfilter.types.includes('search')"> 
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['service_name']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['service_name']" type="checkbox" value="0" id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>

                          <template v-if="checkfilter.showcolumn == 'FAQ Questions' && checkfilter.types.includes('search')"> 
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['faq_questions']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['faq_questions']" type="checkbox" value="0" id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>

                          <template v-if="checkfilter.showcolumn == 'FAQ Answer' && checkfilter.types.includes('search')"> 
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['faq_answer']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['faq_answer']" type="checkbox" value="0" id="isnotemptyvalue">
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
                            <template v-if="checkfilter.showcolumn == 'Service Name' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['service_name']"
                                class="form-control mb-2" id="filtertext" placeholder="Search here..">
                            </template>

                             <template v-if="checkfilter.showcolumn == 'FAQ Questions' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['faq_questions']"
                                class="form-control mb-2" id="filtertext" placeholder="Search here..">
                            </template>

                                <template v-if="checkfilter.showcolumn == 'FAQ Answer' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['faq_answer']"
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

                    <div class="row justify-content-between align-items-center">
                    <div class="col-md-3">
                      Showing {{ startPage }} to {{ endPage }} of {{ recordsTotal }} entries
                    </div>
                    <div class="pagination-controls col-md-9 d-flex justify-content-end align-items-center ">
                      <ul class="pagination mb-0">
                        <!-- Previous Button -->
                        <li class="paginate_button page-item previous" :class="{ disabled: currentPage === 1 }">
                          <button class="page-link" @click="getQuestionsData(currentPage - 1)" :disabled="currentPage === 1" >
                            <i class="fa-solid fa-chevron-left"></i>
                          </button>
                        </li>

                        <!-- Page Numbers -->
                        <template v-for="page in paginationPages" :key="page">
                          <li class="paginate_button page-item" :class="{ active: page === currentPage }">
                            <button class="page-link" @click="getQuestionsData(page)">
                              {{ page }}
                            </button>
                          </li>
                        </template>

                        <!-- Next Button -->
                        <li class="paginate_button page-item next" :class="{ disabled: currentPage === lastPage }">
                          <button  class="page-link" @click="getQuestionsData(currentPage + 1)" :disabled="currentPage === lastPage">
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
        { label: "FAQ", url: "" },
        { label: "Questions", url: "" },
      ],  
      getLoader: false,
      currentPage: 1,
      lastPage: 1,
      recordsTotal : 0,
      startPage : 0,
      endPage : 0,
      searchInputValue : "",
      bulkactionids : {
        selectedIds: [],
        status : "",
      },
      showHiddenExternalFilter: false,
      checkfilter: {
        columns: ['service_name'],
        showcolumn: "Service Name",
        types : ['search'],
        emptyValues : {
          service_name : [],
          faq_questions : [],
            faq_answer : [],
          status : [],
          created_at : [],
        },
        notemptyValues : {
          service_name : [],
          faq_questions : [],
            faq_answer : [],
          status : [],
          created_at : [],
        },
        searchValues : {
          service_name : [],
          faq_questions : [],
            faq_answer : [],
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
        this.getQuestionsData();
        this.$nextTick(() => {
          const dataTableWrapper = document.querySelectorAll('#questions_tables_wrapper .row.mx-2');
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
    getQuestionsData(page = 1, perPage = 10,searchValue = '') {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl+"admin/faq/questions", {
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

          if ($.fn.DataTable.isDataTable("#questions_tables")) {
            $('#questions_tables').DataTable().destroy();
          }
          var table = $('#questions_tables').DataTable({
            data: data,
            columns: [
              // { data: 'id' },
              { data: 'id' },
              { data: 'id' },
              { data: "faq_service.service_name",
                render: function (data, type, row) {
                if (row?.faq_service?.service_name != null) {
                  return '<span title="'+row?.faq_service?.service_name+'">'+row?.faq_service?.service_name+'</span>';
                }
                return '----------';
              },
               },
              { data: "faq_qustion" ,
                render: function (data, type, row) {
                if (row?.faq_qustion != null) {
                  return '<span title="'+row?.faq_qustion+'">'+row?.faq_qustion+'</span>';
                }
                return '----------';
              },
              },
              { data: "faq_ans",
                render: function (data, type, row) {
                if (row?.faq_ans != null) {
                  return '<span title="'+row?.faq_ans+'">'+row?.faq_ans+'</span>';
                }
                return '----------';
              },
               },
              { data: "convart_status" },
              { data: "convart_date" },
              { data: '' }
            ],
            initComplete: () => { 
              $('#questions_tables').wrap('<div class="commonDataTablesClass"></div>');
              const table = $("#questions_tables").DataTable();
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
              this.attachEventListenersForMenu();
              this.attachEventListenersForSearch();

              this.attachEventListenersBlulkAction();
              this.attachEventListenersBlulkActionSubmit();

              const searchInput = $("#questions_tables_filter input");
              searchInput.val(this.searchInputValue);
              if(this.searchInputValue != ''){
                  searchInput.focus();
              }

              searchInput.off().on("keyup", (e) => {
                const searchTerm = e.target.value;
                this.searchInputValue = searchTerm;
                this.getQuestionsData(1, perPage, searchTerm);
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
                  return '<div class="questions_action d-flex align-items-center"><a data-vue-route href="/admin-faq-questions-edit/'+full.id+'" title="Edit" class="bg-transparent border-0 text-primary me-2" ><i class="far fa-edit fa-sm"></i></a><button type="button" id="delete-btn" title="Delete"  data-id='+full.id +' class="bg-transparent border-0 text-danger"><i class="far fa-trash-alt fa-sm" id="delete-btn" data-id='+full.id +'></i></button></div>'; 
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
              '<"col-md-5 d-none"i>' + 
              '<"col-md-7 d-none"p>>', 
            displayLength: perPage, 
            lengthMenu: [10, 20, 50, 100, 200], 
            language: {
              sLengthMenu: '_MENU_',
              search: '', 
              searchPlaceholder: 'Search Question',
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
                        <option value="0">Bulk Pending</option>
                        <option value="1">Bulk Publish</option>
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
                  className: "btn btn-primary me-2",
                  text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">Sl</a></li><li><a class="dropdown-item" href="#" data-column="2">Service Name</a></li><li><a class="dropdown-item" href="#" data-column="3">FAQ Questions</a></li><li><a class="dropdown-item" href="#" data-column="4">FAQ Answer</a></li><li><a class="dropdown-item" href="#" data-column="5">Status</a></li><li><a class="dropdown-item" href="#" data-column="6">Created At</a></li><li><a class="dropdown-item" href="#" data-column="7">Actions</a></li></div></ul></div>',
                },
                 {
                  text:
                    '<span id="all_filters" class="all_filters"><i class="fa-solid fa-magnifying-glass me-1"></i>All Filters</span>',
                  className: "btn btn-primary",
                  attr: { id: "all_filters"},
                },
            ],
          });
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
          service_name : [],
          faq_questions : [],
            faq_answer : [],
          status : [],
          created_at : [],
          status : [],
          created_at : [],
      },
      this.checkfilter.notemptyValues = {
          service_name : [],
          faq_questions : [],
            faq_answer : [],
          status : [],
          created_at : [],
      },
      this.checkfilter.searchValues = {
           service_name : [],
          faq_questions : [],
            faq_answer : [],
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

     attachEventListenersOfButton() {
          $("#questions_tables_wrapper ").on("click", "button", (event) => {
            const target = $(event.target);
            const dataClass = target.attr("id");
            if(dataClass == 'all_filters'){
              this.showHiddenExternalFilter = !this.showHiddenExternalFilter;
            } 
          });
        },

    attachEventListenersBlulkAction() {
      $('#questions_tables').on('change', '.row-checkbox', (event) => {
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
      $('#questions_tables thead').on('change', 'input[type="checkbox"]', (event) => {
        const isChecked = event.target.checked;
        $('#questions_tables tbody .row-checkbox').each((index, checkbox) => {
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
            const alertTitle = "Question Want to Publish";
            this.bulkStatusChange(alertTitle);
          }else{
            this.bulkactionids.status = '0';
            const alertTitle = "Question Want to Pending";
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
                this.globalVariables.apiUrl + "admin/faq/questions/bulk/delete",
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
                  this.getQuestionsData();
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
                this.globalVariables.apiUrl + "admin/faq/questions/bulk/status",
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
                  this.getQuestionsData();
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


    attachEventListeners() {
      $("#questions_tables").on("click", ".questions_action", (event) => {
        const target = $(event.target);
        const dataId = target.data("id");
        const dataClass = target.attr("id");
        if(dataClass === 'delete-btn'){
          this.deleteQuestions(dataId);
        }
      });
    },

    // attachEventListenersOfButton(){
    //   $("#questions_tables_wrapper").on("click", "button", (event) => {
    //     const target = $(event.target);
    //     const dataClass = target.attr("id");
    //     if (dataClass === "create") {
    //       this.$router.push("/admin-faq-questions-create");
    //     } 
    //   });
    // },

    attachEventListenersForMenu() {
      $("#questions_tables_wrapper [name='questions_tables_length']").on("change", (event) => {
        this.getLoader = true;
        const target = $(event.target);
        const getSelectedValue = target.val();
        this.getQuestionsData(1,getSelectedValue);
      });
    },
    attachEventListenersForSearch() {
      $("#questions_tables_wrapper #questions_tables_filter input").on("keyup", (event) => {
        const target = $(event.target);
        const getSearchValue = target.val();
        this.getQuestionsData(1,10,getSearchValue);
      });
    },

    // Questions Delete
    deleteQuestions(id) {
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
            .get(this.globalVariables.apiUrl+`admin/faq/questions/delete/${id}`, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((res) => {
                toastr.success(res.data.message);
                this.getQuestionsData();
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
};
</script>
<style>
#questions_tables colgroup:nth-of-type(2) {
	display: none !important;
}
#questions_tables .dt-checkboxes-cell{
	padding: 0.7rem 0.5rem !important;
}
#questions_tables td {
  white-space: nowrap; /* Prevents wrapping */
  overflow: hidden; /* Hides overflow */
  text-overflow: ellipsis; /* Adds "..." for overflow */
  max-width: 100px; /* Set max width for cell */
}
</style>


