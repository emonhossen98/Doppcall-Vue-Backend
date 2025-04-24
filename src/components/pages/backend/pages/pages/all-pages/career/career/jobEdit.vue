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
                  <div class="border-bottom">
                      <h5 class="card-title mb-0 px-3 py-3">Job Career Edit</h5>
                  </div>
                  <div class="card-body">
                      <form>
                         <div class="row-mb">
                              <div class="row mt-3">
                                  <div class="col-6">
                                  <label for="catagory_id" class="required mb-1">Catagory</label>
                                  <select id="catagory_id" class="form-select" v-model="jobCareerUpdateData.catagory_id">
                                      <option value="">Select Category</option>
                                      <option v-for="career in jobCreate.careerCategory" :value="career.id" :key="career.id">{{ career.name }}</option>
                                  </select>
                                  <div v-if="validationErrors &&  validationErrors.catagory_id" class="text-danger">
                                    {{ validationErrors.catagory_id[0] }}
                                  </div>
                                  </div>
                                   <div class="col-6">
                                      <label for="job_title" class="required mb-1">Job Title</label>
                                      <input type="text" id="job_title" v-model="jobCareerUpdateData.job_title" required class="form-control" placeholder="Job Title">
                                  </div>
                                   <div class="col-6 mt-3">
                                      <label for="job_type" class="require mb-1">Job Type</label>
                                      <input type="text" id="job_type" v-model="jobCareerUpdateData.job_type" required class="form-control" placeholder="Job Title">
                                  </div>
                                  <div class="col-6 mt-3">
                                      <label for="location" class="required  mb-1">Location</label>
                                      <input type="text" id="location" v-model="jobCareerUpdateData.location" required class="form-control" placeholder="Location">
                                  </div>
                              </div> 
  
                              <div class="row">
                                  <div class="col-lg-8 my-2 col-sm-12">
                                      <label class="required  mb-1 form-label" for="shortdescription">Short Description</label>
                                      <textarea ref="summernoteShortDescription" v-model="jobCareerUpdateData.job_short_description" id="shortdescription" class="form-control " placeholder="Short Description" ></textarea>
  
                                      <div class="my-2">
                                      <label class="required  mb-1 form-label" for="longdescription">Long Description</label>
                                      <textarea ref="summernoteLongDescription" v-model="jobCareerUpdateData.job_long_description" id="longdescription" class="form-control " placeholder="Long Description" ></textarea>
                                  </div>
                              </div>
                              <div class="col-lg-4 my-2 col-sm-12">
                                  <div>
                                      <label for="company_name"  class="required mb-1">Company Name</label>
                                      <input type="text" id="company_name" v-model="jobCareerUpdateData.company_name" required class="form-control" placeholder="Company Name">
                                  </div>
  
                                  <div class="my-3">
                                      <label for="company_location "class="mb-1">Company Location</label>
                                      <input type="text" id="company_location" v-model="jobCareerUpdateData.company_location" required class="form-control" placeholder="Company Location">
                                  </div>
                                  <div class="my-3">
                                      <label for="apply"class="mb-1">Company Apply</label>
                                      <input type="url" id="apply" v-model="jobCareerUpdateData.apply" required class="form-control" placeholder="Apply">
                                  </div>
  
                                  <div class="my-3">
                                      <label for="company_logo"class="mb-1">Company Logo</label>
                                      <input type="file"  @change="handleImageUpload" id="company_logo" required class="form-control mb-2">
                                      <template v-if="showImage != null">
                                        <img id="career_edit_image" :src="showImage" alt="image">
                                      </template>
                                  </div>
  
                                  <div class="my-3">
                                      <label for="company_phone"class="mb-1">Company Phone</label>
                                      <input type="number" id="company_phone" v-model="jobCareerUpdateData.company_phone" required class="form-control" placeholder="Company Phone">
                                  </div>
  
                                  <div class="my-3">
                                      <label for="company_address"class="mb-1">Company Address</label>
                                      <input type="text" id="company_address" v-model="jobCareerUpdateData.company_address" required class="form-control" placeholder="Company Address">
                                  </div>
  
                                  <div class="my-3">
                                      <label for="company_email "class="mb-1">Company Email</label>
                                      <input type="email" id="company_email" v-model="jobCareerUpdateData.company_email" required class="form-control" placeholder="Company Email">
                                  </div>
  
                                  <div class="my-3">
                                      <label for="company_google_map_url " class="mb-1">Company Map Url</label>
                                      <input type="url" id="company_google_map_url" v-model="jobCareerUpdateData.company_google_map_url" required class="form-control" placeholder="Company Map Url">
                                  </div>
  
                                  <div class="my-3">
                                      <label for="salary_rang " class="mb-1">Salary Range</label>
                                      <input type="text" id="salary_range" v-model="jobCareerUpdateData.salary_range" required class="form-control" placeholder="Salary Range">
                                  </div>
  
                                  <div class="my-3">
                                      <label for="experienc " class="mb-1">Experience</label>
                                      <input type="text" id="experience" v-model="jobCareerUpdateData.experience" required class="form-control" placeholder="Experience">
                                  </div>
                                   <div class="my-3">
                                      <label for="job_startdate " class="mb-1">Job Startdate</label>
                                      <input type="date" id="job_startdate" v-model="jobCareerUpdateData.job_startdate" required class="form-control" placeholder="Job Startdate">
                                  </div>
  
                                  <div class="my-3">
                                      <label for="job_deadline " class="mb-1">Job Deadline</label>
                                      <input type="date" id="job_deadline" v-model="jobCareerUpdateData.job_deadline" required class="form-control" placeholder="Job Deadline">
                                      </div>
                                  </div>
                              </div>
                              
                          </div> 
                          <div class="text-end form-group mt-4">
                              <button type="button" @click="jobCareerSave" class="btn btn-sm btn-primary">Update</button>
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
  import "toastr/build/toastr.min.css";
  import Loader from "../../../../../include/loader.vue";
  import Breadcrumb from "../../../../../include/breadcrumb.vue";
  import { inject } from "vue";
  import { fetchUserRole } from "@/services/userService";
  
  export default{
    setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
    props : ['jobCreate'],
    components: {
      Loader,
      Breadcrumb,
    },
    data: () => {
    return {
      jobCareerUpdateData: {
          catagory_id           : "",
          job_title             : "",
          job_type              : "",
          location              : "",
          job_short_description : "",
          job_long_description  : "",
          company_name          : "",
          company_location      : "",
          apply                 : "",
          company_logo          : null,
          company_phone         : "",
          company_address       : "",
          company_email         : "",
          company_google_map_url: "",
          salary_range          : "",
          experience            : "",
          job_startdate         : "",
          job_deadline          : "",
      },
      showImage : null,
      getLoader: false,
      breadcrumbs: [
        { label: "Dashboard", url: "/dashboard" },
        { label: "Job Career", url: "/admin-career-jobcareer" },
        { label: "Job Career Edit", url: "" },
      ],
      validationErrors: null,
    };
  },
  async mounted() { 
  try {
    const { role, isAuthorized } = await fetchUserRole();
    if (role == 'Super' || role == 'Admin') {
      this.jobCareerEditData();
      $(this.$refs.summernoteShortDescription).summernote({
        placeholder: 'Type your text here...',
        height: 200,
        callbacks: {
          onChange: contents => {
           this.jobCareerUpdateData.job_short_description = contents;
          }
        }
      });
      $(this.$refs.summernoteLongDescription).summernote({
        placeholder: 'Type your text here...',
        height: 200,
        callbacks: {
          onChange: contents => {
           this.jobCareerUpdateData.job_long_description = contents;
          }
        }
      });
    }
  } catch (error) {
    console.error("Error fetching user role:", error);
  }
},
  methods: {
      handleImageUpload(event) {
        this.jobCareerUpdateData.company_logo = event.target.files[0];
      },
      jobCareerEditData() {
        this.getLoader = true;
          axios
            .get(
              this.globalVariables.apiUrl+`admin/career/jobcareer/edit/${this.$route.params.id}`,
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token")
                },
              }
            )
            .then((res) => {
              console.log(res.data.jobcareer);
                this.jobCareerUpdateData.catagory_id            = res.data.jobcareer.catagory_id;
                this.jobCareerUpdateData.job_title              = res.data.jobcareer.job_title;
                this.jobCareerUpdateData.job_type               = res.data.jobcareer.job_type;
                this.jobCareerUpdateData.location               = res.data.jobcareer.location;
                this.jobCareerUpdateData.job_short_description  = res.data.jobcareer.job_short_description;
                this.jobCareerUpdateData.job_long_description   = res.data.jobcareer.job_long_description;
                this.jobCareerUpdateData.company_name           = res.data.jobcareer.company_name;
                this.jobCareerUpdateData.company_location       = res.data.jobcareer.company_location;
                this.jobCareerUpdateData.apply                  = res.data.jobcareer.apply;
                this.jobCareerUpdateData.company_phone          = res.data.jobcareer.company_phone;
                this.jobCareerUpdateData.company_address        = res.data.jobcareer.company_address;
                this.jobCareerUpdateData.company_email          = res.data.jobcareer.company_email;
                this.jobCareerUpdateData.company_google_map_url = res.data.jobcareer.company_google_map_url;
                this.jobCareerUpdateData.salary_range           = res.data.jobcareer.salary_range;
                this.jobCareerUpdateData.experience             = res.data.jobcareer.experience;
                this.jobCareerUpdateData.job_startdate          = res.data.jobcareer.job_startdate;
                this.jobCareerUpdateData.job_deadline           = res.data.jobcareer.job_deadline;
                this.showImage                                  = this.globalVariables.appUrl+ res.data.jobcareer.company_logo;
                $(this.$refs.summernoteShortDescription).summernote('code', res.data.jobcareer.job_short_description);
                $(this.$refs.summernoteLongDescription).summernote('code', res.data.jobcareer.job_long_description);
            })
            .catch((e) => {
              return e;
            })
            .finally(() => {
              this.getLoader = false;
        });
      },
      jobCareerSave() {
        this.getLoader = true;
          axios
            .post(
              this.globalVariables.apiUrl+`admin/career/jobcareer/update/${this.$route.params.id}`,
              this.jobCareerUpdateData,
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                  "Content-Type": "multipart/form-data",
                },
              }
            )
            .then((res) => {
              toastr.success(res.data.message);
              this.$router.push("/admin-career-jobcareer");
            })
            .catch((error) => {
              if (error.response && error.response.data && error.response.data.errors) {
              this.validationErrors = error.response.data.errors;
            };
            })
            .finally(() => {
              this.getLoader = false;
        });
      },
  },
  };
  </script>

  <style scoped>
    #career_edit_image{
      width: 150px;
      height : auto;
    }
  </style>