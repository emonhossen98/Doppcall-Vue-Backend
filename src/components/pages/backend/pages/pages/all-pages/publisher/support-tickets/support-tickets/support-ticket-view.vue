<template>
    <div v-if="getLoader">
    <Loader></Loader>
  </div>
    <!-- Content wrapper -->
    <div class="content-wrapper">
      <!-- Content -->
      <div class="container-xxl flex-grow-1 container-p-y">
        <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
            <div class="row mt-4">
                <div class="col-12 col-lg-9">
                  <div class="card">
                    <div class="card-body">
                      <!-- Ticket Header -->
                      <div class="mb-3">
                        <div class="row">
                          <div class="col-lg-12">
                            <div class="d-flex align-items-start">
                              <!-- Avatar -->
                              <div class="me-3 support-avatar">
                                <img :src="ticket.convart_image" alt="DOPPCALL" style="width: 50px; height: 50px;" class="rounded-circle">
                              </div>
                              <!-- User Info -->
                              <div class="flex-grow-1">
                                <div class="d-flex justify-content-between align-items-center">
                                  <div>
                                    <h5 class="mb-0">
                                      {{ ticket?.user?.fname }} {{ ticket?.user?.lname }}
                                    </h5>
                                    <small class="text-muted">{{ ticket.convart_open_date }}</small>
                                    <div class="support-message" v-html="ticket.description"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- Ticket Messages -->
                      <template v-if="ticketMessages.length > 0">
                        <div v-for="(value, index) in ticketMessages" :key="index" :class="ticket.user_id == value.user.id ? 'user-background' : 'admin-background '" class="p-3 rounded shadow-sm mb-3">
                          <div class="d-flex align-items-start">
                            <!-- Message Avatar -->
                            <div class="me-3">
                              <img :src="value.convart_image" alt="DOPPCALL" class="rounded-circle" style="width: 50px; height: 50px;">
                            </div>

                            <!-- Message Content -->
                            <div class="flex-grow-1">
                              <div class="d-flex justify-content-between align-items-center">
                                <div>
                                  <h6 class="mb-0">
                                    {{ value?.user?.fname }} {{ value?.user?.lname }}
                                  </h6>
                                  <small class="text-muted">{{ value.convart_updated_at }}</small>
                                </div>
                              </div>

                              <div class="mt-2 support-message" v-html="value.message"></div>

                              <template v-if="value.files != null">
                                <div v-if="isImage(value.files)">
                                  <div class="modal fade" :id="'viewImage'+value.id" tabindex="-1" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                      <div class="modal-content">
                                        <div class="modal-header">
                                          <h5 class="modal-title" id="exampleModalLabel1">Image View Modal</h5>
                                          <button
                                            type="button"
                                            class="btn-close"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                          ></button>
                                        </div>
                                        <div class="modal-body py-0">
                                          <img style="width: 300px;" :src="globalVariables.appUrl+value.files" alt="image" class="h-auto rounded" />
                                          
                                        </div>
                                        <div class="modal-footer">
                                          <a :href="globalVariables.appUrl+value.files" download target="_blank" title="Click To Download Image" class="btn btn-primary">
                                            <i class="fa-solid fa-download me-2"></i> Download
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                <a href="#" data-bs-toggle="modal" :data-bs-target="'#viewImage'+value.id" title="Click To View Image" class="text-blue-600">
                                  <img style="width: 80px;" :src="globalVariables.appUrl+value.files" alt="image" class="w-32 h-auto rounded" />
                                </a>
                                </div>
                                <div v-else-if="isPDF(value.files)">
                                  <a target="_blank" title="Click To Download PDF" :href="globalVariables.appUrl+value.files" download class="text-blue-600 underline">Download PDF</a>
                                </div>
                                <div v-else-if="isDoc(value.files)">
                                  <a target="_blank" title="Click To Download DOC" :href="globalVariables.appUrl+value.files" download class="text-blue-600 underline">Download DOC</a>
                                </div>
                              </template>

                              <!-- Action Buttons -->
                              <div v-if="ticket.user_id == value.user.id" class="mt-2">
                                <button title="Edit"
                                  type="button"
                                  @click="CommentEdit(value.id)"
                                  data-bs-toggle="modal"
                                  data-bs-target="#commentEditModal"
                                  class="btn btn-sm btn-outline-primary me-2"
                                >
                                  <i class="far fa-edit"></i>
                                </button>
                                <button
                                title="Delete"
                                  type="button"
                                  @click="CommentDelete(value.id)"
                                  class="btn btn-sm btn-outline-danger"
                                >
                                  <i class="far fa-trash-alt"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </template>
                    </div>
                  </div>

                    
                    <template v-if="ticket.status == 'Re-Open'">
                        <div class="card mt-4">
                            <div class="card-body">
                                <form>
                                    <div class="form-group">
                                        <label for="comment" class="required mb-1">Comment</label><span class="word_limit">(Word Count: {{ wordCount }} / 200) 
                                          <span v-if="wordLimitReached" style="color: red;">(Word limit reached)</span></span>
                                        <textarea v-model="comment" ref="Comment" id="comment" class="form-control"  required="required" rows="4"></textarea>
                                        <div v-if="validationErrors && validationErrors.comment" class="text-danger">
                                            {{ validationErrors.comment[0] }}
                                        </div>
                                    </div>

                                    <div class="row mt-3">
                                            <div class="col-sm-6">
                                              <label class="d-block mb-1">Images</label>
                                              <div class="custom-file">
                                                  <input  type="file" class="form-control" ref="fileInput" accept=".jpg, .png, .pdf, .docx"  @change="handleImageUpload($event)" id="customFile"/>
                                              </div>
                                            </div>
                                            <div class="col-sm-6">
                                              <img style="width: 140px;" v-if="themeShowImage.theme_logo" :src="themeShowImage.theme_logo" class="imgpreview">
                                          </div>
                                    </div>

                                    <div class="form-group mt-3">
                                        <label class="d-block mb-3 required">Status</label>
                                        <div class="radio-btn">
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input status" @click="statusChange('Re-Open')" type="radio" name="status" id="open" value="Re-Open" :checked=" ticket.status == 'Re-Open' ">
                                                <label class="form-check-label" for="open">Re-Open</label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input status" @click="statusChange('Close')" :checked=" ticket.status == 'Close' " type="radio" name="status" id="close" value="Close">
                                                <label class="form-check-label" for="close">Close</label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                              <input class="form-check-input status" @click="statusChange('Open')" :checked=" ticket.status == 'Open' " type="radio" name="status" id="open" value="Open">
                                              <label class="form-check-label" for="open">Open</label>
                                          </div>
                                          <div class="form-check form-check-inline">
                                              <input class="form-check-input status" @click="statusChange('Process')" :checked=" ticket.status == 'Process' " type="radio" name="status" id="process" value="Process">
                                              <label class="form-check-label" for="process">Process</label>
                                          </div>
                                        </div>
                                    </div>
                                    <div class="text-end mt-3">
                                        <button type="button" @click="replayComment()" class="btn btn-sm btn-primary">Reply Comment</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </template>
                </div>

                <div class="col-12 col-lg-3">
                    <div class="card">
                        <div class="card-body">
                            <div class="support-info">
                                <div class="support-img text-center overflow-hidden">
                                    <img :src="ticket.convart_image" alt="DOPPCALL">
                                </div>
                                <table class="w-100 mt-3 support-table">
                                    <tr style="line-height: 2rem">
                                        <td><strong>Full Name</strong></td>
                                        <td>{{ ticket && ticket.user && ticket.user.fname }} {{ ticket && ticket.user && ticket.user.lname }}</td>
                                    </tr>
                                    <tr style="line-height: 2rem">
                                        <td><strong>Browser</strong></td>
                                        <td>{{ ticket && ticket.user && ticket.user.browser }}</td>
                                    </tr>
                                    <tr style="line-height: 2rem">
                                        <td><strong>OS</strong></td>
                                        <td>{{ ticket && ticket.user && ticket.user.os }}</td>
                                    </tr>
                                    <template v-if="ticket && ticket.user && ticket.user.country_code != null">
                                      <tr style="line-height: 2rem">
                                          <td><strong>Country</strong></td>
                                          <td>
                                            <img class="w-20" :src="'https://flagicons.lipis.dev/flags/4x3/' + ticket.user.country_code + '.svg'" alt="Country Flag">
                                          </td>
                                      </tr>
                                    </template>
                                    <tr style="line-height: 2rem">
                                        <td><strong>Ticket ID</strong></td>
                                        <td>#{{ ticket.ticket_no }}</td>
                                    </tr>
                                    <tr style="line-height: 2rem">
                                        <td><strong>Subject</strong></td>
                                        <td>{{ ticket && ticket.subject && ticket.subject.name }}</td>
                                    </tr>
                                    <tr style="line-height: 2rem">
                                        <td><strong>Opened</strong></td>
                                        <td>{{ ticket.convart_open_date }}</td>
                                    </tr>
                                    <tr style="line-height: 2rem">
                                        <td><strong>Priority</strong></td>
                                        <td v-html="ticket.convart_ticket_priority"></td>
                                    </tr>
                                    <tr style="line-height: 2rem">
                                        <td><strong>Status</strong></td>
                                        <td v-html="ticket.convart_ticket_status"></td>
                                    </tr>
                                </table>

                                <div class="ticket-close text-center mt-4">
                                    <template v-if="ticket.status == 'Re-Open'">
                                      <button @click="updateStatus('Close',ticket.id)" class="btn btn-sm btn-danger">Closed</button>
                                    </template>
                                    <template v-else>
                                      <button @click="updateStatus('Re-Open',ticket.id)" class="btn btn-sm btn-info">Re-Open</button>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      </div>
    </div>



    <div class="modal fade" id="commentEditModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel3">Edit</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <div class="modal-body py-0">
              <div class="row mt-3">
                <div class="col-md-12">
                  <div class="form-group">
                    <label for="comment" class="required">Comment</label>
                    <textarea v-model="editComment.comment" rows="6" class="form-control"></textarea>
                    <div v-if="validationErrors && validationErrors.comment" class="text-danger">
                      {{ validationErrors.comment[0] }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="row mt-3">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="image">Image</label>
                    <input type="file" @change="handleImageUploadEdit($event)"  class="form-control" accept=".jpg, .png, .pdf, .docx" id="customFile"/>
                  </div>
                </div>
                <div class="col-sm-6">
                  <img style="width:140px;" v-if="themeShowEditImage.theme_logo" :src="themeShowEditImage.theme_logo" class="imgpreview">
                </div>
              </div>
            </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-label-secondary btn-sm" data-bs-dismiss="modal">
              Close
            </button>
            <button @click="commentUpdate()" type="button" class="btn btn-primary btn-sm"><i class="fas fa-check fa-sm me-1"></i>Save changes</button>
          </div>
        </div>
      </div>
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
        { label: "View", url: "" },
      ],
      getLoader: false,
      ticket: "",
      role: "",
      ticketMessages: "",
      validationErrors: null,
      showModal : false,
      editedData : {
        data_id :"",
      },
      editComment: {
        edit_id: "",
        comment: "",
        image: "",
      },
      messageCreate : {
        support_id : "",
        ticket_no : "",
        comment : "",
        image : "",
        status : "",
      },
      wordCount: 0,
      wordLimitReached: false,
      themeShowImage: {
        theme_logo: "",
      },
      themeShowEditImage: {
        theme_logo: "",
      },
    };
  },
  async mounted() { 
    try {
      const { role, isAuthorized } = await fetchUserRolePublisher();
      if (role == 'Publisher') {
        this.getTicketSubjectViewData();
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  },
  methods: {
    getExtension(file) {
      return file.split('.').pop().toLowerCase();
    },
    isImage(file) {
      const ext = this.getExtension(file);
      return ['png', 'jpg', 'jpeg', 'gif'].includes(ext);
    },
    isPDF(file) {
      return this.getExtension(file) === 'pdf';
    },
    isDoc(file) {
      const ext = this.getExtension(file);
      return ['doc', 'docx'].includes(ext);
    },

    getTicketSubjectViewData() {
      this.getLoader = true;
      axios
        .get(
          this.globalVariables.apiUrl+`publisher/support-tickets/${this.$route.params.id}`,
          {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          }
        )
        .then((res) => {
          this.messageCreate.support_id = res.data.ticket.id;
          this.messageCreate.ticket_no = res.data.ticket.ticket_no;
          this.messageCreate.status = res.data.ticket.status;
          this.ticket = res.data.ticket;
          this.role = res.data.role;
          this.ticketMessages = res.data.ticketMessages;
        //   console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.getLoader = false;
          $(this.$refs.Comment).summernote({
            placeholder: 'Please explain your issue in detail. Include any error messages, dates, or campaign names.',
            height: 200,
            callbacks: {
              onChange: contents => {
                const text = $('<div>').html(contents).text(); 
                const words = text.trim().split(/\s+/); 
                const wordCount = words.filter(w => w.length > 0).length;

                if (wordCount > 200) {
                  const limitedText = words.slice(0, 200).join(' ');
                  $(this.$refs.Comment).summernote('code', limitedText);
                  this.messageCreate.comment = limitedText;
                  this.wordLimitReached = true;
                } else {
                  this.messageCreate.comment = contents;
                  this.wordLimitReached = false;
                }
                this.wordCount = wordCount; 
              }
            }
          });
        });
    },

    SupportTicketsUpdate() {
      this.getLoader = true;
      axios
        .post(
          this.globalVariables.apiUrl+`publisher/support-tickets/update/${this.$route.params.id}`,
          this.ticketCreate,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          toastr.success(res.data.message);
          // const modal = document.getElementById("TrafficInfoCreate");
          // const bootstrapModal = bootstrap.Modal.getInstance(modal);
          // if (bootstrapModal) {
          //   bootstrapModal.hide();
          // }
          this.$router.push("/publisher-support-tickets");
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

    replayComment() {
      this.getLoader = true;
      axios
        .post(
          this.globalVariables.apiUrl+`publisher/support-tickets/message/reply`,this.messageCreate,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
            this.messageCreate.comment = "";
            this.messageCreate.image = "";
            const fileInput = this.$refs.fileInput;
            fileInput.value = '';
            toastr.success(res.data.message);
            this.getTicketSubjectViewData();
            $(this.$refs.Comment).summernote('code', '');
            this.themeShowImage.theme_logo = '';
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

    updateStatus(status,id){
      this.getLoader = true;
          axios 
            .get(
              this.globalVariables.apiUrl+`publisher/support-tickets/reply/status/${status}/${id}`,
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
            )
            .then((res) => {
                toastr.success(res.data.message);
                this.getTicketSubjectViewData();
            })
            .catch((e) => {
              return e;
            })
            .finally(() => {
              this.getLoader = false;
            });
    },
    
    // handleImageUpload(event) {
    //   this.editComment.image = event.target.files[0];
    //   this.messageCreate.image = event.target.files[0];
    // },

    CommentEdit(id) {
        this.editedData.data_id = id;
      axios
        .post(
          this.globalVariables.apiUrl+`publisher/support-tickets/reply/edit`,this.editedData,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
            this.editComment.edit_id = res.data.id;
            this.editComment.comment = res.data.message;
        })
        .catch((e) => {
          return e;
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    commentUpdate(){
      this.getLoader = true;
      axios
        .post(
          this.globalVariables.apiUrl+"publisher/support-tickets/reply/update",
            this.editComment,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((res) => {
            if(res.data.status == 'success'){
              toastr.success(res.data.message);
              this.getTicketSubjectViewData();
              const modal = document.getElementById("commentEditModal");
              const bootstrapModal = bootstrap.Modal.getInstance(modal);
              if (bootstrapModal) {
                this.editComment.image = "";
                this.themeShowEditImage.theme_logo = "";
                bootstrapModal.hide();
              }
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

    handleImageUpload(event) {
      const file = event.target.files[0];
      if (!file) return;
      if (!file.type.startsWith('image/')) {
        const typeParts = file.type.split('/');
        const fileType = typeParts[1] || file.type; 
        toastr.info(`Your file type: ${fileType}.`);
      }
      this.messageCreate.image = file;
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

    handleImageUploadEdit(event) {
      const file = event.target.files[0];
      if (!file) return;
      if (!file.type.startsWith('image/')) {
        const typeParts = file.type.split('/');
        const fileType = typeParts[1] || file.type; 
        toastr.info(`Your file type: ${fileType}.`);
      }
      this.editComment.image = file;
      const reader = new FileReader();
      reader.onload = () => {
        if (!file.type.startsWith('image/')) {
          this.themeShowEditImage.theme_logo = '';
        }else{
          this.themeShowEditImage.theme_logo = reader.result;
        }
      };
      reader.readAsDataURL(file);
    },

    CommentDelete(id) {
      Swal.fire({
        text: "Are you sure delete",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.value) {
          this.getLoader = true;
          axios
            .delete(
              this.globalVariables.apiUrl+`publisher/support-tickets/reply/${id}/delete`,
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
            )
            .then((res) => {
              toastr.success(res.data.message);
              this.getTicketSubjectViewData();
            })
            .catch((e) => {
              return e;
            })
            .finally(() => {
              this.getLoader = false;
            });
        }
      });
    },

    statusChange(id){
      this.messageCreate.status = id;
    },
  },
};
</script>
<style scoped>
.modal-dialog {
	max-width: 460px !important;
	width: 100% !important;
}
.support-avatar{
  width:55px;
  height : 50px;
}
.support-avatar img{
  width:100%;
}
.user-background {
	background: #eeeeee70;
}
.admin-background {
	background: #b5b5b570;
}
</style>
