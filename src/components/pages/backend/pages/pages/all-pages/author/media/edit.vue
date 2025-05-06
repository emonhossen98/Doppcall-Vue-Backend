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
           <div class="col-md-12" style="margin: 0 auto">
           <div class="card">
               <div class="card-header">
                   <h5 class="card-title mb-0">Media Edit</h5>
               </div>
               <div class="card-body">
                   <form>
                       <div class="row-mb">
                           <div class="row mb-4">
                               <div class="col-sm-2">
                                   <label for="title" class="required">Title</label>
                               </div>
                               <div class="col-sm-10">
                                   <input type="text" v-model="mediaCreateData.title" id="title" class="form-control" required>
                                   <div v-if="validationErrors && validationErrors.title" class="text-danger">
                                     {{ validationErrors.title[0] }}
                                   </div>
                               </div>
                           </div>
                           <div class="row align-items-center">
                               <div class="col-sm-2">
                                   <label for="file" class="required">File</label>
                               </div>
                               <div class="col-sm-10 row">
                                   <div class="col-sm-6">
                                       <input type="file" accept="image/*" ref="myFile" @change="File($event)" class="form-control" id="file"> 
                                       <span style="background: #e9fff7; font-size: 12px; cursor: help;"
                                           class="py-1 px-2 d-block">Valid image:
                                           jpg,png,svg,jpeg</span>
                                       <div v-if="validationErrors && validationErrors.file" class="text-danger">
                                       {{ validationErrors.file[0] }}
                                     </div> 
                                   </div>
                                   <div class="col-sm-6">
                                       <img v-if="mediaShowImage.file" :src="mediaShowImage.file" class="imgpreview">
                                   </div>
                               </div>
                           </div>
                           <div class="form-group text-end mt-4">
                               <button type="button" @click="mediaSave" class="btn btn-primary btn-sm" >
                                   <i class="fas fa-check fa-sm me-2"></i>
                                   Update
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
 import { fetchUserRoleAuthor } from "@/services/fetchUserRoleAuthor";
 
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
         { label: "Dashboard", url: "/author/dashboard" },
         { label: "Media", url: "/author-media-index" },
         { label: "Edit", url: "" },
       ],
       getLoader: false,
       mediaCreateData: {
         title: "",
         file: "",
       },
       mediaShowImage: {
         file: "",
       },
       validationErrors : null,
     };
   },
   async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRoleAuthor();
         if (role == 'Author') {
            this.getMediaData();
         }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    },
   methods: {
     getMediaData() {
       this.getLoader = true;
       axios
         .get(
          this.globalVariables.apiUrl+`author/media/edit/${this.$route.params.id}`,
           {
             headers: {
               Authorization: "Bearer " + localStorage.getItem("token"),
               "Content-Type": "multipart/form-data",
             },
           }
         )
         .then((res) => {
            this.mediaCreateData.title = res.data.media.title;
            this.mediaShowImage.file = this.globalVariables.appUrl + res.data.media.file;
         })
         .catch((error) => {
           console.log(error);
         })
         .finally(() => {
             this.getLoader = false;
         })
     },

     mediaSave() {
       this.getLoader = true;
       axios
         .post(
          this.globalVariables.apiUrl+`author/media/update/${this.$route.params.id}`,
           this.mediaCreateData,
           {
             headers: {
               Authorization: "Bearer " + localStorage.getItem("token"),
               "Content-Type": "multipart/form-data",
             },
           }
         )
         .then((res) => {
           toastr.success(res.data.message);
           this.$router.push('/author-media-index');
         })
         .catch((error) => {
           if (error.response && error.response.data && error.response.data.errors) {
             this.validationErrors = error.response.data.errors;
           }
         })
         .finally(() => {
             this.getLoader = false;
         })
     },
 
 
     File(event) {
       const file = event.target.files[0];
       this.mediaCreateData.file = file;
       if (!file || file.type.indexOf("image/") === -1) return;
       const reader = new FileReader();
       reader.onload = () => {
         this.mediaShowImage.file = reader.result; // Update imgsrc with filename
       };
       reader.readAsDataURL(file);
     },
   },
 };
 </script>
 
 <style scoped>
 .imgpreview {
   width: 100px;
 }
 </style>
 