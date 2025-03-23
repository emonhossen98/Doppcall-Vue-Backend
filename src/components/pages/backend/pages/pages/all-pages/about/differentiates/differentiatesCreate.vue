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
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">Differentiates Create</h5>
            </div>
            <div class="card-body">
              <form>
                <div class="row-mb">
                  <div class="row">
                    <div class="col-sm-3">
                      <label for="differentiates_title" class="required">Differentiates Title</label>
                    </div>
                    <div class="col-sm-9">
                      <input type="text" required v-model="differentiatesCreate.differentiates_title" id="differentiates_title" class="form-control" placeholder="Enter Differentiates Title"/>
                      <div v-if="validationErrors && validationErrors.differentiates_title" class="text-danger">
                      {{ validationErrors.differentiates_title[0] }}
                      </div>
                    </div>
                  </div>

                  <div class="row mt-3">
                    <div class="col-sm-3">
                      <label for="differentiates_description" class="required">Differentiates Description</label>
                    </div>
                    <div class="col-sm-9">
                      <input type="text" required v-model="differentiatesCreate.differentiates_description" id="differentiates_description" class="form-control" placeholder="Enter Differentiates Description">
                      <div v-if="validationErrors && validationErrors.differentiates_description" class="text-danger">
                      {{ validationErrors.differentiates_description[0] }}
                      </div>
                    </div>
                  </div>

                  <div class="row mt-3">
                    <div class="col-sm-3">
                      <label for="status" class="required">Status</label>
                    </div>
                    <div class="col-sm-9">
                    <select id="status" v-model="differentiatesCreate.status" class="form-select">
                      <option value="">Select Status</option>
                      <option value="1">Publish</option>
                      <option value="0">Pending</option>
                    </select>
                    <div v-if="validationErrors && validationErrors.status" class="text-danger">
                      {{ validationErrors.status[0] }}
                    </div>
                  </div>
                  </div>
                  <div class="row mt-3">
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
                        <img v-if="differentiatesShowImage.image" :src="differentiatesShowImage.image" class="imgpreview">
                      </div>
                    </div>
                  </div>
                  <div class="form-group text-end mt-3">
                    <button type="button" @click="offersDifferentiatesSave" class="btn btn-sm btn-primary">
                      <i class="fas fa-check me-2"></i>Create
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
      differentiatesCreate: {
        differentiates_title: "",
        differentiates_description: "",
        status: "",
        image: null,
      },
      differentiatesShowImage :{
        image: null,
      },
      getLoader: false,
      breadcrumbs: [
          { label: "Dashboard", url: "/dashboard" },
          { label: "Differentiates", url: "/admin-about-differentiates" },
          { label: "Differentiates Create", url: "" },
      ],
      validationErrors: "",
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
    offersDifferentiatesSave() {
      this.getLoader = true;
      axios
        .post(
          this.globalVariables.apiUrl+"admin/about/differentiates/store",
          this.differentiatesCreate,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          toastr.success(res.data.message);
          this.$router.push("/admin-about-differentiates");
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
     primaryLogo(event) {
      const file = event.target.files[0];
      this.differentiatesCreate.image = file;
      if (!file || file.type.indexOf('image/') === -1) return;
      const reader = new FileReader();
      reader.onload = () => {
        this.differentiatesShowImage.image = reader.result;
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
