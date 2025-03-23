<template>
  <div class="px-4 mt-4">
    <div class="row">
      <div class="col-md-7">
        <SkeletonShape type="text" animation="wave" :width="'50%'" :height="'38px'"  :radius="5" />
      </div>
      <div class="col-md-5 d-flex align-items-center">
        <SkeletonShape type="text" animation="wave" :width="'90%'" :height="'38px'" :radius="5" />
        <SkeletonShape type="text" animation="wave" :width="'90%'" :height="'38px'" :radius="5"/>
        <SkeletonShape type="text" animation="wave" :width="'90%'" :height="'38px'" :radius="5" />
        <SkeletonShape  type="text" animation="wave" :width="'90%'" :height="'38px'" :radius="5"/>
      </div>
    </div>
  </div>
  <hr />
  <div>
    <table class="table">
      <thead>
        <tr class="px-4">
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td colspan="2">Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import "easy-skeleton-loader-vue/styles.css";
import { SkeletonShape } from "easy-skeleton-loader-vue";

export default {
  components: {
    SkeletonShape,
  },
};
</script>
