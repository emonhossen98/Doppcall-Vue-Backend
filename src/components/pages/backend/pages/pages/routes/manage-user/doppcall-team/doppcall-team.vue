<template>
  <DoppcallTeams :doppcallTeam="doppcallTeam"></DoppcallTeams>
</template>
<script>
import axios from 'axios'
import DoppcallTeams from "../../../all-pages/manage-user/doppcall-team/doppcall-team.vue";
import { inject } from "vue";

export default {
  setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
  components: {
    DoppcallTeams,
  },
  data() {
    return {
      doppcallTeam: {},
    };
  },
 created() {
    this.getdoppcallTeamData();
    if(localStorage.getItem('token') == "" || localStorage.getItem('token') == null){
      this.$router.push('/')
    }else {
      this.getdoppcallTeamData();
    }
  },
  methods: {
    getdoppcallTeamData() {
        axios.get(this.globalVariables.apiUrl+'admin/manage/doppcall-team', { headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}})
        .then((res) => {
          this.doppcallTeam = res.data;
        })
        .catch((e) => {
           return e
        });
    },
  },
};
</script>
