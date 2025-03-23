<template>
    <div v-if="getLoader">
          <Loader></Loader>
        </div>
      <!-- Content wrapper -->
      <div class="content-wrapper">
        <!-- Content -->
        <!-- {{ allowtraffice }} -->
        <div class="container-xxl flex-grow-1 container-p-y">
          <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
          <div class="row mt-4">
            <div class="col-md-8 mx-auto">
                <div class="card">
                    <div class="card-header custom-card-header">
                        <h5 class="card-title">Allow Traffic Edit</h5>
                    </div>
                    <div class="card-body">
                        <form>
                            <div class="row align-items-center">
                              <div class="col-sm-2">
                                <label for="name" class="required mb-2">Name</label>
                              </div>
                              <div class="col-sm-10">
                                <input type="text" v-model="offersTrafficCreate.name" id="name" class="form-control" placeholder="Enter Traffic Name !">
                                <div v-if="validationErrors && validationErrors.name" class="text-danger">
                                      {{ validationErrors.name[0] }}
                                </div>
                              </div>
                            </div>
    
                            <div class="px-4 text-end mb-2 mt-3">
                                <button type="button" @click="offersTrafficSave()" class="btn btn-sm btn-primary">
                                    <i class="fa fa-save me-1"></i>Update
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
  import Loader from '../../../../../include/loader.vue';
  import Breadcrumb from '../../../../../include/breadcrumb.vue';
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
        offersTrafficCreate: {
          name: "",
        },
        getLoader: false,
        breadcrumbs: [
          { label: "Dashboard", url: "/dashboard" },
          { label: "Allow Traffic", url: "/admin-allow-traffic" },
          { label: "Allow Traffic Edit", url: "" },
        ],
        validationErrors: null,
      };
    },
    async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role == 'Super' || role == 'Admin') {
          this.getallowEditData(this.$route.params.id);
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    },
    methods: {
      offersTrafficSave() {
        this.getLoader = true,
        axios
          .post(this.globalVariables.apiUrl+`admin/allow-traffic/update/${this.$route.params.id}`, this.offersTrafficCreate, {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          })
          .then((res) => {
            toastr.success(res.data.message);
            this.$router.push("/admin-allow-traffic");
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

      getallowEditData(id) {
        this.getLoader = true,
        axios
          .get(this.globalVariables.apiUrl+`admin/allow-traffic/edit/${id}`, {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          })
          .then((res) => {
             this.offersTrafficCreate.name = res.data.allowTrafic.title;
          })
          .catch((e) => {
            return e;
          })
          .finally(() => {
            this.getLoader = false;
          });
      },
    },
  };
  </script>

<style>
#btn-style-edit {
	background: rgba(55,125,255,.15) !important;
	color: #377dff !important;
	padding: 7px 9px !important;
	border-radius: 50% !important;
	border: none !important;
	margin-right: 5px;
}
</style>