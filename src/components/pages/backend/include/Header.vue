<template>
  <nav
    class="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
    id="layout-navbar"
  >
    <div
      class="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none"
    >
      <a class="nav-item nav-link px-0 me-xl-4" data-bs-toggle="offcanvas" href="#dashboardSmallMenu" role="button" aria-controls="dashboardSmallMenu"  >
        <i class="ti ti-menu-2 ti-sm"></i>
      </a>
    </div>

    <div class="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
      <ul class="navbar-nav flex-row align-items-center ms-auto">
        <!-- Language -->
       <template v-if="role && role.name == 'Publisher' || role && role.name == 'Advertiser'">
          <span class="amount-badge mr-3"><i class="fas fa-cart-plus"></i> {{ role && role.name == 'Advertiser' ? 'Due' : '' }} {{ balance && balance.balance ?  balance.balance : '0.00'}}</span>
       </template>

        <template v-if="role && role.name == 'Super' || role && role.name == 'Admin'">
        <li  @click="sidebarLoader()" class="nav-item dropdown me-2 me-xl-0 position-relative" id="user_activities">
          <a href="javascript:" class="nav-link dropdown-toggle hide-arrow">
            <i class="menu-icon fa-solid fa-message fs-5"></i>
            <span id="countChats" class="badge bg-danger rounded-pill badge-notifications">{{ totalCountUser ?? '0' }}</span>
          </a>
          </li>
        </template>
        <template v-if="role && role.name == 'Super' || role && role.name == 'Admin'">
          <li class="nav-item dropdown me-2 me-xl-0" id="cookie_consents" >
          <RouterLink :to="'/dashboard-cookie-consents'" class="nav-link">
            <i class="fa-solid fa-cookie"></i>
            Cookie Consents
          </RouterLink>
          </li>
        </template>

        <template v-if="role && role.name == 'Super' || role && role.name == 'Admin'">
          <li class="nav-item dropdown me-2 me-xl-0" id="user_activities">
          <RouterLink :to="'/dashboard-user-activities'" class="nav-link">
            <i class="fa-solid fa-clock-rotate-left"></i>
            User Activities
          </RouterLink>
          </li>
        </template>

        <li class="nav-item dropdown me-2 me-xl-0" id="view_website">
          <a href="https://doppcall.com/" class="nav-link" target="_blank">
            <i class="fa-solid fa-globe"></i>
            View Website
          </a>
        </li>
        <!--/ Language -->


        <!-- Publisher Notification -->
        <template  v-if="role && role.name == 'Publisher'">
          <li class="nav-item dropdown-notifications navbar-dropdown dropdown me-3 me-xl-1">
          <a class="nav-link dropdown-toggle hide-arrow"  href="javascript:void(0);"  data-bs-toggle="dropdown"
            data-bs-auto-close="outside" aria-expanded="false">
            <i class="fa-regular fa-bell fa-md"></i>
            <span class="badge bg-danger rounded-pill badge-notifications">{{ unreadnotification  }}</span>
          </a>
          <ul class="dropdown-menu dropdown-menu-end py-0">
            <li class="dropdown-menu-header border-bottom">
              <div class="dropdown-header d-flex align-items-center justify-content-around py-3">
                <div>
                  <h5 class="text-body mb-0 me-auto">Notification</h5>
                  <p class="font-class">You have {{ unreadnotification  }} unread Notifications</p>
                </div>
                <button @click="markAllRead()" class="btn btn-sm btn-warning">Mark All Read</button>
              </div>
            </li>
            <li class="dropdown-notifications-list scrollable-container">
              <ul class="list-group list-group-flush">
                <template v-if="unreadallnotifications.length > 0">
                  <template v-for="(notific , index) in unreadallnotifications" :key="index">
                    <div v-if="notific.data.status == 'ticket_replay'">
                      <li class="list-group-item list-group-item-action dropdown-notifications-item">
                        <div class="d-flex">
                          <RouterLink :to="'/advertiser-support-ticket-view/'+notific.data.ticket_no" @click="viewNotification(notific.id)">
                            <div class="flex-grow-1">
                              <h6 class="mb-1 font-class" :class="notific.read_at == null ? 'noreadnotification' : ''">{{ notific.data.title }} {{ notific.data.ticket_no }}</h6>
                              <span class="badge badge-pill badge-info mr-2">Ticket Reply</span>
                              <small class="text-muted font-class"> {{ formatTime(notific.created_at) }}</small>
                            </div>
                          </RouterLink>
                        </div>
                      </li>
                    </div>
                
                    <div v-if="notific.data.status == 'campaign_approved'">
                      <li class="list-group-item list-group-item-action dropdown-notifications-item" >
                        <div class="d-flex">
                          <RouterLink :to="'/publisher-offer-campaigns-view/'+notific.data.campaign_id" @click="viewNotification(notific.id)">
                            <div class="flex-grow-1">
                              <h6 class="mb-1 font-class" :class="notific.read_at == null ? 'noreadnotification' : ''">{{ notific.data.campaign_name }}</h6>
                              <span class="badge badge-pill badge-info me-2">Campaign</span>
                              <small class="text-muted font-class"> {{ formatTime(notific.created_at) }}</small>
                            </div>
                          </RouterLink>
                        </div>
                      </li>
                    </div>
                    
                    <div v-if="notific.data.status == 'campaign'">
                      <li class="list-group-item list-group-item-action dropdown-notifications-item">
                        <div class="d-flex">
                          <RouterLink :to="'/publisher-create-view/'+notific.data.campaign_id" @click="viewNotification(notific.id)">
                          <div class="flex-grow-1">
                            <h6 class="mb-1 font-class" :class="notific.read_at == null ? 'noreadnotification' : ''">{{ notific.data.campaign_name }}</h6>
                            <span class="badge badge-pill badge-info me-2">Offer updated</span>
                            <small class="text-muted font-class"> {{ formatTime(notific.created_at) }}</small>
                          </div>
                        </RouterLink>
                        </div>
                      </li>
                    </div>
                    <div v-if="notific.data.status == 'payment'">
                      <li class="list-group-item list-group-item-action dropdown-notifications-item">
                        <div class="d-flex">
                          <RouterLink :to="'/publisher-payment-history'" @click="viewNotification(notific.id)">
                          <div class="flex-grow-1">
                            <h6 class="mb-1 font-class" :class="notific.read_at == null ? 'noreadnotification' : ''">{{ notific.data.payment_status }}</h6>
                            <span class="badge badge-pill badge-info me-2">Payment</span>
                            <small class="text-muted font-class"> {{ formatTime(notific.created_at) }}</small>
                          </div>
                        </RouterLink>
                        </div>
                      </li>
                    </div>
                  </template>
                </template>
              </ul>
            </li>
            <li class="dropdown-menu-footer border-top">
              <RouterLink :to="'/dashboard-view-notification'" class="dropdown-item d-flex justify-content-center text-primary p-2 h-px-40 mb-1 align-items-center"
              > View all notifications </RouterLink>
            </li>
          </ul>
        </li>
        </template>
        <!--/ Notification -->

        <!-- Advertiser Notification -->
        <template  v-if="role && role.name == 'Advertiser'">
          <li class="nav-item dropdown-notifications navbar-dropdown dropdown me-3 me-xl-1">
          <a class="nav-link dropdown-toggle hide-arrow"  href="javascript:void(0);"  data-bs-toggle="dropdown"
            data-bs-auto-close="outside" aria-expanded="false">
            <i class="fa-regular fa-bell fa-md"></i>
            <span class="badge bg-danger rounded-pill badge-notifications">{{ unreadnotification  }}</span>
          </a>
          <ul class="dropdown-menu dropdown-menu-end py-0">
            <li class="dropdown-menu-header border-bottom">
              <div class="dropdown-header d-flex align-items-center justify-content-around py-3">
                <div>
                  <h5 class="text-body mb-0 me-auto">Notification</h5>
                  <p class="font-class">You have {{ unreadnotification  }} unread Notifications</p>
                </div>
                <button @click="markAllRead()" class="btn btn-sm btn-warning">Mark All Read</button>
              </div>
            </li>
            <li class="dropdown-notifications-list scrollable-container">
              <ul class="list-group list-group-flush">
                <template v-if="unreadallnotifications.length > 0">
                  <template v-for="(notific , index) in unreadallnotifications" :key="index">
                    <div v-if="notific.data.status == 'ticket_replay'">
                      <li class="list-group-item list-group-item-action dropdown-notifications-item">
                        <div class="d-flex">
                          <RouterLink :to="'/advertiser-support-ticket-view/'+notific.data.ticket_no" @click="viewNotification(notific.id)">
                            <div class="flex-grow-1">
                              <h6 class="mb-1 font-class" :class="notific.read_at == null ? 'noreadnotification' : ''">{{ notific.data.title }} {{ notific.data.ticket_no }}</h6>
                              <span class="badge badge-pill badge-info mr-2">Ticket Reply</span>
                              <small class="text-muted font-class"> {{ formatTime(notific.created_at) }}</small>
                            </div>
                          </RouterLink>
                        </div>
                      </li>
                    </div>
                    <div v-if="notific.data.status == 'campaign'">
                      <li class="list-group-item list-group-item-action dropdown-notifications-item" >
                        <div class="d-flex">
                          <RouterLink :to="'/advertiser-campaigns-view/'+notific.data.campaign_id" @click="viewNotification(notific.id)">
                            <div class="flex-grow-1">
                              <h6 class="mb-1 font-class" :class="notific.read_at == null ? 'noreadnotification' : ''">{{ notific.data.campaign_name }}</h6>
                              <span class="badge badge-pill badge-info me-2">Campaign</span>
                              <small class="text-muted font-class"> {{ formatTime(notific.created_at) }}</small>
                            </div>
                          </RouterLink>
                        </div>
                      </li>
                    </div>
                    <div v-if="notific.data.status == 'advertiser_deposit'">
                      <li class="list-group-item list-group-item-action dropdown-notifications-item">
                        <div class="d-flex">
                          <RouterLink :to="'/advertiser-payment-history'" @click="viewNotification(notific.id)">
                          <div class="flex-grow-1">
                            <h6 class="mb-1 font-class" :class="notific.read_at == null ? 'noreadnotification' : ''">{{ notific.data.payment_method }}</h6>
                            <span class="badge badge-pill badge-info me-2">Due Payment</span>
                            <small class="text-muted font-class"> {{ formatTime(notific.created_at) }}</small>
                          </div>
                        </RouterLink>
                        </div>
                      </li>
                    </div>
                  </template>
                </template>
              </ul>
            </li>
            <li class="dropdown-menu-footer border-top">
              <RouterLink :to="'/dashboard-view-notification'" class="dropdown-item d-flex justify-content-center text-primary p-2 h-px-40 mb-1 align-items-center"
              > View all notifications </RouterLink>
            </li>
          </ul>
        </li>
        </template>
        <!--/ Notification -->

        <!-- Admin & Super Notification -->
        <template  v-if="role && role.name == 'Super' || role && role.name == 'Admin'">
          <li class="nav-item dropdown-notifications navbar-dropdown dropdown me-3 me-xl-1">
          <a class="nav-link dropdown-toggle hide-arrow"  href="javascript:void(0);"  data-bs-toggle="dropdown"
            data-bs-auto-close="outside" aria-expanded="false">
            <i class="fa-regular fa-bell fa-md"></i>
            <span class="badge bg-danger rounded-pill badge-notifications">{{ unreadnotification  }}</span>
          </a>
          <ul class="dropdown-menu dropdown-menu-end py-0">
            <li class="dropdown-menu-header border-bottom">
              <div class="dropdown-header d-flex align-items-center justify-content-around py-3">
                <div>
                  <h5 class="text-body mb-0 me-auto">Notification</h5>
                  <p class="font-class">You have {{ unreadnotification  }} unread Notifications</p>
                </div>
                <button @click="markAllRead()" class="btn btn-sm btn-warning">Mark All Read</button>
              </div>

              <div class="px-3">
                <div class="d-flex align-items-center mb-2" id="notification">
                   <button  class="btn btn-sm btn-secondary me-2" :class="activeColor == 'register' ? 'active' : ''" @click="changeActive('register')">Register {{ registerunread ?? 0 }}</button>
                   <button  class="btn btn-sm btn-secondary me-2" :class="activeColor == 'ticket' ? 'active' : ''" @click="changeActive('ticket')">Ticket {{ ticketunread ?? 0 }}</button>
                   <button  class="btn btn-sm btn-secondary me-2" :class="activeColor == 'campaign' ? 'active' : ''" @click="changeActive('campaign')">Campaign {{ campaignunread ?? 0 }}</button>
                </div>
                <div class="d-flex align-items-center mb-2" id="notification">
                  <button  class="btn btn-sm btn-secondary me-2" :class="activeColor == 'payments' ? 'active' : ''" @click="changeActive('payments')">Payment {{ paymentunread ?? 0 }}</button>
                  <button  class="btn btn-sm btn-secondary me-2" :class="activeColor == 'leads' ? 'active' : ''" @click="changeActive('leads')">Lead form {{ leadunread ?? 0 }}</button>
                </div>
              </div>
            </li>
            <li class="dropdown-notifications-list scrollable-container">
              <ul class="list-group list-group-flush">
                <template v-if="unreadallnotifications.length > 0">
                  <template v-for="(notific , index) in unreadallnotifications" :key="index">
                    <div v-if="notific.data.status == 'register'" :class="activeColor == 'register' ? 'active' : 'd-none'">
                      <li class="list-group-item list-group-item-action dropdown-notifications-item">
                        <div class="d-flex">
                        <template v-if="notific.data.role_id  == 2">
                          <RouterLink :to="'/admin-manage-advertiser-view/'+notific.data.user_id" @click="viewNotification(notific.id)">
                            <div class="flex-grow-1">
                              <h6 class="mb-1 font-class" :class="notific.read_at == null ? 'noreadnotification' : ''">{{ notific.data.campaign_name }}</h6>
                              <span class="badge badge-pill badge-info mr-2">Register</span>
                              <small class="text-muted font-class"> {{ formatTime(notific.created_at) }}</small>
                            </div>
                          </RouterLink>
                        </template>
                        <template v-else>
                          <RouterLink :to="'/admin-manage-publishers-view/'+notific.data.user_id" @click="viewNotification(notific.id)">
                            <div class="flex-grow-1">
                              <h6 class="mb-1 font-class" :class="notific.read_at == null ? 'noreadnotification' : ''">{{ notific.data.campaign_name }}</h6>
                              <span class="badge badge-pill badge-info mr-2">Register</span>
                              <small class="text-muted font-class"> {{ formatTime(notific.created_at) }}</small>
                            </div>
                          </RouterLink>
                        </template>
                        </div>
                      </li>
                    </div>
                    <div v-else-if="notific.data.status == 'ticket'"  :class="activeColor == 'ticket' ? 'active' : 'd-none'">
                      <li class="list-group-item list-group-item-action dropdown-notifications-item">
                        <div class="d-flex">
                          <RouterLink :to="'/admin-tickets-view/'+notific.data.ticket_no" @click="viewNotification(notific.id)">
                          <div class="flex-grow-1">
                            <h6 class="mb-1 font-class" :class="notific.read_at == null ? 'noreadnotification' : ''">{{ notific.data.campaign_name }}</h6>
                            <span class="badge badge-pill badge-info me-2">Ticket</span>
                            <small class="text-muted font-class"> {{ formatTime(notific.created_at) }}</small>
                          </div>
                        </RouterLink>
                        </div>
                      </li>
                    </div>
                    <div v-if="notific.data.status == 'campaign'" :class="activeColor == 'campaign' ? 'active' : 'd-none'">
                      <li class="list-group-item list-group-item-action dropdown-notifications-item" >
                        <div class="d-flex">
                          <RouterLink :to="'/admin-campaigns-view/'+notific.data.campaign_id" @click="viewNotification(notific.id)">
                            <div class="flex-grow-1">
                              <h6 class="mb-1 font-class" :class="notific.read_at == null ? 'noreadnotification' : ''">{{ notific.data.campaign_name }}</h6>
                              <span class="badge badge-pill badge-info me-2">Campaign</span>
                              <small class="text-muted font-class"> {{ formatTime(notific.created_at) }}</small>
                            </div>
                          </RouterLink>
                        </div>
                      </li>
                    </div>
                    <div v-if="notific.data.status == 'payment'" :class="activeColor == 'payments' ? 'active' : 'd-none'">
                      <li class="list-group-item list-group-item-action dropdown-notifications-item">
                        <div class="d-flex">
                          <RouterLink :to="'/admin-payment-system-publisher'" @click="viewNotification(notific.id)">
                          <div class="flex-grow-1">
                            <h6 class="mb-1 font-class" :class="notific.read_at == null ? 'noreadnotification' : ''">{{ notific.data.fname }}</h6>
                            <span class="badge badge-pill badge-info me-2">Payment</span>
                            <small class="text-muted font-class"> {{ formatTime(notific.created_at) }}</small>
                          </div>
                        </RouterLink>
                        </div>
                      </li>
                    </div>
                    <div v-if="notific.data.status == 'Lead_form'" :class="activeColor == 'leads' ? 'active' : 'd-none'">
                      <li class="list-group-item list-group-item-action dropdown-notifications-item" :class="notific.read_at != null ? 'noreadnotification' : ''">
                        <div class="d-flex">
                          <RouterLink :to="'/admin-leads'" @click="viewNotification(notific.id)">
                          <div class="flex-grow-1">
                            <h6 class="mb-1 font-class" :class="notific.read_at == null ? 'noreadnotification' : ''">{{ notific.data.company_name }}</h6>
                            <span class="badge badge-pill badge-info me-2">Medicare Insurance Leads</span>
                            <small class="text-muted font-class"> {{ formatTime(notific.created_at) }}</small>
                          </div>
                        </RouterLink>
                        </div>
                      </li>
                    </div>
                  </template>
                </template>
              </ul>
            </li>
            <li class="dropdown-menu-footer border-top">
              <RouterLink :to="'/dashboard-view-notification'" class="dropdown-item d-flex justify-content-center text-primary p-2 h-px-40 mb-1 align-items-center"
              > View all notifications </RouterLink>
            </li>
          </ul>
        </li>
        </template>
        <!--/ Notification -->

        <!-- User -->
        <li class="nav-item navbar-dropdown dropdown-user dropdown">
          <a
            class="nav-link dropdown-toggle hide-arrow"
            href="javascript:void(0);"
            data-bs-toggle="dropdown"
          >
            <div class="avatar avatar-online">
              <template v-if="user.avatar != null">
                <img :src="globalVariables.appUrl+user.avatar" alt  class="h-auto rounded-circle"/>
              </template>
              <template v-else>
                <img :src="globalVariables.appUrl+'images/user/user.png'" alt  class="h-auto rounded-circle"/>
              </template>
           </div>
          </a>
          <ul class="dropdown-menu dropdown-menu-end">
            <li>
              <a class="dropdown-item" href="javascript:">
                <div class="d-flex">
                  <div class="flex-shrink-0 me-3">
                    <div class="avatar avatar-online">
                    <template v-if="user.avatar != null">
                      <img :src="globalVariables.appUrl+user.avatar" alt  class="h-auto rounded-circle"/>
                    </template>
                    <template v-else>
                      <img :src="globalVariables.appUrl+'images/user/user.png'" alt  class="h-auto rounded-circle"/>
                    </template>
                    </div>
                  </div>
                  <div class="flex-grow-1">
                    <span class="fw-medium d-block">{{ user && user.fname }} {{  user && user.lname }}</span>
                    <small class="text-muted">{{ role && role.name }}</small>
                  </div>
                </div>
              </a>
              <div class="dropdown-divider"></div>
            </li>
            <li>
            <template v-if="role && role.name == 'Super' || role && role.name == 'Admin'">
              <RouterLink :to="'/dashboard-profile'" class="dropdown-item">
                <i class="fa-solid fa-user me-2"></i>
                <span class="align-middle">Profile</span>
              </RouterLink>
            </template>

            <template v-else-if="role && role.name == 'Publisher'">
               <RouterLink :to="'/publisher-account'" class="dropdown-item">
                <i class="fa-solid fa-user me-2"></i>
                <span class="align-middle">Profile</span>
              </RouterLink>
            </template>

            <template  v-else-if="role && role.name == 'Advertiser'">
              <RouterLink :to="'/advertiser-account'" class="dropdown-item">
                <i class="fa-solid fa-user me-2"></i>
                <span class="align-middle">Profile</span>
              </RouterLink>
            </template>

            <template  v-else-if="role && role.name == 'Account manager'">
              <RouterLink :to="'/account-profile'" class="dropdown-item" >
                <i class="fa-solid fa-user me-2"></i>
                <span class="align-middle">Profile</span>
              </RouterLink>
            </template>

            <template  v-if="adminId">
              <a href="javascript:" @click="goToDashboard()" class="dropdown-item d-flex align-items-center">
                <i class="fa-solid fa-gauge-high me-2 ti-sm"></i>
                <span class="align-middle">Go To Dashboard</span>
              </a>
            </template>
            </li>

            <li>
              <template v-if="role && role.name == 'Super' || role && role.name == 'Admin'">
                <RouterLink :to="'/admin-offers'" class="dropdown-item d-flex align-items-center">
                  <i class="menu-icon fa-brands fa-buffer"></i>
                  <span class="align-middle">All Offers</span>
                </RouterLink>
              </template>

              <template v-else-if="role && role.name == 'Publisher'">
                <RouterLink :to="'/publisher/offers'" class="dropdown-item d-flex align-items-center">
                  <i class="menu-icon fa-brands fa-buffer"></i>
                  <span class="align-middle">All Offers</span>
                </RouterLink>
              </template>

              <template  v-else-if="role && role.name == 'Advertiser'">
                <RouterLink :to="'/advertiser-offers'" class="dropdown-item d-flex align-items-center">
                  <i class="menu-icon fa-brands fa-buffer"></i>
                  <span class="align-middle">All Offers</span>
                </RouterLink>
              </template>

              <template  v-else-if="role && role.name == 'Account manager'">
                <RouterLink :to="'/account-tickets'" class="dropdown-item d-flex align-items-center">
                  <i class="menu-icon fa-solid fa-ticket"></i>
                  <span class="align-middle">Tickets</span>
                </RouterLink>
              </template>
            </li>

            <li>
              <template v-if="role && role.name == 'Super' || role && role.name == 'Admin'">
                <RouterLink :to="'/admin-campaigns-index'" class="dropdown-item d-flex align-items-center">
                  <i class="menu-icon fa-solid fa-circle-user"></i>
                  <span class="align-middle">Campaigns</span>
                </RouterLink>
              </template>

              <template v-else-if="role && role.name == 'Publisher'">
                <RouterLink :to="'/publisher-offer-campaigns'" class="dropdown-item d-flex align-items-center">
                  <i class="menu-icon fa-solid fa-circle-user"></i>
                  <span class="align-middle">Campaigns</span>
                </RouterLink>
              </template>

              <template  v-else-if="role && role.name == 'Account manager'">
                <RouterLink :to="'/account-campaigns'" class="dropdown-item d-flex align-items-center">
                  <i class="menu-icon fa-solid fa-circle-user"></i>
                  <span class="align-middle">Campaigns</span>
                </RouterLink>
              </template>
            </li>

            <li>
              <div class="dropdown-divider"></div>
            </li>
            <li>
              <template v-if="role && role.name == 'Super' || role && role.name == 'Admin'">
                <RouterLink :to="'/admin-faq-questions'" class="dropdown-item d-flex align-items-center">
                  <i class="menu-icon fa-regular fa-circle-question"></i>
                  <span class="align-middle">FAQ</span>
                </RouterLink>
              </template>

              <template v-else-if="role && role.name == 'Publisher'">
                <RouterLink :to="'/publisher-faq'" class="dropdown-item d-flex align-items-center">
                  <i class="menu-icon fa-regular fa-circle-question"></i>
                  <span class="align-middle">FAQ</span>
                </RouterLink>
              </template>

              <template  v-else-if="role && role.name == 'Advertiser'">
                <RouterLink :to="'/advertiser-faq'" class="dropdown-item d-flex align-items-center">
                  <i class="menu-icon fa-regular fa-circle-question"></i>
                  <span class="align-middle">FAQ</span>
                </RouterLink>
              </template>
            </li>
            <li>
              <a @click="logoutAction()" class="dropdown-item" aria-current="page" href="#">
                <i class="fa-solid fa-right-from-bracket me-2"></i>
                <span class="align-middle">Sign Out</span>
              </a>
            </li>
          </ul>
        </li>
        <!--/ User -->
      </ul>
    </div>  
  </nav>

