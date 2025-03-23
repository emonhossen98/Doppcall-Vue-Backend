<template>
  <section id="doppchatarea">
    <div class="dopp_desk_chat d-flex">
      <div class="d_chat_sidebar">
        <Sidebar :isCollapsed="isCollapsed" @toggle-collapse="toggleNavbar" />
      </div>
      <div :class="['d_chat_content', { narrow: isCollapsed }]">
        <div class="d_chat_content_wapper">
         <template v-if="showRouterView">
          <router-view></router-view>
         </template>
        </div>
      </div>
    </div>
    <div class="dopp_mob_chat d-none">
      <div :class="['d_chat_content', { narrow: isCollapsed }]">
        <div class="d_chat_content_wapper">
          <template v-if="showRouterMView">
          <router-view></router-view>
         </template>
        </div>
      </div>
      <div class="d_chat_sidebar">
        <mSidebar :isCollapsed="isCollapsed" @toggle-collapse="toggleNavbar" />
      </div>
    </div>
  </section>
</template>

<script>
import Sidebar from "../include/Chats/Sidebar.vue";
import mSidebar from "../include/Chats/mSidebar.vue";
import 'bootstrap/dist/css/bootstrap.css';

export default {
  components: {
    Sidebar,
    mSidebar,
  },
  data() {
    return {
      authUserID: "",
      isCollapsed: false,
      showRouterView : true,
      showRouterMView : true,
    };
  },
  mounted() {
    import('../../../../assets/backend/assets/chats/style.css')
    import("../../../../assets/backend/assets/vendor/fonts/fontawesome.css");
    import("../../../../assets/backend/assets/vendor/libs/bootstrap-maxlength/bootstrap-maxlength.css");
    import('../../../../assets/backend/assets/chats/responcive.css')
    import("../../../../assets/backend/assets/vendor/js/bootstrap.js");
    const path = this.$route.path;
    if(path == '/admin-mobile-chat-visitors'){
      this.showRouterView = false;
    }else if(path == '/admin-mobile-chat-analytic'){
      this.showRouterView = false;
    }else if(path == '/admin-chats-analytics'){
      this.showRouterMView = false;
    }
  },
  watch: {
    '$route.path': function (newPath) {
      if (newPath === '/admin-mobile-chat-visitors') {
        this.showRouterView = false;
      }else if(newPath == '/admin-mobile-chat-analytic'){
        this.showRouterView = false;
      }else if(newPath == '/admin-chats-analytics'){
        this.showRouterMView = false;
      }
    },
  },
  methods: {
    toggleNavbar() {
      this.isCollapsed = !this.isCollapsed;
    }
  },
};
</script>

