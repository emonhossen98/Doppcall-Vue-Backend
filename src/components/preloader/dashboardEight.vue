<template>
  <div class="card h-100" id="dashboardEight">
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
#dashboardEight .infoSection {
  width: 98% !important;
  background-color: white;
  padding: 22px 0px;
  border-radius: 5px;
  display: block;
  margin-left: 5px;
  margin-bottom: 20px;
}
#dashboardEight .title {
  width: 160px !important;
  background-color: white;
  padding: 14px 0px;
  border-radius: 5px;
  margin-bottom: 10px !important;
  display: block;
}
#dashboardEight .subtitle {
  width: 200px !important;
  background-color: white;
  padding: 14px 0px;
  border-radius: 5px;
  margin-bottom: 10px !important;
  display: block;
}

#dashboardEight .infoSection {
  animation: pulse-eight 1s infinite;
}

#dashboardEight .subtitle {
  animation: pulse-eight 1s infinite;
}
#dashboardEight .title {
  animation: pulse-eight 1s infinite;
}

@keyframes pulse-eight {
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
