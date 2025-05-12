
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
            <!-- <h3 class="mb-0">Assign Campaign</h3> -->
            <form >
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-flex align-items-center">
                                <RouterLink :to="'/admin-offers-view/'+getOffers.id" class="sub-heading d-flex align-items-center">
                                    <img class="country-flag-campaigen" :src="getAllData.primary_country_code" alt=""> {{ getOffers.name }}
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
                    
                    <div class="card mt-4">
                        <div class="card-header custom-card-header border-bottom">
                            <h5 class="card-title mb-0">New Create Campaign</h5>
                        </div>
                        <div class="card-body mt-3">
                            <div class="row-mb">
                                <div class="row">
                                  <div class="col-md-2">
                                    <label for="Publisher" class="required">Publisher</label>
                                  </div>
                                  <div class="col-md-10">
                                  <template v-if="getAllData && getAllData.publishers">
                                    <select v-model="campaineCreate.Publisher" id="Publisher" class="form-select">
                                      <option value="">Select Publisher</option>
                                      <option v-for="(user,index) in getAllData.publishers" :value="user.id" :key="index">{{ user.name}}</option>
                                    </select>
                                  </template>
                                  </div>
                                </div>

                                <div class="row mt-3">
                                  <div class="col-md-2">
                                    <label for="name" class="required">Campaign Name</label>
                                  </div>
                                  <div class="col-md-10">
                                        <input type="text" v-model="campaineCreate.name" id="name" class="form-control" placeholder="Enter Campaign Name">
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
                                    <input type="text" v-model="campaineCreate.type" id="type" class="form-control" placeholder="Enter Type">
                                  </div>
                                </div>

                                <div class="row mt-3">
                                  <div class="col-md-2">
                                    <label for="phone_number">Phone Number</label>
                                  </div>
                                  <div class="col-md-10">
                                    <input type="number" v-model="campaineCreate.phone_number" id="phone_number" class="form-control" placeholder="Enter Phone Number">
                                  </div>
                                </div>

                                <div class="row mt-3">
                                  <div class="col-md-2">
                                    <label for="trafic_source">Traffic source</label>
                                  </div>
                                  <div class="col-md-10">
                                    <input type="text" v-model="campaineCreate.trafic_source" id="trafic_source" class="form-control" placeholder="Enter Traffic source">
                                  </div>
                                </div>

                                <div class="row mt-3">
                                  <div class="col-md-2">
                                    <label for="rules">Rules</label>
                                  </div>
                                  <div class="col-md-10">
                                    <textarea  ref="summernoteRules" rows="4" v-model="campaineCreate.rules" required id="rules" class="form-control"></textarea>
                                  </div>
                                </div>

                                <div class="row mt-3">
                                  <div class="col-md-2">
                                    <label for="note">Note</label>
                                  </div>
                                  <div class="col-md-10">
                                    <textarea  ref="summernoteNote" rows="4" v-model="campaineCreate.note" required id="note" class="form-control"></textarea>
                                  </div>
                                </div>

                                <div class="row mt-3" v-if="getAllData && getAllData.offer_question">
                                    <div class="col-md-2">
                                        <label for="" class="col-form-label">Offer Questions</label>
                                    </div>
                                    <div class="col-md-10">
                                      <template v-for="(offer, index) in getAllData.offer_question" :key="index">
                                        <label :for="'answer_' + index" class="col-form-label">{{ offer.question }}</label>
                                        <input v-model="campaineCreate.answers[index]" type="text" class="form-control" placeholder="Your answer?">
                                        {{ addQuestionId(offer.id) }}
                                      </template>    
                                    </div>
                                </div>

                                <div v-if="getOffers.important_rules" class="row mt-3">
                                    <div class="col-md-2">
                                        <label for="" class="col-form-label">Important Rules</label>
                                    </div>
                                    <div class="col-md-10" v-html="getOffers.important_rules"></div>
                                </div>

                                <div class="row mt-3">
                                    <div class="col-12 text-end">
                                      <button  @click="offersCampaigenDataSave" type="button" class="btn btn-sm btn-primary mr-2 text-capitalize">
                                        Submit For Moderation
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
          { label: "Offers", url: "/admin-offers" },
          { label: "Campaign", url: "/admin-campaigns-index" },
          { label: "Create", url: "" },
        ],
        
        campaineCreate: {
            Publisher                 : "",
            answers                   : [],
            question_ids              : [],
            offer_id                  : "",
            offer_campaign_material_id: "",
            name                      : "",
            type                      : "",
            trafic_source             : "",
            note                      : "",
            rules                     : "",
            phone_number              : "",
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
          this.offersCampaigenData();
          $(this.$refs.summernoteRules).summernote({
            placeholder: 'Type your text here...',
            height: 100,
            callbacks: {
              onChange: contents => {
              this.campaineCreate.rules = contents;
              }
            }
          });
          $(this.$refs.summernoteNote).summernote({
            placeholder: 'Type your text here...',
            height: 100,
            callbacks: {
              onChange: contents => {
              this.campaineCreate.note = contents;
              }
            }
          });
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    },
    methods: {
      offersCampaigenData() {
        this.getLoader = true;
        axios
          .get(this.globalVariables.apiUrl+`admin/campaigns/create/${this.$route.params.id}`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
            this.getAllData              = res.data;
            this.campaineCreate.offer_id = res.data.offer.id;
            this.getOffers                  = res.data.offer;
            this.offerTagString             = res.data.offer.offer_tag;
            $(this.$refs.summernoteRules).summernote('code', res.data.offer.rules ?? '');
          })
          .catch((error) => {
            return error;
          })
          .finally(() => {
            this.getLoader = false;
          });
      },

      offersCampaigenDataSave() {
        this.getLoader = true;
        axios
          .post(this.globalVariables.apiUrl+"admin/campaigns/offer/assign/store", this.campaineCreate, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
              toastr.success(res.data.message);
              this.$router.push("/admin-campaigns-user");
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
        this.campaineCreate.question_ids.push(id);
      },
    },
  };
  </script>
  

<style scoped>
.country-flag-campaigen{
  width: 30px;
  margin-right: 5px;
}
</style>