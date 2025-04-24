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
                <div class="col-12">
                <div class="card">
                    <div class="card-header py-3">
                        <h5 class="card-title mb-0 mt-2">New Support Ticket</h5>
                    </div>
                    <div class="card-body">
                        <form>
                            <div class="row-mb-15">
                                <div class="row mt-4">
                                    <div class="col-md-4">
                                        <label for="subjects" class="mb-1">Custom Subject<span class="text-danger">*</span></label>
                                        <select v-model="ticketCreate.subject" id="subject" class="form-select">
                                            <option value="">Select Subject</option>
                                            <option v-for="(data,index) in subjects"  :key="index" :value="data.name">{{ data.name }}</option>
                                        </select>
                                        <div v-if="validationErrors && validationErrors.subject" class="text-danger">
                                            {{ validationErrors.subject[0] }}
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <label for="priority" class="required mb-1">Priority</label>
                                        <select v-model="ticketCreate.priority" id="priority" required class="form-select">
                                            <option value="">Select Priority</option>
                                            <option value="Low">Low</option>
                                            <option value="Medium">Medium</option>
                                            <option value="High">High</option>
                                        </select>
                                        <div v-if="validationErrors && validationErrors.priority" class="text-danger">
                                            {{ validationErrors.priority[0] }}
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                    <label for="video_link" class="mb-1">Video Link/URL</label>
                                    <input type="url" class="form-control" v-model="ticketCreate.video_link" id="video_link" placeholder="https://" >
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-12">
                                        <label for="description" class="required mb-1">Description </label> <span class="word_limit">(Word Count: {{ wordCount }} / 200) 
                                          <span v-if="wordLimitReached" style="color: red;">(Word limit reached)</span></span>
                                            <textarea v-model="ticketCreate.description" ref="Description" class="form-control"  required="required" rows="4"></textarea>
                                            <div v-if="validationErrors && validationErrors.priority" class="text-danger">
                                                {{ validationErrors.priority[0] }}
                                            </div>
                                        </div>
                                 </div>
                                <div class="row mt-3">
                                    <div class="col-md-6">
                                        <label class="d-block mb-1">Images</label>
                                        <div class="custom-file">
                                            <input type="file" ref="myFile" @change="handleImageUpload($event)" class="form-control" id="customFile" accept=".jpg, .png, .pdf, .docx">
                                            <label for="customFile"></label>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <img style="width: 200px;" v-if="themeShowImage.theme_logo" :src="themeShowImage.theme_logo" class="imgpreview">
                                      </div>
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <div class="custom-control custom-switch">
                                            <input type="checkbox" hidden="hidden" id="username" @change="changeStatus($event)">
                                            <label class="switch"  for="username" ></label><span class="required">Ticket Active Status</span>
                                            <div v-if="validationErrors && validationErrors.is_active" class="text-danger">
                                                {{ validationErrors.is_active[0] }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="text-end mt-3">
                                    <button type="button" @click="SupportTicketsSave()" class="btn btn-primary btn-sm">
                                       Create
                                    </button>
                                </div>
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
import Loader from "../../../../../../include/loader.vue";
  import Breadcrumb from "../../../../../../include/breadcrumb.vue";
  import { inject } from "vue";
  import { fetchUserRolePublisher } from "@/services/userServicePublisher";

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
        { label: "Dashboard", url: "/publisher/dashboard" },
        { label: "Support Tickets", url: "/publisher-support-tickets" },
        { label: "Create", url: "" },
      ],  
      getLoader: false,
      subjects : "",
      ticketCreate: {
        subject: "",
        priority: "",
        video_link: "",
        description: "",
        is_active: null,
        image: [], 
      },
      themeShowImage: {
        theme_logo: "",
      },
      wordCount: 0,
      wordLimitReached: false,
      validationErrors: null,
    };
  },
  async mounted() { 
    try {
      const { role, isAuthorized } = await fetchUserRolePublisher();
      if (role == 'Publisher') {
        this.getTicketSubject();
        $(this.$refs.Description).summernote({
            placeholder: 'Please explain your issue in detail. Include any error messages, dates, or campaign names.',
            height: 200,
            callbacks: {
              onChange: contents => {
                const text = $('<div>').html(contents).text();
                const words = text.trim().split(/\s+/);
                const wordCount = words.filter(w => w.length > 0).length;

                if (wordCount > 200) {
                  const limitedText = words.slice(0, 200).join(' ');
                  $(this.$refs.Description).summernote('code', limitedText);
                  this.ticketCreate.description = limitedText;
                  this.wordLimitReached = true;
                } else {
                  this.ticketCreate.description = contents;
                  this.wordLimitReached = false;
                }
                this.wordCount = wordCount; 
              }
            }
          });
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  },
  methods: {
    getTicketSubject() {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl+"publisher/support-tickets/create", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
            this.subjects = res.data.subjects;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    handleImageUpload(event) {
      const file = event.target.files[0];
      if (!file) return;
      if (!file.type.startsWith('image/')) {
        const typeParts = file.type.split('/');
        const fileType = typeParts[1] || file.type; 
        console.log(fileType);
        toastr.info(`Your file type: ${fileType}.`);
      }
      this.ticketCreate.image = file;
      const reader = new FileReader();
      reader.onload = () => {
        if (!file.type.startsWith('image/')) {
          this.themeShowImage.theme_logo = '';
        }else{
          this.themeShowImage.theme_logo = reader.result;
        }
      };
      reader.readAsDataURL(file);
    },

    SupportTicketsSave() {
      this.getLoader = true;
      axios
        .post(this.globalVariables.apiUrl+"publisher/support-tickets/store", this.ticketCreate, {
          headers: { 
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
           },
        })
        .then((res) => {
            toastr.success(res.data.message);
            this.$router.push('/publisher-support-tickets');
        })
        .catch((error) => {
            if(error && error.response && error.response.data && error.response.data.errors){
                this.validationErrors = error.response.data.errors;
            }
        })
        .finally(() => {
          this.getLoader = false;
        });
    },
    changeStatus(event){
        if(event.target.checked == true){
            this.ticketCreate.is_active = 'on';
        }else{
            this.ticketCreate.is_active = null;
        }
    }
  },
};
</script>

<style scoped>
.switch {
    display: inline-block;
    position: relative;
    width: 50px;
    height: 25px;
    border-radius: 20px;
    background: #b8b8b8;;
    transition: background 0.28s cubic-bezier(0.4, 0, 0.2, 1);
    vertical-align: middle;
    cursor: pointer;
}
.switch::before {
    content: '';
    position: absolute;
    top: 1px;
    left: 2px;
    width: 22px;
    height: 22px;
    background: #fafafa;
    border-radius: 50%;
    transition: left 0.28s cubic-bezier(0.4, 0, 0.2, 1), background 0.28s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
}
.switch:active::before {
    box-shadow: 0 2px 8px rgba(0,0,0,0.28), 0 0 0 20px rgba(128,128,128,0.1);
}
input:checked + .switch {
    background: #72da67;
}
input:checked + .switch::before {
    left: 27px;
    background: #fff;
}
input:checked + .switch:active::before {
    box-shadow: 0 2px 8px rgba(0,0,0,0.28), 0 0 0 20px rgba(0,150,136,0.2);
}

</style>
