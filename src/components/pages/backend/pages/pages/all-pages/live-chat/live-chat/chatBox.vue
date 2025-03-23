<template>
  <div v-if="getLoader">
    <Loader></Loader>
  </div>
  <div class="col app-chat-history bg-body">
    <div class="chat-history-wrapper">
      <div class="chat-history-header border-bottom">
        <div class="d-flex justify-content-between align-items-center">
          <div class="d-flex overflow-hidden align-items-center">
            <i
              class="ti ti-menu-2 ti-sm cursor-pointer d-lg-none d-block me-2"
              data-bs-toggle="sidebar"
              data-overlay
              data-target="#app-chat-contacts"
            ></i>
            <div class="flex-shrink-0 avatar">
              <template v-if="chats">
                <template v-for="(user, index) in chats" :key="index">
                  <template v-if="authUser.id != user.id">
                    <template v-if="user && user.avatar != null">
                      <img
                        :src="globalVariables.appUrl+ user.avatar"
                        alt="Avatar"
                        class="rounded-circle"
                        @click="showUserInfo(user)"
                      />
                    </template>
                    <template v-else>
                      <img
                        :src="blank_user"
                        alt="Avatar"
                        class="rounded-circle"
                        @click="showUserInfo(user)"
                      />
                    </template>
                  </template>
                </template>
              </template>
            </div>
            <template v-if="chats">
              <template v-for="(user, index) in chats" :key="index">
                <template v-if="authUser.id != user.id">
                  <div class="chat-contact-info flex-grow-1 ms-2">
                    <h5 class="m-0 font-class">{{ user.fname }} {{ user.lname }}</h5>
                    <button data-bs-toggle="modal" id="assign_btn"  data-bs-target="#assignModal"  @click="accountManagersModal(user.id)" class="border-0">
                      Assign This Converation <i class="fa-solid fa-caret-down"></i>
                    </button>
                  </div>
                </template>
              </template>
            </template>
          </div>
          <div class="d-flex align-items-center">
            <!-- <i class="ti ti-search cursor-pointer d-sm-block d-none me-3"></i> -->
            <div class="dropdown d-flex align-self-center">
              <template v-if="chats">
              <template v-for="(user, index) in chats" :key="index">
                <template v-if="authUser.id != user.id">
                    <button class="btn p-0" type="button" id="chat-header-actions" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i class="ti ti-dots-vertical"></i>
                    </button>
                    <div class="dropdown-menu dropdown-menu-end" aria-labelledby="chat-header-actions">
                      <a class="dropdown-item" @click="showUserInfo(user)" >View Contact</a>
                      <a class="dropdown-item" @click="blockUser(user.id)" href="javascript:void(0);">Block Contact</a>
                      <a class="dropdown-item" href="javascript:void(0);">Clear Chat</a>
                      <a class="dropdown-item" href="javascript:void(0);">Report</a>
                    </div>

                </template>
              </template>
            </template>
            </div>
          </div>
        </div>
      </div>
      <div class="chat-history-body bg-body" id="chat-history-body" @scroll="messageOnScroll">
        <ul class="list-unstyled chat-history">
          <template v-if="getMessages">
            <div v-if="loading" class="loading text-center">Loading...</div>
            <template v-for="(mess, index) in getMessages" :key="index">
              <template v-if="authUser.id == mess.user_id">
                <li class="chat-message chat-message-right">
                  <div class="d-flex overflow-hidden">
                    <div class="chat-message-wrapper flex-grow-1">
                      <div class="chat-message-text">
                        <p class="mb-0 text-white font-class">{{ mess.message }}</p>
                      </div>
                      <div class="text-end text-muted mt-1">
                        <i class="ti ti-checks ti-xs me-1 text-success"></i>
                        <small>{{ formatTime(mess.created_at) }}</small>
                      </div>
                    </div>
                    <div class="user-avatar flex-shrink-0 ms-3">
                      <div class="avatar avatar-sm">
                        <template
                          v-if="mess && mess.sender && mess.sender.avatar != null"
                        >
                          <img
                            :src="globalVariables.appUrl+ mess.sender.avatar"
                            alt="Avatar"
                            class="rounded-circle"
                          />
                        </template>
                        <template v-else>
                          <img :src="blank_user" alt="Avatar" class="rounded-circle" />
                        </template>
                      </div>
                    </div>
                  </div>
                </li>
              </template>
              <template v-else>
                <li class="chat-message">
                  <div class="d-flex overflow-hidden">
                    <div class="user-avatar flex-shrink-0 me-3">
                      <div class="avatar avatar-sm">
                        <template
                          v-if="mess && mess.sender && mess.sender.avatar != null"
                        >
                          <img
                            :src="globalVariables.appUrl+ mess.sender.avatar"
                            alt="Avatar"
                            class="rounded-circle"
                          />
                        </template>
                        <template v-else>
                          <img :src="blank_user" alt="Avatar" class="rounded-circle" />
                        </template>
                      </div>
                    </div>
                    <div class="chat-message-wrapper flex-grow-1">
                      <div class="chat-message-text">
                        <p class="mb-0 font-class">{{ mess.message }}</p>
                      </div>
                      <div class="text-muted mt-1">
                        <small>{{ formatTime(mess.created_at) }}</small>
                      </div>
                    </div>
                  </div>
                </li>
              </template>
            </template>
          </template>
          <template v-else>
            <p class="font-class">Your History is Empty</p>
          </template>
        </ul>
      </div>

      <div class="chat-history-footer shadow-sm">
        <div class="form-send-message d-flex justify-content-between align-items-center">
          <input
            v-model="message"
            class="form-control message-input border-0 me-3 shadow-none"
            placeholder="Type your message here"
             @keyup.enter="sendMessage()"
          >
          <div class="message-actions d-flex align-items-center">
            <button
              @click="sendMessage()"
              type="button"
              class="btn btn-primary d-flex send-msg-btn"
            >
              <i class="ti ti-send me-md-1 me-0"></i>
              <span class="align-middle d-md-inline-block d-none">Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

 <!-- Large Modal -->
  <div class="modal fade" id="assignModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <h5 class="mb-0">Assign To</h5>
            <select v-model="assignManager.manager_id" class="form-select">
              <option value="">Select Manager</option>
              <option  v-for="(manager, index) in accountManagers" :key="index" :value="manager.id">
                {{ manager.fname }}- {{ manager.lname }} - {{ manager.email }}
              </option>
            </select>
            <div v-if="validationErrors && validationErrors.manager_id" class="text-danger">
                  {{ validationErrors.manager_id[0] }}
            </div>
          </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-label-secondary btn-sm" data-bs-dismiss="modal">
            Close
          </button>
          <button @click="AddedAccountManager()" type="button" class="btn btn-primary btn-sm"> <i class="fas fa-check fa-sm me-2"></i> Confirm</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Sidebar Right -->
  <div class="col app-chat-sidebar-right app-sidebar overflow-hidden" id="app-chat-sidebar-right">
    <div
      class="sidebar-header d-flex flex-column justify-content-center align-items-center flex-wrap px-4 pt-5">
      <div class="avatar avatar-xl avatar-online">
        <img :src="userInfoShowSidebar.userImage" alt="Avatar" class="rounded-circle" />
      </div>
      <h6 class="mt-2 mb-0 font-class">{{ userInfoShowSidebar.userName }}</h6>
      <span>{{ userInfoShowSidebar.userRole }}</span>
      <i class="ti ti-x ti-sm cursor-pointer close-sidebar d-block" @click="closeUserInfo()"></i>
    </div>
    <div class="sidebar-body px-4 pb-4">
      <template v-if="userInfoShowSidebar.userCompany || userInfoShowSidebar.userCompanyUrl" >
        <div class="my-4">
        <small class="text-muted text-uppercase">About</small>
        <ul class="list-unstyled d-grid gap-2 mt-3">
          <template v-if="userInfoShowSidebar.userCompany">
            <li class="d-flex align-items-center">
              <i class="ti ti-crown ti-sm"></i>
              <span class="align-middle ms-2">{{ userInfoShowSidebar.userCompany }}</span>
          </li>
          </template>
          <template v-if="userInfoShowSidebar.userCompanyUrl">
            <li class="d-flex align-items-center">
              <i class="ti ti-world ti-sm"></i>
              <span class="align-middle ms-2">{{ userInfoShowSidebar.userCompanyUrl }}</span>
            </li>
          </template>
        </ul>
      </div>
      </template>
      <div class="my-4">
        <small class="text-muted text-uppercase">Personal Information</small>
        <ul class="list-unstyled d-grid gap-2 mt-3">
          <li class="d-flex align-items-center">
            <i class="ti ti-mail ti-sm"></i>
            <span class="align-middle ms-2">{{ userInfoShowSidebar.userEmail }}</span>
          </li>
          <template v-if="userInfoShowSidebar.userPhone">
            <li class="d-flex align-items-center">
              <i class="ti ti-phone-call ti-sm"></i>
              <span class="align-middle ms-2">{{ userInfoShowSidebar.userPhone }}</span>
          </li>
          </template>
          <template v-if="userInfoShowSidebar.userCreated">
            <li class="d-flex align-items-center">
              <i class="ti ti-clock ti-sm"></i>
              <span class="align-middle ms-2">{{ formatDate(userInfoShowSidebar.userCreated) }}</span>
            </li>
          </template>
          <template v-if="userInfoShowSidebar.userFacebook">
            <li class="d-flex align-items-center">
              <i id="icons_id"class="ms-1 fa-brands fa-facebook-f ti-sm"></i>
              <span class="align-middle ms-2"><a id="icons_class" :href="userInfoShowSidebar.userFacebook" target="_blank" rel="noopener noreferrer">Facebook</a></span>
            </li>
          </template>
          <template v-if="userInfoShowSidebar.userSkype">
            <li class="d-flex align-items-center">
              <i id="icons_id"class="ms-1 fa-brands fa-skype ti-sm"></i>
              <span class="align-middle ms-2"><a id="icons_class" :href="userInfoShowSidebar.userSkype" target="_blank" rel="noopener noreferrer">Skype</a></span>
            </li>
          </template>
          <template v-if="userInfoShowSidebar.userTelegram">
            <li class="d-flex align-items-center">
              <i id="icons_id"class="ms-1 fa-brands fa-telegram ti-sm"></i>
              <span class="align-middle ms-2"><a id="icons_class" :href="userInfoShowSidebar.userTelegram" target="_blank" rel="noopener noreferrer">Telegram</a></span>
            </li>
          </template>
        </ul>
      </div>
      <div class="mt-4">
        <small class="text-muted text-uppercase">Options</small>
        <ul class="list-unstyled d-grid gap-2 mt-3">
          <!-- <li class="cursor-pointer d-flex align-items-center">
            <i class="ti ti-badge ti-sm"></i>
            <span class="align-middle ms-2">Add Tag</span>
          </li>
          <li class="cursor-pointer d-flex align-items-center">
            <i class="ti ti-star ti-sm"></i>
            <span class="align-middle ms-2">Important Contact</span>
          </li>
          <li class="cursor-pointer d-flex align-items-center">
            <i class="ti ti-photo ti-sm"></i>
            <span class="align-middle ms-2">Shared Media</span>
          </li> -->
          <li class="cursor-pointer d-flex align-items-center">
            <i class="ti ti-trash ti-sm"></i>
            <span class="align-middle ms-2">Delete Contact</span>
          </li>
          <li class="cursor-pointer d-flex align-items-center"  @click="blockUser(userInfoShowSidebar.userID)">
            <i class="ti ti-ban ti-sm"></i>
            <span class="align-middle ms-2">Block Contact</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <!-- /Sidebar Right -->
