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
              <div class="row-mb-3">
                <div class="row">
                  <div class="col-lg-2">
                    <div class="support-avatar">
                      <img :src="viewTicket.convart_image ?? ''" alt="DOPPCAALL" />
                    </div>
                    <div class="content mt-2">
                      <h5 class="mb-2"> {{ viewTicket && viewTicket.user && viewTicket.user.fname }}</h5>
                      <span class="badge bg-primary text-white mb-2">{{ viewTicket && viewTicket.convart_role && viewTicket.convart_role.name}}</span><br />
                      <p class="viewspan" v-html="viewTicket.convart_status_class"></p>
                    </div>
                  </div>
                  <div class="col-lg-8">
                    <div class="support-message">
                      <p class="font-class " v-html="viewTicket.description"></p>
                    </div>
                  </div>
                  <div class="col-lg-2">
                    <div class="support-asset">
                      <ul>
                        <li>
                          <i class="far fa-clock fa-sm"></i>
                          <span>{{ viewTicket.convart_time }}</span>
                        </li>
                        <!-- {{-- <li><a href="" class="download"><i class="fas fa-paperclip"></i> File Download</a></li> --}} -->
                      </ul>
                    </div>
                  </div>
                </div>
                <template v-if="viewMessages">
                  <div class="row" v-for="(message, index) in viewMessages">
                    <div class="col-12">
                      <div class="bg-color">
                        <div class="row">
                          <div class="col-lg-2">
                            <div class="support-avatar">
                              <img :src="message.convart_image" alt="DOPPCAALL" />
                            </div>
                            <div class="content mt-2">
                              <h3 class="mb-1">{{ message && message.user && message.user.fname }}</h3>
                              <span class="badge bg-primary text-white">{{message && message.convart_role && message.convart_role.name}}</span>
                              <div class="support-action mt-2">
                                <button type="button" @click="messageEdit(message.id)" class="support-btn edit edit-btn border-0" data-bs-toggle="modal" data-bs-target="#CommentEdit">
                                  <i class="far fa-edit"></i>
                                </button>
                                <button type="button" @click="messageDelete(message.id)" class="support-btn delete border-0">
                                  <i class="far fa-trash-alt"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-8">
                            <div class="support-message">
                              <p v-html="message.message"></p>
                            </div>
                          </div>
                          <div class="col-lg-2">
                            <div class="support-asset">
                              <ul>
                                <li>
                                  <i class="far fa-clock fa-sm"></i>
                                  <span>{{ message.convart_time }}</span>
                                </li>
                              </ul>
                            </div>
                          </div>
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
                <label for="comment" class="required mb-1">Comment</label>
                  <textarea  ref="CommentReplay" class="comment"></textarea>
                </div>

                <div class="form-group mt-3">
                  <label class="d-block mb-1">Images</label>
                  <div class="custom-file">
                    <input  type="file" class="form-control"  @change="handleImageUpload" multiple id="customFile"/>
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
        <div class="col-12 col-lg-3">
          <div class="card">
            <div class="card-body">
              <div class="support-info">
                <div class="support-img text-center">
                 <img :src="viewTicket.convart_image" alt="DOPPCAALL">
                </div>
                <table class="w-100 mt-3 support-table">
                  <tr>
                    <td><strong>Full Name</strong></td>
                    <td>{{ viewTicket && viewTicket.user && viewTicket.user.fname }}  {{  viewTicket && viewTicket.user && viewTicket.user.lname }}</td>
                  </tr>
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
                <template v-if="viewTicket.status == 'Re-Open'">
                 <button @click="updateStatus('Close',viewTicket.id)" class="btn btn-sm btn-danger">Closed</button>
                </template>
                <template v-else>
                 <button @click="updateStatus('Re-Open',viewTicket.id)" class="btn btn-sm btn-info">Re-Open</button>
                </template>
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
                <div class="col-md-12">
                  <div class="form-group">
                    <label for="image" class="required">Image</label>
                    <input type="file" @change="handleImageUpload()"  class="form-control" multiple id="customFile"/>
                  </div>
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
            placeholder: 'Type your text here...',
            height: 200,
            callbacks: {
              onChange: contents => {
                this.messageCreate.comment = contents;
              }
            }
          });
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    },
  methods: {
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

    handleImageUpload(event) {
      this.editComment.image = event.target.files;
      this.messageCreate.image = event.target.files;
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
.support-btn {
  width: 1.875rem;
  height: 1.875rem;
  display: inline-block;
  text-align: center;
  line-height: 1.875rem;
  border-radius: 50%;
  font-size: .8125rem;
  transition: 0.5s ease-in-out;
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
</style>

