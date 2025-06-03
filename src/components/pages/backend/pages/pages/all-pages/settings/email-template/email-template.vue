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
            <div class="alert alert-danger"><strong>Noted:</strong> Account manager email template configure</div>
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title mb-0">Email Template</h5>
                </div>
                <div class="card-body table-responsive table-overflow-hidden" >
                    <table class="align-middle mb-0 table table-hover" id="email_templates_tables">
                        <thead>
                            <tr>
                                <!-- <th></th> -->
                                <!-- <th></th> -->
                                <th>SL</th>
                                <th>Template Name</th>
                                <th>Subject</th>
                                <!-- <th>Body</th> -->
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
                          <button class="page-link" @click="getEmailtemplatesData(currentPage - 1)" :disabled="currentPage === 1" >
                            <i class="fa-solid fa-chevron-left"></i>
                          </button>
                        </li>

                        <!-- Page Numbers -->
                        <template v-for="page in paginationPages" :key="page">
                          <li class="paginate_button page-item" :class="{ active: page === currentPage }">
                            <button class="page-link" @click="getEmailtemplatesData(page)">
                              {{ page }}
                            </button>
                          </li>
                        </template>

                        <!-- Next Button -->
                        <li class="paginate_button page-item next" :class="{ disabled: currentPage === lastPage }">
                          <button  class="page-link" @click="getEmailtemplatesData(currentPage + 1)" :disabled="currentPage === lastPage">
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
  data: () => {
    return {
      breadcrumbs: [
        { label: "Dashboard", url: "/dashboard" },
        { label: "Settings", url: "" },
        { label: "Email Templates", url: "" },
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
        this.getEmailtemplatesData();
        this.$nextTick(() => {
          const dataTableWrapper = document.querySelectorAll('#email_templates_tables_wrapper .row.mx-2');
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
    getEmailtemplatesData(page = 1, perPage = 10,searchValue = '') {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl+"admin/mailsettings/email-template", {
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

          if ($.fn.DataTable.isDataTable("#email_templates_tables")) {
            $('#email_templates_tables').DataTable().destroy();
          }
            var table = $('#email_templates_tables').DataTable({
              data: data,
              columns: [
                // { data: 'id' },
                // { data: 'id' },
                { data: 'id' },
                { data: 'convart_template_name',
                  render: function (data, type, row) {
                if (row?.convart_template_name != null) {
                  return '<span title="'+row?.convart_template_name+'">'+row?.convart_template_name+'</span>';
                }
                return '----------';
              },
                 },
                { data: 'subject',
                  render: function (data, type, row) {
                if (row?.subject != null) {
                  return '<span title="'+row?.subject+'">'+row?.subject+'</span>';
                }
                return '----------';
              },
                 },
                // { data: 'content' },
                {
                  data: null, // Specify null for custom rendering
                  title: 'Actions',
                  searchable: false,
                  orderable: false,
                  render: function (data, type, full, meta) {
                    return '<div class="email_templates_action d-flex align-items-center"><a title="Edit" data-vue-route href="/admin-settings-email-template-edit/'+full.id+'" class="bg-transparent border-0 text-primary me-2"><i class="far fa-edit fa-sm"></i></a></div>';
                  }
                }
              ],
              initComplete: () => { 
                const table = $("#email_templates_tables").DataTable();
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
                this.attachEventListenersForMenu();
                this.attachEventListenersForSearch();

                const searchInput = $("#email_templates_tables_filter input");
                searchInput.val(this.searchInputValue);
                if(this.searchInputValue != ''){
                    searchInput.focus();
                }

                searchInput.off().on("keyup", (e) => {
                  const searchTerm = e.target.value;
                  this.searchInputValue = searchTerm;
                  this.getEmailtemplatesData(1, perPage, searchTerm);
                });
              },
              createdRow: function (row, data, dataIndex) {
                const perPage = 10; 
                const rowNumber = (dataIndex + 1) + (page - 1) * perPage;
                $('td:eq(0)', row).html(rowNumber);
              },
              // columnDefs: [
              //   {
              //     targets: 0,
              //     orderable: false,
              //     checkboxes: {
              //       selectAllRender: '<input type="checkbox" class="form-check-input">'
              //     },
              //     render: function () {
              //       return '<input type="checkbox" class="dt-checkboxes form-check-input">';
              //     },
              //     searchable: false
              //   },
              // ],
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
                searchPlaceholder: 'Search Offer',
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
                      exportOptions: { columns: [2, 3, 4, 5] }
                    },
                    {
                      extend: 'csv',
                      text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                      className: 'dropdown-item',
                      exportOptions: { columns: [2, 3, 4, 5] }
                    },
                    {
                      extend: 'excel',
                      text: '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                      className: 'dropdown-item',
                      exportOptions: { columns: [2, 3, 4, 5] }
                    },
                    {
                      extend: 'pdf',
                      text: '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                      className: 'dropdown-item',
                      exportOptions: { columns: [2, 3, 4, 5] }
                    },
                    {
                      extend: 'copy',
                      text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                      className: 'dropdown-item',
                      exportOptions: { columns: [2, 3, 4, 5] }
                    }
                  ]
                },
                {
                  className: "btn btn-primary",
                  text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><li><a class="dropdown-item" href="#" data-column="all">All</a></li><li><a class="dropdown-item" href="#" data-column="0">Sl</a></li><li><a class="dropdown-item" href="#" data-column="1">Template Name</a></li><li><a class="dropdown-item" href="#" data-column="2">Subject</a></li><li><a class="dropdown-item" href="#" data-column="3">Action</a></li></ul></div>',
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

    attachEventListenersForMenu() {
      $("#email_templates_tables_wrapper [name='email_templates_tables_length']").on("change", (event) => {
        this.getLoader = true;
        const target = $(event.target);
        const getSelectedValue = target.val();
        this.getEmailtemplatesData(1,getSelectedValue);
      });
    },
    attachEventListenersForSearch() {
      $("#email_templates_tables_wrapper #email_templates_tables_filter input").on("keyup", (event) => {
        const target = $(event.target);
        const getSearchValue = target.val();
        this.getEmailtemplatesData(1,10,getSearchValue);
      });
    },
  },
};
</script>
<style>
#email_templates_tables colgroup:nth-of-type(2) {
	display: none !important;
}
#email_templates_tables .dt-checkboxes-cell{
	padding: 0.7rem 0.5rem !important;
}
</style>

