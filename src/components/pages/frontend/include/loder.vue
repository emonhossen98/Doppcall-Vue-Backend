<template>
  <div id="frontend-loader">
    <img :src="LoaderImage" class="loader-img" alt="Loader" />
  </div>
</template>
<script>
import LoaderImage from "../../../../assets/image/loader.svg";
export default {
  data() {
    return {
      LoaderImage,
    };
  },
};
</script>
<style scoped>
#frontend-loader {
  align-items: center !important;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background: #ffffff;
  display: flex;
  justify-content: center;
}
</style>
