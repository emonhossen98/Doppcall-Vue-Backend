<template>
  <router-view></router-view>
  <template v-if="publicChat == 1">
    <template v-if="!authUser">
      <div class="frontent_notification" v-if="showNotification">
        <div class="frontent_notification_wapper position-relative">
          <div class="row g-1 align-items-center">
            <div class="col-md-3">
              <i class="fas fa-comments"></i>
            </div>
            <div class="col-md-9">
              <h5 class="mb-0 title">Live Chat Online</h5>
              <p class="font-class sub_title mb-0">
                Click here and start chatting with us
              </p>
            </div>
            <div class="notification_close">
              <span @click="hiddenNotfication()"><i class="fa-solid fa-xmark"></i></span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </template>
  <template v-if="PrivateChat == 1">
    <template v-if="authUserRole">
      <div v-if="authUserRole == 2 || authUserRole == 3" id="chatPage" class="chat_page">
          <button @click="openChatBox()" class="chat_button">
          <i :class="isChatOpen ? 'fas fa-times' : 'fas fa-comments'"></i>
          <div v-if="!isChatOpen && countMessage != 0" class="countMessage">
            <span>{{ countMessage }}</span>
          </div>
         </button>
        <div id="chatbar" class="chat_box animated fadeInUp" :class="{ toggle: isChatOpen }">
          <div class="chat_box_header">
            <div class="chat_header_first">
              <span class="chatsText"> <i class="fas fa-comments me-2"></i>Chat </span>
            </div>
            <div class="chat_assigned_user">
              <span class="chatsimage">
                <!-- <template v-if="authUser.avatar != null">
                  <img id="chatUserAvatar"  :src="'https://api.doppcall.com/' + authUser.avatar" alt="Avatar" class="rounded-circle" />
                </template>
                <template v-else>
                  <img id="chatUserAvatar" :src="no_user"alt="Avatar"  class="rounded-circle"/>
                </template> -->
                <template v-if="superAdminData.avatar != null">
                  <img id="chatUserAvatar" :src="'https://api.doppcall.com/' + superAdminData.avatar" alt="Avatar"  class="rounded-circle" />
                </template>
                <template v-else>
                  <img  id="chatUserAvatar"  :src="no_user" alt="Avatar" class="rounded-circle"/>
                </template>
              </span>
              <h6 class="questions mb-0">
                DOPPCALL Customer Support
             <!-- <template v-if="superAdminData && superAdminData.role && superAdminData.role.name == 'Super'">
              Super Admin 
             </template>
             <template v-else>
              {{ superAdminData && superAdminData.role.name   }}
             </template>
             from DOPPCALL -->
             </h6>
            </div>
          </div>
          <ul id="chatBody" class="chat_box_body" ref="chatContainerApp" @scroll="messageOnScroll($event,userWithChats ?? '',authUser.id)">
            <div v-if="frontentChatLoader" id="frontend_chat_loader" class="spinner-border text-secondary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <!-- <p class="font-class my-2 hand_emoji">👋 How can we help with DOPPCALL ? </p> -->
            <p class="font-class my-2 hand_emoji">👋 Hi there! How can we assist you today ? </p>
            <template v-if="getMessages">
              <template v-for="(mess, index) in getMessages" :key="index">
                <template v-if="mess && mess.sender && mess.sender.id == authUser.id">
                  <li class="d-flex align-items-end justify-content-end widget-chat-msg position-relative" id="chat_message_send_right">
                  <template v-if="mess.message_sender == 0">
                    <template v-if="mess.type == 'audio'">
                    <div class="widget-msg-box position-relative">
                      <div class="btn-group dropstart">
                            <button type="button" class="btn rep_btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                              <i class="fa-solid fa-ellipsis-vertical"></i>
                            </button>
                            <ul class="dropdown-menu">
                              <li><a class="dropdown-item" @click="downloadAudio(mess)"><i class="fa-solid fa-cloud-arrow-down text-info me-1"></i>Download</a></li>
                              <li><a class="dropdown-item" @click="messageReply(mess)"><i class="fa-solid fa-reply me-1 text-primary"></i>Reply</a></li>
                              <!-- <li><a class="dropdown-item" @click="messageDeleteForYourSelf(mess.id)"  data-bs-toggle="modal" :data-bs-target="'#deleteMessageModal_'+mess.id" ><i class="fa-solid fa-trash me-1 text-danger"></i>Delete</a></li> -->
                            </ul>
                          </div>
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
                          <div class="position-relative">
                            <audio :src="'https://api.doppcall.com/' + mess.message" controls ></audio>
                            <span class="message_react_right" :id="'message_react_'+mess.id">{{ mess.react }}</span>
                          </div>
                       </div>
                        <div class="modal fade" :id="'deleteMessageModal_'+mess.id" tabindex="-1" aria-hidden="true">
                          <div class="modal-dialog modal-sm modal-simple modal-enable-otp modal-dialog-centered">
                            <div class="modal-content p-3">
                            <div class="modal-header d-block text-center">
                              <h5 class="mb-0 font-class">Delete Message ?</h5>
                              <p class="mb-0 font-class modal_paragharp">You can delete message for everyone and just for you !</p>
                            </div>
                              <div class="modal-body pt-2">
                                <div class="radio-btn d-block">
                                  <div class="form-check d-flex align-items-center">
                                      <input class="form-check-input me-1" @change="deleteBtnValue('1')" type="radio" name="exampleRadios" id="deleteForMe">
                                      <label class="form-check-label font-class mt-1" for="deleteForMe">
                                        Delete For Me 
                                      </label>
                                  </div>
                                  <div class="form-check d-flex align-items-center">
                                      <input class="form-check-input me-1" type="radio" @change="deleteBtnValue('2')" name="exampleRadios" id="deleteForEveryOne">
                                      <label class="form-check-label font-class mt-1" for="deleteForEveryOne">
                                        Delete For Every One
                                      </label>
                                  </div>
                              </div>
                                <div class="row mt-2">
                                  <button type="button" :disabled="messageDeleteSelf.status == ''"  @click="messageDeleteYourSelf(mess)" class="btn btn-primary col-md-5 me-3">Delete</button>
                                  <button type="button" class="btn btn-secondary col-md-5" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                                </div>
                              </div>
                              </div>
                        </div>
                    </div>
                    </template>
                    <template v-else-if="mess.type == 'image'">
                      <div class="widget-msg-box position-relative">
                        
                          <div class="position-relative">
                            <div class="btn-group dropstart">
                            <button type="button" class="btn rep_btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                              <i class="fa-solid fa-ellipsis-vertical"></i>
                            </button>
                            <ul class="dropdown-menu">
                              <li><a class="dropdown-item" target="_blank" :href="'https://api.doppcall.com/' + mess.message"><i class="fa-solid fa-cloud-arrow-down text-info me-1"></i>Download</a></li>
                              <li><a class="dropdown-item" @click="messageReply(mess)"><i class="fa-solid fa-reply me-1 text-primary"></i>Reply</a></li>
                             <!-- <li><a class="dropdown-item" @click="messageDeleteForYourSelf(mess.id)"  data-bs-toggle="modal" :data-bs-target="'#deleteMessageModal_'+mess.id" ><i class="fa-solid fa-trash me-1 text-danger"></i>Delete</a></li>-->
                            </ul>
                          </div>
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
                            <img :src="'https://api.doppcall.com/' + mess.message" alt="image"/>
                            <span class="message_react_right" :id="'message_react_'+mess.id">{{ mess.react }}</span>
                          </div>
                       </div>
                        <div class="modal fade" :id="'deleteMessageModal_'+mess.id" tabindex="-1" aria-hidden="true">
                          <div class="modal-dialog modal-sm modal-simple modal-enable-otp modal-dialog-centered">
                            <div class="modal-content p-3">
                            <div class="modal-header d-block text-center">
                              <h5 class="mb-0 font-class">Delete Message ?</h5>
                              <p class="mb-0 font-class modal_paragharp">You can delete message for everyone and just for you !</p>
                            </div>
                              <div class="modal-body pt-2">
                                <div class="radio-btn d-block">
                                  <div class="form-check d-flex align-items-center">
                                      <input class="form-check-input me-1" @change="deleteBtnValue('1')" type="radio" name="exampleRadios" id="deleteForMe">
                                      <label class="form-check-label font-class mt-1" for="deleteForMe">
                                        Delete For Me 
                                      </label>
                                  </div>
                                  <div class="form-check d-flex align-items-center">
                                      <input class="form-check-input me-1" type="radio" @change="deleteBtnValue('2')" name="exampleRadios" id="deleteForEveryOne">
                                      <label class="form-check-label font-class mt-1" for="deleteForEveryOne">
                                        Delete For Every One
                                      </label>
                                  </div>
                              </div>
                                <div class="row mt-2">
                                  <button type="button" :disabled="messageDeleteSelf.status == ''"  @click="messageDeleteYourSelf(mess)" class="btn btn-primary col-md-5 me-3">Delete</button>
                                  <button type="button" class="btn btn-secondary col-md-5" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                                </div>
                              </div>
                              </div>
                        </div>
                       </div>
                    </template>
                    <template v-else>
                      <div class="widget-msg-box position-relative">
                        <div class="btn-group dropstart">
                            <button type="button" class="btn rep_btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                              <i class="fa-solid fa-ellipsis-vertical"></i>
                            </button>
                            <ul class="dropdown-menu">
                              <li><a class="dropdown-item" @click="messageReply(mess)"><i class="fa-solid fa-reply me-1 text-primary"></i>Reply</a></li>
                             <!-- <li><a class="dropdown-item" @click="messageDeleteForYourSelf(mess.id)"  data-bs-toggle="modal" :data-bs-target="'#deleteMessageModal_'+mess.id" ><i class="fa-solid fa-trash me-1 text-danger"></i>Delete</a></li>-->
                            </ul>
                          </div>
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
                          <div class="position-relative">
                            <p class="mb-0 font-class" v-html="mess.message"></p>
                            <span class="message_react_right" :id="'message_react_'+mess.id">{{ mess.react }}</span>
                          </div>
                       </div>
                        <div class="modal fade" :id="'deleteMessageModal_'+mess.id" tabindex="-1" aria-hidden="true">
                          <div class="modal-dialog modal-sm modal-simple modal-enable-otp modal-dialog-centered">
                            <div class="modal-content p-3">
                            <div class="modal-header d-block text-center">
                              <h5 class="mb-0 font-class">Delete Message ?</h5>
                              <p class="mb-0 font-class modal_paragharp">You can delete message for everyone and just for you !</p>
                            </div>
                              <div class="modal-body pt-2">
                                <div class="radio-btn d-block">
                                  <div class="form-check d-flex align-items-center">
                                      <input class="form-check-input me-1" @change="deleteBtnValue('1')" type="radio" name="exampleRadios" id="deleteForMe">
                                      <label class="form-check-label font-class mt-1" for="deleteForMe">
                                        Delete For Me 
                                      </label>
                                  </div>
                                  <div class="form-check d-flex align-items-center">
                                      <input class="form-check-input me-1" type="radio" @change="deleteBtnValue('2')" name="exampleRadios" id="deleteForEveryOne">
                                      <label class="form-check-label font-class mt-1" for="deleteForEveryOne">
                                        Delete For Every One
                                      </label>
                                  </div>
                              </div>
                                <div class="row mt-2">
                                  <button type="button" :disabled="messageDeleteSelf.status == ''"  @click="messageDeleteYourSelf(mess)" class="btn btn-primary col-md-5 me-3">Delete</button>
                                  <button type="button" class="btn btn-secondary col-md-5" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                                </div>
                              </div>
                              </div>
                        </div>
                      </div>
                    </template>
                  </template>
                  <template v-else>
                    <div class="widget-msg-box position-relative">
                     <p class="mb-0 font-class messagedelete"><i class="fa-solid fa-ban me-1"></i>You deleted this message !</p>
                    </div>
                  </template>
                  <template v-if="mess.message_sender == 0">
                    <template v-if="showUserAvatarIndex(index,mess.sender.id)">
                      <div class="d-block text-muted widget_msg_time mt-1">
                        <template v-if="mess.message_read == 1">
                          <template v-if="adminMessageStatus == 1"> 
                            <i class="fa-solid fa-check-double me-1 text-success"></i>
                          </template>
                          <template v-else>
                            <i class="fa-solid fa-check-double me-1"></i>
                          </template>
                        </template>
                        <template v-else-if="mess.message_read == 2">
                          <i class="fa-solid fa-check-double me-1"></i>
                        </template>
                        <template v-else>
                          <i class="fa-solid fa-check me-1"></i>
                        </template>
                        <small class="font-class">{{ formatTime(mess.created_at) }}</small>
                      </div>
                    </template>
                  </template>
                  <template v-if="showUserAvatarIndex(index,mess.sender.id)">
                    <template v-if="authUser.avatar != null">
                      <img id="chatUserAvatar" :src="'https://api.doppcall.com/' + authUser.avatar" alt="Avatar" class="rounded-circle"/>
                    </template>
                    <template v-else>
                      <img id="chatUserAvatar" :src="no_user" alt="Avatar" class="rounded-circle"/>
                    </template>
                  </template>
                  <template v-else>
                    <div id="no_user_avatar"></div>
                  </template>
                  </li>
                </template>
                <template v-else>
                  <template v-if="mess && mess.message_reciver == 0">
                    <li class="d-flex align-items-end widget-chat-msg position-relative" id="chat_message_send_left">
                      <template v-if="showUserAvatarIndex(index,mess.sender.id)">
                        <template v-if="superAdminData.avatar != null">
                          <img id="chatUserAvatar" :src="'https://api.doppcall.com/' + superAdminData.avatar" alt="Avatar" class="rounded-circle"/>
                        </template>
                        <template v-else>
                          <img id="chatUserAvatar" :src="no_user"  alt="Avatar"  class="rounded-circle"/>
                        </template>
                      </template>
                    <template v-else>
                      <div id="no_user_avatar_left"></div>
                    </template>
                      <template v-if="mess.message_sender != 2">
                        <template v-if="mess.type == 'audio'">
                          <div class="widget-msg-box">
                            <div class="position-relative">
                              <audio :src="'https://api.doppcall.com/' + mess.message" controls></audio>
                            <span class="message_react_left" :id="'message_react_'+mess.id">{{ mess.react }}</span>
                          </div>
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
                                  <li><a class="dropdown-item" @click="downloadAudio(mess)"><i class="fa-solid fa-cloud-arrow-down text-info me-1"></i>Download</a></li>
                                  <li><a class="dropdown-item" @click="messageReply(mess)"><i class="fa-solid fa-reply me-1 text-primary"></i>Reply</a></li>
                                 <!-- <li><a class="dropdown-item" @click="messageDelete(mess)"><i class="fa-solid fa-trash me-1 text-danger"></i>Delete</a></li> -->
                                  <li><a class="dropdown-item" @click="messageUnread(mess)"><i class="fa-solid fa-eye-slash me-1 text-warning"></i>Unread</a></li>
                                </ul>
                              </div>
                          </div> 
                        </template>
                        <template v-else-if="mess.type == 'image'">
                          <div class="widget-msg-box widget_msg_img">
                            <img :src="'https://api.doppcall.com/' + mess.message" alt="image" />
                            <span class="message_react_left" :id="'message_react_'+mess.id">{{ mess.react }}</span>
                            <div class="position-relative">
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
                                 <!-- <li><a class="dropdown-item" @click="messageDelete(mess)"><i class="fa-solid fa-trash me-1 text-danger"></i>Delete</a></li> -->
                                  <li><a class="dropdown-item" @click="messageUnread(mess)"><i class="fa-solid fa-eye-slash me-1 text-warning"></i>Unread</a></li>
                                </ul>
                              </div>
                          </div>
                            
                          </div>
                          
                        </template>
                        <template v-else>
                          <div class="widget-msg-box">
                          <div class="position-relative">
                            <p class="mb-0 font-class" v-html="mess.message"></p>
                            <span class="message_react_left" :id="'message_react_'+mess.id">{{ mess.react }}</span>
                          </div>
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
                                 <!-- <li><a class="dropdown-item" @click="messageDelete(mess)"><i class="fa-solid fa-trash me-1 text-danger"></i>Delete</a></li> -->
                                  <li><a class="dropdown-item" @click="messageUnread(mess)"><i class="fa-solid fa-eye-slash me-1 text-warning"></i>Unread</a></li>
                                </ul>
                              </div>
                          </div>
                        </template>
                        <template v-if="mess.message_sender == 0">
                          <template v-if="showUserAvatarIndex(index,mess.sender.id)">
                            <div class="d-block text-muted widget_msg_time msg_time_left mt-1">
                              <small class="font-class">{{ formatTime(mess.created_at) }}</small>
                            </div>
                          </template>
                        </template>
                      </template>
                      <template v-else>
                        <div class="widget-msg-box position-relative">
                          <p class="mb-0 font-class messagedelete"><i class="fa-solid fa-ban me-1"></i>{{ mess.sender.fname }} deleted this message !</p>
                          </div>
                      </template>
                    </li>
                  </template>
                </template>
              </template>
            </template>
          </ul>

          <template v-if="authUser">
            <template v-if="authUser.block_status == 0">
              <div class="d-flex px-2 gap-2 chat_form" id="app">
                <div class="chat_img_attachment" v-if="chatPubAdveImageShowImage && chatPubAdveImageShowImage.image != ''">
                  <img :src="chatPubAdveImageShowImage.image" class="chatPreviewImage position-relative"/>
                  <button @click="deletePreviewImage()" id="deleteImages">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>
                <div class="message-replay-div" v-if="chatReplayTextShow" >
                  <div>
                    <p class="mb-0 font-class">Replying to {{ chatReplyUser.user ?? '' }}</p>
                    <p class="mb-0 font-class" v-html="chatReplyUser.message ?? ''"></p>
                  </div>
                  <div>
                    <a class="mb-0 text-white" @click="messageReplayClose()"><i class="fa-solid fa-xmark"></i></a>
                  </div>
                </div>
                <div id="showadminTyping" class="d-none user_typing_message_widget"> 
                  <span class="typing">
                    <template v-if="superAdminData.avatar != null">
                      <img id="chatUserAvatar" :src="'https://api.doppcall.com/' + superAdminData.avatar" alt="Avatar" class="rounded-circle"/>
                    </template>
                    <template v-else>
                      <img id="chatUserAvatar" :src="no_user"  alt="Avatar"  class="rounded-circle"/>
                    </template>
                    <span>typing</span> 
                          <span class="dot"></span>
                          <span class="dot"></span>
                          <span class="dot"></span>
                        </span>
                </div>
                <div class="chat_box_footer d-flex align-items-center mb-3">
                  <input v-model="getMessageText.message" type="text" @input="sendTypingStatus()" placeholder="Enter Message" @keyup.enter="sendMessage()"/>
                  <div class="attach_file d-flex bg-white">
                </div>
                  <template v-if="showSendMessageBtn">
                    <button title="Message" @click="sendMessage()">
                      <i class="fa-regular fa-paper-plane"></i>
                    </button>
                  </template>
                  <template v-if="showImageBtn">
                    <button title="Image" @click="sendIMages()">
                      <i class="fa-regular fa-paper-plane"></i>
                    </button>
                  </template>
                  <template v-if="showAudioBtn">
                    <button title="Audio" @click="stopRecording()">
                      <i class="fa-regular fa-paper-plane"></i>
                    </button>
                  </template>
                </div>
                <div id="imojiPicher" v-if="showEmojiPicker">
                  <emoji-picker :search="true" :hide-group-icons="true" :hide-group-names="true" :disable-skin-tones="true" @select="addEmoji"></emoji-picker>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="d-flex px-2 gap-2 position-relative">
                <div class="chat_box_footer d-flex align-items-center">
                  <input class="w-100" type="text" placeholder="Admin blocked you id " readonly />
                </div>
              </div>
            </template>
            <div class="d-flex justify-content-between align-items-center px-3">
              <div class="run_on_Left_doppcall">
                <template  v-if="!showAudioBtn">
                    <template v-if="showEmojibtn" >
                    <button id="imojishowbtn" class="p-0" @click="toggleEmojiPicker()">
                      <i class="fa-regular fa-face-smile"></i>
                    </button>
                  </template>
                  <template  v-if="showImagebtn">
                    <button id="imojishowbtn" class="p-0">
                      <input @change="chatPubAdveImage($event)" type="file"  accept="image/*" id="imageInput" class="d-none"/>
                      <label for="imageInput" class="image-button">
                        <!-- <i class="fa-regular fa-image"></i> -->
                        <i class="fa-solid fa-link"></i>
                      </label>
                    </button>
                  </template>
                  <template  v-if="showRecordingbtn">
                    <button @click="startRecording()" id="imojishowbtn" class="p-0">
                      <i class="fa-solid fa-microphone-lines"></i>
                  </button>
                  </template>
                  </template>
                  <template v-if="showAudioBtn">
                    <div class="audio_record_area d-flex align-items-center position-relative">
                      <p class="record_animation font-class" v-if="showAudioBtn">{{ recordingDuration }}</p>
                      <button class="btn p-0 record_state "  id="imojishowbtn" @click="pauseRecording()" v-if="isRecording">
                        <i class="fa-solid fa-pause me-2 text-white"></i>
                      </button>
                      <button  class="btn p-0 record_state " id="imojishowbtn" @click="resumeRecording()" v-if="isPaused">
                        <i class="fa-solid fa-play me-2 text-white"></i>
                      </button>
                      <button class="btn p-0 delete_state"  id="imojishowbtn" @click="deleteRecording()">
                        <i class="fa-solid fa-trash text-white"></i>
                      </button>
                  </div>
                  </template>
            </div>
            <div class="run_on_doppcall">
             We run on <span>DOPPCALL</span>
            </div>
            </div>
          </template>
        </div>
      </div>
    </template>
  </template>

  <!-- Large Modal -->
  <!-- <div class="modal fade" id="userSessionLogoutModal" tabindex="-1" aria-hidden="true" v-if="showWarningmodal">
    <div class="modal-dialog modal-md modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <div class="row text-center py-4">
            <div class="form-group">
              <img id="warning-icon" :src="WarningImage" alt="icon">
              <h4 class="mb-0 mt-4">Your session has expired.</h4>
              <p class="my-4">You’ve been inactive for a while, so we’ve logged you out for your security. Please log in again to continue.</p>
              <a id="logout-btn" href="https://doppcall.com/login?token=logout">Return to Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> -->
