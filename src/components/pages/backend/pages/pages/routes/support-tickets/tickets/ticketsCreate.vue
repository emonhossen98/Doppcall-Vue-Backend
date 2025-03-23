<template>
    <TicketCreate :ticketIndex="ticketIndex"></TicketCreate>
</template>
  <script>
  import axios from 'axios';
  import TicketCreate from "../../../all-pages/support-tickets/tickets/ticketsCreate.vue";
  import { inject } from "vue";
  
  export default {
    setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
    components: {
      TicketCreate,
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
  