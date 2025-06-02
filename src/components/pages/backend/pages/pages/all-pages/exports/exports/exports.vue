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
              <div class="card-header py-3 pb-0">
                <h5 class="card-title mb-0">Filter</h5>
              </div>
              <form class="px-5" id="form_filter">
                  <div class="row-mb">
                    <div class="row g-5">
                      <div class="col-md-4 ps-3">
                        <div class="row">
                        <label for="role_name" class="mt-3 mb-1">Role Name</label>
                        <select @change="SearchValue()" v-model="getAllUserData.role_name" id="role_name" class="form-select">
                          <option value="">Select Please</option>
                          <option v-for="(role,index) in roles.roles" :key="index" :value="role.id">{{ role.name }}</option>
                        </select>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="row">
                          <label for="status" class="mt-3 mb-1">Status</label>
                          <select  @change="SearchValue()" v-model="getAllUserData.status" id="status" class="form-select">
                            <option value="">Select Please</option>
                            <option value="0">Pending</option>
                            <option value="1">Approved</option>
                            <option value="2">Suspend</option>
                            <option value="3">Unsuspend</option>
                            <option value="4">Pause</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="row">
                          <label for="verified" class="mt-3 mb-1">Verified</label>
                          <select  @change="SearchValue()" v-model="getAllUserData.verified" id="verified" class="form-select">
                              <option value="">Select Please</option>
                              <option value="1">Verified</option>
                              <option value="0">Unverified</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
                <div class="card-header pt-3 pb-1">
                  <h5 class="card-title mb-0">
                    Users
                  </h5>
                </div>
              <div class="card-body px-4 table-responsive table-overflow-hidden">
                <table class="align-middle mb-0 table table-hover" id="data_tables_report">
                  <thead>
                    <tr>
                      <!-- <th></th> -->
                      <th></th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <!-- <th>Last Name</th> -->
                      <th>Email</th>
                      <th>Role</th>
                      <th>Phone</th>
                      <th>Company</th>
                      <!-- <th>Company Website</th> -->
                      <!-- <th>User Offer</th>
                      <th>Traffic Urls</th> -->
                      <th>Visitors</th>
                      <!--<th></th>
                       <th>Skype</th>
                      <th>Telegram</th>
                      <th>Facebook</th> -->
                      <th>Status</th>
                      <th>Country</th>
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
                        <button class="page-link" @click="getAdminUserExport(currentPage - 1)" :disabled="currentPage === 1" >
                          <i class="fa-solid fa-chevron-left"></i>
                        </button>
                      </li>

                      <!-- Page Numbers -->
                      <template v-for="page in paginationPages" :key="page">
                        <li class="paginate_button page-item" :class="{ active: page === currentPage }">
                          <button class="page-link" @click="getAdminUserExport(page)">
                            {{ page }}
                          </button>
                        </li>
                      </template>

                      <!-- Next Button -->
                      <li class="paginate_button page-item next" :class="{ disabled: currentPage === lastPage }">
                        <button  class="page-link" @click="getAdminUserExport(currentPage + 1)" :disabled="currentPage === lastPage">
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
  props : ['roles'],
  components: {
    Loader,
    Breadcrumb,
  },
  data() {
    return {
      breadcrumbs: [
        { label: "Dashboard", url: "/dashboard" },
        { label: "Export", url: "" },
      ],
      getLoader: false,
      getAllUserData : {
        draw	: "1",
        "columns[0][data]" :	"0",
        "columns[0][name]" :	"",
        "columns[0][searchable]" :	"true",
        "columns[0][orderable]" :	"true",
        "columns[0][search][value]" :	"",
        "columns[0][search][regex]" :	"false",
        "columns[1][data]" :	"1",
        "columns[1][name]" :	"",
        "columns[1][searchable]" :	"true",
        "columns[1][orderable]" :	"true",
        "columns[1][search][value]" :	"",
        "columns[1][search][regex]" :	"false",
        "columns[2][data]" :	"2",
        "columns[2][name]" :	"",
        "columns[2][searchable]" :	"true",
        "columns[2][orderable]" :	"true",
        "columns[2][search][value]" :	"",
        "columns[2][search][regex]" :	"false",
        "columns[3][data]" :	"3",
        "columns[3][name]" :	"",
        "columns[3][searchable]" :	"true",
        "columns[3][orderable]" :	"true",
        "columns[3][search][value]" :	"",
        "columns[3][search][regex]" :	"false",
        "columns[4][data]" :	"4",
        "columns[4][name]" :	"",
        "columns[4][searchable]" :	"true",
        "columns[4][orderable]" :	"true",
        "columns[4][search][value]" :	"",
        "columns[4][search][regex]" :	"false",
        "columns[5][data]" :	"5",
        "columns[5][name]" :	"",
        "columns[5][searchable]" :	"true",
        "columns[5][orderable]" :	"true",
        "columns[5][search][value]" :	"",
        "columns[5][search][regex]" :	"false",
        "columns[6][data]" :	"6",
        "columns[6][name]" :	"",
        "columns[6][searchable]" :	"true",
        "columns[6][orderable]" :	"true",
        "columns[6][search][value]" :	"",
        "columns[6][search][regex]" :	"false",
        "columns[7][data]" :	"7",
        "columns[7][name]" :	"",
        "columns[7][searchable]" :	"true",
        "columns[7][orderable]" :	"true",
        "columns[7][search][value]" :	"",
        "columns[7][search][regex]" :	"false",
        "columns[8][data]" :	"8",
        "columns[8][name]" :	"",
        "columns[8][searchable]" :	"true",
        "columns[8][orderable]" :	"true",
        "columns[8][search][value]" :	"",
        "columns[8][search][regex]" :	"false",
        "columns[9][data]" :	"9",
        "columns[9][name]" :	"",
        "columns[9][searchable]" :	"true",
        "columns[9][orderable]" :	"true",
        "columns[9][search][value]" :	"",
        "columns[9][search][regex]" :	"false",
        "columns[10][data]" :	"10",
        "columns[10][name]" :	"",
        "columns[10][searchable]" :	"true",
        "columns[10][orderable]" :	"true",
        "columns[10][search][value]" :	"",
        "columns[10][search][regex]" :	"false",
        "columns[11][data]" :	"11",
        "columns[11][name]" :	"",
        "columns[11][searchable]" :	"true",
        "columns[11][orderable]" :	"true",
        "columns[11][search][value]" :	"",
        "columns[11][search][regex]" :	"false",
        "columns[12][data]" :	"12",
        "columns[12][name]" :	"",
        "columns[12][searchable]" :	"true",
        "columns[12][orderable]" :	"true",
        "columns[12][search][value]" :	"",
        "columns[12][search][regex]" :	"false",
        "columns[13][data]" :	"13",
        "columns[13][name]" :	"",
        "columns[13][searchable]" :	"true",
        "columns[13][orderable]" :	"true",
        "columns[13][search][value]" :	"",
        "columns[13][search][regex]" :	"false",
        "columns[14][data]" :	"14",
        "columns[14][name]" :	"",
        "columns[14][searchable]" :	"true",
        "columns[14][orderable]" :	"true",
        "columns[14][search][value]" :	"",
        "columns[14][search][regex]" :	"false",
        "columns[15][data]" :	"15",
        "columns[15][name]" :	"",
        "columns[15][searchable]" :	"true",
        "columns[15][orderable]" :	"true",
        "columns[15][search][value]" :	"",
        "columns[15][search][regex]" :	"false",
        "columns[16][data]" :	"16",
        "columns[16][name]" :	"",
        "columns[16][searchable]" :	"true",
        "columns[16][orderable]" :	"true",
        "columns[16][search][value]" :	"",
        "columns[16][search][regex]" :	"false",
        start	 : "0",
        length : 	"ALL",
        "search[value]" : 	"",
        "search[regex]" : 	"false",
        role_name : 	"",
        status : 	"",
        verified	 : "",
      },
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
        this.getAdminUserExport();
        this.$nextTick(() => {
          const dataTableWrapper = document.querySelectorAll('#data_tables_report_wrapper .row.mx-2');
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
    getAdminUserExport(page = 1, perPage = 10,searchValue = '') {
      this.getLoader = true;
      axios
        .post(this.globalVariables.apiUrl+"admin/export/users/get-data", this.getAllUserData, {
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

          if ($.fn.DataTable.isDataTable("#data_tables_report")) {
            $('#data_tables_report').DataTable().destroy();
          }
        var table = $('#data_tables_report').DataTable({
          data: data,
          columns: [
              // { data: "0" },
              { data: "0" },
              { data: "1",
                render: function (data, type, row) {
                  if (row['1'] != null) {
                    return '<span title="'+row['1']+'">'+row['1']+'</span>';
                  }
                  return '----------';
                },
               }, 
              { data: "2",
                render: function (data, type, row) {
                  if (row['2'] != null) {
                    return '<span title="'+row['2']+'">'+row['2']+'</span>';
                  }
                  return '----------';
                },
               },
              { data: "3",
                render: function (data, type, row) {
                  if (row['3'] != null) {
                    return '<span title="'+row['3']+'">'+row['3']+'</span>';
                  }
                  return '----------';
                },
               }, 
              { data: "4",
                render: function (data, type, row) {
                  if (row['4'] != null) {
                    return '<span title="'+row['4']+'">'+row['4']+'</span>';
                  }
                  return '----------';
                },
               }, 
              { data: "5",
                render: function (data, type, row) {
                  if (row['5'] != null) {
                    return '<span title="'+row['5']+'">'+row['5']+'</span>';
                  }
                  return '----------';
                },
               },  
              { data: "6",
                render: function (data, type, row) {
                  if (row['6'] != null) {
                    return '<span title="'+row['6']+'">'+row['6']+'</span>';
                  }
                  return '----------';
                },
               },  
              { data: "10" },  
              { data: "15" }, 
              { data: "11" }, 
              ],
          initComplete: () => { 
            const table = $("#data_tables_report").DataTable();
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
            this.attachEventListenersForSearch();
            this.attachEventListenersForMenu();
            this.attachEventListenersBlulkAction();
            this.attachEventListenersBlulkActionSubmit();

            const searchInput = $("#data_tables_report_filter input");
            searchInput.val(this.searchInputValue);
            if(this.searchInputValue != ''){
              searchInput.focus();
            }
            searchInput.off().on("keyup", (e) => {
              const searchTerm = e.target.value;
              this.searchInputValue = searchTerm;
              this.getAdminUserExport(1, perPage, searchTerm);
            });
          },
          // createdRow: function (row, data, dataIndex) {
          //       $('td:eq(0)', row).html(dataIndex + 1);
          // },
          columnDefs: [
            {
              targets: 0,
              orderable: false,
              checkboxes: {
                selectAllRender: '<input type="checkbox" class="form-check-input ms-1">',
              },
              render: function (data, type, row) {
                return `<input type="checkbox" class="dt-checkboxes form-check-input ms-1 row-checkbox" data-id="${row['17']}">`;
              },
              searchable: false
            },
          ],
          order: [[2, 'desc']],
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
            searchPlaceholder: 'Search Offer',
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
                  exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8,9] }
                },
                {
                  extend: 'csv',
                  text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                  className: 'dropdown-item',
                  exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8,9] }
                },
                {
                  extend: 'excel',
                  text: '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                  className: 'dropdown-item',
                  exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8,9] }
                },
                {
                  extend: 'pdf',
                  text: '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                  className: 'dropdown-item',
                  exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8,9] }
                },
                {
                  extend: 'copy',
                  text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                  className: 'dropdown-item',
                  exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8,9] }
                }
              ]
            },
            {
                  className: "btn btn-primary ms-2",
                  text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><li><a class="dropdown-item" href="#" data-column="all">All</a></li><li><a class="dropdown-item" href="#" data-column="0">SL</a></li><li><a class="dropdown-item" href="#" data-column="1">First Name</a></li><li><a class="dropdown-item" href="#" data-column="2">Last Name</a></li><li><a class="dropdown-item" href="#" data-column="3">Email</a></li><li><a class="dropdown-item" href="#" data-column="4">Role</a></li><li><a class="dropdown-item" href="#" data-column="5">Phone</a></li><li><a class="dropdown-item" href="#" data-column="6">Company</a></li><li><a class="dropdown-item" href="#" data-column="7">Visitors</a></li><li><a class="dropdown-item" href="#" data-column="8">Status</a></li><li><a class="dropdown-item" href="#" data-column="9">Country</a></li></ul></div>',
                },
          ],
        });
        this.getLoader = false;
        })
        .catch((e) => {
          return e;
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    SearchValue(){
      this.getAdminUserExport();
    },

    attachEventListenersBlulkAction() {
      $('#data_tables_report').on('change', '.row-checkbox', (event) => {
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
      $('#data_tables_report thead').on('change', 'input[type="checkbox"]', (event) => {
        const isChecked = event.target.checked;
        $('#data_tables_report tbody .row-checkbox').each((index, checkbox) => {
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
                this.globalVariables.apiUrl + "admin/export/users/bulk/delete",
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
                  this.getAdminUserExport();
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

    attachEventListenersForMenu() {
      $("#data_tables_report_wrapper [name='data_tables_report_length']").on("change", (event) => {
        this.getLoader = true;
        const target = $(event.target);
        const getSelectedValue = target.val();
        this.getAdminUserExport(1,getSelectedValue);
      });
    },
    attachEventListenersForSearch() {
      $("#data_tables_report_wrapper #data_tables_report_filter input").on("keyup", (event) => {
        const target = $(event.target);
        const getSearchValue = target.val();
        this.getAdminUserExport(1,10,getSearchValue);
      });
    },

  },
};
</script>
  <style>
#data_tables_report td {
  white-space: nowrap; /* Prevents wrapping */
  overflow: hidden; /* Hides overflow */
  text-overflow: ellipsis; /* Adds "..." for overflow */
  max-width: 100px; /* Set max width for cell */
}
#data_tables_report colgroup:nth-of-type(2) {
	display: none !important;
}
#data_tables_report .dt-checkboxes-cell{
	padding: 0.7rem 0.5rem !important;
}
</style>