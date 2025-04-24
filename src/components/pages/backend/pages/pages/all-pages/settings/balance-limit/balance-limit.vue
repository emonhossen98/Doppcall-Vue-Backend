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
            <div class="col-12 col-md-12 mx-auto">
            <div class="card">
                <div class="card-header py-3">
                    <h5 class="card-title mb-0">Balance Limit</h5>
                </div>
                <div class="card-body ">
                    <form>
                        <div class="mb-3">
                        <label for="limit_amount" class="mb-1">Limit Amount</label>
                        <input type="number" v-model="limitBalanceSettings.limit_amount" id="limit_amount" class="form-control">
                        </div>
                        <div class="d-flex align-items-center justify-content-end">
                          <button type="button" @click="limitSave()" class="btn btn-primary mt-3 btn-sm">Save Change</button>
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
        { label: "Settings", url: "" },
        { label: "Balance Limit ", url: "" },
      ],
      getLoader: false,
      limitBalanceSettings: {
        limit_amount : "",
    },
  };
},
async mounted() { 
    try {
      const { role, isAuthorized } = await fetchUserRole();
      if (role == 'Super' || role == 'Admin') {
        this.getLimitData();
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  },
methods: {
    limitSave(){
      this.getLoader = true;
        axios.post(this.globalVariables.apiUrl+"admin/mailsettings/balance-limit/store", this.limitBalanceSettings, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          },
        })
        .then((res) => {
          toastr.success(res.data.message);
          this.getLimitData();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.getLoader = false;
        })
    },
    
    getLimitData() {
    this.getLoader = true;
    axios
      .get(this.globalVariables.apiUrl+"admin/mailsettings/balance-limit", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        this.limitBalanceSettings.limit_amount  = res.data.withdraw_balance_limit;
      })
      .catch((e) => {
        return e;
      })
      .finally(() => {
        this.getLoader = false;
      });
  },
},
};
</script>