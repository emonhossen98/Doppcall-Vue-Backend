<template>
    <div v-if="getLoader">
      <Loader></Loader>
    </div>
    <!-- Content wrapper -->
    <div class="content-wrapper">
      <!-- Content -->
      <div class="container-fluid flex-grow-1 container-p-y">
        <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
        <div class="row mt-4" id="offer-views">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-body">
                    <div class="row">
                            <div class="col">
                                <h5 class="card-title d-flex justify-content-between align-items-center">
                                    <a href="javascript:" class="sub-heading d-flex align-items-center w-100">
                                        <img class="country_flag_avartisher_view" :src="offer.convart_country" alt=""> <span class="offernaem">{{ offer.name }}</span>
                                    </a>
                                    <p v-html="offer.convart_status"></p>
                                </h5>
                                <div class="table-responsive table-overflow-hidden">
                                    <table class="table table-hover mb-0 text-md-nowrap mt-4">
                                        <tbody>
                                        <template v-if="offer.country">
                                            <tr>
                                                <th style="width: 25%"><strong>Country and region</strong></th>
                                                <td v-html="offer.country"></td>
                                            </tr>
                                        </template>

                                        <template v-if="offer.offer_type">
                                            <tr>
                                                <th style="width: 25%"><strong>Offer's type</strong></th>
                                                <td>{{ offer.offer_type }}</td>
                                            </tr>
                                        </template>

                                        <template v-if="offer.pay_out">
                                            <tr>
                                                <th style="width: 25%"><strong>Payout</strong></th>
                                                <td>{{ offer.pay_out }}</td>
                                            </tr>
                                        </template>

                                        <template v-if="offer.marchent_allow">
                                            <tr>
                                                <th style="width: 25%"><strong>Merchant is allowed to refuse calls</strong></th>
                                                <td>{{ offer.marchent_allow }}</td>
                                            </tr>
                                        </template>

                                        <template v-if="offer.call_limit">
                                           <tr>
                                                <th style="width: 25%"><strong>Call's Limits</strong></th>
                                                <td v-html="offer.call_limit"></td>
                                            </tr>
                                        </template>

                                        <template v-if="offer.materials_moderation">
                                            <tr>
                                                <th style="width: 25%"><strong>Materials moderation</strong></th>
                                                <td>{{ offer.materials_moderation }}</td>
                                            </tr>
                                        </template>

                                        <template v-if="offer.tools">
                                            <tr>
                                                <th style="width: 25%"><strong>Tools</strong></th>
                                                <td v-html="offer.tools"></td>
                                            </tr>
                                        </template>

                                        <template v-if="offer.created_at">
                                            <tr>
                                                <th style="width: 25%">Created Date</th>
                                                <td>{{ offer.convart_created_at }}</td>
                                            </tr>
                                        </template>

                                        <template v-if="offer.hold_period">
                                            <tr>
                                                <th style="width: 25%"><strong>Hold Period</strong></th>
                                                <td>{{ offer.hold_period }}</td>
                                            </tr>
                                        </template>

                                        <template v-if="offer.appeal_period">
                                            <tr>
                                                <th style="width: 25%"><strong>Appeal Period</strong></th>
                                                <td>{{ offer.appeal_period }}</td>
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

        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-body">
                        <div class="d-md-flex">
                            <div class="">
                                <div class="panel panel-primary tabs-style-4">
                                    <div class="tab-menu-heading">
                                        <div class="tabs-menu ">
                                            <!-- Tabs -->
                                            <ul class="nav panel-tabs custome_tab">
                                                <template v-if="offer.rules">
                                                    <li><a href="#rules" :class="changeClass == 'rules' ? 'active' : ''" data-toggle="tab" @click="changeActiveClass('rules')"><i class="fa fa-laptop"></i> Rules</a></li>
                                                </template>

                                                <template v-if="offer.trafics">
                                                    <li><a href="#trafics" :class="changeClass == 'trafics' ? 'active' : ''" data-toggle="tab" @click="changeActiveClass('trafics')"><i class="fa fa-cube"></i> Traffics</a></li>
                                                </template>

                                                <template v-if="offer.description">
                                                    <li><a href="#description" :class="changeClass == 'description' ? 'active' : ''" data-toggle="tab" @click="changeActiveClass('description')"><i class="fa fa-cogs"></i> Description</a></li>
                                                </template>

                                                <template v-if="offer.allow_trafic">
                                                    <li><a href="#allow_trafic" :class="changeClass == 'allow_trafic' ? 'active' : ''" data-toggle="tab" @click="changeActiveClass('allow_trafic')"><i class="fa fa-tasks"></i> Allowed / Non- allowed Traffic Sources</a></li>
                                                </template>
                                                  
                                                <template v-if="relatedOffers.length > 0">
                                                    <li><a href="#related_offer" :class="changeClass == 'related_offer' ? 'active' : ''" data-toggle="tab" @click="changeActiveClass('related_offer')"><i class="fas fa-tags"></i> Related Offers</a></li>
                                                </template>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tabs-style-4 tab_right">
                                <div class="panel-body tabs-menu-body">
                                    <div class="tab-content">
                                        <template v-if="offer.rules">
                                            <div class="tab-pane font-class" id="rules" :class="changeClass == 'rules' ? 'active' : ''" v-html="offer.rules">
                                            </div>
                                         </template>

                                         <template v-if="offer.trafics">
                                            <div class="tab-pane" id="trafics" :class="changeClass == 'trafics' ? 'active' : ''" v-html="offer.trafics">
                                            </div>
                                         </template>

                                         <template v-if="offer.description">
                                            <div class="tab-pane" id="description" :class="changeClass == 'description' ? 'active' : ''" v-html="offer.description">
                                            </div>
                                         </template>

                                         <template v-if="offer.allow_trafic">
                                            <div class="tab-pane" id="allow_trafic" :class="changeClass == 'allow_trafic' ? 'active' : ''">
                                                <ul id="allow_trafic_ul">
                                                    <li v-for="trafic in trafics" :key="trafic.id" style="line-height: 25px;">
                                                        <i :class="{'fas fa-check-circle text-success me-2': allowTrafic(trafic.id)}"></i>
                                                        <span v-if="allowTrafic(trafic.id)">{{ trafic.title }}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                         </template>

                                        <template v-if="relatedOffers.length > 0">
                                            <div class="tab-pane" id="related_offer" :class="changeClass == 'related_offer' ? 'active' : ''">
                                                <table class="align-middle mb-0 table table-hover" id="offer_datatables">
                                                    <thead>
                                                        <tr>
                                                            <th>SL</th>
                                                            <th>Created At</th>
                                                            <th>Primary Country</th>
                                                            <th>Offer</th>
                                                            <th>Payout</th>
                                                            <th>Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="(offer,index) in relatedOffers" :key="index">
                                                            <td>{{ index }}</td>
                                                             <td>{{ offer.convart_created_at }}</td>
                                                            <td>
                                                                <div class="sub-heading d-flex align-items-center">
                                                                    <img class="country-flag" :src="offer.convart_cuntry" alt="image"> {{ offer.primary_country }}
                                                                </div>
                                                            </td>
                                                            <td><span class="d-flex">{{ offer.name }} </span></td>
                                                            <td>{{ offer.pay_out }}</td>
                                                            <td>
                                                                <span class="badge" :class="offer.convart_status_color">
                                                                    {{ offer.convart_status }}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
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
          { label: "Offers", url: "/advertiser-offers" },
          { label: "View", url: "" },
        ],
        getLoader: false,
        offer : "",
        relatedOffers : "",
        trafics : "",
        changeClass : "rules",
      };
    },
    async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRoleAdvertiser();
        if (role == 'Advertiser') {
            this.getAdvertiserOffers();
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    },
    methods: {
      getAdvertiserOffers() {
        this.getLoader = true;
        axios
          .get(this.globalVariables.apiUrl+`advertiser/offers/view/${this.$route.params.id}`, {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          })
          .then((res) => {
            this.offer = res.data.offer;
            this.relatedOffers = res.data.relatedOffers;
            this.trafics       = res.data.trafics;
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.getLoader = false;
          });
      },
      changeActiveClass(id) {
        this.changeClass = id;
      },
      allowTrafic(traficId) {
        var ids = this.offer.allow_trafic.map(String); 
       return ids.includes(String(traficId)); 
    }
    },
  };
  </script>
  <style>
#offer-views .country_flag_avartisher_view {
	width: 2%;
	margin-right: 5px;
}
</style>
  <style scoped>
  li{
   list-style: none;
  }
  .custome_tab {
      flex-wrap: wrap;
      padding-left: 0;
      margin-bottom: 0;
      list-style: none;
  }
  .custome_tab li {
    width: 100% !important;
  }
  .custome_tab li a {
      padding: 10px 27px 10px 18px;
      background: #ecf0fa;
      border-radius: 4px;
      margin: 0 0 16px 0;
      text-align: center;
      display: block;
      color: #14112d;
      width: 100%;
      white-space: nowrap;
  }
  .custome_tab .active{
      background: #0162e8;
      color : #fff;
  }
  .tab_right {
      width: 100%;
      margin-left: 20px;
  }
  .tabs-style-4 .tabs-menu-body {
      border: 1px solid #e3e7f3;
      border-radius: 4px;
  }
  ol, ul {
      padding-left: 0rem;
  }
  </style>
  