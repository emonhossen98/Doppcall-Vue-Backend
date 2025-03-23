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
                <div class="card-body">
                   <div class="row">
                        <div class="col-lg-12">
                            <h5 class="card-title d-flex justify-content-between align-items-center">
                               {{ title }} Company leads show
                            </h5>
                            <div class="table-responsive table-overflow-hidden">
                                <table class="table table-hover mb-0 text-md-nowrap mt-4">
                                    <tbody>
                                            <tr v-if="IndexLeads.company_name">
                                                <th style="width: 20%">Company Name</th>
                                                <th style="width: 5%">:</th>
                                                <td>{{ IndexLeads.company_name }}</td>
                                            </tr> 
                                            <tr v-if="IndexLeads.first_name">
                                                <th style="width: 20%">Full Name</th>
                                                <th style="width: 2%">:</th>
                                                <td>{{ IndexLeads.first_name ?? ''  }} {{ IndexLeads.last_name ?? ''}}</td>
                                            </tr> 
                                            <tr v-if="IndexLeads.email">
                                                <th style="width: 20%">Email</th>
                                                <th style="width: 2%">:</th>
                                                <td>{{ IndexLeads.email }}</td>
                                            </tr> 
                                            <tr v-if="IndexLeads.phone">
                                                <th style="width: 20%">Phone</th>
                                                <th style="width: 2%">:</th>
                                                <td>{{ IndexLeads.phone }}</td>
                                            </tr> 
                                            <tr v-if="IndexLeads.website">
                                                <th style="width: 20%">Website</th>
                                                <th style="width: 2%">:</th>
                                                <td><a :href="IndexLeads.website" target="_blank">{{ IndexLeads.website }}</a></td>
                                            </tr> 
                                            <tr v-if="IndexLeads.country">
                                                <th style="width: 20%">Country</th>
                                                <th style="width: 2%">:</th>
                                                <td>{{ IndexLeads.country }}</td>
                                            </tr> 
                                            <tr v-if="IndexLeads.buy_call">
                                                <th style="width: 20%">Buy Call</th>
                                                <th style="width: 2%">:</th>
                                                <td>{{ IndexLeads.buy_call }}</td>
                                            </tr> 
                                            <tr v-if="IndexLeads.vertical_calls">
                                                <th style="width: 20%">Vertical Calls</th>
                                                <th style="width: 2%">:</th>
                                                <td>{{ IndexLeads.vertical_calls }}</td>
                                            </tr> 
                                            <tr v-if="IndexLeads.get_calls">
                                                <th style="width: 20%">Get Calls</th>
                                                <th style="width: 2%">:</th>
                                                <td>{{ IndexLeads.get_calls }}</td>
                                            </tr> 
                                            <tr v-if="IndexLeads.created_at">
                                                <th style="width: 20%">Created At</th>
                                                <th style="width: 2%">:</th>
                                                <td>{{IndexLeads.created_at }}</td>
                                            </tr> 
                                    </tbody>
                                </table>
                            </div>
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
      IndexLeads : "",
      title : "",
      breadcrumbs: [
        { label: "Dashboard", url: "/dashboard" },
        { label: "Lead List", url: "/admin-leads" },
        { label: "Single View", url: "" },
      ], 
      getLoader: false,
     };
  },
  async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role == 'Super' || role == 'Admin') {
          this.getLeadList();
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    },
  methods: {
    getLeadList() {
        axios.get(this.globalVariables.apiUrl+`admin/leads/show/${this.$route.params.id}`, { headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}})
        .then((res) => {
            this.title = res.data.title;
            this.IndexLeads = res.data.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.getLoader = false;
        });
    },
  },
}
</script>