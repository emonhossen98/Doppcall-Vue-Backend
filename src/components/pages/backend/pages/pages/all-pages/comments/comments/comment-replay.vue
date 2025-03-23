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
            <div class="col-sm-8" style="margin: 0 auto">
            <div class="card">
                <div class="card-header py-2">
                    <h5 class="card-title d-flex justify-content-between align-items-center mb-0">Reply Edit 
                    </h5>
                </div>
                <div class="card-body">
                    <form>
                        <div class="form-group mt-4">
                            <label for="reply">Reply <span class="text-danger">*</span></label>
                            <textarea v-model="replay.reply" id="reply" class="form-control" rows="3" placeholder="Enter Replay"></textarea>
                            <div v-if="validationErrors && validationErrors.reply" class="text-danger">
                                {{ validationErrors.reply[0] }}
                            </div>
                        </div>
                        <div class="form-group mt-4 text-end">
                            <button type="button" class="btn btn-primary btn-sm" @click="ReplayDataSave()">Update</button>
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
    data: () => {
      return {
        breadcrumbs: [
          { label: "Dashboard", url: "/dashboard" },
          { label: "Comments", url: "/admin-comments" },
          { label: "Reply Edit ", url: "" },
        ],
        getLoader: false, 
        replay : {
            reply : "",
        },
        validationErrors : null,
      };
    },
    async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role == 'Super' || role == 'Admin') {
          this.getReplayData();
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    },
    methods: {
      getReplayData() {
        this.getLoader = true;
        axios
          .get(this.globalVariables.apiUrl+`admin/comments/reply/edit/${this.$route.params.id}`, {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          })
          .then((res) => {
            this.replay.reply = res.data.reply.reply;
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.getLoader = false;
          });
      },

      ReplayDataSave() {
        this.getLoader = true;
        axios
          .post(this.globalVariables.apiUrl+`admin/comments/reply/update/${this.$route.params.id}`, this.replay,{
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          })
          .then((res) => {
            toastr.success(res.data.message);
            this.$router.push('/admin-comments');
          })
          .catch((error) => {
            if(error && error.response && error.response.data && error.response.data.errors){
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
  