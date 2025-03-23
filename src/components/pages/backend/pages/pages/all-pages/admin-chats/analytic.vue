<template>
    <div class="analytics-page">
        <div class="analytics-header">
            <div>
                <i class="fa-solid fa-chart-line"></i><span class="nav-label font-class ms-2">Analytics</span>
            </div>
            <div class="d-flex align-items-center ms-auto ">
                <!-- <div class="date_select"> -->
                  <!-- <input ref="dateInput" type="text" />
                  <div id="startDate">Start date: {{ startDate }}</div>
                  <div id="endDate">End date: {{ endDate }}</div> -->
                  <!-- <i class="fa-solid fa-calendar-days me-2"></i>Select Date -->
                <!-- </div> -->
                <!-- <div class="area_select">
                    <select class="form-select" name="area">
                        <option>Select Area</option>
                        <option>Aria/Dhaka</option>
                        <option>Select Area</option>
                        <option>Select Area</option>
                        <option>Select Area</option>
                    </select>
                </div> -->
            </div>
        </div>
        <div id="analytics-rate">
            <div class="analytics-rate">
                <div class="row g-4">
                    <div class="col-12 col-md-4">
                        <div class="card">
                            <div class="d-flex align-items-center">
                                <i id="icons" class="fa-solid fa-question me-2"></i>
                                <span id="name">Converstions</span>
                            </div>
                            <span id="countNumber">{{ chatUsers ?? '0' }}</span>
                        </div>
                    </div>
                    <div class="col-12 col-md-4">
                        <div class="card">
                            <div class="d-flex align-items-center">
                                <i id="icons" class="fa-solid fa-question me-2"></i>
                                <span id="name">Visitors</span>
                            </div>
                            <span id="countNumber">{{ countByRoleId(3) + countByRoleId(2) + countByRoleId(6)  }}</span>
                        </div>
                    </div>
                    <div class="col-12 col-md-4">
                        <div class="card">
                            <div class="d-flex align-items-center">
                                <i id="icons" class="fa-solid fa-question me-2"></i>
                                <span id="name">Total Users</span>
                            </div>
                            <span id="countNumber">{{ users ?? '0' }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="analytics-chart mt-4">
                <div  class="card">
                    <div class="card-header">
                        <div class="d-flex align-items-center">
                            <i id="icons" class="fa-solid fa-question me-2"></i>
                            <span id="name">Converstions</span>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="h-100">
                            <div class="row">
                                <div class="col-12 col-md-12" style="overflow: hidden">
                                  <div id="parDateVisitoresReports" class="mt-3"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="analytics-chart mt-4">
                <div  class="card">
                    <div class="card-header">
                        <div class="d-flex align-items-center">
                            <i id="icons" class="fa-solid fa-question me-2"></i>
                            <span id="name">Converstions Per Period</span>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="h-100">
                            <div class="row">
                                <div class="col-12 col-md-12" style="overflow: hidden">
                                  <div id="weekDateVisitoresReports" class="mt-3"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ApexCharts from "apexcharts";
import axios from "axios";
import { inject } from "vue";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { fetchUserRole } from "@/services/userService";

// import moment from 'moment';
// import $ from 'jquery';
// window.$ = $;
// window.jQuery = $;

window.Pusher = Pusher;
window.Echo = new Echo({
  broadcaster: "pusher",
  key: "4af372a603837e311fb4",
  cluster: "ap2",
  encrypted: true,
  authEndpoint: 'https://api.doppcall.com/broadcasting/auth',
    auth: {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    }
});

export default {
  setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
  data() {
    return {
        onlineUsers : [],
        chatUsers : null,
        users : null,
        startDate: '',
        endDate: '',
    };
  },
  async mounted() {
    // try {
      const { role, isAuthorized } = await fetchUserRole();
      if (role == 'Super' || role == 'Admin') {
        this.getCountData();
        this.listenForOnlineUsers();

        // const input = this.$refs.dateInput;
        // console.log($.fn.daterangepicker)
        // if (window.$ && $.fn.daterangepicker) {
        //   $(input).daterangepicker({}, (start, end) => {
        //     this.startDate = start.format('YYYY-MM-DD');
        //     this.endDate = end.format('YYYY-MM-DD');
        //   });
        // } else {
        //   console.error('daterangepicker is not available');
        // }
      }
    // } catch (error) {
    //   console.error("Error fetching user role:", error);
    // }
  },
  activated() {
    this.listenForOnlineUsers();
  },
  deactivated() {
    if (window.Echo) {
      window.Echo.leave('online-users');
    }
  },
  watch: {
    '$route.path'(newPath, oldPath) {
      this.listenForOnlineUsers();
    },
  },
  methods: {
    getCountData() {
      axios
        .get(this.globalVariables.apiUrl + "admin/crisp/chat/anaylicts/user", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
            this.chatUsers = res.data.chatUsers;
            this.users = res.data.users;
            this.renderChart(res.data.visitor,res.data.lastSevenDays);
        })
        .catch((e) => {
          console.error(e);
        });
    },
    countByRoleId(roleid){
      return this.onlineUsers.filter(user => user.roleid === roleid).length;
    },
    listenForOnlineUsers() {
      this.cleanupOnlineUsersListener();
      window.Echo.join("online-users")
        .here((users) => {
          this.onlineUsers = users;
        })
        .joining((user) => {
          this.onlineUsers.push(user);
        })
        .leaving((user) => {
          this.onlineUsers = this.onlineUsers.filter((u) => u.id !== user.id);
        });
    },
    renderChart(visitor,visitors) {
      var option = {
            series: [{
              data: visitor,
          }],
            chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'straight'
          },
          title: {
            align: 'left'
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'],
              opacity: 0.5
            },
          },
          xaxis: {
            categories: ['0h', '1h', '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '21h', '22h', '23h'],
          },
          tooltip: {
            enabled: true, 
            shared: true,
            y: {
              formatter: function (value) {
                return `${value} Visitors`; 
              }
            }
          }
        };
        // var parDateVisitores = new ApexCharts(document.querySelector("#parDateVisitoresReports"), option);
        // parDateVisitores.render();

        const parDateVisitoresElement = document.querySelector("#parDateVisitoresReports");
        if (parDateVisitoresElement) {
          var parDateVisitores = new ApexCharts(parDateVisitoresElement, option);
          parDateVisitores.innerHTML = '';
          parDateVisitores.render();
        }


        const dynamicVisitor = visitors.map((visitor) => ({
          name: visitor.day,
          data: visitor.slots,
        }));

        var options = {
          series: dynamicVisitor,
          chart: {
          height: 400,
          type: 'heatmap',
        },
        stroke: {
          width: 0
        },
        plotOptions: {
          heatmap: {
            radius: 3,
            enableShades: false,
          }
        },
        dataLabels: {
          enabled: true,
          style: {
            colors: ['#fff']
          }
        },
        tooltip: {
          enabled: false, 
        },
        yaxis: {
          categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri','Sat',],
        },
        xaxis: {
          categories: ['0h', '1h', '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '21h', '22h', '23h'],
        },
        };

        // var weekDateVisitores = new ApexCharts(document.querySelector("#weekDateVisitoresReports"), options);
        // weekDateVisitores.render();

        const weekDateVisitoresElement = document.querySelector("#weekDateVisitoresReports");
        if (weekDateVisitoresElement) {
          var weekDateVisitores = new ApexCharts(weekDateVisitoresElement, options);
          weekDateVisitores.innerHTML = '';
          weekDateVisitores.render();
        }
    },
    cleanupOnlineUsersListener() {
      if (window.Echo) {
        window.Echo.leave('online-users');
      }
    },
  },
  beforeUnmount() {
    this.cleanupOnlineUsersListener();
  },
};
</script>
<style>
#parDateVisitoresReports > div:nth-child(2) {
    display: none;
}
#weekDateVisitoresReports > div:nth-child(2) {
    display: none;
}
</style>