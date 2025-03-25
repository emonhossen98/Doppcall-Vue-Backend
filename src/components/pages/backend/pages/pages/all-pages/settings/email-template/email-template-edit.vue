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
        <div class="col-12">
          <div class="alert alert-danger">
            <strong>Noted:</strong> Any shortcode paste keyboard key: ctrl+shift+v
          </div>

          <div class="card">
            <div class="card-header py-3">
              <h5 class="card-title mb-0">Email Template Edit</h5>
            </div>
            <div class="card-body">
              <div class="shortcode py-3">
                <h5 class="mb-0 shortcode-heading">
                  Shortcode:
                  <span style="font-size: 15px; font-weight: 400">
                    {{ emailShortCode }}
                  </span>
                </h5>
              </div>
              <form>
                <div class="form-group">
                  <label for="subject" class="required">Subject</label>
                    <input type="text" v-model="emailTemplateUpdate.subject" id="subject" required class="form-control" placeholder="Enter your email subject">
                    <div v-if="validationErrors && validationErrors.subject" class="text-danger">
                        {{ validationErrors.subject[0] }}
                    </div>
                </div>

                <div class="form-group mt-3">
                  <label for="heading">Heading</label>
                    <input type="text" v-model="emailTemplateUpdate.heading" id="heading" required class="form-control" placeholder="Enter your email heading">
                    <div v-if="validationErrors && validationErrors.heading" class="text-danger">
                        {{ validationErrors.heading[0] }}
                    </div>
                </div>
                <div class="form-group mt-3">
                  <label for="body_content"  class="required">Body</label>
                  <!-- <textarea ref="BodyContent" id="body_content" cols="30" rows="5" class="form-control"></textarea>
                    <div v-if="validationErrors && validationErrors.body_content" class="text-danger">
                        {{ validationErrors.body_content[0] }}
                    </div> -->
                  <Editor api-key="jal9cu31r6q4w7fvp4i1fldbggmn9ai0egqalbhez8afsa86"  :init="editorConfig" v-model="emailTemplateUpdate.body_content"/>
                    <div v-if="validationErrors && validationErrors.body_content" class="text-danger">
                        {{ validationErrors.body_content[0] }}
                    </div>
                </div>
                <div class="form-group text-end mt-4">
                  <button type="button" @click="saveEmailtemplates()" class="btn btn-sm btn-primary">
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
import Editor from '@tinymce/tinymce-vue';

export default {
  setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
  components: {
    Loader,
    Breadcrumb,
    Editor ,
  },
  data: () => {
    return {
      editorConfig: {
        referrer_policy: "origin", 
        height: 500,
        menubar: true,
        plugins: 'lists link image table code help wordcount',
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
      },
      breadcrumbs: [
        { label: "Dashboard", url: "/dashboard" },
        { label: "Settings", url: "" },
        { label: "Email Templates", url: "/admin-settings-email-template" },
        { label: "Edit", url: "" },
      ],
      getLoader: false,
      emailTemplateUpdate : {
        subject : "",
        heading : "",
        body_content : "",
      }
    };
  },
  async mounted() { 
    try {
      const { role, isAuthorized } = await fetchUserRole();
      if (role == 'Super' || role == 'Admin') {
        this.getEmailtemplatesData();
        // $(this.$refs.BodyContent).summernote({
        //     placeholder: 'Type your text here...',
        //     height: 200,
        //     callbacks: {
        //       onChange: contents => {
        //       this.emailTemplateUpdate.body_content = contents;
        //       }
        //     }
        // });
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  },
  methods: {
    getEmailtemplatesData() {
      this.getLoader = true;
      axios
        .get(
          this.globalVariables.apiUrl+`admin/mailsettings/email-template/${this.$route.params.id}/edit`,
          {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          }
        )
        .then((res) => {
            this.emailTemplateUpdate.subject = res.data.template.subject;
            this.emailTemplateUpdate.heading = res.data.template.heading;
            this.emailTemplateUpdate.body_content = res.data.template.content;
            // $(this.$refs.BodyContent).summernote('code', res.data.template.content ?? '');
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    saveEmailtemplates() {
      this.getLoader = true;
      axios
        .post(
          this.globalVariables.apiUrl+`admin/mailsettings/email-template/${this.$route.params.id}/update`,this.emailTemplateUpdate,
          {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          }
        )
        .then((res) => {
            toastr.success(res.data.message);
            this.$router.push('/admin-settings-email-template');
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.getLoader = false;
        });
    },
  },
};
</script>
