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
        <div class="col-md-12">
          <div class="card  mt-4">
            <div  class="card-header py-2">
              <h5 class="card-title d-flex align-items-center mb-0 payment_info_title mt-2">Publisher Payment Info</h5>
            </div>
            <div class="card-body table-responsive table-overflow-hidden">
              <table class="align-middle mb-0 table table-hover" id="payment_infos_table">
                <thead>
                  <tr>
                    <!-- <th></th> -->
                    <th></th>
                    <th>Sl</th>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Company</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th style="width: 5%">Action</th>
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
                      <button class="page-link" @click="getPublisherPaymentInfo(currentPage - 1)" :disabled="currentPage === 1" >
                        <i class="fa-solid fa-chevron-left"></i>
                      </button>
                    </li>

                    <!-- Page Numbers -->
                    <template v-for="page in paginationPages" :key="page">
                      <li class="paginate_button page-item" :class="{ active: page === currentPage }">
                        <button class="page-link" @click="getPublisherPaymentInfo(page)">
                          {{ page }}
                        </button>
                      </li>
                    </template>

                    <!-- Next Button -->
                    <li class="paginate_button page-item next" :class="{ disabled: currentPage === lastPage }">
                      <button  class="page-link" @click="getPublisherPaymentInfo(currentPage + 1)" :disabled="currentPage === lastPage">
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
    


  <!-- Large Modal -->
  <div class="modal fade" id="showPaymentInfo" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="showPaymentInfoLabel">Payment Setting Informations</h5>
          <button type="button"  class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="card card-body border-0 p-0">
              <table class="table table-sm table-hover table-bordered">
                <tr class="py-3 px-2">
                      <td class="font-weight-bold">Account Holder Name :</td>
                      <td id="account_holder_name_show"></td>
                  </tr>
                  <tr>
                      <td class="font-weight-bold">Phone Number :</td>
                      <td id="phone_number_show"></td>
                  </tr>
                  <tr>
                      <td class="font-weight-bold">Email :</td>
                      <td id="email_address_show"></td>
                  </tr>
                  <tr>
                      <td class="font-weight-bold">Payment Type :</td>
                      <td id="payment_type_show"></td>
                  </tr>
                  <tr>
                      <td class="font-weight-bold">Bank Location :</td>
                      <td id="bank_location_show"></td>
                  </tr>
                  <tr>
                      <td class="font-weight-bold">Bank Account Type :</td>
                      <td id="bank_account_type_show"></td>
                  </tr>
                  <tr>
                      <td class="font-weight-bold">Bank Name :</td>
                      <td id="bank_name_show"></td>
                  </tr>
                  <tr>
                      <td class="font-weight-bold">Account Number :</td>
                      <td id="account_number_show"></td>
                  </tr>
                  <tr>
                      <td class="font-weight-bold">Routing Number :</td>
                      <td id="routing_number_show"></td>
                  </tr>
                  <tr>
                      <td class="font-weight-bold">Branch Number :</td>
                      <td id="branch_number_show"></td>
                  </tr>
                  <tr>
                      <td class="font-weight-bold">IBAN Code :</td>
                      <td id="iban_code_show"></td>
                  </tr>
                  <tr>
                      <td class="font-weight-bold">SWIFT/BIC Code :</td>
                      <td id="swift_bic_code_show"></td>
                  </tr>
                  <tr>
                      <td class="font-weight-bold">IFSC Code :</td>
                      <td id="ifsc_code_show"></td>
                  </tr>
                  <tr>
                      <td class="font-weight-bold">Account Type :</td>
                      <td id="account_type_show"></td>
                  </tr>
                  <tr>
                      <td class="font-weight-bold">Address :</td>
                      <td id="address_show"></td>
                  </tr>
                  <tr>
                      <td class="font-weight-bold">City :</td>
                      <td id="city_show"></td>
                  </tr>
                  <tr>
                      <td class="font-weight-bold">State :</td>
                      <td id="state_show"></td>
                  </tr>
                  <tr>
                      <td class="font-weight-bold">Zip Code :</td>
                      <td id="zip_code_show"></td>
                  </tr>
                  <tr>
                      <td class="font-weight-bold">Country :</td>
                      <td id="country_show"></td>
                  </tr>
              </table>
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
import Loader from '../../../../../include/loader.vue';
import Breadcrumb from '../../../../../include/breadcrumb.vue';
import { inject } from "vue";
import { fetchUserRole } from "@/services/userService";


