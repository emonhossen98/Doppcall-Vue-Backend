<template>
  <div v-if="getLoader">
    <Loader></Loader>
  </div>
  <!-- Content wrapper -->
  <div class="content-wrapper">
    <!-- {{ publishers }} -->
    <!-- Content -->
    <div class="container-fluid flex-grow-1 container-p-y">
      <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
      <div class="row mt-4">
        <div class="col-12">
          <div class="card">
            <div class="card-header pt-3 pb-1">
              <h5 class="card-title d-flex align-items-center justify-content-between mb-0 mt-2">
                Payment - Publishers
              </h5>
            </div>
            <div class="card-body table-responsive table-overflow-hidden">
              <table class="align-middle mb-0 table table-hover" id="publisher_datatables">
                <thead>
                  <!-- <th></th> -->
                  <th></th>
                  <!-- <th>SL</th> -->
                  <th width="20%">Company</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th width="15%">Balance</th>
                  <th  id="action-incompleted">Action</th>
                  <th  id="action-incompleted">History</th>
                </thead>
                <tbody></tbody>
              </table>
              <div class="row justify-content-between align-items-center">
                <div class="col-md-3">
                  Showing {{ startPage }} to {{ endPage }} of {{ recordsTotal }} entries
                </div>
                <div class="pagination-controls col-md-9 d-flex justify-content-end align-items-center ">
                  <ul class="pagination mb-0">
                    <!-- Previous Button -->
                    <li class="paginate_button page-item previous" :class="{ disabled: currentPage === 1 }">
                      <button class="page-link" @click="getPublishers(currentPage - 1)" :disabled="currentPage === 1" >
                        <i class="fa-solid fa-chevron-left"></i>
                      </button>
                    </li>

                    <!-- Page Numbers -->
                    <template v-for="page in paginationPages" :key="page">
                      <li class="paginate_button page-item" :class="{ active: page === currentPage }">
                        <button class="page-link" @click="getPublishers(page)">
                          {{ page }}
                        </button>
                      </li>
                    </template>

                    <!-- Next Button -->
                    <li class="paginate_button page-item next" :class="{ disabled: currentPage === lastPage }">
                      <button  class="page-link" @click="getPublishers(currentPage + 1)" :disabled="currentPage === lastPage">
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
            <button type="button" id="deposit-button" :class="{ depositactive: depositButtonActive }" @click="changePaymentType('deposit')" class="btn btn-outline deposit w-50 rounded-0 btn-md py-2" data-name="deposit">
              Add Balance
            </button>
            <button type="button" id="withdraw-button" :class="{ withdrawactive: withdrawButtonActive }" @click="changePaymentType('withdraw')"  class="btn btn-outline withdraw w-50 rounded-0 py-2" data-name="withdraw">
              Withdraw
            </button>
          </div>
          <button type="button"  class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="form-group">
              <label for="user_name" class="required mb-1">User</label>
              <select v-model="publiserDepositeData.user_name" id="user_name" class="select2 form-select" required>
                <option value="">Select Please</option>
                <option  v-for="user in publishers.publisher" :value="user.id" :key="user.id">
                  {{ user.fname }} - {{ user.company_name }} - {{ user.email }}
                </option>
              </select>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-md-6">
                <div class="form-group">
                  <label for="payment_date" class="required mb-1">Payment Date</label>
                  <input  type="date"  v-model="publiserDepositeData.payment_date" id="payment_date" class="form-control" required />
                  <div v-if="validationErrors && validationErrors.payment_date" class="text-danger">
                      {{ validationErrors.payment_date[0] }}
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="date_range" class="required mb-1">Date Range</label>
                  <input type="text" v-model="publiserDepositeData.date_range" id="date_range" class="form-control" required placeholder="Enter Date Range"/>
                  <div v-if="validationErrors &&  validationErrors.date_range" class="text-danger">
                      {{ validationErrors.date_range[0] }}
                  </div>
                </div>
              </div>
          </div>

          <div class="row mt-3">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="" class="mb-1">Upload File</label>
                  <input  type="file" @change="handleImageUpload" class="form-control"/>
                </div>
              </div>
          </div>

          <div class="row mt-3">
            <div class="col-md-6">
                <div class="form-group">
                  <label for="calls" class="mb-1">Total Billable Calls</label>
                  <input type="text" v-model="publiserDepositeData.calls" id="calls" class="form-control" required placeholder="Enter Total Billable Calls"/>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="amount" class="required mb-1">Amount</label>
                  <input  type="number" v-model="publiserDepositeData.amount" required id="amount" class="form-control" placeholder="Enter Amount">
                  <div v-if="validationErrors &&  validationErrors.amount" class="text-danger">
                      {{ validationErrors.amount[0] }}
                  </div>
                </div>
              </div>
          </div>

          <div class="row mt-3">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="note_for_admin" class="mb-1">Note for admin</label><br />
                  <textarea  v-model="publiserDepositeData.note_for_admin" id="note_for_admin" cols="60" rows="3" class="form-control" placeholder="Enter Admin Note"></textarea>
                </div>
              </div>
          </div>

          <div class="row mt-3">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="payment_method" class="required mb-1">Payment Method</label>
                  <select v-model="publiserDepositeData.payment_method" id="payment_method" required class="form-select">
                    <option value="">Select Payment Method</option>
                    <option value="4">Payoneer</option>
                    <option value="1">Bank Transfer</option>
                    <option value="3">Other</option>
                  </select>
                  <div v-if="validationErrors && validationErrors.payment_method" class="text-danger">
                      {{ validationErrors.payment_method[0] }}
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="status" class="required mb-1">Status</label>
                  <select v-model="publiserDepositeData.status" id="status" required class="form-select">
                    <option value="">Select Payment Status</option>
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                  </select>
                  <div v-if="validationErrors &&  validationErrors.status" class="text-danger">
                      {{ validationErrors.status[0] }}
                  </div>
                </div>
              </div>
            </div>

            <div class="form-group note-textarea mt-3">
              <label for="note" class="mb-1">Payment Method Note (optional)</label><br />
              <textarea  v-model="publiserDepositeData.note"  id="note" cols="30" rows="3" placeholder="Send a note...."  class="form-control" ></textarea>
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

