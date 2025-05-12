<template>
  <div v-if="getLoader">
    <Loader></Loader>
  </div>
  <!-- Content wrapper -->
  <div class="content-wrapper">
    <!-- Content -->
    <div class="container-fluid flex-grow-1 container-p-y">
      <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
      <div class="row mt-4">
        <div class="col-md-12 col-12">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title mb-0">Chat Settings</h5>
            </div>
            <div class="card-body pt-1">
              <div class="form-group mb-3">
                <label for="notice" class="mb-1">Public Chat</label>
                <div class="content">
                  <label class="switchSmall2 m5">
                    <input v-model="chatSettings.publicChat" type="checkbox" :checked="chatSettings.publicChat == 1" :true-value="1" :false-value="0">
                    <small></small>
                  </label>
                </div>
              </div>
              <div class="form-group mb-3">
                <label for="notice" class="mb-1">Private Chat</label>
                <div class="content">
                  <label class="switchSmall2 m5">
                    <input v-model="chatSettings.privateChat" type="checkbox" :checked="chatSettings.privateChat == 1"  :true-value="1" :false-value="0">
                    <small></small>
                  </label>
                </div>
              </div>
              <div class="form-group mb-3">
                <label for="notice" class="mb-1">Audio Status</label>
                <div class="content">
                  <label class="switchSmall2 m5">
                    <input v-model="chatSettings.audioStatus" type="checkbox" :checked="chatSettings.audioStatus == 1"  :true-value="1" :false-value="0">
                    <small></small>
                  </label>
                </div>
              </div>
              <div class="form-group mb-3">
                <label for="notice" class="mb-1">Admin Seen Status</label>
                <div class="content">
                  <label class="switchSmall2 m5">
                    <input v-model="chatSettings.seenStatus" type="checkbox" :checked="chatSettings.seenStatus == 1"  :true-value="1" :false-value="0">
                    <small></small>
                  </label>
                </div>
              </div>
              <div class="form-group text-end mb-3">
                <button
                  type="button"
                  @click="chatSettingSave()"
                  class="btn btn-primary btn-sm"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>

          <div class="card mt-4">
            <div class="card-header">
              <h5 class="card-title mb-0">Notice Settings</h5>
            </div>
            <div class="card-body pt-1">
              <form>
                <div class="form-group mb-3">
                  <label for="notice" class="required mb-1">Notice</label>
                  <textarea
                    v-model="noticeSettings.notice"
                    id="notice"
                    cols="30"
                    rows="4"
                    placeholder="Enter your text here..."
                    class="form-control"
                  ></textarea>
                  <div
                    v-if="validationErrors && validationErrors.notice"
                    class="text-danger"
                  >
                    {{ validationErrors.notice[0] }}
                  </div>
                </div>

                <div class="form-group mb-3">
                  <div class="col-12">
                    <div class="status_change">
                      <label class="switch">
                        <input
                          type="checkbox"
                          v-model="noticeSettings.notice_status"
                          true-value="1"
                        />
                        <span class="slider"></span>
                      </label>
                      Notice Status
                    </div>
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label for="iframe_url" class="mb-1">Ringba URL</label>
                  <input
                    type="text"
                    v-model="noticeSettings.iframe_url"
                    id="iframe_url"
                    class="form-control"
                  />
                </div>

                <div class="form-group mb-3">
                  <label for="alt_ringba_url" class="mb-1">Alternative Ringba URL</label>
                  <input
                    type="text"
                    v-model="noticeSettings.alt_ringba_url"
                    id="alt_ringba_url"
                    class="form-control"
                  />
                </div>

                <div class="form-group text-end mb-3">
                  <button
                    type="button"
                    @click="NoticeSettingSave()"
                    class="btn btn-primary btn-sm"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div class="card mt-4">
            <div class="card-header">
              <h5 class="card-title mb-0">Account Alert</h5>
            </div>
            <div class="card-body pt-1">
              <form>
                <div class="form-group mb-3">
                  <label for="content" class="required mb-1">Content</label>
                  <textarea
                    v-model="accountAlert.content"
                    id="content"
                    cols="30"
                    rows="4"
                    placeholder="Enter your text here..."
                    class="form-control"
                  ></textarea>
                  <div
                    v-if="validationErrors && validationErrors.content"
                    class="text-danger"
                  >
                    {{ validationErrors.content[0] }}
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label for="status" class="required mb-1">Status</label>
                  <select v-model="accountAlert.status" id="status" class="form-control">
                    <option value="0">Pending</option>
                    <option value="1">Publish</option>
                  </select>
                  <div
                    v-if="validationErrors && validationErrors.status"
                    class="text-danger"
                  >
                    {{ validationErrors.status[0] }}
                  </div>
                </div>
                <div class="form-group text-end mb-3">
                  <button
                    type="button"
                    @click="AccountAlertSave()"
                    class="btn btn-primary btn-sm"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div class="card mt-4">
            <div class="card-header">
              <h5 class="card-title mb-0">Skype Chart</h5>
            </div>
            <div class="card-body pt-1">
              <form>
                <div class="form-group mb-3">
                  <label for="skype_username" class="mb-1">Skype Username</label>
                  <input
                    type="text"
                    v-model="skypeChart.skype_username"
                    id="skype_username"
                    class="form-control"
                  />
                </div>

                <div class="form-group text-end">
                  <button
                    type="button"
                    @click="skypeIdSave()"
                    class="btn btn-primary btn-sm"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div class="card mt-4">
            <div class="card-header">
              <h5 class="card-title mb-0">Publishers & Advertisers Live Support</h5>
            </div>
            <div class="card-body pt-1">
              <form>
                <div class="form-group mb-3">
                  <label for="Label" class="mb-1">Label Name</label>
                  <input type="text" v-model="aplivesupport.label" id="Label" class="form-control" placeholder="Enter Your Label Name"/>
                </div>
                <div class="form-group mb-3">
                  <label for="url" class="mb-1">URL</label>
                  <input type="text" v-model="aplivesupport.url" id="url" class="form-control" placeholder="Enter Your URL"/>
                </div>
                <div class="form-group mb-3">
                  <label for="target" class="mb-1">Target</label>
                  <select id="target" v-model="aplivesupport.target" class="form-select">
                    <option value="0">Same Tab</option>
                    <option value="1">New Tab</option>
                  </select>
                </div>
                <div class="form-group text-end">
                  <button type="button" @click="aplivesupportSave()" class="btn btn-primary btn-sm">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div class="card mt-4">
            <div class="card-header">
              <h5 class="card-title mb-0">Shortcode Form</h5>
            </div>
            <div class="card-body pt-1">
              <form>
                <div class="form-group mb-3">
                  <label for="date_time" class="mb-1">Don't want to wait</label>
                  <input
                    type="text"
                    v-model="shortcodeForm.date_time"
                    id="date_time"
                    class="form-control"
                  />
                </div>

                <div class="form-group mb-3">
                  <label for="meeting_link" class="mb-1">Schedule A Meeting URL</label>
                  <input
                    type="text"
                    v-model="shortcodeForm.meeting_link"
                    id="meeting_link"
                    class="form-control"
                  />
                </div>

                <div class="form-group text-end mb-3">
                  <button
                    type="button"
                    @click="shortcodeFormSave()"
                    class="btn btn-primary btn-sm"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div class="card mt-4">
            <div class="card-header">
              <h5 class="card-title mb-0">Footer year</h5>
            </div>
            <div class="card-body pt-1">
              <form>
                <div class="form-group mb-3">
                  <label for="footer_year" class="mb-1">Year</label>
                  <input
                    type="text"
                    v-model="year.footer_year"
                    id="footer_year"
                    class="form-control"
                  />
                </div>

                <div class="form-group text-end mb-3">
                  <button
                    type="button"
                    @click="yearSave()"
                    class="btn btn-primary btn-sm"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div class="card mt-4">
            <div class="card-header">
              <h5 class="card-title mb-0">Footer Menu</h5>
            </div>
            <div class="card-body pt-1">
              <form>
                <div class="form-group mb-3">
                  <label for="footer_menu" class="required mb-1">Menus</label>
                  <textarea
                    v-model="footerMenu.footer_menu"
                    id="footer_menu"
                    cols="30"
                    rows="4"
                    placeholder="Enter menu list here..."
                    class="form-control"
                  ></textarea>
                  <div
                    v-if="validationErrors && validationErrors.footer_menu"
                    class="text-danger"
                  >
                    {{ validationErrors.footer_menu[0] }}
                  </div>
                </div>
                <div class="form-group text-end mb-3">
                  <button
                    type="button"
                    @click="footerMenuSave()"
                    class="btn btn-primary btn-sm"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- / Content -->
    <div class="content-backdrop fade"></div>
  </div>
  <!-- Content wrapper -->
