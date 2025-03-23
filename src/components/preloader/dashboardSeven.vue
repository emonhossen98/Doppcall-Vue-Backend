<template>
  <div class="card" id="dashboardSeven">
    <div class="card-header d-flex justify-content-between pb-1">
      <span class="title"></span>
    </div>
    <div class="card-body">
      <div class="d-flex align-items-center">
        <span class="subtitle"></span>
      </div>
      <div id="totalEarningChart" class="pb-3" style="overflow: hidden"></div>
      <div class="infoSection"></div>
      <div class="infoSection"></div>
    </div>
  </div>
</template>
<style scoped>
#dashboardSeven .infoSection {
	width: 98% !important;
	background-color: white;
	padding: 22px 0px;
	border-radius: 5px;
	display: block;
	margin-left: 5px;
    margin-bottom: 20px;
}
#dashboardSeven .title {
  width: 160px !important;
  background-color: white;
  padding: 14px 0px;
  border-radius: 5px;
  margin-bottom: 10px !important;
  display: block;
}
#dashboardSeven .subtitle {
  width: 200px !important;
  background-color: white;
  padding: 14px 0px;
  border-radius: 5px;
  margin-bottom: 10px !important;
  display: block;
  margin-left: 5px;
}
#dashboardSeven #totalEarningChart{
	background-color: #ddd;
	overflow: hidden;
	border: none !important;
	border-radius: 10px;
	width: 97% !important;
	height: 241px !important;
	display: block;
	margin-top: 10px !important;
	margin-left: 6px;
	margin-bottom: 1.5rem;
}
#dashboardSeven .infoSection {
  animation: pulse-seven 1s infinite;
}
#dashboardSeven #totalEarningChart {
  animation: pulse-seven 1s infinite;
}
#dashboardSeven .subtitle {
  animation: pulse-seven 1s infinite;
}
#dashboardSeven .title {
  animation: pulse-seven 1s infinite;
}

@keyframes pulse-seven {
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