</template>
<script>
import WarningImage from './assets/backend/assets/img/warning-icon.png'
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { inject } from "vue";
import no_user from "./assets/backend/assets/img/blank_user.png";
import RecordRTC, { StereoAudioRecorder } from "recordrtc";
import EmojiPicker  from "vue3-emoji-picker";
import Swal from "sweetalert2";
import toastr from 'toastr'
import moment from "moment";
import { format } from "date-fns";
import 'easy-skeleton-loader-vue/styles.css';

window.Pusher = Pusher;
window.Echo = new Echo({
  broadcaster: "pusher",
  key: "4af372a603837e311fb4",
  cluster: "ap2",
  encrypted: true,
  authEndpoint: "https://api.doppcall.com/broadcasting/auth",
  auth: {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  },
});

export default {
  setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
  components: {
    EmojiPicker,
  },
  data() {
    return {
      no_user,
      WarningImage,
      onlineUsers: [],
      isChatOpen: false,
      authUser: "",
      authUserRole: "",
      userWithChats: "",
      domainName: "",
      pageName: "",
      create_chat: {
        user_id: "",
      },
      superAdmin: "",
      superAdminData: "",
      page: 1,
      chats: [],
      getMessages: [],
      createMessage: {
        chat_id: "",
        user_id: "",
        message: "",
        user_activitiy: "",
        domainName: "",
        super_admin: "",
        type: "text",
        attachmentMessage :  "",
      },
      getMessageText : {
        message : "",
      },
      showEmojiPicker: false,
      isRecording: false,
      recordingStartTime: null,
      recordingDuration: "0",
      durationInterval: null,
      recorder: null,
      chatPubAdveImageCreate: {
        image: "",
      },
      chatPubAdveImageShowImage: {
        image: "",
      },
      showSendMessageBtn: true,
      showImageBtn: false,
      showAudioBtn: false,
      isPaused: false,
      recordedBlobs: [],
      publicChat: "",
      PrivateChat: "",
      adminMessageStatus: "",
      showNotification: true,
      countMessage : 0,
      showEmojibtn : true,
      showImagebtn : true,
      showRecordingbtn : true,
      frontentChatLoader : false,
      messageReactData:{
        react : "",
      },
      chatReplayTextShow : false,
      adminTyping : false,
      chatReplyUser : {
        user : "",
        message : "",
      },
      messageDeleteSelf : {
        id : "",
        status : "",
      },
      chatPageNumber: 1,
      audioShowStatus : null,
      typingTimeout: null,
      isTyping: false, 
      typingBroadcast : {
        user_id  : "",
      },
      showWarningmodal : false,
    };
  },
  mounted() {
    this.getChatActivity();
    this.listenForOnlineUsers();
    this.domainName = window.location.origin;
    this.pageName = window.location.href;
    this.countMessage =  parseInt(localStorage.getItem("countMessage") ?? 0);
    if (localStorage.getItem("token") !== "" && localStorage.getItem("token") !== null) {
      this.getRoleData();
    }
  },
  methods: {
    hiddenNotfication() {
      this.showNotification = false;
    },
    addEmoji(emoji) {
      this.getMessageText.message += emoji.i;
    },
    toggleEmojiPicker() {
      this.showEmojiPicker = !this.showEmojiPicker;
      this.showSendMessageBtn = true;
      this.showImageBtn = false;
      this.showAudioBtn = false;
    },
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

        this.showEmojibtn = false;
        this.showImagebtn = false;
        this.showRecordingbtn = false;

        this.isRecording = true;
        this.recordingStartTime = Date.now();
        this.recordingDuration = "00:00"; // Reset duration in MM:SS format

        this.durationInterval = setInterval(() => {
          const elapsedMilliseconds = Date.now() - this.recordingStartTime;
          const totalSeconds = Math.floor(elapsedMilliseconds / 1000);

          const hours = Math.floor(totalSeconds / 3600);
          const minutes = Math.floor((totalSeconds % 3600) / 60);
          const seconds = totalSeconds % 60;

          if (hours > 0) {
            this.recordingDuration = `${hours.toString().padStart(2, "0")}:${minutes
              .toString()
              .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
          } else {
            this.recordingDuration = `${minutes.toString().padStart(2, "0")}:${seconds
              .toString()
              .padStart(2, "0")}`;
          }
        }, 1000); // Update every second

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
      if (this.recorder) {
        this.recorder.pauseRecording();
      }
    },
    async resumeRecording() {
      if (this.isRecording || !this.isPaused) return;
      this.isRecording = true;
      this.isPaused = false;

      const elapsedDuration = this.recordingDuration
        .split(":")
        .reduce((acc, time) => 60 * acc + parseInt(time), 0); // Convert HH:MM:SS to total seconds

      this.recordingStartTime = Date.now() - elapsedDuration * 1000;

      this.durationInterval = setInterval(() => {
        const elapsedMilliseconds = Date.now() - this.recordingStartTime;
        const totalSeconds = Math.floor(elapsedMilliseconds / 1000);

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        if (hours > 0) {
          this.recordingDuration = `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        } else {
          this.recordingDuration = `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
        }
      }, 1000); // Update every second

      if (this.recorder) {
        this.recorder.resumeRecording();
      }
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
          this.showEmojibtn = true;
          this.showImagebtn = true;
          this.showRecordingbtn = true;
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
        if (this.recorder) {
          this.recorder.stopRecording();
          this.recorder.microphone.stop();
          this.showEmojibtn = true;
          this.showImagebtn = true;
          this.showRecordingbtn = true;
        } else {
          console.warn("Recorder is not initialized.");
        }
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
    deletePreviewImage() {
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
    createConversation() {
      this.frontentChatLoader = true;
      const data = new FormData();
      data.append("users[]", this.create_chat.user_id);
      data.append("isPrivate", 1);
      data.append("domainName", this.domainName);
      data.append("pageName", this.pageName);
      data.append("superAdmin", this.superAdmin);
      axios
        .post(`https://api.doppcall.com/api/chat/create-chat`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.data.success) {
            this.createMessage.chat_id = res.data.chat.id;
            this.listenForMessages(res.data.chat.id);
            this.getChatData(res.data.chat.id);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    sendMessage() {
      var activeUser = this.onlineUsers.find(
        (user) => user.id === this.create_chat.user_id
      );
      this.createMessage.user_activitiy = activeUser ? 1 : 0;
      this.createMessage.domainName = this.domainName;
      this.createMessage.user_id = this.create_chat.user_id;
      this.createMessage.message =  this.getMessageText.message;
      this.chatPubAdveImageShowImage.image = "";
      this.chatReplayTextShow = false;

      const chatMessage = {
        message: this.createMessage.attachmentMessage + this.getMessageText.message,
        user_id: this.authUser.id,
        type: this.createMessage.type,
        message_sender : 0,
        sender: {
          id: this.authUser.id,
          avatar: this.authUser.avatar,
          role_id: this.authUser.role_id,
        },
        message_read: activeUser == 1 ? 2 : 0,
        created_at : this.getLaravelFormattedTime(),
      };
      if(this.createMessage.message != '' && this.createMessage.message != null){
        this.getMessages.push(chatMessage);
        this.showEmojiPicker = false;
        this.getMessageText.message = '';
        this.showAudioBtn = false;
        this.$nextTick(() => {
          this.scrollToBottom();
        });
        axios
          .post("https://api.doppcall.com/api/chat/send-text-message", this.createMessage, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
            let getdata = JSON.parse(localStorage.getItem('adverPublisLocalStorage_' + this.createMessage.user_id)) || [];
            if (!getdata) {
              getdata = { data: [] };
            }
            if (res && res.data  && res.data.messages) {
              getdata = res.data.messages;
            }
            localStorage.setItem('adverPublisLocalStorage_' + this.createMessage.user_id, JSON.stringify(getdata));

            this.createMessage.type = 'text';
            this.chatPubAdveImageShowImage.image = "";
            this.getChatData(res.data.message.chat_id, this.createMessage.user_id);
            this.createMessage.attachmentMessage = "";
            this.getMessageText.message = '';
            this.showSendMessageBtn = true;
            this.showImageBtn = false;
            this.showAudioBtn = false;
          })
          .catch((error) => {
            console.error("Error sending message:", error);
          });
      }
    },
    listenForMessages(chatID) {
      window.Echo.private(`chat.${chatID}`).listen("ChatMessageSent", (event) => {
        if (chatID === event.message.chat_id) {
          if(event.message.sender.id != this.authUser.id){
            if (this.getMessages) {
              const exists = this.getMessages.some(
                (msg) => msg.id === event.message.id
              );
              if (!exists) {
                this.getMessages.push(event.message);
                let getdata = JSON.parse(localStorage.getItem('adverPublisLocalStorage_' + this.authUser.id)) || [];
                if (!getdata) {
                  getdata = { data: [] };
                }
                if (event && event.message) {
                  getdata.data.push(event.message);
                }
                localStorage.setItem('adverPublisLocalStorage_' + this.authUser.id, JSON.stringify(getdata));
                this.$nextTick(() => {
                  this.scrollToBottom();
                });
                if(this.authUser.role_id == 1 || this.authUser.role_id == 4 || this.authUser.role_id == 5){
                  if(this.audioShowStatus == '1'){
                    const audio = new Audio('http://codeskulptor-demos.commondatastorage.googleapis.com/pang/pop.mp3');
                    audio.play();
                  }
                }else{
                  const audio = new Audio('http://codeskulptor-demos.commondatastorage.googleapis.com/pang/pop.mp3');
                  audio.play();
                }
                audio.muted = true; 
                audio.play().then(() => {
                  audio.muted = false;
                }).catch(error => {
                  console.error('Autoplay failed:', error);
                });
                axios
                .get(`https://api.doppcall.com/api/chat/seen/${chatID}`,{
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                })
              }
            }
          }
        }
      });
    },
    getChatData(chat_id) {
      axios
        .get(
          `https://api.doppcall.com/api/chat/get-chat-by-id/${chat_id}?page=${this.page}&user_id=${this.superAdmin}&super_admin=${this.superAdmin}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          this.frontentChatLoader = false;
          this.chats = res.data.chat.participants;
          this.getMessages = res.data.messages.data;
          this.$nextTick(() => {
            this.scrollToBottom();
          });
        })
        .catch((error) => {
          console.error("Error fetching messages:", error);
        });
    },
    openChatBox() {
      this.isChatOpen = !this.isChatOpen;
      localStorage.setItem("countMessage", 0);
      this.countMessage = 0;
      if (this.isChatOpen) {
        var getUserChat = JSON.parse(localStorage.getItem('adverPublisLocalStorage_'+this.authUser.id))
        if(getUserChat != null){
          this.chatPageNumber += 1;
          this.getMessages = getUserChat.data;
          this.scrollToBottom()
        }else{
          this.createConversation();
        }
      }
    },
    getRoleData() {
      axios
        .get(this.globalVariables.apiUrl + `auth/user/data`, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          this.superAdmin = res && res.data && res.data.superAdmin && res.data.superAdmin.id;
          this.superAdminData = res && res.data && res.data.superAdmin && res.data.superAdmin;
          this.createMessage.super_admin = res && res.data && res.data.superAdmin && res.data.superAdmin.id;
          this.authUser = res.data.data;
          this.typingBroadcast.user_id = res && res.data && res.data.data && res.data.data.id;
          this.audioShowStatus = res.data.audio_status;
          this.create_chat.user_id = res && res.data && res.data.data && res.data.data.id;
          this.authUserRole = res && res.data && res.data.role && res.data.role.id;
          this.userWithChats = res && res.data && res.data.userWithChats && res.data.userWithChats.chats && res.data.userWithChats.chats[0] && res.data.userWithChats.chats[0].id;
          this.listenForCountMessages(res.data.data.id);
          this.listenForNewChatUser(res.data.data.id);
          this.listenTypingMessages(res.data.data.id);
          this.listenTypingStopMessages(res.data.data.id);
          this.listenForMessagesReact(res.data.data.id);
          this.listenForUserAccessChange(res.data.data.id);
          localStorage.setItem('authUserFromLocalStorage', JSON.stringify(res.data));
          this.createMessage.chat_id = res && res.data && res.data.userWithChats && res.data.userWithChats.chatstatus && res.data.userWithChats.chatstatus.id;
          this.createMessage.user_id = res && res.data && res.data.userWithChats && res.data.userWithChats.chatstatus && res.data.userWithChats.chatstatus.id;
          this.listenForMessages(res.data.userWithChats.chatstatus.id);
          this.getUserChatInLanding();
        })
        .catch((e) => {
        });
    },
    getUserChatInLanding(){
      axios
        .get(this.globalVariables.apiUrl + `chat/auth-data-landing`, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          localStorage.setItem('adverPublisLocalStorage_'+this.authUser.id, JSON.stringify(res.data.getChatUser.userAllMessages));
        })
        .catch((e) => {
          console.error(e);
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
    scrollToBottom() {
      setTimeout(() => {
        const chatContainer = document.getElementById('chatBody');    
        if (chatContainer) {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
      }, 100);
    }, 
    listenForOnlineUsers() {
      window.Echo.join("online-users")
        .here((users) => {
          this.onlineUsers = users;
        })
        .joining((user) => {
          this.onlineUsers.push(user);
          axios
            .get(this.globalVariables.apiUrl + `chat/visitors/count`)
        })
        .leaving((user) => {
          this.onlineUsers = this.onlineUsers.filter((u) => u.id !== user.id);
        });
    },
    formatTime(dateString) {
      const date = new Date(dateString);
      return format(date, "hh:mm a");
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
    getChatActivity() {
      axios
        .get(this.globalVariables.apiUrl + `website/chat/activity`)
        .then((res) => {
          this.publicChat = res.data.public_chat;
          this.PrivateChat = res.data.private_chat;
          this.adminMessageStatus = res.data.seen_status;
          this.showWarningmodal = true;
        })
        .catch((e) => {
          console.error(e);
        });
    },
    messageReply(message){
      this.chatReplayTextShow = true;
      if(message && message.sender && message.sender.id ==  this.authUser.id){
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
    messageUnread(message) {
      this.frontentChatLoader = true;
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
              this.frontentChatLoader = false;
            });
    },
    cleanedMessage(message) {
      return message.replace(/<span class="message_replay">[\s\S]*?<\/span>/g, '');
    },
    messageReplayClose(){
      this.chatReplayTextShow = false;
      this.createMessage.attachmentMessage = "";
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

          })
          .catch((e) => {
            return e;
          });
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
              this.page = 1;
              this.getChatData(message.chat_id,this.create_chat.user_id);
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
          this.chatloader = true;
          axios
            .get(`https://api.doppcall.com/api/chat/message/delete/${message.id}`, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((res) => {
              if(res.data.status == 'success'){
                toastr.success(res.data.message);
                this.page = 1;
                this.getChatData(message.chat_id)
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
    listenForCountMessages(userId) {
      window.Echo.private(`recivemessage.${userId}`).listen("ChatMessageReciveEvent", (event) => {
        var getdata = JSON.parse(localStorage.getItem('user_' + event.message.sender));
          if (getdata && getdata.latest_message != null) {
            getdata.latest_message.message = event.message.message.message;
            getdata.latest_message.created_at = this.getLaravelFormattedTime();
            getdata.chatstatus.status = 2;
            localStorage.setItem('user_' + event.message.sender, JSON.stringify(getdata));
          } else {
            if(getdata != null){
              getdata.chatstatus.status = 2;
              const makeMessage = { 'message': event.message.message.message,  'type': event.message.message.type, 'created_at':this.getLaravelFormattedTime()};
              getdata.latest_message = makeMessage;
              localStorage.setItem('user_' + event.message.sender, JSON.stringify(getdata));
            }
          }
        if (getdata && getdata.userAllMessages && getdata.userAllMessages.data) {
          if (getdata.userAllMessages.data.length > 0) { 
            const exists = getdata.userAllMessages.data.some(data => data.id === event.message.message.id);
            if (!exists) {
              getdata.userAllMessages.data.push(event.message.message);
              if(this.authUser.role_id == 1 || this.authUser.role_id == 4 || this.authUser.role_id == 5){
                if(this.audioShowStatus == '1'){
                  const audio = new Audio('http://codeskulptor-demos.commondatastorage.googleapis.com/pang/pop.mp3');
                  audio.play();
                }
              }else{
                const audio = new Audio('http://codeskulptor-demos.commondatastorage.googleapis.com/pang/pop.mp3');
                audio.play();
              }
            }
          } else {
            getdata.userAllMessages.data.push(event.message.message);
            if(this.authUser.role_id == 1 || this.authUser.role_id == 4 || this.authUser.role_id == 5){
              if(this.audioShowStatus == '1'){
                const audio = new Audio('http://codeskulptor-demos.commondatastorage.googleapis.com/pang/pop.mp3');
                audio.play();
              }
            }else{
              const audio = new Audio('http://codeskulptor-demos.commondatastorage.googleapis.com/pang/pop.mp3');
              audio.play();
            }
          }
        }
        localStorage.setItem('user_' + event.message.sender, JSON.stringify(getdata));
        
      });
    },
    listenForNewChatUser(userId) {
      window.Echo.private(`chatcreate.${userId}`).listen("ChatCreateBroadcast", (event) => {
        toastr.success(event.message.fname+' Send a message');
      });
    },
    showUserAvatarIndex (index, user_id){
      if (this.getMessages.length > 0) {
        const nextIndex = index + 1;
        if (nextIndex < this.getMessages.length) {
          const getUserMessage = this.getMessages[nextIndex];
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
    },
    sendTypingStatus() {
        if (!this.isTyping) {
            this.isTyping = true;
            this.broadcastTypingStatus();
        }
        clearTimeout(this.typingTimeout);
        this.typingTimeout = setTimeout(() => {
            this.isTyping = false;
            this.broadcastTypingStopped();
        }, 2000); 
    },
    async broadcastTypingStatus() {
        try {
            await axios.post(
                "https://api.doppcall.com/api/public-chat/typing",
                this.typingBroadcast,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }
            );
        } catch (error) {
            console.error('Failed to send typing status:', error);
        }
    },
    async broadcastTypingStopped() {
        try {
            await axios.post(
                "https://api.doppcall.com/api/public-chat/stoptyping",
                this.typingBroadcast,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }
            );
        } catch (error) {
            console.error('Failed to send typing status:', error);
        }
    },
    listenForMessagesReact (userId) {
      window.Echo.private(`messagereactevent.${userId}`).listen("MessageReactEvent", (event) => {
        this.getMessages.map(message => {
          if(message.id == event.message.messageid){
            const element = document.getElementById('message_react_'+event.message.messageid);
            if (element) {
              element.innerHTML = "";
              element.innerHTML = event.message.react;
            }
          }
        });
        var getUserChat = JSON.parse(localStorage.getItem('adverPublisLocalStorage_'+this.authUser.id))
        if(getUserChat != null){
          getUserChat.data.map(message => {
          if(message.id == event.message.messageid){
            message.react = event.message.react;
          }
          localStorage.setItem('adverPublisLocalStorage_'+this.authUser.id, JSON.stringify(getUserChat));
        });
        }
    });
    },
    listenForUserAccessChange (userId) {
      window.Echo.private(`useraccesschangeevent.${userId}`).listen("UserAccessChangeEvent", (event) => {
        var getUserChat = JSON.parse(localStorage.getItem('authUserFromLocalStorage'));
        if(getUserChat.data != null){
          getUserChat.data.account_access = event.message.access;
          localStorage.setItem('authUserFromLocalStorage', JSON.stringify(getUserChat));
          location.reload();
        }
    });
    },
    listenTypingMessages (userId) {
      window.Echo.private(`typebroadcast.${userId}`).listen("TypingBroadcast", (event) => {
        $('#showadminTyping').removeClass('d-none');
      });
    },
    listenTypingStopMessages  (userId) {
      window.Echo.private(`typestopbroadcast.${userId}`).listen("TypingStopBroadcast", (event) => {
        $('#showadminTyping').addClass('d-none');
      });
    },
  },
};
</script>
<style scoped>
.run_on_doppcall {
	position: absolute;
	bottom: 3px;
	right: 10px;
	color: rgb(146,169,193);
	font-size: 11.6px !important;
}
.delete_state {
  margin-left: 15px;
}
.run_on_Left_doppcall{
  position: absolute;
	bottom: 3px;
	left: 10px;
	color: rgb(146,169,193);
	font-size: 11.6px !important;
  width: 25%;
}
#chatBody {
	scrollbar-width: thin;
}
.chat_button {
  position: fixed;
  bottom: 0 !important;
  right: 0;
  margin: 30px 40px;
  height: 70px;
  width: 70px;
  text-align: center;
  background-color: #012964 !important;
  border-radius: 100px;
  border: none;
  font-size: 1.6rem;
  color: white !important;
  cursor: pointer;
  transition: 0.5s ease-in-out;
}
.chat_button:hover {
  background-color: #b1b1b1 !important;
  color: #012964 !important;
}
.chat_button:focus,
.chat_button:active {
  outline: none;
}
.chat_box {
  height: 680px;
	width: 400px;
  background-color: #fff;
  position: fixed;
  bottom: 112px;
  right: 50px;
  overflow: hidden !important;
  display: none;
  z-index: 999;
	border-radius: 12px !important;
	box-shadow: 0 6px 6px 0 rgba(0,0,0,.02),0 8px 24px 0 rgba(0,0,0,.12) !important;
  z-index:9999;
}


.chat_box_header{
	background: #0d6efd;
	height: 100px;
	text-align: center;
}
.chat_header_first{
	text-align: center !important;
	list-style-type: none !important;
	pointer-events: none !important;
	padding: 10px 8px !important;
	display: flex !important;
	justify-content: center !important;
	position: relative !important;
	z-index: 1 !important;
}
.chat_header_first .chatsText{
	background: #155bc2;
	margin: 0 1px !important;
	padding: 8px 20px !important;
	border-radius: 12px !important;
	color: white;
	font-size: 12px;
	font-weight: 700;
}
.chat_assigned_user{
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 10px;
}
.questions{
	color: white;
	font-weight: 700;
	font-size: 12.6px;
}
.chat_box_footer :-ms-input-placeholder {
  width: 100%;
  padding: 5px 10px;
}
.chat_box_footer  input:focus-visible{
  outline:none;
}
.chat_box_footer button{
	background: #0d6efd;
	color: white;
	padding: 5px 10px !important;
	border-radius: 4px;
	border: none;
}

#frontend_chat_loader{
	position: absolute;
	top: 50%;
	left: 50%;
}
.chat_box_body_self {
  padding: 16px 15px;
  float: right;
  border-radius: 25px;
  margin-right: 10px;
  background: #5a5eb9;
  color: white;
  margin: 10px 0;
  clear: both;
  max-width: 75%;
}
.chat_box_body_other {
  background: whitesmoke;
  padding: 16px 15px;
  color: #666;
  max-width: 75%;
  float: left;
  margin-left: 10px;
  margin: 10px 0;
  position: relative;
  margin-bottom: 20px;
  border-radius: 25px;
  clear: both;
}
.chat_box_body::-webkit-scrollbar {
  width: 5px;
  background-color: #f5f5f5;
}
.chat_box_body::-webkit-scrollbar-thumb {
  background-color: #77e;
}
.toggle {
  display: block;
}
.chat_box_footer input {
  width: 100%;
  padding: 5px 5px !important;
}
.chat_box_footer input {
  width: calc(100% - 50px);
  box-sizing: border-box;
  padding: 5px;
  border: none;
  border-radius-left-start: 4px;
  resize: none;
}
.animated {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 10%, 0);
    transform: translate3d(0, 10%, 0);
  }
  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
.fadeInUp {
  -webkit-animation-name: fadeInUp;
  animation-name: fadeInUp;
}
.brand {
  text-align: center !important;
  margin-top: 25px;
}
.brand a {
  color: white;
  text-decoration: none;
}
.attach_file {
  color: #938d8d;
}

.chatsimage img{
	width: 30px !important;
	border-radius: 50%;
	height: 30px;
	border: 1px solid #bababa;
}
#chatUserAvatar {
  width: 24px;
}
#imojishowbtn {
  background: transparent;
  color: #938d8d;
  padding: 0;
  border:none;
  font-size: 14px;
  margin-right: 14px;
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
	color: white;
	background: transparent;
	border-radius: 50%;
	height: 20px;
	width: 20px;
	font-size: 13px;
	background: #012964;
}
@media only screen and (max-width: 420px) {
  #chatbar {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 8rem;
  }
  #chatbar .chat_box_footer input {
    width: 100%;
  }
  #chatbar .chat_box_footer button {
    width: 30%;
    right: 0;
  }
}
.frontent_notification {
  position: fixed;
  bottom: 104px !important;
  right: 40px;
  width: 280px;
  text-align: center;
  background-color: #012964 !important;
  border-radius: 5px;
  font-size: 1.6rem;
  color: white !important;
  cursor: pointer;
  transition: 0.5s ease-in-out;
}
.frontent_notification_wapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
}
.frontent_notification .title {
  font-weight: 700;
  margin-bottom: 5px !important;
}
.frontent_notification .sub_title {
  color: #d2d2d2;
  font-size: 14px;
}
.notification_close span {
	border: 1px solid #012964;
	padding: 5px;
	border-radius: 50%;
	height: 21px !important;
	width: 21px !important;
	display: flex;
	position: absolute;
	color: black;
	top: -23px;
	right: 0px;
	line-height: 0;
	font-size: 14px;
	align-items: center;
	justify-content: center;
}

