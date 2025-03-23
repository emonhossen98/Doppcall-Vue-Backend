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
          <div class="col-md-8 mx-auto col-12">
            <div class="card">
              <div class="border-bottom">
                <h5 class="mb-0 px-3 py-3 fw-bloder">New offer Type</h5>
              </div>
              <div class="card-body mt-3">
                <form>
                  <div class="row align-items-center">
                  <div class="col-sm-2">
                    <label for="type_name" class="required">Type Name</label>
                  </div>
                  <div class="col-sm-10">
                    <input type="text" id="type_name" class="form-control mt-2" v-model="offerType.type_name" placeholder="Enter Type Name" />
                    <div v-if="validationErrors && validationErrors.type_name" class="text-danger">
                        {{ validationErrors.type_name[0] }}
                     </div>
                  </div>
                  </div>
  
                  <div class="form-group text-end mt-3">
                    <button type="button" @click="typeUpdate" class="btn btn-sm btn-primary">
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
        getLoader: false,
        breadcrumbs: [
          { label: "Dashboard", url: "/dashboard" },
          { label: "Types", url: "/admin-offers-types" },
          { label: "Edit", url: "" },
        ],
        offerType: {
          type_name: '',
        },
        validationErrors: null,
      };
    },
    async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role == 'Super' || role == 'Admin') {
          this.typeEditData();
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    },
    methods: {
      typeUpdate() {
        this.getLoader = true,
        axios
          .post(this.globalVariables.apiUrl+`admin/offers/types/update/${this.$route.params.id}`, this.offerType, {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          })
          .then((res) => {
            toastr.success(res.data.message);
            this.$router.push("/admin-offers-types");
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

      typeEditData() {
        this.getLoader = true,
        axios
          .get(this.globalVariables.apiUrl+`admin/offers/types/edit/${this.$route.params.id}`,{
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          })
          .then((res) => {
            this.offerType.type_name = res.data.offerType.type;
          })
          .catch((error) => {
           return error;
          })
          .finally(() => {
            this.getLoader = false;
          });;
      },
    },
  };
  </script>
  