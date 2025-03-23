<template>
  <AddNewUser :addNewUser="addNewUser"></AddNewUser>
</template>
<script>
import axios from 'axios'
import AddNewUser from "../../../all-pages/manage-user/add-new-user/add-new-user.vue";
import { inject } from "vue";

export default {
  setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
  components: {
    AddNewUser,
  },
  data() {
    return {
      addNewUser: {},
    };
  },
  created() {
    this.getaddNewUserData();
    if (localStorage.getItem("token") == "" || localStorage.getItem("token") == null) {
      this.$router.push("/");
    } else {
      this.getaddNewUserData();
    }
  },
  methods: {
    getaddNewUserData() {
      axios
        .get(this.globalVariables.apiUrl+"admin/manage/user/create", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          this.addNewUser = res.data;
        })
        .catch((e) => {
          return e;
        });
    },
  },
};
</script>
