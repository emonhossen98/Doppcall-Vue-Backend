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
            <div class="card-header mt-2 mb-0">
              <h4 class="mb-0 title">Latest Articles</h4>
            </div>
            <div class="card-body">
              <div class="row g-4">
                <template v-for="(blog,index) in blogs" :key="index">
                  <div class="col-md-3 col-12">
                    <a style="line-height: 31px;" :href="'https://doppcall.com/blog/'+blog.slug" target="_blank">
                    <div class="card">
                    <div class="card-img publisher-blog-image px-3" :style="{ backgroundImage: 'url(' +globalVariables.appUrl+ blog.feature_image + ')' }" ></div>
                      <div class="card-body">
                        <h5 class="card-title">{{ truncatedTitle(blog.title) ?? '' }}</h5>
                      </div>
                    </div>
                    </a>
                  </div>
                </template>
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
        { label: "Pay Per Call Guides", url: "" },
      ],
      getLoader: false,
      blogs: "",
    };
  },
  async mounted() { 
    try {
      const { role, isAuthorized } = await fetchUserRolePublisher();
      if (role == 'Publisher') {
        this.getPublisherPayParGuide();
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  },
  methods: {
    getPublisherPayParGuide() {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl+"publisher/news", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
            this.blogs = res.data.blogs;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.getLoader = false;
        });
    },
    truncatedTitle(title) {
      const maxLength = 40; 
      return title.length > maxLength ? title.slice(0, maxLength) + '...' : title;
    }
  },
};
</script>
<style scoped>
.publisher-blog-image {
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	width: 100%;
	height: 150px;
}
</style>

