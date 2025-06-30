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
                          <option  :value="countryOffer.primary_country"> {{ countryOffer.primary_country }}</option>
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
              <div class="card-header py-2 d-flex justify-content-between align-items-center">
                <h5 class="card-title d-flex align-items-center">Offers</h5>
              </div>
              <div class="card-body">
                <table class="align-middle mb-0 table table-hover"  id="advertiser_offers_datatables">
                  <thead>
                    <tr>
                      <th>SL</th>
                      <th>Id</th>
                      <th>Primary Country</th>
                      <th>Offer</th>
                      <th>Offer's Type</th>
                      <th>Payout</th>
                      <th>Status</th>
                      <th>Action</th>
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
  import { fetchUserRoleAdvertiser } from "@/services/userServiceAdvertiser";
  
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
          { label: "Dashboard", url: "/advertiser/dashboard" },
          { label: "Offers", url: "" },
        ],
        getLoader: false,
        fillterDatas : "",
        filtarData : {
          country : "",
          category : "",
          type : "",
        }
      };
    },
    async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRoleAdvertiser();
        if (role == 'Advertiser') {
          this.getAdvertiserFillterData();
          this.getAdvertiserOffers();
          this.$nextTick(() => {
            const dataTableWrapper = document.querySelectorAll('#advertiser_offers_datatables_wrapper .row.mx-2');
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
      getAdvertiserFillterData() {
        this.getLoader = true;
        axios
          .get(this.globalVariables.apiUrl+"advertiser/offers", {
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
  
      getAdvertiserOffers() {
        this.getLoader = true;
        axios
          .get(this.globalVariables.apiUrl+"advertiser/offers/get-data", {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          })
          .then((res) => {
            if ($.fn.DataTable.isDataTable('#advertiser_offers_datatables')) {
              $('#advertiser_offers_datatables').DataTable().destroy();
            }
            var table = $('#advertiser_offers_datatables').DataTable({
              data: res.data.getDatas,
              columns: [
                // { data: 'id' },
                { data: 'id' },
                { data: 'id' },
                { data: "convert_primary_country" },
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
                { data: "offer_type_name" },
                { data: "pay_out" },
                { data: "convart_status" },
                { data: "convert_action" },
              ],
              initComplete: () => {
                $('#advertiser_offers_datatables').wrap('<div class="commonDataTablesClass"></div>');
                const table = $("#advertiser_offers_datatables").DataTable();
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
                    $('.select-colunm-position').on('click', function (e) {
                  e.stopPropagation();
                });

                $('.select-colunm-position .dropdown-item').on('click', function (e) {
                  e.stopPropagation();
                });
              },
              createdRow: function (row, data, dataIndex) {
                  $('td:eq(0)', row).html(dataIndex + 1);
              },
              order: [[3, 'desc']],
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
                  text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Sl </a></li><li><a class="dropdown-item" href="#" data-column="1">ID</a></li><li><a class="dropdown-item" href="#" data-column="2">Primary Country</a></li><li><a class="dropdown-item" href="#" data-column="3">Offer</a></li><li><a class="dropdown-item" href="#" data-column="4">Offer Type</a></li><li><a class="dropdown-item" href="#" data-column="5">Payout</a></li><li><a class="dropdown-item" href="#" data-column="6">Status</a></li><li><a class="dropdown-item" href="#" data-column="7">Action</a></li></div></ul></div>',
                },
              ],
            });
            this.getLoader = false;
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.getLoader = false;
          });
      },


      getFiltarOffers() {
        if(this.filtarData.country === "" && this.filtarData.category === "" && this.filtarData.type === ""){
        this.getAdvertiserOffers();
      }else{
        this.getLoader = true;
        axios
          .post(this.globalVariables.apiUrl+"advertiser/offers/get-data/search", this.filtarData,{
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          })
          .then((res) => {
            if ($.fn.DataTable.isDataTable('#advertiser_offers_datatables')) {
              $('#advertiser_offers_datatables').DataTable().destroy();
            }
            var table = $('#advertiser_offers_datatables').DataTable({
              data: res.data.getDatas,
              columns: [
                // { data: 'id' },
                { data: 'id' },
                { data: 'id' },
                { data: "convert_primary_country" },
                { data: "name" },
                { data: "offer_type_name" },
                { data: "pay_out" },
                { data: "convart_status" },
                { data: "convert_action" },
              ],
              initComplete: () => {
                $('#advertiser_offers_datatables').wrap('<div class="commonDataTablesClass"></div>');
                const table = $("#advertiser_offers_datatables").DataTable();
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
                    $('.select-colunm-position').on('click', function (e) {
                  e.stopPropagation();
                });

                $('.select-colunm-position .dropdown-item').on('click', function (e) {
                  e.stopPropagation();
                });
              },
              createdRow: function (row, data, dataIndex) {
                  $('td:eq(0)', row).html(dataIndex + 1);
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
                  text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Sl </a></li><li><a class="dropdown-item" href="#" data-column="1">ID</a></li><li><a class="dropdown-item" href="#" data-column="2">Primary Country</a></li><li><a class="dropdown-item" href="#" data-column="3">Offer</a></li><li><a class="dropdown-item" href="#" data-column="4">Offer Type</a></li><li><a class="dropdown-item" href="#" data-column="5">Payout</a></li><li><a class="dropdown-item" href="#" data-column="6">Status</a></li><li><a class="dropdown-item" href="#" data-column="7">Action</a></li></div></ul></div>',
                },
              ],
            });
            this.getLoader = false;
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.getLoader = false;
          });
      }
    },
    },
  };
  </script>
  <style>
#advertiser_offers_datatables colgroup:nth-of-type(2) {
	display: none !important;
}
#advertiser_offers_datatables  .dt-checkboxes-cell{
  padding: 0.7rem 0.5rem !important;
}
#advertiser_offers_datatables .country-flag {
	width: 15%;
}
#dropdownMenuButton {
	background: transparent;
}
</style>
  