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
        <div class="col-md-12 mx-auto col-12">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title mb-0 mt-2">Smtp</h5>
                </div>
                <div class="card-body pt-1">
                    <form >
                        <div class="row mb-4">
                            <div class="col-sm-2">
                                <label for="name" class="required">Name</label>
                            </div>
                            <div class="col-sm-10">
                                <input type="text" v-model="sptmCreateData.name" id="name" class="form-control" required placeholder="Enter name">
                                <div v-if="validationErrors && validationErrors.name" class="text-danger">
                                    {{ validationErrors.name[0] }}
                                </div>
                            </div>
                        </div>

                        <div class="row mb-4">
                            <div class="col-sm-2">
                                <label for="mail_host" class="required">Host Name</label>
                            </div>
                            <div class="col-sm-10">
                                <input type="text" v-model="sptmCreateData.mail_host" id="mail_host" class="form-control" required placeholder="Enter host name">
                                <div v-if="validationErrors && validationErrors.mail_host" class="text-danger">
                                    {{ validationErrors.mail_host[0] }}
                                </div>
                            </div>
                        </div>


                        <div class="single-mail">
                            <div class="row mb-4">
                                <div class="col-sm-2">
                                    <label for="mail_username" class="required">Mail Username</label>
                                </div>
                                <div class="col-sm-10">
                                    <input type="text" v-model="sptmCreateData.mail_username" id="mail_username" class="form-control" required placeholder="Enter Mail Username">
                                    <div v-if="validationErrors && validationErrors.mail_username" class="text-danger">
                                    {{ validationErrors.mail_username[0] }}
                                </div>
                                </div>
                            </div>
                        </div>

                        <div class="row mb-4">
                            <div class="col-sm-2">
                                <label for="mail_password" class="required">Password</label>
                            </div>
                            <div class="col-sm-10">
                                <input type="password" v-model="sptmCreateData.mail_password" id="mail_password" class="form-control" required placeholder="Enter mail password">
                                <span class="text-warning">Note: sender mail password type here</span>
                                <div v-if="validationErrors && validationErrors.mail_password" class="text-danger">
                                    {{ validationErrors.mail_password[0] }}
                                </div>
                            </div>
                        </div>

                        <div class="row mb-4">
                            <div class="col-sm-2">
                                <label for="mail_port" class="required">Mail Port</label>
                            </div>
                            <div class="col-sm-10">
                                <input type="text" v-model="sptmCreateData.mail_port" id="mail_port" class="form-control" required placeholder="Enter mail port">
                                <div v-if="validationErrors && validationErrors.mail_port" class="text-danger">
                                    {{ validationErrors.mail_port[0] }}
                                </div>
                            </div>
                        </div>

                        <div class="row mb-4">
                            <div class="col-sm-2">
                                <label for="mail_encryption" class="required">Encryption</label>
                            </div>
                            <div class="col-sm-10">
                                <select v-model="sptmCreateData.mail_encryption" id="mail_encryption" class="form-select">
                                    <option value="">Select One</option>
                                    <option value="null">none</option>
                                    <option value="tls">tls</option>
                                    <option value="ssl">ssl</option>
                                </select>
                                <div v-if="validationErrors && validationErrors.mail_encryption" class="text-danger">
                                    {{ validationErrors.mail_encryption[0] }}
                                </div>
                            </div>
                        </div>

                        <div class="form-group text-end">
                            <button type="button" @click="sptmCreateDataSave" class="btn btn-primary btn-sm">Save Changes</button>
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
        { label: "Settings", url: "" },
        { label: "Smtp Setup", url: "/admin-settings-smtp-configure" },
        { label: "Create", url: "" },
      ],
    getLoader: false,
    sptmCreateData: {
        name : "",
        mail_host : "",
        mail_username : "",
        mail_password : "",
        mail_port : "",
        mail_encryption : "",
    },
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
    sptmCreateDataSave(){
        this.getLoader = true;
        axios.post(this.globalVariables.apiUrl+"admin/mailsettings/smtp-configure/store", this.sptmCreateData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          },
        })
        .then((res) => {
            toastr.success(res.data.message);
            this.$router.push('/admin-settings-smtp-configure');
        })
        .catch((error) => {
            if (error.response && error.response.data && error.response.data.errors) {
              this.validationErrors = error.response.data.errors;
            }
        })
        .finally(() => {
            this.getLoader = false;
        })
    },
},
};
</script>
