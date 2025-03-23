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
        <div class="col-md-10 mx-auto col-12">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0 mt-2" style="display: inline-block"></h5>
              Smtp list
              <RouterLink :to="'/admin-settings-smtp-create'" style="display: inline-block; float: right" class="btn btn-primary btn-sm"
                ><i class="fa fa-plus fa-sm me-1"></i>Add new</RouterLink >
            </div>
            <div class="card-body pt-1 table-responsive table-overflow-hidden">
              <table class="table">
                <thead>
                  <tr>
                    <td>Name</td>
                    <td>Host name</td>
                    <td>User name</td>
                    <td>Password</td>
                    <td>Port</td>
                    <td>Encryption</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(data, index) in SmtpsData" :key="index">
                    <td>{{ data.name }}</td>
                    <td>{{ data.host_name }}</td>
                    <td>{{ data.user_name }}</td>
                    <td>{{ data.password }}</td>
                    <td>{{ data.port }}</td>
                    <td>{{ data.encryption }}</td>
                  </tr>
                </tbody>
              </table>
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
        { label: "Settings", url: "" },
        { label: "Smtp Setup", url: "" },
      ],
      getLoader: false,
      SmtpsData : "",
    };
  },
  async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role == 'Super' || role == 'Admin') {
          this.getSmtpData();
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    },
  methods: {
    getSmtpData() {
        this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl+"admin/mailsettings/smtp-configure", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          this.SmtpsData = res.data.smtps;
        })
        .catch((e) => {
          return e;
        })
        .finally(() => {
            this.getLoader = false;
        });
    },
  },
};
</script>
