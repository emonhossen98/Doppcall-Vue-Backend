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
                                            <img :src="ticket.convart_image" alt="DOPPCALL">
                                        </div>
                                        <div class="content mt-2">
                                            <h4 class="mb-2">{{ ticket && ticket.user && ticket.user.fname }}</h4>
                                            <span class="badge bg-primary text-white mb-2">{{ role.name }}</span><br>
                                            <span v-html="ticket.convart_status_color"></span>
                                        </div>
                                    </div>
                                    <div class="col-lg-8">
                                        <div class="support-message" v-html="ticket.description">
                                        </div>
                                    </div>
                                    <div class="col-lg-2">
                                        <div class="support-asset">
                                            <ul>
                                                <li><i class="far fa-clock fa-sm"></i> <span>{{ ticket.convart_open_date}}</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                    <template v-if="ticketMessages.length > 0">
                                        <div class="row mt-3" v-for="(value,index) in ticketMessages" :key="index">
                                            <div class="col-12">
                                                <div class="bg-color">
                                                    <div class="row">
                                                        <div class="col-lg-2">
                                                            <div class="support-avatar">
                                                                <img :src="value.convart_image" alt="DOPPCALL">
                                                            </div>
                                                            <div class="content mt-2">
                                                                <h5 class="mb-1">{{ value.user.fname }}</h5>
                                                                <span class="badge bg-primary text-white">{{role.name }}</span>
                                                                <template v-if="ticket.user_id == value.user.id">
                                                                    <div class="support-action mt-2">
                                                                        <button type="button"  data-bs-toggle="modal" data-bs-target="#commentModal" @click="CommentEdit(value.id)" class="support-btn edit edit-btn border-0 me-2" data-id="{{ $value->id }}"><i class="far fa-edit"></i></button>
                                                                        <button type="button" @click="CommentDelete(value.id)" class="support-btn delete border-0"><i class="far fa-trash-alt"></i></button>
                                                                    </div>
                                                                </template>
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-8">
                                                            <div class="support-message" v-html="value.message">
                                                            </div>
                                                        </div>
                                                        <div class="col-lg-2">
                                                            <div class="support-asset">
                                                                <ul>
                                                                    <li><i class="far fa-clock fa-sm"></i> <span>{{ value.convart_updated_at }}</span></li>
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
                    
                    <template v-if="ticket.status == 'Re-Open'">
                        <div class="card mt-4">
                            <div class="card-body">
                                <form>
                                    <div class="form-group">
                                        <label for="comment" class="required mb-1">Comment</label>
                                        <textarea v-model="comment" ref="Comment" id="comment" class="form-control"  required="required" rows="4"></textarea>
                                        <div v-if="validationErrors && validationErrors.comment" class="text-danger">
                                            {{ validationErrors.comment[0] }}
                                        </div>
                                    </div>

                                    <div class="form-group mt-3">
                                        <label class="d-block mb-1">Images</label>
                                            <div class="custom-file">
                                                <input  type="file" class="form-control" ref="fileInput"  @change="handleImageUpload" id="customFile"/>
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
                                <div class="support-img text-center">
                                    <img :src="ticket.convart_image" alt="DOPPCALL">
                                </div>
                                <table class="w-100 mt-3 support-table">
                                    <tr style="line-height:2rem">
                                        <td><strong>Full Name</strong></td>
                                        <td>{{ ticket && ticket.user && ticket.user.fname }} {{ ticket && ticket.user && ticket.user.lname }}</td>
                                    </tr>
                                    <tr  style="line-height:2rem">
                                        <td><strong>Ticket ID</strong></td>
                                        <td>#{{ ticket.ticket_no }}</td>
                                    </tr>
                                    <tr  style="line-height:2rem">
                                        <td><strong>Subject</strong></td>
                                        <td>{{ ticket && ticket.subject && ticket.subject.name }}</td>
                                    </tr>
                                    <tr  style="line-height:2rem">
                                        <td><strong>Opened</strong></td>
                                        <td>{{ ticket.convart_open_date }}</td>
                                    </tr>
                                    <tr  style="line-height:2rem">
                                        <td><strong>Priority</strong></td>
                                        <td v-html="ticket.convart_ticket_priority"></td>
                                    </tr>
                                    <tr  style="line-height:2rem">
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


<!-- Large Modal -->
<div class="modal fade" id="commentModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel3">Edit Comment</h5>
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
                <div class="col-md-12">
                  <div class="form-group">
                    <label for="image" class="required">Image</label>
                    <input type="file" @change="handleImageUpload"  class="form-control" id="customFile"/>
                  </div>
                </div>
              </div>
            </div>
          <div class="modal-footer">
        <button type="button" class="btn btn-label-secondary btn-sm" data-bs-dismiss="modal">
          Close
        </button>
        <button @click="commentUpdate()"  type="button" class="btn btn-primary btn-sm">Save changes</button>
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
import { fetchUserRoleAdvertiser } from "@/services/userServiceAdvertiser";

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
        { label: "Dashboard", url: "/advertiser/dashboard" },
        { label: "Support Tickets", url: "/advertiser-support-tickets" },
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
    };
  },
  async mounted() { 
    try {
      const { role, isAuthorized } = await fetchUserRoleAdvertiser();
      if (role == 'Advertiser') {
        this.getTicketSubjectViewData();
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  },
  methods: {
    getTicketSubjectViewData() {
      this.getLoader = true;
      axios
        .get(
          this.globalVariables.apiUrl+`advertiser/support-tickets/${this.$route.params.id}`,
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
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.getLoader = false;
          $(this.$refs.Comment).summernote({
            placeholder: "Type your text here...",
            height: 200,
            callbacks: {
                onChange: (contents) => {
                    this.messageCreate.comment = contents;
                },
            },
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
          this.globalVariables.apiUrl+`advertiser/support-tickets/message/reply`,this.messageCreate,
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
        })
        .catch((error) => {
          if ( error && error.response && error.response.data && error.response.data.errors) {
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
              this.globalVariables.apiUrl+`advertiser/support-tickets/reply/status/${status}/${id}`,
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
    
    handleImageUpload(event) {
      this.editComment.image = event.target.files[0];
      this.messageCreate.image = event.target.files[0];
    },

    CommentEdit(id) {
        this.editedData.data_id = id;
      axios
        .post(
          this.globalVariables.apiUrl+`advertiser/support-tickets/reply/edit`,this.editedData,
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
          this.globalVariables.apiUrl+"advertiser/support-tickets/reply/update",
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
              location.reload();
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
              this.globalVariables.apiUrl+`advertiser/support-tickets/reply/${id}/delete`,
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
</style>
