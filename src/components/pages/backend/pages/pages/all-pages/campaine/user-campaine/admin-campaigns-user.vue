<template>
  <div v-if="getLoader">
    <Loader></Loader>
  </div>
  <!-- Content wrapper -->
  <div class="content-wrapper" id="users_campaign">
    <!-- {{ user_campain }} -->
    <!-- Content -->
    <div class="container-fluid flex-grow-1 container-p-y">
      <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
      <div class="row mt-4">
        <div class="col-12">
          <div class="card">
            <div class="card-header pt-3 pb-0">
              <h5 class="card-title ms-1 mb-0">Campaigns </h5>
            </div>
            <div class="card-body table-responsive table-overflow-hidden">
              <table class="table mb-0" id="users_campaign_datatables">
                <thead>
                  <tr>
                    <th></th>
                    <!-- <th style="width: 1%;">SL</th> -->
                    <th>Campaign Name</th>
                    <th>Company Name</th>
                    <th>Person Name</th>
                    <th>Traffic Source</th>
                    <th>Offer Category</th>
                    <th>DID Number</th>
                    <th>Status</th>
                    <th>Date</th>
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
                      <button class="page-link" @click="getUserCampaigen(currentPage - 1)" :disabled="currentPage === 1" >
                        <i class="fa-solid fa-chevron-left"></i>
                      </button>
                    </li>

                    <!-- Page Numbers -->
                    <template v-for="page in paginationPages" :key="page">
                      <li class="paginate_button page-item" :class="{ active: page === currentPage }">
                        <button class="page-link" @click="getUserCampaigen(page)">
                          {{ page }}
                        </button>
                      </li>
                    </template>

                    <!-- Next Button -->
                    <li class="paginate_button page-item next" :class="{ disabled: currentPage === lastPage }">
                      <button  class="page-link" @click="getUserCampaigen(currentPage + 1)" :disabled="currentPage === lastPage">
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
import Loader from '../../../../../include/loader.vue';
import Breadcrumb from '../../../../../include/breadcrumb.vue';
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
    currentPage: 1,
    lastPage: 1,
    recordsTotal : 0,
    startPage : 0,
    endPage : 0,
    searchInputValue : "",
    getLoader  : false,
    breadcrumbs: [
      { label: "Dashboard", url: "/dashboard" },
      { label: "User Campaigns", url: "" },
    ],
    user_campain  : "",
    statusCampaign: {
      data      : "",
      actionType: "",
    },
    bulkactionids : {
      selectedIds: [],
      status : "",
    },
    campaignDelete : {
      data: "",
    },

  }
},
async mounted() { 
  try {
    const { role, isAuthorized } = await fetchUserRole();
    if (role == 'Super' || role == 'Admin') {
      this.getUserCampaigen();
      this.$nextTick(() => {
        const dataTableWrapper = document.querySelectorAll('#users_campaign_datatables_wrapper .row.mx-2');
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
  getUserCampaigen(page = 1, perPage = 10,searchValue = '') {
    this.getLoader = true;
    axios.get(this.globalVariables.apiUrl+'admin/campaigns/get-user-data',{
            headers: { Authorization: "Bearer " + localStorage.getItem("token"), },
            params: { page: page, perPage: perPage,search: searchValue},
        })
      .then((res) => {
          const { data, current_page, last_page,recordsTotal } = res.data;
          this.currentPage = current_page;
          this.lastPage = last_page;
          this.recordsTotal = recordsTotal;
          this.startPage = (current_page - 1) * perPage + 1;
          this.endPage = Math.min(current_page * perPage, recordsTotal);

          if ($.fn.DataTable.isDataTable("#users_campaign_datatables")) {
            $('#users_campaign_datatables').DataTable().destroy();
          }
          var table = $('#users_campaign_datatables').DataTable({
            data: data,
            columns: [
              // { data: 'id' },
              // { data: 'id' },
              // { data: 'id' },
              { data: 'convart_offer' },
              {
                data: "name",
                render: function (data, type, row) {
                  if (row.name != null) {
                    return row.name.length > 25 
                      ? row.name.slice(0, 25) + '...'  
                      : row.name; 
                  }
                  return '----------';
                },
              },
              {
                data: "index_number",
                render: function (data, type, row) {
                  if (row?.user?.company_name != null) {
                    if(row?.user?.role_id == 3){
                      return '<a data-vue-route href="/admin-manage-publishers-view/'+row?.user?.id+'">'+row?.user?.company_name+'</a>';
                    }else{
                      return '<a data-vue-route href="/admin-manage-advertiser-view/'+row?.user?.id+'">'+row?.user?.company_name+'</a>';
                    }
                  }
                  return '----------';
                },
              },
              {
                data: "user",
                render: function (data, type, row) {
                  if (row?.user?.fname != null) {
                    if(row?.user?.role_id == 3){
                      return '<a data-vue-route href="/admin-manage-publishers-view/'+row?.user?.id+'">'+row?.user?.fname+'</a>';
                    }else{
                      return '<a data-vue-route href="/admin-manage-advertiser-view/'+row?.user?.id+'">'+row?.user?.fname+'</a>';
                    }
                  }
                  return '----------';
                },
              },
              {
                data: "trafic_source",
                render: function (data, type, row) {
                  if (row?.trafic_source != null) {
                    return row.name.length > 25 
                      ? row.name.slice(0, 25) + '...'  
                      : row.name; 
                  }
                  return '----------';
                },
              },
              {
                data: "offer",
                render: function (data, type, row) {
                  if (row?.offer?.category?.name != null) {
                    return row?.offer?.category?.name;
                  }
                  return '----------';
                },
              },
              {
                data: "note",
                render: function (data, type, row) {
                  if (row?.user?.phone_no != null) {
                    return row?.user?.phone_no;
                  }
                  return '----------';
                },
              },

              { data: 'convart_status' },
              { data: 'convart_date' },
              { data: '' }
            ],
            initComplete: () => { 
              this.attachEventListenersForMenu();
              this.attachEventListenersForSearch();
              this.attachEventListenersBlulkAction();
              this.attachEventListenersBlulkActionSubmit();
              const searchInput = $("#users_campaign_datatables_filter input");
              searchInput.val(this.searchInputValue);
              if(this.searchInputValue != ''){
                  searchInput.focus();
              }

              searchInput.off().on("keyup", (e) => {
                const searchTerm = e.target.value;
                this.searchInputValue = searchTerm;
                this.getUserCampaigen(1, perPage, searchTerm);
              });
              
              this.attachEventListeners();
            },
            // createdRow: function (row, data, dataIndex) {
            //   const perPage = 10; 
            //   const rowNumber = (dataIndex + 1) + (page - 1) * perPage;
            //   $('td:eq(1)', row).html(rowNumber);
            // },
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
              { targets: 5, orderable: false, className: 'dt-center' },
              {
                targets: -1,
                title: 'Actions',
                searchable: false,
                orderable: false,
                render: function (data, type, full, meta) {
                  return full.convart_action;
                }
              }
            ],
            orderCellsTop: true,
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
              searchPlaceholder: 'Search Campaign',
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
                      <option value="0">Pending</option>
                      <option value="1">Approved</option>
                      <option value="2">Pause</option>
                      <option value="3">Reject</option>
                      <option value="4">Resume</option>
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
                  exportOptions: { columns: [1, 2, 3, 4, 5, 6,7,8] }
                },
                {
                  extend: 'csv',
                  text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                  className: 'dropdown-item',
                  exportOptions: { columns: [1, 2, 3, 4, 5, 6,7,8] }
                },
                {
                  extend: 'excel',
                  text: '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                  className: 'dropdown-item',
                  exportOptions: { columns: [1, 2, 3, 4, 5, 6,7,8] }
                },
                {
                  extend: 'pdf',
                  text: '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                  className: 'dropdown-item',
                  exportOptions: { columns: [1, 2, 3, 4, 5, 6,7,8] }
                },
                {
                  extend: 'copy',
                  text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                  className: 'dropdown-item',
                  exportOptions: { columns: [1, 2, 3, 4, 5, 6,7,8] }
                }
              ]
            },
            ],
          });
      })
      .catch((e) => {
        return e
      })
      .finally(()=>{
        this.getLoader = false;
    });
  },
  attachEventListeners() {
    $('#users_campaign_datatables').on('click', '.user-campaign-action', (event) => {
      const target = $(event.target);
      const dataId = target.data('id');
      const dataClass = target.data('action');
      if (dataClass === 'pending-btn') {
        this.statusCampaign.data = dataId;
        this.statusCampaign.actionType = 'pending';
        this.statusChange('Are your sure pending?');
      }else if(dataClass === 'published-btn'){
        this.statusCampaign.data = dataId;
        this.statusCampaign.actionType = 'published';
        this.statusChange('Are your sure published?');
      }else if(dataClass == 'delete-campaign-btn'){
          this.campaignDelete.data = dataId;
        Swal.fire({
          text: 'Are you sure delete',
          icon: "info",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "Cancel",
        }).then((result) => {
          if (result.value) {
            this.getLoader = true,
            axios
              .post(this.globalVariables.apiUrl+"admin/campaigns/delete", this.campaignDelete, {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              })
              .then((res) => {
                if(res.data.status == 'success'){
                  toastr.success(res.data.message);
                  this.getUserCampaigen();
                }else{
                  toastr.error(res.data.message);
                }
              })
              .catch((e) => {
                return e;
              })
              .finally(()=> {
                this.getLoader = false;
              });
            } 
        });
      }
    });
  },
  attachEventListenersBlulkAction() {
      $('#users_campaign_datatables').on('change', '.row-checkbox', (event) => {
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

      $('#users_campaign_datatables thead').on('change', 'input[type="checkbox"]', (event) => {
        const isChecked = event.target.checked;
        $('#users_campaign_datatables tbody .row-checkbox').each((index, checkbox) => {
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
            const alertTitle = "Offer Want to Approved";
            this.bulkStatusChange(alertTitle);
          } else if (action === "0") {
            this.bulkactionids.status = '0';
            const alertTitle = "Offer Want to Pending";
            this.bulkStatusChange(alertTitle);
          } else if (action === "4") {
            this.bulkactionids.status = '4';
            const alertTitle = "Offer Want to Resume";
            this.bulkStatusChange(alertTitle);
          } else if (action === "2") {
            this.bulkactionids.status = '2';
            const alertTitle = "Offer Want to Pause";
            this.bulkStatusChange(alertTitle);
          }else{
            this.bulkactionids.status = '3';
            const alertTitle = "Offer Want to Reject";
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
                this.globalVariables.apiUrl + "admin/campaigns/bulk-delete",
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
                  this.getOffersTypes();
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
                    this.globalVariables.apiUrl + "admin/campaigns/bulk-status",
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
                      this.getUserCampaigen();
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

  statusChange(title){
      Swal.fire({
      text: title,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.value) {
        this.getLoader = true,
        axios
          .post(this.globalVariables.apiUrl+"admin/campaigns/status", this.statusCampaign, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
            if(res.data.status == 'success'){
              toastr.success(res.data.message);
              this.getUserCampaigen();
            }else{
              toastr.error(res.data.message);
            }
          })
          .catch((e) => {
            return e;
          })
          .finally(()=> {
            this.getLoader = false;
          });
        } 
    });
  },

  attachEventListenersForMenu() {
    $("#users_campaign_datatables_wrapper [name='users_campaign_datatables_length']").on("change", (event) => {
      this.getLoader = true;
      const target = $(event.target);
      const getSelectedValue = target.val();
      this.getUserCampaigen(1,getSelectedValue,'');
    });
  },
  attachEventListenersForSearch() {
    $("#users_campaign_datatables_wrapper #users_campaign_datatables_filter input").on("keyup", (event) => {
      const target = $(event.target);
      const getSearchValue = target.val();
      this.getUserCampaigen(1,10,getSearchValue);
    });
  },

},
}
</script>
<style>
#users_campaign_datatables{
  font-size: 15px;
}
#users_campaign colgroup:nth-of-type(2) {
	display: none !important;
}
#users_campaign .dt-checkboxes-cell {
	padding: 0.7rem 0.5rem !important;
}
.select2-container--default .select2-selection--multiple .select2-selection__choice {
  color: #1a1b1b !important;
}

