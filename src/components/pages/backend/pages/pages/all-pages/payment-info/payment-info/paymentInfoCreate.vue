<template>
  <div v-if="getLoader">
    <Loader></Loader>
  </div>
  <!-- Content wrapper -->
  <div class="content-wrapper">
    <!-- Content -->
    <div class="container-fluid flex-grow-1 container-p-y">
      <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
      <div class="row mt-4 d-flex justify-content-center">
        <div class="col-md-12">
          <form class="justify-content-center">
            <div class="card padding-standart3 p-5">
              <div class="row form-group">
                <label for="user_id" class="required mb-1">Select User</label>
                <select  v-model="paymentInfoCreate.user_id" id="user_id"  class="form-select" required>
                  <option value="">Select User</option>
                  <option v-for="user in Users.users" :value="user.id" :key="user.id">
                    {{ user.fname }} - {{ user.lname }} - {{ user.email }} -
                    {{ user.company_name }}
                  </option>
                </select>
                <div v-if="validationErrors &&  validationErrors.user_id" class="text-danger">
                  {{ validationErrors.user_id[0] }}
              </div>
              </div>

              <div class="row form-group mt-3">
                <label for="payment_type" class="required mb-1">Payment Type</label>
                <select v-model="paymentInfoCreate.payment_type" id="payment_type" required class="form-select">
                  <option value="">Select Please</option>
                  <option value="1">Payoneer</option>
                  <option value="2">Bank Draft</option>
                </select>
                <div v-if="validationErrors &&  validationErrors.payment_type" class="text-danger">
                    {{ validationErrors.payment_type[0] }}
                </div>
              </div>

              <div id="payoneer" class="d-none mt-3">
                <div class="row form-group">
                  <label for="" class="required mb-1">Email</label>
                  <input type="email" id="email_address" required class="form-control" placeholder="Enter Email">
                  <div v-if="validationErrors &&  validationErrors.email_address" class="text-danger">
                    {{ validationErrors.email_address[0] }}
                </div>
                </div>
              </div>

              <div id="bank" class="d-none mt-3">
                <div class="row form-group">
                  <label for="bank_location" class="required mb-1">Bank Location</label>
                  <select v-model="paymentInfoCreate.bank_location" id="bank_location" class="form-select" required>
                    <Country></Country>
                  </select>
                  <div v-if="validationErrors &&  validationErrors.bank_location" class="text-danger">
                    {{ validationErrors.bank_location[0] }}
                </div>
                </div>

                <!-- Country form  -->
                <div id="country"></div>
              </div>
            </div>
            <div class="text-end mt-4">
              <button @click="paymentSave()" type="button" class="btn btn-md btn-primary mb-2" style="width: 210px">
                Save
              </button>
            </div>
          </form>
          <div class="d-none" id="all-Country-Option">
            <CountryOption></CountryOption>
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
import "toastr/build/toastr.min.css";
import Country from "../../../../../include/Country_option_payment.vue";
import CountryOption from "../../../../../include/Country-option.vue";
import Loader from '../../../../../include/loader.vue';
import Breadcrumb from '../../../../../include/breadcrumb.vue';
import { inject } from "vue";
import { fetchUserRole } from "@/services/userService";

