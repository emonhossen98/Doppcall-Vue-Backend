<template>
      <div class="chat_second_tab_one px-0">
        <div class="chat_second_tab_chat_heading px-2 py-1 d-flex align-items-center">
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

          <button class="create_converstion ms-auto"  @click="callToSelectJs()" data-bs-toggle="modal" data-bs-target="#createNewChat"><i class="fa-solid fa-plus"></i></button>
        </div>
        <div class="chat_second_tab_one_chat_content" @scroll="ChatUserScroll($event)" id="chat_second_tab_one_chat_content">
         <ul class="px-0">
          <template v-if="!userLoading">
            <template v-if="ChatAllUsers && ChatAllUsers.length > 0">
              <template v-if="selectedText == 'All'">
                <template v-for="(user, index) in ChatAllUsers" :key="index">
                  <li>
                    <RouterLink :to="'/admin-chats/'+user.id">
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
                        <div class="chat_user_list_info ms-2">
                          <div class="user_name_date">
                            <p class="mb-0 name position-relative">{{ user.fname ?? '' }} {{ user.lname ?? '' }}</p>
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
                            <li style="border-top: 1px solid #e3e8ef;"><a @click="deleteConverstion(user.chatstatus.id)" class="dropdown-item text-danger"><i class="fa-solid fa-trash "></i>Delete Conversation</a></li>
                            </ul></div>
                            </div>
                          </div>
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
                    <RouterLink :to="'/admin-chats/'+user.id">
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
                        <div class="chat_user_list_info ms-2">
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
                            <li style="border-top: 1px solid #e3e8ef;"><a @click="deleteConverstion(user.chatstatus.id)" class="dropdown-item text-danger"><i class="fa-solid fa-trash "></i>Delete Conversation</a></li>
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
                    <p>No Unread Message Found!</p>
                  </div>
                 </div>
                </template>
              </template>
              <template v-else-if="selectedText == 'Unresolved'">
                <template v-if="usersWithUnresolved && usersWithUnresolved.length > 0">
                  <template v-for="(user, index) in usersWithUnresolved" :key="index">
                      <li>
                        <RouterLink :to="'/admin-chats/'+user.id">
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
                            <div class="chat_user_list_info ms-2">
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
                                <li style="border-top: 1px solid #e3e8ef;"><a @click="deleteConverstion(user.chatstatus.id)" class="dropdown-item text-danger"><i class="fa-solid fa-trash "></i>Delete Conversation</a></li>
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
                      <RouterLink :to="'/admin-chats/' + user.id">
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
                          <div class="chat_user_list_info ms-2">
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
                              <li style="border-top: 1px solid #e3e8ef;"><a @click="deleteConverstion(user.chatstatus.id)" class="dropdown-item text-danger"><i class="fa-solid fa-trash "></i>Delete Conversation</a></li>
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
                      <RouterLink :to="'/admin-chats/'+user.id">
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
                          <div class="chat_user_list_info ms-2">
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
                              <li style="border-top: 1px solid #e3e8ef;"><a @click="deleteConverstion(user.chatstatus.id)" class="dropdown-item text-danger"><i class="fa-solid fa-trash "></i>Delete Conversation</a></li>
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
                      <RouterLink :to="'/admin-chats/'+user.id">
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
                          <div class="chat_user_list_info ms-2">
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
                              <li style="border-top: 1px solid #e3e8ef;"><a @click="deleteConverstion(user.chatstatus.id)" class="dropdown-item text-danger"><i class="fa-solid fa-trash "></i>Delete Conversation</a></li>
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
                      <RouterLink :to="'/admin-chats/'+user.id">
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
                          <div class="chat_user_list_info ms-2">
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
                              <li style="border-top: 1px solid #e3e8ef;"><a @click="deleteConverstion(user.chatstatus.id)" class="dropdown-item text-danger"><i class="fa-solid fa-trash "></i>Delete Conversation</a></li>
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
                      <div class="chat_user_list_info ms-2">
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
                  <div class="chat_user_list_info ms-2">
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
        <div class="chat_second_tab_one_user_info">
          <div class="d-flex align-items-center justify-content-between">
            <div>
              <div class="dropup create_converstion_info_wapper">
                <button type="button" id="create_converstion_info" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                  <i id="rouned_btn" class="fa-solid fa-arrows-spin"></i><i id="angle_btn" class="fa-solid fa-angle-up"></i>
                </button>
                <ul class="dropdown-menu" style="z-index: 9999;">
                  <!-- <li>
                    <a @click="changeAssignedMenu('assigned', chatInfos.id, chatInfos.chatstatus.id)" class="dropdown-item" href="javascript:" :class="assignToUser == 'assigned' ? 'assignedActive' : ''">
                      <template v-if="authUser && authUser.avatar != null">
                        <img id="assigen_image" class="me-2" :src="'https://api.doppcall.com/'+authUser.avatar" alt="image">
                      </template>
                      <template v-else>
                        <img id="assigen_image" class="me-2" :src="blankUser" alt="image">
                      </template>
                      Assigned to me
                    </a>
                  </li> -->
                  <li><a data-bs-toggle="modal" id="assign_btn"  data-bs-target="#assignModal"  @click="changeAssignedMenu('unAssigned', chatInfos.id, chatInfos.chatstatus.id)" :class="assignToUser == 'Assigned' ? 'assignedActive' : ''" class="dropdown-item" href="javascript:"><i class="fa-solid fa-user-plus me-2 text-success"></i>Assigned</a></li>
                  <li><a @click="changeAssignedMenu('allConversation', chatInfos.id, chatInfos.chatstatus.id)" :class="assignToUser == 'allConversation' ? 'assignedActive' : ''" class="dropdown-item" href="javascript:"><i class="fa-solid fa-arrows-spin me-2"></i>All conversations</a></li>
                </ul>
              </div>
            </div>
            <div class="create_converstion_user_wapper">
              <a title="You are online">
                <template v-if="authUser && authUser.avatar != null">
                  <img id="assigen_image" class="me-2" :src="'https://api.doppcall.com/'+authUser.avatar" alt="image">
                </template>
                <template v-else>
                  <img id="assigen_image" class="me-2" :src="blankUser" alt="image">
                </template>
              </a>
            </div>
            <div>
              <div class="dropup create_converstion_wapper">
                <button type="button" id="create_converstion_btn" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                  <i class="fa-solid fa-ellipsis"></i>
                </button>
                <ul class="dropdown-menu">
                  <li><a @click="markAllMessageRead()" class="dropdown-item" href="#"><i class="fa-solid fa-check-double me-2"></i>Mark all messages as read</a></li>
                  <li><a @click="markAllResolved()" class="dropdown-item" href="#"><i class="fa-solid fa-check-double me-2"></i>Resolve all conversations</a></li>
                  <!-- <hr>
                  <li><a class="dropdown-item" href="#"><i class="fa-solid fa-tags me-2"></i>Show segments</a></li>
                  <li><a class="dropdown-item" href="#"><i class="fa-regular fa-clock me-2"></i>Show waiting since date</a></li>
                  <hr>
                  <li><a class="dropdown-item" href="#"><i class="fa-regular fa-keyboard me-2"></i>See keyboard shortcuts…</a></li>
                  <li><a class="dropdown-item" href="#"><i class="fa-solid fa-gear me-2"></i>Go to Inbox settings</a></li> -->
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <template v-if="checkIndexPage">
        <div class="chat_second_tab_three_index_content px-0">
          <div>
              <div class="chat-history-wrapper d-flex justify-content-center">
                <div id="nochatLottieImage" class="mb-0" ref="lottieMessage"></div>
              </div>
              <div class="text-center" id="noContent">
                <h3 class="font-class mb-0">Pick Up Where You Left Off</h3>
                <p class="font-class">Select Convarsation And Chat Away</p>
              </div>
          </div>
        </div>
      </template>
      <template v-else>
      <div class="chat_second_tab_three_content px-0">
          <div class="chat_content_loaded">
            <div class="chat_content_loaded_loaded">
              <div class="chat_header">
                <div class="chat_header_left d-flex align-items-center">
                  <template v-if="chatInfos && chatInfos.block_status == 0">
                    <i @click="blockUnblocUser(chatInfos.id , 1,'Are You Sure Block This User')" id="user_ban_icon" class="fa-solid fa-ban mx-4"></i>
                  </template>
                  <template v-else>
                    <i @click="blockUnblocUser(chatInfos.id , 0, 'Are You Sure Unblock This User')" id="user_ban_icon" class="fa-solid fa-unlock mx-4"></i>
                  </template>
                  <div class="dropdown create_converstion_wapper">
                    <button type="button" id="user_actions_btn" class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                      <i class="fa-solid fa-ellipsis"></i>
                    </button>
                    <ul class="dropdown-menu" style="z-index: 9999;">
                      <!-- <li><a class="dropdown-item" href="#"><i class="fa-solid fa-link me-2"></i>Copy link</a></li>
                      <li><a class="dropdown-item" href="#"><i class="fa-regular fa-envelope me-2"></i>Set Subject</a></li>
                      <li><a class="dropdown-item" href="#"><i class="fa-solid fa-envelope-circle-check me-2"></i>Send transcript…</a></li>
                      <hr> -->
                      <li><a @click="deleteConverstion(chatInfos.chatstatus.id)" id="delete_chat_user" class="dropdown-item" href="#"><i class="fa-solid fa-trash me-2"></i>Delete conversation</a></li>
                    </ul>
                  </div>
                </div>
                <div class="chat_header_right">
                <template v-if="chatInfos && chatInfos.chatstatus.status == 0">
                  <button class="unresolved" @click="changeChatStatus(chatInfos.chatstatus.id,'1')"><i class="fa-solid fa-arrow-right me-2"></i>Unresolved</button>
                </template>
                <template v-else-if="chatInfos && chatInfos.chatstatus.status == 2">
                  <button class="pending" @click="changeChatStatus(chatInfos.chatstatus.id,'0')"><i class="fa-solid fa-arrow-right me-2"></i>Pending</button>
                </template>
                <template v-else>
                  <button class="resolved" @click="changeChatStatus(chatInfos.chatstatus.id,'0')"><i class="fa-solid fa-check me-2"></i>Resolved</button>
                </template>
                </div>
              </div>
              <div class="chat_body px-3 pt-4 pb-2" id="chatBodyForScroll" @scroll="messageOnScroll($event,chatInfos && chatInfos.chatstatus.id,chatInfos.id)">
              <template v-if="chatInfos != null && chatInfos  != ''">
                <template v-if="chatInfos && chatInfos.userAllMessages != null && chatInfos.userAllMessages != ''" >
                  <template v-if="chatInfos && chatInfos.userAllMessages && chatInfos.userAllMessages.data  && chatInfos.userAllMessages.data.length > 0" >
                    <template v-for="(mess,index) in chatInfos.userAllMessages.data" :key="index">
                      <template v-if="mess && mess.sender && mess.sender.id == chatId">
                        <div class="left_side_chat">
                          <div class="left_chat_message d-flex align-items-end mb-1">
                            <template v-if="mess.message_reciver == 0">
                              <li class="chat-message">
                                <div class="d-flex">
                                  <div class="user-avatar flex-shrink-0 me-3">
                                    <div class="chat_user_image">
                                    <template v-if="showUserAvatarIndex(index,mess.sender.id)">
                                     <template v-if="mess && mess.sender && mess.sender.avatar != null">
                                        <img :src="'https://api.doppcall.com/'+ mess.sender.avatar" alt="Avatar" class="rounded-circle"/>
                                      </template>
                                      <template v-else>
                                        <img :src="blankUser" alt="Avatar" class="rounded-circle" />
                                      </template>
                                    </template>
                                    <template v-else>
                                     <div id="no_user_avatar"></div>
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
                                          <div class="message_hover_icon">
                                            <div class="btn-group dropend">
                                              <button type="button" class="btn rep_emoji_btn dropdown-toggle" title="React" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i class="fa-regular fa-face-smile"></i>
                                              </button>
                                              <ul class="dropdown-menu">
                                                <a class="dropdown-item" @click="messageReact(mess.id,'❤️',chatId)">❤️</a>
                                                <a class="dropdown-item" @click="messageReact(mess.id,'😀',chatId)">😀</a>
                                                <a class="dropdown-item" @click="messageReact(mess.id,'😮',chatId)">😮</a>
                                                <a class="dropdown-item" @click="messageReact(mess.id,'😥',chatId)">😥</a>
                                                <a class="dropdown-item" @click="messageReact(mess.id,'🤬',chatId)">🤬</a>
                                                <a class="dropdown-item" @click="messageReact(mess.id,'👍',chatId)">👍</a>
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
                                        </div>
                                    </template>
                                    <template v-else-if="mess.type == 'image'">
                                      <div class="chat-message-left-image d-flex">
                                        <img data-bs-toggle="modal" :data-bs-target="'#chatImageShowModal_'+mess.id" :src="'https://api.doppcall.com/' + mess.message" class="position-relative" alt="image" />
                                        <span class="message_react_image_left" :id="'message_react_'+mess.id">{{ mess.react }}</span>
                                        <div class="message_hover_icon">
                                            <div class="btn-group dropend">
                                              <button type="button" class="btn rep_emoji_btn dropdown-toggle" title="React" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i class="fa-regular fa-face-smile"></i>
                                              </button>
                                              <ul class="dropdown-menu">
                                                <a class="dropdown-item" @click="messageReact(mess.id,'❤️',chatId)">❤️</a>
                                                <a class="dropdown-item" @click="messageReact(mess.id,'😀',chatId)">😀</a>
                                                <a class="dropdown-item" @click="messageReact(mess.id,'😮',chatId)">😮</a>
                                                <a class="dropdown-item" @click="messageReact(mess.id,'😥',chatId)">😥</a>
                                                <a class="dropdown-item" @click="messageReact(mess.id,'🤬',chatId)">🤬</a>
                                                <a class="dropdown-item" @click="messageReact(mess.id,'👍',chatId)">👍</a>
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
                                          <div class="message_hover_icon">
                                            <div class="btn-group dropend">
                                              <button type="button" class="btn rep_emoji_btn dropdown-toggle" title="React" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i class="fa-regular fa-face-smile"></i>
                                              </button>
                                              <ul class="dropdown-menu">
                                                <a class="dropdown-item" @click="messageReact(mess.id,'❤️',chatId)">❤️</a>
                                                <a class="dropdown-item" @click="messageReact(mess.id,'😀',chatId)">😀</a>
                                                <a class="dropdown-item" @click="messageReact(mess.id,'😮',chatId)">😮</a>
                                                <a class="dropdown-item" @click="messageReact(mess.id,'😥',chatId)">😥</a>
                                                <a class="dropdown-item" @click="messageReact(mess.id,'🤬',chatId)">🤬</a>
                                                <a class="dropdown-item" @click="messageReact(mess.id,'👍',chatId)">👍</a>
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
                                        </div>
                                    </template>
                                  </template>
                                  <template v-else>
                                    <li class="chat-message chat-message-right align-items-center"><i class="fa-solid fa-ban me-1"></i>{{ mess.sender.fname }} deleted this message !</li>
                                  </template>
                                  </div>
                                  <template v-if="showUserAvatarIndex(index,mess.sender.id)">
                                    <template v-if="mess.message_sender != 2">
                                      <div class="text-muted mt-1">
                                        <small>{{ formatTimes(mess.created_at) }}</small>
                                      </div>
                                    </template>
                                  </template>
                                  </div>
                                </div>
                              </li>
                              </template>
                          </div>
                      </div>
                      </template>
                      <template v-else>
                        <div class="right_side_chat">
                          <div class="right_chat_message d-flex align-items-end mb-1">
                            <div class="chat_user_message">
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
                                        <a class="dropdown-item" @click="messageReact(mess.id,'❤️',chatId)">❤️</a>
                                        <a class="dropdown-item" @click="messageReact(mess.id,'😀',chatId)">😀</a>
                                        <a class="dropdown-item" @click="messageReact(mess.id,'😮',chatId)">😮</a>
                                        <a class="dropdown-item" @click="messageReact(mess.id,'😥',chatId)">😥</a>
                                        <a class="dropdown-item" @click="messageReact(mess.id,'🤬',chatId)">🤬</a>
                                        <a class="dropdown-item" @click="messageReact(mess.id,'👍',chatId)">👍</a>
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
                                        <a class="dropdown-item" @click="messageReact(mess.id,'❤️',chatId)">❤️</a>
                                        <a class="dropdown-item" @click="messageReact(mess.id,'😀',chatId)">😀</a>
                                        <a class="dropdown-item" @click="messageReact(mess.id,'😮',chatId)">😮</a>
                                        <a class="dropdown-item" @click="messageReact(mess.id,'😥',chatId)">😥</a>
                                        <a class="dropdown-item" @click="messageReact(mess.id,'🤬',chatId)">🤬</a>
                                        <a class="dropdown-item" @click="messageReact(mess.id,'👍',chatId)">👍</a>
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
                                    <p class="mb-0 text-white font-class message" v-html="mess.message"></p>
                                    <span class="message_react_right" :id="'message_react_'+mess.id">{{ mess.react }}</span>
                                    <div class="message_hover_icon">
                                      <div class="btn-group dropend">
                                        <button type="button" class="btn rep_emoji_btn dropdown-toggle" title="React" data-bs-toggle="dropdown" aria-expanded="false">
                                          <i class="fa-regular fa-face-smile"></i>
                                        </button>
                                        <ul class="dropdown-menu">
                                          <a class="dropdown-item" @click="messageReact(mess.id,'❤️',chatId)">❤️</a>
                                          <a class="dropdown-item" @click="messageReact(mess.id,'😀',chatId)">😀</a>
                                          <a class="dropdown-item" @click="messageReact(mess.id,'😮',chatId)">😮</a>
                                          <a class="dropdown-item" @click="messageReact(mess.id,'😥',chatId)">😥</a>
                                          <a class="dropdown-item" @click="messageReact(mess.id,'🤬',chatId)">🤬</a>
                                          <a class="dropdown-item" @click="messageReact(mess.id,'👍',chatId)">👍</a>
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
                              <div class="chat_user_image ms-3">
                                <template v-if="showUserAvatarIndex(index,mess.sender.id)">
                                <template v-if="authUser.avatar != null">
                                  <img :src="'https://api.doppcall.com/'+authUser.avatar" alt="image"> 
                                </template>
                                <template v-else>
                                  <img :src="blankUser" alt="image"> 
                                </template> 
                                </template>
                                <template v-else>
                                  <div id="no_user_avatar"></div>
                                </template>
                              </div>
                            </template>
                          </div>
                        </div>
                        <template v-if="mess.message_sender == 0">
                          <template v-if="showUserAvatarIndex(index,mess.sender.id)">
                            <div class="text-end text-muted mb-3 me-5">
                              <template v-if="mess.message_read == 1">
                                <i class="fa-solid fa-check-double me-1 text-success"></i>
                              </template>
                              <template v-else-if="mess.message_read == 2">
                                <i class="fa-solid fa-check-double me-1"></i>
                              </template>
                              <template v-else>
                                <i class="fa-solid fa-check me-1"></i>
                              </template>
                              <small>{{ formatTimes(mess.created_at) }}</small>
                            </div>
                          </template>
                        </template>
                      </template>
                    </template>
                  </template>
                  <template v-else>
                    <div class="d-flex justify-content-center">
                      <span class="text-danger fw-bolder">No Message Found !</span>
                    </div>
                  </template>
                </template>
              </template>
     
                
              </div>
            </div>
            <div class="chat_content_editor">
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
                  <template v-if="chatInfos && chatInfos.block_status == 0">
                    <div class="form-send-message d-flex justify-content-between align-items-center" :id="showHiddenEditorStatus == true ? 'myChatEditor' : ''">
                      <textarea :ref="'chatEditor'" class="form-control" ></textarea>
                      <div class="message-actions d-flex align-items-center">
                        <template v-if="showHiddenEditorStatus == true">
                          <a @click="showHiddenEditor(false)" title="Show Editor" href="javascript:"><i class="fa-solid fa-a"></i></a>
                        </template>
                        <template v-else>
                          <a @click="showHiddenEditor(true)" title="Hide Editor" href="javascript:"><i class="fa-solid fa-a text-secondary"></i></a>
                        </template>
                        <template v-if="!showAudioBtn">
                          <!-- <i @click="startRecording()" class="fa-solid fa-microphone"></i> -->
                          <!-- <label for="imageInput" class="form-label mb-0">
                            <i class="fa-regular fa-image"></i>
                            <input type="file" @change="chatPubAdveImage($event)" accept="image/*" id="imageInput" class="d-none"/>
                          </label> -->
                          <button class="btn p-0"  @click="toggleEmojiPicker()"><i id="emojiChat" class="fa-regular fa-face-smile"></i> </button>
                          <div class="dashboard_emoji_picker" v-if="showEmojiPicker">
                            <emoji-picker :search="true" :hide-group-icons="true" :hide-group-names="true" :disable-skin-tones="true" @select="addEmoji"></emoji-picker>
                          </div>
                          <div class="btn-group dropup message_file_drop">
                            <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                              <i class="fa-solid fa-ellipsis"></i>
                            </button>
                            <ul class="dropdown-menu">
                              <li>
                              <a class="dropdown-item" href="#">
                                <label for="imageInput" class="form-label mb-0">
                                  <i class="fa-solid fa-link me-2"></i>Share a file
                                  <input type="file" @change="chatPubAdveImage($event)" accept="image/*" id="imageInput" class="d-none"/>
                                </label>
                               </a>
                               </li>
                              <li @click="startRecording()"><a class="dropdown-item" href="#"><i class="fa-solid fa-microphone-lines me-2"></i>Record an audio message</a></li>
                            </ul>
                          </div>
                        </template>
                        <template v-if="showAudioBtn">
                            <div class="audio_record_area d-flex align-items-center position-relative">
                              <p class="record_animation" v-if="showAudioBtn">{{ recordingDuration }}</p>
                              <button class="btn p-0 record_state" id="record_state" @click="pauseRecording()" v-if="isRecording"><i class="fa-solid fa-pause me-3"></i></button>
                              <button class="btn p-0 record_state" id="record_state"  @click="resumeRecording()" v-if="isPaused"><i  class="fa-solid fa-play me-3"></i></button>
                              <button class="btn p-0"  @click="deleteRecording()"><i id="deleteRecoudIcons" class="fa-solid fa-trash"></i></button>
                            </div>
                          </template>
                        <template v-if="showSendMessageBtn">
                            <button title="Message" class="btn btn btn-primary  send-msg-btn" @click="sendMessage()"> <i class="fa-solid fa-paper-plane"></i></button>
                          </template>
                          <template v-if="showImageBtn">
                            <button title="Image" class="btn btn btn-primary  send-msg-btn" @click="sendIMages()"><i class="fa-solid fa-paper-plane"></i></button>
                          </template>
                          <template v-if="showAudioBtn">
                            <button title="Audio" class="btn btn btn-primary  send-msg-btn" @click="stopRecording()"><i class="fa-solid fa-paper-plane"></i></button>
                          </template>
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
                </div>
            </div>
          </div>
          <template v-if="chatInfos != null && chatInfos  != ''">
            <div class="chat_content_sidebar">
              <div class="chat_content_sidebar_header px-3 py-4">
                <div class="d-flex align-items-center">
                  <div class="position-relative">
                    <template v-if="checkUserOnline(chatInfos.id)">
                      <span class="user_online"></span>
                    </template>
                    <template v-else>
                      <span class="user_offline"></span>
                    </template>
                      <template v-if="chatInfos.avatar != null">
                        <img class="sidebar_user_image" :src="'https://api.doppcall.com/'+chatInfos.avatar" alt="image">
                      </template>
                      <template v-else>
                        <img class="sidebar_user_image" :src="blankUser" alt="image">
                      </template>
                    <img class="sidebar_flag_image" :src="'https://flagicons.lipis.dev/flags/4x3/' + (chatInfos.country_code ?? '') + '.svg'" alt="">
                  </div>
                  <div class="d-grid ms-3 sidebar_user_info">
                    <span class="name">{{ chatInfos.fname ?? '' }} - {{ chatInfos.lname ?? '' }}</span>
                    <span class="email">{{ chatInfos.email ?? '' }}</span>
                    <span class="state">{{ chatInfos && chatInfos.user_location && chatInfos.user_location.city_name }}</span>
                  </div>
                </div>
                <div class="d-flex align-items-center justify-content-center">
                  <template v-if="chatInfos.role.name == 'Publisher'">
                    <button class="profile_btn text-white"><RouterLink class="text-white" :to="'/admin-manage-publishers-view/'+chatInfos.id"><i class="fa-regular fa-user me-3"></i>View {{ chatInfos.fname ?? '' }} Profile </RouterLink></button>
                  </template>
                  <template v-else-if="chatInfos.role.name == 'Advertiser'">
                    <button class="profile_btn"><RouterLink class="text-white" :to="'/admin-manage-advertiser-view/'+chatInfos.id"><i class="fa-regular fa-user me-3"></i>View {{ chatInfos.fname ?? '' }} Profile </RouterLink></button>
                  </template>
                </div>
              </div>
              <div class="chat_content_body">
                <div>
                  <div class="accordion" id="accordionPanelsStayOpenExample">
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                          <i id="menu_varticals" class="fa-solid fa-grip-vertical"></i>
                          Main information
                          <i class="fa-solid fa-angle-down accordion-icon"></i>
                        </button>
                      </h2>
                      <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                        <div class="accordion-body">
                          <div class="sidebar_common_class">
                            <i class="fa-solid fa-location-dot me-2"></i>
                            {{ chatInfos && chatInfos.user_location && chatInfos.user_location.city_name }} ,{{ chatInfos && chatInfos.user_location && chatInfos.user_location.country }}
                          </div>
                          <!-- <div class="sidebar_common_class">
                            <i class="fa-regular fa-clock me-2"></i>
                            1.00 (UTC+6)
                          </div> -->
                          <div class="sidebar_common_class">
                            <i class="fa-solid fa-globe me-2"></i>
                            <img :src="'https://flagicons.lipis.dev/flags/4x3/' + (chatInfos.country_code ?? '') + '.svg'" alt="image" width="20">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
                        <button class="accordion-button " type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="true" aria-controls="panelsStayOpen-collapseTwo">
                          <i id="menu_varticals" class="fa-solid fa-grip-vertical"></i>
                          Visitor device
                          <i class="fa-solid fa-angle-down accordion-icon"></i>
                        </button>
                      </h2>
                      <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingTwo">
                        <div class="accordion-body">
                          <template v-if="chatInfos.browser != null">
                            <div class="sidebar_common_class">
                              <template v-if="chatInfos.browser == 'Chrome'">
                                <img class="me-2" :src="Chrome" alt="image">
                              </template>
                              <template v-else-if="chatInfos.browser == 'Firefox'">
                                <img class="me-2" :src="Firefox" alt="image">
                              </template>
                              <template v-else-if="chatInfos.browser == 'Safari'">
                                <img class="me-2" :src="Safari" alt="image">
                              </template>
                              <template v-else-if="chatInfos.browser == 'Edge'">
                                <img class="me-2" :src="Edge" alt="image">
                              </template>
                              <template v-else-if="chatInfos.browser == 'Explorer'">
                                <img class="me-2" :src="Explorer" alt="image">
                              </template>
                              {{ chatInfos.browser }} on {{ chatInfos.os }}
                            </div>
                          </template>
                          <div class="sidebar_common_class">
                            <i class="fa-solid fa-cloud-arrow-up me-2"></i>
                            {{ chatInfos && chatInfos.user_location &&  chatInfos.user_location.ip_address }}
                          </div>
                          <template v-if="chatInfos && chatInfos.page_name != null">
                            <div class="sidebar_common_class">
                              <i class="fa-regular fa-file-lines me-2"></i>
                             <span id="page_name"> {{ chatInfos && chatInfos.page_name  }}</span>
                            </div>
                          </template>
                        </div>
                      </div>
                    </div>
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="panelsStayOpen-headingThree">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="true" aria-controls="panelsStayOpen-collapseThree">
                          <i id="menu_varticals" class="fa-solid fa-grip-vertical"></i>
                          Conversation participants
                          <i class="fa-solid fa-angle-down accordion-icon"></i>
                        </button>
                      </h2>
                      <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingThree">
                        <div class="accordion-body">
                          <div class="sidebar_common_class">
                            <i class="fa-regular fa-envelope me-2"></i>
                            {{ chatInfos.email ?? '' }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
            </div>
          </template>
      </div>
    </template>

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
import { onMounted, ref, watch , computed, onUnmounted } from 'vue';
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
      const chatPageNumber = ref(1);
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
      const recordingStartTime = ref(null);  
      const recordingDuration = ref(0); 
      const durationInterval = ref(null);
      const recorder = ref(null);
      const isPaused = ref(false);
      const recordedBlobs = ref([]); 
      const showEmojiPicker = ref(false);
      const showSendMessageBtn  = ref(true); 
      const showImageBtn  = ref(false);
      const showAudioBtn  = ref(false);
      const chatPubAdveImageCreate = ref({ 
        image: "",
      });
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
      const messageReactData = ref({ 
        react : "",
        userid  : "",
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

      const typingTimeout = ref(null);
      const isTyping = ref(false);
      const typingBroadcast = ref({ 
        user_id: "",
        admin_id : "",
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
      const chatScrollStatus = ref(false);
      const messageCountForAdmin = ref(0);
      const chatScrollPageNumber = ref(2);
      const showHiddenEditorStatus = ref(false);
      const audioShowStatus = ref(1);

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
              localStorage.setItem('chatUserStoreIds', JSON.stringify(chatUserStoreIds));
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

      const sendMessage = async () => {
        const activeUser = onlineUsers.value.find(user => user.id == chatId.value);
        createMessage.value.user_activity = activeUser ? 1 : 0;
        createMessage.value.user_id = chatId.value;
        createMessage.value.message = getMessageText.value.message;
        

        const chatMessage = {
          message: (createMessage.value.attachmentMessage ?? '') + (getMessageText.value.message ?? ''),
          user_id: authUserID.value,
          type: createMessage.value.type,
          message_sender: 0,
          sender: {
            id: authUser.value.id,
            avatar: authUser.value.avatar,
            role_id: authUser.value.role_id,
          },
          message_read: activeUser ? 2 : 0,
          created_at: getLaravelFormattedTime() 
        };

        if (createMessage.value.message && createMessage.value.message.trim() !== '' && createMessage.value.message != undefined) {
          if (chatInfos.value && chatInfos.value.userAllMessages && chatInfos.value.userAllMessages.data) {
            chatInfos.value.userAllMessages.data.push(chatMessage);
            scrollToMessageSendBottom();
          }
          getMessageText.value.message = '';
          $(chatEditor.value).summernote('code', '');

          if (ChatAllUsers.value.length > 0) {
            const matchedUserIndex = ChatAllUsers.value.findIndex(user => user.id == chatId.value);
            if (matchedUserIndex !== -1) {
              const user = ChatAllUsers.value[matchedUserIndex];
              if(user && user.latest_message != null){
                user.latest_message.message = createMessage.value.message;
                user.latest_message.created_at = getLaravelFormattedTime();
              }else{
                const  makeMessage = {'message' : createMessage.value.message , 'type' : createMessage.value.type , 'created_at': getLaravelFormattedTime()};
                user.latest_message = makeMessage;
              }
              ChatAllUsers.value.splice(matchedUserIndex, 1); 
              ChatAllUsers.value.unshift(user);
              scrollToTop(); 
            }
          }

          const chatUserStoreIds = localStorage.getItem('chatUserStoreIds');
          if (chatUserStoreIds && chatUserStoreIds.length > 0) {
            const chatUserIdsArray = JSON.parse(chatUserStoreIds);
            if (Array.isArray(chatUserIdsArray)) {
              const matchedUserIndex = chatUserIdsArray.findIndex(user => user == chatId.value);
              if (matchedUserIndex !== -1) {
                chatUserIdsArray.splice(matchedUserIndex, 1); 
                chatUserIdsArray.unshift(chatId.value);
              }else{
                chatUserIdsArray.unshift(chatId.value);
              }
              localStorage.setItem('chatUserStoreIds', JSON.stringify(chatUserIdsArray))
            }
          }

          chatPubAdveImageShowImage.value.image = "";
          chatReplayTextShow.value = false;
          showEmojiPicker.value = false;
          showAudioBtn.value = false;

          try {
            const response = await axios.post(
              "https://api.doppcall.com/api/admin/crisp/chat/send-text-message",
              createMessage.value,
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token")
                }
              }
            );
            const jsonResponse = response;

            let getdata = JSON.parse(localStorage.getItem('user_' + createMessage.value.user_id)) || {};
            if (!getdata.userAllMessages) {
              getdata.userAllMessages = { data: [] };
            }
            if (jsonResponse && jsonResponse.data  && jsonResponse.data.messages.data) {
              getdata.userAllMessages.data = jsonResponse.data.messages.data;
            }
            if (chatInfos.value && chatInfos.value.userAllMessages && chatInfos.value.userAllMessages.data) {
              chatInfos.value.userAllMessages.data = jsonResponse.data.messages.data;
            }
            localStorage.setItem('user_' + createMessage.value.user_id, JSON.stringify(getdata));
            // page.value = 1;
            // chatPubAdveImageShowImage.value.image = "";
            // await StoredgetChatData(createMessage.value.chat_id, create_chat.user_id);
            // await getAllWithMessageUser();
            createMessage.value.message = "";
            createMessage.value.type = "text";
            createMessage.value.attachmentMessage = "";
            showSendMessageBtn.value = true;
            showImageBtn.value = false;
            showAudioBtn.value = false;
            // selectedUser.value = 0;
          } catch (error) {
            console.error("Error sending message:", error);
          }
        }
      };

      const getChatByUsers = async (chat_id,user_id) => {
        try {
          const response = await fetch(`https://api.doppcall.com/api/admin/crisp/chat/get-chat-by-id/${chat_id}?page=${chatPageNumber.value}&user_id=${user_id}`, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          });
          
          if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
          }
          const jsonResponse = await response.json();

          let getdata = JSON.parse(localStorage.getItem('user_' + user_id)) || {};
          if (!getdata.userAllMessages) {
            getdata.userAllMessages = { data: [] };
          }
          if (jsonResponse && jsonResponse.messages && jsonResponse.messages.data) {
            getdata.userAllMessages.data = jsonResponse.messages.data;
          }
          localStorage.setItem('user_' + user_id, JSON.stringify(getdata));
        } catch (error) {
          console.error("Error fetching chat users:", error);
        }
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

      const listenForMessages = (chatID) =>  {
        window.Echo.private(`chat.${chatID}`).listen("ChatMessageSent", (event) => {
          if (createMessage.value.chat_id === event.message.chat_id) {
            if (event.message.sender.id != authUserID.value) {
              if (chatInfos.value.userAllMessages) {
                const exists = chatInfos.value.userAllMessages.data.some(
                  (msg) => msg.id === event.message.id
                );
                if (!exists) {
                  event.message.message_read = 1;
                  chatInfos.value.userAllMessages.data.push(event.message);
                  scrollToBottom();
                  // if(authUser.value.role_id == 1 || authUser.value.role_id == 4 || authUser.value.role_id == 5){
                  //   if(audioShowStatus.value == '1'){
                  //     const audio = new Audio('http://codeskulptor-demos.commondatastorage.googleapis.com/pang/pop.mp3');
                  //     audio.play();
                  //   }
                  // }
                  axios
                  .get(`https://api.doppcall.com/api/chat/seen/${chatID}`,{
                    headers: {
                      Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                  })
                }
              }
              getChatByUsers(createMessage.value.chat_id, chatId.value);
            }
          }
        });
      };

      const listenForNewChatUser = (userId) =>  {
        window.Echo.private(`chatcreate.${userId}`).listen("ChatCreateBroadcast", (event) => {
          localStorage.setItem('user_'+event.message.user.id, JSON.stringify(event.message.user))
          const exists = ChatAllUsers.value.some((data) => data.id === event.message.user.id);
          if (!exists) {
            ChatAllUsers.value.unshift(event.message.user);
            const chatUserStoreIds = localStorage.getItem('chatUserStoreIds');
            if (chatUserStoreIds && chatUserStoreIds.length > 0) {
              const chatUserIdsArray = JSON.parse(chatUserStoreIds);
              if (Array.isArray(chatUserIdsArray)) {
                const matchedUserIndex = chatUserIdsArray.findIndex(user => user == event.message.user.id);
                if (matchedUserIndex !== -1) {
                  chatUserIdsArray.splice(matchedUserIndex, 1); 
                  chatUserIdsArray.unshift(event.message.user.id);
                }else{
                  chatUserIdsArray.unshift(event.message.user.id);
                }
                localStorage.setItem('chatUserStoreIds', JSON.stringify(chatUserIdsArray))
              }
            }
          }
        });
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

      const listenForCountMessages = (userId) => {
        window.Echo.private(`recivemessage.${userId}`).listen("ChatMessageReciveEvent", (event) => {
          if (ChatAllUsers.value.length > 0) {
            const matchedUserIndex = ChatAllUsers.value.findIndex(user => user.id == event.message.sender);
            if (matchedUserIndex !== -1) {
              const user = ChatAllUsers.value[matchedUserIndex];
              if (user && user.latest_message != null) {
                user.latest_message.message = event.message.message.message;
                user.latest_message.created_at = getLaravelFormattedTime();
                user.chatstatus.status = 2;
                localStorage.setItem('user_' + event.message.sender, JSON.stringify(user));
              } else {
                user.chatstatus.status = 2;
                const makeMessage = { 'message': event.message.message.message,  'type': event.message.message.type, 'created_at':getLaravelFormattedTime()};
                user.latest_message = makeMessage;
                localStorage.setItem('user_' + event.message.sender, JSON.stringify(user));
              }
              
              var getdata = JSON.parse(localStorage.getItem('user_' + user.id));
              if (getdata && getdata.userAllMessages && getdata.userAllMessages.data) {
                if (getdata.userAllMessages.data.length > 0) { 
                  const exists = getdata.userAllMessages.data.some(data => data.id === event.message.message.id);
                  if (!exists) {
                    if(chatId.value == event.message.sender){
                      event.message.message.message_read = 1;
                    }
                    if(authUser.value.role_id == 1 || authUser.value.role_id == 4 || authUser.value.role_id == 5){
                      if(audioShowStatus.value == '1'){
                        const audio = new Audio('http://codeskulptor-demos.commondatastorage.googleapis.com/pang/pop.mp3');
                        audio.play();
                      }
                    }
                    getdata.userAllMessages.data.push(event.message.message);
                  }
                } else {
                  if(chatId.value == event.message.sender){
                      event.message.message.message_read = 1;
                  }
                  if(authUser.value.role_id == 1 || authUser.value.role_id == 4 || authUser.value.role_id == 5){
                    if(audioShowStatus.value == '1'){
                      const audio = new Audio('http://codeskulptor-demos.commondatastorage.googleapis.com/pang/pop.mp3');
                      audio.play();
                    }
                  }
                  getdata.userAllMessages.data.push(event.message.message);
                }
              }
              localStorage.setItem('user_' + user.id, JSON.stringify(getdata));
              ChatAllUsers.value.splice(matchedUserIndex, 1); 
              ChatAllUsers.value.unshift(user);
              scrollToTop(); 
              const chatUserStoreIds = localStorage.getItem('chatUserStoreIds');
              if (chatUserStoreIds && chatUserStoreIds.length > 0) {
                const chatUserIdsArray = JSON.parse(chatUserStoreIds); 
                if (Array.isArray(chatUserIdsArray)) {
                  const index = chatUserIdsArray.findIndex(user => user == event.message.sender);
                    if (index !== -1) {
                      chatUserIdsArray.splice(index, 1);
                      chatUserIdsArray.unshift(event.message.sender);
                      if(chatUserIdsArray.length > 12){
                        chatUserIdsArray.pop();
                      }
                      localStorage.setItem('chatUserStoreIds', JSON.stringify(chatUserIdsArray));
                    }else{
                      chatUserIdsArray.unshift(event.message.sender);
                    if(chatUserIdsArray.length > 12){
                      chatUserIdsArray.pop();
                    }
                    }
                } else {
                }
              } 
            }else{
              axios
                .get(
                 `https://api.doppcall.com/api/admin/crisp/chat/nostoreuser/${event.message.sender}`,
                  {
                    headers: {
                      Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                  }
                )
                .then((res) => {
                  localStorage.setItem('user_' + event.message.sender, JSON.stringify(res.data.user));
                  if (!ChatAllUsers.value.some(user => user.id === res.data.user.id)) {
                    ChatAllUsers.value.unshift(res.data.user); 
                    if(ChatAllUsers.value > 12){
                      ChatAllUsers.value.pop();
                    }
                  }
                  scrollToTop(); 
                    const chatUserStoreIds = localStorage.getItem('chatUserStoreIds');
                    if (chatUserStoreIds && chatUserStoreIds.length > 0) {
                      const chatUserIdsArray = JSON.parse(chatUserStoreIds); 
                      if (Array.isArray(chatUserIdsArray)) {
                        if (!chatUserIdsArray.some(user => user == event.message.sender)) {
                          chatUserIdsArray.unshift(event.message.sender);
                          if(chatUserIdsArray.length > 12){
                            chatUserIdsArray.pop();
                          }
                          localStorage.setItem('chatUserStoreIds', JSON.stringify(chatUserIdsArray));
                        } else {
                        }
                      } else {
                      }
                    } else {
                    }

                })
                .catch((error) => {
                  console.error("Error fetching messages:", error);
                })
            }
          }
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

      const scrollGetChatData = async (chat_id, userId) => {
        if (chatScrollStatus.value == true) return; 
        chatScrollStatus.value == true;
        axios
          .get(
            `https://api.doppcall.com/api/chat/get-chat-scroll/${chat_id}?page=${chatScrollPageNumber.value}&user_id=${userId}`,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
          .then((res) => {
            if (chatInfos && chatInfos.value && Array.isArray(chatInfos.value.userAllMessages.data)) {
              const userMessages = Array.isArray(chatInfos.value.userAllMessages.data) ? chatInfos.value.userAllMessages.data  : [];

              if(res.data.messages.data.length > 0){
                const combinedMessages = [...res.data.messages.data, ...userMessages];
                chatInfos.value.userAllMessages.data = combinedMessages;
                chatScrollPageNumber.value = chatScrollPageNumber.value + 1;
              }
            }
          })
          .catch((error) => {
            console.error("Error fetching messages:", error);
          })
          .finally(() => {
            chatScrollStatus.value = false;
          });
      };

      const messageOnScroll = async (event, chat_id, user_id) => {
        const scrollTop = event.target.scrollTop;
        if (scrollTop === 0 && chatScrollStatus.value == false) { 
          scrollGetChatData(chat_id,user_id);
        }
      };

      const deletePreviewImage = async () => {
        showSendMessageBtn.value = true;
        showImageBtn.value = false;
        showAudioBtn.value = false;
        chatPubAdveImageCreate.value.image = "";
        chatPubAdveImageShowImage.value.image = "";
      };

      const messageReplayClose = async () => {
        chatReplayTextShow.value = false;
        createMessage.value.attachmentMessage = "";
      };
      
      const captureMicrophone = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          return stream;
        } catch (error) {
          alert("Unable to access your microphone.");
        }
      };

      const startRecording = async () => {
          if (isPaused.value) {
            resumeRecording();
            return;
          }

          showSendMessageBtn.value = false;
          showImageBtn.value = false;
          showAudioBtn.value = true;

          isRecording.value = true;
          recordingStartTime.value = Date.now();
          recordingDuration.value = "00:00"; 

          durationInterval.value = setInterval(() => {
            const totalSeconds = Math.floor((Date.now() - recordingStartTime.value) / 1000);

            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            if (hours > 0) {
              recordingDuration.value = `${hours.toString().padStart(2, "0")}:${minutes
                .toString()
                .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
            } else {
              recordingDuration.value = `${minutes.toString().padStart(2, "0")}:${seconds
                .toString()
                .padStart(2, "0")}`;
            }
          }, 1000); 

          try {
            const microphone = await captureMicrophone();
            recorder.value = RecordRTC(microphone, {
              type: "audio",
              recorderType: StereoAudioRecorder,
              numberOfAudioChannels: 1,
              disableLogs: true,
              desiredSampRate: 16000,
            });
            recorder.value.startRecording();
            recorder.value.microphone = microphone;
          } catch (error) {
            console.error("Error capturing microphone:", error);
          }
      };

      const pauseRecording = async () => {
        if (!isRecording.value || isPaused.value) return;

        isRecording.value = false;
        isPaused.value = true;
        clearInterval(durationInterval.value);

        if (recorder.value) {
          recorder.value.pauseRecording();
        }
      };

      const resumeRecording = async () => {
        if (isRecording.value || !isPaused.value) return;

        isRecording.value = true;
        isPaused.value = false;

        const elapsedDuration = parseFloat(recordingDuration.value.split(":").reduce((acc, time) => (60 * acc) + +time, 0)) || 0;

        recordingStartTime.value = Date.now() - elapsedDuration * 1000;

        durationInterval.value = setInterval(() => {
          const elapsedMilliseconds = Date.now() - recordingStartTime.value;
          const totalSeconds = Math.floor(elapsedMilliseconds / 1000);

          const hours = Math.floor(totalSeconds / 3600);
          const minutes = Math.floor((totalSeconds % 3600) / 60);
          const seconds = totalSeconds % 60;

          if (hours > 0) {
            recordingDuration.value = `${hours.toString().padStart(2, "0")}:${minutes
              .toString()
              .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
          } else {
            recordingDuration.value = `${minutes.toString().padStart(2, "0")}:${seconds
              .toString().padStart(2, "0")}`;
          }
        }, 1000);

        if (recorder.value) {
          recorder.value.resumeRecording();
        }
      };

      const stopRecording = async () => {
        if (!isRecording.value && !isPaused.value) return;
        isRecording.value = false;
        isPaused.value = false;
        clearInterval(durationInterval.value);

        recorder.value.stopRecording(async () => {
          recordedBlobs.value.push(recorder.value.getBlob());
          const finalBlob = new Blob(recordedBlobs.value, { type: "audio/wav" });
          recordedBlobs.value = [];

          const formData = new FormData();
          formData.append("audio", finalBlob);

          try {
            const res = await axios.post(`https://api.doppcall.com/api/audio/store`, formData, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type": "multipart/form-data",
              },
            });
            createMessage.value.type = "audio";
            getMessageText.value.message = res.data.audio;
            sendMessage();
          } catch (error) {
            console.error("Error uploading audio:", error);
          }

          recordingStartTime.value = null;
          recordingDuration.value = "0";
        });
      };


      const deleteRecording = async () => {
        if (isRecording.value || isPaused.value) {
          recorder.value.stopRecording();
          recorder.value.microphone.stop();
        }
        clearInterval(durationInterval.value);
        recordedBlobs.value = [];
        isRecording.value = false;
        isPaused.value = false;
        recordingStartTime.value = null;
        recordingDuration.value = "0";
        showSendMessageBtn.value = true;
        showImageBtn.value = false;
        showAudioBtn.value = false;
      };

      const addEmoji = async (emoji) => {
        const currentContent = $(chatEditor.value).summernote('code'); 
        $(chatEditor.value).summernote('code', currentContent + emoji.i);
      };

      const toggleEmojiPicker = async () => {
        showEmojiPicker.value = !showEmojiPicker.value;
      };

      const chatPubAdveImage = async (event) => {
        showSendMessageBtn.value = false;
        showImageBtn.value = true;
        showAudioBtn.value = false;
        const file = event.target.files[0];
        chatPubAdveImageCreate.value.image = file;
        if (!file || file.type.indexOf("image/") === -1) return;
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof chatPubAdveImageShowImage.value !== "object") {
            chatPubAdveImageShowImage.value = {};
          }
          chatPubAdveImageShowImage.value.image = reader.result;
        };
        reader.readAsDataURL(file);
      };

      const sendIMages = async () => {
        const formData = new FormData();
        formData.append("image", chatPubAdveImageCreate.value.image);
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
          createMessage.value.type = "image";
          getMessageText.value.message = res.data.image;
          sendMessage();
        } catch (error) {
          console.error("Error uploading audio:", error);
        }
      };

      const formatTimes = (dateString) => {
        const date = new Date(dateString);
        return format(date, "hh:mm a");
      };

      const messageReact = async (id,react,userid) =>  {
            const element = document.getElementById('message_react_'+id);
            if (element) {
              element.innerHTML = "";
              element.innerHTML = react;
            }

            messageReactData.value.react = react;
            messageReactData.value.userid = userid;
            axios
            .post(`https://api.doppcall.com/api/chat/message/react/${id}`, messageReactData.value,{
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((res) => {
              getChatByUsers(createMessage.value.chat_id, chatId.value);
            })
            .catch((e) => {
              return e;
            });
      };

      const deleteBtnValue = async (status) => {
        messageDeleteSelf.value.status = status;
      };

      const downloadAudio = async (message) => {
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
            })
            .catch(error => console.error('Error downloading audio:', error));
      };

      const messageDeleteForYourSelf = async (id) => {
        messageDeleteSelf.value.id = id;
      };

      const messageDeleteYourSelf = async (message) => {
        axios
          .post(`https://api.doppcall.com/api/chat/message/delete/sender`,messageDeleteSelf.value,{
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
            if(res.data.status == 'success'){
              getChatByUsers(createMessage.value.chat_id, chatId.value);
              if (chatInfos.value && chatInfos.value.userAllMessages && chatInfos.value.userAllMessages.data.length > 0) {
                for (let i = 0; i < chatInfos.value.userAllMessages.data.length; i++) {
                  if (chatInfos.value.userAllMessages.data[i].id == message.id) {
                    chatInfos.value.userAllMessages.data.splice(i, 1);
                    break; 
                  }
                }
              }
              toastr.success(res.data.message);
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
      };

      const  messageReply = async (message) => {
        chatReplayTextShow.value = true;
        
        if(message && message.sender && message.sender.id ==  authUserID.value){
          chatReplyUser.value.user = 'yourself';
        }else{
          chatReplyUser.value.user =  message.sender.fname;
        }

        if(message.type == 'audio' || message.type == 'image'){
          createMessage.value.attachmentMessage = '<span class="message_replay">Attachment<i class="fa-solid fa-paperclip ms-1"></i></span>';
          chatReplyUser.value.message = 'Attachment';
        }else{
          var getMessage = cleanedMessage(message.message );
          createMessage.value.attachmentMessage = '<span class="message_replay">'+getMessage+'</span>';
          chatReplyUser.value.message = getMessage;
        }
      };

      const messageDelete = async (message) => {
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
                  getChatByUsers(createMessage.value.chat_id, chatId.value);
                  if (chatInfos.value && chatInfos.value.userAllMessages && chatInfos.value.userAllMessages.data.length > 0) {
                    for (let i = 0; i < chatInfos.value.userAllMessages.data.length; i++) {
                      if (chatInfos.value.userAllMessages.data[i].id == message.id) {
                        chatInfos.value.userAllMessages.data.splice(i, 1);
                        break; 
                      }
                    }
                  }
                }else{
                  toastr.error('Something Went To Wrong');
                }
              })
              .catch((e) => {
                return e;
              })
          }
        });
      };

      const cleanedMessage  = (message) => {
        return message.replace(/<span class="message_replay">[\s\S]*?<\/span>/g, '');
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
            return collections.includes(0) || collections.includes(2);
          }
          return false;
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
                  router.push(`/admin-chats/${res.data.user.id}`);
                  $(chatEditor.value).summernote({
                    placeholder: 'Send your message to ....',
                    height: 50,
                    callbacks: {
                      onChange: (contents) => {
                        getMessageText.value.message = contents;
                        sendTypingStatus();
                      },
                      onInit: function () {
                        setTimeout(() => {
                          const searchInput = $(chatEditor.value).next(".note-editor").find(".note-editable");
                          if (searchInput.length) {
                            searchInput.focus();
                            if(showHiddenEditorStatus.value){
                              searchInput.on("keydown", (e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault(); 
                                  sendMessage(); 
                                }
                              });
                            }
                          } else {
                          }
                        }, 10); 
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
                          getMessageText.value.message = contents;
                          sendTypingStatus();
                        },
                        onInit: function () {
                          setTimeout(() => {
                            const searchInput = $(chatEditor.value).next(".note-editor").find(".note-editable");
                            if (searchInput.length) {
                              searchInput.focus();
                              if(showHiddenEditorStatus.value){
                                searchInput.on("keydown", (e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault(); 
                                    sendMessage(); 
                                  }
                                });
                              }
                            } else {
                            }
                          }, 10); 
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
              router.push(`/admin-chats/000`);
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
          await navigator.clipboard.writeText(domain+'/admin-chats/'+id);
          toastr.success('Link Copy Successfully !');
        } catch (err) {
          console.error("Failed to copy: ", err);
        }
      };

      const showHiddenEditor = async (id) => {
        showHiddenEditorStatus.value = id;
        localStorage.setItem('editorStatus',id);
        if(id){
          if ($(chatEditor.value).data('summernote')) {
            $(chatEditor.value).summernote('destroy');
          }
          $(chatEditor.value).summernote({
            placeholder: 'Send your message to ....',
            height: 500,
            callbacks: {
              onChange: (contents) => {
                getMessageText.value.message = contents;
                sendTypingStatus();
              },
              onInit: function () {
                setTimeout(() => {
                  const searchInput = $(chatEditor.value).next(".note-editor").find(".note-editable");
                  if (searchInput.length) {
                    searchInput.focus();
                    if(showHiddenEditorStatus.value){
                      searchInput.on("keydown", (e) => {
                        if (e.key === "Enter") {
                          e.preventDefault(); 
                          sendMessage(); 
                        }
                      });
                    }
                  } else {
                  }
                }, 10); 
              }
            }
          });
        }else{
          if ($(chatEditor.value).data('summernote')) {
            $(chatEditor.value).summernote('destroy');
          }
          $(chatEditor.value).summernote({
            placeholder: 'Send your message to ....',
            height: 500,
            callbacks: {
              onChange: (contents) => {
                getMessageText.value.message = contents;
                sendTypingStatus();
              },
              onInit: function () {
                setTimeout(() => {
                  const searchInput = $(chatEditor.value).next(".note-editor").find(".note-editable");
                  if (searchInput.length) {
                    searchInput.focus();
                  } else {
                  }
                }, 10); 
              }
            }
          });
        }
      };

      const userByCountChatCount = async (user_id) => {
        var countNumber =  parseInt(localStorage.getItem('adminCountMessage_'+user_id) ?? 0);
        if(countNumber > 0){
          return countNumber;
        }else{
          return 0;
        }
      };

      const userByCountChat = async (user_id) => {
        return await userByCountChatCount(user_id);
      };

      const showUserAvatarIndex = (index, user_id) => {
        if (chatInfos.value.userAllMessages.data.length > 0) {
          const nextIndex = index + 1;
          if (nextIndex < chatInfos.value.userAllMessages.data.length) {
            const getUserMessage = chatInfos.value.userAllMessages.data[nextIndex];
            if (getUserMessage && getUserMessage.sender && getUserMessage.sender.id == user_id) {
              return false;
            } else {
              return true;
            }
          } else {
            return true;
          }
        } else {
          return true;
        }
      };

      const sendTypingStatus = () => {
          if (!isTyping.value) {
            isTyping.value = true;
            broadcastTypingStatus();
          }

          clearTimeout(typingTimeout.value);
          typingTimeout.value = setTimeout(() => {
            isTyping.value = false;
            broadcastTypingStopped();
          }, 2000);
      };

      const broadcastTypingStatus = async () => {
          try {
            await axios.post(
              'https://api.doppcall.com/api/admin/crisp/chat/typing',
              typingBroadcast.value,
              {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
              }
            );
          } catch (error) {
            console.error('Failed to send typing status:', error);
          }
      };

      const broadcastTypingStopped = async () => {
          try {
            await axios.post(
              'https://api.doppcall.com/api/admin/crisp/chat/stoptyping',
              typingBroadcast.value,
              {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
              }
            );
          } catch (error) {
            console.error('Failed to send typing stopped status:', error);
          }
      };

      const listenForMessagesReact = (userId) =>  {
        window.Echo.private(`messagereactevent.${userId}`).listen("MessageReactEvent", (event) => {
          chatInfos.value.userAllMessages.data.map(message => {
          if(message.id == event.message.messageid){
            const element = document.getElementById('message_react_'+event.message.messageid);
            if (element) {
              element.innerHTML = "";
              element.innerHTML = event.message.react;
            }
          }
          var getdata = JSON.parse(localStorage.getItem('user_' + event.message.sender));
          if(getdata.userAllMessages.data != null){
            getdata.userAllMessages.data.map(message => {
              if(message.id == event.message.messageid){
                message.react = event.message.react;
              }
              localStorage.setItem('user_'+event.message.sender, JSON.stringify(getdata));
            });
          }
        });
        });
      };

      watch(() => route.params.id, (newId) => {
        if(newId == '000'){
          checkIndexPage.value = true;
          lottie.loadAnimation({
            container: lottieMessage.value, 
            renderer: "svg",
            loop: true,
            autoplay: true,
            path: "https://lottie.host/ce8ee662-704a-47fe-9955-ace0cdbf4049/oBWtMKkn7w.json",
          });
        } else{
          listenForOnlineUsers();
          var getdata = JSON.parse(localStorage.getItem('user_'+newId));
          var getdraftText = JSON.parse(localStorage.getItem('draft_'+newId));
          var getEditorStatus = localStorage.getItem('editorStatus');
          showHiddenEditorStatus.value = getEditorStatus == "false" ? false : true;
          if(getdata != null && getdata != ''){
            createMessage.value.chat_id = getdata && getdata.chatstatus.id;
            listenForMessages(getdata && getdata.chatstatus.id); 
            scrollToBottom();
            chatInfos.value = getdata;
            checkIndexPage.value = false;
            chatId.value = newId;

            if (getdata?.userAllMessages?.data?.length > 0) {
              getdata.userAllMessages.data.forEach(message => {
                if (message.message_read == 0 || message.message_read == 2) {
                  message.message_read = 1; 
                 var getValue =  $('#totalActiveUsers').html();
                 $('#totalActiveUsers').html(getValue - 1);

                }
              });
              localStorage.setItem('user_' + newId, JSON.stringify(getdata));
              axios
              .get(`https://api.doppcall.com/api/chat/seen/${getdata.chatstatus.id}`,{
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              })
            }

            if (chatEditor.value == null) {
              setTimeout(() => {
                $(chatEditor.value).summernote({
                  placeholder: 'Send your message to ....',
                  height: 50,
                  callbacks: {
                    onChange: (contents) => {
                      getMessageText.value.message = contents;
                      sendTypingStatus();
                    },
                    onInit: function () {
                      setTimeout(() => {
                        const searchInput = $(chatEditor.value).next(".note-editor").find(".note-editable");
                        if (searchInput.length) {
                          searchInput.focus();
                          if(showHiddenEditorStatus.value){
                            searchInput.on("keydown", (e) => {
                              if (e.key === "Enter") {
                                e.preventDefault(); 
                                sendMessage(); 
                              }
                            });
                          }
                        } else {
                        }
                      }, 10); 
                    }
                  }
                });
              }, 100);
            }else{
              setTimeout(() => {
                if ($(chatEditor.value).data('summernote')) {
                  $(chatEditor.value).summernote('destroy');
                }
                $(chatEditor.value).summernote({
                  placeholder: 'Send your message to ....',
                  height: 50,
                  callbacks: {
                    onChange: (contents) => {
                      getMessageText.value.message = contents;
                      sendTypingStatus();
                    },
                    onInit: function () {
                      setTimeout(() => {
                        const searchInput = $(chatEditor.value)
                          .next(".note-editor")
                          .find(".note-editable");
                        if (searchInput.length) {
                          searchInput.focus();
                          if(showHiddenEditorStatus.value){
                            searchInput.on("keydown", (e) => {
                              if (e.key === "Enter") {
                                e.preventDefault(); 
                                sendMessage(); 
                              }
                            });
                          }
                        } else {
                        }
                      }, 1);
                    },
                  },
                });
              }, 10);
            }
          }else{
            try {
                  const response =  fetch(`https://api.doppcall.com/api/admin/crisp/chat/nostoreuser/${chatId.value}`, {
                    headers: {
                      Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                  });
                  
                  if (!response.ok) {
                    throw new Error(`API Error: ${response.statusText}`);
                  }
                  const jsonResponse =  response.json();
                  localStorage.setItem('user_' + chatId.value, JSON.stringify(jsonResponse.user));
                  createMessage.value.chat_id = jsonResponse.user && jsonResponse.user.chatstatus.id; 
                  var getdata = JSON.parse(localStorage.getItem('user_'+newId));
                  var getdraftText = JSON.parse(localStorage.getItem('draft_'+newId));
                  chatInfos.value = jsonResponse.user;
                  checkIndexPage.value = false;
                  scrollToBottom()
                  listenForMessages(jsonResponse.user && jsonResponse.user.chatstatus.id);
                  var getEditorStatus = localStorage.getItem('editorStatus');
                  showHiddenEditorStatus.value = getEditorStatus == "false" ? false : true;
                  $(chatEditor.value).summernote({
                    placeholder: 'Send your message to ....',
                    height: 50,
                    callbacks: {
                      onChange: (contents) => {
                        getMessageText.value.message = contents;
                        sendTypingStatus();
                      },
                      onInit: function () {
                        setTimeout(() => {
                          const searchInput = $(chatEditor.value).next(".note-editor").find(".note-editable");
                          if (searchInput.length) {
                            searchInput.focus();
                            if(showHiddenEditorStatus.value){
                              searchInput.on("keydown", (e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault(); 
                                  sendMessage(); 
                                }
                              });
                            }
                          } else {
                          }
                        }, 10); 
                      }
                    }
                  });
                } catch (error) {
                  console.error("Error fetching chat users:", error);
                }
          }
        }
        const searchInput = $(".note-placeholder");
        if(searchInput.length === 1){
          searchInput.focus();
        }
        chatScrollPageNumber.value = 2;
        var getUserdata = JSON.parse(localStorage.getItem('user'));
        authUser.value = getUserdata ?? '';
        typingBroadcast.value.user_id = newId;
        typingBroadcast.value.admin_id = getUserdata && getUserdata.id;
        var getaudioStatus = JSON.parse(localStorage.getItem('authUserFromLocalStorage'));
        audioShowStatus.value = getaudioStatus.audio_status;
        authUserID.value = getUserdata && getUserdata.id;
        listenForNewChatUser(getUserdata && getUserdata.id);
        listenForCountMessages(getUserdata && getUserdata.id);
        listenForMessagesReact(getUserdata && getUserdata.id);

      }, { immediate: true });

      onMounted(async () => {
        try {
          const { role, isAuthorized } = await fetchUserRole();
          listenForOnlineUsers();
          if (role === 'Super' || role === 'Admin') {
            if(chatId.value == '000'){
              checkIndexPage.value = true;
              lottie.loadAnimation({
                container: lottieMessage.value, 
                renderer: "svg",
                loop: true,
                autoplay: true,
                path: "https://lottie.host/ce8ee662-704a-47fe-9955-ace0cdbf4049/oBWtMKkn7w.json",
              });
            }else{
              var getdata = JSON.parse(localStorage.getItem('user_'+chatId.value));
              var getdraftText = JSON.parse(localStorage.getItem('draft_'+chatId.value));
              if(getdata != null && getdata != ''){
                createMessage.value.chat_id = getdata && getdata.chatstatus.id; 
                chatInfos.value = getdata;
                checkIndexPage.value = false;
                scrollToBottom()
                listenForMessages(getdata && getdata.chatstatus.id);
                var getEditorStatus = localStorage.getItem('editorStatus');
                showHiddenEditorStatus.value = getEditorStatus == "false" ? false : true;
                $(chatEditor.value).summernote({
                  placeholder: 'Send your message to ....',
                  height: 50,
                  callbacks: {
                    onChange: (contents) => {
                      getMessageText.value.message = contents;
                      sendTypingStatus();
                    },
                    onInit: function () {
                      setTimeout(() => {
                        const searchInput = $(chatEditor.value).next(".note-editor").find(".note-editable");
                        if (searchInput.length) {
                          searchInput.focus();
                          if(showHiddenEditorStatus.value){
                            searchInput.on("keydown", (e) => {
                              if (e.key === "Enter") {
                                e.preventDefault(); 
                                sendMessage(); 
                              }
                            });
                          }
                        } else {
                        }
                      }, 10); 
                    }
                  }
                });

              }else{
                try {
                  const response = await fetch(`https://api.doppcall.com/api/admin/crisp/chat/nostoreuser/${chatId.value}`, {
                    headers: {
                      Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                  });
                  
                  if (!response.ok) {
                    throw new Error(`API Error: ${response.statusText}`);
                  }
                  const jsonResponse = await response.json();
                  localStorage.setItem('user_' + chatId.value, JSON.stringify(jsonResponse.user));
                  var getdraftText = JSON.parse(localStorage.getItem('draft_'+chatId.value));
                  createMessage.value.chat_id = jsonResponse.user && jsonResponse.user.chatstatus.id; 
                  chatInfos.value = jsonResponse.user;
                  checkIndexPage.value = false;
                  scrollToBottom()
                  listenForMessages(jsonResponse.user && jsonResponse.user.chatstatus.id);
                  var getEditorStatus = localStorage.getItem('editorStatus');
                  showHiddenEditorStatus.value = getEditorStatus == "false" ? false : true;
                  $(chatEditor.value).summernote({
                    placeholder: 'Send your message to ....',
                    height: 50,
                    callbacks: {
                      onChange: (contents) => {
                        getMessageText.value.message = contents;
                        sendTypingStatus();
                      },
                      onInit: function () {
                        setTimeout(() => {
                          const searchInput = $(chatEditor.value).next(".note-editor").find(".note-editable");
                          if (searchInput.length) {
                            searchInput.focus();
                            if(showHiddenEditorStatus.value){
                              searchInput.on("keydown", (e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault(); 
                                  sendMessage(); 
                                }
                              });
                            }
                          } else {
                          }
                        }, 10); 
                      }
                    }
                  });
                } catch (error) {
                  console.error("Error fetching chat users:", error);
                }
              }
            }
            var getUserdata = JSON.parse(localStorage.getItem('user'));
            authUser.value = getUserdata ?? '';
            authUserID.value = getUserdata && getUserdata.id;
            typingBroadcast.value.user_id = chatId.value;
            typingBroadcast.value.admin_id = getUserdata && getUserdata.id;
            var getaudioStatus = JSON.parse(localStorage.getItem('authUserFromLocalStorage'));
            audioShowStatus.value = getaudioStatus.audio_status;
            listenTypingMessages(getUserdata && getUserdata.id);
            listenTypingStopMessages(getUserdata && getUserdata.id);
            listenForNewChatUser(getUserdata && getUserdata.id);
            listenForCountMessages(getUserdata && getUserdata.id);
            listenForMessagesReact(getUserdata && getUserdata.id);
            userLoading.value = true;
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
        sendMessage,
        Chrome,
        Firefox,
        Safari,
        Edge,
        Explorer,
        chatPubAdveImageShowImage,
        chatReplayTextShow,
        chatReplyUser,
        deletePreviewImage,
        messageReplayClose,
        captureMicrophone,
        startRecording,
        pauseRecording,
        resumeRecording,
        stopRecording,
        deleteRecording,
        addEmoji,
        toggleEmojiPicker,
        showEmojiPicker,
        showAudioBtn,
        recordingDuration,
        isRecording,
        isPaused,
        showSendMessageBtn,
        showImageBtn,
        showAudioBtn,
        chatPubAdveImage,
        sendIMages,
        messageDeleteSelf,
        formatTimes,
        messageReact,
        deleteBtnValue,
        downloadAudio,
        messageDeleteForYourSelf,
        messageDeleteYourSelf,
        messageReply,
        messageDelete,
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
        messageOnScroll,
        searchEmail,
        searchUsers,
        copyLinkUser,
        checkUserOnline,
        showHiddenEditor,
        showHiddenEditorStatus,
        getMessageText,
        userByCountChat,
        messageCountForAdmin,
        CheckReadOrUnreadMessageCount,
        showUserAvatarIndex,
      };
    },
  };
  </script>
  <style>
  .message_status_icon {
    margin-left: auto;
  }
.note-editor {
    display: flex;
    flex-direction: column-reverse; /* Moves the toolbar below the editor */
}

.note-toolbar {
    border-bottom: none;
    background: #f9f9f9;
}

.note-editing-area {
    border-top: none;
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
.form-send-message{
	border: 1px solid #0d6efd;
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
#no_user_avatar {
	width: 30px;
	height: 30px;
	border-radius: 50%;
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
.btn-group.dropup.message_file_drop .btn {
	background: transparent;
	color: #000;
	border: none;
}
.btn-group.dropup.message_file_drop .btn.show {
	background: #f0f2f2;
	color: #1972f5;
	border: none;
}
.btn-group.dropup.message_file_drop .dropdown-menu.show {
  left: -130px !important;
  top: -40px !important;
  box-shadow: 0 0 14px -4px rgba(0,0,0,.05),0 32px 48px -8px rgba(0,0,0,.1),0 40px 64px -12px rgba(0,0,0,.11);
  border: 1px solid #f4f4f5;
}
.btn-group.dropup.message_file_drop .dropdown-menu.show li a {
  color: #606976;
  font-size: 12px;
  padding: 5px 10px;
  display: block!important;
}
.btn-group.dropup.message_file_drop .dropdown-item:active{
background: transparent!important;
}
#record_state {
	margin-right: 20px;
	margin-left: 10px !important;
}
</style>