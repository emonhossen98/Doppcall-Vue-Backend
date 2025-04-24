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
            <div class="col-md-12">
            <div class="card ">
                <div class="card-header">
                    <h5 class="card-title">Partner Setting</h5>
                </div>

                <div class="card-body">
                    <form>
                        <div class="row mb-3 mt-2">
                            <div class="col-sm-2">
                                <label for="boot_title">Title</label>
                            </div>
                            <div class="col-sm-10">
                                <input type="text" id="boot_title" v-model="partherSettings.boot_title" class="form-control">
                            </div>
                        </div>

                        <div class="row mb-3">
                            <div class="col-sm-2">
                                <label for="boot_short_title">Short Description</label>
                            </div>
                            <div class="col-sm-10">
                             <textarea v-model="partherSettings.boot_short_title" id="boot_short_title" cols="30" rows="3" class="form-control"></textarea>
                            </div>
                        </div>


                        <div class="row mb-3">
                            <div class="col-sm-2">
                                <label for="adver_text">Advertisers Text</label>
                            </div>
                            <div class="col-sm-10">
                             <textarea ref="partherSettingAdvertiher" id="adver_text" cols="30" rows="3" class="form-control"></textarea>
                            </div>
                        </div>

                        <div class="my-3">
                            <div class="row mb-3">
                            <div class="col-sm-2">
                                <label for="button_adver_text">Button Advertisers Text</label>
                            </div>
                            <div class="col-sm-10">
                                <input type="text" id="button_adver_text" v-model="partherSettings.button_adver_text" class="form-control">
                            </div>
                            </div>

                            <div class="row mb-3">
                                <div class="col-sm-2">
                                <label for="button_adver_url">Button Advertisers URL</label>
                            </div>
                            <div class="col-sm-10">
                                <input type="text" id="button_adver_url" v-model="partherSettings.button_adver_url" class="form-control">
                            </div>
                            </div>
                        </div>

                        <div class="col-md-12 mb-3">
                            <div class="row align-items-center">
                                <div class="col-sm-2">
                                    <label for="">Advertisers Image</label>
                                </div>
                                <div class="row col-sm-10">
                                    <div class="col-sm-6">
                                        <input type="file" accept="image/*" ref="myFile" @change="advertiherImage($event)" class="form-control" id="adver_image">
                                        <span style="background: #e9fff7; font-size: 12px; cursor: help;"
                                            class="py-1 px-2 d-block">Valid image:
                                            jpg,png,svg,jpeg</span>
                                    </div>
                                    <div class="col-sm-6">
                                        <img v-if="partherShowImage.adver_image" :src="partherShowImage.adver_image" class="largeImage">
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div class="row mb-3">
                            <div class="col-sm-2">
                                <label for="pertner_text">Publisher Text</label>
                            </div>
                            <div class="col-sm-10">
                             <textarea ref="partherSettingPublisher" id="pertner_text" cols="30" rows="3" class="form-control"></textarea>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <div class="col-sm-2">
                                <label for="button_pertner_text">Button Publisher Text</label>
                            </div>
                            <div class="col-sm-10">
                                <input type="text" id="button_pertner_text" v-model="partherSettings.button_pertner_text" class="form-control">
                            </div>
                        </div>

                        <div class="row mb-3">
                            <div class="col-sm-2">
                                <label for="button_pertner_url">Button Publisher URL</label>
                            </div>
                            <div class="col-sm-10">
                                <input type="text" id="button_pertner_url" v-model="partherSettings.button_pertner_url" class="form-control">
                            </div>
                        </div>

                            <div class="col-md-12 mb-3">
                                <div class="row align-items-center">
                                    <div class="col-sm-2">
                                        <label for="">Publisher Image</label>
                                    </div>
                                    <div class="row col-sm-10">
                                        <div class="col-sm-6">
                                        <input type="file" accept="image/*" ref="myFile" @change="PublisherImage($event)" class="form-control" id="home_marketing_side_image">
                                        <span style="background: #e9fff7; font-size: 12px; cursor: help;"
                                            class="py-1 px-2 d-block">Valid image:
                                            jpg,png,svg,jpeg</span>
                                    </div>
                                    <div class="col-sm-6">
                                        <img v-if="partherShowImage.partner_image" :src="partherShowImage.partner_image" class="largeImage">
                                    </div>
                                    </div>
                                </div>
                            </div>
                        <div class="form-group text-end">
                            <button type="button" @click="PartnerSave" class="btn btn-primary btn-sm">Save Changes</button>
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
    components: {
    Loader,
    Breadcrumb,
  },
    data() {
    return {
        breadcrumbs: [
        { label: "Dashboard", url: "/dashboard" },
        { label: "Appearance", url: "" },
        { label: "Partner Settings", url: "" },
      ],
      getLoader: false,
      partherSettings: {
        boot_title : "",
        boot_short_title : "",
        adver_text : "",
        button_adver_text : "",
        button_adver_url : "",
        adver_image : "",
        pertner_text : "",
        button_pertner_text : "",
        button_pertner_url : "",
        partner_image : "",
       },
       partherShowImage : {
        adver_image : "", 
        partner_image : "",
       },
     };
  },
  async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role == 'Super' || role == 'Admin') {
            this.getPartnerData();
            $(this.$refs.partherSettingAdvertiher).summernote({
                placeholder: 'Type your text here...',
                height: 200,
                callbacks: {
                onChange: contents => {
                this.partherSettings.adver_text = contents;
                }
                }
            });

            $(this.$refs.partherSettingPublisher).summernote({
                placeholder: 'Type your text here...',
                height: 200,
                callbacks: {
                onChange: contents => {
                this.partherSettings.pertner_text = contents;
                }
                }
            });
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    },
  methods: {
    PartnerSave(){
        this.getLoader = true;
        axios.post(this.globalVariables.apiUrl+"admin/appearance/partner-settings-store", this.partherSettings, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
            this.getPartnerData();
            toastr.success(res.data.message);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    getPartnerData() {
        this.getLoader = true;
        axios.get(this.globalVariables.apiUrl+'admin/appearance/partner-settings', { headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}})
        .then((res) => {
            this.partherSettings.boot_title = res.data.boot_title;
            this.partherSettings.boot_short_title = res.data.boot_short_title;
            this.partherSettings.adver_text = res.data.adver_text;
            this.partherSettings.button_adver_text = res.data.button_adver_text;
            this.partherSettings.button_adver_url = res.data.button_adver_url;
            this.partherSettings.pertner_text = res.data.pertner_text;
            this.partherSettings.button_pertner_text = res.data.button_pertner_text;
            this.partherSettings.button_pertner_url = res.data.button_pertner_url;
            this.partherShowImage.adver_image = res.data.adver_image;
            this.partherShowImage.partner_image = res.data.partner_image;
            $(this.$refs.partherSettingAdvertiher).summernote('code', res.data.adver_text ?? '');
            $(this.$refs.partherSettingPublisher).summernote('code', res.data.pertner_text ?? '');
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.getLoader = false;
        })
    },

    advertiherImage(event) {
      const file = event.target.files[0];
      this.partherSettings.adver_image = file;
      if (!file || file.type.indexOf('image/') === -1) return;
      const reader = new FileReader();
      reader.onload = () => {
        this.partherShowImage.adver_image = reader.result; // Update imgsrc with filename
      };
      reader.readAsDataURL(file);
    },

    PublisherImage(event) {
      const file = event.target.files[0];
      this.partherSettings.partner_image = file;
      if (!file || file.type.indexOf('image/') === -1) return;
      const reader = new FileReader();
      reader.onload = () => {
        this.partherShowImage.partner_image = reader.result; // Update imgsrc with filename
      };
      reader.readAsDataURL(file);
    },
  },
}
</script>

<style>
.largeImage{
    width: 250px !important;
}
</style>