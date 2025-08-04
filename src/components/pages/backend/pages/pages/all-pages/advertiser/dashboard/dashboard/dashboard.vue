<template>
  <!-- <div v-if="getLoader">
    <Loader></Loader>
  </div> -->
  <!-- Content wrapper -->
  <div class="content-wrapper">
    <!-- Content -->

    <div class="container-fluid flex-grow-1 container-p-y">
      <div class="row mt-4">
        <div class="container-xxl flex-grow-1 container-p-y">
          <div id="noaccessuseralert" v-if="User.account_access != 1">
            <span style="color: white" ><strong>Your account is under review </strong> 
              <p class="mb-0">We are reviewing your account. You will be notified once the review is complete.
                Please ensure your profile is completed.</p>
              </span>
          </div>

          <div class="row">
            <!-- Website Analytics -->
            <div class="col-lg-6 mb-4" v-if="User.is_email_verified && User.account_access == 1">
              <Suspense>
                <template v-if="totalDashboardData">
                  <div
                    class="swiper-container swiper-container-horizontal swiper"
                    id="swiper-with-pagination-cards"
                  >
                    <div class="swiper-wrapper rounded">
                      <div class="swiper-slide">
                        <div class="row">
                          <div class="col-12">
                            <h5 class="text-white mb-0 mt-2">Website Analytics</h5>
                            <small class="text-white">Total Conversion Rate</small>
                          </div>
                          <div class="col-lg-7 col-md-9 col-12 order-2 order-md-1">
                            <h6 class="text-white mt-0 mt-md-3 mb-3 swiper-h5">
                              Sources
                            </h6>
                            <div class="row">
                              <div class="col-6">
                                <ul class="list-unstyled mb-0">
                                  <li class="d-flex mb-4 align-items-center">
                                    <p
                                      class="mb-0 fw-medium me-2 website-analytics-text-bg swiper-p"
                                    >
                                      {{
                                        totalDashboardData &&
                                        totalDashboardData.totalTickets
                                      }}
                                    </p>
                                    <p class="mb-0 swiper-p">Total Tickets</p>
                                  </li>
                                  <li class="d-flex align-items-center mb-2">
                                    <p
                                      class="mb-0 fw-medium me-2 website-analytics-text-bg swiper-p"
                                    >
                                      {{
                                        totalDashboardData &&
                                        totalDashboardData.openTickets
                                      }}
                                    </p>
                                    <p class="mb-0 swiper-p">Open Tickets</p>
                                  </li>
                                </ul>
                              </div>
                              <div class="col-6">
                                <ul class="list-unstyled mb-0">
                                  <li class="d-flex mb-4 align-items-center">
                                    <p
                                      class="mb-0 fw-medium me-2 website-analytics-text-bg swiper-p"
                                    >
                                      {{
                                        totalDashboardData &&
                                        totalDashboardData.countOffers
                                      }}
                                    </p>
                                    <p class="mb-0 swiper-p">Resent Offers</p>
                                  </li>
                                  <li class="d-flex align-items-center mb-2">
                                    <p
                                      class="mb-0 fw-medium me-2 website-analytics-text-bg swiper-p"
                                    >
                                      {{
                                        totalDashboardData &&
                                        totalDashboardData.campaignCount
                                      }}
                                    </p>
                                    <p class="mb-0 swiper-p">Total Campaigns</p>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div
                            class="swiper-img col-lg-5 col-md-3 col-12 order-1 order-md-2 my-4 my-md-0 text-center"
                          >
                            <img
                              src="../../../../../../../../../assets/image/card-website-analytics-3.png"
                              width="170px"
                              alt=""
                              class=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <one-preLoader></one-preLoader>
                </template>
              </Suspense>
            </div>
            <!--/ Website Analytics -->

            <!-- Sales Overview -->
            <div class="col-lg-3 col-sm-6 mb-4" v-if="User.is_email_verified && User.account_access == 1">
              <Suspense>
                <template v-if="totalDashboardData">
                  <div class="card py-3">
                    <div class="card-header">
                      <div class="d-flex justify-content-between">
                        <small class="d-block mb-1 text-muted">Overview</small>
                      </div>
                      <h4 class="card-title mb-1">
                        {{
                          totalDashboardData.campaignCount +
                          totalDashboardData.totalTickets
                        }}
                      </h4>
                    </div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col-4">
                          <div class="d-flex gap-2 align-items-center mb-2">
                            <span class="badge bg-label-info p-1 rounded"
                              ><i class="fa-solid fa-ticket fs-5"></i
                            ></span>
                            <p class="mb-0 sales-p">Tickets</p>
                          </div>
                          <h5 class="mb-0 pt-1 text-nowrap">
                            {{
                              calculatePercentage(
                                totalDashboardData && totalDashboardData.totalTickets
                              )
                            }}%
                          </h5>
                          <small class="text-muted">{{
                            totalDashboardData && totalDashboardData.totalTickets
                          }}</small>
                        </div>
                        <div class="col-4">
                          <div class="divider divider-vertical">
                            <div class="divider-text">
                              <span class="badge-divider-bg bg-label-secondary">VS</span>
                            </div>
                          </div>
                        </div>
                        <div class="col-4 text-end">
                          <div
                            class="d-flex gap-2 justify-content-end align-items-center mb-2"
                          >
                            <p class="mb-0 sales-p">Campaigns</p>
                            <span class="badge bg-label-primary p-1 rounded"
                              ><i class="fa-brands fa-free-code-camp fs-5"></i
                            ></span>
                          </div>
                          <h5 class="mb-0 pt-1 text-nowrap ms-lg-n3 ms-xl-0">
                            {{
                              calculatePercentage(
                                totalDashboardData && totalDashboardData.campaignCount
                              )
                            }}%
                          </h5>
                          <small class="text-muted">{{
                            totalDashboardData && totalDashboardData.campaignCount
                          }}</small>
                        </div>
                      </div>
                      <div class="d-flex align-items-center mt-4">
                        <div class="progress w-100" style="height: 8px">
                          <div
                            class="progress-bar bg-info"
                            :style="{
                              width:
                                calculatePercentage(
                                  totalDashboardData && totalDashboardData.totalTickets
                                ) + '%',
                            }"
                            :aria-valuenow="
                              calculatePercentage(
                                totalDashboardData && totalDashboardData.totalTickets
                              )
                            "
                            role="progressbar"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                          <div
                            class="progress-bar bg-primary"
                            role="progressbar"
                            :style="{
                              width:
                                calculatePercentage(
                                  totalDashboardData && totalDashboardData.campaignCount
                                ) + '%',
                            }"
                            :aria-valuenow="
                              calculatePercentage(
                                totalDashboardData && totalDashboardData.campaignCount
                              )
                            "
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <two-preLoader></two-preLoader>
                </template>
              </Suspense>
            </div>
            <!--/ Sales Overview -->

            <!-- Revenue Generated -->
            <div class="col-lg-3 col-md-6 col-sm-6 mb-4" v-if="User.is_email_verified && User.account_access == 1">
              <Suspense>
                <template v-if="totalDashboardData">
                  <div class="card py-3 h-100">
                    <div class="card-body pb-0">
                      <div class="card-icon">
                        <span class="badge bg-label-success rounded-pill p-2">
                          <i class="fa-solid fa-ticket fs-5"></i>
                        </span>
                      </div>
                      <h5 class="card-title mb-0 mt-2">
                        {{ totalDashboardData && totalDashboardData.totalTickets }}
                      </h5>
                      <small>Tickets Generated</small>
                    </div>
                    <div id="ticketsGenerated"></div>
                  </div>
                </template>
                <template v-else>
                  <three-preLoader></three-preLoader>
                </template>
              </Suspense>
            </div>
            <!--/ Revenue Generated -->

            <!-- Earning Reports -->
            <div class="col-lg-6 mb-4" v-if="User.is_email_verified && User.account_access == 1">
              <Suspense>
                <template v-if="totalDashboardData">
                  <div class="card h-100">
                    <div class="card-header pb-0 d-flex justify-content-between mb-lg-n4">
                      <div class="card-title mb-0">
                        <h5 class="mb-0">Campaigns Reports</h5>
                        <small class="text-muted">Monthly Campaigns Overview</small>
                      </div>
                    </div>
                    <div class="card-body">
                      <div id="campaignReports"></div>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <four-preLoader></four-preLoader>
                </template>
              </Suspense>
            </div>
            <!--/ Earning Reports -->

            <!-- Support Tracker -->
            <div class="col-md-6 mb-4" v-if="User.is_email_verified && User.account_access == 1">
              <Suspense>
                <template v-if="totalDashboardData">
                  <div class="card h-100">
                    <iframe
                      :src="IframUrl"
                      frameborder="0"
                      width="100%"
                      height="392px"
                    ></iframe>
                  </div>
                </template>
                <template v-else>
                  <five-preLoader></five-preLoader>
                </template>
              </Suspense>
            </div>
            <!--/ Support Tracker -->
          </div>
        </div>

        <!-- data table row -->
        <div class="row" :class="User.account_access != 1 ||  !User.is_email_verified ? 'hiddenofferTable' : ''">
          <div class="col-md-12">
            <div class="card mt-2 p-0">
              <div class="card-header py-3">
                <h5 class="card-title mb-0 mt-2">Recent Offers</h5>
              </div>
              <div class="card-body">
                <table
                  class="table mt-2 align-middle mb-0 table-hover"
                  id="advertisher_offers"
                >
                  <thead>
                    <tr>
                      <th>SL</th>
                      <th>Offer Name</th>
                      <th>Country</th>
                      <th>Featured</th>
                      <th>Created At</th>
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
                            <a :class="checkfilter.showcolumn == 'Offer Name' ? 'check-active' : ''"
                              @click="clickFilters('name', 'search', 'Offer Name')">Offer Name
                            </a>
                            <template v-if="applyfillters.includes('Offer Name')">
                              <span @click="removeSearch('Offer Name', 'name', 'search')"
                                id="remove-to-search-list">x</span>
                            </template>
                          </li>
                          <li class="position-relative">
                            <a :class="checkfilter.showcolumn == 'Country' ? 'check-active' : ''"
                              @click="clickFilters('country', 'search', 'Country')">Country
                            </a>
                            <template v-if="applyfillters.includes('Country')">
                              <span @click="removeSearch('Country', 'country', 'search')"
                                id="remove-to-search-list">x</span>
                            </template>
                          </li>
                          <li class="position-relative">
                            <a :class="checkfilter.showcolumn == 'Featured' ? 'check-active' : ''"
                              @click="clickFilters('featured', 'select', 'Featured')">Featured <i class="fa-solid fa-caret-down"></i> 
                            </a>
                            <template v-if="applyfillters.includes('Featured')">
                              <span @click="removeSearch('Featured', 'featured', 'select')"
                                id="remove-to-search-list">x</span>
                            </template>
                          </li>
                          <li class="position-relative">
                            <a :class="checkfilter.showcolumn == 'Created At' ? 'check-active' : ''"
                              @click="clickFilters('created_at', 'search', 'Created At')">Created At
                            </a>
                            <template v-if="applyfillters.includes('Created At')">
                              <span @click="removeSearch('Created At', 'created_at', 'search')"
                                id="remove-to-search-list">x</span>
                            </template>
                          </li>
                        </ul>
                      </div>
                      <div class="col-md-6 ps-4">
                        <div v-if="checkfilter.showcolumn != null && checkfilter.showcolumn != ''">
                          <p class="mt-3 mb-1 font-class">{{ checkfilter.showcolumn ?? '' }}</p>
                          <template v-if="checkfilter.showcolumn == 'Offer Name' && checkfilter.types.includes('search')">
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.emptyValues['name']" type="checkbox" value="1"
                                id="isemptyvalue">
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
                          <template v-if="checkfilter.showcolumn == 'Country' && checkfilter.types.includes('search')">
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.emptyValues['country']" type="checkbox" value="1"
                                id="isemptyvalue">
                              <label class="form-check-label" for="isemptyvalue">
                                is Empty
                              </label>
                            </div>
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.notemptyValues['country']" type="checkbox" value="0"
                                id="isnotemptyvalue">
                              <label class="form-check-label" for="isnotemptyvalue">
                                is not Empty
                              </label>
                            </div>
                          </template>
                          <template v-if="checkfilter.showcolumn == 'Featured' && checkfilter.types.includes('select')">
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.emptyValues['featured']" type="checkbox" value="1"
                                id="isemptyvalue">
                              <label class="form-check-label" for="isemptyvalue">
                                is Empty
                              </label>
                            </div>
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.notemptyValues['featured']" type="checkbox" value="0"
                                id="isnotemptyvalue">
                              <label class="form-check-label" for="isnotemptyvalue">
                                is not Empty
                              </label>
                            </div>
                          </template>
                          <template v-if="checkfilter.showcolumn == 'Created At' && checkfilter.types.includes('search')">
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.emptyValues['created_at']" type="checkbox" value="1"
                                id="isemptyvalue">
                              <label class="form-check-label" for="isemptyvalue">
                                is Empty
                              </label>
                            </div>
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.notemptyValues['created_at']" type="checkbox" value="0"
                                id="isnotemptyvalue">
                              <label class="form-check-label" for="isnotemptyvalue">
                                is not Empty
                              </label>
                            </div>
                          </template>
                          <div>
                            <p>Have value</p>
                            <div>
                              <template v-if="checkfilter.showcolumn == 'Offer Name' && checkfilter.types.includes('search')">
                                <label for="filtertext">Contains</label>
                                <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                  v-model="checkfilter.searchValues['name']" class="form-control mb-2"
                                  id="filtertext" placeholder="Search here..">
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Country' && checkfilter.types.includes('search')">
                                <label for="filtertext">Contains</label>
                                <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                  v-model="checkfilter.searchValues['country']" class="form-control mb-2"
                                  id="filtertext" placeholder="Search here..">
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Featured' && checkfilter.types.includes('search')">
                                <div class="form-check mb-2">
                                    <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['featured']" class="form-check-input" type="checkbox" value="1" id="1">
                                    <label class="form-check-label" for="1">
                                      Yes
                                    </label>
                                  </div>
                                  <div class="form-check mb-2">
                                    <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['featured']" class="form-check-input" type="checkbox" value="0" id="0">
                                    <label class="form-check-label" for="0">
                                      No
                                    </label>
                                  </div>
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Created At' && checkfilter.types.includes('search')">
                                <label for="filtertext">Contains</label>
                                <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                  v-model="checkfilter.searchValues['created_at']" class="form-control mb-2"
                                  id="filtertext" placeholder="Search here..">
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
        <!-- data table row closed -->
      </div>
    </div>
    <!-- / Content -->
  </div>
  <!-- Content wrapper -->
