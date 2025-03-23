<template>
  <BannerEdit :bannerCreate="bannerCreate"></BannerEdit>
</template>
<script>
import axios from 'axios';
import BannerEdit from "../../../all-pages/banner/banner/bannerEdit.vue";
import { inject } from "vue";

export default {
  setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
  components: {
    BannerEdit,
  },
  data() {
    return {
      bannerCreate: "",
    };
  },
  created() {
    this.getbannerData();
    if (localStorage.getItem("token") == "" || localStorage.getItem("token") == null) {
      this.$router.push("/");
    } else {
      this.getbannerData();
    }
  },
  methods: {
    getbannerData() {
      axios
        .get(this.globalVariables.apiUrl+"admin/managebanners/banners/create", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          this.bannerCreate = res.data;
        })
        .catch((e) => {
          return e;
        });
    },
  },
};
</script>
