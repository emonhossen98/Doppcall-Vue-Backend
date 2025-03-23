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
                        <div class="d-flex align-items-center">
                            <a id="sub-heading"  class="sub-heading d-flex align-items-center">
                                <img class="country-flag" :src="`https://flagicons.lipis.dev/flags/4x3/${offerData && offerData.primary_country_code.toLowerCase()}.svg`" alt="">

                                 <span>{{ offerData && offerData.name }}</span>
                               <template v-if="offerData && offerData.offer_tag">
                                    <span v-for="(value, index) in offerData.offer_tag.split(',')" :key="index" class="mx-1"> | {{ value }}</span>
                                </template>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="card  mt-4">
                    <div class="card-header custom-card-header">
                        <h5 class="card-title mb-0 mt-2">Edit Campaign</h5>
                    </div>
                    <div class="card-body">
                        <div class="row-mb">
                            <div class="row mt-4">
                                <div class="col-sm-2">
                                    <label for="name" class="required">Campaign's Name</label>
                                </div>
                                <div class="col-sm-10">
                                    <input type="text" v-model="camapignCreated.name" id="name" class="form-control" >
                                    <div v-if="validationErrors && validationErrors.name" class="text-danger">
                                        {{ validationErrors.name[0] }}
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-sm-2">
                                    <label for="traffic_sources" class="required">Traffic Sources</label>
                                </div>
                                <div class="col-sm-10">
                                    <input type="text" v-model="camapignCreated.traffic_sources" id="traffic_sources" class="form-control" >
                                    <div v-if="validationErrors && validationErrors.traffic_sources" class="text-danger">
                                        {{ validationErrors.traffic_sources[0] }}
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-sm-2">
                                    <label for="note">Notes</label>
                                </div>
                                <div class="col-sm-10">
                                    <textarea  v-model="camapignCreated.note" rows="6" id="note" class="form-control"></textarea>
                                </div>
                            </div>
                            <div v-if="questionAnswer && questionAnswer.length > 0" class="row mb-3 align-items-center">
                                <div class="col-md-2">
                                    <label for="" class="col-form-label">Offer Questions</label>
                                </div>
                                <div class="col-md-10">
                                    <div v-for="data in offerData.question" :key="data.id">
                                        <label class="col-form-label">{{ data.question }} <span v-if="data.required_col === 1" class="text-danger">Required</span><span v-else>Optional</span></label>
                                        <input :type="data.file_col !== 1 ? 'text' : 'file'" :name="'answer[' + data.id + '][]'" :class="['form-control', { 'required': data.required_col === 1 }]" :value="getAnswer(data.id)" :placeholder="'Your answer?'" @change="updateAnswer($event, data.id)">
                                        <span v-if="data.file_col === 1">{{ getAnswer(data.id) }}</span>
                                    </div>
                                </div>
                                </div>
                                
                                <div v-else-if="offer_question.length > 0" class="row mb-3 align-items-center">
                                <div class="col-md-2">
                                    <label for="" class="col-form-label">Offer Questions</label>
                                </div>
                                <div class="col-md-10">
                                    <div v-for="data in offer_question" :key="data.id">
                                        <label class="col-form-label">{{ data.question }} <span v-if="data.required_col == 1" class="text-danger">Required</span><span v-else>Optional</span></label>
                                        <input :type="data.file_col != 1 ? 'text' : 'file'" :name="'answer[' + data.id + '][]'" :class="['form-control', { 'required': data.required_col == 1 }]" :placeholder="'Your answer?'" v-model="answers[data.id]">
                                        </div>
                                </div>
                                </div>

                             <div class="mb-3 row">
                                <div class="col-md-2">
                                    <label for="">Rules</label>
                                </div>
                                <div class="col-md-10" v-html="offerData.rules">
                                </div>
                            </div>

                            <div class="row" v-if="offerData.important_rules">
                                <div class="col-md-2">
                                    <label for="" class="col-form-label">Important Rules</label>
                                </div>
                                <div class="col-md-10" v-html="offerData.important_rules">
                                </div>
                            </div>

                            <div class="row mt-4">
                                <div class="col-sm-2">
                                </div>
                                <div class="col-sm-10">
                                    <label class="ckbox"><input v-model="camapignCreated.accept" type="checkbox" class="me-2"><span>I have read the rules for
                                    <RouterLink :to="'/'">{{ offerData.name }}</RouterLink></span></label>
                                    <div v-if="validationErrors && validationErrors.accept" class="text-danger">
                                        {{ validationErrors.accept[0] }}
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-12 text-end">
                                    <button type="button" @click="CompaignCreate()" class="btn btn-sm btn-primary me-2 text-capitalize">
                                      Submit For Moderation
                                    </button>
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
        answers: {},
        breadcrumbs: [
          { label: "Dashboard", url: "/publisher/dashboard" },
          { label: "Campaigns", url: "/publisher-offer-campaigns" },
          { label: "Edit", url: "" },
        ],
        getLoader: false,
        offerData : "",
        offer_question : [],
        camapignCreated : {
            offer_id : "",
            name : "",
            traffic_sources : "",
            note : "",
            answer : [],
            rules : "",
            accept : false,
        },
        validationErrors : null,
        questionAnswer : "",
      };
    },
    async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRolePublisher();
        if (role == 'Publisher') {
          this.getPusbliserData(this.$route.params.id);
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    },
    methods: {
      getPusbliserData(id) {
        this.getLoader = true;
        axios 
          .get(this.globalVariables.apiUrl+`publisher/offer/campaign/${id}/edit`, {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          })
          .then((res) => {
                this.offerData                       = res.data.offer;
                this.camapignCreated.offer_id        = res.data.offer.id;
                this.camapignCreated.name            = res.data.offer.name ?? res.data.campaign.name;
                this.camapignCreated.traffic_sources = res.data.campaign.trafic_source;
                this.camapignCreated.note            = res.data.campaign.note;
                // this.camapignCreated.answer          = res.data.offer.answer;
                this.camapignCreated.rules           = res.data.campaign.rules;
                this.camapignCreated.accept          = res.data.offer.accept;
                this.questionAnswer                  = res.data.questionAnswer;
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.getLoader = false;
          });
      },

      CompaignCreate() {
        this.getLoader = true;
        axios 
          .put(this.globalVariables.apiUrl+`publisher/offer/campaign/${this.$route.params.id}/update`,this.camapignCreated, {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          })
          .then((res) => {
            toastr.success(res.data.message);
            this.$router.push('/publisher-offer-campaigns');
          })
          .catch((error) => {
            if(error && error.response && error.response.data && error.response.data.errors){
              this.validationErrors = error.response.data.errors;
            }
          })
          .finally(() => {
            this.getLoader = false;
          });
      },
      getAnswer(questionId) {
        const answer = this.questionAnswer.find(answer => answer.question_id === questionId);
        return answer ? answer.answer : '';
      },
      updateAnswer(event, questionId) {
        const answerIndex = this.questionAnswer.findIndex(answer => answer.question_id === questionId);
        if (answerIndex !== -1) {
            this.questionAnswer[answerIndex].answer = event.target.value;
        } else {
            this.questionAnswer.push({ question_id: questionId, answer: event.target.value });
        }
    },
    },
  };
  </script>
    <style>
    #sub-heading{
      width: 70%;
    }
    #sub-heading img {
      width: 3%;
      margin-right: 8px;
    }
    </style>