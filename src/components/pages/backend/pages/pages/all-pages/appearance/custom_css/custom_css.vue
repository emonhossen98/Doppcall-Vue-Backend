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
            <form>
        <div class="row">
            <div class="col-md-12 mx-auto">
                <div class="card">
                    <div class="card-header  custom-card-header">
                        <h5 class="card-title mb-0">Custom CSS</h5>
                    </div>
                    <div class="card-body">
                        <div class="form-group mt-3">
                            <textarea v-model="costomeCss.custom_css_code" class="form-control" rows="5"></textarea>
                            <p class="direction py-1 px-2">No need to write {{ '<style> </style>' }} tag above.</p>
                        </div>
                        <div class="mt-3 text-end">
                          <button type="button" @click="customeCssSave"  class="btn btn-primary btn-sm">
                            <i class="fa fa-save me-2"></i> Save
                        </button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </form>
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
        { label: "Custom CSS", url: "" },
      ], 
      getLoader: false,
      costomeCss : {
        custom_css_code  : "",
      },
     };
  },
  async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role == 'Super' || role == 'Admin') {
          this.getCustomeCssData();
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    },
  methods: {
    customeCssSave(){
      this.getLoader = true;
        axios.post(this.globalVariables.apiUrl+"admin/appearance/custom-css/header", this.costomeCss, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          toastr.success(res.data.message);
          this.getCustomeCssData();
        })
        .catch((e) => {
          return e;
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    getCustomeCssData() {
      this.getLoader = true;
        axios.get(this.globalVariables.apiUrl+'admin/appearance/custom-css', { headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}})
        .then((res) => {
          this.costomeCss.custom_css_code = res.data.custom_css;
        })
        .catch((e) => {
          return e;
        })
        .finally(() => {
          this.getLoader = false;
        });
    },
  },
}
</script>