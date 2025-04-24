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
              <div class="col-md-12 mx-auto">
              <div class="card">
                  <div class="card-header">
                      <h5 class="card-title mb-0 mt-2">Edit How To Work</h5>
                  </div>
                  <div class="card-body">
                      <form>
                          <div class="row-mb">
                              <div class="row">
                                <div class="col-sm-2">
                                  <label for="title" class="required">Title</label>
                                </div>
                                <div class="col-sm-10">
                                  <input type="text" v-model="howToWorkCreate.title" id="title" class="form-control" required placeholder="Enter Title">
                                  <div v-if="validationErrors && validationErrors.title" class="text-danger">
                                    {{ validationErrors.title[0] }}
                                   </div>
                                </div>
                              </div>
  
                              <div class="row mt-3">
                                <div class="col-sm-2">
                                  <label for="sub_title" class="required">Sub Title</label>
                                </div>
                                <div class="col-sm-10">
                                  <input type="text" v-model="howToWorkCreate.sub_title" id="sub_title" class="form-control" required placeholder="Enter Sub Title">
                                  <div v-if="validationErrors && validationErrors.sub_title" class="text-danger">
                                    {{ validationErrors.sub_title[0] }}
                                  </div>
                                </div>
                              </div>
                              <div class="row align-items-center mt-3">
                                  <div class="row">
                                    <div class="col-sm-2">
                                      <label for="" class="required">How To Work Image</label>
                                    </div>
                                    <div class="col-sm-10 row">
                                      <div class="col-sm-6">
                                        <input type="file" accept="image/*" ref="myFile" @change="howToWorkImage($event)" class="form-control" id="image">
                                        <span style="background: #e9fff7; font-size: 12px; cursor: help;"
                                            class="py-1 px-2 d-block">Valid image:
                                            jpg,png,svg,jpeg</span>
                                      </div>
                                        <div class="col-sm-6">
                                            <img v-if="howToWorkShowImage.image" :src="howToWorkShowImage.image" class="largeImage">
                                        </div>
                                        <div v-if="validationErrors && validationErrors.image" class="text-danger">
                                          {{ validationErrors.image[0] }}
                                      </div>
                                    </div>
                                  </div>
                              </div>
  
                              <div class="form-group text-end">
                                  <button type="button" @click="howToWorksSave" class="btn btn-primary btn-sm">
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
          { label: "How To Work", url: "/admin-appearance-howtowork" },
          { label: "Edit", url: "" },
        ],
        getLoader: false,
        howToWorkCreate: {
          title : "",
          sub_title : "",
          image : "",
         },
         howToWorkShowImage : {
          image : "",
         },
         validationErrors : null,
       };
    },
    async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role == 'Super' || role == 'Admin') {
          this.gethowToWorkData();
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    },
    methods: {
        gethowToWorkData(){
        this.getLoader = true;
          axios.get(this.globalVariables.apiUrl+`admin/appearance/howtowork/edit/${this.$route.params.id}`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            this.howToWorkCreate.title = res.data.howtowork.title;
            this.howToWorkCreate.sub_title = res.data.howtowork.short_title;
            this.howToWorkShowImage.image = this.globalVariables.appUrl+res.data.howtowork.image;
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.getLoader = false;
          });
      },

      howToWorksSave(){
        this.getLoader = true;
          axios.post(this.globalVariables.apiUrl+`admin/appearance/howtowork/update/${this.$route.params.id}`, this.howToWorkCreate, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            toastr.success(res.data.message);
            this.$router.push('/admin-appearance-howtowork');
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
      howToWorkImage(event) {
        const file = event.target.files[0];
        this.howToWorkCreate.image = file;
        if (!file || file.type.indexOf('image/') === -1) return;
        const reader = new FileReader();
        reader.onload = () => {
          this.howToWorkShowImage.image = reader.result; // Update imgsrc with filename
        };
        reader.readAsDataURL(file);
      },
    },
  }
  </script>