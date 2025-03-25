import axios from 'axios';
export default {
  install(Vue) {
    let inactivityTimer;
    const maxInactivityDuration = 180 * 180 * 1000;
    // const maxInactivityDuration = 10 * 1000;
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
          window.location.href = 'https://doppcall.com/login?token=logout';
          // const modalElement = document.getElementById("userSessionLogoutModal");
          // if (modalElement) {
          //   if (window.bootstrap) {
          //     const myModal = new window.bootstrap.Modal(modalElement, {
          //       backdrop: "static",
          //       keyboard: false,
          //     });
          //     myModal.show();
          //   } else {
          //     console.error("Bootstrap is not loaded!");
          //   }
          // } else {
          //   console.error("Modal element not found!");
          // }

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
