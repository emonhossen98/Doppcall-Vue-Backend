<template>
    <Tickets :roles="roles"></Tickets>
</template>
<script>
import axios from "axios";
import Tickets from "../../../all-pages/support-tickets/tickets/tickets.vue";
import { inject } from "vue";
  
  export default {
    setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
    components: {
      Tickets,
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
  
