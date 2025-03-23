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
                <div class="card-header">
                    <h5 class="card-title mb-0 mt-2">New Create Question</h5>
                </div>
                <div class="card-body">
                    <form class="mt-3">
                        <div class="row-mb">
                            <div class="row">
                            <div class="col-sm-2">
                             <label for="faqservice_id" class="required">FAQ Service Name</label>
                            </div>
                            <div class="col-sm-10">
                             <select v-model="questionCreateData.faqservice_id" id="faqservice_id" required class="form-select">
                                <option value="">Select FAQ Service</option>
                                <option v-for="(servic , index) in QuestionsCreateData.service" :value="servic.id" :key="index">{{ servic.service_name }}</option>
                             </select>
                             <div v-if="validationErrors && validationErrors.faqservice_id" class="text-danger">
                                {{ validationErrors.faqservice_id[0] }}
                            </div>
                            </div>
                            </div>
                            <div class="row mt-4">
                                <div class="col-sm-2">
                                    <label for="faq_qustion" class="required">FAQ Question</label>
                                </div>
                                <div class="col-sm-10">
                                    <input type="text" v-model="questionCreateData.faq_qustion" id="faq_qustion" class="form-control" required>
                                    <div v-if="validationErrors && validationErrors.faq_qustion" class="text-danger">
                                        {{ validationErrors.faq_qustion[0] }}
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-4">
                                <div class="col-sm-2">
                                    <label for="faq_ans" class="required">FAQ Answer</label>
                                </div>
                                <div class="col-sm-10">
                                    <textarea v-model="questionCreateData.faq_ans" id="faq_ans" cols="30" rows="3" class="form-control" required></textarea>
                                    <div v-if="validationErrors && validationErrors.faq_ans" class="text-danger">
                                        {{ validationErrors.faq_ans[0] }}
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-4">
                                <div class="col-sm-2">
                                    <label for="status" class="required">Status</label>
                                </div>
                                <div class="col-sm-10">
                                    <select v-model="questionCreateData.status" id="status" class="form-select" required>
                                        <option value="1">Publish</option>
                                        <option value="0">Pending</option>
                                    </select>
                                    <div v-if="validationErrors && validationErrors.status" class="text-danger">
                                        {{ validationErrors.status[0] }}
                                    </div>
                                </div>
                            </div>
                            <div class="form-group text-end mt-4">
                                <button type="button" @click="QuestionsSave" class="btn btn-primary btn-sm">
                                    <i class="fas fa-check fa-sm me-2"></i>
                                    Update
                                </button>
                            </div>
                        </div>
                    </form>

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
import Loader from "../../../../../include/loader.vue";
import Breadcrumb from "../../../../../include/breadcrumb.vue";
import { inject } from "vue";
import { fetchUserRole } from "@/services/userService";

export default {
  setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
    props : ['QuestionsCreateData'],
    components: {
    Loader,
    Breadcrumb,
  },
  data() {
    return {
        breadcrumbs: [
        { label: "Dashboard", url: "/dashboard" },
        { label: "FAQ", url: "" },
        { label: "Questions", url: "/admin-faq-questions" },
        { label: "Edit", url: "" },
      ],  
      getLoader: false,
      questionCreateData: {
        faqservice_id : "",
        faq_qustion : "",
        faq_ans : "",
        status : "",
      },
      validationErrors : null,
    };
  },
  async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role == 'Super' || role == 'Admin') {
          this.QuestionsEditData();
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    },
  methods: {
      QuestionsEditData(){
        this.getLoader = true;
        axios.get(this.globalVariables.apiUrl+`admin/faq/questions/edit/${this.$route.params.id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          },
        })
        .then((res) => {
            this.questionCreateData.faqservice_id = res.data.faq.faqservice_id;
            this.questionCreateData.faq_qustion = res.data.faq.faq_qustion;
            this.questionCreateData.faq_ans = res.data.faq.faq_ans;
            this.questionCreateData.status = res.data.faq.status;
        })
        .catch((error) => {
           console.log(error);
        })
        .finally(() => {
            this.getLoader = false;
        })
    },

      QuestionsSave(){
        this.getLoader = true;
        axios.post(this.globalVariables.apiUrl+`admin/faq/questions/update/${this.$route.params.id}`, this.questionCreateData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          },
        })
        .then((res) => {
            toastr.success(res.data.message);
            this.$router.push('/admin-faq-questions');
        })
        .catch((error) => {
            if(error && error.response && error.response.data && error.response.data.errors){
              this.validationErrors = error.response.data.errors;
            }
        })
        .finally(() => {
            this.getLoader = false;
        })
    },
  },
};
</script>
