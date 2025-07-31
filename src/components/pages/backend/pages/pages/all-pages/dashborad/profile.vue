<template>
  <div v-if="getLoader">
    <Loader></Loader>
  </div>
  <!-- Content wrapper -->
  <div class="content-wrapper">
    <!-- Content -->
    <div class="container-fluid flex-grow-1 container-p-y">
      <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
      <div class="row mt-4"  id="profile">
         <!-- Header -->
         <div class="row">
          <div class="col-12">
            <div class="card mb-4">
              <div class="user-profile-header-banner">
                <img :src="profileBanner" alt="Banner" class="rounded-top" />
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
                      <h4>{{ user && user.fname }} {{ user && user.lname }}</h4>
                      <ul
                        class="list-inline mb-0 d-flex align-items-center flex-wrap justify-content-sm-start justify-content-center gap-2">
                        <li class="list-inline-item d-flex gap-1">
                          <i class="ti ti-color-swatch"></i> {{ user && user.role && user.role.name }}
                        </li>
                        <template v-if="user && user.user_address && user.user_address.address">
                          <li class="list-inline-item d-flex gap-1"><i class="ti ti-map-pin"></i> {{ user && user.user_address && user.user_address.address }}</li>
                        </template>
                        <li class="list-inline-item d-flex gap-1">
                          <i class="ti ti-calendar"></i> Joined {{ formatDate(user && user.created_at) }}
                        </li>
                      </ul>
                    </div>
                    <RouterLink :to="'/admin-chats'" class="btn btn-primary btn-sm">
                      <i class="ti ti-check me-1"></i>Connected
                    </RouterLink>
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
            <a href="#profile" class="nav-link border-0" @click="changeAccountTab('profile')" :class="tabid == 'profile' ? 'active' : ''" data-toggle="tab"
              ><i class="fas fa-user-circle side-icon"></i> Profile</a>
          </li>
          <li>
            <a href="#password" class="nav-link border-0" @click="changeAccountTab('password')" :class="tabid == 'password' ? 'active' : ''"
              data-toggle="tab" ><i class="fas fa-user-lock side-icon"></i> Change Password</a>
          </li>
          <li>
            <a href="#ringba" class="nav-link border-0"  @click="changeAccountTab('ringba')" :class="tabid == 'ringba' ? 'active' : ''"
              data-toggle="tab" ><i class="fas fa-user-lock side-icon"></i> Ringba Account</a >
          </li>
          <li>
            <a href="#twofactor" class="nav-link border-0" @click="changeAccountTab('twofactor')" :class="tabid == 'twofactor' ? 'active' : ''"
              data-toggle="tab"><i class="fas fa-user-lock side-icon"></i> Two Factor Authentication</a >
          </li>
        </ul>
         </div>
        </div>

        <div class="row">
          <div class="col-12">
          <div>
            <div class="panel panel-primary tabs-style-2">
              <div class="panel-body tabs-menu-body main-content-body-right">
                <div class="tab-content">
                  <div class="tab-pane"  :class="tabid == 'profile' ? 'active' : ''" id="profile">
                    <form>
                    <!-- User Profile Content -->
                      <div class="row">
                        <div class="col-xl-4 col-lg-5 col-md-5">
                          <!-- About User -->
                          <div class="card mb-4">
                            <div class="card-body">
                              <small class="card-text text-uppercase">About</small>
                              <ul class="list-unstyled mb-4 mt-3">
                                <li class="d-flex align-items-center mb-3">
                                  <i class="ti ti-user text-heading"></i
                                  ><span class="fw-medium mx-2 text-heading">Full Name:</span> <span>{{ user && user.fname }} {{ user && user.lname }}</span>
                                </li>
                                <li class="d-flex align-items-center mb-3">
                                  <i class="ti ti-crown text-heading"></i
                                  ><span class="fw-medium mx-2 text-heading">Role:</span> <span>{{ user && user.role && user.role.name }}</span>
                                </li>
                                <template v-if="user && user.user_address && user.user_address.address">
                                  <li class="d-flex align-items-center mb-3">
                                  <i class="ti ti-flag text-heading"></i
                                  ><span class="fw-medium mx-2 text-heading">Country:</span> <span>{{ user && user.user_address && user.user_address.country }}</span>
                                </li>
                                </template>
                              </ul>
                              <small class="card-text text-uppercase">Contacts</small>
                              <ul class="list-unstyled mb-4 mt-3">
                                

                                <template v-if="user && user.phone_no">
                                  <li class="d-flex align-items-center mb-3">
                                  <i class="ti ti-phone-call"></i><span class="fw-medium mx-2 text-heading">Contact:</span>
                                  <span>{{ user && user.phone_no }}</span>
                                </li>
                                </template>

                                <template v-if="user && user.user_address && user.user_address.skype_id">
                                  <li class="d-flex align-items-center mb-3">
                                  <i class="ti ti-brand-skype"></i><span class="fw-medium mx-2 text-heading">Skype:</span>
                                  <span>{{ user && user.user_address && user.user_address.skype_id }}</span>
                                </li>
                                </template>
                                
                                <li class="d-flex align-items-center mb-3">
                                  <i class="ti ti-mail"></i><span class="fw-medium mx-2 text-heading">Email:</span>
                                  <span>{{ user && user.email }}</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <!--/ About User -->
                        </div>
                        <div class="col-xl-8 col-lg-7 col-md-7">
                          <!-- Activity Timeline -->
                          <div class="card card-action mb-4">
                            <div class="card-header align-items-center">
                              <h5 class="card-action-title mb-0">User Update</h5>
                            </div>
                            <div class="card-body pb-0">
                              <div class="row-mb">
                                <div class="row mb-3">
                                  <div class="col-12">
                                    <div class="col-sm-10">
                                      <div class="col-sm-6">
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
                                                        <template v-if="user && user.avatar != null">
                                                            <div id="imagePreview" :style="{ backgroundImage: `url(${user.avatar})` }"></div>
                                                        </template>
                                                        <template v-else>
                                                            <div id="imagePreview" :style="{ backgroundImage: 'url(' + globalVariables.appUrl+ 'backend/images/no-image.png'+ ')' }"></div>
                                                        </template>
                                                  </template>
                                                </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div class="row">
                                  <div class="col-md-6">
                                    <label for="" class="required">First Name</label>
                                    <input
                                      type="text"
                                      v-model="userUpdate.first_name"
                                      class="form-control"
                                    />
                                    <div
                                      v-if="validationErrors && validationErrors.first_name"
                                      class="text-danger"
                                    >
                                      {{ validationErrors.first_name[0] }}
                                    </div>
                                  </div>
                                  <div class="col-md-6 mt-2 mt-md-0">
                                    <label for="" class="required">Last Name</label>
                                    <input
                                      type="text"
                                      v-model="userUpdate.last_name"
                                      class="form-control"
                                    />
                                    <div
                                      v-if="validationErrors && validationErrors.last_name"
                                      class="text-danger"
                                    >
                                      {{ validationErrors.last_name[0] }}
                                    </div>
                                  </div>
                                  <div class="col-md-12 my-2">
                                    <label for="" class="required">E-mail</label>
                                    <input
                                      type="email"
                                      v-model="userUpdate.email"
                                      class="form-control"
                                      readonly
                                    />
                                    <div
                                      v-if="validationErrors && validationErrors.email"
                                      class="text-danger"
                                    >
                                      {{ validationErrors.email[0] }}
                                    </div>
                                  </div>
                                </div>

                                <div class="form-group text-end my-3">
                                  <button
                                    type="button"
                                    @click="userInfoUpdate()"
                                    class="btn btn-sm btn-primary"
                                  >
                                    <i class="fas fa-check fa-sm me-1"></i> Save Change
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <!--/ Activity Timeline -->
                        </div>
                      </div>
                      <!--/ User Profile Content -->
                      
                    </form>
                  </div>

                  <div
                    class="tab-pane card"
                    :class="tabid == 'password' ? 'active' : ''"
                    id="password"
                  >
                    <form>
                      <div class="row-mb px-5">
                        <div class="row g-5 mb-2">
                          <div class="col-sm-3">
                            <label for="" class="required">Current Password</label>
                          </div>
                          <div class="col-sm-9">
                            <input
                              type="password"
                              v-model="passwordUpdate.current_password"
                              class="form-control"
                            placeholder="Enter Current Password"/>
                            <div
                              v-if="
                                passvalidationErrors &&
                                passvalidationErrors.current_password
                              "
                              class="text-danger"
                            >
                              {{ passvalidationErrors.current_password[0] }}
                            </div>
                          </div>
                        </div>
                        <div class="row g-5 mb-2">
                          <div class="col-sm-3">
                            <label for="" class="required">New Password</label>
                          </div>
                          <div class="col-sm-9">
                            <input
                              type="password"
                              v-model="passwordUpdate.new_password"
                              class="form-control"
                              placeholder="Enter New Password"/>
                            <div
                              v-if="
                                passvalidationErrors && passvalidationErrors.new_password
                              "
                              class="text-danger"
                            >
                              {{ passvalidationErrors.new_password[0] }}
                            </div>
                          </div>
                        </div>
                        <div class="row g-5">
                          <div class="col-sm-3">
                            <label for="" class="required">Confirm Password</label>
                          </div>
                          <div class="col-sm-9">
                            <input
                              type="password"
                              v-model="passwordUpdate.confirm_password"
                              class="form-control"
                              placeholder="Enter Confirm Password" />
                            <div
                              v-if="
                                passvalidationErrors &&
                                passvalidationErrors.confirm_password
                              "
                              class="text-danger"
                            >
                              {{ passvalidationErrors.confirm_password[0] }}
                            </div>
                          </div>
                        </div>

                        <div class="form-group text-end mt-3 py-3">
                          <button
                            type="button"
                            @click="passwordInfoUpdate()"
                            class="btn btn-sm btn-primary"
                          >
                            <i class="fas fa-check fa-sm me-1"></i> Save Change
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div
                    class="tab-pane card p-5"
                    :class="tabid == 'ringba' ? 'active' : ''"
                    id="ringba"
                  >
                    <a
                      href="https://app.ringba.com/#/login"
                      target="_blank"
                      class="btn btn-success me-2"
                      ><i class="fas fa-sign-in-alt me-1"></i> Login</a
                    >
                    <a
                      href="https://www.ringba.com/pricing/"
                      target="_blank"
                      class="btn btn-primary"
                      ><i class="fas fa-user-plus me-1"></i> Signup</a
                    >
                  </div>
                  <div
                    class="tab-pane card"
                    :class="tabid == 'twofactor' ? 'active' : ''"
                    id="twofactor"
                  >
                    <form>
                      <div class="row-mb padding-standart3 px-5 pt-5">
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
                        <div class="form-group mt-3 text-end py-3">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
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
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import axios from "axios";
import Loader from "../../../../include/loader.vue";
import Breadcrumb from "../../../../include/breadcrumb.vue";
import moment from "moment";
import profileBanner from '../../../../../../../assets/image/profile-banner.png';
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
        { label: "Dashboard", url: "" },
        { label: "Profile", url: "" },
      ],
      profileBanner,
      getLoader: false,
      tabid: "profile",
      userShowImage: {
        avatar: null,
      },
      userUpdate: {
        email: "",
        first_name: "",
        last_name: "",
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
      passvalidationErrors: null,
      user : "",
    };
  },
  async mounted() { 
    try {
      const { role, isAuthorized } = await fetchUserRole();
      if (role == 'Super' || role == 'Admin') {
        if (this.$route.params.id === "user") {
          localStorage.removeItem('chatUserstorage');
            const storedChatUserIds = JSON.parse(localStorage.getItem('chatUserIds'));
            if(storedChatUserIds){
              storedChatUserIds.forEach((ids) => {
                localStorage.removeItem('chatsParticipent' + ids);
                localStorage.removeItem('chatMessage_' + ids);
                localStorage.removeItem('chatChatId_' + ids);
                localStorage.removeItem('chatstatus_' + ids);
              });
              localStorage.removeItem('chatUserIds');
            }
            this.getDashboardData();
        } else {
          this.getDashboardData();
        }
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  },
  methods: {
    getDashboardData() {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl+"admin/profile", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          this.userUpdate.email = res && res.data && res.data.user && res.data.user.email;
          this.user = res && res.data && res.data.user;
          this.userUpdate.first_name =
            res && res.data && res.data.user && res.data.user.fname;
          this.userUpdate.last_name =
            res && res.data && res.data.user && res.data.user.lname;
            if(res.data.user.avatar != null){
              this.userShowImage.avatar = this.globalVariables.appUrl+ res.data.user.avatar;
            }else{
              this.userShowImage.avatar = this.globalVariables.appUrl+"backend/images/no-image.png";
            }
         
          this.userTofactor.two_factor_status = res.data.user.two_factor_status;
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    userInfoUpdate() {
      this.getLoader = true;
      axios
        .post(this.globalVariables.apiUrl+"admin/profile/update", this.userUpdate, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          toastr.success(res.data.message);
          this.getDashboardData();
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

    passwordInfoUpdate() {
      this.getLoader = true;
      axios
        .post(this.globalVariables.apiUrl+"admin/password/update", this.passwordUpdate, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data.status == "success") {
            toastr.success(res.data.message);
            this.getDashboardData();
            this.logoutAction();
          } else {
            toastr.error(res.data.message);
            this.passvalidationErrors = res.data;
          }
        })
        .catch((error) => {
          if (
            error &&
            error.response &&
            error.response.data &&
            error.response.data.errors
          ) {
            this.passvalidationErrors = error.response.data.errors;
          }
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    updateToFatorData() {
      this.getLoader = true;
      axios
        .post(this.globalVariables.apiUrl+"admin/twofactor/update", this.userTofactor, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          if (res.data.status == "success") {
            toastr.success(res.data.message);
            this.getDashboardData();
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    changeAccountTab(data) {
      this.tabid = data;
    },

    getToFactionStatus(event) {
      this.userTofactor.two_factor_status = event.target.checked;
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

    formatDate(date) {
      return moment(date).format('D MMMM YYYY');
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
  },
};
</script>
<style scoped>
.tabs-style-2 .main-nav-line .nav-link.active {
  background: 0 0;
  color: #0162e8;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  box-shadow: inset 0 3px 1px #0162e8;
}
.tabs-style-2 .main-nav-line .nav-link {
  padding: 0.7rem 2rem;
  background: #ecf0fa;
  border: 1px solid #e2e8f5;
  border-bottom: 0;
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
.user-profile-header-banner img {
	width: 100%;
	object-fit: cover;
	height: 250px;
}
#tab_panels .active {
	background: #ff0089;
	border-radius: 4px;
	color: white !important;
}

#profile .avatar-upload {
    position: relative;
    max-width: 205px;
    display: flex;
}

#profile .avatar-upload .avatar-edit {
    position: absolute;
    right: 55px;
    z-index: 1;
    top: 10px;
}

#profile .avatar-upload .avatar-edit input {
    display: none;
}

#profile .avatar-upload .avatar-edit input+label {
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

#profile .avatar-upload .avatar-edit input+label:hover {
    background: #f1f1f1;
    border-color: #d6d6d6;
}

#profile .avatar-upload .avatar-edit input+label:after {
    font-family: 'FontAwesome';
    color: #757575;
    position: absolute;
    top: 10px;
    left: 0;
    right: 0;
    text-align: center;
    margin: auto;
}

#profile .avatar-upload .avatar-preview {
	width: 140px;
	height: 140px;
	position: relative;
	border-radius: 100%;
	border: 2px solid #DFDFDF;
	box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
}

#profile .avatar-upload .avatar-preview>div {
    width: 100%;
    height: 100%;
    border-radius: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}
#profile .user-profile-img {
	width: 130px;
}
#profile #password {
	margin-top: 48px;
}
</style>

<style scoped>
.tab-content {
	padding: 0rem !important;
	border-radius: 0.375rem;
}
</style>
