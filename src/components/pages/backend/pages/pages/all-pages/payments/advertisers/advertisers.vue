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
                    <div class="card-header pt-3 pb-0">
                        <h5 class="card-title d-flex align-items-center justify-content-between mt-2">
                            Payment - Advertisers
                        </h5>
                    </div>
                    <div class="card-body table-responsive table-overflow-hidden">
                        <table class="align-middle mb-0 table table-hover" id="publisher_datatables">
                            <thead>
                                <tr>
                                    <!-- <th></th> -->
                                    <th></th>
                                    <!-- <th>SL</th> -->
                                    <th width="20%">Company</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th width="15%">Balance</th>
                                    <th>Action</th>
                                    <th>History</th>
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
                                <button class="page-link" @click="getAdvertiser(currentPage - 1)" :disabled="currentPage === 1" >
                                  <i class="fa-solid fa-chevron-left"></i>
                                </button>
                              </li>

                              <!-- Page Numbers -->
                              <template v-for="page in paginationPages" :key="page">
                                <li class="paginate_button page-item" :class="{ active: page === currentPage }">
                                  <button class="page-link" @click="getAdvertiser(page)">
                                    {{ page }}
                                  </button>
                                </li>
                              </template>

                              <!-- Next Button -->
                              <li class="paginate_button page-item next" :class="{ disabled: currentPage === lastPage }">
                                <button  class="page-link" @click="getAdvertiser(currentPage + 1)" :disabled="currentPage === lastPage">
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
    </div>



    <!-- Large Modal -->
  <div class="modal fade" id="addPaymentModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <div class="d-flex align-items-center w-100 payment-type">
            <button type="button" id="deposit-button" :class="{ active: depositButtonActive }" @click="changePaymentType('deposit')" class="btn btn-outline deposit w-50 rounded-0 btn-md py-2" data-name="deposit">
                Due Amount
            </button>
            <button type="button" id="withdraw-button" :class="{ active: withdrawButtonActive }" @click="changePaymentType('withdraw')"  class="btn btn-outline withdraw w-50 rounded-0 py-2" data-name="withdraw">
                Paid Payment
            </button>
          </div>
          <button type="button"  class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-12">
                <div class="form-group">
                    <label for="user_name" class="required">User</label>
                    <select v-model="adverstiserDepositeData.user_name" id="user_name" class="form-select" required>
                        <option value="">Select Please</option>
                        <option v-for="user in advertisers.adverstisers" :value="user.id" :key="user.id">
                            {{ user.fname }} - {{ user.company_name }} - {{ user.email }}
                        </option>
                    </select>
                    <div v-if="validationErrors &&  validationErrors.user_name" class="text-danger">
                        {{ validationErrors.user_name[0] }}
                    </div>
                </div>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-md-6">
                <div class="form-group">
                    <label for="payment_date" class="required mb-1">Payment Date</label>
                    <input type="date" v-model="adverstiserDepositeData.payment_date" id="payment_date" class="form-control" required>
                    <div v-if="validationErrors &&  validationErrors.payment_date" class="text-danger">
                        {{ validationErrors.payment_date[0] }}
                    </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                    <label for="invoice_date" class="required mb-1">Invoice Date</label>
                    <input type="date" v-model="adverstiserDepositeData.invoice_date" id="invoice_date" class="form-control" required>
                    <div v-if="validationErrors &&  validationErrors.invoice_date" class="text-danger">
                        {{ validationErrors.invoice_date[0] }}
                    </div>
                </div>
              </div>
          </div>

          <div class="row mt-3">
            <div class="col-md-6">
                <div class="form-group">
                    <label for="date_range" class="required mb-1">Date Range</label>
                    <input type="date" v-model="adverstiserDepositeData.date_range" id="date_range" class="form-control" required>
                    <div v-if="validationErrors &&  validationErrors.date_range" class="text-danger">
                        {{ validationErrors.date_range[0] }}
                    </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                    <label for="offer" class="required mb-1">Offer</label>
                    <select v-model="adverstiserDepositeData.offer" id="offer" class="form-select">
                    <option value="">Select Offer</option>
                    <option v-for="(offer,index) in  advertisers.offers" :key="index" :value="offer.name">{{ offer.name }}</option>
                    </select>
                    <div v-if="validationErrors &&  validationErrors.offer" class="text-danger">
                        {{ validationErrors.offer[0] }}
                    </div>
                </div>
              </div>
          </div>

          <div class="row mt-3">
            <div class="col-md-6">
                <div class="form-group">
                    <label for="company_name" class="required mb-1">Company Name</label>
                    <input type="text" v-model="adverstiserDepositeData.company_name" id="company_name" class="form-control" required placeholder="Enter Company Name">
                    <div v-if="validationErrors &&  validationErrors.company_name" class="text-danger">
                        {{ validationErrors.company_name[0] }}
                    </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                    <label for="name" class="required mb-1">Name</label>
                    <input type="text" v-model="adverstiserDepositeData.name" id="name" class="form-control" required placeholder="Enter Name">
                    <div v-if="validationErrors &&  validationErrors.name" class="text-danger">
                        {{ validationErrors.name[0] }}
                    </div>
                </div>
              </div>
          </div>

          <div class="row mt-3">
            <div class="col-md-6">
                <div class="form-group">
                    <label for="calls" class="mb-1">Calls</label>
                    <input type="text" v-model="adverstiserDepositeData.calls" id="calls" class="form-control" placeholder="Enter Calls">
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                    <label for="amount" class="required mb-1">Amount</label>
                    <input type="number" v-model="adverstiserDepositeData.amount" id="amount" class="form-control" required placeholder="Enter Amount">
                    <div v-if="validationErrors &&  validationErrors.amount" class="text-danger">
                        {{ validationErrors.amount[0] }}
                    </div>
                </div>
              </div>
          </div>

          <div class="row mt-3">
            <div class="col-md-6">
                <div class="form-group">
                    <label for="note_for_admin" class="mb-1">Note for admin</label><br>
                    <textarea v-model="adverstiserDepositeData.note_for_admin" id="note_for_admin" cols="60" rows="3" class="form-control" placeholder="Enter Note For Admin"></textarea>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                    <label for="note_for_user" class="mb-1">Note for User</label><br>
                    <textarea v-model="adverstiserDepositeData.note_for_user" id="note_for_user" cols="60" rows="3" class="form-control" placeholder="Enter Note For User"></textarea>
                </div>
              </div>
          </div>

          <div class="row mt-3">
              <div class="col-md-6">
                <div class="form-group">
                    <label for="type" class="mb-1">Type</label>
                    <select v-model="adverstiserDepositeData.type" id="type" class="form-select">
                        <option value="">Select Type</option>
                        <option value="Postpaid">Post Paid</option>
                        <option value="Prepaid">Pre Paid</option>
                    </select>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                    <label for="payment_method" class="required mb-1">Payment Method</label>
                    <select v-model="adverstiserDepositeData.payment_method" id="payment_method" required class="form-select">
                        <option value="">Select Payment Method</option>
                        <option value="4">Payoneer</option>
                        <option value="1">Bank Transfer</option>
                        <option value="3">Other</option>
                    </select>
                    <div v-if="validationErrors &&  validationErrors.payment_method" class="text-danger">
                        {{ validationErrors.payment_method[0] }}
                    </div>
                </div>
              </div>
            </div>

          <div class="row mt-3">
              <div class="col-md-6">
                <div class="form-group">
                    <label for="status" class="required mb-1">Status</label>
                    <select v-model="adverstiserDepositeData.status" id="status" required class="form-select">
                        <option value="">Select Payment Status</option>
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
                    </select>
                    <div v-if="validationErrors &&  validationErrors.status" class="text-danger">
                        {{ validationErrors.status[0] }}
                    </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group note-textarea mt-3">
                    <label for="note" class="mb-1">Payment Method Note (optional)</label><br>
                    <textarea v-model="adverstiserDepositeData.note" id="note" cols="30" rows="3" placeholder="Send a note...." class="form-control"></textarea>
                </div>
              </div>
            </div>


        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">
            Close
          </button>
          <button  @click="AddedDepositeValue()" type="button" class="btn btn-primary"><i class="fas fa-check fa-sm me-2"></i> Confirm</button>
        </div>
      </div>
    </div>
  </div>
    <!-- Content wrapper -->
