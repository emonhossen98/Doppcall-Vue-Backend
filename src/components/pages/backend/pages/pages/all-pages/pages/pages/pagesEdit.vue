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
          <div class="app-main__inner">
            <form>
              <div class="row">
                <div class="col-md-12">
                  <div class="card">
                    <div class="card-body">
                      <div class="mb-3">
                        <label for="name" class="required mb-1">Name</label>
                        <input type="text"  v-model="pageCreate.name" id="name"  required class="form-control"/>
                        <div v-if="validationErrors && validationErrors.name" class="text-danger">
                        {{ validationErrors.name[0] }}
                       </div>
                      </div>
                      <div class="mb-3">
                        <p class="font-class"><strong>Shortcode:</strong> <span>{{ '[gm-form]' }}</span></p>
                       <label for="content" class="required  mb-1">Content</label><br>
                      <textarea  id="LarabergId"  hidden>{{ pageCreate && pageCreate.content }}</textarea>
                       <div v-if="validationErrors && validationErrors.content" class="text-danger">
                        {{ validationErrors.content[0] }}
                       </div>
                      </div>
  
                      <div class="mb-4">
                        <div class="form-group">
                          <label for="breadcrumb" class="required  mb-1">Page Title</label>
                          <select v-model="pageCreate.breadcrumb" id="breadcrumb" class="form-select">
                            <option value="1">Show</option>
                            <option value="0">Hide</option>
                          </select>
                          <div v-if="validationErrors && validationErrors.breadcrumb" class="text-danger">
                            {{ validationErrors.breadcrumb[0] }}
                          </div>
                        </div>
                      </div>
  
                      <div class="mb-4">
                        <div class="form-group">
                          <label for="status" class="required  mb-1">Publish</label>
                          <select v-model="pageCreate.status" id="status" class="form-select">
                            <option value="1">Publish</option>
                            <option value="0">Pending</option>
                          </select>
                          <div v-if="validationErrors && validationErrors.status" class="text-danger">
                            {{ validationErrors.status[0] }}
                          </div>
                        </div>
                      </div>
  
                      <div class="mb-3">
                        <label for="meta_title" class="mb-1">Meta Title</label>
                        <input  type="text"  v-model="pageCreate.meta_title"  id="meta_title" required class="form-control" placeholder="Enter Meta Title"/>
                      </div>
  
                      <div class="mb-3">
                        <label for="meta_description" class="mb-1">Meta Description</label><br />
                        <textarea v-model="pageCreate.meta_description" id="meta_description" cols="30" rows="4" class="form-control"
                        placeholder="Enter Meta Description"></textarea>
                      </div>
  
                      <div class="mb-3">
                        <label for="" class="mb-1">Social share thumbnail</label>
                        <div class="row col-sm-12">
                          <div class="col-sm-8">
                            <input  type="file"  accept="image/*"  ref="myFile" @change="socalMediaCode($event)" class="form-control"
                              id="hero_logo"/>
                            <span  style="background: #e9fff7; font-size: 12px; cursor: help"
                              class="py-1 px-2 d-block">Valid image: jpg,png,svg,jpeg</span >
                          </div>
                          <div class="col-sm-4">
                            <img v-if="pageShowImage.social_share_thumbnail" :src="pageShowImage.social_share_thumbnail"
                              class="largeImage"/>
                          </div>
                        </div>
                      </div>
  
  
                      <div class="mb-3">
                        <label for="script_code" class="mb-1">Script code</label><br />
                        <textarea v-model="pageCreate.script_code" id="script_code" cols="30" rows="4"
                          class="form-control" placeholder="Enter Script Code"></textarea>
                      </div>
                      <div class="mb-3">
                        <label for="header_code" class="mb-1">Header code</label><br />
                        <textarea  v-model="pageCreate.header_code" id="header_code" cols="30" rows="4"
                          class="form-control" placeholder="Enter Header  Code"></textarea>
                      </div>
                      <div class="mb-3">
                        <label for="body_code" class="mb-1">Body code</label><br />
                        <textarea v-model="pageCreate.body_code" id="body_code" cols="30" rows="4" class="form-control" placeholder="Enter Body Code"></textarea>
                      </div>
                      <div class="mb-3">
                        <label for="footer_code" class="mb-1">Footer code</label><br />
                        <textarea v-model="pageCreate.footer_code" id="footer_code"  cols="30" rows="4"
                          class="form-control" placeholder="Enter Footer Code"></textarea>
                      </div>
                      <div>
                        <div class="text-end">
                          <button type="button" @click="pageSave()" class="btn btn-primary mr-2 text-capitalize btn-sm">
                          Submit
                        </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
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
          { label: "Pages", url: "/admin-pages" },
          { label: "Edit", url: "" },
        ], 
        getLoader: false,
        pageCreate: {
          update_id : "",
          name : "",
          content : "",
          breadcrumb : "",
          status : "",
          meta_title : "",
          meta_description : "",
          social_share_thumbnail : "",
          script_code : "",
          header_code : "",
          body_code : "",
          footer_code : "",
        },
        pageShowImage : {
          social_share_thumbnail : "",
        },
        validationErrors : null,
      };
    },
    async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role == 'Super' || role == 'Admin') {
          this.pageEditData();
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    },
    methods: {
    pageEditData(){
        this.getLoader = true;
        axios
          .get(
            this.globalVariables.apiUrl+`admin/pages/edit/${this.$route.params.id}`,{headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((res) => {
            this.pageCreate.update_id = res.data.page.id;
            this.pageCreate.name = res.data.page.name;
            this.pageCreate.content = res.data.page.content;
            this.pageCreate.breadcrumb = res.data.page.breadcrumb;
            this.pageCreate.status = res.data.page.status;
            this.pageCreate.meta_title = res.data.page.meta_title;
            this.pageCreate.meta_description = res.data.page.meta_description;
            this.pageCreate.script_code = res.data.page.script_code;
            this.pageCreate.header_code = res.data.page.header_code;
            this.pageCreate.body_code = res.data.page.body_code;
            this.pageCreate.footer_code = res.data.page.footer_code;
            var fromData = document.querySelector("#LarabergId");
            fromData.innerText = res.data.page.content;
            Laraberg.init('LarabergId');
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.getLoader = false;
          });;
    },

    pageSave() {
        this.getLoader =  true;
        var FromData = document.querySelector("#LarabergId");
        this.pageCreate.content = FromData.innerText;
        axios
          .post(
            this.globalVariables.apiUrl+`admin/pages/update/${this.$route.params.id}`,
            this.pageCreate,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((res) => {
            toastr.success(res.data.message);
            this.pageCreate.content = '';
            this.$router.push('/admin-pages');
          })
          .catch((error) => {
            if(error && error.response && error.response.data && error.response.data.errors){
              this.validationErrors = error.response.data.errors;
            }
          })
          .finally(() => {
            this.getLoader = false;
          });;
    },
  
    socalMediaCode(event) {
        const file = event.target.files[0];
        this.pageCreate.social_share_thumbnail = file;
        if (!file || file.type.indexOf("image/") === -1) return;
        const reader = new FileReader();
        reader.onload = () => {
          this.pageShowImage.social_share_thumbnail = reader.result; // Update imgsrc with filename
        };
        reader.readAsDataURL(file);
    },
    },
  };
  </script>
  
  <style scoped>
  .largeImage {
      width: 200px;
  }
  </style>