<div class="offcanvas offcanvas-start" tabindex="-1" id="dashboardSmallMenu" aria-labelledby="dashboardSmallMenuLabel">
  <div class="offcanvas-header pb-3">
    <div class="app-brand demo align-items-center">
      <RouterLink :to="'/'" class="app-brand-link justify-content-center">
       <img class="dashboradLogo" :src="secoundary_logo" alt="">
      </RouterLink>
    </div>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body pt-0">
    <!-- Menu -->
  <aside>
    <div class="menu-inner-shadow"></div>
    <ul class="menu-inner d-block py-1">

      <!-- Dashboards -->
      <li class="menu-item" v-if="userRole == 'Super' || userRole == 'Admin'" :class="{ 'active': isExpandedSubMenu === 'dashboard' }" data-bs-dismiss="offcanvas" aria-label="Close">
        <RouterLink  to="/dashboard" class="menu-link" @click="toggleSubmenu('','dashboard')">
          <i class="menu-icon fa-solid fa-house-chimney"></i>
          <div data-i18n="dashboard">Dashboard</div>
        </RouterLink>
      </li>

      <!-- Manage Offers -->
      <li class="menu-item" :class="isExpanded === 'manage-offer' ? 'open' : ''" v-if="userRole == 'Super' || userRole == 'Admin'">
        <a href="javascript:void(0);" class="menu-link menu-toggle" @click="toggleAccordion('manage-offer')">
          <i class="menu-icon fa-brands fa-buffer"></i>
          <div data-i18n="manage-offer" class="mt-1">Manage Offers</div>
        </a>
        <ul class="menu-sub">
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'all-offer' }" data-bs-dismiss="offcanvas" aria-label="Close">
            <RouterLink :to="'/admin-offers'" class="menu-link" @click="toggleSubmenu('manage-offer','all-offer')" >
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="all_offers">All Offers</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'type' }" data-bs-dismiss="offcanvas" aria-label="Close">
            <RouterLink :to="'/admin-offers-types'" class="menu-link " @click="toggleSubmenu('manage-offer','type')" >
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="types">Types</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'categories' }" data-bs-dismiss="offcanvas" aria-label="Close"> 
            <RouterLink :to="'/admin-offers-categories'" class="menu-link" @click="toggleSubmenu('manage-offer','categories')">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="categories">Categories</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'allow_trafic' }" data-bs-dismiss="offcanvas" aria-label="Close">
            <RouterLink :to="'/admin-allow-traffic'" class="menu-link" @click="toggleSubmenu('manage-offer','allow_trafic')">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="allowed_traffic">Allowed Traffic</div>
            </RouterLink>
          </li>
        </ul>
      </li>

      <!-- Manage Offers -->
      <li class="menu-item" :class="isExpanded === 'campaigns' ? 'open' : ''" v-if="userRole == 'Super' || userRole == 'Admin'">
        <a href="javascript:void(0);" class="menu-link menu-toggle" @click="toggleAccordion('campaigns')">
          <i class="menu-icon fa-solid fa-circle-user"></i>
          <div data-i18n="campaigns" class="mt-1">Campaigns</div>
        </a>
        <ul class="menu-sub">
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'admin_campaigns' }" data-bs-dismiss="offcanvas" aria-label="Close">
            <RouterLink :to="'/admin-campaigns-index'" class="menu-link" @click="toggleSubmenu('campaigns','admin_campaigns')">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="admin_campaign">Admin Campaigns</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'user_campaigns' }" data-bs-dismiss="offcanvas" aria-label="Close">
            <RouterLink :to="'/admin-campaigns-user'" class="menu-link" @click="toggleSubmenu('campaigns','user_campaigns')">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="user_campaign">User Campaigns</div>
            </RouterLink>
          </li>
        </ul>
      </li>

      <!-- About -->
      <li class="menu-item" :class="isExpanded === 'about' ? 'open' : ''" v-if="userRole == 'Super' || userRole == 'Admin'">
        <a href="javascript:void(0);" class="menu-link menu-toggle" @click="toggleAccordion('about')">
          <i class="menu-icon fa-regular fa-address-card"></i>
          <div data-i18n="about" class="mt-1">About</div>
        </a>
        <ul class="menu-sub">
          <li class="menu-item"  :class="{ 'active': isExpandedSubMenu === 'differentiates' }" data-bs-dismiss="offcanvas" aria-label="Close">
            <RouterLink :to="'/admin-about-differentiates'" class="menu-link" @click="toggleSubmenu('about','differentiates')">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="differentiates">Differentiates</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'call_merketing' }" data-bs-dismiss="offcanvas" aria-label="Close">
            <RouterLink :to="'/admin-about-call-marketing'" class="menu-link" @click="toggleSubmenu('about','call_merketing')">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="call_marketing">Call Marketing</div>
            </RouterLink>
          </li>
        </ul>
      </li>

      <!-- Career -->
      <li class="menu-item" :class="isExpanded === 'career' ? 'open' : ''" v-if="userRole == 'Super' || userRole == 'Admin'">
        <a href="javascript:void(0);" class="menu-link menu-toggle" @click="toggleAccordion('career')">
          <i class="menu-icon fa-solid fa-circle-check"></i>
          <div data-i18n="career" class="mt-1">Career</div>
        </a>
        <ul class="menu-sub">
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'category' }" data-bs-dismiss="offcanvas" aria-label="Close">
            <RouterLink :to="'/admin-career-catagory'" class="menu-link" @click="toggleSubmenu('career','category')">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="category">Category</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'job_career' }" data-bs-dismiss="offcanvas" aria-label="Close">
            <RouterLink :to="'/admin-career-jobcareer'" class="menu-link" @click="toggleSubmenu('career','job_career')">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="job_career">Job Career</div>
            </RouterLink>
          </li>
        </ul>
      </li>

      <!-- Payments -->
      <li class="menu-item" :class="isExpanded === 'payments' ? 'open' : ''" v-if="userRole == 'Super' || userRole == 'Admin'">
        <a href="javascript:void(0);" class="menu-link menu-toggle" @click="toggleAccordion('payments')">
          <i class="menu-icon fa-solid fa-credit-card"></i>
          <div data-i18n="payments" class="mt-1">Payments</div>
        </a>
        <ul class="menu-sub">
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'publishers' }" data-bs-dismiss="offcanvas" aria-label="Close">
            <RouterLink :to="'/admin-payments-publishers'" class="menu-link" @click="toggleSubmenu('payments','publishers')">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="publishers">Publishers</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'advertisers' }" data-bs-dismiss="offcanvas" aria-label="Close">
            <RouterLink :to="'/admin-payments-advertisers'" class="menu-link" @click="toggleSubmenu('payments','advertisers')">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="advertisers">Advertisers</div>
            </RouterLink>
          </li>
        </ul>
      </li>

      <!-- Payment Info Settings -->
      <li class="menu-item" :class="isExpanded === 'payments_info_settings' ? 'open' : ''" v-if="userRole == 'Super' || userRole == 'Admin'">
        <a href="javascript:void(0);" class="menu-link menu-toggle" @click="toggleAccordion('payments_info_settings')">
          <i class="menu-icon fa-regular fa-money-bill-1"></i>
          <div data-i18n="payment_info_settings" class="mt-1">Payment Info Settings</div>
        </a>
        <ul class="menu-sub">
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'payments_info' }" data-bs-dismiss="offcanvas" aria-label="Close">
            <RouterLink :to="'/admin-payment-system-publisher'" class="menu-link" @click="toggleSubmenu('payments_info_settings','payments_info')">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="publisher_payment_info">Publisher Payment Info</div>
            </RouterLink>
          </li>
        </ul>
      </li>

      <!-- Platform Administration -->
      <li class="menu-item" :class="isExpanded === 'platform_administration' ? 'open' : ''" v-if="userRole == 'Super' || userRole == 'Admin'">
        <a href="javascript:void(0);" class="menu-link menu-toggle" @click="toggleAccordion('platform_administration')">
          <i class="menu-icon fa-regular fa-circle-user"></i>
          <div data-i18n="platform_administration" class="mt-1">
            Platform Administration
          </div>
        </a>
        <ul class="menu-sub">
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'administration' }" data-bs-dismiss="offcanvas" aria-label="Close">
            <RouterLink :to="'/admin-system-subscribes'" class="menu-link" @click="toggleSubmenu('platform_administration','administration')">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="subscriber">Subscriber</div>
            </RouterLink>
          </li>
        </ul>
      </li>

      <!-- Exports -->
      <li class="menu-item" :class="isExpanded === 'exports' ? 'open' : ''" v-if="userRole == 'Super' || userRole == 'Admin'">
        <a href="javascript:void(0);" class="menu-link menu-toggle" @click="toggleAccordion('exports')">
          <i class="menu-icon fa-regular fa-circle-down"></i>
          <div data-i18n="exports" class="mt-1">Exports</div>
        </a>
        <ul class="menu-sub">
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'users' }" data-bs-dismiss="offcanvas" aria-label="Close">
            <RouterLink :to="'/admin-export-users'" class="menu-link" @click="toggleSubmenu('exports','users')">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="users">Users</div>
            </RouterLink>
          </li>
        </ul>
      </li>

      <!-- Manage Users -->
      <li class="menu-item" :class="isExpanded === 'manage_users' ? 'open' : ''" v-if="userRole == 'Super' || userRole == 'Admin'">
        <a href="javascript:void(0);" class="menu-link menu-toggle" @click="toggleAccordion('manage_users')">
          <i class="menu-icon fa-regular fa-address-book"></i>
          <div data-i18n="manage_users" class="mt-1">Manage Users</div>
        </a>
        <ul class="menu-sub">
          <li class="menu-item"  :class="{ 'active': isExpandedSubMenu === 'doppcall_team' }" data-bs-dismiss="offcanvas" aria-label="Close">
            <RouterLink :to="'/admin-manage-doppcall-team'" class="menu-link" @click="toggleSubmenu('manage_users','doppcall_team')">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="doppcall_team">Doppcall Team</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'publishers' }" data-bs-dismiss="offcanvas" aria-label="Close">
            <RouterLink :to="'/admin-manage-publishers'" class="menu-link" @click="toggleSubmenu('manage_users','publishers')">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="publishers">Publishers</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'advertisers' }" data-bs-dismiss="offcanvas" aria-label="Close">
            <RouterLink :to="'/admin-manage-advertiser'" class="menu-link" @click="toggleSubmenu('manage_users','advertisers')">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="advertisers">Advertisers</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'add_new_user' }" data-bs-dismiss="offcanvas" aria-label="Close">
            <RouterLink :to="'/admin-manage-user-create'" class="menu-link" @click="toggleSubmenu('manage_users','add_new_user')">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="add_new_user">Add New User</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'invite_member' }" data-bs-dismiss="offcanvas" aria-label="Close">
            <RouterLink :to="'/admin-invite-member'" class="menu-link" @click="toggleSubmenu('manage_users','invite_member')">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="invite_member">Invite Member</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'trash' }" data-bs-dismiss="offcanvas" aria-label="Close">
            <RouterLink :to="'/admin-manage-user-trash'" class="menu-link" @click="toggleSubmenu('manage_users','trash')">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="trash">Trash</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'incompleted_reg' }">
            <RouterLink :to="'/admin-manage-user-incompleted-reg'" class="menu-link" @click="toggleSubmenu('manage_users','incompleted_reg')">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="incompleted_reg">Incompleted Reg</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'blocked_id' }">
            <RouterLink :to="'/admin-manage-user-blocked-ip'" class="menu-link" @click="toggleSubmenu('manage_users','blocked_id')">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="blocked_id">Blocked Ip</div>
            </RouterLink>
          </li>
        </ul>
      </li>

      <!-- Banner Management -->
      <li class="menu-item" :class="isExpanded === 'banner_management' ? 'open' : ''" v-if="userRole == 'Super' || userRole == 'Admin'">
        <a href="javascript:void(0);" class="menu-link menu-toggle" @click="toggleAccordion('banner_management')">
          <i class="menu-icon fa-solid fa-file-image"></i>
          <div data-i18n="banner_management" class="mt-1">Banner Management</div>
        </a>
        <ul class="menu-sub">
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'banner' }" data-bs-dismiss="offcanvas" aria-label="Close">
            <RouterLink :to="'/admin-banners'" class="menu-link" @click="toggleSubmenu('banner_management','banner')">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="banner">Banner</div>
            </RouterLink>
          </li>
        </ul>
      </li>

      <!-- Notice -->
      <li :class="{ 'active': isExpandedSubMenu === 'admin_notice' }" class="menu-item" v-if="userRole == 'Super' || userRole == 'Admin'" data-bs-dismiss="offcanvas" aria-label="Close">
        <RouterLink  :to="'/admin-notice'" class="menu-link"  @click="toggleSubmenu('','admin_notice')">
          <i class="menu-icon fa-solid fa-newspaper"></i>
          <div data-i18n="notice">Notice</div>
        </RouterLink>
      </li>

      <!-- Rules -->
      <li :class="{ 'active': isExpandedSubMenu === 'admin_rules' }" class="menu-item" v-if="userRole == 'Super' || userRole == 'Admin'" data-bs-dismiss="offcanvas" aria-label="Close">
        <RouterLink  :to="'/admin-rules'" class="menu-link"  @click="toggleSubmenu('','admin_rules')">
          <i class="menu-icon fa-brands fa-ravelry"></i>
          <div data-i18n="rules">Rules</div>
        </RouterLink>
      </li>

      <!--  Industrial Contacts -->
      <li :class="{ 'active': isExpandedSubMenu === 'industrial_contacts' }" class="menu-item" v-if="userRole == 'Super' || userRole == 'Admin'" data-bs-dismiss="offcanvas" aria-label="Close">
        <RouterLink :to="'/admin-industrial-contacts'" class="menu-link" @click="toggleSubmenu('','industrial_contacts')">
          <i class="menu-icon fa-solid fa-address-book"></i>
          <div data-i18n="industrial_contacts">Industrial Contacts</div>
        </RouterLink>
      </li>

      <li class="menu-header small text-uppercase" v-if="userRole == 'Super' || userRole == 'Admin'">
        <span class="menu-header-text" data-i18n="Support Panel">Support Panel</span>
      </li>

      <!-- Support Tickets -->
      <li class="menu-item" :class="isExpanded === 'support_tickets' ? 'open' : ''" v-if="userRole == 'Super' || userRole == 'Admin'">
        <a href="javascript:void(0);" class="menu-link menu-toggle" @click="toggleAccordion('support_tickets')">
          <i class="menu-icon fa-solid fa-calendar-check"></i>
          <div data-i18n="support_tickets" class="mt-1">Support Tickets</div>
        </a>
        <ul class="menu-sub">
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'subjects' }" data-bs-dismiss="offcanvas" aria-label="Close">
            <RouterLink :to="'/admin-tickets-subjects'" class="menu-link" @click="toggleSubmenu('support_tickets','subjects')">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="subjects">Subjects</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'tickets' }" data-bs-dismiss="offcanvas" aria-label="Close">
            <RouterLink :to="'/admin-tickets'" class="menu-link" @click="toggleSubmenu('support_tickets','tickets')">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="tickets">Tickets</div>
            </RouterLink>
          </li>
        </ul>
      </li>

      <!-- Live Chats -->
      <li class="menu-item" :class="isExpanded === 'chat' ? 'open' : ''" v-if="userRole == 'Super' || userRole == 'Admin'">
        <a href="javascript:void(0);" class="menu-link menu-toggle" @click="toggleAccordion('chat')">
          <i class="menu-icon fa-solid fa-message"></i>
          <div data-i18n="chat" class="mt-1">Chat</div>
        </a>
        <ul class="menu-sub">
          <li @click="sidebarLoader()" :class="{ 'active': isExpandedSubMenu === 'live_chat' }" class="menu-item" v-if="userRole == 'Super' || userRole == 'Admin'">
            <a  href="javascript:" class="menu-link" @click="toggleSubmenu('chat','live_chat')">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="live_chat">Live Chat {{ '( ' + (totalCountUser || '0') + ' )' }}
              </div>
            </a> 
          </li>

          <li :class="{ 'active': isExpandedSubMenu === 'public_visitors' }" class="menu-item" v-if="userRole == 'Super' || userRole == 'Admin'">
            <RouterLink :to="'/admin-live-chat-leads'" class="menu-link" @click="toggleSubmenu('chat','public_visitors')">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="public_visitors">Live Chat Leads</div>
            </RouterLink>
          </li>
          <li :class="{ 'active': isExpandedSubMenu === 'chat_logs' }" class="menu-item" v-if="userRole == 'Super' || userRole == 'Admin'">
          <RouterLink :to="'/admin-chats-logs'" class="menu-link" @click="toggleSubmenu('chat','chat_logs')">
            <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
            <div data-i18n="chat_logs">Chat Logs</div>
          </RouterLink>
        </li>
        </ul>
      </li>
      <!-- Email Logs -->
      <li  :class="{ 'active': isExpandedSubMenu === 'email_log' }" class="menu-item" v-if="userRole == 'Super' || userRole == 'Admin'" data-bs-dismiss="offcanvas" aria-label="Close">
        <RouterLink :to="'/admin-emails'" class="menu-link" @click="toggleSubmenu('','email_log')">
          <i class="menu-icon fa-regular fa-envelope"></i>
          <div data-i18n="email_log">Email log</div>
        </RouterLink>
      </li>

      <li class="menu-header small text-uppercase" v-if="userRole == 'Super' || userRole == 'Admin'">
        <span class="menu-header-text" data-i18n="Frontend CMS">Frontend CMS</span>
      </li>

      <!--  Appearance -->
      <li class="menu-item" :class="isExpanded === 'appearance' ? 'open' : ''" v-if="userRole == 'Super' || userRole == 'Admin'">
        <a href="javascript:void(0);" class="menu-link menu-toggle" @click="toggleAccordion('appearance')">
          <i class="menu-icon fa-regular fa-pen-to-square"></i>
          <div data-i18n="appearance" class="mt-1">Appearance</div>
        </a>
        <ul class="menu-sub">
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'theme_settings' }" data-bs-dismiss="offcanvas" aria-label="Close">
            <RouterLink :to="'/admin-appearance-theme-settings'" class="menu-link"  @click="toggleSubmenu('appearance','theme_settings')">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="theme_settings">Theme Settings</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'partner_settings' }" data-bs-dismiss="offcanvas" aria-label="Close">
            <RouterLink :to="'/admin-appearance-partner-settings'" class="menu-link"  @click="toggleSubmenu('appearance','partner_settings')">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="partner_settings">Partner Settings</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'lead_method' }" data-bs-dismiss="offcanvas" aria-label="Close">
            <RouterLink :to="'/admin-appearance-leadmethod'" class="menu-link"  @click="toggleSubmenu('appearance','lead_method')">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="lead_method">Lead Method</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'how_to_work' }" data-bs-dismiss="offcanvas" aria-label="Close">
            <RouterLink :to="'/admin-appearance-howtowork'" class="menu-link"  @click="toggleSubmenu('appearance','how_to_work')">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="how_to_work">How To Work</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'count_down' }" data-bs-dismiss="offcanvas" aria-label="Close">
            <RouterLink :to="'/admin-appearance-countdown'" class="menu-link"  @click="toggleSubmenu('appearance','count_down')">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="count_down">Count Down</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'professional_agency' }" data-bs-dismiss="offcanvas" aria-label="Close">
            <RouterLink :to="'/admin-appearance-professional-agency'" class="menu-link"  @click="toggleSubmenu('appearance','professional_agency')">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="professional_agency">Professional Agency</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'hero_breadcrumb' }" data-bs-dismiss="offcanvas" aria-label="Close">
            <RouterLink :to="'/admin-appearance-hero-breadcrumb'" class="menu-link"  @click="toggleSubmenu('appearance','hero_breadcrumb')">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="hero_breadcrumb">Hero Breadcrumb</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'custom_CSS' }" data-bs-dismiss="offcanvas" aria-label="Close">
            <RouterLink :to="'/admin-appearance-custom-css'" class="menu-link"  @click="toggleSubmenu('appearance','custom_CSS')">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i> 
              <div data-i18n="custom_CSS">Custom CSS</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'custom_JS' }" data-bs-dismiss="offcanvas" aria-label="Close">
            <RouterLink :to="'/admin-appearance-custom-js'" class="menu-link"  @click="toggleSubmenu('appearance','custom_JS')">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="custom_JS">Custom JS</div>
            </RouterLink>
          </li>
        </ul>
      </li>

      <!--Leads-->
      <li class="menu-item" v-if="userRole == 'Super' || userRole == 'Admin'" :class="{ 'active': isExpandedSubMenu === 'leads' }" data-bs-dismiss="offcanvas" aria-label="Close">
        <RouterLink :to="'/admin-leads'" class="menu-link" @click="toggleSubmenu('','leads')">
          <i class="menu-icon fa-solid fa-floppy-disk"></i>
          <div data-i18n="leads">Leads</div>
        </RouterLink>
      </li>

      <!--Pages-->
      <li class="menu-item" v-if="userRole == 'Super' || userRole == 'Admin'" :class="{ 'active': isExpandedSubMenu === 'pages' }" data-bs-dismiss="offcanvas" aria-label="Close">
        <RouterLink :to="'/admin-pages'" class="menu-link" @click="toggleSubmenu('','pages')">
          <i class="menu-icon fa-regular fa-file"></i>
          <div data-i18n="pages">Pages</div>
        </RouterLink>
      </li>

      <!--Menus-->
      <li class="menu-item" v-if="userRole == 'Super' || userRole == 'Admin'" :class="{ 'active': isExpandedSubMenu === 'menus' }" data-bs-dismiss="offcanvas" aria-label="Close">
        <RouterLink :to="'/admin-menus'" class="menu-link" @click="toggleSubmenu('','menus')">
          <i class="menu-icon fa-solid fa-bars"></i>
          <div data-i18n="menus">Menus</div>
        </RouterLink>
      </li>

      <!-- FAQ -->
      <li class="menu-item" :class="isExpanded === 'faq' ? 'open' : ''" v-if="userRole == 'Super' || userRole == 'Admin'" >
        <a href="javascript:void(0);" class="menu-link menu-toggle" @click="toggleAccordion('faq')">
          <i class="menu-icon fa-solid fa-question"></i>
          <div data-i18n="faq" class="mt-1">FAQ</div>
        </a>
        <ul class="menu-sub">
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'services' }" data-bs-dismiss="offcanvas" aria-label="Close">
            <RouterLink :to="'/admin-faq-services'" class="menu-link" @click="toggleSubmenu('faq','services')">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="services">Services</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'questions' }" data-bs-dismiss="offcanvas" aria-label="Close">
            <RouterLink :to="'/admin-faq-questions'" class="menu-link" @click="toggleSubmenu('faq','questions')">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="questions">Questions</div>
            </RouterLink>
          </li>
        </ul>
      </li>

      <!-- Blogs -->
      <li class="menu-item" :class="isExpanded === 'blogs' ? 'open' : ''" v-if="userRole == 'Super' || userRole == 'Admin'">
        <a href="javascript:void(0);" class="menu-link menu-toggle" @click="toggleAccordion('blogs')">
          <i class="menu-icon fa-brands fa-blogger-b"></i>
          <div data-i18n="blog" class="mt-1">Blog</div>
        </a>
        <ul class="menu-sub">
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'categories' }" data-bs-dismiss="offcanvas" aria-label="Close">
            <RouterLink :to="'/admin-blog-categories'" class="menu-link" @click="toggleSubmenu('blogs','categories')">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="categories">Categories</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'posts' }" data-bs-dismiss="offcanvas" aria-label="Close">
            <RouterLink :to="'/admin-blog-posts'" class="menu-link" @click="toggleSubmenu('blogs','posts')">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="posts">Posts</div>
            </RouterLink>
          </li>
        </ul>
      </li>

    <!-- Comments -->
      <li class="menu-item" v-if="userRole == 'Super' || userRole == 'Admin'" :class="{ 'active': isExpandedSubMenu === 'comments' }" data-bs-dismiss="offcanvas" aria-label="Close">
        <RouterLink :to="'/admin-comments'" class="menu-link" @click="toggleSubmenu('','comments')">
          <i class="menu-icon fa-regular fa-comment"></i>
          <div data-i18n="comments">Comments</div>
        </RouterLink>
      </li>

      <!-- Contact -->
      <li class="menu-item" :class="isExpanded === 'contacts' ? 'open' : ''" v-if="userRole == 'Super' || userRole == 'Admin'">
        <a href="javascript:void(0);" class="menu-link menu-toggle" @click="toggleAccordion('contacts')">
          <i class="menu-icon fa-regular fa-address-card"></i>
          <div data-i18n="contact" class="mt-1">Contact</div>
        </a>
        <ul class="menu-sub">
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'all_contact' }" data-bs-dismiss="offcanvas" aria-label="Close">
            <RouterLink :to="'/admin-contacts'" class="menu-link" @click="toggleSubmenu('contacts','all_contact')">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="all_contact">All Contact</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'manage_industry_verticals' }" data-bs-dismiss="offcanvas" aria-label="Close">
            <RouterLink :to="'/admin-contacts-industry-verticals'" class="menu-link" @click="toggleSubmenu('contacts','manage_industry_verticals')">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="manage_industry_verticals">Manage Industry Verticals</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'manage_find_us' }" data-bs-dismiss="offcanvas" aria-label="Close">
            <RouterLink :to="'/admin-contacts-find-us'" class="menu-link" @click="toggleSubmenu('contacts','manage_find_us')">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="manage_find_us">Manage Find Us</div>
            </RouterLink>
          </li>
        </ul>
      </li>

      <!-- Setting -->
      <li class="menu-item" :class="isExpanded === 'setting' ? 'open' : ''" v-if="userRole == 'Super' || userRole == 'Admin'">
        <a href="javascript:void(0);" class="menu-link menu-toggle" @click="toggleAccordion('setting')">
          <i class="menu-icon fa-solid fa-gear"></i>
          <div data-i18n="setting" class="mt-1">Settings</div>
        </a>
        <ul class="menu-sub">
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'generals' }" data-bs-dismiss="offcanvas" aria-label="Close">
            <RouterLink :to="'/admin-settings-generals'" class="menu-link" @click="toggleSubmenu('setting','generals')">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="generals">Generals</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'balance_limit' }" data-bs-dismiss="offcanvas" aria-label="Close">
            <RouterLink :to="'/admin-settings-balance-limit'" class="menu-link" @click="toggleSubmenu('setting','balance_limit')">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="balance_limit">Balance Limit</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'mail_configure' }" data-bs-dismiss="offcanvas" aria-label="Close">
            <RouterLink :to="'/admin-settings-mail-configure'" class="menu-link" @click="toggleSubmenu('setting','mail_configure')">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="mail_configure">Mail Configure</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'smtp_setup' }" data-bs-dismiss="offcanvas" aria-label="Close">
            <RouterLink :to="'/admin-settings-smtp-configure'" class="menu-link" @click="toggleSubmenu('setting','smtp_setup')">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="smtp_setup">Smtp Setup</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'email_template' }" data-bs-dismiss="offcanvas" aria-label="Close">
            <RouterLink :to="'/admin-settings-email-template'" class="menu-link" @click="toggleSubmenu('setting','email_template')">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="email_template">Email Template</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'media' }" data-bs-dismiss="offcanvas" aria-label="Close">
            <RouterLink :to="'/admin-settings-media'" class="menu-link" @click="toggleSubmenu('setting','media')">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="media">Media</div>
            </RouterLink>
          </li>
        </ul>
      </li>


    <!-- Publisher Dashboard Start -->
    <li class="menu-header small text-uppercase" v-if="userRole == 'Publisher'">
        <span class="menu-header-text" data-i18n="Main">Main</span>
    </li>

    <!-- Dashboards -->
    <li class="menu-item" v-if="userRole == 'Publisher'" :class="{ 'active': isExpandedSubMenu === 'dashboard' }" data-bs-dismiss="offcanvas" aria-label="Close">
        <RouterLink  to="/publisher/dashboard" class="menu-link" @click="toggleSubmenu('','dashboard')">
          <i class="menu-icon fa-solid fa-house-chimney"></i>
          <div data-i18n="dashboard">Dashboard</div>
        </RouterLink>
    </li>

    <!-- Manage Offers -->
    <li class="menu-item" :class="isExpanded === 'manage-offer' ? 'open' : ''" v-if="userRole == 'Publisher'">
        <a href="javascript:void(0);" class="menu-link menu-toggle" @click="toggleAccordion('manage-offer')">
          <i class="menu-icon fa-brands fa-buffer"></i>
          <div data-i18n="offer" class="mt-1">Offers</div>
        </a>
        <ul class="menu-sub">
          <template v-if="userData.is_email_verified != null">
            <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'all_offers' }" data-bs-dismiss="offcanvas" aria-label="Close">
              <RouterLink :to="'/publisher/offers'" class="menu-link" @click="toggleSubmenu('manage-offer','all_offers')">
                <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
                <div data-i18n="all_offers">All Offers</div>
              </RouterLink>
            </li>
          </template>
          <template v-else>
            <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'all-offer' }" data-bs-dismiss="offcanvas" aria-label="Close">
              <a href="javascript:" @click="showErrorMessage()" class="menu-link">
                <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
                <div data-i18n="all_offers">All Offers</div>
              </a>
            </li>
          </template>
         
          <template v-if="offerCategories">
            <li class="menu-item"  v-for="(value,index) in  offerCategories" :class="{ 'active': isExpandedSubMenu === index }" data-bs-dismiss="offcanvas" aria-label="Close">
            <template v-if="userData.is_email_verified != null">
              <RouterLink :to="'/publisher-offer-category/'+value.id" class="menu-link" @click="toggleSubmenu('manage-offer',index)">
                <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div :data-i18n="value.name">{{ value.name }}</div>
              </RouterLink>
            </template>
            <template v-else>
              <a href="javascript:" @click="showErrorMessage()" class="menu-link">
                <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div :data-i18n="value.name">{{ value.name }}</div>
              </a>
            </template>
          </li>
          </template>
        </ul>
    </li>

    <li class="menu-item" v-if="userRole == 'Publisher'" :class="{ 'active': isExpandedSubMenu === 'my_campaigns' }" data-bs-dismiss="offcanvas" aria-label="Close">
      <template v-if="userData.is_email_verified != null">
        <RouterLink  to="/publisher-offer-campaigns" class="menu-link" @click="toggleSubmenu('','my_campaigns')">
          <i class="menu-icon fa-solid fa-circle-user"></i>
            <div data-i18n="my_campaigns">My Campaigns</div>
          </RouterLink>
      </template>
      <template v-else>
        <a href="javascript:" @click="showErrorMessage()" class="menu-link">
          <i class="menu-icon fa-solid fa-circle-user"></i>
            <div data-i18n="my_campaigns">My Campaigns</div>
          </a>
      </template>
    </li>

    <li class="menu-item" v-if="userRole == 'Publisher'" :class="{ 'active': isExpandedSubMenu === 'login_to_ringba' }" data-bs-dismiss="offcanvas" aria-label="Close">
      <template v-if="userData.is_email_verified != null"> 
        <RouterLink  to="/publisher-login-ringba" class="menu-link" @click="toggleSubmenu('','login_to_ringba')">
            <i class="menu-icon tf-icons fas fa-user-plus"></i>
            <div data-i18n="login_to_ringba">Login To Ringba</div>
          </RouterLink>
      </template>
      <template v-else> 
        <a  href="javascript:" @click="showErrorMessage()" class="menu-link">
            <i class="menu-icon tf-icons fas fa-user-plus"></i>
            <div data-i18n="login_to_ringba">Login To Ringba</div>
          </a>
      </template>
    </li>

    <li class="menu-header small text-uppercase" v-if="userRole == 'Publisher'">
        <span class="menu-header-text" data-i18n="Info">Info</span>
    </li>

    <li class="menu-item" v-if="userRole == 'Publisher'" :class="{ 'active': isExpandedSubMenu === 'pay_per_call_guides' }" data-bs-dismiss="offcanvas" aria-label="Close">
      <template v-if="userData.is_email_verified != null">
        <RouterLink  to="/publisher-pay-par-guide" class="menu-link" @click="toggleSubmenu('','pay_per_call_guides')">
            <i class="menu-icon tf-icons fas fa-rss"></i>
            <div data-i18n="pay_per_call_guides">Pay Per Call Guides</div>
          </RouterLink>
      </template>
      <template v-else>
        <a href="javascript:" @click="showErrorMessage()" class="menu-link">
            <i class="menu-icon tf-icons fas fa-rss"></i>
            <div data-i18n="pay_per_call_guides">Pay Per Call Guides</div>
          </a>
      </template>
    </li>

    <li class="menu-item" v-if="userRole == 'Publisher'" :class="{ 'active': isExpandedSubMenu === 'notices' }" data-bs-dismiss="offcanvas" aria-label="Close">
      <template v-if="userData.is_email_verified != null">
        <RouterLink  to="/publisher-notice" class="menu-link" @click="toggleSubmenu('','notices')">
            <i class="menu-icon tf-icons fas fa-newspaper"></i>
            <div data-i18n="notices">Notices</div>
          </RouterLink>
      </template>
      <template v-else>
        <a  href="javascript:" @click="showErrorMessage()" class="menu-link">
            <i class="menu-icon tf-icons fas fa-newspaper"></i>
            <div data-i18n="notices">Notices</div>
          </a>
      </template>
    </li>

    <li class="menu-item" v-if="userRole == 'Publisher'" :class="{ 'active': isExpandedSubMenu === 'rules' }" data-bs-dismiss="offcanvas" aria-label="Close">
      <template v-if="userData.is_email_verified != null">
        <RouterLink  to="/publisher-rules" class="menu-link" @click="toggleSubmenu('','rules')">
            <i class="menu-icon tf-icons fab fa-telegram-plane"></i>
            <div data-i18n="rules">Rules</div>
          </RouterLink>
      </template>
      <template v-else>
        <a href="javascript:" @click="showErrorMessage()" class="menu-link">
            <i class="menu-icon tf-icons fab fa-telegram-plane"></i>
            <div data-i18n="rules">Rules</div>
          </a>
      </template>
    </li>
    
    <li class="menu-item" v-if="userRole == 'Publisher'" :class="{ 'active': isExpandedSubMenu === 'FAQ' }" data-bs-dismiss="offcanvas" aria-label="Close">
      <template v-if="userData.is_email_verified != null">
        <RouterLink  to="/publisher-faq" class="menu-link" @click="toggleSubmenu('','FAQ')">
            <i class="menu-icon tf-icons fas fa-question-circle"></i>
            <div data-i18n="FAQ">FAQ</div>
          </RouterLink>
      </template>
      <template v-else>
        <a  href="javascript:" @click="showErrorMessage()" class="menu-link">
            <i class="menu-icon tf-icons fas fa-question-circle"></i>
            <div data-i18n="FAQ">FAQ</div>
          </a>
      </template>
    </li>


    <li class="menu-header small text-uppercase" v-if="userRole == 'Publisher'">
        <span class="menu-header-text" data-i18n="My_Account">my account</span>
    </li>

    <li class="menu-item" v-if="userRole == 'Publisher'" :class="{ 'active': isExpandedSubMenu === 'my_account' }" data-bs-dismiss="offcanvas" aria-label="Close">
      <template  v-if="userData.is_email_verified != null">
        <RouterLink  to="/publisher-account" class="menu-link" @click="toggleSubmenu('','my_account')">
            <i class="menu-icon tf-icons fas fa-user-circle"></i>
            <div data-i18n="my_account">My Account</div>
          </RouterLink>
      </template>
      <template  v-else>
        <a  href="javascript:" @click="showErrorMessage()" class="menu-link">
            <i class="menu-icon tf-icons fas fa-user-circle"></i>
            <div data-i18n="my_account">My Account</div>
          </a>
      </template>
    </li>

    <li class="menu-item" v-if="userRole == 'Publisher'" :class="{ 'active': isExpandedSubMenu === 'payment_history' }" data-bs-dismiss="offcanvas" aria-label="Close">
      <template  v-if="userData.is_email_verified != null">
        <RouterLink  to="/publisher-payment-history" class="menu-link" @click="toggleSubmenu('','payment_history')">
            <i class="menu-icon tf-icons fas fas fa-shopping-basket"></i>
            <div data-i18n="payment_history">Payment History</div>
          </RouterLink>
      </template>
      <template  v-else>
        <a href="javascript:" @click="showErrorMessage()" class="menu-link">
            <i class="menu-icon tf-icons fas fas fa-shopping-basket"></i>
            <div data-i18n="payment_history">Payment History</div>
          </a>
      </template>
    </li>

    <li class="menu-header small text-uppercase" v-if="userRole == 'Publisher'">
        <span class="menu-header-text" data-i18n="Support_Ticket">Support Ticket</span>
    </li>

    <!-- Support Tickets -->
    <li class="menu-item" :class="isExpanded === 'support_tickets' ? 'open' : ''" v-if="userRole == 'Publisher'">
        <a href="javascript:void(0);" class="menu-link menu-toggle" @click="toggleAccordion('support_tickets')">
          <i class="menu-icon fa-solid fa-calendar-check"></i>
          <div data-i18n="support_tickets" class="mt-1">Support</div>
        </a>
        <ul class="menu-sub">
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'all_tickets' }" data-bs-dismiss="offcanvas" aria-label="Close">
            <template  v-if="userData.is_email_verified != null">
              <RouterLink :to="'/publisher-support-tickets'" class="menu-link" @click="toggleSubmenu('support_tickets','all_tickets')">
                <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
                <div data-i18n="all_tickets">All Tickets</div>
              </RouterLink>
            </template>
            <template  v-else>
              <a href="javascript:" @click="showErrorMessage()" class="menu-link">
                <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
                <div data-i18n="all_tickets">All Tickets</div>
              </a>
            </template>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'create_new_ticket' }" data-bs-dismiss="offcanvas" aria-label="Close">
            <template  v-if="userData.is_email_verified != null">
              <RouterLink :to="'/publisher-support-ticket-create'" class="menu-link"  @click="toggleSubmenu('support_tickets','create_new_ticket')">
                <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
                <div data-i18n="create_new_ticket">Create New Ticket</div>
              </RouterLink>
            </template>
            <template  v-else>
              <a href="javascript:" @click="showErrorMessage()" class="menu-link">
                <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
                <div data-i18n="create_new_ticket">Create New Ticket</div>
              </a>
            </template>
          </li>
          <li class="menu-item">
            <template  v-if="userData.is_email_verified != null">
              <a :href="'skype:'+skype_config" class="menu-link">
                <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
                <div data-i18n="liveskype_support">Live Skype Support</div>
              </a>
            </template>
            <template  v-else>
              <a href="javascript:" @click="showErrorMessage()"class="menu-link">
                <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
                <div data-i18n="liveskype_support">Live Skype Support</div>
              </a>
            </template>
          </li>

          <li class="menu-item">
          <template  v-if="userData.is_email_verified != null">
            <a href="mailto:info@doppcall.com" class="menu-link">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="email_support">Email Support</div>
            </a>
          </template>
          <template  v-else>
            <a href="javascript:" @click="showErrorMessage()" class="menu-link">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="email_support">Email Support</div>
            </a>
          </template>
          </li>
        </ul>
      </li>

    <!-- Publisher Dashboard End -->




    <!-- Advertiser Dashboard Start -->
    <li class="menu-header small text-uppercase" v-if="userRole == 'Advertiser'">
        <span class="menu-header-text" data-i18n="Main">Dashboard</span>
    </li>

    <!-- Dashboards -->
    <li class="menu-item" v-if="userRole == 'Advertiser'" :class="{ 'active': isExpandedSubMenu === 'dashboard' }" data-bs-dismiss="offcanvas" aria-label="Close">
        <RouterLink  to="/advertiser/dashboard" class="menu-link" @click="toggleSubmenu('','dashboard')">
          <i class="menu-icon fa-solid fa-house-chimney"></i>
          <div data-i18n="dashboard">Dashboard</div>
        </RouterLink>
    </li>

    <!-- Manage Offers -->
    <li class="menu-item" :class="isExpanded === 'manage-offer' ? 'open' : ''" v-if="userRole == 'Advertiser'">
        <a href="javascript:void(0);" class="menu-link menu-toggle" @click="toggleAccordion('manage-offer')">
          <i class="menu-icon fa-brands fa-buffer"></i>
          <div data-i18n="offer" class="mt-1">Offers</div>
        </a>
        <ul class="menu-sub">
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'all-offer' }" data-bs-dismiss="offcanvas" aria-label="Close">
            <RouterLink :to="'/advertiser-offers'" class="menu-link" @click="toggleSubmenu('manage-offer','all_offers')">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="all_offers">All Offers</div>
            </RouterLink>
          </li>
        </ul>
    </li>

    <!-- Login To Ringba -->
    <li class="menu-item" v-if="userRole == 'Advertiser'" :class="{ 'active': isExpandedSubMenu === 'login_to_ringba' }" data-bs-dismiss="offcanvas" aria-label="Close">
        <RouterLink  to="/advertiser-login-ringba" class="menu-link" @click="toggleSubmenu('','login_to_ringba')">
          <i class="menu-icon tf-icons fas fa-user-plus"></i>
          <div data-i18n="login_to_ringba">Login To Ringba</div>
        </RouterLink>
    </li>

    <!-- Info  -->
    <li class="menu-header small text-uppercase" v-if="userRole == 'Advertiser'">
        <span class="menu-header-text" data-i18n="Info">Info</span>
    </li>

    <!-- Pay Per Call Guides -->
    <li class="menu-item" v-if="userRole == 'Advertiser'" :class="{ 'active': isExpandedSubMenu === 'pay_per_call_guides' }" data-bs-dismiss="offcanvas" aria-label="Close">
        <RouterLink  to="/advertiser-pay-per-call" class="menu-link" @click="toggleSubmenu('','pay_per_call_guides')">
          <i class="menu-icon tf-icons fas fa-rss"></i>
          <div data-i18n="pay_per_call_guides">Pay Per Call Guides</div>
        </RouterLink>
    </li>

    <!-- Notices -->
    <li class="menu-item" v-if="userRole == 'Advertiser'" :class="{ 'active': isExpandedSubMenu === 'notices' }" data-bs-dismiss="offcanvas" aria-label="Close">
        <RouterLink  to="/advertiser-notices" class="menu-link"  @click="toggleSubmenu('','notices')">
          <i class="menu-icon tf-icons fas fa-newspaper"></i>
          <div data-i18n="notices">Notices</div>
        </RouterLink>
    </li>

    <!-- Rules -->
    <li class="menu-item" v-if="userRole == 'Advertiser'" :class="{ 'active': isExpandedSubMenu === 'rules ' }" data-bs-dismiss="offcanvas" aria-label="Close">
        <RouterLink  to="/advertiser-rules" class="menu-link"  @click="toggleSubmenu('','rules ')">
          <i class="menu-icon tf-icons fab fa-telegram-plane"></i>
          <div data-i18n="rules">Rules</div>
        </RouterLink>
    </li>
    
    <!-- FAQ -->
    <li class="menu-item" v-if="userRole == 'Advertiser'" :class="{ 'active': isExpandedSubMenu === 'FAQ' }" data-bs-dismiss="offcanvas" aria-label="Close">
        <RouterLink  to="/advertiser-faq" class="menu-link"  @click="toggleSubmenu('','FAQ')">
          <i class="menu-icon tf-icons fas fa-question-circle"></i>
          <div data-i18n="FAQ">FAQ</div>
        </RouterLink>
    </li>

    <!-- my account -->
    <li class="menu-header small text-uppercase" v-if="userRole == 'Advertiser'">
        <span class="menu-header-text" data-i18n="My_Account">my account</span>
    </li>

    <!-- My Account -->
    <li class="menu-item" v-if="userRole == 'Advertiser'" :class="{ 'active': isExpandedSubMenu === 'my_account' }" data-bs-dismiss="offcanvas" aria-label="Close">
        <RouterLink  to="/advertiser-account" class="menu-link"  @click="toggleSubmenu('','my_account')">
          <i class="menu-icon tf-icons fas fa-user-circle"></i>
          <div data-i18n="my_account">My Account</div>
        </RouterLink>
    </li>

    <!-- Payment History -->
    <li class="menu-item" v-if="userRole == 'Advertiser'" :class="{ 'active': isExpandedSubMenu === 'payment_history' }" data-bs-dismiss="offcanvas" aria-label="Close">
        <RouterLink  to="/advertiser-payment-history" class="menu-link"  @click="toggleSubmenu('','payment_history')">
          <i class="menu-icon tf-icons fas fas fa-shopping-basket"></i>
          <div data-i18n="payment_history">Payment History</div>
        </RouterLink>
    </li>

    <!-- Support Ticket -->
    <li class="menu-header small text-uppercase" v-if="userRole == 'Advertiser'">
        <span class="menu-header-text" data-i18n="Support_Ticket">Support Ticket</span>
    </li>

    <!-- Support Tickets -->
    <li class="menu-item" :class="isExpanded === 'support_tickets' ? 'open' : ''" v-if="userRole == 'Advertiser'">
        <a href="javascript:void(0);" class="menu-link menu-toggle" @click="toggleAccordion('support_tickets')">
          <i class="menu-icon fa-solid fa-calendar-check"></i>
          <div data-i18n="support_tickets" class="mt-1">Support</div>
        </a>
        <ul class="menu-sub">
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'all_tickets' }" data-bs-dismiss="offcanvas" aria-label="Close">
            <RouterLink :to="'/advertiser-support-tickets'" class="menu-link"  @click="toggleSubmenu('support_tickets','all_tickets')">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="all_tickets">All Tickets</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'create_new_ticket' }" data-bs-dismiss="offcanvas" aria-label="Close">
            <RouterLink :to="'/advertiser-support-ticket-create'" class="menu-link" @click="toggleSubmenu('support_tickets','create_new_ticket')">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="create_new_ticket">Create New Ticket</div>
            </RouterLink>
          </li>
          <li class="menu-item">
            <a :href="'skype:'+skype_config" class="menu-link">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="liveskype_support">Live Skype Support</div>
            </a>
          </li>

          <li class="menu-item">
            <a href="mailto:info@doppcall.com" class="menu-link">
              <i class="fa-regular fa-circle ms-3 me-2 smallMenuIcons"></i>
              <div data-i18n="email_support">Email Support</div>
            </a>
          </li>
        </ul>
      </li>
    <!-- Advertiser Dashboard End -->


     <!-- Account Manager Dashboard Start -->
     <li class="menu-header small text-uppercase" v-if="userRole == 'Account manager'">
            <span class="menu-header-text" data-i18n="Main">Dashboard</span>
        </li>

        <!-- Dashboards -->
        <li class="menu-item" v-if="userRole == 'Account manager'" :class="{ 'active': isExpandedSubMenu === 'dashboard' }" data-bs-dismiss="offcanvas" aria-label="Close">
            <RouterLink  to="/account/dashboard" class="menu-link" @click="toggleSubmenu('','dashboard')">
              <i class="menu-icon fa-solid fa-house-chimney"></i>
              <div data-i18n="dashboard">Dashboard</div>
            </RouterLink>
        </li>

        <!-- Manage Users -->
        <li class="menu-item" :class="isExpanded === 'manage_users' ? 'open' : ''" v-if="userRole == 'Account manager'">
            <a href="javascript:void(0);" class="menu-link menu-toggle" @click="toggleAccordion('manage_users')">
              <i class="menu-icon fa-regular fa-address-book"></i>
              <div data-i18n="manage_users" class="mt-1">Manage Users</div>
            </a>
            <ul class="menu-sub">
              <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'publishers' }" data-bs-dismiss="offcanvas" aria-label="Close">
                <RouterLink :to="'/account-user-publishers'" class="menu-link" @click="toggleSubmenu('manage_users','publishers')">
                  <div data-i18n="publishers">Publishers</div>
                </RouterLink>
              </li>
              <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'advertisers' }" data-bs-dismiss="offcanvas" aria-label="Close">
                <RouterLink :to="'/account-user-advertisher'" class="menu-link" @click="toggleSubmenu('manage_users','advertisers')">
                  <div data-i18n="advertisers">Advertisers</div>
                </RouterLink>
              </li>
            </ul>
          </li>
          <!-- Payment Info Settings -->
          <li class="menu-item" :class="isExpanded === 'payments_info_settings' ? 'open' : ''" v-if="userRole == 'Account manager'">
            <a href="javascript:void(0);" class="menu-link menu-toggle" @click="toggleAccordion('payments_info_settings')">
              <i class="menu-icon fa-regular fa-money-bill-1"></i>
              <div data-i18n="payment_info_settings" class="mt-1">Payment Settings</div>
            </a>
            <ul class="menu-sub">
              <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'payments_info' }" data-bs-dismiss="offcanvas" aria-label="Close">
                <RouterLink :to="'/account-payment-setting'" class="menu-link" @click="toggleSubmenu('payments_info_settings','payments_info')">
                  <div data-i18n="publisher_payment_info">User Payment Info</div>
                </RouterLink>
              </li>
            </ul>
          </li>
          <li class="menu-item" v-if="userRole == 'Account manager'"  :class="{ 'active': isExpandedSubMenu === 'my_campaigns' }" data-bs-dismiss="offcanvas" aria-label="Close">
            <RouterLink  to="/account-campaigns" class="menu-link" @click="toggleSubmenu('','my_campaigns')">
              <i class="menu-icon fa-solid fa-circle-user"></i>
                <div data-i18n="my_campaigns">My Campaigns</div>
              </RouterLink>
          </li>
          <!-- Support Ticket -->
        <li class="menu-header small text-uppercase" v-if="userRole == 'Account manager'">
            <span class="menu-header-text" data-i18n="Support_Ticket">Support Ticket</span>
        </li>

        <!-- Support Tickets -->
        <li class="menu-item" v-if="userRole == 'Account manager'"  :class="{ 'active': isExpandedSubMenu === 'all_tickets' }" data-bs-dismiss="offcanvas" aria-label="Close">
            <RouterLink :to="'/account-tickets'" class="menu-link"  @click="toggleSubmenu('support_tickets','all_tickets')">
              <i class="menu-icon fa-solid fa-ticket"></i>
              <div data-i18n="all_tickets">Tickets</div>
            </RouterLink>
          </li>
        <!-- Account Manager Dashboard End -->
    </ul>
  </aside>
  <!-- / Menu -->
  </div>
