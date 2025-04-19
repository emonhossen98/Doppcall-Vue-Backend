<template>
  <div v-if="getLoader">
    <Loader></Loader>
  </div>
    <!-- Content wrapper -->
    <div class="content-wrapper">
      <!-- Content -->
      <div class="container-xxl flex-grow-1 container-p-y">
        <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
        <div class="row mt-4">
            <div class="col-12">
                <div class="card">
                    <div class="card-header py-3">
                        <h5 class="card-title mb-0 mt-2">
                            Email Logs
                        </h5>
                    </div>
                    <div class="card-body table-responsive table-overflow-hidden">
                        <table class="align-middle mb-0 table table-hover" id="emails_tables">
                            <thead>
                            <tr>
                              <!-- <th></th> -->
                              <th></th> <th>SL</th> 
                              <th>To</th>
                              <th>Subject</th>
                              <th>Action</th>
                              <!-- <th>Body</th> -->
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
                                <button class="page-link" @click="getEmailLogs(currentPage - 1)" :disabled="currentPage === 1" >
                                  <i class="fa-solid fa-chevron-left"></i>
                                </button>
                              </li>

                              <!-- Page Numbers -->
                              <template v-for="page in paginationPages" :key="page">
                                <li class="paginate_button page-item" :class="{ active: page === currentPage }">
                                  <button class="page-link" @click="getEmailLogs(page)">
                                    {{ page }}
                                  </button>
                                </li>
                              </template>

                              <!-- Next Button -->
                              <li class="paginate_button page-item next" :class="{ disabled: currentPage === lastPage }">
                                <button  class="page-link" @click="getEmailLogs(currentPage + 1)" :disabled="currentPage === lastPage">
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

      <!-- Large Modal -->
 <div class="modal fade" id="emailLogsContent" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header" id="modal-header">
          <h5 class="modal-title" id="exampleModalLabel3">Email Log Information</h5>
          <hr>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div id="EmailContents">

          </div>
        </div>
      </div>
    </div>
  </div>
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
        { label: "Email Logs", url: "" },
      ],
      getLoader: false,
      currentPage: 1,
      lastPage: 1,
      recordsTotal : 0,
      startPage : 0,
      endPage : 0,
      searchInputValue : "",
      emailcontenview : {
        data_id : '',
      },
    };
  },
  async mounted() { 
    try {
      const { role, isAuthorized } = await fetchUserRole();
      if (role == 'Super' || role == 'Admin') {
        this.getEmailLogs();
        this.$nextTick(() => {
          const dataTableWrapper = document.querySelectorAll('#emails_tables_wrapper .row.mx-2');
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
    getEmailLogs(page = 1, perPage = 10,searchValue = '') {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl+"admin/emails", {
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

          if ($.fn.DataTable.isDataTable("#emails_tables")) {
            $('#emails_tables').DataTable().destroy();
          }
            var table = $('#emails_tables').DataTable({
              data: data,
              columns: [
                // { data: 'id' },
                 { data: 'id' },
                 { data: 'id' },
                 { data: 'user' },
                 { data: 'subject' },
                //  { data: 'body' },
                {
                 data : "updated_at",
                 render: function (data, type, row) {
                  return '<button data-id="'+row.id+'" title="View"  data-bs-toggle="modal" data-bs-target="#emailLogsContent" id="content-view" class="industial_contact_view text-info border-0"><i id="content-view" class="fas fa-eye fa-sm" data-id="'+row.id+'"></i></button>'
                 }
              }
                
              ],
              initComplete: () => {
                this.attachEventListeners();
                this.attachEventListenersForMenu();
                this.attachEventListenersForSearch();

                const searchInput = $("#emails_tables_filter input");
                searchInput.val(this.searchInputValue);
                if(this.searchInputValue != ''){
                  searchInput.focus();
                }
                searchInput.off().on("keyup", (e) => {
                  const searchTerm = e.target.value;
                  this.searchInputValue = searchTerm;
                  this.getEmailLogs(1, perPage, searchTerm);
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
                searchPlaceholder: 'Search Email Log',
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
                      exportOptions: { columns: [2, 3, 4] }
                    },
                    {
                      extend: 'csv',
                      text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                      className: 'dropdown-item',
                      exportOptions: { columns: [2, 3, 4] }
                    },
                    {
                      extend: 'excel',
                      text: '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                      className: 'dropdown-item',
                      exportOptions: { columns: [2, 3, 4] }
                    },
                    {
                      extend: 'pdf',
                      text: '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                      className: 'dropdown-item',
                      exportOptions: { columns: [2, 3, 4] }
                    },
                    {
                      extend: 'copy',
                      text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                      className: 'dropdown-item',
                      exportOptions: { columns: [2, 3, 4] }
                    }
                  ]
                },
              ],
            });

            this.getLoader = false;
        })
        .catch((e) => {
          return e;
        })
        .finally(() => {
          this.getLoader =  false;
        });
    },
    
    attachEventListeners() {
      $('#emails_tables').on('click', '.industial_contact_view', (event) => {
        const target = $(event.target);
        const dataId = target.data('id');
        const dataClass = target.attr('id');
        this.emailcontenview.data_id = dataId;
        if(dataClass === 'content-view'){
          this.getEmailInformation();
        }
      });
    },
    attachEventListenersForMenu() {
      $("#emails_tables_wrapper [name='emails_tables_length']").on("change", (event) => {
        this.getLoader = true;
        const target = $(event.target);
        const getSelectedValue = target.val();
        this.getEmailLogs(1,getSelectedValue);
      });
    },
    attachEventListenersForSearch() {
      $("#emails_tables_wrapper #emails_tables_filter input").on("keyup", (event) => {
        const target = $(event.target);
        const getSearchValue = target.val();
        this.getEmailLogs(1,10,getSearchValue);
      });
    },
    getEmailInformation(){
      this.getLoader = true;
      axios
        .post(this.globalVariables.apiUrl+"admin/get-email-info",this.emailcontenview, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },  
        })
        .then((res) => {
          document.querySelector('#EmailContents').innerHTML = res && res.data && res.data.data && res.data.data.body;
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.getLoader = false;
        });
    }
  },
};
</script>
<style>
#emails_tables colgroup:nth-of-type(2) {
	display: none !important;
}
#emails_tables  .dt-checkboxes-cell{
	padding: 0.7rem 0.5rem !important;
}
#modal-header {
	border-bottom: 1px solid #ededed;
}
#content-view{
	background: transparent;
	font-size: 17px;
}
</style>