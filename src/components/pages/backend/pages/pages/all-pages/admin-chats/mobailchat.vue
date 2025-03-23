<template>
    <div class="chat_second_tab_one px-0">
      <div class="chat_second_tab_chat_heading px-2 py-1 d-flex align-items-center justify-content-between">
        <div class="select-menu me-3" :class="{ active: isActive }">
          <div class="select-btn" @click="toggleMenu">
            <span class="sBtn-text">{{ selectedText }}</span>
            <i class="fa-solid fa-chevron-down"></i>
          </div>
          <div v-if="isActive">
            <div>
              <ul class="options">
                <li @click="selectOption('All')" class="option">
                  <i class="fa-solid fa-earth-africa text-success"></i> All
                </li>
                <li @click="selectOption('Unread')" class="option">
                  <i class="fa-regular fa-circle text-info"></i>Unread
                </li>
                <li @click="selectOption('Unresolved')" class="option">
                  <i class="fa-solid fa-arrow-right text-warning"></i>Unresolved
                </li>
                <li @click="selectOption('Mentions')" class="option">
                  <i class="fa-solid fa-at text-secondary"></i>Mentions
                </li>
                <li @click="selectOption('Most Recent')" class="option">
                  <i class="fa-solid fa-arrow-up text-primary"></i>Most Recent
                </li>
                <li @click="selectOption('Longest Waiting')" class="option">
                  <i class="fa-regular fa-clock text-danger"></i>Longest Waiting
                </li>
                <li @click="selectOption('Resolved')" class="option">
                  <i class="fa-solid fa-check text-success"></i>Resolved
                </li>
              </ul>
            </div>
          </div>
        </div>
          <div>
            <h5 class="mmenutitle">INBOX</h5>
          </div>
        <!-- <div class="chat_user_search">
          <div class="d-flex align-items-center">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" class="form-control" placeholder="Enter Name,Email......" v-model="searchEmail.email" @keyup="searchUsers()">
          </div>
        </div> -->
        <div class="chat_user_search">
        <span>
          <input type="search" id="search" placeholder="Enter Name, Email..." v-model="searchEmail.email"  @keyup="searchUsers()"
          />
          <label for="search"></label>
        </span>
      </div>

        <button class="create_converstion "  @click="callToSelectJs()" data-bs-toggle="modal" data-bs-target="#createNewChat"><i class="fa-solid fa-plus"></i></button>
      </div>
      <div class="chat_second_tab_one_chat_content" @scroll="ChatUserScroll($event)" id="chat_second_tab_one_chat_content">
       <ul class="px-0">
        <template v-if="!userLoading">
          <template v-if="ChatAllUsers && ChatAllUsers.length > 0">
            <template v-if="selectedText == 'All'">
              <template v-for="(user, index) in ChatAllUsers" :key="index">
                <li>
                  <RouterLink :to="'/admin-mobile-chat/'+user.id">
                    <div class="chat_user_list d-flex align-items-center">
                      <div class="position-relative dopp_user_avatar">
                        <template v-if="checkUserOnline(user.id)">
                          <span class="user_online"></span>
                        </template>
                        <template v-else>
                          <span class="user_offline"></span>
                        </template>
                      <template v-if="user.avatar != null">
                        <img id="user_image" class="position-relative" :src="'https://api.doppcall.com/'+user.avatar"  alt="avatar"/>
                      </template>
                      <template v-else>
                        <img id="blank_user_image" :src="blankUser"  alt="avatar"/>
                      </template>
                      <img id="user_flag_image" :src="'https://flagicons.lipis.dev/flags/4x3/' + (user.country_code ?? '') + '.svg'" alt=""/>
                      </div>
                      <div class="chat_user_list_info ms-3">
                        <h3 class="user_name_date">
                          <p class="mb-0 name position-relative">{{ user.fname ?? '' }} {{ user.lname ?? '' }} 
                            </p>
                          <div class="toggle_option_onhover">
                            <p class="mb-0 date"> {{ formatTimestamp(user && user.latest_message && user.latest_message.created_at) }}</p>
                          <div class="dropdown chat_hover_dropdown"><button type="button" id="user_actions_btn" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa-solid fa-ellipsis"></i></button>
                          <ul class="dropdown-menu"> 
                            <template v-if="user && user.chatstatus.status == 1">
                              <li><a @click="changeChatStatus(user.chatstatus.id,'0')" class="dropdown-item"><i class="fa-solid fa-arrow-right"></i>Mark as Unresolved</a></li>
                            </template>
                            <template v-else>
                              <li><a @click="changeChatStatus(user.chatstatus.id,'1')" class="dropdown-item"><i class="fa-solid fa-check"></i>Mark as Resolved</a></li>
                            </template>
                          <li><a @click="copyLinkUser(user.id)" class="dropdown-item"><i class="fa-solid fa-link"></i>Copy Link</a></li>
                          <template v-if="user && user.block_status == 0">
                            <li><a @click="blockUnblocUser(user.id , 1,'Are You Sure Block This User')" class="dropdown-item"><i class="fa-solid fa-ban text-danger"></i>Block User</a></li>
                          </template>
                          <template v-else>
                            <li><a @click="blockUnblocUser(user.id , 0, 'Are You Sure Unblock This User')" class="dropdown-item"><i class="fa-solid fa-unlock text-success"></i>Unblock User</a></li>
                          </template>
                          <li><a @click="deleteConverstion(user.chatstatus.id)" class="dropdown-item text-danger"><i class="fa-solid fa-trash "></i>Delete Conversation</a></li>
                          </ul></div>
                          </div>
                        </h3>
                        <div class="user_message_icon">
                            <div :class="'user_typing_message_'+user.id">
                              <template v-if="user && user.latest_message &&  user.latest_message.type == 'text'">
                                <p class="mb-0 message" v-html="user && user.latest_message &&  user.latest_message.message"></p>
                              </template>
                              <template v-else-if="user && user.latest_message &&  user.latest_message.type == 'audio' || user && user.latest_message &&  user.latest_message.type == 'image'">
                                <p class="mb-0 message">Attachment</p>
                              </template>
                            </div>
                            <div :class="'user_typing_'+user.id" class="d-none user_typing_message">
                              <span class="typing">
                                <span>typing</span> 
                                      <span class="dot"></span>
                                      <span class="dot"></span>
                                      <span class="dot"></span>
                                    </span>
                            </div>
                            <!-- <template v-else>
                              <p class="mb-0 message">{{ user.latest_message.message ?? '------' }}</p>
                            </template> -->
                            <div class="message_status_icon position-relative">
                              <template v-if="CheckReadOrUnreadMessageCount(user.id) > 0">
                                  <span class="total_message">{{ CheckReadOrUnreadMessageCount(user.id) }}</span>
                              </template>
                              <template v-if="user && user.chatstatus && user.chatstatus.status == 0">
                                <i id="unsolved" class="icon fa-solid fa-arrow-right text-white"></i>
                              </template>
                              <template v-else-if="user && user.chatstatus && user.chatstatus.status == 2">
                                <i id="pending" class="icon fa-solid fa-arrow-right text-white"></i>
                              </template>
                              <template v-else>
                                <i  id="solved" class="fa-solid fa-check text-white"></i>
                              </template>
                            </div>
                          </div>
                      </div>
                    </div>
                  </RouterLink>
                </li>
              </template>
            </template>
            <template v-else-if="selectedText == 'Unread'">
            <template v-if="usersWithUnred.length > 0">
              <template v-for="(user, index) in usersWithUnred" :key="index">
                <li>
                  <RouterLink :to="'/admin-mobile-chat/'+user.id">
                    <div class="chat_user_list d-flex align-items-center">
                      <div class="position-relative dopp_user_avatar">
                        <template v-if="checkUserOnline(user.id)">
                          <span class="user_online"></span>
                        </template>
                        <template v-else>
                          <span class="user_offline"></span>
                        </template>
                      <template v-if="user.avatar != null">
                        <img id="user_image" :src="'https://api.doppcall.com/'+user.avatar"  alt="avatar"/>
                      </template>
                      <template v-else>
                        <img id="blank_user_image" :src="blankUser"  alt="avatar"/>
                      </template>
                      <img id="user_flag_image" :src="'https://flagicons.lipis.dev/flags/4x3/' + (user.country_code ?? '') + '.svg'" alt=""/>
                      </div>
                      <div class="chat_user_list_info ms-3">
                        <h3 class="user_name_date">
                          <p class="mb-0 name position-relative">{{ user.fname ?? '' }} {{ user.lname ?? '' }}  
                            </p>
                          <div class="toggle_option_onhover">
                            <p class="mb-0 date"> {{ formatTimestamp(user && user.latest_message && user.latest_message.created_at) }}</p>
                          <div class="dropdown chat_hover_dropdown"><button type="button" id="user_actions_btn" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa-solid fa-ellipsis"></i></button>
                          <ul class="dropdown-menu"> 
                            <template v-if="user && user.chatstatus.status == 1">
                              <li><a @click="changeChatStatus(user.chatstatus.id,'0')" class="dropdown-item"><i class="fa-solid fa-arrow-right"></i>Mark as Unresolved</a></li>
                            </template>
                            <template v-else>
                              <li><a @click="changeChatStatus(user.chatstatus.id,'1')" class="dropdown-item"><i class="fa-solid fa-check"></i>Mark as Resolved</a></li>
                            </template>
                          <li><a @click="copyLinkUser(user.id)" class="dropdown-item"><i class="fa-solid fa-link"></i>Copy Link</a></li>
                          <template v-if="user && user.block_status == 0">
                            <li><a @click="blockUnblocUser(user.id , 1,'Are You Sure Block This User')" class="dropdown-item"><i class="fa-solid fa-ban text-danger"></i>Block User</a></li>
                          </template>
                          <template v-else>
                            <li><a @click="blockUnblocUser(user.id , 0, 'Are You Sure Unblock This User')" class="dropdown-item"><i class="fa-solid fa-unlock text-success"></i>Unblock User</a></li>
                          </template>
                          <li><a @click="deleteConverstion(user.chatstatus.id)" class="dropdown-item text-danger"><i class="fa-solid fa-trash "></i>Delete Conversation</a></li>
                          </ul></div>
                          </div>
                        </h3>
                        <div class="user_message_icon">
                            <div :class="'user_typing_message_'+user.id">
                              <template v-if="user && user.latest_message &&  user.latest_message.type == 'text'">
                                <p class="mb-0 message" v-html="user && user.latest_message &&  user.latest_message.message"></p>
                              </template>
                              <template v-else-if="user && user.latest_message &&  user.latest_message.type == 'audio' || user && user.latest_message &&  user.latest_message.type == 'image'">
                                <p class="mb-0 message">Attachment</p>
                              </template>
                            </div>
                            <div :class="'user_typing_'+user.id" class="d-none user_typing_message">
                              <span class="typing">
                                <span>typing</span> 
                                      <span class="dot"></span>
                                      <span class="dot"></span>
                                      <span class="dot"></span>
                                    </span>
                            </div>
                            <!-- <template v-else>
                              <p class="mb-0 message">{{ user.latest_message.message ?? '------' }}</p>
                            </template> -->
                            <div class="message_status_icon position-relative">
                              <template v-if="CheckReadOrUnreadMessageCount(user.id) > 0">
                                  <span class="total_message">{{ CheckReadOrUnreadMessageCount(user.id) }}</span>
                              </template>
                              <template v-if="user && user.chatstatus && user.chatstatus.status == 0">
                                <i id="unsolved" class="icon fa-solid fa-arrow-right text-white"></i>
                              </template>
                              <template v-else-if="user && user.chatstatus && user.chatstatus.status == 2">
                                <i id="pending" class="icon fa-solid fa-arrow-right text-white"></i>
                              </template>
                              <template v-else>
                                <i  id="solved" class="fa-solid fa-check text-white"></i>
                              </template>
                            </div>
                          </div>
                      </div>
                      <!-- <div class="chat_user_list_info ms-3">
                        <h3 class="user_name_date">
                          <p class="mb-0 name position-relative">{{ user.fname ?? '' }} {{ user.lname ?? '' }}  
                              <template v-if="CheckReadOrUnreadMessageCount(user.id) > 0">
                                <span class="total_message">{{ CheckReadOrUnreadMessageCount(user.id) }}</span>
                              </template>
                            </p>
                          <p class="mb-0 date"> {{ formatTimestamp(user && user.latest_message && user.latest_message.created_at) }}</p>
                        </h3>
                        <h3 class="user_message_icon">
                          <template v-if="user && user.latest_message &&  user.latest_message.type == 'text'">
                            <p class="mb-0 message" v-html="user && user.latest_message &&  user.latest_message.message"></p>
                          </template>
                          <template v-else-if="user && user.latest_message &&  user.latest_message.type == 'audio'">
                            <p class="mb-0 message">Attachment</p>
                          </template>
                          <template v-else>
                            <p class="mb-0 message"></p>
                          </template>
                          <template v-if="user && user.chatstatus && user.chatstatus.status == 0">
                            <i id="unsolved" class="icon fa-solid fa-arrow-right text-white"></i>
                          </template>
                          <template v-else>
                            <i  id="solved" class="fa-solid fa-check text-white"></i>
                          </template>
                        </h3>
                      </div> -->
                    </div>
                  </RouterLink>
                </li>
              </template>
            </template>
              <template v-else>
                <div class="no_chat_data_found">
                <div class="text-center">
                  <img id="no_message_image" :src="no_message" alt="image">
                  <p>No Unread Message Found!</p>
                </div>
               </div>
              </template>
            </template>
            <template v-else-if="selectedText == 'Unresolved'">
              <template v-if="usersWithUnresolved && usersWithUnresolved.length > 0">
                <template v-for="(user, index) in usersWithUnresolved" :key="index">
                    <li>
                      <RouterLink :to="'/admin-mobile-chat/'+user.id">
                        <div class="chat_user_list d-flex align-items-center">
                          <div class="position-relative dopp_user_avatar">
                        <template v-if="checkUserOnline(user.id)">
                          <span class="user_online"></span>
                        </template>
                        <template v-else>
                          <span class="user_offline"></span>
                        </template>
                          <template v-if="user.avatar != null">
                            <img id="user_image" :src="'https://api.doppcall.com/'+user.avatar"  alt="avatar"/>
                          </template>
                          <template v-else>
                            <img id="blank_user_image" :src="blankUser"  alt="avatar"/>
                          </template>
                          <img id="user_flag_image" :src="'https://flagicons.lipis.dev/flags/4x3/' + (user.country_code ?? '') + '.svg'" alt=""/>
                          </div>
                          <div class="chat_user_list_info ms-3">
                            <h3 class="user_name_date">
                              <p class="mb-0 name position-relative">{{ user.fname ?? '' }} {{ user.lname ?? '' }}  
                            </p>
                              <div class="toggle_option_onhover">
                                <p class="mb-0 date"> {{ formatTimestamp(user && user.latest_message && user.latest_message.created_at) }}</p>
                              <div class="dropdown chat_hover_dropdown"><button type="button" id="user_actions_btn" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa-solid fa-ellipsis"></i></button>
                              <ul class="dropdown-menu"> 
                                <template v-if="user && user.chatstatus.status == 1">
                                  <li><a @click="changeChatStatus(user.chatstatus.id,'0')" class="dropdown-item"><i class="fa-solid fa-arrow-right"></i>Mark as Unresolved</a></li>
                                </template>
                                <template v-else>
                                  <li><a @click="changeChatStatus(user.chatstatus.id,'1')" class="dropdown-item"><i class="fa-solid fa-check"></i>Mark as Resolved</a></li>
                                </template>
                              <li><a @click="copyLinkUser(user.id)" class="dropdown-item"><i class="fa-solid fa-link"></i>Copy Link</a></li>
                              <template v-if="user && user.block_status == 0">
                                <li><a @click="blockUnblocUser(user.id , 1,'Are You Sure Block This User')" class="dropdown-item"><i class="fa-solid fa-ban text-danger"></i>Block User</a></li>
                              </template>
                              <template v-else>
                                <li><a @click="blockUnblocUser(user.id , 0, 'Are You Sure Unblock This User')" class="dropdown-item"><i class="fa-solid fa-unlock text-success"></i>Unblock User</a></li>
                              </template>
                              <li><a @click="deleteConverstion(user.chatstatus.id)" class="dropdown-item text-danger"><i class="fa-solid fa-trash "></i>Delete Conversation</a></li>
                              </ul></div>
                              </div>
                            </h3>
                            <div class="user_message_icon">
                            <div :class="'user_typing_message_'+user.id">
                              <template v-if="user && user.latest_message &&  user.latest_message.type == 'text'">
                                <p class="mb-0 message" v-html="user && user.latest_message &&  user.latest_message.message"></p>
                              </template>
                              <template v-else-if="user && user.latest_message &&  user.latest_message.type == 'audio' || user && user.latest_message &&  user.latest_message.type == 'image'">
                                <p class="mb-0 message">Attachment</p>
                              </template>
                            </div>
                            <div :class="'user_typing_'+user.id" class="d-none user_typing_message">
                              <span class="typing">
                                <span>typing</span> 
                                      <span class="dot"></span>
                                      <span class="dot"></span>
                                      <span class="dot"></span>
                                    </span>
                            </div>
                            <!-- <template v-else>
                              <p class="mb-0 message">{{ user.latest_message.message ?? '------' }}</p>
                            </template> -->
                            <div class="message_status_icon position-relative">
                              <template v-if="CheckReadOrUnreadMessageCount(user.id) > 0">
                                  <span class="total_message">{{ CheckReadOrUnreadMessageCount(user.id) }}</span>
                              </template>
                              <template v-if="user && user.chatstatus && user.chatstatus.status == 0">
                                <i id="unsolved" class="icon fa-solid fa-arrow-right text-white"></i>
                              </template>
                              <template v-else-if="user && user.chatstatus && user.chatstatus.status == 2">
                                <i id="pending" class="icon fa-solid fa-arrow-right text-white"></i>
                              </template>
                              <template v-else>
                                <i  id="solved" class="fa-solid fa-check text-white"></i>
                              </template>
                            </div>
                          </div>
                          </div>
                          <!-- <div class="chat_user_list_info ms-3">
                            <h3 class="user_name_date">
                              <p class="mb-0 name">{{ user.fname ?? '' }} {{ user.lname ?? '' }}</p>
                              <p class="mb-0 date"> {{ formatTimestamp(user && user.latest_message && user.latest_message.created_at) }}</p>
                            </h3>
                            <h3 class="user_message_icon">
                              <template v-if="user && user.latest_message &&  user.latest_message.type == 'text'">
                                <p class="mb-0 message" v-html="user && user.latest_message &&  user.latest_message.message"></p>
                              </template>
                              <template v-else-if="user && user.latest_message &&  user.latest_message.type == 'audio'">
                                <p class="mb-0 message">Attachment</p>
                              </template>
                              <template v-else>
                                <p class="mb-0 message"></p>
                              </template>
                              <template v-if="user && user.chatstatus && user.chatstatus.status == 0">
                                <i id="unsolved" class="icon fa-solid fa-arrow-right text-white"></i>
                              </template>
                              <template v-else>
                                <i  id="solved" class="fa-solid fa-check text-white"></i>
                              </template>
                            </h3>
                          </div> -->
                        </div>
                      </RouterLink>
                    </li>
                </template>
              </template>
              <template v-else>
                <div class="no_chat_data_found">
                  <div class="text-center">
                    <img id="no_message_image" :src="no_message" alt="image">
                    <p>No Unresolved Data Found!</p>
                  </div>
               </div>
              </template>
            </template>
            <template v-else-if="selectedText == 'Mentions'">
              <!-- Filter users with mentions -->
              <template v-if="usersWithMentions.length > 0">
                <template v-for="(user, index) in usersWithMentions" :key="index">
                  <li>
                    <RouterLink :to="'/admin-mobile-chat/' + user.id">
                      <div class="chat_user_list d-flex align-items-center">
                        <div class="position-relative dopp_user_avatar">
                        <template v-if="checkUserOnline(user.id)">
                          <span class="user_online"></span>
                        </template>
                        <template v-else>
                          <span class="user_offline"></span>
                        </template>
                          <template v-if="user.avatar">
                            <img id="user_image" :src="'https://api.doppcall.com/' + user.avatar" alt="avatar" />
                          </template>
                          <template v-else>
                            <img id="blank_user_image" :src="blankUser" alt="avatar" />
                          </template>
                          <img id="user_flag_image" :src="'https://flagicons.lipis.dev/flags/4x3/' + (user.country_code ?? '') + '.svg'" alt="" />
                        </div>
                        <div class="chat_user_list_info ms-3">
                          <h3 class="user_name_date">
                            <p class="mb-0 name position-relative">{{ user.fname ?? '' }} {{ user.lname ?? '' }}  
                            </p>
                            <div class="toggle_option_onhover">
                              <p class="mb-0 date"> {{ formatTimestamp(user && user.latest_message && user.latest_message.created_at) }}</p>
                            <div class="dropdown chat_hover_dropdown"><button type="button" id="user_actions_btn" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa-solid fa-ellipsis"></i></button>
                            <ul class="dropdown-menu"> 
                              <template v-if="user && user.chatstatus.status == 1">
                                <li><a @click="changeChatStatus(user.chatstatus.id,'0')" class="dropdown-item"><i class="fa-solid fa-arrow-right"></i>Mark as Unresolved</a></li>
                              </template>
                              <template v-else>
                                <li><a @click="changeChatStatus(user.chatstatus.id,'1')" class="dropdown-item"><i class="fa-solid fa-check"></i>Mark as Resolved</a></li>
                              </template>
                            <li><a @click="copyLinkUser(user.id)" class="dropdown-item"><i class="fa-solid fa-link"></i>Copy Link</a></li>
                            <template v-if="user && user.block_status == 0">
                              <li><a @click="blockUnblocUser(user.id , 1,'Are You Sure Block This User')" class="dropdown-item"><i class="fa-solid fa-ban text-danger"></i>Block User</a></li>
                            </template>
                            <template v-else>
                              <li><a @click="blockUnblocUser(user.id , 0, 'Are You Sure Unblock This User')" class="dropdown-item"><i class="fa-solid fa-unlock text-success"></i>Unblock User</a></li>
                            </template>
                            <li><a @click="deleteConverstion(user.chatstatus.id)" class="dropdown-item text-danger"><i class="fa-solid fa-trash "></i>Delete Conversation</a></li>
                            </ul></div>
                            </div>
                          </h3>
                          <div class="user_message_icon">
                            <div :class="'user_typing_message_'+user.id">
                              <template v-if="user && user.latest_message &&  user.latest_message.type == 'text'">
                                <p class="mb-0 message" v-html="user && user.latest_message &&  user.latest_message.message"></p>
                              </template>
                              <template v-else-if="user && user.latest_message &&  user.latest_message.type == 'audio' || user && user.latest_message &&  user.latest_message.type == 'image'">
                                <p class="mb-0 message">Attachment</p>
                              </template>
                            </div>
                            <div :class="'user_typing_'+user.id" class="d-none user_typing_message">
                              <span class="typing">
                                <span>typing</span> 
                                      <span class="dot"></span>
                                      <span class="dot"></span>
                                      <span class="dot"></span>
                                    </span>
                            </div>
                            <!-- <template v-else>
                              <p class="mb-0 message">{{ user.latest_message.message ?? '------' }}</p>
                            </template> -->
                            <div class="message_status_icon position-relative">
                              <template v-if="CheckReadOrUnreadMessageCount(user.id) > 0">
                                  <span class="total_message">{{ CheckReadOrUnreadMessageCount(user.id) }}</span>
                              </template>
                              <template v-if="user && user.chatstatus && user.chatstatus.status == 0">
                                <i id="unsolved" class="icon fa-solid fa-arrow-right text-white"></i>
                              </template>
                              <template v-else-if="user && user.chatstatus && user.chatstatus.status == 2">
                                <i id="pending" class="icon fa-solid fa-arrow-right text-white"></i>
                              </template>
                              <template v-else>
                                <i  id="solved" class="fa-solid fa-check text-white"></i>
                              </template>
                            </div>
                          </div>
                        </div>
                        <!-- <div class="chat_user_list_info ms-3">
                          <h3 class="user_name_date">
                            <p class="mb-0 name">{{ user.fname ?? '' }} {{ user.lname ?? '' }}</p>
                            <p class="mb-0 date">{{ formatTimestamp(user.latest_message?.created_at) }}</p>
                          </h3>
                          <h3 class="user_message_icon">
                            <template v-if="user.latest_message?.type === 'text'">
                              <p class="mb-0 message" v-html="user.latest_message.message"></p>
                            </template>
                            <template v-else-if="user.latest_message?.type === 'audio'">
                              <p class="mb-0 message">Attachment</p>
                            </template>
                            <template v-else>
                              <p class="mb-0 message"></p>
                            </template>
                            <template v-if="user.chatstatus?.status === 0">
                              <i id="unsolved" class="icon fa-solid fa-arrow-right text-white"></i>
                            </template>
                            <template v-else>
                              <i id="solved" class="fa-solid fa-check text-white"></i>
                            </template>
                          </h3>
                        </div> -->
                      </div>
                    </RouterLink>
                  </li>
                </template>
              </template>
              <template v-else>
               <div class="no_chat_data_found">
                <div class="text-center">
                  <img id="no_message_image" :src="no_message" alt="image">
                  <p>No Mentions Data Found!</p>
                </div>
               </div>
              </template>
            </template>
            <template v-else-if="selectedText == 'Most Recent'">
              <template v-for="(user, index) in ChatAllUsers.slice(0, 5)" :key="index">
                  <li>
                    <RouterLink :to="'/admin-mobile-chat/'+user.id">
                      <div class="chat_user_list d-flex align-items-center">
                        <div class="position-relative dopp_user_avatar">
                        <template v-if="checkUserOnline(user.id)">
                          <span class="user_online"></span>
                        </template>
                        <template v-else>
                          <span class="user_offline"></span>
                        </template>
                        <template v-if="user.avatar != null">
                          <img id="user_image" :src="'https://api.doppcall.com/'+user.avatar"  alt="avatar"/>
                        </template>
                        <template v-else>
                          <img id="blank_user_image" :src="blankUser"  alt="avatar"/>
                        </template>
                        <img id="user_flag_image" :src="'https://flagicons.lipis.dev/flags/4x3/' + (user.country_code ?? '') + '.svg'" alt=""/>
                        </div>
                        <div class="chat_user_list_info ms-3">
                          <h3 class="user_name_date">
                            <p class="mb-0 name position-relative">{{ user.fname ?? '' }} {{ user.lname ?? '' }} 
                            </p>
                            <div class="toggle_option_onhover">
                              <p class="mb-0 date"> {{ formatTimestamp(user && user.latest_message && user.latest_message.created_at) }}</p>
                            <div class="dropdown chat_hover_dropdown"><button type="button" id="user_actions_btn" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa-solid fa-ellipsis"></i></button>
                            <ul class="dropdown-menu"> 
                              <template v-if="user && user.chatstatus.status == 1">
                                <li><a @click="changeChatStatus(user.chatstatus.id,'0')" class="dropdown-item"><i class="fa-solid fa-arrow-right"></i>Mark as Unresolved</a></li>
                              </template>
                              <template v-else>
                                <li><a @click="changeChatStatus(user.chatstatus.id,'1')" class="dropdown-item"><i class="fa-solid fa-check"></i>Mark as Resolved</a></li>
                              </template>
                            <li><a @click="copyLinkUser(user.id)" class="dropdown-item"><i class="fa-solid fa-link"></i>Copy Link</a></li>
                            <template v-if="user && user.block_status == 0">
                              <li><a @click="blockUnblocUser(user.id , 1,'Are You Sure Block This User')" class="dropdown-item"><i class="fa-solid fa-ban text-danger"></i>Block User</a></li>
                            </template>
                            <template v-else>
                              <li><a @click="blockUnblocUser(user.id , 0, 'Are You Sure Unblock This User')" class="dropdown-item"><i class="fa-solid fa-unlock text-success"></i>Unblock User</a></li>
                            </template>
                            <li><a @click="deleteConverstion(user.chatstatus.id)" class="dropdown-item text-danger"><i class="fa-solid fa-trash "></i>Delete Conversation</a></li>
                            </ul></div>
                            </div>
                          </h3>
                          <div class="user_message_icon">
                            <div :class="'user_typing_message_'+user.id">
                              <template v-if="user && user.latest_message &&  user.latest_message.type == 'text'">
                                <p class="mb-0 message" v-html="user && user.latest_message &&  user.latest_message.message"></p>
                              </template>
                              <template v-else-if="user && user.latest_message &&  user.latest_message.type == 'audio' || user && user.latest_message &&  user.latest_message.type == 'image'">
                                <p class="mb-0 message">Attachment</p>
                              </template>
                            </div>
                            <div :class="'user_typing_'+user.id" class="d-none user_typing_message">
                              <span class="typing">
                                <span>typing</span> 
                                      <span class="dot"></span>
                                      <span class="dot"></span>
                                      <span class="dot"></span>
                                    </span>
                            </div>
                            <!-- <template v-else>
                              <p class="mb-0 message">{{ user.latest_message.message ?? '------' }}</p>
                            </template> -->
                            <div class="message_status_icon position-relative">
                              <template v-if="CheckReadOrUnreadMessageCount(user.id) > 0">
                                  <span class="total_message">{{ CheckReadOrUnreadMessageCount(user.id) }}</span>
                              </template>
                              <template v-if="user && user.chatstatus && user.chatstatus.status == 0">
                                <i id="unsolved" class="icon fa-solid fa-arrow-right text-white"></i>
                              </template>
                              <template v-else-if="user && user.chatstatus && user.chatstatus.status == 2">
                                <i id="pending" class="icon fa-solid fa-arrow-right text-white"></i>
                              </template>
                              <template v-else>
                                <i  id="solved" class="fa-solid fa-check text-white"></i>
                              </template>
                            </div>
                          </div>
                        </div>
                        <!-- <div class="chat_user_list_info ms-3">
                          <h3 class="user_name_date">
                            <p class="mb-0 name">{{ user.fname ?? '' }} {{ user.lname ?? '' }}</p>
                            <p class="mb-0 date"> {{ formatTimestamp(user && user.latest_message && user.latest_message.created_at) }}</p>
                          </h3>
                          <h3 class="user_message_icon">
                            <template v-if="user && user.latest_message &&  user.latest_message.type == 'text'">
                              <p class="mb-0 message" v-html="user && user.latest_message &&  user.latest_message.message"></p>
                            </template>
                            <template v-else-if="user && user.latest_message &&  user.latest_message.type == 'audio'">
                              <p class="mb-0 message">Attachment</p>
                            </template>
                            <template v-else>
                              <p class="mb-0 message"></p>
                            </template>
                            <template v-if="user && user.chatstatus && user.chatstatus.status == 0">
                              <i id="unsolved" class="icon fa-solid fa-arrow-right text-white"></i>
                            </template>
                            <template v-else>
                              <i  id="solved" class="fa-solid fa-check text-white"></i>
                            </template>
                          </h3>
                        </div> -->
                      </div>
                    </RouterLink>
                  </li>
              </template>
            </template>
            <template v-else-if="selectedText == 'Longest Waiting'">
              <template v-for="(user, index) in ChatAllUsers.slice(-5)" :key="index">
                  <li>
                    <RouterLink :to="'/admin-mobile-chat/'+user.id">
                      <div class="chat_user_list d-flex align-items-center">
                        <div class="position-relative dopp_user_avatar">
                        <template v-if="checkUserOnline(user.id)">
                          <span class="user_online"></span>
                        </template>
                        <template v-else>
                          <span class="user_offline"></span>
                        </template>
                        <template v-if="user.avatar != null">
                          <img id="user_image" :src="'https://api.doppcall.com/'+user.avatar"  alt="avatar"/>
                        </template>
                        <template v-else>
                          <img id="blank_user_image" :src="blankUser"  alt="avatar"/>
                        </template>
                        <img id="user_flag_image" :src="'https://flagicons.lipis.dev/flags/4x3/' + (user.country_code ?? '') + '.svg'" alt=""/>
                        </div>
                        <div class="chat_user_list_info ms-3">
                          <h3 class="user_name_date">
                            <p class="mb-0 name position-relative">{{ user.fname ?? '' }} {{ user.lname ?? '' }}
                            </p>
                            <div class="toggle_option_onhover">
                              <p class="mb-0 date"> {{ formatTimestamp(user && user.latest_message && user.latest_message.created_at) }}</p>
                            <div class="dropdown chat_hover_dropdown"><button type="button" id="user_actions_btn" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa-solid fa-ellipsis"></i></button>
                            <ul class="dropdown-menu"> 
                              <template v-if="user && user.chatstatus.status == 1">
                                <li><a @click="changeChatStatus(user.chatstatus.id,'0')" class="dropdown-item"><i class="fa-solid fa-arrow-right"></i>Mark as Unresolved</a></li>
                              </template>
                              <template v-else>
                                <li><a @click="changeChatStatus(user.chatstatus.id,'1')" class="dropdown-item"><i class="fa-solid fa-check"></i>Mark as Resolved</a></li>
                              </template>
                            <li><a @click="copyLinkUser(user.id)" class="dropdown-item"><i class="fa-solid fa-link"></i>Copy Link</a></li>
                            <template v-if="user && user.block_status == 0">
                              <li><a @click="blockUnblocUser(user.id , 1,'Are You Sure Block This User')" class="dropdown-item"><i class="fa-solid fa-ban text-danger"></i>Block User</a></li>
                            </template>
                            <template v-else>
                              <li><a @click="blockUnblocUser(user.id , 0, 'Are You Sure Unblock This User')" class="dropdown-item"><i class="fa-solid fa-unlock text-success"></i>Unblock User</a></li>
                            </template>
                            <li><a @click="deleteConverstion(user.chatstatus.id)" class="dropdown-item text-danger"><i class="fa-solid fa-trash "></i>Delete Conversation</a></li>
                            </ul></div>
                            </div>
                          </h3>
                          <div class="user_message_icon">
                            <div :class="'user_typing_message_'+user.id">
                              <template v-if="user && user.latest_message &&  user.latest_message.type == 'text'">
                                <p class="mb-0 message" v-html="user && user.latest_message &&  user.latest_message.message"></p>
                              </template>
                              <template v-else-if="user && user.latest_message &&  user.latest_message.type == 'audio' || user && user.latest_message &&  user.latest_message.type == 'image'">
                                <p class="mb-0 message">Attachment</p>
                              </template>
                            </div>
                            <div :class="'user_typing_'+user.id" class="d-none user_typing_message">
                              <span class="typing">
                                <span>typing</span> 
                                      <span class="dot"></span>
                                      <span class="dot"></span>
                                      <span class="dot"></span>
                                    </span>
                            </div>
                            <!-- <template v-else>
                              <p class="mb-0 message">{{ user.latest_message.message ?? '------' }}</p>
                            </template> -->
                            <div class="message_status_icon position-relative">
                              <template v-if="CheckReadOrUnreadMessageCount(user.id) > 0">
                                  <span class="total_message">{{ CheckReadOrUnreadMessageCount(user.id) }}</span>
                              </template>
                              <template v-if="user && user.chatstatus && user.chatstatus.status == 0">
                                <i id="unsolved" class="icon fa-solid fa-arrow-right text-white"></i>
                              </template>
                              <template v-else-if="user && user.chatstatus && user.chatstatus.status == 2">
                                <i id="pending" class="icon fa-solid fa-arrow-right text-white"></i>
                              </template>
                              <template v-else>
                                <i  id="solved" class="fa-solid fa-check text-white"></i>
                              </template>
                            </div>
                          </div>
                        </div>
                        <!-- <div class="chat_user_list_info ms-3">
                          <h3 class="user_name_date">
                            <p class="mb-0 name">{{ user.fname ?? '' }} {{ user.lname ?? '' }}</p>
                            <p class="mb-0 date"> {{ formatTimestamp(user && user.latest_message && user.latest_message.created_at) }}</p>
                          </h3>
                          <h3 class="user_message_icon">
                            <template v-if="user && user.latest_message &&  user.latest_message.type == 'text'">
                              <p class="mb-0 message" v-html="user && user.latest_message &&  user.latest_message.message"></p>
                            </template>
                            <template v-else-if="user && user.latest_message &&  user.latest_message.type == 'audio'">
                              <p class="mb-0 message">Attachment</p>
                            </template>
                            <template v-else>
                              <p class="mb-0 message"></p>
                            </template>
                            <template v-if="user && user.chatstatus && user.chatstatus.status == 0">
                              <i id="unsolved" class="icon fa-solid fa-arrow-right text-white"></i>
                            </template>
                            <template v-else>
                              <i  id="solved" class="fa-solid fa-check text-white"></i>
                            </template>
                          </h3>
                        </div> -->
                      </div>
                    </RouterLink>
                  </li>
              </template>
            </template>
            <template v-else-if="selectedText == 'Resolved'">
              <template v-if="usersWithResolved && usersWithResolved.length > 0">
                <template v-for="(user, index) in usersWithResolved" :key="index">
                  <li>
                    <RouterLink :to="'/admin-mobile-chat/'+user.id">
                      <div class="chat_user_list d-flex align-items-center">
                        <div class="position-relative dopp_user_avatar">
                        <template v-if="checkUserOnline(user.id)">
                          <span class="user_online"></span>
                        </template>
                        <template v-else>
                          <span class="user_offline"></span>
                        </template>
                        <template v-if="user.avatar != null">
                          <img id="user_image" :src="'https://api.doppcall.com/'+user.avatar"  alt="avatar"/>
                        </template>
                        <template v-else>
                          <img id="blank_user_image" :src="blankUser"  alt="avatar"/>
                        </template>
                        <img id="user_flag_image" :src="'https://flagicons.lipis.dev/flags/4x3/' + (user.country_code ?? '') + '.svg'" alt=""/>
                        </div>
                        <div class="chat_user_list_info ms-3">
                          <h3 class="user_name_date">
                            <p class="mb-0 name position-relative">{{ user.fname ?? '' }} {{ user.lname ?? '' }} 
                            </p>
                            <div class="toggle_option_onhover">
                              <p class="mb-0 date"> {{ formatTimestamp(user && user.latest_message && user.latest_message.created_at) }}</p>
                            <div class="dropdown chat_hover_dropdown"><button type="button" id="user_actions_btn" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa-solid fa-ellipsis"></i></button>
                            <ul class="dropdown-menu"> 
                              <template v-if="user && user.chatstatus.status == 1">
                                <li><a @click="changeChatStatus(user.chatstatus.id,'0')" class="dropdown-item"><i class="fa-solid fa-arrow-right"></i>Mark as Unresolved</a></li>
                              </template>
                              <template v-else>
                                <li><a @click="changeChatStatus(user.chatstatus.id,'1')" class="dropdown-item"><i class="fa-solid fa-check"></i>Mark as Resolved</a></li>
                              </template>
                            <li><a @click="copyLinkUser(user.id)" class="dropdown-item"><i class="fa-solid fa-link"></i>Copy Link</a></li>
                            <template v-if="user && user.block_status == 0">
                              <li><a @click="blockUnblocUser(user.id , 1,'Are You Sure Block This User')" class="dropdown-item"><i class="fa-solid fa-ban text-danger"></i>Block User</a></li>
                            </template>
                            <template v-else>
                              <li><a @click="blockUnblocUser(user.id , 0, 'Are You Sure Unblock This User')" class="dropdown-item"><i class="fa-solid fa-unlock text-success"></i>Unblock User</a></li>
                            </template>
                            <li><a @click="deleteConverstion(user.chatstatus.id)" class="dropdown-item text-danger"><i class="fa-solid fa-trash "></i>Delete Conversation</a></li>
                            </ul></div>
                            </div>
                          </h3>
                          <div class="user_message_icon">
                            <div :class="'user_typing_message_'+user.id">
                              <template v-if="user && user.latest_message &&  user.latest_message.type == 'text'">
                                <p class="mb-0 message" v-html="user && user.latest_message &&  user.latest_message.message"></p>
                              </template>
                              <template v-else-if="user && user.latest_message &&  user.latest_message.type == 'audio' || user && user.latest_message &&  user.latest_message.type == 'image'">
                                <p class="mb-0 message">Attachment</p>
                              </template>
                            </div>
                            <div :class="'user_typing_'+user.id" class="d-none user_typing_message">
                              <span class="typing">
                                <span>typing</span> 
                                      <span class="dot"></span>
                                      <span class="dot"></span>
                                      <span class="dot"></span>
                                    </span>
                            </div>
                            <!-- <template v-else>
                              <p class="mb-0 message">{{ user.latest_message.message ?? '------' }}</p>
                            </template> -->
                            <div class="message_status_icon position-relative">
                              <template v-if="CheckReadOrUnreadMessageCount(user.id) > 0">
                                  <span class="total_message">{{ CheckReadOrUnreadMessageCount(user.id) }}</span>
                              </template>
                              <template v-if="user && user.chatstatus && user.chatstatus.status == 0">
                                <i id="unsolved" class="icon fa-solid fa-arrow-right text-white"></i>
                              </template>
                              <template v-else-if="user && user.chatstatus && user.chatstatus.status == 2">
                                <i id="pending" class="icon fa-solid fa-arrow-right text-white"></i>
                              </template>
                              <template v-else>
                                <i  id="solved" class="fa-solid fa-check text-white"></i>
                              </template>
                            </div>
                          </div>
                        </div>
                        <!-- <div class="chat_user_list_info ms-3">
                          <h3 class="user_name_date">
                            <p class="mb-0 name">{{ user.fname ?? '' }} {{ user.lname ?? '' }}</p>
                            <p class="mb-0 date"> {{ formatTimestamp(user && user.latest_message && user.latest_message.created_at) }}</p>
                          </h3>
                          <h3 class="user_message_icon">
                            <template v-if="user && user.latest_message &&  user.latest_message.type == 'text'">
                              <p class="mb-0 message" v-html="user && user.latest_message &&  user.latest_message.message"></p>
                            </template>
                            <template v-else-if="user && user.latest_message &&  user.latest_message.type == 'audio'">
                              <p class="mb-0 message">Attachment</p>
                            </template>
                            <template v-else>
                              <p class="mb-0 message"></p>
                            </template>
                            <template v-if="user && user.chatstatus && user.chatstatus.status == 0">
                              <i id="unsolved" class="icon fa-solid fa-arrow-right text-white"></i>
                            </template>
                            <template v-else>
                              <i  id="solved" class="fa-solid fa-check text-white"></i>
                            </template>
                          </h3>
                        </div> -->
                      </div>
                    </RouterLink>
                  </li>
                </template>
              </template>
              <template v-else>
                <div class="no_chat_data_found">
                <div class="text-center">
                  <img id="no_message_image" :src="no_message" alt="image">
                  <p>No Resolved Data Found!</p>
                </div>
               </div>
              </template>
            </template>
            <template v-if="paginateUser"> 
              <li>
                <a href="javascript:">
                  <div class="chat_user_list d-flex align-items-center mt-2 mb-3">
                    <div class="position-relative">
                      <SkeletonShape type="text" animation="wave" :width="'50px'" :height="'50px'" :radius="25"/>
                    
                    </div>
                    <div class="chat_user_list_info ms-3">
                      <h3 class="user_name_date">
                        <SkeletonShape type="text" animation="wave" :width="'106px'" :height="'25px'" :radius="4"/>
                        <SkeletonShape type="text" animation="wave" :width="'70px'" :height="'25px'" :radius="4"/>
                      </h3>
                      <h3 class="user_message_icon">
                        <SkeletonShape type="text" animation="wave" :width="'106px'" :height="'25px'" :radius="4"/>
                        <SkeletonShape type="text" animation="wave" :width="'70px'" :height="'25px'" :radius="4" :style="{ marginLeft: '55px' }"/>
                      </h3>
                    </div>
                  </div>
                </a>
              </li>
            </template>
          </template>
        </template>
        <template v-else>
          <template v-for="(index,count) in countNumber" :key="index">
            <li>
            <a href="javascript:">
              <div class="chat_user_list d-flex align-items-center mt-2">
                <div class="position-relative">
                  <SkeletonShape type="text" animation="wave" :width="'50px'" :height="'50px'" :radius="25"/>
                
                </div>
                <div class="chat_user_list_info ms-3">
                  <h3 class="user_name_date">
                    <SkeletonShape type="text" animation="wave" :width="'106px'" :height="'25px'" :radius="4"/>
                    <SkeletonShape type="text" animation="wave" :width="'70px'" :height="'25px'" :radius="4"/>
                  </h3>
                  <h3 class="user_message_icon">
                    <SkeletonShape type="text" animation="wave" :width="'106px'" :height="'25px'" :radius="4"/>
                    <SkeletonShape type="text" animation="wave" :width="'70px'" :height="'25px'" :radius="4" :style="{ marginLeft: '55px' }"/>
                  </h3>
                </div>
              </div>
            </a>
          </li>
          </template>
        </template>
      </ul>
      </div>
    </div>

  <!-- create New Chat Modal -->
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

  <!-- assign Modal -->
  <div class="modal fade" id="assignModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <h5 class="mb-2">Assign To</h5>
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
</template>
<script>
import axios from 'axios';
import { onMounted, ref, watch , computed , onUnmounted} from 'vue';
import { useRoute ,useRouter} from 'vue-router'; 
import lottie from "lottie-web"; 
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { fetchUserRole } from "@/services/userService";
import { SkeletonShape } from "easy-skeleton-loader-vue";
import blankUser from "../../../../../../../assets/backend/assets/chats/image/blank_user.png";
import Chrome  from '../../../../../../../assets/backend/assets/chats/browser-image/chrome.png';
import Firefox  from '../../../../../../../assets/backend/assets/chats/browser-image/firefox.png';
import Safari  from '../../../../../../../assets/backend/assets/chats/browser-image/Safari.png';
import Edge  from '../../../../../../../assets/backend/assets/chats/browser-image/Edge.jpg';
import Explorer  from '../../../../../../../assets/backend/assets/chats/browser-image/Explorer.jpg';
import RecordRTC, { StereoAudioRecorder } from "recordrtc";
import EmojiPicker  from "vue3-emoji-picker";
import moment from "moment";
import toastr from 'toastr'
import { format } from "date-fns";
import Swal from "sweetalert2";
import no_message from "../../../../../../../assets/backend/assets/img/message.gif";

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
  components:{
    SkeletonShape,
    EmojiPicker ,
  },
  setup() {
    const domain = window.location.origin;
    const lottieMessage = ref(null);
    const route = useRoute();
    const router = useRouter();
    const chatId = ref(route.params.id);
    const chatEditor = ref(null); 
    const chatInfos = ref(null); 
    const authUser = ref(null); 
    const authUserID = ref(null); 
    const ChatAllUsers = ref([]);
    const onlineUsers = ref([]);
    const isActive = ref(false);
    const checkIndexPage = ref(false);
    const countNumber = ref(4);
    const selectedText = ref("All");
    const userLoading = ref(false);
    const options = ref(["All", "Option 1", "Option 2"]);
    const page = ref(1);
    const perPage = ref(12);
    const lastScrollTop = ref(0);
    const paginateUser = ref(false);
    const createMessage = ref({
      user_activity: 0,
      domainName: domain,
      user_id: '',
      message: '',
      type: 'text',
      chat_id : "",
      attachmentMessage: ''
    });
    const getMessageText = ref({
       message: '' 
    });
    const searchEmail = ref({
       email: '' 
    });
    const isRecording = ref(false);  
    const recordingDuration = ref(0); 
    const showEmojiPicker = ref(false);
    const showSendMessageBtn  = ref(true); 
    const showImageBtn  = ref(false);
    const showAudioBtn  = ref(false);
    const chatPubAdveImageShowImage = ref({ 
      image: ''
    });
    const chatReplayTextShow  = ref(false);
    const chatReplyUser = ref({
      user : "",
      message : "",
    });
    const messageDeleteSelf = ref({ 
      id : "",
      status : "",
    });
    const UpdateChatStatus = ref({ 
      chatId : "",
      status : "",
    });
    const assignManager = ref({ 
      manager_id : "",
      user_id: "",
      chat_id : "",
    });
    const accountManagers = ref([]);
    const validationErrors = ref(null);
    const createChatUser = ref([]);
    const  create_chat  = ref({
      user_id : "",
    });
    const assignToUser = ref(
      selectedText.value === 'All' ? 'allConversation' : ''
    );
    const showHiddenEditorStatus = ref(false);

    const toggleMenu = () => {
      isActive.value = !isActive.value;
    };

    const selectOption = (option) => {
      selectedText.value = option;
      isActive.value = false;
    };

    const formatTimestamp = (timestamp) => {
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
    };

    const fetchChatUsers = async () => {
      try {
        const response = await fetch(`https://api.doppcall.com/api/admin/crisp/chat/getalluser?page=${page.value}&per_page=${perPage.value}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json"
          },
        });
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const jsonResponse = await response.json();
        const chatUserStoreIds =  localStorage.getItem('chatUserStoreIds') ?? [];
        if(chatUserStoreIds.length === 0){
          jsonResponse.chatUsers.forEach(user => {
            chatUserStoreIds.push(user.id);
          });
          localStorage.setItem('chatUserStoreIds', JSON.stringify(chatUserStoreIds))
        }
        
        if(jsonResponse.chatUsers.length > 0){
          if (jsonResponse.chatUsers && Array.isArray(jsonResponse.chatUsers)) {
            ChatAllUsers.value.push(...jsonResponse.chatUsers);
          }
          jsonResponse.chatUsers.forEach(user => {
            localStorage.setItem('user_'+user.id, JSON.stringify(user));
          });
        }
      } catch (error) {
        console.error("Error fetching chat users:", error);
      } finally {
        userLoading.value = false; 
        paginateUser.value = false;
      }
    };

    const ChatUserScroll = (event) => {
      const { scrollTop, clientHeight, scrollHeight } = event.target;
      if (lastScrollTop.value < scrollTop) {
        if (scrollTop + clientHeight >= scrollHeight - 5) {
          paginateUser.value = true;
          page.value = page.value + 1;
          fetchChatUsers();
        }
      }
      lastScrollTop.value = scrollTop <= 0 ? 0 : scrollTop;
    };


    const scrollToTop = () => {
      const chatContainer = document.getElementById('chat_second_tab_one_chat_content');    
      if (chatContainer) {
        chatContainer.scrollTop = 0; 
      }
    };

    const scrollToMessageSendBottom = () => {
      const chatContainer = document.getElementById('chatBodyForScroll');  
      setTimeout(() => {  
        if (chatContainer) {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
      }, 100);
    };

    const scrollToBottom = () => {
      setTimeout(() => {  
        const chatContainer = document.getElementById('chatBodyForScroll');    
        if (chatContainer) {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
      }, 100);
    };

    const getLaravelFormattedTime = () => {
      return new Date().toISOString(); // Adjust to desired Laravel format
    };

    const listenTypingMessages = (userId) => {
        window.Echo.private(`typebroadcast.${userId}`).listen("TypingBroadcast", (event) => {
          $('.user_typing_'+event.message.sender).removeClass('d-none');
          $('.user_typing_message_'+event.message.sender).addClass('d-none');
        });
      };

      const listenTypingStopMessages = (userId) => {
        window.Echo.private(`typestopbroadcast.${userId}`).listen("TypingStopBroadcast", (event) => {
          $('.user_typing_'+event.message.sender).addClass('d-none');
          $('.user_typing_message_'+event.message.sender).removeClass('d-none');
        });
      };

    const listenForOnlineUsers = async () => {
      window.Echo.join("online-users")
        .here((users) => {
          onlineUsers.value = users;
        })
        .joining((user) => {
          onlineUsers.value.push(user);
        })
        .leaving((user) => {
          onlineUsers.value = onlineUsers.value.filter((u) => u.id !== user.id);
        });
    };

    const formatTimes = (dateString) => {
      const date = new Date(dateString);
      return format(date, "hh:mm a");
    };

    const deleteBtnValue = async (status) => {
      messageDeleteSelf.value.status = status;
    };

    const messageUnread = async (message) => {
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
    };

    const changeChatStatus = async (chatId,status) => {
      UpdateChatStatus.value.chatId = chatId; 
      UpdateChatStatus.value.status = status; 
      axios
        .post("https://api.doppcall.com/api/admin/chat/status/change", UpdateChatStatus.value,{
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if(res.data.status == 'success'){
            toastr.success(res.data.message);
            if (chatInfos.value && chatInfos.value.chatstatus) {
              chatInfos.value.chatstatus.status = 1;
              let getdata = JSON.parse(localStorage.getItem('user_' + chatInfos.value.id)) || {};
              getdata.chatstatus.status = 1;
              localStorage.setItem('user_' + chatInfos.value.id, JSON.stringify(getdata));
            }
            var totalChatUsers = ChatAllUsers.value;
            if(totalChatUsers.length > 0){
              for (let i = 0; i < totalChatUsers.length; i++) {
                if (totalChatUsers[i].id == chatInfos.value.id) {
                  totalChatUsers[i].chatstatus.status = 1;
                }
              }
            }
          }else{
            toastr.error(res.data.message);
            if (chatInfos.value && chatInfos.value.chatstatus) {
              chatInfos.value.chatstatus.status = 0;
              let getdata = JSON.parse(localStorage.getItem('user_' + chatInfos.value.id)) || {};
              getdata.chatstatus.status = 1;
              localStorage.setItem('user_' + chatInfos.value.id, JSON.stringify(getdata));
            }
            var totalChatUsers = ChatAllUsers.value;
            if(totalChatUsers.length > 0){
              for (let i = 0; i < totalChatUsers.length; i++) {
                if (totalChatUsers[i].id == chatInfos.value.id) {
                  totalChatUsers[i].chatstatus.status = 0;
                }
              }
            }
          }
        })
        .catch((error) => {
          console.error("Error sending message:", error);
        });
    };

    const usersWithUnred = computed(() => {
      return ChatAllUsers.value.filter(user => CheckReadOrUnread(user.id));
    });

    const CheckReadOrUnread =  (id) => {
      let getdata = JSON.parse(localStorage.getItem('user_' +id)) || {};
        if(getdata && getdata.userAllMessages && getdata.userAllMessages.data.length > 0){
          var collections = [];
          getdata.userAllMessages.data.forEach((message,index) => {
            collections.push(message.message_read);
          })
          return collections.includes(0);
        }
        return false;
    };

    const usersWithMentions = computed(() => {
      return ChatAllUsers.value.filter(user => CheckMentions(user.id));
    });

    const CheckMentions = (id) => {
      const getdata = JSON.parse(localStorage.getItem('user_' + id)) || {};
      if (getdata?.userAllMessages?.data?.length > 0) {
        const collections = getdata.userAllMessages.data.map(message => message.message);
        return collections.some(message => message.includes('@' + (authUser.value?.fname ?? '')));
      }
      return false;
    };

    const initializeSelect2 = () => {
      $('#conversation-type').select2({
        width: '100%', 
        dropdownParent: $('#createNewChat')
      }).on('change', (e) => {
          create_chat.value.user_id = $(e.target).val();
      });
    };

    const  callToSelectJs = () => {
      setTimeout(() => {
        initializeSelect2();
      }, 1000);
    };

    const fetchCreateChatUsers = async () => {
      try {
        const res = await fetch("https://api.doppcall.com/api/admin/crisp/chat/createchatuser", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        
        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }

        const jsonResponse = await res.json();
        createChatUser.value = jsonResponse.users;
        accountManagers.value = jsonResponse.accountManegers;
      } catch (error) {
        console.error("Error fetching chat users:", error);
      }
    };

    const userStatuses = computed(() => {
      return createChatUser.value.map(user => {
        const onlineUser = onlineUsers.value.find(onlineUser => onlineUser.id === user.id);
        return {
          ...user,
          status: onlineUser ? (onlineUser.online ? 'online' : 'offline') : 'offline'
        };
      });
    });

    const createConversation  = async () => {
      const data = new FormData();
      data.append("users[]", create_chat.value.user_id);
      data.append("isPrivate", 1);
      data.append("domainName", createMessage.value.domainName);
      axios
        .post(`https://api.doppcall.com/api/admin/crisp/chat/create-chat`, data, {
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
              modal.hide();
              localStorage.setItem('user_' + res.data.user.id, JSON.stringify(res.data.user));
              var getEditorStatus = localStorage.getItem('editorStatus');
              showHiddenEditorStatus.value = getEditorStatus == "false" ? false : true;
              if (ChatAllUsers.value) {
                ChatAllUsers.value.unshift(res.data.user);
                chatInfos.value = res.data.user;
                scrollToTop();
                router.push(`/admin-mobile-chat/${res.data.user.id}`);
                $(chatEditor.value).summernote({
                  placeholder: 'Send your message to ....',
                  height: 50,
                  callbacks: {
                    onChange: (contents) => {
                      localStorage.setItem('draft_'+res.data.user.id, JSON.stringify(contents));
                      getMessageText.value.message = contents;
                    }
                  }
                });
              }
            }
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const blockUnblocUser = async (id,status,title) => {
      Swal.fire({
        text: title,
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.value) {
          if(chatInfos && chatInfos.value){
            chatInfos.value.block_status = status;
          }
          const getdata = JSON.parse(localStorage.getItem('user_' + id)) || {};
          var getEditorStatus = localStorage.getItem('editorStatus');
          showHiddenEditorStatus.value = getEditorStatus == "false" ? false : true;
          if(getdata){
            getdata.block_status = status;
            localStorage.setItem('user_' + id, JSON.stringify(getdata));
          }
          axios
            .get(`https://api.doppcall.com/api/admin/crisp/chat/block/user/${id}/${status}`, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((res) => {
              if(res.data.status == 'success'){
                toastr.success(res.data.message);
                if(status == 0){
                  $(chatEditor.value).summernote({
                    placeholder: 'Send your message to ....',
                    height: 50,
                    callbacks: {
                      onChange: (contents) => {
                        localStorage.setItem('draft_'+id, JSON.stringify(contents));
                        getMessageText.value.message = contents;
                      }
                    }
                  }); 
                }
              }else{
                toastr.error('Something Went To Wrong');
              }
            })
            .catch((e) => {
              return e;
            });
        }
      });
    };

    const deleteConverstion = async (id) => {
      Swal.fire({
        title: "Are you sure to remove this conversation?",
        text:'Conversation messages will be lost.',
        showCancelButton: true,
        confirmButtonText: '<i class="fa-solid fa-trash-arrow-up me-2"></i><span class="deletewarning">Remove Conversation</span>',
        cancelButtonText: "Cancel",
        reverseButtons: true,
        didOpen: () => {
        const swalPopup = document.querySelector('.swal2-popup');
        if (swalPopup) {
          swalPopup.id = 'deleteConverstion'; // Assign your specific ID
        }
      },
      }).then((result) => {
        if (result.value) {
            if (ChatAllUsers.value.length > 0) {
              const matchedUserIndex = ChatAllUsers.value.findIndex(user => user.id == chatId.value);
              if (matchedUserIndex !== -1) {
                const user = ChatAllUsers.value[matchedUserIndex];
                ChatAllUsers.value.splice(matchedUserIndex, 1); 
                scrollToTop(); 
              }
            }
            localStorage.removeItem('user_'+id);
            router.push(`/admin-mobile-chats`);
            axios
              .get(`https://api.doppcall.com/api/admin/crisp/chat/delete/converstion/${id}`, {
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
            });
        }
      });
    };

    const markAllMessageRead = async () => {
      axios
          .get(`https://api.doppcall.com/api/admin/crisp/chat/markasread/chat`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
            if(res.data.status == 'success'){
              toastr.success(res.data.message);
              if(res.data.chatUsers.length > 0){
                  ChatAllUsers.value = res.data.chatUsers;
                  res.data.chatUsers.forEach(user => {
                    localStorage.setItem('user_'+user.id, JSON.stringify(user));
                  });
              }
            }
          })
          .catch((e) => {
            return e;
          })
    };

    const markAllResolved = async () => {
      axios
          .get(`https://api.doppcall.com/api/admin/crisp/chat/markasresolved/chat`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
            if(res.data.status == 'success'){
              toastr.success(res.data.message);
              if(res.data.chatUsers.length > 0){
                ChatAllUsers.value = res.data.chatUsers;
                res.data.chatUsers.forEach(user => {
                  localStorage.setItem('user_'+user.id, JSON.stringify(user));
                });
              }
            }
          })
          .catch((e) => {
            return e;
          })
          .finally(() => {
          })
    };

    const usersWithUnresolved = computed(() => {
      return ChatAllUsers.value.filter(user => CheckUnresolved(user));
    });

    const CheckUnresolved = (user) => {
      if(user && user.chatstatus && user.chatstatus.status == 0){
        return true;
      }else{
        return false;
      }
    };

    const CheckReadOrUnreadMessageCount = (id) => {
        const rawData = localStorage.getItem('user_' + id);
        const getdata = rawData ? JSON.parse(rawData) : {};
        if (getdata?.userAllMessages?.data?.length > 0) {
          const filteredMessages = getdata.userAllMessages.data.filter(
            (message) => message.sender.id === id
          );
          const collections = filteredMessages.map((message) => Number(message.message_read));
          return collections.filter((value) => value == 0 || value == 2).length;
        }
        return 0;
      };

    const usersWithResolved = computed(() => {
      return ChatAllUsers.value.filter(user => CheckResolved(user));
    });

    const CheckResolved = (user) => {
      if(user && user.chatstatus && user.chatstatus.status == 1){
        return true;
      }else{
        return false;
      }
    };

    const changeAssignedMenu = (status,user_id,chat_id) => {
      if(status == 'assigned'){
        assignToUser.value = status;
      }else if(status == 'unAssigned'){
        assignManager.value.user_id = user_id;
        assignManager.value.chat_id = chat_id;
        assignToUser.value = status;
      }else{
        assignToUser.value = status;
      }
    };
    
    const AddedAccountManager = async () => {
      axios
        .post(`https://api.doppcall.com/api/admin/crisp/chat/account/maneger/save`,assignManager.value, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          if(res.data.status == 'success'){
            toastr.success(res.data.message);
            const modalElement = document.getElementById('assignModal');
            const modal = bootstrap.Modal.getInstance(modalElement);
            if(modal){
              modal.hide();
            }
            localStorage.setItem('user_' + chatInfos.value.id, JSON.stringify(res.data.user));
            assignManager.value.manager_id = "";
            assignManager.value.chat_id = "";
          }else{
            toastr.error('Something Went To Wrong');
          }
        })
        .catch((error) => {
          if (error.response && error.response.data && error.response.data.errors) {
            validationErrors.value = error.response.data.errors;
          }
        })
    };

    const searchUsers = async () => {
      if (searchEmail.value.email == '') {
        ChatAllUsers.value = [];
        fetchChatUsers();
      } else {
        axios
          .post(`https://api.doppcall.com/api/admin/crisp/chat/search-user`, searchEmail.value, {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          })
          .then((res) => {
            ChatAllUsers.value = res.data.chatUsers;
          })
          .catch((error) => {
            console.error(error);
          });
      }
    };

    const checkUserOnline = (id) => {
      return onlineUsers.value.some(user => user.id === id) ? 1 : 0;
    };

    const copyLinkUser = async (id) => {
      try {
        await navigator.clipboard.writeText(domain+'/admin-mobile-chat/'+id);
        toastr.success('Link Copy Successfully !');
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    };

    const showHiddenEditor = async (id) => {
      showHiddenEditorStatus.value = id;
      localStorage.setItem('editorStatus',id);
    };

    onMounted(async () => {
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role === 'Super' || role === 'Admin') {
          var getUserdata = JSON.parse(localStorage.getItem('user'));
          authUser.value = getUserdata ?? '';
          authUserID.value = getUserdata && getUserdata.id;
          userLoading.value = true;
          listenForOnlineUsers();
          listenTypingMessages(getUserdata && getUserdata.id);
          listenTypingStopMessages(getUserdata && getUserdata.id);
          const chatUserStoreIds = localStorage.getItem('chatUserStoreIds');
          if (chatUserStoreIds && chatUserStoreIds.length > 0) {
            const chatUserIdsArray = JSON.parse(chatUserStoreIds);
            if (Array.isArray(chatUserIdsArray)) {
              chatUserIdsArray.forEach(user => {
                const getUser = JSON.parse(localStorage.getItem(`user_${user}`));
                if (getUser && Array.isArray(getUser)) { 
                  ChatAllUsers.value.push(...getUser);
                } else if (getUser) { 
                  ChatAllUsers.value.push(getUser);
                } else {
                  console.error(`No data found for user_${user}`);
                }
              });
              // page.value = page.value + 1;
              userLoading.value = false; 
              paginateUser.value = false;
            } else {
              console.error('chatUserStoreIds is not a valid array');
            }
          } else {
            await fetchChatUsers();
          }
          await fetchCreateChatUsers();
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    });

    onUnmounted(() => {
      window.Echo.leave('online-users');
    });

    return {
      isActive,
      selectedText,
      options,
      toggleMenu,
      selectOption,
      formatTimestamp,
      chatEditor,
      countNumber,
      ChatAllUsers,
      chatInfos,
      chatId,
      authUser,
      authUserID,
      userLoading,
      blankUser,
      checkIndexPage,
      lottieMessage,
      ChatUserScroll,
      paginateUser,
      onlineUsers,
      Chrome,
      Firefox,
      Safari,
      Edge,
      Explorer,
      chatPubAdveImageShowImage,
      chatReplayTextShow,
      chatReplyUser,
      showSendMessageBtn,
      showImageBtn,
      showAudioBtn,
      messageDeleteSelf,
      formatTimes,
      deleteBtnValue,
      messageUnread,
      changeChatStatus,
      CheckReadOrUnread,
      CheckMentions,
      usersWithMentions,
      usersWithUnred,
      no_message,
      callToSelectJs,
      createChatUser,
      userStatuses,
      createConversation,
      blockUnblocUser,
      deleteConverstion,
      markAllMessageRead,
      markAllResolved,
      usersWithUnresolved,
      usersWithResolved,
      assignToUser,
      changeAssignedMenu,
      accountManagers,
      assignManager,
      validationErrors,
      AddedAccountManager,
      searchEmail,
      searchUsers,
      copyLinkUser,
      checkUserOnline,
      showHiddenEditor,
      showHiddenEditorStatus,
      getMessageText,
      CheckReadOrUnreadMessageCount,
    };
  },
};
</script>
<style>
.message_status_icon {
    margin-left: auto;
  }