export default {
  setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
  props: ["publishers"],
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
        { label: "Publishers Payment Info", url: "" },
      ],
      depositButtonActive: true,
      withdrawButtonActive: false,
      publiserDepositeData: {
        payment_name: "deposit",
        user_id: "select-user-payment",
        update_data: "update_data",
        user_name: "",
        payment_date: "",
        date_range: "",
        calls: "",
        amount: "",
        note_for_admin: "",
        payment_method: "",
        status: "",
        note: "",
        upload_file: "",
      },
      bulkactionids : {
        selectedIds: [],
        role_id: 3,
      },
      validationErrors: null,
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
        this.getLoader = true;
        this.getPublishers();
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
    document.addEventListener('click', (e) => {
      const target = e.target.closest('a[data-vue-route]');
      if (target) {
        e.preventDefault();
        const route = target.getAttribute('href');
        this.$router.push(route);
      }
    }, true);
  },
  // watch: {
  //   'publishers.publisher'(newVal) {
  //     this.$nextTick(() => {
  //       this.initializeSelect2();
  //       $('#user_name').val(this.publiserDepositeData.user_name).trigger('change');
  //     });
  //   }
  // },
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
    handleImageUpload(event) {
      this.publiserDepositeData.upload_file = event.target.files[0];
    },
    getPublishers(page = 1, perPage = 10,searchValue = '') {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl+"admin/payments/publisher/get-data", {
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
            // { data: 'id' },
            { data: 'id' },
            {
                data: "company_name",
                render: function (data, type, row) {
                  if (row.company_name != null) {
                    return row.company_name.length > 10 
                      ? '<span title="'+row.company_name+'">'+row.company_name.slice(0, 10) + '...'+'</span>'  
                      : '<span title="'+row.company_name+'">'+row.company_name+'</span>'; 
                  }
                  return '----------';
                },
              },
            { 
              data: 'fname',
              render: function (data, type, row) {
                if (row?.fname != null) {
                  return '<span title="'+row?.fname+'">'+row?.fname+'</span>';
                }
                return '----------';
              },
             },
            { 
              data: 'email',
              render: function (data, type, row) {
                if (row?.email != null) {
                  return '<span title="'+row?.email+'">'+row?.email+'</span>';
                }
                return '----------';
              },
             },
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
          initComplete: () => { // Using an arrow function here
            this.addEventListenerDeposite();
            this.addEventListenerPublissher();
            this.attachEventListenersOfButton();

            this.attachEventListenersForMenu();
            this.attachEventListenersForSearch();

            this.attachEventListenersBlulkAction();
            this.attachEventListenersBlulkActionSubmit();

            const searchInput = $("#publisher_datatables_filter input");
            searchInput.val(this.searchInputValue);
            if(this.searchInputValue != ''){
                searchInput.focus();
            }

            searchInput.off().on("keyup", (e) => {
              const searchTerm = e.target.value;
              this.searchInputValue = searchTerm;
              this.getPublishers(1, perPage, searchTerm);
            });
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
            searchPlaceholder: 'Search Publisher',
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
        .catch((error) => {
          return error;
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    attachEventListenersOfButton() {
      $("#publisher_datatables_wrapper").on("click", "button", (event) => {
        const target = $(event.target);
        const dataClass = target.attr("id");
        if (dataClass === "create") {
          this.$nextTick(() => {
            this.initializeSelect2();
          });
          this.showModal = true;
        } 
      });
    },
    
    attachEventListenersForMenu() {
      $("#publisher_datatables_wrapper [name='publisher_datatables_length']").on("change", (event) => {
        this.getLoader = true;
        const target = $(event.target);
        const getSelectedValue = target.val();
        this.getPublishers(1,getSelectedValue);
      });
    },

    attachEventListenersForSearch() {
      $("#publisher_datatables_wrapper #publisher_datatables_filter input").on("keyup", (event) => {
        const target = $(event.target);
        const getSearchValue = target.val();
        this.getPublishers(1,10,getSearchValue);
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
      .post(this.globalVariables.apiUrl+"admin/payment/publisher/deposit/user-select", this.publiserDepositeData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        },
      })
      .then((res) => {  
        if(res.data.status == 'success'){
          toastr.success(res.data.message);
          const modal = document.getElementById("addPaymentModal");
          const bootstrapModal = bootstrap.Modal.getInstance(modal);
          if (bootstrapModal) {
            bootstrapModal.hide();
          }
          this.$router.push('/admin-manage-publishers-pay-details/'+this.publiserDepositeData.user_name);
        }else if (res.data.status == 'error'){
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
        this.publiserDepositeData.user_name = dataId;
        this.showModal = true;
        this.$nextTick(() => {
          this.initializeSelect2();
          setTimeout(() => {
            $('#user_name').val(dataId).trigger('change');
          }, 50);
        });
      });
    },

    addEventListenerPublissher() {
      $("#publisher_datatables").on("click", ".publisher-details-action", (event) => {
        const target = $(event.target);
        const dataId = target.data("id");
        this.paymentsDtails(dataId);
      });
    },

    initializeSelect2(){
      $('#user_name').select2({
        width: '100%', 
        dropdownParent: $('#addPaymentModal')
      }).on('change', (e) => {
          this.publiserDepositeData.user_name = $(e.target).val();
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
            console.log(res.data);
            toastr.error(res.data.message);
          } else {
            window.open("/admin-manage-publishers-pay-details/" + id, "_blank");
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
        this.publiserDepositeData.payment_name = "withdraw";
      } else {
        this.depositButtonActive = true;
        this.withdrawButtonActive = false;
        this.publiserDepositeData.payment_name = "deposit";
      }
    },
  },
};
</script>
<style>
#addPaymentModal .select2-container .select2-selection--single {
	height: 40px !important;
}
#addPaymentModal .select2-container--default .select2-selection--single .select2-selection__rendered {
	line-height: 39px !important;
}
#addPaymentModal .select2-container--default .select2-selection--single .select2-selection__arrow b {
	margin-top: 4px !important;
}
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
<style scoped>
.modal-dialog.modal-xl {
  /* height: 150vh; */
  margin-top: 6rem;
  margin-bottom: 4rem;
  z-index: 9999;
}
.border.border-danger.text-danger.p-1.rounded {
	white-space: nowrap !important;
}
#addPaymentModal .depositactive, #addPaymentModal .withdrawactive{
	background: #685dd8;
	color: white;
}
</style>
