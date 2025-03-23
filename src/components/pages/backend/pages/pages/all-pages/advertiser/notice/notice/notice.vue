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
            <div class="col-12">
                <div class="card">
                    <div class="card-header py-2">
                        <h5 class="mb-0 title">Notice</h5>
                    </div>
                    <div class="card-body">
                        <div class="row g-0">
                            <div class="col-md-6 col-12 mt-2">
                                <div class="notice" v-html="notice"></div>
                            </div>
                        </div>
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
  import Loader from "../../../../../../include/loader.vue";
  import Breadcrumb from "../../../../../../include/breadcrumb.vue";
  import { inject } from "vue";
  import { fetchUserRoleAdvertiser } from "@/services/userServiceAdvertiser";
  
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
          { label: "Dashboard", url: "/advertiser/dashboard" },
          { label: "Notice", url: "" },
        ],
        getLoader: false,
        notice: "",
      };
    },
    async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRoleAdvertiser();
        if (role == 'Advertiser') {
          this.getAdvertisherNotice();
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
  },
    methods: {
      getAdvertisherNotice() {
        this.getLoader = true;
        axios
          .get(this.globalVariables.apiUrl+"advertiser/notices", {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          })
          .then((res) => {
            this.notice = res.data.notice;
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.getLoader = false;
          });
      },
    },
  };
  </script>
  