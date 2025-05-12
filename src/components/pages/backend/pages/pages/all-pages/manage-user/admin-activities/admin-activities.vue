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
          <div class="col-12">
            <div class="card">
              <div class="card-header pt-3 pb-1">
                <h5 class="card-title mb-0">
                  Admin Activities
                </h5>
              </div>
              <div class="card-body table-responsive table-overflow-hidden">
                <table class="align-middle mb-0 table table-hover" id="admin_activities_datatables">
                  <thead>
                    <tr>
                      <!-- <th></th> -->
                      <th>Date/Time</th>
                      <th>User Role</th>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Ip Address</th>
                      <th>Action Type</th>
                      <th>Module Affected</th>
                      <th>Details</th>
                      <th class="text-end" id="action-incompleted">Action</th>
                    </tr>
                  </thead>
                  <tbody></tbody>
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
  import { format } from "date-fns";
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
          { label: "Admin Activities", url: "" },
        ],
        getLoader: false,
        bulkactionids : {
          selectedIds: [],
        },
      };
    },
    async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role == 'Super' || role == 'Admin') {
          this.$nextTick(() => {
            const dataTableWrapper = document.querySelectorAll('#admin_activities_datatables_wrapper .row.mx-2');
            if (dataTableWrapper.length > 0) {
              dataTableWrapper[0].style.display = 'none';
              dataTableWrapper[1].style.display = 'none';
            }
          });
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    },
    methods: {
  
    },
  };
  </script>
  <style>
  #admin_activities_datatables colgroup:nth-of-type(2) {
      display: none !important;
  }
  #admin_activities_datatables .dt-checkboxes-cell{
      padding: 0.7rem 0.5rem !important;
  }
  </style>
  