export default {
  setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
  props: ["OfferIndex"],
  components:{
    Loader,
    Breadcrumb,
  },
  data() {
    return {
      allOfffers : {},
      showFilter : false,
      breadcrumbs: [
        { label: "Dashboard", url: "/dashboard" },
        { label: "Publisher Payment Info ", url: "" },
      ],
      getLoader: false,

      changeStatus : {
        data : "",
        status : "",
      },
      bulkactionids : {
        selectedIds: [],
        status: "",
      },
      paymentViewData : {
        id : "",
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
      this.getPublisherPaymentInfo();
      this.$nextTick(() => {
        const dataTableWrapper = document.querySelectorAll('#payment_infos_table_wrapper .row.mx-2');
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
    getPublisherPaymentInfo(page = 1, perPage = 10,searchValue = '') {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl+"admin/payment/system/publisher/get-data", {
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
          if ($.fn.DataTable.isDataTable("#payment_infos_table")) {
            $('#payment_infos_table').DataTable().destroy();
          }
          
        var table = $('#payment_infos_table').DataTable({
          data: data,
          columns: [
            // { data: 'id' },
            { data: 'id' },
            { data: 'id' },
            { data: 'id' },
            { data: 'fname' },
            { data: 'lname' },
            { data: 'email' },
            { data: 'company_name' },
            { data: 'convart_payment_type' },
            { data: 'convart_status' },
            { data: 'convart_action' },
          ],
          initComplete: () => {
            this.attachEventListeners();
            this.attachEventListenersOfButton()

            this.attachEventListenersForMenu();
            this.attachEventListenersForSearch();

            this.attachEventListenersBlulkAction();
            this.attachEventListenersBlulkActionSubmit();


            const searchInput = $("#payment_infos_table_filter input");
            searchInput.val(this.searchInputValue);
            if(this.searchInputValue != ''){
                searchInput.focus();
            }

            searchInput.off().on("keyup", (e) => {
              const searchTerm = e.target.value;
              this.searchInputValue = searchTerm;
              this.getPublisherPaymentInfo(1, perPage, searchTerm);
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
            searchPlaceholder: 'Search Payment Info',
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
                  <option value="0">Bulk Pending</option>
                  <option value="1">Bulk Active</option>
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
                  exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8] }
                },
                {
                  extend: 'csv',
                  text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                  className: 'dropdown-item',
                  exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8] }
                },
                {
                  extend: 'excel',
                  text: '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                  className: 'dropdown-item',
                  exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8] }
                },
                {
                  extend: 'pdf',
                  text: '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                  className: 'dropdown-item',
                  exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8] }
                },
                {
                  extend: 'copy',
                  text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                  className: 'dropdown-item',
                  exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8] }
                }
              ]
            },
            {
              text: '<span id="create"><i class="ti ti-plus me-1 ti-xs"></i>Add Info</span>',
              className: 'create-new btn btn-primary',
              attr: { id: 'create' },
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

    attachEventListenersForMenu() {
      $("#payment_infos_table_wrapper [name='payment_infos_table_length']").on("change", (event) => {
        this.getLoader = true;
        const target = $(event.target);
        const getSelectedValue = target.val();
        this.getPublisherPaymentInfo(1,getSelectedValue);
      });
    },

    attachEventListenersForSearch() {
      $("#payment_infos_table_wrapper #payment_infos_table_filter input").on("keyup", (event) => {
        const target = $(event.target);
        const getSearchValue = target.val();
        this.getPublisherPaymentInfo(page = 1,10,getSearchValue);
      });
    },

    attachEventListenersBlulkAction() {
      $('#payment_infos_table').on('change', '.row-checkbox', (event) => {
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
      $('#payment_infos_table thead').on('change', 'input[type="checkbox"]', (event) => {
        const isChecked = event.target.checked;
        $('#payment_infos_table tbody .row-checkbox').each((index, checkbox) => {
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
          }else{
            this.bulkactionids.status = '0';
            const alertTitle = "Offer Want to Pending";
            this.bulkStatusChange(alertTitle);
          }
        }
        $('#bulk-action-select').val('');
      });
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
                this.globalVariables.apiUrl + "admin/offers/bulk/delete",
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
                  this.getOfferData();
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
                this.globalVariables.apiUrl + "admin/offers/status/bulk",
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
                  this.getOfferData();
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

    toggleBulkActionVisibility() {
      const bulkActionWrapper = $('#bulk-action-container');
      const bulkActionWrapperSecond = $('#bulk-action-container-second');
      if (this.bulkactionids.selectedIds.length > 0) {
        bulkActionWrapper?.removeClass('d-none');
      } else {
        bulkActionWrapper?.addClass('d-none');
      }

      if (this.bulkactionids.selectedIds.length > 0) {
        bulkActionWrapperSecond?.removeClass('d-none');
      } else {
        bulkActionWrapperSecond?.addClass('d-none');
      }
    },

    attachEventListeners() {
      $('#payment_infos_table').on('click', '.payment-system-action', (event) => {
        const target = $(event.target);
        const dataId = target.data('id');
        const dataClass = target.data('action');
        if (dataClass === 'approve_btn') {
          this.changeStatus.data = dataId;
          this.changeStatus.status = 'approved';
          const alertTitle = 'Want to Aproved?';
          this.ActionMethod(alertTitle);

        }else if(dataClass === 'pending_btn'){
          this.changeStatus.data = dataId;
          this.changeStatus.status = 'pending';
          const alertTitle = 'Want to Pending?';
          this.ActionMethod(alertTitle);
          
        }else if(dataClass === 'payment-view'){
          this.getLoader = true;
          this.paymentViewData.id = dataId;
          axios
            .post(this.globalVariables.apiUrl+"admin/payment/system/user/view", this.paymentViewData, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((res) => {
              document.querySelector('#account_holder_name_show').innerHTML = res.data.account_holder_name ?? '';
              document.querySelector('#phone_number_show').innerHTML = res.data.phone_number ?? '';
              document.querySelector('#email_address_show').innerHTML = res.data.email_address ?? '';
              if(res.data.payment_type == 1){
                document.querySelector('#payment_type_show').innerHTML = 'Payoneer';
              }else{
                document.querySelector('#payment_type_show').innerHTML = 'Bank Draft'
              }
              document.querySelector('#bank_location_show').innerHTML = res.data.bank_location ?? '';
              document.querySelector('#bank_account_type_show').innerHTML = res.data.bank_account_type ?? '';
              document.querySelector('#bank_name_show').innerHTML = res.data.bank_name ?? '';
              document.querySelector('#account_number_show').innerHTML = res.data.account_number ?? '';
              document.querySelector('#routing_number_show').innerHTML = res.data.routing_number ?? '';
              document.querySelector('#branch_number_show').innerHTML = res.data.branch_number ?? '';
              document.querySelector('#iban_code_show').innerHTML = res.data.iban_code ?? '';
              document.querySelector('#swift_bic_code_show').innerHTML = res.data.swift_bic_code ?? '';
              document.querySelector('#ifsc_code_show').innerHTML = res.data.ifsc_code ?? '';
              document.querySelector('#account_type_show').innerHTML = res.data.account_type ?? '';
              document.querySelector('#address_show').innerHTML = res.data.address ?? '';
              document.querySelector('#city_show').innerHTML = res.data.city ?? '';
              document.querySelector('#state_show').innerHTML = res.data.state ?? '';
              document.querySelector('#zip_code_show').innerHTML = res.data.zip_code ?? '';
              document.querySelector('#country_show').innerHTML = res.data.country ?? '';
              
            })
            .catch((e) => {
              return e;
            })
            .finally(()=> {
              this.getLoader = false;
            });
        } else if(dataClass === 'add-info'){
          this.$router.push('/admin-payment-system-single/'+dataId)
        }
      });
    },

    attachEventListenersOfButton(){
      $("#payment_infos_table_wrapper").on("click", "button", (event) => {
        const target = $(event.target);
        const dataClass = target.attr("id");
        if (dataClass === "create") {
          this.$router.push("/admin-payment-system-publisher-create");
        } 
      });
    },

    ActionMethod(alertTitle){
      Swal.fire({
        text: alertTitle,
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.value) {
          this.getLoader = true,
          axios
            .post(this.globalVariables.apiUrl+"admin/payment/system/user/status", this.changeStatus, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((res) => {
              if(res.data.status == 'success'){
                toastr.success(res.data.message);
                this.getPublisherPaymentInfo();
              }else{
                toastr.error('User Not Found!');
              }
            })
            .catch((error) => {
              if(error != null){
                toastr.error('User Not Found!');
              }
            })
            .finally(()=> {
              this.getLoader = false;
            });
        } 
      });
    },
  },
}
</script>

<style>
#payment_infos_table .dropdown-item{
	display: flex !important;
	align-items: center !important;
}
#payment_infos_table colgroup:nth-of-type(2) {
	display: none !important;
}
#payment_infos_table .dt-checkboxes-cell{
	padding: 0.7rem 0.5rem !important;
}
#dropdownMenuButton {
	background: transparent;
}
#payment_infos_table td {
  white-space: nowrap; /* Prevents wrapping */
  overflow: hidden; /* Hides overflow */
  text-overflow: ellipsis; /* Adds "..." for overflow */
  max-width: 100px; /* Set max width for cell */
}
</style>
<style scoped>
.modal-dialog {
	width: 60% !important;
}
.modal.is-active {
	padding-top: 18rem;
}
.font-weight-bold {
  font-weight: 700;
}
#showPaymentInfo table td {
  padding : 10px 25px !important;
}

#payment_infos_table th {
  max-width: 100px !important; /* Set max width for cell */
}

</style> 
