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
        <div class="col-md-8 mx-auto">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0 mt-2">Edit Menu Items</h5>
            </div>
            <div class="card-body">
              <form>
                <div class="row-mb">
                  <div class="row">
                    <div class="col-sm-2">
                      <label for="name" class="required">Name</label>
                    </div>
                    <div class="col-sm-10">
                      <input
                        type="text"
                        v-model="MenuCreateData.name"
                        id="name"
                        class="form-control"
                        required
                      />
                      <div
                        v-if="validationErrors && validationErrors.name"
                        class="text-danger"
                      >
                        {{ validationErrors.name[0] }}
                      </div>
                    </div>
                  </div>

                  <div class="row mt-4">
                    <div class="col-sm-2">
                      <label for="menu_url" class="required">URL</label>
                    </div>
                    <div class="col-sm-10">
                      <input
                        type="text"
                        v-model="MenuCreateData.menu_url"
                        id="menu_url"
                        class="form-control"
                        required
                      />
                      <div
                        v-if="validationErrors && validationErrors.menu_url"
                        class="text-danger"
                      >
                        {{ validationErrors.menu_url[0] }}
                      </div>
                    </div>
                  </div>

                  <div class="row mt-4">
                    <div class="col-sm-2">
                      <label for="open_in" class="required">Open In</label>
                    </div>
                    <div class="col-sm-10">
                      <select
                        v-model="MenuCreateData.open_in"
                        id="open_in"
                        class="form-select"
                        required
                      >
                        <option value="_self">Same Tab/Window</option>
                        <option value="_blank">New Tab/Window</option>
                      </select>
                      <div
                        v-if="validationErrors && validationErrors.open_in"
                        class="text-danger"
                      >
                        {{ validationErrors.open_in[0] }}
                      </div>
                    </div>
                  </div>

                  <div class="row mt-4">
                    <div class="col-sm-2">
                      <label for="ordering" class="required">Ordering</label>
                    </div>
                    <div class="col-sm-10">
                      <input
                        type="number"
                        v-model="MenuCreateData.ordering"
                        id="ordering"
                        class="form-control"
                        required
                      />
                      <div
                        v-if="validationErrors && validationErrors.ordering"
                        class="text-danger"
                      >
                        {{ validationErrors.ordering[0] }}
                      </div>
                    </div>
                  </div>

                  <div class="row mt-4">
                    <div class="col-sm-2">
                      <label for="parent_menu" class="required">Parent Menu</label>
                    </div>
                    <div class="col-sm-10">
                      <select
                        v-model="MenuCreateData.parent_menu"
                        id="parent_menu"
                        class="form-select"
                        required
                      >
                        <option value="0">Parent Menu</option>
                        <option
                          v-for="(menu, index) in MenuCreatePageData.menuGet"
                          :value="menu.id"
                          :key="index"
                        >
                          {{ menu.name }}
                        </option>
                      </select>
                      <div
                        v-if="validationErrors && validationErrors.parent_menu"
                        class="text-danger"
                      >
                        {{ validationErrors.parent_menu[0] }}
                      </div>
                    </div>
                  </div>

                  <div class="row mt-4">
                    <div class="col-sm-2">
                      <label for="status" class="required">Status</label>
                    </div>
                    <div class="col-sm-10">
                      <select
                        v-model="MenuCreateData.status"
                        id="status"
                        class="form-select"
                        required
                      >
                        <option value="0">Pending</option>
                        <option value="1">Publish</option>
                      </select>
                      <div
                        v-if="validationErrors && validationErrors.status"
                        class="text-danger"
                      >
                        {{ validationErrors.status[0] }}
                      </div>
                    </div>
                  </div>

                  <div class="row mt-4">
                    <div class="col-12 text-end">
                      <button
                        type="button"
                        @click="menuSave"
                        class="btn btn-primary btn-sm"
                      >
                        <i class="fas fa-check fa-sm me-2"></i>
                        Update
                      </button>
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
  props: ["MenuCreatePageData"],
  components: {
    Loader,
    Breadcrumb,
  },
  data() {
    return {
      breadcrumbs: [
        { label: "Dashboard", url: "/dashboard" },
        { label: "Menus", url: "/admin-menus" },
        { label: "Edit", url: "" },
      ],
      getLoader: false,
      MainURL: "",
      MenuCreateData: {
        name: "",
        menu_url: "",
        open_in: "",
        ordering: "",
        parent_menu: "",
        status: "",
      },
      showMenu: true,
      validationErrors: null,
    };
  },
  async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role == 'Super' || role == 'Admin') {
          const mainUrl = window.location.origin;
          this.MainURL = mainUrl;
          this.menuEditData();
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    },
  methods: {
    menuEditData() {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl + `admin/menus/edit/${this.$route.params.id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          this.MenuCreateData.name = res.data.menus.name;
          this.MenuCreateData.menu_url = res.data.menus.url;
          this.MenuCreateData.open_in = res.data.menus.open_in;
          this.MenuCreateData.ordering = res.data.menus.ordering;
          this.MenuCreateData.parent_menu = res.data.menus.parent_id;
          this.MenuCreateData.status = res.data.menus.status;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    menuSave() {
      this.getLoader = true;
      axios
        .post(
          this.globalVariables.apiUrl + `admin/menus/update/${this.$route.params.id}`,
          this.MenuCreateData,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          toastr.success(res.data.message);
          this.$router.push("/admin-menus");
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
    showHiddenMenu() {
      this.showMenu = !this.showMenu;
    },
  },
};
</script>
