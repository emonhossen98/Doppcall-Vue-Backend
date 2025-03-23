<template>
  <nav :class="['navbar-primary', { collapsed: isCollapsed }]">
    <a href="#" class="btn-expand-collapse" @click.prevent="toggleNavbar">
      <template v-if="isCollapsed">
        <i class="fa-regular fa-square-caret-right"></i>
      </template>
      <template v-else>
        <i class="fa-regular fa-square-caret-left"></i>
      </template>
    </a>
    <div class="dopp_sidebar_profile">
      <template v-if="isCollapsed">
        <a
          href="https://doppcall.com/"
          class="app-brand-link-small justify-content-center"
        >
          <img class="dashboradLogo" :src="favicon" alt="" />
        </a>
      </template>
      <template v-else>
        <a href="https://doppcall.com/" class="app-brand-link justify-content-center">
          <img class="dashboradLogo" :src="secondary_logo" alt="" />
        </a>
      </template>

      <!-- <img class="dashboradLogo" :src="secondary_logo" alt="">
       <div class="user_info">
        <h5 class="nav-label font-class name">
          {{ authUser && authUser.fname }} {{ authUser && authUser.lname }}
        </h5>
        <p class="nav-label font-class email m-0">{{ authUser && authUser.email }}</p>
      </div> -->
    </div>
    <div class="dopp_sidebar_wrapper">
      <ul class="navbar-primary-menu">
        <li>
          <RouterLink
            :to="'/admin-chats/000'"
            class="d-flex align-items-center position-relative"
            @click="sidebarActive('inbox')"
            :class="
              activeSidebar == 'inbox'
                ? 'router-link-active router-link-exact-active'
                : ''
            "
            ><i class="fa-regular fa-comment-dots"></i
            ><span class="nav-label font-class"
              >Inbox
              <template v-if="totalCountUser > 0">
                <span id="totalActiveUsers">{{ totalCountUser }}</span>
              </template>
            </span></RouterLink
          >
          <RouterLink
            :to="'/admin-chats-visitors'"
            class="d-flex align-items-center position-relative"
            @click="sidebarActive('visitors')"
            :class="
              activeSidebar == 'visitors'
                ? 'router-link-active router-link-exact-active'
                : ''
            "
            ><i class="fa-solid fa-globe"></i>
            <span class="nav-label font-class"
              >Visitors
              <template v-if="countByRoleId(2) + countByRoleId(3) + countByRoleId(6) > 0">
                <span id="totalActiveUsers"
                  >{{
                    formatNumber(countByRoleId(2) + countByRoleId(3) + countByRoleId(6))
                  }}
                  {{
                    getSuffix(countByRoleId(2) + countByRoleId(3) + countByRoleId(6))
                  }}</span
                >
              </template>
            </span>
          </RouterLink>
          <RouterLink
            :to="'/admin-chats-contact'"
            class="d-flex align-items-center"
            @click="sidebarActive('contacts')"
            :class="
              activeSidebar == 'contacts'
                ? 'router-link-active router-link-exact-active'
                : ''
            "
            ><i class="fa-solid fa-user-group"></i
            ><span class="nav-label font-class">Contacts</span></RouterLink
          >
          <RouterLink
            :to="'/admin-chats-analytics'"
            class="d-flex align-items-center"
            @click="sidebarActive('analytics')"
            :class="
              activeSidebar == 'analytics'
                ? 'router-link-active router-link-exact-active'
                : ''
            "
            ><i class="fa-solid fa-chart-column"></i
            ><span class="nav-label font-class">Analytics</span></RouterLink
          >
        </li>
      </ul>
      <ul class="navbar-primary-bottom-menu">
        <li>
          <RouterLink :to="'/admin-settings-generals'" class="d-flex align-items-center"
            ><i class="fa-solid fa-gear"></i
            ><span class="nav-label font-class">Settings</span></RouterLink
          >

          <div class="dropup" @click="showDropDownMenu()">
            <div
              class="sidebar_user d-flex align-items-center dropdown-toggle mb-4 dopp_sidebar_profile"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <template v-if="authUser && authUser.avatar != null">
                <img :src="'https://api.doppcall.com/' + authUser.avatar" alt="image" />
              </template>
              <template v-else>
                <img :src="blankUser" alt="image" />
              </template>
              <div class="user_info">
                <h5 class="nav-label font-class name">
                  {{ authUser && authUser.fname }} {{ authUser && authUser.lname }}
                </h5>
                <p class="nav-label font-class email m-0">
                  {{ authUser && authUser.email }}
                </p>
              </div>
            </div>
            <ul class="dropdown-menu sidebar_user_info_dropdown">
              <li class="pt-2">
                <div
                  class="sidebar_user d-flex align-items-center dropdown-toggle mb-4"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <template v-if="authUser && authUser.avatar != null">
                    <img
                      :src="'https://api.doppcall.com/' + authUser.avatar"
                      alt="image"
                    />
                  </template>
                  <template v-else>
                    <img :src="blankUser" alt="image" />
                  </template>
                  <div class="ms-2 d-grid text-start">
                    <span class="name"
                      >{{ authUser && authUser.fname }}
                      {{ authUser && authUser.lname }}</span
                    >
                    <span class="email">{{ authUser && authUser.email }}</span>
                  </div>
                </div>
              </li>
              <li>
                <RouterLink class="dropdown-item" to="/dashboard/admin_chat"
                  ><i class="fa-solid fa-house-chimney me-2"></i>Back to
                  dashboard</RouterLink
                >
              </li>
              <!-- <li><a class="dropdown-item" href="#"><i class="fa-regular fa-bell me-2"></i>View alerts</a></li> -->
              <!-- <li><a class="dropdown-item" href="#"><i class="fa-solid fa-glasses me-2"></i>Enable invisible mode</a></li> -->
              <!-- <li><a class="dropdown-item" href="#"><i class="fa-regular fa-clock me-2"></i>Availability settings</a></li> -->
              <li>
                <RouterLink class="dropdown-item" to="/dashboard-profile/user"
                  ><i class="fa-regular fa-user me-2"></i>Manage account</RouterLink
                >
              </li>
              <hr />
              <!-- <li><a class="dropdown-item" href="#"><i class="fa-solid fa-gear me-2"></i>Workspace settings</a></li> -->
              <!-- <li><a class="dropdown-item" href="#"><i class="fa-solid fa-plus me-2"></i>Invite an operator</a></li> -->
              <!-- <hr/> -->
              <!-- <li><a class="dropdown-item" href="#"><i class="fa-solid fa-gift me-2"></i>What's new?</a></li> -->
              <hr />
              <li>
                <a
                  @click="logoutAction()"
                  id="logout_btn"
                  class="dropdown-item"
                  href="javascript:"
                  ><i class="fa-solid fa-right-from-bracket me-2"></i>Logout from app</a
                >
              </li>
            </ul>
            <div :id="showDropDown ? 'show_backgroud_overlay' : ''"></div>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import axios from "axios";
