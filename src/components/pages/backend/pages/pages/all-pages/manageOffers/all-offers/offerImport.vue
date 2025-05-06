
<template>
    <div v-if="getLoader">
      <Loader></Loader>
    </div>
    <!-- Content wrapper -->
    <div class="content-wrapper">
      <!-- Content -->
      <!-- {{ OfferCreate }} -->
      <div class="container-fluid flex-grow-1 container-p-y"> 
        <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
        <div class="row mt-4">
                <form>
                    <div class="row justify-content-center">
                        <div class="col-md-12">
                            <div class="card">
                                <div class="custom-card-header border-bottom px-4 pb-2 pt-3">
                                    <h5 class="card-title mb-0">Import Offer</h5>
                                </div>
                                <div class="card-body mt-3">
                                    <div class="form-group">
                                        <input type="file" class="form-control" @change="handleImageUpload">
                                        <span class="direction py-1 px-2 d-block">Choose file with mime: (xls, xlsx)</span>
                                        <div v-if="validationErrors &&  validationErrors.excel_file" class="text-danger">
                                            {{ validationErrors.excel_file[0] }}
                                        </div>
                                    </div>
                                        <div class="download-import-template mt-3 text-center">
                                            <a href="../../../../../../../../../src/assets/backend/assets/media/download/import-offers.xlsx" class="btn bg-light w-50"><i class="fas fa-file-excel me-1 fs-5"></i> Download Excel Template</a>
                                        </div>
                                        <div class="form-group mt-3 text-center">
                                            <button type="button" @click="importOffersSave()" class="btn btn-primary w-50" id="import-btn"><i class="fas fa-file-import fs-5 me-1"></i> <span class="spinner-border spinner-border-sm text-light d-none"></span> Import</button>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            <div class="row mt-4">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header pb-0">
                            <h5 class="card-title mb-0 px-4 py-2">Rules</h5>
                        </div>
                        <div class="card-body">
                            <div class="widget-body">
                                <table class="table text-start table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">Column</th>
                                            <th scope="col">Rules</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">User ID</th>
                                            <td>(required)</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Assign User ID</th>
                                            <td>(required|integer|default: 0)</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Category ID</th>
                                            <td>(required|integer)</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Type ID</th>
                                            <td>(required|integer)</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Offer Tag</th>
                                            <td>(required|string) Data Format: tag,tag,tag</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Primary Country</th>
                                            <td>(required|string)</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Primary Country Code</th>
                                            <td>(required|string|Example: BD,US,UK)</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Country</th>
                                            <td>(required|string)</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Pay Out</th>
                                            <td>(required|string)</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Marchant Allow</th>
                                            <td>(required|string)</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Materials moderation</th>
                                            <td>(required|string)</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Tools</th>
                                            <td>(required|string)</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Allow Trafic</th>
                                            <td>(required|string)</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Trafics</th>
                                            <td>(required|string)</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Description</th>
                                            <td>(required|string)</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Important Rules</th>
                                            <td>(nullable|string|default: NULL)</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Rules</th>
                                            <td>(required|string)</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Call Limit</th>
                                            <td>(required|string)</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Hold Period</th>
                                            <td>(required|string)</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Appeal Period</th>
                                            <td>(required|string)</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Owner</th>
                                            <td>(required|string)</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Status</th>
                                            <td>(required|integer|in:0,1,2,3) (0=Pending, 1=Active, 2=Pause, 3=Resume)</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
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
  import Loader from '../../../../../include/loader.vue';
  import Breadcrumb from '../../../../../include/breadcrumb.vue';
  import toastr from "toastr";
  import "toastr/build/toastr.min.css";  
  import { inject } from "vue";
  import { fetchUserRole } from "@/services/userService";
  
  export default {
    setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
    props:['OfferCreate'],
    components:{
      Loader,
      Breadcrumb,
    },
    data() {
      return {
        getLoader: false,
        breadcrumbs: [
          { label: "Dashboard", url: "/dashboard" },
          { label: "Offers Import", url: "" },
        ],
        importFile: {
            excel_file: "",
        },
        validationErrors: null,
      };
    },
    async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role == 'Super' || role == 'Admin') {
          
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    },
    methods: {
        handleImageUpload(event) {
            this.importFile.excel_file = event.target.files[0];
        },
        importOffersSave() {
            this.getLoader = true;
            axios
            .post(this.globalVariables.apiUrl+"admin/offers/offerImportStore", this.importFile, {
                headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                'Content-Type': 'multipart/form-data'
                },
            })
            .then((res) => {
                console.log(res);
                if(res.data.status == 'success'){
                toastr.success(res.data.message);
                this.$router.push({ path: "/admin-offers", query: { id: 123 }});
                }else{
                toastr.error(res.data && res.data.errors.excel_file[0]);
                }
            })
            .catch((error) => {
                if (error.res && error.res.data && error.res.data.errors) {
                    console.log(error);
                this.validationErrors = error.res.data.errors;
                }
            })
            .finally(() => {
                this.getLoader = false;
            });
        },
    },
  };
  </script>
