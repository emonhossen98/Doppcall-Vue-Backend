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
                        <th>Content Date</th>
                    </tr>
                  </thead>
                  <tbody></tbody>
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
                  className: "btn btn-primary",
                  text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">SL</a></li><li><a class="dropdown-item" href="#" data-column="2">Domain</a></li><li><a class="dropdown-item" href="#" data-column="3">IP Address</a></li><li><a class="dropdown-item" href="#" data-column="4">User Location</a></li><li><a class="dropdown-item" href="#" data-column="5">Content Date</a></li></div></ul></div>',
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
  