</div>

</template>

<script>
import axios from 'axios';
import moment from "moment";
import loader from './loader.vue';
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { inject ,ref} from "vue";
import { useRouter } from "vue-router";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

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
  props : ['totalCountUser'],
  setup() {
    const globalVariables = inject("globalVariables");
    const router = useRouter();
    const forceMobileView = ref(false); // User preference to force mobile view

    const isMobileDevice = () => {
      return window.innerWidth <= 768; // Simple device detection
    };

    const sidebarLoader = () => {
      let route;
      if (forceMobileView.value) {
        route = "/admin-mobile-chats";
      } else {
        route = isMobileDevice() ? "/admin-mobile-chats" : "/admin-chats/000";
      }
      const fullUrl = `${window.location.origin}${route}`; 
      window.open(fullUrl, "_blank");
    };
    return { globalVariables, sidebarLoader, forceMobileView };
  },
  data() {
    return {
      user: "",
      role: "",
      unreadnotification: "",
      registerunread : "",
      ticketunread : "",
      campaignunread : "",
      paymentunread : "",
      leadunread : "",
      unreadallnotifications : "",
      origin : "",
      activeColor : "register",
      viewNotificationData : {
        noti_id : "",
      },
      balance : "",
      adminId : "",
      isExpanded: "",
      isExpandedSubMenu : "",
      logo : "",
      userRole : "",
      userData : "",
      offerCategories : "",
      skype_config : "",
      secoundary_logo : "",
    };
  },
  mounted() {
    this.getUser();
    this.getNotification();
    this.origin = window.location.origin;
    this.getAdminId();
    this.getPayDetailsData()
    this.getRoleData()
  },
  methods: {
    
    getUser() {
      var authUser = JSON.parse(localStorage.getItem('authUserFromLocalStorage')) || {};
      this.user = authUser?.data;
      this.role = authUser?.role;
      this.balance = authUser?.balance;
      this.updateFavicon(authUser?.favicon);
      this.listenNewNotification(authUser && authUser.data && authUser.data.id);
    },

    updateFavicon(url) {
      let link = document.querySelector("link[rel='icon']") || document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'icon';
      link.href = url;
      document.getElementsByTagName('head')[0].appendChild(link);
    }, 

    getPayDetailsData() {
      axios
        .get(this.globalVariables.apiUrl + `website/header`, {
            headers: { matchToken: `f8jd38skQ2AznZ9xKlmB5Nvy1RTqW7PoL6XYa4CvudJHGFEbkMs03pOwrtgicUhD` }
        })
        .then((res) => {
          this.offerCategories = res.data.offerCategories;
          this.logo = res.data.logo.logo;
          this.secoundary_logo = res.data.logo.secoundary_logo;
        })
        .catch((e) => {
          console.error(e);
        });
    },

    getRoleData() {
      var authUser = JSON.parse(localStorage.getItem('authUserFromLocalStorage')) || {};
      this.userData = authUser?.data;
      this.userRole = authUser?.role?.name;
      this.skype_config = authUser?.skype_config;
    },

    getNotification() {
      axios
        .get(
          this.globalVariables.apiUrl+`notification/all-get `,
          { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
        )
        .then((res) => {
          this.unreadnotification = res.data.unreadnotification;
          this.registerunread = res.data.registerunread;
          this.ticketunread = res.data.ticketunread;
          this.campaignunread = res.data.campaignunread;
          this.paymentunread = res.data.paymentunread;
          this.leadunread = res.data.leadunread;
          this.unreadallnotifications = res.data.unreadallnotifications;
        })
        .catch((e) => {
          console.error(e);
        });
    },

    changeActive(id){
      this.activeColor = id;
    },

    getAdminId(){
      var  id = localStorage.getItem('admin_Id');
      this.adminId = id;
    },

    goToDashboard(){
      this.getLoader =  true;
      axios
        .get(this.globalVariables.apiUrl+`publisher/logout/${this.adminId}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if(res.data.status == 'success'){
            localStorage.setItem("admin_Id", "");
            localStorage.setItem("token", res.data.token);
            localStorage.setItem('authUserFromLocalStorage', JSON.stringify(res.data));
            this.$router.push("/dashboard/user");
          }else{
            toastr.error(res.data.message);
          }
        })
        .catch((e) => {
          return e;
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    formatTime(createdAt) {
      return moment(createdAt).fromNow();
    },

    logoutAction () {
      axios.post(this.globalVariables.apiUrl+'logout',{}, { headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}})
      .then((r) => {
        toastr.success('Log out Successfull')
          localStorage.setItem('token', "")
          localStorage.setItem("admin_Id", "");
          // window.location.href =`http://localhost:5173/?token=logout`;
         window.location.href =`https://doppcall.com/?token=logout`;
      })
      .catch((e) => {
        return e
      });
    },

    viewNotification(id){
      this.viewNotificationData.noti_id = id;
       axios
        .post(
          this.globalVariables.apiUrl+`notification/mark-as-read`,this.viewNotificationData,
          { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
        )
        .then((res) => {
          if(res.data.status == 'success'){
            toastr.success(res.data.message);
            this.getUser();
            this.getNotification();
          }else{
            toastr.error(res.data.message);
          }
        })
        .catch((e) => {
          console.error(e);
        });
    },

    markAllRead(){
       axios
        .get(
          this.globalVariables.apiUrl+`notification/read-all`,
          { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
        )
        .then((res) => {
          console.log(res.data);
            toastr.success(res.data.message);
            this.getUser();
            this.getNotification();
        })
        .catch((e) => {
          console.error(e);
        });
    },

    showErrorMessage(){
      this.$router.push('/publisher/dashboard');
      toastr.error('You need to confirm your account to access this url')
    },

    toggleAccordion(menu) {
      if(this.isExpanded == menu){
        this.isExpanded = 'none'
      }else{
        this.isExpanded = menu;
      }
    },

    toggleSubmenu(menu,submenu) {
      this.isExpanded = menu;
      this.isExpandedSubMenu = submenu;
    },

    listenNewNotification(chatID) {
      window.Echo.private(`adminotification.${chatID}`).listen("NotificationBroadcast", (event) => {
        toastr.success('New Notification');
        this.getNotification();
      });
    },
  },
};
</script>
<style>
#dashboardSmallMenu .offcanvas-body .menu-link {
	color: white;
}
#dashboardSmallMenu .dashboradLogo{
  max-width: 100%;
}
#notification .active{
  background: #0162e8 !important;
  border-color: #0162e8 !important;
}
.noreadnotification {
	font-weight: bold;
}
.amount-badge {
	font-size: 16px;
	font-weight: 500;
	background: #03b2ff;
	border-radius: 5px;
	padding: 5px 15px;
	color: #fff;
}
#dashboardSmallMenu {
  inline-size:260px;
	background: #2f3349;
	color: #6f6b7d;
}
#dashboardSmallMenu .app-brand{
	width: 50%;
}
.menu-inner {
	padding-top: 20px !important;
}
/* .menu-item.open > a:first-of-type {
	background: #3C3F55;
} */
/* .menu-sub .menu-item.active{
  background:linear-gradient(72.47deg, #7367f0 22.16%, rgba(115, 103, 240, 0.7) 76.47%) !important;
  box-shadow: 0 2px 6px rgba(var(--v-global-theme-primary),.3)
} */

</style>

<style scoped>
.badge-info {
	color: #fff;
	background-color: #00b9ff;
}
.layout-navbar .navbar-dropdown.dropdown-notifications .dropdown-notifications-list {
	overflow-x: auto !important;
}
.layout-navbar .navbar-dropdown.dropdown-notifications .dropdown-notifications-list {
	scrollbar-width: thin;
	scrollbar-color: #dbdade  #ffffff;
}
#dashboardSmallMenu .menu-item {
	line-height: 2rem !important;
  padding-bottom:8px;
}
#dashboardSmallMenu .menu-toggle::after {
	right: 0 !important;
}
#dashboardSmallMenu .smallMenuIcons {
	font-size: 0.5rem !important;
}

</style>