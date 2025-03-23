<template>
    <QuestionsCreate :QuestionsCreateData="QuestionsCreateData"></QuestionsCreate>
</template>
  <script>
  import axios from "axios";
  import QuestionsCreate from "../../../all-pages/faq/questions/questions-edit.vue";
  import { inject } from "vue";
  
  export default {
    setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
    components: {
      QuestionsCreate,
    },
    data() {
      return {
        QuestionsCreateData: {},
      };
    },
    created() {
      this.getQuestionsCreateDataData();
      if (localStorage.getItem("token") == "" || localStorage.getItem("token") == null) {
        this.$router.push("/");
      } else {
        this.getQuestionsCreateDataData();
      }
    },
    methods: {
      getQuestionsCreateDataData() {
        axios
          .get(this.globalVariables.apiUrl+"admin/faq/questions/create", {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          })
          .then((res) => {
            this.QuestionsCreateData = res.data;
          })
          .catch((e) => {
            return e;
          });
      },
    },
  };
  </script>
  