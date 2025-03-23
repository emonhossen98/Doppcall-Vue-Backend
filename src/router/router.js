// router.js
import { createRouter, createWebHistory } from 'vue-router';

const Home = () => import('../components/pages/frontend/pages/pages/home/home.vue');
const NotFound = () => import('../components/pages/frontend/pages/pages/errors/404.vue');
const Forbidden = () => import('../components/pages/frontend/pages/pages/errors/403.vue');

const DashboardLayout = () => import('../components/pages/backend/app/app.vue');
const ChatLayOuts = () => import('../components/pages/backend/app/chat.vue');
const ChatLayOutVisitors = () => import('../components/pages/backend/pages/pages/all-pages/admin-chats/visitors.vue');
const ChatLayOutContact = () => import('../components/pages/backend/pages/pages/all-pages/admin-chats/contact.vue');
const ChatLayOutAnalytics = () => import('../components/pages/backend/pages/pages/all-pages/admin-chats/analytic.vue');
const ChatStart = () => import('../components/pages/backend/pages/pages/all-pages/admin-chats/chatstart.vue');
const ChatStartMobile = () => import('../components/pages/backend/pages/pages/all-pages/admin-chats/mobailchat.vue');
const ChatStartMobileStart = () => import('../components/pages/backend/pages/pages/all-pages/admin-chats/mobailchatstart.vue');
const ChatStartMobileStartProfile = () => import('../components/pages/backend/pages/pages/all-pages/admin-chats/mobailchatprofile.vue');
const ChatStartMobileVisitors = () => import('../components/pages/backend/pages/pages/all-pages/admin-chats/mvisitors.vue');
const ChatStartMobileAnalytic = () => import('../components/pages/backend/pages/pages/all-pages/admin-chats/manalytic.vue');
const ChatStartMobileContact = () => import('../components/pages/backend/pages/pages/all-pages/admin-chats/mcontact.vue');
const DashboardPage = () => import('../components/pages/backend/pages/pages/all-pages/dashborad/dashborad.vue');

const DashboardProfile = () => import('../components/pages/backend/pages/pages/all-pages/dashborad/profile.vue');
const DashboardUserActivities = () => import('../components/pages/backend/pages/pages/all-pages/dashborad/useractivities.vue');
const DashboardUserActivitieView = () => import('../components/pages/backend/pages/pages/all-pages/dashborad/useractivitieview.vue');
const DashboardCookieConsents = () => import('../components/pages/backend/pages/pages/all-pages/dashborad/usercookieconsents.vue');
const DashboardViewNotification = () => import('../components/pages/backend/pages/pages/all-pages/dashborad/usernotification.vue');

const adminOffers = () => import("../components/pages/backend/pages/pages/routes/manage-offer/all-offer/all-offer.vue");
const adminOffersCreate = () => import("../components/pages/backend/pages/pages/routes/manage-offer/all-offer/offer-create.vue");
const adminOffersEdit = () => import("../components/pages/backend/pages/pages/routes/manage-offer/all-offer/adminOfferEdit.vue");
const adminOffersView = () => import("../components/pages/backend/pages/pages/all-pages/manageOffers/all-offers/adminOfferView.vue");
const adminCampaignsCreate = () => import("../components/pages/backend/pages/pages/all-pages/manageOffers/all-offers/adminCampaignsCreate.vue");
const adminCampaignsAssign = () => import("../components/pages/backend/pages/pages/all-pages/manageOffers/all-offers/adminCampaignsAssign.vue");
const adminOfferImport = () => import("../components/pages/backend/pages/pages/all-pages/manageOffers/all-offers/offerImport.vue");

const adminOffersTypes = () => import("../components/pages/backend/pages/pages/routes/manage-offer/type/type.vue");
const adminOffersTypesCreate = () => import('../components/pages/backend/pages/pages/routes/manage-offer/type/typeCreate.vue');
const adminOffersTypesEdit = () => import('../components/pages/backend/pages/pages/routes/manage-offer/type/typeEdit.vue');

const adminOffersCategories = () => import("../components/pages/backend/pages/pages/routes/manage-offer/category/categoris.vue");
const offersCategoriesCreate = () => import("../components/pages/backend/pages/pages/routes/manage-offer/category/categorisCreate.vue");
const adminOffersCategoriesEdit = () => import("../components/pages/backend/pages/pages/routes/manage-offer/category/categorisEdit.vue");

const adminAllowTraffic = () => import("../components/pages/backend/pages/pages/routes/manage-offer/traffic/traffics.vue");
const adminAllowTrafficCreate = () => import("../components/pages/backend/pages/pages/routes/manage-offer/traffic/trafficCreate.vue.vue");
const adminAllowTrafficEdit = () => import("../components/pages/backend/pages/pages/routes/manage-offer/traffic/trafficEdit.vue");

const adminOfferslinks = () => import("../components/pages/backend/pages/pages/routes/manage-offer/links/links.vue");

const adminCampaignsIndex = () => import("../components/pages/backend/pages/pages/routes/campaine/admin-campaine/admin-campaine.vue");
const adminCampaignsEdit = () => import("../components/pages/backend/pages/pages/routes/campaine/admin-campaine/edit-campaign.vue");
const adminCampaignsView = () => import("../components/pages/backend/pages/pages/routes/campaine/admin-campaine/view-campaign.vue");

const adminCampaignsUser = () => import("../components/pages/backend/pages/pages/routes/campaine/user-campaine/user-campaine.vue");

const adminAboutDifferentiates = () => import("../components/pages/backend/pages/pages/routes/about/differentiates/differentiates.vue");
const adminAboutDifferentiatesCreate = () => import("../components/pages/backend/pages/pages/routes/about/differentiates/differentiateCreate.vue");
const adminAboutDifferentiatesEdit = () => import("../components/pages/backend/pages/pages/routes/about/differentiates/differentiateEdit.vue");

const adminAboutCallmarketing = () => import("../components/pages/backend/pages/pages/routes/about/call-marketing/call-merketing.vue");
const adminAboutCallmarketingCreate = () => import("../components/pages/backend/pages/pages/routes/about/call-marketing/call-merketingCreate.vue");
const adminAboutCallmarketingEdit = () => import("../components/pages/backend/pages/pages/routes/about/call-marketing/callMarketingEdit.vue");

const adminCareerCatagory = () => import("../components/pages/backend/pages/pages/routes/career/category/category.vue");
const careerCatagoryCreate = () => import("../components/pages/backend/pages/pages/routes/career/category/categoryCreate.vue");
const careerCatagoryEdit = () => import("../components/pages/backend/pages/pages/routes/career/category/categoryEdit.vue");

const adminCareerJobCareer = () => import("../components/pages/backend/pages/pages/routes/career/career/job-career.vue");
const careerJobcareerCreate = () => import("../components/pages/backend/pages/pages/routes/career/career/jobcreate.vue");
const careerJobcareerEdit = () => import("../components/pages/backend/pages/pages/routes/career/career/jobEdit.vue");

const adminPaymentsPublishers = () => import("../components/pages/backend/pages/pages/routes/payments/publisher/publishers.vue");

const adminPaymentsAdvertisers = () => import("../components/pages/backend/pages/pages/routes/payments/advertisers/advertisers.vue");

const adminPaymentSystemPublisher = () => import("../components/pages/backend/pages/pages/routes/payment-info/payment-info/payment-info.vue");
const paymentSystemPublisherCreate = () => import("../components/pages/backend/pages/pages/routes/payment-info/payment-info/paymentInfoCreate.vue");
const adminPaymentSystemSingle = () => import("../components/pages/backend/pages/pages/routes/payment-info/payment-info/singlePaymentCreate.vue");

