<template>
  <OfferCreates :OfferCreate="OfferCreate"></OfferCreates>
</template>

<script>
import axios from "axios";
import OfferCreates from "../../../all-pages/manageOffers/all-offers/allOffersCreate.vue";
import { inject } from "vue";

export default {
  setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
  components: {
    OfferCreates,
  },
  data() {
    return {
      OfferCreate: {},
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
        .get(this.globalVariables.apiUrl+"admin/offers/create", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          this.OfferCreate = res.data;
        })
        .catch((e) => {
          return e;
        });
    },
  },
};
</script>
