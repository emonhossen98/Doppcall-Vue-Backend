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
          <div class="row">
            <div class="col-md-12">
                  <div class="card">
                      <div class="card-header py-2">
                          <h5 class="card-title mt-2 mb-0">Payment History</h5>
                      </div>
                      <div class="card-body px-4 pt-1 table-responsive table-overflow-hidden">
                          <table class="table">
                              <thead>
                                  <th>SL</th>
                                  <th>Full Name</th>
                                  <th>Email</th>
                                  <th>Date</th>
                                  <th>Description</th>
                                  <th>Paid</th>
                                  <th>Due Amount</th>
                                  <th>Balance</th>
                                  <th>Payment Status</th>
                                  <th>Action</th>
                              </thead>
                              <tbody>
                                <tr v-for="(history, index) in paymentHistory" :key="index">
                                  <td>{{ index + 1 }}</td>
                                  <td>{{ history.user.fname + ' ' + history.user.lname }}</td>
                                  <td>{{ history.user.email }}</td>
                                  <td>{{ formatDate(history.created_at) }}</td>
                                  <td>{{ history.description || '--' }}</td>
                                  <td>{{ history.deposit || '0.00' }}</td>
                                  <td>{{ history.withdraw || '0.00' }}</td>
                                  <td>{{ history.balance || '0.00' }}</td>
                                  <td>
                                    <span :class="{'badge-success': history.status === 'Paid', 'badge-danger': history.status !== 'Paid'}">{{ history.status }}</span>
                                  </td>
                                  <td>
                                    <RouterLink :to="'/publisher-payment-history/details/' + history.id" target="_blank" class="rounded-circle btn-style-info"><i class="fas fa-eye"></i></RouterLink>
                                  </td>
                                </tr>
                                <tr v-if="paymentHistory.length === 0">
                                  <td colspan="10" class="text-danger text-center">No data found!</td>
                                </tr>
                              </tbody>
                              <tfoot>
                                <tr>
                                  <td colspan="4"></td>
                                  <td>Total Paid = {{ totalPaidAmount }}</td>
                                  <td>Total Pending = {{ totalPendingAmount }}</td>
                                  <td colspan="3"></td>
                                </tr>
                              </tfoot>
                          </table>
                      </div>
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
  import Loader from "../../../../../../include/loader.vue";
  import Breadcrumb from "../../../../../../include/breadcrumb.vue";
  import Country from "../../../../../../include/Country_option_payment.vue";
  import CountryOption from "../../../../../../include/Country-option.vue";
  import { inject } from "vue";
  import { fetchUserRolePublisher } from "@/services/userServicePublisher";
  
  export default {
    setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
    components: {
      Loader,
      Breadcrumb,
      Country,
      CountryOption,
    },
    data() {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: "/publisher/dashboard" },
          { label: "Payment History", url: "" },
        ],
        getLoader: false,
        showModal: false,
        showPaymentModal: false,
        showRingbaModal: false,
        rules: "",
        tabid: "payment_history",
        userUpdate: {
          email : "",
          phone : "",
          first_name : "",
          last_name : "",
          type : "",
          communication_type : "",
          communication : "",
          avatar : "",
        },
        userAddress : "",
        userShowImage : {
          avatar : "",
        },
        passwordUpdate : {
          current_password : "",
          new_password : "",
          confirm_password : "",
        },
        userTofactor : { 
          two_factor_status : "",
        },
        validationErrors : null,
        pvalidationErrors : null,
        paymentInfoCreate: {
          payment_type: "",
          bank_location: "",
          bank_account_type: "",
          bank_name: "",
          account_holder_name: "",
          account_number: "",
          routing_number: "",
          branch_number: "",
          iban_code: "",
          swift_bic_code: "",
          ifsc_code: "",
          account_type: "",
          phone_number: "",
          email_address: "",
          address: "",
          city: "",
          state: "",
          zip_code: "",
          country: "",
        },
        getPaymentDatas : "",
        deletePayment : {
          data : "",
        },
        showPaymentInfor : {
          id : "",
        },
        accountManager : "",
        paymentHistory : "",
        totalPaidAmount: 0,
        totalPendingAmount: 0
      };
    },
    async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRolePublisher();
        if (role == 'Publisher') {
          this.getPublisherAccountData();
          this.getPublisherPaymnetInfo();
          this.getPublisherAccountManager();
          this.getPublisherDeposite();
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    },
    methods: {
      getPublisherAccountData() {
        this.getLoader = true;
        axios
          .get(this.globalVariables.apiUrl+"/publisher/my-account", { headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          })
          .then((res) => {
            if(res && res.data && res.data.user && res.data.user.avatar != null){
              this.userShowImage.avatar = this.globalVariables.appUrl+res.data.user.avatar; 
            }else{
              this.userShowImage.avatar = this.globalVariables.appUrl+'backend/images/no-image.png'; 
            }
            this.userUpdate.email              = res.data.user.email;
            this.userUpdate.phone              = res.data.user.phone_no;
            this.userUpdate.first_name         = res.data.user.fname;
            this.userUpdate.last_name          = res.data.user.lname;
            this.userUpdate.type               = res.data.user.type;
            this.userUpdate.userAddress        = res.data.user.user_address;
            if(res.data.user.user_address.linkedin_id != null){
              this.userUpdate.communication_type = 'linkedin';
              this.userUpdate.communication  = res.data.user.user_address.linkedin_id
            }else if(res.data.user.user_address.skype_id != null){
              this.userUpdate.communication_type = 'skype';
              this.userUpdate.communication = res.data.user.user_address.skype_id;
            }else{
              this.userUpdate.communication_type = 'facbook';
              this.userUpdate.communication = res.data.user.user_address.facebook_id;
            }
            this.userTofactor.two_factor_status = res.data.user.two_factor_status;
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.getLoader = false;
          });
      },
  
      getPublisherPaymnetInfo() {
        this.getLoader = true;
        axios
          .get(this.globalVariables.apiUrl+"publisher/payment/settings/get-data", { headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          })
          .then((res) => {
            this.getPaymentDatas = res.data.getData;
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.getLoader = false;
          });
      },
  
      getPublisherAccountManager() {
        this.getLoader = true;
        axios
          .get(this.globalVariables.apiUrl+"publisher/profile/account-manager", { headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          })
          .then((res) => {
            this.accountManager = res.data.user;
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.getLoader = false;
          });
      },
  
      getPublisherDeposite() {
        this.getLoader = true;
        axios
          .get(this.globalVariables.apiUrl+"publisher/payment-history ", { headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          })
          .then((res) => {
            this.paymentHistory = res.data.paymentHistory;
            this.calculateTotals();
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.getLoader = false;
          });
      },
  
      formatDate(date) {
        return new Date(date).toLocaleDateString('en-US', {day: '2-digit', month: 'short', year: 'numeric'});
      },
  
      calculateTotals() {
        this.totalPaidAmount = this.paymentHistory.reduce((total, value) => total + (value.deposit || 0), 0).toFixed(2);
        this.totalPendingAmount = this.paymentHistory.reduce((total, value) => total + (value.withdraw || 0), 0).toFixed(2);
      },
  
      paymentInfoDelete(id){
        this.deletePayment.data = id;
        Swal.fire({
          text: 'Are you sure to delete',
          icon: "info",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "Cancel",
        }).then((result) => {
          if (result.value) {
            this.getLoader = true,
            axios
              .post(this.globalVariables.apiUrl+"publisher/payment/settings/delete", this.deletePayment, {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              })
              .then((res) => {
                if(res.data.status == 'success'){
                  toastr.success(res.data.message);
                  this.getPublisherAccountData();
                  this.getPublisherPaymnetInfo();
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
  
      PublisherAccountDataUpdate() {
        this.getLoader = true;
        axios
          .post(this.globalVariables.apiUrl+"publisher/profile/update",this.userUpdate,
           { 
            headers: { Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            toastr.success(res.data.message);
            this.getPublisherAccountData();
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.getLoader = false;
          });
      },
  
      PublisherPasswordUpdate() {
        this.getLoader = true;
        axios
          .post(this.globalVariables.apiUrl+"publisher/profile/password/update",this.passwordUpdate,
           { 
            headers: { Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
            if(res.data.status == 'success'){
              toastr.success(res.data.message);
              this.logoutAction();
            }else if(res.data.status == 'error'){
              toastr.error(res.data.message);
            }else{
              this.validationErrors = res.data.errors;
            }
          })
          .catch((error) => {
            if(error && error.response && error.response.data && error.response.data.errors){
              this.validationErrors = error.response.data.errors;
            }
          })
          .finally(() => {
            this.getLoader = false;
          });
      },
  
      updateToFatorData() {
        this.getLoader = true;
        axios
          .post(this.globalVariables.apiUrl+"twofactor/update",this.userTofactor,
           { 
            headers: { Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
            if(res.data.status == 'success'){
              toastr.success(res.data.message);
              this.getPublisherAccountData();
            }
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.getLoader = false;
          });
      },
  
      updatePaymnetInfoData() {
        this.getLoader = true;
        this.paymentInfoCreate.bank_account_type = $("#bank_account_type").val();
        this.paymentInfoCreate.bank_name = $("#bank_name").val();
        this.paymentInfoCreate.account_holder_name = $("#account_holder_name").val();
        this.paymentInfoCreate.account_number = $("#account_number").val();
        this.paymentInfoCreate.routing_number = $("#routing_number").val();
        this.paymentInfoCreate.branch_number = $("#branch_number").val();
        this.paymentInfoCreate.iban_code = $("#iban_code").val();
        this.paymentInfoCreate.swift_bic_code = $("#swift_bic_code").val();
        this.paymentInfoCreate.ifsc_code = $("#ifsc_code").val();
        this.paymentInfoCreate.account_type = $("#account_type").val();
        this.paymentInfoCreate.phone_number = $("#phone_number").val();
        if(this.paymentInfoCreate.email_address == ''){
          this.paymentInfoCreate.email_address = $('#email_addresss').val();
        }
        this.paymentInfoCreate.city = $("#city").val();
        this.paymentInfoCreate.state = $("#state").val();
        this.paymentInfoCreate.zip_code = $("#zip_code").val();
        this.paymentInfoCreate.country = $("#countryOption").val();
        this.paymentInfoCreate.address = $("#address").val();
        axios
          .post(this.globalVariables.apiUrl+"publisher/payment/settings/store",this.paymentInfoCreate,
           { 
            headers: { Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
            if(res.data.status == 'success'){
              toastr.success(res.data.message);
              this.getPublisherPaymnetInfo();
              this.paymentInfoCreate.payment_type =  "";
              this.paymentInfoCreate.bank_location =  "";
              this.paymentInfoCreate.bank_account_type =  "";
              this.paymentInfoCreate.bank_name =  "";
              this.paymentInfoCreate.account_holder_name =  "";
              this.paymentInfoCreate.account_number =  "";
              this.paymentInfoCreate.routing_number =  "";
              this.paymentInfoCreate.branch_number =  "";
              this.paymentInfoCreate.iban_code =  "";
              this.paymentInfoCreate.swift_bic_code =  "";
              this.paymentInfoCreate.ifsc_code =  "";
              this.paymentInfoCreate.account_type =  "";
              this.paymentInfoCreate.phone_number =  "";
              this.paymentInfoCreate.email_address =  "";
              this.paymentInfoCreate.address =  "";
              this.paymentInfoCreate.city =  "";
              this.paymentInfoCreate.state =  "";
              this.paymentInfoCreate.zip_code =  "";
              this.paymentInfoCreate.country =  "";
            }
          })
          .catch((error) => {
            if(error && error.response && error.response.data && error.response.data.errors){
              this.pvalidationErrors = error.response.data.errors;
            }
          })
          .finally(() => {
            this.getLoader = false;
          });
      },
  
      showPaymnetInfoData(id) {
        this.showPaymentInfor.id = id;
        this.getLoader = true;
        axios
          .post(this.globalVariables.apiUrl+"publisher/payment/settings/show",this.showPaymentInfor,
           { 
            headers: { Authorization: "Bearer " + localStorage.getItem("token"),
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
                this.showPaymentModal = true;
          })
          .catch((error) => {
            if(error && error.response && error.response.data && error.response.data.errors){
              this.pvalidationErrors = error.response.data.errors;
            }
          })
          .finally(() => {
            this.getLoader = false;
          });
      },
  
      handlePaymentTypeChange(event) {
        if (event.target.value === "1") {
          document.getElementById("payoneer").classList.remove("d-none");
          document.getElementById("bank").classList.add("d-none");
        } else if (event.target.value === "2") {
          document.getElementById("payoneer").classList.add("d-none");
          document.getElementById("bank").classList.remove("d-none");
  
          this.initializePhoneInput();
        }
      },
      initializePhoneInput() {
        $(document).on("change", "#bank_location", () => {
          if (
            $("#bank_location").val() === "United States of America" ||
            $("#bank_location").val() === "Puerto Rico"
          ) {
            $("#country").empty();
            $("#country").html(
              `<div class="row">
                <div class="col-md-6">
                    <div class="row form-group pr-md-3 mt-3">
                      <label for="bank_account_type" class="required">Bank Account Type</label>
                      <select class="form-select" v-model="paymentInfoCreate.bank_account_type" id="bank_account_type" required>
                          <option value="Business Account">Business Account</option>
                          <option value="Personal Account">Personal Account</option>
                        </select>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="row form-group mt-3">
                      <label for="bank_name" class="required">Bank Name</label>
                      <input type="text" v-model="paymentInfoCreate.bank_name" id="bank_name" class="form-control" required/>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="row form-group pr-md-3 mt-3">
                      <label for="account_holder_name" class="required">Account Holder Name</label>
                      <input type="text" v-model="paymentInfoCreate.account_holder_name" id="account_holder_name" class="form-control" required/>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="row form-group mt-3">
                      <label for="account_number" class="required">Account Number</label>
                      <input type="text" v-model="paymentInfoCreate.account_number" id="account_number" class="form-control" required/>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="row form-group pr-md-3 mt-3">
                      <label for="routing_number" class="required">Routing Number</label>
                      <input type="text" v-model="paymentInfoCreate.routing_number" id="routing_number" class="form-control" required/>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="row form-group mt-3">
                      <label for="account_type" class="required">Account Type</label>
                      <select class="form-select" v-model="paymentInfoCreate.account_type" id="account_type" required>
                         <option value="C- Checking Account">C- Checking Account</option>
                         <option value="S- Savings Account">S- Savings Account</option>
                      </select>
                    </div>
                </div>
                <div class="col-md-6 p-0 pr-md-3 mt-3" style="margin-top: -6px">
                    <label for="phone_number" class="required">Phone Number</label>
                    <input id="phone_number" class="phone_number form-control" v-model="paymentInfoCreate.phone_number" type="tel" required>
                    </div>
                <div class="col-md-6">
                    <div class="row form-group mt-3">
                      <label for="email_address" class="required">Email Address</label>
                      <input type="email" v-model="paymentInfoCreate.email_address" id="email_addresss" class="form-control" required/>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="row form-group pr-md-3 mt-3">
                      <label for="city" class="required">City</label>
                      <input type="text" v-model="paymentInfoCreate.city" id="city" class="form-control" required/>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="row form-group mt-3">
                      <label for="state" class="required">State</label>
                      <input type="text" v-model="paymentInfoCreate.state" id="state" class="form-control" required/>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="row form-group pr-md-3 mt-3">
                      <label for="zip_code" class="required">Zip Code</label>
                      <input type="text" v-model="paymentInfoCreate.zip_code" id="zip_code" class="form-control" required/>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="row form-group mt-3">
                      <label for="country" class="required">Country</label>
                      <select class="form-select" v-model="paymentInfoCreate.country" id="countryOption" required>
  
                      </select>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="row form-group pr-md-3 mt-3">
                      <label for="address" class="required">Address</label>
                      <textarea v-model="paymentInfoCreate.address" id="address" required class="form-control"></textarea>
                    </div>
                </div>
            </div>`
            );
            var CountryOption = document.querySelector("#all-Country-Option");
            var ShoCountryOption = document.querySelector("#countryOption");
            ShoCountryOption.innerHTML = CountryOption.innerHTML;
            // Initialize intlTelInput
            var input = document.querySelector("#phone_number");
            window.intlTelInput(input, {});
  
            // Handle flag container click
            $(".iti__flag-container").click(() => {
              var countryCode = $(".iti__selected-flag")
                .attr("title")
                .replace(/[^0-9]/g, "");
              input.value = countryCode + input.value;
            });
          } else if ($("#bank_location").val() == "Canada") {
            $("#country").empty();
            $("#country").html(
              `<div class="row">
                      <div class="col-md-6">
                          <div class="row form-group pr-md-3 mt-3">
                            <label for="bank_account_type" class="required">Bank Account Type</label>
                            <select class="form-select" v-model="paymentInfoCreate.bank_account_type" id="bank_account_type" required>
                                <option value="Business Account">Business Account</option>
                                <option value="Personal Account">Personal Account</option>
                            </select>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="row form-group mt-3">
                            <label for="bank_name" class="required">Bank Name</label>
                            <input type="text" v-model="paymentInfoCreate.bank_name" id="bank_name" class="form-control" required/>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="row form-group pr-md-3 mt-3">
                            <label for="account_holder_name" class="required">Account Holder Name</label>
                            <input type="text" v-model="paymentInfoCreate.account_holder_name" id="account_holder_name" class="form-control" required/>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="row form-group mt-3">
                            <label for="account_number" class="required">Account Number</label>
                            <input type="text" v-model="paymentInfoCreate.account_number" id="account_number" class="form-control" required/>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="row form-group pr-md-3 mt-3">
                            <label for="branch_number" class="required">Branch Number</label>
                            <input type="text" v-model="paymentInfoCreate.branch_number" id="branch_number" class="form-control" required/>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="row form-group mt-3">
                            <label for="account_type" class="required">Account Type</label>
                            <select class="form-select" v-model="paymentInfoCreate.account_type" id="account_type" required>
                              <option value="C- Checking Account">C- Checking Account</option>
                              <option value="S- Savings Account">S- Savings Account</option>
                            </select>
                          </div>
                      </div>
                      <div class="col-md-6 p-0 pr-md-3 mt-3" style="margin-top: -6px">
                          <label for="phone_number" class="required">Phone Number</label>
                          <input id="phone_number" class="phone_number" v-model="paymentInfoCreate.phone_number" type="tel">
                      </div>
                      <div class="col-md-6">
                          <div class="row form-group mt-3">
                            <label for="email_address" class="required">Email Address</label>
                            <input type="email" v-model="paymentInfoCreate.email_address" id="email_addresss" class="form-control" required/>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="row form-group pr-md-3 mt-3">
                            <label for="city" class="required">City</label>
                            <input type="text" v-model="paymentInfoCreate.city" id="city" class="form-control" required/>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="row form-group mt-3">
                            <label for="state" class="required">State</label>
                            <input type="text" v-model="paymentInfoCreate.state" id="state" class="form-control" required/>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="row form-group pr-md-3 mt-3">
                            <label for="zip_code" class="required">Zip Code</label>
                            <input type="text" v-model="paymentInfoCreate.zip_code" id="zip_code" class="form-control" required/>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="row form-group mt-3">
                            <label for="country" class="required">Country</label>
                            <select class="form-select" v-model="paymentInfoCreate.country" id="countryOption" required>
                              <CountryOption></CountryOption>
                            </select>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="row form-group pr-md-3 mt-3">
                            <label for="address" class="required">Address</label>
                            <textarea v-model="paymentInfoCreate.address" id="address" required class="form-control"></textarea>
                          </div>
                      </div>
  
                  </div>`
            );
            var CountryOption = document.querySelector("#all-Country-Option");
            var ShoCountryOption = document.querySelector("#countryOption");
            ShoCountryOption.innerHTML = CountryOption.innerHTML;
            // Initialize intlTelInput
            var input = document.querySelector("#phone_number");
            window.intlTelInput(input, {});
  
            // Handle flag container click
            $(".iti__flag-container").click(() => {
              var countryCode = $(".iti__selected-flag")
                .attr("title")
                .replace(/[^0-9]/g, "");
              input.value = countryCode + input.value;
            });
          } else if (
            $("#bank_location").val() == "Australia" ||
            $("#bank_location").val() == "Phillipines" ||
            $("#bank_location").val() == "Bangladesh"
          ) {
            $("#country").empty();
            $("#country").html(
              `<div class="row">
                      <div class="col-md-6">
                          <div class="row form-group pr-md-3 mt-3">
                            <label for="bank_account_type" class="required">Bank Account Type</label>
                            <select class="form-select" v-model="paymentInfoCreate.bank_account_type" id="bank_account_type" required>
                                <option value="Business Account">Business Account</option>
                                <option value="Personal Account">Personal Account</option>
                            </select>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="row form-group mt-3">
                            <label for="bank_name" class="required">Bank Name</label>
                            <input type="text" v-model="paymentInfoCreate.bank_name" id="bank_name" class="form-control" required/>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="row form-group pr-md-3 mt-3">
                            <label for="account_holder_name" class="required">Account Holder Name</label>
                            <input type="text" v-model="paymentInfoCreate.account_holder_name" id="account_holder_name" class="form-control" required/>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="row form-group mt-3">
                            <label for="account_number" class="required">Account Number</label>
                            <input type="text" v-model="paymentInfoCreate.account_number" id="account_number" class="form-control" required/>
                          </div>
                      </div>
                      <div class="col-md-6 p-0 pr-md-3 mt-3" style="margin-top: -6px">
                          <label for="phone_number" class="required">Phone Number</label>
                          <input id="phone_number" v-model="paymentInfoCreate.phone_number" class="phone_number" type="tel">
                      </div>
                      <div class="col-md-6">
                          <div class="row form-group mt-3">
                            <label for="email_address" class="required">Email Address</label>
                            <input type="email" v-model="paymentInfoCreate.email_address" id="email_addresss" class="form-control" required/>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="row form-group pr-md-3 mt-3">
                            <label for="city" class="required">City</label>
                            <input type="text" v-model="paymentInfoCreate.city" id="city" class="form-control" required/>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="row form-group mt-3">
                            <label for="state" class="required">State</label>
                            <input type="text" v-model="paymentInfoCreate.state" id="state" class="form-control" required/>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="row form-group pr-md-3 mt-3">
                            <label for="zip_code" class="required">Zip Code</label>
                            <input type="text" v-model="paymentInfoCreate.zip_code" id="zip_code" class="form-control" required/>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="row form-group mt-3">
                            <label for="country" class="required">Country</label>
                            <select class="form-select" v-model="paymentInfoCreate.country" id="countryOption" required>
                              <CountryOption></CountryOption>
                            </select>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="row form-group pr-md-3 mt-3">
                            <label for="address" class="required">Address</label>
                            <textarea v-model="paymentInfoCreate.address" id="address" required class="form-control"></textarea>
                          </div>
                      </div>
                  </div>`
            );
            var CountryOption = document.querySelector("#all-Country-Option");
            var ShoCountryOption = document.querySelector("#countryOption");
            ShoCountryOption.innerHTML = CountryOption.innerHTML;
            // Initialize intlTelInput
            var input = document.querySelector("#phone_number");
            window.intlTelInput(input, {});
  
            // Handle flag container click
            $(".iti__flag-container").click(() => {
              var countryCode = $(".iti__selected-flag")
                .attr("title")
                .replace(/[^0-9]/g, "");
              input.value = countryCode + input.value;
            });
          } else if ($("#bank_location").val() == "India") {
            $("#country").empty();
            $("#country").html(`
                  <div class="row">
                      <div class="col-md-6">
                          <div class="row form-group pr-md-3 mt-3">
                            <label for="bank_account_type" class="required">Bank Account Type</label>
                            <select class="form-select" v-model="paymentInfoCreate.bank_account_type" id="bank_account_type" required>
                                <option value="Business Account">Business Account</option>
                                <option value="Personal Account">Personal Account</option>
                            </select>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="row form-group mt-3">
                            <label for="bank_name" class="required">Bank Name</label>
                            <input type="text" v-model="paymentInfoCreate.bank_name" id="bank_name" class="form-control" required/>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="row form-group pr-md-3 mt-3">
                            <label for="account_holder_name" class="required">Account Holder Name</label>
                            <input type="text" v-model="paymentInfoCreate.account_holder_name" id="account_holder_name" class="form-control" required/>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="row form-group mt-3">
                            <label for="account_number" class="required">Account Number</label>
                            <input type="text" v-model="paymentInfoCreate.account_number" id="account_number" class="form-control" required/>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="row form-group pr-md-3 mt-3">
                            <label for="swift_bic_code" class="required">SWIFT / BIC Number</label>
                            <input type="text" v-model="paymentInfoCreate.swift_bic_code" id="swift_bic_code" class="form-control" />
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="row form-group mt-3">
                            <label for="ifsc_code" class="required">IFSC</label>
                            <input type="text" v-model="paymentInfoCreate.ifsc_code" id="ifsc_code" class="form-control" />
                          </div>
                      </div>
                      <div class="col-md-6 p-0 pr-md-3 mt-3" style="margin-top: -6px">
                        <label for="phone_number" class="required">Phone Number</label>
                        <input id="phone_number" v-model="paymentInfoCreate.phone_number" class="phone_number" type="tel">
                      </div>
                      <div class="col-md-6">
                          <div class="row form-group mt-3">
                            <label for="email_address" class="required">Email Address</label>
                            <input type="email" v-model="paymentInfoCreate.email_address" id="email_addresss" class="form-control" required/>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="row form-group pr-md-3 mt-3">
                            <label for="city" class="required">City</label>
                            <input type="text" v-model="paymentInfoCreate.city" id="city" class="form-control" required/>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="row form-group mt-3">
                            <label for="state" class="required">State</label>
                            <input type="text" v-model="paymentInfoCreate.state" id="state" class="form-control" required/>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="row form-group pr-md-3 mt-3">
                            <label for="zip_code" class="required">Zip Code</label>
                            <input type="text" v-model="paymentInfoCreate.zip_code" id="zip_code" class="form-control" required/>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="row form-group mt-3">
                            <label for="country" class="required">Country</label>
                            <select class="form-select" v-model="paymentInfoCreate.country" id="countryOption" required>
                              <CountryOption></CountryOption>
                            </select>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="row form-group pr-md-3 mt-3">
                            <label for="address" class="required">Address</label>
                            <textarea v-model="paymentInfoCreate.address" id="address" required class="form-control"></textarea>
                          </div>
                      </div>
                  </div>
              `);
              var CountryOption = document.querySelector("#all-Country-Option");
            var ShoCountryOption = document.querySelector("#countryOption");
            ShoCountryOption.innerHTML = CountryOption.innerHTML;
            // Initialize intlTelInput
            var input = document.querySelector("#phone_number");
            window.intlTelInput(input, {});
  
            // Handle flag container click
            $(".iti__flag-container").click(() => {
              var countryCode = $(".iti__selected-flag")
                .attr("title")
                .replace(/[^0-9]/g, "");
              input.value = countryCode + input.value;
            });
          } else if ($("#bank_location").val() == "United Kingdom") {
            $("#country").empty();
            $("#country").html(
              `<div class="row">
                      <div class="col-md-6">
                          <div class="row form-group pr-md-3 mt-3">
                            <label for="bank_account_type" class="required">Bank Account Type</label>
                            <select class="form-select" v-model="paymentInfoCreate.bank_account_type" id="bank_account_type" required>
                                <option value="Business Account">Business Account</option>
                                <option value="Personal Account">Personal Account</option>
                            </select>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="row form-group mt-3">
                            <label for="bank_name" class="required">Bank Name</label>
                            <input type="text" v-model="paymentInfoCreate.bank_name" id="bank_name" class="form-control" required/>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="row form-group pr-md-3 mt-3">
                            <label for="account_holder_name" class="required">Account Holder Name</label>
                            <input type="text" v-model="paymentInfoCreate.account_holder_name" id="account_holder_name" class="form-control" required/>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="row form-group mt-3">
                            <label for="account_number" class="required">Account Number</label>
                            <input type="text" v-model="paymentInfoCreate.account_number" id="account_number" class="form-control" required/>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="row form-group pr-md-3 mt-3">
                            <label for="swift_bic_code" class="required">SWIFT / BIC Number</label>
                            <input type="text" v-model="paymentInfoCreate.swift_bic_code" id="swift_bic_code" class="form-control" />
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="row form-group mt-3">
                            <label for="iban_code" class="required">IBAN Code</label>
                            <input v-model="paymentInfoCreate.iban_code" id="iban_code" class="form-control" required />
                          </div>
                      </div>
                      <div class="col-md-6 p-0 pr-md-3 mt-3" style="margin-top: -6px">
                          <label for="phone_number" class="required">Phone Number</label>
                          <input id="phone_number" class="phone_number" v-model="paymentInfoCreate.phone_number" type="tel" >
                      </div>
                      <div class="col-md-6">
                          <div class="row form-group mt-3">
                            <label for="email_address" class="required">Email Address</label>
                            <input type="email" v-model="paymentInfoCreate.email_address" id="email_addresss" class="form-control" required/>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="row form-group pr-md-3 mt-3">
                            <label for="city" class="required">City</label>
                            <input type="text" v-model="paymentInfoCreate.city" id="city" class="form-control" required/>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="row form-group mt-3">
                            <label for="state" class="required">State</label>
                            <input type="text" v-model="paymentInfoCreate.state" id="state" class="form-control" required/>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="row form-group pr-md-3 mt-3">
                            <label for="zip_code" class="required">Zip Code</label>
                            <input type="text" v-model="paymentInfoCreate.zip_code" id="zip_code" class="form-control" required/>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="row form-group mt-3">
                            <label for="country" class="required">Country</label>
                            <select class="form-select" v-model="paymentInfoCreate.country" id="countryOption" required>
                              <CountryOption></CountryOption>
                            </select>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="row form-group pr-md-3 mt-3">
                            <label for="address" class="required">Address</label>
                            <textarea v-model="paymentInfoCreate.address" id="address" required class="form-control"></textarea>
                          </div>
                      </div>
                  </div>`
            );
            var CountryOption = document.querySelector("#all-Country-Option");
            var ShoCountryOption = document.querySelector("#countryOption");
            ShoCountryOption.innerHTML = CountryOption.innerHTML;
            // Initialize intlTelInput
            var input = document.querySelector("#phone_number");
            window.intlTelInput(input, {});
  
            // Handle flag container click
            $(".iti__flag-container").click(() => {
              var countryCode = $(".iti__selected-flag")
                .attr("title")
                .replace(/[^0-9]/g, "");
              input.value = countryCode + input.value;
            });
          } else if ($("#bank_location").val() == "Pakistan") {
            $("#country").empty();
            $("#country").html(
              `<div class="row">
                      <div class="col-md-6">
                          <div class="row form-group pr-md-3 mt-3">
                            <label for="bank_account_type" class="required">Bank Account Type</label>
                            <select class="form-select" v-model="paymentInfoCreate.bank_account_type" id="bank_account_type" required>
                                <option value="Business Account">Business Account</option>
                                <option value="Personal Account">Personal Account</option>
                            </select>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="row form-group mt-3">
                            <label for="bank_name" class="required">Bank Name</label>
                            <input type="text" v-model="paymentInfoCreate.bank_name" id="bank_name" class="form-control" required/>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="row form-group pr-md-3 mt-3">
                            <label for="account_holder_name" class="required">Account Holder Name</label>
                            <input type="text" v-model="paymentInfoCreate.account_holder_name" id="account_holder_name" class="form-control" required/>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="row form-group mt-3">
                            <label for="account_number" class="required">Account Number</label>
                            <input type="text" v-model="paymentInfoCreate.account_number" id="account_number" class="form-control" required/>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="row form-group pr-md-3 mt-3">
                            <label for="iban_code" class="required">IBAN Code</label>
                            <input v-model="paymentInfoCreate.iban_code" id="iban_code" class="form-control" required />
                          </div>
                      </div>
                      <div class="col-md-6 p-0 mt-3" style="margin-top: -6px">
                          <label for="phone_number" class="required">Phone Number</label>
                            <input id="phone_number" class="phone_number" v-model="paymentInfoCreate.phone_number" type="tel" >
                      </div>
                      <div class="col-md-6">
                          <div class="row form-group pr-md-3 mt-3">
                            <label for="email_address" class="required">Email Address</label>
                            <input type="email" v-model="paymentInfoCreate.email_address" id="email_addresss" class="form-control" required/>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="row form-group mt-3">
                            <label for="city" class="required">City</label>
                            <input type="text" v-model="paymentInfoCreate.city" id="city" class="form-control" required/>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="row form-group pr-md-3 mt-3">
                            <label for="state" class="required">State</label>
                            <input type="text" v-model="paymentInfoCreate.state" id="state" class="form-control" required/>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="row form-group pr-md-3 mt-3">
                            <label for="zip_code" class="required">Zip Code</label>
                            <input type="text" v-model="paymentInfoCreate.zip_code" id="zip_code" class="form-control" required/>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="row form-group pr-md-3 mt-3">
                            <label for="country" class="required">Country</label>
                            <select class="form-select" v-model="paymentInfoCreate.country" id="countryOption" required>
                              <CountryOption></CountryOption>
                            </select>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="row form-group mt-3">
                            <label for="address" class="required">Address</label>
                            <textarea v-model="paymentInfoCreate.address" id="address" required class="form-control"></textarea>
                          </div>
                      </div>
                  </div>`
            );
            var CountryOption = document.querySelector("#all-Country-Option");
            var ShoCountryOption = document.querySelector("#countryOption");
            ShoCountryOption.innerHTML = CountryOption.innerHTML;
            // Initialize intlTelInput
            var input = document.querySelector("#phone_number");
            window.intlTelInput(input, {});
  
            // Handle flag container click
            $(".iti__flag-container").click(() => {
              var countryCode = $(".iti__selected-flag")
                .attr("title")
                .replace(/[^0-9]/g, "");
              input.value = countryCode + input.value;
            });
          } else {
            $("#country").empty();
            $("#country").html(
              `<div class="row">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="bank_account_type" class="required">Bank Account Type</label>
                            <select class="form-select" v-model="paymentInfoCreate.bank_account_type" id="bank_account_type" required>
                                <option value="Business Account">Business Account</option>
                                <option value="Personal Account">Personal Account</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="bank_name" class="required">Bank Name</label>
                            <input type="text" v-model="paymentInfoCreate.bank_name" id="bank_name" class="form-control" required/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="account_holder_name" class="required">Account Holder Name</label>
                            <input type="text" v-model="paymentInfoCreate.account_holder_name" id="account_holder_name" class="form-control" required/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="account_number" class="required">Account Number</label>
                            <input type="text" v-model="paymentInfoCreate.account_number" id="account_number" class="form-control" required/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="routing_number" class="required">Routing Number</label>
                          <input v-model="paymentInfoCreate.routing_number" id="routing_number" class="form-control"  required />
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="swift_bic_code" class="required">SWIFT / BIC Number</label>
                            <input type="text" v-model="paymentInfoCreate.swift_bic_code" id="swift_bic_code" class="form-control" />
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="iban_code" class="required">IBAN</label>
                          <input v-model="paymentInfoCreate.iban_code" id="iban_code" class="form-control" required />
                        </div>
                    </div>
                    <div class="col-md-6 p-0 mt-3" style="margin-top: -6px">
                        <label for="phone_number" class="required">Phone Number</label>
                            <input id="phone_number" class="phone_number" v-model="paymentInfoCreate.phone_number" type="tel">
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="email_address" class="required">Email Address</label>
                            <input type="email" v-model="paymentInfoCreate.email_address" id="email_addresss" class="form-control" required/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="city" class="required">City</label>
                            <input type="text" v-model="paymentInfoCreate.city" id="city" class="form-control" required/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="state" class="required">State</label>
                            <input type="text" v-model="paymentInfoCreate.state" id="state" class="form-control" required/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="zip_code" class="required">Zip Code</label>
                            <input type="text" v-model="paymentInfoCreate.zip_code" id="zip_code" class="form-control" required/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="country" class="required">Country</label>
                            <select class="form-select" v-model="paymentInfoCreate.country" id="countryOption" required>
                              <CountryOption></CountryOption>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="address" class="required">Address</label>
                            <textarea v-model="paymentInfoCreate.address" id="address" required class="form-control"></textarea>
                        </div>
                    </div>
                </div>`
            );
            var CountryOption = document.querySelector("#all-Country-Option");
            var ShoCountryOption = document.querySelector("#countryOption");
            ShoCountryOption.innerHTML = CountryOption.innerHTML;
            // Initialize intlTelInput
            var input = document.querySelector("#phone_number");
            window.intlTelInput(input, {});
  
            // Handle flag container click
            $(".iti__flag-container").click(() => {
              var countryCode = $(".iti__selected-flag")
                .attr("title")
                .replace(/[^0-9]/g, "");
              input.value = countryCode + input.value;
            });
          }
        });
      },
  
      logoutAction () {
        this.getLoader = true;
        axios.post(this.globalVariables.apiUrl+'logout',{}, { headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}})
        .then((res) => {
            localStorage.setItem('token', "")
            // window.location.href =`http://localhost:5173/?token=logout`;
            window.location.href =`https://doppcall.com/?token=logout`;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
            this.getLoader = false;
         });
      },
  
      primaryLogo(event) {
        const file = event.target.files[0];
        this.userUpdate.avatar = file;
        if (!file || file.type.indexOf('image/') === -1) return;
        const reader = new FileReader();
        reader.onload = () => {
          this.userShowImage.avatar = reader.result; 
        };
        reader.readAsDataURL(file);
      },
  
      changeAccountTab(data) {
          this.tabid = data;
      },
  
      getToFactionStatus(event) {
        this.userTofactor.two_factor_status = event.target.checked;
      },
  
    },
  };
  </script>
  <style>
  li {
    list-style:none;
  }
  .mypaymentmodal {
      margin-top: 25rem;
  }
  .mytabs {
    width: 100% !important;
  }
  .nav-pills .nav-link.active {
    border-radius: 3px !important;
    background-color: #e4f4fd !important;
  }
  
  .profile-name .title i {
    list-style: none;
    height: 15px;
    width: 15px;
    line-height: 25px;
    color: rgb(176, 176, 187);
    border: 2px solid rgb(176, 176, 187);
  }
  .profile-nav-main i::before {
    padding: 10px;
  }
  .with-icon input {
    position: absolute;
  }
  
  .with-icon i {
    position: relative;
    left: -8%;
    top: 12px;
  }
  .with-datatable-icon input {
    position: absolute;
  }
  
  .with-datatable-icon i {
    position: relative;
    left: -10%;
    top: 10px;
  }
  
  .fs-1 {
    font-size: 24px;
  }
  .text-graw {
    color: rgb(177, 176, 176);
  }
  .fs-2 {
    font-size: 20px;
  }
  .fs-3 {
    font-size: 18px;
  }
  .fs-3 {
    font-size: 16px;
  }
  .fw-900 {
    font-family: 900;
  }
  .tabel-head i {
    list-style: none;
    height: 19px;
    width: 19px;
    line-height: 19px;
    color: rgb(176, 176, 187);
    border: 2px solid rgb(176, 176, 187);
  }
  
  #styled-checkbox-1 {
    height: 18px;
    width: 20px;
    line-height: 10px;
    padding-left: 10px;
  }
  
  .popup-info-box {
    border-left: 6px solid #1e88e5;
    background: #e4f4fd;
    padding: 1.25rem;
    margin: 1.25rem;
  }
  .card-header {
    border-bottom: 2px solid rgb(192, 192, 192);
  }
  
  .rounded-circle-img {
    width: 120px !important;
    height: 120px !important;
    border-radius: 50% !important;
  }
  .choose-image-btn {
    background: #d8d8d8;
    color: black !important;
    padding: 3px 15px;
    border-radius: 5px;
    margin-top: 10px;
    cursor: pointer;
  }
  .custom-nav-link {
    justify-content: start !important;
    font-size: 15px !important;
  }
  </style>
  <style scoped>
  .switch {
    position: relative;
    display: inline-block;
    width: 90px;
    height: 34px;
  }
  
  .switch input {
    display: none;
  }
  
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ca2222;
    -webkit-transition: .4s;
    transition: .4s;
  }
  
  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }
  
  input:checked + .slider {
    background-color: #2ab934;
  }
  
  input:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
  }
  
  input:checked + .slider:before {
    -webkit-transform: translateX(55px);
    -ms-transform: translateX(55px);
    transform: translateX(55px);
  }
  
  /*------ ADDED CSS ---------*/
  .on {
    display: none;
  }
  
  .on, .off {
    color: white;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    font-size: 10px;
    font-family: Verdana, sans-serif;
    user-select:none;
  }
  
  input:checked + .slider .on {
    display: block;
  }
  
  input:checked + .slider .off {
    display: none;
  }
  
  /*--------- END --------*/
  
  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }
  
  .slider.round:before {
    border-radius: 50%;
  }
  
  </style>