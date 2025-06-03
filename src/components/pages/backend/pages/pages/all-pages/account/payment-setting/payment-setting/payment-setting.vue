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
                      <th>Payment Type</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Status</th>
                      <th style="width: 5%">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    					
  
                  </tbody>
                </table> 
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
  import Loader from '../../../../../../include/loader.vue';
  import Breadcrumb from '../../../../../../include/breadcrumb.vue';
  import { inject } from "vue";
  import { fetchUserRoleAccountmanager } from "@/services/userServiceAccountmanager";
  
  
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
          { label: "Dashboard", url: "/account/dashboard" },
          { label: "Publisher Payment Info ", url: "" },
        ],
        getLoader: false,
        paymentViewData : {
          id : "",
        },
      };
    },
    async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRoleAccountmanager();
        if (role == 'Account manager') {
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
    methods: {
      getPublisherPaymentInfo() {
        this.getLoader = true;
        axios
          .get(this.globalVariables.apiUrl+"account-manager/payment/system/user/get-data", {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          })
          .then((res) => {
            if ($.fn.DataTable.isDataTable("#payment_infos_table")) {
            $('#payment_infos_table').DataTable().destroy();
          }
          var table = $('#payment_infos_table').DataTable({
            data: res.data,
            columns: [
              { data: 'id' },
              {
                data: "payment_type",
                render: function (data, type, row) {
                    if(row.payment_type == 1){
                        return 'Payoneer';
                    }else{
                        return 'Bank Draft';
                    }
                },
              },
             
              {
                data: "user.fname",
                render: function (data, type, row) {
                  if (row.user.fname != null) {
                    return row.user.fname.length > 15 
                      ? row.user.fname.slice(0, 15) + '...'  
                      : row.user.fname; 
                  }
                  return '----------';
                },
              },
              {
                data: "user.lname",
                render: function (data, type, row) {
                  if (row.user.lname != null) {
                    return row.user.lname.length > 15 
                      ? row.user.lname.slice(0, 15) + '...'  
                      : row.user.lname; 
                  }
                  return '----------';
                },
              },
              {
                data: "user.status",
                render: function (data, type, row) {
                    if (row.status == 0) {
                        return '<span class="badge badge-sm bg-success">Approved</span>';
                    }
                    else {
                        return '<span class="badge badge-sm bg-danger">Pending</span>';
                    }
                },
              },
              {
                data: "user.status",
                render: function (data, type, row) {
                    return '<button type="button" class="dropdown-item payment-view" id="payment_show_btn" data-id="'+row.id+'" data-bs-toggle="modal" data-bs-target="#showPaymentInfo"><i id="payment_show_btn" data-id="'+row.id+'" class="fa-regular fa-eye me-1 text-success"></i></button>';
                },
              },
            ],
            initComplete: () => {
                const table = $("#payment_infos_table").DataTable();
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
              this.attachEventListeners();
            },
            createdRow: function (row, data, dataIndex) {
                $('td:eq(0)', row).html(dataIndex + 1);
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
            order: [[2, 'desc']],
            dom: '<"row mx-2"' +
              '<"col-md-4 px-0"f>' + 
              '<"col-md-8 dopp_tb d-flex justify-content-end align-items-center"l<"button-wrapper"B>>' + 
              '<"col-md-3 d-none"p>>' +
              't' + 
              '<"row mx-2"' +
              '<"col-md-5"i>' + 
              '<"col-md-7"p>>', 
            displayLength: 10, 
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
                  className: "btn btn-primary",
                  text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><li><a class="dropdown-item" href="#" data-column="all">All</a></li><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">Payment Type</a></li><li><a class="dropdown-item" href="#" data-column="2">First Name</a></li><li><a class="dropdown-item" href="#" data-column="3">Last Name</a></li><li><a class="dropdown-item" href="#" data-column="4">Status</a></li><li><a class="dropdown-item" href="#" data-column="5">Action</a></li></ul></div>',
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

      attachEventListeners() {
        $('#payment_infos_table').on('click', '#payment_show_btn', (event) => {
          const target = $(event.target);
          const dataId = target.data('id');
          const dataClass = target.attr('id');
            if(dataClass === 'payment_show_btn'){
            this.getLoader = true;
            this.paymentViewData.id = dataId;
            axios
              .post(this.globalVariables.apiUrl+"account-manager/payment/system/user/view", this.paymentViewData, {
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
  </style> 
  