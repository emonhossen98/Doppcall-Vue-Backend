<script>
import axios from "axios";
import { inject } from "vue";
export default {
  setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
  data() {
    return {};
  },
  mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
        localStorage.setItem('token', token);
        this.getUserData();
    }else{
      window.location.href = `http://doppcall.com`;
    }
  },
  methods: {
    getUserData() {
      axios
        .get(this.globalVariables.apiUrl + "auth/user/data", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          if(res.data && res.data.userWithChats){
              localStorage.setItem('authUserFromLocalStorage', JSON.stringify(res.data));
              if(res && res.data && res.data.userWithChats && res.data.userWithChats.role && res.data.userWithChats.role.name == 'Super' || res && res.data && res.data.userWithChats && res.data.userWithChats.role && res.data.userWithChats.role.name == 'Admin'){
               var user = JSON.stringify(res.data.userWithChats);
               localStorage.setItem("user", user);
               this.$router.push({ path: `/dashboard/user` });

             }else if(res && res.data && res.data.userWithChats && res.data.userWithChats.role && res.data.userWithChats.role.name == 'Advertiser'){
               var user = JSON.stringify(res.data.user);
               localStorage.setItem("user", user);
               this.$router.push({ path: `/advertiser/dashboard/user` });

             }else if(res && res.data && res.data.userWithChats && res.data.userWithChats.role && res.data.userWithChats.role.name == 'Publisher'){
               var user = JSON.stringify(res.data.user);
               localStorage.setItem("user", user);
               this.$router.push({ path: `/publisher/dashboard/user` });

             }else if(res && res.data && res.data.userWithChats && res.data.userWithChats.role && res.data.userWithChats.role.name == 'Account manager'){
               var user = JSON.stringify(res.data.user);
               localStorage.setItem("user", user);
               this.$router.push("/account/dashboard/user"); 
             }else if(res && res.data && res.data.userWithChats && res.data.userWithChats.role && res.data.userWithChats.role.name == 'Author'){
              var user = JSON.stringify(res.data.user);
              localStorage.setItem("user", user);
              this.$router.push("/author/dashboard/user");
             }
            }
        })
        .catch((error) => {
          return error;
        });
    },
  },
};
</script>
