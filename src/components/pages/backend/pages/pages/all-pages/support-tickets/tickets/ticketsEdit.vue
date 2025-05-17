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
                    <h5 class="card-title mb-0 mt-2">Edit Ticket</h5>
                </div>
                <div class="card-body">
                    <form>
                        <div class="row-mb-15">
                            <div class="row mt-3">
                                <div class="col-md-4">
                                    <label for="subject" class="required mb-1">Subject</label>
                                    <select v-model="ticketUpdate.subject" id="subject" required class="form-select">
                                        <option value="">Select Subject</option>
                                        <option v-for="subject in ticketIndex.subjects" :value="subject.id" :key="subject.id">
                                        {{ subject.name }}
                                        </option>
                                    </select>
                                    <div v-if="validationErrors && validationErrors.subject" class="text-danger">
                                        {{ validationErrors.subject[0] }}
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <label for="priority" class="required mb-1">Priority</label>
                                    <select v-model="ticketUpdate.priority" id="priority" required class="form-select">
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
                                <input type="url" id="video_link" v-model="ticketUpdate.video_link" class="form-control"  placeholder="https://">
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-12">
                                <label for="description" class="mb-1">Description</label>
                                    <textarea v-model="ticketUpdate.description" ref="Description" class="form-control"  required="required" rows="4"></textarea>
                                    <div v-if="validationErrors && validationErrors.priority" class="text-danger">
                                        {{ validationErrors.priority[0] }}
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-md-6">
                                    <label class="d-block mb-1">Images</label>
                                    <div class="custom-file">
                                        <input type="file" @change="handleImageUpload" class="form-control" multiple id="customFile" accept=".jpg, .png, .pdf, .docx">
                                        <span class="text-warning">Only accept jpg, png, pdf, docx</span>
                                        <label for="customFile"></label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label class="d-block mb-3 required">Status</label>
                                <div class="radio-btn">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" @change="radioBtnValue('Open')" type="radio" name="exampleRadios"  id="open"   :checked="ticketStatus.status === 'Open'">
                                        <label class="form-check-label" for="exampleRadios1">
                                            Open
                                        </label>
                                    </div>

                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio"  @change="radioBtnValue('Process')" name="exampleRadios"  id="process"  :checked="ticketStatus.status === 'Process'">
                                        <label class="form-check-label" for="exampleRadios2">
                                            Process
                                        </label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" @change="radioBtnValue('Close')" name="exampleRadios"  id="close"  :checked="ticketStatus.status === 'Close'">
                                        <label class="form-check-label" for="exampleRadios3">
                                            Close
                                        </label>
                                    </div>
                                    <div v-if="validationErrors && validationErrors.status" class="text-danger">
                                        {{ validationErrors.status[0] }}
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-12">
                                    <div class="status_change"><label class="switch">
                                    <input type="checkbox" v-model="ticketUpdate.is_active" true-value="1">
                                    <span class="slider"></span>
                                    </label>Ticket Active Status</div>
                                </div>
                                <div v-if="validationErrors && validationErrors.is_active" class="text-danger">
                                    {{ validationErrors.is_active[0] }}
                                </div>
                            </div>
                            <div class="text-end mt-3">
                                <button type="button" @click="ticketSave" class="btn btn-primary btn-sm">
                                    <i class="fas fa-check fa-sm me-1"></i>  Update
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
import Loader from "../../../../../include/loader.vue";
import Breadcrumb from "../../../../../include/breadcrumb.vue";
import { inject } from "vue";
import { fetchUserRole } from "@/services/userService";

export default {
    setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
  props: ['ticketIndex'],
  components: {
    Loader,
    Breadcrumb,
  },
  data() {
    return {
        breadcrumbs: [
        { label: "Dashboard", url: "/dashboard" },
        { label: "Tickets", url: "/admin-tickets" },
        { label: "Ticket Edit", url: "" },
      ],
      getLoader: false,
      ticketUpdate: {
        subject: "",
        priority: "",
        video_link: "",
        description: "",
        status: "",
        is_active: "0",
        image: [], 
      },
      ticketStatus: {
        status: "",
      },
      validationErrors: null,
    };
  },
  async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role == 'Super' || role == 'Admin') {
            this.ticketUpdateData();
            $(this.$refs.Description).summernote({
                placeholder: 'Type your text here...',
                height: 200,
                callbacks: {
                onChange: contents => {
                this.ticketUpdate.description = contents;
                }
                }
            });
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    },
  methods: {
    ticketUpdateData(){
        this.getLoader = true;
        axios
        .get(this.globalVariables.apiUrl+`admin/tickets/edit/${this.$route.params.id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          },
        })
        .then((res) => {
            console.log(res.data)
            this.ticketUpdate.subject = res.data.ticket.subject_ticket_id;
            this.ticketUpdate.priority = res.data.ticket.priority;
            this.ticketUpdate.video_link = res.data.ticket.video_link;
            this.ticketUpdate.description = res.data.ticket.description;
            this.ticketUpdate.status = res.data.ticket.status;
            this.ticketStatus.status = res.data.ticket.status;
            if(res.data.ticket.is_active == 1){
                this.ticketUpdate.is_active = 1;
            }else{
                this.ticketUpdate.is_active = 0;
            }
            $(this.$refs.Description).summernote('code', res.data.ticket.description ?? '');
        })
        .catch((error) => {
           console.log(error);
        })
        .finally(() => {
            this.getLoader = false;
        });
    },

    handleImageUpload(event) {
      this.ticketUpdate.image = event.target.files;
    },
    ticketSave() {
      this.getLoader = true;
      const formData = new FormData();
      formData.append('subject', this.ticketUpdate.subject);
      formData.append('priority', this.ticketUpdate.priority);
      formData.append('video_link', this.ticketUpdate.video_link);
      formData.append('description', this.ticketUpdate.description);
      formData.append('status', this.ticketUpdate.status);
      formData.append('is_active', this.ticketUpdate.is_active);
      Array.from(this.ticketUpdate.image).forEach(file => {
        formData.append('images[]', file);
      });
      axios
        .post(this.globalVariables.apiUrl+`admin/tickets/update/${this.$route.params.id}`, formData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
            toastr.success(res.data.message);
            this.$router.push('/admin-tickets');
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
    radioBtnValue(id){
        this.ticketUpdate.status = id;
    }
  }
}
</script>
