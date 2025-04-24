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
            <div class="card  mt-4">
              <div class="card-header py-3">
                    <h5 class="card-title mb-0 mt-2">Filter</h5>
                </div>
                <div class="card-body">
                    <form>
                        <div class="row">
                            <div class="col-lg-4">
                                <div class="mb-sm-0 mb-3">
                                <select @change="getLeadSearchList()" v-model="searchData.company_name" class="form-select">
                                    <option value="">-- Select Company --</option>
                                    <option v-for="(company,index) in IndexLeads.companyNames" :value="company.company_name" :key="index"> {{ company.company_name }}</option>
                                </select>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="mb-sm-0 mb-3">
                                <select @change="getLeadSearchList()" v-model="searchData.country_name" class="form-select">
                                    <option value="">-- Select Country --</option>
                                    <option v-for="(countrie,index) in IndexLeads.countries" :value="countrie.country" :key="index"> {{ countrie.country }}</option>
                                </select>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="mb-sm-0 mb-3">
                                <select @change="getLeadSearchList()" v-model="searchData.email" class="form-select">
                                    <option value="">-- Select Email --</option>
                                    <option v-for="(email,index) in IndexLeads.emails" :value="email.email" :key="index"> {{ email.email }}</option>
                                </select>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="card-header  py-2">
                    <h5 class="card-title mb-0 mt-2">
                        Lead List 
                    </h5>
                </div>
                <div class="card-body table-responsive table-overflow-hidden">
                    <table class="align-middle mb-0 table table-hover" id="lead_datatables">
                        <thead>
                            <tr>
                              <!-- <th></th> -->
                              <th></th>
                              <th>SL</th>
                              <th>Company Name</th>
                              <th>Full Name</th>
                              <th>Email</th>
                              <th>Website</th>
                              <th>Country</th>
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
                          <button class="page-link" @click="getLeadList(currentPage - 1)" :disabled="currentPage === 1" >
                            <i class="fa-solid fa-chevron-left"></i>
                          </button>
                        </li>

                        <!-- Page Numbers -->
                        <template v-for="page in paginationPages" :key="page">
                          <li class="paginate_button page-item" :class="{ active: page === currentPage }">
                            <button class="page-link" @click="getLeadList(page)">
                              {{ page }}
                            </button>
                          </li>
                        </template>

                        <!-- Next Button -->
                        <li class="paginate_button page-item next" :class="{ disabled: currentPage === lastPage }">
                          <button  class="page-link" @click="getLeadList(currentPage + 1)" :disabled="currentPage === lastPage">
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
      IndexLeads : "",
      breadcrumbs: [
        { label: "Dashboard", url: "/dashboard" },
        { label: "Lead List", url: "" },
      ], 
      getLoader: false,
      deleteLead : {
        data : "",
      },
      searchData : {
        company_name : "",
        country_name : "",
        email : "",
      },
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
          this.getLeadList();
          this.$nextTick(() => {
            const dataTableWrapper = document.querySelectorAll('#lead_datatables_wrapper .row.mx-2');
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
    getLeadList(page = 1, perPage = 10,searchValue = '') {
      this.getLoader = true;
        axios.get(this.globalVariables.apiUrl+'admin/leads', 
        { headers:{Authorization: 'Bearer ' + localStorage.getItem('token')},
        params: { page: page, perPage: perPage,search: searchValue},
      })
        .then((res) => {
            this.IndexLeads = res.data;
            const { data, current_page, last_page,recordsTotal } = res.data;
            this.currentPage = current_page;
            this.lastPage = last_page;
            this.recordsTotal = recordsTotal;

            this.startPage = (current_page - 1) * perPage + 1;
            this.endPage = Math.min(current_page * perPage, recordsTotal);
            
            if ($.fn.DataTable.isDataTable("#lead_datatables")) {
              $('#lead_datatables').DataTable().destroy();
            }
            var table = $('#lead_datatables').DataTable({
              data: data,
              columns: [
                // { data: 'id' },
                { data: 'id' },
                { data: 'id' },
                { data: 'company_name' },
                { data: 'first_name' },
                { data: 'email' },
                { data: 'website' },
                { data: 'country' },
                {
                  data: null, 
                  title: 'Actions',
                  searchable: false,
                  orderable: false,
                  render: function (data, type, full, meta) {
                    return '<div class="lead_action d-flex align-items-center"><a href="/admin-lead-view/'+full.id+'" title="View" data-vue-route class="bg-transparent border-0 text-primary me-2" ><i class="far fa-eye fa-sm"></i></a><button type="button" title="Delete"  id="delete-btn"  data-id='+full.id +' class="bg-transparent border-0 text-danger"><i class="far fa-trash-alt fa-sm" id="delete-btn" data-id='+full.id +'></i></button></div>';
                  }
                }
              ],
              initComplete: () => { 
                this.attachEventListeners();

                this.attachEventListenersForMenu();
                this.attachEventListenersForSearch();

                const searchInput = $("#lead_datatables_filter input");
                searchInput.val(this.searchInputValue);
                if(this.searchInputValue != ''){
                    searchInput.focus();
                }

                searchInput.off().on("keyup", (e) => {
                  const searchTerm = e.target.value;
                  this.searchInputValue = searchTerm;
                  this.getLeadList(1, perPage, searchTerm);
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
                    return '<input type="checkbox" class="dt-checkboxes form-check-input">';
                  },
                  searchable: false
                },
              ],
              order: [[0, 'desc']],
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
                searchPlaceholder: 'Search Lead Method',
                paginate: { 
                  previous: '<i class="fa-solid fa-chevron-left"></i>',
                  next: '<i class="fa-solid fa-chevron-right"></i>'
                }
              },
              buttons: [
                {
                  extend: 'collection',
                  className: 'btn btn-label-primary dropdown-toggle me-3',
                  text: '<i class="ti ti-screen-share me-1 ti-xs"></i>Export',
                  buttons: [
                    {
                      extend: 'print',
                      text: '<i class="ti ti-printer me-1 ti-xs text-primary"></i>Print',
                      className: 'dropdown-item',
                      exportOptions: { columns: [2, 3, 4, 5, 6, 7] }
                    },
                    {
                      extend: 'csv',
                      text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                      className: 'dropdown-item',
                      exportOptions: { columns: [2, 3, 4, 5, 6, 7] }
                    },
                    {
                      extend: 'excel',
                      text: '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                      className: 'dropdown-item',
                      exportOptions: { columns: [2, 3, 4, 5, 6, 7] }
                    },
                    {
                      extend: 'pdf',
                      text: '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                      className: 'dropdown-item',
                      exportOptions: { columns: [2, 3, 4, 5, 6, 7] }
                    },
                    {
                      extend: 'copy',
                      text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                      className: 'dropdown-item',
                      exportOptions: { columns: [2, 3, 4, 5, 6, 7] }
                    }
                  ]
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



    getLeadSearchList(page = 1, perPage = 10,searchValue = '') {
      this.getLoader = true;
        axios.post(this.globalVariables.apiUrl+'admin/leads/search',this.searchData, 
        { headers:{Authorization: 'Bearer ' + localStorage.getItem('token')},
        params: { page: page, perPage: perPage,search: searchValue},
      })
        .then((res) => {
          const { data, current_page, last_page,recordsTotal } = res.data;
          this.currentPage = current_page;
          this.lastPage = last_page;
          this.recordsTotal = recordsTotal;

          this.startPage = (current_page - 1) * perPage + 1;
          this.endPage = Math.min(current_page * perPage, recordsTotal);
          console.log(res.data)
          if ($.fn.DataTable.isDataTable("#lead_datatables")) {
              $('#lead_datatables').DataTable().destroy();
            }
            var table = $('#lead_datatables').DataTable({
              data: data,
              columns: [
                // { data: 'id' },
                { data: 'id' },
                { data: 'id' },
                // { data: 'company_name' },
                {
                  data: "company_name",
                  render: function (data, type, row) {
                    if (row.company_name != null) {
                      return row.company_name.length > 8 
                        ? row.company_name.slice(0, 8) + '...'  
                        : row.company_name; 
                    }
                    return '----------';
                  },
                },
                { data: 'first_name' },
                {
                  data: "email",
                  render: function (data, type, row) {
                    if (row.email != null) {
                      return row.email.length > 15 
                        ? row.email.slice(0, 15) + '...'  
                        : row.email; 
                    }
                    return '----------';
                  },
                },
                {
                  data: "website",
                  render: function (data, type, row) {
                    if (row.website != null) {
                      return row.website.length > 15 
                        ? row.website.slice(0, 15) + '...'  
                        : row.website; 
                    }
                    return '----------';
                  },
                },
                // { data: 'email' },
                // { data: 'website' },
                { data: 'country' },
                {
                  data: null, 
                  title: 'Actions',
                  searchable: false,
                  orderable: false,
                  render: function (data, type, full, meta) {
                    return '<div class="lead_action d-flex align-items-center"><a href="/admin-lead-view/'+full.id+'" title="View" data-vue-route class="bg-transparent border-0 text-primary me-2" ><i class="far fa-eye fa-sm"></i></a><button type="button" title="Delete"  id="delete-btn"  data-id='+full.id +' class="bg-transparent border-0 text-danger"><i class="far fa-trash-alt fa-sm" id="delete-btn" data-id='+full.id +'></i></button></div>';
                  }
                }
              ],
              initComplete: () => { 
                this.attachEventListeners();

                this.attachEventListenersForMenu();
                this.attachEventListenersForSearch();

                const searchInput = $("#lead_datatables_filter input");
                searchInput.val(this.searchInputValue);
                if(this.searchInputValue != ''){
                    searchInput.focus();
                }

                searchInput.off().on("keyup", (e) => {
                  const searchTerm = e.target.value;
                  this.searchInputValue = searchTerm;
                  this.getLeadList(1, perPage, searchTerm);
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
                    return '<input type="checkbox" class="dt-checkboxes form-check-input">';
                  },
                  searchable: false
                },
              ],
              order: [[0, 'desc']],
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
                searchPlaceholder: 'Search Lead Method',
                paginate: { 
                  previous: '<i class="fa-solid fa-chevron-left"></i>',
                  next: '<i class="fa-solid fa-chevron-right"></i>'
                }
              },
              buttons: [
                {
                  extend: 'collection',
                  className: 'btn btn-label-primary dropdown-toggle me-3',
                  text: '<i class="ti ti-screen-share me-1 ti-xs"></i>Export',
                  buttons: [
                    {
                      extend: 'print',
                      text: '<i class="ti ti-printer me-1 ti-xs text-primary"></i>Print',
                      className: 'dropdown-item',
                      exportOptions: { columns: [2, 3, 4, 5, 6, 7] }
                    },
                    {
                      extend: 'csv',
                      text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                      className: 'dropdown-item',
                      exportOptions: { columns: [2, 3, 4, 5, 6, 7] }
                    },
                    {
                      extend: 'excel',
                      text: '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                      className: 'dropdown-item',
                      exportOptions: { columns: [2, 3, 4, 5, 6, 7] }
                    },
                    {
                      extend: 'pdf',
                      text: '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                      className: 'dropdown-item',
                      exportOptions: { columns: [2, 3, 4, 5, 6, 7] }
                    },
                    {
                      extend: 'copy',
                      text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                      className: 'dropdown-item',
                      exportOptions: { columns: [2, 3, 4, 5, 6, 7] }
                    }
                  ]
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

    attachEventListeners() {
      $("#lead_datatables").on("click", ".lead_action", (event) => {
        const target = $(event.target);
        const dataId = target.data("id");
        const dataClass = target.attr("id");
       if(dataClass === 'delete-btn'){
            this.deleteLead.data = dataId;
            this.delteLead();
        }
      });
    },

    attachEventListenersForMenu() {
      $("#lead_datatables_wrapper [name='lead_datatables_length']").on("change", (event) => {
        this.getLoader = true;
        const target = $(event.target);
        const getSelectedValue = target.val();
        this.getLeadList(1,getSelectedValue);
      });
    },
    attachEventListenersForSearch() {
      $("#lead_datatables_wrapper #lead_datatables_filter input").on("keyup", (event) => {
        const target = $(event.target);
        const getSearchValue = target.val();
        this.getLeadList(1,10,getSearchValue);
      });
    },


     // Lead  Delete
     delteLead() {
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
            .post(this.globalVariables.apiUrl+`admin/leads/delete`, this.deleteLead, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((res) => {
                toastr.success(res.data.message);
                this.getLeadList();
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

    expotAllLeadList(){
      var url = this.globalVariables.appUrl+"admin/leads/exports";
      window.open(url,'_blank')
    },
  },
}
</script>
<style>
#lead_datatables td {
  white-space: nowrap; /* Prevents wrapping */
  overflow: hidden; /* Hides overflow */
  text-overflow: ellipsis; /* Adds "..." for overflow */
  max-width: 100px; /* Set max width for cell */
}
#lead_datatables colgroup:nth-of-type(2) {
	display: none !important;
}
#lead_datatables .dt-checkboxes-cell{
	padding: 0.7rem 0.5rem !important;
}
.lead_action button {
	height: 32px;
	width: 31px;
	text-align: center;
}
</style>