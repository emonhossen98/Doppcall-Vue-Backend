
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
          <form>
              <div class="row" id="edit-campaign-offer">
                  <div class="col-md-12">
                      <div class="card">
                          <div class="card-body">
                              <div class="d-flex align-items-center">
                                <RouterLink :to="'/admin-offers-view/'+getOffers.id" class="sub-heading d-flex align-items-center">
                                    <img class="country-flag me-2" :src="getAllData.primary_country_code" alt=""> {{ getOffers.name }}
                                </RouterLink>
                                <template v-if="getOffers.offer_tag">
                                    {{ tagConvart(getOffers.offer_tag) }}
                                    <span v-for="(tag, index) in offerTags" :key="index" class="badge bg-primary ms-1">
                                        {{ tag }}
                                    </span>
                                </template>
                              </div>
                          </div>
                      </div>

                      <div class="card mt-3">
                          <div class="card-header custom-card-header border-bottom d-flex justify-content-between">
                              <h5 class="card-title mb-0">Edit Campaign</h5>
                              <RouterLink class="btn btn-info btn-sm" :to="'/admin-chats'"><i class="fa fa-envelope" aria-hidden="true"></i></RouterLink>
                          </div>
                          <div class="card-body mt-3">
                              <div class="row-mb">
                                <div class="row">
                                  <div class="col-md-2">
                                    <label for="name" class="required">Campaign Name</label>
                                  </div>
                                  <div class="col-md-10">
                                    <input type="text" v-model="campaineUpdate.name" id="name" class="form-control">
                                    <div v-if="validationErrors &&  validationErrors.name" class="text-danger">
                                      {{ validationErrors.name[0] }}
                                  </div>
                                  </div>
                                </div>

                                <div class="row mt-3">
                                  <div class="col-md-2">
                                    <label for="type">Type</label>
                                  </div>
                                  <div class="col-md-10">
                                    <input type="text" v-model="campaineUpdate.type" id="type" class="form-control">
                                  </div>
                                </div>

                                <div class="row mt-3">
                                  <div class="col-md-2">
                                    <label for="phone_number">Phone Number</label>
                                  </div>
                                  <div class="col-md-10">
                                    <input type="number" v-model="campaineUpdate.phone_number" id="phone_number" class="form-control">
                                  </div>
                                </div>

                                <div class="row mt-3">
                                  <div class="col-md-2">
                                    <label for="trafic_source">Traffic source</label>
                                  </div>
                                  <div class="col-md-10">
                                    <input type="text" v-model="campaineUpdate.trafic_source" id="trafic_source" class="form-control">
                                  </div>
                                </div>

                                <div class="row mt-3">
                                  <div class="col-md-2">
                                    <label for="rules">Rules</label>
                                  </div>
                                  <div class="col-md-10">
                                    <textarea  ref="summernoteRules" rows="4" v-model="campaineUpdate.rules" required id="rules" class="form-control"></textarea>
                                  </div>
                                </div>

                                <div class="row mt-3">
                                  <div class="col-md-2">
                                    <label for="note">Note</label>
                                  </div>
                                  <div class="col-md-10">
                                    <textarea  ref="summernoteNote" rows="4" v-model="campaineUpdate.note" required id="note" class="form-control"></textarea>
                                  </div>
                                </div>

                                <div class="row mt-3">
                                  <div class="col-md-2">
                                    <label for="custommessage">Custom message</label>
                                  </div>
                                  <div class="col-md-10">
                                    <textarea  ref="summernoteCustomMessage" rows="4" v-model="campaineUpdate.custommessage" required id="custommessage" class="form-control"></textarea>
                                  </div>
                                </div>
                                
                                <div class="row mb-3" v-if="getAllData && getAllData.questionAnswer != ''">
                                    <div class="col-md-2">
                                        <label for="" class="col-form-label">Offer Questions</label>
                                    </div>
                                    <div class="col-md-10">
                                      <template v-for="(offer, index) in getAllData.questionAnswer" :key="index">
                                        <label :for="'answer_' + index" class="col-form-label">{{ offer.question }}</label>
                                        <input v-model="campaineCreate.answers[index]" type="text" class="form-control" placeholder="Your answer?">
                                        {{ addQuestionId(offer.id) }}
                                      </template>  
                                    </div>
                                </div>
                                 <div class="row mt-4">
                                      <div class="col-12 text-end">
                                      <button v-if="campaign" :disabled="campaign.status === 3" @click="offersCampaigenUpdate('reject_btn')" class="btn btn-sm btn-danger me-2">
                                        {{ campaign.status === 3 ? 'Rejected' : 'Reject' }}
                                      </button>
                                      <button v-if="campaign" :disabled="campaign.status === 1" @click="offersCampaigenUpdate('approved_btn')" class="btn btn-sm btn-primary me-2 text-capitalize">
                                        {{ campaign.status === 1 ? 'Approved' : 'Approve' }}
                                      </button>
                                      <button v-if="campaign && campaign.status === 1" @click="offersCampaigenUpdate('update_btn')" class="btn btn-sm btn-primary mr-2 text-capitalize">
                                        Update
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
      <!-- / Content -->
      <div class="content-backdrop fade"></div>
    </div>
    <!-- Content wrapper -->
