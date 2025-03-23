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
              <h5 class="card-title mb-0 mt-2">Edit Count Down</h5>
            </div>
            <div class="card-body">
              <form>
                <div class="row-mb">
                 
                    <div class="row text-align-center">
                      <div class="col-sm-2">
                        <label for="title" class="required">Title</label>
                      </div>
                      <div class="col-sm-8">
                        <input  type="text" v-model="CountDownStore.title"  id="title" class="form-control" required placeholder="Enter Title"/>
                        <div v-if="validationErrors && validationErrors.title" class="text-danger">
                          {{ validationErrors.title[0] }}
                        </div>
                      </div>
                    </div>
                 

                  <div class="row text-align-center mt-3">
                    <div class="col-sm-2">
                      <label for="number" class="required">Number</label>
                    </div>
                    <div class="col-sm-8">
                      <input type="text" v-model="CountDownStore.number" id="number" class="form-control" required placeholder="Enter Number"/>
                      <div v-if="validationErrors && validationErrors.number" class="text-danger">
                        {{ validationErrors.number[0] }}
                      </div>
                    </div>
                  </div>

                  <div class="row mt-3">
                    <div class="col-sm-2">
                      <label for="symbol">Symbol</label>
                    </div>
                    <div class="col-sm-8">
                      <input type="text" v-model="CountDownStore.symbol" id="symbol" class="form-control" required placeholder="Enter Symbol"/>
                      <div v-if="validationErrors && validationErrors.symbol" class="text-danger">
                        {{ validationErrors.symbol[0] }}
                      </div>
                    </div>
                  </div>

                  <div class="form-group text-end mt-5">
                    <button  type="button"  @click="countDownSave()" class="btn btn-primary btn-sm">
                      <i class="fas fa-check fa-sm me-1"></i>
                      Update
                    </button>
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
        { label: "Count Down", url: "/admin-appearance-countdown" },
        { label: "Edit", url: "" },
      ],
      getLoader: false,
      CountDownStore: {
        title: "",
        number: "",
        symbol: "",
      },
      validationErrors: null,
    };
  },
  async mounted() { 
    try {
      const { role, isAuthorized } = await fetchUserRole();
      if (role == 'Super' || role == 'Admin') {
        this.getCountData();
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  },
  methods: {
    getCountData() {
      this.getLoader = true;
      axios
        .get(
          this.globalVariables.apiUrl+`admin/appearance/countdown/edit/${this.$route.params.id}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          this.CountDownStore.title = res.data.countdown.title;
          this.CountDownStore.number = res.data.countdown.number;
          this.CountDownStore.symbol = res.data.countdown.symbol;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    countDownSave() {
      this.getLoader = true;
      axios
        .post(
          this.globalVariables.apiUrl+`admin/appearance/countdown/update/${this.$route.params.id}`,
          this.CountDownStore,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          toastr.success(res.data.message);
          this.$router.push("/admin-appearance-countdown");
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
