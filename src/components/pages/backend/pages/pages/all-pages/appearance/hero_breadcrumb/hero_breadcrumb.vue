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
            <div class="card ">
                <div class="card-header ">
                    <h5 class="card-title mb-0 mt-2">Hero Breadcrumb Setting</h5>
                </div>
                <div class="card-body">
                    <form>
                        <div class="row-mb-0">
                            <div class="card-header ps-0 ">
                                <h5 class="card-title mb-2">About</h5>
                            </div>
                            <div class="row mb-3">
                                <div class="col-sm-2">
                                <label for="title">Title</label>
                                </div>
                                <div class="col-sm-10">
                                <input type="text" v-model="heroBreadcrumb.title" id="title" class="form-control" required>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-2">
                                <label for="description">Description</label>
                                </div>
                                <div class="col-sm-10">
                                <textarea v-model="heroBreadcrumb.description" id="description" cols="30" rows="3" class="form-control"></textarea>
                                </div>
                            </div>
                        </div>

                        <div class="contact">
                            <div class="card-header ps-0">
                                <h5 class="card-title mb-0">Contact</h5>
                            </div>

                            <div class="row-mb mt-2">
                            <div class="row mb-3">
                                    <div class="col-sm-2">
                                <label for="contact_title">Title</label>
                                </div>
                                <div class="col-sm-10">
                                <input type="text" v-model="heroBreadcrumb.contact_title" id="contact_title" class="form-control" required>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-2">
                                <label for="contact_description">Description</label>
                                </div>
                                <div class="col-sm-10">
                                <textarea v-model="heroBreadcrumb.contact_description" id="contact_description" cols="30" rows="3" class="form-control"></textarea>
                                </div>
                            </div>
                            </div>
                        </div>

                        <div class="blog">
                            <div class="card-header ps-0">
                                <h5 class="card-title mb-0">Blog</h5>
                            </div>

                            <div class="row-mb mt-2">
                                <div class="row mb-3">
                                <div class="col-sm-2">
                                <label for="blog_title">Title</label>
                                </div>
                                <div class="col-sm-10">
                                <input type="text" v-model="heroBreadcrumb.blog_title" id="blog_title" class="form-control" required>
                                </div>
                                </div>

                                <div class="row">
                                    <div class="col-sm-2">
                                    <label for="blog_description">Description</label>
                                    </div>
                                    <div class="col-sm-10">
                                    <textarea v-model="heroBreadcrumb.blog_description" id="blog_description" cols="30" rows="3" class="form-control"></textarea>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-12 text-end mt-3">
                                        <button type="button" @click="homeBreadcrumbSave" class="btn btn-primary btn-sm"><i class="fas fa-check"></i> Save Change</button>
                                    </div>
                                </div>
                            </div>
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
    data() {
    return {
      breadcrumbs: [
        { label: "Dashboard", url: "/dashboard" },
        { label: "Appearance", url: "" },
        { label: " Hero Breadcrumb ", url: "" },
      ], 
      getLoader: false,
      heroBreadcrumb: {
        title : "",
        description : "",
        contact_title : "",
        contact_description : "",
        blog_title : "",
        blog_description : "",
       },
     };
  },
  async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role == 'Super' || role == 'Admin') {
          this.getheroBreadcrumbData();
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    },
  methods: {
    homeBreadcrumbSave(){
      this.getLoader = true;
    axios.post(this.globalVariables.apiUrl+"admin/appearance/hero-breadcrumb/create", this.heroBreadcrumb, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.getheroBreadcrumbData();
          toastr.success(res.data.message);
        })
        .catch((e) => {
          console.log(error);
        })
        .finally(() => {
          this.getLoader = false;
        });
    },
    getheroBreadcrumbData() {
      this.getLoader = true;
        axios.get(this.globalVariables.apiUrl+'admin/appearance/hero-breadcrumb', { headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}})
        .then((res) => {
          this.heroBreadcrumb.title  = res.data.about_breadcrumb_title,
          this.heroBreadcrumb.description  = res.data.about_breadcrumb_description,
          this.heroBreadcrumb.contact_title  = res.data.contact_breadcrumb_title,
          this.heroBreadcrumb.contact_description  = res.data.contact_breadcrumb_description,
          this.heroBreadcrumb.blog_title  = res.data.blog_breadcrumb_title,
          this.heroBreadcrumb.blog_description  = res.data.blog_breadcrumb_description;
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