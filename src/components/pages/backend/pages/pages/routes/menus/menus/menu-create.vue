<template>
    <MenuCreate :MenuCreatePageData="MenuCreatePageData"></MenuCreate>
</template>
  <script>
  import axios from "axios";
  import MenuCreate from "../../../all-pages/menus/menus/menu-create.vue";
  import { inject } from "vue";
  
  export default {
    setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
    components: {
      MenuCreate,
    },
    data() {
      return {
        MenuCreatePageData: {},
      };
    },
    created() {
    this.getMenuCreateDataData();
    if (localStorage.getItem("token") == "" || localStorage.getItem("token") == null) {
      this.$router.push("/");
    } else {
      this.getMenuCreateDataData();
    }
  },
    methods: {
      getMenuCreateDataData() {
        axios
          .get(this.globalVariables.apiUrl+"admin/menus/create", {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          })
          .then((res) => {
            this.MenuCreatePageData = res.data;
          })
          .catch((e) => {
            return e;
          });
      },
    },
  };
  </script>
