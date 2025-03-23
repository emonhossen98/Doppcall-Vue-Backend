<template>
    <div v-if="getLoader">
      <Loader></Loader>
    </div>
    <!-- Content wrapper -->
    <div class="content-wrapper">
      <!-- Content -->
      <div class="container-xxl flex-grow-1 container-p-y">
        <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
            <div class="row row-sm mt-4">
                <div class="col-md-12 col-12 mx-auto">
                <div class="card">
                    <div class="card-header custom-card-header border-bottom">
                        <h5 class="card-title mb-0">Notification</h5>
                    </div>
                    <div class="card-body">
                        <div class="main-notification-list">
                        <template v-if="unreadnotifications.length > 0">
                            <h5 class="mt-2 mt-0 border-bottom">Unread Notification</h5>
                            <template v-for="(notifi,index) in unreadnotifications" :key="index">

                               <div v-if="notifi.data.status == 'register'">
                                <div style="background:#f6f6fb;" class="d-flex align-items-center justify-content-between ">
                                    <a class="d-flex p-3" href="javascript:">
                                        <div class="notifyimg bg-pink">
                                            <i class="far fa-user text-white"></i>
                                        </div>
                                        <div class="ml-3"  :class="'d-flex align-items-center justify-content-between'">
                                            <h6 class="notification-label mb-1 font-weight-bold" :class="notifi.read_at == null ? 'noreadnotification' : ''">{{ notifi.data.name }} - {{ notifi.data.company }}</h6>
                                            <div class="notification-subtext d-flex align-items-center">
                                            <template v-if="notifi.data.role_id == 3">
                                                <span class="badge badge-pill badge-info mr-2">Publisher</span>
                                            </template>
                                            <template v-else>
                                                <span class="badge badge-pill badge-info mr-2">Advertiser</span>
                                            </template>
                                                <span class="font-weight-bold">{{  formatTime(notifi.created_at)  }}</span>
                                            </div>
                                        </div>
                                    </a>
                                    <button @click="viewNotification(notifi.id)" class="btn btn-sm btn-info mr-4">Mark As Read</button>
                                </div>
                               </div>

                               <div v-if="notifi.data.status == 'ticket'"  class="d-flex align-items-center justify-content-between">
                                <a class="d-flex p-3 border-bottom" href="javascript:">
                                        <div class="ml-3">
                                            <h5 class="notification-label mb-1" :class="notifi.read_at == null ? 'noreadnotification' : ''"> {{ notifi.data.priority }}</h5>
                                            <div class="notification-subtext d-flex align-items-center">
                                                <span class="badge badge-pill badge-info mr-2">{{ notifi.data.ticket_status }}</span>
                                                {{  formatTime(notifi.created_at) }}
                                            </div>
                                        </div>
                                    </a>
                                    <button @click="viewNotification(notifi.id)" class="btn btn-sm btn-info mr-4">Mark As Read</button>
                               </div>
                               <div v-if="notifi.data.status == 'campaign'" class="d-flex align-items-center justify-content-between">
                                <a class="d-flex p-3 " href="javascript:">
                                        <div class="ml-3">
                                            <h5 class="notification-label mb-1" :class="notifi.read_at == null ? 'noreadnotification' : ''"> {{ notifi.data.campaign_name }}</h5>
                                            <div class="notification-subtext">
                                                <span class="badge badge-pill badge-info mr-2">Campaign</span>
                                                {{  formatTime(notifi.created_at) }}
                                            </div>
                                        </div>
                                    </a>
                                    <button @click="viewNotification(notifi.id)" class="btn btn-sm btn-info mr-4">Mark As Read</button>
                               </div>

                               <div v-if="notifi.data.status == 'payment'"  class="d-flex align-items-center justify-content-between">
                                <a class="d-flex p-3 " href="javascript:">
                                        <div class="ml-3">
                                            <h5 class="notification-label mb-1" :class="notifi.read_at == null ? 'noreadnotification' : ''"> {{ notifi.data.fname }}</h5>
                                            <div class="notification-subtext d-flex align-items-center">
                                                <span class="badge badge-pill badge-info mr-2">Payment</span>
                                                {{  formatTime(notifi.created_at) }}
                                            </div>
                                        </div>
                                    </a>
                               </div>

                               <div v-if="notifi.data.status == 'Lead_form'"  class="d-flex align-items-center justify-content-between">
                                <a class="d-flex p-3 " href="javascript:">
                                        <div class="ml-3">
                                            <h5 class="notification-label mb-1" :class="notifi.read_at == null ? 'noreadnotification' : ''"> {{ notifi.data.company_name }}</h5>
                                            <div class="notification-subtext d-flex align-items-center">
                                                <span class="badge badge-pill badge-info mr-2">Medicare Insurance Leads</span>
                                                {{  formatTime(notifi.created_at) }}
                                            </div>
                                        </div>
                                    </a>
                               </div>

                            </template>
                        </template>

                        <template v-if="notifications.length > 0">
                            <h5 class="mt-2 mt-0 border-bottom">Read Notification</h5>
                            <template v-for="(notifi,index) in notifications" :key="index">
                               <div v-if="notifi.data.status == 'register'">
                                <div style="background:#f6f6fb;" class="d-flex align-items-center justify-content-between ">
                                    <a class="d-flex p-3" href="javascript:">
                                        <div class="notifyimg bg-pink">
                                            <i class="far fa-user text-white"></i>
                                        </div>
                                        <div class="ml-3"  :class="'d-flex align-items-center justify-content-between'">
                                            <h6 class="notification-label mb-1 font-weight-bold" >{{ notifi.data.name }} - {{ notifi.data.company }}</h6>
                                            <div class="notification-subtext d-flex align-items-center">
                                            <template v-if="notifi.data.role_id == 3">
                                                <span class="badge badge-pill badge-info mr-2">Publisher</span>
                                            </template>
                                            <template v-else>
                                                <span class="badge badge-pill badge-info mr-2">Advertiser</span>
                                            </template>
                                                <span class="font-weight-bold">{{  formatTime(notifi.created_at)  }}</span>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                               </div>

                               <div v-if="notifi.data.status == 'ticket'"  class="d-flex align-items-center justify-content-between">
                                <a class="d-flex p-3 border-bottom" href="javascript:">
                                        <div class="ml-3">
                                            <h5 class="notification-label mb-1" > {{ notifi.data.priority }}</h5>
                                            <div class="notification-subtext d-flex align-items-center">
                                                <span class="badge badge-pill badge-info mr-2">{{ notifi.data.ticket_status }}</span>
                                                {{  formatTime(notifi.created_at) }}
                                            </div>
                                        </div>
                                    </a>
                               </div>
                               <div v-if="notifi.data.status == 'campaign'" class="d-flex align-items-center justify-content-between">
                                <a class="d-flex p-3 " href="javascript:">
                                        <div class="ml-3">
                                            <h5 class="notification-label mb-1" > {{ notifi.data.campaign_name }}</h5>
                                            <div class="notification-subtext">
                                                <span class="badge badge-pill badge-info mr-2">Campaign</span>
                                                {{  formatTime(notifi.created_at) }}
                                            </div>
                                        </div>
                                    </a>
                               </div>

                               <div v-if="notifi.data.status == 'payment'"  class="d-flex align-items-center justify-content-between">
                                <a class="d-flex p-3 " href="javascript:">
                                        <div class="ml-3">
                                            <h5 class="notification-label mb-1" > {{ notifi.data.fname }}</h5>
                                            <div class="notification-subtext d-flex align-items-center">
                                                <span class="badge badge-pill badge-info mr-2">Payment</span>
                                                {{  formatTime(notifi.created_at) }}
                                            </div>
                                        </div>
                                    </a>
                               </div>

                               <div v-if="notifi.data.status == 'Lead_form'"  class="d-flex align-items-center justify-content-between">
                                <a class="d-flex p-3 " href="javascript:">
                                        <div class="ml-3">
                                            <h5 class="notification-label mb-1" > {{ notifi.data.company_name }}</h5>
                                            <div class="notification-subtext d-flex align-items-center">
                                                <span class="badge badge-pill badge-info mr-2">Medicare Insurance Leads</span>
                                                {{  formatTime(notifi.created_at) }}
                                            </div>
                                        </div>
                                    </a>
                               </div>
                            </template>
                        </template>
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
  import Loader from "../../../../include/loader.vue";
  import Breadcrumb from "../../../../include/breadcrumb.vue";
  import moment from "moment";
  import toastr from "toastr";
  import "toastr/build/toastr.min.css";
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
        breadcrumbs: [
          { label: "Dashboard", url: "/dashboard" },
          { label: "Notification", url: "" },
        ],
        getLoader: false,
        unreadnotifications : "",
        notifications : "",
        viewNotificationData : {
        noti_id : "",
      },
      };
    },
    async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role == 'Super' || role == 'Admin') {
          this.getNotification();
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    },
    methods: {
      getNotification() {
        this.getLoader = true;
        axios
          .get(this.globalVariables.apiUrl+`admin/notification/view-all`, {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          })
          .then((res) => {
            this.unreadnotifications = res.data.unreadnotifications;
            this.notifications = res.data.notifications;
          })
          .catch((e) => {
            console.error(e);
          })
          .finally(() => {
            this.getLoader = false;
          });
      },

      formatTime(createdAt) {
        return moment(createdAt).fromNow();
      },

      viewNotification(id){
      this.viewNotificationData.noti_id = id;
       axios
        .post(
          this.globalVariables.apiUrl+`notification/mark-as-read`,this.viewNotificationData,
          { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
        )
        .then((res) => {
          if(res.data.status == 'success'){
            toastr.success(res.data.message);
            this.getNotification();
          }else{
            toastr.error(res.data.message);
          }
        })
        .catch((e) => {
          console.error(e);
        });
    },
    },
  };
  </script>
  <style scoped>
  .badge-info {
      color: #fff;
      background-color: #00b9ff;
  }
  </style>