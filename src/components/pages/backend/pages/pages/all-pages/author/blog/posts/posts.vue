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
          <div class="card mt-4">
            <div class="card-header py-2">
              <h5 class="card-title mt-2 mb-0">Blog Posts</h5>
            </div>
            <div class="card-body">
              <table class="align-middle mb-0 table table-hover" id="posts_tables">
                <thead>
                  <tr>
                    <!-- <th></th> -->
                    <th></th>
                    <th>SL</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Status</th>
                    <th>View</th>
                    <th>Created at</th>
                    <th>Operations</th>
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
                                          <a :class="checkfilter.showcolumn == 'Title' ? 'check-active' : ''"
                                            @click="clickFilters('title', 'search', 'Title')">Title
                                          </a>
                                          <template v-if="applyfillters.includes('Title')">
                                            <span @click="removeSearch('Title', 'title', 'search')"
                                              id="remove-to-search-list">x</span>
                                          </template>
                                        </li>
                                        <li class="position-relative">
                                          <a :class="checkfilter.showcolumn == 'Slug' ? 'check-active' : ''"
                                            @click="clickFilters('slug', 'search', 'Slug')">Slug
                                          </a>
                                          <template v-if="applyfillters.includes('Slug')">
                                            <span @click="removeSearch('Slug', 'slug', 'search')"
                                              id="remove-to-search-list">x</span>
                                          </template>
                                        </li>
                                        <li class="position-relative">
                                        <a :class="checkfilter.showcolumn == 'Status' ? 'check-active' : ''"
                                          @click="clickFilters('status', 'select', 'Status')">Status <i class="fa-solid fa-caret-down"></i>
                                        </a>
                                        <template v-if="applyfillters.includes('Status')">
                                          <span @click="removeSearch('Status', 'status', 'select')" id="remove-to-search-list">x</span>
                                        </template>
                                      </li>
                                        <li class="position-relative">
                                          <a :class="checkfilter.showcolumn == 'Views' ? 'check-active' : ''"
                                            @click="clickFilters('views', 'search', 'Views')">Views
                                          </a>
                                          <template v-if="applyfillters.includes('Views')">
                                            <span @click="removeSearch('Views', 'views', 'search')"
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
                                        <template v-if="checkfilter.showcolumn == 'Title' && checkfilter.types.includes('search')">
                                          <div class="form-check mb-2">
                                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                              v-model="checkfilter.emptyValues['title']" type="checkbox" value="1"
                                              id="isemptyvalue">
                                            <label class="form-check-label" for="isemptyvalue">
                                              is Empty
                                            </label>
                                          </div>
                                          <div class="form-check mb-2">
                                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                              v-model="checkfilter.notemptyValues['title']" type="checkbox" value="0"
                                              id="isnotemptyvalue">
                                            <label class="form-check-label" for="isnotemptyvalue">
                                              is not Empty
                                            </label>
                                          </div>
                                        </template>
                                        <template v-if="checkfilter.showcolumn == 'Slug' && checkfilter.types.includes('search')">
                                          <div class="form-check mb-2">
                                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                              v-model="checkfilter.emptyValues['slug']" type="checkbox" value="1"
                                              id="isemptyvalue">
                                            <label class="form-check-label" for="isemptyvalue">
                                              is Empty
                                            </label>
                                          </div>
                                          <div class="form-check mb-2">
                                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                              v-model="checkfilter.notemptyValues['slug']" type="checkbox" value="0"
                                              id="isnotemptyvalue">
                                            <label class="form-check-label" for="isnotemptyvalue">
                                              is not Empty
                                            </label>
                                          </div>
                                        </template>
                                        <template v-if="checkfilter.showcolumn == 'Status' && checkfilter.types.includes('select')">
                                        <div class="form-check mb-2">
                                          <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                            v-model="checkfilter.emptyValues['status']" type="checkbox" value="1" id="isemptyvalue">
                                          <label class="form-check-label" for="isemptyvalue">
                                            is Empty
                                          </label>
                                        </div>
                                        <div class="form-check mb-2">
                                          <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                            v-model="checkfilter.notemptyValues['status']" type="checkbox" value="0"
                                            id="isnotemptyvalue">
                                          <label class="form-check-label" for="isnotemptyvalue">
                                            is not Empty
                                          </label>
                                        </div>
                                      </template>
                                        <template v-if="checkfilter.showcolumn == 'Views' && checkfilter.types.includes('search')">
                                          <div class="form-check mb-2">
                                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                              v-model="checkfilter.emptyValues['views']" type="checkbox" value="1"
                                              id="isemptyvalue">
                                            <label class="form-check-label" for="isemptyvalue">
                                              is Empty
                                            </label>
                                          </div>
                                          <div class="form-check mb-2">
                                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                              v-model="checkfilter.notemptyValues['views']" type="checkbox" value="0"
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
                                            <template v-if="checkfilter.showcolumn == 'Title' && checkfilter.types.includes('search')">
                                              <label for="filtertext">Contains</label>
                                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                                v-model="checkfilter.searchValues['title']" class="form-control mb-2"
                                                id="filtertext" placeholder="Search here..">
                                            </template>
                                            <template v-if="checkfilter.showcolumn == 'Slug' && checkfilter.types.includes('search')">
                                              <label for="filtertext">Contains</label>
                                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                                v-model="checkfilter.searchValues['slug']" class="form-control mb-2"
                                                id="filtertext" placeholder="Search here..">
                                            </template>
                                            <template v-if="checkfilter.showcolumn == 'Status' && checkfilter.types.includes('select')">
                                            <div class="form-check mb-2">
                                              <input @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                                v-model="checkfilter.selectedValues['status']" class="form-check-input"
                                                type="checkbox" value="1" id="dynamicidstatus1">
                                              <label class="form-check-label" for="dynamicidstatus1">
                                                Publish
                                              </label>
                                            </div>
                                            <div class="form-check mb-2">
                                              <input @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                                v-model="checkfilter.selectedValues['status']" class="form-check-input"
                                                type="checkbox" value="0" id="dynamicidstatus0">
                                              <label class="form-check-label" for="dynamicidstatus0">
                                                Pending
                                              </label>
                                            </div>
                                          </template>
                                            <template v-if="checkfilter.showcolumn == 'Views' && checkfilter.types.includes('search')">
                                              <label for="filtertext">Contains</label>
                                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                                v-model="checkfilter.searchValues['views']" class="form-control mb-2"
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
              <div class="row justify-content-between align-items-center">
                <div class="col-md-3">
                  Showing {{ startPage }} to {{ endPage }} of {{ recordsTotal }} entries
                </div>
                <div class="pagination-controls col-md-9 d-flex justify-content-end align-items-center ">
                  <ul class="pagination mb-0">
                    <!-- Previous Button -->
                    <li class="paginate_button page-item previous" :class="{ disabled: currentPage === 1 }">
                      <button class="page-link" @click="getPostData(currentPage - 1)" :disabled="currentPage === 1" >
                        <i class="fa-solid fa-chevron-left"></i>
                      </button>
                    </li>

                    <!-- Page Numbers -->
                    <template v-for="page in paginationPages" :key="page">
                      <li class="paginate_button page-item" :class="{ active: page === currentPage }">
                        <button class="page-link" @click="getPostData(page)">
                          {{ page }}
                        </button>
                      </li>
                    </template>

                    <!-- Next Button -->
                    <li class="paginate_button page-item next" :class="{ disabled: currentPage === lastPage }">
                      <button  class="page-link" @click="getPostData(currentPage + 1)" :disabled="currentPage === lastPage">
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
import Loader from "../../../../../../include/loader.vue";
import Breadcrumb from "../../../../../../include/breadcrumb.vue";
import { inject } from "vue";
import { fetchUserRoleAuthor } from "@/services/fetchUserRoleAuthor";

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
      breadcrumbs: [
        { label: "Dashboard", url: "/author-dashboard" },
        { label: "Blog", url: "" },
      ],
      getLoader: false,
      blogTitles: {
        title: "",
        subtitle: "",
      },
      currentPage: 1,
      lastPage: 1,
      recordsTotal : 0,
      startPage : 0,
      endPage : 0,
      searchInputValue : "",
      showHiddenExternalFilter: false,
      checkfilter: {
        columns: ['title'],
        showcolumn: "Title",
        types: ['search'],
        emptyValues: {
          title : [], 
          slug : [], 
          status : [],
          views : [],
          created_at : [],
        },
        notemptyValues: {
          title : [], 
          slug : [], 
          status : [],
          views : [],
          created_at : [],
        },
        searchValues: {
          title : [], 
          slug : [], 
          views : [],
          created_at : [],
        },
        selectedValues: {
          status : [],
        },
      },
      applyfillters: [],
    };
  },
  async mounted() { 
    try {
      const { role, isAuthorized } = await fetchUserRoleAuthor();
      if (role == 'Author') {
        this.getPostData();
        this.$nextTick(() => {
          const dataTableWrapper = document.querySelectorAll(
            "#posts_tables_wrapper .row.mx-2"
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
    getPostData(page = 1, perPage = 10,searchValue = '') {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl + "author/blog/posts", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          params: { page: page, perPage: perPage,search: searchValue},
        })
        .then((res) => {

          this.blogTitles.title = res.data.blog_title;
          this.blogTitles.subtitle = res.data.blog_subtitle;

          const { data, current_page, last_page,recordsTotal } = res.data;
          this.currentPage = current_page;
          this.lastPage = last_page;
          this.recordsTotal = recordsTotal;

          this.startPage = (current_page - 1) * perPage + 1;
          this.endPage = Math.min(current_page * perPage, recordsTotal);

          if ($.fn.DataTable.isDataTable("#posts_tables")) {
            $("#posts_tables").DataTable().destroy();
          }
          var table = $("#posts_tables").DataTable({
            data: data,
            columns: [
              // { data: 'id' },
              { data: "id" },
              { data: "id" },
              { data: "title" },
              { data: "canvart_image" },
              { data: "convat_status" },
              { data: "views" },
              { data: "convart_date" },
              {
                data: null, // Specify null for custom rendering
                title: "Actions",
                searchable: false,
                orderable: false,
                render: function (data, type, full, meta) {
                  return (
                    '<div class="posts_action d-flex align-items-center"><button type="button" id="edit-btn" class="btn-style-edit me-2 d-flex  align-items-center" data-id=' +
                    full.id +
                    '><i id="edit-btn" class="far fa-edit fa-sm" data-id=' +
                    full.id +
                    '></i></button><button type="button" id="delete-btn"  data-id=' +
                    full.id +
                    ' class="btn-style-danger"><i class="far fa-trash-alt fa-sm" id="delete-btn" data-id=' +
                    full.id +
                    "></i></button></div>"
                  );
                },
              },
            ],
            initComplete: () => {
              $('#posts_tables').wrap('<div class="commonDataTablesClass"></div>');
              const table = $("#posts_tables").DataTable();
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

              const searchInput = $("#posts_tables_filter input");
              searchInput.val(this.searchInputValue);
              if(this.searchInputValue != ''){
                  searchInput.focus();
              }

              searchInput.off().on("keyup", (e) => {
                const searchTerm = e.target.value;
                this.searchInputValue = searchTerm;
                this.getPostData(1, perPage, searchTerm);
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
                  selectAllRender: '<input type="checkbox" class="form-check-input">',
                },
                render: function () {
                  return '<input type="checkbox" class="dt-checkboxes form-check-input">';
                },
                searchable: false,
              },
            ],
            order: [[1, "desc"]],
            dom:
              '<"row mx-2"' +
              '<"col-md-4 px-0"f>' +
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
              searchPlaceholder: "Search Blog Post",
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
                    exportOptions: { columns: [2, 3, 4, 5] },
                  },
                  {
                    extend: "csv",
                    text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                    className: "dropdown-item",
                    exportOptions: { columns: [2, 3, 4, 5] },
                  },
                  {
                    extend: "excel",
                    text: '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                    className: "dropdown-item",
                    exportOptions: { columns: [2, 3, 4, 5] },
                  },
                  {
                    extend: "pdf",
                    text: '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                    className: "dropdown-item",
                    exportOptions: { columns: [2, 3, 4, 5] },
                  },
                  {
                    extend: "copy",
                    text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                    className: "dropdown-item",
                    exportOptions: { columns: [2, 3, 4, 5] },
                  },
                ],
              },
              {
                text:
                  '<span id="create"><i class="ti ti-plus me-1 ti-xs"></i>Create</span>',
                className: "create-new btn btn-primary me-2",
                attr: { id: "create" },
              },
              {
                className: "btn btn-primary me-2",
                text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">SL</a></li><li><a class="dropdown-item" href="#" data-column="2">Name</a></li><li><a class="dropdown-item" href="#" data-column="3">Image</a></li><li><a class="dropdown-item" href="#" data-column="4">Status</a></li><li><a class="dropdown-item" href="#" data-column="5">View</a></li><li><a class="dropdown-item" href="#" data-column="6">Created at</a></li><li><a class="dropdown-item" href="#" data-column="7">Action</a></li></div></ul></div>',
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
    this.checkfilter.columns = ['title'],
    this.checkfilter.showcolumn = "Title",
    this.checkfilter.types = ['search'],
    this.checkfilter.emptyValues = {
      title : [], 
      slug : [], 
      status : [],
      views : [],
      created_at : [],
    },
    this.checkfilter.notemptyValues = {
      title : [], 
      slug : [], 
      status : [],
      views : [],
      created_at : [],
    },
    this.checkfilter.searchValues = {
      title : [], 
      slug : [], 
      views : [],
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
            this.globalVariables.apiUrl + "author/blog/posts-search-get-data-all-filter",
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
  
            if ($.fn.DataTable.isDataTable("#posts_tables")) {
              const table = $("#posts_tables").DataTable();
              table.clear();
              table.rows.add(data ?? []);
              table.draw();
            } else {
            var table = $("#posts_tables").DataTable({
            data: data,
            columns: [
              // { data: 'id' },
              { data: "id" },
              { data: "id" },
              { data: "title" },
              { data: "canvart_image" },
              { data: "convat_status" },
              { data: "views" },
              { data: "convart_date" },
              {
                data: null, // Specify null for custom rendering
                title: "Actions",
                searchable: false,
                orderable: false,
                render: function (data, type, full, meta) {
                  return (
                    '<div class="posts_action d-flex align-items-center"><button type="button" id="edit-btn" class="btn-style-edit me-2 d-flex  align-items-center" data-id=' +
                    full.id +
                    '><i id="edit-btn" class="far fa-edit fa-sm" data-id=' +
                    full.id +
                    '></i></button><button type="button" id="delete-btn"  data-id=' +
                    full.id +
                    ' class="btn-style-danger"><i class="far fa-trash-alt fa-sm" id="delete-btn" data-id=' +
                    full.id +
                    "></i></button></div>"
                  );
                },
              },
            ],
            initComplete: () => {
              $('#posts_tables').wrap('<div class="commonDataTablesClass"></div>');
              const table = $("#posts_tables").DataTable();
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

              const searchInput = $("#posts_tables_filter input");
              searchInput.val(this.searchInputValue);
              if(this.searchInputValue != ''){
                  searchInput.focus();
              }

              searchInput.off().on("keyup", (e) => {
                const searchTerm = e.target.value;
                this.searchInputValue = searchTerm;
                this.getPostData(1, perPage, searchTerm);
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
                  selectAllRender: '<input type="checkbox" class="form-check-input">',
                },
                render: function () {
                  return '<input type="checkbox" class="dt-checkboxes form-check-input">';
                },
                searchable: false,
              },
            ],
            order: [[1, "desc"]],
            dom:
              '<"row mx-2"' +
              '<"col-md-4 px-0"f>' +
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
              searchPlaceholder: "Search Blog Post",
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
                    exportOptions: { columns: [2, 3, 4, 5] },
                  },
                  {
                    extend: "csv",
                    text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                    className: "dropdown-item",
                    exportOptions: { columns: [2, 3, 4, 5] },
                  },
                  {
                    extend: "excel",
                    text: '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                    className: "dropdown-item",
                    exportOptions: { columns: [2, 3, 4, 5] },
                  },
                  {
                    extend: "pdf",
                    text: '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                    className: "dropdown-item",
                    exportOptions: { columns: [2, 3, 4, 5] },
                  },
                  {
                    extend: "copy",
                    text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                    className: "dropdown-item",
                    exportOptions: { columns: [2, 3, 4, 5] },
                  },
                ],
              },
              {
                text:
                  '<span id="create"><i class="ti ti-plus me-1 ti-xs"></i>Create</span>',
                className: "create-new btn btn-primary me-2",
                attr: { id: "create" },
              },
              {
                className: "btn btn-primary me-2",
                text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">SL</a></li><li><a class="dropdown-item" href="#" data-column="2">Name</a></li><li><a class="dropdown-item" href="#" data-column="3">Image</a></li><li><a class="dropdown-item" href="#" data-column="4">Status</a></li><li><a class="dropdown-item" href="#" data-column="5">View</a></li><li><a class="dropdown-item" href="#" data-column="6">Created at</a></li><li><a class="dropdown-item" href="#" data-column="7">Action</a></li></div></ul></div>',
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


    attachEventListeners() {
      $("#posts_tables").on("click", ".posts_action", (event) => {
        const target = $(event.target);
        const dataId = target.data("id");
        const dataClass = target.attr("id");
        if (dataClass === "edit-btn") {
          this.$router.push("/author-blog-posts-edit/" + dataId);
        } else if (dataClass === "delete-btn") {
          this.deleteQuestions(dataId);
        }
      });
    },

    attachEventListenersOfButton() {
      $("#posts_tables_wrapper").on("click", "button", (event) => {
        const target = $(event.target);
        const dataClass = target.attr("id");
        if (dataClass === "create") {
          this.$router.push("/author-blog-posts-create");
        }else if(dataClass == 'all_filters'){
          this.showHiddenExternalFilter = !this.showHiddenExternalFilter;
        }
      });
    },

    attachEventListenersForMenu() {
      $("#posts_tables_wrapper [name='posts_tables_length']").on("change", (event) => {
        this.getLoader = true;
        const target = $(event.target);
        const getSelectedValue = target.val();
        this.getPostData(1,getSelectedValue);
      });
    },
    attachEventListenersForSearch() {
      $("#posts_tables_wrapper #posts_tables_filter input").on("keyup", (event) => {
        const target = $(event.target);
        const getSearchValue = target.val();
        this.getPostData(1,10,getSearchValue);
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
            .delete(this.globalVariables.apiUrl + `author/blog/posts/delete/${id}`, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((res) => {
              toastr.success(res.data.message);
              this.getPostData();
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
#posts_tables colgroup:nth-of-type(2) {
  display: none !important;
}

#posts_tables .dt-checkboxes-cell {
  padding: 0.7rem 0.5rem !important;
}
</style>
<style scoped>
#blogimage {
  width: 70px;
}
</style>