import { inject } from "vue";
import blankUser from "../../../../../assets/backend/assets/chats/image/blank_user.png";

window.Pusher = Pusher;
window.Echo = new Echo({
  broadcaster: "pusher",
  key: "4af372a603837e311fb4",
  cluster: "ap2",
  encrypted: true,
  authEndpoint: "https://api.doppcall.com/broadcasting/auth",
  auth: {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  },
});

export default {
  setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
  props: {
    isCollapsed: false,
  },
  data() {
    return {
      showDropDown: false,
      authUser: null,
      blankUser,
      activeSidebar: "inbox",
      onlineUsers: [],
      secondary_logo: "",
      favicon: "",
      totalCountUser: 0,
    };
  },
  watch: {
    "$route.path": function (newPath) {
      if (newPath === "/admin-chats-visitors") {
        this.activeSidebar = "visitors";
      } else if (newPath === "/admin-chats-contact") {
        this.activeSidebar = "contacts";
      } else if (newPath === "/admin-chats-analytics") {
        this.activeSidebar = "analytics";
      } else {
        this.activeSidebar = "inbox";
      }
    },
  },
  mounted() {
    var getUserdata = JSON.parse(localStorage.getItem("user"));
    this.authUser = getUserdata ?? "";
    this.getUser();
    this.listenForOnlineUsers();
    this.fetchHeaderData();
    this.unreadUserCount();
    this.listenForCountMessages(getUserdata.id);
    this.listenForNewChatUser(getUserdata.id);
    const path = this.$route.path;
    if (path == "/admin-chats-visitors") {
      this.activeSidebar = "visitors";
    } else if (path == "/admin-chats-contact") {
      this.activeSidebar = "contacts";
    } else if (path == "/admin-chats-analytics") {
      this.activeSidebar = "analytics";
    } else {
      this.activeSidebar = "inbox";
    }
  },
  methods: {
    getUser() {
      axios
        .get(this.globalVariables.apiUrl + `auth/user/data`, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          this.updateFavicon(res.data.favicon);
        })
        .catch((e) => {
          console.error(e);
        });
    },

    fetchHeaderData() {
      this.getLoader = true; // Show loader while data is being fetched
      axios
        .get(`${this.globalVariables.apiUrl}website/header`, {
          headers: {
            matchToken: `f8jd38skQ2AznZ9xKlmB5Nvy1RTqW7PoL6XYa4CvudJHGFEbkMs03pOwrtgicUhD`,
          },
        })
        .then((res) => {
          const { logo } = res.data;
          this.favicon = logo.favicon;
          this.secondary_logo = logo.logo;
        })
        .catch((error) => {
          console.error("Error fetching header data:", error);
        })
        .finally(() => {
          this.getLoader = false; // Hide loader after data fetch is complete
        });
    },
    unreadUserCount() {
      axios
        .get(`https://api.doppcall.com/api/admin/crisp/chat/total/unred/user/count`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.totalCountUser = res && res.data && res.data.totaluserCount;
        })
        .catch((error) => {
          console.error("Error fetching messages:", error);
        });
    },

    listenForNewChatUser(userId) {
      window.Echo.private(`chatcreate.${userId}`).listen("ChatCreateBroadcast",(event) => {
        this.unreadUserCount();
      }
      );
    },

    listenForCountMessages(userId) {
      window.Echo.private(`recivemessage.${userId}`).listen(
        "ChatMessageReciveEvent",
        (event) => {
          this.unreadUserCount();
        }
      );
    },

    listenForOnlineUsers() {
      this.chatPageNumber = 1;
      window.Echo.join("online-users")
        .here((users) => {
          this.onlineUsers = users;
        })
        .joining((user) => {
          this.onlineUsers.push(user);
        })
        .leaving((user) => {
          this.onlineUsers = this.onlineUsers.filter((u) => u.id !== user.id);
        });
    },

    getSuffix(number) {
      let suffix = "";
      if (number >= 1000000) {
        suffix = "M";
      } else if (number >= 1000) {
        suffix = "K";
      }
      return suffix;
    },

    countByRoleId(roleid) {
      return this.onlineUsers.filter((user) => user.roleid === roleid).length;
    },

    formatNumber(number) {
      number = Number(number);
      if (number >= 1000000) {
        number = number / 1000000;
      } else if (number >= 1000) {
        number = number / 1000;
      }
      if (isNaN(number)) {
        return 0;
      }
      return parseFloat(number.toFixed(2));
    },

    updateFavicon(url) {
      let link =
        document.querySelector("link[rel='icon']") || document.createElement("link");
      link.type = "image/x-icon";
      link.rel = "icon";
      link.href = url;
      document.getElementsByTagName("head")[0].appendChild(link);
    },

    toggleNavbar() {
      this.$emit("toggle-collapse");
    },

    sidebarActive(id) {
      this.activeSidebar = id;
    },

    showDropDownMenu() {
      setTimeout(() => {
        this.showDropDown = !this.showDropDown;
      }, 10);
    },

    logoutAction() {
      axios
        .post(
          this.globalVariables.apiUrl + "logout",
          {},
          { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
        )
        .then((r) => {
          toastr.success("Log out Successfull");
          localStorage.setItem("token", "");
          localStorage.setItem("admin_Id", "");
          // window.location.href =`http://localhost:5173/?token=logout`;
          window.location.href = `https://doppcall.com/?token=logout`;
        })
        .catch((e) => {
          return e;
        });
    },
  },
};
</script>
<style>
#totalActiveUsers {
  position: absolute;
  top: 8px;
  right: 20px;
  background: #1972f5;
  color: white;
  padding: 0px 6px;
  border-radius: 50%;
  height: 22px;
  width: 22px;
  text-align: center;
  line-height: 23px;
}
</style>