.select2-container--default
  .select2-selection--multiple
  .select2-selection__choice__remove {
  color: #1a1b1b !important;
}
.has-search .form-control {
  padding-left: 2.375rem;
}

.has-search .form-control-feedback {
  position: absolute;
  z-index: 2;
  display: block;
  width: 2.375rem;
  height: 2.375rem;
  line-height: 2.375rem;
  text-align: center;
  pointer-events: none;
  color: #aaa;
}

.icon-margin {
  margin-right: 70px;
}

.offer-filter-right-box {
  border: 1px solid #dfdfdf;
  padding: 1.25rem;
}

.offer-filter-right-box-overflow {
  max-height: 230px;
  overflow: auto;
}

.request-offer {
  background: #ffffff;
  margin: 20px 0px;
  padding: 25px;
}

.ro-wrapper[data-v-5669685e] {
  display: flex;
}

.ro-data {
  color: #333333;
  padding: 20px;
  flex-grow: 1;
  font: 13px Roboto;
}

.ro-image {
  width: 254px;
  padding: 0 27px;
}

.ro-text {
  color: #333333;
  font: 13px;
}

#users_campaign h6 {
  color: #333333;
  font: 13px Roboto;
  margin: 0px 0px 10px;
}

#users_campaign p {
  color: #333333;
  font: 13px Roboto;
  margin: 0px 0px 18px;
}
.country-flag {
  width: 18px;
  margin-right: 5px;
}

input:focus {
  outline: 0;
  box-shadow: none;
}
.search-bar {
  width: 350px;
  height: 35px;
}
.search-bar input {
  width: 100%;
  border: 1px solid #dddddd;
  padding: 3px 10px;
  border-radius: 3px 0 0 3px;
}
.search-bar button {
  background: #045cd6;
  border: 1px solid #045cd6;
  color: #fff;
  padding: 0 10px;
  border-radius: 0 3px 3px 0;
}
.btn-primary {
  color: #fff !important;
  background: #0162e8 !important;
  border-color: #0162e8 !important;
}
#dropdownMenuButton{
  background: transparent;
}
/* #users_campaign_datatables {
  min-height: 200px;
} */

#users_campaign_datatables .dropdown-item {
	display: flex !important;
	align-items: center !important;
}
</style>
