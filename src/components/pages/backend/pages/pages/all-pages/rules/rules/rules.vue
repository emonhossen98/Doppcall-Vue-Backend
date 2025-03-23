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
          <div class="card">
            <div class="card-header py-2">
              <h5 class="card-title mb-0 mt-2">Rules</h5>
            </div>
            <div class="card-body">
              <form>
                <div class="form-group mt-1">
                  <label class="mb-2" for="publisher_rules">Publisher Rules</label>
                  <textarea v-model="rulesCreate.publisher_rules" class="form-control" ref="publisherRules" rows="4"></textarea>
                </div>
                <div class="form-group mt-3">
                  <label class="mb-2" for="advertiser_rules">Advertiser Rules</label>
                  <textarea v-model="rulesCreate.advertiser_rules" class="form-control"  ref="advertiserRules" rows="4"></textarea>
                </div>
                <div class="text-end mt-3">
                  <button type="button" @click="rulesSave" class="btn btn-primary btn-sm">
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
        { label: "Rules", url: "" },
      ],
      getLoader: false,
      rulesCreate: {
        publisher_rules: "",
        advertiser_rules: "",
      },
    };
  },
  async mounted() { 
    try {
      const { role, isAuthorized } = await fetchUserRole();
      if (role == 'Super' || role == 'Admin') {
        this.getRulesData();
        $(this.$refs.publisherRules).summernote({
          placeholder: "Type Publisher Rules...",
          height: 250,
          callbacks: {
            onChange: (contents) => {
              this.rulesCreate.publisher_rules = contents;
            },
          },
        });

        $(this.$refs.advertiserRules).summernote({
          placeholder: "Type Advertiser Rules...",
          height: 250,
          callbacks: {
            onChange: (contents) => {
              this.rulesCreate.advertiser_rules = contents;
            },
          },
        });
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  },
  methods: {
    getRulesData() {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl+"admin/rules", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          $(this.$refs.publisherRules).summernote('code', res.data.publisher_rules ?? '');
          $(this.$refs.advertiserRules).summernote('code', res.data.advertiser_rules ?? '');
        })
        .catch((error) => {
          console.log(error);
        })
        .finally (() => {
          this.getLoader = false;
        });
    },

    rulesSave() {
      this.getLoader = true;
      axios
        .post(this.globalVariables.apiUrl+"admin/rules/store", this.rulesCreate, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
            toastr.success(res.data.message);
            this.getRulesData();
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
