<template>
  <div class="card h-100" id="dashboradFour">
    <div class="card-header pb-2 d-flex justify-content-between mb-lg-n4">
      <div class="card-title mb-0">
        <span class="title"></span>
        <span class="subtitle"></span>
      </div>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-12 col-md-12" style="overflow: hidden">
          <div id="weeklyEarningReports" class="mt-3"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
#dashboradFour .title {
  width: 350px !important;
  background-color: white;
  padding: 14px 0px;
  border-radius: 5px;
  margin-bottom: 10px !important;
  display: block;
}
#dashboradFour .subtitle {
  width: 400px !important;
  background-color: white;
  padding: 14px 0px;
  border-radius: 5px;
  margin-bottom: 10px !important;
  display: block;
}

#dashboradFour #weeklyEarningReports[data-v-18e9b08c] {
	background-color: #ddd;
	overflow: hidden;
	border: none !important;
	border-radius: 10px;
	width: 98% !important;
	height: 258px !important;
	display: block;
	margin: 0px 6px;
	margin-top: 2rem !important;
}

#dashboradFour #weeklyEarningReports {
  animation: pulse-four 1s infinite;
}
#dashboradFour .subtitle {
  animation: pulse-four 1s infinite;
}
#dashboradFour .title {
  animation: pulse-four 1s infinite;
}


@keyframes pulse-four {
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
