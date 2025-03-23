<template>
  <template v-if="getLoader">
    <Loader></Loader>
  </template>
  <!-- Menu -->
  <aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
    <div class="app-brand demo py-3 align-items-center">
      <a href="https://doppcall.com/" class="app-brand-link justify-content-center">
       <img class="dashboradLogo" :src="secondary_logo" alt="">
      </a>
    </div>

    <div class="menu-inner-shadow"></div>
    <ul class="menu-inner py-1">
      <!-- Dashboards -->
      <li class="menu-item" v-if="userRole == 'Super' || userRole == 'Admin'" :class="{ 'active': isExpandedSubMenu === 'dashboard' }">
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
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'all-offer' }">
            <RouterLink :to="'/admin-offers'" class="menu-link" @click="toggleSubmenu('manage-offer','all-offer')">
              <div data-i18n="all_offers">All Offers</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'type' }">
            <RouterLink :to="'/admin-offers-types'" class="menu-link" @click="toggleSubmenu('manage-offer','type')">
              <div data-i18n="types">Types</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'categories' }">
            <RouterLink :to="'/admin-offers-categories'" class="menu-link" @click="toggleSubmenu('manage-offer','categories')">
              <div data-i18n="categories">Categories</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'allow_trafic' }">
            <RouterLink :to="'/admin-allow-traffic'" class="menu-link" @click="toggleSubmenu('manage-offer','allow_trafic')">
              <div data-i18n="allowed_traffic">Allowed Traffic</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'offers-links' }">
            <RouterLink :to="'/admin-link'" class="menu-link" @click="toggleSubmenu('manage-offer','links')">
              <div data-i18n="offers-links">Links</div>
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
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'admin_campaigns' }">
            <RouterLink :to="'/admin-campaigns-index'" class="menu-link" @click="toggleSubmenu('campaigns','admin_campaigns')">
              <div data-i18n="admin_campaign">Admin Campaigns</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'user_campaigns' }">
            <RouterLink :to="'/admin-campaigns-user'" class="menu-link" @click="toggleSubmenu('campaigns','user_campaigns')">
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
          <li class="menu-item"  :class="{ 'active': isExpandedSubMenu === 'differentiates' }">
            <RouterLink :to="'/admin-about-differentiates'" class="menu-link" @click="toggleSubmenu('about','differentiates')">
              <div data-i18n="differentiates">Differentiates</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'call_merketing' }">
            <RouterLink :to="'/admin-about-call-marketing'" class="menu-link" @click="toggleSubmenu('about','call_merketing')">
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
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'category' }">
            <RouterLink :to="'/admin-career-catagory'" class="menu-link" @click="toggleSubmenu('career','category')">
              <div data-i18n="category">Category</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'job_career' }">
            <RouterLink :to="'/admin-career-jobcareer'" class="menu-link" @click="toggleSubmenu('career','job_career')">
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
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'publishers' }">
            <RouterLink :to="'/admin-payments-publishers'" class="menu-link" @click="toggleSubmenu('payments','publishers')">
              <div data-i18n="publishers">Publishers</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'advertisers' }">
            <RouterLink :to="'/admin-payments-advertisers'" class="menu-link" @click="toggleSubmenu('payments','advertisers')">
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
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'payments_info' }">
            <RouterLink :to="'/admin-payment-system-publisher'" class="menu-link" @click="toggleSubmenu('payments_info_settings','payments_info')">
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
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'administration' }">
            <RouterLink :to="'/admin-system-subscribes'" class="menu-link" @click="toggleSubmenu('platform_administration','administration')">
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
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'users' }">
            <RouterLink :to="'/admin-export-users'" class="menu-link" @click="toggleSubmenu('exports','users')">
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
          <li class="menu-item"  :class="{ 'active': isExpandedSubMenu === 'doppcall_team' }">
            <RouterLink :to="'/admin-manage-doppcall-team'" class="menu-link" @click="toggleSubmenu('manage_users','doppcall_team')">
              <div data-i18n="doppcall_team">DOPPCALL Team</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'publishers' }">
            <RouterLink :to="'/admin-manage-publishers'" class="menu-link" @click="toggleSubmenu('manage_users','publishers')">
              <div data-i18n="publishers">Publishers</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'advertisers' }">
            <RouterLink :to="'/admin-manage-advertiser'" class="menu-link" @click="toggleSubmenu('manage_users','advertisers')">
              <div data-i18n="advertisers">Advertisers</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'add_new_user' }">
            <RouterLink :to="'/admin-manage-user-create'" class="menu-link" @click="toggleSubmenu('manage_users','add_new_user')">
              <div data-i18n="add_new_user">Add New User</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'invite_member' }">
            <RouterLink :to="'/admin-invite-member'" class="menu-link" @click="toggleSubmenu('manage_users','invite_member')">
              <div data-i18n="invite_member">Invite Member</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'trash' }">
            <RouterLink :to="'/admin-manage-user-trash'" class="menu-link" @click="toggleSubmenu('manage_users','trash')">
              <div data-i18n="trash">Trash</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'incompleted_reg' }">
            <RouterLink :to="'/admin-manage-user-incompleted-reg'" class="menu-link" @click="toggleSubmenu('manage_users','incompleted_reg')">
              <div data-i18n="incompleted_reg">Incomplete Reg</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'blocked_id' }">
            <RouterLink :to="'/admin-manage-user-blocked-ip'" class="menu-link" @click="toggleSubmenu('manage_users','blocked_id')">
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
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'banner' }">
            <RouterLink :to="'/admin-banners'" class="menu-link" @click="toggleSubmenu('banner_management','banner')">
              <div data-i18n="banner">Banner</div>
            </RouterLink>
          </li>
        </ul>
      </li>

      <!-- Notice -->
      <li :class="{ 'active': isExpandedSubMenu === 'admin_notice' }" class="menu-item" v-if="userRole == 'Super' || userRole == 'Admin'">
        <RouterLink  :to="'/admin-notice'" class="menu-link"  @click="toggleSubmenu('','admin_notice')">
          <i class="menu-icon fa-solid fa-newspaper"></i>
          <div data-i18n="notice">Notice</div>
        </RouterLink>
      </li>

      <!-- Rules -->
      <li :class="{ 'active': isExpandedSubMenu === 'admin_rules' }" class="menu-item" v-if="userRole == 'Super' || userRole == 'Admin'">
        <RouterLink  :to="'/admin-rules'" class="menu-link"  @click="toggleSubmenu('','admin_rules')">
          <i class="menu-icon fa-brands fa-ravelry"></i>
          <div data-i18n="rules">Rules</div>
        </RouterLink>
      </li>

      <!--  Industrial Contacts -->
      <li :class="{ 'active': isExpandedSubMenu === 'industrial_contacts' }" class="menu-item" v-if="userRole == 'Super' || userRole == 'Admin'">
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
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'subjects' }" >
            <RouterLink :to="'/admin-tickets-subjects'" class="menu-link" @click="toggleSubmenu('support_tickets','subjects')">
              <div data-i18n="subjects">Subjects</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'tickets' }" >
            <RouterLink :to="'/admin-tickets'" class="menu-link" @click="toggleSubmenu('support_tickets','tickets')">
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
              <div data-i18n="live_chat">Live Chat {{ '( ' + (totalCountUser || '0') + ' )' }}
              </div>
            </a> 
          </li>

          <li :class="{ 'active': isExpandedSubMenu === 'public_visitors' }" class="menu-item" v-if="userRole == 'Super' || userRole == 'Admin'">
            <RouterLink :to="'/admin-live-chat-leads'" class="menu-link" @click="toggleSubmenu('chat','public_visitors')">
              <div data-i18n="public_visitors">Live Chat Leads</div>
            </RouterLink>
          </li>
          <li :class="{ 'active': isExpandedSubMenu === 'chat_logs' }" class="menu-item" v-if="userRole == 'Super' || userRole == 'Admin'">
          <RouterLink :to="'/admin-chats-logs'" class="menu-link" @click="toggleSubmenu('chat','chat_logs')">
            <div data-i18n="chat_logs">Chat Logs</div>
          </RouterLink>
        </li>
        </ul>
      </li>

      

      <!-- Email Logs -->
      <li :class="{ 'active': isExpandedSubMenu === 'email_log' }" class="menu-item" v-if="userRole == 'Super' || userRole == 'Admin'">
        <RouterLink :to="'/admin-emails'" class="menu-link" @click="toggleSubmenu('','email_log')">
          <i class="menu-icon fa-regular fa-envelope"></i>
          <div data-i18n="email_log">Email log</div>
        </RouterLink>
      </li>

      <li class="menu-header small text-uppercase" v-if="userRole == 'Super' || userRole == 'Admin'">
        <span class="menu-header-text" data-i18n="Frontend CMS">Frontend CMS</span>
      </li>

      <!--  Appearance -->
      <li class="menu-item"  :class="isExpanded === 'appearance' ? 'open' : ''" v-if="userRole == 'Super' || userRole == 'Admin'">
        <a href="javascript:void(0);" class="menu-link menu-toggle" @click="toggleAccordion('appearance')">
          <i class="menu-icon fa-regular fa-pen-to-square"></i>
          <div data-i18n="appearance" class="mt-1">Appearance</div>
        </a>
        <ul class="menu-sub">
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'theme_settings' }">
            <RouterLink :to="'/admin-appearance-theme-settings'" class="menu-link"  @click="toggleSubmenu('appearance','theme_settings')">
              <div data-i18n="theme_settings">Theme Settings</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'partner_settings' }">
            <RouterLink :to="'/admin-appearance-partner-settings'" class="menu-link"  @click="toggleSubmenu('appearance','partner_settings')">
              <div data-i18n="partner_settings">Partner Settings</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'lead_method' }">
            <RouterLink :to="'/admin-appearance-leadmethod'" class="menu-link"  @click="toggleSubmenu('appearance','lead_method')">
              <div data-i18n="lead_method">Lead Method</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'how_to_work' }">
            <RouterLink :to="'/admin-appearance-howtowork'" class="menu-link"  @click="toggleSubmenu('appearance','how_to_work')">
              <div data-i18n="how_to_work">How To Work</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'count_down' }">
            <RouterLink :to="'/admin-appearance-countdown'" class="menu-link"  @click="toggleSubmenu('appearance','count_down')">
              <div data-i18n="count_down">Count Down</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'professional_agency' }">
            <RouterLink :to="'/admin-appearance-professional-agency'" class="menu-link"  @click="toggleSubmenu('appearance','professional_agency')">
              <div data-i18n="professional_agency">Professional Agency</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'hero_breadcrumb' }">
            <RouterLink :to="'/admin-appearance-hero-breadcrumb'" class="menu-link"  @click="toggleSubmenu('appearance','hero_breadcrumb')">
              <div data-i18n="hero_breadcrumb">Hero Breadcrumb</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'custom_CSS' }">
            <RouterLink :to="'/admin-appearance-custom-css'" class="menu-link"  @click="toggleSubmenu('appearance','custom_CSS')"> 
              <div data-i18n="custom_CSS">Custom CSS</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'custom_JS' }">
            <RouterLink :to="'/admin-appearance-custom-js'" class="menu-link"  @click="toggleSubmenu('appearance','custom_JS')">
              <div data-i18n="custom_JS">Custom JS</div>
            </RouterLink>
          </li>
        </ul>
      </li>

      <!--Leads-->
      <li class="menu-item" v-if="userRole == 'Super' || userRole == 'Admin'" :class="{ 'active': isExpandedSubMenu === 'leads' }">
        <RouterLink :to="'/admin-leads'" class="menu-link" @click="toggleSubmenu('','leads')">
          <i class="menu-icon fa-solid fa-floppy-disk"></i>
          <div data-i18n="leads">Leads</div>
        </RouterLink>
      </li>

      <!--Pages-->
      <li class="menu-item" v-if="userRole == 'Super' || userRole == 'Admin'" :class="{ 'active': isExpandedSubMenu === 'pages' }">
        <RouterLink :to="'/admin-pages'" class="menu-link" @click="toggleSubmenu('','pages')">
          <i class="menu-icon fa-regular fa-file"></i>
          <div data-i18n="pages">Pages</div>
        </RouterLink>
      </li>

      <!--Menus-->
      <li class="menu-item" v-if="userRole == 'Super' || userRole == 'Admin'" :class="{ 'active': isExpandedSubMenu === 'menus' }">
        <RouterLink :to="'/admin-menus'" class="menu-link" @click="toggleSubmenu('','menus')">
          <i class="menu-icon fa-solid fa-bars"></i>
          <div data-i18n="menus">Menus</div>
        </RouterLink>
      </li>

      <!-- FAQ -->
      <li class="menu-item" :class="isExpanded === 'faq' ? 'open' : ''" v-if="userRole == 'Super' || userRole == 'Admin'">
        <a href="javascript:void(0);" class="menu-link menu-toggle" @click="toggleAccordion('faq')">
          <i class="menu-icon fa-solid fa-question"></i>
          <div data-i18n="faq" class="mt-1">FAQ</div>
        </a>
        <ul class="menu-sub">
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'services' }">
            <RouterLink :to="'/admin-faq-services'" class="menu-link" @click="toggleSubmenu('faq','services')">
              <div data-i18n="services">Services</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'questions' }">
            <RouterLink :to="'/admin-faq-questions'" class="menu-link" @click="toggleSubmenu('faq','questions')">
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
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'categories' }">
            <RouterLink :to="'/admin-blog-categories'" class="menu-link" @click="toggleSubmenu('blogs','categories')">
              <div data-i18n="categories">Categories</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'posts' }">
            <RouterLink :to="'/admin-blog-posts'" class="menu-link" @click="toggleSubmenu('blogs','posts')">
              <div data-i18n="posts">Posts</div>
            </RouterLink>
          </li>
        </ul>
      </li>

      <!-- Press Release -->

      <li class="menu-item" :class="isExpanded === 'press_release' ? 'open' : ''" v-if="userRole == 'Super' || userRole == 'Admin'">
        <a href="javascript:void(0);" class="menu-link menu-toggle" @click="toggleAccordion('press_release')">
          <i class="menu-icon fa-solid fa-newspaper"></i>
          <div data-i18n="press" class="mt-1">Press Release</div>
        </a>
        <ul class="menu-sub">
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'press_categories' }">
            <RouterLink :to="'/admin-press-categories'" class="menu-link" @click="toggleSubmenu('press_release','press_categories')">
              <div data-i18n="categories">Categories</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'posts' }">
            <RouterLink :to="'/admin-press-posts'" class="menu-link" @click="toggleSubmenu('press_release','posts')">
              <div data-i18n="posts">Posts</div>
            </RouterLink>
          </li>
        </ul>
      </li>

     <!-- Comments -->
      <li class="menu-item" v-if="userRole == 'Super' || userRole == 'Admin'" :class="{ 'active': isExpandedSubMenu === 'comments' }">
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
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'all_contact' }">
            <RouterLink :to="'/admin-contacts'" class="menu-link" @click="toggleSubmenu('contacts','all_contact')">
              <div data-i18n="all_contact">All Contact</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'manage_industry_verticals' }">
            <RouterLink :to="'/admin-contacts-industry-verticals'" class="menu-link" @click="toggleSubmenu('contacts','manage_industry_verticals')">
              <div data-i18n="manage_industry_verticals">Manage Industry Verticals</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'manage_find_us' }">
            <RouterLink :to="'/admin-contacts-find-us'" class="menu-link" @click="toggleSubmenu('contacts','manage_find_us')">
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
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'generals' }">
            <RouterLink :to="'/admin-settings-generals'" class="menu-link" @click="toggleSubmenu('setting','generals')">
              <div data-i18n="generals">Generals</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'balance_limit' }">
            <RouterLink :to="'/admin-settings-balance-limit'" class="menu-link" @click="toggleSubmenu('setting','balance_limit')">
              <div data-i18n="balance_limit">Balance Limit</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'mail_configure' }">
            <RouterLink :to="'/admin-settings-mail-configure'" class="menu-link" @click="toggleSubmenu('setting','mail_configure')">
              <div data-i18n="mail_configure">Mail Configure</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'smtp_setup' }">
            <RouterLink :to="'/admin-settings-smtp-configure'" class="menu-link" @click="toggleSubmenu('setting','smtp_setup')">
              <div data-i18n="smtp_setup">Smtp Setup</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'email_template' }">
            <RouterLink :to="'/admin-settings-email-template'" class="menu-link" @click="toggleSubmenu('setting','email_template')">
              <div data-i18n="email_template">Email Template</div>
            </RouterLink>
          </li>
          <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'media' }">
            <RouterLink :to="'/admin-settings-media'" class="menu-link" @click="toggleSubmenu('setting','media')">
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
      <li class="menu-item" v-if="userRole == 'Publisher'" :class="{ 'active': isExpandedSubMenu === 'dashboard' }">
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
            <template v-if="userData.is_email_verified != null && userData.account_access == 1">
              <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'all_offers' }">
                <RouterLink :to="'/publisher/offers'" class="menu-link" @click="toggleSubmenu('manage-offer','all_offers')">
                  <div data-i18n="all_offers">All Offers</div>
                </RouterLink>
              </li>
            </template>
            <template v-else>
              <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'all-offer' }">
                <a href="javascript:" @click="showErrorMessage()" class="menu-link">
                  <div data-i18n="all_offers">All Offers</div>
                </a>
              </li>
            </template>
            <template v-if="offerCategories">
              <li class="menu-item"  v-for="(value,index) in  offerCategories" :class="{ 'active': isExpandedSubMenu === index }">
              <template v-if="userData.is_email_verified != null && userData.account_access == 1">
                <RouterLink :to="'/publisher-offer-category/'+value.id" class="menu-link" @click="toggleSubmenu('manage-offer',index)">
                <div :data-i18n="value.name">{{ value.name }}</div>
                </RouterLink>
              </template>
              <template v-else>
                <a href="javascript:" @click="showErrorMessage()" class="menu-link">
                <div :data-i18n="value.name">{{ value.name }}</div>
                </a>
              </template>
            </li>
            </template>
          </ul>
      </li>

        <li class="menu-item" v-if="userRole == 'Publisher'" :class="{ 'active': isExpandedSubMenu === 'my_campaigns' }">
          <template v-if="userData.is_email_verified != null && userData.account_access == 1">
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

        <li class="menu-item" v-if="userRole == 'Publisher'" :class="{ 'active': isExpandedSubMenu === 'login_to_ringba' }">
          <template v-if="userData.is_email_verified != null && userData.account_access == 1"> 
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

        <li class="menu-item" v-if="userRole == 'Publisher'" :class="{ 'active': isExpandedSubMenu === 'pay_per_call_guides' }">
          <template v-if="userData.is_email_verified != null && userData.account_access == 1">
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

        <li class="menu-item" v-if="userRole == 'Publisher'" :class="{ 'active': isExpandedSubMenu === 'notices' }">
          <template v-if="userData.is_email_verified != null && userData.account_access == 1">
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

        <li class="menu-item" v-if="userRole == 'Publisher'" :class="{ 'active': isExpandedSubMenu === 'rules' }">
          <template v-if="userData.is_email_verified != null && userData.account_access == 1">
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
        
        <li class="menu-item" v-if="userRole == 'Publisher'" :class="{ 'active': isExpandedSubMenu === 'FAQ' }">
          <template v-if="userData.is_email_verified != null && userData.account_access == 1">
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

        <li class="menu-item" v-if="userRole == 'Publisher'" :class="{ 'active': isExpandedSubMenu === 'my_account' }">
          <template  v-if="userData.is_email_verified != null && userData.account_access == 1">
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

        <li class="menu-item" v-if="userRole == 'Publisher'" :class="{ 'active': isExpandedSubMenu === 'payment_history' }">
          <template  v-if="userData.is_email_verified != null && userData.account_access == 1">
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
              <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'all_tickets' }">
                <template  v-if="userData.is_email_verified != null && userData.account_access == 1">
                  <RouterLink :to="'/publisher-support-tickets'" class="menu-link" @click="toggleSubmenu('support_tickets','all_tickets')">
                    <div data-i18n="all_tickets">All Tickets</div>
                  </RouterLink>
                </template>
                <template  v-else>
                  <a href="javascript:" @click="showErrorMessage()" class="menu-link">
                    <div data-i18n="all_tickets">All Tickets</div>
                  </a>
                </template>
              </li>
              <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'create_new_ticket' }">
                <template  v-if="userData.is_email_verified != null && userData.account_access == 1">
                  <RouterLink :to="'/publisher-support-ticket-create'" class="menu-link"  @click="toggleSubmenu('support_tickets','create_new_ticket')">
                    <div data-i18n="create_new_ticket">Create New Ticket</div>
                  </RouterLink>
                </template>
                <template  v-else>
                  <a href="javascript:" @click="showErrorMessage()" class="menu-link">
                    <div data-i18n="create_new_ticket">Create New Ticket</div>
                  </a>
                </template>
              </li>
              <li class="menu-item">
                <template  v-if="userData.is_email_verified != null && userData.account_access == 1">
                  <a :href="'skype:'+skype_config" class="menu-link">
                    <div data-i18n="liveskype_support">Live Skype Support</div>
                  </a>
                </template>
                <template  v-else>
                  <a href="javascript:" @click="showErrorMessage()"class="menu-link">
                    <div data-i18n="liveskype_support">Live Skype Support</div>
                  </a>
                </template>
              </li>

              <li class="menu-item">
              <template  v-if="userData.is_email_verified != null && userData.account_access == 1">
                <a href="mailto:info@doppcall.com" class="menu-link">
                  <div data-i18n="email_support">Email Support</div>
                </a>
              </template>
              <template  v-else>
                <a href="javascript:" @click="showErrorMessage()" class="menu-link">
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
        <li class="menu-item" v-if="userRole == 'Advertiser'" :class="{ 'active': isExpandedSubMenu === 'dashboard' }">
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
              <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'all-offer' }">

              <template  v-if="userData.is_email_verified != null && userData.account_access == 1">
                <RouterLink :to="'/advertiser-offers'" class="menu-link" @click="toggleSubmenu('manage-offer','all_offers')">
                  <div data-i18n="all_offers">All Offers</div>
                </RouterLink>
              </template>
              <template  v-else>
                <a href="javascript:" @click="showAdvertisherErrorMessage()" class="menu-link">
                  <div data-i18n="email_support">All Offers</div>
                </a>
              </template>
              </li>
            </ul>
        </li>

        <!-- Login To Ringba -->
        <li class="menu-item" v-if="userRole == 'Advertiser'" :class="{ 'active': isExpandedSubMenu === 'login_to_ringba' }">
          <template  v-if="userData.is_email_verified != null && userData.account_access == 1">
            <RouterLink  to="/advertiser-login-ringba" class="menu-link" @click="toggleSubmenu('','login_to_ringba')">
              <i class="menu-icon tf-icons fas fa-user-plus"></i>
              <div data-i18n="login_to_ringba">Login To Ringba</div>
            </RouterLink>
          </template>
          <template  v-else>
            <a href="javascript:" @click="showAdvertisherErrorMessage()" class="menu-link">
              <i class="menu-icon tf-icons fas fa-user-plus"></i>
              <div data-i18n="login_to_ringba">Login To Ringba</div>
            </a>
          </template>
        </li>

        <!-- Info  -->
        <li class="menu-header small text-uppercase" v-if="userRole == 'Advertiser'">
            <span class="menu-header-text" data-i18n="Info">Info</span>
        </li>

        <!-- Pay Per Call Guides -->
        <li class="menu-item" v-if="userRole == 'Advertiser'" :class="{ 'active': isExpandedSubMenu === 'pay_per_call_guides' }">
          <template  v-if="userData.is_email_verified != null && userData.account_access == 1">
            <RouterLink  to="/advertiser-pay-per-call" class="menu-link" @click="toggleSubmenu('','pay_per_call_guides')">
              <i class="menu-icon tf-icons fas fa-rss"></i>
              <div data-i18n="pay_per_call_guides">Pay Per Call Guides</div>
            </RouterLink>
          </template>
            <template  v-else>
            <a href="javascript:" @click="showAdvertisherErrorMessage()" class="menu-link">
              <i class="menu-icon tf-icons fas fa-rss"></i>
              <div data-i18n="pay_per_call_guides">Pay Per Call Guides</div>
            </a>
          </template>
        </li>

        <!-- Notices -->
        <li class="menu-item" v-if="userRole == 'Advertiser'" :class="{ 'active': isExpandedSubMenu === 'notices' }">
          <template  v-if="userData.is_email_verified != null && userData.account_access == 1">
            <RouterLink  to="/advertiser-notices" class="menu-link"  @click="toggleSubmenu('','notices')">
              <i class="menu-icon tf-icons fas fa-newspaper"></i>
              <div data-i18n="notices">Notices</div>
            </RouterLink>
          </template>
            <template  v-else>
            <a href="javascript:" @click="showAdvertisherErrorMessage()" class="menu-link">
              <i class="menu-icon tf-icons fas fa-newspaper"></i>
              <div data-i18n="notices">Notices</div>
            </a>
          </template>
        </li>

        <!-- Rules -->
        <li class="menu-item" v-if="userRole == 'Advertiser'" :class="{ 'active': isExpandedSubMenu === 'rules ' }">
          <template  v-if="userData.is_email_verified != null && userData.account_access == 1">
            <RouterLink  to="/advertiser-rules" class="menu-link"  @click="toggleSubmenu('','rules ')">
              <i class="menu-icon tf-icons fab fa-telegram-plane"></i>
              <div data-i18n="rules">Rules</div>
            </RouterLink>
          </template>
            <template  v-else>
            <a href="javascript:" @click="showAdvertisherErrorMessage()" class="menu-link">
              <i class="menu-icon tf-icons fab fa-telegram-plane"></i>
              <div data-i18n="rules">Rules</div>
            </a>
          </template>
        </li>
        
        <!-- FAQ -->
        <li class="menu-item" v-if="userRole == 'Advertiser'" :class="{ 'active': isExpandedSubMenu === 'FAQ' }">
          <template  v-if="userData.is_email_verified != null && userData.account_access == 1">
            <RouterLink  to="/advertiser-faq" class="menu-link"  @click="toggleSubmenu('','FAQ')">
              <i class="menu-icon tf-icons fas fa-question-circle"></i>
              <div data-i18n="FAQ">FAQ</div>
            </RouterLink>
          </template>
            <template  v-else>
            <a href="javascript:" @click="showAdvertisherErrorMessage()" class="menu-link">
              <i class="menu-icon tf-icons fas fa-question-circle"></i>
              <div data-i18n="FAQ">FAQ</div>
            </a>
          </template>
        </li>

        <!-- my account -->
        <li class="menu-header small text-uppercase" v-if="userRole == 'Advertiser'">
            <span class="menu-header-text" data-i18n="My_Account">my account</span>
        </li>

        <!-- My Account -->
        <li class="menu-item" v-if="userRole == 'Advertiser'" :class="{ 'active': isExpandedSubMenu === 'my_account' }">
            <RouterLink  to="/advertiser-account" class="menu-link"  @click="toggleSubmenu('','my_account')">
              <i class="menu-icon tf-icons fas fa-user-circle"></i>
              <div data-i18n="my_account">My Account</div>
            </RouterLink>
        </li>

        <!-- Payment History -->
        <li class="menu-item" v-if="userRole == 'Advertiser'" :class="{ 'active': isExpandedSubMenu === 'payment_history' }">
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
              <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'all_tickets' }">
                <template  v-if="userData.is_email_verified != null && userData.account_access == 1">
                <RouterLink :to="'/advertiser-support-tickets'" class="menu-link"  @click="toggleSubmenu('support_tickets','all_tickets')">
                  <div data-i18n="all_tickets">All Tickets</div>
                </RouterLink>
              </template>
              <template  v-else>
              <a href="javascript:" @click="showAdvertisherErrorMessage()" class="menu-link">
                <div data-i18n="all_tickets">All Tickets</div>
              </a>
            </template>
              </li>
              <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'create_new_ticket' }">
                <template  v-if="userData.is_email_verified != null && userData.account_access == 1">
                <RouterLink :to="'/advertiser-support-ticket-create'" class="menu-link" @click="toggleSubmenu('support_tickets','create_new_ticket')">
                  <div data-i18n="create_new_ticket">Create New Ticket</div>
                </RouterLink>
              </template>
              <template  v-else>
              <a href="javascript:" @click="showAdvertisherErrorMessage()" class="menu-link">
                <div data-i18n="create_new_ticket">Create New Ticket</div>
              </a>
            </template>
              </li>
              <li class="menu-item">
                <a :href="'skype:'+skype_config" class="menu-link">
                  <div data-i18n="liveskype_support">Live Skype Support</div>
                </a>
              </li>

              <li class="menu-item">
                <a href="mailto:info@doppcall.com" class="menu-link">
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
        <li class="menu-item" v-if="userRole == 'Account manager'" :class="{ 'active': isExpandedSubMenu === 'dashboard' }">
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
              <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'publishers' }">
                <RouterLink :to="'/account-user-publishers'" class="menu-link" @click="toggleSubmenu('manage_users','publishers')">
                  <div data-i18n="publishers">Publishers</div>
                </RouterLink>
              </li>
              <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'advertisers' }">
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
              <li class="menu-item" :class="{ 'active': isExpandedSubMenu === 'payments_info' }">
                <RouterLink :to="'/account-payment-setting'" class="menu-link" @click="toggleSubmenu('payments_info_settings','payments_info')">
                  <div data-i18n="publisher_payment_info">User Payment Info</div>
                </RouterLink>
              </li>
            </ul>
          </li>
          <li class="menu-item" v-if="userRole == 'Account manager'"  :class="{ 'active': isExpandedSubMenu === 'my_campaigns' }">
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
        <li class="menu-item" v-if="userRole == 'Account manager'"  :class="{ 'active': isExpandedSubMenu === 'all_tickets' }">
            <RouterLink :to="'/account-tickets'" class="menu-link"  @click="toggleSubmenu('support_tickets','all_tickets')">
              <i class="menu-icon fa-solid fa-ticket"></i>
              <div data-i18n="all_tickets">Tickets</div>
            </RouterLink>
          </li>
        <!-- Account Manager Dashboard End -->

        
        <!-- Athor Dashboard Start -->
        <li class="menu-header small text-uppercase" v-if="userRole == 'Author'">
            <span class="menu-header-text" data-i18n="Main">Dashboard</span>
        </li>

        <!-- Dashboards -->
        <li class="menu-item" v-if="userRole == 'Author'" :class="{ 'active': isExpandedSubMenu === 'dashboard' }">
            <RouterLink  to="/author/dashboard" class="menu-link" @click="toggleSubmenu('','dashboard')">
              <i class="menu-icon fa-solid fa-house-chimney"></i>
              <div data-i18n="dashboard">Dashboard</div>
            </RouterLink>
        </li>

        <!--Pages-->
        <li class="menu-item" v-if="userRole == 'Author'" :class="{ 'active': isExpandedSubMenu === 'pages' }">
          <RouterLink :to="'/author-pages'" class="menu-link" @click="toggleSubmenu('','pages')">
            <i class="menu-icon fa-regular fa-file"></i>
            <div data-i18n="pages">Pages</div>
          </RouterLink>
        </li>

        <!-- Blogs -->
        <li class="menu-item" v-if="userRole == 'Author'" :class="{ 'active': isExpandedSubMenu === 'blogs' }">
          <RouterLink :to="'/author-blog-posts'" class="menu-link" @click="toggleSubmenu('','blogs')">
            <i class="menu-icon fa-brands fa-blogger-b"></i>
            <div data-i18n="blog" class="mt-1">Blog Posts</div>
          </RouterLink>
        </li>
        <!-- Athor Dashboard Dashboard End -->
    </ul>
  </aside>
  <!-- / Menu -->
