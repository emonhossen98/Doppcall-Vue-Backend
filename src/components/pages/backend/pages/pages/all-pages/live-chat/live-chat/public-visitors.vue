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
                <h5 class="card-title mb-0 mt-2">
                    Public Visitors
                </h5>
              </div>
              <div class="card-body">
                <table class="align-middle mb-0 table table-hover" id="menus_tables">
                  <thead>
                    <tr>
                      <!-- <th></th> -->
                      <th></th>
                      <th>SL</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Browser</th>
                    <th>Operating System</th>
                    <th>Page Name</th>
                    <th>Country Code</th>
                    <th>Monthly Visitors</th>
                    <th>User Agent</th>
                    <th>Phone No</th>
                    <th>Telegram</th>
                    <th>Facebook</th>
                    <th>Skype</th>
                    <th>Created At</th>
                    <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>    
                  </tbody>
                </table>
                
                <div class="row justify-content-between align-items-center">
                  <div class="col-md-3">
                    Showing {{ startPage }} to {{ endPage }} of {{ recordsTotal }} entries
                  </div>
                  <div class="pagination-controls col-md-9 d-flex justify-content-end align-items-center ">
                    <ul class="pagination mb-0">
                      <!-- Previous Button -->
                      <li class="paginate_button page-item previous" :class="{ disabled: currentPage === 1 }">
                        <button class="page-link" @click="getMenusData(currentPage - 1)" :disabled="currentPage === 1" >
                          <i class="fa-solid fa-chevron-left"></i>
                        </button>
                      </li>
  
                      <!-- Page Numbers -->
                      <template v-for="page in paginationPages" :key="page">
                        <li class="paginate_button page-item" :class="{ active: page === currentPage }">
                          <button class="page-link" @click="getMenusData(page)">
                            {{ page }}
                          </button>
                        </li>
                      </template>
  
                      <!-- Next Button -->
                      <li class="paginate_button page-item next" :class="{ disabled: currentPage === lastPage }">
                        <button  class="page-link" @click="getMenusData(currentPage + 1)" :disabled="currentPage === lastPage">
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
          { label: "Public Visitors ", url: "" },
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
        },
      };
    },
    async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role == 'Super' || role == 'Admin') {
          this.getMenusData();
          this.$nextTick(() => {
            const dataTableWrapper = document.querySelectorAll('#menus_tables_wrapper .row.mx-2');
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
      getMenusData(page = 1, perPage = 10,searchValue = '') {
        this.getLoader = true;
        axios
          .get(this.globalVariables.apiUrl+"admin/dashboard/public-visitors", {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
            params: { page: page, perPage: perPage,search: searchValue},
          })
          .then((res) => {
            const { data, current_page, last_page,recordsTotal } = res.data;
            console.log(data);
            this.currentPage = current_page;
            this.lastPage = last_page;
            this.recordsTotal = recordsTotal;
  
            this.startPage = (current_page - 1) * perPage + 1;
            this.endPage = Math.min(current_page * perPage, recordsTotal);
  
            if ($.fn.DataTable.isDataTable("#menus_tables")) {
              $('#menus_tables').DataTable().destroy();
            }
            var formateDate = this.formatDates;
              var table = $('#menus_tables').DataTable({
                data: data,
                columns: [
                  // { data: 'id' },
                  { data: 'id' },
                  { data: 'id' },
                  { data: 'fname',
                    render: function (data, type, full, meta) {
                      return '<span title="'+full?.fname+'">'+full?.fname+'</span>';
                    }
                   },
                  { data: 'email',
                    render: function (data, type, full, meta) {
                      return '<span title="'+full?.email+'">'+full?.email+'</span>';
                    }
                   },
                  { data: 'browser' },
                  { data: 'os' },
                  {
                    data: null, 
                    searchable: false,
                    orderable: false,
                    render: function (data, type, full, meta) {
                      return '<span title="'+full.page_name+'" class="page_name">'+full.page_name+'</span>';
                    }
                  },
                   {
                    data: "country_code",
                    render: function (data, type, row) {
                      if (row.country_code != null) {
                        return row.country_code;
                      }
                      return "--------";
                    },
                  },
                   {
                    data: "monthly_visitors",
                    render: function (data, type, row) {
                      if (row.monthly_visitors != null) {
                        return row.monthly_visitors;
                      }
                      return "--------";
                    },
                  },
                   {
                    data: "user_agent",
                    render: function (data, type, row) {
                      if (row.user_agent != null) {
                        return '<span title="'+row?.user_agent+'">'+row?.user_agent+'</span>';
                      }
                      return "--------";
                    },
                  },
                  {
                    data: "phone_no",
                    render: function (data, type, row) {
                      if (row.phone_no != null) {
                        return row.phone_no;
                      }
                      return "--------";
                    },
                  },
                  {
                    data: "telegram",
                    render: function (data, type, row) {
                      if (row.telegram != null) {
                        return '<span title="'+row?.telegram+'">'+row?.telegram+'</span>';
                      }
                      return "--------";
                    },
                  },
                  {
                    data: "facebook",
                    render: function (data, type, row) {
                      if (row.facebook != null) {
                        return '<span title="'+row?.facebook+'">'+row?.facebook+'</span>';
                      }
                      return "--------";
                    },
                  },
                  {
                    data: "skype",
                    render: function (data, type, row) {
                      if (row.skype != null) {
                        return '<span title="'+row?.skype+'">'+row?.skype+'</span>';
                      }
                      return "--------";
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
                    data: null, 
                    searchable: false,
                    orderable: false,
                    render: function (data, type, full, meta) {
                      return '<div class="menus_action d-flex align-items-center"><button title="Delete" type="button" id="delete-btn"  data-id='+full.id +' class="bg-transparent border-0 text-danger"><i class="far fa-trash-alt fa-sm" id="delete-btn" data-id='+full.id +'></i></button></div>';
                    }
                  }
                ],
                initComplete: () => { 
                  $('#menus_tables').wrap('<div class="commonDataTablesClass"></div>');
                  const table = $("#menus_tables").DataTable();
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
                  this.attachEventListenersForMenu();
                  this.attachEventListenersForSearch();
                  this.attachEventListenersBlulkAction();
                  this.attachEventListenersBlulkActionSubmit();
  
                  const searchInput = $("#menus_tables_filter input");
                  searchInput.val(this.searchInputValue);
                  if(this.searchInputValue != ''){
                      searchInput.focus();
                  }
  
                  searchInput.off().on("keyup", (e) => {
                    const searchTerm = e.target.value;
                    this.searchInputValue = searchTerm;
                    this.getMenusData(1, perPage, searchTerm);
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
                    targets: 8, 
                    visible: false,
                  },
                  {
                    targets: 9, 
                    visible: false,
                  },
                  {
                    targets: 10, 
                    visible: false,
                  },
                  {
                    targets: 11, 
                    visible: false,
                  },
                  {
                    targets: 12, 
                    visible: false,
                  },
                  {
                    targets: 13, 
                    visible: false,
                  },
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
                  searchPlaceholder: 'Search Menu',
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
                    extend: 'collection',
                    className: 'btn btn-label-primary dropdown-toggle me-3',
                    text: '<i class="ti ti-screen-share me-1 ti-xs"></i>Export',
                    buttons: [
                      {
                        extend: 'print',
                        text: '<i class="ti ti-printer me-1 ti-xs text-primary"></i>Print',
                        className: 'dropdown-item',
                        exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] }
                      },
                      {
                        extend: 'csv',
                        text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                        className: 'dropdown-item',
                        exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] }
                      },
                      {
                        extend: 'excel',
                        text: '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                        className: 'dropdown-item',
                        exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] }
                      },
                      {
                        extend: 'pdf',
                        text: '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                        className: 'dropdown-item',
                        exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] }
                      },
                      {
                        extend: 'copy',
                        text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                        className: 'dropdown-item',
                        exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] }
                      }
                    ]
                  },
                  {
                  className: "btn btn-primary",
                  text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">Sl</a></li><li><a class="dropdown-item" href="#" data-column="2">Name</a></li><li><a class="dropdown-item" href="#" data-column="3">Email</a></li><li><a class="dropdown-item" href="#" data-column="4">Browser</a></li><li><a class="dropdown-item" href="#" data-column="5">Operating System</a></li><li><a class="dropdown-item" href="#" data-column="6">Page Name</a></li><li><a class="dropdown-item" href="#" data-column="7">Country Code</a></li><li><a class="dropdown-item" href="#" data-column="8">Monthly Visitors</a></li><li><a class="dropdown-item" href="#" data-column="9">User Agent</a></li><li><a class="dropdown-item" href="#" data-column="10">Phone No</a></li><li><a class="dropdown-item" href="#" data-column="11">Telegram</a></li><li><a class="dropdown-item" href="#" data-column="12">Facebook</a></li><li><a class="dropdown-item" href="#" data-column="13">Skype</a></li><li><a class="dropdown-item" href="#" data-column="14">Created At</a></li><li><a class="dropdown-item" href="#" data-column="15">Action</a></li></div></ul></div>',
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
      formatDates(date) {
      return moment(date).format('D MMMM YYYY');
    },
    attachEventListenersBlulkAction() {
        $('#menus_tables').on('change', '.row-checkbox', (event) => {
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
        $('#menus_tables thead').on('change', 'input[type="checkbox"]', (event) => {
          const isChecked = event.target.checked;
          $('#menus_tables tbody .row-checkbox').each((index, checkbox) => {
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
                this.globalVariables.apiUrl + "admin/dashboard/public-visitors/bulk/delete",
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
                  this.getMenusData();
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
        $("#menus_tables").on("click", ".menus_action", (event) => {
          const target = $(event.target);
          const dataId = target.data("id");
          const dataClass = target.attr("id");
          if(dataClass === 'delete-btn'){
            this.deleteMenu(dataId);
          }
        });
      },
  
      attachEventListenersForMenu() {
        $("#menus_tables_wrapper [name='menus_tables_length']").on("change", (event) => {
          this.getLoader = true;
          const target = $(event.target);
          const getSelectedValue = target.val();
          this.getMenusData(1,getSelectedValue);
        });
      },
      attachEventListenersForSearch() {
        $("#menus_tables_wrapper #menus_tables_filter input").on("keyup", (event) => {
          const target = $(event.target);
          const getSearchValue = target.val();
          this.getMenusData(1,10,getSearchValue);
        });
      },
  
      // Menu Delete
      deleteMenu(id) {
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
              .delete(this.globalVariables.apiUrl+`admin/dashboard/visitor-delete/${id}`, {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              })
              .then((res) => {
                toastr.success(res.data.message);
                this.getMenusData();
                localStorage.removeItem('user_'+id);
                  
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
  #menus_tables colgroup:nth-of-type(2) {
      display: none !important;
  }
  #menus_tables .dt-checkboxes-cell{
      padding: 0.7rem 0.5rem !important;
  }
  #menus_tables .page_name{
    width: 300px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: block;
  }
  </style>
  
  