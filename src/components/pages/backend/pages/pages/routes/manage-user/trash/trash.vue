<template>
  <Trash :roles="roles"></Trash>
</template>
<script>
import axios from "axios";
import Trash from "../../../all-pages/manage-user/trash/trash.vue";
import { inject } from "vue";
  
  export default {
    setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
    components: {
      Trash,
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
  
