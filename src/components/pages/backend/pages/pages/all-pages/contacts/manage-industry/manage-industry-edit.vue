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
                      <h5 class="card-title mb-0 mt-2">Industry Verticals Edit</h5>
                  </div>
                  <div class="card-body">
                      <form>
                          <div class="row-mb">
                              <div class="row mb-3">
                                <div class="col-sm-2">
                                  <label for="name" class="required">Name</label>
                                </div>
                                <div class="col-sm-10">
                                  <input type="text" v-model="industryData.name" id="name" class="form-control" required placeholder="Name">
                                  <div v-if="validationErrors && validationErrors.name" class="text-danger">
                                    {{ validationErrors.name[0] }}
                                  </div>
                                </div>
                              </div>
                              <div class="row mb-3">
                                <div class="col-sm-2">
                                  <label for="status" class="required">Status</label>
                                </div>
                                <div class="col-sm-10">
                                  <select v-model="industryData.status" id="status" class="form-select" required>
                                   <option value="0">Pending</option>
                                   <option value="1">Publish</option>
                                  </select>
                                  <div v-if="validationErrors && validationErrors.name" class="text-danger">
                                    {{ validationErrors.name[0] }}
                                  </div>
                                </div>
                              </div>
                              <div class="form-group text-end">
                                  <button type="button" @click="industrySave" class="btn  btn-primary btn-sm">
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
          { label: "Manage Industry Verticals", url: "/admin-contacts-industry-verticals" },
          { label: "Edit", url: "" },
        ],
        getLoader: false,
        industryData: {
            id : "",
            name : "",
            status : "",
        },
        validationErrors : null,
      };
    },
    async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role == 'Super' || role == 'Admin') {
          this.getIndustryData();
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    },
    methods: {
      getIndustryData(){
        this.getLoader = true;
          axios.get(this.globalVariables.apiUrl+`admin/contacts/industry-verticals/edit/${this.$route.params.id}`,  {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            this.industryData.id = res.data.industry.id;
            this.industryData.name = res.data.industry.name;
            this.industryData.status = res.data.industry.status;
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.getLoader =  false;
          })
      },

      industrySave(){
        this.getLoader = true;
          axios.post(this.globalVariables.apiUrl+`admin/contacts/industry-verticals/update`, this.industryData, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            toastr.success(res.data.message);
            this.$router.push('/admin-contacts-industry-verticals')
          })
          .catch((error) => {
            if(error && error.response && error.response.data && error.response.data.errors){
              this.validationErrors = error.response.data.errors;
            }
          })
          .finally(() => {
            this.getLoader =  false;
          })
      },
    },
  };
  </script>