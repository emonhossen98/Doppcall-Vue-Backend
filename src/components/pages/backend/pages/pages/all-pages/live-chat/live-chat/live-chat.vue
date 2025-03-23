<template>
  <div v-if="getLoader">
    <Loader></Loader>
  </div>
  <!-- Content wrapper -->
  <div class="content-wrapper px-3" id="createNewChatSelect">
    <div class="container-xxl flex-grow-1 container-p-y">
      <div class="row mt-4 bg-chat">
         <div class="app-chat card overflow-hidden px-0">
          <div class="row g-0">
            <div class="col app-chat-contacts app-sidebar flex-grow-0 overflow-hidden border-end" id="app-chat-contacts">
              <div class="sidebar-header">
                <div class="d-flex align-items-center me-3 me-lg-0">
                  <div class="flex-shrink-0 avatar avatar-online me-3" data-bs-toggle="sidebar" data-overlay="app-overlay-ex"
                    data-target="#app-chat-sidebar-left">
                    <template v-if="authUser.avatar != null">
                      <img  class="user-avatar rounded-circle cursor-pointer" :src="'https://api.doppcall.com/'+authUser.avatar"  alt="Avatar"/>
                    </template>
                    <template v-else>
                      <img class="user-avatar rounded-circle cursor-pointer" :src="blank_user" alt="Avatar"/>
                    </template>
                  </div>
                  <div class="flex-grow-1 input-group input-group-merge rounded-pill">
                    <span class="input-group-text" id="basic-addon-search31"
                      ><i class="ti ti-search"></i
                    ></span>
                    <input type="text" class="form-control chat-search-input" placeholder="Enter Email.." aria-label="Search..." aria-describedby="basic-addon-search31"
                      v-model="searchEmail.email" @keyup="searchUsers()" /> 
                  </div>
                </div>
                <i  class="ti ti-x cursor-pointer d-lg-none d-block position-absolute mt-2 me-1 top-0 end-0" data-overlay
                  data-bs-toggle="sidebar" @click="hideSmailChat()"  data-target="#app-chat-contacts"></i>
              </div>
              <hr class="container-m-nx m-0" />
              <div class="sidebar-body position-relative">
              <div>
                  <div class="panel panel-primary tabs-style-2">
                    <div class="panel-body tabs-menu-body main-content-body-right">
                      <div class="tab-content p-0" id="tab-content-card">
                        <div class="tab-pane active">
                          <div class="d-flex flex-column justify-content-between">
                            <div class="chats_tab_bar">
                            <ul class="nav panel-tabs main-nav-line px-2 justify-content-between message-filter top-filter">
                              <li>
                                <a title="Chats" class="fw-six-hundred "  @click="changeParnetChatTab('chats')" :class="ActiveParentTab == 'chats' ? 'active' : ''"
                                  data-toggle="tab"><i class="fa-solid fa-message"></i></a>
                              </li>
                              <li class="position-relative">
                                <a title="Visitors" class="fw-six-hundred" @click="changeParnetChatTab('activity')" :class="ActiveParentTab == 'activity' ? 'active' : ''"
                                  data-toggle="tab">
                                  <i class="fa-solid fa-earth-americas"></i>
                                 <template v-if="countByRoleId(2) + countByRoleId(3) > 0">
                                   <span id="totalActiveUsers">{{ formatNumber(countByRoleId(2) + countByRoleId(3)) }} {{ getSuffix(countByRoleId(2) + countByRoleId(3)) }}</span>
                                 </template>
                                </a>
                              </li>
                              <li>
                                <a title="Contact" class="fw-six-hundred" @click="changeParnetChatTab('contact')" :class="ActiveParentTab == 'contact' ? 'active' : ''"
                                  data-toggle="tab" ><i class="fa-solid fa-user"></i></a>
                              </li>
                              <li>
                                <RouterLink :to="'/admin-chats-logs'" title="Chat Logs" class="fw-six-hundred"><i class="fa-solid fa-trash-can"></i></RouterLink>
                              </li>
                            </ul>
                          </div>

                        <div class="panel panel-primary tabs-style-2" >
                            <div class="panel-body tabs-menu-body main-content-body-right">
                              <div class="tab-content py-0 px-0" id="tab-content-card-second">
                                <div class="tab-pane" :class="ActiveParentTab == 'chats' ? 'active' : ''">
                                  <div class="panel panel-primary tabs-style-2">
                                    <div class="panel-body tabs-menu-body main-content-body-right">
                                      <div class="tab-content p-0" id="tab-content-card">
                                        <div class="tab-pane active">
                                          <div class="d-flex flex-column justify-content-between">
                                            <div class="chats_tab_bar">
                                            <ul id="chatTabsMain" class="nav panel-tabs main-nav-line px-2 justify-content-between message-filter">
                                              <li>
                                                <a title="All" class="fw-six-hundred "  @click="changeChatTab('allChats')" :class="ActiveChatTab == 'allChats' ? 'active' : ''"
                                                  data-toggle="tab">All</a>
                                              </li>
                                              <li>
                                                <a title="Unread" class="fw-six-hundred" @click="changeChatTab('unread')" :class="ActiveChatTab == 'unread' ? 'active' : ''"
                                                  data-toggle="tab">
                                                  Unread
                                                </a>
                                              </li>
                                              <li>
                                                <a title="Unresolved" class="fw-six-hundred" @click="changeChatTab('unresolved')" :class="ActiveChatTab == 'unresolved' ? 'active' : ''"
                                                  data-toggle="tab" >Unresolved</a>
                                              </li>
                                              <li class="filter_dropdown_area">
                                                <a title="Campaigns" class="fw-six-hundred" data-toggle="tab">New Chat</a>
                                                <div class="filter_dropdown">
                                                  <button  @click="callToSelectJs()" data-bs-toggle="modal" data-bs-target="#createNewChat"><i class="fa-solid fa-plus"></i>Create a new conversation</button>
                                                  <button  @click="markAllMessageRead()"> <i class="ti ti-checks ti-xs"></i>Mark all messages as read</button>
                                                  <button  @click="markAllResolved()"> <i class="ti ti-checks ti-xs"></i>Resolve all conversations</button>
                                                  <hr class="my-0"></hr>
                                                  <button @click="changeChatTabFilters('filters','mentions')"><i class="fa fa-at"></i>Mentions</button>
                                                  <button @click="changeChatTabFilters('filters','most_resent')"><i class="fa fa-arrow-up"></i>Most Recent</button>
                                                  <!-- <button @click="changeChatTabFilters('filters','longest_waiting')"><i class="fa-regular fa-clock"></i>Longest Waiting</button> -->
                                                  <button @click="changeChatTabFilters('filters','resolved')"><i class="fa fa-check"></i>Resolved</button>
                                                </div>
                                              </li>
                                            </ul>
                                          </div>

                                        <div class="panel panel-primary tabs-style-2" id="side-bar-scroll" @scroll="onScroll">
                                            <div class="panel-body tabs-menu-body main-content-body-right">
                                              <div class="tab-content py-0 px-0" id="tab-content-card-second">
                                               <div  id="chat_loader" v-if="runChatLoader">
                                                <div class="spinner-border text-secondary" role="status">
                                                  <span class="visually-hidden">Loading...</span>
                                                </div>
                                               </div>
                                                <div class="tab-pane" :class="ActiveChatTab == 'allChats' ? 'active' : ''">
                                                  <ul class="list-unstyled chat-contact-list px-2 mt-2" id="chat-list">
                                                      <template v-if="chatUsers.length > 0">
                                                        <li v-for="(getuser, index) in chatUsers" :key="index" :class="{ 'active': selectedUser === index }" class="chat-contact-list-item"
                                                          @click="getConversationData(getuser.id, index)">
                                                          <a class="d-flex align-items-center">
                                                            <div class="flex-shrink-0 avatar" :class="isOnline(getuser.id) ? 'avatar-online' : 'avatar-offline'">
                                                              <template v-if="getuser.avatar != null">
                                                                <img :src="'https://api.doppcall.com/'+ getuser.avatar" alt="Avatar" class="rounded-circle" />
                                                              </template>
                                                              <template v-else>
                                                                <img :src="blank_user" alt="Avatar" class="rounded-circle" />
                                                              </template>
                                                            </div>
                                                            <div class="chat-contact-info flex-grow-1 ms-2">
                                                              <h6 class="chat-contact-name text-truncate m-0 font-class position-relative">
                                                                {{ getuser.fname }} 
                                                                <template v-if="userByCountChat(getuser.id) > 0">
                                                                  <span class="totalUserMessageCount">{{ userByCountChat(getuser.id) }}</span>
                                                                </template>
                                                              </h6>
                                                              <template v-if="getuser && getuser.latest_message && getuser.latest_message.message">
                                                                  <template v-if="getuser && getuser.latest_message && getuser.latest_message.type == 'audio'">
                                                                    <p class="mb-0 text-muted">{{'audio'}}</p>
                                                                  </template>
                                                                  <template v-else-if="getuser && getuser.latest_message && getuser.latest_message.type == 'image'">
                                                                    <p class="mb-0 text-muted">{{ 'image' }}</p> 
                                                                  </template>
                                                                  <template v-else>
                                                                    <p class="mb-0 text-muted">{{ 'message' }}</p>
                                                                  </template>
                                                              </template>
                                                            </div>
                                                          </a>
                                                          <div class="chat-contact-info">
                                                            <template v-if="getuser && getuser.latest_message && getuser.latest_message.created_at">
                                                              <p class="chat-contact-status text-muted mb-0 font-class text-center">
                                                                {{ formatTimestamp(getuser && getuser.latest_message && getuser.latest_message.created_at) }}
                                                              </p>
                                                            </template>
                                                              <!-- <template v-if="getuser && getuser.chatInfo && getuser.chatInfo[0] && getuser.chatInfo[0].chat && getuser.chatInfo[0].chat.status == 0">
                                                                <i id="unsolved" class="fa-solid fa-arrow-right bg-danger text-white"></i>
                                                              </template>
                                                              <template v-else>
                                                                <i  id="solved" class="fa-solid fa-check bg-success text-white"></i>
                                                              </template> -->
                                                          </div>
                                                        </li>
                                                        <template v-if="showUserGetLoader">
                                                          <userGetPreLoader></userGetPreLoader>
                                                        </template>
                                                      </template>
                                                      <template v-else>
                                                        <div class="no_data_found text-center">
                                                          <img :src="no_message" alt="image">
                                                          <h5 class="mb-0"> No message found</h5>
                                                          <p class="mb-0">All messages appear here.</p>
                                                       </div>
                                                      </template>
                                                    </ul>
                                                </div>
                                                <div  class="tab-pane" :class="ActiveChatTab == 'unread' ? 'active' : ''" >
                                                  <ul class="list-unstyled chat-contact-list px-2 mt-2" id="chat-list">
                                                      <template v-if="unreadMessages.length > 0">
                                                        <li v-for="(getuser, index) in unreadMessages" :key="index" :class="{ 'active': selectedUser === index }" class="chat-contact-list-item"
                                                          @click="getConversationData(getuser.user_id, index)">
                                                          <a class="d-flex align-items-center">
                                                            <div class="flex-shrink-0 avatar" :class="isOnline(getuser.user_id) ? 'avatar-online' : 'avatar-offline'">
                                                              <template v-if="getuser && getuser.sender && getuser.sender.avatar != null">
                                                                <img :src="'https://api.doppcall.com/'+ getuser.sender.avatar" alt="Avatar" class="rounded-circle" />
                                                              </template>
                                                              <template v-else>
                                                                <img :src="blank_user" alt="Avatar" class="rounded-circle" />
                                                              </template>
                                                            </div>
                                                            <div class="chat-contact-info flex-grow-1 ms-2">
                                                              <h6 class="chat-contact-name text-truncate m-0 font-class">
                                                                {{ getuser.sender.fname }}
                                                              </h6>
                                                              <template v-if="getuser && getuser.message">
                                                                  <template v-if="getuser && getuser.message.type == 'audio'">
                                                                    <p class="mb-0 text-muted">{{'audio'}}</p>
                                                                  </template>
                                                                  <template v-else-if="getuser &&  getuser.message.typee == 'image'">
                                                                    <p class="mb-0 text-muted">{{ 'image' }}</p> 
                                                                  </template>
                                                                  <template v-else>
                                                                    <p class="mb-0 text-muted">{{ 'message' }}</p>
                                                                  </template>
                                                              </template>
                                                            </div>
                                                          </a>
                                                          <div class="chat-contact-info">
                                                            <template v-if="getuser && getuser.created_at">
                                                              <p class="chat-contact-status text-truncate mb-0 text-muted text-center">
                                                                {{ formatTimestamp(getuser && getuser.created_at) }}
                                                              </p>
                                                            </template>
                                                              <!-- <template v-if="getuser && getuser.chat && getuser.chat.status == 0">
                                                                <i id="unsolved" class="fa-solid fa-arrow-right bg-danger text-white"></i>
                                                              </template>
                                                              <template v-else>
                                                                <i  id="solved" class="fa-solid fa-check bg-success text-white"></i>
                                                              </template> -->
                                                          </div>
                                                        </li>
                                                      </template>
                                                      <template v-else>
                                                       <div class="no_data_found text-center">
                                                        <img :src="no_message" alt="image">
                                                        <h5 class="mb-0"> No unread message.</h5>
                                                        <p class="mb-0">Only unread messages appear here.</p>
                                                       </div>
                                                      </template>
                                                    </ul>
                                                </div>
                                                <div  class="tab-pane" :class="ActiveChatTab == 'unresolved' ? 'active' : ''">
                                                  <ul class="list-unstyled chat-contact-list px-2 mt-2" id="chat-list">
                                                      <template v-if="unresolvedChats.length > 0">
                                                        <li v-for="(getuser, index) in unresolvedChats" :key="index" :class="{ 'active': selectedUser === index }" class="chat-contact-list-item "
                                                          @click="getConversationData(getuser && getuser.geted_user && getuser.geted_user.id, index)">
                                                          <a class="d-flex align-items-center">
                                                            <div class="flex-shrink-0 avatar" :class="isOnline(getuser.geted_user.id) ? 'avatar-online' : 'avatar-offline'">
                                                              <template v-if="getuser && getuser.geted_user && getuser.geted_user.avatar != null">
                                                                <img :src="'https://api.doppcall.com/'+ getuser.geted_user.avatar" alt="Avatar" class="rounded-circle" />
                                                              </template>
                                                              <template v-else>
                                                                <img :src="blank_user" alt="Avatar" class="rounded-circle" />
                                                              </template>
                                                            </div>
                                                            <div class="chat-contact-info flex-grow-1 ms-2">
                                                              <h6 class="chat-contact-name text-truncate m-0 font-class">
                                                                {{ getuser && getuser.geted_user && getuser.geted_user.fname }}
                                                              </h6>
                                                              <template v-if="getuser && getuser.latest_message && getuser.latest_message.message">
                                                                  <template v-if="getuser && getuser.latest_message.type == 'audio'">
                                                                    <p class="mb-0 text-muted">{{'audio'}}</p>
                                                                  </template>
                                                                  <template v-else-if="getuser && getuser.latest_message.type == 'image'">
                                                                    <p class="mb-0 text-muted">{{ 'image' }}</p> 
                                                                  </template>
                                                                  <template v-else>
                                                                    <p class="mb-0 text-muted">{{ 'message' }}</p>
                                                                  </template>
                                                              </template>
                                                            </div>
                                                          </a>
                                                          <div class="chat-contact-info">
                                                            <template v-if="getuser && getuser.latest_message && getuser.latest_message.created_at">
                                                              <p class="chat-contact-status text-truncate mb-0 text-muted text-center">
                                                                {{ formatTimestamp(getuser && getuser.latest_message.created_at) }}
                                                              </p>
                                                            </template>
                                                              <!-- <template v-if="getuser && getuser.status == 0">
                                                                <i id="unsolved" class="fa-solid fa-arrow-right bg-danger text-white"></i>
                                                              </template>
                                                              <template v-else>
                                                                <i  id="solved" class="fa-solid fa-check bg-success text-white"></i>
                                                              </template> -->
                                                          </div>
                                                        </li>
                                                      </template>
                                                        <template v-else>
                                                          <div class="no_data_found text-center">
                                                            <img :src="no_message" alt="image">
                                                            <h5 class="mb-0"> No unresolved message</h5>
                                                            <p class="mb-0">Only unresolved messages appear here.</p>
                                                          </div>
                                                      </template>
                                                    </ul>
                                                </div>
                                                <div  class="tab-pane" :class="ActiveChatTab == 'filters' ? 'active' : ''">
                                                  <template v-if="showfiltarData == 'mentions'">
                                                    <ul class="list-unstyled chat-contact-list px-2 mt-2" id="chat-list">
                                                        <template v-if="getMentionsChats != ''">
                                                          <li v-for="(getuser, index) in getMentionsChats" :key="index" :class="{ 'active': selectedUser === index }" class="chat-contact-list-item"
                                                            @click="getConversationData(getuser && getuser.user_id, index)">
                                                            <a class="d-flex align-items-center">
                                                              <div class="flex-shrink-0 avatar" :class="isOnline(getuser.user_id) ? 'avatar-online' : 'avatar-offline'">
                                                                <template v-if="getuser && getuser.sender && getuser.sender.avatar != null">
                                                                  <img :src="'https://api.doppcall.com/'+ getuser.sender.avatar " alt="Avatar" class="rounded-circle" />
                                                                </template>
                                                                <template v-else>
                                                                  <img :src="blank_user" alt="Avatar" class="rounded-circle" />
                                                                </template>
                                                              </div>
                                                              <div class="chat-contact-info flex-grow-1 ms-2">
                                                                <h6 class="chat-contact-name text-truncate m-0 font-class">
                                                                  {{ getuser && getuser.sender && getuser.sender.fname }}
                                                                </h6>
                                                                <template v-if="getuser && getuser.message">
                                                                    <template v-if="getuser && getuser.message.type == 'audio'">
                                                                      <p class="mb-0 text-muted">{{'audio'}}</p>
                                                                    </template>
                                                                    <template v-else-if="getuser &&  getuser.message.type == 'image'">
                                                                      <p class="mb-0 text-muted">{{ 'image' }}</p> 
                                                                    </template>
                                                                    <template v-else>
                                                                      <p class="mb-0 text-muted">{{ 'message' }}</p>
                                                                    </template>
                                                                </template>
                                                              </div>
                                                            </a>
                                                            <div class="chat-contact-info">
                                                              <template v-if="getuser && getuser.created_at">
                                                                <p class="chat-contact-status text-truncate mb-0 text-muted text-center">
                                                                  {{ formatTimestamp(getuser && getuser.created_at) }}
                                                                </p>
                                                              </template>
                                                                <!-- <template v-if="getuser && getuser.chat && getuser.chat.status == 0">
                                                                  <i id="unsolved" class="fa-solid fa-arrow-right bg-danger text-white"></i>
                                                                </template>
                                                                <template v-else>
                                                                  <i  id="solved" class="fa-solid fa-check bg-success text-white"></i>
                                                                </template> -->
                                                            </div>
                                                          </li>
                                                        </template>
                                                        <template v-else>
                                                          <div class="no_data_found text-center">
                                                            <img :src="no_message" alt="image">
                                                            <h5 class="mb-0"> No mentions message</h5>
                                                            <p class="mb-0">Only mentions messages appear here.</p>
                                                          </div>
                                                        </template>
                                                    </ul>
                                                  </template>
                                                  <template v-else-if="showfiltarData == 'most_resent'">
                                                    <ul class="list-unstyled chat-contact-list px-2 mt-2" id="chat-list">
                                                          <template v-if="getMostResentChats != ''">
                                                          <li v-for="(getuser, index) in getMostResentChats" :key="index" :class="{ 'active': selectedUser === index }" class="chat-contact-list-item"
                                                            @click="getConversationData(getuser && getuser.user_id, index)">
                                                            <a class="d-flex align-items-center">
                                                              <div class="flex-shrink-0 avatar" :class="isOnline(getuser.user_id) ? 'avatar-online' : 'avatar-offline'" >
                                                                <template v-if="getuser && getuser.sender && getuser.sender.avatar != null">
                                                                  <img :src="'https://api.doppcall.com/'+ getuser.sender.avatar " alt="Avatar" class="rounded-circle" />
                                                                </template>
                                                                <template v-else>
                                                                  <img :src="blank_user" alt="Avatar" class="rounded-circle" />
                                                                </template>
                                                              </div>
                                                              <div class="chat-contact-info flex-grow-1 ms-2">
                                                                <h6 class="chat-contact-name text-truncate m-0 font-class">
                                                                  {{ getuser && getuser.sender && getuser.sender.fname }}
                                                                </h6>
                                                                <template v-if="getuser && getuser.message">
                                                                    <template v-if="getuser && getuser.message.type == 'audio'">
                                                                      <p class="mb-0 text-muted">{{'audio'}}</p>
                                                                    </template>
                                                                    <template v-else-if="getuser &&  getuser.message.type == 'image'">
                                                                      <p class="mb-0 text-muted">{{ 'image' }}</p> 
                                                                    </template>
                                                                    <template v-else>
                                                                      <p class="mb-0 text-muted">{{ 'message' }}</p>
                                                                    </template>
                                                                </template>
                                                              </div>
                                                            </a>
                                                            <div class="chat-contact-info">
                                                              <template v-if="getuser && getuser.created_at">
                                                                <p class="chat-contact-status text-truncate mb-0 text-muted text-center">
                                                                  {{ formatTimestamp(getuser && getuser.created_at) }}
                                                                </p>
                                                              </template>
                                                                <!-- <template v-if="getuser && getuser.chat && getuser.chat.status == 0">
                                                                  <i id="unsolved" class="fa-solid fa-arrow-right bg-danger text-white"></i>
                                                                </template>
                                                                <template v-else>
                                                                  <i  id="solved" class="fa-solid fa-check bg-success text-white"></i>
                                                                </template> -->
                                                            </div>
                                                          </li>
                                                        </template>
                                                        <template v-else>
                                                          <div class="no_data_found text-center">
                                                            <img :src="no_message" alt="image">
                                                            <h5 class="mb-0"> No most resent message</h5>
                                                            <p class="mb-0">Only most resent messages appear here.</p>
                                                          </div>
                                                        </template>
                                                    </ul>
                                                  </template>
                                                  <template v-else-if="showfiltarData == 'resolved'">
                                                    <ul class="list-unstyled chat-contact-list px-2 mt-2" id="chat-list">
                                                        <template v-if="resolveChat.length > 0">
                                                          <li v-for="(getuser, index) in resolveChat" :key="index" :class="{ 'active': selectedUser === index }" class="chat-contact-list-item"
                                                            @click="getConversationData(getuser && getuser.geted_user && getuser.geted_user.id, index)">
                                                            <a class="d-flex align-items-center">
                                                              <div class="flex-shrink-0 avatar" :class="isOnline(getuser.geted_user.id) ? 'avatar-online' : 'avatar-offline'" >
                                                                <template v-if="getuser && getuser.geted_user && getuser.geted_user.avatar != null">
                                                                  <img :src="'https://api.doppcall.com/'+ getuser.geted_user.avatar" alt="Avatar" class="rounded-circle" />
                                                                </template>
                                                                <template v-else>
                                                                  <img :src="blank_user" alt="Avatar" class="rounded-circle" />
                                                                </template>
                                                              </div>
                                                              <div class="chat-contact-info flex-grow-1 ms-2">
                                                                <h6 class="chat-contact-name text-truncate m-0 font-class">
                                                                  {{ getuser && getuser.geted_user && getuser.geted_user.fname }}
                                                                </h6>
                                                                <template v-if="getuser && getuser.latest_message && getuser.latest_message.message">
                                                                  <template v-if="getuser && getuser.latest_message.type == 'audio'">
                                                                    <p class="mb-0 text-muted">{{'audio'}}</p>
                                                                  </template>
                                                                  <template v-else-if="getuser && getuser.latest_message.type == 'image'">
                                                                    <p class="mb-0 text-muted">{{ 'image' }}</p> 
                                                                  </template>
                                                                  <template v-else>
                                                                    <p class="mb-0 text-muted">{{ 'message' }}</p>
                                                                  </template>
                                                              </template>
                                                              </div>
                                                            </a>
                                                            <div class="chat-contact-info">
                                                              <template v-if="getuser && getuser.latest_message && getuser.latest_message.created_at">
                                                                <p class="chat-contact-status text-truncate mb-0 text-muted text-center">
                                                                  {{ formatTimestamp(getuser && getuser.latest_message.created_at) }}
                                                                </p>
                                                              </template>
                                                                <!-- <template v-if="getuser && getuser.status == 0">
                                                                  <i id="unsolved" class="fa-solid fa-arrow-right bg-danger text-white"></i>
                                                                </template>
                                                                <template v-else>
                                                                  <i  id="solved" class="fa-solid fa-check bg-success text-white"></i>
                                                                </template> -->
                                                            </div>
                                                          </li>
                                                        </template>
                                                        <template v-else>
                                                          <div class="no_data_found text-center">
                                                            <img :src="no_message" alt="image">
                                                            <h5 class="mb-0"> No resolved message</h5>
                                                            <p class="mb-0">Only resolved messages appear here.</p>
                                                          </div>
                                                        </template>
                                                    </ul>
                                                  </template>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div  class="tab-pane" :class="ActiveParentTab == 'activity' ? 'active' : ''" >
                                  <ul class="list-unstyled chat-contact-list px-2 active_user_list text-center" id="chat-list">
                                    <template v-if="countByRoleId(2) > 0">
                                      <li class="mb-0">Total Online Advertisers : {{ countByRoleId(2)  }}</li>
                                    </template>
                                    <template v-if="countByRoleId(3) > 0">
                                      <li class="mb-0">Total Online	Publishers : {{ countByRoleId(3)  }}</li>
                                    </template>
                                    <template v-if="countByRoleId(2) == 0 &&  countByRoleId(3) == 0">
                                      <li class="mb-0">No Online Publishers & Advertisers</li>
                                    </template>
                                  </ul>
                                </div>
                                <div  class="tab-pane" :class="ActiveParentTab == 'contact' ? 'active' : ''">
                                  <div class="tab-pane active">
                                    <div class="d-flex flex-column justify-content-between">
                                      <div class="chats_tab_bar">
                                      <ul class="nav panel-tabs main-nav-line px-2 justify-content-between message-filter semi-top-filter">
                                        <li>
                                          <a title="Publishers" class="fw-six-hundred "  @click="changeContactTab('Publishers')" :class="ActiveContactTab == 'Publishers' ? 'active' : ''"
                                            data-toggle="tab"><i class="fa-solid fa-users"></i></a>
                                        </li>
                                        <li>
                                          <a title="Advertisers" class="fw-six-hundred" @click="changeContactTab('Advertisers')" :class="ActiveContactTab == 'Advertisers' ? 'active' : ''"
                                            data-toggle="tab" ><i class="fa-solid fa-users"></i></a>
                                        </li>
                                      </ul>
                                    </div>

                                  <div class="panel panel-primary tabs-style-2" >
                                      <div class="panel-body tabs-menu-body main-content-body-right">
                                        <div class="tab-content py-0 px-0" id="tab-content-card-second">
                                          <div class="tab-pane" :class="ActiveContactTab == 'Publishers' ? 'active' : ''">
                                            <div class="panel panel-primary tabs-style-2">
                                              <div class="panel-body tabs-menu-body main-content-body-right">
                                                <div class="tab-content p-0 getContactMainTab" id="tab-content-card">
                                                  <ul class="list-unstyled chat-contact-list px-2 mt-2" id="chat-list">
                                                    <template v-if="chatAllUser.length > 0">
                                                    <template v-for="(getuser, index) in chatAllUser" :key="index">
                                                      <li v-if="getuser.role_id == 3" class="chat-contact-list-item"
                                                        @click="getConversationData(getuser.id, index)">
                                                        <a class="d-flex align-items-center">
                                                          <div class="flex-shrink-0 avatar" :class="isOnline(getuser.id) ? 'avatar-online' : 'avatar-offline'">
                                                            <template v-if="getuser.avatar != null">
                                                              <img :src="'https://api.doppcall.com/'+ getuser.avatar" alt="Avatar" class="rounded-circle" />
                                                            </template>
                                                            <template v-else>
                                                              <img :src="blank_user" alt="Avatar" class="rounded-circle" />
                                                            </template>
                                                          </div>
                                                          <div class="chat-contact-info flex-grow-1 ms-2">
                                                            <h6 class="chat-contact-name text-truncate m-0 font-class position-relative">
                                                              {{ getuser.fname }} 
                                                            </h6>
                                                             <p class="mb-0 text-muted">Publisher</p>
                                                          </div>
                                                        </a>
                                                      </li>
                                                    </template>
                                                    </template>
                                                    <template v-else>
                                                      <div class="no_data_found text-center">
                                                        <img :src="no_message" alt="image">
                                                        <h5 class="mb-0"> No Publishers found</h5>
                                                        <p class="mb-0">All Publishers appear here.</p>
                                                    </div>
                                                    </template>
                                                  </ul>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div  class="tab-pane getContactMainTab" :class="ActiveContactTab == 'Advertisers' ? 'active' : ''">
                                            <ul class="list-unstyled chat-contact-list px-2 mt-2" id="chat-list">
                                                    <template v-if="chatAllUser.length > 0">
                                                    <template v-for="(getuser, index) in chatAllUser" :key="index">
                                                      <li v-if="getuser.role_id == 2" class="chat-contact-list-item"
                                                        @click="getConversationData(getuser.id, index)">
                                                        <a class="d-flex align-items-center">
                                                          <div class="flex-shrink-0 avatar" :class="isOnline(getuser.id) ? 'avatar-online' : 'avatar-offline'">
                                                            <template v-if="getuser.avatar != null">
                                                              <img :src="'https://api.doppcall.com/'+ getuser.avatar" alt="Avatar" class="rounded-circle" />
                                                            </template>
                                                            <template v-else>
                                                              <img :src="blank_user" alt="Avatar" class="rounded-circle" />
                                                            </template>
                                                          </div>
                                                          <div class="chat-contact-info flex-grow-1 ms-2">
                                                            <h6 class="chat-contact-name text-truncate m-0 font-class position-relative">
                                                              {{ getuser.fname }} 
                                                            </h6>
                                                             <p class="mb-0 text-muted">Advertiser</p>
                                                          </div>
                                                        </a>
                                                      </li>
                                                    </template>
                                                    </template>
                                                    <template v-else>
                                                      <div class="no_data_found text-center">
                                                        <img :src="no_message" alt="image">
                                                        <h5 class="mb-0"> No Advertisers found</h5>
                                                        <p class="mb-0">All Advertisers appear here.</p>
                                                    </div>
                                                    </template>
                                                  </ul>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <template v-if="startChat">
              <div class="col app-chat-history bg-body">
                <div id="chatloader" v-if="chatloader">
                  <div class="spinner-border text-secondary" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
               </div>
                <div class="chat-history-wrapper">
                  <div class="chat-history-header border-bottom">
                    <div class="d-flex justify-content-between align-items-center">
                      <div class="d-flex overflow-hidden align-items-center">
                        <i class="ti ti-menu-2 ti-sm cursor-pointer d-lg-none d-block me-2" @click="showSmailChat()"  data-bs-toggle="sidebar" data-overlay data-target="#app-chat-contacts"></i>
                        <div class="flex-shrink-0 avatar">
                          <template v-if="chats">
                            <template v-for="(user, index) in chats" :key="index">
                              <template v-if="authUser.id != user.id">
                                <div class="flex-shrink-0 avatar"  :class="isOnline(user.id) ? 'avatar-online' : 'avatar-offline'">
                                  <template v-if="user && user.avatar != null">
                                    <img :src="'https://api.doppcall.com/'+ user.avatar" alt="Avatar" class="rounded-circle" />
                                  </template>
                                  <template v-else>
                                    <img :src="blank_user" alt="Avatar" class="rounded-circle" />
                                  </template>
                                </div>
                              </template>
                            </template>
                          </template>
                        </div>
                        <template v-if="chats">
                          <template v-for="(user, index) in chats" :key="index">
                            <template v-if="authUser.id != user.id">
                              <div class="chat-contact-info flex-grow-1 ms-2" >
                                <h5 class="m-0 font-class chatMessageUserName">{{ user.fname }} {{ user.lname }} </h5>
                                <button data-bs-toggle="modal" id="assign_btn"  data-bs-target="#assignModal"  @click="accountManagersModal(user.id,user.pivot.chat_id)" class="border-0">
                                 <template v-if="user && user.assign_manager != null">
                                  Assign To {{ user && user.assign_manager && user.assign_manager.fname}} <i class="fa-solid fa-caret-down"></i>
                                 </template>
                                  <template v-else>
                                    Assign This Converation <i class="fa-solid fa-caret-down"></i>
                                  </template>
                                </button>
                              </div>
                            </template>
                          </template>
                        </template>
                      </div>
                      <div class="d-flex align-items-center">
                        <i class="ti ti-search cursor-pointer d-sm-block d-none me-3"></i>
                        <div class="dropdown d-flex align-self-center">
                          <template v-if="chats">
                          <template v-for="(user, index) in chats" :key="index">
                            <template v-if="authUser.id != user.id">
                                <button class="btn p-0" type="button" id="chat-header-actions" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                  <i class="ti ti-dots-vertical"></i>
                                </button>
                                <div class="dropdown-menu dropdown-menu-end" aria-labelledby="chat-header-actions">
                                  <a class="dropdown-item" @click="showUserInfo(user)" style="cursor: pointer"><i class="fa-regular fa-eye me-1 text-info"></i>View Contact</a>
                                  <template v-if="user.block_status == 0">
                                    <a class="dropdown-item" @click="blockUser(user && user.pivot.chat_id,user.id)" href="javascript:void(0);"><i class="fa-solid fa-lock me-1 text-danger"></i>Block Contact</a>
                                  </template>
                                  <template v-else>
                                    <a class="dropdown-item" @click="UnBlockUser(user && user.pivot.chat_id,user.id)" href="javascript:void(0);"><i class="fa-solid fa-unlock me-1 text-success"></i>Unblock Contact</a>
                                  </template>
                                  <template v-if="getChatStatus && getChatStatus.status == 0">
                                    <a class="dropdown-item" @click="changeChatStatus(getChatStatus.chatId,'1')" style="cursor: pointer"><i class="fa-solid fa-check text-success me-1"></i>Mark as resolved</a>
                                  </template>
                                  <template v-else>
                                    <a class="dropdown-item" @click="changeChatStatus(getChatStatus.chatId,'0')" style="cursor: pointer"><i class="fa-solid fa-xmark text-danger me-1"></i>Mark as unresolved</a>
                                  </template>
                                  <a class="dropdown-item" href="javascript:void(0);" style="cursor: pointer" @click="clearChatHistory(getChatStatus.chatId,user.id)"><i class="fa-solid fa-trash me-1 text-danger"></i>Clear Chat</a>
                                  <a class="dropdown-item" href="javascript:void(0);"><i class="fa-solid fa-triangle-exclamation me-1 text-warning"></i>Report</a>
                                </div>
                            </template>
                          </template>
                        </template>
                        </div>
                      </div>
                    </div>
                  </div>
                  <template v-if="chats">
                    <template v-for="(user, index) in chats" :key="index">
                      <template v-if="authUser.id != user.id">
                        <div class="chat-history-body bg-body" id="chat-history-body" ref="chatContainer" @scroll="messageOnScroll($event,user.pivot.chat_id,user.id)">
                          <ul class="list-unstyled chat-history">
                            <template v-if="getMessages">
                              <template v-for="(mess, index) in getMessages" :key="index">
                                <template v-if="mess && mess.sender && mess.sender.role_id == 1 ||  mess && mess.sender && mess.sender.role_id  == 5">
                                  <li class="chat-message chat-message-right">
                                    <div class="d-flex">
                                      <div class="chat-message-wrapper flex-grow-1">
                                        <div class="chat-message-text">
                                        <template v-if="mess.message_sender == 0">
                                          <template v-if="mess.type == 'audio'">
                                            <div class="chat-message-right-audio d-flex flex-row-reverse position-relative">
                                              <audio :src="'https://api.doppcall.com/' + mess.message" class="position-relative" controls></audio>
                                              <span class="message_react_audio_right " :id="'message_react_'+mess.id">{{ mess.react }}</span>
                                              <div class="btn-group dropend">
                                                  <button type="button" class="btn rep_emoji_btn dropdown-toggle" title="React" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i  class="fa-regular fa-face-smile"></i>
                                                  </button>
                                                  <ul class="dropdown-menu">
                                                    <a class="dropdown-item" @click="messageReact(mess.id,'❤️')">❤️</a>
                                                    <a class="dropdown-item" @click="messageReact(mess.id,'😀')">😀</a>
                                                    <a class="dropdown-item" @click="messageReact(mess.id,'😮')">😮</a>
                                                    <a class="dropdown-item" @click="messageReact(mess.id,'😥')">😥</a>
                                                    <a class="dropdown-item" @click="messageReact(mess.id,'🤬')">🤬</a>
                                                    <a class="dropdown-item" @click="messageReact(mess.id,'👍')">👍</a>
                                                    <!-- <li><a class="dropdown-item"><i class="fa-solid fa-plus"></i></a></li>  -->
                                                  </ul>
                                                </div>

                                              <div class="btn-group dropstart">
                                                  <button type="button" class="btn rep_btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i class="fa-solid fa-ellipsis-vertical"></i>
                                                  </button>
                                                  <ul class="dropdown-menu">
                                                    <li><a class="dropdown-item" @click="downloadAudio(mess)"><i class="fa-solid fa-cloud-arrow-down text-info me-1"></i>Download</a></li>
                                                    <li><a class="dropdown-item" @click="messageReply(mess)"><i class="fa-solid fa-reply me-1 text-primary"></i>Reply</a></li>
                                                    <li><a class="dropdown-item" @click="messageDeleteForYourSelf(mess.id)"  data-bs-toggle="modal" :data-bs-target="'#deleteMessageModal_'+mess.id"><i class="fa-solid fa-trash me-1 text-danger"></i>Delete</a></li>
                                                  </ul>
                                                </div>
                                            </div>
                                            <div class="modal fade" :id="'deleteMessageModal_'+mess.id" tabindex="-1" aria-hidden="true">
                                                <div class="modal-dialog modal-md modal-simple modal-enable-otp modal-dialog-centered">
                                                  <div class="modal-content p-3">
                                                  <div class="modal-header d-block">
                                                    <h4 class="mb-0">Delete Message ?</h4>
                                                    <span class="mb-0">You can delete message for everyone and just for you !</span>
                                                  </div>
                                                    <div class="modal-body pt-2">
                                                    
                                                      <div class="radio-btn d-block">
                                                        <div class="form-check mb-2">
                                                            <input class="form-check-input" @change="deleteBtnValue('1')" type="radio" name="exampleRadios" id="deleteForMe">
                                                            <label class="form-check-label" for="deleteForMe">
                                                              Delete For Me 
                                                            </label>
                                                        </div>
                                                        <div class="form-check mb-2">
                                                            <input class="form-check-input" type="radio" @change="deleteBtnValue('2')" name="exampleRadios" id="deleteForEveryOne">
                                                            <label class="form-check-label" for="deleteForEveryOne">
                                                              Delete For Every One
                                                            </label>
                                                        </div>
                                                    </div>
                                                      <div class="row mt-2">
                                                        <button type="button" :disabled="messageDeleteSelf.status == ''"  @click="messageDeleteYourSelf(mess)" class="btn btn-primary col-md-5 me-3">Delete Now</button>
                                                        <button type="button" class="btn btn-secondary col-md-5" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                                                      </div>
                                                    </div>
                                                    </div>
                                                  </div>
                                            </div>
                                          </template>
                                          <template v-else-if="mess.type == 'image'">
                                            <div class="chat-message-right-image  d-flex flex-row-reverse position-relative">
                                              <img data-bs-toggle="modal" :data-bs-target="'#chatImageShowModal_'+mess.id" :src="'https://api.doppcall.com/' + mess.message" class="position-relative" alt="image" />
                                              <span class="message_react_image_right" :id="'message_react_'+mess.id">{{ mess.react }}</span>
                                              <div class="btn-group dropend">
                                                  <button type="button" class="btn rep_emoji_btn dropdown-toggle" title="React" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i class="fa-regular fa-face-smile"></i>
                                                  </button>
                                                  <ul class="dropdown-menu">
                                                    <a class="dropdown-item" @click="messageReact(mess.id,'❤️')">❤️</a>
                                                    <a class="dropdown-item" @click="messageReact(mess.id,'😀')">😀</a>
                                                    <a class="dropdown-item" @click="messageReact(mess.id,'😮')">😮</a>
                                                    <a class="dropdown-item" @click="messageReact(mess.id,'😥')">😥</a>
                                                    <a class="dropdown-item" @click="messageReact(mess.id,'🤬')">🤬</a>
                                                    <a class="dropdown-item" @click="messageReact(mess.id,'👍')">👍</a>
                                                    <!-- <li><a class="dropdown-item"><i class="fa-solid fa-plus"></i></a></li>  -->
                                                  </ul>
                                                </div>
                                              <div class="btn-group dropstart">
                                                  <button type="button" class="btn rep_btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i class="fa-solid fa-ellipsis-vertical"></i>
                                                  </button>
                                                  <ul class="dropdown-menu">
                                                    <li><a class="dropdown-item" target="_blank" :href="'https://api.doppcall.com/' + mess.message"><i class="fa-solid fa-cloud-arrow-down text-info me-1"></i>Download</a></li>
                                                    <li><a class="dropdown-item" @click="messageReply(mess)"><i class="fa-solid fa-reply me-1 text-primary"></i>Reply</a></li>
                                                    <li><a class="dropdown-item" @click="messageDeleteForYourSelf(mess.id)"  data-bs-toggle="modal" :data-bs-target="'#deleteMessageModal_'+mess.id"><i class="fa-solid fa-trash me-1 text-danger"></i>Delete</a></li>
                                                  </ul>
                                              </div>
                                            </div>
                                            <div class="modal fade chat_img_lightbox" :id="'chatImageShowModal_'+mess.id" tabindex="-1" aria-hidden="true">
                                              <div class="modal-dialog modal-lg modal-simple modal-enable-otp modal-dialog-centered">
                                                <div class="modal-content p-3 p-md-3">
                                                  <div class="modal-body p-0">
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    <img :src="'https://api.doppcall.com/' + mess.message"  alt="image">
                                                    <div class="modal-footer pb-0">
                                                    <button class="btn btn-primary" type="button"><a class="text-white" target="_blank" :href="'https://api.doppcall.com/' + mess.message">Download</a></button>
                                                    <button class="btn btn-secondary text-white" type="button" data-bs-dismiss="modal" aria-label="Close">Close</button>
                                                  </div>
                                                  </div>
                                                </div>
                                              </div>
                                          </div>
                                            <div class="modal fade" :id="'deleteMessageModal_'+mess.id" tabindex="-1" aria-hidden="true">
                                                <div class="modal-dialog modal-md modal-simple modal-enable-otp modal-dialog-centered">
                                                  <div class="modal-content p-3">
                                                  <div class="modal-header d-block">
                                                    <h4 class="mb-0">Delete Message ?</h4>
                                                    <span class="mb-0">You can delete message for everyone and just for you !</span>
                                                  </div>
                                                    <div class="modal-body pt-2">
                                                    
                                                      <div class="radio-btn d-block">
                                                        <div class="form-check mb-2">
                                                            <input class="form-check-input" @change="deleteBtnValue('1')" type="radio" name="exampleRadios" id="deleteForMe">
                                                            <label class="form-check-label" for="deleteForMe">
                                                              Delete For Me 
                                                            </label>
                                                        </div>
                                                        <div class="form-check mb-2">
                                                            <input class="form-check-input" type="radio" @change="deleteBtnValue('2')" name="exampleRadios" id="deleteForEveryOne">
                                                            <label class="form-check-label" for="deleteForEveryOne">
                                                              Delete For Every One
                                                            </label>
                                                        </div>
                                                    </div>
                                                      <div class="row mt-2">
                                                        <button type="button" :disabled="messageDeleteSelf.status == ''"  @click="messageDeleteYourSelf(mess)" class="btn btn-primary col-md-5 me-3">Delete Now</button>
                                                        <button type="button" class="btn btn-secondary col-md-5" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                                                      </div>
                                                    </div>
                                                    </div>
                                                  </div>
                                            </div>
                                          </template>
                                          <template v-else>
                                            <div class="chat-message-right-message d-flex flex-row-reverse position-relative">
                                                <p class="mb-0 text-white font-class" v-html="mess.message"></p>
                                                <span class="message_react_right" :id="'message_react_'+mess.id">{{ mess.react }}</span>
                                                <div class="btn-group dropend">
                                                  <button type="button" class="btn rep_emoji_btn dropdown-toggle" title="React" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i class="fa-regular fa-face-smile"></i>
                                                  </button>
                                                  <ul class="dropdown-menu">
                                                    <a class="dropdown-item" @click="messageReact(mess.id,'❤️')">❤️</a>
                                                    <a class="dropdown-item" @click="messageReact(mess.id,'😀')">😀</a>
                                                    <a class="dropdown-item" @click="messageReact(mess.id,'😮')">😮</a>
                                                    <a class="dropdown-item" @click="messageReact(mess.id,'😥')">😥</a>
                                                    <a class="dropdown-item" @click="messageReact(mess.id,'🤬')">🤬</a>
                                                    <a class="dropdown-item" @click="messageReact(mess.id,'👍')">👍</a>
                                                    <!-- <li><a class="dropdown-item"><i class="fa-solid fa-plus"></i></a></li>  -->
                                                  </ul>
                                                </div>
                                                <div class="btn-group dropstart">
                                                  <button type="button" class="btn rep_btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i class="fa-solid fa-ellipsis-vertical"></i>
                                                  </button>
                                                  <ul class="dropdown-menu">
                                                    <li><a class="dropdown-item" @click="messageReply(mess)"><i class="fa-solid fa-reply me-1 text-primary"></i>Reply</a></li>
                                                    <li><a class="dropdown-item" @click="messageDeleteForYourSelf(mess.id)"  data-bs-toggle="modal" :data-bs-target="'#deleteMessageModal_'+mess.id" ><i class="fa-solid fa-trash me-1 text-danger"></i>Delete</a></li>
                                                  </ul>
                                                </div>
                                            </div>
                                            <div class="modal fade" :id="'deleteMessageModal_'+mess.id" tabindex="-1" aria-hidden="true">
                                                <div class="modal-dialog modal-md modal-simple modal-enable-otp modal-dialog-centered">
                                                  <div class="modal-content p-3">
                                                  <div class="modal-header d-block">
                                                    <h4 class="mb-0">Delete Message ?</h4>
                                                    <span class="mb-0">You can delete message for everyone and just for you !</span>
                                                  </div>
                                                    <div class="modal-body pt-2">
                                                    
                                                      <div class="radio-btn d-block">
                                                        <div class="form-check mb-2">
                                                            <input class="form-check-input" @change="deleteBtnValue('1')" type="radio" name="exampleRadios" id="deleteForMe">
                                                            <label class="form-check-label" for="deleteForMe">
                                                              Delete For Me 
                                                            </label>
                                                        </div>
                                                        <div class="form-check mb-2">
                                                            <input class="form-check-input" type="radio" @change="deleteBtnValue('2')" name="exampleRadios" id="deleteForEveryOne">
                                                            <label class="form-check-label" for="deleteForEveryOne">
                                                              Delete For Every One
                                                            </label>
                                                        </div>
                                                    </div>
                                                      <div class="row mt-2">
                                                        <button type="button" :disabled="messageDeleteSelf.status == ''"  @click="messageDeleteYourSelf(mess)" class="btn btn-primary col-md-5 me-3">Delete Now</button>
                                                        <button type="button" class="btn btn-secondary col-md-5" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                                                      </div>
                                                    </div>
                                                    </div>
                                                  </div>
                                            </div>
                                          </template>
                                        </template>
                                        <template v-else>
                                          <li class="chat-message chat-message-right text-white align-items-center"><i class="fa-solid fa-ban me-1"></i>You deleted this message !</li>
                                        </template>
                                        </div>
                                        <template v-if="mess.message_sender == 0">
                                          <div class="text-end text-muted mt-1">
                                            <template v-if="mess.message_read == 1">
                                              <i class="ti ti-checks ti-xs me-1 text-success"></i>
                                            </template>
                                            <template v-else-if="mess.message_read == 2">
                                              <i class="ti ti-checks ti-xs me-1"></i>
                                            </template>
                                            <template v-else>
                                              <i class="ti ti-check ti-xs me-1"></i>
                                            </template>
                                            <small>{{ formatTime(mess.created_at) }}</small>
                                          </div>
                                        </template>
                                      </div>
                                      <div class="user-avatar flex-shrink-0 ms-3">
                                        <div class="avatar avatar-sm">
                                          <template v-if="authUser.avatar != null" >
                                            <img :src="'https://api.doppcall.com/'+ authUser.avatar" alt="Avatar" class="rounded-circle"/>
                                          </template>
                                          <template v-else>
                                            <img :src="blank_user" alt="Avatar" class="rounded-circle" />
                                          </template>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                </template>
                                <template v-else>
                                  <template v-if="mess.message_reciver == 0">
                                  <li class="chat-message">
                                    <div class="d-flex">
                                      <div class="user-avatar flex-shrink-0 me-3">
                                        <div class="avatar avatar-sm">
                                          <template v-if="mess && mess.sender && mess.sender.avatar != null">
                                            <img :src="'https://api.doppcall.com/'+ mess.sender.avatar" alt="Avatar" class="rounded-circle"/>
                                          </template>
                                          <template v-else>
                                            <img :src="blank_user" alt="Avatar" class="rounded-circle" />
                                          </template>
                                        </div>
                                      </div>
                                      <div class="chat-message-wrapper flex-grow-1">
                                        <div class="chat-message-text position-relative">
                                        <template v-if="mess.message_sender != 2">
                                        <template v-if="mess.type == 'audio'">
                                            <div class="chat-message-left-audio d-flex">
                                            <audio :src="'https://api.doppcall.com/' + mess.message" class="position-relative" controls></audio>
                                            <span class="message_react_audio_left " :id="'message_react_'+mess.id">{{ mess.react }}</span>
                                            <div class="btn-group dropend">
                                                <button type="button" class="btn rep_emoji_btn dropdown-toggle" title="React" data-bs-toggle="dropdown" aria-expanded="false">
                                                  <i class="fa-regular fa-face-smile"></i>
                                                </button>
                                                <ul class="dropdown-menu">
                                                  <a class="dropdown-item" @click="messageReact(mess.id,'❤️')">❤️</a>
                                                  <a class="dropdown-item" @click="messageReact(mess.id,'😀')">😀</a>
                                                  <a class="dropdown-item" @click="messageReact(mess.id,'😮')">😮</a>
                                                  <a class="dropdown-item" @click="messageReact(mess.id,'😥')">😥</a>
                                                  <a class="dropdown-item" @click="messageReact(mess.id,'🤬')">🤬</a>
                                                  <a class="dropdown-item" @click="messageReact(mess.id,'👍')">👍</a>
                                                  <!-- <li><a class="dropdown-item"><i class="fa-solid fa-plus"></i></a></li>  -->
                                                </ul>
                                              </div>
                                            <div class="btn-group dropend">
                                                <button type="button" class="btn rep_btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                  <i class="fa-solid fa-ellipsis-vertical"></i>
                                                </button>
                                                <ul class="dropdown-menu">
                                                  <li><a class="dropdown-item" @click="downloadAudio(mess)"><i class="fa-solid fa-cloud-arrow-down text-info me-1"></i>Download</a></li>
                                                  <li><a class="dropdown-item" @click="messageReply(mess)"><i class="fa-solid fa-reply me-1 text-primary"></i>Reply</a></li>
                                                  <li><a class="dropdown-item" @click="messageDelete(mess)"><i class="fa-solid fa-trash me-1 text-danger"></i>Delete</a></li>
                                                  <li><a class="dropdown-item" @click="messageUnread(mess)"><i class="fa-solid fa-eye-slash me-1 text-warning"></i>Unread</a></li>
                                                </ul>
                                              </div>
                                          </div>
                                        </template>
                                        <template v-else-if="mess.type == 'image'">
                                          <div class="chat-message-left-image d-flex">
                                            <img data-bs-toggle="modal" :data-bs-target="'#chatImageShowModal_'+mess.id" :src="'https://api.doppcall.com/' + mess.message" class="position-relative" alt="image" />
                                            <span class="message_react_image_left" :id="'message_react_'+mess.id">{{ mess.react }}</span>
                                            <div class="btn-group dropend">
                                                <button type="button" class="btn rep_emoji_btn dropdown-toggle" title="React" data-bs-toggle="dropdown" aria-expanded="false">
                                                  <i class="fa-regular fa-face-smile"></i>
                                                </button>
                                                <ul class="dropdown-menu">
                                                  <a class="dropdown-item" @click="messageReact(mess.id,'❤️')">❤️</a>
                                                  <a class="dropdown-item" @click="messageReact(mess.id,'😀')">😀</a>
                                                  <a class="dropdown-item" @click="messageReact(mess.id,'😮')">😮</a>
                                                  <a class="dropdown-item" @click="messageReact(mess.id,'😥')">😥</a>
                                                  <a class="dropdown-item" @click="messageReact(mess.id,'🤬')">🤬</a>
                                                  <a class="dropdown-item" @click="messageReact(mess.id,'👍')">👍</a>
                                                  <!-- <li><a class="dropdown-item"><i class="fa-solid fa-plus"></i></a></li>  -->
                                                </ul>
                                              </div>
                                            <div class="btn-group dropend position-relative">
                                                <button type="button" class="btn rep_btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                  <i class="fa-solid fa-ellipsis-vertical"></i>
                                                </button>
                                                <ul class="dropdown-menu">
                                                  <li><a class="dropdown-item" target="_blank" :href="'https://api.doppcall.com/' + mess.message"><i class="fa-solid fa-cloud-arrow-down text-info me-1"></i>Download</a></li>
                                                  <li><a class="dropdown-item" @click="messageReply(mess)"><i class="fa-solid fa-reply me-1 text-primary"></i>Reply</a></li>
                                                  <li><a class="dropdown-item" @click="messageDelete(mess)"><i class="fa-solid fa-trash me-1 text-danger"></i>Delete</a></li>
                                                  <li><a class="dropdown-item" @click="messageUnread(mess)"><i class="fa-solid fa-eye-slash me-1 text-warning"></i>Unread</a></li>
                                                </ul>
                                              </div>
                                          </div>
                                          <div class="modal fade chat_img_lightbox" :id="'chatImageShowModal_'+mess.id" tabindex="-1" aria-hidden="true">
                                              <div class="modal-dialog modal-lg modal-simple modal-enable-otp modal-dialog-centered">
                                                <div class="modal-content p-3 p-md-3">
                                                  <div class="modal-body p-0">
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    <img :src="'https://api.doppcall.com/' + mess.message"  alt="image">
                                                    <div class="modal-footer pb-0">
                                                    <button class="btn btn-primary" type="button"><a class="text-white" target="_blank" :href="'https://api.doppcall.com/' + mess.message">Download</a></button>
                                                    <button class="btn btn-secondary text-white" type="button" data-bs-dismiss="modal" aria-label="Close">Close</button>
                                                  </div>
                                                  </div>
                                                </div>
                                              </div>
                                          </div>
                                        </template>
                                        <template v-else>
                                          <div class="chat-message-right-message d-flex">
                                              <p class="mb-0 font-class" v-html="mess.message"></p>
                                              <span class="message_react_left" :id="'message_react_'+mess.id">{{ mess.react }}</span>
                                              <div class="btn-group dropend">
                                                <button type="button" class="btn rep_emoji_btn dropdown-toggle" title="React" data-bs-toggle="dropdown" aria-expanded="false">
                                                  <i class="fa-regular fa-face-smile"></i>
                                                </button>
                                                <ul class="dropdown-menu">
                                                  <a class="dropdown-item" @click="messageReact(mess.id,'❤️')">❤️</a>
                                                  <a class="dropdown-item" @click="messageReact(mess.id,'😀')">😀</a>
                                                  <a class="dropdown-item" @click="messageReact(mess.id,'😮')">😮</a>
                                                  <a class="dropdown-item" @click="messageReact(mess.id,'😥')">😥</a>
                                                  <a class="dropdown-item" @click="messageReact(mess.id,'🤬')">🤬</a>
                                                  <a class="dropdown-item" @click="messageReact(mess.id,'👍')">👍</a>
                                                  <!-- <li><a class="dropdown-item"><i class="fa-solid fa-plus"></i></a></li>  -->
                                                </ul>
                                              </div>
                                              <div class="btn-group dropstart">
                                              <button  type="button" class="btn rep_btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i data-v-e5cac9c3="" class="fa-solid fa-ellipsis-vertical"></i></button>
                                                <ul class="dropdown-menu">
                                                  <li><a class="dropdown-item"  @click="messageReply(mess)"><i data-v-e5cac9c3="" class="fa-solid fa-reply me-1 text-primary"></i>Reply</a></li>
                                                  <li><a class="dropdown-item" @click="messageDelete(mess)"><i data-v-e5cac9c3="" class="fa-solid fa-trash me-1 text-danger"></i>Delete</a></li>
                                                  <li><a class="dropdown-item" @click="messageUnread(mess)"><i class="fa-solid fa-eye-slash me-1 text-warning"></i>Unread</a></li>
                                                </ul>
                                              </div>
                                            </div>
                                        </template>
                                      </template>
                                      <template v-else>
                                        <li class="chat-message chat-message-right align-items-center"><i class="fa-solid fa-ban me-1"></i>{{ mess.sender.fname }} deleted this message !</li>
                                      </template>
                                      </div>
                                        <template v-if="mess.message_sender != 2">
                                          <div class="text-muted mt-1">
                                            <small>{{ formatTime(mess.created_at) }}</small>
                                          </div>
                                        </template>
                                      </div>
                                    </div>
                                  </li>
                                  </template>
                                </template>
                              </template>
                            </template>
                            <template v-else>
                              <p class="font-class">Your History is Empty</p>
                            </template>
                          </ul>
                        </div>
                      </template>
                      </template>
                    </template>
                  <template v-if="chats">
                  <template v-for="(user, index) in chats" :key="index">
                     <template v-if="authUser.id != user.id">
                      <template v-if="user.block_status == 0">
                      <div class="chat-history-footer shadow-sm position-relative">
                        <div class="chat_img_attachment" v-if="chatPubAdveImageShowImage && chatPubAdveImageShowImage.image != ''" >
                            <img :src="chatPubAdveImageShowImage.image" class="chatPreviewImage position-relative" />
                            <button @click="deletePreviewImage()" id="deleteImages"><i class="fa-solid fa-xmark"></i></button>
                          </div>
                          <div class="message-replay-div" v-if="chatReplayTextShow" >
                            <div>
                              <p class="mb-0">Replying to {{ chatReplyUser.user ?? '' }}</p>
                              <p class="mb-0" v-html="chatReplyUser.message ?? ''"></p>
                            </div>
                            <div>
                              <a class="mb-0" @click="messageReplayClose()"><i class="fa-solid fa-xmark"></i></a>
                            </div>
                          </div>
                          <div class="form-send-message d-flex justify-content-between align-items-center">
                            <input  v-model="getMessageText.message" id="create_message" class="form-control message-input border-0 me-3 shadow-none"
                              placeholder="Type your message here" @keyup.enter="sendMessage()"/>
                            <div class="message-actions d-flex align-items-center">
                              <template v-if="!showAudioBtn">
                                <i @click="startRecording()" class="speech-to-text ti ti-microphone ti-sm cursor-pointer"></i>
                                <label for="imageInput" class="form-label mb-0">
                                  <i class="ti ti-photo ti-sm cursor-pointer mx-3"></i>
                                  <input type="file" @change="chatPubAdveImage($event)" accept="image/*" id="imageInput" class="d-none"/>
                                </label>
                                <button class="btn ps-0"  @click="toggleEmojiPicker()"><i id="emojiChat" class="fa-regular fa-face-smile"></i> </button>
                                <div class="dashboard_emoji_picker" v-if="showEmojiPicker">
                                  <emoji-picker :search="true" :hide-group-icons="true" :hide-group-names="true" :disable-skin-tones="true" @select="addEmoji"></emoji-picker>
                                </div>
                              </template>
                              <template v-if="showAudioBtn">
                                  <div class="audio_record_area d-flex align-items-center position-relative">
                                    <p class="record_animation" v-if="showAudioBtn">{{ recordingDuration }}</p>
                                    <button class="btn p-0 record_state" id="record_state" @click="pauseRecording()" v-if="isRecording"><i  id="deleteRecoudIcons" class="fa-solid fa-pause me-3"></i></button>
                                    <button class="btn p-0 record_state" id="record_state"  @click="resumeRecording()" v-if="isPaused"><i id="deleteRecoudIcons" class="fa-solid fa-play me-3"></i></button>
                                    <button class="btn p-0"  @click="deleteRecording()"><i id="deleteRecoudIcons" class="fa-solid fa-trash"></i></button>
                                  </div>
                                </template>
                              <template v-if="showSendMessageBtn">
                                  <button title="Message" class="btn btn btn-primary  send-msg-btn" @click="sendMessage()"> <i class="ti ti-send me-md-1"></i>Send</button>
                                </template>
                                <template v-if="showImageBtn">
                                  <button title="Image" class="btn btn btn-primary  send-msg-btn" @click="sendIMages()"><i class="ti ti-send me-md-1"></i>Send</button>
                                </template>
                                <template v-if="showAudioBtn">
                                  <button title="Audio" class="btn btn btn-primary  send-msg-btn" @click="stopRecording()"><i class="ti ti-send me-md-1"></i>Send</button>
                                </template>
                            </div>
                          </div>
                        </div>
                      </template>
                      <template v-else>
                        <div class="chat-history-footer shadow-sm position-relative">
                        <div class="form-send-message d-flex justify-content-between align-items-center">
                          <input class="form-control message-input border-0 me-3 shadow-none"  placeholder="Reed is blocked. Unblock to send or receive messages." readonly>
                        </div>
                      </div>
                      </template>
                     </template>
                  </template>
                </template>
                </div>

                <!-- Sidebar Right -->
              <div class="col app-chat-sidebar-right app-sidebar overflow-hidden" id="app-chat-sidebar-right">
                <div
                  class="sidebar-header d-flex flex-column justify-content-center align-items-center flex-wrap px-4 pt-5">
                  <div class="avatar avatar-xl avatar-online">
                    <img :src="userInfoShowSidebar.userImage" alt="Avatar" class="rounded-circle" />
                  </div>
                  <h6 class="mt-2 mb-0 font-class">{{ userInfoShowSidebar.userName }}</h6>
                  <span>{{ userInfoShowSidebar.userRole }}</span>
                  <i class="ti ti-x ti-sm cursor-pointer close-sidebar d-block" @click="closeUserInfo()"></i>
                </div>
                <div class="sidebar-body px-4 pb-4">
                    <div class="my-4">
                    <small class="text-muted text-uppercase"><i class="fa-solid fa-grip-vertical me-2"></i>Main Information</small>
                    <ul class="list-unstyled d-grid gap-2 mt-3">
                      <template v-if="userInfoShowSidebar.userLocation">
                        <li class="d-flex align-items-center">
                          <i class="fa-solid fa-location-dot"></i>
                          <span class="align-middle ms-2">{{ userInfoShowSidebar.userLocation }}</span>
                      </li>
                      </template>
                      <template v-if="userInfoShowSidebar.userFlug">
                        <li class="d-flex align-items-center">
                          <i id="userinfoflugicons"  class="ti ti-world ti-sm"></i>
                          <img id="userinfoflug" :src="userInfoShowSidebar.userFlug" alt="image">
                        </li>
                      </template>
                      <template v-if="userInfoShowSidebar.userPage">
                        <li class="d-flex align-items-center">
                          <i class="fa-solid fa-file me-2" ></i>
                          <span class="align-middle">{{ userInfoShowSidebar.userPage }}</span>
                        </li>
                      </template>
                    </ul>
                  </div>
                    <div class="my-4">
                    <small class="text-muted text-uppercase"><i class="fa-solid fa-grip-vertical me-2"></i>Visitor device</small>
                    <ul class="list-unstyled d-grid gap-2 mt-3">
                      <template v-if="userInfoShowSidebar.userIp">
                        <li class="d-flex align-items-center">
                          <i class="fa-solid fa-cloud"></i>
                          <span class="align-middle ms-2">{{ userInfoShowSidebar.userIp }}</span>
                      </li>
                      </template>
                    </ul>
                  </div>
                  <div class="my-4">
                    <small class="text-muted text-uppercase">Personal Information</small>
                    <ul class="list-unstyled d-grid gap-2 mt-3">
                      <li class="d-flex align-items-center">
                        <i class="ti ti-mail ti-sm"></i>
                        <span class="align-middle ms-2">{{ userInfoShowSidebar.userEmail }}</span>
                      </li>
                      <template v-if="userInfoShowSidebar.userPhone">
                        <li class="d-flex align-items-center">
                          <i class="ti ti-phone-call ti-sm"></i>
                          <span class="align-middle ms-2">{{ userInfoShowSidebar.userPhone }}</span>
                      </li>
                      </template>
                      <template v-if="userInfoShowSidebar.userCreated">
                        <li class="d-flex align-items-center">
                          <i class="ti ti-clock ti-sm"></i>
                          <span class="align-middle ms-2">{{ formatDate(userInfoShowSidebar.userCreated) }}</span>
                        </li>
                      </template>
                      <template v-if="userInfoShowSidebar.userFacebook">
                        <li class="d-flex align-items-center">
                          <i id="icons_id"class="ms-1 fa-brands fa-facebook-f ti-sm"></i>
                          <span class="align-middle ms-2"><a id="icons_class" :href="userInfoShowSidebar.userFacebook" target="_blank" rel="noopener noreferrer">Facebook</a></span>
                        </li>
                      </template>
                      <template v-if="userInfoShowSidebar.userSkype">
                        <li class="d-flex align-items-center">
                          <i id="icons_id"class="ms-1 fa-brands fa-skype ti-sm"></i>
                          <span class="align-middle ms-2"><a id="icons_class" :href="userInfoShowSidebar.userSkype" target="_blank" rel="noopener noreferrer">Skype</a></span>
                        </li>
                      </template>
                      <template v-if="userInfoShowSidebar.userTelegram">
                        <li class="d-flex align-items-center">
                          <i id="icons_id"class="ms-1 fa-brands fa-telegram ti-sm"></i>
                          <span class="align-middle ms-2"><a id="icons_class" :href="userInfoShowSidebar.userTelegram" target="_blank" rel="noopener noreferrer">Telegram</a></span>
                        </li>
                      </template>
                    </ul>
                  </div>
                  <div class="mt-4">
                    <small class="text-muted text-uppercase">Options</small>
                    <ul class="list-unstyled d-grid gap-2 mt-3">
                      <!-- <li class="cursor-pointer d-flex align-items-center">
                        <i class="ti ti-badge ti-sm"></i>
                        <span class="align-middle ms-2">Add Tag</span>
                      </li>
                      <li class="cursor-pointer d-flex align-items-center">
                        <i class="ti ti-star ti-sm"></i>
                        <span class="align-middle ms-2">Important Contact</span>
                      </li>
                      <li class="cursor-pointer d-flex align-items-center">
                        <i class="ti ti-photo ti-sm"></i>
                        <span class="align-middle ms-2">Shared Media</span>
                      </li> -->
                      <li class="cursor-pointer d-flex align-items-center">
                        <i class="ti ti-trash ti-sm"></i>
                        <span class="align-middle ms-2">Delete Contact</span>
                      </li>
                      <template v-if="userInfoShowSidebar.blockStatus == 0">
                        <li class="cursor-pointer d-flex align-items-center"  @click="blockUser(userInfoShowSidebar.chatId,userInfoShowSidebar.userID)">
                          <i class="ti ti-ban ti-sm"></i>
                          <span class="align-middle ms-2">Block Contact</span>
                        </li>
                      </template>
                      <template v-else>
                        <li class="cursor-pointer d-flex align-items-center"  @click="UnBlockUser(userInfoShowSidebar.chatId,userInfoShowSidebar.userID)">
                          <i class="ti ti-key ti-sm"></i>
                          <span class="align-middle ms-2">Unblock Contact</span>
                        </li>
                      </template>
                    </ul>
                  </div>
                </div>
              </div>
              <!-- /Sidebar Right -->
              </div>
            </template>
            <template v-else>
              <div class="col app-chat-history bg-body">
                <i class="ti ti-menu-2 ti-sm cursor-pointer d-lg-none d-block ms-2 mt-2" @click="showSmailChat()" ></i>
                <div class="chat-history-wrapper d-flex justify-content-center">
                  <div id="nochatLottieImage" class="w-50 mb-0" ref="lottieMessage"></div>
                </div>
                <div class="text-center" id="noContent">
                  <h3 class="font-class mb-0">Pick Up Where You Left Off</h3>
                  <p class="font-class">Select Convarsation And Chat Away</p>
                </div>
              </div>
            </template>
            <div class="app-overlay"></div>
          </div>
        </div> 

        <!-- Large Modal -->
        <div class="modal fade" id="createNewChat" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog modal-md" role="document" >
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <label for="conversation-type" class="required mb-1">Email Of The User</label>
                  <select id="conversation-type" class="select2 from-select">
                    <option value="">Select User</option>
                    <option v-for="(user, index) in userStatuses" :key="index" :value="user.id">
                      {{ user.email }} ({{ user.status }})
                    </option>
                  </select>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-md close_btn" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                <button type="button" @click="createConversation()" class="text-white btn btn-md create_btn"><i class="fa-solid fa-plus me-1 icons"></i>Create Conversation</button>
              </div>
            </div>
          </div>
        </div>
        <!-- Large Modal -->
          <div class="modal fade" id="assignModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <h5 class="mb-0">Assign To</h5>
                    <select v-model="assignManager.manager_id" class="form-select">
                      <option value="">Select Manager</option>
                      <option  v-for="(manager, index) in accountManagers" :key="index" :value="manager.id">
                        {{ manager.fname }}- {{ manager.lname }} - {{ manager.email }}
                      </option>
                    </select>
                    <div v-if="validationErrors && validationErrors.manager_id" class="text-danger">
                          {{ validationErrors.manager_id[0] }}
                      </div>
                  </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-label-secondary btn-sm" data-bs-dismiss="modal">
                    Close
                  </button>
                  <button @click="AddedAccountManager()" type="button" class="btn btn-primary btn-sm"> <i class="fas fa-check fa-sm me-2"></i> Confirm</button>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
  <!-- Content wrapper -->
