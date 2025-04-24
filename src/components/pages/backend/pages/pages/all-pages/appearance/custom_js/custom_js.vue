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
                          <div class="card ">
                              <div class="card-header custom-card-header">
                                  <h5 class="card-title mb-0 mt-2">Custom Script</h5>
                              </div>
                              <div class="card-body">
                                  <div class="form-group mt-4 ">
                                      <label for="header-script" class="mb-1" style="font-size: 15px;">Header JS</label>
                                      <textarea v-model="costomeJS.header_script"  class="header-script form-control" rows="5"></textarea>

                                      <pre class="direction py-1 px-2 d-block">JS in header of page. wrap it inside {{ '<script></script>' }}</pre>
                                  </div>

                                  <div class="form-group mt-4">
                                      <label for="footer-script"  class="mb-1" style="font-size: 15px;">Footer JS</label>
                                      <textarea v-model="costomeJS.footer_script"  id="footer-script" class="footer-script form-control" rows="5"></textarea>

                                      <pre class="direction py-1 px-2 d-block">JS in footer of page, wrap it inside {{ '<script></script>' }}</pre>
                                  </div>
                                  
                                  <div class="form-group mt-4">
                                      <label for="body-script" class="mb-1" style="font-size: 15px;">Body JS code</label>
                                      <textarea v-model="costomeJS.body_script"  id="body-script" class="body-script form-control" rows="5"></textarea>

                                      <pre class="direction py-1 px-2 d-block">Add JS code for body {{ '<script></script>' }}</pre>
                                  </div>
                                  <div class="mt-3 text-end">
                                  <button type="button" @click="customeJSSave()" class="btn btn-primary btn-sm">
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
        { label: " Custom JS", url: "" },
      ], 
      getLoader: false,
      costomeJS : {
        header_script : "",
        footer_script : "",
        body_script  : "",
      },
     };
  },
  async mounted() { 
    try {
      const { role, isAuthorized } = await fetchUserRole();
      if (role == 'Super' || role == 'Admin') {
        this.getCustomeJSData();
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  },
  methods: {
    customeJSSave(){
      this.getLoader = true;
        axios.post(this.globalVariables.apiUrl+"admin/appearance/custom-js/store", this.costomeJS, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          toastr.success(res.data.message);
          this.getCustomeJSData();
        })
        .catch((e) => {
          return e;
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    getCustomeJSData() {
      this.getLoader = true;
        axios.get(this.globalVariables.apiUrl+'admin/appearance/custom-js', { headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}})
        .then((res) => {
          this.costomeJS.header_script = res.data.custom_header_js;
          this.costomeJS.footer_script = res.data.custom_footer_js;
          this.costomeJS.body_script = res.data.custom_body_code;
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

