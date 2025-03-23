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
                    <div class="card-header border-bottom">
                        <h5 class="mb-0">Rules</h5>
                    </div>
                    <div class="card-body">
                        <div class="row g-0">
                            <div class="col-md-6 col-12 mt-2">
                                <template v-if="rules != null && rules != '' && rules != '<p><br></p>'">
                                  <div class="rules" v-html="rules"></div>
                                </template>
                                <template v-else>
                                 <span class="text-danger">No Rules at The Moment</span>
                                </template>
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
  import { fetchUserRolePublisher } from "@/services/userServicePublisher";
  
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
          { label: "Dashboard", url: "/publisher/dashboard" },
          { label: "Rules", url: "" },
        ],
        getLoader: false,
        rules: "",
      };
    },
    async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRolePublisher();
        if (role == 'Publisher') {
          this.getPublisherRulesGuide();
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    },
    methods: {
      getPublisherRulesGuide() {
        this.getLoader = true;
        axios
          .get(this.globalVariables.apiUrl+"publisher/rules", {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          })
          .then((res) => {
            this.rules = res.data.data;
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
  