<template>
  <div v-if="getLoader">
      <Loader></Loader>
    </div>
    <div class="chat_second_tab_one px-0">
      <div class="chat_second_tab_one_heading">
        <h5>VISITORS</h5>
        <div class="text-white">
          <span class="live-indicator">
            <i class="fa-solid fa-circle me-1"></i>Live
          </span>
        </div>
      </div>
      <div class="chat_second_tab_two_visitor_content px-3  border-2">
          <div id="map" style="height: 25vh;"></div>
      </div>
      <template v-if="onlineUsers.length > 0">
        <div class="chat_second_tab_one_content_users">
          <div class="visitor_users">
              <ul class="ps-3 pt-3">
              <template v-for="(user,index) in onlineUsers" :key="index">
                <template v-if="user.roleid == 2 || user.roleid == 3 || user.roleid == 6">
                  <li class="position-relative">
                  <template v-if="checkUser(user.id) == true">
                    <RouterLink :to="'/admin-mobile-chat/'+user.id">
                      <div class="chat_user_list d-flex align-items-center">
                        <div class="position-relative">
                        <span id="user_online"></span>
                        <template v-if="user.avatar != null">
                          <img id="user_image" :src="'https://api.doppcall.com/'+user.avatar"  alt="avatar"/>
                        </template>
                        <template v-else>
                          <img id="blank_user_image" :src="blankUser"  alt="avatar"/>
                        </template>
                        <img id="user_flag_image" :src="'https://flagicons.lipis.dev/flags/4x3/' + (user.country_code ?? '') + '.svg'" alt=""/>
                        </div>
                        <div class="dropdown chat_hover_dropdown visitor_hover">
                          <RouterLink :to="'/admin-mobile-chat/'+user.id"><i class="fa-regular fa-comment-dots"></i></RouterLink>
                          <a target="_blank" :href="user.page ?? ''"><i class="fa-solid fa-file"></i></a>
                        </div>
                        <div class="chat_user_list_info ms-3">
                          <h3 class="user_name_date">
                            <p class="mb-0 name">{{ user.fname ?? 'Visitor'+ (index + 1) }}</p>
                          </h3>
                          <h3 class="user_message_icon">
                          {{ user.page ?? 'DOPPCALL - Home' }}
                          </h3>
                        </div>
                      </div>
                    </RouterLink>
                  </template>
                  <template v-else>
                    <a href="javascript:" @click="createConversation(user.id)">
                      <div class="chat_user_list d-flex align-items-center">
                        <div class="position-relative">
                          <span id="user_online"></span>
                        <template v-if="user.avatar != null">
                          <img id="user_image" :src="'https://api.doppcall.com/'+user.avatar"  alt="avatar"/>
                        </template>
                        <template v-else>
                          <img id="blank_user_image" :src="blankUser"  alt="avatar"/>
                        </template>
                        <img id="user_flag_image" :src="'https://flagicons.lipis.dev/flags/4x3/' + (user.country_code ?? '') + '.svg'" alt=""/>
                        </div>
                        <div class="dropdown chat_hover_dropdown visitor_hover">
                          <a href="javascript:" @click="createConversation(user.id)"><i class="fa-regular fa-comment-dots"></i></a>
                          <a target="_blank" :href="user.page ?? ''"><i class="fa-solid fa-file"></i></a>
                        </div>
                        <div class="chat_user_list_info ms-3">
                          <h3 class="user_name_date">
                            <p class="mb-0 name">{{ user.username ?? 'Visitor'+ (index + 1) }}</p>
                          </h3>
                          <h3 class="user_message_icon">
                          {{ user.page ?? 'DOPPCALL - Home' }}
                          </h3>
                        </div>
                      </div>
                    </a>
                  </template>
                  </li>
                </template>
              </template>
            </ul>
          </div>
        </div>
      </template>
      <div class="chat_second_tab_one_content">
        <div class="visitor_count">
          <!-- <template v-if="countByRoleId(2) > 0">
            <li class="mb-0"><i class="fa-solid fa-play me-2"></i>Total Online Advertisers : {{ countByRoleId(2)  }}</li>
          </template>
          <template v-if="countByRoleId(3) > 0">
            <li class="mb-0"><i class="fa-solid fa-play me-2"></i>Total Online	Publishers : {{ countByRoleId(3)  }}</li>
          </template> -->
        </div>
        <template v-if="countByRoleId(2) == 0 &&  countByRoleId(3) == 0 &&  countByRoleId(6) == 0">
          <div class="chat_second_tab_one_content_wapper">
            <i class="fa-solid fa-globe"></i>
            <h5>There are no visitors.</h5>
            <p>Nobody is currently browsing your website. Your visitors will appear here.</p>
        </div>
        </template>
      </div>
    </div>
