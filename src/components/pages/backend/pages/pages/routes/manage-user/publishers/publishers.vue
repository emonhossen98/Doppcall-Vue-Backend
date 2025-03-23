<template>
  <Publisher :publisherIndex="publisherIndex"></Publisher>
</template>
<script>
import axios from 'axios'
import Publisher from "../../../all-pages/manage-user/publishers/publishers.vue";
import { inject } from "vue";

export default {
  setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
  components: {
    Publisher,
  },
  data() {
    return {
      publisherIndex: {},
    };
  },
  created() {
    this.getpublisherData();
    if(localStorage.getItem('token') == "" || localStorage.getItem('token') == null){
      this.$router.push('/')
    }else {
      this.getpublisherData();
    }
  },
  methods: {
    getpublisherData() {
        axios.get(this.globalVariables.apiUrl+'admin/manage/publishers', { headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}})
        .then((res) => {
          this.publisherIndex = res.data;
        })
        .catch((e) => {
           return e
        });
    },
  },
};
</script>
