<template>
  <Menus :MenusData="MenusData"></Menus>
</template>
<script>
import axios from "axios";
import Menus from "../../../all-pages/menus/menus/menus.vue";
import { inject } from "vue";

export default {
  setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
  components: {
    Menus,
  },
  data() {
    return {
      MenusData: {},
    };
  },
  created() {
    this.getMenusDataData();
    if (localStorage.getItem("token") == "" || localStorage.getItem("token") == null) {
      this.$router.push("/");
    } else {
      this.getMenusDataData();
    }
  },
  methods: {
    getMenusDataData() {
      axios
        .get(this.globalVariables.apiUrl+"admin/menus", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          this.MenusData = res.data;
        })
        .catch((e) => {
          return e;
        });
    },
  },
};
</script>
