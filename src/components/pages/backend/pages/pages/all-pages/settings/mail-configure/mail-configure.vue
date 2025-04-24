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
            <div class="col-md-12 mx-auto col-12">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title mb-0">Mail</h5>
                </div>
                <div class="card-body pt-1">
                    <form>
                        <div class="form-group mb-3">
                        <label for="service" class="required mb-1">Service</label>
                        <select v-model="mailCreateData.service" id="service" class="form-select" required>
                            <option v-for="(smtp, index) in smtps" :key="index" :value="smtp.id">{{ smtp.name }}</option>
                        </select>
                        <div v-if="validationErrors && validationErrors.service" class="text-danger">
                            {{ validationErrors.service[0] }}
                        </div>
                        </div>

                        <div class="form-group mb-3">
                            <label for="sender_mail" class="required mb-1">Sender Mail</label>
                            <input type="text" v-model="mailCreateData.sender_mail" id="sender_mail" class="form-control" required>
                            <div v-if="validationErrors && validationErrors.sender_mail" class="text-danger">
                            {{ validationErrors.sender_mail[0] }}
                        </div>
                        </div>
                        
                        <div class="form-group mb-3">
                            <label for="mail_username_2" class="mb-1">Mail Username 2</label>
                            <div class="tag-input">
                              <div v-for="(tag, index) in tags" :key="tag" class="tag-input__tag form-class font-class">
                                {{ tag }}
                                <span @click="removeTag(index)">x</span>
                              </div>
                              <input type="text" placeholder="Enter a Tag" class="tag-input__text form-control" @keydown.enter="addTag" @keydown.188="addTag" @keydown.delete="removeLastTag"/>
                            </div>
                        </div>


                        <div class="form-group text-end mb-3">
                            <button type="button" @click="MailSave()" class="btn btn-primary btn-sm">Save Changes</button>
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
        { label: "Mail", url: "" },
      ],
      getLoader: false,
      smtps: "",
      mailCreateData: {
        service: "",
        sender_mail: "",
        mail_username_2: "",
      },
      getService: "",
      tags: [],
    };
  },
  async mounted() { 
    try {
      const { role, isAuthorized } = await fetchUserRole();
      if (role == 'Super' || role == 'Admin') {
        this.getMailData();
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  },
  methods: {
    addTag(event) {
      event.preventDefault();
      let val = event.target.value.trim();
      if (val.length > 0) {
        if (this.tags.length >= 1) {
          for (let i = 0; i < this.tags.length; i++) {
            if (this.tags[i] === val) {
              return false;
            }
          }
        }
        this.tags.push(val);
        event.target.value = "";
      }
    },
    removeTag(index) {
      this.tags.splice(index, 1);
    },
    removeLastTag(event) {
      if (event.target.value.length === 0) {
        this.removeTag(this.tags.length - 1);
      }
    },
    MailSave() {
      this.getLoader =  true;
      var allTags                          = this.tags.join(",");
      this.mailCreateData.mail_username_2  = allTags;
      axios
        .post(
          this.globalVariables.apiUrl+"admin/mailsettings/mail-configure/store",
          this.mailCreateData,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
         toastr.success(res.data.message);
         this.getMailData();
        })
        .catch(() => {
          if (error.response && error.response.data && error.response.data.errors) {
            this.validationErrors = error.response.data.errors;
          }
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    getMailData() {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl+"admin/mailsettings/mail-configure", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          this.smtps = res.data.smtps;
          this.mailCreateData.service = res.data.host_id.id;
          this.mailCreateData.sender_mail = res.data.mail_username;
          this.tags                    = res.data.mail_username_2 && res.data.mail_username_2.split(/\s*,\s*/);
          this.mailCreateData.mail_username_2 = res.data.mail_username_2;
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

.custom_selectBox {
	display: block;
	width: 100%;
	height: 40px;
	padding: 0.375rem 0.75rem;
	font-size: 0.875rem;
	font-weight: 400;
	line-height: 1.5;
	color: #4d5875;
	background-color: #fff;
	background-clip: padding-box;
	border: 1px solid #e1e5ef;
	border-radius: 3px;
	transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.btn-light {
	background-color: #fcfcff !important;
	border-color: #fff !important;
}
a {
  position: absolute;
  right: 15px;
  bottom: 15px;
  font-weight: bold;
  text-decoration: none;
  color: #00003a;
  font-size: 20px;
}

/*tag input style*/

.tag-input[data-v-518086b5] {
	border: 1px solid #d9dfe7;
	background: #fff;
	border-radius: 4px;
	font-size: 0.9em;
	box-sizing: border-box;
	margin-bottom: 10px;
}

.tag-input__tag {
  height: 24px;
  color: white;
  float: left;
  font-size: 14px;
  margin-right: 10px;
  background-color: #667eea;
  border-radius: 15px;
  margin-top: 10px;
  line-height: 24px;
  padding: 0 8px;
  font-family: "Roboto";
}

.tag-input__tag > span {
  cursor: pointer;
  opacity: 0.75;
  display: inline-block;
  margin-left: 8px;
}

.tag-input__text {
  border: none;
  outline: none;
  font-size: 1em;
  background: none;
}
.quslist {
	padding: 0;
	padding: 3px;
	border: 1px solid lavender;
	position: absolute;
	background: white;
	width: 60%;
	z-index: 1;
	/* display: none; */
	max-height: 200px;
	overflow: scroll;
}
.quslist li{
    padding: 2px;
    cursor: pointer;
}
.tag-input__tag {
	font-family: unset !important;
}
</style>