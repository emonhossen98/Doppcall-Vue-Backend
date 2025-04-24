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
          <div class="col-12">
                <div class="card" v-if="faqs.length > 0">
                    <div class="card-header py-2">
                        <h5 class="title mb-0 mt-2">FAQ</h5>
                    </div>
                    <div class="card-body">
                      <div class="accordion pb-5  mx-4" id="faqAccordionSection">
                        <div class="accordion-item mb-3" v-for="(faq,index) in faqs" :key="index">
                          <h2 class="accordion-header" :id="'heading'+faq.id">
                            <button class="accordion-button py-4" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse-'+faq.id" aria-expanded="true" :aria-controls="'collapse-'+faq.id">
                              {{ faq.faq_qustion }}
                            </button>
                          </h2>
                          <div :id="'collapse-'+faq.id" class="accordion-collapse collapse" :class="index == 0 ? 'show' : ''" :aria-labelledby="'heading'+faq.id" data-bs-parent="#faqAccordionSection">
                            <div class="accordion-body py-3"  v-html="faq.faq_ans">
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
        breadcrumbs: [
          { label: "Dashboard", url: "/publisher/dashboard" },
          { label: "FAQ", url: "" },
        ],
        getLoader: false,
        faqs: "",
      };
    },
    async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRolePublisher();
        if (role == 'Publisher') {
          this.getPublisherNoticeGuide();
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    },
    methods: {
      getPublisherNoticeGuide() {
        this.getLoader = true;
        axios
          .get(this.globalVariables.apiUrl+"publisher/faq", {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          })
          .then((res) => {
            this.faqs = res.data.faqs
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
  <style scoped>
  .heading-btn button.btn:not(.collapsed) {
      background-color: var(--primary-color);
      color: #fdfafa;

  }
  .heading-btn button.btn {
      width: 100%;
      text-align: left;
      border: 1px solid #ccc;
      position: relative;
      color: var(--primary-color);
      font-weight: 500;
      font-size: 16px;
  }
  .active {
      color: var(--primary-color);
  }
  .body-accordion{
      border-left: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      border-right: 1px solid #ccc;
          }
          .accordion-card {
      margin-bottom: 10px;
  }
  .accordion-card:last-child{
      margin-bottom: 0;
  }
  .heading-btn button.btn::after {
      color: #ffffff;
      position: absolute;
      font-family: "Font Awesome 5 Free";
      font-weight: 900;
      content: "\f067";
      right: 13px;
      font-size: 14px;
      top: 50%;
      transform: translateY(-50%);
  }
  .heading-btn button.collapsed::after{
      position: absolute;
      font-family: "Font Awesome 5 Free";
      font-weight: 900;
      content: "\f068";
      right: 13px;
      font-size: 14px;
      top: 50%;
      color: var(--primary-color);
      transform: translateY(-50%);
  }
  #faqAccordionSection button {
    background : #012964;
    color: white;
  }
</style>