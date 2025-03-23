<template>
  <div class="col app-chat-contacts app-sidebar flex-grow-0 overflow-hidden border-end" id="app-chat-contacts">
    <div class="sidebar-header">
      <div class="d-flex align-items-center me-3 me-lg-0">
        <div
          class="flex-shrink-0 avatar avatar-online me-3"
          data-bs-toggle="sidebar"
          data-overlay="app-overlay-ex"
          data-target="#app-chat-sidebar-left"
        >
          <template v-if="user.avatar != null">
            <img
              class="user-avatar rounded-circle cursor-pointer"
              :src="globalVariables.appUrl+user.avatar"
              alt="Avatar"
            />
          </template>
          <template v-else>
            <img
              class="user-avatar rounded-circle cursor-pointer"
              :src="blank_user"
              alt="Avatar"
            />
          </template>
        </div>
        <div class="flex-grow-1 input-group input-group-merge rounded-pill">
          <span class="input-group-text" id="basic-addon-search31"
            ><i class="ti ti-search"></i
          ></span>
          <input
            type="text"
            class="form-control chat-search-input"
            placeholder="Search..."
            aria-label="Search..."
            aria-describedby="basic-addon-search31"
            v-model="searchEmail.email"
            @input="searchUsers()"
          />
        </div>
      </div>
      <i
        class="ti ti-x cursor-pointer d-lg-none d-block position-absolute mt-2 me-1 top-0 end-0"
        data-overlay
        data-bs-toggle="sidebar"
        data-target="#app-chat-contacts"
      ></i>
    </div>
    <hr class="container-m-nx m-0" />
    <div class="sidebar-body" @scroll="onScroll">
      <div class="chat-contact-list-item-title">
        <h5 class="text-primary mb-0 px-4 pt-3 pb-2">Chats</h5>
      </div>
      <!-- Chats -->
      <ul class="list-unstyled chat-contact-list" id="chat-list">
        <template v-if="chatMessageUser.length > 0">
          <li
            v-for="(getuser, index) in chatMessageUser"
            :key="index"
            :class="{ 'active': selectedUser === index }"
            class="chat-contact-list-item"
            @click="startChatWithUser(getuser, index)"
          >
            <a class="d-flex align-items-center">
              <div class="flex-shrink-0 avatar avatar-online">
                <template v-if="getuser.avatar != null">
                  <img
                    :src="globalVariables.appUrl+ getuser.avatar"
                    alt="Avatar"
                    class="rounded-circle"
                  />
                </template>
                <template v-else>
                  <img :src="blank_user" alt="Avatar" class="rounded-circle" />
                </template>
              </div>
              <div class="chat-contact-info flex-grow-1 ms-2">
                <h6 class="chat-contact-name text-truncate m-0 font-class">
                  {{ getuser.fname }} {{ getuser.lname }}
                </h6>
                <p class="chat-contact-status text-muted text-truncate mb-0 font-class">
                  {{ getuser && getuser.role && getuser.role.name }}
                </p>
              </div>
            </a>
          </li>
        </template>
        <template v-else>
          <p class="font-class px-4">No User Found !</p>
        </template>
      </ul>
      <!-- Contacts -->
      <ul class="list-unstyled chat-contact-list mb-0" id="contact-list">
        <li class="chat-contact-list-item chat-contact-list-item-title">
          <h5 class="text-primary mb-0">Contacts</h5>
        </li>
        <template v-if="chatAllUser">
          <li
            v-for="(user, index) in chatAllUser"
            :key="index"
            class="chat-contact-list-item"
            @click="startChatWithUser(user)"
          >
            <a class="d-flex align-items-center">
              <div class="flex-shrink-0 avatar avatar-online">
                <template v-if="user.avatar != null">
                  <img
                    :src="globalVariables.appUrl+ user.avatar"
                    alt="Avatar"
                    class="rounded-circle"
                  />
                </template>
                <template v-else>
                  <img :src="blank_user" alt="Avatar" class="rounded-circle" />
                </template>
              </div>
              <div class="chat-contact-info flex-grow-1 ms-2">
                <h6 class="chat-contact-name text-truncate m-0 font-class">
                  {{ user.fname }} {{ user.lname }}
                </h6>
                <p class="chat-contact-status text-muted text-truncate mb-0 font-class">
                  {{ user && user.role && user.role.name }}
                </p>
              </div>
            </a>
          </li>
        </template>
      </ul>
      <div v-if="loading" class="loading">Loading...</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import blank_user from "../../../../../../../../assets/backend/assets/img/blank_user.png";
