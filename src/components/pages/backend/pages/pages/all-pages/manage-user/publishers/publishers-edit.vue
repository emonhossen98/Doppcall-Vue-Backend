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
            <div class="app-main__inner">
                <form >
                    <input type="hidden" v-model="publisherEditData.update_id" />
                    <div class="row">
                        <div class="col-md-8 mb-3">
                            <div class="card">
                                <div class="card-header custom-card-header d-flex justify-content-between">
                                    <h5 class="card-title mb-0">Edit - {{ title }}</h5>
                                    <template v-if="inviteduser.inviteduser != null">
                                      <div>
                                        <h5 class="card-title mb-0">Invited user </h5>
                                        <p class="mb-0">Email : {{ inviteduser.inviteduser.email }}</p>
                                      </div>
                                    </template>
                                </div>
                                <div class="card-body">
                                    <div class="row mt-3">
                                        <div class="col-md-6">
                                            <label for="first_name" class="required mb-1">First Name</label>
                                            <input type="text" v-model="publisherEditData.first_name" id="first_name" class="form-control" required />
                                        </div>
                                        <div class="col-md-6 mt-3 mt-md-0">
                                            <label for="last_name" class="required mb-1">Last Name</label>
                                            <input type="text" v-model="publisherEditData.last_name" id="last_name" class="form-control" required/>
                                        </div>
                                    </div>
                                    
                                        <div class="row mt-3">
                                            <div class="col-md-6">
                                              <button class="btn btn-primary" data-bs-toggle="modal" id="assign_btn"  data-bs-target="#passwordChangeModal">Change Password </button>
                                            </div>
                                        </div>
                                    

                                    <div class="my-3">
                                        <div class="form-group">
                                            <label for="company_name" class="required mb-1">Company Name</label>
                                            <input type="text" placeholder="Enter Your Company Name" v-model="publisherEditData.company_name" id="company_name" class="form-control" required/>
                                        </div>
                                        <div class="form-group mt-3">
                                            <label for="email" class="required mb-1">E-mail</label>
                                            <input type="email" placeholder="Enter Your email"  v-model="publisherEditData.email" id="email" class="form-control" required/>
                                        </div>
                                        <div class="form-group mt-3">
                                            <label for="phone_number" class="required mb-1">Phone Number</label>
                                            <input type="text" placeholder="Enter Your Phone Number" v-model="publisherEditData.phone_number" id="phone_number" class="form-control" required/>
                                        </div>
                                    </div>
                                    <!-- {{ Users.role.name }} -->
                                    <div class="my-3 account-manager-data" :class="Users === 'Account' ? '' : 'd-none'">
                                        <div class="form-group mt-3">
                                            <label for="skype" class="required mb-1">Skype</label>
                                            <input type="text" v-model="publisherEditData.skype" id="skype" class="form-control" required>
                                        </div>
                                        <div class="form-group mt-3">
                                            <label for="telegram" class="required mb-1">Telegram</label>
                                            <input type="text" v-model="publisherEditData.telegram" id="telegram" class="form-control" required>
                                        </div>
                                        <div class="form-group mt-3">
                                            <label for="facebook" class="required mb-1">Facebook</label>
                                            <input type="text" v-model="publisherEditData.facebook" id="facebook" class="form-control" required>
                                        </div>
                                        <div class="form-group mt-3">
                                            <label for="available_time" class="required mb-1">Available time</label>
                                            <input type="text" v-model="publisherEditData.available_time" id="available_time" class="form-control" required>
                                        </div>
                                    </div>

                                    <div class="form-group my-3">
                                        <label for="offers" class="required mb-1">Select Your Preferred Industry Verticals</label><br>
                                        <select v-model="publisherEditData.offers" class="js-select2" ref="select2" multiple>
                                         <option v-for="(industrie,index) in industries" :value="industrie.name" :key="index">{{ industrie.name }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="card">
                                <div class="card-body">
                                    <div class="form-group">
                                    <label for="role_name" class="required mb-1">Role Name</label>
                                    <select v-model="publisherEditData.role_name" id="role_name" class="form-select">
                                        <option value="">Select Role</option>
                                        <option v-for="(role,index) in roles" ::key="index" :value="role.id" :data-name="role.name" :selected="publisherEditData.role_name == role.id">{{ role.name }}</option>
                                    </select>
                                    </div>

                                    <div class="form-group mt-3">
                                        <label for="account_manager" class="required mb-1">Account Manager</label>
                                        <select v-model="publisherEditData.account_manager" id="account_manager" class="form-select">
                                            <option value="">No Account Manager</option>
                                            <option v-for="(account, index) in accountManagers" :key="index" :value="account.id" :selected="publisherEditData.account_manager == account.id">
                                                {{ account.fname }} {{ account.lname }}
                                            </option>
                                        </select>
                                    </div>

                                    <div class="form-group mt-3">
                                        <label for="profile_editable" class="required mb-1">Profile Editable</label>
                                        <select v-model="publisherEditData.profile_editable" id="profile_editable" class="form-select">
                                            <option>Select Please</option>
                                            <option value="0" :selected="publisherEditData.profile_editable == 0">Pending</option>
                                            <option value="1" :selected="publisherEditData.profile_editable == 1">Approved</option>
                                        </select>
                                    </div>

                                    <div class="form-group mt-3">
                                    <label for="verifiable" class="required mb-1">Verifiable</label>
                                    <select v-model="publisherEditData.verifiable" id="verifiable" class="form-select">
                                      <option :value="currentTime">Verified</option>
                                      <option value="null">Unverified</option>
                                  </select>
                                    </div>

                                    <div class="form-group mt-3">
                                        <label for="accessable" class="required mb-1">Accessable</label>
                                        <select v-model="publisherEditData.accessable" id="accessable" class="form-select">
                                            <option value="">Select Please</option>
                                            <option value="1" :selected="publisherEditData.accessable == 1">Pending</option>
                                            <option value="2" :selected="publisherEditData.accessable == 2">Approved</option>
                                            <option value="3" :selected="publisherEditData.accessable == 3">Pause</option>
                                            <option value="4" :selected="publisherEditData.accessable == 4">Resume</option>
                                        </select>
                                    </div>

                                    <div class="form-group mt-3 row">
                                        <label for="profile_image mb-1">Profile image</label>
                                        <div class="col-sm-6">
                                            <input type="file" accept="image/*" ref="myFile" @change="publiseherEditedImage($event)" class="form-control" id="profile_image">
                                            <div v-if="validationErrors && validationErrors.profile_image" class="text-danger">
                                                {{ validationErrors.profile_image[0] }}
                                            </div> 
                                            <span style="background: #e9fff7; font-size: 12px; cursor: help;"
                                                class="py-1 px-2 d-block">The image dimensions 150*150 and max size 1M, type: jpg,png.jpeg.svg</span>
                                        </div>
                                        <div class="col-sm-6">
                                            <img v-if="publisherShowImage.profile_image" :src="publisherShowImage.profile_image" class="imgpreview">
                                        </div>
                                    <div class="form-group text-left mt-4 submit-btn">
                                        <button type="button" @click="publisherUpdate" class="btn btn-primary btn-sm"><i class="fas fa-check fa-sm me-1"></i>
                                                Update
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </form>
            </div>
        </div>
      </div>
          <!-- Large Modal -->
          <div class="modal fade" id="passwordChangeModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-md modal-center" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <h5 class="mb-0">Password Change To : {{ publisherEditData.first_name }}</h5>
                    <label for="password" class="required mt-3 mb-2">Password :</label>
                    <input type="password" class="form-control" v-model="changePass.password" placeholder="Enter Password..">
                    <div v-if="validationErrors && validationErrors.password" class="text-danger">
                          {{ validationErrors.password[0] }}
                      </div>
                  </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-label-secondary btn-sm" data-bs-dismiss="modal">
                    Close
                  </button>
                  <button @click="publisherPasswordUpdate()" type="button" class="btn btn-primary btn-sm"> <i class="fas fa-check fa-sm me-2"></i> Confirm</button>
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
        { label: " Edit User", url: "" },
      ],
      getLoader: false,
      currentTime: '',
      inviteduser : "",
      Users : "",
      title : "",
      update_id : "",
      publisherEditData: {
        first_name : "",
        last_name : "",
        password : "",
        company_name : "",
        email : "",
        phone_number : "",
        skype : "",
        telegram : "",
        facebook : "",
        available_time : "",
        offers : [],
        role_name : "",
        account_manager : "",
        profile_editable : "",
        verifiable : "",
        accessable : "",
        profile_image : null,
      },
      publisherShowImage: {
        profile_image : null,
      },
      changePass : {
        userid : "",
        password : "",
      },
      industries : "",
      roles : "",
      accountManagers : "",
      selectedIndustrie : [],
    };
  },
  async mounted() { 
    try {
      const { role, isAuthorized } = await fetchUserRole();
      if (role == 'Super' || role == 'Admin') {
        this.getLoader = true;
        this.getPublisherData();
        import("../../../../../../../../assets/backend/assets/js/alert.js")
        this.getCurrentTime();
        setInterval(this.getCurrentTime, 3600000);
          const vm = this;
          $(this.$refs.select2).select2({
            closeOnSelect: false,
            placeholder: "Choose Industries!",
            allowClear: true,
            tags: true
          }).on('change', function() {
            vm.selectedIndustrie = $(this).val() || [];
          });
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  },
  watch: {
    selectedIndustrie: {
    handler(newVal) {
      if (!Array.isArray(newVal)) {
        newVal = [newVal]; 
      }
    },
    deep: true 
  },
  },
  methods: {
    publisherPasswordUpdate() {
        this.getLoader = true;
      axios
        .post(this.globalVariables.apiUrl+`admin/manage/user/single/password/update`, this.changePass, {
          headers: { 
            Authorization: "Bearer " + localStorage.getItem("token"),
         },
        })
        .then((res) => {
            this.getPublisherData();
            toastr.success(res.data.message);
        })
        .catch((error) => {
          if (error.response && error.response.data && error.response.data.errors) {
             this.validationErrors = error.response.data.errors;
           }
      })
      .finally(() => {
        this.getLoader = false;
      });
    },

    publisherUpdate() {
        this.getLoader = true;
        this.publisherEditData.offers = this.selectedIndustrie;
      axios
        .post(this.globalVariables.apiUrl+`admin/manage/user/${this.update_id}/update`, this.publisherEditData, {
          headers: { 
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
         },
        })
        .then((res) => {
            this.getPublisherData();
            toastr.success(res.data.message);
        })
        .catch((e) => {
          return e;
      })
      .finally(() => {
        this.getLoader = false;
      });
    },
    getPublisherData() {
      axios
        .get(
          this.globalVariables.apiUrl+`admin/manage/user/${this.$route.params.id}/edit`,
          { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
        )
        .then((res) => {
          this.inviteduser = res.data.user;
          this.Users = res.data.user.role.name;
          this.title = res.data.user.fname;
          this.industries = res.data.industries;
          this.roles = res.data.roles;
          this.accountManagers = res.data.accountManagers;

          this.changePass.userid = res.data.user.id;
        //   Set Edited Data 
        this.update_id = res.data.user.id;
        this.publisherEditData.first_name = res.data.user.fname;
        this.publisherEditData.last_name = res.data.user.lname;
        this.publisherEditData.company_name = res.data.user.company_name;
        this.publisherEditData.email = res.data.user.email;
        this.publisherEditData.phone_number = res.data.user.phone_no;
        this.publisherEditData.skype = res.data.user.skype;
        this.publisherEditData.telegram = res.data.user.telegram;
        this.publisherEditData.facebook = res.data.user.facebook;
        this.publisherEditData.available_time = res.data.user.available_time;
        this.publisherEditData.offers = res.data.user.user_offers;
        this.publisherEditData.role_name = res.data.user.role_id;
        this.publisherEditData.account_manager = res.data.user.account_manager_id;
        this.publisherEditData.profile_editable = res.data.user.editable;
        if(res && res.data && res.data.user && res.data.user.is_email_verified != null){
          this.publisherEditData.verifiable = this.currentTime;
        }else{
          this.publisherEditData.verifiable = null;
        }
        this.publisherEditData.accessable = res.data.user.account_access;
        this.publisherShowImage.profile_image = this.globalVariables.appUrl+ res.data.user.avatar;
        this.selectedIndustrie = res.data.user.user_offers;
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
            this.getLoader = false;
        });
    },
    publiseherEditedImage(event) {
      const file = event.target.files[0];
      this.publisherEditData.profile_image = file;
      if (!file || file.type.indexOf('image/') === -1) return;
      const reader = new FileReader();
      reader.onload = () => {
        this.publisherShowImage.profile_image = reader.result; // Update imgsrc with filename
      };
      reader.readAsDataURL(file);
    },
    getCurrentTime() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      this.currentTime = `${hours}:${minutes}:${seconds}`;
    },
  }
};
</script>
<style>
.select2-container {
	width: 100% !important;
}
</style>
<style scoped>
.imgpreview{
    width: 80px;
}

</style>