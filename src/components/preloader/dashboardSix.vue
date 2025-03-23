<template>
  <div class="card h-100" id="dashboardSix">
    <div class="card-header d-flex justify-content-between">
      <div class="card-title mb-0">
        <span class="title"></span>
        <span class="subtitle"></span>
      </div>
    </div>
    <div class="card-body">
      <ul class="p-0 m-0">
        <li class="infoSection"></li>
        <li class="infoSection"></li>
        <li class="infoSection"></li>
        <li class="infoSection"></li>
        <li class="infoSection"></li>
        <li class="infoSection"></li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
#dashboardSix .infoSection{
	width: 98% !important;
	background-color: white;
	padding: 23px 0px;
	border-radius: 5px;
	margin-bottom: 16px !important;
	display: block;
	margin-left: 5px;
}
#dashboardSix .title {
  width: 190px !important;
  background-color: white;
  padding: 14px 0px;
  border-radius: 5px;
  margin-bottom: 15px !important;
  display: block;
}
#dashboardSix .subtitle {
  width: 220px !important;
  background-color: white;
  padding: 14px 0px;
  border-radius: 5px;
  display: block;
}
#dashboardSix .infoSection {
  animation: pulse-six 1s infinite;
}

#dashboardSix .subtitle {
  animation: pulse-six 1s infinite;
}
#dashboardSix .title {
  animation: pulse-six 1s infinite;
}

@keyframes pulse-six {
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
