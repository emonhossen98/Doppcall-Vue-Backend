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
                        <div class="d-flex align-items-center">
                            <a  href="javascript:" id="sub-heading" class="sub-heading d-flex align-items-center">
                                <img class="country-flags" :src="`https://flagicons.lipis.dev/flags/4x3/${offerData && offerData.primary_country_code.toLowerCase()}.svg`" alt="">
                                 <span>{{ offerData && offerData.name }}</span>
                               <template v-if="offerData && offerData.offer_tag">
                                    <span v-for="(value, index) in offerData.offer_tag.split(',')" :key="index" class="mx-1"> | {{ value }}</span>
                                </template>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="card mt-4">
                    <div class="card-header custom-card-header">
                        <h5 class="card-title mb-0 mt-2">Create Campaign</h5>
                    </div>
                    <div class="card-body">
                        <div class="row-mb">
                            <div class="row mt-4">
                                <div class="col-sm-2">
                                    <label for="name" class="required">Campaign's Name</label>
                                </div>
                                <div class="col-sm-10">
                                    <input type="text" v-model="camapignCreated.name" id="name" class="form-control" placeholder="Enter Campaign's Name">
                                    <div v-if="validationErrors && validationErrors.name" class="text-danger" >
                                        {{ validationErrors.name[0] }}
                                    </div>
                                </div>
                            </div>

                            <div class="row mt-3">
                                <div class="col-sm-2">
                                    <label for="traffic_sources" class="required">Traffic Sources</label>
                                </div>
                                <div class="col-sm-10">
                                    <input type="text" v-model="camapignCreated.traffic_sources" id="traffic_sources" class="form-control" placeholder="Enter Traffic Sources">
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
                                    <textarea  v-model="camapignCreated.note" rows="6" id="note" class="form-control" placeholder="Enter Notes"></textarea>
                                </div>
                            </div>
                            <div v-if="questionAnswer && questionAnswer.length > 0" class="row mb-3 align-items-center">
                                <div class="col-md-2">
                                    <label for="" class="col-form-label">Offer Questions</label>
                                </div>
                                <div class="col-md-10">
                                    <div v-for="data in offerData.question" :key="data.id">
                                    <label for="" class="col-form-label">{{ data.question }} <span v-if="data.required_col == 1" class="text-danger">Required</span><span v-else>Optional</span></label>
                                    <input v-if="data.file_col != 1" type="text" :name="'answer[' + data.id + '][]'" :required="data.required_col == 1" class="form-control" :value="getAnswer(data.id)" placeholder="Your answer?" />
                                    <input v-else type="file" :name="'answer[' + data.id + '][]'" :required="data.required_col == 1" class="form-control" placeholder="Your answer?" />
                                    <span>{{ getAnswer(data.id) }}</span>
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
                            <div class="row mt-4">
                                <div class="col-sm-2">
                                </div>
                                <div class="col-sm-10">
                                    <label class="ckbox"><input v-model="camapignCreated.create_rules" type="checkbox" class="me-2"><span v-html="publisher_campaign_create_rules ?? ''">
                                    </span></label>
                                    <div v-if="validationErrors && validationErrors.create_rules" class="text-danger">
                                        {{ validationErrors.create_rules[0] }}
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
        answers: [],
        breadcrumbs: [
          { label: "Dashboard", url: "/publisher/dashboard" },
          { label: "Campaigns", url: "/publisher-offer-campaigns" },
          { label: "Create", url: "" },
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
            create_rules : false,
        },
        validationErrors : null,
        publisher_campaign_create_rules : null,
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
          .get(this.globalVariables.apiUrl+`publisher/offer/campaign/${this.$route.params.id}`, {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          })
          .then((res) => {
            if(res.data.status == 'success'){
                this.offerData                       = res && res.data && res.data.data.offer;
                this.offer_question                  = res && res.data && res.data.data.offer_question;
                this.camapignCreated.offer_id        = res && res.data && res.data.data.offer.id;
                this.camapignCreated.name            = res && res.data && res.data.data.offer.name;
                this.camapignCreated.traffic_sources = res && res.data && res.data.data.offer.traffic_source;
                this.camapignCreated.note            = res && res.data && res.data.data.offer.note;
                this.camapignCreated.rules           = res && res.data && res.data.data.offer.rules;
                this.publisher_campaign_create_rules = res && res.data && res.data.data.publisher_campaign_create_rules;
            }
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
          .post(this.globalVariables.apiUrl+`publisher/offer/campaign/store`,this.camapignCreated, {
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