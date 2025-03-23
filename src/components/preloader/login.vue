<template>
    <div class="profile-card">
        <div class="profile-image">
            <img class="profile-image__img" />
        </div>
    </div>
</template>
<style scoped>
.profile-card .profile-image__img {
  width: 96px  !important;
  height: 96px  !important;
  border-radius: 5%  !important;
  background-color: #ddd;
  border: none
}
@keyframes pulse-bg {
  0% {
    background-color: #ddd;
  }
  50% {
    background-color: #9e9e9e;
  }
  100% {
    background-color: #ddd;
  }
}
.profile-card .profile-image__img {
  animation: pulse-bg 1s infinite;
}

</style>