</template>
<script>
import axios from "axios";
import toastr from "toastr";
import Swal from "sweetalert2";
import "toastr/build/toastr.min.css";
import Loader from "../../../../../include/loader.vue";
import Breadcrumb from "../../../../../include/breadcrumb.vue";
import { inject } from "vue";
import { fetchUserRole } from "@/services/userService";

export default {
  setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
  components: {
    Loader,
    Breadcrumb,
  },
  data() {
    return {
      breadcrumbs: [
        { label: "Dashboard", url: "/dashboard" },
        { label: "Settings", url: "" },
        { label: "Generals", url: "" },
      ],
      getLoader: false,
      chatSettings : {
        publicChat : "",
        privateChat : "",
        audioStatus : "",
        seenStatus : "",
      },
      noticeSettings: {
        notice: "",
        notice_status: "",
        iframe_url: "",
        alt_ringba_url: "",
      },
      accountAlert: {
        content: "",
        status: "",
      },
      skypeChart: {
        skype_username: "",
      },
      shortcodeForm: {
        date_time: "",
        meeting_link: "",
      },
      year: {
        footer_year: "",
      },
      footerMenu: {
        footer_menu: "",
      },
      aplivesupport: {
        label: "",
        url: "",
        target: "0",
      },
      validationErrors: null,
    };
  },
  async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role == 'Super' || role == 'Admin') {
          this.getGeneralsData();
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    },
  methods: {
    chatSettingSave() {
      this.getLoader = true;
      axios
        .post(
          this.globalVariables.apiUrl + "admin/mailsettings/admin/chat/setting",
          this.chatSettings,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          toastr.success(res.data.message);
          this.getGeneralsData();
          this.validationErrors = "";
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          this.getLoader = false;
        });
    },
    NoticeSettingSave() {
      this.getLoader = true;
      axios
        .post(
          this.globalVariables.apiUrl + "admin/mailsettings/generals/notice/store",
          this.noticeSettings,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          toastr.success(res.data.message);
          this.getGeneralsData();
          this.validationErrors = "";
        })
        .catch((error) => {
          if (
            error &&
            error.response &&
            error.response.data &&
            error.response.data.errors
          ) {
            this.validationErrors = error.response.data.errors;
          }
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    AccountAlertSave() {
      this.getLoader = true;
      axios
        .post(
          this.globalVariables.apiUrl +
            "admin/mailsettings/generals/user-access/modal-content",
          this.accountAlert,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          toastr.success(res.data.message);
          this.getGeneralsData();
          this.validationErrors = "";
        })
        .catch((error) => {
          if (
            error &&
            error.response &&
            error.response.data &&
            error.response.data.errors
          ) {
            this.validationErrors = error.response.data.errors;
          }
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    skypeIdSave() {
      this.getLoader = true;
      axios
        .post(
          this.globalVariables.apiUrl + "admin/mailsettings/generals/skype",
          this.skypeChart,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          toastr.success(res.data.message);
          this.getGeneralsData();
          this.validationErrors = "";
        })
        .catch((error) => {
          if (
            error &&
            error.response &&
            error.response.data &&
            error.response.data.errors
          ) {
            this.validationErrors = error.response.data.errors;
          }
        })
        .finally(() => {
          this.getLoader = false;
        });
    },
    aplivesupportSave() {
      this.getLoader = true;
      axios
        .post(
          this.globalVariables.apiUrl + "admin/mailsettings/generals/aplivesupport",
          this.aplivesupport,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          toastr.success(res.data.message);
          this.getGeneralsData();
          this.validationErrors = "";
        })
        .catch((error) => {
          if (
            error &&
            error.response &&
            error.response.data &&
            error.response.data.errors
          ) {
            this.validationErrors = error.response.data.errors;
          }
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    shortcodeFormSave() {
      this.getLoader = true;
      axios
        .post(
          this.globalVariables.apiUrl + "admin/mailsettings/shortcode/meeting/store",
          this.shortcodeForm,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          toastr.success(res.data.message);
          this.getGeneralsData();
          this.validationErrors = "";
        })
        .catch((error) => {
          if (
            error &&
            error.response &&
            error.response.data &&
            error.response.data.errors
          ) {
            this.validationErrors = error.response.data.errors;
          }
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    yearSave() {
      this.getLoader = true;
      axios
        .post(
          this.globalVariables.apiUrl + "admin/mailsettings/shortcode/footeryear/store",
          this.year,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          toastr.success(res.data.message);
          this.getGeneralsData();
          this.validationErrors = "";
        })
        .catch((error) => {
          if (
            error &&
            error.response &&
            error.response.data &&
            error.response.data.errors
          ) {
            this.validationErrors = error.response.data.errors;
          }
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    footerMenuSave() {
      this.getLoader = true;
      axios
        .post(
          this.globalVariables.apiUrl + "admin/mailsettings/shortcode/footermenu/store",
          this.footerMenu,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          toastr.success(res.data.message);
          this.getGeneralsData();
          this.validationErrors = "";
        })
        .catch((error) => {
          if (
            error &&
            error.response &&
            error.response.data &&
            error.response.data.errors
          ) {
            this.validationErrors = error.response.data.errors;
          }
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    getGeneralsData() {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl + "admin/mailsettings/generals", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          // Chat Settings
          this.chatSettings.publicChat = res.data.public_chat;
          this.chatSettings.privateChat = res.data.private_chat;
          this.chatSettings.audioStatus = res.data.audio_status;
          this.chatSettings.seenStatus = res.data.seen_status;

          // Notice Settings
          this.noticeSettings.notice = res.data.notice;
          this.noticeSettings.notice_status = res.data.notice_status;
          this.noticeSettings.iframe_url = res.data.iframe_url;
          this.noticeSettings.alt_ringba_url = res.data.alt_ringba_url;

          // Account Alert
          this.accountAlert.content = res.data.access_content;
          this.accountAlert.status = res.data.access_status;

          // Skype Chart
          this.skypeChart.skype_username = res.data.skype_chart;

          // Live Support
          this.aplivesupport.label = res.data.ap_live_support_label;
          this.aplivesupport.url = res.data.ap_live_support_url;
          this.aplivesupport.target = res.data.ap_live_support_target;

          // Shortcode Form
          this.shortcodeForm.date_time = res.data.meetingTime;
          this.shortcodeForm.meeting_link = res.data.meetingLink;

          // Year
          this.year.footer_year = res.data.footer_year;

          // Footer Menu
          this.footerMenu.footer_menu = res.data.footer_menu;
        })
        .catch((e) => {
          return e;
        })
        .finally(() => {
          this.getLoader = false;
        });
    },
  },
};
</script>
<style scoped>
.switchSmall {
  display: inline-block;
}
.switchSmall input {
  display: none;
}
.switchSmall small {
  display: inline-block;
  width: 32px;
  height: 16px;
  background: #455a64;
  border-radius: 30px;
  position: relative;
  cursor: pointer;
}
.switchSmall small:before {
  content: "";
  position: absolute;
  width: 10px;
  height: 10px;
  background: #fff;
  border-radius: 50%;
  top: 3px;
  left: 3px;
  transition: 0.3s;
  box-shadow: -3px 0 3px rgba(0, 0, 0, 0.1);
}

.switchSmall input:checked ~ small:before {
  transform: translate(16px, 0);
  transition: 0.3s;
}
.switchSmall2 {
  display: inline-block;
}
.switchSmall2 input {
  display: none;
}
.switchSmall2 small {
	display: inline-block;
	width: 46px;
	height: 24px;
	background: #455a64;
	border-radius: 30px;
	position: relative;
	cursor: pointer;
}
.switchSmall2 small::before {
	content: "";
	position: absolute;
	width: 26px;
	height: 27px;
	background: #fff;
	border-radius: 50%;
	top: -2px;
	left: 0px;
	transition: 0.3s;
	box-shadow: -3px 0 3px rgba(0, 0, 0, 0.25);
}
.switchSmall2 input:checked ~ small {
  background: #67d257;
  transition: 0.3s;
}
.switchSmall2 input:checked ~ small:before {
  transform: translate(20px, 0);
  transition: 0.3s;
  box-shadow: 3px 0 3px rgba(0, 0, 0, 0.25);
}
.switch {
	margin-right: 0.15rem !important;
}
</style>
