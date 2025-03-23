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
            <div class="col-md-8 mx-auto">
            <div class="card ">
              <div class="card-header">
                <h5 class="card-title mb-0 mt-2">Call Marketing Edit</h5>
              </div>
              <div class="card-body">
                <form>
                  <div class="row-mb">
                    <div class="row">
                      <div class="col-sm-3">
                        <label for="call_marketing_title" class="required">Call Marketing Title</label>
                      </div>
                      <div class="col-sm-9">
                        <input type="text" required v-model="callMarketingUpdate.call_marketing_title" id="call_marketing_title"  class="form-control"/>
                        <div v-if="validationErrors && validationErrors.call_marketing_title" class="text-danger">
                          {{ validationErrors.call_marketing_title[0] }}
                        </div>
                      </div>
                    </div>
  
                    <div class="row mt-3 ">
                      <div class="col-sm-3">
                        <label for="call_marketing_description" class="required">Call Marketing Description</label>
                      </div>
                      <div class="col-sm-9">
                        <input  type="text"  required v-model="callMarketingUpdate.call_marketing_description" id="call_marketing_description" class="form-control"/>
                        <div v-if="validationErrors && validationErrors.call_marketing_description" class="text-danger">
                          {{ validationErrors.call_marketing_description[0] }}
                        </div>
                      </div>
                    </div>
  
                    <div class="row mt-3 ">
                      <div class="col-sm-3">
                        <label for="status" class="required">Status</label>
                      </div>
                      <div class="col-sm-9">
                        <select id="status"  v-model="callMarketingUpdate.status" class="form-select">
                        <option value="">Select Status</option>
                        <option value="1">Publish</option>
                        <option value="0">Pending</option>
                      </select>
                      </div>
                    </div>
  
                    <div class="row  mt-3">
                       <div class="col-sm-3">
                        <label for="image" class="required">Image</label>
                       </div>
                        <div class="row col-sm-9">
                          <div class="col-sm-6">
                            <input type="file" accept="image/*" ref="myFile" @change="primaryLogo($event)" class="form-control" id="image"> 
                            <span style="background: #e9fff7; font-size: 12px; cursor: help;"
                                class="py-1 px-2 d-block">Valid image:
                                jpg,png,svg,jpeg</span>
                            <div v-if="validationErrors && validationErrors.image" class="text-danger">
                            {{ validationErrors.image[0] }}
                            </div>
                          </div>
                          <div class="col-sm-6">
                            <img v-if="callMarketingShowImage.image" :src="callMarketingShowImage.image" class="imgpreview">
                          </div>
                        </div>
                    </div>
                    <div class="form-group text-end mt-3">
                      <button type="button" @click="callMarketingSave" class="btn btn-sm btn-primary">
                        <i class="fas fa-check me-2"></i>Update
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
    components:{
      Loader,
      Breadcrumb,
    },
    data: () => {
      return {
        callMarketingUpdate: {
          call_marketing_title: "",
          call_marketing_description: "",
          status: "",
          image: null,
        },
        callMarketingShowImage : {
          image: null,
        },
        getLoader: false,
        breadcrumbs: [
            { label: "Dashboard", url: "/dashboard" },
            { label: "Call Marketing", url: "/admin-about-call-marketing" },
            { label: "Call Marketing Edit", url: "" },
        ],
        validationErrors  : null,
      };
    },
    async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role == 'Super' || role == 'Admin') {
          this.callMarketingEditData();
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    },
    methods: {
        callMarketingSave() {
        this.getLoader = true;
        axios
          .post(
            this.globalVariables.apiUrl+`admin/about/call-marketing/update/${this.$route.params.id}`,
            this.callMarketingUpdate,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((res) => {
            toastr.success(res.data.message);
            this.$router.push("/admin-about-call-marketing");
          })
          .catch((error) => {
            return error;
          })
          .finally(() => {
            this.getLoader = false;
        });
      },

      callMarketingEditData() {
        this.getLoader = true;
        axios
          .get(
            this.globalVariables.apiUrl+`admin/about/call-marketing/edit/${this.$route.params.id}`, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
              },
            }
          )
          .then((res) => {
            this.callMarketingUpdate.call_marketing_title = res.data.call_merketing.title;
            this.callMarketingUpdate.call_marketing_description = res.data.call_merketing.description;
            this.callMarketingUpdate.status = res.data.call_merketing.status;
            this.callMarketingShowImage.image = this.globalVariables.appUrl+res.data.call_merketing.image;
          })
          .catch((error) => {
            return error;
          })
          .finally(() => {
            this.getLoader = false;
        });
      },

      primaryLogo(event) {
          const file = event.target.files[0];
          this.callMarketingUpdate.image = file;
          if (!file || file.type.indexOf('image/') === -1) return;
          const reader = new FileReader();
          reader.onload = () => {
            this.callMarketingShowImage.image = reader.result;
          };
          reader.readAsDataURL(file);
      },
    },
  };
  </script>
  <style>
  .imgpreview{
    width: 150px;
  }
  </style>
  