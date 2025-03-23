<template>
  <div v-if="getLoader">
    <Loader></Loader>
  </div>
</template>

<script>
import axios from "axios";
import Loader from "../include/loder.vue";
import toastr from "toastr";
import { inject } from "vue";

export default {
  setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
  components: {
    Loader,
  },
  data() {
    return {
      getLoader: false,
    };
  },
  mounted() {
    this.emailVerify();
  },
  methods: {
    emailVerify() {
      (this.getLoader = true),
        axios
          .get(this.globalVariables.apiUrl + `verify/email/${this.$route.params.token}`, {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          })
          .then((res) => {
            console.log(res.data);
            if (res.data.status == "success") {
              toastr.success(res.data.message);
              this.$router.push("/login");
            } else {
              toastr.error("Email Valiation Error");
              this.$router.push("/login");
            }
          })
          .catch((error) => {
            if (error.response && error.response.data && error.response.data.errors) {
              this.validationErrors = error.response.data.errors;
            }
          })
          .finally(() => {
            this.getLoader = false;
          });
    },
  },
};
</script>
