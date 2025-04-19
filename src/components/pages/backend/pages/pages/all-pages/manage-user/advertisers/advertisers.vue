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

            <div class="card mt-3">
              <div class="card-header pt-3">
                    <h5 class="card-title mb-0">Filter By</h5>
                </div>
                <div class="card-body">
                    <form id="advertiser-filter-form">
                        <div class="row gap-3 gap-md-0">
                            <div class="col-lg-4">
                                <select @change="SearchData()" v-model="myData.order_by" class="form-control">
                                    <option value="">Order By</option>
                                    <option value="newest">Newest</option>
                                    <option value="old">Old</option>
                                </select>
                            </div>
                            <div class="col-lg-4">
                                <select @change="SearchData()" v-model="myData.manager" class="form-control">
                                    <option value="">Select Manager</option>
                                    <option v-for="manager in advertisersIndex.accountManagers"
                                    :value="manager.id"
                                    :key="manager.id"
                                    >
                                    {{ manager.fname }} {{ manager.lname }}
                                    </option>
                                </select>
                            </div>
                            <div class="col-lg-4">
                                <select @change="SearchData()" v-model="myData.status" class="form-control">
                                    <option value="">Select Action</option>
                                    <option value="6">Pending</option>
                                    <option value="1">Approved</option>
                                    <option value="2">Suspend</option>
                                    <option value="3">Unsuspend</option>
                                    <option value="4">Pause</option>
                                    <option value="5">Resume</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="card-header pt-3 pb-0">
                    <h5 class="card-title d-flex justify-content-between align-items-center mb-2">
                        Manage Advertisers 
                    </h5>
                </div>
                <div class="card-body table-responsive table-overflow-hidden">
                    <table class="align-middle mb-0 table table-hover" id="advertiser_datatables">
                        <thead>
                            <tr>
                              <!-- <th></th> -->
                              <th></th>
                              <th>SL</th>
                              <th>Company</th>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Phone</th>
                              <th>Balance</th>
                              <th>Manager</th>
                              <th>Status</th>
                              <th class="text-center" style="width: 35%;">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </table>
                    <div class="row justify-content-between align-items-center">
                  <div class="col-md-3">
                    Showing {{ startPage }} to {{ endPage }} of {{ recordsTotal }} entries
                  </div>
                  <div class="pagination-controls col-md-9 d-flex justify-content-end align-items-center ">
                    <ul class="pagination mb-0">
                      <!-- Previous Button -->
                      <li class="paginate_button page-item previous" :class="{ disabled: currentPage === 1 }">
                        <button class="page-link" @click="getAdvertiserData(currentPage - 1)" :disabled="currentPage === 1" >
                          <i class="fa-solid fa-chevron-left"></i>
                        </button>
                      </li>

                      <!-- Page Numbers -->
                      <template v-for="page in paginationPages" :key="page">
                        <li class="paginate_button page-item" :class="{ active: page === currentPage }">
                          <button class="page-link" @click="getAdvertiserData(page)">
                            {{ page }}
                          </button>
                        </li>
                      </template>

                      <!-- Next Button -->
                      <li class="paginate_button page-item next" :class="{ disabled: currentPage === lastPage }">
                        <button  class="page-link" @click="getAdvertiserData(currentPage + 1)" :disabled="currentPage === lastPage">
                          <i class="fa-solid fa-chevron-right"></i>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                </div>
            </div>
        </div>
        </div>
      </div>
      <div>

       <!-- Large Modal -->
       <div class="modal fade" id="statusChangeModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel3">{{ modalTitle }}</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div v-if="advertisersIndex.access_status == 1">
                <p class="font-class" v-html="advertisersIndex.access_content"></p>
              </div>

              <div class="form-group">
                <label for="note">Note (optional)</label>
                <textarea rows="3" cols="1" class="form-control" placeholder="Send a note...." v-model="modalData.note"  id="note"></textarea>
              </div>
              <div class="form-group mt-3">
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" role="switch" value="1" v-model="modalData.mailAction"/>
                  <label class="form-check-label" for="send-mail-btn">Send Mail</label>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" @click="submiteModal()" class="btn btn-primary"><i class="fas fa-check fa-sm me-1"></i> Confirm</button>
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
  props: ["advertisersIndex"],
  components: {
    Loader,
    Breadcrumb,
  },
  data() {
    return {
      breadcrumbs: [
        { label: "Dashboard", url: "/dashboard" },
        { label: "Advertisers  ", url: "" },
      ],
      getLoader: false,
      modalDisplay: "none",
      myData: {
        draw: "1",
        "columns[0][data]": "0",
        "columns[0][name]": "",
        "columns[0][searchable]": "true",
        "columns[0][orderable]": "false",
        "columns[0][search][value]": "",
        "columns[0][search][regex]": "false",
        "columns[1][data]": "1",
        "columns[1][name]": "",
        "columns[1][searchable]": "true",
        "columns[1][orderable]": "false",
        "columns[1][search][value]": "",
        "columns[1][search][regex]": "false",
        "columns[2][data]": "2",
        "columns[2][name]": "",
        "columns[2][searchable]": "true",
        "columns[2][orderable]": "false",
        "columns[2][search][value]": "",
        "columns[2][search][regex]": "false",
        "columns[3][data]": "3",
        "columns[3][name]": "",
        "columns[3][searchable]": "true",
        "columns[3][orderable]": "false",
        "columns[3][search][value]": "",
        "columns[3][search][regex]": "false",
        "columns[4][data]": "4",
        "columns[4][name]": "",
        "columns[4][searchable]": "true",
        "columns[4][orderable]": "false",
        "columns[4][search][value]": "",
        "columns[4][search][regex]": "false",
        "columns[5][data]": "5",
        "columns[5][name]": "",
        "columns[5][searchable]": "true",
        "columns[5][orderable]": "false",
        "columns[5][search][value]": "",
        "columns[5][search][regex]": "false",
        "columns[6][data]": "6",
        "columns[6][name]": "",
        "columns[6][searchable]": "true",
        "columns[6][orderable]": "false",
        "columns[6][search][value]": "",
        "columns[6][search][regex]": "false",
        "columns[7][data]": "7",
        "columns[7][name]": "",
        "columns[7][searchable]": "true",
        "columns[7][orderable]": "false",
        "columns[7][search][value]": "",
        "columns[7][search][regex]": "false",
        "columns[8][data]": "8",
        "columns[8][name]": "",
        "columns[8][searchable]": "true",
        "columns[8][orderable]": "false",
        "columns[8][search][value]": "",
        "columns[8][search][regex]": "false",
        "columns[9][data]": "9",
        "columns[9][name]": "",
        "columns[9][searchable]": "true",
        "columns[9][orderable]": "false",
        "columns[9][search][value]": "",
        "columns[9][search][regex]": "false",
        "columns[10][data]": "10",
        "columns[10][name]": "",
        "columns[10][searchable]": "true",
        "columns[10][orderable]": "false",
        "columns[10][search][value]": "",
        "columns[10][search][regex]": "false",
        "columns[11][data]": "11",
        "columns[11][name]": "",
        "columns[11][searchable]": "true",
        "columns[11][orderable]": "false",
        "columns[11][search][value]": "",
        "columns[11][search][regex]": "false",
        start: "0",
        length: "",
        search: "",
        start_date: "",
        end_date: "",
        order_by: "",
        manager: "",
        status: "",
      },
      modalData: {
        data: "",
        action_type: "",
        email: " ",
        note: "",
        mailAction: "",
      },
      currentPage: 1,
      lastPage: 1,
      recordsTotal : 0,
      startPage : 0,
      endPage : 0,
      searchInputValue : "",
    };
  },
  async mounted() { 
    try {
      const { role, isAuthorized } = await fetchUserRole();
      if (role == 'Super' || role == 'Admin') {
        this.getAdvertiserData();
        this.$nextTick(() => {
          const dataTableWrapper = document.querySelectorAll('#advertiser_datatables_wrapper .row.mx-2');
          if (dataTableWrapper.length > 0) {
            dataTableWrapper[0].style.display = 'none';
            dataTableWrapper[1].style.display = 'none';
          }
        });
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
    document.addEventListener('click', (e) => {
      const target = e.target.closest('a[data-vue-route]');
      if (target) {
        e.preventDefault();
        const route = target.getAttribute('href');
        this.$router.push(route);
      }
    }, true);
  },
  computed: {
    paginationPages() {
      const pages = [];
      const range = 2; 
      const start = Math.max(1, this.currentPage - range);
      const end = Math.min(this.lastPage, this.currentPage + range);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (start > 1) {
        pages.unshift(1);
        if (start > 2) pages.splice(1, 0, '...');
      }
      if (end < this.lastPage) {
        pages.push('...');
        pages.push(this.lastPage);
      }
      return pages;
    },
  },
  methods: {
    getAdvertiserData(page = 1, perPage = 10,searchValue = '') {
      this.getLoader = true;
      axios
        .post(
          this.globalVariables.apiUrl+"admin/manage/advertiser/get-data",
          this.myData,
          { 
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
            params: { page: page, perPage: perPage,search: searchValue}, 
          }
        )
        .then((res) => {
          const { data, current_page, last_page,recordsTotal } = res.data;
          this.currentPage = current_page;
          this.lastPage = last_page;
          this.recordsTotal = recordsTotal;

          this.startPage = (current_page - 1) * perPage + 1;
          this.endPage = Math.min(current_page * perPage, recordsTotal);

          if ($.fn.DataTable.isDataTable("#advertiser_datatables")) {
            $('#advertiser_datatables').DataTable().destroy();
          }
        var table = $('#advertiser_datatables').DataTable({
          data: res.data.data,
            columns: [
              // { data: "1" }, 
              { data: "1" }, 
              { data: "1" }, 
              { data: "2" }, 
              { data: "4" }, 
              { data: "5" }, 
              { data: "6" }, 
              { data: "7" }, 
              { data: "8" }, 
              { data: "9" }, 
              { data: "10" }, 
              // { data: "11" }, 
            ],
          initComplete: () => { // Using an arrow function here
            this.attachEventListeners();
            this.attachEventListenersForMenu();
            this.attachEventListenersForSearch();

            const searchInput = $("#advertiser_datatables_filter input");
            searchInput.val(this.searchInputValue);
            if(this.searchInputValue != ''){
              searchInput.focus();
            }
            searchInput.off().on("keyup", (e) => {
              const searchTerm = e.target.value;
              this.searchInputValue = searchTerm;
              this.getAdvertiserData(1, perPage, searchTerm);
            });

          },
          createdRow: function (row, data, dataIndex) {
            const perPage = 10; 
            const rowNumber = (dataIndex + 1) + (page - 1) * perPage;
            $('td:eq(1)', row).html(rowNumber);
          },
          columnDefs: [
            {
              targets: 0,
              orderable: false,
              checkboxes: {
                selectAllRender: '<input type="checkbox" class="form-check-input">'
              },
              render: function () {
                return '<input type="checkbox" class="dt-checkboxes form-check-input" >';
              },
              searchable: false
            },
           
          ],
          order: [[1, 'asc']],
          dom: '<"row mx-2"' +
            '<"col-md-4 px-0"f>' + 
            '<"col-md-8 dopp_tb d-flex justify-content-end align-items-center"l<"button-wrapper"B>>' + 
            '<"col-md-3 d-none"p>>' +
            't' + 
            '<"row mx-2"' +
            '<"col-md-5 d-none"i>' + 
            '<"col-md-7 d-none"p>>', 
          displayLength: perPage, 
          lengthMenu: [10, 20, 50, 100, 200], 
          language: {
            sLengthMenu: '_MENU_',
            search: '', 
            searchPlaceholder: 'Search Offer',
            paginate: { 
              previous: '<i class="fa-solid fa-chevron-left"></i>',
              next: '<i class="fa-solid fa-chevron-right"></i>'
            }
          },
          buttons: [
            {
              extend: 'collection',
              className: 'btn btn-label-primary dropdown-toggle me-3',
              text: '<i class="ti ti-screen-share me-1 ti-xs"></i>Export',
              buttons: [
                {
                  extend: 'print',
                  text: '<i class="ti ti-printer me-1 ti-xs text-primary"></i>Print',
                  className: 'dropdown-item',
                  exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8] }
                },
                {
                  extend: 'csv',
                  text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                  className: 'dropdown-item',
                  exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8] }
                },
                {
                  extend: 'excel',
                  text: '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                  className: 'dropdown-item',
                  exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8] }
                },
                {
                  extend: 'pdf',
                  text: '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                  className: 'dropdown-item',
                  exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8] }
                },
                {
                  extend: 'copy',
                  text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                  className: 'dropdown-item',
                  exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8] }
                }
              ]
            },
          ],
        });
        this.getLoader = false;
        })
        .catch((error) => {
         console.log(error);;
        })
        .finally(() => {
          this.getLoader = false;
        });
    },
    attachEventListenersForSearch() {
      $("#advertiser_datatables_wrapper #advertiser_datatables_filter input").on("keyup", (event) => {
        const target = $(event.target);
        const getSearchValue = target.val();
        this.getAdvertiserData(1,10,getSearchValue);
      });
    },

    attachEventListenersForMenu() {
      $("#advertiser_datatables_wrapper [name='advertiser_datatables_length']").on("change", (event) => {
        this.getLoader = true;
        const target = $(event.target);
        const getSelectedValue = target.val();
        this.getAdvertiserData(1,getSelectedValue);
      });
    },

    attachEventListeners() {
      $("#advertiser_datatables").on("click", ".advertisher-action", (event) => {
        const target = $(event.target);
        const dataId = target.data("id");
        const dataClass = target.data("action");
        const dataEmail = target.data("email");
        if(dataClass === 'payment-btn'){
          this.paymentsDtails(dataId);
        }else if(dataClass === 'delete-btn'){
          this.deltePublisher(dataId);
        }else if(dataClass === 'approved-btn'){
          this.modalData.data = dataId;
          this.modalData.email = dataEmail;
          this.modalData.action_type = "approved",
          this.modalTitle = "Want to Approved";
          this.modalDisplay = "block";

        }else if(dataClass === 'pending-btn'){
          this.modalData.data = dataId;
          this.modalData.email = dataEmail;
          this.modalData.action_type = "pending",
          this.modalTitle = "Want to Pending";
          this.modalDisplay = "block";

        }else if(dataClass === 'unsuspend-btn'){
          this.modalData.data = dataId;
          this.modalData.email = dataEmail;
          this.modalData.action_type = "unsuspend",
          this.modalTitle = "Want to Unsuspend";
          this.modalDisplay = "block";

        }else if(dataClass === 'suspend-btn'){
          this.modalData.data = dataId;
          this.modalData.email = dataEmail;
          this.modalData.action_type = "suspend",
          this.modalTitle = "Want to Suspend";
          this.modalDisplay = "block";

        }else if(dataClass === 'resume-btn'){
          this.modalData.data = dataId;
          this.modalData.email = dataEmail;
          this.modalData.action_type = "resume",
          this.modalTitle = "Want to Resume";
          this.modalDisplay = "block";

        }else if(dataClass === 'pause-btn'){
          this.modalData.data = dataId;
          this.modalData.email = dataEmail;
          this.modalData.action_type = "pause",
          this.modalTitle = "Want to Push";
          this.modalDisplay = "block";

        }else if(dataClass === 'log-in-publisher'){
          this.loginAsAdvertisher(dataId);
        }
      });
    },
    //Payment Detailse View 
    paymentsDtails(id){
      this.getLoader = true;
      axios
        .get(
          this.globalVariables.apiUrl+"admin/payment/history/"+id,
          { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
        )
        .then((res) => {
          if(res.data.status == 'error'){
            toastr.error(res.data.message);
          }else{
            window.open("/admin-manage-advertiser-details/" + id, "_blank");
          }
        })
        .catch((error) => {
          console.log(error);;
        })
        .finally (() => {
          this.getLoader = false;
        });
    },
    // Account Access Settings
    submiteModal() {
      this.getLoader = true;
      axios
        .post(
          this.globalVariables.apiUrl+"admin/manage/user/account-access",
          this.modalData,
          { headers: { Authorization: "Bearer " + localStorage.getItem("token"), },}
        )
        .then((res) => {
            this.getAdvertiserData();
            toastr.success(res.data.message);
            const modalElement = document.getElementById('statusChangeModal');
            const modal = bootstrap.Modal.getInstance(modalElement);
            if(modal){
              modal.hide();
            }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.getLoader = false;
        });
    },
    // User Delete
    deltePublisher(id) {
      var mydata = { data: id }; 
      Swal.fire({
        text: "Are you sure delete",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.value) {
          this.getLoader =  true;
          axios
            .post(this.globalVariables.apiUrl+"admin/manage/user/delete", mydata, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((res) => {
              toastr.success(res.data.message);
              this.getAdvertiserData();
            })
            .catch((error) => {
              console.log(error);
            })
            .finally (() => {
              this.getLoader = false;
            });
        } 
      });
    },
    // Reset Search 
    SearchData(){
      this.getAdvertiserData();
    },

     //Login As Advertisher
     loginAsAdvertisher(avertiserId){
      this.getLoader =  true;
      axios
        .get(this.globalVariables.apiUrl+`admin/login/avertiser/${avertiserId}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if(res.data.status == 'not_email_verified'){
            toastr.warning('Please verify your email address');
            window.location.href = 'https://doppcall.com/login?token=logout';
            localStorage.setItem("token", ""); 
          } else if(res.data.status == 'success'){
            localStorage.setItem("admin_Id", res.data.admin_id);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem('authUserFromLocalStorage', JSON.stringify(res.data));
            this.$router.push("/advertiser/dashboard/user");
          }else{
            window.location.href = 'https://doppcall.com/login?token=logout';
            toastr.error(res.data.message);
          }
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
<style>
#advertiser_datatables colgroup:nth-of-type(2) {
	display: none !important;
}
#advertiser_datatables .dt-checkboxes-cell{
	padding: 0.7rem 0.5rem !important;
}
.country-flag {
	width: 20%;
}
#dropdownMenuButton {
	background: transparent;
}
.admin-advertiser-country-flag {
	width: 14%;
}
#advertiser_datatables td {
  white-space: nowrap; /* Prevents wrapping */
  overflow: hidden; /* Hides overflow */
  text-overflow: ellipsis; /* Adds "..." for overflow */
  max-width: 100px !important; /* Set max width for cell */
}
#advertiser_datatables {
  min-height: 500px;
}
.admin-advertiser-country-flag {
	width: 20px !important;
}
</style>