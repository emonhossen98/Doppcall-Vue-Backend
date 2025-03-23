<template>
    <Exports :roles="roles"></Exports>
</template>
<script>
import axios from "axios";
import Exports from "../../../all-pages/exports/exports/exports.vue";
import { inject } from "vue";
  
  export default {
    setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
    components: {
      Exports,
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
  