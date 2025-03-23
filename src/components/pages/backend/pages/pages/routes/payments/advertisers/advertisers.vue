<template>
  <Advertiser :advertisers="advertisers"></Advertiser>
</template>
<script>
import axios from "axios";
import Advertiser from "../../../all-pages/payments/advertisers/advertisers.vue";
import { inject } from "vue";

export default {
  setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
  components: {
    Advertiser,
  },
  data() {
    return {
      advertisers: "",
    };
  },
  created() {
    this.getadvertiserData();
    if (localStorage.getItem("token") == "" || localStorage.getItem("token") == null) {
      this.$router.push("/");
    } else {
      this.getadvertiserData();
    }
  },
  methods: {
    getadvertiserData() {
      axios
        .get(this.globalVariables.apiUrl+"admin/payments/advertisers", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          this.advertisers = res.data;
        })
        .catch((e) => {
          return e;
        });
    },
  },
};
</script>
