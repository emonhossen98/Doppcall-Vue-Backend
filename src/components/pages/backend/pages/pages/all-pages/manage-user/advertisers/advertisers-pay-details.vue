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
              <div class="card-header py-2">
                <h5 class="card-title mb-1">Filter</h5>
              </div>
              <div class="card-body mt-3 border-bottom">
                <form>
                  <div class="row align-items-center">
                    <div class="col-md-4 mb-3 mb-md-0">
                      <select @change="serachGetData()" v-model="serachData.action_type"class="form-select select2-hide ">
                        <option value="">Action Type</option>
                        <option value="withdraw">Withdraw</option>
                        <option value="deposit">Deposit</option>
                      </select>
                    </div>
                    <div class="col-md-4 mb-3 mb-md-0">
                      <select @change="serachGetData()" v-model="serachData.payment_method"class="form-select select2-hide ">
                        <option value="">Payment Method</option>
                        <option value="1">Paid By Bank Transger</option>
                        <option value="2">Paid By Credit Card</option>
                        <option value="3">Other</option>
                        <option value="4">Payneer</option>
                      </select>
                    </div>
                    <div class="col-md-4 mb-3 mb-md-0">
                      <select @change="serachGetData()" v-model="serachData.status"class="form-select select2-hide ">
                        <option value="">Select Status</option>
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>
              <div class="card-header py-2">
                <h5 class="card-title d-flex align-items-center justify-content-between">
                  Payment History
                  <button v-if="shouldShowPaymentButton" title="Payment" class="btn btn-primary payment-btn btn-sm"  data-bs-toggle="modal" data-bs-target="#addPaymentModal">
                    Add Payment
                  </button>
                </h5>
              </div>
              <div class="card-body px-4 pt-1 table-responsive table-overflow-hidden">
                <table class="table">
                  <thead>
                    <th>SL</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Date</th>
                    <th>Description</th>
                    <th v-if="!isAdvertiserPaymentHistory">Deposit</th>
                    <th v-if="!isAdvertiserPaymentHistory">Withdraw</th>
                    <th v-if="isAdvertiserPaymentHistory">Due Amount</th>
                    <th v-if="isAdvertiserPaymentHistory">Paid</th>
                    <th>Balance</th>
                    <th>Payment Status</th>
                    <th>Action</th>
                  </thead>
                  <tbody>
                    <tr v-for="(value, index) in publisherPayData" :key="index">
                      <td>{{ index + 1 }}</td>
                      <td>{{ value.user.fname + " " + value.user.lname }}</td>
                      <td>{{ value.user.email }}</td>
                      <td>{{ formatDate(value.created_at) }}</td>
                      <td>{{ value.description || "--" }}</td>
                      <td v-if="!isAdvertiserPaymentHistory">
                        {{ value.deposit || "0.00" }}
                      </td>
                      <td v-if="!isAdvertiserPaymentHistory">
                        {{ value.withdraw || "0.00" }}
                      </td>
                      <td v-if="isAdvertiserPaymentHistory">
                        {{ value.deposit || "0.00" }}
                      </td>
                      <td v-if="isAdvertiserPaymentHistory">
                        {{ value.withdraw || "0.00" }}
                      </td>
                      <td>{{ value.balance || "0.00" }}</td>
                      {{ calculateTotalPaidAmount(index) }}
                      {{ calculateTotalPendingAmount(index) }}
                      <td>
                        <span :class="getStatusBadgeClass(value.status)">
                          {{ value.status }}
                        </span>
                      </td>
                      <td>
                        <div v-if="isAdminPaymentHistory" class="dropdown">
                          <button  class="btn border-0 bg-transparent" type="button"id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                          </button>
                          <div class="dropdown-menu tx-13">
                            <button @click="withdrawPayment(value.user_id)" data-bs-toggle="modal" data-bs-target="#addPaymentModal" class="dropdown-item align-items-center"  data-placement="top"  title="Withdraw Payment"
                            >
                              <i class="fas fa-shopping-basket fa-sm text-warning"></i> Withdraw
                            </button>
  
                            <RouterLink
                              :to="'/admin-pay-details/' + value.id"
                              data-placement="top"
                              title="View"
                              target="_blank"
                              class="dropdown-item align-items-center text-primary"
                            >
                              <i class="fas fa-eye"></i> View</RouterLink
                            >
  
                            <button
                              v-if="value.status === 'Paid'"
                              @click="changePaymentStatus(value.id, 'Pending')"
                              class="dropdown-item align-items-center"
                              data-placement="top"
                              title="Payment Status (Pending)"
                            >
                              <i class="fas fa-times fa-sm text-danger"></i> Pending
                            </button>
  
                            <button
                              v-else
                              @click="changePaymentStatus(value.id, 'Paid')"
                              class="dropdown-item align-items-center"
                              data-placement="top"
                              title="Payment Status (Paid)"
                            >
                              <i class="fas fa-check fa-sm text-success"></i> Paid
                            </button>
                          </div>
                        </div>
                        <a
                          v-else-if="isPublisherPaymentHistory"
                          :href="'publisher/payment-history/details/' + value.id"
                          target="_blank"
                          class="rounded-circle btn-style-info align-items-center"
                        >
                          <i class="fas fa-eye"></i>
                        </a>
                        <RouterLink
                          v-else-if="isAdvertiserPaymentHistory"
                          :to="'/admin-manage-advertiser-view/' + value.id"
                          target="_blank"
                          class="rounded-circle btn-style-info align-items-center"
                        >
                          <i class="fas fa-eye"></i
                        ></RouterLink>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <strong
                          >Total Paid =
                          {{
                            totalShowPaidAmounts ?? '0.00'
                          }}</strong
                        >
                      </td>
                      <td>
                        <strong
                          >Total Pending =
                          {{ totalShowPendingAmounts ?? '0.00' }}</strong
                        >
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
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
                <div class="row mt-3">
                  <div class="col-md-6">
                      <div class="form-group">
                          <label for="payment_date" class="required mb-1">Payment Date</label>
                          <input type="date" v-model="advertisherDepositeData.payment_date" id="payment_date" class="form-control" required>
                          <div v-if="validationErrors &&  validationErrors.payment_date" class="text-danger">
                              {{ validationErrors.payment_date[0] }}
                          </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                          <label for="invoice_date" class="required mb-1">Invoice Date</label>
                          <input type="date" v-model="advertisherDepositeData.invoice_date" id="invoice_date" class="form-control" required>
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
                          <input type="date" v-model="advertisherDepositeData.date_range" id="date_range" class="form-control" required>
                          <div v-if="validationErrors &&  validationErrors.date_range" class="text-danger">
                              {{ validationErrors.date_range[0] }}
                          </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                          <label for="offer" class="required mb-1">Offer</label>
                          <select v-model="advertisherDepositeData.offer" id="offer" class="form-select">
                          <option value="">Select Offer</option>
                          <option v-for="(offer,index) in getAllAdvertisherOffers" :value="offer.name" :key="index">{{ offer.name }}</option>
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
                          <input type="text" v-model="advertisherDepositeData.company_name" id="company_name" class="form-control" required placeholder="Enter Company Name">
                          <div v-if="validationErrors &&  validationErrors.company_name" class="text-danger">
                              {{ validationErrors.company_name[0] }}
                          </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                          <label for="user_name" class="required">Name</label>
                          <input type="text" v-model="advertisherDepositeData.user_name" id="user_name" class="form-control">
                          <div v-if="validationErrors && validationErrors.user_name" class="text-danger">
                                {{ validationErrors.user_name[0] }}
                          </div>
                        </div>
                    </div>
                </div>

                <div class="row mt-3">
                  <div class="col-md-6">
                      <div class="form-group">
                          <label for="calls" class="mb-1">Calls</label>
                          <input type="text" v-model="advertisherDepositeData.calls" id="calls" class="form-control" placeholder="Enter Calls">
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                          <label for="amount" class="required mb-1">Amount</label>
                          <input type="number" v-model="advertisherDepositeData.amount" id="amount" class="form-control" required placeholder="Enter Amount">
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
                          <textarea v-model="advertisherDepositeData.note_for_admin" id="note_for_admin" cols="60" rows="3" class="form-control" placeholder="Enter Note For Admin"></textarea>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                          <label for="note_for_user" class="mb-1">Note for User</label><br>
                          <textarea v-model="advertisherDepositeData.note_for_user" id="note_for_user" cols="60" rows="3" class="form-control" placeholder="Enter Note For User"></textarea>
                      </div>
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col-md-6">
                      <div class="form-group">
                          <label for="type" class="mb-1">Type</label>
                          <select v-model="advertisherDepositeData.type" id="type" class="form-select">
                              <option value="">Select Type</option>
                              <option value="Postpaid">Post Paid</option>
                              <option value="Prepaid">Pre Paid</option>
                          </select>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                          <label for="payment_method" class="required mb-1">Payment Method</label>
                          <select v-model="advertisherDepositeData.payment_method" id="payment_method" required class="form-select">
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
                          <select v-model="advertisherDepositeData.status" id="status" required class="form-select">
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
                          <textarea v-model="advertisherDepositeData.note" id="note" cols="30" rows="3" placeholder="Send a note...." class="form-control"></textarea>
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
      <!-- / Content -->
      <div class="content-backdrop fade"></div>
    </div>
    <!-- Content wrapper -->
