<template>
  <div v-if="getLoader">
    <Loader></Loader>
  </div>
  <!-- Content wrapper -->
  <div class="content-wrapper">
    <!-- Content -->
    <div class="container-xxl flex-grow-1 container-p-y">
      <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
      <div class="row row-sm mt-4">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0 mt-2">Activity Details</h5>
            </div>

            <div class="user-activities-table">
              <table class="table table-sm" id="user_active_tables">
                <thead>
                  <tr>	 	 	 	 	
                    <!-- <th></th> -->
                    <th></th>
                    <th>SL</th>
                    <th>Avatar</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Type</th>
                    <th>Communication</th>
                    <th>Timestamp</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="row row-sm mt-4">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mt-2 mb-0">Payment History</h5>
            </div>

            <div class="user-activities-table">
              <table class="table table-sm" id="user_payment_tables">
                <thead>
                  <tr>	 	 	 	 
                    <!-- <th></th> -->
                    <th></th>
                    <th>Sl</th>
                    <th>Avatar</th>
                    <th>First Name</th>
                    <th>Payment Method</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Timestamp</th>
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
import Loader from "../../../../include/loader.vue";
import Breadcrumb from "../../../../include/breadcrumb.vue";
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
        { label: "User Activities", url: "/dashboard-user-activities" },
        { label: "Details", url: "" },
      ],
      getLoader: false,
    };
  },
  async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role == 'Super' || role == 'Admin') {
          this.getresentUserActivites();
          this.$nextTick(() => {
            const dataTableWrapper = document.querySelectorAll('#user_active_tables_wrapper .row.mx-2');
            if (dataTableWrapper.length > 0) {
              dataTableWrapper[0].style.display = 'none';
              dataTableWrapper[1].style.display = 'none';
            }
          });
          this.$nextTick(() => {
            const dataTableWrapper = document.querySelectorAll('#user_payment_tables_wrapper .row.mx-2');
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
    getresentUserActivites() {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl+`admin/user/activities/${this.$route.params.id}`, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          if ($.fn.DataTable.isDataTable("#user_active_tables")) {
            $('#user_active_tables').DataTable().destroy();
          }

          var table = $('#user_active_tables').DataTable({
            data: res.data.userActivities,
            columns: [
              // { data: 'id' },
              { data: 'id' },
              { data: 'id' },
              { data: "convart_avatar" },
              { data: "fname" },
              { data: "lname" },
              { data: "convart_person" },
              { data: "communication" },
              { data: "event_date" },
            ],
            createdRow: function (row, data, dataIndex) {
                $('td:eq(0)', row).html(dataIndex + 1);
            },
            columnDefs: [
              {
                targets: 0,
                orderable: false,
                checkboxes: {
                  selectAllRender: '<input type="checkbox" class="form-check-input">'
                },
                render: function () {
                  return '<input type="checkbox" class="dt-checkboxes form-check-input" >';
                },
                searchable: false
              },
            ],
            order: [[2, 'desc']],
            dom: '<"row mx-2"' +
              '<"col-md-4"f>' + 
              '<"col-md-8 dopp_tb d-flex justify-content-end align-items-center"l<"button-wrapper"B>>' + 
              '<"col-md-3 d-none"p>>' +
              't' + 
              '<"row mx-2"' +
              '<"col-md-5"i>' + 
              '<"col-md-7"p>>', 
            displayLength: 10, 
            lengthMenu: [10, 20, 50, 100, 200], 
            language: {
              sLengthMenu: '_MENU_',
              search: '', 
              searchPlaceholder: 'Search Activities',
              paginate: { 
                previous: '<i class="fa-solid fa-chevron-left"></i>',
                next: '<i class="fa-solid fa-chevron-right"></i>'
              }
            },
            buttons: [
            ],
          });

          if ($.fn.DataTable.isDataTable("#user_payment_tables")) {
            $('#user_payment_tables').DataTable().destroy();
          }
          var table = $('#user_payment_tables').DataTable({
            data: res.data.userPayments,
            columns: [
              // { data: 'id' },
              { data: 'id' },
              { data: 'id' },
              { data: "convart_avatar" },
              { data: "user.fname" },
              { data: "convart_payment_method" },
              { data: "payment_email" },
              { data: "phone_number" },
              { data: "convart_created_at" },
            ],
            createdRow: function (row, data, dataIndex) {
                $('td:eq(0)', row).html(dataIndex + 1);
            },
            columnDefs: [
              {
                targets: 0,
                orderable: false,
                checkboxes: {
                  selectAllRender: '<input type="checkbox" class="form-check-input">'
                },
                render: function () {
                  return '<input type="checkbox" class="dt-checkboxes form-check-input" >';
                },
                searchable: false
              },
            ],
            order: [[2, 'desc']],
            dom: '<"row mx-2"' +
              '<"col-md-4"f>' + 
              '<"col-md-8 dopp_tb d-flex justify-content-end align-items-center"l<"button-wrapper"B>>' + 
              '<"col-md-3 d-none"p>>' +
              't' + 
              '<"row mx-2"' +
              '<"col-md-5"i>' + 
              '<"col-md-7"p>>', 
            displayLength: 10, 
            lengthMenu: [10, 20, 50, 100, 200], 
            language: {
              sLengthMenu: '_MENU_',
              search: '', 
              searchPlaceholder: 'Search Activities',
              paginate: { 
                previous: '<i class="fa-solid fa-chevron-left"></i>',
                next: '<i class="fa-solid fa-chevron-right"></i>'
              }
            },
            buttons: [
            ],
          });
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          this.getLoader = false;
        });
    },
  },
};
</script>

<style>

#user_active_tables colgroup:nth-of-type(2) {
	display: none !important;
}
#user_payment_tables colgroup:nth-of-type(2) {
	display: none !important;
}
.avatar-img {
  width: 50px;
  height: 50px;
  border-radius: 500%;
}
</style>
