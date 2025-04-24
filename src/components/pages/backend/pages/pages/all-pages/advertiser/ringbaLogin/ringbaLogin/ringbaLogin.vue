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
        <div class="col-12">
            <iframe :src="alt_ringba_url" frameborder="0" width="100%" height="600px"></iframe>
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
        { label: "Ringba Login", url: "" },
      ],
      getLoader: false,
      alt_ringba_url : "",
    };
  },
  async mounted() { 
    try {
      const { role, isAuthorized } = await fetchUserRoleAdvertiser();
      if (role == 'Advertiser') {
        this.getAdvertiserRingbaLogin();
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  },
  methods: {
    getAdvertiserRingbaLogin() {
      this.getLoader = true;
      axios 
        .get(this.globalVariables.apiUrl+"advertiser/ringba-account", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          this.alt_ringba_url = res.data.ringba_link;
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
