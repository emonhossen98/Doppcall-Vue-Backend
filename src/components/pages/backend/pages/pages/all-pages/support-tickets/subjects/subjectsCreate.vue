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
            <div class="col-12 col-md-8 mx-auto">
                <div class="card">
                    <div class="card-header  py-3">
                        <h5 class="card-title mb-0 mt-2">New Subject Create</h5>
                    </div>
                    <div class="card-body">
                        <form>
                            <div class="form-group mt-3">
                             <label for="subject_name" class="required mb-1">Subject Name</label>
                             <input type="text" v-model="subjectCreate.subject_name" id="subject_name" class="form-control" required placeholder="Enter Subject Name">
                             <div v-if="validationErrors && validationErrors.subject_name" class="text-danger">
                                {{ validationErrors.subject_name[0] }}
                            </div>
                            </div>
                            <div class="form-group">
                                <div class="status_change mt-3"><label class="switch">
                                <input type="checkbox" v-model="subjectCreate.status" true-value="on">
                                <span class="slider"></span>
                                </label>Active Status</div>
                                <div v-if="validationErrors && validationErrors.status" class="text-danger">
                                  {{ validationErrors.status[0] }}
                              </div>
                            </div>
                            <div class="text-end mt-3">
                                <button type="button" @click="subjectSave"  class="btn btn-primary btn-sm">
                                  <i class="fas fa-check fa-sm me-1"></i>Create
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
        { label: "Subjects", url: "/admin-tickets-subjects" },
        { label: "Subject Create", url: "" },
      ],
      getLoader: false,
      subjectCreate: {
        subject_name: "",
        status: false,
      },
      validationErrors : null,
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
    subjectSave() {
      this.getLoader = true
      axios
        .post(this.globalVariables.apiUrl+"admin/tickets/subjects/store", this.subjectCreate, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          toastr.success(res.data.message);
          this.$router.push('/admin-tickets-subjects');
        })
        .catch((error) => {
         if(error && error.response && error.response.data && error.response.data.errors){
          this.validationErrors = error.response.data.errors;
         };
        })
        .finally(() => {
          this.getLoader =  false;
        });
    },
}
}
</script>