</template>
<script>
import axios from "axios";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import Swal from "sweetalert2";
import Loader from "../../../../../include/loader.vue";
import Breadcrumb from "../../../../../include/breadcrumb.vue";
import { inject } from "vue";
import { fetchUserRole } from "@/services/userService";

export default{
  setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
props: ['advertisers'],
components: {
    Loader,
    Breadcrumb,
},
data: () => {
  return {
    showModal: false,
    getLoader: false,
    breadcrumbs: [
        { label: "Dashboard", url: "/dashboard" },
        { label: "Advertisers Payment Info", url: "" },
    ],
    depositButtonActive: true,
    withdrawButtonActive: false,
    adverstiserDepositeData : {
        payment_name : "deposit",
        update_data : "update_data",
        user_name : "",
        payment_date : "",
        invoice_date : "",
        date_range : "",
        offer : "",
        company_name : "",
        name : "",
        calls : "",
        amount : "",
        type : "",
        note_for_user : "",
        note_for_admin : "",
        payment_method : "",
        status : "",
        note : "",
    },
    bulkactionids : {
      selectedIds: [],
      role_id: 2,
    },
    validationErrors: null,
    currentPage: 1,
    lastPage: 1,
    recordsTotal : 0,
    startPage : 0,
    endPage : 0,
    searchInputValue : "",
}
},
async mounted() { 
  try {
    const { role, isAuthorized } = await fetchUserRole();
    if (role == 'Super' || role == 'Admin') {
      this.getLoader = true;
      this.getAdvertiser();
      this.$nextTick(() => {
        const dataTableWrapper = document.querySelectorAll('#publisher_datatables_wrapper .row.mx-2');
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
    getAdvertiser(page = 1, perPage = 10,searchValue = '') {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl+"admin/payments/advertiser/get-data", {
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

          if ($.fn.DataTable.isDataTable("#publisher_datatables")) {
            $('#publisher_datatables').DataTable().destroy();
          }
        var table = $('#publisher_datatables').DataTable({
          data: data,
          columns: [
            // { data: 'id' },
            { data: 'id' },
            // { data: 'id' },
          {
              data: "company_name",
              render: function (data, type, row) {
                if (row.company_name != null) {
                  return row.company_name.length > 30 
                    ? row.company_name.slice(0, 30) + '...'  
                    : row.company_name; 
                }
                return '----------';
              },
            },
            {
              data: "fname",
              render: function (data, type, row) {
                if (row.fname != null) {
                  return row.fname.length > 8 
                    ? row.fname.slice(0, 8) + '...'  
                    : row.fname; 
                }
                return '----------';
              },
            },
            { data: 'email' },
            { data: 'convart_phone' },
            { data: 'total_balance' },
            {
                data: "created_at",
                render: function (data, type, row) {
                  return (
                    '<div class="publisher-payment-action"><button data-bs-toggle="modal" data-bs-target="#addPaymentModal" data-id=' +
                    row.id +
                    ' class="rounded-circle bg-transparent border-0 text-primary" title="Add Payment"><i class="fas fa-money-bill" data-id=' +
                    row.id +
                    "></i></button></div>"
                  );
                },
              },
              {
                data: "updated_at",
                render: function (data, type, row) {
                  return (
                    '<div class="publisher-details-action"><button data-id=' +
                    row.id +
                    ' class="rounded-circle bg-transparent border-0 text-primary" title="Payment History"><i class="fas fa-shopping-basket action-icon" data-id=' +
                    row.id +
                    "></i></button></div>"
                  );
                },
              },
          ],
          initComplete: () => { 
            this.attachEventListenersForMenu();
            this.attachEventListenersForSearch();

            const searchInput = $("#publisher_datatables_filter input");
            searchInput.val(this.searchInputValue);
            if(this.searchInputValue != ''){
                searchInput.focus();
            }

            searchInput.off().on("keyup", (e) => {
              const searchTerm = e.target.value;
              this.searchInputValue = searchTerm;
              this.getAdvertiser(1, perPage, searchTerm);
            });
            
            this.addEventListenerDeposite();
            this.addEventListenerPublissher();

            this.attachEventListenersBlulkAction();
            this.attachEventListenersBlulkActionSubmit();

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
            searchPlaceholder: 'Search Advertisher',
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
            {
              text: '<span id="create"><i class="ti ti-plus me-1 ti-xs"></i>Add Payment</span>',
              className: 'create-new btn btn-primary',
              attr: {
                id: 'create',
                'data-bs-toggle': 'modal',
                'data-bs-target': '#addPaymentModal'
              }
            }
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
    attachEventListenersBlulkAction() {
      $('#publisher_datatables').on('change', '.row-checkbox', (event) => {
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
      $('#publisher_datatables thead').on('change', 'input[type="checkbox"]', (event) => {
        const isChecked = event.target.checked;
        $('#publisher_datatables tbody .row-checkbox').each((index, checkbox) => {
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
                this.globalVariables.apiUrl + "admin/payments/commont/bulk/delete",
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
                  this.getPublishers();
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
    // Added Deposit Value 
    AddedDepositeValue(){
      this.getLoader = true;
      axios
      .post(this.globalVariables.apiUrl+"admin/payment/advertiser/deposit/user-select", this.adverstiserDepositeData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {  
        console.log(res.data);
        if(res.data.status == 'success'){
          toastr.success(res.data.message);
          this.$router.push('/admin-manage-advertiser-pay-details/'+this.adverstiserDepositeData.user_name);
        }else if(res.data.status == 'error'){
            toastr.error(res.data.message);
        }else if(res.data.status == 'warning'){
          this.showModal = false;
          toastr.warning(res.data.message);
        }else{
            this.validationErrors = res.data.errors;
        }
      })
      .catch((e) => {
        return e;
      })
      .finally(() => {
        this.getLoader = false;
      });
    },
    addEventListenerDeposite() {
      $("#publisher_datatables").on("click", ".publisher-payment-action", (event) => {
        const target = $(event.target);
        const dataId = target.data("id");
        this.adverstiserDepositeData.user_name = dataId;
        this.showModal = true;
      });
    },
    addEventListenerPublissher() {
      $("#publisher_datatables").on("click", ".publisher-details-action", (event) => {
        const target = $(event.target);
        const dataId = target.data("id");
        this.paymentsDtails(dataId);
      });
    },

    attachEventListenersForMenu() {
      $("#publisher_datatables_wrapper [name='publisher_datatables_length']").on("change", (event) => {
        this.getLoader = true;
        const target = $(event.target);
        const getSelectedValue = target.val();
        this.getAdvertiser(1,getSelectedValue);
      });
    },
    attachEventListenersForSearch() {
      $("#publisher_datatables_wrapper #publisher_datatables_filter input").on("keyup", (event) => {
        const target = $(event.target);
        const getSearchValue = target.val();
        this.getAdvertiser(1,10,getSearchValue);
      });
    },
    //Payment Detailse View
    paymentsDtails(id) {
    this.getLoader = true;  
      axios
        .get(this.globalVariables.apiUrl+"admin/payment/history/" + id, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          if (res.data.status == "error") {
            toastr.error(res.data.message);
          } else {
            window.open("/admin-manage-advertiser-pay-details/" + id, "_blank");
          }
        })
        .catch((e) => {
          return e;
        })
        .finally(() => {
            this.getLoader = false;  
        });
    },
    changePaymentType(type) {
      if (type === "withdraw") {
        this.depositButtonActive = false;
        this.withdrawButtonActive = true;
        this.adverstiserDepositeData.payment_name = "withdraw";
      } else {
        this.depositButtonActive = true;
        this.withdrawButtonActive = false;
        this.adverstiserDepositeData.payment_name = "deposit";
      }
    },
},
};
</script>

<style>
#publisher_datatables colgroup:nth-of-type(2) {
	display: none !important;
}
#publisher_datatables .dt-checkboxes-cell{
	padding: 0.7rem 0.5rem !important;
}
.country-flag {
	width: 15%;
}
</style>