</style>
<style>
#logout-btn{
	background: #7367f0;
	padding: 10px 25px;
	border-radius: 4px;
	color: white;
	font-weight: 700;
}
#no_user_avatar {
  width: 24px;
}
#no_user_avatar_left {
  width: 100%;
}
.chat_box_body {
  padding: 5px  15px;
  height: 100%;
  overflow-y: scroll;
  height: 531px;
  scroll-behavior: smooth;
  background: white;
  position: relative;
}
#imojiPicher {
	width: 93%;
	position: absolute;
	bottom: 73px;
	height: 130px;
	overflow-y: scroll;
	scrollbar-width: thin;
	background: #7367f0;
	padding: 10px;
	border-radius: 5px 5px 0 0;
	top: -130px;
}
.widget-msg-box img {
	width: 50%;
}
.v3-emojis {
	background: #D0D0D770;
	text-align: center;
}
.v3-emojis button {
  padding: 3px!important;
  border:none;
  background:unset;
  border:2px solid transparent;
}
.v3-emojis button:hover{
  border:2px solid #685dd8;
  border-radius:3px;
}
.v3-emojis button img, .v3-footer .v3-icon img{
  width: 34px!important;
  height: 34px!important;
}
.v3-footer .v3-text{
  display:none!important;
}
.v3-search input {
  width: 100%;
	border-radius: 5px 5px 0 0;
	border: none;
	padding: 5px;
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

.record_animation {
	margin-bottom: 0 !important;
	margin-left: 5px;
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
.attach_file svg {
	font-size: 13px;
	color: #5d596c;
}
.audio_record_area svg{
  color:#5d596c;
  font-size:12px!important;
}
.audio_record_area i{
  color:#fff!important;
  font-size:12px!important;
}
.audio_record_area .btn:active{
  border: none!important;
  outline: none!important;
}
.record_state {
	width: 0;
  margin-left: 20px !important;
}
.audio_record_area button:last-child {
	margin-top: -3px;
}
.chat_box_body img {
	width: 25%;
}
.chat_img_attachment {
	position: absolute;
	top: -50px;
	left: 10px;
  background: white;
}
.countMessage {
	background: #a7b5c9;
	margin-top: 7px;
	font-size: 13px;
	border-radius: 50%;
	width: 23px;
	height: 23px;
	margin-left: 17px;
	font-weight: 700;
	color: black;
}
.message_replay {
	display: block;
	margin-left: 10px;
	margin-bottom: 10px;
	padding: 1px 0 2px 8px;
	color:#fff;
  border-width: 0 0 0 2px;
  border-color: rgba(255,255,255,.25);
  border-style: solid;

}

/* .chat_box_body .font-class {
	background: #0162e8;
	padding: 4px 8px;
	border-radius: 5px;
	max-width: 100%;
	word-break: break-all;
}
.chat_box_body > div{
  margin-bottom:15px;
  color:#fff
} */
/* .message_react_right {
	position: absolute;
	font-size: 15px;
	left: 0px;
	bottom: -11px;
} */
.dropend .dropdown-toggle::after {
	display: none !important;
}
.dropstart .dropdown-toggle::before {
  display: none !important;
}
.rep_emoji_btn.dropdown-toggle, .rep_btn.dropdown-toggle {
	padding: 4px 4px !important;
}
#app .message-replay-div {
	position: absolute;
	top: -70px;
	background: #fff;
	width: 94%;
	padding: 10px 18px;
	border-radius: 5px;
	display: flex;
	justify-content: space-between;
}


.widget-chat-msg {
  float: left;
  margin-bottom:10px;
  width: 70%;
  
}
.widget-msg-box {
	background: white;
	color: #5d596c;
	display: flex;
	align-items: center;
	margin: 0 8px;
}
.widget-msg-box p, .widget-msg-box img, .widget-msg-box audio{
  background: #1972F5 !important;
  color: #fff;
  padding: 8px 14px 5px !important;
  border-radius: 12px;
  font-size: 12.6px;
  margin: 0;
  margin-bottom: 0px;
}
.widget-msg-box p p {
	padding: 0 !important;
}
.widget-chat-msg audio {
  width: 100%;
}
#warning-icon{
	width: 120px;
}
#chat_message_send_right {
  float: right;
  clear: both;
  text-align: right;
}
#chat_message_send_right .widget-msg-box{
  color: white!important;

}
#chat_message_send_right .widget-msg-box p, #chat_message_send_right .widget-msg-box img, #chat_message_send_right .widget-msg-box audio{
  background: #F0F2F5 !important;
  color: rgb(28,41,59) !important;
  border-radius: 12px !important;
  
}

