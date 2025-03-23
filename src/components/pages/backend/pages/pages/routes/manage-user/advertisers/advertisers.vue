<template>
    <Advertisers :advertisersIndex="advertisersIndex"></Advertisers>
</template>
<script>
  import axios from 'axios'
  import Advertisers from "../../../all-pages/manage-user/advertisers/advertisers.vue";
  import { inject } from "vue";
  
  export default {
    setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
    components: {
      Advertisers,
    },
    data() {
    return {
      advertisersIndex: {},
    };
  },
  created() {
    this.getadvertisersIndexData();
    if(localStorage.getItem('token') == "" || localStorage.getItem('token') == null){
      this.$router.push('/')
    }else {
      this.getadvertisersIndexData();
    }
  },
  methods: {
    getadvertisersIndexData() {
        axios.get(this.globalVariables.apiUrl+'admin/manage/publishers', { headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}})
        .then((res) => {
          this.advertisersIndex = res.data;
        })
        .catch((e) => {
           return e
        });
    },
  },
  };
  </script>
