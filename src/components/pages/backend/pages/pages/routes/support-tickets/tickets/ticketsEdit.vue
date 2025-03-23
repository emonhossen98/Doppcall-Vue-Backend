<template>
    <TicketEdit :ticketIndex="ticketIndex"></TicketEdit>
</template>
  <script>
  import axios from 'axios';
  import TicketEdit from "../../../all-pages/support-tickets/tickets/ticketsEdit.vue";
  import { inject } from "vue";
  
  export default {
    setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
    components: {
      TicketEdit,
    },
    data() {
    return {
      ticketIndex: {},
    };
  },
 created() {
    this.getTicketsData();
    if(localStorage.getItem('token') == "" || localStorage.getItem('token') == null){
      this.$router.push('/')
    }else {
      this.getTicketsData();
    }
  },
  methods: {
    getTicketsData() {
        axios.get(this.globalVariables.apiUrl+'admin/tickets/create', { headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}})
        .then((res) => {
          this.ticketIndex = res.data;
        })
        .catch((e) => {
           return e
        });
    },
  },
  };
  </script>
  