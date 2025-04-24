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
        <div class="col-md-12">
          <div class="card">
            <div class="card-header custom-card-header">
              <h5 class="card-title mb-0 mt-2">New Category Create</h5>
            </div>
            <div class="card-body">
              <form>
                <div class="row g-5 mb-3">
                  <div class="col-sm-2">
                    <label for="category_name" class="required">Category Name</label>
                  </div>
                  <div class="col-sm-10">
                    <input
                      type="text"
                      v-model="CategoryCreate.category_name"
                      id="category_name"
                      class="form-control"
                      required
                      placeholder="Category Name"
                    />
                    <div
                      v-if="validationErrors && validationErrors.category_name"
                      class="text-danger"
                    >
                      {{ validationErrors.category_name[0] }}
                    </div>
                  </div>
                </div>

                <div class="row g-5 mb-3">
                  <div class="col-sm-2">
                    <label for="short_description">Description</label>
                  </div>
                  <div class="col-sm-10">
                    <textarea
                      v-model="CategoryCreate.short_description"
                      id="short_description"
                      cols="30"
                      rows="3"
                      class="form-control"
                      placeholder="Short Discription"
                    ></textarea>
                  </div>
                </div>

                <div class="row g-5 mb-3">
                  <div class="col-sm-2">
                    <label for="category_icon">Icon</label>
                  </div>
                  <div class="col-sm-10">
                    <input
                      type="text"
                      v-model="CategoryCreate.category_icon"
                      id="category_icon"
                      class="form-control"
                      required
                      placeholder="Ex: fa fa-home"
                    />
                  </div>
                </div>

                <div class="row g-5 mb-3">
                  <div class="col-sm-2">
                    <label for="meta_title">Meta Title</label>
                  </div>
                  <div class="col-sm-10">
                    <input
                      type="text"
                      v-model="CategoryCreate.meta_title"
                      id="meta_title"
                      class="form-control"
                      required
                      placeholder="Ex: fa fa-home"
                    />
                  </div>
                </div>

                <div class="row g-5 mb-3">
                  <div class="col-sm-2">
                    <label for="meta_description">Meta Description</label>
                  </div>
                  <div class="col-sm-10">
                    <textarea
                      v-model="CategoryCreate.meta_description"
                      id="meta_description"
                      cols="30"
                      rows="3"
                      class="form-control"
                      placeholder="Meta Discription"
                    ></textarea>
                  </div>
                </div>

                <div class="row g-5 mb-3">
                  <div class="col-sm-2">
                    <label for="status">Status</label>
                  </div>
                  <div class="col-sm-10">
                    <select
                      v-model="CategoryCreate.status"
                      id="status"
                      class="form-select"
                    >
                      <option value="1">Publish</option>
                      <option value="0">Pending</option>
                    </select>
                  </div>
                </div>

                <div class="text-end mt-3">
                  <button
                    type="button"
                    @click="categoriesSave"
                    class="btn btn-primary btn-sm"
                  >
                    <i class="fa fa-check-circle me-2"></i> Create
                  </button>
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
        { label: "Press Categories", url: "/admin-press-categories" },
        { label: "Categories", url: "" },
      ],
      getLoader: false,
      CategoryCreate: {
        category_name: "",
        short_description: "",
        category_icon: "",
        meta_title: "",
        meta_description: "",
        status: "1",
      },
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
    categoriesSave() {
      this.getLoader = true;
      axios
        .post(
          this.globalVariables.apiUrl + "admin/pressCategories/store",
          this.CategoryCreate,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          toastr.success(res.data.message);
          this.$router.push("/admin-press-categories");
        })
        .catch((error) => {
          if (
            error &&
            error.response &&
            error.response.data &&
            error.response.data.errors
          ) {
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
<style>
.btn-style-danger,
.btn-style-edit,
.btn-style-info {
  height: 30px;
  width: 30px;
  text-align: center;
  padding-top: 0;
  font-size: 14px;
  transition: 0.5s;
}
</style>
