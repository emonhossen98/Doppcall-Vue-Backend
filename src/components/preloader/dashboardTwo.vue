<template>
  <div class="card dashboardTwoLoader h-100">
    <div class="card-header" >
      <div class="d-flex justify-content-between">
        <div>
          <span class="twotitle"></span>
          <span class="totalUsers">
          </span>
        </div>
        <div>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-4">
          <div class="d-flex gap-2 align-items-center mb-2">
            <span class="totalPublisher"></span>
          </div>
          <span class="percentagePublishers"></span>
        </div>
        <div class="col-4">
      
        </div>
        <div class="col-4 text-end">
          <div class="d-flex gap-2 justify-content-end align-items-center mb-2">
            <span class="totalAdvertisher"></span>
          </div>
          <span class="percentageAdvertisers"></span>
          <!-- <small class="text-muted">{{ Dashboard.advertisers }}</small> -->
        </div>
      </div>
      <div class="d-flex align-items-center mt-4">
        <div class="w-100">
          <span class="totalUsersProgressBar"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.dashboardTwoLoader .twotitle {
	width: 150px !important;
	background-color: #ffffff;
	padding: 12px 0px;
	border-radius: 5px;
	display: block;
}
.dashboardTwoLoader .percentageAdvertisers {
	width: 95% !important;
	background-color: #ffffff;
	padding: 12px 0px;
	border-radius: 5px;
	display: block;
	margin-left: 6px;
}
.dashboardTwoLoader .percentagePublishers {
	width: 95% !important;
	background-color: #ffffff;
	padding: 12px 0px;
	border-radius: 5px;
	display: block;
	margin-left: 6px;
}
.dashboardTwoLoader .totalPublisher {
	width: 100% !important;
	background-color: #ffffff;
	padding: 12px 0px;
	border-radius: 5px;
	display: block;
	margin-left: 6px;
}
.dashboardTwoLoader .totalUsersProgressBar {
	width: 100% !important;
	background-color: #ffffff;
	padding: 12px 0px;
	border-radius: 5px;
	display: block;
	margin-left: 6px;
}
.dashboardTwoLoader .totalAdvertisher {
	width: 100% !important;
	background-color: #ffffff;
	padding: 12px 0px;
	border-radius: 5px;
	display: block;
	margin-left: 6px;
}
.dashboardTwoLoader .totalUsers {
	width: 150px !important;
	background-color: #ffffff;
	padding: 12px 0px;
	border-radius: 5px;
	display: block;
    margin-top:10px;
}
.dashboardTwoLoader .percentageAdvertisers {
	animation: pulse-second 1s infinite;
}
.dashboardTwoLoader .percentagePublishers {
	animation: pulse-second 1s infinite;
}
.dashboardTwoLoader .totalUsersProgressBar {
	animation: pulse-second 1s infinite;
}
.dashboardTwoLoader .totalAdvertisher {
	animation: pulse-second 1s infinite;
}
.dashboardTwoLoader .totalPublisher {
	animation: pulse-second 1s infinite;
}
.dashboardTwoLoader .totalUsers {
	animation: pulse-second 1s infinite;
}

.dashboardTwoLoader .twotitle {
  animation: pulse-second 1s infinite;
}

@keyframes pulse-second {
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
