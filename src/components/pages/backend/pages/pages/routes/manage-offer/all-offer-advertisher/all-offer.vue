<template>
  <AllOffers :OfferIndex="OfferIndex" />
</template>

<script>
import axios from 'axios';
import AllOffers from "../../../all-pages/manageOffers/all-offers-advertisher/allOffers.vue";
import { inject } from "vue";
export default {
  setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
  components: {
    AllOffers,
  },
  data() {
    return {
      OfferIndex: {},
    };
  },
  created() {
    this.getOfferData();
    if (localStorage.getItem("token") == "" || localStorage.getItem("token") == null) {
      this.$router.push("/");
    } else {
      this.getOfferData();
    }
  },
  methods: {
    getOfferData() {
      axios
        .get(this.globalVariables.apiUrl+"admin/offers", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          this.OfferIndex = res.data;
        })
        .catch((e) => {
          return e;
        });
    },
  },
};
</script>
