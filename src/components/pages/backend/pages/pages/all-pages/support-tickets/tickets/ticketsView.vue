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
        <div class="col-12 col-lg-9">
          <div class="card">
            <div class="card-body">
              <div class="row-mb-3">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="d-flex align-items-start">
                      <!-- Avatar -->
                      <div class="me-3 support-avatar">
                        <img :src="viewTicket.convart_image" alt="DOPPCALL" style="width: 50px; height: 50px;" class="rounded-circle">
                      </div>
                      <!-- User Info -->
                      <div class="flex-grow-1">
                        <div class="d-flex justify-content-between align-items-center">
                          <div>
                            <div class="d-flex align-items-center">
                              <h5 class="mb-0">
                                {{ viewTicket?.user?.fname }} {{ viewTicket?.user?.lname }}
                              </h5>
                              <span class="text-white bg-info ms-1 px-2 rounded-1">
                                <template v-if="viewTicket?.user?.role_id == 3">
                                  {{ 'Publisher' }}
                                </template>
                                <template v-else-if="viewTicket?.user?.role_id == 2">
                                  {{ 'Advertiser' }}
                                </template>
                              </span>
                            </div>
                            <small class="text-muted">{{ viewTicket.convart_time }}</small>
                            <div class="support-message" v-html="viewTicket.description"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <template v-if="viewMessages.length > 0">
                  <div v-for="(value, index) in viewMessages" :key="index" :class="viewTicket.user_id != value.user.id ? 'user-background' : 'admin-background '" class="p-3 rounded shadow-sm mb-3">
                    <div class="d-flex align-items-start">
                      <div class="me-3">
                        <img :src="value.convart_image" alt="DOPPCALL" class="rounded-circle" style="width: 50px; height: 50px;">
                      </div>
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
                        <div v-if="viewTicket.user_id != value.user.id" class="mt-2">
                          <button type="button" title="Edit" @click="messageEdit(value.id)" class="btn btn-sm btn-outline-primary me-2" data-bs-toggle="modal" data-bs-target="#CommentEdit">
                                  <i class="far fa-edit"></i>
                                </button>
                          <button type="button" title="Delete" @click="messageDelete(value.id)" class="btn btn-sm btn-outline-danger">
                            <i class="far fa-trash-alt"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>

          <div class="card my-3">
            <div class="card-body">
              <form>
                <div class="form-group">
                <label for="comment" class="required mb-1">Reply to Ticket</label><span class="word_limit">(Word Count: {{ wordCount }} / 200) 
                  <span v-if="wordLimitReached" style="color: red;">(Word limit reached)</span></span>
                  <textarea  ref="CommentReplay" class="comment"></textarea>
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
                        <input class="form-check-input status" @click="statusChange('Re-Open')" type="radio" name="status" id="open" value="Re-Open" :checked=" viewTicket.status == 'Re-Open' ">
                        <label class="form-check-label" for="open">Re-Open</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input status" @click="statusChange('Close')" :checked=" viewTicket.status == 'Close' " type="radio" name="status" id="close" value="Close">
                        <label class="form-check-label" for="close">Close</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input status" @click="statusChange('Open')" :checked=" viewTicket.status == 'Open' " type="radio" name="status" id="open" value="Open">
                        <label class="form-check-label" for="open">Open</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input status" @click="statusChange('Process')" :checked=" viewTicket.status == 'Process' " type="radio" name="status" id="process" value="Process">
                        <label class="form-check-label" for="process">Process</label>
                    </div>
                  </div>
                </div>
                <div class="text-end mt-3">
                  <button type="button" @click="commentReplay()"class="btn btn-sm btn-primary">
                    Reply Comment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-3" id="ticket-right-side">
          <div class="card">
            <div class="card-body">
              <div class="support-info">
                <div class="support-img text-center overflow-hidden">
                 <img :src="viewTicket.convart_image" alt="DOPPCAALL">
                </div>
                <table class="w-100 mt-3 support-table">
                  <tr>
                    <td><strong>Full Name</strong></td>
                    <td>
                      <RouterLink
                          :to="viewTicket?.user?.role_id == 3
                            ? '/admin-manage-publishers-view/' + viewTicket?.user?.id
                            : '/admin-manage-advertiser-view/' + viewTicket?.user?.id"
                        >
                          {{ viewTicket?.user?.fname }} {{ viewTicket?.user?.lname }}
                        </RouterLink>
                    </td>
                  </tr>
                  <tr>
                      <td><strong>Browser</strong></td>
                      <td>{{ viewTicket && viewTicket.user && viewTicket.user.browser }}</td>
                  </tr>
                  <tr>
                      <td><strong>OS</strong></td>
                      <td>{{ viewTicket && viewTicket.user && viewTicket.user.os }}</td>
                  </tr>
                  <template v-if="viewTicket && viewTicket.user && viewTicket.user.country_code != null">
                    <tr>
                        <td><strong>Country</strong></td>
                        <td>
                          <img class="w-20" :src="'https://flagicons.lipis.dev/flags/4x3/' + viewTicket.user.country_code + '.svg'" alt="Country Flag">
                        </td>
                    </tr>
                  </template>
                  <tr>
                    <td><strong>Ticket ID</strong></td>
                    <td>#{{ viewTicket.ticket_no }}</td>
                  </tr>
                  <tr>
                    <td><strong>Subject</strong></td>
                    <td>{{ viewTicket && viewTicket.subject && viewTicket.subject.name }}</td>
                  </tr>
                  <tr>
                    <td><strong>Opened</strong></td>
                    <td>{{ viewTicket.convat_open_date }}</td>
                  </tr>
                  <tr>
                    <td><strong>Priority</strong></td>
                    <td class="viewspan" v-html="viewTicket.convat_priority"></td>
                  </tr>
                  <tr>
                    <td><strong>Status</strong></td>
                    <td v-html="viewTicket.convat_ticket"></td>
                  </tr>
                </table>

                <div class="ticket-close text-center mt-4">
                  <div class="form-check form-switch d-flex align-items-center">
                    <input class="form-check-input" type="checkbox" id="viewStatus" :checked="viewTicket.status === 'Re-Open'" @change="toggleStatus(viewTicket)">
                    <label class="form-check-label px-2 py-1" for="viewStatus">{{ viewTicket.status === 'Re-Open' ? 'Re-Open' : 'Closed' }}</label>
                  </div>
                <!-- <template v-if="viewTicket.status == 'Re-Open'">
                 <button @click="updateStatus('Close',viewTicket.id)" class="btn btn-sm btn-danger">Closed</button>
                </template>
                <template v-else>
                 <button @click="updateStatus('Re-Open',viewTicket.id)" class="btn btn-sm btn-info">Re-Open</button>
                </template> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  <!-- Modal Edit -->
  <div class="modal fade" id="CommentEdit" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel1">Edit Comment</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
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
            <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button type="button" @click="commentUpdate()" class="btn btn-primary">
              Update
            </button>
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
        { label: "Tickets", url: "/admin-tickets" },
        { label: "Ticket View", url: "" },
      ],
      getLoader: false,
      viewTicket: "",
      viewMessages: "",
      showModal : true,
      editComment: {
        edit_id: "",
        comment: "",
        image: "",
      },
      messageEditID : {
        data_id : "",
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
      statusData : {

      },
    };
  },
  async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role == 'Super' || role == 'Admin') {
          this.getSupportTicketView();
          $(this.$refs.CommentReplay).summernote({
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
    toggleStatus(ticket) {
      const newStatus = ticket.status === 'Re-Open' ? 'Close' : 'Re-Open';
      this.updateStatus(newStatus, ticket.id);
    },
    getSupportTicketView() {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl+`admin/tickets/view/${this.$route.params.id}`, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          this.messageCreate.support_id = res.data.ticket.id;
          this.messageCreate.ticket_no = res.data.ticket.ticket_no;
          this.messageCreate.status = res.data.ticket.status;
          this.viewTicket = res.data.ticket;
          this.viewMessages = res.data.ticketMessages;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    // handleImageUpload(event) {
    //   this.editComment.image = event.target.files;
    //   this.messageCreate.image = event.target.files;
    // },

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

    messageEdit(id) {
      this.getLoader = true;
      this.messageEditID.data_id = id; 
      console.log(id);
      axios
        .post(
          this.globalVariables.apiUrl+"admin/tickets/reply/edit",
            this.messageEditID,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
          .then((res) => {
            this.editComment.edit_id = res.data.id;
            this.editComment.comment = res.data.message;
            this.showModal = true;
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
          this.globalVariables.apiUrl+"admin/tickets/reply/update",
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
              this.getSupportTicketView();
              const modal = document.getElementById("CommentEdit");
              const bootstrapModal = bootstrap.Modal.getInstance(modal);
              if (bootstrapModal) {
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
    
    statusChange(id){
      this.messageCreate.status = id;
    },
    commentReplay(){
      this.getLoader = true;
      axios
        .post(
          this.globalVariables.apiUrl+"admin/tickets/reply",
            this.messageCreate,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((res) => {
            toastr.success(res.data.message);
            this.getSupportTicketView();
            this.messageCreate.comment = '';
            this.messageCreate.image = '';
            $(this.$refs.CommentReplay).summernote('code','');
            this.themeShowImage.theme_logo = '';
          })
          .catch((e) => {
            return e;
          })
          .finally(() => {
            this.getLoader = false;
          });
    },

    messageDelete(id) {
      this.deleteMessageReplay(id);
    },

    //Replay  Delete
    deleteMessageReplay(id) {
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
            .post(
              this.globalVariables.apiUrl+`admin/tickets/reply/${id}/delete`,
              this.ticketDelete,
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
            )
            .then((res) => {
                toastr.success(res.data.message);
                this.getSupportTicketView();
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
    updateStatus(status,id){
      this.getLoader = true;
          axios
            .post(
              this.globalVariables.apiUrl+`admin/tickets/reply/status/${status}/${id}`,
              this.ticketDelete,
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
            )
            .then((res) => {
                toastr.success(res.data.message);
                this.getSupportTicketView();
            })
            .catch((e) => {
              return e;
            })
            .finally(() => {
              this.getLoader = false;
            });
    }
  },
};
</script>
<style>
.support-avatar img {
  width: 7.5rem;
  height: auto;
}
.badge-warning-inverse {
  background-color: rgba(255, 165, 0, 0.16);
  color: rgb(206, 133, 1) !important;
}
.bg-color {
  background: #f0f0f0;
  padding: 1.5625rem;
}
.edit {
  background: rgba(50, 198, 121, 0.22);
  color: #43d187;
}
.delete {
  background: rgba(249, 97, 109, 0.22);
  color: #f9616d;
}
.support-info .support-img img {
	border-radius: 50%;
	width: 9.375rem;
	height: 9.375rem;
}
.badge.badge-sm.badge-primary-inverse {
	color: #787878;
}
.badge.badge-sm.badge-warning-inverse {
	color: #787878;
}
/* .badge.badge-sm.badge-danger-inverse {
	color: #787878;
} */

tr {
	line-height: 1.9375rem;
}
.viewspan .badge.badge-sm.badge-danger-inverse {
	color: red;
	background: rgba(249, 97, 109, 0.16)!important;;
}
.support-asset ul li {
	list-style: none;
}
.support-asset ul li i{
	margin-right: 7px;
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

#ticket-right-side {
	position: fixed;
	right: 0;
	width: 20%;
}
</style>

