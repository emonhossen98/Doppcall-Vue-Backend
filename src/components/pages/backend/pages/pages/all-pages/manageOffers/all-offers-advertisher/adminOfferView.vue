
<template>
    <div v-if="getLoader">
      <Loader></Loader>
    </div>
    <!-- Content wrapper -->
    <div class="content-wrapper">
      <!-- Content -->
      <!-- {{ OfferCreate }} -->
      <div class="container-xxl flex-grow-1 container-p-y"> 
        <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
        <div class="row mt-4">
        <div class="col-md-12">
            <div class="card">
                <div class="card-body">
                   <div class="row">
                        <div class="col">
                            <h5 class="card-title d-flex justify-content-between align-items-center">
                                 <a href="#" class="country-flagofa sub-heading d-flex align-items-center">
                                    <img class="country-flagofOfferView" :src="getAllData.country_flag" alt=""> {{ getViewData.name }} 
                                </a>
                                <!-- {{ getAllData }} -->
                                <span class="badge" :class="getAllData.offer_color_status">
                                    {{ getAllData.offer_status }}
                                </span>
                            </h5>
                            <div class="table-responsive table-overflow-hidden">
                                <table class="table table-hover mb-0 text-md-nowrap mt-4">
                                    <tbody>
                                        <tr v-if="getViewData.country">
                                            <th style="width: 25%">Country and region</th>
                                            <td class="text-start" v-html="getViewData.country"></td>
                                        </tr>

                                        <tr v-if="getViewData.offer_type">
                                            <th style="width: 25%">Offer's type</th>
                                            <td class="text-start" v-html="getViewData.offer_type"></td>
                                        </tr>
                                        
                                        <tr v-if="getViewData.pay_out">
                                            <th style="width: 25%">Payout</th>
                                            <td class="text-start" v-html="getViewData.pay_out"></td>
                                        </tr>

                                        <tr v-if="getViewData.landing_page">
                                            <th style="width: 25%">Landing page</th>
                                            <td class="text-start" v-html="getViewData.landing_page"></td>
                                        </tr>

                                        <tr v-if="getViewData.marchent_allow">
                                            <th style="width: 25%">Merchant is allowed to refuse calls</th>
                                            <td class="text-start" v-html="getViewData.marchent_allow"></td>
                                        </tr>

                                        <tr v-if="getViewData.call_limit">
                                            <th style="width: 25%">Call's Limits</th>
                                            <td class="text-start" v-html="getViewData.call_limit"></td>
                                        </tr>

                                        <tr v-if="getViewData.materials_moderation">
                                            <th style="width: 25%">Materials moderation</th>
                                            <td class="text-start" v-html="getViewData.materials_moderation"></td>
                                        </tr>

                                        <tr v-if="getViewData.tools">
                                            <th style="width: 25%">Tools</th>
                                            <td class="text-start" v-html="getViewData.tools"></td>
                                        </tr>

                                        <tr v-if="getViewData.important_rules">
                                            <th style="width: 25%">Important Rules</th>
                                            <td class="text-start" v-html="getViewData.important_rules"></td>
                                        </tr>

                                        <tr v-if="getViewData.question">
                                            <th style="width: 25%">Questions</th>
                                            <td>
                                                <li class="text-start" v-for="(data,index) in getViewData.question" :key="index">{{ data.question }}</li>
                                            </td> 
                                        </tr>
                                              
                                        <tr v-if="getViewData.created_at">
                                            <th style="width: 25%">Created Date</th>
                                            <td class="text-start">{{ formatDate(getViewData.created_at) }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                             <div class="text-end">
                                <RouterLink :to="'/admin-offers-campaigns-create/'+getViewData.id" class="btn btn-primary px-5 mt-4">Create a campaign</RouterLink>
                            </div>
                        </div>
                   </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row mt-4">
        <div class="col-md-12">
            <div class="card">
                <div class="card-body">
                    <div class="d-md-flex">
                        <div class="">
                            <div class="panel panel-primary tabs-style-4">
                                <div class="tab-menu-heading">
                                    <div class="tabs-menu ">
                                        <!-- Tabs -->
                                        <ul class="panel-tabs custome_tab">
                                            <template v-if="getViewData.rules">
                                                <li><a href="javascript:" :class="changeClass == 'rules' ? 'active' : ''" data-toggle="tab" @click="changeActiveClass('rules')"><i class="fa fa-laptop"></i> Rules</a></li>
                                            </template>

                                            <template v-if="getViewData.trafics">
                                                <li><a href="javascript:" :class="changeClass == 'trafics' ? 'active' : ''" data-toggle="tab"  @click="changeActiveClass('trafics')"><i class="fa fa-cube"></i> Trafics</a></li>
                                            </template>

                                            <template v-if="getViewData.description">
                                                <li><a href="javascript:" :class="changeClass == 'description' ? 'active' : ''" data-toggle="tab" @click="changeActiveClass('description')"><i class="fa fa-cogs"></i> Description</a></li>
                                            </template>

                                            <template v-if="getViewData.allow_trafic">
                                                <li><a href="javascript:" :class="changeClass == 'allow_trafic' ? 'active' : ''" data-toggle="tab" @click="changeActiveClass('allow_trafic')"><i class="fa fa-tasks"></i> Allowed Traffic</a></li>
                                            </template>
                
                                            <template v-if="getAllData.relatedOffers">
                                                <li><a href="javascript:" :class="changeClass == 'related_offer' ? 'active' : ''" data-toggle="tab" @click="changeActiveClass('related_offer')"><i class="fas fa-tags"></i> Related Offers</a></li>
                                            </template>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tabs-style-4 tab_right">
                            <div class="panel-body tabs-menu-body">
                                <div class="tab-content">
                                    <div v-if="getViewData.rules" class="tab-pane" :class="changeClass == 'rules' ? 'active' : ''" id="rules" v-html="getViewData.rules">
                                    </div>

                                    <div v-if="getViewData.trafics" class="tab-pane" :class="changeClass == 'trafics' ? 'active' : ''" id="trafics" v-html="getViewData.trafics">
                                    </div>

                                    <div v-if="getViewData.description" class="tab-pane" :class="changeClass == 'description' ? 'active' : ''" id="description" v-html="getViewData.description">
                                    </div>

                                    <div v-if="getViewData.allow_trafic" class="tab-pane" :class="changeClass == 'allow_trafic' ? 'active' : ''" id="allow_trafic">
                                        <ul id="allow_trafic_ul">
                                        <template v-for="(trafics,index) in getAllData.allowTrafics" :key="index">
                                            <li class="mb-3" v-if="trafics.title"><i class="me-2 fas fa-check-circle text-success"></i><span>{{ trafics.title ?? '' }}</span></li>
                                        </template>
                                        </ul>
                                    </div>

                                    <div v-if="getAllData.relatedOffers" class="tab-pane" :class="changeClass == 'related_offer' ? 'active' : ''" id="related_offer">
                                            <table class="align-middle mb-0 table table-hover" id="offer_datatables">
                                            <thead>
                                                <tr>
                                                    <th>SL</th>
                                                    <th>Created At</th>
                                                    <th>Primary Country</th>
                                                    <th>Offer</th>
                                                    <th>Assign</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(offer,index) in getAllData.relatedOffers" :key="index">
                                                    <td>{{ index+1 }}</td>
                                                    <td>{{ offer.created_at_formatted }}</td>
                                                    <td>
                                                        <div class="relatedcountry-flagofa sub-heading d-flex align-items-center">
                                                            <img class="relatedcountry-flagofOfferView " :src="offer.country_flag_formatted" alt=""> {{ offer.primary_country }}
                                                        </div>
                                                    </td>
                                                    <td><RouterLink :to="'/admin-offers-view/'+offer.id" class="d-flex">{{ offer.name }} </RouterLink></td>
                                                    <td v-html="offer.assign_user">
                                                    </td>
                                                    <td>
                                                        <span class="badge" :class="offer.offer_color_status">
                                                            {{ offer.offer_status }}
                                                        </span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
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
  import Loader from '../../../../../include/loader.vue';
  import Breadcrumb from '../../../../../include/breadcrumb.vue';
  import { inject } from "vue";
  import { fetchUserRole } from "@/services/userService";

  export default {
    setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
    components:{
      Loader,
      Breadcrumb,
    },
    data() {
      return {
        getLoader: false,
        breadcrumbs: [
          { label: "Dashboard", url: "/dashboard" },
          { label: "Offers", url: "/admin-offers" },
          { label: "View", url: "" },
        ],
        getAllData : "",
        getViewData : "",
        changeClass : "rules",
      };
    },
    async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role == 'Super' || role == 'Admin') {
            this.offersViewedData();
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    },
    methods: {
      offersViewedData() {
            this.getLoader = true;
        axios
          .get(this.globalVariables.apiUrl+`admin/offers/view/${this.$route.params.id}`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
            this.getAllData = res.data;
            this.getViewData = res.data.offer
          })
          .catch((error) => {
            return error;
          })
          .finally(() => {
            this.getLoader = false;
          });
      },
      formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", options);
      },
      changeActiveClass(id) {
        this.changeClass = id;
      },
    },
  };
  </script>

<style scoped>
.country-flagofOfferView {
	width: 3%;
	margin-right: 7px;
}
.country-flagofa{
    width: 70%;
}
.relatedcountry-flagofa{
    width: 100%;
}
.relatedcountry-flagofOfferView {
	width: 10%;
	margin-right: 3px;
}
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
</style>

  