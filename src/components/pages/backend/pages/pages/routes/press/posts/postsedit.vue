<template>
    <PostsEdit :postEditData="postEditData"></PostsEdit>
</template>
  <script>
  import axios from 'axios';
  import PostsEdit from "../../../all-pages/press/posts/postsedit.vue";
  import { inject } from "vue";
  
  export default {
    setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
    components: {
        PostsEdit,
    },
    data() {
    return {
      postEditData: {},
    };
  },
  created() {
    this.getpostEditDataData();
    if (localStorage.getItem("token") == "" || localStorage.getItem("token") == null) {
      this.$router.push("/");
    } else {
      this.getpostEditDataData();
    }
  },
  methods: {
    getpostEditDataData() {
      axios
        .get(this.globalVariables.apiUrl+"admin/pressPost/create", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          this.postEditData = res.data;
        })
        .catch((e) => {
          return e;
        });
    },
  },
  };
  </script>