</template>

<script>
import { format } from "date-fns";
import axios from "axios";
import moment from "moment";
import Loader from "../../../../../include/loader.vue";
import blank_user from "../../../../../../../../assets/backend/assets/img/blank_user.png";
import toastr from 'toastr';
import Swal from "sweetalert2";
import { inject } from "vue";

export default {
  setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
  props: ["chat_id","chats","getMessages"],
  emits: ["addMessage","onScroll"],
  created: function () {
    this.moment = moment;
  },
  components: {
    Loader,
  },
  data() {
    return {
      showModal: false,
      message: "",
      isSendingForm: false,
      users: [],
      getLoader: false,
      authUser: "",
      blank_user,
      accountManagers: "",
      assignManager: {
        manager_id: "",
        user_id: "",
      },
      validationErrors : null,
      loading : false,
      userInfoShowSidebar : {
        userID : "",
        userImage : "",
        userName : "",
        userRole : "",
        userCompany : "",
        userCompanyUrl : "",
        userEmail : "",
        userPhone :"",
        userCreated : "",
        userFacebook : "",
        userSkype : "",
        userTelegram : "",
      },
    };
  },
  mounted() {
    this.getUser();
    this.getAccountManeger();
  },
  methods: {
    getUser() {
      axios
        .get(this.globalVariables.apiUrl+`auth/user/data`, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          this.authUser = res.data.data;
          this.role = res.data.role;
        })
        .catch((e) => {
          console.error(e);
        });
    },

    getAccountManeger() {
      axios
        .get(this.globalVariables.apiUrl+`admin/chat/account/manegers`, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          this.accountManagers = res.data.accountManegers;
        })
        .catch((e) => {
          console.error(e);
        });
    },

    AddedAccountManager() {
      this.getLoader = true;
      axios
        .post(this.globalVariables.apiUrl+`admin/chat/account/maneger/save`,this.assignManager, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          if(res.data.status == 'success'){
            toastr.success(res.data.message);
            this.assignManager.manager_id = "";
            location.reload(); 
          }else{
            toastr.error('Something Went To Wrong');
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

    blockUser(id) {
      Swal.fire({
        text: "Are You Sure Block This User",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.value) {
          this.getLoader = true;
          axios
            .get(this.globalVariables.apiUrl+`admin/chat/block/user/${id}`, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((res) => {
              if(res.data.status == 'success'){
                toastr.success(res.data.message);
                location.reload();
              }else{
                toastr.error('Something Went To Wrong');
              }
            })
            .catch((e) => {
              return e;
            })
            .finally(() => {
              this.getLoader = false;
            });
        }
      });
    },

    accountManagersModal(id) {
      this.assignManager.user_id = id;
    },

    messageOnScroll(event) {
      this.loading = true;
      this.$emit("onScroll", event);
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    },
    sendMessage() {
      this.$emit("messagesent", {
        message: this.message,
        chat_id: this.chat_id
      });
      this.message = "";
    },

    formatTime(dateString) {
      const date = new Date(dateString);
      return format(date, "hh:mm a");
    },
    formatDate(date) {
      return moment(date).format('D MMMM YYYY');
    },
    showUserInfo(user){
      if(user.avatar != null){
        this.userInfoShowSidebar.userImage  = this.globalVariables.appUrl+ user.avatar;
      }else{
        this.userInfoShowSidebar.userImage = this.blank_user;
      }
      this.userInfoShowSidebar.userName = user.fname  +' '+ user.lname ;
      if(user.role_id ==1 ){
        this.userInfoShowSidebar.userRole = 'Super Admin';
      }else if(user.role_id == 5){
        this.userInfoShowSidebar.userRole = 'Admin';
      }else if(user.role_id == 2){
        this.userInfoShowSidebar.userRole = 'Advertiser';
      }else if(user.role_id == 3){
        this.userInfoShowSidebar.userRole = 'Publisher';
      }else if(user.role_id == 4){
        this.userInfoShowSidebar.userRole = 'Account Manager';
      }
      this.userInfoShowSidebar.userID = user.id  ?? '';
      this.userInfoShowSidebar.userCompany = user.company_name  ?? '';
      this.userInfoShowSidebar.userCompanyUrl = user.company_website ?? '';
      this.userInfoShowSidebar.userEmail = user.email  ?? '';
      this.userInfoShowSidebar.userPhone = user.phone_no  ?? '';
      this.userInfoShowSidebar.userCreated = user.created_at ?? '';
      this.userInfoShowSidebar.userFacebook = user.facebook ?? '';
      this.userInfoShowSidebar.userSkype = user.skype ?? '';
      this.userInfoShowSidebar.userTelegram = user.telegram ?? '';
      $('#app-chat-sidebar-right').addClass('show');
      $('.app-overlay').addClass('show');
    },
    closeUserInfo(){
      $('#app-chat-sidebar-right').removeClass('show');
      $('.app-overlay').removeClass('show');
    }
  },
};
</script>
<style scoped>
/* .app-chat .sidebar-body {
  overflow-x: auto !important;
}
.app-chat .sidebar-body {
  scrollbar-width: thin;
  scrollbar-color: #dbdade #ffffff;
} */
.chat-history .chat-message .chat-message-text {
  background-color: #fff;
  box-shadow: 0 0.125rem 0.25rem rgba(165, 163, 174, 0.3);
}
/* .app-chat .app-chat-history .chat-history-body {
  overflow: visible !important;
  overflow-x: auto !important;
}
.app-chat .app-chat-history .chat-history-body {
  scrollbar-width: thin;
  scrollbar-color: #dbdade #ffffff;
} */
#assign_btn {
  background: transparent;
  color: #818181;
  margin-left: -5px;
  font-size: 14px;
}
.app-chat-sidebar-right {
	background-color: #fff;
	box-shadow: 16px 1px 45px 3px rgba(75, 70, 92, 0.5);
}
#icons_class {
	color: #6f6b7d !important;
}
#icons_id::before{
  color: #6f6b7d !important;
	font-size: 22px;
	font-weight: 100 !important;
}

/* if(storedChatUserIds){
               res.data.chatUsers.forEach((user,index) => {
                if(index == 0){
                  if(storedChatUserIds.includes(user && user.chats[0] && user.chats[0].id)){
                   alert('yes this is an avaible')
                 }
                }
                // this.getCacheChatData(user && user.chats[0] && user.chats[0].id,user.id);
                // chatUserIds.push(user.chats[0].id);
              });
            // storedChatUserIds.forEach((ids) => {
            //     localStorage.removeItem('chatMessage_'+ids);
            // });
            // localStorage.removeItem('chatUserIds');
          }else{
            const chatUserIds = [];
              res.data.chatUsers.forEach((user) => {
                this.getCacheChatData(user && user.chats[0] && user.chats[0].id,user.id);
                chatUserIds.push(user.chats[0].id);
              });
              localStorage.setItem('chatUserIds', JSON.stringify(chatUserIds));
            }) */
</style>


