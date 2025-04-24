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
            <div class="card-header py-2">
              <h5 class="card-title mb-0 mt-2">Notice</h5>
            </div>
            <div class="card-body">
              <form>
                <div class="form-group mt-1">
                  <label class="mb-2" for="publisher_notice">Publisher Notice</label>
                  <textarea v-model="noticeCreate.publisher_notice"  ref="publisherNotice"  class="form-control" rows="4"></textarea>
                </div>
                <div class="form-group mt-3">
                  <label class="mb-2" for="advertiser_notice">Advertiser Notice</label>
                  <textarea v-model="noticeCreate.advertiser_notice"  ref="advertiserNotice" class="form-control" rows="4"></textarea>
                </div>
                <div class="text-end mt-3">
                  <button type="button"  @click="noticeSave" class="btn btn-primary btn-sm" >
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
  data: () => {
    return {
      breadcrumbs: [
        { label: "Dashboard", url: "/dashboard" },
        { label: "Notice", url: "" },
      ],
      getLoader: false,
      noticeCreate: {
        publisher_notice: "",
        advertiser_notice: "",
      },
    };
  },
  async mounted() { 
    try {
      const { role, isAuthorized } = await fetchUserRole();
      if (role == 'Super' || role == 'Admin') {
        this.getNoticeData();
        $(this.$refs.publisherNotice).summernote({
          placeholder: 'Type Publisher Notice...',
          height: 250,
          callbacks: {
            onChange: contents => {
            this.noticeCreate.publisher_notice = contents;
            }
          }
        });

        $(this.$refs.advertiserNotice).summernote({
          placeholder: 'Type Advertiser Notice...',
          height: 250,
          callbacks: {
            onChange: contents => {
            this.noticeCreate.advertiser_notice = contents;
            }
          }
        });
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  },
  methods: {
    getNoticeData() {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl+"admin/notice", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          $(this.$refs.publisherNotice).summernote('code', res.data.publisher_notice ?? '');
          $(this.$refs.advertiserNotice).summernote('code', res.data.advertiser_notice ?? '');
        })
        .catch((error) => {
          console.log(error);
        })
        .finally (() => {
          this.getLoader = false;
        });
    },

    noticeSave() {
      this.getLoader = true;
      axios
        .post(this.globalVariables.apiUrl+"admin/notice/store", this.noticeCreate, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          toastr.success(res.data.message);
          this.getNoticeData();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally (() => {
          this.getLoader = false;
        });
    },
  },
};
</script>
