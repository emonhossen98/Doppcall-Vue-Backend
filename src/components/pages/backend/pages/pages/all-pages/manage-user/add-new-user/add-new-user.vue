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
        <div class="col-md-8 mb-3">
          <div class="card ">
            <div class="card-header custom-card-header">
              <h5 class="card-title mb-0">New User Create</h5>
            </div>
            <div class="card-body">
              <div class="row mt-2">
                <div class="col-md-6">
                  <label for="first_name" class="required  mb-1 " >First Name</label>
                  <input type="text" id="first_name" v-model="addNewUserCreate.first_name" class="form-control" placeholder="First Name" required />
                  <div v-if="validationErrors && validationErrors.first_name" class="text-danger">
                     {{ validationErrors.first_name[0] }}
                  </div>
                </div>
                <div class="col-md-6 mt-3 mt-md-0">
                  <label for="last_name" class="required mb-1">Last Name</label>
                  <input type="text" id="last_name" v-model="addNewUserCreate.last_name" class="form-control"  placeholder="Last Name" required />
                  <div v-if="validationErrors && validationErrors.last_name" class="text-danger">
                     {{ validationErrors.last_name[0] }}
                  </div>
                </div>
              </div>

              <div class="row mt-3">
                <div class="col-md-6">
                  <label for="password" class="required mb-1">Password</label>
                  <input type="password" id="password" v-model="addNewUserCreate.password" class="form-control" placeholder="Password" required/>
                    <div v-if="validationErrors && validationErrors.password" class="text-danger">
                     {{ validationErrors.password[0] }}
                    </div>
                </div>
                <div class="col-md-6 mt-3 mt-md-0">
                  <label for="password_confirmation" class="required mb-1">Confirm Password</label>
                  <input type="password" id="password_confirmation" v-model="addNewUserCreate.password_confirmation" class="form-control"  placeholder="Confirm Password"
                    required />
                    <div v-if="validationErrors && validationErrors.password_confirmation" class="text-danger">
                     {{ validationErrors.password_confirmation[0] }}
                    </div>
                </div>
              </div>

              <div class="my-3">
                <div class="form-group">
                  <label for="company_name" class="required mb-1">Company Name</label>
                  <input type="text"  id="company_name" v-model="addNewUserCreate.company_name" class="form-control" placeholder="Company Name"required />
                  <div v-if="validationErrors && validationErrors.company_name" class="text-danger">
                  {{ validationErrors.company_name[0] }}
                  </div>
                </div>
                <div class="form-group mt-3">
                  <label for="email" class="required mb-1">E-mail</label>
                  <input type="email" id="email" v-model="addNewUserCreate.email" class="form-control" placeholder="E-mail" required/>
                  <div v-if="validationErrors && validationErrors.email" class="text-danger">
                  {{ validationErrors.email[0] }}
                  </div>
                </div>
                <div class="form-group mt-3">
                  <label for="phone_number" class="required mb-1">Phone Number</label>
                  <input type="text" id="phone_number" v-model="addNewUserCreate.phone_number" class="form-control" placeholder="Phone Number">
                  <div v-if="validationErrors && validationErrors.phone_number" class="text-danger">
                  {{ validationErrors.phone_number[0] }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card ">
            <div class="card-body">
              <div class="form-group">
                <label for="role_name" class="required mb-1">Role Name</label>
                <select v-model="addNewUserCreate.role_name" id="role_name" class="form-select" required>
                  <option value="">Select Role</option>
                  <option v-for="role in addNewUser.roles" :value="role.id" :key="role.id" >
                    {{ role.secondary_name ?? '' }}
                  </option>
                </select>
                <div v-if="validationErrors && validationErrors.role_name" class="text-danger">
                  {{ validationErrors.role_name[0] }}
                </div>
              </div>
              <div class="form-group mt-3">
                <label for="account_manager" class="required mb-1">Account Manager</label>
                <select v-model="addNewUserCreate.account_manager"  id="account_manager" class="form-select" required>
                  <option value="">Select Manager</option>
                  <option v-for="manager in addNewUser.accountManagers" :value="manager.id" :key="manager.id">
                    {{ manager.fname }} {{ manager.lname }}
                  </option>
                </select>
                <div v-if="validationErrors && validationErrors.account_manager" class="text-danger">
                  {{ validationErrors.account_manager[0] }}
                </div>
              </div>

                <div class="form-group mt-3">
                  <div class="form-check form-switch">
                    <input 
                      v-model="addNewUserCreate.profile_editable"
                      :true-value="1"
                      :false-value="0"
                      type="checkbox"
                      id="allow_edit_profile"
                      class="form-check-input">
                    <label for="allow_edit_profile" class="form-check-label required mb-1">Allow User To Edit Profile</label>
                  </div>
                  <div v-if="validationErrors && validationErrors.profile_editable" class="text-danger">
                    {{ validationErrors.profile_editable[0] }}
                  </div>
                </div>

                <div class="form-group mt-3">
                  <div class="form-check form-switch">
                    <input 
                      v-model="addNewUserCreate.verifiable"
                      :true-value="1"
                      :false-value="0"
                      type="checkbox"
                      id="email_verified"
                      class="form-check-input">
                    <label for="email_verified" class="form-check-label required mb-1">Email Verified</label>
                  </div>
                  <div v-if="validationErrors && validationErrors.verifiable" class="text-danger">
                    {{ validationErrors.verifiable[0] }}
                  </div>
                </div>

                <div class="form-group mt-3">
                  <div class="form-check form-switch">
                    <input 
                      v-model="addNewUserCreate.accessable"
                      :true-value="1"
                      :false-value="0"
                      type="checkbox"
                      id="account_access"
                      class="form-check-input">
                    <label for="account_access" class="form-check-label required mb-1">Account Access</label>
                  </div>
                  <div v-if="validationErrors && validationErrors.accessable" class="text-danger">
                    {{ validationErrors.accessable[0] }}
                  </div>
                </div>


              <!-- <div class="form-group mt-3">
                <label for="profile_editable" class="required mb-1">Profile Editable</label>
                <select  v-model="addNewUserCreate.profile_editable"  id="profile_editable" required class="form-select">
                  <option value="">Select Please</option>
                  <option value="0">Pending</option>
                  <option value="1">Approved</option>
                </select>
                <div v-if="validationErrors && validationErrors.profile_editable" class="text-danger">
                  {{ validationErrors.profile_editable[0] }}
                </div>
              </div>

              <div class="form-group mt-3">
                <label for="verifiable" class="required mb-1">Verifiable</label>
                <select v-model="addNewUserCreate.verifiable" id="verifiable" required class="form-select">
                  <option value="">Select Please</option>
                  <option value="2023-12-31 11:59:31">Verified</option>
                  <option value="null">Unverified</option>
                </select>
                <div v-if="validationErrors && validationErrors.verifiable" class="text-danger">
                  {{ validationErrors.verifiable[0] }}
                </div>
              </div>

              <div class="form-group mt-3">
                <label for="accessable" class="required mb-1">Accessable</label>
                <select  v-model="addNewUserCreate.accessable" id="accessable" required class="form-select">
                  <option value="">Select Please</option>
                  <option value="0">Pending</option>
                  <option value="1">Approved</option>
                  <option value="2">Pause</option>
                  <option value="3">Resume</option>
                </select>
                <div v-if="validationErrors && validationErrors.accessable" class="text-danger">
                  {{ validationErrors.accessable[0] }}
                </div>
              </div> -->

              <div class="form-group mt-3 row">
                <div class="col-sm-6">
                  <label for="profile_image" class="mb-1">Profile image</label>
                  <input type="file" accept="image/*" ref="myFile" @change="primaryLogo($event)" class="form-control" id="profile_image"> 
                  <span style="background: #e9fff7; font-size: 12px; cursor: help;"
                      class="py-1 px-2 d-block">The image dimensions 150*150 and max size 1M, type: jpg,png.jpeg.svg</span>
                </div>
                <div class="col-sm-6">
                  <img v-if="showNewUserImage.profile_image" :src="showNewUserImage.profile_image" class="imgpreviewwithcreate">
                </div>
                <div v-if="validationErrors && validationErrors.profile_image" class="text-danger">
                  {{ validationErrors.profile_image[0] }}
                </div>
              </div>

              <div class="form-group text-left mt-2 submit-btn">
                <button type="button" @click="addNewUserSave" class="btn btn-primary btn-sm">
                  <i class="fas fa-check fa-sm me-1"></i>
                  Create
                </button>
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
  props: ["addNewUser"],
  components: {
    Loader,
    Breadcrumb,
  },
  data: () => {
    return {
      breadcrumbs: [
        { label: "Dashboard", url: "/dashboard" },
        { label: "New User Create ", url: "" },
      ],
      getLoader: false,
      addNewUserCreate: {
        first_name : "",
        last_name : "",
        password : "",
        password_confirmation : "",
        company_name : "",
        email : "",
        phone_number : "",
        role_name : "",
        account_manager : "",
        profile_editable : "",
        verifiable : "",
        accessable : "",
        profile_image : null,
      },
      showNewUserImage : {
        profile_image : "",
      },
      validationErrors : null,
    };
  },
  async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role == 'Super' || role == 'Admin') {
          
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    },
  methods: {
    addNewUserSave() {
      this.getLoader = true;
      axios
        .post(
          this.globalVariables.apiUrl+"admin/manage/user/store",
          this.addNewUserCreate,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          if(res.data.status == 'success'){
            this.addNewUserCreate.first_name = "";
            this.addNewUserCreate.last_name = "";
            this.addNewUserCreate.password = "";
            this.addNewUserCreate.password_confirmation = "";
            this.addNewUserCreate.company_name = "";
            this.addNewUserCreate.email = "";
            this.addNewUserCreate.phone_number = "";
            this.addNewUserCreate.role_name = "";
            this.addNewUserCreate.account_manager = "";
            this.addNewUserCreate.profile_editable = "";
            this.addNewUserCreate.verifiable = "";
            this.addNewUserCreate.accessable = "";
            this.addNewUserCreate.profile_image = null;
            this.showNewUserImage.profile_image = null;
            this.validationErrors = '';
            toastr.success(res.data.message);
          }else{
            toastr.error(res.data.message);
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
    primaryLogo(event) {
      const file = event.target.files[0];
      this.addNewUserCreate.profile_image = file;
      if (!file || file.type.indexOf('image/') === -1) return;
      const reader = new FileReader();
      reader.onload = () => {
        this.showNewUserImage.profile_image = reader.result; // Update imgsrc with filename
      };
      reader.readAsDataURL(file);
    },
  },
};


</script>

<style>
.imgpreviewwithcreate{
  width:100%;
}
</style>