const adminSystemSubscribes = () => import("../components/pages/backend/pages/pages/routes/subscribes/subscribes/subscribes.vue");

const adminExportUsers = () => import("../components/pages/backend/pages/pages/routes/exports/exports/exports.vue");

const adminManageDoppcallTeam = () => import("../components/pages/backend/pages/pages/routes/manage-user/doppcall-team/doppcall-team.vue");
const manageAccountManagerCreate = () => import("../components/pages/backend/pages/pages/routes/manage-user/doppcall-team/account-manager.vue");

const adminManagePublishers = () => import("../components/pages/backend/pages/pages/routes/manage-user/publishers/publishers.vue");
const adminManagePublishersEdit = () => import("../components/pages/backend/pages/pages/routes/manage-user/publishers/publishers-edit.vue");
const adminManagePublishersDetails = () => import("../components/pages/backend/pages/pages/routes/manage-user/publishers/publishers-pay-details.vue");
const adminManagePublishersView = () => import("../components/pages/backend/pages/pages/routes/manage-user/publishers/publishers-pay-view.vue");

const adminManageAdvertiser = () => import("../components/pages/backend/pages/pages/routes/manage-user/advertisers/advertisers.vue");
const adminManageAdvertiserEdit = () => import("../components/pages/backend/pages/pages/routes/manage-user/advertisers/advertisers-edit.vue");
const adminManageAdvertiserView = () => import("../components/pages/backend/pages/pages/routes/manage-user/advertisers/advertisers-view.vue");
const adminManageadvertiserDetails = () => import("../components/pages/backend/pages/pages/routes/manage-user/advertisers/advertisers-pay-details.vue");

const adminPayDetails = () => import("../components/pages/backend/pages/pages/routes/manage-user/payment-history/payment-history.vue");
const adminManageUserCreate = () => import("../components/pages/backend/pages/pages/routes/manage-user/add-new-user/add-new-user.vue");
const adminInviteMember = () => import("../components/pages/backend/pages/pages/routes/manage-user/invite-member/invite-member.vue");
const adminManageUserTrash = () => import("../components/pages/backend/pages/pages/routes/manage-user/trash/trash.vue");
const adminManageUserIncompleted = () => import("../components/pages/backend/pages/pages/routes/manage-user/incompleted/incompleted.vue");
const adminManageUserBlockedIp = () => import("../components/pages/backend/pages/pages/routes/manage-user/blockedip/blockedip.vue");

const adminBanners = () => import("../components/pages/backend/pages/pages/routes/banner/banner/banner.vue")
const adminBannersCreate = () => import("../components/pages/backend/pages/pages/routes/banner/banner/bannerCreate.vue");
const adminBannersEdit = () => import("../components/pages/backend/pages/pages/routes/banner/banner/bannerEdit.vue");

const adminNotice = () => import("../components/pages/backend/pages/pages/routes/notice/notice/notice.vue");

const adminRules = () => import("../components/pages/backend/pages/pages/routes/rules/rules/rules.vue");

const adminIndustrialContacts = () => import("../components/pages/backend/pages/pages/routes/industial-contacts/industial-contacts/industial-contacts.vue");

const adminTicketsSubjects = () => import("../components/pages/backend/pages/pages/routes/support-tickets/subjects/subjects.vue");
const adminTicketsSubjectsCreate = () => import("../components/pages/backend/pages/pages/routes/support-tickets/subjects/subjectsCreate.vue");
const adminTicketsSubjectsEdit = () => import("../components/pages/backend/pages/pages/routes/support-tickets/subjects/subjectsEdit.vue");

const adminTickets = () => import("../components/pages/backend/pages/pages/routes/support-tickets/tickets/tickets.vue");
const adminTicketsCreate = () => import("../components/pages/backend/pages/pages/routes/support-tickets/tickets/ticketsCreate.vue");
const adminTicketsEdit = () => import("../components/pages/backend/pages/pages/routes/support-tickets/tickets/ticketsEdit.vue");
const adminTicketsView = () => import("../components/pages/backend/pages/pages/routes/support-tickets/tickets/ticketsView.vue");

const adminChats = () => import("../components/pages/backend/pages/pages/routes/live-chat/live-chat/live-chat.vue");
const adminPublicVisitors = () => import("../components/pages/backend/pages/pages/routes/live-chat/live-chat/public-visitors.vue");
const adminChatsLogs = () => import("../components/pages/backend/pages/pages/routes/live-chat/live-chat/chatLogs.vue");

const adminEmails = () => import("../components/pages/backend/pages/pages/routes/email-logs/email-logs/email-logs.vue");

const adminAppearanceThemeSettings = () => import("../components/pages/backend/pages/pages/routes/appearance/theme-settings/theme_settings.vue");

const adminAppearancePartnerSettings = () => import("../components/pages/backend/pages/pages/routes/appearance/partner-settings/partner_settings.vue");

const adminAppearanceLeadMethod = () => import("../components/pages/backend/pages/pages/routes/appearance/lead_method/lead_method.vue");
const adminAppearanceLeadMethodCreate = () => import("../components/pages/backend/pages/pages/routes/appearance/lead_method/lead_methodCreate.vue");
const adminAppearanceLeadMethodEdit = () => import("../components/pages/backend/pages/pages/routes/appearance/lead_method/lead_methodEdit.vue");

const adminAppearanceHowToWork = () => import("../components/pages/backend/pages/pages/routes/appearance/how_to_work/how_to_work.vue");
const adminAppearanceHowToWorkCreate = () => import("../components/pages/backend/pages/pages/routes/appearance/how_to_work/how_to_workCreate.vue");
const adminAppearanceHowToWorkEdit = () => import("../components/pages/backend/pages/pages/routes/appearance/how_to_work/how_to_workEdit.vue");

const adminAppearanceCountDown = () => import("../components/pages/backend/pages/pages/routes/appearance/count_down/count_down.vue");
const adminAppearanceCountDownCreate = () => import("../components/pages/backend/pages/pages/routes/appearance/count_down/count_downCreate.vue");
const adminAppearanceCountDownEdit = () => import("../components/pages/backend/pages/pages/routes/appearance/count_down/count_downEdit.vue");


const adminAppearanceProfessionAlagency = () => import("../components/pages/backend/pages/pages/routes/appearance/professional_agency/professional_agency.vue");
const adminAppearanceProfessionAlagencyCreate = () => import("../components/pages/backend/pages/pages/routes/appearance/professional_agency/professional_agencyCreate.vue");
const adminAppearanceProfessionAlagencyEdit = () => import("../components/pages/backend/pages/pages/routes/appearance/professional_agency/professional_agencyEdit.vue");

const adminAppearancehHeroBreadcrumb = () => import("../components/pages/backend/pages/pages/routes/appearance/hero_breadcrumb/hero_breadcrumb.vue");

const adminAppearanceCustomCss = () => import("../components/pages/backend/pages/pages/routes/appearance/custom_css/custom_css.vue");

const adminAppearanceCustomJs = () => import("../components/pages/backend/pages/pages/routes/appearance/custom_js/custom_js.vue");

const adminLeads = () => import("../components/pages/backend/pages/pages/routes/leads/leads/leads.vue");
const adminLeadView = () => import("../components/pages/backend/pages/pages/routes/leads/leads/leadView.vue");

