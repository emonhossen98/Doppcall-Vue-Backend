<template>
    <div class="chat_second_tab_three_content px-0">
        <template v-if="chatInfos != null && chatInfos  != ''">
          <div class="chat_content_sidebar">
            <div class="d-flex justify-content-between align-items-center px-3  chat_header bg-white my_chat_header">
              <RouterLink to="/admin-mobile-chats" class="btn btn-sm btn-primary my-2"><i class="fa-solid fa-house"></i></RouterLink>
              <RouterLink :to="'/admin-mobile-chat/'+chatInfos.id" class="btn btn-sm btn-primary my-2"><i class="fa-solid fa-message"></i></RouterLink>
            </div>
            <div class="chat_content_sidebar_header px-3 py-4 border-top" id="chat_sidebar_area">
              <div class="d-flex align-items-center">
                <div class="position-relative">
                  <template v-if="checkUserOnline(chatInfos.id)">
                    <span class="user_online"></span>
                  </template>
                  <template v-else>
                    <span class="user_offline"></span>
                  </template>
                    <template v-if="chatInfos.avatar != null">
                      <img class="sidebar_user_image" :src="'https://api.doppcall.com/'+chatInfos.avatar" alt="image">
                    </template>
                    <template v-else>
                      <img class="sidebar_user_image" :src="blankUser" alt="image">
                    </template>
                  <img class="sidebar_flag_image" :src="'https://flagicons.lipis.dev/flags/4x3/' + (chatInfos.country_code ?? '') + '.svg'" alt="">
                </div>
                <div class="d-grid ms-3 sidebar_user_info">
                  <span class="name">{{ chatInfos.fname ?? '' }} - {{ chatInfos.lname ?? '' }}</span>
                  <span class="email">{{ chatInfos.email ?? '' }}</span>
                  <span class="state">{{ chatInfos && chatInfos.user_location && chatInfos.user_location.city_name }}</span>
                </div>
              </div>
              <div class="d-flex align-items-center justify-content-center">
                <template v-if="chatInfos.role.name == 'Publisher'">
                  <button class="profile_btn text-white"><RouterLink class="text-white" :to="'/admin-manage-publishers-view/'+chatInfos.id"><i class="fa-regular fa-user me-3"></i>View {{ chatInfos.fname ?? '' }} Profile </RouterLink></button>
                </template>
                <template v-else-if="chatInfos.role.name == 'Advertiser'">
                  <button class="profile_btn"><RouterLink class="text-white" :to="'/admin-manage-advertiser-view/'+chatInfos.id"><i class="fa-regular fa-user me-3"></i>View {{ chatInfos.fname ?? '' }} Profile </RouterLink></button>
                </template>
              </div>
            </div>
            <div class="chat_content_body">
              <div>
                <div class="accordion" id="accordionPanelsStayOpenExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                        <i id="menu_varticals" class="fa-solid fa-grip-vertical"></i>
                        Main information
                        <i class="fa-solid fa-angle-down accordion-icon"></i>
                      </button>
                    </h2>
                    <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                      <div class="accordion-body">
                        <div class="sidebar_common_class">
                          <i class="fa-solid fa-location-dot me-2"></i>
                          {{ chatInfos && chatInfos.user_location && chatInfos.user_location.city_name }} ,{{ chatInfos && chatInfos.user_location && chatInfos.user_location.country }}
                        </div>
                        <div class="sidebar_common_class">
                          <i class="fa-regular fa-clock me-2"></i>
                          1.00 (UTC+6)
                        </div>
                        <div class="sidebar_common_class">
                          <i class="fa-solid fa-globe me-2"></i>
                          <img :src="'https://flagicons.lipis.dev/flags/4x3/' + (chatInfos.country_code ?? '') + '.svg'" alt="image" width="20">
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                        <i id="menu_varticals" class="fa-solid fa-grip-vertical"></i>
                        Visitor device
                        <i class="fa-solid fa-angle-down accordion-icon"></i>
                      </button>
                    </h2>
                    <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingTwo">
                      <div class="accordion-body">
                        <template v-if="chatInfos.browser != null">
                          <div class="sidebar_common_class">
                            <template v-if="chatInfos.browser == 'Chrome'">
                              <img class="me-2" :src="Chrome" alt="image">
                            </template>
                            <template v-else-if="chatInfos.browser == 'Firefox'">
                              <img class="me-2" :src="Firefox" alt="image">
                            </template>
                            <template v-else-if="chatInfos.browser == 'Safari'">
                              <img class="me-2" :src="Safari" alt="image">
                            </template>
                            <template v-else-if="chatInfos.browser == 'Edge'">
                              <img class="me-2" :src="Edge" alt="image">
                            </template>
                            <template v-else-if="chatInfos.browser == 'Explorer'">
                              <img class="me-2" :src="Explorer" alt="image">
                            </template>
                            {{ chatInfos.browser }} on {{ chatInfos.os }}
                          </div>
                        </template>
                        <div class="sidebar_common_class">
                          <i class="fa-solid fa-cloud-arrow-up me-2"></i>
                          {{ chatInfos && chatInfos.user_location &&  chatInfos.user_location.ip_address }}
                        </div>
                        <template v-if="chatInfos && chatInfos.page_name != null">
                          <div class="sidebar_common_class">
                            <i class="fa-regular fa-file-lines me-2"></i>
                           <span id="page_name"> {{ chatInfos && chatInfos.page_name  }}</span>
                          </div>
                        </template>
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-headingThree">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                        <i id="menu_varticals" class="fa-solid fa-grip-vertical"></i>
                        Conversation participants
                        <i class="fa-solid fa-angle-down accordion-icon"></i>
                      </button>
                    </h2>
                    <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingThree">
                      <div class="accordion-body">
                        <div class="sidebar_common_class">
                          <i class="fa-regular fa-envelope me-2"></i>
                          {{ chatInfos.email ?? '' }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </div>
          </div>
        </template>
    </div>
</template>
<script>
import axios from 'axios';
import { onMounted, ref, watch , computed} from 'vue';
import { useRoute ,useRouter} from 'vue-router'; 
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { fetchUserRole } from "@/services/userService";
import blankUser from "../../../../../../../assets/backend/assets/chats/image/blank_user.png";
import Chrome  from '../../../../../../../assets/backend/assets/chats/browser-image/chrome.png';
import Firefox  from '../../../../../../../assets/backend/assets/chats/browser-image/firefox.png';
import Safari  from '../../../../../../../assets/backend/assets/chats/browser-image/Safari.png';
import Edge  from '../../../../../../../assets/backend/assets/chats/browser-image/Edge.jpg';
import Explorer  from '../../../../../../../assets/backend/assets/chats/browser-image/Explorer.jpg';
import no_message from "../../../../../../../assets/backend/assets/img/message.gif";

window.Pusher = Pusher;
window.Echo = new Echo({
broadcaster: "pusher",
key: "4af372a603837e311fb4",
cluster: "ap2",
encrypted: true,
authEndpoint: 'https://api.doppcall.com/broadcasting/auth',
  auth: {
      headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
      }
  }
});

