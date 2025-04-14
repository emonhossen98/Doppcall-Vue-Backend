<template>
  <div class="layout-wrapper layout-content-navbar">
    <div class="layout-container">
      <!-- Menu -->
      <Sidebar :totalCountUser="totalCountUser"></Sidebar>
      <!-- / Menu -->
      <!-- Layout container -->
      <div class="layout-page">
        <!-- Navbar -->
        <Header :totalCountUser="totalCountUser"></Header>
        <!-- / Navbar -->
        <!-- Content wrapper -->
        <div class="content-wrapper">
          <!-- Content -->
          <router-view></router-view>
          <!-- / Content -->
          <!-- Footer -->
          <Footer></Footer>
          <!-- / Footer -->
        </div>
        <!-- Content wrapper -->
      </div>
      <!-- / Layout page -->
    </div>
    <!-- Overlay -->
  </div>
</template>

<script>
import Header from "../include/Header.vue";
import Sidebar from "../include/Sidebar.vue";
import Footer from "../include/Footer.vue";

export default {
  components: {
    Header,
    Sidebar,
    Footer,
  },
  data() {
    return {
      authUserID : "",
      totalCountUser: 0,
    }
  },
  mounted() {
    // Import CSS
    import("../../../../assets/backend/assets/vendor/css/style.css");
    import("../../../../assets/backend/assets/vendor/fonts/fontawesome.css");
    import("../../../../assets/backend/assets/vendor/fonts/tabler-icons.css");
    import("../../../../assets/backend/assets/vendor/fonts/flag-icons.css");
    import("../../../../assets/backend/assets/vendor/css/rtl/core.css");
    import("../../../../assets/backend/assets/vendor/css/rtl/theme-default.css");
    import("../../../../assets/backend/assets/css/demo.css");
    // import("https://cdn.jsdelivr.net/npm/summernote/dist/summernote-lite.min.css");
    import("../../../../assets/backend/assets/vendor/libs/node-waves/node-waves.css");
    import("../../../../assets/backend/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css");
    import("../../../../assets/backend/assets/vendor/libs/apex-charts/apex-charts.css");
    import("../../../../assets/backend/assets/vendor/libs/bootstrap-maxlength/bootstrap-maxlength.css");
    import("../../../../assets/backend/assets/vendor/css/pages/app-chat.css");
    import("../../../../assets/backend/assets/vendor/css/pages/cards-advance.css");
    
    

    // Import JS
    import("../../../../assets/backend/assets/vendor/js/bootstrap.js");
    import("../../../../assets/backend/assets/vendor/libs/datatables-bs5/datatables.bootstrap5.css");
    import("../../../../assets/backend/assets/vendor/libs/datatables-bs5/datatables-bootstrap5.js");
    import("../../../../assets/backend/assets/vendor/libs/datatables-responsive-bs5/responsive.bootstrap5.css");
    import("../../../../assets/backend/assets/vendor/libs/datatables-buttons-bs5/buttons.bootstrap5.css");

    import("https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.17/js/intlTelInput.min.js");
    // Import summernote WYSIWYG editor
    // import("https://cdn.jsdelivr.net/npm/summernote/dist/summernote-lite.min.js");
    this.getUser();
    this.unreadUserCount();
  },
  methods:{
    getUser() {
      var authUser = JSON.parse(localStorage.getItem('authUserFromLocalStorage')) || {};
      this.authUserID = authUser?.data?.id;
      this.listenForCountMessages(authUser?.data?.id);
      var getTotalChatMessageCount =  parseInt(localStorage.getItem("totalChatMessageCount") ?? 0);
      if(getTotalChatMessageCount > 0){
        this.totalChatMessageCount = getTotalChatMessageCount;
        var storeId = document.getElementById('countChats');
        var sidebarChatCount = document.getElementById('sidebarChatCount');
          if (storeId) {
              storeId.innerHTML = getTotalChatMessageCount;
              sidebarChatCount.innerHTML = (getTotalChatMessageCount);
          }
      }
    },
    listenForCountMessages(userId) {
      window.Echo.private(`recivemessage.${userId}`).listen(
        "ChatMessageReciveEvent",
        (event) => {
          this.unreadUserCount();
        }
      );
    },
    unreadUserCount() {
      axios
        .get(`https://api.doppcall.com/api/admin/crisp/chat/total/unred/user/count`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.totalCountUser = res && res.data && res.data .totaluserCount;
        })
        .catch((error) => {
        });
    },
  }
};
</script>

<style>
.page-item.active .page-link, .pagination li.active > a:not(.page-link) {
	border-color: #7367f0 !important;
	background-color: #7367f0 !important;
}

.btn-primary {
	background: #7367f0 !important;
	border-color: #7367f0 !important;
}
.btn-label-primary {
	color: #7367f0 !important;
}

</style>