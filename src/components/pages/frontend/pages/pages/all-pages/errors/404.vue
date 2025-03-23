<template>
  <div v-if="getLoader">
    <Loader></Loader>
  </div>
  <div>
    <section class="pb-5">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="text-center">
              <img :src="globalVariables.appUrl+'images/404.png'" alt="404 Image" />
              <h5 class="mt-2 fw-bold color-p">Sorry ! Page Not Found !</h5>
              <div class="mt-4">
                <RouterLink :to="'/'" class="btn btn-md primary-bg text-light me-2">Back to Home</RouterLink>
                <RouterLink :to="'/login'" class="btn btn-md border primary-btn"> Login Again!</RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import Loader from '../../../../include/loder.vue';
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
      getLoader: true, 
    };
  },
  mounted() {
    setTimeout(() => {
      this.getLoader = false; 
    }, 2000); 
  },
};
</script>