</template>

<script>
import axios from "axios";
import toastr from "toastr";
import { inject, ref } from "vue";
import { useRouter } from "vue-router";
import Loader from "../../backend/include/loader.vue";

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
  components: {
    Loader,
  },
  data() {
    return {
      isExpanded: "",
      isExpandedSubMenu: "",
      logo: "",
      userRole: "",
      userData: "",
      offerCategories: "",
      skype_config: "",
      secondary_logo: "",
      getLoader: false,
    };
  },
  mounted() {
    this.fetchHeaderData();
    this.loadUserData();
  },
  methods: {
    fetchHeaderData() {
      this.getLoader = true; // Show loader while data is being fetched
      axios
        .get(`${this.globalVariables.apiUrl}website/header`, {
          headers: {
            matchToken: `f8jd38skQ2AznZ9xKlmB5Nvy1RTqW7PoL6XYa4CvudJHGFEbkMs03pOwrtgicUhD`,
          },
        })
        .then((res) => {
          const { offerCategories, logo } = res.data;
          this.offerCategories = offerCategories;
          this.logo = logo.logo;
          this.secondary_logo = logo.secoundary_logo;
        })
        .catch((error) => {
          console.error("Error fetching header data:", error);
        })
        .finally(() => {
          this.getLoader = false; // Hide loader after data fetch is complete
        });
    },

    loadUserData() {
      const authUser = JSON.parse(localStorage.getItem("authUserFromLocalStorage")) || {};
      this.userData = authUser?.data || "";
      this.userRole = authUser?.role?.name || "";
      this.skype_config = authUser?.skype_config || "";
    },

    showErrorMessage() {
      this.$router.push("/publisher/dashboard");
      toastr.error(
        "Your account is under review; you'll be notified upon approval. For any queries, contact us at info@doppcall.com."
      );
    },
    showAdvertisherErrorMessage() {
      this.$router.push("/advertiser/dashboard");
      toastr.error(
        "Your account is under review; you'll be notified upon approval. For any queries, contact us at info@doppcall.com."
      );
    },

    toggleAccordion(menu) {
      this.isExpanded = this.isExpanded === menu ? "none" : menu;
    },

    toggleSubmenu(menu, submenu) {
      this.isExpanded = menu;
      this.isExpandedSubMenu = submenu;
    },
  },
};
</script>