</template>

<script>
import lottie from "lottie-web";
import axios from "axios";
import toastr from 'toastr'
import "toastr/build/toastr.min.css";
import Loader from "../../../../../include/loader.vue";
import Breadcrumb from "../../../../../include/breadcrumb.vue";
import ChatSideBar from "./chatSidebar.vue";
import ChatBox from "./chatBox.vue";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import blank_user from "../../../../../../../../assets/backend/assets/img/blank_user.png";
import no_message from "../../../../../../../../assets/backend/assets/img/message.gif";
import Swal from "sweetalert2";
import moment from "moment";
import { format } from "date-fns";
import nouserPreLoader from "../../../../../../../preloader/nouser.vue";
import userGetPreLoader from "../../../../../../../preloader/userGet.vue";
import RecordRTC, { StereoAudioRecorder } from "recordrtc";
import EmojiPicker  from "vue3-emoji-picker";
import { fetchUserRole } from "@/services/userService";

window.Pusher = Pusher;
window.Echo = new Echo({
  broadcaster: "pusher",
  key: "4af372a603837e311fb4",
  cluster: "ap2",
  encrypted: true,
  authEndpoint: 'https://api.doppcall.com/broadcasting/auth',
    auth: {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    }
});

export default {
  components: {
    Loader,
    Breadcrumb,
    ChatSideBar,
    ChatBox,
    nouserPreLoader,
    userGetPreLoader,
    EmojiPicker ,
  },
  data() {
    return {
      breadcrumbs: [
        { label: "Dashboard", url: "/dashboard" },
        { label: "Chat", url: "" },
      ],
      getLoader: false,
      authUser: "",
      authUserID: "",
      chats: [],
      getMessages: [],
      chatUsers: [],
      page: 1,
      chatPageNumber: 1,
      perPage: 10,
      chatAllUser: [],
      onlineUsers: [],
      domainName: "",
      blank_user,
      no_message,
      searchEmail: {
        email: "",
      },
      selectedUser : "",
      create_chat : {
        user_id : "",
      },
      createMessage:{
        type:'text',
        chat_id : "",
        user_id : "",
        message : "",
        user_activitiy : "",
        domainName : "",
        attachmentMessage :  "",
      },
      getMessageText : {
        message : "",
      },
      startChat : false,
      chatloader : false,
      assignManager: {
        manager_id: "",
        user_id: "",
        chat_id : "",
      },
      accountManagers : "",
      userInfoShowSidebar : {
        userID : "",
        userImage : "",
        userName : "",
        userRole : "",
        userLocation : "",
        userFlug : "",
        userPage : "",
        userIp : "",
        userEmail : "",
        userPhone :"",
        userCreated : "",
        userFacebook : "",
        userSkype : "",
        userTelegram : "",
        chatId : "",
        blockStatus : "",
      },
      ActiveParentTab : "chats",
      ActiveChatTab : "allChats",
      ActiveContactTab : "Publishers",
      showUserGetLoader : false,
      isRecording: false,
      recordingStartTime: null,
      recordingDuration: "0",
      durationInterval: null,
      recorder: null,
      isPaused: false,
      recordedBlobs: [],
      showEmojiPicker: false,
      showSendMessageBtn : true,
      showImageBtn : false,
      showAudioBtn : false,
      chatPubAdveImageCreate: {
        image: "",
      },
      chatPubAdveImageShowImage: {
        image: "",
      },
      unreadMessages : "",
      unresolvedChats : "",
      getChatStatus  : {
        chatId : "",
        status : "",
      },
      UpdateChatStatus : {
        chatId : "",
        status : "",
      },
      showfiltarData : "",
      getMentionsChats : "", 
      getMostResentChats : "", 
      resolveChat : "",
      runChatLoader : false,
      messageReactData:{
        react : "",
      },
      chatReplayTextShow : false,
      chatReplyUser : {
        user : "",
        message : "",
      },
      messageDeleteSelf : {
        id : "",
        status : "",
      },
      lastScrollTop: 0,
      scrollPageNumber : 1,
      totalChatMessageCount : 0,
    };
  },
  async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role == 'Super' || role == 'Admin') {
          this.getUser();
          var chatData = JSON.parse(localStorage.getItem('chatUserstorage'));
          if(chatData != null){
            this.page = 2;
            this.chatUsers = chatData;
            this.getAllUser();
          }else{
            this.getAllUser();
          }
          this.getAccountManeger();
          this.domainName =  window.location.origin ; 
          lottie.loadAnimation({
            container: this.$refs.lottieMessage,
            renderer: "svg",
            loop: true,
            autoplay: true,
            path: "https://lottie.host/ce8ee662-704a-47fe-9955-ace0cdbf4049/oBWtMKkn7w.json",
          });
          this.listenForOnlineUsers();
          $("#createNewChat").on("shown.bs.modal", () => {
            this.initializeSelect2();
          });
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    },
  computed: {
    userStatuses() {
      return this.chatAllUser.map(user => {
        const onlineUser = this.onlineUsers.find(onlineUser => onlineUser.id === user.id);
        return {
          ...user,
          status: onlineUser ? (onlineUser.online ? 'online' : 'offline') : 'offline'
        };
      });
    }
  },
  // watch: {
  //   getMessages() {
  //     this.$nextTick(() => {
  //       this.scrollToBottom();
  //     });
  //   },
  // },
  methods: {
    async captureMicrophone() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        return stream;
      } catch (error) {
        alert("Unable to access your microphone.");
      }
    },
    async startRecording() {
      if (this.isPaused) {
        this.resumeRecording();
        return;
      }

      this.showSendMessageBtn = false;
      this.showImageBtn = false;
      this.showAudioBtn = true;

      this.isRecording = true;
      this.recordingStartTime = Date.now();
      this.recordingDuration = "0";
      this.durationInterval = setInterval(() => {
        this.recordingDuration = Math.floor(
          (Date.now() - this.recordingStartTime) / 1000
        );
      }, 100);

      try {
        const microphone = await this.captureMicrophone();
        this.recorder = RecordRTC(microphone, {
          type: "audio",
          recorderType: StereoAudioRecorder,
          numberOfAudioChannels: 1,
          disableLogs: true,
          desiredSampRate: 16000,
        });
        this.recorder.startRecording();
        this.recorder.microphone = microphone;
      } catch (error) {
        console.error("Error capturing microphone:", error);
      }
    },
    async pauseRecording() {
      if (!this.isRecording || this.isPaused) return;
      this.isRecording = false;
      this.isPaused = true;
      clearInterval(this.durationInterval);
      this.recorder.pauseRecording();
    },
    async resumeRecording() {
      if (this.isRecording || !this.isPaused) return;
      this.isRecording = true;
      this.isPaused = false;
      this.recordingStartTime = Date.now() - this.recordingDuration * 1000;
      this.durationInterval = setInterval(() => {
        this.recordingDuration = Math.floor(
          (Date.now() - this.recordingStartTime) / 1000
        );
      }, 100);
      this.recorder.resumeRecording();
    },
    async stopRecording() {
      if (!this.isRecording && !this.isPaused) return;
      this.isRecording = false;
      this.isPaused = false;
      clearInterval(this.durationInterval);
      this.recorder.stopRecording(async () => {
        this.recordedBlobs.push(this.recorder.getBlob());
        const finalBlob = new Blob(this.recordedBlobs, { type: "audio/wav" });
        this.recordedBlobs = [];
        const formData = new FormData();
        formData.append("audio", finalBlob);
        try {
          const res = await axios.post(
            `https://api.doppcall.com/api/audio/store`,
            formData,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type": "multipart/form-data",
              },
            }
          );
          this.createMessage.type = "audio";
          this.getMessageText.message = res.data.audio;
          this.sendMessage();
        } catch (error) {
          console.error("Error uploading audio:", error);
        }

        this.recordingStartTime = null;
        this.recordingDuration = "0";
      });
    },
    deleteRecording() {
      if (this.isRecording || this.isPaused) {
        this.recorder.stopRecording();
        this.recorder.microphone.stop();
      }
      clearInterval(this.durationInterval);
      this.recordedBlobs = [];
      this.isRecording = false;
      this.isPaused = false;
      this.recordingStartTime = null;
      this.recordingDuration = "0";
      this.showSendMessageBtn = true;
      this.showImageBtn = false;
      this.showAudioBtn = false;
    },
    addEmoji(emoji) {
      this.getMessageText.message += emoji.i;
    },
    toggleEmojiPicker() {
      this.showEmojiPicker = !this.showEmojiPicker;
    },
    deletePreviewImage(){
      this.showSendMessageBtn = true;
      this.showImageBtn = false;
      this.showAudioBtn = false;
      this.chatPubAdveImageCreate.image = "";
      this.chatPubAdveImageShowImage.image = "";
    },
    chatPubAdveImage(event) {
      this.showSendMessageBtn = false;
      this.showImageBtn = true;
      this.showAudioBtn = false;
      const file = event.target.files[0];
      this.chatPubAdveImageCreate.image = file;
      if (!file || file.type.indexOf("image/") === -1) return;
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof this.chatPubAdveImageShowImage !== "object") {
          this.chatPubAdveImageShowImage = {};
        }
        this.chatPubAdveImageShowImage.image = reader.result;
      };
      reader.readAsDataURL(file);
    },
    async sendIMages() {
      const formData = new FormData();
      formData.append("image", this.chatPubAdveImageCreate.image);
      try {
        const res = await axios.post(
          `https://api.doppcall.com/api/image/store`,
          formData,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              "Content-Type": "multipart/form-data",
            },
          }
        );
        this.createMessage.type = "image";
        this.getMessageText.message = res.data.image;
        this.sendMessage();
      } catch (error) {
        console.error("Error uploading audio:", error);
      }
    },
    getUser() {
      axios
        .get(`https://api.doppcall.com/api/auth/user/data`, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          this.authUser = res.data.data;
          this.authUserID = res.data.data.id;
          this.listenForNewChatUser(res.data.data.id);
          this.listenForCountMessages(res.data.data.id);
          var getTotalChatMessageCount =  parseInt(localStorage.getItem("totalChatMessageCount") ?? 0);
          if(getTotalChatMessageCount > 0){
            this.totalChatMessageCount = getTotalChatMessageCount;
            var storeId = document.getElementById('countChats');
            var sidebarChatCount = document.getElementById('sidebarChatCount');
              if (storeId) {
                  storeId.innerHTML = getTotalChatMessageCount;
                  sidebarChatCount.innerHTML = (getTotalChatMessageCount);
              }
          }
        })
        .catch((e) => {
          console.error(e);
        });
    },
    getAllUser() {
      if (this.loading || this.allDataLoaded) return;
      this.loading = true;
      axios
        .get(`https://api.doppcall.com/api/admin/chat/getalluser?page=${this.page}&per_page=${this.perPage}`,
          {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          }
        )
        .then((res) => {
          this.chatUsers.push(...res.data.chatUsers);
          this.chatAllUser = res.data.users;
          this.showUserGetLoader = false;
          var chatData = localStorage.getItem('chatUserstorage');
          if(chatData == null){
             localStorage.setItem('chatUserstorage', JSON.stringify(res.data.chatUsers));
             const storedChatUserIds = JSON.parse(localStorage.getItem('chatUserIds'));
              if(storedChatUserIds){
                storedChatUserIds.forEach((ids) => {
                    localStorage.removeItem('chatMessage_'+ids);
                });
                localStorage.removeItem('chatUserIds');
              }
              const chatUserIds = [];
              res.data.chatUsers.forEach((user) => {
                this.getCacheChatData(user && user.chats[0] && user.chats[0].id,user.id);
                chatUserIds.push(user.chats[0].id);
              });
              localStorage.setItem('chatUserIds', JSON.stringify(chatUserIds));
          }
          if(res.data.chatUsers.length > 0){
            this.page += 1;
          }
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          this.loading = false;
          this.showUserGetLoader = false;
          this.runChatLoader = false;
        });
    },
    getAllWithMessageUser() {
      axios
        .get(`https://api.doppcall.com/api/admin/chat/getalluser?page=${this.page}&per_page=${this.perPage}`,
          {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          }
        )
        .then((res) => {
          this.page += 1;
          this.chatUsers = res.data.chatUsers;
          this.chatAllUser = res.data.users;
          localStorage.setItem('chatUserstorage', "");
          localStorage.setItem('chatUserstorage', JSON.stringify(res.data.chatUsers));
          const storedChatUserIds = JSON.parse(localStorage.getItem('chatUserIds'));
          if(storedChatUserIds){
            res.data.chatUsers.forEach((user,index) => {
                if(index == 0){
                  const chatId = user && user.chats[0] && user.chats[0].id;
                  if (storedChatUserIds.includes(chatId)) {
                    if (storedChatUserIds.includes(chatId)) {
                        const indexToRemove = storedChatUserIds.indexOf(chatId);
                        const lastChatUserId = storedChatUserIds[indexToRemove];
                        storedChatUserIds.splice(indexToRemove, 1);
                        storedChatUserIds.unshift(chatId);
                        localStorage.setItem('chatUserIds', JSON.stringify(storedChatUserIds));
                        localStorage.removeItem('chatsParticipent' + lastChatUserId);
                        localStorage.removeItem('chatMessage_' + lastChatUserId);
                        localStorage.removeItem('chatChatId_' + lastChatUserId);
                        localStorage.removeItem('chatstatus_' + lastChatUserId);
                        this.getCacheChatData(chatId, user.id);
                    } else {
                        const lastChatUserId = storedChatUserIds[storedChatUserIds.length - 1];
                        if (storedChatUserIds.length > 10) {
                          const removedChatUserId = storedChatUserIds.pop();
                          localStorage.removeItem('chatsParticipent' + removedChatUserId);
                          localStorage.removeItem('chatMessage_' + removedChatUserId);
                          localStorage.removeItem('chatChatId_' + removedChatUserId);
                          localStorage.removeItem('chatstatus_' + removedChatUserId);
                        }
                        storedChatUserIds.unshift(chatId);
                        localStorage.setItem('chatUserIds', JSON.stringify(storedChatUserIds));
                        this.getCacheChatData(chatId, user.id);
                    }
                }
                }
              });
          }else{
            const chatUserIds = [];
            res.data.chatUsers.forEach((user) => {
                this.getCacheChatData(user && user.chats[0] && user.chats[0].id,user.id);
                chatUserIds.push(user.chats[0].id);
              });
              localStorage.setItem('chatUserIds', JSON.stringify(chatUserIds));
           }
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getCacheChatData(chatId,userId){
      axios
        .get(
          `https://api.doppcall.com/api/admin/chat/get-chat-by-id/${chatId}?page=1&user_id=${userId}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          localStorage.setItem('chatsParticipent'+chatId, JSON.stringify(res.data.chat.participants));
          localStorage.setItem('chatMessage_'+chatId, JSON.stringify(res.data.messages.data));
          localStorage.setItem('chatChatId_'+chatId, JSON.stringify(res.data.chatStatus.id));
          localStorage.setItem('chatstatus_'+chatId, JSON.stringify(res.data.chatStatus.status));
        })
        .catch((error) => {
          console.error("Error fetching messages:", error);
        });
    },
    isOnline(userId) {
      return this.onlineUsers.some(user => user.id === userId);
    },
    countByRoleId(roleid){
      return this.onlineUsers.filter(user => user.roleid === roleid).length;
    },
    getConversationData(id,index){
      this.create_chat.user_id = id;
      this.selectedUser = index;
      this.createConversation();
    },
    createConversation() {
      this.startChat = true;
      const data = new FormData();
      data.append("users[]", this.create_chat.user_id);
      data.append("isPrivate", 1);
      data.append("domainName", this.domainName);


      var getMessageCount =  parseInt(localStorage.getItem('adminCountMessage_'+this.create_chat.user_id) ?? 0);
        if(getMessageCount > 0){
          var getTotalChatMessageCount =  parseInt(localStorage.getItem("totalChatMessageCount") ?? 0);
          if(getTotalChatMessageCount > 0){
            var gandTotal = getTotalChatMessageCount - getMessageCount;
            var storeId = document.getElementById('countChats');
            var sidebarChatCount = document.getElementById('sidebarChatCount');
              if (storeId) {
                  storeId.innerHTML = gandTotal;
                  sidebarChatCount.innerHTML = (gandTotal);
                  localStorage.removeItem('adminCountMessage_'+this.create_chat.user_id);
                  localStorage.setItem("totalChatMessageCount",gandTotal);
            }
          }
      }
      localStorage.removeItem("createdChatId");
      localStorage.setItem("createdChatId",this.create_chat.user_id);
      $('#app-chat-contacts').removeClass('show');
      $('.app-overlay').removeClass('show');

      const chatsParticipent = JSON.parse(localStorage.getItem('chatUserIds'));
      if(chatsParticipent){
        this.chatloader = false;
      }else{
        this.chatloader = true;
      }
      axios
        .post(`https://api.doppcall.com/api/admin/chat/create-chat`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if(res.data.success){
            const modalElement = document.getElementById('createNewChat');
            const modal = bootstrap.Modal.getInstance(modalElement);
            if(modal){
              this.page = 1;
              this.getAllWithMessageUser();
              modal.hide();
            }
            this.chatPageNumber = 1;
            this.createMessage.chat_id = res.data.chat.id;
            this.listenForMessages(res.data.chat.id);
            this.getChatData(res.data.chat.id,this.create_chat.user_id);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getChatData(chat_id,userId) {
      const chatsParticipent = JSON.parse(localStorage.getItem('chatsParticipent'+chat_id));
      const chatMessage = JSON.parse(localStorage.getItem('chatMessage_'+chat_id));
      const chatChatId = JSON.parse(localStorage.getItem('chatChatId_'+chat_id));
      const chatStatus = JSON.parse(localStorage.getItem('chatstatus_'+chat_id));
      
      if(chatsParticipent){
          this.chats = chatsParticipent;
          this.getMessages = chatMessage;
          this.getChatStatus.chatId = chatChatId;
          this.getChatStatus.status = chatStatus;
          this.getUnreadData();
          this.chatPageNumber++;
          this.$nextTick(() => {
            this.scrollToBottom();
          });
      }else{
        axios
        .get(
          `https://api.doppcall.com/api/admin/chat/get-chat-by-id/${chat_id}?page=${this.chatPageNumber}&user_id=${userId}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          this.chats = res.data.chat.participants;
          this.getMessages = res.data.messages.data;
          this.getChatStatus.chatId = res.data.chatStatus.id;
          this.getChatStatus.status = res.data.chatStatus.status;
          this.chatloader = false;
          this.getUnreadData();
          this.chatPageNumber++;
          this.$nextTick(() => {
            this.scrollToBottom();
          });
        })
        .catch((error) => {
          console.error("Error fetching messages:", error);
        });
      }
    },
    StoredgetChatData(chat_id,userId) {
        axios
        .get(
          `https://api.doppcall.com/api/admin/chat/get-chat-by-id/${chat_id}?page=${this.chatPageNumber}&user_id=${userId}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          this.chats = res.data.chat.participants;
          this.getMessages = res.data.messages.data;
          this.getChatStatus.chatId = res.data.chatStatus.id;
          this.getChatStatus.status = res.data.chatStatus.status;
          this.chatloader = false;
          this.getUnreadData();
          this.chatPageNumber++;
        })
        .catch((error) => {
          console.error("Error fetching messages:", error);
        });
    },
    scrollGetChatData(chat_id, userId) {
      if (this.loading) return; 
      this.loading = true;
      axios
        .get(
          `https://api.doppcall.com/api/chat/get-chat-scroll/${chat_id}?page=${this.chatPageNumber}&user_id=${userId}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          this.getMessages = [...res.data.messages.data, ...this.getMessages];
          if(res.data.messages.data.length > 0){
            this.chatPageNumber += 1;
          }
          this.loading = false;
        })
        .catch((error) => {
          console.error("Error fetching messages:", error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    messageOnScroll(event, chat_id, user_id) {
      const scrollTop = event.target.scrollTop;
      if (scrollTop === 0 && !this.loading) { 
        this.scrollGetChatData(chat_id, user_id);
      }
    },
    accountManagersModal(id,chat_id) {
      this.assignManager.user_id = id;
      this.assignManager.chat_id = chat_id;
    },
    getAccountManeger() {
      axios
        .get(`https://api.doppcall.com/api/admin/chat/account/manegers`, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          this.accountManagers = res.data.accountManegers;
        })
        .catch((e) => {
          console.error(e);
        });
    },
    AddedAccountManager() {
      this.getLoader = true;
      axios
        .post(`https://api.doppcall.com/api/admin/chat/account/maneger/save`,this.assignManager, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          if(res.data.status == 'success'){
            this.page = 1;
            toastr.success(res.data.message);
            const modalElement = document.getElementById('assignModal');
            const modal = bootstrap.Modal.getInstance(modalElement);
            if(modal){
              modal.hide();
            }
            this.getChatData(this.assignManager.chat_id,this.assignManager.user_id);
            this.assignManager.manager_id = "";
            this.assignManager.chat_id = "";
          }else{
            toastr.error('Something Went To Wrong');
          }
        })
        .catch((error) => {
          if (error.response && error.response.data && error.response.data.errors) {
             this.validationErrors = error.response.data.errors;
           }
        })
        .finally(() => {
           this.getLoader = false;
        });
    },
    blockUser(chat_id,id) {
      Swal.fire({
        text: "Are You Sure Block This User",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.value) {
          this.chatloader = true;
          axios
            .get(`https://api.doppcall.com/api/admin/chat/block/user/${id}`, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((res) => {
              if(res.data.status == 'success'){
                toastr.success(res.data.message);
                this.page = 1;
                this.getChatData(chat_id,id);
              }else{
                toastr.error('Something Went To Wrong');
              }
            })
            .catch((e) => {
              return e;
            })
            .finally(() => {
              this.chatloader = false;
            });
        }
      });
    },
    UnBlockUser(chat_id,id) {
      Swal.fire({
        text: "Are You Sure Unblock This User",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.value) {
          this.chatloader = true;
          axios
            .get(`https://api.doppcall.com/api/admin/chat/unblock/user/${id}`, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((res) => {
              if(res.data.status == 'success'){
                toastr.success(res.data.message);
                this.page = 1;
                this.getChatData(chat_id,id)
              }else{
                toastr.error('Something Went To Wrong');
              }
            })
            .catch((e) => {
              return e;
            })
            .finally(() => {
              this.chatloader = false;
            });
        }
      });
    },
    showUserInfo(user){
      if(user.avatar != null){
        this.userInfoShowSidebar.userImage  = 'https://api.doppcall.com/'+ user.avatar;
      }else{
        this.userInfoShowSidebar.userImage = this.blank_user;
      }
      this.userInfoShowSidebar.userName = user.fname  +' '+ user.lname ;
      this.userInfoShowSidebar.userRole = user.role.name;
      this.userInfoShowSidebar.userID = user.id  ?? '';
      this.userInfoShowSidebar.userLocation = user.user_location.country  ?? '';
      this.userInfoShowSidebar.userFlug = this.getFlagUrl(user.user_location.country_code ?? '');
      this.userInfoShowSidebar.userPage = user.page_name ?? '';
      this.userInfoShowSidebar.userIp = user.user_location.ip_address ?? '';
      this.userInfoShowSidebar.userEmail = user.email  ?? '';
      this.userInfoShowSidebar.userPhone = user.phone_no  ?? '';
      this.userInfoShowSidebar.userCreated = user.created_at ?? '';
      this.userInfoShowSidebar.userFacebook = user.facebook ?? '';
      this.userInfoShowSidebar.userSkype = user.skype ?? '';
      this.userInfoShowSidebar.userTelegram = user.telegram ?? '';
      this.userInfoShowSidebar.chatId = user.pivot.chat_id ?? '';
      this.userInfoShowSidebar.blockStatus = user.block_status ?? '';
      $('#app-chat-sidebar-right').addClass('show');
      $('.app-overlay').addClass('show');
    },
    getFlagUrl(countryCode) {
      if (countryCode) {
        const url = `https://flagicons.lipis.dev/flags/4x3/${countryCode.toLowerCase()}.svg`;
        return url;
      }
    },
    closeUserInfo(){
      $('#app-chat-sidebar-right').removeClass('show');
      $('.app-overlay').removeClass('show');
    },
    formatDate(date) {
      return moment(date).format('D MMMM YYYY');
    },
    searchUsers() {
      if (this.searchEmail.email == '') {
        this.page = 1;
        this.getAllWithMessageUser();
      } else {
        axios
          .post(`https://api.doppcall.com/api/admin/chat/search-user`, this.searchEmail, {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          })
          .then((res) => {
            this.chatUsers = res.data.chatUsers;
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    listenForOnlineUsers() {
       this.chatPageNumber = 1;
      window.Echo.join("online-users")
        .here((users) => {
          this.onlineUsers = users;
        })
        .joining((user) => {
          this.onlineUsers.push(user);
        })
        .leaving((user) => {
          this.onlineUsers = this.onlineUsers.filter((u) => u.id !== user.id);
        });
    },
    formatTimestamp(timestamp) {
      const messageDate = new Date(timestamp);
      const now = new Date();
      const timeDiff = now - messageDate;
      const oneHour = 1000 * 60 * 60;
      const oneDay = 1000 * 60 * 60 * 24;
      if (timeDiff < oneHour) {
        const minutesAgo = Math.floor(timeDiff / (1000 * 60));
        return `${minutesAgo} Minutes`;
      } else if (timeDiff < oneDay) {
        return `${Math.floor(timeDiff / oneHour)} Hours`;
      } else if (timeDiff < oneDay * 2) {
        return 'Yesterday';
      } else {
        return messageDate.toLocaleDateString(); 
      }
    },
    formatTime(dateString) {
      const date = new Date(dateString);
      return format(date, "hh:mm a");
    },
    sendMessage() {
      var activeUser = this.onlineUsers.find(user => user.id === this.create_chat.user_id);
      this.createMessage.user_activitiy = activeUser ? 1 : 0;
      this.createMessage.domainName = this.domainName;
      this.createMessage.user_id = this.create_chat.user_id;
      this.createMessage.message =  this.getMessageText.message;
      const chatMessage = {
          message: this.createMessage.attachmentMessage + this.getMessageText.message,
          user_id: this.authUserID,
          type: this.createMessage.type,
          message_sender : 0,
          sender: {
            id: this.authUser.id,
            avatar: this.authUser.avatar,
            role_id : this.authUser.role_id,
          },
          message_read: activeUser == 1 ? 2 : 0,
          created_at : this.getLaravelFormattedTime(),
      };

      if(this.createMessage.message != '' && this.createMessage.message != null){
        console.error(this.createMessage.message);
        this.chatPubAdveImageShowImage.image = "";
        this.getMessages.push(chatMessage);
        this.chatReplayTextShow = false;
        this.showEmojiPicker = false;
        this.getMessageText.message = '';
        this.showAudioBtn = false;
        this.$nextTick(() => {
          this.scrollToBottom();
        });
        axios
          .post("https://api.doppcall.com/api/admin/chat/send-text-message", this.createMessage, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
            this.page = 1;
            this.chatPageNumber = 1; 
            this.chatPubAdveImageShowImage.image = "";
            this.StoredgetChatData(this.createMessage.chat_id,this.create_chat.user_id)
            this.getAllWithMessageUser();
            this.createMessage.message = "";
            this.createMessage.type = "text";
            this.createMessage.attachmentMessage = "";
            this.showSendMessageBtn = true;
            this.showImageBtn = false;
            this.showAudioBtn = false;
            this.selectedUser = 0;
          })
          .catch((error) => {
            console.error("Error sending message:", error);
          });
      }
    },
    listenForMessages(chatID) {
      window.Echo.private(`chat.${chatID}`).listen("ChatMessageSent", (event) => {
        if(this.createMessage.chat_id === event.message.chat_id){
          if(event.message.sender.id != this.authUserID){
            this.getMessages.push(event.message);
            this.$nextTick(() => {
              this.scrollToBottom();
            });
            axios
            .get(`https://api.doppcall.com/api/admin/chat/seen/bychat/${event.message.chat_id}`, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((res) => {
            });
            }
          }
      });
    },
    changeParnetChatTab(data) {
      this.ActiveParentTab = data;
    },
    changeChatTab(data) {
      this.ActiveChatTab = data;
      if(data == 'unread'){
        this.runChatLoader = true;
        this.getUnreadData();
      }else if(data == 'unresolved'){
        this.runChatLoader = true;
        this.getUnresolvedData();
      }
    },
    changeChatTabFilters(data,id) {
      this.ActiveChatTab = data;
      if(id == 'mentions'){
        this.showfiltarData = 'mentions';
        this.getMentionsData();
      }else if(id == 'most_resent'){
        this.showfiltarData = 'most_resent';
        this.getMostResentData();
      }else if(id == 'resolved'){
        this.showfiltarData = 'resolved';
        this.getResolvedData();
      }
    },
    getUnreadData(){
      axios
        .get("https://api.doppcall.com/api/admin/chat/unread/chat", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.unreadMessages = res.data.unreadMessages;
        })
        .catch((error) => {
          console.error("Error sending message:", error);
        })
        .finally(() => {
          this.runChatLoader = false;
        });
    },
    getUnresolvedData(){
      axios
        .get("https://api.doppcall.com/api/admin/chat/unresolved/chat", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
        this.unresolvedChats = res.data.unresolveChat;
        })
        .catch((error) => {
          console.error("Error sending message:", error);
        })
        .finally(() => {
          this.runChatLoader = false;
        });
    },
    getResolvedData(){
      this.runChatLoader = true;
      axios
        .get("https://api.doppcall.com/api/admin/chat/resolved/chat", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.resolveChat = res.data.resolveChat;
        })
        .catch((error) => {
          console.error("Error sending message:", error);
        })
        .finally(() => {
          this.runChatLoader = false;
        });
    },
    getMentionsData(){
      this.runChatLoader = true;
      axios
        .get("https://api.doppcall.com/api/admin/chat/mentions/chat", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.getMentionsChats = res.data.messionChats;
        })
        .catch((error) => {
          console.error("Error sending message:", error);
        })
        .finally(() => {
          this.runChatLoader = false;
        });
    },
    getMostResentData(){
      this.runChatLoader = true;
      axios
        .get("https://api.doppcall.com/api/admin/chat/most/resent/chat", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          this.getMostResentChats = res.data.mostResentChats;
        })
        .catch((error) => {
          console.error("Error sending message:", error);
        })
        .finally(() => {
          this.runChatLoader = false;
        });
    },
    changeChatStatus(chatId,status){
      this.UpdateChatStatus.chatId = chatId; 
      this.UpdateChatStatus.status = status; 
      this.chatloader = true;
      axios
        .post("https://api.doppcall.com/api/admin/chat/status/change", this.UpdateChatStatus,{
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
            this.page = 1;
            this.getUnreadData();
            this.getUnresolvedData();
            this.getResolvedData();
            this.getAllWithMessageUser();
            this.chatloader = false;
          if(res.data.status == 'success'){
            toastr.success(res.data.message);
            this.getChatStatus.status = 1 ;
          }else{
            toastr.error(res.data.message);
            this.getChatStatus.status = 0 ;
          }
        })
        .catch((error) => {
          console.error("Error sending message:", error);
        });
    },
    clearChatHistory(id,user_id) {
      Swal.fire({
        text: "Are You Sure Clear Chat History",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.value) {
          this.chatloader = true;
          axios
            .get(`https://api.doppcall.com/api/admin/chat/history/delete/${id}`, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((res) => {
              if(res.data.status == 'success'){
                toastr.success(res.data.message);
                this.page = 1;
                this.getAllWithMessageUser();
                this.chatPageNumber = 1;
                this.page = 1;
                this.getAllWithMessageUser();
                this.StoredgetChatData(id,user_id);
              }
            })
            .catch((e) => {
              return e;
            })
            .finally(() => {
              this.chatloader = false;
            })
        }
      });
    },
    markAllMessageRead(){
      axios
          .get(`https://api.doppcall.com/api/admin/chat/markasread/chat`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
            if(res.data.status == 'success'){
              toastr.success(res.data.message);
              this.getUnreadData()
            }
          })
          .catch((e) => {
            return e;
          })
          .finally(() => {
            this.chatloader = false;
          })
    },
    
    markAllResolved(){
      axios
          .get(`https://api.doppcall.com/api/admin/chat/markasresolved/chat`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
            if(res.data.status == 'success'){
              this.page = 1;
              toastr.success(res.data.message);
              this.getAllWithMessageUser();
              this.getUnresolvedData();
            }
          })
          .catch((e) => {
            return e;
          })
          .finally(() => {
          })
    },
    listenForNewChatUser(userId) {
      window.Echo.private(`chatcreate.${userId}`).listen("ChatCreateBroadcast", (event) => {
        toastr.success('user created message');
        this.page = 1;
        if (this.getAllWithMessageUser) {
          this.getAllWithMessageUser();
        } else {
          console.error('getAllWithMessageUser method does not exist');
        }
      });
    },
    messageReply(message){
      this.chatReplayTextShow = true;
      
      if(message && message.sender && message.sender.id ==  this.authUserID){
        this.chatReplyUser.user = 'yourself';
      }else{
          this.chatReplyUser.user =  message.sender.fname;
      }

      if(message.type == 'audio' || message.type == 'image'){
        this.createMessage.attachmentMessage = '<span class="message_replay">Attachment<i class="fa-solid fa-paperclip ms-1"></i></span>';
        this.chatReplyUser.message = 'Attachment';
      }else{
        var getMessage = this.cleanedMessage(message.message );
        this.createMessage.attachmentMessage = '<span class="message_replay">'+getMessage+'</span>';
        this.chatReplyUser.message = getMessage;
      }
    },
    cleanedMessage(message) {
      return message.replace(/<span class="message_replay">[\s\S]*?<\/span>/g, '');
    },
    messageReplayClose(){
      this.chatReplayTextShow = false;
      this.createMessage.attachmentMessage = "";
    },
    messageDeleteForYourSelf(id){
      this.messageDeleteSelf.id = id;
    },
    deleteBtnValue(status){
      this.messageDeleteSelf.status = status;
    },
    messageDeleteYourSelf(message){
        axios
          .post(`https://api.doppcall.com/api/chat/message/delete/sender`,this.messageDeleteSelf,{
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
            if(res.data.status == 'success'){
              toastr.success(res.data.message);
              this.chatPageNumber = 1;
              this.page = 1;
              this.getAllWithMessageUser();
              this.StoredgetChatData(message.chat_id,this.create_chat.user_id);
              const modalElement = document.getElementById('deleteMessageModal_'+message.id);
              const modal = bootstrap.Modal.getInstance(modalElement);
              if(modal){
                modal.hide();
              }
            }else{
              toastr.error('Something Went To Wrong');
            }
          })
          .catch((e) => {
            return e;
          });
    },
    messageDelete(message){
      Swal.fire({
        text: "Are You Sure Delete This Message",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.value) {
          axios
            .get(`https://api.doppcall.com/api/chat/message/delete/${message.id}`, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((res) => {
              if(res.data.status == 'success'){
                toastr.success(res.data.message);
                this.chatPageNumber = 1;
                this.page = 1;
                this.getAllWithMessageUser();
                this.StoredgetChatData(message.chat_id,message.user_id);
              }else{
                toastr.error('Something Went To Wrong');
              }
            })
            .catch((e) => {
              return e;
            })
            .finally(() => {
              this.chatloader = false;
            });
        }
      });
    },
    downloadAudio(message) {
         this.chatloader = true;
          const proxyUrl = 'https://thingproxy.freeboard.io/fetch/';
          const targetUrl = 'https://api.doppcall.com/' + message.message;

          fetch(proxyUrl + targetUrl)
              .then(response => {
                  if (!response.ok) {
                      throw new Error(`HTTP error! status: ${response.status}`);
                  }
                  return response.blob(); 
              })
              .then(blob => {
                  if (!blob || blob.size === 0) {
                      throw new Error('Blob is empty or invalid.');
                  }
                  const blobUrl = window.URL.createObjectURL(blob); 
                  const link = document.createElement('a');
                  link.href = blobUrl;
                  link.download = 'audio.wav'; 
                  document.body.appendChild(link);
                  link.click(); 
                  document.body.removeChild(link);
                  window.URL.revokeObjectURL(blobUrl);
                  this.chatloader = false;
              })
              .catch(error => console.error('Error downloading audio:', error));
    },
    messageUnread(message) {
      this.chatloader = true;
          axios
            .get(`https://api.doppcall.com/api/admin/chat/message/unread/${message.id}`, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((res) => {
              if(res.data.status == 'success'){
                toastr.success(res.data.message);
              }else{
                toastr.error('Something Went To Wrong');
              }
            })
            .catch((e) => {
              return e;
            })
            .finally(() => {
              this.chatloader = false;
            });
    },
    messageReact(id,react) {
      const element = document.getElementById('message_react_'+id);
      if (element) {
        element.innerHTML = "";
        element.innerHTML = react;
      }
      this.messageReactData.react = react;
          axios
          .post(`https://api.doppcall.com/api/chat/message/react/${id}`, this.messageReactData,{
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
            this.page = 1;
            this.getAllWithMessageUser();
          })
          .catch((e) => {
            return e;
          });
    },
    getSuffix(number) {
      let suffix = "";
      if (number >= 1000000) {
        suffix = "M";
      } else if (number >= 1000) {
        suffix = "K";
      }
      return suffix;
    },
    formatNumber(number) {
      number = Number(number);

      if (number >= 1000000) {
        number = number / 1000000;
      } else if (number >= 1000) {
        number = number / 1000;
      }
      if (isNaN(number)) {
        return 0;
      }
      return parseFloat(number.toFixed(2));
    },
    scrollToBottom() {
      const chatContainer = this.$refs.chatContainer[0]; 
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight; 
      }
    }, 
    getLaravelFormattedTime() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    listenForCountMessages(userId) {
      window.Echo.private(`recivemessage.${userId}`).listen("ChatMessageReciveEvent", (event) => {
        this.page = 1;
        this.getAllWithMessageUser();
        // var getMessageCount =  parseInt(localStorage.getItem('adminCountMessage_'+event.message.sender) ?? 0);
        // if(getMessageCount > 0){
        //   localStorage.setItem('adminCountMessage_'+event.message.sender, getMessageCount +1);
        // }else{
        //   localStorage.setItem('adminCountMessage_'+event.message.sender, 1);
        // }
        // var totalMessage = parseInt(localStorage.getItem("totalChatMessageCount") ?? 0);
        // var grandTotal = totalMessage + 1;
        // localStorage.setItem("totalChatMessageCount", grandTotal);
        // var storeId = document.getElementById('countChats');
        // var sidebarChatCount = document.getElementById('sidebarChatCount');
        // if (storeId) {
        //     storeId.innerHTML = grandTotal;
        //     sidebarChatCount.innerHTML = (grandTotal);
        // }
      });
    },
    userByCountChat(user_id){
      var countNumber =  parseInt(localStorage.getItem('adminCountMessage_'+user_id) ?? 0);
      if(countNumber > 0){
        return countNumber;
      }else{
        return '';
      }
    },
    onScroll(event) {
      const { scrollTop, clientHeight, scrollHeight } = event.target;
      if (this.lastScrollTop < scrollTop) {
        if (scrollTop + clientHeight >= scrollHeight - 5) {
          this.showUserGetLoader = true;
          this.getAllUser();
        }
      }
      this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    },
    showSmailChat(){
      $('#app-chat-contacts').addClass('show');
      $('.app-overlay').addClass('show');
    },
    hideSmailChat(){
      $('#app-chat-contacts').removeClass('show');
      $('.app-overlay').removeClass('show');
    },
    changeContactTab(data){
      this.ActiveContactTab = data;
    },
    initializeSelect2() {
      $('#conversation-type').select2({
        width: '100%', 
        dropdownParent: $('#createNewChat')
      }).on('change', (e) => {
          this.create_chat.user_id = $(e.target).val();
      });
      
      // $(".select2").on("select2:open", () => {
      //   const select2Dropdown = $(".select2-results__options")[0];
      //   if (select2Dropdown) {
      //     $(select2Dropdown).on("scroll", (event) => {
      //       const { scrollTop, scrollHeight, clientHeight } = event.target;
      //       if (scrollTop + clientHeight >= scrollHeight - 5) {
      //         this.getAllUser();
      //       }
      //     });
      //   }
      // });
    },
    callToSelectJs() {
      setTimeout(() => {
        this.initializeSelect2();
      }, 1000);
    },
  },
};
</script>
<style>
.totalUserMessageCount {
	position: absolute;
	margin-left: 7px;
	background: #7367f0;
	width: 20px;
	height: 18px;
	border-radius: 50%;
	text-align: center;
	color: white;
	font-size: 12px;
	font-weight: 500;
}
.chat-history-body {
  height: calc(100vh - 20.5rem) !important;
  padding: 2rem 1.5rem !important;
  overflow: hidden !important;
}
#chat-history-body {
	scrollbar-width: thin;
}
#createNewChatSelect .select2-container--default.select2-container--focus .select2-selection, .select2-container--default.select2-container--open .select2-selection {
	border-color: #babfc8 !important;
}
#createNewChatSelect .select2-container--default .select2-selection--single .select2-selection__arrow {
	top: 5px !important;
	right: 8px !important;
}
#createNewChatSelect .close_btn {
	border: 1px solid #25374f;
	border-radius: 1px;
	color: #25374f;
	font-weight: 700;
}
#createNewChatSelect .create_btn {
	border: 1px solid #7367f0;
	border-radius: 1px;
	background: #7367f0;
	font-weight: 700;
}
#createNewChatSelect .create_btn .icons {
	background: white;
	color: #7367f0;
	font-size: 14px;
	padding: 2px 3px;
	border-radius: 50%;
}
#createNewChatSelect .close_btn:hover {
	background: #25374f;
	color: white !important;
	font-weight: 700 !important;
}
#solved , #unsolved {
	padding: 6px 7px;
	font-size: 12px;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
}
.chat-contact-info i {
	width: 25px;
	height: 25px;
  margin-left:auto;
}
#chatloader {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%,-50%);
}
.app-chat .sidebar-body .chat-contact-list li.active h6 , .app-chat .sidebar-body .chat-contact-list li.active p{
	color: white;
}
.app-chat .sidebar-body .chat-contact-list li.active img{
	border: 2px solid white !important;
}
.app-chat .sidebar-body .chat-contact-list li h6{
	font-weight: 500;
  color: var(--bs-heading-color);
}
#createNewChatSelect .select2-container--default .select2-selection--single .select2-selection__rendered {
	line-height: 31px !important;
}
#createNewChatSelect .select2-container .select2-selection--single {
	height: 36px !important;
}
#createNewChatSelect .select2-dropdown.select2-dropdown--below {
	margin-top: 0.5rem !important;
	border-top: 1px solid #aaa !important;
}
.chat-contact-status {
	font-size: 13px !important;
}
</style>
<style scoped>
#app-chat-contacts {
	background-color: #fff;
	box-shadow: 16px 1px 45px 3px rgba(75, 70, 92, 0.5);
}

