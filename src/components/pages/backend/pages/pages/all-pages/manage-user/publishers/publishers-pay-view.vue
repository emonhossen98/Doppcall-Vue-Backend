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
            <div class="card-header py-3">
              <h5 class="card-title d-flex justify-content-between align-items-center publisher_message_title mt-2">
                <template v-if="company_name">{{ company_name }}</template>
                <template v-else>{{ publisherViewData.fname }}{{ " - Publisher Details" }}</template>
                <div class="d-flex" id="message_btn">
                  <button type="button"  data-bs-toggle="modal" data-bs-target="#publisherDepositeModal" title="Payment" class="me-1 btn-sm btn btn-primary payment-btn">
                    <i class="fa-solid fa-plus me-1"></i>Payment
                  </button>
                  <RouterLink :to="'/admin-manage-publishers-edit/' + publisherViewData.id" class="me-1 btn-sm btn btn-info mx-2"
                    ><i class="far fa-edit me-1"></i> Edit</RouterLink>
                  <button @click="deltePublisher(publisherViewData.id)" class="me-1 btn btn-sm btn-danger">
                    <i class="far fa-trash-alt me-1"></i> Delete
                  </button>
                </div>
              </h5>
            </div>
            <div class="card-body mt-4">
              <div class="row">
                <div class="col-md-2 text-center">
                  <div class="border p-3 rounded">
                    <img v-if="publisherViewData.avatar != null" id="showImages"  :src="globalVariables.appUrl+ publisherViewData.avatar"
                      class="rounded-circle border w-10" alt="user image"/>
                    <img v-else  id="showImages" :src="globalVariables.appUrl+'backend/images/no-image.png'" class="rounded-circle border w-10"
                      alt="user image"/>
                    <h3 class="mb-0 mt-3">{{ publisherViewData.fname }}</h3>
                  </div>
                  <div v-if=" publisherViewData && publisherViewData.deposit_payments && publisherViewData.deposit_payments.length !== 0
                    " class="transaction mt-3 text-left">
                    <h5 class="mb-3">
                      <strong>Total Transaction:</strong>
                      <span>{{ calculateTotalTransaction() }} USD</span>
                    </h5>
                    <h5>
                      <strong>Balance: </strong> <br><br>
                      <span class="total-balance border border-danger text-danger rounded px-2 py-2" >{{ Banlance.balance }} USD</span>
                    </h5>
                  </div>
                  <div v-else class="transaction mt-3 text-left">
                    <h5 class="mb-3"><strong>Total Transaction:</strong> 0.00 USD</h5>
                    <h5>
                      <strong>Balance: </strong> <br><br>
                      <span class="total-balance border border-danger text-danger rounded px-2 py-2">
                        0.00 USD</span>
                    </h5>
                  </div>
                </div>
                <div class="col-md-5 my-4 my-md-0">
                  <div class="border p-3 rounded">
                    <table class="user-table w-100">
                      <tr>
                        <td><span class="heading">Company Name:</span></td>
                        <td> <span class="sub-heading">{{  publisherViewData.company_name }}</span>
                        </td>
                      </tr>
                      <tr>
                        <td><span class="heading">First Name:</span></td>
                        <td>
                          <span class="sub-heading">{{ publisherViewData.fname }}</span>
                        </td>
                      </tr>
                      <tr>
                        <td><span class="heading">Last Name:</span></td>
                        <td>
                          <span class="sub-heading">{{ publisherViewData.lname }}</span>
                        </td>
                      </tr>
                      <tr>
                        <td><span class="heading">E-mail:</span></td>
                        <td>
                          <span class="sub-heading">{{ publisherViewData.email ?? "" }}</span>
                        </td>
                      </tr>
                      <tr>
                        <td><span class="heading">Phone Number:</span></td>
                        <td>
                          <span class="sub-heading d-flex align-items-center">
                            <img class="country-flagofPhonePublisher me-2" :src="getFlagUrl()" alt="---" />
                            {{ publisherViewData.phone_no ?? "" }}</span
                          >
                        </td>
                      </tr>
                      <tr v-if="Address && Address.address">
                        <td><span class="heading">Address:</span></td>
                        <td>
                          <span class="sub-heading">
                            {{ Address.address ?? "---" }}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td><span class="heading">Country Code:</span></td>
                        <td>
                          <span class="sub-heading">{{ convertToUppercase(publisherViewData.country_code) ?? "---"}}</span>
                        </td>
                      </tr>
                      <tr v-if="userLocation && userLocation.ip_address">
                        <td><span class="heading">User IP Address:</span></td>
                        <td>
                          <span class="sub-heading">{{  userLocation.ip_address ?? "---" }}</span>
                        </td>
                      </tr>
                      <tr>
                        <td><span class="heading">Account Type:</span></td>
                        <td>
                          <span class="badge bg-success px-2">{{ userRoleName ?? "" }}</span>
                        </td>
                      </tr>
                      <tr>
                        <td><span class="heading">Account Status:</span></td>
                        <td v-html="userStatus ?? ''"></td>
                      </tr>
                      <tr>
                        <td><span class="heading">Joining Date:</span></td>
                        <td>{{ userData ?? "" }}</td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div class="col-md-5">
                  <div class="border p-3 rounded">
                    <h3>Register Address</h3>
                    <table class="user-table w-100">
                      <tr>
                        <td><span class="heading">City:</span></td>
                        <td v-if="Address && Address.city">
                          <span class="sub-heading">{{ Address.city ?? "---" }}</span>
                        </td>
                        <td v-else>
                          <span class="sub-heading">{{ "---" }}</span>
                        </td>
                      </tr>
                      <tr>
                        <td><span class="heading">State:</span></td>
                        <td v-if="Address && Address.state">
                          <span class="sub-heading">{{ Address.state ?? "---" }}</span>
                        </td>
                        <td v-else>
                          <span class="sub-heading">{{ "---" }}</span>
                        </td>
                      </tr>
                      <tr>
                        <td><span class="heading">Country:</span></td>
                        <td v-if="Address && Address.country">
                          <span class="sub-heading">{{ Address.country ?? "---" }}</span>
                        </td>
                        <td v-else>
                          <span class="sub-heading">{{ "---" }}</span>
                        </td>
                      </tr>
                      <tr>
                        <td><span class="heading">Zip Code:</span></td>
                        <td v-if="Address && Address.zip_code">
                          <span class="sub-heading">{{ Address.zip_code ?? "---" }}</span>
                        </td>
                        <td v-else>
                          <span class="sub-heading">{{ "---" }}</span>
                        </td>
                      </tr>
                      <tr>
                        <td><span class="heading">Skype:</span></td>
                        <td v-if="Address && Address.skype_id">
                          <span class="sub-heading">{{ Address.skype_id ?? "---" }}</span>
                        </td>
                        <td v-else>
                          <span class="sub-heading">{{ "---" }}</span>
                        </td>
                      </tr>
                      <tr>
                        <td><span class="heading">Linkedin:</span></td>
                        <td v-if="Address && Address.linkedin_id">
                          <span class="sub-heading">{{
                            Address.linkedin_id ?? "---"
                          }}</span>
                        </td>
                        <td v-else>
                          <span class="sub-heading">{{ "---" }}</span>
                        </td>
                      </tr>
                      <tr>
                        <td><span class="heading">Facebook:</span></td>
                        <td v-if="Address && Address.facebook_id">
                          <span class="sub-heading">{{
                            Address.facebook_id ?? "---"
                          }}</span>
                        </td>
                        <td v-else>
                          <span class="sub-heading">{{ "---" }}</span>
                        </td>
                      </tr>
                      <tr>
                        <td><span class="heading">Monthly Visitors:</span></td>
                        <td v-if="publisherViewData && publisherViewData.monthly_visitors">
                          <span class="sub-heading">{{ publisherViewData.monthly_visitors ?? "---"}}</span>
                        </td>
                        <td v-else>
                          <span class="sub-heading">{{ "---" }}</span>
                        </td>
                      </tr>
                      <tr>
                        <td><span class="heading">Traffic URLs:</span></td>
                        <td v-if="publisherViewData && publisherViewData.traffic_urls">
                          <span class="sub-heading">{{ publisherViewData.traffic_urls ?? "---" }}</span>
                        </td>
                        <td v-else>
                          <span class="sub-heading">{{
                            publisherViewData.traffic_urls ?? "---"
                          }}</span>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>

                <div class="col-md-10 col-12 offset-md-2 mt-4">
                  <div class="border p-3 rounded">
                    <table class="user-table w-100">
                      <tr>
                        <td>
                          <span class="heading">Are you a publisher of any other network:</span>
                        </td>
                        <td v-if="Address && Address.p_network">
                          <span class="sub-heading">{{ Address.p_network ?? "---" }}</span>
                        </td>
                        <td v-else>
                          <span class="sub-heading">{{ "---" }}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span class="heading" >What offers are you currently promoting (other network):</span>
                        </td>
                        <td v-if="Address && Address.p_promoting">
                          <span class="sub-heading">{{ Address.p_promoting ?? "---" }}</span>
                        </td>
                        <td v-else>
                          <span class="sub-heading">{{ "---" }}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span class="heading">Which offers do you want to promote in our network:</span>
                        </td>
                        <td v-if="Address && Address.p_promote">
                          <span class="sub-heading">{{ Address.p_promote ?? "---" }}</span>
                        </td>
                        <td v-else>
                          <span class="sub-heading">{{ "---" }}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span class="heading">Pay Per Call Marketing Experience (Years):</span>
                        </td>
                        <td v-if="Address && Address.p_marketing_experience">
                          <span class="sub-heading">{{ Address.p_marketing_experience ?? "---"}}</span>
                        </td>
                        <td v-else>
                          <span class="sub-heading">{{ "---" }}</span>
                        </td>
                      </tr>
                      <template v-if="Address.traffic_source !== null && Address.traffic_source !== 'null'">
                      <tr>
                        <td>
                          <span class="heading">What is your Traffic Source?:</span>
                        </td>
                        <td>
                          <ul v-if="Address" class="m-0 p-0 list-style">
                            <li class="mb-2" v-if="Address.traffic_source === null || Address.traffic_source === 'null'">
                              {{ "---" }}
                            </li>
                            <li class="mb-2" v-else>
                              {{ Address && Address.traffic_source && Address.traffic_source.replace(/"/g, '') }}
                            </li>
                          </ul>
                        </td>
                      </tr>
                    </template>
                      <tr>
                        <td><span class="heading">How did you find us?:</span></td>
                        <td>
                          <ul v-if="Address" class="m-0 p-0 list-style">
                            <li class="mb-2" v-if="Address.find_us == 'null' || Address.find_us == NULL">
                              {{ "---" }}
                            </li>
                            <li class="mb-2" v-else v-for="(value, index) in convatToJsonDecode( Address.find_us)" :key="index">
                              {{ value }}
                            </li>
                          </ul>
                          <li v-else class="mb-2">{{ "---" }}</li>
                        </td>
                      </tr>
                      <tr>
                        <td><span class="heading bold">Preferred Industry:</span></td>
                        <td>
                          <ul v-if="publisherViewData.user_offers" class="m-0 p-0 list-style">
                            <li  class="mb-2" v-if=" publisherViewData.user_offers == 'null' || publisherViewData.user_offers == NULL ">
                              {{ "---" }}
                            </li>
                            <li class="mb-2" v-else v-for="(value, index) in convatToJsonDecode( publisherViewData.user_offers)" :key="index">
                              {{ value }}
                            </li>
                          </ul>
                          <li v-else class="mb-2">{{ "---" }}</li>
                        </td>
                      </tr>
                    </table>
                  </div>
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
<div class="modal fade" id="publisherDepositeModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
        <div class="modal-header border-bottom-0 px-0 pt-0">
          <div class="d-flex align-items-center w-100 payment-type">
            <button type="button"
              id="deposit-button" :class="{ active: depositButtonActive }" @click="changePaymentType('deposit')" class="btn btn-outline deposit w-50 rounded-0 btn-md py-3"
              data-name="deposit" >
              Add Balance
            </button>
            <button type="button" id="withdraw-button" :class="{ active: withdrawButtonActive }" @click="changePaymentType('withdraw')"
              class="btn btn-outline withdraw w-50 rounded-0 py-3" data-name="withdraw">
              Withdraw
            </button>
        </div>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-12">
            <div class="form-group">
              <label for="user_name" class="required mb-1" >User</label>
              <select v-model="publiserDepositeData.user_id" id="user_name" class="form-select" required>
                <option value="">Select Please</option>
                <option v-for="user in publisherUsers" :value="user.id" :key="user.id" >
                  {{ user.fname }} - {{ user.company_name }} - {{ user.email }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div class="row mt-3">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="payment_date" class="required mb-1">Payment Date</label>
                  <input  type="date" v-model="publiserDepositeData.payment_date" id="payment_date" class="form-control" required
                  />
                  <div  v-if="validationErrors && validationErrors.payment_date" class="text-danger">
                    {{ validationErrors.payment_date[0] }}
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="date_range" class="required mb-1">Date Range</label>
                  <input type="date" v-model="publiserDepositeData.date_range" id="date_range" class="form-control" required/>
                  <div v-if="validationErrors && validationErrors.date_range" class="text-danger">
                    {{ validationErrors.date_range[0] }}
                  </div>
                </div>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="" class="mb-1">Upload File</label>
                  <input type="file" @change="handleImageUpload"  class="form-control" id="upload_file"/>
                </div>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="calls" class="mb-1">Total Billable Calls</label>
                  <input type="text"  v-model="publiserDepositeData.calls" id="calls" class="form-control" required placeholder="Enter Total Billable Calls"/>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="amount" class="required mb-1">Amount</label>
                  <input type="number"  v-model="publiserDepositeData.amount" required id="amount" class="form-control" placeholder="Enter Amount"/>
                  <div  v-if="validationErrors && validationErrors.amount" class="text-danger" >
                    {{ validationErrors.amount[0] }}
                  </div>
                </div>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="note_for_admin" class="mb-1">Note for admin</label><br />
                  <textarea v-model="publiserDepositeData.note_for_admin" id="note_for_admin" cols="60" rows="3" class="form-control"
                  placeholder="Enter Note for admin"></textarea>
                </div>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="payment_method" class="required mb-1">Payment Method</label>
                  <select v-model="publiserDepositeData.payment_method"  id="payment_method" required class="form-select">
                    <option value="">Select Payment Method</option>
                    <option value="4">Payoneer</option>
                    <option value="1">Bank Transfer</option>
                    <option value="3">Other</option>
                  </select>
                  <div  v-if="validationErrors && validationErrors.payment_method" class="text-danger">
                    {{ validationErrors.payment_method[0] }}
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="status" class="required mb-1">Status</label>
                  <select v-model="publiserDepositeData.status"  id="status" required class="form-select">
                    <option value="">Select Payment Status</option>
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                  </select>
                  <div v-if="validationErrors && validationErrors.status" class="text-danger">
                    {{ validationErrors.status[0] }}
                  </div>
                </div>
              </div>
            </div>

            <div class="form-group note-textarea mt-3">
              <label for="note" class="mb-1">Payment Method Note (optional)</label><br />
              <textarea v-model="publiserDepositeData.note" id="note" cols="30" rows="3" placeholder="Send a note...." class="form-control"
              ></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-label-secondary btn-sm" data-bs-dismiss="modal">
              Close
            </button>
            <button @click="AddedDepositeValue()" type="button" class="btn btn-primary btn-sm"><i class="fas fa-check fa-sm me-1"></i> Confirm</button>
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
        breadcrumbs: [
        { label: "Dashboard", url: "/dashboard" },
        { label: "Publishers ", url: "/admin-manage-publishers" },
        { label: "Details  ", url: "" },
      ],
      getLoader: false,
      showModal: false,
      company_name: "",
      depositButtonActive: true,
      withdrawButtonActive: false,
      publisherViewData: {},
      Banlance: {},
      Address: {},
      userLocation: {},
      userRoleName: "",
      userStatus: "",
      userData: "",
      publisherUsers: {},
      publiserDepositeData: {
        payment_name: "deposit",
        user_id: "",
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
      validationErrors: null,
    };
  },
  async mounted() { 
    try {
      const { role, isAuthorized } = await fetchUserRole();
      if (role == 'Super' || role == 'Admin') {
        this.getLoader = true;
        this.getPublisherViewData();
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  },
  methods: {
    // Image Added
    handleImageUpload(event) {
      this.publiserDepositeData.upload_file = event.target.files[0];
    },
    // Added Deposit Value
    AddedDepositeValue() {
      this.getLoader = true;
      axios
        .post(
          this.globalVariables.apiUrl+"admin/payment/publisher/deposit/store",
          this.publiserDepositeData,
          { headers: { Authorization: "Bearer " + localStorage.getItem("token"),
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          if (res.data.status == "success") {
            this.validationErrors = null;
            toastr.success(res.data.message);
            this.$router.push("/admin-manage-publishers-pay-details/" + this.publiserDepositeData.user_id
            );
          } else {
            this.validationErrors = res.data.errors;
          }
        })
        .catch((error) => {
          console.log(error);;
        })
        .finally(() => {
            this.getLoader = false;
        });
    },
    // Get Pubhisher Data
    getPublisherViewData() {
      axios
        .get(
          this.globalVariables.apiUrl+`admin/manage/publishers/${this.$route.params.id}/details`,
          { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
        )
        .then((res) => {
          this.company_name = res.data.userDetails.company_name;
          this.publisherViewData = res.data.userDetails;
          this.Banlance = res.data.balance;
          this.Address = res.data.userDetails.user_address;
          this.userLocation = res.data.userDetails.user_location;
          this.userRoleName = res.data.user_role;
          this.userStatus = res.data.user_status;
          this.userData = res.data.user_created;
          this.publisherUsers = res.data.publisher;
          this.publiserDepositeData.user_id = res.data.userDetails.id;
          this.publiserDepositeData.user_name = res.data.userDetails.fname;
          this.publiserDepositeData.offer = res.data.userDetails.user_offers;
          this.publiserDepositeData.company_name = res.data.userDetails.company_name;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
            this.getLoader = false;
        });
    },

    calculateTotalTransaction() {
      if (this.publisherViewData && this.publisherViewData.deposit_payments) {
        return this.publisherViewData.deposit_payments.reduce(
          (total, payment) => total + payment.deposit,
          0
        );
      } else {
        return 0;
      }
    },

    convertToUppercase(countryCode) {
      if (countryCode) {
        return countryCode.toUpperCase();
      }
    },
    
    convertToLowercase(countryCode) {
      return countryCode.toLowerCase();
    },

    convatToJsonDecode(data) {
      if (data) {
        return JSON.parse(data);
      }
    },

    getFlagUrl() {
      if (this.publisherViewData && this.publisherViewData.country_code) {
        const countryCode = this.convertToLowercase(this.publisherViewData.country_code);
        return `https://flagicons.lipis.dev/flags/4x3/${countryCode}.svg`;
      } else {
        // Provide default flag URL or handle as needed
        return "default-flag-url.svg";
      }
    },

    // User Delete
    deltePublisher(id) {
      var mydata = { data: id };
      Swal.fire({
        text: "Are you sure delete",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.value) {
        this.getLoader = true;
          axios
            .post(this.globalVariables.apiUrl+"admin/manage/user/delete", mydata, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((res) => {
              toastr.success(res.data.message);
              this.$router.push("/admin-manage-publishers");
            })
            .catch((error) => {
              console.log(error);
            })
            .finally(() => {
                this.getLoader = false;
            });
        }
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
<style scoped>
.active {
	background: #7367f0 !important;
	padding: 21px 0px !important;
	color: white !important;
	border: none !important;
}
#showImages {
  max-width: 70px;
}
.heading {
  font-weight: bold;
  line-height: 35px;
}
.country-flagofPhonePublisher {
	width: 6%;
}
</style>
