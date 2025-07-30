<template>
    <ChatsLogs :roles="roles"></ChatsLogs>
</template>
<script>
import axios from "axios";
  import ChatsLogs from "../../../all-pages/live-chat/live-chat/chatLogs.vue";
import { inject } from "vue";
  
  export default {
    setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
    components: {
      ChatsLogs,
    },
    data() {  
      return {
        roles: "",
      };
    },
    mounted() {
      this.getRolesData();
    },
    methods: {
      getRolesData() {
        axios
          .get(this.globalVariables.apiUrl+"admin/export/users", {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          })
          .then((res) => {
            this.roles = res.data;
          })
          .catch((e) => {
            return e;
          });
      },
    },
  };
  </script>
  