.app-chat #side-bar-scroll {
  overflow-y: auto !important; 
  overflow-x: hidden !important;
  height: 600px;
}
.app-chat #side-bar-scroll {
  scrollbar-width: thin;
  scrollbar-color: #dbdade #ffffff;
}
.chat-history .chat-message .chat-message-text {
  background-color: #fff;
  box-shadow: 0 0.125rem 0.25rem rgba(165, 163, 174, 0.3);
}

.app-chat-sidebar-right {
	background-color: #fff;
	box-shadow: 16px 1px 45px 3px rgba(75, 70, 92, 0.5);
}
#icons_class {
	color: #6f6b7d !important;
}
#icons_id::before{
  color: #6f6b7d !important;
	font-size: 22px;
	font-weight: 100 !important;
}
.message-filter li{
  cursor: pointer;
}
.message-filter li a{
  padding:5px 10px;
  display: inline-block;
}

.message-filter li:hover{
  color:#4839EB;
}
.message-filter .active {
	color: #4839EB;
  position: relative;
}
.message-filter .active::after{
  position: absolute;
  content: "";
  left: 0px;
  bottom: -1px;
  height: 3px;
  background-color: #4839EB;
  right: 0px;
  transition: height .1s linear;
}

.filter_dropdown_area {
  position: relative;
}
.filter_dropdown_area::after {
	position: absolute;
	content: "";
	right: 0;
	top: 50%;
	transform: translateY(-50%) rotate(45deg);
  -webkit-transform:translateY(-50%) rotate(45deg);
	border: solid #25374f;
	border-width: 0 2px 2px 0;
	display: inline-block;
	padding: 2px;
}
.filter_dropdown_area:hover::after{
  transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
  border-color:#4839EB;
}
.filter_dropdown {
	position: absolute;
	z-index: 10;
	left: -180px;
	background: #fff;
	border: 1px solid #ededed;
	box-shadow: 0 0 1px 0px #ddd;
	transition: .3s ease all;
	visibility: hidden;
	width: 270px;
  top: 34px;
}
.filter_dropdown_area:hover .filter_dropdown {
  visibility: visible;
  transition: .3s ease all;
}
.filter_dropdown button {
  width: 100%;
  text-align: left;
  padding: 7px 20px;
  border: none;
  background: #fff;
  font-weight: 300;
}
.filter_dropdown button i{
padding-right: 6px;
color: #4839EB;
}
.filter_dropdown button:hover, .filter_dropdown button:hover i{
  background-color:#4839EB;
  color: white;
}

