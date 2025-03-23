<template>
  <div class="card" id="dashboardThree">
    <div class="card-body pb-0">
      <div class="card-icon">
        <span class="totalUserIcon"> </span>
      </div>
      <span class="totalUsers"></span>
      <span  class="totalUsersText"></span>
    </div>
    <div id="revenueGenerated"></div>
  </div>
</template>
<style scoped>
#dashboardThree .totalUserIcon[data-v-1bf977e3] {
	width: 20% !important;
	background-color: white;
	padding: 12px 0px;
	border-radius: 5px;
	margin-bottom: 5px !important;
	display: block;
}
#dashboardThree .totalUsers {
	width: 30% !important;
	background-color: white;
	padding: 12px 0px;
	border-radius: 5px;
	margin-bottom: 5px !important;
	display: block;
}
#dashboardThree .totalUsersText {
	width: 40% !important;
	background-color: white;
	padding: 12px 0px;
	border-radius: 5px;
	margin-bottom: 5px !important;
	display: block;
}

#dashboardThree #revenueGenerated {
	background-color: #ddd;
	overflow: hidden;
	border: none !important;
	border-radius: 10px;
	width: 89% !important;
	height: 119px !important;
	display: block;
	margin: 0px 20px;
	margin-bottom: 4px;
}

#dashboardThree #revenueGenerated {
  animation: pulse-background 1s infinite;
}
#dashboardThree .totalUsersText {
  animation: pulse-background 1s infinite;
}
#dashboardThree .totalUsers {
  animation: pulse-background 1s infinite;
}
#dashboardThree .totalUserIcon {
  animation: pulse-background 1s infinite;
}

@keyframes pulse-background {
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
