<template>
    <Publishers :publishers="publishers"></Publishers>
</template>
<script>
import axios from 'axios';
  import Publishers from "../../../all-pages/payments/publisher/publishers.vue";
  import { inject } from "vue";
  
  export default {
    setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
    components: {
      Publishers,
    },
    data() {
    return {
      publishers: {},
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
        axios.get(this.globalVariables.apiUrl+'admin/payments/publishers', { headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}})
        .then((res) => {
          this.publishers = res.data;
        })
        .catch((e) => {
           return e
        });
    },
  },
  };
  </script>