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
            <div class="col-md-12">
                <div class="card">
                    <div class="card-body">
                    <div class="row">
                        <div class="col">
                            <h5 class="card-title d-flex justify-content-between align-items-center">
                            {{ offer.convart_flag_image }}
                                <RouterLink :to="'/publisher-create-view/'+offer.id" class="w-100"><img class="country_flag_avartisher_views" :src="offer.convart_country" alt="">{{ offer.name }}</RouterLink>
                                <p class="font-class" v-html="offer.convart_status "></p>
                            </h5>
                            <div class="table-responsive table-overflow-hidden">
                                <table class="table table-hover mb-0 text-md-nowrap mt-4">
                                    <tbody>
                                        <tr v-if="offer.country">
                                            <th style="width: 25%">Country and region</th>
                                            <td v-html="offer.country"></td>
                                        </tr>
        
                                        <tr v-if="offer.offer_type">
                                            <th style="width: 25%">Offer's type</th>
                                            <td>{{ offer.offer_type }}</td>
                                        </tr>

                                        <tr v-if="offer.pay_out">
                                            <th style="width: 25%">Payout</th>
                                            <td>{{ offer.pay_out }}</td>
                                        </tr>
                                        
                                        <tr v-if="offer.landing_page">
                                            <th style="width: 25%">Landing page</th>
                                            <td>{{ offer.landing_page }}</td>
                                        </tr>

                                        <tr v-if="offer.marchent_allow">
                                            <th style="width: 25%">Merchant is allowed to refuse calls</th>
                                            <td>{{ offer.marchent_allow }}</td>
                                        </tr>

                                        <tr v-if="offer.call_limit">
                                            <th style="width: 25%">Call's Limits</th>
                                            <td v-html="offer.call_limit"></td>
                                        </tr>

                                        <tr v-if="offer.materials_moderation">
                                            <th style="width: 25%">Materials moderation</th>
                                            <td>{{ offer.materials_moderation }}</td>
                                        </tr>

                                        <tr v-if="offer.tools">
                                            <th style="width: 25%">Tools</th>
                                            <td v-html="offer.tools"></td>
                                        </tr>

                                        <tr v-if="offer.important_rules">
                                            <th style="width: 25%">Important Rules</th>
                                            <td v-html="offer.important_rules "></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="text-end">
                                <a href="javascript:" @click="goToCreateCampaign(offer.id)" class="btn btn-primary px-5 mt-4">Apply For Approval</a>
                            </div>
                        </div>
                       </div>
                       <div class="row mt-4">
                        <div class="card-body">
                            <div class="d-md-flex">
                                <div>
                                    <div class="panel panel-primary tabs-style-4">
                                        <div class="tab-menu-heading">
                                            <div class="tabs-menu ">
                                                <!-- Tabs -->
                                                <ul class="nav panel-tabs custome_tab d-block">
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
                                                        <li><a href="#allow_trafic" :class="changeClass == 'allow_trafic' ? 'active' : ''" data-toggle="tab" @click="changeActiveClass('allow_trafic')"><i class="fa fa-tasks"></i> Allowed / Non-Allowed Traffic Sources</a></li>
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
                                                <div class="tab-pane" id="rules" :class="changeClass == 'rules' ? 'active' : ''" v-html="offer.rules">
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
                                                            <i :class="{'fas fa-check-circle text-success me-2': allowTrafic(trafic.id), 'fas fa-times-circle text-danger me-2': !allowTrafic(trafic.id)}"></i>
                                                            <span>{{ trafic.title }}</span>
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
                                                                        <img v-if="offer.primary_country_code != null" class="realted_country_flag" :src="`https://flagicons.lipis.dev/flags/4x3/${offer.primary_country_code.toLowerCase()}.svg`" alt="image"> {{ offer.primary_country }}
                                                                    </div>
                                                                </td>
                                                                <td><RouterLink :to="'/publisher-create-view/'+offer.id" class="d-flex">{{ offer.name }} </RouterLink></td>
                                                                <td>{{ offer.pay_out }}</td>
                                                                <td>
                                                                    <span class="badge" :class="offer.convart_offer_status_color">
                                                                        {{ offer.convart_offer_status }}
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
        </div>
      </div>
      <!-- / Content -->
    </div>
    <!-- Content wrapper -->
</template>
  <script>
  import axios from "axios";
  import toastr from "toastr";
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
          { label: "Campaigns", url: "/publisher-offer-campaigns" },
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
        const { role, isAuthorized } = await fetchUserRolePublisher();
        if (role == 'Publisher') {
            this.getPusbliserData();
        }
        } catch (error) {
        console.error("Error fetching user role:", error);
        }
    },
    methods: {
      getPusbliserData() {
        this.getLoader = true;
        axios 
          .get(this.globalVariables.apiUrl+`publisher/offers/view/${this.$route.params.id}`, {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          })
          .then((res) => {
            this.offer         = res.data.offer;
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

      goToCreateCampaign(id){
        this.getLoader = true;
            axios
              .get(this.globalVariables.apiUrl+`publisher/offer/campaign/${id}`, {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") },
              })
              .then((res) => {
                if(res.data.status == 'success'){
                  this.$router.push("/publisher-create-campaign/" + id);
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
      },

      changeActiveClass(id) {
        this.changeClass = id;
      },
      allowTrafic(traficId) {
        var ids = this.offer.allow_trafic.map(String); // Convert all elements to strings
       return ids.includes(String(traficId)); // Convert traficId to string for comparison
    }
    },
  };
  </script>
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
  .country_flag_avartisher_views{
    width:2% !important;
    margin-right : 5px;
  }
  .realted_country_flag{
    width:10% !important;
    margin-right : 5px;
  }
  </style>
  