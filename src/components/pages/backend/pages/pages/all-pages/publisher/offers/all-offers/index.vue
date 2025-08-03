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
            <div class="card-header py-2">
              <h5 class="card-title mt-2 mb-0">Offers</h5>
            </div>
            <div class="card-body">
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
              <div id="externalFilters" v-if="showHiddenExternalFilter">
                <div>
                  <div class="row">
                    <div class="d-flex justify-content-between align-items-center border-bottom py-3 px-4">
                      <h5 class="mb-0">Apply Filter <template v-if="applyfillters.length > 0"><span
                            class="badge bg-dark text-white">{{ applyfillters.length ?? 0 }}</span></template>
                      </h5>
                      <a class="clearallexternalfilter" @click="externalfilterreset()">Clear All</a>
                    </div>
                  </div>
                  <div class="row px-3" id="externalFiltersWrapper">
                    <div class="col-md-6 border-right">
                      <ul class="px-0 mt-3" id="offer-extra-filter">
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Primary Country' ? 'check-active' : ''"
                            @click="clickFilters('primary_country', 'select', 'Primary Country')">Primary Country <i
                              class="fa-solid fa-caret-down"></i>
                          </a>
                          <template v-if="applyfillters.includes('Primary Country')">
                            <span @click="removeSearch('Primary Country', 'primary_country', 'select')"
                              id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Offer' ? 'check-active' : ''"
                            @click="clickFilters('name', 'search', 'Offer')">Offer
                          </a>
                          <template v-if="applyfillters.includes('Offer')">
                            <span @click="removeSearch('Offer', 'name', 'search')" id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Offer Type' ? 'check-active' : ''"
                            @click="clickFilters('type_id', 'select', 'Offer Type')">Offer Type <i
                              class="fa-solid fa-caret-down"></i>
                          </a>
                          <template v-if="applyfillters.includes('Offer Type')">
                            <span @click="removeSearch('Offer Type', 'type_id', 'select')"
                              id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Payout' ? 'check-active' : ''"
                            @click="clickFilters('pay_out', 'search', 'Payout')">Payout
                          </a>
                          <template v-if="applyfillters.includes('Payout')">
                            <span @click="removeSearch('Payout', 'pay_out', 'search')"
                              id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Status' ? 'check-active' : ''"
                            @click="clickFilters('status', 'search', 'Status')">Status
                          </a>
                          <template v-if="applyfillters.includes('Status')">
                            <span @click="removeSearch('Status', 'status', 'search')"
                              id="remove-to-search-list">x</span>
                          </template>
                        </li>
                       
                      </ul>
                    </div>
                    <div class="col-md-6 ps-4">
                      <div v-if="checkfilter.showcolumn != null && checkfilter.showcolumn != ''">
                        <p class="mt-3 mb-1 font-class">{{ checkfilter.showcolumn ?? '' }}</p>
                        <template
                          v-if="checkfilter.showcolumn == 'Primary Country' && checkfilter.types.includes('select')">
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.emptyValues['primary_country']" type="checkbox" value="1"
                              id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['primary_country']" type="checkbox" value="0"
                              id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <template v-if="checkfilter.showcolumn == 'Offer' && checkfilter.types.includes('search')">
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.emptyValues['name']" type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['name']" type="checkbox" value="0"
                              id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <template v-if="checkfilter.showcolumn == 'Offer Type' && checkfilter.types.includes('select')">
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.emptyValues['type_id']" type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['type_id']" type="checkbox" value="0"
                              id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <template v-if="checkfilter.showcolumn == 'Payout' && checkfilter.types.includes('search')">
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.emptyValues['pay_out']" type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['pay_out']" type="checkbox" value="0"
                              id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <template v-if="checkfilter.showcolumn == 'Status' && checkfilter.types.includes('search')">
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.emptyValues['status']" type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['status']" type="checkbox" value="0"
                              id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                     
                        <div>
                          <p>Have value</p>
                          <div>
                            <template
                              v-if="checkfilter.showcolumn == 'Primary Country' && checkfilter.types.includes('select')">
                              <template v-if="fillterDatas?.countryOffers?.length > 0">
                                <template v-for="(countryOffer, index) in fillterDatas?.countryOffers" :key="index">
                                  <template v-if="countryOffer.primary_country != null">
                                    <div class="form-check mb-2">
                                      <input @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                        v-model="checkfilter.selectedValues['primary_country']" class="form-check-input"
                                        type="checkbox" :value="countryOffer.primary_country"
                                        :id="'dynamicid' + countryOffer.primary_country">
                                      <label class="form-check-label" :for="'dynamicid' + countryOffer.primary_country">
                                        {{ countryOffer.primary_country ?? '' }}
                                      </label>
                                    </div>
                                  </template>
                                </template>
                              </template>
                            </template>
                            <template v-if="checkfilter.showcolumn == 'Offer' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.searchValues['name']" class="form-control mb-2" id="filtertext"
                                placeholder="Search here..">
                            </template>
                          
                            <template
                              v-if="checkfilter.showcolumn == 'Offer Type' && checkfilter.types.includes('select')">
                              <template v-if="fillterDatas?.offerTypes?.length > 0">
                                <template v-for="(offerType, index) in fillterDatas?.offerTypes" :key="index">
                                  <div class="form-check mb-2">
                                    <input @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                      v-model="checkfilter.selectedValues['type_id']" class="form-check-input"
                                      type="checkbox" :value="offerType.id" :id="'dynamicid' + offerType.id">
                                    <label class="form-check-label" :for="'dynamicid' + offerType.id">
                                      {{ offerType.type ?? '' }}
                                    </label>
                                  </div>
                                </template>
                              </template>
                            </template>
                            <template v-if="checkfilter.showcolumn == 'Payout' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.searchValues['pay_out']" class="form-control mb-2" id="filtertext"
                                placeholder="Search here..">
                            </template>
                            <template v-if="checkfilter.showcolumn == 'Status' && checkfilter.types.includes('select')">
                              <div class="form-check mb-2">
                                <input @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                  v-model="checkfilter.selectedValues['account_access']" class="form-check-input"
                                  type="checkbox" value="0" id="dynamicidstatus0">
                                <label class="form-check-label" for="dynamicidstatus0">
                                  Pending
                                </label>
                              </div>
                              <div class="form-check mb-2">
                                <input @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                  v-model="checkfilter.selectedValues['account_access']" class="form-check-input"
                                  type="checkbox" value="1" id="dynamicidstatus1">
                                <label class="form-check-label" for="dynamicidstatus1">
                                  Active
                                </label>
                              </div>
                              <div class="form-check mb-2">
                                <input @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                  v-model="checkfilter.selectedValues['account_access']" class="form-check-input"
                                  type="checkbox" value="2" id="dynamicidstatus2">
                                <label class="form-check-label" for="dynamicidstatus2">
                                  Paused
                                </label>
                              </div>
                              <div class="form-check mb-2">
                                <input @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                  v-model="checkfilter.selectedValues['account_access']" class="form-check-input"
                                  type="checkbox" value="3" id="dynamicidstatus3">
                                <label class="form-check-label" for="dynamicidstatus3">
                                  Resume
                                </label>
                              </div>
                              <div class="form-check mb-2">
                                <input @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                  v-model="checkfilter.selectedValues['account_access']" class="form-check-input"
                                  type="checkbox" value="4" id="dynamicidstatus4">
                                <label class="form-check-label" for="dynamicidstatus4">
                                  Reject
                                </label>
                              </div>
                            </template>
                          
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
      },
        showHiddenExternalFilter: false,
      checkfilter: {
        columns: ['primary_country'],
        showcolumn: "Primary Country",
        types: ['select'],
        emptyValues: {
          primary_country: [],
          name: [],
          category_id: [],
          type_id: [],
          pay_out: [],
          status: [],
          created_at: [],
        },
        notemptyValues: {
          primary_country: [],
          name: [],
          category_id: [],
          type_id: [],
          pay_out: [],
          status: [],
          created_at: [],
        },
        searchValues: {
          name: [],
          pay_out: [],
          created_at: [],
        },
        selectedValues: {
          primary_country: [],
          category_id: [],
          type_id: [],
          status: [],
        },
      },
      applyfillters: [],
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
                $('#publisher_offers_datatables').wrap('<div class="commonDataTablesClass"></div>');
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
                $('.select-colunm-position').on('click', function (e) {
                  e.stopPropagation();
                });

                $('.select-colunm-position .dropdown-item').on('click', function (e) {
                  e.stopPropagation();
                });
                this.attachEventListeners();
                 this.attachEventListenersOfButton();
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
                  className: "btn btn-primary me-2",
                  text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">ID</a></li><li><a class="dropdown-item" href="#" data-column="1">Primary Country</a></li><li><a class="dropdown-item" href="#" data-column="2">Offer</a></li><li><a class="dropdown-item" href="#" data-column="3">Offer Type</a></li><li><a class="dropdown-item" href="#" data-column="4">Payout</a></li><li><a class="dropdown-item" href="#" data-column="5">Status</a></li><li><a class="dropdown-item" href="#" data-column="6">Apply</a></li><li><a class="dropdown-item" href="#" data-column="7">View</a></li></div></ul></div>',
                },
                 {
                text:
                  '<span id="all_filters" class="all_filters"><i class="fa-solid fa-magnifying-glass me-1"></i>All Filters</span>',
                className: "btn btn-primary",
                attr: { id: "all_filters" },
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
                $('#publisher_offers_datatables').wrap('<div class="commonDataTablesClass"></div>');
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
                $('.select-colunm-position').on('click', function (e) {
                  e.stopPropagation();
                });

                $('.select-colunm-position .dropdown-item').on('click', function (e) {
                  e.stopPropagation();
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
                  className: "btn btn-primary me-2",
                  text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">ID</a></li><li><a class="dropdown-item" href="#" data-column="1">Primary Country</a></li><li><a class="dropdown-item" href="#" data-column="2">Offer</a></li><li><a class="dropdown-item" href="#" data-column="3">Offer Type</a></li><li><a class="dropdown-item" href="#" data-column="4">Payout</a></li><li><a class="dropdown-item" href="#" data-column="5">Status</a></li><li><a class="dropdown-item" href="#" data-column="6">Apply</a></li><li><a class="dropdown-item" href="#" data-column="7">View</a></li></div></ul></div>',
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

      attachEventListenersOfButton() {
      $("#publisher_offers_datatables_wrapper").on("click", "button", (event) => {
        const target = $(event.target);
        const dataClass = target.attr("id");
        if (dataClass == 'all_filters') {
          this.showHiddenExternalFilter = !this.showHiddenExternalFilter;
        }
      });
    },

    externalfilterreset() {
      this.checkfilter.columns = ['primary_country'],
        this.checkfilter.showcolumn = "Primary Country",
        this.checkfilter.types = ['select'],
        this.checkfilter.emptyValues = {
          primary_country: [],
          name: [],
          category_id: [],
          type_id: [],
          pay_out: [],
          status: [],
          created_at: [],
        },
        this.checkfilter.notemptyValues = {
          primary_country: [],
          name: [],
          category_id: [],
          type_id: [],
          pay_out: [],
          status: [],
          created_at: [],
        },
        this.checkfilter.searchValues = {
          name: [],
          pay_out: [],
          created_at: [],
        },
        this.checkfilter.selectedValues = {
          primary_country: [],
          category_id: [],
          type_id: [],
          status: [],
        },
        this.checkfilter.applyfillters = [],
        this.showHiddenExternalFilter = !this.showHiddenExternalFilter;
      this.clickCheckboxFilters();
    },

    clickFilters(value, type, key) {
      if (!Array.isArray(this.checkfilter.columns)) {
        this.checkfilter.columns = [];
      }
      if (!this.checkfilter.columns.includes(value)) {
        this.checkfilter.columns.push(value);
      }
      this.checkfilter.types.push(type);
      this.checkfilter.showcolumn = key;
      this.getFiltarOfExtranalFilter();
    },

    clickCheckboxFilters(value) {
      if (!Array.isArray(this.applyfillters)) {
        this.applyfillters = [];
      }
      if (value !== null && value !== undefined && !this.applyfillters.includes(value)) {
        this.applyfillters.push(value);
      }
      this.getFiltarOfExtranalFilter();
    },

    removeSearch(value, key, type) {
      if (!Array.isArray(this.applyfillters)) {
        this.applyfillters = [];
      }
      const index = this.applyfillters.indexOf(value);
      if (index > -1) {
        this.applyfillters.splice(index, 1);
        if (this.checkfilter.emptyValues.hasOwnProperty(key)) {
          this.checkfilter.emptyValues[key] = [];
        }

        if (this.checkfilter.notemptyValues.hasOwnProperty(key)) {
          this.checkfilter.notemptyValues[key] = [];
        }

        if (type == 'select') {
          if (this.checkfilter.selectedValues.hasOwnProperty(key)) {
            this.checkfilter.selectedValues[key] = [];
          }
        } else {
          if (this.checkfilter.searchValues.hasOwnProperty(key)) {
            this.checkfilter.searchValues[key] = [];
          }
        }
      }
      this.getFiltarOfExtranalFilter();
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
