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
                                <a href="javascript:">{{ campaiganData.name }}</a>
                                <span class="badge" :class="campaiganData.convert_status_color">
                                    <p class="mb-0 text-white font-class" v-html="campaiganData.convert_status"></p>
                                </span>
                            </h5>
                            <div>
                                <table class="table table-hover mb-0 text-md-nowrap mt-4">
                                    <tbody>
                                        <tr v-if="campaiganData.name">
                                            <th style="width: 25%">Campaign Name</th>
                                            <td>{{ campaiganData.name }}</td>
                                        </tr>

                                        <tr v-if="campaiganData.type">
                                            <th style="width: 25%">Type</th>
                                            <td>{{ campaiganData.type }}</td>
                                        </tr> 

                                        <tr v-if="campaiganData.phone_number">
                                            <th style="width: 25%">Phone Number</th>
                                            <td>{{ campaiganData.phone_number }}</td>
                                        </tr>
                                        
                                        <tr v-if="campaiganData.trafic_source">
                                            <th style="width: 25%">Trafic Source</th>
                                            <td>{{ campaiganData.trafic_source }}</td>
                                        </tr> 

                                            <tr v-if="campaiganData.rules"> 
                                                <th style="width: 25%">Rules</th>
                                                <td v-html="campaiganData.rules"></td>
                                            </tr> 

                                            <tr v-if="campaiganData.note">
                                                <th style="width: 25%">Note</th>
                                                <td>{{ campaiganData.note }}</td>
                                            </tr> 

        
                                            <tr v-if="materials.length > 0">
                                                <th style="width: 25%">Material</th>
                                                <td>
                                                    <div v-for="(material, index) in materials" :key="index" class="box-material">
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
                                                            <span>
                                                            <img style="width: 100px" :src="globalVariables.appUrl+material.screenshot" alt="">
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr v-if="questionAnser.length > 0">
                                                <th style="width: 25%">Question</th>
                                                <td></td>
                                            </tr> 
                                    </tbody>
                                </table>
                                    <div class="panel-group1" id="accordion11" v-if="questionAnser.length > 0">
                                            <div class="panel panel-default  mb-4" v-for="(answer,index) in questionAnser">
                                                <div class="panel-heading1 bg-primary ">
                                                    <h4 class="panel-title1">
                                                        <a class="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion11" :href="'#collapse'+answer.id" aria-expanded="false"><i class="fas fa-arrow-right"></i> {{ answer.question }}</a>
                                                    </h4>
                                                </div>
                                                <div :id="'collapse'+answer.id" class="panel-collapse collapse" :class="index == 0 ? 'show' : ''" role="tabpanel" aria-expanded="false" style="">
                                                    <div class="panel-body border">
                                                        {{ answer.answer }}
                                                    </div>
                                                </div>
                                            </div>
                                    </div>
                                
                                <form style="margin-bottom: 10px;">
                                            <div class="row d-flex align-items-end mt-1">
                                        <div class="col-12">
                                            <table class="w-100 question_table">
                                                <thead>
                                                    <tr class="head" style="vertical-align: start">
                                                        <td style="width: 80%;">
                                                            <label class="form-label required" for="">Aditional Questions</label>
                                                        </td>
                                                    </tr>
                                                    <tr style="vertical-align: top">
                                                        <td style="padding-right: 10px;" class="pt-2">
                                                            <textarea v-model="chat.chat" class="form-control"></textarea>
                                                        </td>
                                                    </tr>
                                                </thead>
                                            </table>
                                        </div>
                                    </div>
                                            <div class="row mt-3">
                                        <div class="col-12 text-end">
                                            <button type="button" @click="submitChart()" class="btn btn-sm btn-primary text-right ml-1"><i class="fas fa-check fa-sm me-1"></i>
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                   </form>
                                   
                                   <div class='com-chat'>
                                       <ul>
                                       <template v-if="chats.length > 0">
                                        <li v-for="(chat,index) in chats" :key="index">
                                            <div style="
                                                border: 1px solid;
                                                border-radius: 5px;
                                                padding: 10px;
                                                margin-bottom: 5px;
                                            ">
                                                <b class="me-2">{{chat.user_name}}</b>
                                                <small>{{chat.convart_created}}</small>
                                                <p>{{chat.chat}}</p>
                                            </div>
                                            </li>
                                       </template>
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
          { label: "Campaigns", url: "/publisher-offer-campaigns" },
          { label: "View", url: "" },
        ],
        getLoader: false,
        campaiganData : "",
        materials : "",
        questionAnser : "",
        chats : "",
        chat : {
            campaign_id : "",
            chat : "",
       }
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
          .get(this.globalVariables.apiUrl+`publisher/offers/campaign/view/${this.$route.params.id}`, {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          })
          .then((res) => {
            this.chat.campaign_id = res.data.campaign.id;
            this.campaiganData    = res.data.campaign;
            this.materials        = res.data.materials;
            this.questionAnser    = res.data.questionAnser;
            this.chats            = res.data.chats;
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.getLoader = false;
          });
      },

      submitChart() {
        this.getLoader = true;
        axios 
          .post(this.globalVariables.apiUrl+`offers/campaign/chat`, this.chat ,{
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          })
          .then((res) => {
            toastr.success(res.data.message);
            this.chat.chat = '';
            this.getPusbliserData();
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
 