</template>

<script>
// Import necessary packages for ApexCharts
import ApexCharts from "apexcharts";
import axios from "axios";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import Swal from "sweetalert2";
import Loader from "../../../../../../../frontend/include/loder.vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide } from "vue3-carousel";
import { inject } from "vue";
import onePreLoader from "../../../../../../../../preloader/dashboardOne.vue";
import twoPreLoader from "../../../../../../../../preloader/dashboardTwo.vue";
import threePreLoader from "../../../../../../../../preloader/dashboardThree.vue";
import fourPreLoader from "../../../../../../../../preloader/dashboardFour.vue";
import fivePreLoader from "../../../../../../../../preloader/dashboradFive.vue";
import { fetchUserRoleAdvertiser } from "@/services/userServiceAdvertiser";
import moment from "moment";


export default {
  setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
  props: ["Banners"],
  components: {
    Loader,
    Carousel,
    Slide,
    onePreLoader,
    twoPreLoader,
    threePreLoader,
    fourPreLoader,
    fivePreLoader,
  },
  data: () => {
    return {
      getLoader: false,
      User: "",
      IframUrl: "",
      autoplayInterval: 1000,
      itemsToShow: 1,
      totalOffers: "",
      totalCampaign: "",
      accountManager: "",
      totalDashboardData: "",
      totalTC: "",
      showHiddenExternalFilter: false,
      checkfilter: {
      columns: ['name'],
      showcolumn: "Offer Name",
      types: ['search'],
      emptyValues: {
        name : [],
        country : [],
        featured : [],
        created_at : [],
      },
      notemptyValues: {
        name : [],
        country : [],
        featured : [],
        created_at : [],
      },
      searchValues: {
        name : [],
        country : [],
        created_at : [],
      },
      selectedValues: {
        featured : [],
      },
    },
    applyfillters: [],
    };
  },
  async mounted() { 
    try {
      const { role, isAuthorized } = await fetchUserRoleAdvertiser();
      if (role == 'Advertiser') {
        if (this.$route.params.id === "user") {
          if (!localStorage.getItem("reloadCount")) {
            localStorage.setItem("reloadCount", 0);
          }
          this.reloadCount = parseInt(localStorage.getItem("reloadCount"));

          if (this.reloadCount === 0) {
            localStorage.setItem("reloadCount", 1);
            location.reload(true);
          } else {
            this.getUserData();
            this.getAdvertiserData();
            this.getAdvertiserDashboardData();
            this.updateItemsToShow();
            window.addEventListener("resize", this.updateItemsToShow);
            localStorage.setItem("reloadCount", 0);

            this.$nextTick(() => {
              const dataTableWrapper = document.querySelectorAll(
                "#advertisher_offers_wrapper .row.mx-2"
              );
              if (dataTableWrapper.length > 0) {
                dataTableWrapper[0].style.display = "none";
                dataTableWrapper[1].style.display = "none";
              }
            });
          }
        } else {
          this.getUserData();
          this.getAdvertiserData();
          this.getAdvertiserDashboardData();
          this.updateItemsToShow();
          window.addEventListener("resize", this.updateItemsToShow);
          this.$nextTick(() => {
            const dataTableWrapper = document.querySelectorAll(
              "#advertisher_offers_wrapper .row.mx-2"
            );
            if (dataTableWrapper.length > 0) {
              dataTableWrapper[0].style.display = "none";
              dataTableWrapper[1].style.display = "none";
            }
          });
        }
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  },
  methods: {
    getUserData() {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl + "auth/user/data", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          this.User = res.data.data;
          this.accountManager = res.data.account_manager;
          this.renderChart();
        })
        .catch((error) => {
          return error;
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    getAdvertiserData() {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl + "advertiser/dashboard", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          this.totalDashboardData = res.data;
          this.IframUrl = res.data.ifrem_url;
          this.totalTC = res.data.campaignCount + res.data.totalTickets;
          if ($.fn.DataTable.isDataTable("#advertisher_offers")) {
            $("#advertisher_offers").DataTable().destroy();
          }
          var formateDate = this.formatDates;
          var table = $("#advertisher_offers").DataTable({
            data: res.data.recentOffer,
            columns: [
              { data: "id" },
              {
                data: "name",
                render: function (data, type, row) {
                  if (row.name != null) {
                    const displayedName = row.name.length > 30 
                      ? row.name.slice(0, 30) + '...' 
                      : row.name;
                    return `<a href="/advertiser-offers-view/${row.id}" class="custom-link">${displayedName}</a>`;
                  }
                  return '----------';
                }
              },
              {
                data: "country",
                render: function (data, type, row) {
                  if (row.country != null) {
                    return row.country.length > 30 
                      ? row.country.slice(0, 30) + '...'  
                      : row.country; 
                  }
                  return '----------';
                },
              },
              {
                data: "updated_at",
                render: function (data, type, row) {
                  if (row.featured == 1) {
                    return "Yes";
                  } else {
                    return "No";
                  }
                },
              },
               { data: "created_at",
              render: function (data, type, row) {
                if (row?.created_at != null && row?.created_at != "") {
                  return formateDate(row?.created_at);
                }
                return '----------';
              },
              }, 
            ],
            initComplete: () => {
              $('#advertisher_offers').wrap('<div class="commonDataTablesClass"></div>');
            const table = $("#advertisher_offers").DataTable();
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
                this.attachEventListenersOfButton();
                $('.select-colunm-position').on('click', function (e) {
                  e.stopPropagation();
                });

                $('.select-colunm-position .dropdown-item').on('click', function (e) {
                  e.stopPropagation();
                });
          },
            order: [[3, "desc"]],
            dom:
              '<"row mx-2"' +
              '<"col-md-4"f>' +
              '<"col-md-8 dopp_tb d-flex justify-content-end align-items-center"l<"button-wrapper"B>>' +
              '<"col-md-3 d-none"p>>' +
              "t" +
              '<"row mx-2"' +
              '<"col-md-5"i>' +
              '<"col-md-7"p>>',
            displayLength: 10,
            lengthMenu: [10, 20, 50, 100, 200],
            language: {
              sLengthMenu: "_MENU_",
              search: "",
              searchPlaceholder: "Search Offer",
              paginate: {
                previous: '<i class="fa-solid fa-chevron-left"></i>',
                next: '<i class="fa-solid fa-chevron-right"></i>',
              },
            },
            buttons: [
              {
                className: "btn btn-primary me-2",
                text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Sl</a></li><li><a class="dropdown-item" href="#" data-column="1">Offer Name</a></li><li><a class="dropdown-item" href="#" data-column="2">Country</a></li><li><a class="dropdown-item" href="#" data-column="3">Featured</a></li></div></ul></div>',
              },
              {
                text:
                  '<span id="all_filters" class="all_filters"><i class="fa-solid fa-magnifying-glass me-1"></i>All Filters</span>',
                className: "btn btn-primary",
                attr: { id: "all_filters"},
              },
            ],
          });
        })
        .catch((error) => {
          return error;
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    externalfilterreset(){
          this.checkfilter.columns = ['name'],
          this.checkfilter.showcolumn = "Offer Name",
          this.checkfilter.types = ['search'],
          this.checkfilter.emptyValues = {
            name : [],
            country : [],
            featured : [],
            created_at : [],
          },
          this.checkfilter.notemptyValues = {
            name : [],
            country : [],
            featured : [],
            created_at : [],
          },
          this.checkfilter.searchValues = {
            name : [],
            country : [],
            created_at : [],
          },
          this.checkfilter.selectedValues = {
            featured : [],
          },
          this.checkfilter.applyfillters = [],
          this.showHiddenExternalFilter = !this.showHiddenExternalFilter;
          this.clickCheckboxFilters();
    },
        
    clickFilters(value,type, key) {
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
    
    attachEventListenersOfButton(){
      $("#advertisher_offers_wrapper").on("click", "button", (event) => {
        const target = $(event.target);
        const dataClass = target.attr("id");
        if(dataClass == 'all_filters'){
          this.showHiddenExternalFilter = !this.showHiddenExternalFilter;
        }
      });
    },
        
    getFiltarOfExtranalFilter(perPage = 10,) {
          axios
            .post(
              this.globalVariables.apiUrl + "advertiser/search-get-data-all-filter",
              this.checkfilter,
              {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") }
              }
            )
            .then((res) => {
              const { data, current_page, last_page,recordsTotal } = res.data;
              this.currentPage = current_page;
              this.lastPage = last_page;
              this.recordsTotal = recordsTotal;
              this.startPage = (current_page - 1) * perPage + 1;
              this.endPage = Math.min(current_page * perPage, recordsTotal);
    
              // if ($.fn.DataTable.isDataTable("#offer_datatables")) {
              //   $("#offer_datatables").DataTable().destroy();
              // }
    
              if ($.fn.DataTable.isDataTable("#advertisher_offers")) {
                const table = $("#advertisher_offers").DataTable();
                table.clear();
                table.rows.add(res.data.recentOffer ?? []);
                table.draw();
              } else {
                var formateDate = this.formatDates;
                var table = $("#advertisher_offers").DataTable({
                  data: res.data.recentOffer,
                  columns: [
                    { data: "id" },
                    {
                      data: "name",
                      render: function (data, type, row) {
                        if (row.name != null) {
                          const displayedName = row.name.length > 30 
                            ? row.name.slice(0, 30) + '...' 
                            : row.name;
                          return `<a href="/advertiser-offers-view/${row.id}" class="custom-link">${displayedName}</a>`;
                        }
                        return '----------';
                      }
                    },
                    {
                      data: "country",
                      render: function (data, type, row) {
                        if (row.country != null) {
                          return row.country.length > 30 
                            ? row.country.slice(0, 30) + '...'  
                            : row.country; 
                        }
                        return '----------';
                      },
                    },
                    {
                      data: "updated_at",
                      render: function (data, type, row) {
                        if (row.featured == 1) {
                          return "Yes";
                        } else {
                          return "No";
                        }
                      },
                    },
                      { data: "created_at",
                    render: function (data, type, row) {
                      if (row?.created_at != null && row?.created_at != "") {
                        return formateDate(row?.created_at);
                      }
                      return '----------';
                    },
                    }, 
                  ],
                  initComplete: () => {
                    $('#advertisher_offers').wrap('<div class="commonDataTablesClass"></div>');
                  const table = $("#advertisher_offers").DataTable();
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
                      this.attachEventListenersOfButton();
                      $('.select-colunm-position').on('click', function (e) {
                        e.stopPropagation();
                      });

                      $('.select-colunm-position .dropdown-item').on('click', function (e) {
                        e.stopPropagation();
                      });
                },
                  order: [[3, "desc"]],
                  dom:
                    '<"row mx-2"' +
                    '<"col-md-4"f>' +
                    '<"col-md-8 dopp_tb d-flex justify-content-end align-items-center"l<"button-wrapper"B>>' +
                    '<"col-md-3 d-none"p>>' +
                    "t" +
                    '<"row mx-2"' +
                    '<"col-md-5"i>' +
                    '<"col-md-7"p>>',
                  displayLength: 10,
                  lengthMenu: [10, 20, 50, 100, 200],
                  language: {
                    sLengthMenu: "_MENU_",
                    search: "",
                    searchPlaceholder: "Search Offer",
                    paginate: {
                      previous: '<i class="fa-solid fa-chevron-left"></i>',
                      next: '<i class="fa-solid fa-chevron-right"></i>',
                    },
                  },
                  buttons: [
                    {
                      className: "btn btn-primary me-2",
                      text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Sl</a></li><li><a class="dropdown-item" href="#" data-column="1">Offer Name</a></li><li><a class="dropdown-item" href="#" data-column="2">Country</a></li><li><a class="dropdown-item" href="#" data-column="3">Featured</a></li></div></ul></div>',
                    },
                    {
                      text:
                        '<span id="all_filters" class="all_filters"><i class="fa-solid fa-magnifying-glass me-1"></i>All Filters</span>',
                      className: "btn btn-primary",
                      attr: { id: "all_filters"},
                    },
                  ],
                });
              };
              this.getLoader = false;
            })
            .catch((error) => {
              console.error(error);
            })
            .finally(() => {
              // this.getSkeletonLoader = false;
              this.getLoader = false;
    });
    },

    formatDates(date) {
      return moment(date).format('D MMMM YYYY');
    },

    getAdvertiserDashboardData() {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl + "publisher/dashboard/data", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          this.totalOffers = res.data.requestOffer;
          this.totalCampaign = res.data.compaign;
        })
        .catch((error) => {
          return error;
        })
        .finally(() => {
          this.getLoader = false;
        });
    },
    calculatePercentage(count) {
      if (this.totalTC === 0) {
        return 0;
      }
      return ((count / this.totalTC) * 100).toFixed(2);
    },
    updateItemsToShow() {
      if (window.innerWidth < 380) {
        this.itemsToShow = 1;
      } else if (window.innerWidth < 768) {
        this.itemsToShow = 1;
      } else if (window.innerWidth < 992) {
        this.itemsToShow = 1;
      } else {
        this.itemsToShow = 1;
      }
    },

    renderChart() {
      axios
        .get(this.globalVariables.apiUrl + "advertiser/dashboard/count-data", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          var options = {
            chart: {
              height: 130,
              type: "area",
              parentHeightOffset: 0,
              toolbar: {
                show: false,
              },
              sparkline: {
                enabled: true,
              },
            },
            markers: {
              colors: "transparent",
              strokeColors: "transparent",
            },
            grid: {
              show: false,
            },
            colors: ["#28c76f"],
            fill: {
              type: "gradient",
              gradient: {
                shade: "red",
                shadeIntensity: 0.8,
                opacityFrom: 0.6,
                opacityTo: 0.1,
              },
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              width: 2,
              curve: "smooth",
            },
            series: [
              {
                data: [1, 2, 3, 4, 5, 6, 380],
              },
            ],
            xaxis: {
              show: true,
              lines: {
                show: false,
              },
              labels: {
                show: false,
              },
              stroke: {
                width: 100,
              },
              axisBorder: {
                show: false,
              },
            },
            yaxis: {
              stroke: {
                width: 100,
              },
              show: false,
            },
            tooltip: {
              enabled: false,
            },
          };
          var chart = new ApexCharts(
            document.querySelector("#ticketsGenerated"),
            options
          );
          var cchartHTML = document.querySelector("#ticketsGenerated");
          cchartHTML.innerHTML = "";
          chart.render();
          chart.updateSeries([
            {
              name: "Tickets",
              data: res.data.ticketDatas,
            },
          ]);
        })
        .catch((error) => {
          return error;
        })
        .finally(() => {
          this.getLoader = false;
        });

      axios
        .get(this.globalVariables.apiUrl + "advertiser/dashboard/count-data", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          var campaignReportsConfig = {
            chart: {
              height: 325,
              parentHeightOffset: 0,
              type: "bar",
              toolbar: {
                show: false,
              },
            },
            plotOptions: {
              bar: {
                barHeight: "100%",
                columnWidth: "38%",
                startingShape: "rounded",
                endingShape: "rounded",
                borderRadius: 4,
                distributed: true,
              },
            },
            grid: {
              show: false,
              padding: {
                top: -30,
                bottom: 0,
                left: -10,
                right: -10,
              },
            },
            colors: ["#7367f0"],
            dataLabels: {
              enabled: false,
            },
            series: [
              {
                data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
              },
            ],
            legend: {
              show: false,
            },
            xaxis: {
              categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              labels: {
                style: {
                  colors: "#7367f0",
                  fontSize: "13px",
                },
              },
            },
            yaxis: {
              labels: {
                show: false,
              },
            },
            tooltip: {
              enabled: false,
            },
            responsive: [
              {
                breakpoint: 1025,
                options: {
                  chart: {
                    height: 199,
                  },
                },
              },
            ],
          };
          var campaignReportsChart = new ApexCharts(
            document.querySelector("#campaignReports"),
            campaignReportsConfig
          );
          var campaignReportsHTML = document.querySelector("#campaignReports");
          campaignReportsHTML.innerHTML = "";
          campaignReportsChart.render();
          campaignReportsChart.updateSeries([
            {
              name: "Campaign",
              data: res.data.campaign,
            },
          ]);
        })
        .catch((error) => {
          return error;
        })
        .finally(() => {
          this.getLoader = false;
        });
    },
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateItemsToShow);
  },
};
</script>
<style>
.advertiser-avatar img {
  width: 60px;
  height: 68px;
  border-radius: 50%;
}
.apexcharts-menu-icon {
  display: none;
}

