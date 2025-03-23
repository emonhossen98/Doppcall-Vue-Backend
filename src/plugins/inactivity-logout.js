import axios from 'axios';
import { Modal } from "bootstrap";
export default {
  install(Vue) {
    let inactivityTimer;
    const maxInactivityDuration = 60 * 60 * 1000;
    // const maxInactivityDuration = 60 * 1000;
    let lastActivityTime = Date.now();

    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        
        localStorage.setItem('token', "");
        localStorage.setItem('admin_Id', "");
        localStorage.removeItem('chatUserStoreIds');
        axios
          .post(
            'https://api.doppcall.com/api/logout',{},
            { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
          )
          .then((res) => {
            console.log(res);
          });
        let myModal = new Modal(document.getElementById("userSessionLogoutModal"), {
          backdrop: "static", // Prevent closing on outside click
          keyboard: false, // Optional: Prevent closing with ESC key
        });
        myModal.show();
      }, maxInactivityDuration);
    };

    const userActivityEvents = ['mousemove', 'keydown', 'click', 'scroll'];
    userActivityEvents.forEach((event) => {
      window.addEventListener(event, () => {
        lastActivityTime = Date.now();
        resetInactivityTimer();
      });
    });

    resetInactivityTimer();
  },
};