const adminPages = () => import("../components/pages/backend/pages/pages/routes/pages/pages/pages.vue");
const adminPagesCreate = () => import("../components/pages/backend/pages/pages/routes/pages/pages/pagesCreate.vue");
const adminPagesEdit = () => import("../components/pages/backend/pages/pages/routes/pages/pages/pagesEdit.vue");

const adminMenus = () => import("../components/pages/backend/pages/pages/routes/menus/menus/menus.vue");
const adminMenusCreate = () => import("../components/pages/backend/pages/pages/routes/menus/menus/menu-create.vue");
const adminMenusEdit = () => import("../components/pages/backend/pages/pages/routes/menus/menus/menu-edit.vue");;

const adminFaqServices = () => import("../components/pages/backend/pages/pages/routes/faq/services/services.vue");;
const adminFaqServicesCreate = () => import("../components/pages/backend/pages/pages/routes/faq/services/service-create.vue");;
const adminFaqServicesEdit = () => import("../components/pages/backend/pages/pages/routes/faq/services/service-edit.vue");;


const adminFaqQuestions = () => import("../components/pages/backend/pages/pages/routes/faq/questions/questions.vue");;
const adminFaqQuestionsCreate = () => import("../components/pages/backend/pages/pages/routes/faq/questions/questions-create.vue");;
const adminFaqQuestionsEdit = () => import("../components/pages/backend/pages/pages/routes/faq/questions/questions-edit.vue");;

// Blog 

const adminBlogCategories = () => import("../components/pages/backend/pages/pages/routes/blog/categories/categories.vue");;
const adminBlogCategorieCreate = () => import("../components/pages/backend/pages/pages/routes/blog/categories/categorie-create.vue");;
const adminBlogCategoriesEdit = () => import("../components/pages/backend/pages/pages/routes/blog/categories/categorie-edit.vue");;

const adminBlogPosts = () => import("../components/pages/backend/pages/pages/routes/blog/posts/posts.vue");;
const adminBlogPostsCreate = () => import("../components/pages/backend/pages/pages/routes/blog/posts/postscreate.vue");;
const adminBlogPostsEdit = () => import("../components/pages/backend/pages/pages/routes/blog/posts/postsedit.vue");;

// Press 
const adminPressCategories = () => import("../components/pages/backend/pages/pages/routes/press/categories/categories.vue");;
const adminPressCategoriesCreate = () => import("../components/pages/backend/pages/pages/routes/press/categories/categorie-create.vue");;
const adminPressCategoriesEdit = () => import("../components/pages/backend/pages/pages/routes/press/categories/categorie-edit.vue");;

const adminPressPosts = () => import("../components/pages/backend/pages/pages/routes/press/posts/posts.vue");;
const adminPressPostsCreate = () => import("../components/pages/backend/pages/pages/routes/press/posts/postscreate.vue");;
const adminPressPostsEdit = () => import("../components/pages/backend/pages/pages/routes/press/posts/postsedit.vue");;

const adminComments = () => import("../components/pages/backend/pages/pages/routes/comments/comments/comments.vue");;
const adminCommentsEdit = () => import("../components/pages/backend/pages/pages/routes/comments/comments/comment-replay.vue");;

const adminContacts = () => import("../components/pages/backend/pages/pages/routes/contacts/all-contacts/all-contacts.vue");;

const adminContactsIndustryVerticals = () => import("../components/pages/backend/pages/pages/routes/contacts/manage-industry/manage-industry.vue");;
const adminContactsIndustryVerticalsCreate = () => import("../components/pages/backend/pages/pages/routes/contacts/manage-industry/manage-industry-create.vue");;
const adminContactsIndustryVerticalsEdit = () => import("../components/pages/backend/pages/pages/routes/contacts/manage-industry/manage-industry-edit.vue");;

const adminContactsFindUs = () => import("../components/pages/backend/pages/pages/routes/contacts/manage-find/manage-find.vue");;
const adminContactsFindUsCreate = () => import("../components/pages/backend/pages/pages/routes/contacts/manage-find/manage-find-create.vue");;
const adminContactsFindUsEdit = () => import("../components/pages/backend/pages/pages/routes/contacts/manage-find/manage-find-edit.vue");;

const adminSettingsGenerals = () => import("../components/pages/backend/pages/pages/routes/settings/generals/generals.vue");;

const adminSettingsBalanceLimit = () => import("../components/pages/backend/pages/pages/routes/settings/balance-limit/balance-limit.vue");

const adminSettingsMailConfigure = () => import("../components/pages/backend/pages/pages/routes/settings/mail-configure/mail-configure.vue");

const adminSettingSsmtpConfigure = () => import("../components/pages/backend/pages/pages/routes/settings/smtp-setup/smtp-setup.vue");
const adminSettingSsmtpCreate = () => import("../components/pages/backend/pages/pages/routes/settings/smtp-setup/smtp-setup-create.vue");

const adminSettingsEmailTemplate = () => import("../components/pages/backend/pages/pages/routes/settings/email-template/email-template.vue");
const adminSettingsEmailTemplateEdit = () => import("../components/pages/backend/pages/pages/routes/settings/email-template/email-template-edit.vue");

const adminSettingsMedia = () => import("../components/pages/backend/pages/pages/routes/settings/media/media.vue");
const adminSettingsMediaCreate = () => import("../components/pages/backend/pages/pages/routes/settings/media/media-create.vue");
const adminSettingsMediaEdit = () => import("../components/pages/backend/pages/pages/routes/settings/media/media-edit.vue");

// For Publisher
const PublisherDashboard = () => import('../components/pages/backend/pages/pages/routes/publisher/dashboard/dashboard.vue');;
const PublisherOffers = () => import('../components/pages/backend/pages/pages/routes/publisher/offers/all-offers/index.vue');
const PublisherCreateCampaign = () => import('../components/pages/backend/pages/pages/routes/publisher/campaign/campaign/campaign-create.vue');
const PublisherEditCampaign = () => import('../components/pages/backend/pages/pages/routes/publisher/campaign/campaign/campaign-edit.vue');
const PublisherCreateView = () => import('../components/pages/backend/pages/pages/routes/publisher/campaign/campaign/campaign-view.vue');

const PublisherOfferCategory = () => import('../components/pages/backend/pages/pages/routes/publisher/offers/offer-category/offer-category.vue');

const PublisherOfferCampaigns = () => import('../components/pages/backend/pages/pages/routes/publisher/campaign/campaign/campaign.vue');
const PublisherOfferCampaignsView = () => import('../components/pages/backend/pages/pages/routes/publisher/campaign/campaign/campaignOfferView.vue');

const PublisherLoginRinba = () => import('../components/pages/backend/pages/pages/routes/publisher/ringbaLogin/ringbaLogin/ringbaLogin.vue');

const PublisherPayParGuide = () => import('../components/pages/backend/pages/pages/routes/publisher/pay-par-guide/pay-par-guide/pay-par-guide.vue');

const PublisherNotice = () => import('../components/pages/backend/pages/pages/routes/publisher/notice/notice/notice.vue');

const PublisherRules = () => import('../components/pages/backend/pages/pages/routes/publisher/rules/rules/rules.vue');

const PublisherFaq = () => import('../components/pages/backend/pages/pages/routes/publisher/faq/faq/faq.vue');

const PublisherAccount = () => import('../components/pages/backend/pages/pages/routes/publisher/account/account/account.vue');
const PublisherPaymentHistoryDetails = () => import('../components/pages/backend/pages/pages/routes/publisher/account/account/view.vue');

const PublisherPaymentHistory = () => import('../components/pages/backend/pages/pages/routes/publisher/payment-history/payment-history/payment-history.vue');

