<template>
  <div class="swiper-slide dashboardOneLoader">
    <div class="row">
      <div class="col-12">
        <h5 class="text-white mb-0 mt-2 title"></h5>
        <p class="text-white sub_title"></p>
      </div>
      <div class="row">
        <div class="col-lg-7 col-md-9 col-12 order-2 order-md-1">
          <h6 class="text-white mt-0 mt-md-3 mb-3 font-class userAnalytics"></h6>
          <div class="row">
            <div class="col-6">
              <ul class="list-unstyled mb-0">
                <li class="d-flex mb-4 align-items-center">
                  <p
                    class="mb-0 fw-medium me-2 website-analytics-text-bg text-white font-class getTextOne"
                  >
                  </p>
                </li>
                <li class="d-flex align-items-center mb-2">
                  <p
                    class="mb-0 fw-medium me-2 website-analytics-text-bg text-white font-class getTextTwo"
                  >
                  </p>
                </li>
              </ul>
            </div>
            <div class="col-6">
              <ul class="list-unstyled mb-0">
                <li class="d-flex mb-4 align-items-center">
                  <p
                    class="mb-0 fw-medium me-2 website-analytics-text-bg text-white font-class getTextThree"
                  >
                  </p>
                </li>
                <li class="d-flex align-items-center mb-2">
                  <p
                    class="mb-0 fw-medium me-2 website-analytics-text-bg text-white font-class getTextFour"
                  >
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-lg-5 col-md-3 col-12 order-1 order-md-2 my-4 my-md-0 text-center">
          <div class="profile-card">
            <span class="slider_img_chart"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>

.dashboardOneLoader {
	width: 100% !important;
	border-radius: 10px;
	padding: 3px 30px;
  background-color: #ffffff;
}
.dashboardOneLoader .title {
	width: 40% !important;
	background-color: white;
	padding: 12px 0px;
	border-radius: 5px;
    margin-bottom : 10px !important;
}
.dashboardOneLoader .sub_title {
	width: 40% !important;
	background-color: white;
	padding: 12px 0px;
	border-radius: 5px;
}

.dashboardOneLoader .userAnalytics {
	width: 40% !important;
	background-color: white;
	padding: 12px 0px;
	border-radius: 5px;
}

.dashboardOneLoader .getTextOne {
	width: 100% !important;
	background-color: white;
	padding: 12px 0px;
	border-radius: 5px;
}
.dashboardOneLoader .getTextTwo {
	width: 100% !important;
	background-color: white;
	padding: 12px 0px;
	border-radius: 5px;
}
.dashboardOneLoader .getTextThree {
	width: 100% !important;
	background-color: white;
	padding: 12px 0px;
	border-radius: 5px;
}
.dashboardOneLoader .getTextFour {
	width: 100% !important;
	background-color: white;
	padding: 12px 0px;
	border-radius: 5px;
}
.dashboardOneLoader .slider_img_chart {
	background-color: #ddd;
	overflow: hidden;
	border: none !important;
	border-radius: 10px;
	width: 70% !important;
	height: 130px !important;
	display: block;
	margin-left: 2rem;
	margin-bottom: 14px;
}

.dashboardOneLoader .getTextOne {
	animation: pulse-bg 1s infinite
}
.dashboardOneLoader .getTextTwo {
	animation: pulse-bg 1s infinite
}
.dashboardOneLoader .getTextThree {
	animation: pulse-bg 1s infinite
}
.dashboardOneLoader .getTextFour {
	animation: pulse-bg 1s infinite
}
.dashboardOneLoader .userAnalytics {
	animation: pulse-bg 1s infinite
}
.dashboardOneLoader .sub_title {
	animation: pulse-bg 1s infinite
}
.dashboardOneLoader .title{
    animation: pulse-bg 1s infinite
}


.dashboardOneLoader .slider_img_chart {
  animation: pulse-bg 1s infinite
}


@keyframes pulse-bg {
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
