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
          <div class="col-md-12 mx-auto col-12">
            <div class="card">
              <div class="card-header custom-card-header">
                <h5 class="card-title mb-0 mt-2">New Banner Edit</h5>
              </div>
              <div class="card-body">
                <form>
                  <div class="row-mb">
                    <div class="row">
                      <div class="col-sm-2">
                        <label for="banner" class="required">Banner</label>
                      </div>
                      <div class="col-sm-10">
                        <input type="file" @change="handleImageUpload" id="banner" class="form-control"  required/>
                        <span class="text-warning">The image max size 1M, type: jpg, png, jpeg, svg</span>
                        <div v-if="validationErrors && validationErrors.banner" class="text-danger">
                          {{ validationErrors.banner[0] }}
                        </div>
                        <div v-if="showBannerImage.image != null">
                            <img :src="showBannerImage.image" alt="image" id="showImage">
                        </div>
                      </div>
                    </div>
  
                    <div class="row mt-3">
                      <div class="col-sm-2">
                        <label for="role" class="required">Role</label>
                      </div>
                      <div class="col-sm-10">
                        <select v-model="bannerInput.role" id="role" class="form-select" required>
                        <option value="">Select Role</option>
                        <option value="2">Advertiser</option>
                        <option value="3">Publisher</option>
                        </select>
                        <div v-if="validationErrors && validationErrors.role" class="text-danger">
                          {{ validationErrors.role[0] }}
                        </div>
                      </div>
                    </div>
  
                    <div class="row mt-3">
                      <div class="col-sm-2">
                        <label for="status" class="required">Status</label>
                      </div>
                      <div class="col-sm-10">
                        <select v-model="bannerInput.status" id="status" class="form-select" required>
                          <option value="">Select Status</option>
                        <option value="0">Pending</option>
                        <option value="1">Publish</option>
                        </select>
                        <div v-if="validationErrors && validationErrors.status" class="text-danger">
                          {{ validationErrors.status[0] }}
                        </div>
                      </div>
                    </div>
  
                    <div class="row mt-3">
                      <div class="col-sm-2">
                        <label for="offer" class="required">Offer</label>
                      </div>
                      <div class="col-sm-10">
                        <select v-model="bannerInput.offer" id="offer" class="form-select" required>
                        <option value="">Select Offer</option>
                        <option v-for="adminoffer in bannerCreate.offers" :value="adminoffer.id" :key="adminoffer.id">
                          {{ adminoffer.name }}
                        </option>
                        </select>
                        <div v-if="validationErrors && validationErrors.offer" class="text-danger">
                          {{ validationErrors.offer[0] }}
                        </div>
                      </div>
                    </div>
                  </div>
  
                  <div class="form-group text-end mt-4">
                    <button type="button" @click="bannerUpdate" class="btn btn-primary btn-sm">
                      <i class="fas fa-check fa-sm me-2"></i>
                      Update
                    </button>
                  </div>
                </form>
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
    props : ['bannerCreate'],
    components: {
      Loader,
      Breadcrumb,
    },
    data: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: "/dashboard" },
          { label: "Banners", url: "/admin-banners" },
          { label: "Banner Edit", url: "" },
        ],
        getLoader: false,
        bannerInput: {
          role : "",
          status : "",
          offer : "",
          banner: null,
        },
        validationErrors : null,
        showBannerImage: {
            image : null,
        },
      };
    },
    async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role == 'Super' || role == 'Admin') {
          this.getBannerData();
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    },
    methods: {
      getBannerData(){
        axios
          .get(
            this.globalVariables.apiUrl+`admin/managebanners/banners/edit/${this.$route.params.id}`,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
          .then((res) => {
            var offerId = res.data.banner.link;
            var parts = offerId.split('/');
            var lastPart = parts[parts.length - 1];
            var lastId = parseInt(lastPart, 10);
            this.bannerInput.role = res.data.banner.role_id;
            this.bannerInput.status = res.data.banner.status;
            this.bannerInput.offer = lastId;
            this.showBannerImage.image = res.data.banner.image ? this.globalVariables.appUrl+res.data.banner.image : null;
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.getLoader =  false;
          });
      },

      handleImageUpload(event) {
        this.bannerInput.banner = event.target.files[0];
      },
      
      bannerUpdate() {
        this.getLoader = true;
        axios
          .post(
            this.globalVariables.apiUrl+`admin/managebanners/banners/update/${this.$route.params.id}`,
            this.bannerInput,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((res) => {
            toastr.success(res.data.message);
            this.$router.push('/admin-banners');
          })
          .catch((error) => {
            if(error && error.response && error.response.data && error.response.data.errors){
              this.validationErrors = error.response.data.errors;
            }
          })
          .finally(() => {
            this.getLoader =  false;
          });
      },
    },
  };
  </script>
  <style scoped>
    #showImage{
        width: 90px !important;
    }
 </style>
  