export default {
  setup() {
    const route = useRoute();
    const chatId = ref(route.params.id);
    const chatInfos = ref(null); 
    const authUser = ref(null); 
    const authUserID = ref(null); 
    const onlineUsers = ref([]);
    const userLoading = ref(false);
 
    const checkUserOnline = (id) => {
      return onlineUsers.value.some(user => user.id === id) ? 1 : 0;
    };

    const listenForOnlineUsers = async () => {
      window.Echo.join("online-users")
        .here((users) => {
          onlineUsers.value = users;
        })
        .joining((user) => {
          onlineUsers.value.push(user);
        })
        .leaving((user) => {
          onlineUsers.value = onlineUsers.value.filter((u) => u.id !== user.id);
        });
    };

    watch(() => route.params.id, (newId) => {
        var getdata = JSON.parse(localStorage.getItem('user_'+newId));
        if(getdata != null && getdata != ''){
          chatInfos.value = getdata;
        }else{
          try {
                const response =  fetch(`https://api.doppcall.com/api/admin/crisp/chat/nostoreuser/${chatId.value}`, {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                });
                
                if (!response.ok) {
                  throw new Error(`API Error: ${response.statusText}`);
                }
                const jsonResponse =  response.json();
                localStorage.setItem('user_' + chatId.value, JSON.stringify(jsonResponse.user));
                createMessage.value.chat_id = jsonResponse.user && jsonResponse.user.chatstatus.id; 
                var getdata = JSON.parse(localStorage.getItem('user_'+newId));
                chatInfos.value = jsonResponse.user;
              } catch (error) {
                console.error("Error fetching chat users:", error);
            }
        }
      var getUserdata = JSON.parse(localStorage.getItem('user'));
      authUser.value = getUserdata ?? '';
      authUserID.value = getUserdata && getUserdata.id;

    }, { immediate: true });

    onMounted(async () => {
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role === 'Super' || role === 'Admin') {
            var getdata = JSON.parse(localStorage.getItem('user_'+chatId.value));
            listenForOnlineUsers();
            if(getdata != null && getdata != ''){
              chatInfos.value = getdata;
            }else{
              try {
                const response = await fetch(`https://api.doppcall.com/api/admin/crisp/chat/nostoreuser/${chatId.value}`, {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                });
                
                if (!response.ok) {
                  throw new Error(`API Error: ${response.statusText}`);
                }
                const jsonResponse = await response.json();
                localStorage.setItem('user_' + chatId.value, JSON.stringify(jsonResponse.user));
                chatInfos.value = jsonResponse.user;
              } catch (error) {
                console.error("Error fetching chat users:", error);
              }
            }
          var getUserdata = JSON.parse(localStorage.getItem('user'));
          authUser.value = getUserdata ?? '';
          authUserID.value = getUserdata && getUserdata.id;
          userLoading.value = true;
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    });

    return {
      chatInfos,
      chatId,
      authUser,
      authUserID,
      userLoading,
      blankUser,
      onlineUsers,
      Chrome,
      Firefox,
      Safari,
      Edge,
      Explorer,
      no_message,
      checkUserOnline,
    };
  },
};
</script>
<style>
textarea.form-control {
  border-right: 0 !important;
}
.form-control:focus {
  border-color: unset !important;
  box-shadow: unset !important;
}
.chat_content_sidebar {
	width: 100% !important;
}
.my_chat_header {
  z-index : 99999999;
}
#chat_sidebar_area {
  margin-top:50px ;
}
</style>