#chatboxLastItem{
  border-top: 1px solid #d6d6d6;
}
.live-chat-action-btn {
	width: 25px;
	height: 25px;
	line-height: 26px;
	border-radius: 50%;
	color: #fff !important;
	font-size: 12px;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #7367f0;
	font-weight: 700 !important;
}

.chats_tab_bar {
	border-bottom: 2px solid #ededed;
}

#assign_btn {
  background: transparent;
  color: #818181;
  margin-left: -5px;
  font-size: 14px;
}
#noContent {
  margin-top: -5rem;
}

.chat-history .chat-message .chat-message-text {
  background-color: #fff;
  box-shadow: 0 0.125rem 0.25rem rgba(165, 163, 174, 0.3);
}
.app-chat .app-chat-history .chat-history-body {
  overflow: visible !important;
  overflow-x: auto !important;
}
.chat-message-text img {
	max-width: 80px !important;
  height: 50px !important;
}
.chatPreviewImage {
	width: 56px;
	height: 50px;
	border: 1px solid #b2b2b2;
	border-radius: 5px;
}
#deleteImages {
	position: absolute;
	padding: 0px !important;
	color: #7367f0;
	background: transparent;
	border: 0.5px solid #7367f0;
	border-radius: 50%;
	height: 20px;
	width: 20px;
	font-size: 13px;
}
#chat_loader{
	position: absolute;
	height: 87%;
	background: white;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	top: 57%;
	transform: translateY(-50%);
  z-index:10;
}
#totalActiveUsers{
	position: absolute;
	top: 6px;
	margin-left: 2px;
	white-space: nowrap;
	font-size: 11px;
	color: black;
	background: palegreen;
	width: 30%;
	font-weight: bold;
  transform: rotate(-3deg);
}
#userinfoflug {
	width: 8%;
	margin-left: 7px;
}
#userinfoflugicons{
  margin-left: -5px;
}
.top-filter {
  background: #7367f0 !important;
  padding: 0 !important;
  margin: 0;
}
.top-filter .active i {
  color: #fff;
}
.top-filter .active {
  background: #4839EB;
}
.top-filter li {
  width: 25%;
  text-align: center;
}
.top-filter li a {
  width: 100%;
}
.top-filter .active::after {
  background: unset !important;
  height: unset !important;
}
.top-filter li i {
  color: #fff;
}
.top-filter li a{
  padding:12px 10px;
}
.message-actions .btn i {
	font-size: 18px !important;
}
.no_data_found {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%,-50%);
}
.no_data_found img{
  max-width:100%;
  width:150px;

}
@keyframes record-progress{
  0%{
    opacity:0;
  }
  50%{
    opacity:1;
  }
  100%{
    opacity:0;
  }
}
.record_animation{
  margin-bottom:0!important;
}
.record_animation::before {
	content: "";
	position: absolute;
	background-color: #fff;
	width: 15px;
	height: 15px;
	margin-right: 6px;
	margin-left: -1px;
	background-size: contain;
	background-repeat: no-repeat;
	background-position: center;
	animation-name: record-progress;
	animation-duration: 2.5s;
	animation-timing-function: ease-in;
	animation-iteration-count: infinite;
	display: inline-block;
	-webkit-mask-image: url(data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzE2JyB2aWV3Qm94PScwIDAgMTYgMTYnIHdpZHRoPScxNicgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48Zz48cmVjdCBoZWlnaHQ9JzYnIHJ4PScuODc1JyB3aWR0aD0nMS43NScgeD0nMTMuMTI1JyB5PSc1Jy8+PHJlY3QgaGVpZ2h0PScxMC41JyByeD0nLjg3NScgd2lkdGg9JzEuNzUnIHg9JzEwLjEyNScgeT0nMi43NScvPjxyZWN0IGhlaWdodD0nMTQnIHJ4PScuODc1JyB3aWR0aD0nMS43NScgeD0nNy4xMjUnIHk9JzEnLz48cmVjdCBoZWlnaHQ9JzYnIHJ4PScuODc1JyB3aWR0aD0nMS43NScgeD0nNC4xMjUnIHk9JzUnLz48cmVjdCBoZWlnaHQ9JzEwJyByeD0nLjg3NScgd2lkdGg9JzEuNzUnIHg9JzEuMTI1JyB5PSczJy8+PC9nPjwvc3ZnPg==);
	mask-image: url(data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzE2JyB2aWV3Qm94PScwIDAgMTYgMTYnIHdpZHRoPScxNicgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48Zz48cmVjdCBoZWlnaHQ9JzYnIHJ4PScuODc1JyB3aWR0aD0nMS43NScgeD0nMTMuMTI1JyB5PSc1Jy8+PHJlY3QgaGVpZ2h0PScxMC41JyByeD0nLjg3NScgd2lkdGg9JzEuNzUnIHg9JzEwLjEyNScgeT0nMi43NScvPjxyZWN0IGhlaWdodD0nMTQnIHJ4PScuODc1JyB3aWR0aD0nMS43NScgeD0nNy4xMjUnIHk9JzEnLz48cmVjdCBoZWlnaHQ9JzYnIHJ4PScuODc1JyB3aWR0aD0nMS43NScgeD0nNC4xMjUnIHk9JzUnLz48cmVjdCBoZWlnaHQ9JzEwJyByeD0nLjg3NScgd2lkdGg9JzEuNzUnIHg9JzEuMTI1JyB5PSczJy8+PC9nPjwvc3ZnPg==);
	left: 10px;
	top: 50%;
	transform: translateY(-50%);
  
}
.audio_record_area {
	background: #0d6efd;
	border-radius: 8px;
	color: white;
	margin-right: 2px;
	padding: 5px 10px 5px 30px;
}
.audio_record_area::after{
  height:100%;
  width:100%;
  content:"";
  background:red;
  left:0;
  top:0;
}
.audio_record_area i{
  color:#fff!important;
  font-size:15px!important;
}

