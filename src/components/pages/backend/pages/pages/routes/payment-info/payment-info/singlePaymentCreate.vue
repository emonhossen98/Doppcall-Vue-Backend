<template>
    <PaymentInfoCreate :Users="Users"></PaymentInfoCreate>
</template>
  <script>
  import axios from "axios";
  import PaymentInfoCreate from "../../../all-pages/payment-info/payment-info/singlePaymentCreate.vue";
  import { inject } from "vue";
  
  export default {
    setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
    components: {
      PaymentInfoCreate,
    },
    data() {
      return {
        Users: {},
      };
    },
    created() {
      this.getusersData();
      if (localStorage.getItem("token") == "" || localStorage.getItem("token") == null) {
        this.$router.push("/");
      } else {
        this.getusersData();
      }
    },
    methods: {
      getusersData() {
        axios
          .get(this.globalVariables.apiUrl+"admin/payment/system/publisher/create/info", {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          })
          .then((res) => {
            this.Users = res.data;
          })
          .catch((e) => {
            return e;
          });
      },
    },
  };
  </script>
  