export default {
  setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
  props: ["Users"],
  components: {
    Country,
    CountryOption,
    Loader,
    Breadcrumb,
  },
  data: () => {
    return {
      getLoader: false,
      breadcrumbs: [
        { label: "Dashboard", url: "/dashboard" },
        { label: "Publisher Payment Info", url: "/admin-payment-system-publisher" },
        { label: "Add publisher payment info", url: "" },
      ],
      validationErrors: null,
      paymentInfoCreate: {
        user_id: "",
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
    };
  },
  async mounted() { 
  try {
    const { role, isAuthorized } = await fetchUserRole();
    if (role == 'Super' || role == 'Admin') {
      document.getElementById("payment_type").addEventListener("change", this.handlePaymentTypeChange);
    }
  } catch (error) {
    console.error("Error fetching user role:", error);
  }
},
  methods: {
    paymentSave() {
      var email_address    = $("#email_address").val();
      var email            = $("#el_email_address").val();
      var un_email_address = $("#un_email_address").val();
      var ca_email_address = $("#ca_email_address").val();
      var ba_email_address = $("#ba_email_address").val();
      var in_email_address = $("#in_email_address").val();
      var uk_email_address = $("#uk_email_address").val();
      var pk_email_address = $("#pk_email_address").val();

      
      if(email_address !== ""){
       this.paymentInfoCreate.email_address = email_address;
      }else if(email !== ""){
        this.paymentInfoCreate.email_address = email;
      }else if(un_email_address !== ""){
        this.paymentInfoCreate.email_address = un_email_address;
      }else if(ca_email_address !== ""){
        this.paymentInfoCreate.email_address = ca_email_address;
      }else if(ba_email_address !== ""){
        this.paymentInfoCreate.email_address = ba_email_address;
      }else if(in_email_address !== ""){
        this.paymentInfoCreate.email_address = in_email_address;
      }else if(uk_email_address !== ""){
        this.paymentInfoCreate.email_address = uk_email_address;
      }else if(pk_email_address !== ""){
        this.paymentInfoCreate.email_address = pk_email_address;
      }

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
      this.paymentInfoCreate.city = $("#city").val();
      this.paymentInfoCreate.state = $("#state").val();
      this.paymentInfoCreate.zip_code = $("#zip_code").val();
      this.paymentInfoCreate.country = $("#countryOption").val();
      this.paymentInfoCreate.address = $("#address").val();
      axios
        .post(
          this.globalVariables.apiUrl+"admin/payment/system/user/store/info",
          this.paymentInfoCreate,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {  
          console.log(res);
          if(res.data.status == 'success'){
            this.validationErrors = null;
            toastr.success(res.data.message);
            this.$router.push('/admin-payment-system-publisher');
          }else if(res.data.status == 'error'){
            toastr.error(res.data.message);
          }else if(res.data.status == 'warning'){
            toastr.warning(res.data.message);
          }else{
              this.validationErrors = res.data.errors;
          }
        })
        .catch((error) => {
          console.log(error);
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
            `<div class="row g-5">
              <div class="col-md-6">
                  <div class="row form-group pr-md-3 mt-3">
                    <label for="bank_account_type" class="required mb-1">Bank Account Type</label>
                    <select class="form-select"  id="bank_account_type" required>
                        <option value="Business Account">Business Account</option>
                        <option value="Personal Account">Personal Account</option>
                      </select>
                   </div>
                   </div>
              </div>
              <div class="col-md-6">
                  <div class="row form-group mt-3">
                    <label for="bank_name" class="required mb-1">Bank Name</label>
                    <input type="text" id="bank_name" class="form-control" required placeholder="Enter Bank Name"/>
                  </div>
              </div>
              </div>
              <div class="row g-5">
              <div class="col-md-6">
                  <div class="row form-group pr-md-3 mt-3">
                    <label for="account_holder_name" class="required mb-1">Account Holder Name</label>
                    <input type="text"id="account_holder_name" class="form-control" required placeholder="Enter Account Holder Name"/>
                  </div>
              </div>
              <div class="col-md-6">
                  <div class="row form-group mt-3">
                    <label for="account_number" class="required mb-1">Account Number</label>
                    <input type="text"  id="account_number" class="form-control" required placeholder="Enter Account Number"/>
                  </div>
              </div>
              </div>
              <div class="row g-5">
              <div class="col-md-6">
                  <div class="row form-group pr-md-3 mt-3">
                    <label for="routing_number" class="required mb-1">Routing Number</label>
                    <input type="text" id="routing_number" class="form-control" required placeholder="Enter Routing Number"/>
                  </div>
              </div>
              <div class="col-md-6">
                  <div class="row form-group mt-3">
                    <label for="account_type" class="required mb-1">Account Type</label>
                    <select class="form-select"  id="account_type" required>
                       <option value="C- Checking Account">C- Checking Account</option>
                       <option value="S- Savings Account">S- Savings Account</option>
                    </select>
                  </div>
              </div>
              </div>
               <div class="row g-5">
              <div class="col-md-6 px-2" style="margin-top: 62px !important">
                  <label for="phone_number" class="required mb-1">Phone Number</label>
                  <input id="phone_number" class="phone_number form-control"  type="tel" required placeholder="Enter Phone Number">
                  </div>
              <div class="col-md-6">
                  <div class="row form-group mt-3">
                    <label for="email_address" class="required mb-1">Email Address</label>
                    <input type="email"  id="un_email_address" class="form-control" required placeholder="Enter Email Address"/>
                  </div>
              </div>
              </div>
              <div class="row g-5">
              <div class="col-md-6">
                  <div class="row form-group pr-md-3 mt-3">
                    <label for="city" class="required mb-1">City</label>
                    <input type="text"  id="city" class="form-control" required placeholder="Enter City"/>
                  </div>
              </div>
              <div class="col-md-6">
                  <div class="row form-group mt-3">
                    <label for="state" class="required mb-1">State</label>
                    <input type="text"  id="state" class="form-control" required placeholder="Enter State"/>
                  </div>
              </div>
              </div>
              <div class="row g-5">
              <div class="col-md-6">
                  <div class="row form-group pr-md-3 mt-3">
                    <label for="zip_code" class="required mb-1">Zip Code</label>
                    <input type="text"  id="zip_code" class="form-control" required placeholder="Enter Zip Code"/>
                  </div>
              </div>
              <div class="col-md-6">
                  <div class="row form-group mt-3">
                    <label for="country" class="required mb-1">Country</label>
                    <select class="form-select" id="countryOption" required>

                    </select>
                  </div>
              </div>
              </div>
              <div class="row g-5">
              <div class="col-md-6">
                  <div class="row form-group pr-md-3 mt-3">
                    <label for="address" class="required">Address</label>
                    <textarea id="address" required class="form-control"></textarea>
                  </div>
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
            `<div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="bank_account_type" class="required mb-1">Bank Account Type</label>
                          <select class="form-select"  id="bank_account_type" required>
                              <option value="Business Account">Business Account</option>
                              <option value="Personal Account">Personal Account</option>
                          </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="bank_name" class="required mb-1">Bank Name</label>
                          <input type="text"  id="bank_name" class="form-control" required placeholder="Enter Bank Name"/>
                        </div>
                    </div>
                    </div>
                    <div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="account_holder_name" class="required mb-1">Account Holder Name</label>
                          <input type="text"  id="account_holder_name" class="form-control" required placeholder="Enter Account Holder Name"/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="account_number" class="required mb-1">Account Number</label>
                          <input type="text"  id="account_number" class="form-control" required placeholder="Enter Account Number"/>
                        </div>
                    </div>
                    </div>
                    <div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="branch_number" class="required mb-1">Branch Number</label>
                          <input type="text" id="branch_number" class="form-control" required placeholder="Enter Branch Number"/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="account_type" class="required mb-1">Account Type</label>
                          <select class="form-select"  id="account_type" required>
                            <option value="C- Checking Account">C- Checking Account</option>
                            <option value="S- Savings Account">S- Savings Account</option>
                          </select>
                        </div>
                    </div>
                    </div>
                    <div class="row g-5">
                    <div class="col-md-6 px-2" style="margin-top: 62px">
                        <label for="phone_number" class="required mb-1">Phone Number</label>
                        <input id="phone_number" class="phone_number"  type="tel" placeholder="Enter Phone Number"> 
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="email_address" class="required mb-1">Email Address</label>
                          <input type="email"  id="ca_email_address" class="form-control" required placeholder="Enter Email Address"/>
                        </div>
                    </div>
                    </div>
                    <div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="city" class="required mb-1">City</label>
                          <input type="text"  id="city" class="form-control" required placeholder="Enter City"/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="state" class="required mb-1">State</label>
                          <input type="text"  id="state" class="form-control" required placeholder="Enter Email State"/>
                        </div>
                    </div>
                    </div>
                    <div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="zip_code" class="required mb-1">Zip Code</label>
                          <input type="text"  id="zip_code" class="form-control" required placeholder="Enter Zip Code"/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="country" class="required mb-1">Country</label>
                          <select class="form-select" id="countryOption" required>
                            <CountryOption></CountryOption>
                          </select>
                        </div>
                    </div>
                    </div>
                    <div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="address" class="required mb-1">Address</label>
                          <textarea id="address" required class="form-control" placeholder="Enter Address"></textarea>
                        </div>
                    </div>
                    </div>
                </div>`
          );

          var CountryOption = document.querySelector("#all-Country-Option");
          var ShoCountryOption = document.querySelector("#countryOption");
          ShoCountryOption.innerHTML = CountryOption.innerHTML;
          // canada
          var input = document.querySelector("#phone_number");
          window.intlTelInput(input, {});

          // Handle flag container click
          $(".iti__flag-container").click(() => {
            var countryCode = $(".iti__selected-flag")
              .attr("title")
              .replace(/[^0-9]/g, "");
            input.val = "";
            input.value = countryCode + input.value;
          });
        } else if (
          $("#bank_location").val() == "Australia" ||
          $("#bank_location").val() == "Phillipines" ||
          $("#bank_location").val() == "Bangladesh"
        ) {
          $("#country").empty();
          $("#country").html(
            `<div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="bank_account_type" class="required mb-1">Bank Account Type</label>
                          <select class="form-select"  id="bank_account_type" required>
                              <option value="Business Account">Business Account</option>
                              <option value="Personal Account">Personal Account</option>
                          </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="bank_name" class="required mb-1">Bank Name</label>
                          <input type="text"  id="bank_name" class="form-control" required placeholder="Enter Bank Name"/>
                        </div>
                    </div>
                    </div>
                    <div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="account_holder_name" class="required mb-1">Account Holder Name</label>
                          <input type="text"  id="account_holder_name" class="form-control" required placeholder="Enter Account Holder Name"/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="account_number" class="required mb-1">Account Number</label>
                          <input type="text" id="account_number" class="form-control" required placeholder="Enter Account Number"/>
                        </div>
                    </div>
                    </div>
                    <div class="row g-5">
                    <div class="col-md-6 px-2" style="margin-top: 62px">
                        <label for="phone_number" class="required mb-1">Phone Number</label>
                        <input id="phone_number" class="phone_number" type="tel" placeholder="Enter Phone Number">
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="email_address" class="required mb-1">Email Address</label>
                          <input type="email"  id="ba_email_address" class="form-control" required placeholder="Enter Email Address"/>
                        </div>
                    </div>
                    </div>
                    <div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="city" class="required mb-1">City</label>
                          <input type="text" id="city" class="form-control" required placeholder="Enter City"/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="state" class="required mb-1">State</label>
                          <input type="text" id="state" class="form-control" required placeholder="Enter State"/>
                        </div>
                    </div>
                    </div>
                    <div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="zip_code" class="required mb-1">Zip Code</label>
                          <input type="text" id="zip_code" class="form-control" required placeholder="Enter Zip Code"/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="country" class="required mb-1">Country</label>
                          <select class="form-select" id="countryOption" required>
                            <CountryOption></CountryOption>
                          </select>
                        </div>
                    </div>
                    </div>
                    <div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="address" class="required mb-1">Address</label>
                          <textarea  id="address" required class="form-control" placeholder="Enter Address"></textarea>
                        </div>
                    </div>
                    </div>
                </div>`
          );

          var CountryOption = document.querySelector("#all-Country-Option");
          var ShoCountryOption = document.querySelector("#countryOption");
          ShoCountryOption.innerHTML = CountryOption.innerHTML;

          // Bangladesh
          var input = document.querySelector("#phone_number");
          window.intlTelInput(input, {});

          // Handle flag container click
          $(".iti__flag-container").click(() => {
            var countryCode = $(".iti__selected-flag")
              .attr("title")
              .replace(/[^0-9]/g, "");
            input.val = "";
            input.value = countryCode + input.value;
          });
        } else if ($("#bank_location").val() == "India") {
          $("#country").empty();
          $("#country").html(`
                <div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="bank_account_type" class="required mb-1">Bank Account Type</label>
                          <select class="form-select" id="bank_account_type" required>
                              <option value="Business Account">Business Account</option>
                              <option value="Personal Account">Personal Account</option>
                          </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="bank_name" class="required mb-1">Bank Name</label>
                          <input type="text" id="bank_name" class="form-control" required placeholder="Enter Bank Name"/>
                        </div>
                    </div>
                    </div>
                     <div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="account_holder_name" class="required mb-1">Account Holder Name</label>
                          <input type="text"  id="account_holder_name" class="form-control" required placeholder="Enter Account Holder Name"/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="account_number" class="required mb-1">Account Number</label>
                          <input type="text"  id="account_number" class="form-control" required placeholder="Enter Account Number"/>
                        </div>
                    </div>
                    </div>
                     <div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="swift_bic_code" class="required mb-1">SWIFT / BIC Number</label>
                          <input type="text" id="swift_bic_code" class="form-control"  placeholder="Enter SWIFT / BIC Number"/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="ifsc_code" class="required mb-1">IFSC</label>
                          <input type="text"  id="ifsc_code" class="form-control"  placeholder="Enter IFSC"/>
                        </div>
                    </div>
                    </div>
                     <div class="row g-5">
                    <div class="col-md-6 px-2" style="margin-top: 62px">
                      <label for="phone_number" class="required mb-1">Phone Number</label>
                      <input id="phone_number"  class="phone_number" type="tel" placeholder="Enter Phone Number">
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="email_address" class="required mb-1">Email Address</label>
                          <input type="email"  id="in_email_address" class="form-control" required placeholder="Enter Email Address"/>
                        </div>
                    </div>
                    </div>
                    <div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="city" class="required mb-1">City</label>
                          <input type="text"  id="city" class="form-control" required placeholder="Enter City"/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="state" class="required mb-1">State</label>
                          <input type="text"  id="state" class="form-control" required placeholder="Enter State"/>
                        </div>
                    </div>
                    </div>
                     <div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="zip_code" class="required mb-1">Zip Code</label>
                          <input type="text"  id="zip_code" class="form-control" required placeholder="Enter Zip Code"/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="country" class="required mb-1">Country</label>
                          <select class="form-select"  id="countryOption" required>
                            <CountryOption></CountryOption>
                          </select>
                        </div>
                    </div>
                    </div>
                     <div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="address" class="required mb-1">Address</label>
                          <textarea  id="address" required class="form-control" placeholder="Enter Address"></textarea>
                        </div>
                    </div>
                    </div>
                </div>
            `);

          var CountryOption = document.querySelector("#all-Country-Option");
          var ShoCountryOption = document.querySelector("#countryOption");
          ShoCountryOption.innerHTML = CountryOption.innerHTML;
          // India
          var input = document.querySelector("#phone_number");
          window.intlTelInput(input, {});

          // Handle flag container click
          $(".iti__flag-container").click(() => {
            var countryCode = $(".iti__selected-flag")
              .attr("title")
              .replace(/[^0-9]/g, "");
            input.val = "";
            input.value = countryCode + input.value;
          });
        } else if ($("#bank_location").val() == "United Kingdom") {
          $("#country").empty();
          $("#country").html(
            `<div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="bank_account_type" class="required mb-1">Bank Account Type</label>
                          <select class="form-select"  id="bank_account_type" required>
                              <option value="Business Account">Business Account</option>
                              <option value="Personal Account">Personal Account</option>
                          </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="bank_name" class="required mb-1">Bank Name</label>
                          <input type="text"  id="bank_name" class="form-control" required placeholder="Enter Bank Name"/>
                        </div>
                    </div>
                    </div>
                    <div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="account_holder_name" class="required mb-1">Account Holder Name</label>
                          <input type="text" id="account_holder_name" class="form-control" required placeholder="Enter Account Holder Name"/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="account_number" class="required mb-1">Account Number</label>
                          <input type="text"  id="account_number" class="form-control" required placeholder="Enter Account Number"/>
                        </div>
                    </div>
                    </div>
                    <div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="swift_bic_code" class="required mb-1">SWIFT / BIC Number</label>
                          <input type="text"  id="swift_bic_code" class="form-control"  placeholder="Enter SWIFT / BIC Number"/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="iban_code" class="required mb-1">IBAN Code</label>
                          <input  id="iban_code" class="form-control" required  placeholder="Enter IBAN Code"/>
                        </div>
                    </div>
                    </div>
                    <div class="row g-5">
                    <div class="col-md-6 px-2" style="margin-top: 62px">
                        <label for="phone_number" class="required mb-1">Phone Number</label>
                        <input id="phone_number" class="phone_number"  type="tel"  placeholder="Enter Phone Number">
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="email_address" class="required mb-1">Email Address</label>
                          <input type="email"  id="uk_email_address" class="form-control" required placeholder="Enter Email Address"/>
                        </div>
                    </div>
                    </div>
                    <div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="city" class="required mb-1">City</label>
                          <input type="text"  id="city" class="form-control" required placeholder="Enter City"/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="state" class="required mb-1">State</label>
                          <input type="text"  id="state" class="form-control" required placeholder="Enter State"/>
                        </div>
                    </div>
                    </div>
                    <div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="zip_code" class="required mb-1">Zip Code</label>
                          <input type="text"  id="zip_code" class="form-control" required placeholder="Enter Zip Code"/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="country" class="required mb-1">Country</label>
                          <select class="form-select"  id="countryOption" required>
                            <CountryOption></CountryOption>
                          </select>
                        </div>
                    </div>
                    </div>
                    <div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="address" class="required mb-1">Address</label>
                          <textarea  id="address" required class="form-control" placeholder="Enter Address"></textarea>
                        </div>
                    </div>
                    </div>
                </div>`
          );

          var CountryOption = document.querySelector("#all-Country-Option");
          var ShoCountryOption = document.querySelector("#countryOption");
          ShoCountryOption.innerHTML = CountryOption.innerHTML;
          // United Kingdom
          var input = document.querySelector("#phone_number");
          window.intlTelInput(input, {});

          // Handle flag container click
          $(".iti__flag-container").click(() => {
            var countryCode = $(".iti__selected-flag")
              .attr("title")
              .replace(/[^0-9]/g, "");
            input.val = "";
            input.value = countryCode + input.value;
          });
        } else if ($("#bank_location").val() == "Pakistan") {
          $("#country").empty();
          $("#country").html(
            `<div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="bank_account_type" class="required mb-1">Bank Account Type</label>
                          <select class="form-select"  id="bank_account_type" required>
                              <option value="Business Account">Business Account</option>
                              <option value="Personal Account">Personal Account</option>
                          </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="bank_name" class="required mb-1">Bank Name</label>
                          <input type="text"  id="bank_name" class="form-control" required placeholder="Enter Bank Name"/>
                        </div>
                    </div>
                    </div>
                    <div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="account_holder_name" class="required mb-1">Account Holder Name</label>
                          <input type="text"  id="account_holder_name" class="form-control" required placeholder="Enter Account Holder Name"/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="account_number" class="required mb-1">Account Number</label>
                          <input type="text"  id="account_number" class="form-control" required placeholder="Enter Account Number"/>
                        </div>
                    </div>
                    </div>
                    <div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="iban_code" class="required mb-1">IBAN Code</label>
                          <input  id="iban_code" class="form-control" required  placeholder="Enter IBAN Code"/>
                        </div>
                    </div>
                    <div class="col-md-6 px-2" style="margin-top: 62px">
                        <label for="phone_number" class="required mb-1">Phone Number</label>
                          <input id="phone_number" class="phone_number"  type="tel"  placeholder="Enter Phone Number">
                    </div>
                    </div>
                    <div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="email_address" class="required mb-1">Email Address</label>
                          <input type="email"  id="pk_email_address" class="form-control" required placeholder="Enter Address"/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="city" class="required mb-1">City</label>
                          <input type="text"  id="city" class="form-control" required placeholder="Enter City"/>
                        </div>
                    </div>
                    </div>
                    <div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="state" class="required mb-1">State</label>
                          <input type="text"  id="state" class="form-control" required placeholder="Enter State"/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="zip_code" class="required mb-1">Zip Code</label>
                          <input type="text"  id="zip_code" class="form-control" required placeholder="Enter Zip Code"/>
                        </div>
                    </div>
                    </div>
                    <div class="row g-5">
                    <div class="col-md-6">
                        <div class="row form-group pr-md-3 mt-3">
                          <label for="country" class="required mb-1">Country</label>
                          <select class="form-select" id="countryOption" required>
                            <CountryOption></CountryOption>
                          </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row form-group mt-3">
                          <label for="address" class="required mb-1">Address</label>
                          <textarea  id="address" required class="form-control" placeholder="Enter Address"></textarea>
                        </div>
                    </div>
                    </div>
                </div>`
          );

          var CountryOption = document.querySelector("#all-Country-Option");
          var ShoCountryOption = document.querySelector("#countryOption");
          ShoCountryOption.innerHTML = CountryOption.innerHTML;
          // Pakistan
          var input = document.querySelector("#phone_number");
          window.intlTelInput(input, {});

          // Handle flag container click
          $(".iti__flag-container").click(() => {
            var countryCode = $(".iti__selected-flag")
              .attr("title")
              .replace(/[^0-9]/g, "");
            input.val = "";
            input.value = countryCode + input.value;
          });
        } else {
          $("#country").empty();
          $("#country").html(
            `<div class="row g-5">
                  <div class="col-md-6">
                      <div class="row form-group pr-md-3 mt-3">
                        <label for="bank_account_type" class="required mb-1">Bank Account Type</label>
                          <select class="form-select"  id="bank_account_type" required>
                              <option value="Business Account">Business Account</option>
                              <option value="Personal Account">Personal Account</option>
                          </select>
                      </div>
                  </div>
                  <div class="col-md-6">
                      <div class="row form-group mt-3">
                        <label for="bank_name" class="required mb-1">Bank Name</label>
                          <input type="text"  id="bank_name" class="form-control" required placeholder="Enter Bank Name"/>
                      </div>
                  </div>
                  </div>
                  <div class="row g-5">
                  <div class="col-md-6">
                      <div class="row form-group pr-md-3 mt-3">
                        <label for="account_holder_name" class="required mb-1">Account Holder Name</label>
                          <input type="text"  id="account_holder_name" class="form-control" required placeholder="Enter Account Holder Name"/>
                      </div>
                  </div>
                  <div class="col-md-6">
                      <div class="row form-group mt-3">
                        <label for="account_number" class="required mb-1">Account Number</label>
                          <input type="text"  id="account_number" class="form-control" required placeholder="Enter Account Number"/>
                      </div>
                  </div>
                  </div>
                  <div class="row g-5">
                  <div class="col-md-6">
                      <div class="row form-group pr-md-3 mt-3">
                        <label for="routing_number" class="required mb-1">Routing Number</label>
                        <input  id="routing_number" class="form-control"  required  placeholder="Enter Routing Number"/>
                      </div>
                  </div>
                  <div class="col-md-6">
                      <div class="row form-group mt-3">
                        <label for="swift_bic_code" class="required mb-1">SWIFT / BIC Number</label>
                          <input type="text"  id="swift_bic_code" class="form-control"  placeholder="Enter SWIFT / BIC Number"/>
                      </div>
                  </div>
                  </div>
                  <div class="row g-5">
                  <div class="col-md-6">
                      <div class="row form-group pr-md-3 mt-3">
                        <label for="iban_code" class="required mb-1">IBAN</label>
                        <input  id="iban_code" class="form-control" required  placeholder="Enter IBAN"/>
                      </div>
                  </div>
                  <div class="col-md-6 px-2" style="margin-top: 62px">
                      <label for="phone_number" class="required mb-1">Phone Number</label>
                          <input id="phone_number" class="phone_number"  type="tel" placeholder="Enter Phone Number">
                  </div>
                  </div>
                  <div class="row g-5">
                  <div class="col-md-6">
                      <div class="row form-group pr-md-3 mt-3">
                        <label for="email_address" class="required mb-1">Email Address</label>
                          <input type="email" id="el_email_address" class="form-control" required placeholder="Enter Email Address"/>
                      </div>
                  </div>
                  <div class="col-md-6">
                      <div class="row form-group mt-3">
                        <label for="city" class="required mb-1">City</label>
                          <input type="text"  id="city" class="form-control" required placeholder="Enter City"/>
                      </div>
                  </div>
                  </div>
                  <div class="row g-5">
                  <div class="col-md-6">
                      <div class="row form-group pr-md-3 mt-3">
                        <label for="state" class="required mb-1">State</label>
                          <input type="text"  id="state" class="form-control" required placeholder="Enter State"/>
                      </div>
                  </div>
                  <div class="col-md-6">
                      <div class="row form-group mt-3">
                        <label for="zip_code" class="required mb-1">Zip Code</label>
                          <input type="text"  id="zip_code" class="form-control" required placeholder="Enter Zip Code"/>
                      </div>
                  </div>
                  </div>
                  <div class="row g-5">
                  <div class="col-md-6">
                      <div class="row form-group pr-md-3 mt-3">
                        <label for="country" class="required mb-1">Country</label>
                          <select class="form-select"  id="countryOption" required>
                            <CountryOption></CountryOption>
                          </select>
                      </div>
                  </div>
                  <div class="col-md-6">
                      <div class="row form-group mt-3">
                        <label for="address" class="required mb-1">Address</label>
                          <textarea  id="address" required class="form-control" placeholder="Enter Address"></textarea>
                      </div>
                  </div>
                  </div>
              </div>`
          );

          var CountryOption = document.querySelector("#all-Country-Option");
          var ShoCountryOption = document.querySelector("#countryOption");
          ShoCountryOption.innerHTML = CountryOption.innerHTML;
          // Others
          var input = document.querySelector("#phone_number");
          window.intlTelInput(input, {});

          // Handle flag container click
          $(".iti__flag-container").click(() => {
            var countryCode = $(".iti__selected-flag")
              .attr("title")
              .replace(/[^0-9]/g, "");
            input.val = "";
            input.value = countryCode + input.value;
          });
        }
      });
    },
  },
};
</script>

<style>
input.phone_number {
  padding-left: 52px !important;
  padding: 0.25rem 0.5rem;
  width: 100%;
  border: 1px solid;
  border-color: #ccc;
  border-radius: 3px;
  font-size: 14px;
}
input.phone_number:focus {
  color: #4d5875;
  background-color: #fff;
  border-color: #b3c6ff;
  outline: 0;
  box-shadow: none;
}
.iti.iti--allow-dropdown {
  width: 100%;
}
::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: var(--primary-color);
  opacity: 1; /* Firefox */
  font-size: 12px !important;
}

:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: var(--primary-color);
  font-size: 12px !important;
}

::-ms-input-placeholder {
  /* Microsoft Edge */
  color: var(--primary-color);
  font-size: 12px !important;
}
</style>
