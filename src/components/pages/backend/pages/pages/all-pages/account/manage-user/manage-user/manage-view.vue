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
          <div class="card">
            <div class="card-header py-3">
              <h5 class="card-title d-flex justify-content-between align-items-center publisher_message_title mt-2">
                <template v-if="company_name">{{ company_name }}</template>
                <template v-else>{{ publisherViewData.fname }}{{ " - Publisher Details" }}</template>
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
                            <img class="country-flagsofpublisher me-2" :src="getFlagUrl()" alt="---" />
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


  <!-- Content wrapper -->
</template>

<script>
import axios from "axios";
import toastr from "toastr";
import Swal from "sweetalert2";
import "toastr/build/toastr.min.css";
import Loader from "../../../../../../include/loader.vue";
import Breadcrumb from "../../../../../../include/breadcrumb.vue";
import { inject } from "vue";
import { fetchUserRoleAccountmanager } from "@/services/userServiceAccountmanager";


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
        { label: "Dashboard", url: "/account/dashboard" },
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
    };
  },
  async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRoleAccountmanager();
        if (role == 'Account manager') {
          this.getLoader = true;
          this.getPublisherViewData();
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    },
  methods: {
    // Get Pubhisher Data
    getPublisherViewData() {
      axios
        .get(
          this.globalVariables.apiUrl+`account-manager/manage/publishers/${this.$route.params.id}/details`,
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
.country-flagsofpublisher {
	width: 11%;
}
</style>