import { inject } from "vue";

export default {
  setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
  emits: ["renderChat", "userinfo"],
  props: ["chatAllUser", "chatMessageUser"],
  data() {
    return {
      chat_id: null,
      user_id: "",
      chats: [],
      onlineUsers: [],
      users: [],
      allusers: "",
      username: "",
      userposition: "",
      blank_user,
      user: "",
      role: "",
      searchEmail: {
        email: "",
      },
      chatAllUser: [],
      chatMessageUser: [],
      email: "",
      page: 1,
      perPage: 10,
      loading: false,
      allDataLoaded: false,
      selectedUser: null,
    };
  },

  mounted: function () {
    this.$nextTick(this.getAllUser);
    this.$nextTick(this.getUser);
    this.$nextTick(this.listenForOnlineUsers);
  },
  methods: {

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
    countByRoleId(roleid){
      return this.onlineUsers.filter(user => user.roleid === roleid).length;
    },
    async OpentChat(chat_id) {
      if (this.chat_id) {
        await window.Echo.leave("chat." + this.chat_id);
      }
      this.chat_id = chat_id;
      this.$emit("renderChat", chat_id);
    },

    searchUsers() {
      this.getLoader = true;
      if (this.searchEmail != "") {
        axios
          .post(this.globalVariables.apiUrl+`admin/chat/search-user`, this.searchEmail, {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          })
          .then((res) => {
            this.chatAllUser = res.data.users;
            this.chatMessageUser = res.data.chatUsers;
          })
          .catch((error) => {
            console.error(error);
          })
          .finally(() => {
            this.getLoader = false;
          });
      } else {
        this.getAllUser();
      }
    },

    getAllUser() {
      if (this.loading || this.allDataLoaded) return;
      this.loading = true;
      axios
        .get(
          this.globalVariables.apiUrl+`admin/chat/getalluser?page=${this.page}&per_page=${this.perPage}`,
          {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          }
        )
        .then((res) => {
          if (res.data.users.length) {
            this.chatAllUser.push(...res.data.users);
            this.chatMessageUser.push(...res.data.chatUsers);
            this.page += 1;
          } else {
            this.allDataLoaded = true;
          }
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    getUser() {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl+`auth/user/data`, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          this.user = res.data.data;
          this.role = res.data.role;
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    async onSubmit() {
      const user =
        this.chatAllUser.find((user) => user.email === this.email) ??
        this.chatMessageUser.find((user) => user.email === this.email);
      const data = new FormData();
      data.append("users[]", user.id);
      data.append("isPrivate", 1);
      axios
        .post(this.globalVariables.apiUrl+`admin/chat/create-chat`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.OpentChat(res.data.chat.id);
        })
        .catch((error) => {
          this.isSendingForm = false;
          console.error(error);
        });
    },

    startChatWithUser(user,index) {
      this.email = user.email;
      this.username = user.fname;
      this.user_id = user.id;
      this.userposition = user.role.name;
      this.onSubmit();
      this.selectedUser = index;
    },

    onScroll(event) {
      const { scrollTop, clientHeight, scrollHeight } = event.target;
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        this.getAllUser();
      }
    },

    chatStatusClass(status) {
      switch (status) {
        case "online":
          return "avatar-online";
        case "offline":
          return "avatar-offline";
        case "busy":
          return "avatar-busy";
        default:
          return "";
      }
    },

    userStatusClass(status) {
      return this.chatStatusClass(status);
    },
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
.loading {
  text-align: center;
  padding: 10px;
}
.chat-contact-list-item.active h6 {
  color: white;
  font-weight: 600 !important;
}
.chat-contact-list-item.active p {
  color: white;
  font-weight: 600 !important;
}
.chat-contact-list-item.active img {
  outline: 2px solid #fff;
}


/* // listenForCountMessages(userId) {
    //   window.Echo.private(`recivemessage.${userId}`).listen("ChatMessageReciveEvent", (event) => {
    //     this.totalChatMessageCount = this.totalChatMessageCount + 1;
    //     localStorage.setItem("totalChatMessageCount", this.totalChatMessageCount);
    //     var storeId = document.getElementById('countChats');
    //     if (storeId) {
    //         storeId.innerHTML = this.totalChatMessageCount;
    //     }
    //   });
    // }, */
</style>
