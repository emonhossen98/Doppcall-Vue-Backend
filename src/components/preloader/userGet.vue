<template>
    <li class="chat-contact-list-item" id="nouserSections">
      <a class="d-flex align-items-center">
        <div class="flex-shrink-0 avatar">
           <span id="userImage"></span>
        </div>
        <div class="chat-contact-info flex-grow-1 ms-2">
          <h6 class="chat-contact-name text-truncate m-0 font-class title">
          </h6>
            <p class="chat-contact-status text-truncate mb-0 font-class subtitle" >
            </p>
        </div>
      </a>
    </li>
</template>
  <style scoped>
  #nouserSections #userImage {
      width: 40px !important;
      height: 40px !important;
      border-radius: 50% !important;
      background-color: #ddd;
      border: none;
      display: block;
  }
  #nouserSections .title {
      width: 240px  !important;
      background-color: white;
      padding: 10px 0px;
      border-radius: 5px;
      margin-bottom: 4px !important;
      display: block;
  }
  #nouserSections .subtitle {
      width: 240px  !important;
      padding: 10px 0px;
      border-radius: 5px;
      display: block;
  }
  #nouserSections #userImage  {
    animation: pulse-nouser 1s infinite;
  }
  #nouserSections .title  {
    animation: pulse-nouser 1s infinite;
  }
  #nouserSections .subtitle  {
    animation: pulse-nouser 1s infinite;
  }
  
  @keyframes pulse-nouser {
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
  