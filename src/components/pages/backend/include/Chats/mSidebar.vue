<template>
    <nav class="navbar-primary">
     <div class="dopp_sidebar_wrapper">
      <ul class="navbar-primary-menu d-flex justify-content-between bg-white" >
            <li><RouterLink :to="'/admin-mobile-chats'" class="d-flex align-items-center" @click="sidebarMActive('inbox')" :class="activeMenuSidebar == 'inbox' ? 'link-active' : '' "
            ><i class="fa-regular fa-comment-dots"></i
            ></RouterLink> </li>
            <li><RouterLink :to="'/admin-mobile-chat-visitors'" class="d-flex align-items-center" @click="sidebarMActive('visitors')" :class="activeMenuSidebar == 'visitors' ? 'link-active' : '' "
            ><i class="fa-solid fa-globe"></i
            ></RouterLink> </li>
            <li><RouterLink :to="'/admin-mobile-chat-contact'" class="d-flex align-items-center" @click="sidebarMActive('contacts')" :class="activeMenuSidebar == 'contacts' ? 'link-active' : '' "
            ><i class="fa-solid fa-user-group"></i
            ></RouterLink> </li>
            <li><RouterLink :to="'/admin-mobile-chat-analytic'" class="d-flex align-items-center" @click="sidebarMActive('analytics')" :class="activeMenuSidebar == 'analytics' ? 'link-active' : '' "
            ><i class="fa-solid fa-chart-column"></i
            ></RouterLink> </li>
            <li><a href="javascript:" class="d-flex align-items-center">
            <div class="dropup create_converstion_wapper">
              <button type="button"  class="dropdown-toggle border-0 bg-white" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fa-solid fa-ellipsis-vertical"></i>
              </button>
              <ul class="dropdown-menu">
                <li><RouterLink :to="'/admin-settings-generals'" class="dropdown-item"><i class="fa-solid fa-gear"></i><span class="ms-2">Settings</span></RouterLink></li>
                <li><RouterLink class="dropdown-item" to="/dashboard/admin_chat"><i class="fa-solid fa-house-chimney"></i><span class="ms-2">Back to dashboard</span></RouterLink></li>
                <li><RouterLink class="dropdown-item" to="/dashboard-profile/user"><i class="fa-regular fa-user"></i><span class="ms-2">Manage account</span></RouterLink></li>
                <li><a @click="markAllMessageRead()" class="dropdown-item" href="#"><i class="fa-solid fa-check-double"></i><span class="ms-2">Mark all messages as read</span></a></li>
                <li><a @click="markAllResolved()" class="dropdown-item" href="#"><i class="fa-solid fa-check-double"></i><span class="ms-2">Resolve all conversations</span></a></li>
                <li><a @click="logoutAction()" id="logout_btn" class="dropdown-item" href="javascript:"><i class="fa-solid fa-right-from-bracket"></i><span class="ms-2">Logout from app</span></a></li>
              </ul>
            </div>
          </a></li>
      </ul>
     </div>
    </nav>
</template>
  
  <script>
  import axios from 'axios';
  import { inject } from "vue";
  import blankUser from '../../../../../assets/backend/assets/chats/image/blank_user.png';
  
  export default {
    setup() {
      const globalVariables = inject("globalVariables");
      return { globalVariables };
    },
    props: {
      isCollapsed: false,
    },
    data(){
      return {
        showDropDown : false,
        authUser : null,
        blankUser,
        activeMenuSidebar : 'inbox',
      }
    },
    watch: {
      '$route.path': function (newPath) {
        if (newPath === '/admin-mobile-chat-visitors') {
          this.activeMenuSidebar = 'visitors';
        } else if (newPath === '/admin-mobile-chat-contact') {
          this.activeMenuSidebar = 'contacts';
        } else if (newPath === '/admin-mobile-chat-analytic') {
          this.activeMenuSidebar = 'analytics';
        } else {
          this.activeMenuSidebar = 'inbox';
        }
      },
    },
    mounted() {
      var getUserdata = JSON.parse(localStorage.getItem('user'));
      this.authUser = getUserdata ?? '';
      this.getUser();
      const path = this.$route.path;
      if(path == '/admin-mobile-chat-visitors'){
        this.activeMenuSidebar = 'visitors';
      }else if(path == '/admin-mobile-chat-contact'){
        this.activeMenuSidebar = 'contacts';
      }else  if(path == '/admin-mobile-chat-analytic'){
        this.activeMenuSidebar = 'analytics';
      }else{
        this.activeMenuSidebar = 'inbox';
      }
    },
    methods: {
      getUser() {
        axios
          .get(
            this.globalVariables.apiUrl+`auth/user/data`,
            { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
          )
          .then((res) => {
            this.updateFavicon(res.data.favicon);
          })
          .catch((e) => {
            console.error(e);
          });
      },
  
      updateFavicon(url) {
        let link = document.querySelector("link[rel='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'icon';
        link.href = url;
        document.getElementsByTagName('head')[0].appendChild(link);
      }, 
  
      toggleNavbar() {
        this.$emit("toggle-collapse");
      },
  
      sidebarMActive(id) {
        this.activeSidebar = id;
      },
  
      showDropDownMenu() {
        setTimeout(() => {
          this.showDropDown = !this.showDropDown;
        }, 10);
      },
  
      logoutAction () {
        axios.post(this.globalVariables.apiUrl+'logout',{}, { headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}})
        .then((r) => {
          toastr.success('Log out Successfull')
            localStorage.setItem('token', "")
            localStorage.setItem("admin_Id", "");
            // window.location.href =`http://localhost:5173/?token=logout`;
           window.location.href =`https://doppcall.com/?token=logout`;
        })
        .catch((e) => {
          return e
        });
      },
    },
  };
  </script>
<style scoped>
#doppchatarea .link-active {
	background: #1972f5 !important;
	border-radius: 6px !important;
}
#doppchatarea .link-active i {
	color: white !important;
}
</style>