const PublisherSupportTickets = () => import('../components/pages/backend/pages/pages/routes/publisher/support-tickets/support-tickets/support-tickets.vue');
const PublisherSupportTicketCreate = () => import('../components/pages/backend/pages/pages/routes/publisher/support-tickets/support-tickets/support-ticket-create.vue');
const PublisherSupportTicketEdit = () => import('../components/pages/backend/pages/pages/routes/publisher/support-tickets/support-tickets/support-ticket-edit.vue');
const PublisherSupportTicketView = () => import('../components/pages/backend/pages/pages/routes/publisher/support-tickets/support-tickets/support-ticket-view.vue');


// For Advertiser

const AdvertiserDashboard = () => import('../components/pages/backend/pages/pages/routes/advertiser/dashboard/dashboard/dashboard.vue');

const AdvertiserOffers = () => import('../components/pages/backend/pages/pages/routes/advertiser/offers/offers/offers.vue');
const AdvertiserOffersView = () => import('../components/pages/backend/pages/pages/routes/advertiser/offers/offers/offer-view.vue');

const AdvertiserLoginRingba = () => import('../components/pages/backend/pages/pages/routes/advertiser/ringbaLogin/ringbaLogin/ringbaLogin.vue');

const AdvertiserPayPerCall = () => import('../components/pages/backend/pages/pages/routes/advertiser/pay-par-guide/pay-par-guide/pay-par-guide.vue');

const AdvertiserNotices = () => import('../components/pages/backend/pages/pages/routes/advertiser/notice/notice/notice.vue');

const AdvertiserRules = () => import('../components/pages/backend/pages/pages/routes/advertiser/rules/rules/rules.vue');

const AdvertiserFaq = () => import('../components/pages/backend/pages/pages/routes/advertiser/faq/faq/faq.vue');

const AdvertiserAccount = () => import('../components/pages/backend/pages/pages/routes/advertiser/account/account/account.vue');
const AdvertiserPaymentHistoryDetails = () => import('../components/pages/backend/pages/pages/routes/advertiser/account/account/view.vue');

const AdvertiserPaymentHistory = () => import('../components/pages/backend/pages/pages/routes/advertiser/payment-history/payment-history/payment-history.vue');

const AdvertiserSupportTickets = () => import('../components/pages/backend/pages/pages/routes/advertiser/support-tickets/support-tickets/support-tickets.vue');
const AdvertiserSupportTicketCreate = () => import('../components/pages/backend/pages/pages/routes/advertiser/support-tickets/support-tickets/support-ticket-create.vue');
const AdvertiserSupportTicketEdit = () => import('../components/pages/backend/pages/pages/routes/advertiser/support-tickets/support-tickets/support-ticket-edit.vue');
const AdvertiserSupportTicketView = () => import('../components/pages/backend/pages/pages/routes/advertiser/support-tickets/support-tickets/support-ticket-view.vue');


// For Account Manager
const AccountDashboard = () => import('../components/pages/backend/pages/pages/routes/account/dashboard/dashboard/dashboard.vue');

const AccountPublisher = () => import('../components/pages/backend/pages/pages/routes/account/manage-user/manage-user/manage-user.vue');
const AccountView = () => import('../components/pages/backend/pages/pages/routes/account/manage-user/manage-user/manager-view.vue');

const AccountAdvertisher = () => import('../components/pages/backend/pages/pages/routes/account/manage-user/manage-user/manager-advertisher-user.vue');
const AccountAdvertisherView = () => import('../components/pages/backend/pages/pages/routes/account/manage-user/manage-user/manager-advertisher-view.vue');

const AccountPaymentSetting = () => import('../components/pages/backend/pages/pages/routes/account/payment-setting/payment-setting/payment-setting.vue');

const AccountCampaigns = () => import('../components/pages/backend/pages/pages/routes/account/account-campaigns/account-campaigns/account-campaigns.vue');
const AccountCampaignView = () => import('../components/pages/backend/pages/pages/routes/account/account-campaigns/account-campaigns/account-campaigns-view.vue');
const AccountCampaignEdit = () => import('../components/pages/backend/pages/pages/routes/account/account-campaigns/account-campaigns/account-campaigns-edit.vue');

const AccountTickets = () => import('../components/pages/backend/pages/pages/routes/account/support-tickets/support-tickets/support-tickets.vue');
const AccountTicketView = () => import('../components/pages/backend/pages/pages/routes/account/support-tickets/support-tickets/support-ticket-view.vue');
const AccountTicketEdit = () => import('../components/pages/backend/pages/pages/routes/account/support-tickets/support-tickets/support-ticket-edit.vue');

const AccountProfile = () => import('../components/pages/backend/pages/pages/routes/account/profile/profile/profile.vue');


// For Account Manager
const authorDashboard = () => import('../components/pages/backend/pages/pages/routes/author/dashboard/dashboard/dashboard.vue');

const authorPages = () => import("../components/pages/backend/pages/pages/routes/author/pages/pages.vue");
const authorPagesCreate = () => import("../components/pages/backend/pages/pages/routes/author/pages/pagesCreate.vue");
const authorPagesEdit = () => import("../components/pages/backend/pages/pages/routes/author/pages/pagesEdit.vue");


const authorBlogPosts = () => import("../components/pages/backend/pages/pages/routes/author/blog/posts/posts.vue");;
const authorBlogPostsCreate = () => import("../components/pages/backend/pages/pages/routes/author/blog/posts/postscreate.vue");;
const authorBlogPostsEdit = () => import("../components/pages/backend/pages/pages/routes/author/blog/posts/postsedit.vue");;