.record_state {
	margin-left: 5px !important;
	margin-right: 12px;
	margin-top: -2px !important;
}

.active_user_list{
  margin-top: 20px;
}
.active_user_list li {
  position: relative;
  font-weight:700;
  padding:8px 0;
}
.active_user_list li::before {
  content: "";
  position: absolute;
  width: 0;
	height: 0;
	border-top: 8px solid transparent;
	border-left: 16px solid #012964;
	border-bottom: 8px solid transparent;
  background: #fff;
  left: -25px;
  top: 50%;
  transform: translateY(-50%);
}

.message-actions .dashboard_emoji_picker{
	width: 100%;
	position: absolute;
	bottom: 69px;
	height: 155px;
	overflow-y: scroll;
	scrollbar-width: thin;
	left: 0;
	padding: 10px;
	background: #685dd8 !important;
	border-radius: 5px 5px 0 0;
}
.rep_btn.dropdown-toggle, .rep_emoji_btn{
  padding:5px;
  width:0;
  top: 50%;
  transform: translateY(-50%);
	position: absolute!important;
  opacity:0;
  display:none!important;
  transition:.3s ease all;
}

#chat-history-body ul li:hover .rep_btn.dropdown-toggle, #chat-history-body ul li:hover .rep_emoji_btn{
  opacity:1;
  display:block!important;
}
.chat-message .rep_btn.dropdown-toggle {
  left:33px;
}
.chat-message-right .rep_btn.dropdown-toggle {
  left:-40px;
}
.dropend .dropdown-toggle::after, .dropstart .dropdown-toggle::before {
	height: 0;
	border: 0;
}
.message_react_left {
	position: absolute;
	bottom: -7px;
	font-size: 15px;
	left: 0px;
}
.message_react_image_left {
	position: absolute;
	top: 3rem;
	font-size: 15px;
	left: 0px;
}
.message_react_audio_left {
	position: absolute;
	top: 38px;
	font-size: 15px;
	left: 0px;
}
.message_react_right, .message_react_image_right, .message_react_audio_right {
	position: absolute;
  bottom: -10px!important;
	font-size: 15px;
	right:-10px!important;
}

