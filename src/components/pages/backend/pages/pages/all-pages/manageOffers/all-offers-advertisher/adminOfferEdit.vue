
<template>
    <div v-if="getLoader">
      <Loader></Loader>
    </div>
    <!-- Content wrapper -->
    <div class="content-wrapper">
      <!-- Content -->
      <!-- {{ OfferCreate }} -->
      <div class="container-fluid flex-grow-1 container-p-y"> 
        <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
        <div class="row mt-4">
          <div id="save-change-form">
            <div class="row">
              <div class="col-md-8">
                <div class="card">
                  <div class="card-header pt-3">
                    <h5 class="card-title mb-0"> Offer Edit</h5>
                  </div>
                  <div class="card-body mt-3">
                    <div class="form-group mb-3">
                    <label for="offer_name" class="required mb-1">Offer Name</label>
                    <input type="text" v-model="offersCreate.offer_name" required id="offer_name" class="form-control" placeholder="Enter Offer Name">
                    <div v-if="validationErrors &&  validationErrors.offer_name" class="text-danger">
                        {{ validationErrors.offer_name[0] }}
                    </div>
                    </div>
  
                    <div class="form-group mb-3">
                    <label for="offer_tag" class="mb-1">Offer Tag</label>
                    <div class="tag-input">
                      <div v-for="(tag, index) in tags" :key="tag" class="tag-input__tag">
                        {{ tag }}
                        <span @click="removeTag(index)">x</span>
                      </div>
                      <input
                        type="text"
                        placeholder="Enter a Tag"
                        class="tag-input__text form-control"
                        @keydown.enter="addTag"
                        @keydown.188="addTag"
                        @keydown.delete="removeLastTag"
                      />
                    </div>
                    </div>
  
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group mb-3">
                          <label for="country" class="mb-1">Country and region</label>
                         <textarea type="text" v-model="offersCreate.country" required id="country" class="form-control"></textarea>
                        </div>
                      </div>
                    </div>
  
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group mb-3">
                          <label for="call_limit" class="mb-1">Call's Limits</label>
                         <textarea  v-model="offersCreate.call_limit" required id="call_limit" class="form-control" placeholder="Enter Call's Limits"></textarea>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group mb-3">
                          <label for="tools" class="mb-1">Tools</label>
                         <textarea  v-model="offersCreate.tools" required id="tools" class="form-control" placeholder="Enter Tools"></textarea>
                        </div>
                      </div>
                    </div>
  
                    <div class="form-group mb-3">
                      <label for="rules" class="mb-1">Rules</label>
                      <Editor api-key="jal9cu31r6q4w7fvp4i1fldbggmn9ai0egqalbhez8afsa86"  :init="editorConfig" v-model="offersCreate.rules"/>
                      <div v-if="validationErrors && validationErrors.rules" class="text-danger">
                          {{ validationErrors.rules[0] }}
                      </div>
                      <!-- <textarea v-model="offersCreate.rules" ref="summernoteRules" required id="rules"></textarea> -->
                    </div>
  
                    <div class="form-group mb-3">
                      <label class="switch">
                      <input type="checkbox" id="togBtn" @click="toggleShowTraffic()">
                      <div class="slider round">
                        <span class="on">ON</span>
                        <span class="off">OFF</span>
                      </div>
                    </label>Traffics
                      <template v-if="showTranffic">
                      <div  id="textareaContainer">
                        <label for="trafics" class="mb-2">Trafics</label>
                        <Editor api-key="jal9cu31r6q4w7fvp4i1fldbggmn9ai0egqalbhez8afsa86"  :init="editorConfigTrafic" v-model="offersCreate.trafics"/>
                        <div v-if="validationErrors && validationErrors.rules" class="text-danger">
                            {{ validationErrors.rules[0] }}
                        </div>
                        <!-- <textarea ref="summernoteTrafics" v-model="offersCreate.trafics"  required id="trafics" class="form-control"></textarea> -->
                      </div>
                    </template>
                    </div>
  
                    <div class="form-group mb-3">
                      <label class="switch">
                        <input type="checkbox" id="togBtn" @click="showDescriptionText()">
                        <div class="slider round">
                          <span class="on">ON</span>
                          <span class="off">OFF</span>
                        </div>
                      </label> Description
                      <div v-if="showDescription" id="textareadescription">
                        <label for="description" class="mb-2">Description</label>
                        <Editor api-key="jal9cu31r6q4w7fvp4i1fldbggmn9ai0egqalbhez8afsa86"  :init="editorConfigDescription" v-model="offersCreate.description"/>
                      <div v-if="validationErrors && validationErrors.rules" class="text-danger">
                          {{ validationErrors.rules[0] }}
                      </div>
                      <!-- <textarea ref="summernoteDescription"  v-model="offersCreate.description" required id="description" class="form-control"></textarea> -->
                      </div>
                    </div>
  
                    <div class="form-group mb-3">
                      <label class="switch">
                        <input type="checkbox" id="togBtn" @click="showImportantText()">
                        <div class="slider round">
                          <span class="on">ON</span>
                          <span class="off">OFF</span>
                        </div>
                      </label>Important Rules
                      <div v-if="showImportant" id="textarearules">
                        <label for="important_rules" class="mb-2">Important Rules</label>
                        <Editor api-key="jal9cu31r6q4w7fvp4i1fldbggmn9ai0egqalbhez8afsa86"  :init="editorConfigImportantRules" v-model="offersCreate.important_rules"/>
                        <div v-if="validationErrors && validationErrors.rules" class="text-danger">
                            {{ validationErrors.rules[0] }}
                        </div>
                      <!-- <textarea  ref="summernoteImportant" v-model="offersCreate.important_rules" required id="important_rules" class="form-control"></textarea> -->
                      </div>
                    </div>
  
                    <div class="row d-flex align-items-end mt-1">
                      <div class="col-12">
                        <table class="w-100 question_table">
                          <thead>
                            <tr class="head" style="vertical-align: start">
                              <td style="width: 80%;">
                                  <label class="form-label required" for="">Questions</label>
                              </td>
                              <td style="width: 10%;" class="text-center">
                                  <label class="form-label required" for="">Required/Optional</label>
                              </td>
                              <td style="width: 10%;" class="text-center">
                                  <label class="form-label required" for="">Attachment</label>
                              </td>
                            </tr>
                            <tr v-for="(row, index) in rows" :key="index" class="mb-3">
                            <td>
                              <input v-model="row.selectedQuestion" @click="showQuestionList(row)" type="text" class="form-control" placeholder="Question?" />
                              <ul class="quslist" v-show="row.showList">
                                <li v-for="question in questionList" @click="selectQuestion(row, question)">
                                  {{ question }}
                                </li>
                              </ul>
                            </td>
                            <td>
                              <input type="checkbox" v-model="row.required" class="custom_selectBox" placeholder="Required Col?" />
                            </td>
                            <td>
                              <input type="checkbox" v-model="row.fileRequired" class="custom_selectBox" placeholder="Required Col?" />
                            </td>
                            <td>
                              <button type="button" class="bg-danger border-0 rounded py-1 px-2 text-white" v-if="index != 0" @click="deleteRow(index)">
                                <i class="fas fa-trash-alt"></i>
                              </button>
                            </td>
                          </tr>
                          </thead>
                          <tbody class="new_field">
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div class="form-group mt-4">
                      <label for="Changes" class="mb-1">Changes</label>
                      <Editor api-key="jal9cu31r6q4w7fvp4i1fldbggmn9ai0egqalbhez8afsa86"  :init="editorConfigImportantChanges" v-model="offersCreate.changes"/>
                      <div v-if="validationErrors && validationErrors.changes" class="text-danger">
                          {{ validationErrors.changes[0] }}
                      </div>
                      <!-- <textarea ref="summernoteChanges"  v-model="offersCreate.changes" required id="Changes" class="form-control"></textarea> -->
                    </div>

                    <div class="row mt-5">
                      <div class="col-12 text-end">
                        <button @click="addRow" type="button" id="add_field" class="border-1 py-1 px-2  bg-transparent btn-primary">
                          <i data-feather="plus" class="me-25"></i>
                          <span>Add New</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card">
                  <div class="card-header pt-3">
                    <h5 class="card-title mb-0">Assign To Advertiser Field</h5>
                  </div>
                  <div class="card-body mt-3">
                    <div class="form-group mb-3">
                    <label for="assign_advertiser" class="mb-1">Advertiser</label>
                    <select v-model="offersCreate.assign_advertiser" id="assign_advertiser" class="form-select">
                      <option value="0">No Assign</option>
                      <option v-for="advertiser in OfferCreate.advertisers" :value="advertiser.id" :key="advertiser.id">{{ advertiser.fname +' '+ advertiser.lname +' -- '+advertiser.company_name }}</option>
                    </select>
                    </div>
  
                    <div class="form-group mb-3">
                    <label for="" class="mb-1">Hold Peiod</label>
                    <input type="text" v-model="offersCreate.hold_period" class="form-control" placeholder="Enter Hold Peiod">
                    </div>
  
                    <div class="form-group mb-3">
                    <label for="" class="mb-1">Appeal Period</label>
                    <input type="text" v-model="offersCreate.appeal_period" class="form-control" placeholder="Enter Appeal Period">
                    </div>
  
                    <div class="form-group mb-3">
                      <label for="" class="mb-1">Owner</label>
                    <input type="text" v-model="offersCreate.owner" class="form-control" placeholder="Enter Owner">
                    </div>
                  </div>
                </div>
  
                <div class="card mt-3">
                  <div class="card-body">
                    <div class="form-group mb-3">
                    <label for="offer_type" class="mb-1">Offer Type</label><br>
                    <select name="offer_type" id="offer_type" v-model="offersCreate.offer_type" class="form-select">
                      <option value="">Select Type</option>
                      <option v-for="offerType in OfferCreate.offerTypes" :value="offerType.id" :key="offerType.id">{{ offerType.type}}</option>
                    </select>
                    </div>
  
                    <div class="form-group mb-3">
                      <label for="category" class="mb-1">Category</label><br>
                    <select name="category" id="category" v-model="offersCreate.category" class="form-select">
                      <option value="">Select Type</option>
                      <option v-for="categoryOffer in OfferCreate.categoryOffers" :value="categoryOffer.id" :key="categoryOffer.id">{{ categoryOffer.name}}</option>
                    </select>
                    </div>
  
                    <div class="form-group mb-3">
                      <label for="category" class="mb-1">Primary Country</label><br>
                        <select name="primary_country" id="primary_country" v-model="offersCreate.primary_country" class="form-select">
                        <PrimaryCountry></PrimaryCountry>
                      </select>
                    </div>
  
                    <div class="form-group mb-3">
                      <label for="allow_trafic" class="mb-1">Allow Traffic</label><br>
                      <!-- class="js-select2" ref="select2" -->
                      <select v-model="offersCreate.allow_trafic" class="js-select2" ref="select2" multiple>
                        <option v-for="allow in OfferCreate.allowTratic" :value="allow.id" :key="allow.id" :selected="offersCreate.allow_trafic.includes(allow.id)">
                          {{ allow.title }}
                        </option>
                      </select>
                    </div>
  
                    <div class="form-group mb-3">
                    <label for="pay_out" class="mb-1">Pay Out</label>
                    <input type="text" v-model="offersCreate.pay_out" id="pay_out" class="form-control" placeholder="Enter Tools">
                    </div>
  
                    <div class="form-group mb-3">
                      <label for="landing_page" class="mb-1">Landing Page</label>
                    <input type="text" v-model="offersCreate.landing_page" id="landing_page" class="form-control" placeholder="Enter Landing Page">
                    </div>
  
                    <div class="form-group mb-3">
                      <label for="marchent_allow" class="mb-1">Merchant is allowed to refuse calls</label>
                    <input type="text" v-model="offersCreate.marchent_allow" id="marchent_allow" class="form-control" placeholder="Enter Merchant is allowed to refuse calls">
                    </div>
  
                    <div class="form-group mb-3">
                      <label for="materials_moderation" class="mb-1">Materials moderation</label>
                    <input type="text" v-model="offersCreate.materials_moderation" id="materials_moderation" class="form-control" placeholder="Enter Materials moderation">
                    </div>
  
                    <div class="form-group mb-3">
                    <label for="stats" class="mb-1">Status</label>
                    <select name="status" id="status" v-model="offersCreate.status" class="form-select">
                    <option value="">Select Status</option>
                    <option value="0">Pending</option>
                    <option value="1">Approved</option>
                    <option value="2">Pause</option>
                    <option value="3">Resume</option>
                    </select>
                    </div>
                    <div class="form-check form-switch">
                      <input  v-model="offersCreate.featured" :true-value="1" :false-value="0" type="checkbox" id="featured" class="form-check-input">
                    <label for="featured" class="form-check-label mb-1">Featured</label>
                  </div>
                    <div class="form-group mb-3 text-right mt-2">
                      <button type="button" @click="offersEditSave" class="btn btn-primary save_btn">
                        <i class="fas fa-check fa-sm me-1"></i>Update
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
  import Loader from '../../../../../include/loader.vue';
  import Breadcrumb from '../../../../../include/breadcrumb.vue';
  import toastr from "toastr";
  import "toastr/build/toastr.min.css";  
  import PrimaryCountry from '../../../../../include/Primary_country.vue'
  import { inject } from "vue";
  import { fetchUserRole } from "@/services/userService";
  import Editor from '@tinymce/tinymce-vue';
  
  export default {
    setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
    props:['OfferCreate'],
    components:{
      Loader,
      Breadcrumb,
      PrimaryCountry,
      Editor ,
    },
    data() {
      return {
      editorConfig: {
        referrer_policy: "origin",
        height: 270,
        menubar: true,
        plugins: 'lists link image table code help wordcount',
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        image_title: true,
        automatic_uploads: true,
        file_picker_types: 'image',
        file_picker_callback: (cb, value, meta) => {
          const input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'image/*');

          input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.addEventListener('load', () => {
              const id = 'blobid' + (new Date()).getTime();
              const blobCache = tinymce.activeEditor.editorUpload.blobCache;
              const base64 = reader.result.split(',')[1];
              const blobInfo = blobCache.create(id, file, base64);
              blobCache.add(blobInfo);
              cb(blobInfo.blobUri(), { title: file.name });
            });
            reader.readAsDataURL(file);
          });
          input.click();
        },
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
      },
      editorConfigTrafic: {
        referrer_policy: "origin",
        height: 270,
        menubar: true,
        plugins: 'lists link image table code help wordcount',
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        image_title: true,
        automatic_uploads: true,
        file_picker_types: 'image',
        file_picker_callback: (cb, value, meta) => {
          const input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'image/*');

          input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.addEventListener('load', () => {
              const id = 'blobid' + (new Date()).getTime();
              const blobCache = tinymce.activeEditor.editorUpload.blobCache;
              const base64 = reader.result.split(',')[1];
              const blobInfo = blobCache.create(id, file, base64);
              blobCache.add(blobInfo);
              cb(blobInfo.blobUri(), { title: file.name });
            });
            reader.readAsDataURL(file);
          });
          input.click();
        },
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
      },
      editorConfigDescription: {
        referrer_policy: "origin",
        height: 270,
        menubar: true,
        plugins: 'lists link image table code help wordcount',
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        image_title: true,
        automatic_uploads: true,
        file_picker_types: 'image',
        file_picker_callback: (cb, value, meta) => {
          const input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'image/*');

          input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.addEventListener('load', () => {
              const id = 'blobid' + (new Date()).getTime();
              const blobCache = tinymce.activeEditor.editorUpload.blobCache;
              const base64 = reader.result.split(',')[1];
              const blobInfo = blobCache.create(id, file, base64);
              blobCache.add(blobInfo);
              cb(blobInfo.blobUri(), { title: file.name });
            });
            reader.readAsDataURL(file);
          });
          input.click();
        },
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
      },
      editorConfigImportantRules: {
        referrer_policy: "origin",
        height: 270,
        menubar: true,
        plugins: 'lists link image table code help wordcount',
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        image_title: true,
        automatic_uploads: true,
        file_picker_types: 'image',
        file_picker_callback: (cb, value, meta) => {
          const input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'image/*');

          input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.addEventListener('load', () => {
              const id = 'blobid' + (new Date()).getTime();
              const blobCache = tinymce.activeEditor.editorUpload.blobCache;
              const base64 = reader.result.split(',')[1];
              const blobInfo = blobCache.create(id, file, base64);
              blobCache.add(blobInfo);
              cb(blobInfo.blobUri(), { title: file.name });
            });
            reader.readAsDataURL(file);
          });
          input.click();
        },
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
      },
      editorConfigImportantChanges: {
        referrer_policy: "origin",
        height: 270,
        menubar: true,
        plugins: 'lists link image table code help wordcount',
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        image_title: true,
        automatic_uploads: true,
        file_picker_types: 'image',
        file_picker_callback: (cb, value, meta) => {
          const input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'image/*');

          input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.addEventListener('load', () => {
              const id = 'blobid' + (new Date()).getTime();
              const blobCache = tinymce.activeEditor.editorUpload.blobCache;
              const base64 = reader.result.split(',')[1];
              const blobInfo = blobCache.create(id, file, base64);
              blobCache.add(blobInfo);
              cb(blobInfo.blobUri(), { title: file.name });
            });
            reader.readAsDataURL(file);
          });
          input.click();
        },
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
      },
        select2Instance: [],
        selectedQuestion: '',
        rows: [{ question: '', required: false, fileRequired: false }], 
        questionList: [],
        showTranffic : false,
        showDescription : false,
        showImportant : false,
        tags: [],
        getLoader: false,
        breadcrumbs: [
          { label: "Dashboard", url: "/dashboard" },
          { label: "Offers", url: "/admin-offers" },
          { label: "Edit", url: "" },
        ],
        offersCreate: {
          updated_id : "",
          offer_name: "",
          offer_tag: "",
          country: "",
          call_limit: "",
          tools: "",
          rules: "",
          trafics: "",
          description: "",
          important_rules: "",
          questions: [],
          file_col: [],
          required_col: [],
          changes : "",
          assign_advertiser: "",
          hold_period: "",
          appeal_period: "",
          owner: "",
          offer_type: "",
          category: "",
          primary_country : "",
          allow_trafic: [],
          pay_out: "",
          featured: "",
          landing_page: "",
          marchent_allow: "",
          materials_moderation: "",
          status: "",
          offer_role_type : "advertiser",
        },
        validationErrors: null,
        selectedAllowTrafic : [],
      };
    },
   async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role == 'Super' || role == 'Admin') {
          this.offersEditedData();
          this.getAllQuestions();
        document.addEventListener('click', this.hideQuestionList);
        const vm = this;
        $(this.$refs.select2).select2({
          closeOnSelect: false,
          placeholder: "Choose Allow Trafic",
          allowClear: true,
          tags: true
        }).on('change', function() {
          vm.selectedAllowTrafic = $(this).val() || [];
        });
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    },
    watch: {
    selectedAllowTrafic: {
      handler(newVal) {
        if (!Array.isArray(newVal)) {
          newVal = [newVal]; 
        }
      },
      deep: true 
    }
    },
    methods: {
      getAllQuestions(){
      axios
          .get(this.globalVariables.apiUrl + "admin/offer-question/offer-create", {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          })
          .then((res) => {
            this.questionList = res.data.data;
          })
          .catch((e) => {
            return e;
          })
          .finally(() => {
            this.getLoader = false;
          });
    },
      offersEditedData() {
            this.getLoader = true;
        axios
          .get(this.globalVariables.apiUrl+`admin/offers/edit/${this.$route.params.id}`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
            this.offersCreate.updated_id = res.data.offer.id;
            this.tags                    = res.data.offer.offer_tag && res.data.offer.offer_tag.split(/\s*,\s*/);
            this.offersCreate.offer_name = res.data.offer.name ?? '';
            this.offersCreate.country    = res.data.offer.country ?? '';
            this.offersCreate.call_limit = res.data.offer.call_limit ?? '';
            this.offersCreate.tools      = res.data.offer.tools ?? '';
            this.offersCreate.rules           = res.data.offer.rules ?? '';
            this.offersCreate.trafics         = res.data.offer.trafics ?? '';
            this.offersCreate.description     = res.data.offer.description ?? '';
            this.offersCreate.important_rules = res.data.offer.important_rules ?? '';
            this.rows                         = [];
            if(res.data.questions.length != 0){
              res.data.questions.forEach(getdata => {
                this.rows.push({ selectedQuestion: getdata.question, required: getdata.required_col == 1 ? true : false, fileRequired: getdata.file_col == 1 ? true : false });
            });
            }
            this.offersCreate.assign_advertiser    = res.data.offer.assign_user_id ?? '';
            this.offersCreate.hold_period          = res.data.offer.hold_period ?? '';
            this.offersCreate.appeal_period        = res.data.offer.appeal_period ?? '';
            this.offersCreate.owner                = res.data.offer.owner ?? '';
            this.offersCreate.offer_type           = res.data.offer.type_id ?? '';
            this.offersCreate.category             = res.data.offer.category_id ?? '';
            this.offersCreate.primary_country      = res.data.offer.primary_country_code ?? '';
            this.offersCreate.allow_trafic         = res.data.offer.allow_trafic ?? '';
            this.selectedAllowTrafic               = res.data.offer.allow_trafic ?? '';
            this.offersCreate.pay_out              = res.data.offer.pay_out ?? '';
            this.offersCreate.featured             = res.data.offer.featured == 1 ? '1' : '0';
            this.offersCreate.landing_page         = res.data.offer.landing_page ?? '';
            this.offersCreate.marchent_allow       = res.data.offer.marchent_allow ?? '';
            this.offersCreate.materials_moderation = res.data.offer.materials_moderation ?? '';
            this.offersCreate.status               = res.data.offer.status ?? '';
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
      offersEditSave() {
            this.getLoader = true;
            if(this.tags != null){
              var allTags                    = this.tags.join(",");
              this.offersCreate.offer_tag    = allTags;
            }else{
              this.offersCreate.offer_tag    = '';
            }
            this.offersCreate.questions    = this.rows.map(row => ({ question: row.selectedQuestion }));
            this.offersCreate.file_col     = this.rows.map(row => ({ required_col: row.fileRequired }));
            this.offersCreate.required_col = this.rows.map(row => ({ required_col: row.required }));
            this.offersCreate.allow_trafic = this.selectedAllowTrafic;
        axios
          .post(this.globalVariables.apiUrl+"admin/offers/update", this.offersCreate, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
            if(res.data.status == 'success'){
              toastr.success(res.data.message);
              this.$router.push("/admin-offers-advertiser");
            }else{
              toastr.error(res.data.message);
            }
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
      showQuestionList(row) {
        row.showList = !row.showList;
      },
      selectQuestion(row, question) {
        row.selectedQuestion = question;
        row.showList = false;
      },
      addRow() {
        this.rows.push({ selectedQuestion: '', required: false, fileRequired: false, showList: false });
      },
      deleteRow(index) {
        this.rows.splice(index, 1); 
      },
      hideQuestionList(event) {
        if (!event.target.classList.contains('quslist') && !event.target.closest('.quslist') && event.target.type !== 'text') {
          this.showList = false;
        }
      },
      addTag(event) {
        event.preventDefault();
        let val = event.target.value.trim();
        if (val.length > 0) {
          if (this.tags.length >= 1) {
            for (let i = 0; i < this.tags.length; i++) {
              if (this.tags[i] === val) {
                return false;
              }
            }
          }
          this.tags.push(val);
          event.target.value = "";
        }
      },
      removeTag(index) {
        this.tags.splice(index, 1);
      },
      removeLastTag(event) {
        if (event.target.value.length === 0) {
          this.removeTag(this.tags.length - 1);
        }
      },
    toggleShowTraffic() {
      this.showTranffic = !this.showTranffic;
      if(this.showTranffic == true){
        setTimeout(() => {
          $(this.$refs.summernoteTrafics).summernote({
            placeholder: 'Type your text here...',
            height: 100,
            callbacks: {
              onChange: contents => {
              this.offersCreate.trafics = contents;
              }
            }
          });
        }, 20);
      }
    },
    showDescriptionText(){
     this.showDescription = !this.showDescription;
     if(this.showDescription == true){
        setTimeout(() => {
          $(this.$refs.summernoteDescription).summernote({
            placeholder: 'Type your text here...',
            height: 100,
            callbacks: {
              onChange: contents => {
              this.offersCreate.description = contents;
              }
            }
          });
        }, 20);
      }
    },
    showImportantText(){
     this.showImportant = !this.showImportant;
     if(this.showImportant == true){
        setTimeout(() => {
          $(this.$refs.summernoteImportant).summernote({
          placeholder: 'Type your text here...',
          height: 100,
          callbacks: {
            onChange: contents => {
            this.offersCreate.important_rules = contents;
            }
          }
        });
        }, 20);
      }
    },
    },
  };
  </script>
  
<style>
  body {
      overflow-x: hidden;
  }
  #save-change-form .switch {
	position: relative;
	display: inline-block;
	width: 60px;
	height: 40px;
}

#save-change-form .switch input {
  display: none;
}

#save-change-form .slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ecf0fa;
  -webkit-transition: .4s;
  transition: .4s;
}

