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
                <div class="card  mt-4">
                    <div class="px-3 py-2">
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
                                  <RouterLink :to="'/advertiser-payment-history-details/' + history.id" target="_blank" class="rounded-circle btn-style-info"><i class="fas fa-eye"></i></RouterLink>
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
import { fetchUserRoleAdvertiser } from "@/services/userServiceAdvertiser";

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
        { label: "Dashboard", url: "/advertiser/dashboard" },
        { label: "Payment History", url: "" },
      ],
      getLoader: false,
      showModal: false,
      showPaymentModal: false,
      showRingbaModal: false,
      userData : "",
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
      accountManager : "",
      paymentHistory : "",
      totalPaidAmount: 0,
      totalPendingAmount: 0
    };
  },
  async mounted() { 
    try {
      const { role, isAuthorized } = await fetchUserRoleAdvertiser();
      if (role == 'Advertiser') {
        this.getAdvertisherAccountData();
        this.getAdvertisherAccountManager();
        this.getAdvertisherDeposite();
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  },
  methods: {
    getAdvertisherAccountData() {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl+"advertiser/my-account", { headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          this.userData = res.data.user;
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

    getAdvertisherAccountManager() {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl+"advertiser/profile/account-manager", { headers: { Authorization: "Bearer " + localStorage.getItem("token") },
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

    getAdvertisherDeposite() {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl+"advertiser/payment-history ", { headers: { Authorization: "Bearer " + localStorage.getItem("token") },
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

    AdvertisherAccountDataUpdate() {
      this.getLoader = true;
      axios
        .post(this.globalVariables.apiUrl+"advertiser/profile/update",this.userUpdate,
         { 
          headers: { Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          toastr.success(res.data.message);
          this.getAdvertisherAccountData();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    AdvertisherPasswordUpdate() {
      this.getLoader = true;
      axios
        .post(this.globalVariables.apiUrl+"advertiser/profile/password/update",this.passwordUpdate,
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
.profile-avatar-wrap {
	background: linear-gradient(72.69deg,#1f90f4 -5.77%,#2ea0f4 22.23%,#37aef2 57.63%,#48c6ef 95.67%);
}
.profile-ava {
	padding: 1.5rem 1.25rem 1.25rem;
	text-align: center;
}
.profile-ava-in {
	display: inline-block;
	border-radius: 50%;
	position: relative;
}
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