<template>
  <JobCareerCreate :jobCreate="jobCreate"></JobCareerCreate>
</template>
<script>
import axios from 'axios';
import JobCareerCreate from "../../../all-pages/career/career/jobcreate.vue";
import { inject } from "vue";

export default {
  setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
  components: {
    JobCareerCreate,
  },
  data() {
    return {
      jobCreate: {},
    };
  },
 created() {
    this.getJobData();
    if(localStorage.getItem('token') == "" || localStorage.getItem('token') == null){
      this.$router.push('/')
    }else {
      this.getJobData();
    }
  },
  methods: {
    getJobData() {
        axios.get(this.globalVariables.apiUrl+'admin/career/jobcareer/create', { headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}})
        .then((res) => {
          this.jobCreate = res.data;
        })
        .catch((e) => {
           return e
        });
    },
  },
};
</script>