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
                      <h5 class="card-title mb-0 mt-2">
                        Advertisers 
                      </h5>
                  </div>
                  <div class="card-body">
                      <div class="table-responsive-sm table-overflow-hidden">
                          <table class="align-middle mb-0 table table-hover" id="publishers_tables">
                              <thead>
                                  <tr>
                                    <!-- <th></th> -->
                                    <th></th>
                                    <th>Company Name</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                  </tr>			
                              </thead>
                              <tbody>
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>
          </div>
          </div>
        </div>
        <!-- / Content -->
        <div class="content-backdrop fade"></div>
      </div>
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
              <div>
                <p class="font-class">Please verify your Account</p>
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
  import { fetchUserRoleAccountmanager } from "@/services/userServiceAccountmanager";
  
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
          { label: "Dashboard", url: "/account/dashboard" },
          { label: "Publishers", url: "" },
        ],
        getLoader: false,
        modalTitle : "",
        modalData: {
          data: "",
          action_type: "",
          email: " ",
          note: "",
          mailAction: "",
        },
        modalDisplay: "none",
      };
    },
    async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRoleAccountmanager();
        if (role == 'Account manager') {
          this.getManagePublsihers();
          this.$nextTick(() => {
            const dataTableWrapper = document.querySelectorAll('#publishers_tables_wrapper .row.mx-2');
            if (dataTableWrapper.length > 0) {
              dataTableWrapper[0].style.display = 'none';
              dataTableWrapper[1].style.display = 'none';
            }
          });
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    },
    methods: {
      getManagePublsihers() {
        this.getLoader = true;
        axios
          .get(this.globalVariables.apiUrl+"account-manager/manage/advertiser/get-data", {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },  
          })
          .then((res) => {
            if ($.fn.DataTable.isDataTable("#publishers_tables")) {
            $('#publishers_tables').DataTable().destroy();
          }
              var table = $('#publishers_tables').DataTable({
                data: res.data.getDatas,
                columns: [
                  {data : "id"},
                  {
                    data: "company_name",
                    render: function (data, type, row) {
                      if (row.company_name != null) {
                        return row.company_name.length > 10 
                          ? row.company_name.slice(0, 10) + '...'  
                          : row.company_name; 
                      }
                      return '----------';
                    },
                  },
                  {data : "fname"},
                  {data : "lname"},
                  {
                    data: "email",
                    render: function (data, type, row) {
                      if (row.email != null) {
                        return row.email.length > 15 
                          ? row.email.slice(0, 15) + '...'  
                          : row.email; 
                      }
                      return '----------';
                    },
                  },
                  { data : "convart_phone"},
                  { data : "convart_status"},
                  { data : "convart_action"},

                ],
                initComplete: () => {
                    const table = $("#publishers_tables").DataTable();
                const dropdownItems = document.querySelectorAll('.dropdown-menu .dropdown-item');

                dropdownItems.forEach((item) => {
                  const columnAttr = item.getAttribute("data-column"); 
                  if (columnAttr === "all") {
                    item.addEventListener("click", function (e) {
                      e.preventDefault();
                      table.columns().visible(true);
                      dropdownItems.forEach((el) => {
                        if (el.getAttribute("data-column") !== "all") {
                          el.classList.add("active");
                        }
                      });
                    });
                  } else {
                    const columnIndex = parseInt(columnAttr);
                    const column = table.column(columnIndex);
                    if (column.visible()) {
                      item.classList.add("active");
                    }

                    item.addEventListener("click", function (e) {
                      e.preventDefault();

                      const currentVisible = column.visible();
                      column.visible(!currentVisible);

                      if (!currentVisible) {
                        item.classList.add("active");
                      } else {
                        item.classList.remove("active");
                      }
                    });
                  }
                });
                  this.attachEventListeners();
                  this.attachEventListenersOfButton();
                },
                createdRow: function (row, data, dataIndex) {
                    $('td:eq(0)', row).html(dataIndex + 1);
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
                order: [[2, 'desc']],
                dom: '<"row mx-2"' +
                  '<"col-md-4 px-0"f>' + 
                  '<"col-md-8 dopp_tb d-flex justify-content-end align-items-center"l<"button-wrapper"B>>' + 
                  '<"col-md-3 d-none"p>>' +
                  't' + 
                  '<"row mx-2"' +
                  '<"col-md-5"i>' + 
                  '<"col-md-7"p>>', 
                displayLength: 10, 
                lengthMenu: [10, 20, 50, 100, 200], 
                language: {
                  sLengthMenu: '_MENU_',
                  search: '', 
                  searchPlaceholder: 'Search Advertiser',
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
                        exportOptions: { columns: [2, 3, 4,5] }
                      },
                      {
                        extend: 'csv',
                        text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                        className: 'dropdown-item',
                        exportOptions: { columns: [2, 3, 4,5] }
                      },
                      {
                        extend: 'excel',
                        text: '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                        className: 'dropdown-item',
                        exportOptions: { columns: [2, 3, 4,5] }
                      },
                      {
                        extend: 'pdf',
                        text: '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                        className: 'dropdown-item',
                        exportOptions: { columns: [2, 3, 4,5] }
                      },
                      {
                        extend: 'copy',
                        text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                        className: 'dropdown-item',
                        exportOptions: { columns: [2, 3, 4,5] }
                      }
                    ]
                  },
                  {
                  className: "btn btn-primary",
                  text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><li><a class="dropdown-item" href="#" data-column="all">All</a></li><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">Company Name</a></li><li><a class="dropdown-item" href="#" data-column="2">First Name</a></li><li><a class="dropdown-item" href="#" data-column="3">Last Name</a></li><li><a class="dropdown-item" href="#" data-column="4">Email</a></li><li><a class="dropdown-item" href="#" data-column="5">Phone Number</a></li><li><a class="dropdown-item" href="#" data-column="6">Status</a></li><li><a class="dropdown-item" href="#" data-column="7">Action</a></li></ul></div>',
                },
                ],
              });
              this.getLoader = false;
              })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.getLoader = false;
          });
      },
  
      attachEventListeners() {
      $("#publishers_tables").on("click", ".dropdown-item", (event) => {
        const target = $(event.target);
        const dataId = target.data("id");
        const dataClass = target.attr("class");
        const dataEmail = target.data("email");

        if(dataClass === 'dropdown-item approved-btn align-items-center'){
          this.modalData.data = dataId;
          this.modalData.email = dataEmail;
          this.modalData.action_type = "approved",
          this.modalTitle = "Want to Approved";
          this.modalDisplay = "block";

        }else if(dataClass === 'dropdown-item pending-btn align-items-center'){
          this.modalData.data = dataId;
          this.modalData.email = dataEmail;
          this.modalData.action_type = "pending",
          this.modalTitle = "Want to Pending";
          this.modalDisplay = "block";

        }else if(dataClass === 'dropdown-item unsuspend-btn align-items-center'){
          this.modalData.data = dataId;
          this.modalData.email = dataEmail;
          this.modalData.action_type = "unsuspend",
          this.modalTitle = "Want to Unsuspend";
          this.modalDisplay = "block";

        }else if(dataClass === 'dropdown-item suspend-btn align-items-center'){
          this.modalData.data = dataId;
          this.modalData.email = dataEmail;
          this.modalData.action_type = "suspend",
          this.modalTitle = "Want to Suspend";
          this.modalDisplay = "block";

        }else if(dataClass === 'dropdown-item resume-btn align-items-center'){
          this.modalData.data = dataId;
          this.modalData.email = dataEmail;
          this.modalData.action_type = "resume",
          this.modalTitle = "Want to Resume";
          this.modalDisplay = "block";

        }else if(dataClass === 'dropdown-item pause-btn align-items-center'){
          this.modalData.data = dataId;
          this.modalData.email = dataEmail;
          this.modalData.action_type = "pause",
          this.modalTitle = "Want to Push";
          this.modalDisplay = "block";
        }else if(dataClass === "dropdown-item publisher-view align-items-center"){
          this.$router.push('/account-advertisher-view/'+dataId);
        }
      });
        },
    // Account Access Settings
    submiteModal() {
          this.getLoader = true;
          axios
            .post(
              this.globalVariables.apiUrl+"account-manager/manage/user/account-access",
              this.modalData,
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
            )
            .then((res) => {
              if(res.data.status == 'success'){
                this.getManagePublsihers();
                this.callToNext();
                toastr.success(res.data.message);
                const modalElement = document.getElementById('statusChangeModal');
                const modal = bootstrap.Modal.getInstance(modalElement);
                if(modal){
                  modal.hide();
                }
              }else{
                toastr.error(res.data.message);
              }
            })
            .catch((error) => {
              console.log(error);
            })
            .finally(() => {
              this.getLoader = false;
            });
    }, 

    callToNext(){
      this.$nextTick(() => {
        const dataTableWrapper = document.querySelectorAll('#publishers_tables_wrapper .row.mx-2');
        if (dataTableWrapper.length > 0) {
          dataTableWrapper[0].style.display = 'none';
          dataTableWrapper[1].style.display = 'none';
        }
      });
    },

    attachEventListenersOfButton() {
      $("#offer_datatables_wrapper").on("click", "button", (event) => {
        const target = $(event.target);
        const dataClass = target.attr("id");
        if (dataClass === "create") {
          this.$router.push("/admin-offers/create");
        }
      });
    },
    },
  };
  </script>
<style>
  #dropdownMenuButton {
	background: transparent;
}
  #publishers_tables colgroup:nth-of-type(2) {
      display: none !important;
  }
  #publishers_tables .dt-checkboxes-cell{
      padding: 0.7rem 0.5rem !important;
  }
  .country-flagofPhone {
	width: 15%;
}
  </style>