#advertisher_offers colgroup:nth-of-type(2) {
  display: none !important;
}
</style>
<style scoped>
.advertiser-content-btn a {
  font-size: 16px;
  font-weight: 500;
  padding: 7px 30px;
  display: inline-block;
  border: 1px solid #0661e0;
  border-radius: 30px;
  margin-top: 20px;
  transition: all 0.4s ease;
}
.bg-success-gradient {
  background-image: linear-gradient(to left, #48d6a8 0, #029666 100%) !important;
}
.card {
  border-radius: 7px;
}
.overflow-hidden {
  overflow: hidden !important;
}
.bg-warning-gradient {
  background-image: linear-gradient(to left, #efa65f, #f76a2d) !important;
}
.iframurl {
  height: 320px;
}
.swiper-wrapper {
  background: #7367f0;
}
.swiper-h5 {
  font-size: 1.125rem;
  font-family: var(--bs-body-font-family);
}
.swiper-p {
  font-family: var(--bs-body-font-family);
  color: white;
  font-size: 15px;
}
.short-des {
  font-size: 13px;
}
.earning h6 {
  font-size: 0.9375rem;
  font-family: var(--bs-body-font-family);
  font-weight: 600;
}
.sales-p {
  font-size: 0.9375rem;
  font-family: var(--bs-body-font-family);
}
#noaccessuseralert {
	background: #FFEAA7;
	margin-bottom: 15px;
	padding: 20px;
	border: 1px solid #dddcdc;
	border-radius: 6px;
	border-left: 5px solid #FDCB6E;
}
#noaccessuseralert strong {
  font-size: 30px;
  color: #555;
}
#noaccessuseralert p{
  color: #555;
  font-size: 18px;
}
.hiddenofferTable{
  visibility: hidden;
  height: 0;
}
</style>
