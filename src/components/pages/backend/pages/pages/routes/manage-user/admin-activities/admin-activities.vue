<template>
    <AdminActivities :roles="roles"></AdminActivities>
</template>

<script>
import axios from "axios";
  import AdminActivities from "../../../all-pages/manage-user/admin-activities/admin-activities.vue";
import { inject } from "vue";
  
  export default {
    setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
    components: {
      AdminActivities,
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
  

  