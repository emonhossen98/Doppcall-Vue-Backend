<template>
  <!-- Content wrapper -->
  <div class="content-wrapper">
    <!-- Content -->
    <div class="container-fluid flex-grow-1">
      <!-- row -->
      <div class="row row-sm mt-4 admin-dashboard">
        <div class="col-md-6 mb-4">
          <Suspense>
            <template v-if="Dashboard">
              <div class="swiper-slide dashboard-silder">
                <div class="row">
                  <div class="col-12">
                    <h5 class="text-white mb-0 mt-2">Total Users Analytics</h5>
                    <small class="text-white">Total Users Conversion Rate</small>
                  </div>
                  <div class="row">
                    <div class="col-lg-7 col-md-9 col-12 order-2 order-md-1">
                      <h6 class="text-white mt-0 mt-md-3 mb-3 font-class">
                        Users Analytics
                      </h6>
                      <div class="row">
                        <div class="col-6">
                          <ul class="list-unstyled mb-0">
                            <li class="d-flex mb-4 align-items-center">
                              <p
                                class="mb-0 fw-medium me-2 website-analytics-text-bg text-white font-class"
                              >
                                {{ Dashboard && Dashboard.publishers }}
                              </p>
                              <p
                                class="mb-0 text-white font-class website-analytics-text"
                              >
                                PUBLISHERS
                              </p>
                            </li>
                            <li class="d-flex align-items-center mb-2">
                              <p
                                class="mb-0 fw-medium me-2 website-analytics-text-bg text-white font-class"
                              >
                                {{ Dashboard && Dashboard.advertisers }}
                              </p>
                              <p
                                class="mb-0 text-white font-class website-analytics-text"
                              >
                                ADVERTISERS
                              </p>
                            </li>
                          </ul>
                        </div>
                        <div class="col-6">
                          <ul class="list-unstyled mb-0">
                            <li class="d-flex mb-4 align-items-center">
                              <p
                                class="mb-0 fw-medium me-2 website-analytics-text-bg text-white font-class"
                              >
                                {{ Dashboard && Dashboard.offers }}
                              </p>
                              <p
                                class="mb-0 text-white font-class website-analytics-text"
                              >
                                OFFERS
                              </p>
                            </li>
                            <li class="d-flex align-items-center mb-2">
                              <p
                                class="mb-0 fw-medium me-2 website-analytics-text-bg text-white font-class"
                              >
                                {{ Dashboard && Dashboard.campaigns }}
                              </p>
                              <p
                                class="mb-0 text-white font-class website-analytics-text"
                              >
                                CAMPAIGNS
                              </p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div
                      class="col-lg-5 col-md-3 col-12 order-1 order-md-2 my-4 my-md-0 text-center"
                    >
                      <img
                        :src="image1"
                        alt="Website Analytics"
                        width="170"
                        class="card-website-analytics-img"
                      />
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

        <div class="col-md-6">
          <div class="row">
            <!-- Sales Overview -->
            <div class="col-lg-6 col-sm-6 mb-4">
              <Suspense>
                <template v-if="Dashboard">
                  <div class="card">
                    <div class="card-header">
                      <div class="d-flex justify-content-between">
                        <div>
                          <small class="d-block mb-1 text-muted">Users Overview</small>
                          <h4 class="card-title mb-1">
                            {{ Dashboard.publishers + Dashboard.advertisers }}
                          </h4>
                        </div>
                        <div></div>
                      </div>
                    </div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col-4">
                          <div class="d-flex gap-2 align-items-center mb-2">
                            <i class="fa-solid fa-users" id="publishers"></i>
                            <p class="mb-0 font-class">Publishers</p>
                          </div>
                          <h5 class="mb-0 pt-1 text-nowrap">
                            {{ calculatePercentage(Dashboard.publishers) }}%
                          </h5>
                          <small class="text-muted">{{ Dashboard.publishers }}</small>
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
                            <i class="fa-solid fa-users" id="advertisher"></i>
                            <p class="mb-0 font-class">Advertisers</p>
                          </div>
                          <h5 class="mb-0 pt-1 text-nowrap ms-lg-n3 ms-xl-0">
                            {{ calculatePercentage(Dashboard.advertisers) }}%
                          </h5>
                          <small class="text-muted">{{ Dashboard.advertisers }}</small>
                        </div>
                      </div>
                      <div class="d-flex align-items-center mt-4">
                        <div class="progress w-100" style="height: 8px">
                          <div
                            class="progress-bar bg-info"
                            :style="{
                              width: calculatePercentage(Dashboard.publishers) + '%',
                            }"
                            :aria-valuenow="calculatePercentage(Dashboard.publishers)"
                            role="progressbar"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                          <div
                            class="progress-bar bg-primary"
                            role="progressbar"
                            :style="{
                              width: calculatePercentage(Dashboard.advertisers) + '%',
                            }"
                            :aria-valuenow="calculatePercentage(Dashboard.advertisers)"
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
            <div class="col-lg-6 col-md-6 col-sm-6 mb-4">
              <Suspense>
                <template v-if="Dashboard">
                  <div class="card h-100">
                    <div class="card-body pb-0">
                      <div class="card-icon">
                        <span class="badge bg-label-success rounded-pill p-2">
                          <i class="fa-solid fa-users"></i>
                        </span>
                      </div>
                      <h5 class="card-title mb-0 mt-2">
                        {{ formatNumber(Dashboard.publishers + Dashboard.advertisers) }}
                        {{ getSuffix(Dashboard.publishers + Dashboard.advertisers) }}
                      </h5>
                      <small>Total Users</small>
                    </div>
                    <div id="revenueGenerated" class="mb-2"></div>
                  </div>
                </template>
                <template v-else>
                  <three-preLoader></three-preLoader>
                </template>
              </Suspense>
            </div>
            <!--/ Revenue Generated -->
          </div>
        </div>
      </div>

      <!-- row closed -->

      <div class="row">
        <!-- Earning Reports -->
        <div class="col-lg-6 mb-4">
          <Suspense>
            <template v-if="Dashboard">
              <div class="card h-100">
                <div class="card-header pb-2 d-flex justify-content-between mb-lg-n4">
                  <div class="card-title mb-0">
                    <h5 class="mb-0">Monthly Campaigns Reports</h5>
                    <small class="text-muted">Monthly Campaigns Overview</small>
                  </div>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-12 col-md-12" style="overflow: hidden">
                      <div id="weeklyEarningReports" class="mt-3"></div>
                    </div>
                  </div>
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
        <div class="col-md-6 mb-4">
          <Suspense>
            <template v-if="Dashboard">
              <div class="card h-100">
                <div class="card-header d-flex justify-content-between pb-0">
                  <div class="card-title mb-0">
                    <h5 class="mb-0">Support Tickets</h5>
                    <small class="text-muted">Last 30 Days Tickets</small>
                  </div>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-12 col-sm-4 col-md-12 col-lg-4">
                      <div class="mt-lg-4 mt-lg-2 mb-lg-4 mb-2 pt-1">
                        <h1 class="mb-0">
                          {{ totalTicketsCharts && totalTicketsCharts.totalTickets }}
                        </h1>
                        <p class="mb-0 font-class">Total Tickets</p>
                      </div>
                      <ul class="p-0 m-0">
                        <li class="d-flex gap-3 align-items-center mb-lg-3 pt-2 pb-1">
                          <div class="badge rounded bg-label-primary p-1">
                            <i class="ti ti-ticket ti-sm"></i>
                          </div>
                          <div>
                            <h6 class="mb-0 text-nowrap font-class">
                              Last 30 Days Tickets
                            </h6>
                            <small class="text-muted">{{
                              totalTicketsCharts && totalTicketsCharts.lastMonthTickets
                            }}</small>
                          </div>
                        </li>
                        <li class="d-flex gap-3 align-items-center mb-lg-3 pb-1">
                          <div class="badge rounded bg-label-info p-1">
                            <i class="ti ti-circle-check ti-sm"></i>
                          </div>
                          <div>
                            <h6 class="mb-0 text-nowrap font-class">Open Tickets</h6>
                            <small class="text-muted">
                              {{
                                totalTicketsCharts && totalTicketsCharts.openTickets
                              }}</small
                            >
                          </div>
                        </li>
                        <li class="d-flex gap-3 align-items-center pb-1">
                          <div class="badge rounded bg-label-warning p-1">
                            <i class="ti ti-clock ti-sm"></i>
                          </div>
                          <div>
                            <h6 class="mb-0 text-nowrap font-class">Response Time</h6>
                            <small class="text-muted">30 Day</small>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div class="col-12 col-sm-8 col-md-12 col-lg-8">
                      <div id="totalTicketChats"></div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <five-preLoader></five-preLoader>
            </template>
          </Suspense>
        </div>
        <!--/ Support Tracker -->
      </div>

      <div class="row">
        <!-- Sales By Country -->
        <div class="col-xl-4 col-md-6 mb-4">
          <Suspense>
            <template v-if="Dashboard">
              <div class="card h-100">
                <div class="card-header d-flex justify-content-between">
                  <div class="card-title mb-0">
                    <h5 class="m-0 me-2">Users by Countries</h5>
                    <small class="text-muted">Monthly Users Overview</small>
                  </div>
                </div>
                <div class="card-body">
                  <ul class="p-0 m-0">
                    <template v-if="adminCountry.length > 0">
                      <li
                        class="d-flex align-items-center mb-4"
                        v-for="(country, index) in adminCountry"
                        :key="index"
                      >
                        <div
                          id="flag_images"
                          class="avatar flex-shrink-0 me-3 rounded-circle"
                          :style="{
                            'background-image':
                              'url(' + getFlagUrl(country.country) + ')',
                          }"
                        ></div>
                        <div
                          class="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2"
                        >
                          <div class="me-2">
                            <div class="d-flex align-items-center">
                              <h6 class="mb-0 me-1 font-class fw-bolder">
                                {{ formatNumber(totalUsers[index]) }}
                                {{ getSuffix(totalUsers[index]) }}
                              </h6>
                            </div>
                            <small class="text-muted">{{ country.country }}</small>
                          </div>
                          <div class="user-progress">
                            <template v-if="userChange[index] == 0">
                              <p
                                class="text-info fw-bolder mb-0 d-flex justify-content-center gap-1 font-class"
                              >
                                {{ userChange[index] }}%
                              </p>
                            </template>
                            <template v-else-if="userChange[index] > 0">
                              <p
                                class="text-success fw-bolder mb-0 d-flex justify-content-center gap-1 font-class"
                              >
                                <i class="ti ti-chevron-up"></i>
                                {{ userChange[index] }}%
                              </p>
                            </template>
                            <template v-else>
                              <p
                                class="text-danger fw-bolder mb-0 d-flex justify-content-center gap-1 font-class"
                              >
                                <i class="ti ti-chevron-down"></i>
                                {{ userChange[index] }}%
                              </p>
                            </template>
                          </div>
                        </div>
                      </li>
                    </template>
                  </ul>
                </div>
              </div>
            </template>
            <template v-else>
              <six-preLoader></six-preLoader>
            </template>
          </Suspense>
        </div>
        <!--/ Sales By Country -->
        <!-- Total Earning -->
        <div class="col-12 col-xl-4 mb-4 col-md-6">
          <Suspense>
            <template v-if="Dashboard">
              <div class="card h-100">
                <div class="card-header d-flex justify-content-between pb-1">
                  <h5 class="mb-0 card-title">Publishers & Advertisers</h5>
                </div>
                <div class="card-body">
                  <div class="d-flex align-items-center">
                    <h1 class="mb-0 me-2">
                      {{ formatNumber(totalPublishersCount + totalAdvertishersCount) }}
                      {{ getSuffix(Dashboard.publishers + Dashboard.advertisers) }}
                    </h1>
                  </div>
                  <div id="totalEarningChart" class="pb-3" style="overflow: hidden"></div>
                  <div class="d-flex align-items-start my-4">
                    <div class="badge rounded bg-label-primary p-2 me-3 rounded">
                      <i class="fa-solid fa-users" id="publishers"></i>
                    </div>
                    <div
                      class="d-flex justify-content-between w-100 gap-2 align-items-center"
                    >
                      <div class="me-2">
                        <h6 class="mb-0 fw-bolder">Total Publishers</h6>
                        <small class="text-muted">Last 12 Months</small>
                      </div>
                      <p class="mb-0 text-success fw-bolder">
                        +{{ Dashboard.publishers ?? "0" }}
                      </p>
                    </div>
                  </div>
                  <div class="d-flex align-items-start">
                    <div class="badge rounded bg-label-secondary p-2 me-3 rounded">
                      <i class="fa-solid fa-users" id="advertisher"></i>
                    </div>
                    <div
                      class="d-flex justify-content-between w-100 gap-2 align-items-center"
                    >
                      <div class="me-2">
                        <h6 class="mb-0 fw-bolder">Total Advertisers</h6>
                        <small class="text-muted">Last 12 Months</small>
                      </div>
                      <p class="mb-0 text-success fw-bolder">
                        +{{ Dashboard.advertisers ?? "0" }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <seven-preLoader></seven-preLoader>
            </template>
          </Suspense>
        </div>
        <!--/ Total Earning -->

        <!-- Monthly Campaign State -->
        <div class="col-xl-4 col-md-6 mb-4">
          <Suspense>
            <template v-if="Dashboard">
              <div class="card h-100">
                <div class="card-header d-flex justify-content-between">
                  <div class="card-title mb-0">
                    <h5 class="mb-0">Website Analytics State</h5>
                    <small class="text-muted font-class">Visitors</small>
                  </div>
                </div>
                <div class="card-body">
                  <ul class="p-0 m-0">
                    <li
                      class="mb-4 pb-1 d-flex justify-content-between align-items-center"
                    >
                      <div class="badge bg-label-success rounded p-2">
                        <i class="fa-solid fa-users ti-sm"></i>
                      </div>
                      <div class="d-flex justify-content-between w-100 flex-wrap">
                        <h6 class="mb-0 ms-3 font-class fw-bolder">Publishers</h6>
                        <div class="d-flex">
                          <p class="ms-3 text-success mb-0 font-class fw-bolder">
                            {{ Dashboard && Dashboard.publishers }}+
                          </p>
                        </div>
                      </div>
                    </li>
                    <li
                      class="mb-4 pb-1 d-flex justify-content-between align-items-center"
                    >
                      <div class="badge bg-label-info rounded p-2">
                        <i class="fa-solid fa-users ti-sm"></i>
                      </div>
                      <div class="d-flex justify-content-between w-100 flex-wrap">
                        <h6 class="mb-0 ms-3 font-class fw-bolder">Advertisers</h6>
                        <div class="d-flex">
                          <p class="ms-3 text-success mb-0 font-class fw-bolder">
                            {{ Dashboard && Dashboard.advertisers }}+
                          </p>
                        </div>
                      </div>
                    </li>
                    <li
                      class="mb-4 pb-1 d-flex justify-content-between align-items-center"
                    >
                      <div class="badge bg-label-warning rounded p-2">
                        <i class="ti ti-mail ti-sm"></i>
                      </div>
                      <div class="d-flex justify-content-between w-100 flex-wrap">
                        <h6 class="mb-0 ms-3 font-class fw-bolder">Total Emails</h6>
                        <div class="d-flex">
                          <p class="ms-3 text-success mb-0 font-class fw-bolder">
                            {{ totalTicketsCharts && totalTicketsCharts.emails }}+
                          </p>
                        </div>
                      </div>
                    </li>
                    <li
                      class="mb-4 pb-1 d-flex justify-content-between align-items-center"
                    >
                      <div class="badge bg-label-primary rounded p-2">
                        <i class="ti ti-user ti-sm"></i>
                      </div>
                      <div class="d-flex justify-content-between w-100 flex-wrap">
                        <h6 class="mb-0 ms-3 font-class fw-bolder">Subscribes</h6>
                        <div class="d-flex">
                          <p class="ms-3 text-success mb-0 font-class fw-bolder">
                            {{
                              totalTicketsCharts && totalTicketsCharts.totalSubscribers
                            }}+
                          </p>
                        </div>
                      </div>
                    </li>
                    <li
                      class="mb-4 pb-1 d-flex justify-content-between align-items-center"
                    >
                      <div class="badge bg-label-secondary rounded p-2">
                        <i class="ti ti-ticket ti-sm"></i>
                      </div>
                      <div class="d-flex justify-content-between w-100 flex-wrap">
                        <h6 class="mb-0 ms-3 font-class fw-bolder">Tickets</h6>
                        <div class="d-flex">
                          <p class="ms-3 text-success mb-0 font-class fw-bolder">
                            {{ totalTicketsCharts && totalTicketsCharts.totalTickets }}+
                          </p>
                        </div>
                      </div>
                    </li>
                    <li class="d-flex justify-content-between align-items-center">
                      <div class="badge bg-label-danger rounded p-2">
                        <i class="fa-brands fa-buffer ti-sm"></i>
                      </div>
                      <div class="d-flex justify-content-between w-100 flex-wrap">
                        <h6 class="mb-0 ms-3 font-class fw-bolder">Offers</h6>
                        <div class="d-flex">
                          <p class="ms-3 text-success mb-0 font-class fw-bolder">
                            {{ totalTicketsCharts && totalTicketsCharts.offers }}+
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </template>
            <template v-else>
              <eight-preLoader></eight-preLoader>
            </template>
          </Suspense>
        </div>
        <!--/ Monthly Campaign State -->
      </div>

      <div class="row">
        <!-- Projects table -->
        <div class="col-12 col-md-12 col-sm-12 order-1 order-lg-2 mb-4 mb-lg-0">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title fw-bolder mb-0">User Activities</h5>
            </div>
            <div class="card-datatable table-responsive table-overflow-hidden">
              <table
                class="datatables-projects table border-top"
                id="user_activiti_table"
              >
                <thead>
                  <tr>
                    <th></th>
                    <th>SL</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Avatar</th>
                    <th>Type</th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </div>
        <!--/ Projects table -->
      </div>
      <!-- /row -->
    </div>
    <!-- / Content -->
    <div class="content-backdrop fade"></div>
  </div>
  <!-- Content wrapper -->
</template>
<script>
import ApexCharts from "apexcharts";
import axios from "axios";
import moment from "moment";
import { Carousel, Slide } from "vue3-carousel";
import image1 from "../../../../../../../assets/backend/assets/img/dashboard/card1.png";
import image2 from "../../../../../../../assets/backend/assets/img/dashboard/card2.png";
import image3 from "../../../../../../../assets/backend/assets/img/dashboard/card3.png";
import image4 from "../../../../../../../assets/backend/assets/img/dashboard/card1.png";
import useractivities from "./useractivities.vue";
import { inject } from "vue";
import onePreLoader from "../../../../../../../components/preloader/dashboardOne.vue";
import twoPreLoader from "../../../../../../../components/preloader/dashboardTwo.vue";
import threePreLoader from "../../../../../../../components/preloader/dashboardThree.vue";
import fourPreLoader from "../../../../../../../components/preloader/dashboardFour.vue";
import fivePreLoader from "../../../../../../../components/preloader/dashboradFive.vue";
import sixPreLoader from "../../../../../../../components/preloader/dashboardSix.vue";
import sevenPreLoader from "../../../../../../../components/preloader/dashboardSeven.vue";
import eightPreLoader from "../../../../../../../components/preloader/dashboardEight.vue";
import { fetchUserRole } from "@/services/userService";

export default {
  setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
  components: {
    Carousel,
    Slide,
    useractivities,
    onePreLoader,
    twoPreLoader,
    threePreLoader,
    fourPreLoader,
    fivePreLoader,
    sixPreLoader,
    sevenPreLoader,
    eightPreLoader,
  },
  data() {
    return {
      Dashboard: "",
      ChatsDataData: "",
      userActivities: "",
      resentOffers: "",
      allCampaigns: "",
      adminCountry: "",
      totalUsers: "",
      totalUsersCount: "",
      thistMonthUsers: "",
      lastMonthUsers: "",
      userChange: "",
      resentPubliseherData: "",
      reloadCount: 0,
      autoplayInterval: 2000,
      itemsToShow: 1,
      totalTicket: "",
      image1,
      image2,
      image3,
      image4,
      totalTicketsCharts: "",
      country_Codes: {
        Afghanistan: "AF",
        "United States of America": "US",
        Albania: "AL",
        Algeria: "DZ",
        Andorra: "AD",
        Angola: "AO",
        "Antigua and Barbuda": "AG",
        Argentina: "AR",
        Armenia: "AM",
        Australia: "AU",
        Austria: "AT",
        Azerbaijan: "AZ",
        Aruba: "AW",
        Bahamas: "BS",
        Bahrain: "BH",
        Bangladesh: "BD",
        Barbados: "BB",
        Belarus: "BY",
        Belgium: "BE",
        Belize: "BZ",
        Benin: "BJ",
        Bhutan: "BT",
        Bolivia: "BO",
        "Bosnia and Herzegovina": "BA",
        Botswana: "BW",
        Brazil: "BR",
        Brunei: "BN",
        Bulgaria: "BG",
        "Burkina Faso": "BF",
        Burundi: "BI",
        "Cabo Verde": "CV",
        Cambodia: "KH",
        Cameroon: "CM",
        "Great Britain": "GB",
        Bonaire: "BG",
        Canada: "CA",
        "Central African Republic": "CF",
        Chad: "TD",
        Chile: "CL",
        China: "CN",
        Colombia: "CO",
        Comoros: "KM",
        Congo: "CG",
        "Costa Rica": "CR",
        Croatia: "HR",
        Cuba: "CU",
        Cyprus: "CY",
        "Czech Republic": "CZ",
        Denmark: "DK",
        Djibouti: "DJ",
        Dominica: "DM",
        "Dominican Republic": "DO",
        Ecuador: "EC",
        Egypt: "EG",
        "El Salvador": "SV",
        "Equatorial Guinea": "GQ",
        Eritrea: "ER",
        Estonia: "EE",
        Eswatini: "SZ",
        Ethiopia: "ET",
        Fiji: "FJ",
        Finland: "FI",
        France: "FR",
        Gabon: "GA",
        Gambia: "GM",
        Georgia: "GE",
        Germany: "DE",
        Ghana: "GH",
        Greece: "GR",
        Grenada: "GD",
        Guatemala: "GT",
        Guinea: "GN",
        "Guinea-Bissau": "GW",
        Guyana: "GY",
        Haiti: "HT",
        Honduras: "HN",
        Hungary: "HU",
        Iceland: "IS",
        India: "IN",
        Indonesia: "ID",
        Iran: "IR",
        Iraq: "IQ",
        Ireland: "IE",
        Israel: "IL",
        Italy: "IT",
        Jamaica: "JM",
        Japan: "JP",
        Jordan: "JO",
        Kazakhstan: "KZ",
        Kenya: "KE",
        Kiribati: "KI",
        Kosovo: "XK",
        Kuwait: "KW",
        Kyrgyzstan: "KG",
        Laos: "LA",
        Latvia: "LV",
        Lebanon: "LB",
        Lesotho: "LS",
        Liberia: "LR",
        Libya: "LY",
        Liechtenstein: "LI",
        Lithuania: "LT",
        Luxembourg: "LU",
        Madagascar: "MG",
        Malawi: "MW",
        Malaysia: "MY",
        Maldives: "MV",
        Mali: "ML",
        Malta: "MT",
        "Marshall Islands": "MH",
        Mauritania: "MR",
        Mauritius: "MU",
        Mexico: "MX",
        Micronesia: "FM",
        Moldova: "MD",
        Monaco: "MC",
        Mongolia: "MN",
        Montenegro: "ME",
        Morocco: "MA",
        Mozambique: "MZ",
        Myanmar: "MM",
        Namibia: "NA",
        Nauru: "NR",
        Nepal: "NP",
        Netherlands: "NL",
        "New Zealand": "NZ",
        Nicaragua: "NI",
        Niger: "NE",
        Nigeria: "NG",
        "North Korea": "KP",
        "North Macedonia": "MK",
        Norway: "NO",
        Oman: "OM",
        Pakistan: "PK",
        Palau: "PW",
        Palestine: "PS",
        Panama: "PA",
        "Papua New Guinea": "PG",
        Paraguay: "PY",
        Peru: "PE",
        Philippines: "PH",
        Poland: "PL",
        Portugal: "PT",
        Qatar: "QA",
        Romania: "RO",
        Russia: "RU",
        Rwanda: "RW",
        "Saint Kitts and Nevis": "KN",
        "Saint Lucia": "LC",
        "Saint Vincent and the Grenadines": "VC",
        Samoa: "WS",
        "San Marino": "SM",
        "Sao Tome and Principe": "ST",
        "Saudi Arabia": "SA",
        Senegal: "SN",
        Serbia: "RS",
        Seychelles: "SC",
        "Sierra Leone": "SL",
        Singapore: "SG",
        Slovakia: "SK",
        Slovenia: "SI",
        "Solomon Islands": "SB",
        Somalia: "SO",
        "South Africa": "ZA",
        "South Korea": "KR",
        "South Sudan": "SS",
        Spain: "ES",
        "Sri Lanka": "LK",
        Sudan: "SD",
        Suriname: "SR",
        Sweden: "SE",
        Switzerland: "CH",
        Syria: "SY",
        Taiwan: "TW",
        Tajikistan: "TJ",
        Tanzania: "TZ",
        Thailand: "TH",
        "Trinidad & Tobago": "TT",
        "Timor-Leste": "TL",
        Togo: "TG",
        Tonga: "TO",
        "Trinidad and Tobago": "TT",
        Tunisia: "TN",
        Turkey: "TR",
        Turkmenistan: "TM",
        Tuvalu: "TV",
        Uganda: "UG",
        Ukraine: "UA",
        "United Arab Emirates": "AE",
        "United Kingdom": "GB",
        "United States": "US",
        Uruguay: "UY",
        Uzbekistan: "UZ",
        Vanuatu: "VU",
        "Vatican City": "VA",
        Venezuela: "VE",
        Vietnam: "VN",
        Yemen: "YE",
        Zambia: "ZM",
        Zimbabwe: "ZW",
      },
      totalPublishersCount: "",
      totalAdvertishersCount: "",
    };
  },
  mounted() {},
  async mounted() {
    try {
      const { role, isAuthorized } = await fetchUserRole();
      if (role == "Super" || role == "Admin") {
        if (this.$route.params.id === "user") {
          if (!localStorage.getItem("reloadCount")) {
            localStorage.setItem("reloadCount", 0);
          }
          this.reloadCount = parseInt(localStorage.getItem("reloadCount"));
          if (this.reloadCount === 0) {
            localStorage.setItem("reloadCount", 1);
            localStorage.removeItem("chatUserstorage");
            const storedChatUserIds = JSON.parse(localStorage.getItem("chatUserIds"));
            if (storedChatUserIds) {
              storedChatUserIds.forEach((ids) => {
                localStorage.removeItem("chatsParticipent" + ids);
                localStorage.removeItem("chatMessage_" + ids);
                localStorage.removeItem("chatChatId_" + ids);
                localStorage.removeItem("chatstatus_" + ids);
              });
              localStorage.removeItem("chatUserIds");
            }
            localStorage.removeItem("chatUserStoreIds");
            location.reload();
          } else {
            this.getDashboardData();
            this.getChatsDataData();
            this.getUserActivities();
            this.getresentOffers();
            this.getAllCampaigns();
            this.getAdminCountry();
            this.getResentPubliseherData();
            localStorage.setItem("reloadCount", 0);
            this.$nextTick(() => {
              const dataTableWrapper = document.querySelectorAll(
                "#user_activiti_table_wrapper .row.mx-2"
              );
              if (dataTableWrapper.length > 0) {
                dataTableWrapper[0].style.display = "none";
                dataTableWrapper[1].style.display = "none";
              }
            });
          }
        }else if(this.$route.params.id === "admin_chat"){
          if (!localStorage.getItem("reloadCount")) {
            localStorage.setItem("reloadCount", 0);
          }
          this.reloadCount = parseInt(localStorage.getItem("reloadCount"));
          if (this.reloadCount === 0) {
            localStorage.setItem("reloadCount", 1);
            localStorage.removeItem("chatUserstorage");
            const storedChatUserIds = JSON.parse(localStorage.getItem("chatUserIds"));
            if (storedChatUserIds) {
              storedChatUserIds.forEach((ids) => {
                localStorage.removeItem("chatsParticipent" + ids);
                localStorage.removeItem("chatMessage_" + ids);
                localStorage.removeItem("chatChatId_" + ids);
                localStorage.removeItem("chatstatus_" + ids);
              });
              localStorage.removeItem("chatUserIds");
            }
            location.reload();
          } else {
            this.getDashboardData();
            this.getChatsDataData();
            this.getUserActivities();
            this.getresentOffers();
            this.getAllCampaigns();
            this.getAdminCountry();
            this.getResentPubliseherData();
            localStorage.setItem("reloadCount", 0);
            this.$nextTick(() => {
              const dataTableWrapper = document.querySelectorAll(
                "#user_activiti_table_wrapper .row.mx-2"
              );
              if (dataTableWrapper.length > 0) {
                dataTableWrapper[0].style.display = "none";
                dataTableWrapper[1].style.display = "none";
              }
            });
          }
        } else {
          this.getDashboardData();
          this.getChatsDataData();
          this.getresentOffers();
          this.getAllCampaigns();
          this.getResentPubliseherData();
          this.getUserActivities();
          this.getAdminCountry();
          this.$nextTick(() => {
            const dataTableWrapper = document.querySelectorAll(
              "#user_activiti_table_wrapper .row.mx-2"
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
    getDashboardData() {
      axios
        .get(this.globalVariables.apiUrl + "admin/dashboard/count", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          this.Dashboard = res.data;
          this.totalUsersCount = res.data.publishers + res.data.advertisers;
          this.renderChart();
        })
        .catch((e) => {
          console.error(e);
        });
    },
    renderChart() {
      axios
        .get(this.globalVariables.apiUrl + "admin/dashboard/user-chart", {
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
              enabled: true,
              y: {
                formatter: function (value) {
                  return value;
                },
              },
            },
          };

          var chart = new ApexCharts(
            document.querySelector("#revenueGenerated"),
            options
          );
          chart.innerHTML = "";
          chart.render();
          chart.updateSeries([
            {
              name: "Publisher",
              data: res.data.publisher,
            },
          ]);
        })
        .catch((error) => {
          return error;
        });

      axios
        .get(this.globalVariables.apiUrl + "admin/dashboard/ticket-count", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          this.totalTicketsCharts = res.data;
          var supportTicketOptions = {
            series: [res && res.data && res.data.totalPersentage],
            labels: ["Tickets Charts"],
            chart: {
              height: 360,
              type: "radialBar",
            },
            plotOptions: {
              radialBar: {
                offsetY: 10,
                startAngle: -140,
                endAngle: 130,
                hollow: {
                  size: "65%",
                },
                track: {
                  background: "tranparent",
                  strokeWidth: "100%",
                },
                dataLabels: {
                  name: {
                    offsetY: -20,
                    color: "#7367f0",
                    fontSize: "13px",
                    fontWeight: "400",
                    fontFamily: "Public Sans",
                  },
                  value: {
                    offsetY: 10,
                    color: "#7367f0",
                    fontSize: "38px",
                    fontWeight: "500",
                    fontFamily: "Public Sans",
                  },
                },
              },
            },
            colors: ["#7367f0"],
            fill: {
              type: "gradient",
              gradient: {
                shade: "dark",
                shadeIntensity: 0.5,
                gradientToColors: ["#7367f0"],
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 0.6,
                stops: [30, 70, 100],
              },
            },
            stroke: {
              dashArray: 10,
            },
            grid: {
              padding: {
                top: -20,
                bottom: 5,
              },
            },
            states: {
              hover: {
                filter: {
                  type: "none",
                },
              },
              active: {
                filter: {
                  type: "none",
                },
              },
            },
            responsive: [
              {
                breakpoint: 1025,
                options: {
                  chart: {
                    height: 330,
                  },
                },
              },
              {
                breakpoint: 769,
                options: {
                  chart: {
                    height: 280,
                  },
                },
              },
            ],
          };
          const ticketCharts = new ApexCharts(
            document.querySelector("#totalTicketChats"),
            supportTicketOptions
          );
          var ticketChartsHTML = document.querySelector("#totalTicketChats");
          ticketChartsHTML.innerHTML = "";
          ticketCharts.render();
        })
        .catch((error) => {
          return error;
        });

      axios
        .get(this.globalVariables.apiUrl + "admin/dashboard/campaigns-count", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          var weeklyEarningReportsConfig = {
            chart: {
              height: 320,
              parentHeightOffset: 0,
              type: "bar",
              toolbar: {
                show: false,
              },
            },
            plotOptions: {
              bar: {
                barHeight: "60%",
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
                className: "font-class",
                style: {
                  colors: "#7367f0",
                  fontSize: "13px",
                  // fontFamily: 'nunito'
                },
              },
            },
            yaxis: {
              labels: {
                show: false,
              },
            },
            tooltip: {
              enabled: true,
              y: {
                formatter: function (value) {
                  return value;
                },
              },
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

          var weeklyEarningChart = new ApexCharts(
            document.querySelector("#weeklyEarningReports"),
            weeklyEarningReportsConfig
          );
          var weeklyEarningChartHTML = document.querySelector("#weeklyEarningReports");
          weeklyEarningChartHTML.innerHTML = "";
          weeklyEarningChart.render();
          weeklyEarningChart.updateSeries([
            {
              name: "Campaigns",
              data: res.data.campaignsData,
            },
          ]);
        })
        .catch((error) => {
          console.error(error);
        });

      axios
        .get(
          this.globalVariables.apiUrl + "admin/dashboard/publisher-advertisher-count",
          {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          }
        )
        .then((res) => {
          this.totalPublishersCount = res.data.totalPublishersCount;
          this.totalAdvertishersCount = Math.abs(res.data.totalAdvertishersCount);
          var totalEarningChartOptions = {
            series: [
              {
                name: "Publishers",
                data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
              },
              {
                name: "Advertishers",
                data: [-1, -2, -3, -4, -5, -6, -7, -8, -9, -10, -11, -12],
              },
            ],
            chart: {
              height: 240,
              parentHeightOffset: 0,
              stacked: true,
              type: "bar",
              toolbar: { show: false },
            },
            tooltip: {
              enabled: false,
            },
            legend: {
              show: false,
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: "30%",
                borderRadius: 5,
                startingShape: "rounded",
                endingShape: "rounded",
              },
            },
            colors: ["#7367f0", "#94909E"],
            dataLabels: {
              enabled: false,
            },
            grid: {
              show: false,
              padding: {
                top: -40,
                bottom: -20,
                left: -10,
                right: -2,
              },
            },
            xaxis: {
              labels: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
            },
            yaxis: {
              labels: {
                show: false,
              },
            },
            tooltip: {
              enabled: true,
              y: {
                formatter: function (value) {
                  return Math.abs(value);
                },
              },
            },
            responsive: [
              {
                breakpoint: 1468,
                options: {
                  plotOptions: {
                    bar: {
                      columnWidth: "22%",
                    },
                  },
                },
              },
              {
                breakpoint: 1197,
                options: {
                  chart: {
                    height: 228,
                  },
                  plotOptions: {
                    bar: {
                      borderRadius: 8,
                      columnWidth: "26%",
                    },
                  },
                },
              },
              {
                breakpoint: 783,
                options: {
                  chart: {
                    height: 232,
                  },
                  plotOptions: {
                    bar: {
                      borderRadius: 6,
                      columnWidth: "28%",
                    },
                  },
                },
              },
              {
                breakpoint: 589,
                options: {
                  plotOptions: {
                    bar: {
                      columnWidth: "16%",
                    },
                  },
                },
              },
              {
                breakpoint: 520,
                options: {
                  plotOptions: {
                    bar: {
                      borderRadius: 6,
                      columnWidth: "18%",
                    },
                  },
                },
              },
              {
                breakpoint: 426,
                options: {
                  plotOptions: {
                    bar: {
                      borderRadius: 5,
                      columnWidth: "20%",
                    },
                  },
                },
              },
              {
                breakpoint: 381,
                options: {
                  plotOptions: {
                    bar: {
                      columnWidth: "24%",
                    },
                  },
                },
              },
            ],
            states: {
              hover: {
                filter: {
                  type: "none",
                },
              },
              active: {
                filter: {
                  type: "none",
                },
              },
            },
          };
          var totalEarningChart = new ApexCharts(
            document.querySelector("#totalEarningChart"),
            totalEarningChartOptions
          );
          var totalEarningCharttHTML = document.querySelector("#totalEarningChart");
          totalEarningCharttHTML.innerHTML = "";
          totalEarningChart.render();
          totalEarningChart.updateSeries([
            {
              name: "Publishers",
              data: res.data.publishersCountData,
            },
            {
              name: "Advertishers",
              data: res.data.advertishersCountData,
            },
          ]);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getChatsDataData() {
      axios
        .get(this.globalVariables.apiUrl + "admin/dashboard/publisher-advertiser-count", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          this.ChatsDataData = res.data;
        })
        .catch((e) => {
          console.error(e);
        });
    },
    getUserActivities() {
      axios
        .get(this.globalVariables.apiUrl + "admin/dashboard", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          if ($.fn.DataTable.isDataTable("#user_activiti_table")) {
            $("#user_activiti_table").DataTable().destroy();
          }
          var gobal = this.globalVariables.appUrl;
          var table = $("#user_activiti_table").DataTable({
            data: res.data.userActivities,
            columns: [
              { data: "id" },
              { data: "id" },
              { data: "fname" },
              { data: "lname" },
              {
                data: "user.email",
                render: function (data, type, row) {
                  if (row && row.user && row.user.email != null) {
                    return row.user.email;
                  } else {
                    return "----------";
                  }
                },
              },
              {
                data: "created_at",
                render: function (data, type, row) {
                  if (row.user && row.user.avatar) {
                    return (
                      '<img id="activiti_image" src="' + gobal + row.user.avatar + '">'
                    );
                  } else {
                    return (
                      '<img id="activiti_image" src="' +
                      gobal +
                      "backend/images/no-image.png" +
                      '">'
                    );
                  }
                },
              },
              {
                data: "updated_at",
                render: function (data, type, row) {
                  return row.type === 1 ? "Person" : "Legal Entity";
                },
              },
            ],
            createdRow: function (row, data, dataIndex) {
              $("td:eq(1)", row).html(dataIndex + 1);
            },
            columnDefs: [
              {
                targets: 0,
                orderable: false,
                checkboxes: {
                  selectAllRender: '<input type="checkbox" class="form-check-input">',
                },
                render: function () {
                  return '<input type="checkbox" class="dt-checkboxes form-check-input" >';
                },
                searchable: false,
              },
            ],
            order: [[2, "desc"]],
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
              searchPlaceholder: "Search User Activitis",
              paginate: {
                previous: '<i class="fa-solid fa-chevron-left"></i>',
                next: '<i class="fa-solid fa-chevron-right"></i>',
              },
            },
            buttons: [],
          });
        })
        .catch((e) => {
          console.error(e);
        });
    },
    getresentOffers() {
      axios
        .get(this.globalVariables.apiUrl + "admin/dashboard/resent-offers", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          this.resentOffers = res.data;
        })
        .catch((e) => {
          console.error(e);
        });
    },
    getAllCampaigns() {
      axios
        .get(this.globalVariables.apiUrl + "admin/dashboard/offer-campaigns", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          this.allCampaigns = res.data;
        })
        .catch((e) => {
          console.error(e);
        });
    },
    getResentPubliseherData() {
      axios
        .get(this.globalVariables.apiUrl + "admin/dashboard/publisher-count", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          this.resentPubliseherData = res.data;
        })
        .catch((e) => {
          console.error(e);
        });
    },
    getAdminCountry() {
      axios
        .get(this.globalVariables.apiUrl + "admin/dashboard/country", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          this.adminCountry = res && res.data && res.data.countries;
          this.totalUsers = res && res.data && res.data.totalUsers;
          this.thistMonthUsers = res && res.data && res.data.thistMonthUsers;
          this.lastMonthUsers = res && res.data && res.data.lastMonthUsers;
          this.userChange = res && res.data && res.data.userChange;
        })
        .catch((e) => {
          console.error(e);
        });
    },
    formatDate(dateString) {
      const datetime = moment(dateString);
      return datetime.format("YYYY-MM-DD hh:mm a");
    },
    offerStatusColor(status) {
      let badgeClass;
      if (status == 0) {
        badgeClass = "bg-danger";
      } else if (status == 1) {
        badgeClass = "bg-success";
      } else if (status == 2) {
        badgeClass = "bg-warning";
      } else if (status == 3) {
        badgeClass = "bg-primary";
      } else {
        badgeClass = "bg-warning";
      }
      return badgeClass;
    },
    offerStatus(status) {
      let statusText;
      if (status == 0) {
        statusText = "Pending";
      } else if (status == 1) {
        statusText = "Active";
      } else if (status == 2) {
        statusText = "Pause";
      } else if (status == 3) {
        statusText = "Resume";
      } else {
        statusText = "Reject";
      }
      return statusText;
    },
    formatDateConvartDate(dateString) {
      const date = new Date(dateString);
      const now = new Date();
      const diff = Math.floor((now - date) / 1000);

      if (diff < 60) {
        return "just now";
      } else if (diff < 3600) {
        const minutes = Math.floor(diff / 60);
        return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
      } else if (diff < 86400) {
        const hours = Math.floor(diff / 3600);
        return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
      } else {
        const days = Math.floor(diff / 86400);
        return days === 1 ? "1 day ago" : `${days} days ago`;
      }
    },
    getSuffix(number) {
      let suffix = "";
      if (number >= 1000000) {
        suffix = "M";
      } else if (number >= 1000) {
        suffix = "K";
      }
      return suffix;
    },
    formatNumber(number) {
      number = Number(number);

      if (number >= 1000000) {
        number = number / 1000000;
      } else if (number >= 1000) {
        number = number / 1000;
      }
      if (isNaN(number)) {
        console.error("Invalid number:", number);
        return 0;
      }
      return parseFloat(number.toFixed(2));
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
    calculatePercentage(count) {
      const totalUsersCount = Number(this.totalUsersCount);
      if (!Number.isFinite(totalUsersCount) || totalUsersCount === 0) {
        return 0;
      }
      if (!Number.isFinite(count)) {
        return 0;
      }
      return ((count / totalUsersCount) * 100).toFixed(2);
    },
    getFlagUrl(countryName) {
      const countryCode = this.country_Codes[countryName];
      if (!countryCode) {
        console.error(`Country code not found for ${countryName}`);
        return null;
      } else {
        const url = `https://flagicons.lipis.dev/flags/4x3/${countryCode.toLowerCase()}.svg`;
        return url;
      }
    },
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateItemsToShow);
  },
};
</script>
<style>
#activiti_image {
  width: 17%;
  border-radius: 50%;
}
#flag_images {
  background-repeat: no-repeat;
  background-size: cover;
}
#publishers {
  background: #e8e8e8;
  padding: 5px;
  border-radius: 4px;
  color: #00cfe8;
}
#advertisher {
  background: #e6e6e6;
  padding: 5px;
  border-radius: 4px;
  color: #6258cc;
}
.admin-dashboard .apexcharts-legend.apexcharts-align-center.apx-legend-position-right {
  display: none !important;
}
.website-analytics-text-bg {
  background-color: #6258cc;
  padding: 0.45rem 0.85rem;
  border-radius: 5px;
  min-width: 60px;
  text-align: center;
}
#user_activiti_table colgroup:nth-of-type(2) {
  display: none !important;
}
</style>
<style scoped>
#user-country .equal {
  background: #ecf0fa;
}
.legend {
  width: 8px;
  height: 8px;
  display: block;
  border-radius: 0;
  margin-right: 10px;
  margin-top: 6px;
}
li {
  list-style: none;
}
.product-timeline ul.timeline-1 > li .product-icon {
  width: 37px;
  height: 37px;
  text-align: center;
  border-radius: 50%;
  position: absolute;
  left: 25px;
  background-color: #f3f6f7;
  font-size: 20px;
  line-height: 37px;
  font-size: 17px;
}
.bg-primary-gradient {
  background-image: linear-gradient(to left, #0db2de 0, #005bea 100%) !important;
}
.bg-danger-gradient {
  background-image: linear-gradient(45deg, #f93a5a, #f7778c) !important;
}
.bg-success-gradient {
  background-image: linear-gradient(to left, #48d6a8 0, #029666 100%) !important;
}
.bg-warning-gradient {
  background-image: linear-gradient(to left, #efa65f, #f76a2d) !important;
}
.card-loader {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
}
#user-country .list-group-item:nth-child(odd) {
  background: #ecf0fa;
}
#user-country .list-group-item {
  padding-right: 10px;
}
.m-height {
  min-height: 440px;
}
#offer-campaigns li:nth-child(1) i {
  background-image: linear-gradient(45deg, #f93a5a, #f7778c) !important;
}
#offer-campaigns li:nth-child(2) i {
  background-image: linear-gradient(to left, #48d6a8 0%, #029666 100%) !important;
}
#offer-campaigns li:nth-child(3) i {
  background-image: linear-gradient(to left, #efa65f, #f76a2d) !important;
}
#offer-campaigns li:nth-child(4) i {
  background-image: linear-gradient(to right, #673ab7 0%, #884af1 100%) !important;
}
#offer-campaigns li:nth-child(5) i {
  background-image: linear-gradient(to left, #0db2de 0%, #005bea 100%) !important;
}
#offer-campaigns li:nth-child(6) i {
  background-image: linear-gradient(45deg, #f93a5a, #f7778c) !important;
}
.avatar-img {
  width: 25px;
  height: 25px;
  border-radius: 500%;
}
.total-revenue label span {
  display: inline-block;
  width: 9px;
  height: 9px;
  margin-right: 5px;
  border-radius: 100%;
}
.form-group label,
label {
  font-size: 13px;
  font-weight: 500;
  color: #565656;
}
.fw-bolder {
  font-weight: 600;
}
.dashboard-silder {
  width: 100% !important;
  background: #7367f0;
  border-radius: 10px;
  padding: 8px 30px;
}
.list-group {
  --bs-list-group-color: #5743bb !important;
  --bs-list-group-bg: #f01e1e00 !important;
  --bs-list-group-border-color: #ebe9f2 !important;
  /* margin-bottom: 0; */
  border-radius: 0px;
}
</style>
