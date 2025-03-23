<template>
  <!-- Footer -->
  <footer class="content-footer footer bg-footer-theme">
    <div class="container-xxl">
        <div class="d-flex align-items-center justify-content-center py-3" v-html="footer.copyright">
        </div>
    </div>
  </footer>
  <!-- / Footer -->
</template>
<script>
import axios from "axios";
import { inject } from "vue";
export default {
  setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
  data() {
    return {
      footer: "",
    };
  },
  mounted() {
    this.getfooters();
  },
  methods: {
    getfooters() {
      axios.get(this.globalVariables.apiUrl+"website/footer", {
            headers: { matchToken: `f8jd38skQ2AznZ9xKlmB5Nvy1RTqW7PoL6XYa4CvudJHGFEbkMs03pOwrtgicUhD` }
        })
      .then((res) => {
        this.footer = res.data.footer;
      });
    },
  },
};
</script>
