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
            <div class="card-header border-bottom">
                <h5 class="card-title mb-0">Filter</h5>
                <div class="d-flex justify-content-between align-items-center row py-3 gap-3 gap-md-0">
                  <div class="col-md-4">
                    <select v-model="filtarData.country" class="select2 form-select" @change="getFiltarOffers()">
                      <option value="">Select Country</option>
                      <template v-for="(countryOffer,index) in fillterDatas.countryOffers" :key="index">
                        <template v-if="countryOffer.primary_country != null">
                          <option :value="countryOffer.primary_country" > {{ countryOffer.primary_country }}</option>
                        </template>
                      </template>
                    </select>
                  </div>
                  <div class="col-md-4">
                  <select v-model="filtarData.category" class="select2 form-select" @change="getFiltarOffers()">
                      <option value="">Select Category</option>
                        <option v-for="category in fillterDatas.categoryOffers" :value="category.id" :key="category.id">
                          {{ category.name }}
                      </option>
                  </select>
                  </div>
                  <div class="col-md-4">
                  <select v-model="filtarData.type" class="select2 form-select" @change="getFiltarOffers()">
                      <option value="">Select Type</option>
                        <option v-for="offerType in fillterDatas.offerTypes" :value="offerType.id" :key="offerType.id">
                          {{ offerType.type }}
                      </option>
                  </select>
                  </div>
                </div>
              </div>
            <div class="card-header py-2">
              <h5 class="card-title mt-2 mb-0">Offers</h5>
            </div>
            <div class="card-body table-responsive table-overflow-hidden">
              <table class="align-middle mb-0 table table-hover" id="publisher_offers_datatables">
                <thead>
                  <tr>
                    <!-- <th style="padding: 1rem 0.5rem !important"></th> -->
                    <th>ID</th>
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
        { label: "Offers", url: "" },
      ],
      getLoader: false,
      showFillter: false,
      fillterDatas: "",
      filtarData : {
        country : "",
        category : "",
        type : "",
      }
    };
  },
  async mounted() { 
    try {
      const { role, isAuthorized } = await fetchUserRolePublisher();
      if (role == 'Publisher') {
        this.getPusbliserFillterData();
        this.getPublisherOffers();
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
    document.addEventListener('click', (e) => {
        const target = e.target.closest('a[data-vue-route]');
        if (target) {
          e.preventDefault();
          const route = target.getAttribute('href');
          this.$router.push(route);
        }
      }, true);
  },
  methods: {
    getPusbliserFillterData() {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl+"publisher/offers/all-offers", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          this.fillterDatas = res.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    getPublisherOffers() {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl+"publisher/offers/get-data", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          if ($.fn.DataTable.isDataTable("#publisher_offers_datatables")) {
                $('#publisher_offers_datatables').DataTable().destroy();
            }
            var table = $('#publisher_offers_datatables').DataTable({
              data: res.data.getDatas,
              columns: [
                // { data: 'id' },
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
                      '<div  class="publisher_apply_action d-flex align-items-center"><button type="button" class="py-1 px-2 btn-md btn-primary border-0 rounded-1 me-2" id="apply" data-id=' +
                      row.id +
                      ">Apply</button></div>"
                    );
                  },
                },
                {
                  data: "updated_at",
                  render: function (data, type, row) {
                    return (
                      '<div class="publisher_details_action d-flex align-items-center"><a data-vue-route href="/publisher-create-view/'+row.id+'" title="View Details" class="btn-md btn-secondary border-0 rounded-1 me-2 py-1 px-2">View Details</a></div>'
                    );
                  },
                },
              ],
              initComplete: () => {
                const table = $("#publisher_offers_datatables").DataTable();
                const dropdownItems = document.querySelectorAll('.dropdown-menu .dropdown-item');

                dropdownItems.forEach((item) => {
                  const columnAttr = item.getAttribute("data-column"); 
                  if (columnAttr === "all") {
                    item.addEventListener("click", function (e) {
                      e.preventDefault();
                      table.columns().visible(true);
                      dropdownItems.forEach((el) => {
                        if (el.getAttribute("data-column") !== "all") {
                          el.classList.add("active");
                        }
                      });
                    });
                  } else {
                    const columnIndex = parseInt(columnAttr);
                    const column = table.column(columnIndex);
                    if (column.visible()) {
                      item.classList.add("active");
                    }

                    item.addEventListener("click", function (e) {
                      e.preventDefault();

                      const currentVisible = column.visible();
                      column.visible(!currentVisible);

                      if (!currentVisible) {
                        item.classList.add("active");
                      } else {
                        item.classList.remove("active");
                      }
                    });
                  }
                });
                this.attachEventListeners();
              },
              order: [[6, 'asc']],
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
                searchPlaceholder: 'Search Offer',
                paginate: { 
                  previous: '<i class="fa-solid fa-chevron-left"></i>',
                  next: '<i class="fa-solid fa-chevron-right"></i>'
                }
              },
              buttons: [
                {
                  className: "btn btn-primary",
                  text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><li><a class="dropdown-item" href="#" data-column="all">All</a></li><li><a class="dropdown-item" href="#" data-column="0">ID</a></li><li><a class="dropdown-item" href="#" data-column="1">Primary Country</a></li><li><a class="dropdown-item" href="#" data-column="2">Offer</a></li><li><a class="dropdown-item" href="#" data-column="3">Offer Type</a></li><li><a class="dropdown-item" href="#" data-column="4">Payout</a></li><li><a class="dropdown-item" href="#" data-column="5">Status</a></li><li><a class="dropdown-item" href="#" data-column="6">Apply</a></li><li><a class="dropdown-item" href="#" data-column="7">View</a></li></ul></div>',
                },
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

    getFiltarOffers(){
      if(this.filtarData.country === "" && this.filtarData.category === "" && this.filtarData.type === ""){
        this.getPublisherOffers();
      }else{
        this.getLoader = true;
          axios
            .post(this.globalVariables.apiUrl+"publisher/offers/search-get-data", this.filtarData, {
              headers: { Authorization: "Bearer " + localStorage.getItem("token") },
            })
            .then((res) => {
              console.log(res.data);
              if ($.fn.DataTable.isDataTable("#publisher_offers_datatables")) {
                  $('#publisher_offers_datatables').DataTable().destroy();
              }
              var table = $('#publisher_offers_datatables').DataTable({
              data: res.data.getDatas,
              columns: [
                // { data: 'id' },
                { data: 'id' },
                { data: 'convart_flag_image' },
                {
                  data: "name",
                  render: function (data, type, row) {
                    if (row.name != null) {
                      return row.name.length > 20 
                        ? row.name.slice(0, 20) + '...'  
                        : row.name; 
                    }
                    return '----------';
                  },
                },
                { data: 'offer_type_name' },
                { data: 'pay_out' },
                { data: 'convart_status' },
                {
                  data: "updated_at",
                  render: function (data, type, row) {
                    return (
                      '<div class="publisher_apply_action d-flex align-items-center"><button type="button" class="py-1 px-2 btn-md btn-primary border-0 rounded-1 me-2" id="apply" data-id=' +
                      row.id +
                      ">Apply</button></div>"
                    );
                  },
                },
                {
                  data: "updated_at",
                  render: function (data, type, row) {
                    return (
                      '<div class="publisher_details_action d-flex align-items-center"><a data-vue-route href="/publisher-create-view/'+row.id+'" title="View Details" class="btn-md btn-secondary border-0 rounded-1 me-2 py-1 px-2">View Details</a></div>'
                    );
                  },
                },
              ],
              initComplete: () => {
                const table = $("#publisher_offers_datatables").DataTable();
                const dropdownItems = document.querySelectorAll('.dropdown-menu .dropdown-item');

                dropdownItems.forEach((item) => {
                  const columnAttr = item.getAttribute("data-column"); 
                  if (columnAttr === "all") {
                    item.addEventListener("click", function (e) {
                      e.preventDefault();
                      table.columns().visible(true);
                      dropdownItems.forEach((el) => {
                        if (el.getAttribute("data-column") !== "all") {
                          el.classList.add("active");
                        }
                      });
                    });
                  } else {
                    const columnIndex = parseInt(columnAttr);
                    const column = table.column(columnIndex);
                    if (column.visible()) {
                      item.classList.add("active");
                    }

                    item.addEventListener("click", function (e) {
                      e.preventDefault();

                      const currentVisible = column.visible();
                      column.visible(!currentVisible);

                      if (!currentVisible) {
                        item.classList.add("active");
                      } else {
                        item.classList.remove("active");
                      }
                    });
                  }
                });
                this.attachEventListeners();
              },
              createdRow: function (row, data, dataIndex) {
                $("td:eq(0)", row).html(dataIndex + 1);
              },
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
                searchPlaceholder: 'Search Offer',
                paginate: { 
                  previous: '<i class="fa-solid fa-chevron-left"></i>',
                  next: '<i class="fa-solid fa-chevron-right"></i>'
                }
              },
              buttons: [
                {
                  className: "btn btn-primary",
                  text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><li><a class="dropdown-item" href="#" data-column="all">All</a></li><li><a class="dropdown-item" href="#" data-column="0">ID</a></li><li><a class="dropdown-item" href="#" data-column="1">Primary Country</a></li><li><a class="dropdown-item" href="#" data-column="2">Offer</a></li><li><a class="dropdown-item" href="#" data-column="3">Offer Type</a></li><li><a class="dropdown-item" href="#" data-column="4">Payout</a></li><li><a class="dropdown-item" href="#" data-column="5">Status</a></li><li><a class="dropdown-item" href="#" data-column="6">Apply</a></li><li><a class="dropdown-item" href="#" data-column="7">View</a></li></ul></div>',
                },
              ],
          });
              this.getLoader = false;
            })
            .catch((error) => {
              console.error(error);
              this.getLoader = false;
            });
      }
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
  },
};
</script>
<style>
#publisher_offers_datatables colgroup:nth-of-type(2) {
	display: none !important;
}
#publisher_offers_datatables td {
  white-space: nowrap; /* Prevents wrapping */
  overflow: hidden; /* Hides overflow */
  text-overflow: ellipsis; /* Adds "..." for overflow */
  max-width: 100px; /* Set max width for cell */
}
#publisher_offers_datatables .dt-checkboxes-cell {
	padding: 0.9rem 0.5rem !important;
}
.country-flag {
	width: 20px;
}
</style>
