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
                 <div class="col-lg-12">
                   <h5 class="card-title d-flex justify-content-between align-items-center" >
                    <RouterLink :to="'/admin-offers-view/'+campaignData.offer_id" 
                      >{{ campaignData.name }}</RouterLink>
                    <RouterLink
                      style="margin: 0 10px; margin-left: auto"
                      :to="'/admin-campaigns-edit/'+campaignData.id"
                      >Edit</RouterLink>
                    <span class="badge" :class="campaignData.convart_color_status">
                      {{ campaignData.convart_status }}
                    </span> 
                  </h5>
                  <div class="table-responsive table-overflow-hidden">
                    <table class="table table-hover mb-0 text-md-nowrap mt-4">
                      <tbody>
                        <tr v-if="campaignData && campaignData.user && campaignData.user.fname">
                          <th style="width: 25%">Created By</th>
                          <td class="d-flex justify-content-between align-items-center">
                            {{campaignData.user.fname }}
                            <RouterLink
                              class="btn btn-primary float-right btn-custom campaign_view_profile"
                              :to="'/admin-manage-publishers-view/'+campaignData.user.id"
                              >View Profile</RouterLink>
                          </td>
                        </tr>
                        <tr v-if="campaignData && campaignData.user && campaignData.user.company_name">
                          <th style="width: 25%">Company</th>
                          <td>{{ campaignData.user.company_name }}</td>
                        </tr>

                        <tr v-if="campaignData && campaignData.name">
                          <th style="width: 25%">Campaign Name</th>
                          <td>{{campaignData.name }}</td>
                        </tr>
                        <tr  v-if="campaignData && campaignData.type">
                          <th style="width: 25%">Type</th>
                          <td>{{ campaignData.type }}</td>
                        </tr>
                        <tr  v-if="campaignData && campaignData.trafic_source">
                          <th style="width: 25%">Traffic Source</th>
                          <td>{{ campaignData.trafic_source }}</td>
                        </tr>
                        <tr v-if="campaignData && campaignData.rules">
                          <th style="width: 25%">Rules</th>
                          <td v-html="campaignData.rules"></td>
                        </tr>
                        <tr  v-if="campaignData && campaignData.note">
                          <th style="width: 25%">Note</th>
                          <td><p v-html="campaignData.note"></p></td>
                        </tr>
                        
                        <tr v-if="materials != ''">
                          <th style="width: 25%">Material</th>
                          <td>
                            <div v-for="(material,index) in materials" :key="index" class="box-material">
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
                                <span>{{material.comment }}</span>
                              </div>
                              <div  v-if="material.screenshot" class="single-material">
                                <strong>Screenshot:</strong>
                                <span>
                                  <img
                                    style="width: 100px"
                                    :src="globalVariables.appUrl+material.screenshot"
                                    alt="screenshot"
                                  />
                                </span>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr v-if="campaignQuestionAnser != ''">
                          <th style="width: 25%">Questions</th>
                          <td></td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <td></td>
                          <td>
                            <form>
                              <div class="row">
                                <div class="col-12 text-end view_profile_btn">
                                  <button :disabled="campaignData.status === 3" @click="offersCampaigenUpdate('reject_btn')"  class="btn btn-sm btn-danger me-2" type="button">
                                    {{ campaignData.status === 3 ? 'Rejected' : 'Reject' }}
                                  </button>
                                  <button :disabled="campaignData.status === 1" type="button" @click="offersCampaigenUpdate('approved_btn')"  class="btn btn-sm btn-primary mr-2 text-capitalize">
                                    {{ campaignData.status === 1 ? 'Approved' : 'Approve' }}
                                  </button>
                                </div>
                              </div>
                            </form>
                          </td>
                        </tr>
                      </tfoot> 
                    </table>

                    <form style="margin-bottom: 10px">
                      <div class="row d-flex align-items-end mt-1">
                        <div class="col-12">
                          <table class="w-100 question_table">
                            <thead>
                              <tr class="head" style="vertical-align: start">
                                <td style="width: 80%">
                                  <label class="form-label required" for=""
                                    >Aditional Questions</label>
                                </td>
                              </tr>
                              <tr style="vertical-align: top">
                                <td style="padding-right: 10px" class="pt-2">
                                  <textarea v-model="chatMessage.chat" class="form-control"></textarea>
                                </td>
                              </tr>
                            </thead>
                          </table>
                        </div>
                      </div>
                      <div class="row mt-3">
                        <div class="col-12 text-end">
                          <button
                            @click="submiteChart"
                            type="button"
                            class="btn btn-sm btn-primary text-right ml-1">
                            <i class="fas fa-check fa-sm me-1"></i>
                            Submit
                          </button>
                        </div>
                      </div>
                    </form>
                    <div class="com-chat" v-if="Chats != ''">
                      <ul>
                        <li v-for="(chat,index) in Chats">
                            <div style="border: 1px solid; border-radius: 5px; padding: 10px; margin-bottom: 5px;">
                                <b class="me-2">{{ chat.user_name }}</b>
                                <small>{{ formattedDateTime(chat.created_at) }}</small>
                                <p>{{ chat.chat }}</p>
                            </div>
                        </li>
                      </ul>
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
import "toastr/build/toastr.min.css";
import Loader from "../../../../../include/loader.vue";
import Breadcrumb from "../../../../../include/breadcrumb.vue";
import { inject } from "vue";
import { fetchUserRole } from "@/services/userService";

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
      getLoader: false,
      breadcrumbs: [
        { label: "Dashboard", url: "/dashboard" },
        { label: "Admin Campaigns", url: "/admin-campaigns-index" },
        { label: "Campaign", url: "" },
      ],
      campaignData: "",
      campaignQuestionAnser : "",
      materials : "",
      campaineUpdate: {
        status_update: "1",
        offer_id     : "",
        submit_btn   : "",
      },
      chatMessage : {
        campaign_id : "",
        chat : "",
      },
      Chats : "",
    };
  },
  async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role == 'Super' || role == 'Admin') {
          this.getCampainViewData();
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    },
  methods: {
       offersCampaigenUpdate(value) {
        this.getLoader = true;
        this.campaineUpdate.submit_btn = value;
        axios
          .put(this.globalVariables.apiUrl+`admin/campaigns/${this.$route.params.id}/update`, this.campaineUpdate, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
              toastr.success(res.data.message);
              this.getCampainViewData();
          })
          .catch((error) => {
            if (error.response && error.response.data && error.response.data.errors) {
              this.validationErrors = error.response.data.errors;
            }
          })
          .finally(() => {
            this.getLoader = false;
          });
      },
      submiteChart() {
        this.getLoader = true;
        axios
          .post(this.globalVariables.apiUrl+`offers/campaign/chat`, this.chatMessage, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
              toastr.success(res.data.message);
              this.getCampainViewData();
              this.chatMessage.chat = '';
          })
          .catch((error) => {
            if (error.response && error.response.data && error.response.data.errors) {
              this.validationErrors = error.response.data.errors;
            }
          })
          .finally(() => {
            this.getLoader = false;
          });
      },  
      getCampainViewData() {
        this.getLoader = true;
        axios
          .get(
            this.globalVariables.apiUrl+`admin/offers/campaign/single/details/${this.$route.params.id}`, {
              headers: { Authorization: "Bearer " + localStorage.getItem("token") },
            })
          .then((res) => {
            this.Chats                   = res.data.chats;
            this.chatMessage.campaign_id = res.data.campaign.id;
            this.campaineUpdate.offer_id = res.data.campaign.id;
            this.campaignData            = res.data.campaign;
            this.campaignQuestionAnser   = res.data.questionAnser;
            this.materials               = res.data.materials ?? '';
          })
          .catch((error) => {
            return error;
          })
          .finally(() => {
            this.getLoader = false;
          });
      },
      formattedDateTime(originalDateTime) {
      const date = new Date(originalDateTime);
      const formattedDate = date.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
      });
      return formattedDate;
    }
  },
};
</script>
