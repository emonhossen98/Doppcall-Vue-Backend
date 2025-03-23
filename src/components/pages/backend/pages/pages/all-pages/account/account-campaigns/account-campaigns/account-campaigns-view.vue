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
        <div class="col-md-12">
            <div class="card">
                <div class="card-body">
                   <div class="row">
                        <div class="col-lg-12">
                            <h5 class="card-title d-flex justify-content-between align-items-center">
                                <strong>{{ offer_campaign.name ?? '' }}</strong>
                                <span class="badge " :class="offer_campaign.offer_color_status">
                                    {{ offer_campaign.offer_status }}
                                </span>
                            </h5>
                            <div class="table-responsive table-overflow-hidden">
                                <table class="table table-hover mb-0 text-md-nowrap mt-4">
                                    <tbody>
                                         <template v-if="offer_campaign.name">
                                            <tr>
                                                <th style="width: 25%">Campaign Name</th>
                                                <td>{{ offer_campaign.name }}</td>
                                            </tr>
                                         </template>
                                         <template v-if="offer_campaign.type">
                                            <tr>
                                                <th style="width: 25%">Type</th>
                                                <td v-html="offer_campaign.type"></td>
                                            </tr>
                                         </template>
                                         <template v-if="offer_campaign.trafic_source">
                                            <tr>
                                                <th style="width: 25%">Traffic Source</th>
                                                <td v-html="offer_campaign.trafic_source"></td>
                                            </tr>
                                         </template>
                                         <template v-if="offer_campaign.rules">
                                            <tr>
                                                <th style="width: 25%">Rules</th>
                                                <td v-html="offer_campaign.rules"></td>
                                            </tr>
                                         </template>
                                         <template v-if="offer_campaign.note">
                                            <tr>
                                                <th style="width: 25%">Note</th>
                                                <td>{{ offer_campaign.note }}</td>
                                            </tr>
                                         </template>
                                         <template v-if="materials != '' && materials != null">
                                            <tr>
                                                <th style="width: 25%">Material</th>
                                                <td>
                                                    <div v-for="material in materials" :key="material.id" class="box-material">
                                                        <div v-if="material.title" class="single-material">
                                                            <strong>Title:</strong>
                                                            <span>{{ material.title }}</span>
                                                        </div>
                                                        <div v-if="material.link" class="single-material">
                                                            <strong>Link:</strong>
                                                            <span>{{ material.link }}</span>
                                                        </div>
                                                        <div v-if="material.comment" class="single-material">
                                                            <strong>Comment:</strong>
                                                            <span>{{ material.comment }}</span>
                                                        </div>
                                                        <div v-if="material.screenshot" class="single-material">
                                                            <strong>Screenshot:</strong>
                                                            <span> <img :src="globalVariables.appUrl+material.screenshot" alt="" style="width: 100px"></span>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                         </template>
                                         <template v-if="questionAnser != '' && questionAnser != null">
                                            <tr>
                                                <th style="width: 25%">Questions</th>
                                                <td></td>
                                            </tr>
                                         </template>
                                    </tbody>

                                </table>
                                <div v-if="questionAnser.length > 0">
                                    <div class="panel-group1" id="accordion11">
                                    <div v-for="(data, index) in questionAnser" :key="data.id" class="panel panel-default mb-4">
                                        <div class="panel-heading1 bg-primary">
                                        <h4 class="panel-title1">
                                            <a class="accordion-toggle" :class="{ collapsed: activePanel !== data.id }" href="#" @click.prevent="togglePanel(data.id)" >
                                            <i class="fas fa-arrow-right"></i> {{ data.question }}
                                            </a>
                                        </h4>
                                        </div>
                                        <div :id="'collapse' + data.id" class="panel-collapse collapse" :class="{ show: activePanel === data.id }" role="tabpanel" >
                                        <div class="panel-body border">
                                            {{ data.answer }}
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
    </div>
    <!-- / Content -->
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
import { fetchUserRoleAccountmanager } from "@/services/userServiceAccountmanager";


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
        { label: "Dashboard", url: "/account/dashboard" },
        { label: "Campaigns", url: "/account-campaigns" },
        { label: "Details", url: "" },
      ],
      getLoader: false,
      offer_campaign : "",
      questionAnser : "",
      materials : "",
      activePanel: null,
    };
  },
  async mounted() { 
    try {
      const { role, isAuthorized } = await fetchUserRoleAccountmanager();
      if (role == 'Account manager') {
        this.getLoader = true;
        this.getPublisherViewData();
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  },
  methods: {
    // Get Pubhisher Data
    getPublisherViewData() {
      axios
        .get(
          this.globalVariables.apiUrl+`account-manager/campaigns/${this.$route.params.id}/view`,
          { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
        )
        .then((res) => {
            this.offer_campaign = res.data.offer_campaign;
            this.questionAnser = res.data.questionAnser;
            this.materials = res.data.materials ?? '';
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
            this.getLoader = false;
        });
    },

    togglePanel(id) {
      this.activePanel = this.activePanel === id ? null : id;
    },
  },
};
</script>


