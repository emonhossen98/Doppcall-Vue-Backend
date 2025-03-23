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
        <form>
        <div class="row">
            <div class="col-md-8 mx-auto">
                <div class="card">
                    <div class="card-header custom-card-header">
                        <h5 class="card-title mb-0">New account manager Create</h5>
                    </div>
                    <div class="card-body">
                        <div class="row mt-3">
                            <div class="col-md-6">
                                <label for="first_name" class="required mb-1">First Name</label>
                                <input type="text" v-model="managerCreate.first_name" required id="first_name" class="form-control" placeholder="Enter First Name">
                                <div v-if="validationErrors && validationErrors.first_name" class="text-danger">
                                  {{ validationErrors.first_name[0] }}
                              </div>
                            </div>
                            <div class="col-md-6 mt-3 mt-md-0">
                                <label for="last_name" class="required mb-1">Last Name</label>
                                <input type="text" v-model="managerCreate.last_name" required id="last_name" class="form-control" placeholder="Enter Last Name">
                                <div v-if="validationErrors && validationErrors.last_name" class="text-danger">
                                  {{ validationErrors.last_name[0] }}
                              </div>
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col-md-6">
                              <label for="skype" class="mb-1">Skype</label>
                              <input type="text" v-model="managerCreate.skype" required id="skype" class="form-control" placeholder="Enter Skype">
                            </div>
                            <div class="col-md-6 mt-3 mt-md-0">
                              <label for="telegram" class="mb-1">Telegram</label>
                              <input type="text" v-model="managerCreate.telegram" required id="telegram" class="form-control" placeholder="Enter Telegram">
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col-md-6">
                              <label for="facebook" class="mb-1">Facebook</label>
                              <input type="text" v-model="managerCreate.facebook" required id="facebook" class="form-control" placeholder="Enter Facebook">
                            </div>
                            <div class="col-md-6 mt-3 mt-md-0">
                              <label for="email" class="required mb-1">E-mail</label>
                              <input type="email" v-model="managerCreate.email" required id="email" class="form-control" placeholder="Enter E-mail">
                              <div v-if="validationErrors && validationErrors.email" class="text-danger">
                                {{ validationErrors.email[0] }}
                              </div>
                            </div>
                        </div>

                        <div class="row mt-3">
                            <div class="col-md-6">
                              <label for="phone_number" class="required mb-1">Phone Number</label>
                                <input type="text" v-model="managerCreate.phone_number" required id="phone_number" class="form-control" placeholder="Enter Phone Number">
                                <div v-if="validationErrors && validationErrors.phone_number" class="text-danger">
                                  {{ validationErrors.phone_number[0] }}
                              </div>
                            </div>
                            <div class="col-md-6 mt-3 mt-md-0">
                              <label for="profile_image" class="mb-1">Profile image</label>
                              <input type="file"  @change="handleImageUpload" class="form-control" id="profile_image">
                              <div v-if="validationErrors && validationErrors.profile_image" class="text-danger">
                                  {{ validationErrors.profile_image[0] }}
                              </div>
                              <span class="text-warning">The image dimensions 150*150 and max size 1M, type: jpg,png.jpeg.svg</span>
                            </div>
                        </div>
                        <div class="form-group text-end mt-4 submit-btn">
                            <button type="button"  @click="managerSave" class="btn btn-primary btn-sm"><i class="fas fa-check fa-sm me-1"></i>
                                    Create
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
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
  data: () => {
    return {
      breadcrumbs: [
        { label: "Dashboard", url: "/dashboard" },
        { label: "New Account Manager Create", url: "" },
      ],
      getLoader: false,
      managerCreate: {
        first_name : "",
        last_name : "",
        skype : "",
        telegram : "",
        facebook : "",
        email : "",
        phone_number : "",
        role_name : "4",
        profile_editable : "1",
        verifiable : "2023-12-31 11:59:31",
        accessable : "1",
        profile_image: null
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
    handleImageUpload(event) {
      this.managerCreate.profile_image = event.target.files[0];
    },
    managerSave() {
      this.getLoader = true;
      axios
        .post(this.globalVariables.apiUrl+"admin/manage/user/store", this.managerCreate, {
          headers: { 
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
         },
        })
        .then((res) => {
          if(res.data.status == 'success'){
            toastr.success(res.data.message);
            this.$router.push('/admin-manage-doppcall-team');
          }else{
            toastr.error(res.data.message);
          }
        })
        .catch((error) => {
          if(error && error.response && error.response.data && error.response.data.errors  != null){
            this.validationErrors = error.response.data.errors;
          }
      })
      .finally(() => {
        this.getLoader = false;
      });
    },
  },
};
</script>