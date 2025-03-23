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
          <div class="col-12">
            <div class="card">
              <div class="card-header py-2 d-flex justify-content-between align-items-center">
                <h5 class="card-title d-flex align-items-center mb-0">{{ title }} - Offers</h5>
              </div>
              <div class="card-body px-4 table-responsive table-overflow-hidden">
                <table class="align-middle mb-0 table table-hover"  id="publisher_offers_datatables">
                  <thead>
                    <tr>
                      <th>SL</th>
                      <th>id</th>
                      <th>Primary Country</th>
                      <th>Offer</th>
                      <th>Offer's Type</th>
                      <th>Payout</th>
                      <th>Status</th>
                      <th>Apply</th>
                      <th>View</th>
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
          { label: "Category Offers", url: "" },
        ],
        getLoader: false,
        title : "",
      };
    },
    async mounted() { 
    try {
      const { role, isAuthorized } = await fetchUserRolePublisher();
      if (role == 'Publisher') {
        this.getPublisherOffers(this.$route.params.id);
        this.$nextTick(() => {
          const dataTableWrapper = document.querySelectorAll('#publisher_offers_datatables_wrapper .row.mx-2');
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
    watch: {
    "$route.params.id"(newId, oldId) {
      this.getPublisherOffers(newId);
    },
  },
    methods: {
      getPublisherOffers(id) {
        this.getLoader = true;
        axios
          .get(this.globalVariables.apiUrl+`publisher/offers/category/${id}`, {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          })
          .then((res) => {
            this.title = res.data.categoryName.name;
            if ($.fn.DataTable.isDataTable("#publisher_offers_datatables")) {
              $('#publisher_offers_datatables').DataTable().destroy();
            }
            var table = $('#publisher_offers_datatables').DataTable({
              data: res.data.getDatas,
              columns: [
                { data: 'id' },
                { data: 'id' },
                { data: 'convart_flag_image' },
                { data: 'name' },
                { data: 'offer_type_name' },
                { data: 'pay_out' },
                { data: 'convart_status' },
                {
                  data: "updated_at",
                  render: function (data, type, row) {
                    return (
                      '<div class="publisher_apply_action d-flex align-items-center"><button type="button" class="py-1 px-2 btn-md btn-primary border-0 rounded me-2" id="apply" data-id=' +
                      row.id +
                      ">Apply</button></div>"
                    );
                  },
                },
                {
                  data: "updated_at",
                  render: function (data, type, row) {
                    return (
                      '<div class="publisher_details_action d-flex align-items-center"><button type="button" class="btn-md btn-secondary border-0 rounded me-2 py-1 px-2" id="details" data-id=' +
                      row.id +
                      ">View Details</button></div>"
                    );
                  },
                },
              ],
              initComplete: () => {
                this.attachEventListeners();
                this.attachEventListenersDetails();
              },
              columnDefs: [
                {
                  targets: 0,
                  orderable: false,
                  checkboxes: {
                    selectAllRender: '<input type="checkbox" class="form-check-input">'
                  },
                  render: function () {
                    return '<input type="checkbox" class="dt-checkboxes form-check-input">';
                  },
                  searchable: false
                },
              ],
              order: [[6, 'asc']],
              dom: '<"row mx-2"' +
                '<"col-md-4 ps-0"f>' + 
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
                searchPlaceholder: 'Search Offer',
                paginate: { 
                  previous: '<i class="fa-solid fa-chevron-left"></i>',
                  next: '<i class="fa-solid fa-chevron-right"></i>'
                }
              },
              buttons: [
                
              ],
          });
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.getLoader = false;
          });
      },
      attachEventListeners() {
        $("#publisher_offers_datatables").on("click",".publisher_apply_action",(event) => {
            const target = $(event.target);
            const dataId = target.data("id");
            const dataClass = target.attr("id");
            if (dataClass === "apply") {
              this.getLoader = true;
              axios
                .get(this.globalVariables.apiUrl+`publisher/offer/campaign/${dataId}`, {
                  headers: { Authorization: "Bearer " + localStorage.getItem("token") },
                })
                .then((res) => {
                  if(res.data.status == 'success'){
                    this.$router.push("/publisher-create-campaign/" + dataId);
                  }else{
                    toastr.error(res.data.message);
                  }
                })
                .catch((error) => {
                  console.log(error);
                })
                .finally(() => {
                  this.getLoader = false;
                });
            }
          }
        );
      },
  
      attachEventListenersDetails() {
        $("#publisher_offers_datatables").on("click",".publisher_details_action",(event) => {
            const target = $(event.target);
            const dataId = target.data("id");
            const dataClass = target.attr("id");
            if (dataClass === "details") {
              this.$router.push("/publisher-create-view/" + dataId);
            }
          }
        );
      },
    },
  };
  </script>
  <style>
#publisher_offers_datatables td {
  white-space: nowrap; /* Prevents wrapping */
  overflow: hidden; /* Hides overflow */
  text-overflow: ellipsis; /* Adds "..." for overflow */
  max-width: 100px; /* Set max width for cell */
}
#publisher_offers_datatables colgroup:nth-of-type(2) {
	display: none !important;
}
#publisher_offers_datatables .dt-checkboxes-cell {
	padding: 0.9rem 0.5rem !important;
}
.publisher-country-flag  {
	width: 12%;
}
</style>
  