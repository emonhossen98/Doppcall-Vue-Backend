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
                        Campaigns 
                      </h5>
                  </div>
                  <div class="card-body">
                      <div class="table-responsive-sm table-overflow-hidden">
                          <table class="align-middle mb-0 table table-hover" id="publishers_tables">
                              <thead>
                                <tr>
                                    <!-- <th></th> -->
                                    <th></th>
                                    <th>Offer</th>
                                    <th>Campaign Name</th>
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
          { label: "Campaigns", url: "" },
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
        .get(this.globalVariables.apiUrl+"account-manager/campaigns/get-data", {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },  
          })
          .then((res) => {
            if ($.fn.DataTable.isDataTable("#publishers_tables")) {
            $('#publishers_tables').DataTable().destroy();
          }
          console.log(res.data)
          var table = $('#publishers_tables').DataTable({
                data: res.data,
                columns: [
                  {data : "id"},
                  {data : "convart_campign_name"},
                  { data : "name"},
                  { data : "convart_status"},
                  { data : "convart_action"},

                ],
                initComplete: () => {
                  this.attachEventListeners();
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
        if(dataClass === "dropdown-item publisher-view align-items-center"){
          this.$router.push('/account-campaigns-view/'+dataId);
        }else if(dataClass === "dropdown-item publisher-edit align-items-center"){
            this.$router.push('/account-campaigns-edit/'+dataId);
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
  .country-flagofPhonecampagin {
	width: 7%;
}
  </style>