</template>
<script>
import L from 'leaflet';
import { nextTick } from 'vue';
import axios from 'axios';
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import blankUser from "../../../../../../../assets/backend/assets/chats/image/blank_user.png";
import Loader from "../../../../include/loader.vue";

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
  components: {
      Loader,
  },
  name: 'OpenStreetMapMobile',
  data() {
    return {
      map: null,
      onlineUsers: [],
      searchOnline : [],
      allChatUser : [],
      markers: [], 
      blankUser,
      domain : window.location.origin,
      getLoader: false,
      searchValue :"",
    };
  },
  async mounted() {
    // this.fetchVisitorsChatUsers();
    // this.listenForOnlineUsers();
    // await nextTick();
    // this.initializeMap();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.listenForOnlineUsers();
    });
  },
  beforeRouteLeave(to, from, next) {
    window.Echo.leave('online-users');
    next();
  },
  methods: {
    searchUser() {
      const searchTerm = this.searchValue.trim().toLowerCase();
      if(searchTerm != ''){
        this.onlineUsers = this.onlineUsers.filter(user =>
          Object.keys(user).some(key => 
            String(user[key]).toLowerCase().includes(searchTerm)
          )
        );
      }else{
        this.onlineUsers = this.searchOnline;
      }
    },
    checkUser(value) {
      return this.allChatUser.includes(value);
    },

    async fetchVisitorsChatUsers() {
      try {
        const response = await fetch(
          `https://api.doppcall.com/api/admin/crisp/chat/visitorsalluser`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              "Content-Type": "application/json",
            },
          }
        );
        const jsonResponse = await response.json();
        this.allChatUser = jsonResponse.allChatUsers
      } catch (error) {
        console.error("Error fetching chat users:", error);
      }
    },

    async initializeMap() {
      alert('called');
      const mapContainer = document.getElementById('map');
      if (!mapContainer) {
        console.error('Map container not found');
        return;
      }
      if (!this.map) {
        this.map = L.map('map').setView([20, 0], 2);  // Initial map view
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors',
        }).addTo(this.map);
        await this.addUserLocations();
      }
    },


    async addUserLocations() {
      this.clearMarkers();
      for (const user of this.onlineUsers) {
        if (user.roleid == 2 || user.roleid == 3 || user.roleid == 6) {
          if (user.ip_address && user.ip_address !== '0.0.0.0') {
            try {
              const response = await axios.get(`http://ip-api.com/json/${user.ip_address}`);
              const { lat, lon } = response.data;
              const marker = L.marker([lat, lon]).addTo(this.map);
              marker.bindPopup(`${user.username ?? '--'}`).openPopup();
              this.markers.push(marker);
            } catch (error) {
              console.error(`Error fetching location for ${user.username ?? '--'}:`, error);
            }
          }
        }
      }
    },

    clearMarkers() {
      this.markers.forEach(marker => marker.remove());
      this.markers = [];
    },

    async listenForOnlineUsers() {
      window.Echo.join("online-users")
        .here((users) => {
          this.onlineUsers = users;
          this.searchOnline = users;
          this.initializeMap(); 
          this.addUserLocations(); 
        })
        .joining((user) => {
          this.onlineUsers.push(user);
          this.searchOnline.push(user);
          this.addUserLocations(); 
        })
        .leaving((user) => {
          this.onlineUsers = this.onlineUsers.filter((u) => u.id !== user.id);
          this.searchOnline = this.searchOnline.filter((u) => u.id !== user.id);
          this.addUserLocations(); 
        });
    },

    countByRoleId(roleid) {
      return this.onlineUsers.filter(user => user.roleid === roleid).length;
    },

    async createConversation  (user_id)  {
        this.getLoader = true;
        const data = new FormData();
        data.append("users[]", user_id);
        data.append("isPrivate", 1);
        data.append("domainName", this.domain);
        axios
          .post(`https://api.doppcall.com/api/admin/crisp/chat/create-chat`, data, {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
            if(res.data.success){
              localStorage.setItem('user_' + res.data.user.id, JSON.stringify(res.data.user));
              this.$router.push(`/admin-mobile-chat/${user_id}`);
            }
          })
          .catch((error) => {
            console.error(error);
         })
         .finally(() => {
          this.getLoader = false;
        });
    },
  },
};
</script>

<style>
#map {
  border-radius: 5px;
  width: 100%;
  margin-top: 65px !important;
}
</style>
<style scope>
#doppchatarea .chat_second_tab_one_content .chat_second_tab_one_content_wapper {
	margin: 0px 18px !important;
}
  #doppchatarea .chat_user_list .user_message_icon {
	color: #1c293b;
	margin-top: 3px;
	margin-bottom: 8px;
	font-size: 15px;
	line-height: 15px;
	margin-bottom: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 180px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
}

#user_online {
	width: 15px;
	height: 15px;
	border-radius: 50%;
	position: absolute;
	top: 10px;
	left: -2px;
	border: 2px solid #fff;
	background: #4ece3d;
}

</style>