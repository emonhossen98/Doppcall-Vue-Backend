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
            <div class="card mt-3">
                <div class="card-header pt-3">
                    <h5 class="card-title d-flex justify-content-between align-items-center mb-2">
                        Blog Categories
                    </h5>
                </div>
                <div class="card-body">
                    <table class="align-middle mb-0 table table-hover" id="blog_categiories_datatables">
                        <thead>
                            <tr>
                              <!-- <th></th> -->
                              <th></th>
                              <th>SL</th>
                              <th>Name</th>
                              <th>Slug</th>
                              <th>Status</th>
                              <th>Created At</th>
                              <th id="action-incompleted">Action</th>
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
  data: () => {
    return {
      breadcrumbs: [
        { label: "Dashboard", url: "/dashboard" },
        { label: "Categories", url: "" },
      ],
      getLoader: false,
      bulkactionids : {
        selectedIds: [],
        status : "",
      },
      showHiddenExternalFilter: false,
        checkfilter: {
        columns: ['name'],
        showcolumn: "Name",
        types: ['search'],
        emptyValues: {
          name : [],
          slug : [],
          status : [],
          created_at : [],
        },
        notemptyValues: {
          name : [],
          slug : [],
          status : [],
          created_at : [],
        },
        searchValues: {
          name : [],
          slug : [],
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
        const { role, isAuthorized } = await fetchUserRole();
        if (role == 'Super' || role == 'Admin') {
          this.categoriesData();
          this.$nextTick(() => {
            const dataTableWrapper = document.querySelectorAll('#blog_categiories_datatables_wrapper .row.mx-2');
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
    categoriesData() {
      this.getLoader = true;
      axios
        .get(
          this.globalVariables.apiUrl+"admin/blog/categories",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          if ($.fn.DataTable.isDataTable("#blog_categiories_datatables")) {
          $('#blog_categiories_datatables').DataTable().destroy();
        }
        var formateDate = this.formatDates;
          var table = $('#blog_categiories_datatables').DataTable({
            data: res.data.categories,
            columns: [
              // { data: 'id' },
              { data: 'id' },
              { data: 'id' },
              { data: 'name',
                render: function (data, type, row) {
                if (row?.name != null) {
                  return '<span title="'+row?.name+'">'+row?.name+'</span>';
                }
                return '----------';
              },
               },
              { data: 'slug',
                render: function (data, type, row) {
                if (row?.slug != null) {
                  return '<span title="'+row?.slug+'">'+row?.slug+'</span>';
                }
                return '----------';
              },
               },
              {
                data: "updated_at",
                render: function (data, type, row) {
                  if(row.status == 1){
                    return '<span class="badge bg-success">Publish</span>'
                  }else{
                    return '<span class="badge bg-danger">Pending</span>'
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
                data: "created_at",
                render: function (data, type, row) {
                  return (
                    '<div class="type-datatables-action"><a data-vue-route title="Edit" href="/admin-blog-categories-edit/'+row.id+'" class="bg-transparent border-0 text-primary me-2" ><i class="far fa-edit fa-sm"></i></a><button title="Delete" type="button" data-action="delete"  data-id=""'+ row.id + '" class="bg-transparent border-0 text-danger"><i data-action="delete"  data-id=""'+ row.id + '" class="far fa-trash-alt fa-sm"></i></button></div>'
                  );
                },
              },
            ],
            initComplete: () => { 
              $('#blog_categiories_datatables').wrap('<div class="commonDataTablesClass"></div>');
              const table = $("#blog_categiories_datatables").DataTable();
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
              searchPlaceholder: 'Search Categorie',
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
                  text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">Sl</a></li><li><a class="dropdown-item" href="#" data-column="2">Name</a></li><li><a class="dropdown-item" href="#" data-column="3">Slug</a></li><li><a class="dropdown-item" href="#" data-column="4">Status</a></li><li><a class="dropdown-item" href="#" data-column="5">Created At</a></li><li><a class="dropdown-item" href="#" data-column="6">Action</a></li></div></ul></div>',
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

    formatDates(date) {
      return moment(date).format('D MMMM YYYY');
    },
    
    attachEventListenersBlulkAction() {
      $('#blog_categiories_datatables').on('change', '.row-checkbox', (event) => {
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
      $('#blog_categiories_datatables thead').on('change', 'input[type="checkbox"]', (event) => {
        const isChecked = event.target.checked;
        $('#blog_categiories_datatables tbody .row-checkbox').each((index, checkbox) => {
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
            const alertTitle = "Blog Category Want to Publish";
            this.bulkStatusChange(alertTitle);
          }else{
            this.bulkactionids.status = '0';
            const alertTitle = "Blog Category Want to Pending";
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
                this.globalVariables.apiUrl + "admin/blog/categories/bulk/delete",
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
                  this.categoriesData();
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
                this.globalVariables.apiUrl + "admin/blog/categories/bulk/status",
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
                  this.categoriesData();
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
      $('#blog_categiories_datatables').on('click', '.type-datatables-action', (event) => {
        const target = $(event.target);
        const dataId = target.data('id');
        const dataClass = target.data('action');
        if(dataClass === 'delete'){
          this.deleteCategory(dataId);
        }
      });
    },

     externalfilterreset(){
      this.checkfilter.columns = ['name'],
      this.checkfilter.showcolumn = "Name",
      this.checkfilter.types = ['search'],
      this.checkfilter.emptyValues = {
          name : [],
           slug:[],
          status : [],
          created_at : [],
      },
      this.checkfilter.notemptyValues = {
          name : [],
           slug:[],
          status : [],
          created_at : [],
      },
      this.checkfilter.searchValues = {
          name : [],
           slug:[],
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
      $("#blog_categiories_datatables_wrapper").on("click", "button", (event) => {
        const target = $(event.target);
        const dataClass = target.attr("id");
        if (dataClass === "create") {
          this.$router.push("/admin-blog-categorie-create");
        }else if(dataClass == 'all_filters'){
          this.showHiddenExternalFilter = !this.showHiddenExternalFilter;
        }
      });
    },
    
    externalfilterreset(){
      this.checkfilter.columns = ['name'],
      this.checkfilter.showcolumn = "Name",
      this.checkfilter.types = ['search'],
      this.checkfilter.emptyValues = {
        name : [],
        slug : [],
        status : [],
        created_at : [],
      },
      this.checkfilter.notemptyValues = {
        name : [],
        slug : [],
        status : [],
        created_at : [],
      },
      this.checkfilter.searchValues = {
        name : [],
        status : [],
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
              this.globalVariables.apiUrl + "admin/blog/categories-search-get-data-all-filter",
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
    
              if ($.fn.DataTable.isDataTable("#blog_categiories_datatables")) {
                const table = $("#blog_categiories_datatables").DataTable();
                table.clear();
                table.rows.add(res.data.categories ?? []);
                table.draw();
              } else {
                var formateDate = this.formatDates;
                var table = $('#blog_categiories_datatables').DataTable({
                  data: res.data.categories,
                  columns: [
                    // { data: 'id' },
                    { data: 'id' },
                    { data: 'id' },
                    { data: 'name',
                      render: function (data, type, row) {
                      if (row?.name != null) {
                        return '<span title="'+row?.name+'">'+row?.name+'</span>';
                      }
                      return '----------';
                    },
                    },
                    { data: 'slug',
                      render: function (data, type, row) {
                      if (row?.slug != null) {
                        return '<span title="'+row?.slug+'">'+row?.slug+'</span>';
                      }
                      return '----------';
                    },
                    },
                    {
                      data: "updated_at",
                      render: function (data, type, row) {
                        if(row.status == 1){
                          return '<span class="badge bg-success">Publish</span>'
                        }else{
                          return '<span class="badge bg-danger">Pending</span>'
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
                      data: "created_at",
                      render: function (data, type, row) {
                        return (
                          '<div class="type-datatables-action"><a data-vue-route title="Edit" href="/admin-blog-categories-edit/'+row.id+'" class="bg-transparent border-0 text-primary me-2" ><i class="far fa-edit fa-sm"></i></a><button title="Delete" type="button" data-action="delete"  data-id=""'+ row.id + '" class="bg-transparent border-0 text-danger"><i data-action="delete"  data-id=""'+ row.id + '" class="far fa-trash-alt fa-sm"></i></button></div>'
                        );
                      },
                    },
                  ],
                  initComplete: () => { 
                    $('#blog_categiories_datatables').wrap('<div class="commonDataTablesClass"></div>');
                    const table = $("#blog_categiories_datatables").DataTable();
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
                    searchPlaceholder: 'Search Categorie',
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
                        text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">Sl</a></li><li><a class="dropdown-item" href="#" data-column="2">Name</a></li><li><a class="dropdown-item" href="#" data-column="3">Slug</a></li><li><a class="dropdown-item" href="#" data-column="4">Status</a></li><li><a class="dropdown-item" href="#" data-column="5">Created At</a></li><li><a class="dropdown-item" href="#" data-column="6">Action</a></li></div></ul></div>',
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



    // attachEventListenersOfButton(){
    //   $("#blog_categiories_datatables_wrapper").on("click", "button", (event) => {
    //     const target = $(event.target);
    //     const dataClass = target.attr("id");
    //     if (dataClass === "create") {
    //       this.$router.push("/admin-blog-categorie-create");
    //     } 
    //   });
    // },

    // Category Delete
    deleteCategory(id) {
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
            .delete(this.globalVariables.apiUrl+`admin/blog/categories/delete/${id}`, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((res) => {
                toastr.success(res.data.message);
                this.categoriesData();
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

#blog_categiories_datatables colgroup:nth-of-type(2) {
	display: none !important;
}
#blog_categiories_datatables .dt-checkboxes-cell{
	padding: 0.7rem 0.5rem !important;
}
.btn-style-danger, .btn-style-edit, .btn-style-info {
	height: 30px;
	width: 30px;
	text-align: center;
	padding-top: 0;
	font-size: 14px;
	transition: .5s;
}
</style>