<template>
    <div v-if="getLoader">
      <Loader></Loader>
    </div>
      <!-- Content wrapper -->
      <div class="content-wrapper">
        <!-- Content -->
        <div class="container-fluid flex-grow-1 container-p-y">
          <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
          <div class="row mt-3">
            <div class="col-md-12 mx-auto">
              <div class="card">
                  <div class="card-header">
                      <h5 class="card-title mb-0 mt-2">Professional Agency Edit</h5>
                  </div>
                  <div class="card-body">
                      <form>
                        <div class="row align-items-center">
                          <div class="col-sm-2">
                            <label for="name" class="required">Name</label>
                          </div>
                          <div class="col-sm-10">
                            <input type="text" class="form-control" id="name" v-model="ProfessionalCreate.name" required>
                            <div v-if="validationErrors && validationErrors.name" class="text-danger">
                                {{ validationErrors.name[0] }}
                            </div>
                          </div>
                          </div>
                          <div class="row align-items-center mt-3">
                                  <div class="row">
                                    <div class="col-sm-2">
                                      <label for="image" class="required">Image</label>
                                    </div>
                                    <div class="col-sm-10 row">
                                      <div class="col-sm-6">
                                        <input type="file" accept="image/*" ref="myFile" @change="ProfessionalImage($event)" class="form-control" id="image">
                                        <span style="background: #e9fff7; font-size: 12px; cursor: help;"
                                            class="py-1 px-2 d-block">Valid image:
                                            jpg,png,svg,jpeg</span>
                                      </div>
                                        <div class="col-sm-6">
                                            <img v-if="ProfessionalShow.image" :src="ProfessionalShow.image" class="largeImage bg-dark">
                                        </div>
                                        <div v-if="validationErrors && validationErrors.image" class="text-danger">
                                          {{ validationErrors.image[0] }}
                                      </div>
                                    </div>
                                </div>
                              </div>
  
                          <div class="row-mb">
                              <div class="form-group text-end">
                                  <button type="button" @click="ProfessionalSave" class="btn btn-primary btn-sm" >
                                      <i class="fas fa-check fa-sm me-2"></i> 
                                      Update
                                  </button>
                              </div>
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
    components: {
      Loader,
      Breadcrumb,
    },
      data() {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: "/dashboard" },
          { label: "Appearance", url: "" },
          { label: "Professional Agency", url: "/admin-appearance-professional-agency" },
          { label: "Edit", url: "" },
        ], 
        getLoader: false,
        ProfessionalCreate : {
          name : "",
          image  : "",
        },
        ProfessionalShow : {
          image  : "",
        },
        validationErrors : null,
       };
    },
    async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role == 'Super' || role == 'Admin') {
          this.ProfessionalData();
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    },
    methods: {
      ProfessionalData(){
          axios.get(this.globalVariables.apiUrl+`admin/appearance/professional-agency/edit/${this.$route.params.id}`,  {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            this.ProfessionalCreate.name = res.data.professional_agency.name;
            this.ProfessionalShow.image = this.globalVariables.appUrl+res.data.professional_agency.image;
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.getLoader = false;
          });
      },

      ProfessionalSave(){
          axios.post(this.globalVariables.apiUrl+`admin/appearance/professional-agency/update/${this.$route.params.id}`, this.ProfessionalCreate, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            toastr.success(res.data.message);
            this.$router.push('/admin-appearance-professional-agency');
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
  
      ProfessionalImage(event) {
        const file = event.target.files[0];
        this.ProfessionalCreate.image = file;
        if (!file || file.type.indexOf('image/') === -1) return;
        const reader = new FileReader();
        reader.onload = () => {
          this.ProfessionalShow.image = reader.result; // Update imgsrc with filename
        };
        reader.readAsDataURL(file);
      },
    },
  }
  </script>