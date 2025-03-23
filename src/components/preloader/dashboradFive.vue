<template>
  <div class="card h-100" id="dashboardFive">
    <div class="card-header d-flex justify-content-between pb-0">
      <div class="card-title mb-0">
        <span class="title"></span>
        <span class="subtitle"></span>
      </div>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-12 col-sm-4 col-md-12 col-lg-4">
          <div class="mt-lg-4 mt-lg-2 mb-lg-4 mb-2 pt-1">
            <span class="totalTickets"></span>
          </div>
          <ul class="p-0 m-0">
            <li class="infoSection"></li>
            <li class="infoSection"></li>
            <li class="infoSection"></li>
          </ul>
        </div>
        <div class="col-12 col-sm-8 col-md-12 col-lg-8">
          <div id="totalTicketChatss"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
#dashboardFive .infoSection {
	width: 260px !important;
	background-color: white;
	padding: 20px 0px;
	border-radius: 5px;
	margin-bottom: 20px !important;
	display: block;
	margin-left: 5px;
}
#dashboardFive .title {
  width: 350px !important;
  background-color: white;
  padding: 14px 0px;
  border-radius: 5px;
  margin-bottom: 10px !important;
  display: block;
}
#dashboardFive .subtitle {
  width: 400px !important;
  background-color: white;
  padding: 14px 0px;
  border-radius: 5px;
  margin-bottom: 10px !important;
  display: block;
}
#dashboardFive .totalTickets {
  width: 150px !important;
  background-color: white;
  padding: 14px 0px;
  border-radius: 5px;
  margin-bottom: 10px !important;
  display: block;
  margin-left: 5px;
}

#dashboardFive #totalTicketChatss {
	background-color: #ddd;
	overflow: hidden;
	border: none !important;
	border-radius: 10px;
	width: 70% !important;
	height: 241px !important;
	display: block;
	margin-top: 2rem !important;
	margin-left: 5rem;
}
#dashboardFive .infoSection {
  animation: pulse-five 1s infinite;
}
#dashboardFive .totalTickets {
  animation: pulse-five 1s infinite;
}
#dashboardFive #totalTicketChatss {
  animation: pulse-five 1s infinite;
}
#dashboardFive .subtitle {
  animation: pulse-five 1s infinite;
}
#dashboardFive .title {
  animation: pulse-five 1s infinite;
}

@keyframes pulse-five {
  0% {
    background-color: #ddd;
  }
  50% {
    background-color: #c5c5c5;
  }
  100% {
    background-color: #ddd;
  }
}
</style>
