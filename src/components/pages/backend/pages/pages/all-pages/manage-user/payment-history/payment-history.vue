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
            <div class="col-md-8 col-12 mx-auto">
                <div class="card">
                    <div class="card-header py-2">
                    <h5 class="card-title d-flex align-items-center justify-content-between mt-3">
                    Payment History

                    <button v-if="showModelInRole == 3" title="Payment" class="btn btn-primary payment-btn btn-sm" data-bs-toggle="modal"  data-bs-target="#depositeModal"> Add Payment </button>

                    <button v-if="showModelInRole == 2" title="Payment" class="btn btn-primary payment-btn btn-sm" data-bs-toggle="modal"  data-bs-target="#addPaymentModalAdvertisher"> Add Payment </button>

                    </h5>
                </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12 mb-3 mb-md-0">
                                <div class="mb-0 rounded-0">
                                    <div class="p-0">
                                        <table class="table table-sm mb-0">
                                             <tbody>
                                                <tr>
                                                    <td class="pl-0"><h5 class="card-title">Payment Date:</h5></td>
                                                    <td class="text-end"><h5 class="card-title">{{ adminPayData.convartInvDate }}</h5></td>
                                                </tr>
                                                <tr v-if="adminPayDetails && adminPayDetails.user && adminPayDetails.user.role_id == 2">
                                                    <td class="pl-0"><h5 class="card-title">Invoice Date:</h5></td>
                                                    <td class="text-end"><h5 class="card-title">{{ adminPayData.convartPayDate }}</h5></td>
                                                </tr>
                                                <tr>
                                                    <td class="pl-0"><h5 class="card-title">Date Range:</h5></td>
                                                    <td class="text-end"><h5 class="card-title">{{ adminPayDetails.date_range }}</h5></td>
                                                </tr>
                                                <tr v-if="adminPayDetails && adminPayDetails.user && adminPayDetails.user.role_id == 2">
                                                    <td class="pl-0"><h5 class="card-title">Offer:</h5></td>
                                                    <td class="text-end"><h5 class="card-title">{{adminPayDetails.offer }}</h5></td>
                                                </tr>
                                                <tr v-if="adminPayDetails && adminPayDetails.user && adminPayDetails.user.role_id == 2">
                                                    <td class="pl-0"><h5 class="card-title">Company Name:</h5></td>
                                                    <td class="text-end"><h5 class="card-title">{{adminPayDetails.company }}</h5></td>
                                                </tr>
                                                <tr v-if="adminPayDetails && adminPayDetails.user && adminPayDetails.user.role_id == 2">
                                                    <td class="pl-0"><h5 class="card-title">Buyer:</h5></td>
                                                    <td class="text-end"><h5 class="card-title">{{adminPayDetails.user.fname }}</h5></td>
                                                </tr>
                                                <tr>
                                                    <td class="pl-0"><h5 class="card-title">Calls:</h5></td>
                                                    <td class="text-end"><h5 class="card-title">{{adminPayDetails.calls }}</h5></td>
                                                </tr>
                                                <tr>
                                                    <td class="pl-0"><h5 class="card-title">Amount:</h5></td>
                                                    <td class="text-end"><h5 class="card-title">{{adminPayDetails.amount ?? '0.00' }} USD</h5></td>
                                                </tr>
                                                <tr>
                                                    <td class="pl-0"><h5 class="card-title">Payment Method:</h5></td>
                                                    <td>
                                                        <h5 v-if="adminPayDetails.payment_method == 1" class="card-title text-end">Paid By Bank Transfer</h5>
                                                        <h5 v-else-if="adminPayDetails.payment_method == 2" class="card-title text-end">Paid By Credit Card</h5>
                                                        <h5 v-else-if="adminPayDetails.payment_method == 3" class="card-title text-end">Other</h5>
                                                        <h5 v-else class="card-title text-end">Payoneer</h5>

                                                    </td>
                                                </tr>
                                                <tr  v-if="adminPayDetails && adminPayDetails.user && adminPayDetails.user.role_id == 3">
                                                    <td class="pl-0"><h5 class="card-title">Payoneer Email:</h5></td>
                                                    <td><h5 class="card-title text-end">{{ adminPayDetails.p_payoneer_email ?? '--' }}</h5></td>
                                                </tr>
                                                <tr>
                                                    <td class="pl-0"><h5 class="card-title">Payment Method Note:</h5></td>
                                                    <td><p class="mb-0 text-end">{{ adminPayDetails.description ?? '--' }}</p></td>
                                                </tr>
                                                <tr v-if="adminPayDetails && adminPayDetails.user && adminPayDetails.user.role_id == 2">
                                                    <td class="pl-0"><h5 class="card-title">Type:</h5></td>
                                                    <td><h5 class="card-title text-end">{{ adminPayDetails.type }}</h5></td>
                                                </tr>
                                                <tr v-if="adminPayDetails && adminPayDetails.user && adminPayDetails.user.role_id == 2">
                                                    <td class="pl-0"><h5 class="card-title">Note For User:</h5></td>
                                                    <td><h5 class="card-title text-end">{{ adminPayDetails.note_for_user ?? '--' }}</h5></td>
                                                </tr>
                                                    <tr v-if="shouldShowPaymentButton">
                                                        <td class="pl-0"><h5 class="card-title">Note For Admin:</h5></td>
                                                        <td><h5 class="card-title text-end">{{ adminPayDetails.note_for_admin ?? '--' }}</h5></td>
                                                    </tr>
                                                <tr>
                                                    <td class="pl-0"><h5 class="card-title">Status:</h5></td>
                                                    <td  class="text-end" v-if="adminPayDetails.status == 'Paid'"><span class="badge bg-success">Paid</span></td>
                                                    <td class="text-end" v-else><span class="badge bg-danger">Pending</span></td>
                                                </tr>
                                                
                                                <tr v-if="adminPayDetails && adminPayDetails.user && adminPayDetails.user.role_id == 3">
                                                    <td class="pl-0"><h5 class="card-title">Upload File:</h5></td>
                                                    <td class="text-end">
                                                        <h5 class="mb-0 card-title">
                                                            <a v-if="adminPayDetails.p_file" :href="globalVariables.appUrl+adminPayDetails.p_file" :download="globalVariables.appUrl+adminPayDetails.p_file">
                                                                Download
                                                            </a>
                                                            <a v-else href="javascript:" @click="noDownloadItem">
                                                                Download
                                                            </a>
                                                        </h5>
                                                    </td>
                                                </tr>
                                            </tbody> 
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

  <!-- Large Modal -->
  <div v-if="showModelInRole == 3" class="modal fade" id="depositeModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
            <div class="d-flex align-items-center w-100 payment-type">
                <button type="button" id="deposit-button" :class="{ active: depositButtonActive }" @click="changePaymentType('deposit')" class="btn btn-outline deposit w-50 rounded-0 btn-md py-2" data-name="deposit">Add Balance</button>
                <button type="button" id="withdraw-button" :class="{ active: withdrawButtonActive }" @click="changePaymentType('withdraw')" class="btn btn-outline withdraw w-50 rounded-0 py-2" data-name="withdraw">Withdraw</button>
                </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <div class="row mt-3">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="payment_date"   class="required mb-1">Payment Date</label>
                        <input type="date" v-model="advertisherDepositeData.payment_date" id="payment_date" class="form-control" required placeholder="Enter Payment Date">
                        <div v-if="validationErrors && validationErrors.payment_date" class="text-danger">
                            {{ validationErrors.payment_date[0] }}
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="date_range"  class="required mb-1">Date Range</label>
                        <input type="text" v-model="advertisherDepositeData.date_range" id="date_range" class="form-control" required placeholder="Enter Date Range">
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
                        <input type="file"  @change="handleImageUpload()" class="form-control" id="upload_file"/>
                    </div>
                </div>
            </div>

            <div class="row mt-3">
                <div class="col-md-6">
                    <div class="form-group">
                    <label for="calls" class="mb-1">Total Billable Calls</label>
                    <input type="text" v-model="advertisherDepositeData.calls" id="calls" class="form-control" required placeholder="Enter Total Billable Calls"/>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                    <label for="amount"  class="required mb-1">Amount</label>
                    <input type="number" v-model="advertisherDepositeData.amount" required id="amount" class="form-control" placeholder="Enter Amount">
                        <div v-if="validationErrors &&  validationErrors.amount" class="text-danger">
                            {{ validationErrors.amount[0] }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-3">
                    <div class="col-md-12">
                        <div class="form-group">
                        <label for="note_for_admin" class="mb-1">Note for admin</label><br>
                        <textarea v-model="advertisherDepositeData.note_for_admin" id="note_for_admin" cols="60" rows="3" class="form-control" placeholder="Enter Admin Note"></textarea>
                        </div>
                    </div>
                </div>


            <div class="row mt-3">
            <div class="col-md-6">
                <div class="form-group">
                    <label for="payment_method"  class="required mb-1">Payment Method</label>
                    <select v-model="advertisherDepositeData.payment_method" id="payment_method" required class="form-select">
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
                    <label for="status"  class="required mb-1">Status</label>
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
                
            </div>
            <div class="form-group note-textarea mt-3">
                <label for="note" class="mb-1">Payment Method Note (optional)</label><br>
                <textarea v-model="advertisherDepositeData.note" id="note" cols="30" rows="3" placeholder="Send a note...." class="form-control"></textarea>
            </div>

            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">
                Close
            </button>
            <button @click="AddedDepositeValue()"  type="button" class="btn btn-primary"><i class="fas fa-check fa-sm me-2"></i> Confirm</button>
            </div>
        </div>
        </div>
    </div>


 <!-- Large Modal -->
 <div  v-if="showModelInRole == 2" class="modal fade" id="addPaymentModalAdvertisher" tabindex="-1" aria-hidden="true">
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
            { label: "Payment History ", url: "" },
        ],
        showModelInRole : "",
        getAllAdvertisherOffers : {},
        adminPayDetails: {},
        adminPayData : {},
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
            upload_file : "",
        },
        validationErrors : null,
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
      handleImageUpload(event) {
      this.advertisherDepositeData.upload_file = event.target.files[0];
    },
      // Added Deposit Value 
      AddedDepositeValue(){
        this.getLoader  = true;
            axios
            .post(this.globalVariables.apiUrl+"admin/payment/publisher/deposit/store", this.advertisherDepositeData, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {  
                if(res.data.status == 'success'){
                    this.validationErrors = null;
                    toastr.success(res.data.message);
                    if(this.showModelInRole == 2){
                      this.$router.push("/admin-manage-advertiser-pay-details/"+this.advertisherDepositeData.user_id);
                    }else{
                      this.$router.push("/admin-manage-publishers-pay-details/"+this.advertisherDepositeData.user_id);
                    }
                }else if (res.data.status == 'error'){
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
      getPayDetailsData() {
        this.getLoader = true;
        axios
          .get(
            this.globalVariables.apiUrl+`admin/payment/history/details/${this.$route.params.id}`,
            { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
          )
          .then((res) => {
            this.adminPayData = res.data;
            this.adminPayDetails = res.data.history;
            this.getAllAdvertisherOffers = res.data.offers;
            this.advertisherDepositeData.user_id = res.data.history.user_id;
            this.advertisherDepositeData.payment_name = 'deposit';
            this.advertisherDepositeData.update_data = 'update_data';
            this.advertisherDepositeData.user_name = res.data.history.user.fname;
            this.showModelInRole = res.data.history.user.role_id;
          })
          .catch((e) => {
            console.error(e);
          })
          .finally(() => {
            this.getLoader = false;
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
    },
    noDownloadItem(){
      toastr.warning('Download file not found.')
    }
    },
  };
  </script>