textarea.form-control {
  border-right: 0 !important;
}
.form-control:focus {
  border-color: unset !important;
  box-shadow: unset !important;
}
#myChatEditor .note-toolbar {
display: none !important;
}
.user_typing_message {
	position: absolute;
	background: transparent;
	left: 0;
	bottom: 6px;
	color: green;
}
#doppchatarea .chat_second_tab_one_chat_content ul li:hover .user_typing_message{
background: #EAEDED;

}

.typing {
  align-items: center;
  display: flex;
  height: 17px;
}
.typing span:first-child {
	margin-right: 4px;
}
.typing .dot {
	animation: mercuryTypingAnimation 1.8s infinite ease-in-out;
	background-color: #6CAD96;
	border-radius: 50%;
	height: 3px;
	margin-right: 4px;
	width: 3px;
	display: inline-block;
	margin-top: 13px;
}
.typing .dot:nth-child(1) {
  animation-delay: 200ms;
}
.typing .dot:nth-child(2) {
  animation-delay: 300ms;
}
.typing .dot:nth-child(3) {
  animation-delay: 400ms;
}
.typing .dot:last-child {
  margin-right: 0;
}

@keyframes mercuryTypingAnimation {
  0% {
    transform: translateY(0px);
    background-color:#6CAD96; 
  }
  28% {
    transform: translateY(-4px);
    background-color:#9ECAB9; 
  }
  44% {
    transform: translateY(0px);
    background-color: #B5D9CB; 
  }
}
.total_message {
	position: absolute;
	right: 0px;
	background: #1972f5;
	color: white;
	padding: 1px 6px;
	top: 0px;
	width: 22px;
	height: 22px;
	font-size: 13px;
	line-height: 20px;
	font-weight: 700;
	text-align: center;
	border-radius: 50%;
}
</style>