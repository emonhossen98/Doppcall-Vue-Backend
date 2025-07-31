<template>
    <div v-if="getLoader">
      <Loader></Loader>
    </div>
    <!-- Content wrapper -->
    <div class="content-wrapper">
      <!-- Content -->
      <div class="container-fluid flex-grow-1 container-p-y">
        <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
        <div class="row row-sm mt-4">
          <div class="col-12">
            <div class="card">
              <div class="card-header d-flex align-items-center justify-content-between mb-0 mt-2">
                <h5 class="card-title">User Activities</h5>
                <div class="col-md-4">
                    <select @change="getRoleData($event)" class="form-select">
                    <option value="0">Select Please</option>
                    <option value="2">Advertiser</option>
                    <option value="3">Publisher</option>
                    </select>
                </div>
              </div>
  
              <div class="user-activities-table card-body">
                <table class="table table-sm" id="user_active_tables">
                  <thead>
                    <tr>					
                      <!-- <th></th> -->
                      <th></th>
                      <th>Sl</th>
                      <th>Avatar</th>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Phone Number</th>
                      <th>Role</th>
                      <th>Browser</th>
                      <th>OS</th>
                      <th>User Agent</th>
                      <th>Monthly Visitors</th>
                      <th>Company Name</th>
                      <th>Company Website</th>
                      <th>Country Code</th>
                      <th>Traffic URL</th>
                      <th>Facebook</th>
                      <th>Skype</th>
                      <th>Telegram</th>
                      <th>Page Name</th>
                      <th>Created At</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                   
                  </tbody>
                </table>
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
  import Loader from '../../../../include/loader.vue';
  import Breadcrumb from '../../../../include/breadcrumb.vue';
  import moment from 'moment';
  import { inject } from "vue";
  import { fetchUserRole } from "@/services/userService";
  
  export default {
    setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
    components:{
      Loader,
      Breadcrumb,
    },
    data() {
      return {    
        breadcrumbs: [
          { label: "Dashboard", url: "/dashboard" },
          { label: " User Activities", url: "" },
        ],
        getLoader: false,
        currentPage: 1,
        lastPage: 1,
        recordsTotal : 0,
        startPage : 0,
        endPage : 0,
        searchInputValue : "",
      };
    },
    async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role == 'Super' || role == 'Admin') {
          this.getresentUserActivites();
          this.$nextTick(() => {
            const dataTableWrapper = document.querySelectorAll('#user_active_tables_wrapper .row.mx-2');
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
       getresentUserActivites(page = 1, perPage = 10,searchValue = '') 
       {
        this.getLoader = true;
        axios
          .get(this.globalVariables.apiUrl+"admin/user/activities/get-data", {
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

            if ($.fn.DataTable.isDataTable("#user_active_tables")) {
              $('#user_active_tables').DataTable().destroy();
            }
            var formateDate = this.formatDates;
            var table = $('#user_active_tables').DataTable({
            data: data,
            columns: [
              // { data: 'id' },
              { data: 'id' },
              { data: 'id' },
              { data: "convart_avatar" },
              { data: "convart_name" },
              { data: "email" },
              { data: "phone_number" },
              { data: "role.name" },
              { data: 'browser',
                render: function (data, type, row) {
                if (row?.browser != null) {
                  return '<span title="'+row?.browser+'">'+row?.browser+'</span>';
                }
                  return '----------';
                },
              },
              { data: 'os',
                render: function (data, type, row) {
                if (row?.os != null) {
                  return '<span title="'+row?.os+'">'+row?.os+'</span>';
                }
                  return '----------';
                },
              },
              { data: 'user_agent',
                render: function (data, type, row) {
                if (row?.user_agent != null) {
                  return '<span title="'+row?.user_agent+'">'+row?.user_agent+'</span>';
                }
                  return '----------';
                },
              },
              { data: 'monthly_visitors',
                render: function (data, type, row) {
                if (row?.monthly_visitors != null) {
                  return '<span title="'+row?.monthly_visitors+'">'+row?.monthly_visitors+'</span>';
                }
                  return '----------';
                },
              },
              { data: 'company_name',
                render: function (data, type, row) {
                if (row?.company_name != null) {
                  return '<span title="'+row?.company_name+'">'+row?.company_name+'</span>';
                }
                  return '----------';
                },
              },
              { data: 'company_website',
                render: function (data, type, row) {
                if (row?.company_website != null) {
                  return '<span title="'+row?.company_website+'">'+row?.company_website+'</span>';
                }
                  return '----------';
                },
              },
              { data: 'country_code',
                render: function (data, type, row) {
                if (row?.country_code != null) {
                  return '<span title="'+row?.country_code+'">'+row?.country_code+'</span>';
                }
                  return '----------';
                },
              },
              { data: 'traffic_urls',
                render: function (data, type, row) {
                if (row?.traffic_urls != null) {
                  return '<span title="'+row?.traffic_urls+'">'+row?.traffic_urls+'</span>';
                }
                  return '----------';
                },
              },
              { data: 'facebook',
                render: function (data, type, row) {
                if (row?.facebook != null) {
                  return '<span title="'+row?.facebook+'">'+row?.facebook+'</span>';
                }
                  return '----------';
                },
              },
              { data: 'skype',
                render: function (data, type, row) {
                if (row?.skype != null) {
                  return '<span title="'+row?.skype+'">'+row?.skype+'</span>';
                }
                  return '----------';
                },
              },
              { data: 'telegram',
                render: function (data, type, row) {
                if (row?.telegram != null) {
                  return '<span title="'+row?.telegram+'">'+row?.telegram+'</span>';
                }
                  return '----------';
                },
              },
              { data: 'page_name',
                render: function (data, type, row) {
                if (row?.page_name != null) {
                  return '<span title="'+row?.page_name+'">'+row?.page_name+'</span>';
                }
                  return '----------';
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
              { data: '' }
            ],
            initComplete: () => { 
              $('#user_active_tables').wrap('<div class="commonDataTablesClass"></div>');
              const table = $("#user_active_tables").DataTable();
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

              const searchInput = $("#user_active_tables_filter input");
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
              {
                targets: 14, 
                visible: false,
              },
              {
                targets: 15, 
                visible: false,
              },
              {
                targets: 16, 
                visible: false,
              },
              {
                targets: 17, 
                visible: false,
              },
              {
                targets: 18, 
                visible: false,
              },
              {
                targets: 19, 
                visible: false,
              },
             
              {
                targets: -1,
                title: 'Actions',
                searchable: false,
                orderable: false,
                render: function (data, type, full, meta) {
                  return '<div class="activit_action d-flex align-items-center"><button type="button" id="view_btn" class="btn-style-edit text-success me-2 d-flex  align-items-center" data-id=' + full.id + '><i  id="view_btn"  class="fas fa-eye" data-id=' + full.id + '></i></button></div>'; 
                }
              }
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
              searchPlaceholder: 'Search Activities',
              paginate: { 
                previous: '<i class="fa-solid fa-chevron-left"></i>',
                next: '<i class="fa-solid fa-chevron-right"></i>'
              }
            },
            buttons: [
              {
                  className: "btn btn-primary",
                  text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">SL</a></li><li><a class="dropdown-item" href="#" data-column="2">Avatar</a></li><li><a class="dropdown-item" href="#" data-column="3">Full Name</a></li><li><a class="dropdown-item" href="#" data-column="4">Email</a></li><li><a class="dropdown-item" href="#" data-column="5">Phone Number</a></li><li><a class="dropdown-item" href="#" data-column="6">Role</a></li><li><a class="dropdown-item" href="#" data-column="7">Browser</a></li><li><a class="dropdown-item" href="#" data-column="8">OS</a></li><li><a class="dropdown-item" href="#" data-column="9">User Agent</a></li><li><a class="dropdown-item" href="#" data-column="10">Monthly Visitors</a></li><li><a class="dropdown-item" href="#" data-column="11">Company Name</a></li><li><a class="dropdown-item" href="#" data-column="12">Company Website</a></li><li><a class="dropdown-item" href="#" data-column="13">Country Code</a></li><li><a class="dropdown-item" href="#" data-column="14">Traffic URL</a></li><li><a class="dropdown-item" href="#" data-column="15">Facebook</a></li><li><a class="dropdown-item" href="#" data-column="16">Skype</a></li><li><a class="dropdown-item" href="#" data-column="17">Telegram</a></li><li><a class="dropdown-item" href="#" data-column="18">Page Name</a></li><li><a class="dropdown-item" href="#" data-column="19">Created At</a></li><li><a class="dropdown-item" href="#" data-column="20">Action</a></li></div></ul></div>',
                },
            ],
          });
          })
          .catch((e) => {
            console.error(e);
          })
          .finally(() => {
          this.getLoader = false;
        });
       },


       getRoleData(event,page = 1, perPage = 10,searchValue = '') {
        if(event.target.value == 0){
            this.getresentUserActivites();
        }else{
          this.getLoader = true;
          axios
            .get(this.globalVariables.apiUrl+`admin/user/activities/get-data/${event.target.value}`, {
              headers: { Authorization: "Bearer " + localStorage.getItem("token") },
              params: { page: page, perPage: perPage,search: searchValue},
            })
            .then((res) => {
              const { data, current_page, last_page,recordsTotal } = res.data;
              console.log(data)
              this.currentPage = current_page;
              this.lastPage = last_page;
              this.recordsTotal = recordsTotal;

              this.startPage = (current_page - 1) * perPage + 1;
              this.endPage = Math.min(current_page * perPage, recordsTotal);

              if ($.fn.DataTable.isDataTable("#user_active_tables")) {
                $('#user_active_tables').DataTable().destroy();
              }
              var formateDate = this.formatDates;
              var table = $('#user_active_tables').DataTable({
              data: data,
              columns: [
                // { data: 'id' },
                { data: 'id' },
                { data: 'id' },
                { data: "convart_avatar" },
                { data: "convart_name" },
                { data: "email" },
                { data: "phone_number" },
                { data: "role.name" },
                { data: '' }
              ],
              initComplete: () => { 
                $('#user_active_tables').wrap('<div class="commonDataTablesClass"></div>');
                const table = $("#user_active_tables").DataTable();
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

                const searchInput = $("#user_active_tables_filter input");
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
                
                {
                  targets: -1,
                  title: 'Actions',
                  searchable: false,
                  orderable: false,
                  render: function (data, type, full, meta) {
                    return '<div class="activit_action d-flex align-items-center"><button type="button" id="view_btn" class="btn-style-edit text-success me-2 d-flex  align-items-center" data-id=' + full.id + '><i  id="view_btn"  class="fas fa-eye" data-id=' + full.id + '></i></button></div>'; 
                  }
                }
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
                searchPlaceholder: 'Search Activities',
                paginate: { 
                  previous: '<i class="fa-solid fa-chevron-left"></i>',
                  next: '<i class="fa-solid fa-chevron-right"></i>'
                }
              },
              buttons: [
                {
                  className: "btn btn-primary",
                  text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">SL</a></li><li><a class="dropdown-item" href="#" data-column="2">Avatar</a></li><li><a class="dropdown-item" href="#" data-column="3">Full Name</a></li><li><a class="dropdown-item" href="#" data-column="4">Email</a></li><li><a class="dropdown-item" href="#" data-column="5">Phone Number</a></li><li><a class="dropdown-item" href="#" data-column="6">Role</a></li><li><a class="dropdown-item" href="#" data-column="7">Action</a></li></div></ul></div>',
                },
              ],
            });
            })
            .catch((e) => {
              console.error(e);
            })
            .finally(() => {
            this.getLoader = false;
          });
          }
       },

      attachEventListeners() {
        $("#user_active_tables").on("click", ".activit_action", (event) => {
          const target = $(event.target);
          const dataId = target.data("id");
          const dataClass = target.attr("id");
          if (dataClass === "view_btn") {
            this.$router.push('/dashboard-user-activitie-view/'+dataId);
          }
        });
      },
      formatDates(date) {
      return moment(date).format('D MMMM YYYY');
    },
      attachEventListenersForMenu() {
        $("#user_active_tables_wrapper [name='user_active_tables_length']").on("change", (event) => {
          this.getLoader = true;
          const target = $(event.target);
          const getSelectedValue = target.val();
          this.getresentUserActivites(1,getSelectedValue);
        });
      },
      attachEventListenersForSearch() {
        $("#user_active_tables_wrapper #user_active_tables_filter input").on("keyup", (event) => {
          const target = $(event.target);
          const getSearchValue = target.val();
          this.getresentUserActivites(1,10,getSearchValue);
        });
      },
    },
  };
  </script>
  
  <style>
.country-flag {
	width: 20%;
}
#user_active_tables colgroup:nth-of-type(2) {
	display: none !important;
}
.avatar-img {
	width: 50px;
	height: 50px;
	border-radius: 500%;
}
.text-success {
	background: transparent !important;
}
</style>
  