const routes = [{
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'DOPPCALL - Your Best Pay Per Call Affiliate Network'
    }
  },
  {
    path: '/:catchAll(.*)',
    name: 'notfound',
    component: NotFound,
    meta: {
      title: 'Page Not Found'
    }
  },
  {
    path: '/forbidden',
    component: Forbidden,
    meta: {
      title: 'Forbidden'
    }
  },
  {
    path: '/dashboard',
    component: DashboardLayout,
    children: [
      // Admin Route Start
      {
        path: '/dashboard/:id?',
        name: "Dashboard",
        component: DashboardPage,
        meta: {
          title: 'Dashboard',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/dashboard-profile/:id?',
        name: "Dashboard1",
        component: DashboardProfile,
        meta: {
          title: 'Profile',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/dashboard-view-notification',
        component: DashboardViewNotification,
        meta: {
          requiresAuth: true,
          title: 'Dashboard View Notification'
        }
      },
      {
        path: '/dashboard-user-activities',
        component: DashboardUserActivities,
        meta: {
          title: 'User Activities',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },

      {
        path: '/dashboard-cookie-consents',
        component: DashboardCookieConsents,
        meta: {
          title: 'Cookie Consents',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/dashboard-user-activitie-view/:id',
        component: DashboardUserActivitieView,
        meta: {
          title: 'User Activitie View',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },

      {
        path: '/admin-offers',
        component: adminOffers,
        meta: {
          title: 'Offers',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-offers-edit/:id',
        component: adminOffersEdit,
        meta: {
          title: 'Offer Edit',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-offers-view/:id',
        component: adminOffersView,
        meta: {
          title: 'Offer View',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-offers-campaigns-create/:id',
        component: adminCampaignsCreate,
        meta: {
          title: 'Campaign Create',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-offers-campaigns-assign/:id',
        component: adminCampaignsAssign,
        meta: {
          title: 'Campaign Assign',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-offers-import',
        component: adminOfferImport,
        meta: {
          title: 'Offer Import',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-offers/create',
        component: adminOffersCreate,
        meta: {
          title: 'Offer Create',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-offers-types',
        component: adminOffersTypes,
        meta: {
          title: 'Types',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-offers-types-create',
        component: adminOffersTypesCreate,
        meta: {
          title: 'Type Create',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-offers-types-edit/:id',
        component: adminOffersTypesEdit,
        meta: {
          title: 'Type Edit',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-offers-categories',
        component: adminOffersCategories,
        meta: {
          title: 'Categories',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-offers-categories-create',
        component: offersCategoriesCreate,
        meta: {
          title: 'Categorie Create',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-offers-categories-edit/:id',
        component: adminOffersCategoriesEdit,
        meta: {
          title: 'Categorie Edit',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-allow-traffic',
        component: adminAllowTraffic,
        meta: {
          title: 'Allow Traffics',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-allow-traffic-create',
        component: adminAllowTrafficCreate,
        meta: {
          title: 'Traffic Create',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-allow-traffic-edit/:id',
        component: adminAllowTrafficEdit,
        meta: {
          title: 'Traffic Edit',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-link',
        component: adminOfferslinks,
        meta: {
          title: 'Links',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-campaigns-index',
        component: adminCampaignsIndex,
        meta: {
          title: 'Campaigns',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-campaigns-edit/:id',
        component: adminCampaignsEdit,
        meta: {
          title: 'Campaign Edit',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-campaigns-view/:id',
        component: adminCampaignsView,
        meta: {
          title: 'Campaign View',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-campaigns-user',
        component: adminCampaignsUser,
        meta: {
          title: 'Campaign User',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-about-differentiates',
        component: adminAboutDifferentiates,
        meta: {
          title: 'Differentiates',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-about-differentiates-edit/:id',
        component: adminAboutDifferentiatesEdit,
        meta: {
          title: 'Differentiate Edit',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-about-differentiates-create',
        component: adminAboutDifferentiatesCreate,
        meta: {
          title: 'Differentiate Create',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-about-call-marketing',
        component: adminAboutCallmarketing,
        meta: {
          title: 'Call Marketing',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-about-call-marketing-create',
        component: adminAboutCallmarketingCreate,
        meta: {
          title: 'Call Marketing Create',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-about-call-marketing-edit/:id',
        component: adminAboutCallmarketingEdit,
        meta: {
          title: 'Call Marketing Edit',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-career-catagory',
        component: adminCareerCatagory,
        meta: {
          title: 'Career Catagory',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-career-catagory-create',
        component: careerCatagoryCreate,
        meta: {
          title: 'Career Catagory Create',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-career-catagory-edit/:id',
        component: careerCatagoryEdit,
        meta: {
          title: 'Career Catagory Edit',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-career-jobcareer',
        component: adminCareerJobCareer,
        meta: {
          title: 'Job Career',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-career-jobcareer-create',
        component: careerJobcareerCreate,
        meta: {
          title: 'Job Career Create',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-career-jobcareer-edit/:id',
        component: careerJobcareerEdit,
        meta: {
          title: 'Job Career Edit',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-payments-publishers',
        component: adminPaymentsPublishers,
        meta: {
          title: 'Payment Publishers',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-payments-advertisers',
        component: adminPaymentsAdvertisers,
        meta: {
          title: 'Payment Advertisers',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-payment-system-publisher',
        component: adminPaymentSystemPublisher,
        meta: {
          title: 'Payment System Publisher',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-payment-system-single/:id',
        component: adminPaymentSystemSingle,
        meta: {
          title: 'Payment System Single',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-payment-system-publisher-create',
        component: paymentSystemPublisherCreate,
        meta: {
          title: 'Payment System Publisher Create',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-system-subscribes',
        component: adminSystemSubscribes,
        meta: {
          title: 'Subscribes',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-export-users',
        component: adminExportUsers,
        meta: {
          title: 'Export Users',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-manage-doppcall-team',
        component: adminManageDoppcallTeam,
        meta: {
          title: 'Doppcall Team',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-manage-publishers-edit/:id',
        component: adminManagePublishersEdit,
        meta: {
          title: 'Manage Publishers Edit',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/manage/account/manager/create',
        component: manageAccountManagerCreate,
        meta: {
          title: 'Account Manager Create',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-manage-publishers',
        component: adminManagePublishers,
        meta: {
          title: 'Manage Publishers',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-manage-publishers-pay-details/:id',
        component: adminManagePublishersDetails,
        meta: {
          title: 'Publisher Details',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-manage-publishers-view/:id',
        component: adminManagePublishersView,
        meta: {
          title: 'Publisher View',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-manage-advertiser',
        component: adminManageAdvertiser,
        meta: {
          title: 'Manage Advertiser',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-manage-advertiser-edit/:id',
        component: adminManageAdvertiserEdit,
        meta: {
          title: 'Advertiser Edit',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-manage-advertiser-view/:id',
        component: adminManageAdvertiserView,
        meta: {
          title: 'Advertiser View',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-manage-advertiser-details/:id',
        component: adminManageadvertiserDetails,
        meta: {
          title: 'Advertiser Details',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-pay-details/:id',
        component: adminPayDetails,
        meta: {
          title: 'Pay Details',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-manage-user-create',
        component: adminManageUserCreate,
        meta: {
          title: 'User Create',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-invite-member',
        component: adminInviteMember,
        meta: {
          title: 'Invite Member',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-manage-user-trash',
        component: adminManageUserTrash,
        meta: {
          title: 'User Trash',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-manage-user-incompleted-reg',
        component: adminManageUserIncompleted,
        meta: {
          title: 'Incomplete Reg Users',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-manage-user-blocked-ip',
        component: adminManageUserBlockedIp,
        meta: {
          title: 'Blocked Ip',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-banners',
        component: adminBanners,
        meta: {
          title: 'Banners',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-banners-create',
        component: adminBannersCreate,
        meta: {
          title: 'Banner Create',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-banners-edit/:id',
        component: adminBannersEdit,
        meta: {
          title: 'Banner Edit',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-notice',
        component: adminNotice,
        meta: {
          title: 'Notice',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-rules',
        component: adminRules,
        meta: {
          title: 'Rules',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-industrial-contacts',
        component: adminIndustrialContacts,
        meta: {
          title: 'Industrial Contacts',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-tickets-subjects',
        component: adminTicketsSubjects,
        meta: {
          title: 'Tickets Subjects',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-tickets-subjects-create',
        component: adminTicketsSubjectsCreate,
        meta: {
          title: 'Tickets Subject Create',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-tickets-subjects-edit/:id',
        component: adminTicketsSubjectsEdit,
        meta: {
          title: 'Tickets Subject Edit',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-tickets',
        component: adminTickets,
        meta: {
          title: 'Tickets',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-tickets-create',
        component: adminTicketsCreate,
        meta: {
          title: 'Ticket Create',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-tickets-edit/:id',
        component: adminTicketsEdit,
        meta: {
          title: 'Ticket Edit',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-tickets-view/:id',
        component: adminTicketsView,
        meta: {
          title: 'Ticket View',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-chats',
        component: adminChats,
        meta: {
          title: 'Live Chat',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-live-chat-leads',
        component: adminPublicVisitors,
        meta: {
          title: 'Live Chat Leads',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-chats-logs',
        component: adminChatsLogs,
        meta: {
          title: 'Chat Logs',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-emails',
        component: adminEmails,
        meta: {
          title: 'Email Logs',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-appearance-theme-settings',
        component: adminAppearanceThemeSettings,
        meta: {
          title: 'Theme Settings',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-appearance-partner-settings',
        component: adminAppearancePartnerSettings,
        meta: {
          title: 'Partner Settings',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-appearance-leadmethod',
        component: adminAppearanceLeadMethod,
        meta: {
          title: 'Lead Method',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-appearance-leadmethod-create',
        component: adminAppearanceLeadMethodCreate,
        meta: {
          title: 'Lead Method Create',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-appearance-leadmethod-edit/:id',
        component: adminAppearanceLeadMethodEdit,
        meta: {
          title: 'Lead Method Edit',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-appearance-howtowork',
        component: adminAppearanceHowToWork,
        meta: {
          title: 'How To Works',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-appearance-howtowork-create',
        component: adminAppearanceHowToWorkCreate,
        meta: {
          title: 'How To Work Create',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-appearance-howtowork-edit/:id',
        component: adminAppearanceHowToWorkEdit,
        meta: {
          title: 'How To Work Edit',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-appearance-countdown',
        component: adminAppearanceCountDown,
        meta: {
          title: 'CountDown',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-appearance-countdown-create',
        component: adminAppearanceCountDownCreate,
        meta: {
          title: 'Count Down Create',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-appearance-countdown-edit/:id',
        component: adminAppearanceCountDownEdit,
        meta: {
          title: 'Count Down Edit',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-appearance-professional-agency',
        component: adminAppearanceProfessionAlagency,
        meta: {
          title: 'Profession Agency',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-appearance-professional-agency-create',
        component: adminAppearanceProfessionAlagencyCreate,
        meta: {
          title: 'Profession Agency Create',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-appearance-professional-agency-edit/:id',
        component: adminAppearanceProfessionAlagencyEdit,
        meta: {
          title: 'Profession Agency Edit',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-appearance-hero-breadcrumb',
        component: adminAppearancehHeroBreadcrumb,
        meta: {
          title: 'Hero Breadcrumb',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-appearance-custom-css',
        component: adminAppearanceCustomCss,
        meta: {
          title: 'Custom Css',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-appearance-custom-js',
        component: adminAppearanceCustomJs,
        meta: {
          title: 'Custom Js',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-leads',
        component: adminLeads,
        meta: {
          title: 'Leads',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-lead-view/:id',
        component: adminLeadView,
        meta: {
          title: 'Lead View',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-pages',
        component: adminPages,
        meta: {
          title: 'Pages',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-pages-create',
        component: adminPagesCreate,
        meta: {
          title: 'Page Create',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-pages-edit/:id',
        component: adminPagesEdit,
        meta: {
          title: 'Page Edit',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-menus',
        component: adminMenus,
        meta: {
          title: 'Menus',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-menus-create',
        component: adminMenusCreate,
        meta: {
          title: 'Menu Create',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-menus-edit/:id',
        component: adminMenusEdit,
        meta: {
          title: 'Menu Edit',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-faq-services',
        component: adminFaqServices,
        meta: {
          title: 'Faq Services',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-faq-services-create',
        component: adminFaqServicesCreate,
        meta: {
          title: 'Faq Service Create',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-faq-services-edit/:id',
        component: adminFaqServicesEdit,
        meta: {
          title: 'Faq Service Edit',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-faq-questions',
        component: adminFaqQuestions,
        meta: {
          title: 'Faq Questions',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-faq-questions-create',
        component: adminFaqQuestionsCreate,
        meta: {
          title: 'Faq Questions Create',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-faq-questions-edit/:id',
        component: adminFaqQuestionsEdit,
        meta: {
          title: 'Faq Questions Edit',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },

      // Blog route 

      {
        path: '/admin-blog-categories',
        component: adminBlogCategories,
        meta: {
          title: 'Blog Categories',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-blog-categorie-create',
        component: adminBlogCategorieCreate,
        meta: {
          title: 'Blog Categorie Create',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-blog-categories-edit/:id',
        component: adminBlogCategoriesEdit,
        meta: {
          title: 'Blog Categorie Edit',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-blog-posts',
        component: adminBlogPosts,
        meta: {
          title: 'Blog Posts',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-blog-posts-create',
        component: adminBlogPostsCreate,
        meta: {
          title: 'Blog Post Create',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-blog-posts-edit/:id',
        component: adminBlogPostsEdit,
        meta: {
          title: 'Blog Post Edit',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },

      // press route 

      {
        path: '/admin-press-categories',
        component: adminPressCategories,
        meta: {
          title: 'Press Categories',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-press-categorie-create',
        component: adminPressCategoriesCreate,
        meta: {
          title: 'Press Categorie Create',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-press-categories-edit/:id',
        component: adminPressCategoriesEdit,
        meta: {
          title: 'Press Categorie Edit',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      
      {
        path: '/admin-press-posts',
        component: adminPressPosts,
        meta: {
          title: 'Press Posts',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-press-posts-create',
        component: adminPressPostsCreate,
        meta: {
          title: 'Press Post Create',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-press-posts-edit/:id',
        component: adminPressPostsEdit,
        meta: {
          title: 'Press Post Edit',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },

      {
        path: '/admin-comments',
        component: adminComments,
        meta: {
          title: 'Comments',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-comments-edit/:id',
        component: adminCommentsEdit,
        meta: {
          title: 'Comment Edit',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-contacts',
        component: adminContacts,
        meta: {
          title: 'Contacts',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-contacts-industry-verticals',
        component: adminContactsIndustryVerticals,
        meta: {
          title: 'Contact Industry',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-contacts-industry-verticals-create',
        component: adminContactsIndustryVerticalsCreate,
        meta: {
          title: 'Contact Industry Create',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-contacts-industry-verticals-edit/:id',
        component: adminContactsIndustryVerticalsEdit,
        meta: {
          title: 'Contact Industry Edit',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-contacts-find-us',
        component: adminContactsFindUs,
        meta: {
          title: 'Find Us',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-contacts-find-us-create',
        component: adminContactsFindUsCreate,
        meta: {
          title: 'Find Us Create',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-contacts-find-us-edit/:id',
        component: adminContactsFindUsEdit,
        meta: {
          title: 'Find Us Edit',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-settings-generals',
        component: adminSettingsGenerals,
        meta: {
          title: 'Settings Generals',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-settings-balance-limit',
        component: adminSettingsBalanceLimit,
        meta: {
          title: 'Balance Limit',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-settings-mail-configure',
        component: adminSettingsMailConfigure,
        meta: {
          title: 'Mail Configure',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-settings-smtp-configure',
        component: adminSettingSsmtpConfigure,
        meta: {
          title: 'Smtp Configure',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-settings-smtp-create',
        component: adminSettingSsmtpCreate,
        meta: {
          title: 'Smtp Create',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-settings-email-template',
        component: adminSettingsEmailTemplate,
        meta: {
          title: 'Email Templates',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-settings-email-template-edit/:id',
        component: adminSettingsEmailTemplateEdit,
        meta: {
          title: 'Email Template Edit',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-settings-media',
        component: adminSettingsMedia,
        meta: {
          title: 'Media',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-settings-media-create',
        component: adminSettingsMediaCreate,
        meta: {
          title: 'Media Create',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-settings-media-edit/:id',
        component: adminSettingsMediaEdit,
        meta: {
          title: 'Media Edit',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },

      // Admin Route End


      // For Publisher 
      {
        path: '/publisher/dashboard/:id?',
        component: PublisherDashboard,
        meta: {
          title: 'Dashboard',
          requiresAuth: true,
          requiredRoles: ['Publisher', ],
        }
      },
      {
        path: '/publisher/offers',
        component: PublisherOffers,
        meta: {
          title: 'Offers',
          requiresAuth: true,
          requiredRoles: ['Publisher', ],
        }
      },

      {
        path: '/publisher-create-campaign/:id',
        component: PublisherCreateCampaign,
        meta: {
          title: 'Create Campaign',
          requiresAuth: true,
          requiredRoles: ['Publisher', ],
        }
      },
      {
        path: '/publisher-edit-campaign/:id',
        component: PublisherEditCampaign,
        meta: {
          title: 'Edit Campaign',
          requiresAuth: true,
          requiredRoles: ['Publisher', ],
        }
      },

      {
        path: '/publisher-create-view/:id',
        component: PublisherCreateView,
        meta: {
          title: 'Publisher Create View',
          requiresAuth: true,
          requiredRoles: ['Publisher', ],
        }
      },

      {
        path: '/publisher-offer-category/:id',
        component: PublisherOfferCategory,
        meta: {
          title: 'Offer Category',
          requiresAuth: true,
          requiredRoles: ['Publisher', ],
        }
      },

      {
        path: '/publisher-offer-campaigns',
        component: PublisherOfferCampaigns,
        meta: {
          title: 'Offer Campaigns',
          requiresAuth: true,
          requiredRoles: ['Publisher', ],
        }
      },

      {
        path: '/publisher-offer-campaigns-view/:id',
        component: PublisherOfferCampaignsView,
        meta: {
          title: 'Offer Campaign View',
          requiresAuth: true,
          requiredRoles: ['Publisher', ],
        }
      },

      {
        path: '/publisher-login-ringba',
        component: PublisherLoginRinba,
        meta: {
          title: 'Login Rinba',
          requiresAuth: true,
          requiredRoles: ['Publisher', ],
        }
      },

      {
        path: '/publisher-pay-par-guide',
        component: PublisherPayParGuide,
        meta: {
          title: 'Pay Par Guide',
          requiresAuth: true,
          requiredRoles: ['Publisher', ],
        }
      },

      {
        path: '/publisher-notice',
        component: PublisherNotice,
        meta: {
          title: 'Notice',
          requiresAuth: true,
          requiredRoles: ['Publisher', ],
        }
      },

      {
        path: '/publisher-rules',
        component: PublisherRules,
        meta: {
          title: 'Rules',
          requiresAuth: true,
          requiredRoles: ['Publisher', ],
        }
      },

      {
        path: '/publisher-faq',
        component: PublisherFaq,
        meta: {
          title: 'Faq',
          requiresAuth: true,
          requiredRoles: ['Publisher', ],
        }
      },

      {
        path: '/publisher-account/:id?',
        component: PublisherAccount,
        meta: {
          title: 'Account',
          requiresAuth: true,
          requiredRoles: ['Publisher', ],
        }
      },
      {
        path: '/publisher-payment-history/details/:id',
        component: PublisherPaymentHistoryDetails,
        meta: {
          title: 'Payment History Details',
          requiresAuth: true,
          requiredRoles: ['Publisher', ],
        }
      },

      {
        path: '/publisher-payment-history',
        component: PublisherPaymentHistory,
        meta: {
          title: 'Payment History',
          requiresAuth: true,
          requiredRoles: ['Publisher', ],
        }
      },

      {
        path: '/publisher-support-tickets',
        component: PublisherSupportTickets,
        meta: {
          title: 'Support Tickets',
          requiresAuth: true,
          requiredRoles: ['Publisher', ],
        }
      },

      {
        path: '/publisher-support-ticket-create',
        component: PublisherSupportTicketCreate,
        meta: {
          title: 'Support Ticket Create',
          requiresAuth: true,
          requiredRoles: ['Publisher', ],
        }
      },

      {
        path: '/publisher-support-ticket-edit/:id',
        component: PublisherSupportTicketEdit,
        meta: {
          title: 'Support Ticket Edit',
          requiresAuth: true,
          requiredRoles: ['Publisher', ],
        }
      },

      {
        path: '/publisher-support-ticket-view/:id',
        component: PublisherSupportTicketView,
        meta: {
          title: 'Support Ticket View',
          requiresAuth: true,
          requiredRoles: ['Publisher', ],
        }
      },

      // Advertiser Dashboard Start 
      {
        path: '/advertiser/dashboard/:id?',
        component: AdvertiserDashboard,
        meta: {
          title: 'Dashboard',
          requiresAuth: true,
          requiredRoles: ['Advertiser', ],
        }
      },

      {
        path: '/advertiser-offers',
        component: AdvertiserOffers,
        meta: {
          title: 'Offers',
          requiresAuth: true,
          requiredRoles: ['Advertiser', ],
        }
      },

      {
        path: '/advertiser-offers-view/:id',
        component: AdvertiserOffersView,
        meta: {
          title: 'Offer View',
          requiresAuth: true,
          requiredRoles: ['Advertiser', ],
        }
      },

      {
        path: '/advertiser-login-ringba',
        component: AdvertiserLoginRingba,
        meta: {
          title: 'Login Ringba',
          requiresAuth: true,
          requiredRoles: ['Advertiser', ],
        }
      },

      {
        path: '/advertiser-pay-per-call',
        component: AdvertiserPayPerCall,
        meta: {
          title: 'Pay Per Call',
          requiresAuth: true,
          requiredRoles: ['Advertiser', ],
        }
      },

      {
        path: '/advertiser-notices',
        component: AdvertiserNotices,
        meta: {
          title: 'Notices',
          requiresAuth: true,
          requiredRoles: ['Advertiser', ],
        }
      },

      {
        path: '/advertiser-rules',
        component: AdvertiserRules,
        meta: {
          title: 'Rules',
          requiresAuth: true,
          requiredRoles: ['Advertiser', ],
        }
      },

      {
        path: '/advertiser-faq',
        component: AdvertiserFaq,
        meta: {
          title: 'Faq',
          requiresAuth: true,
          requiredRoles: ['Advertiser', ],
        }
      },

      {
        path: '/advertiser-account/:id?',
        component: AdvertiserAccount,
        meta: {
          title: 'Account',
          requiresAuth: true,
          requiredRoles: ['Advertiser', ],
        }
      },

      {
        path: '/advertiser-payment-history-details/:id',
        component: AdvertiserPaymentHistoryDetails,
        meta: {
          title: 'Payment History Details',
          requiresAuth: true,
          requiredRoles: ['Advertiser', ],
        }
      },
      {
        path: '/advertiser-payment-history',
        component: AdvertiserPaymentHistory,
        meta: {
          title: 'Payment History',
          requiresAuth: true,
          requiredRoles: ['Advertiser', ],
        }
      },

      {
        path: '/advertiser-support-tickets',
        component: AdvertiserSupportTickets,
        meta: {
          title: 'Support Tickets',
          requiresAuth: true,
          requiredRoles: ['Advertiser', ],
        }
      },

      {
        path: '/advertiser-support-ticket-create',
        component: AdvertiserSupportTicketCreate,
        meta: {
          title: 'Support Ticket Create',
          requiresAuth: true,
          requiredRoles: ['Advertiser', ],
        }
      },

      {
        path: '/advertiser-support-ticket-edit/:id',
        component: AdvertiserSupportTicketEdit,
        meta: {
          title: 'Support Ticket Edit',
          requiresAuth: true,
          requiredRoles: ['Advertiser', ],
        }
      },

      {
        path: '/advertiser-support-ticket-view/:id',
        component: AdvertiserSupportTicketView,
        meta: {
          title: 'Support Ticket View',
          requiresAuth: true,
          requiredRoles: ['Advertiser', ],
        }
      },

      // Account Manager Dashboard Start 
      {
        path: '/account/dashboard/:id?',
        component: AccountDashboard,
        meta: {
          title: 'Dashboard',
          requiresAuth: true,
          requiredRoles: ['Account manager', ],
        }
      },
      {
        path: '/account-user-publishers',
        component: AccountPublisher,
        meta: {
          title: 'Publishers',
          requiresAuth: true,
          requiredRoles: ['Account manager', ],
        }
      },
      {
        path: '/account-view/:id',
        component: AccountView,
        meta: {
          title: 'Account View',
          requiresAuth: true,
          requiredRoles: ['Account manager', ],
        }
      },
      {
        path: '/account-user-advertisher',
        component: AccountAdvertisher,
        meta: {
          title: 'Advertisers',
          requiresAuth: true,
          requiredRoles: ['Account manager', ],
        }
      },
      {
        path: '/account-advertisher-view/:id',
        component: AccountAdvertisherView,
        meta: {
          title: 'Account View',
          requiresAuth: true,
          requiredRoles: ['Account manager', ],
        }
      },
      {
        path: '/account-payment-setting',
        component: AccountPaymentSetting,
        meta: {
          title: 'Account Payment Setting',
          requiresAuth: true,
          requiredRoles: ['Account manager', ],
        }
      },
      {
        path: '/account-campaigns',
        component: AccountCampaigns,
        meta: {
          title: 'Account Campaigns',
          requiresAuth: true,
          requiredRoles: ['Account manager', ],
        }
      },
      {
        path: '/account-campaigns-view/:id',
        component: AccountCampaignView,
        meta: {
          title: 'Account Campaigns View',
          requiresAuth: true,
          requiredRoles: ['Account manager', ],
        }
      },
      {
        path: '/account-campaigns-edit/:id',
        component: AccountCampaignEdit,
        meta: {
          title: 'Account Campaigns Edit',
          requiresAuth: true,
          requiredRoles: ['Account manager', ],
        }
      },
      {
        path: '/account-tickets',
        component: AccountTickets,
        meta: {
          title: 'Account Tickets',
          requiresAuth: true,
          requiredRoles: ['Account manager', ],
        }
      },
      {
        path: '/account-tickets-view/:id',
        component: AccountTicketView,
        meta: {
          title: 'Account Ticket View',
          requiresAuth: true,
          requiredRoles: ['Account manager', ],
        }
      },
      {
        path: '/account-tickets-edit/:id',
        component: AccountTicketEdit,
        meta: {
          title: 'Account Ticket Edit',
          requiresAuth: true,
          requiredRoles: ['Account manager', ],
        }
      },
      {
        path: '/account-profile/:id?',
        component: AccountProfile,
        meta: {
          title: 'Account Profile',
          requiresAuth: true,
          requiredRoles: ['Account manager', ],
        }
      },

      // Author Dashboard Start 
      {
        path: '/author/dashboard/:id?',
        component: authorDashboard,
        meta: {
          title: 'Dashboard',
          requiresAuth: true,
          requiredRoles: ['Author'],
        }
      },
      {
        path: '/author-pages',
        component: authorPages,
        meta: {
          title: 'Pages',
          requiresAuth: true,
          requiredRoles: ['Author'],
        }
      },
      {
        path: '/author-pages-create',
        component: authorPagesCreate,
        meta: {
          title: 'Page Create',
          requiresAuth: true,
          requiredRoles: ['Author'],
        }
      },
      {
        path: '/author-pages-edit/:id',
        component: authorPagesEdit,
        meta: {
          title: 'Page Edit',
          requiresAuth: true,
          requiredRoles: ['Author'],
        }
      },
      {
        path: '/author-blog-posts',
        component: authorBlogPosts,
        meta: {
          title: 'Blog Posts',
          requiresAuth: true,
          requiredRoles: ['Author'],
        }
      },
      {
        path: '/author-blog-posts-create',
        component: authorBlogPostsCreate,
        meta: {
          title: 'Blog Post Create',
          requiresAuth: true,
          requiredRoles: ['Author'],
        }
      },
      {
        path: '/author-blog-posts-edit/:id',
        component: authorBlogPostsEdit,
        meta: {
          title: 'Blog Post Edit',
          requiresAuth: true,
          requiredRoles: ['Author'],
        }
      },
    ]
  },
  {
    path: '/',
    component: ChatLayOuts,
    children: [
      {
        path: '/admin-chats-visitors',
        name: "Visitors",
        component: ChatLayOutVisitors,
        meta: {
          title: 'Visitors',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-chats-contact',
        name: "Contact",
        component: ChatLayOutContact,
        meta: {
          title: 'Contact',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-chats-analytics',
        name: "Analytics",
        component: ChatLayOutAnalytics,
        meta: {
          title: 'Analytics',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-chats/:id',
        name: "Live Chat",
        component: ChatStart,
        meta: {
          title: 'Live Chat',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-mobile-chats',
        name: "Live Chat Mobile",
        component: ChatStartMobile,
        meta: {
          title: 'Live Chat',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-mobile-chat/:id',
        name: "Live Chat Mobile Start",
        component: ChatStartMobileStart,
        meta: {
          title: 'Live Chat',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-mobile-chat-profile/:id',
        name: "Live Chat Mobile Start profile",
        component: ChatStartMobileStartProfile ,
        meta: {
          title: 'Live Chat',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-mobile-chat-visitors',
        name: " Mobile Visitors",
        component: ChatStartMobileVisitors ,
        meta: {
          title: 'Visitors',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-mobile-chat-analytic',
        name: " Mobile Analytic",
        component: ChatStartMobileAnalytic ,
        meta: {
          title: 'Analytic',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },
      {
        path: '/admin-mobile-chat-contact',
        name: " Mobile Contact",
        component: ChatStartMobileContact ,
        meta: {
          title: 'Contacts',
          requiresAuth: true,
          requiredRoles: ['Super', 'Admin', ],
        }
      },

    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: '', 
  linkExactActiveClass: '' 
});


// router.js
// router.js
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token');
  if (to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = 'DOPPCALL'; 
  }

  if (isAuthenticated || !to.meta.requiresAuth) {
    next(); 
  } else {
    window.location.href = `https://doppcall.com/?token=logout`;
  }
});


// router.beforeEach((to, from, next) => {
//   const removeShowClass = () => {
//     const elements = document.querySelectorAll('.show');
//     elements.forEach(element => element.classList.remove('show')); 
//   };
//   removeShowClass();
//   const isAuthenticated = localStorage.getItem('token');

//   if (to.meta.requiresAuth && !isAuthenticated) {
//     window.location.href =`https://doppcall.com/?token=logout`;
//     return;
//   }

//   if (to.meta.requiresAuth) {
//     axios.get(`https://api.doppcall.com/api/auth/user/data`, {
//       headers: {
//         Authorization: "Bearer " + localStorage.getItem("token")
//       }
//     })
//     .then((res) => {
//       const userRole = res.data.role.name;
//       if (to.meta.requiredRoles && !to.meta.requiredRoles.includes(userRole)) {
//         window.location.href =`https://doppcall.com/?token=logout`;
//       } else {
//         next();
//       }
//     })
//     .catch((error) => {
//       window.location.href =`https://doppcall.com/?token=logout`;
//     });
//   } else {
//     next();
//   }
// });
export default router;