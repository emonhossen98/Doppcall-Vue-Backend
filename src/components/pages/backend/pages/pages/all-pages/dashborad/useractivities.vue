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
  
              <div class="user-activities-table">
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
       getresentUserActivites(page = 1, perPage = 10,searchValue = '') {
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
              this.currentPage = current_page;
              this.lastPage = last_page;
              this.recordsTotal = recordsTotal;

              this.startPage = (current_page - 1) * perPage + 1;
              this.endPage = Math.min(current_page * perPage, recordsTotal);

              if ($.fn.DataTable.isDataTable("#user_active_tables")) {
                $('#user_active_tables').DataTable().destroy();
              }
              
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
  
