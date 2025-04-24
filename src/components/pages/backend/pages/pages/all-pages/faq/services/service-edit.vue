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
              <div class="card " >
                  <div class="card-header">
                      <h5 class="card-title mb-0 mt-2">New Edit FAQ</h5>
                  </div>
                  <div class="card-body">
                      <form class="mt-3">
                          <div class="row-mb">
                              <div class="row">
                                  <div class="col-sm-2">
                                      <label for="name" class="required">Name</label>
                                  </div>
                                  <div class="col-sm-10">
                                      <input type="text" v-model="serviceCreateData.name" id="name" class="form-control" required>
                                      <div v-if="validationErrors && validationErrors.name" class="text-danger">
                                        {{ validationErrors.name[0] }}
                                    </div>
                                  </div>
                              </div>
                              <div class="row mt-4">
                                  <div class="col-sm-2">
                                      <label for="status" class="required">Status</label>
                                  </div>
                                  <div class="col-sm-10">
                                      <select v-model="serviceCreateData.status" id="status" class="form-select">
                                          <option value="0">Pending</option>
                                          <option value="1">Publish</option>
                                      </select>
                                      <div v-if="validationErrors && validationErrors.status" class="text-danger">
                                        {{ validationErrors.status[0] }}
                                    </div>
                                  </div>
                              </div>
                              <div class="form-group text-end mt-4">
                                  <button type="button" @click="ServicesSave()" class="btn btn-primary btn-sm">
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
          serviceCreateData: {
              name : "",
              status : "",
          },
          breadcrumbs: [
          { label: "Dashboard", url: "/dashboard" },
          { label: "FAQ", url: "" },
          { label: "Services", url: "/admin-faq-services" },
          { label: "Edit", url: "" },
        ],   
        getLoader: false,
        validationErrors : null,
        };
      },
      async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role == 'Super' || role == 'Admin') {
          this.ServicesEditData();
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    },
      methods: {
        ServicesEditData(){
            this.getLoader = true;
            axios.get(this.globalVariables.apiUrl+`admin/faq/services/edit/${this.$route.params.id}`, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
              },
            })
            .then((res) => {
                this.serviceCreateData.name = res.data.faqService.service_name;
                this.serviceCreateData.status = res.data.faqService.status;
            })
            .catch((error) => {
              console.log(error);
            })
            .finally(() => {
              this.getLoader = false;
            })
        },
        ServicesSave(){
            this.getLoader = true;
            axios.post(this.globalVariables.apiUrl+`admin/faq/services/update/${this.$route.params.id}`, this.serviceCreateData, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
              },
            })
            .then((res) => {
              toastr.success(res.data.message);
              this.$router.push('/admin-faq-services');
            })
            .catch((error) => {
              if(error && error.response && error.response.data && error.response.data.errors){
                this.validationErrors = error.response.data.errors;
              }
            })
            .finally(() => {
              this.getLoader = false;
            })
        },
      },
    };
    </script>