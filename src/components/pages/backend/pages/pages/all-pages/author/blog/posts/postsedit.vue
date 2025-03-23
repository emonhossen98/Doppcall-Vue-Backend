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
              <div class="app-main__inner">
                  <form>
                      <div class="row">
                          <div class="col-md-9">
                              <div class="card">
                                  <div class="card-header custom-card-header">
                                      <h5 class="card-title mb-0">New Post Edit</h5>
                                  </div>
                                  <div class="card-body">
                                      <div class="form-group">
                                          <label for="title" class="required mb-1">Title</label>
                                          <input type="text" v-model="PostCreated.title" id="title" required class="form-control">
                                          <div v-if="validationErrors && validationErrors.title" class="text-danger">
                                            {{ validationErrors.title[0] }}
                                        </div>
                                      </div>
  
                                      <div class="form-group mt-4">
                                          <label for="slug" class="required mb-1">Slug</label>
                                          <input type="text" v-model="PostCreated.slug" id="slug" required class="form-control">
                                          <div v-if="validationErrors && validationErrors.slug" class="text-danger">
                                            {{ validationErrors.slug[0] }}
                                        </div>
                                      </div>
  
                                      <div class="form-group mt-4">
                                          <label for="description" class="required mb-1">Description</label>
                                          <textarea v-model="PostCreated.description" id="description" cols="30" rows="4" maxlength="150" class="form-control"></textarea>
                                          <span class="text-warning">Description max 200 charecters</span>
                                          <div v-if="validationErrors && validationErrors.description" class="text-danger">
                                            {{ validationErrors.description[0] }}
                                        </div>
                                      </div>
  
                                      <div class="form-group mt-4">
                                          <label for="content"  class="required mb-1">Content</label>
                                          <!-- <textarea ref="Content" id="content" cols="30" rows="5" class="form-control"></textarea>
                                          <div v-if="validationErrors && validationErrors.content" class="text-danger">
                                            {{ validationErrors.content[0] }}
                                        </div> -->
                                        <Editor api-key="jal9cu31r6q4w7fvp4i1fldbggmn9ai0egqalbhez8afsa86"  :init="editorConfig" v-model="PostCreated.content"/>
                                        <div v-if="validationErrors && validationErrors.content" class="text-danger">
                                            {{ validationErrors.content[0] }}
                                        </div>
                                      </div>

                                      <div class="form-group mt-4">
                                          <label for="meta_title">Meta Title</label>
                                          <input type="text" v-model="PostCreated.meta_title" id="meta_title" required class="form-control" maxlength="60" placeholder="Enter Meta Title">
                                         <span class="text-warning">maximum 60 characters.</span>
                                      </div>
  
                                      <div class="form-group mt-4">
                                          <label for="meta_description">Meta Description</label>
                                          <textarea v-model="PostCreated.meta_description" id="meta_description" cols="30" rows="5" class="form-control" maxlength="160" placeholder="Meta Description"></textarea>
                                          <span class="text-warning">maximum 160 characters.</span>
                                      </div>
                                  </div>
                              </div>
  
                          </div>
  
                          <div class="col-md-3">
                              <div class="card mb-4 ">
                                  <div class="card-header custom-card-header">
                                      <h5 class="card-title mb-0">Status</h5>
                                  </div>
                                  <div class="card-body">
                                      <div class="form-group">
                                      <label for="status" class="mb-1">Status</label><br>
                                      <select v-model="PostCreated.status" id="status" class="form-select">
                                          <option value="1">Publish</option>
                                          <option value="0">Pending</option>
                                      </select>
                                      </div>
                                  </div>
                              </div>
  
                              <div class="card mb-4 ">
                                  <div class="card-header custom-card-header">
                                      <h5 class="card-title required mb-0">Categories</h5>
                                  </div>
                                  <div class="card-body">
                                      <div class="category-items">
                                          <ul class="m-0 p-0 list-unstyled">
                                              <li v-for="(categorie, index) in postCreateData.categories" :key="index">
                                              <div class="form-check">
                                                  <input type="checkbox" checked v-model="PostCreated.categories" :value="categorie.id"
                                                      :id="'categories-'+categorie.id" class="form-check-input">
                                                  <label :for="'categories-'+categorie.id" class="form-check-label collection-label">{{categorie.name }}</label>
                                              </div>
                                              </li>
                                          </ul>
                                          <div v-if="validationErrors && validationErrors.categories" class="text-danger">
                                            {{ validationErrors.categories[0] }}
                                        </div>
                                      </div>
                                  </div>
                              </div>
  
                              <div class="card mb-4 ">
                                  <div class="card-header custom-card-header">
                                      <h5 class="card-title mb-0 required">Image</h5>
                                  </div>
                                  <div class="card-body">
                                      <div class="row">
                                          <div class="col-sm-6">
                                          <input type="file" accept="image/*" ref="myFile" @change="blogsImage($event)" class="form-control" id="image">
                                          <span style="background: #e9fff7; font-size: 12px; cursor: help;"
                                              class="py-1 px-2 d-block">Valid image:
                                              jpg,png,svg,jpeg</span>
                                          </div>
                                          <div class="col-sm-6">
                                              <img v-if="showPostImage.image" :src="showPostImage.image" class="largeImage">
                                          </div>
                                          <div v-if="validationErrors && validationErrors.image" class="text-danger">
                                            {{ validationErrors.image[0] }}
                                        </div>
                                      </div>
                                  </div>
                              </div>
  
                              <div class="card mb-4 ">
                                  <div class="card-header custom-card-header">
                                      <h5 class="card-title mb-0">Publish</h5>
                                  </div>
                                  <div class="card-body">
                                      <button type="button" @click="postSave"  class="btn btn-info btn-sm">
                                          <i class="fa fa-save me-2"></i> Save
                                      </button>
                                      &nbsp;
                                      <button type="button"  @click="postSave" class="btn btn-success btn-sm">
                                          <i class="fa fa-check-circle me-2"></i> Save &amp; Edit
                                      </button>
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
  import Swal from "sweetalert2";
  import "toastr/build/toastr.min.css";
  import Loader from "../../../../../../include/loader.vue";
  import Breadcrumb from "../../../../../../include/breadcrumb.vue";
  import { inject } from "vue";
  import { fetchUserRoleAuthor } from "@/services/fetchUserRoleAuthor";
  import Editor from '@tinymce/tinymce-vue';
  
    export default{
      setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
      props : ['postCreateData'],
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
          { label: "Dashboard", url: "/author-dashboard" },
          { label: "Blog", url: "" },
          { label: "Posts", url: "/author-blog-posts" },
          { label: "Edit", url: "" },
        ],
        getLoader: false,
        PostCreated : {
          post_update_id : "",
          title : "",
          slug : "",
          description : "",
          content : "",
          meta_title : "",
          meta_description : "",
          status : "",
          categories : [],
          image : "",
        },
        showPostImage :  {
          image : null,
        },
        validationErrors : null,
        }
      },
      async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRoleAuthor();
        if (role == 'Author') {
          this.getPostEditData();
        // $(this.$refs.Content).summernote({
        //       placeholder: 'Type your text here...',
        //       height: 200,
        //       callbacks: {
        //         onChange: contents => {
        //         this.PostCreated.content = contents;
        //         }
        //       }
        //   });
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    },
    methods: {
      getPostEditData() {
        this.getLoader = true;
        axios
          .get(
            this.globalVariables.apiUrl+`author/blog/posts/edit/${this.$route.params.id}`,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
          .then((res) => {
            this.PostCreated.post_update_id = res.data.blogPost.id;
            this.PostCreated.title = res.data.blogPost.title;
            this.PostCreated.slug = res.data.blogPost.slug;
            this.PostCreated.description = res.data.blogPost.description;
            this.PostCreated.content = res.data.blogPost.body;
            this.PostCreated.meta_title = res.data.blogPost.meta_title;
            this.PostCreated.meta_description = res.data.blogPost.meta_description;
            this.PostCreated.status = res.data.blogPost.status;
            if (res.data.blogPost.post_categories && res.data.blogPost.post_categories.length > 0) {
                res.data.blogPost.post_categories.forEach(category => {
                    this.PostCreated.categories.push(category.id);
                });
            }
            // $(this.$refs.Content).summernote('code', res.data.blogPost.body ?? '');
            this.showPostImage.image = this.globalVariables.appUrl+res.data.blogPost.feature_image;
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.getLoader = false;
          });
      },

      postSave() {
        this.getLoader = true;
        axios
          .post(
            this.globalVariables.apiUrl+`author/blog/posts/update/${this.$route.params.id}`,
            this.PostCreated,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((res) => {
            toastr.success(res.data.message);
            this.$router.push('/author-blog-posts');
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
  
  
      blogsImage(event) {
        const file = event.target.files[0];
        this.PostCreated.image = file;
        if (!file || file.type.indexOf('image/') === -1) return;
        const reader = new FileReader();
        reader.onload = () => {
          this.showPostImage.image = reader.result; // Update imgsrc with filename
        };
        reader.readAsDataURL(file);
      },
    },
    };
    </script>
  <style>
  
  .largeImage {
      width: 100px !important;
  }
  </style>