.message-replay-div {
	position: absolute;
	top: -61px;
	background: #dedede;
	width: 94%;
	padding: 10px 18px;
	border-radius: 5px;
	display: flex;
	justify-content: space-between;
}
.rep_emoji_btn + ul {
	padding: 5px 0;
	position: absolute !important;
	top: -42px !important;
	left: -75px !important;
}
.rep_emoji_btn + ul a {
  padding: 0px 3px;
  margin: 0;
	display: inline;
	margin: 0;

}
.rep_emoji_btn.dropdown-toggle {
	left: 8px;
}
.chat-message-right .rep_emoji_btn.dropdown-toggle {
	left: -28px;
}
.form-check-input:checked, .form-check-input[type="checkbox"]:indeterminate {
	background-color: #7367f0 !important;
	border-color: #7367f0 !important;
}
.chat_img_lightbox .modal-body img {
	max-width: unset !important;
	width: 100%;
	height: auto !important;
}
.active.chat-contact-list-item p {
	color: white !important;
}
.chat-message-text, .app-chat .app-chat-history .chat-history .chat-message.chat-message-right .chat-message-text{
	background: unset !important;
  box-shadow:unset!important;
}
.chat-message-right-message p, .chat-message-left-audio audio, .chat-message-left-image img {
	background: #fff;
	border-radius: 5px;
	padding: 5px 7px;
  box-shadow:0 0.125rem 0.25rem rgba(165, 163, 174, 0.3);
  border-radius: 0 0.375rem 0.375rem 0.375rem;
}
.chat-message.chat-message-right p, .chat-message.chat-message-right audio, .chat-message.chat-message-right img, .chat-message.chat-message-right li {
	background: #7367f0;
	border-radius: 5px;
	padding: 5px 7px;
  box-shadow:0 0.125rem 0.25rem rgba(165, 163, 174, 0.3);
  border-radius: 0.375rem 0 0.375rem 0.375rem;
}
.chat-message.chat-message-right .dropdown-menu li,.avatar img{
	background: unset !important;
	box-shadow: unset !important;
	padding: unset!important;
}
.semi-top-filter li {
	width: 50%;
	text-align: center;
}
.semi-top-filter .active {
	width: 100% !important ;
	text-align: center;
}
.getContactMainTab{
	height: 570px;
	overflow-x: auto;
	scrollbar-width: thin;
}
</style>