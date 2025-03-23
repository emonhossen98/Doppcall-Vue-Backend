<template>
  <div v-if="getLoader">
    <Loader></Loader>
  </div>
  <!-- Content wrapper -->
  <div class="content-wrapper">
    <!-- Content -->
    <div class="container-xxl flex-grow-1 container-p-y">
      <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
<!-- User Profile Content -->
              <!-- Header -->
              <div class="row mt-3">
                <div class="col-12" id="advertisher_account">
                  <div class="card mb-4">
                    <div class="user-profile-header-banner">
                      <img :src="bannnerImage" alt="image" class="rounded-top" />
                    </div>
                    <div class="user-profile-header d-flex flex-column flex-sm-row text-sm-start text-center mb-4">
                      <div class="flex-shrink-0 mt-n2 mx-sm-0 mx-auto">
                        <img
                          :src="userShowImage.avatar"
                          alt="user image"
                          class="d-block h-auto ms-0 ms-sm-4 rounded user-profile-img" />
                      </div>
                      <div class="flex-grow-1 mt-3 mt-sm-5">
                        <div
                          class="d-flex align-items-md-end align-items-sm-start align-items-center justify-content-md-between justify-content-start mx-4 flex-md-row flex-column gap-4">
                          <div class="user-profile-info">
                            <h4>{{ userData && userData.fname }} {{ userData && userData.lname }}</h4>
                            <ul
                              class="list-inline mb-0 d-flex align-items-center flex-wrap justify-content-sm-start justify-content-center gap-2">
                              <li class="list-inline-item d-flex gap-1">
                                <i class="ti ti-color-swatch"></i> {{ userData && userData.role && userData.role.name }}
                              </li>
                              <template v-if="userData && userData.user_address && userData.user_address.address">
                                <li class="list-inline-item d-flex gap-1"><i class="ti ti-map-pin"></i> {{ userData && userData.user_address && userData.user_address.address }}</li>
                              </template>
                              <li class="list-inline-item d-flex gap-1">
                                <i class="ti ti-calendar"></i> Joined {{ formatDates(userData && userData.created_at) }}
                              </li>
                            </ul>
                          </div>
                          <a href="javascript:void(0)" class="btn btn-primary btn-sm">
                            <i class="ti ti-check me-1"></i>Connected
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!--/ Header -->


              <div class="row">
                <div class="col-12">
                  <ul class="nav panel-tabs main-nav-line mb-3" id="tab_panels">
                  <li>
                    <button
                        class="nav-link text-dark custom-nav-link"
                        :class="tabid == 'my_profile' ? 'active' : ''"
                        @click="changeAccountTab('my_profile')"
                      >
                        <i class="far fa-user w-40 me-1"></i>My Profile
                      </button>
                  </li>
                  <li>
                    <button
                        @click="changeAccountTab('settings')"
                        class="nav-link text-dark custom-nav-link"
                        :class="tabid == 'settings' ? 'active' : ''"
                      >
                        <i class="fas fa-cog w-40 me-1"></i>Settings
                      </button>
                  </li>
                  <li>
                    <button
                        class="nav-link text-dark  custom-nav-link"
                        @click="changeAccountTab('ringba_aaccount')"
                        :class="tabid == 'ringba_aaccount' ? 'active' : ''"
                      >
                        <i class="fas fa-user-lock w-40 me-1"></i>Ringba Account
                      </button>
                  </li>
                  <li>
                    <button
                        class="nav-link text-dark  custom-nav-link"
                        @click="changeAccountTab('my_account_manager')"
                        :class="tabid == 'my_account_manager' ? 'active' : ''"
                      >
                        <i class="far fa-user w-40 me-1" ></i>My Account Manager
                      </button>
                  </li>
                  <li>
                    <button
                        class="nav-link text-dark custom-nav-link"
                        @click="changeAccountTab('payment_history')"
                        :class="tabid == 'payment_history' ? 'active' : ''"
                      >
                        <i class="fas fa-shopping-basket w-40 me-1"></i>Payment History
                      </button>
                  </li>
                </ul>
                </div>
                </div>

      <div class="row g-5">
          <div class="col-md-4">
            <!-- About User -->
            <div class="card mb-4">
              <div class="card-body">
                <small class="card-text text-uppercase">About</small>
                <ul class="list-unstyled mb-4 mt-3">
                  <li class="d-flex align-items-center mb-3">
                    <i class="ti ti-user text-heading"></i
                    ><span class="fw-medium mx-2 text-heading">Full Name:</span> <span>{{ userData && userData.fname }} {{ userData && userData.lname }}</span>
                  </li>
                  <li class="d-flex align-items-center mb-3">
                    <i class="ti ti-crown text-heading"></i
                    ><span class="fw-medium mx-2 text-heading">Role:</span> <span>{{ userData && userData.role && userData.role.name }}</span>
                  </li>
                  <template v-if="userData && userData.user_address && userData.user_address.address">
                    <li class="d-flex align-items-center mb-3">
                    <i class="ti ti-flag text-heading"></i
                    ><span class="fw-medium mx-2 text-heading">Country:</span> <span>{{ userData && userData.user_address && userData.user_address.country }}</span>
                  </li>
                  </template>
                </ul>
                <small class="card-text text-uppercase">Contacts</small>
                <ul class="list-unstyled mb-4 mt-3">
                  

                  <template v-if="userData && userData.phone_no">
                    <li class="d-flex align-items-center mb-3">
                    <i class="ti ti-phone-call"></i><span class="fw-medium mx-2 text-heading">Contact:</span>
                    <span>{{ userData && userData.phone_no }}</span>
                  </li>
                  </template>

                  <template v-if="userData && userData.user_address && userData.user_address.skype_id">
                    <li class="d-flex align-items-center mb-3">
                    <i class="ti ti-brand-skype"></i><span class="fw-medium mx-2 text-heading">Skype:</span>
                    <span>{{ userData && userData.user_address && userData.user_address.skype_id }}</span>
                  </li>
                  </template>
                  
                  <li class="d-flex align-items-center mb-3">
                    <i class="ti ti-mail"></i><span class="fw-medium mx-2 text-heading">Email:</span>
                    <span>{{ userData && userData.email }}</span>
                  </li>
                </ul>
              </div>
            </div>
            <!--/ About User -->
          </div>
          <div class="col-md-8">
            <template v-if="tabid == 'my_profile'">
              <form>
                <div class="card padding-standart3 p-5">
                  <div class="card-title-custom mb-24px pb-3">My profile</div>
                  <div class="row form-group form-group-m1 mb-5">
                    <div class="col-md-12 mb-3">
                      <div class="row align-items-center">
                        <div class="col-sm-10">
                          <div class="col-sm-6" id="advertisher_profile">
                            <div class="avatar-upload">
                                <div class="avatar-edit">
                                    <input type='file' id="imageUpload" accept=".png, .jpg, .jpeg" @change="primaryLogo($event)"/>
                                    <label for="imageUpload"><i class="p-2 fa-solid fa-pencil"></i></label>
                                </div>
                                <div class="avatar-preview" id="avatar_preview">
                                  <template v-if="userShowImage.avatar != null">
                                        <div  id="imagePreview" :style="{ backgroundImage: `url(${userShowImage.avatar})` }"></div>
                                  </template>
                                  <template v-else>
                                        <template v-if="userData && userData.avatar != null">
                                            <div id="imagePreview" :style="{ backgroundImage: `url(${userData.avatar})` }"></div>
                                        </template>
                                        <template v-else>
                                            <div id="imagePreview" :style="{ backgroundImage: 'url(' + globalVariables.appUrl+'backend/images/no-image.png' + ')' }"></div>
                                        </template>
                                  </template>
                                </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row form-group form-group-m1 mb-24px">
                    <div class="col-sm-3">
                      <label for="email">Email</label>
                    </div>
                    <div class="col-sm-9">
                      <input
                        type="email"
                        v-model="userUpdate.email"
                        class="form-control"
                      />
                    </div>
                  </div>

                  <div class="row form-group form-group-m1 mb-24px mt-3">
                    <div class="col-sm-3">
                      <label for="phone">Phone</label>
                    </div>
                    <div class="col-sm-9">
                      <input
                        type="tel"
                        v-model="userUpdate.phone"
                        class="form-control"
                        readonly
                      />
                    </div>
                  </div>

                  <div class="row form-group form-group-m1 mb-24px mt-3">
                    <div class="col-sm-3">
                      <label for="first_name">First Name</label>
                    </div>
                    <div class="col-sm-9">
                      <input
                        type="text"
                        v-model="userUpdate.first_name"
                        class="form-control"
                      />
                    </div>
                  </div>

                  <div class="row form-group form-group-m1 mb-24px mt-3">
                    <div class="col-sm-3">
                      <label for="last_name">Last Name</label>
                    </div>
                    <div class="col-sm-9">
                      <input
                        type="text"
                        v-model="userUpdate.last_name"
                        class="form-control"
                      />
                    </div>
                  </div>

                  <div class="form-group row form-group-m2 mb-32px mt-3">
                    <label class="col-lg-3 col-form-label fullhd-width inline-padding"
                      >Type</label
                    >
                    <div class="col-lg-9">
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input p-1"
                          type="radio"
                          v-model="userUpdate.type"
                          id="person"
                          value="1"
                        />
                        <label class="form-check-label" for="person">Person</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input
                          class="form-check-input p-1"
                          type="radio"
                          v-model="userUpdate.type"
                          id="legal"
                          value="2"
                        />
                        <label class="form-check-label" for="legal">Legal Entity</label>
                      </div>
                    </div>
                  </div>

                  <div class="form-group row mb-0 mt-3">
                    <div class="col-12">
                      <label
                        class="col-12 col-form-label grey-color pt-0"
                        style="padding-left: 0"
                        >Preferred communication type</label
                      >
                    </div>

                    <div class="col-md-4">
                      <select
                        v-model="userUpdate.communication_type"
                        class="form-control"
                      >
                        <option value="linkedin">Linkedin</option>
                        <option value="skype">Skype</option>
                        <option value="facbook">Facebook</option>
                      </select>
                    </div>

                    <div class="col-md-4 form-group">
                      <input
                        type="text"
                        class="form-control"
                        v-model="userUpdate.communication"
                      />
                    </div>
                  </div>
                </div>

                <div class="text-end mt-3">
                  <button
                    type="button"
                    @click="AdvertisherAccountDataUpdate()"
                    class="btn btn-sm btn-primary py-2"
                    style="width: 160px"
                  >
                    Save changes
                  </button>
                </div>
              </form>
            </template>
            <template v-else-if="tabid == 'settings'">
              <form>
                <div class="card padding-standart3 p-5 ">
                  <h5 class="card-title-custom mb-2px pb-3">Security Settings</h5>

                  <div class="form-group row mb-0">
                    <label class="col-lg-4 col-form-label fullhd-width">Change Password </label>
                    <div class="col-md-12 col-lg-7">
                      <button
                          type="button"
                          class="btn btn-outline-primary show-modal"
                          id="change-password-btn"
                          data-bs-toggle="modal"
                          data-bs-target="#changePasswordModal"
                          style="width: 180px">
                          Change Password
                        </button>
                    </div>
                  </div>
                </div>
              </form>
              <form>
                <div class="row-mb card padding-standart3 p-5  mt-4">
                  <div class="row">
                    <div class="col-6">
                      <label class="switch">
                        <input
                          type="checkbox"
                          @change="getToFactionStatus($event)"
                          :checked="userTofactor.two_factor_status == 1"
                          id="togBtn"
                        />
                        <div class="slider round">
                          <span class="on">ON</span>
                          <span class="off">OFF</span>
                        </div> </label
                      >Two Factor Authentication
                    </div>
                  </div>
                  <div class="form-group mt-3 text-end">
                    <button
                      type="button"
                      @click="updateToFatorData()"
                      class="btn btn-sm btn-primary py-2"
                    >
                      <i class="fas fa-check fa-sm me-1"></i> Save Change
                    </button>
                  </div>
                </div>
              </form>
            </template>
            <template v-else-if="tabid == 'ringba_aaccount'">
              <div class="card padding-standart3 p-5 ">
                <div class="card-title-custom mb-24px pb-3">Ringba Account</div>
                <div>
                  <a
                    href="https://app.ringba.com/#/login"
                    target="_blank"
                    class="btn btn-success me-2"
                    ><i class="fas fa-sign-in-alt me-1"></i> Login</a
                  >
                  <button
                          type="button"
                          class="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#ringbaAccountModal"
                          >
                          <i class="fas fa-user-plus me-1"></i>
                          Sign Up
                        </button>
                </div>
              </div>
            </template>
            <template v-else-if="tabid == 'my_account_manager'">
              <div class="card ">
                <div class="card-body">
                  <template v-if="accountManager.account_manager">
                    <div class="row align-items-center">
                      <div class="col-md-3">
                        <div class="text-center">
                          <div class="">
                            <template
                              v-if="accountManager.account_manager.avatar != null"
                            >
                              <img
                                class="card-img-top"
                                style="width: 150px; border-radius: 50%"
                                :src="
                                globalVariables.appUrl+
                                  accountManager.account_manager.avatar
                                "
                                alt="image"
                              />
                            </template>
                            <template v-else>
                              <img
                                class="card-img-top"
                                style="width: 150px; border-radius: 50%"
                                :src="globalVariables.appUrl+'backend/images/no-image.png'"
                                alt="image"
                              />
                            </template>
                          </div>
                          <h4 class="card-title mt-3">
                            {{ accountManager.account_manager.fname }}
                            {{ accountManager.account_manager.lname }}
                          </h4>
                        </div>
                      </div>
                      <div class="col-md-9">
                        <ul class="advertiser-info text-left">
                          <template v-if="accountManager.account_manager.phone_no">
                            <li class="mt-2">
                              <i class="fas fa-phone-alt"></i>
                              {{ accountManager.account_manager.phone_no }}
                            </li>
                          </template>

                          <template v-if="accountManager.account_manager.email">
                            <li class="mt-2">
                              <i class="fas fa-envelope"></i>
                              {{ accountManager.account_manager.email }}
                            </li>
                          </template>

                          <template v-if="accountManager.account_manager.skype">
                            <li class="mt-2">
                              <i class="fab fa-skype"></i>
                              {{ accountManager.account_manager.skype }}
                            </li>
                          </template>

                          <template v-if="accountManager.account_manager.telegram">
                            <li class="mt-2">
                              <i class="fab fa-telegram-plane"></i>
                              {{ accountManager.account_manager.telegram }}
                            </li>
                          </template>

                          <template v-if="accountManager.account_manager.facebook">
                            <li class="mt-2">
                              <i class="fab fa-facebook-f"></i>
                              {{ accountManager.account_manager.facebook }}
                            </li>
                          </template>

                          <template v-if="accountManager.account_manager.available_time">
                            <li class="mt-2">
                              <i class="far fa-clock"></i>
                              {{ accountManager.account_manager.available_time }}
                            </li>
                          </template>
                        </ul>
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    <span class="text-danger py-5">No Account Manager Set</span>
                  </template>
                </div>
              </div>
            </template>
            <template v-else-if="tabid == 'payment_history'">
              <div class="card">
                <div class="card-header py-2">
                  <h5
                    class="card-title mt-2 mb-0"
                  >
                    Payment History
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
                      <th>Paid</th>
                      <th>Due Amount</th>
                      <th>Balance</th>
                      <th>Payment Status</th>
                      <th>Action</th>
                    </thead>
                    <tbody>
                      <tr v-for="(history, index) in paymentHistory" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>{{ history.user.fname + " " + history.user.lname }}</td>
                        <td>{{ history.user.email }}</td>
                        <td>{{ formatDate(history.created_at) }}</td>
                        <td>{{ history.description || "--" }}</td>
                        <td>{{ history.deposit || "0.00" }}</td>
                        <td>{{ history.withdraw || "0.00" }}</td>
                        <td>{{ history.balance || "0.00" }}</td>
                        <td>
                          <span
                            :class="{
                              'badge-success': history.status === 'Paid',
                              'badge-danger': history.status !== 'Paid',
                            }"
                            >{{ history.status }}</span
                          >
                        </td>
                        <td>
                          <RouterLink
                            :to="'/advertiser-payment-history-details/' + history.id"
                            target="_blank"
                            class="rounded-circle btn-style-info"
                            ><i class="fas fa-eye"></i
                          ></RouterLink>
                        </td>
                      </tr>
                      <tr v-if="paymentHistory.length === 0">
                        <td colspan="10" class="text-danger text-center">
                          No data found!
                        </td>
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
            </template>
          </div>
      </div>
    </div>
    <!-- / Content -->

    <div class="modal fade" id="ringbaAccountModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel3">Ringba Account</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <div class="modal-body">
              To create your Ringba account and gain access, please reach out to your
              Affiliate Manager or send an email to us at info@doppcall.com
            </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-label-secondary btn-sm" data-bs-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>


    <div class="modal fade" id="changePasswordModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel3">Change Password Modal</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <div class="modal-body">
              <div>
                <div class="row g-5">
                  <div class="col-sm-3">
                    <label for="current_password" class="required"
                      >Current Password</label
                    >
                  </div>
                  <div class="col-sm-9">
                    <input
                      type="password"
                      v-model="passwordUpdate.current_password"
                      id="current_password"
                      class="form-control"
                    placeholder="Enter Current Password"/>
                    <div
                      v-if="validationErrors && validationErrors.current_password"
                      class="text-danger"
                    >
                      {{ validationErrors.current_password[0] }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-3">
                <div class="row g-5">
                  <div class="col-sm-3">
                    <label for="new_password" class="required">New Password</label>
                  </div>
                  <div class="col-sm-9">
                    <input
                      type="password"
                      v-model="passwordUpdate.new_password"
                      id="new_password"
                      class="form-control"
                      placeholder="Enter New Password"
                    />
                    <div
                      v-if="validationErrors && validationErrors.new_password"
                      class="text-danger"
                    >
                      {{ validationErrors.new_password[0] }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-3">
                <div class="row g-5">
                  <div class="col-sm-3">
                    <label for="confirm_password" class="required"
                      >Confrim Password</label
                    >
                  </div>
                  <div class="col-sm-9">
                    <input
                      type="password"
                      v-model="passwordUpdate.confirm_password"
                      id="confirm_password"
                      class="form-control"
                      placeholder="Enter Confrim Password"
                    />
                    <div
                      v-if="validationErrors && validationErrors.confirm_password"
                      class="text-danger"
                    >
                      {{ validationErrors.confirm_password[0] }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-label-secondary btn-sm" data-bs-dismiss="modal">
              Close
            </button>
            <button type="button"  @click="AdvertisherPasswordUpdate()" class="btn btn-primary btn-sm"><i class="fas fa-check fa-sm me-1"></i> Confirm</button>
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
import bannnerImage from '../../../../../../../../../assets/image/profile-banner.png'
import moment from "moment";
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
        { label: "Account", url: "" },
      ],
      bannnerImage,
      getLoader: false,
      showModal: false,
      showPaymentModal: false,
      showRingbaModal: false,
      userData: "",
      rules: "",
      tabid: "my_profile",
      userUpdate: {
        email: "",
        phone: "",
        first_name: "",
        last_name: "",
        type: "",
        communication_type: "",
        communication: "",
        avatar: "",
      },
      userAddress: "",
      userShowImage: {
        avatar: "",
      },
      passwordUpdate: {
        current_password: "",
        new_password: "",
        confirm_password: "",
      },
      userTofactor: {
        two_factor_status: "",
      },
      validationErrors: null,
      accountManager: "",
      paymentHistory: "",
      totalPaidAmount: 0,
      totalPendingAmount: 0,
    };
  },
  async mounted() { 
    try {
      const { role, isAuthorized } = await fetchUserRoleAdvertiser();
      if (role == 'Advertiser') {
        if (this.$route.params.id === "user") {
        if (!localStorage.getItem("reloadCount")) {
          localStorage.setItem("reloadCount", 0);
        }
        this.reloadCount = parseInt(localStorage.getItem("reloadCount"));

        if (this.reloadCount === 0) {
          localStorage.setItem("reloadCount", 1);
          location.reload(true);
        } else {
          this.getAdvertisherAccountData();
          this.getAdvertisherAccountManager();
          this.getAdvertisherDeposite();
          localStorage.setItem("reloadCount", 0);
        }
      } else {
        this.getAdvertisherAccountData();
        this.getAdvertisherAccountManager();
        this.getAdvertisherDeposite();
      }
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  },
  methods: {
    getAdvertisherAccountData() {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl+"advertiser/my-account", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          this.userData = res.data.user;
          if (res && res.data && res.data.user && res.data.user.avatar != null) {
            this.userShowImage.avatar =
            this.globalVariables.appUrl+ res.data.user.avatar;
          } else {
            this.userShowImage.avatar =
            this.globalVariables.appUrl+'backend/images/no-image.png';
          }
          this.userUpdate.email = res.data.user.email;
          this.userUpdate.phone = res.data.user.phone_no;
          this.userUpdate.first_name = res.data.user.fname;
          this.userUpdate.last_name = res.data.user.lname;
          this.userUpdate.type = res.data.user.type;
          this.userUpdate.userAddress = res.data.user.user_address;
          if (res.data.user.user_address.linkedin_id != null) {
            this.userUpdate.communication_type = "linkedin";
            this.userUpdate.communication = res.data.user.user_address.linkedin_id;
          } else if (res.data.user.user_address.skype_id != null) {
            this.userUpdate.communication_type = "skype";
            this.userUpdate.communication = res.data.user.user_address.skype_id;
          } else {
            this.userUpdate.communication_type = "facbook";
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
        .get(this.globalVariables.apiUrl+"advertiser/profile/account-manager", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
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
        .get(this.globalVariables.apiUrl+"advertiser/payment-history", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
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
      return new Date(date).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    },


    formatDates(date) {
      return moment(date).format('D MMMM YYYY');
    },
    calculateTotals() {
      this.totalPaidAmount = this.paymentHistory
        .reduce((total, value) => total + (value.deposit || 0), 0)
        .toFixed(2);
      this.totalPendingAmount = this.paymentHistory
        .reduce((total, value) => total + (value.withdraw || 0), 0)
        .toFixed(2);
    },

    AdvertisherAccountDataUpdate() {
      this.getLoader = true;
      axios
        .post(this.globalVariables.apiUrl+"advertiser/profile/update", this.userUpdate, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
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
        .post(
          this.globalVariables.apiUrl+"advertiser/profile/password/update",
          this.passwordUpdate,
          {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          }
        )
        .then((res) => {
          if (res.data.status == "success") {
            toastr.success(res.data.message);
            this.logoutAction();
          } else if (res.data.status == "error") {
            toastr.error(res.data.message);
          } else {
            this.validationErrors = res.data.errors;
          }
        })
        .catch((error) => {
          if (
            error &&
            error.response &&
            error.response.data &&
            error.response.data.errors
          ) {
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
        .post(this.globalVariables.apiUrl+"publisher/twofactor/update", this.userTofactor, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          if (res.data.status == "success") {
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

    logoutAction() {
      this.getLoader = true;
      axios
        .post(
          this.globalVariables.apiUrl+"logout",
          {},
          { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
        )
        .then((res) => {
          toastr.success("Log out Successfull");
          localStorage.setItem("token", "");
          localStorage.setItem("admin_Id", "");
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
      if (!file || file.type.indexOf("image/") === -1) return;
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
.user-profile-header-banner img {
	width: 100%;
	object-fit: cover;
	height: 250px;
}
#tab_panels .active {
	background: #ff0089;
	border-radius: 4px;
	color: white;
}
#advertisher_account .user-profile-img {
	width: 130px;
}
li {
  list-style: none;
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


#advertisher_profile .avatar-upload {
    position: relative;
    max-width: 205px;
    display: flex;
}

#advertisher_profile .avatar-upload .avatar-edit {
    position: absolute;
    right: 55px;
    z-index: 1;
    top: 10px;
}

#advertisher_profile .avatar-upload .avatar-edit input {
    display: none;
}

#advertisher_profile .avatar-upload .avatar-edit input+label {
    display: inline-block;
    width: 34px;
    height: 34px;
    margin-bottom: 0;
    border-radius: 100%;
    background: #FFFFFF;
    border: 1px solid transparent;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
    cursor: pointer;
    font-weight: normal;
    transition: all 0.2s ease-in-out;
}

#advertisher_profile .avatar-upload .avatar-edit input+label:hover {
    background: #f1f1f1;
    border-color: #d6d6d6;
}

#advertisher_profile .avatar-upload .avatar-edit input+label:after {
    font-family: 'FontAwesome';
    color: #757575;
    position: absolute;
    top: 10px;
    left: 0;
    right: 0;
    text-align: center;
    margin: auto;
}

#advertisher_profile .avatar-upload .avatar-preview {
	width: 140px;
	height: 140px;
	position: relative;
	border-radius: 100%;
	border: 2px solid #DFDFDF;
	box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
}

#advertisher_profile .avatar-upload .avatar-preview>div {
    width: 100%;
    height: 100%;
    border-radius: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}
</style>
<style scoped>
.profile-avatar-wrap {
  background: linear-gradient(
    72.69deg,
    #1f90f4 -5.77%,
    #2ea0f4 22.23%,
    #37aef2 57.63%,
    #48c6ef 95.67%
  );
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
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2ab934;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
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

.on,
.off {
  color: white;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  font-size: 10px;
  font-family: Verdana, sans-serif;
  user-select: none;
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
#tab_panels .active {
	background: #ff0089;
	border-radius: 4px;
	color: white !important;
}


</style>