</template>
  
  <script>
  import axios from "axios";
  import moment from "moment";
  import { reactive } from 'vue';
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
    components: {
    Loader,
    Breadcrumb,
    },
    data() {
      return {
        getLoader: false,
        breadcrumbs: [
            { label: "Dashboard", url: "/dashboard" },
            { label: "Advertisers Payment History ", url: "" },
        ],
        publisherPayData: {},
        dropdownOpenIndex: null,
        totalShowPaidAmounts: reactive([]),
        totalShowPendingAmounts: reactive([]),
        getAllAdvertisherOffers : {},
        showModal: false,
        depositButtonActive : true,
        withdrawButtonActive : false,
        advertisherDepositeData : {
            payment_name : "deposit",
            user_id : "",
            update_data : "update_data",
            payment_date : "",
            invoice_date : "",
            date_range : "",
            offer : "",
            company_name : "",
            user_name : "",
            calls : "",
            amount : "",
            type : "",
            note_for_user : "",
            note_for_admin : "",
            payment_method : "",
            status : "",
            note : "",
        },
        validationErrors : null,
        changePaymentsStatus : {
          data_id : "",
          status : "",
        },
        serachData :{
          user_id : "",
          action_type : "",
          payment_method : "",
          status : "",
      },
      };
    },
    computed: {
      shouldShowPaymentButton() {
        return !this.$route.path.match(
          /\/(publisher|advertiser)\/payment-history(|\/details.*)$/
        );
      },
      isAdminPaymentHistory() {
        return this.$route.path.includes("admin-manage-publishers-pay-details") || this.$route.path.includes("admin-manage-advertiser-pay-details");
      },
      isPublisherPaymentHistory() {
        return this.$route.path.includes("publisher/payment-history");
      },
      isAdvertiserPaymentHistory() {
        return this.$route.path.includes("advertiser/payment-history");
      },
      totalPendingAmount() {
        if (!this.paymentHistory) return 0;
        return this.paymentHistory.reduce(
          (total, value) => total + (parseFloat(value.withdraw) || 0),
          0
        );
      },
    },
    async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role == 'Super' || role == 'Admin') {
          this.getPayDetailsData();
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    },
    methods: {
      serachGetData(){
        this.getLoader = true;
        if(this.serachData.action_type === "" && this.serachData.payment_method === "" && this.serachData.status === ""){
          this.getPayDetailsData();
        }else{
          axios
          .post(
            this.globalVariables.apiUrl+`admin/payment/history/search/data`,this.serachData,
            { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
          )
          .then((res) => {
            this.publisherPayData = res.data.paymentHistory;
            this.advertisherDepositeData.user_id = res.data.user_id;
            this.advertisherDepositeData.payment_name = 'deposit';
            this.advertisherDepositeData.update_data = 'update_data';
            this.getAllAdvertisherOffers = res.data.offers;
            this.totalShowPaidAmounts = "0.00";
            this.totalShowPendingAmounts = "0.00";
          })
          .catch((e) => {
            console.error(e);
          })
          .finally(() => {
            this.getLoader = false;
          });
      }
    },

      // Added Deposit Value 
      AddedDepositeValue(){
             this.getLoader = true;
            axios
            .post(this.globalVariables.apiUrl+"admin/payment/publisher/deposit/store", this.advertisherDepositeData, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {  
                if(res.data.status == 'success'){
                    this.clearFormData();
                    this.validationErrors = null;
                    toastr.success(res.data.message);
                    location.reload();
                }else if(res.data.status == 'error'){
                  toastr.error(res.data.message);
                }else if(res.data.status == 'warning'){
                  this.clearFormData();
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
      clearFormData() {
          for (let key in this.advertisherDepositeData) {
            this.advertisherDepositeData[key] = '';
          }
      },
      calculateTotalPaidAmount(index) {
        let totalPaidAmount = 0;
        this.publisherPayData.slice(0, index + 1).forEach(item => {
          totalPaidAmount += parseFloat(item.deposit) || 0;
        });
        this.totalShowPaidAmounts = totalPaidAmount.toFixed(2); // Update the array
      },
      calculateTotalPendingAmount(index) {
        let totalPendingAmount = 0;
        this.publisherPayData.slice(0, index + 1).forEach(item => {
          totalPendingAmount += parseFloat(item.withdraw) || 0;
        });
        this.totalShowPendingAmounts = totalPendingAmount.toFixed(2); // Update the array
      },
      getPayDetailsData() {
        this.getLoader = true;
        axios
          .get(
            this.globalVariables.apiUrl+`admin/payment/history/${this.$route.params.id}`,
            { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
          )
          .then((res) => {
            this.serachData.user_id = res.data.user_id;
            this.publisherPayData = res.data.paymentHistory;
            this.advertisherDepositeData.user_id = res.data.user_id;
            this.advertisherDepositeData.payment_name = 'deposit';
            this.advertisherDepositeData.update_data = 'update_data';
            this.getAllAdvertisherOffers = res.data.offers;
          })
          .catch((e) => {
            console.error(e);
          })
          .finally(() => {
            this.getLoader = false;
          });
      },
      formatDate(date) {
        return moment(date).format("DD-MMM-YYYY");
      },
      getStatusBadgeClass(status) {
        return {
          "badge bg-success": status === "Paid",
          "badge bg-danger": status !== "Paid",
        };
      },
      withdrawPayment(id) {
        this.depositButtonActive = false;
        this.withdrawButtonActive = true,
        this.showModal = true;
        this.advertisherDepositeData.payment_name = 'withdraw';
        this.advertisherDepositeData.user_id = id;
      },
      changePaymentStatus(id, newStatus) {
        if(newStatus == 'Paid'){
          this.changePaymentsStatus.data_id = id;
          this.changePaymentsStatus.status = newStatus;
          var title = 'Want To Paid';
          this.submitPaymentStatus(title);
        }else{
          this.changePaymentsStatus.data_id = id;
          this.changePaymentsStatus.status = newStatus;
          var title = 'Want To Pending';
          this.submitPaymentStatus(title);
        }
      },
      submitPaymentStatus(title){
        Swal.fire({
        text: title,
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.value) {
          this.getLoader =  true;
          axios
            .post(this.globalVariables.apiUrl+"admin/payment/history/status", this.changePaymentsStatus, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((res) => {
              console.log(res.data);
              if(res.data.status == 'success'){
              toastr.success('Payment Status Change');
              this.getPayDetailsData();
              }else{
                toastr.error('Error');
              }
            })
            .catch((e) => {
              return e;
            })
            .finally(() => {
              this.getLoader =  false;
            });
        } 
      });
      },
      // Change Payment Type
      changePaymentType(type){
        if (type === 'withdraw') {
          this.depositButtonActive = false;
          this.withdrawButtonActive = true;
          this.advertisherDepositeData.payment_name = 'withdraw';
        } else {
          this.depositButtonActive = true;
          this.withdrawButtonActive = false;
          this.advertisherDepositeData.payment_name = 'deposit';
        }
      }
    },
  };
  </script>