.widget-msg-box .rep_emoji_btn.dropdown-toggle {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	left: 9px;
}
.widget-msg-box .rep_btn.dropdown-toggle {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	left: 33px;
}
.widget-msg-box .rep_emoji_btn + ul {
	padding: 3px 0;
	top: -38px !important;
	position: absolute !important;
	left: -80px !important;
}
.widget-msg-box .rep_emoji_btn + ul a {
	display: inline;
	padding: 0 2px;
	margin: 0;
}
#chat_message_send_right .rep_btn.dropdown-toggle{
  left: -40px;
}
#chat_message_send_right .rep_emoji_btn.dropdown-toggle{
  left: -30px;
}
.widget-msg-box .rep_btn, .widget-msg-box .rep_emoji_btn{
  display:none!important;
}
.widget-chat-msg:hover .rep_btn.dropdown-toggle, .widget-chat-msg:hover .rep_emoji_btn.dropdown-toggle{
  display:block!important;
}

.widget-msg-box .message_react_right {
	position: absolute;
	font-size: 15px;
	right: -10px;
	bottom: -18px;
}
.widget-msg-box .message_react_left {
	position: absolute;
	font-size: 15px;
	left: -10px;
	bottom: -15px;
}
.widget_msg_img .message_react_left {
	left: 22px;
	bottom: -16px;
}
.modal_paragharp{
  font-size: 13px !important;
  line-height: 15px !important;
}
.messagedelete{
  font-size: 11px !important;
}
.chat_form {
	padding: 8px 0px;
	border-top: 1px solid #eee;
	position: absolute !important;
	bottom: 0;
	width: 100%;
}
.chat_box_footer {
	width: 100%;
}
.widget_msg_time {
	position: absolute;
	bottom: -33px;
	right:30px;
	font-size: 14px;
}
.msg_time_left{
  left: 30px;
}
.widget-chat-msg svg {
	font-size: 14px;
	position: relative;
	top: -1px;
}
.widget-msg-box p p br {
	display: none !important;
}
.hand_emoji {
	background: #1972F5 !important;
	color: #fff;
	padding: 8px 14px 5px !important;
	border-radius: 12px;
	font-size: 12.6px;
	margin: 0;
	display: inline-block;
}
@media screen and (max-width: 767px) {
    .dataTables_length {
        margin: 0!important;
    }
    .dt-buttons button {
        font-size: 0!important;
    }
    #import {
        font-size: 0;
    }
    #import i {
        font-size: 15px;
        margin: 0!important;
    }
    #create {
        font-size: 0;
    }
    #create i{
        margin: 0!important;
    }
    .dt-buttons.btn-group.flex-wrap {
        flex-wrap: nowrap !important;
    }
    .dopp_tb {
      margin-bottom: 15px;
    }
    .dopp_tb i{
      margin: 0px!important;
    }
}
.user_typing_message_widget {
	position: absolute;
	background: transparent;
	left: 15px;
	bottom: 80px;
	color: green;
}
.user_typing_message_widget img {
	margin-right: 8px;
}
.typing {
  align-items: center;
  display: flex;
  height: 17px;
}
#chatUserAvatar + span {
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
</style>
