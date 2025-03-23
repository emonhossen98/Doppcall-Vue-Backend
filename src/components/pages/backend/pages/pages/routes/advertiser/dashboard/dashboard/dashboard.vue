<template>
  <Dashboard :Banners="Banners"></Dashboard>
</template>

<script>
import axios from "axios";
import Dashboard from '../../../../all-pages/advertiser/dashboard/dashboard/dashboard.vue';
import { inject } from "vue";

export default {
  setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
components: {
  Dashboard,
},
data: () => {
  return {
    Banners : "",
  };
},
mounted() {
  this.getAdvertiserData();
},
methods: {
  getAdvertiserData() {
    axios
      .get(this.globalVariables.apiUrl+"advertiser/dashboard", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        this.Banners = res.data.banners;
      })
      .catch((error) => {
        return error;
      })
      .finally(() => {
        this.getLoader = false;
      });
  },
},
};
</script>