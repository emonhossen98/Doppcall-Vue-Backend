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
            <div class="col-md-7 mx-auto col-12">
            <div class="card">
                <div class=" border-bottom">
                    <h5 class="mb-0 px-3 py-3">New offer Category</h5>
                </div>
                <div class="card-body mt-3">
                    <form>
                        <div class="row align-items-center">
                        <div class="col-sm-3">
                          <label for="category" class="required">Category Name</label>
                        </div>
                        <div class="col-sm-9">
                          <input type="text" id="category" v-model="offersCategoeieCreate.category" class="form-control mt-2" placeholder="Enter Your Category Name ..">
                          <div v-if="validationErrors && validationErrors.category" class="text-danger">
                            {{ validationErrors.category[0] }}
                        </div>
                        </div>
                        </div>
                        <div class="form-group text-end mt-3">
                            <button type="button" @click="offersCategoriesSave" class="btn btn-sm btn-primary">Create</button>
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
      offersCategoeieCreate: {
        category: "",
      },
      getLoader: false,
      breadcrumbs: [
        { label: "Dashboard", url: "/dashboard" },
        { label: "Categories", url: "/admin-offers-categories" },
        { label: "Create", url: "" },
      ],
      validationErrors: null,
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
    offersCategoriesSave() {
      this.getLoader = true,
      axios
        .post(this.globalVariables.apiUrl+"admin/offers/categories/store", this.offersCategoeieCreate, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          toastr.success('Category Create Successfuly');
          this.$router.push("/admin-offers-categories");
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