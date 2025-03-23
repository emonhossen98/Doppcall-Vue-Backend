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
            <div class="col-md-8 col-12 mx-auto">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-12 mb-3 mb-md-0">
                                <div class="mb-0 rounded-0">
                                    <div class="card-body p-0">
                                        <table class="table table-sm mb-0">
                                            <tbody>
                                                <tr>
                                                    <td class="pl-0"><h6 class="card-title font-class">Payment Date:</h6></td>
                                                    <td><h6 class="card-title font-class">{{ formatDate(history.payment_date) }}</h6></td>
                                                </tr>

                                                <template v-if="userRole && userRole.role && userRole.role.name == 'Advertiser'">
                                                    <tr>
                                                    <td class="pl-0"><h6 class="card-title font-class">Invoice Date:</h6></td>
                                                    <td><h6 class="card-title font-class">{{ formatDate(history.invoice_date) }}</h6></td>
                                                </tr>
                                                </template>

                                                <tr>
                                                    <td class="pl-0"><h6 class="card-title font-class">Date Range:</h6></td>
                                                    <td><h6 class="card-title font-class">{{ history.date_range }}</h6></td>
                                                </tr>

                                                <template v-if="userRole && userRole.role && userRole.role.name == 'Advertiser'">
                                                    <tr>
                                                        <td class="pl-0"><h6 class="card-title font-class">Offer:</h6></td>
                                                        <td><h6 class="card-title font-class">{{ history.offer }}</h6></td>
                                                    </tr>
                                                    <tr>
                                                        <td class="pl-0"><h6 class="card-title font-class">Company Name:</h6></td>
                                                        <td><h6 class="card-title font-class">{{ history.company }}</h6></td>
                                                    </tr>
                                                    <tr>
                                                        <td class="pl-0"><h4 class="card-title">Buyer:</h4></td>
                                                        <td><h6 class="card-title font-class">{{ history.user.fname }}</h6></td>
                                                    </tr>
                                                </template>
                                                <tr>
                                                    <td class="pl-0"><h6 class="card-title font-class">Calls:</h6></td>
                                                    <td><h6 class="card-title font-class">{{ history.calls }}</h6></td>
                                                </tr>
                                                <tr>
                                                    <td class="pl-0"><h6 class="card-title font-class">Amount:</h6></td>
                                                    <td><h6 class="card-title font-class">{{ history.amount ?? '0.00' }} USD</h6></td>
                                                </tr>
                                                <tr>
                                                    <td class="pl-0"><h6 class="card-title font-class">Payment Method:</h6></td>
                                                    <td><h6 class="card-title font-class">
                                                        <template v-if="history.payment_method == 1">
                                                            Paid By Bank Transfer
                                                        </template>

                                                        <template v-else-if="history.payment_method == 2">
                                                            Paid By Credit Card
                                                        </template>

                                                        <template v-else-if="history.payment_method == 3">
                                                            Other
                                                        </template>

                                                        <template v-else>
                                                            Payoneer
                                                        </template>
                                                    </h6></td>
                                                </tr>
                                                <template v-if="userRole && userRole.role && userRole.role.name == 'Publisher'">
                                                    <tr>
                                                    <td class="pl-0"><h6 class="card-title font-class">Payoneer Email:</h6></td>
                                                    <td><h6 class="card-title font-class">{{ history.p_payoneer_email ?? '--' }}</h6></td>
                                                </tr>
                                                </template>

                                                <tr>
                                                    <td class="pl-0"><h6 class="card-title font-class">Payment Method Note:</h6></td>
                                                    <td><p class="mb-0 font-class">{{ history.description ?? '--' }}</p></td>
                                                </tr>
                                                <template v-if="userRole && userRole.role && userRole.role.name == 'Advertiser'">
                                                    <tr>
                                                        <td class="pl-0"><h6 class="card-title font-class">Type:</h6></td>
                                                        <td><h6 class="card-title font-class">{{ history.type }}</h6></td>
                                                    </tr>
                                                    <tr>
                                                        <td class="pl-0"><h6 class="card-title font-class">Note For User:</h6></td>
                                                        <td><h6 class="card-title font-class">{{ history.note_for_user ?? '--' }}</h6></td>
                                                    </tr>
                                                </template>
                                                <tr>
                                                    <td class="pl-0"><h6 class="card-title font-class">Status:</h6></td>
                                                    <td>
                                                    <template v-if="history.status == 'Paid'">
                                                        <span class="badge bg-success">Paid</span>
                                                    </template>
                                                    <template v-else>
                                                        <span class="badge bg-danger">Pending</span>
                                                    </template>
                                                    </td>
                                                </tr>
                                                <template v-if="userRole && userRole.role && userRole.role.name == 'Publisher'">
                                                    <tr>
                                                    <td class="pl-0"><h6 class="card-title font-class">Upload File:</h6></td>
                                                    <td>
                                                        <h5 class="mb-0 card-title">
                                                            <template v-if="history.p_file">
                                                                <a :href="globalVariables.appUrl+ history.p_file" :download="globalVariables.appUrl+history.p_file">
                                                                Download
                                                                </a>
                                                            </template>
                                                            <template v-else>
                                                                <a href="javascript:" @click="warningAlert()">
                                                                Download
                                                                </a>
                                                            </template>
                                                        </h5>
                                                    </td>
                                                </tr>
                                                </template>
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
      </div>
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
          { label: "Account", url: "/publisher-account" },
          { label: "View Details", url: "" },
        ],
        getLoader: false,
        history : "",
        userRole : "",
      };
    },
    async mounted() { 
        try {
        const { role, isAuthorized } = await fetchUserRolePublisher();
        if (role == 'Publisher') {
            this.getPublisherPaymnetInfo();
        }
        } catch (error) {
        console.error("Error fetching user role:", error);
        }
    },
    methods: {
      getPublisherPaymnetInfo() {
        this.getLoader = true;
        axios
          .get(this.globalVariables.apiUrl+`publisher/payment-history/details/${this.$route.params.id}`, { headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          })
          .then((res) => {
            this.history = res.data.history;
            this.userRole = res.data.userRole;
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.getLoader = false;
          });
      },
      formatDate(date) {
      return new Date(date).toLocaleDateString('en-US', {day: '2-digit', month: 'short', year: 'numeric'});
    },
    warningAlert(){
        toastr.warning('Download file not found.')
    },
    },
  };
  </script>