</template>
  


  <script>
  import axios from "axios";
  import Loader from '../../../../../include/loader.vue';
  import Breadcrumb from '../../../../../include/breadcrumb.vue';
  import toastr from "toastr";
  import "toastr/build/toastr.min.css"; 
  import { inject } from "vue";
  import { fetchUserRole } from "@/services/userService";
  
  export default {
    setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
    props:['OfferCreate'],
    components:{
      Loader,
      Breadcrumb,
    },
    data() {
      return {
        getLoader: false,
        breadcrumbs: [
          { label: "Dashboard", url: "/dashboard" },
          { label: "Campaign", url: "/admin-campaigns-index" },
          { label: "Edit", url: "" },
        ],
        campaineUpdate: {
            answers                   : [],
            question_ids              : [],
            offer_id                  : "",
            offer_campaign_material_id: "",
            name                      : "",
            type                      : "",
            trafic_source             : "",
            note                      : "",
            rules                     : "",
            custommessage             : "",
            phone_number              : "",
            submit_btn                : "",
            accept                    : true,
        },
        getAllData : "",
        getOffers : "",
        validationErrors: null,
        offerTags: [],
        offerTagString : "",
      };
    },
    async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role == 'Super' || role == 'Admin') {
          this.offersCampaigenEditData();
          $(this.$refs.summernoteRules).summernote({
            placeholder: 'Type your text here...',
            height: 100,
            callbacks: {
              onChange: contents => {
              this.campaineUpdate.rules = contents;
              }
            }
          });
          $(this.$refs.summernoteNote).summernote({
            placeholder: 'Type your text here...',
            height: 100,
            callbacks: {
              onChange: contents => {
              this.campaineUpdate.note = contents;
              }
            }
          });

          $(this.$refs.summernoteCustomMessage).summernote({
            placeholder: 'Type your text here...',
            height: 100,
            callbacks: {
              onChange: contents => {
              this.campaineUpdate.custommessage = contents;
              }
            }
          });
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    },
    methods: {
      offersCampaigenEditData() {
        this.getLoader = true;
        axios
          .get(this.globalVariables.apiUrl+`admin/campaigns/edit/${this.$route.params.id}`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
            this.getAllData                   = res.data;
            this.campaign                     = res.data.campaign;
            this.getOffers                    = res.data.offer;
            this.offerTagString               = res.data.offer.offer_tag;
            this.campaineUpdate.offer_id      = res.data.offer.id;
            this.campaineUpdate.name          = res.data.campaign.name;
            this.campaineUpdate.type          = res.data.campaign.type;
            this.campaineUpdate.trafic_source = res.data.campaign.trafic_source;
            this.campaineUpdate.note          = res.data.campaign.note;
            this.campaineUpdate.rules         = res.data.campaign.rules;
            this.campaineUpdate.phone_number  = res.data.campaign.phone_number;
            $(this.$refs.summernoteRules).summernote('code', res.data.offer.rules ?? '');
            $(this.$refs.summernoteNote).summernote('code', res.data.offer.note ?? '');
            console.log(res.data);
          })
          .catch((error) => {
            return error;
          })
          .finally(() => {
            this.getLoader = false;
          });
      },

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
              this.offersCampaigenEditData();
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
      tagConvart(offerTagString){
        if (this.offerTagString) {
         this.offerTags = this.offerTagString.split(',');
        }
      },
      addQuestionId(id){
        this.campaineUpdate.question_ids.push(id);
      },
    },
  };
  </script>
  <style>
#edit-campaign-offer .country-flag {
	width: 15%;
}
</style>
  