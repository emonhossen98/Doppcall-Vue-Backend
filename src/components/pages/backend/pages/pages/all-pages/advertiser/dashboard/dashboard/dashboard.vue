<template>
  <!-- <div v-if="getLoader">
    <Loader></Loader>
  </div> -->
  <!-- Content wrapper -->
  <div class="content-wrapper">
    <!-- Content -->

    <div class="container-xxl flex-grow-1 container-p-y">
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
              <div class="card-body px-0">
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
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
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
            ],
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
