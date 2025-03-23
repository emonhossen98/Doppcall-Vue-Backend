<template>
    <PostsCreate :postCreateData="postCreateData"></PostsCreate>
</template>
  <script>
  import axios from 'axios';
  import PostsCreate from "../../../all-pages/blog/posts/postscreate.vue";
  import { inject } from "vue";
  
  export default {
    setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
    components: {
        PostsCreate,
    },
    data() {
    return {
      postCreateData: {},
    };
  },
  created() {
    this.getpostCreateDataData();
    if (localStorage.getItem("token") == "" || localStorage.getItem("token") == null) {
      this.$router.push("/");
    } else {
      this.getpostCreateDataData();
    }
  },
  methods: {
    getpostCreateDataData() {
      axios
        .get(this.globalVariables.apiUrl+"admin/blog/posts/create", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          this.postCreateData = res.data;
        })
        .catch((e) => {
          return e;
        });
    },
  },
  };
  </script>