#save-change-form .slider::before {
	position: absolute;
	content: "";
	height: 39px;
	width: 8px;
	bottom: 0px;
	background-color: #fff;
	-webkit-transition: .4s;
	transition: .4s;
	border-top-left-radius: 4px !important;
	border-bottom-left-radius: 4px !important;
}

#save-change-form input:checked + .slider {
  background-color: #0162e8;
}

#save-change-form input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

#save-change-form input:checked + .slider:before {
  -webkit-transform: translateX(55px);
  -ms-transform: translateX(55px);
  transform: translateX(52px);
}

/*------ ADDED CSS ---------*/
#save-change-form .on {
  display: none;
}

#save-change-form .on, #save-change-form  .off {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  font-size: 10px;
  font-family: Verdana, sans-serif;
  user-select:none;
}
#save-change-form  .off {
  color: #2f3349;
}
#save-change-form .on{
  color: #fff;
}

#save-change-form input:checked + .slider .on {
  display: block;
}

#save-change-form  input:checked + .slider .off {
  display: none;
}

/*--------- END --------*/

/* Rounded sliders */
#save-change-form  .slider.round {
  border-radius: 2px;
}

#save-change-form  .slider.round:before {
  border-radius: 0%;
}
.select2-container--default .select2-selection--multiple .select2-selection__choice {
	background: #0162e8 !important;
	color: white !important;
}
.select2-container--default .select2-selection--multiple .select2-selection__choice__remove {
	color: white !important;
}
.select2.select2-container.select2-container--default {
	width: 100% !important;
}
</style>
<style scoped>
  
  .custom_selectBox {
      display: block;
      width: 100%;
      height: 20px;
      padding: 0.375rem 0.75rem;
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.5;
      color: #4d5875;
      background-color: #fff;
      background-clip: padding-box;
      border: 1px solid #e1e5ef;
      border-radius: 3px;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  .btn-light {
      background-color: #fcfcff !important;
      border-color: #fff !important;
  }
  a {
    position: absolute;
    right: 15px;
    bottom: 15px;
    font-weight: bold;
    text-decoration: none;
    color: #00003a;
    font-size: 20px;
  }
  
  /*tag input style*/
  
  .tag-input[data-v-518086b5] {
      border: 1px solid #d9dfe7;
      background: #fff;
      border-radius: 4px;
      font-size: 0.9em;
      box-sizing: border-box;
      margin-bottom: 10px;
  }
  
  .tag-input__tag {
    height: 24px;
    color: white;
    float: left;
    font-size: 14px;
    margin-right: 10px;
    background-color: #667eea;
    border-radius: 15px;
    margin-top: 10px;
    line-height: 24px;
    padding: 0 8px;
    font-family: unset;
  }
  
  .tag-input__tag > span {
    cursor: pointer;
    opacity: 0.75;
    display: inline-block;
    margin-left: 8px;
  }
  
  .tag-input__text {
    border: none;
    outline: none;
    font-size: 1em;
    background: none;
  }
  .quslist {
	padding: 0;
	border: 1px solid lavender;
	position: absolute;
	background: white;
	width: 73%;
	z-index: 99;
	max-height: 200px;
	overflow: scroll;
	scroll-behavior: smooth;
	scrollbar-color: #0162e8 white;
	scrollbar-width: thin;
}
.quslist li {
	padding: 4px 10px;
	cursor: pointer;
	line-height: 30px;
	border-left: 3px solid transparent;
}
.quslist li:hover {
	background: #ededed;
	transition: 0.3s ease;
	border-left: 3px solid #0162e8;
}
.tag-input{
	border: 1px solid #dbdade;
}
  </style>