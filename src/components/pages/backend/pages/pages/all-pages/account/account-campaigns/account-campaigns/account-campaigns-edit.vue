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
            <form>
              <div class="row">
                <div class="col-md-12">
                  <div class="card">
                    <div class="card-body">
                      <div class="d-flex align-items-center">
                        <a id="sub-heading" class="sub-heading d-flex align-items-center" >
                          <img  class="country-flag" :src="`https://flagicons.lipis.dev/flags/4x3/${offer && offer.primary_country_code.toLowerCase()}.svg`"  alt=""/>
                          <span>{{ offer && offer.name }}</span>
                          <template v-if="offer && offer.offer_tag">
                            <span  v-for="(value, index) in offer.offer_tag.split(',')" :key="index" class="mx-1"> | {{ value }} </span>
                          </template>
                        </a>
                      </div>
                    </div>
                  </div>
  
                  <div class="card mt-4">
                    <div class="card-header custom-card-header">
                      <h4 class="card-title">Edit Campaign</h4>
                    </div>
                    <div class="card-body">
                      <div class="row-mb">
                        <div class="row mb-3">
                          <div class="col-md-3">
                            <label for="" class="required">Campaign Name</label>
                          </div>
                          <div class="col-md-9">
                            <input type="text" v-model="editOfferCampaigen.name"  class="form-control"/>
                            <div v-if="validationErrors && validationErrors.name"  class="text-danger" >
                              {{ validationErrors.name[0] }}
                            </div>
                          </div>
                        </div>
  
                        <div class="row mb-3">
                          <div class="col-md-3">
                            <label for="">Traffic source</label>
                          </div>
                          <div class="col-md-9">
                            <input type="text" v-model="editOfferCampaigen.trafic_source"  class="form-control"/>
                            <div v-if="validationErrors && validationErrors.trafic_source" class="text-danger">
                              {{ validationErrors.trafic_source[0] }}
                            </div>
                          </div>
                        </div>
  
                        <div class="mb-3 row">
                          <div class="col-md-3">
                            <label for="">Rules</label>
                          </div>
                          <div class="col-md-9">
                            <textarea rows="4" class="form-control" ref="Rules" ></textarea>
                            <div v-if="validationErrors && validationErrors.rules" class="text-danger">
                              {{ validationErrors.rules[0] }}
                            </div>
                          </div>
                        </div>
  
                        <div class="mb-3 row">
                          <div class="col-md-3">
                            <label for="">Note</label>
                          </div>
                          <div class="col-md-9">
                            <textarea rows="4" class="form-control" v-model="editOfferCampaigen.note"></textarea>
                            <div  v-if="validationErrors && validationErrors.note" class="text-danger">
                              {{ validationErrors.note[0] }}
                            </div>
                          </div>
                        </div>
  
                        <div v-if="questionAnswer.length > 0">
                          <div class="row mb-3">
                            <div class="col-md-2">
                              <label class="col-form-label">Offer Questions</label>
                            </div>
                            <div class="col-md-10">
                              <div v-for="(data, index) in questionAnswer" :key="index" >
                                <label class="col-form-label">{{ data.question }}</label>
                                <input  type="text"  v-model="editOfferCampaigen.answers[index]" class="form-control" placeholder="Your answer?"/>
                                <input type="hidden" :value="data.question_id" />
                              </div>
                            </div>
                          </div>
                        </div>
  
                        <template>
                          <div class="row">
                            <div class="col-md-2">
                              <label for="" class="col-form-label">Important Rules</label>
                            </div>
                            <div class="col-md-10" v-html="offer.important_rules">
                            </div>
                          </div>
                        </template>
  
                        <div class="row">
                          <div class="col-12 text-end">
                            <button type="button" class="btn btn-sm btn-primary mr-2 text-capitalize" @click="getUpdateData()">
                              Approved
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
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
          { label: "Edit", url: "" },
        ],
        getLoader: false,
        offer_campaign: "",
        questionAnswer: [],
        offer: "",
        answers: [], // Added to store answers
        editOfferCampaigen: {
          updated_at: "",
          offer_id: "",
          name: "",
          trafic_source: "",
          rules: "",
          note: "",
          answers : "",
        },
        validationErrors: {}, // Ensure validationErrors is initialized
      };
    },
    async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRoleAccountmanager();
        if (role == 'Account manager') {
          this.getLoader = true;
          this.getPublisherViewData();
          $(this.$refs.Rules).summernote({
            placeholder: "Type your text here...",
            height: 200,
            callbacks: {
              onChange: (contents) => {
                this.editOfferCampaigen.rules = contents;
              },
            },
          });
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    },
    methods: {
      // Get Publisher Data
      getPublisherViewData() {
        axios
          .get( this.globalVariables.apiUrl + `account-manager/campaigns/${this.$route.params.id}/edit`,
            {
              headers: { Authorization: "Bearer " + localStorage.getItem("token") },
            }
          )
          .then((res) => {
            this.offer = res.data.offer;
            this.editOfferCampaigen.offer_id = res.data.offer && res.data.offer.id;
            this.editOfferCampaigen.updated_at = res.data.offer_campaign && res.data.offer_campaign.id;
            this.editOfferCampaigen.name = res.data.offer_campaign && res.data.offer_campaign.name;
            this.editOfferCampaigen.trafic_source =  res.data.offer_campaign && res.data.offer_campaign.trafic_source;
            this.editOfferCampaigen.rules = res.data.offer_campaign && res.data.offer_campaign.rules;
            this.editOfferCampaigen.note =res.data.offer_campaign && res.data.offer_campaign.note;
            this.questionAnswer = res.data.questionAnswers || []; 
            this.answers = this.questionAnswer.map(() => ""); 
            $(this.$refs.Rules).summernote("code", res.data.offer_campaign && res.data.offer_campaign.rules);
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.getLoader = false;
          });
      },
      getUpdateData() {
        axios
          .post( this.globalVariables.apiUrl + `account-manager/campaigns/${this.$route.params.id}/update`,this.editOfferCampaigen,
            {
              headers: { Authorization: "Bearer " + localStorage.getItem("token") },
            }
          )
          .then((res) => {
            if(res.data.status == 'success'){
                toastr.success(res.data.message);
                this.$router.push('/account-campaigns');
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
    },
  };
  </script>
  
  <style>
  .country-flag {
    width: 3%;
    margin-right: 7px;
  }
  #sub-heading {
    width: 70%;
  }
  #sub-heading img {
    width: 3%;
    margin-right: 8px;
  }
  </style>
  