<style>
body {
    overflow-x: hidden;
}
.dashboradLogo{
  max-width: 60%;
}
#layout-menu .menu-inner {
	height: calc(100vh - 0rem);
}
#layout-menu .menu-inner {
	overflow-y: auto !important;
}
.menu-vertical .menu-item .menu-link {
	font-size: 1rem !important;
	color: #fff !important;
	font-weight: 400 !important;
}
.menu-inner {
	border-top: 1px solid #eae8f1;
}
.menu-vertical, .menu-vertical .menu-block, .menu-vertical .menu-inner > .menu-item, .menu-vertical .menu-inner > .menu-header {
	width: 18rem !important;
}
#layout-menu .menu-inner {
	scrollbar-width: thin;
	scrollbar-color: #2f3349 #ffffff;
}
html:not(.layout-menu-collapsed) .bg-menu-theme .menu-inner .menu-item:not(.active) > .menu-link:hover, .layout-menu-hover.layout-menu-collapsed .bg-menu-theme .menu-inner .menu-item:not(.active) > .menu-link:hover {
	background: linear-gradient(72.47deg, #7367f0 22.16%, rgba(115, 103, 240, 0.7) 76.47%) !important;
	box-shadow: 0px 2px 6px 0px rgba(115, 103, 240, 0.48) !important;
	color: #fff !important;
}
.bg-menu-theme .menu-inner .menu-item.open > .menu-link.menu-toggle, .layout-menu-hover.layout-menu-collapsed .bg-menu-theme .menu-inner .menu-item.open > .menu-link.menu-toggle, .bg-menu-theme .menu-inner .menu-item.active > .menu-link.menu-toggle, .layout-menu-hover.layout-menu-collapsed .bg-menu-theme .menu-inner .menu-item.active > .menu-link.menu-toggle {
	background: transparent !important;
}
</style>

