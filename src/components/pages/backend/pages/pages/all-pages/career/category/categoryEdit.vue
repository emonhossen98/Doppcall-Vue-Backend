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
              <div>
                <h5 class="card-title py-3 px-3 mb-0">Category</h5>
              </div>
              <div class="card-body">
                <form>
                  <div class="form-group">
                    <label for="name" class="required">Name</label>
                    <input type="text" id="name" v-model="categoryUpdate.name" class="form-control mt-1" placeholder="Enter Your Name!"/>
                    <div  v-if="validationErrors && validationErrors.name" class="text-danger">
                      {{ validationErrors.name[0] }}
                    </div>
                  </div>
                  <div class="form-group mt-3">
                    <label for="status" class="required">Status</label><br />
                    <select id="status" class="form-select mt-1" v-model="categoryUpdate.status">
                      <option value="1">Active</option>
                      <option value="2">Pending</option>
                    </select>
                    <div v-if="validationErrors && validationErrors.status" class="text-danger">
                      {{ validationErrors.status[0] }}
                    </div>
                  </div>
                  <div class="text-end form-group mt-4">
                    <button  type="button" @click="careerCategoryUpdate" class="btn btn-sm btn-primary">
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
        categoryUpdate: {
          name: "",
          status: "",
        },
        getLoader: false,
        breadcrumbs: [
          { label: "Dashboard", url: "/dashboard" },
          { label: "Career Category", url: "/admin-career-catagory" },
          { label: "Career Category Edit", url: "" },
        ],
        validationErrors: null,
      };
    },
    async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role == 'Super' || role == 'Admin') {
          this.getLoader = true;
          this.careerCategoryEdit();
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    },
    methods: {
      careerCategoryEdit() {
        axios 
          .get(this.globalVariables.apiUrl+`admin/career/catagory/edit/${this.$route.params.id}`,{
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          })
          .then((res) => {
            this.categoryUpdate.name = res.data.catagory.name;
            this.categoryUpdate.status = res.data.catagory.status;
          })
          .catch((error) => {
            return error;
          })
          .finally(() => {
            this.getLoader = false;
          });
      },

      careerCategoryUpdate() {
        this.getLoader = true,
        axios
          .put(this.globalVariables.apiUrl+`admin/career/catagory/update/${this.$route.params.id}`, this.categoryUpdate, {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          })
          .then((res) => {
            toastr.success(res.data.message);
            this.$router.push("/admin-career-catagory");
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
    },
  };
  </script>
  