<template>
    <!-- <div v-if="getLoader">
      <Loader></Loader>
    </div> -->
    <!-- Content wrapper -->
    <div class="content-wrapper">
      <!-- Content -->
  
      <div class="container-xxl flex-grow-1 container-p-y">
        <div class="row mt-4">
          <div class="container-xxl flex-grow-1 container-p-y">
            <div class="row">
                <div class="col-md-6">
                  <div class="card">
                      <div class="card-header">
                        <h3 class="text-center">Total Pages</h3>
                        <h4 class="text-center">{{ totalPages ?? 0 }}</h4>
                      </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="card">
                    <div class="card-header">
                        <h3 class="text-center">Total Blogs</h3>
                        <h4 class="text-center">{{ totalBlogs ?? 0 }}</h4>
                      </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      <!-- / Content -->
    </div>
    <!-- Content wrapper -->
</template>
  
  <script>
  import axios from "axios";
  import "toastr/build/toastr.min.css";
  import Loader from "../../../../../../../frontend/include/loder.vue";
  import "vue3-carousel/dist/carousel.css";
  import { inject } from "vue";
  import { fetchUserRoleAuthor } from "@/services/fetchUserRoleAuthor";
  
  export default {
    setup() {
      const globalVariables = inject("globalVariables");
      return { globalVariables };
    },
    components: {
      Loader,
    },
    data: () => {
      return {
        totalBlogs: "",
        totalPages : "",
      };
    },
    async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRoleAuthor();
        if (role == 'Author') {
          if (this.$route.params.id === "user") {
          if (!localStorage.getItem("reloadCount")) {
            localStorage.setItem("reloadCount", 0);
          }
          this.reloadCount = parseInt(localStorage.getItem("reloadCount"));
          if (this.reloadCount === 0) {
            localStorage.setItem("reloadCount", 1);
            location.reload(true);
          } else {
            this.getDashboardCountData();
            localStorage.setItem("reloadCount", 0);
          }
        } else {
          this.getDashboardCountData();
        }
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    },
    methods: {
      getDashboardCountData() {
        this.getLoader = true;
        axios
          .get(this.globalVariables.apiUrl + "author/dashboard/data", {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          })
          .then((res) => {
            this.totalBlogs = res.data.blogs;
            this.totalPages = res.data.pages;
          })
          .catch((error) => {
            return error;
          })
          .finally(() => {
            this.getLoader = false;
        });
      },

      
    },
  };
  </script>
<style>
</style>