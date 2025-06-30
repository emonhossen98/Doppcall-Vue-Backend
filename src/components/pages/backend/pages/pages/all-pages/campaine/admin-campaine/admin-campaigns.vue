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
          <div class="card ">
            <div class="card-header pt-3 pb-0">
              <h5 class="card-title mb-0 ms-1">Campaigns</h5>
            </div>
            <div class="card-body">
              <table class="table mb-0" id="admin_campaign_datatables">
                <thead>
                  <tr>
                    <!-- <th></th> -->
                    <th></th>
                    <!-- <th>SL</th> -->
                    <th>Offer</th>
                    <th>Campaign Name</th>
                    <th>Type</th>
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
import Loader from '../../../../../include/loader.vue';
import Breadcrumb from '../../../../../include/breadcrumb.vue';
import { inject } from "vue";
import { fetchUserRole } from "@/services/userService";
import moment from "moment";

export default {
  setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
  components:{
    Loader,
    Breadcrumb,
  },
  data() {
    return {
      getLoader : false,
      showFilter : false,
      breadcrumbs: [
        { label: "Dashboard", url: "/dashboard" },
        { label: "Admin Campaigns", url: "" },
      ],

      campain: "",
      statusCampaign : {
        data : "",
        actionType : "",
      },
      campaignDelete : {
        data : "",
      },
      bulkactionids : {
        selectedIds: [],
        status : "",
      },
    };
  },
  async mounted() { 
    try {
      const { role, isAuthorized } = await fetchUserRole();
      if (role == 'Super' || role == 'Admin') {
        this.getCampain();
        this.$nextTick(() => {
          const dataTableWrapper = document.querySelectorAll('#admin_campaign_datatables_wrapper .row.mx-2');
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
  methods: {
    getCampain() {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl+"admin/campaigns/get-data", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          if ($.fn.DataTable.isDataTable("#admin_campaign_datatables")) {
          $('#admin_campaign_datatables').DataTable().destroy();
        }
          var formateDate = this.formatDates;
          var table = $('#admin_campaign_datatables').DataTable({
            data: res.data,
            columns: [
              // { data: 'id' },
              // { data: 'id' },
              { data: 'id' },
              {
                data: "convart_offer",
                render: function (data, type, row) {
                  if (row.convart_offer != null) {
                    return row.convart_offer.length > 100 
                      ? row.convart_offer.slice(0, 150) + '...'  
                      : row.convart_offer; 
                  }
                  return '----------';
                },
              },
              {
                data: "name",
                render: function (data, type, row) {
                  if (row.name != null) {
                    return row.name.length > 25 
                      ? row.name.slice(0, 25) + '...'  
                      : row.name; 
                  }
                  return '----------';
                },
              },
              {
                data: "type",
                render: function (data, type, row) {
                  if (row.type != null) {
                    return row.type;
                  }
                  return '----------';
                },
              },
              {
                data: "phone_number",
                render: function (data, type, row) {
                  if (row.phone_number != null) {
                    return row.phone_number; 
                  }
                  return '----------';
                },
              },
              { data: 'convart_status'},
              { data: '' }
            ],
            initComplete: () => { 
               $('#admin_campaign_datatables').wrap('<div class="commonDataTablesClass"></div>');
              const table = $("#admin_campaign_datatables").DataTable();
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
                $('.select-colunm-position').on('click', function (e) {
                  e.stopPropagation();
                });

                $('.select-colunm-position .dropdown-item').on('click', function (e) {
                  e.stopPropagation();
                });
              this.attachEventListeners();
              this.attachEventListenersBlulkAction();
              this.attachEventListenersBlulkActionSubmit();
            },
            createdRow: function (row, data, dataIndex) {
                $('td:eq(0)', row).html(dataIndex + 1);
            },
            columnDefs: [
              {
                targets: 0,
                orderable: false,
                checkboxes: {
                  selectAllRender: '<input type="checkbox" class="form-check-input ms-1">',
                },
                render: function (data, type, row) {
                  return `<input type="checkbox" class="dt-checkboxes form-check-input ms-1 row-checkbox" data-id="${row.id}">`;
                },
                searchable: false
              },
              {
                targets: -1,
                title: 'Actions',
                searchable: false,
                orderable: false,
                render: function (data, type, full, meta) {
                  return full.convart_action;
                }
              }
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
              searchPlaceholder: 'Search Campaign',
              paginate: { 
                previous: '<i class="fa-solid fa-chevron-left"></i>',
                next: '<i class="fa-solid fa-chevron-right"></i>'
              }
            },
            buttons: [
              {
                text: `
                  <div id="bulk-action-wrapper">
                    <select id="bulk-action-select" class="form-select form-select-sm">
                      <option value=""> ✓ Bulk Actions</option>
                      <option value="delete">Bulk Delete</option>
                      <option value="0">Pending</option>
                      <option value="1">Approved</option>
                      <option value="2">Pause</option>
                      <option value="3">Reject</option>
                      <option value="4">Resume</option>
                    </select>
                  </div>
                `,     
                className: "me-2 p-0 btn-primary d-none",
                attr: { id: "bulk-action-container" },
              },
              {
              extend: 'collection',
              className: 'btn btn-label-primary dropdown-toggle me-3',
              text: '<i class="ti ti-screen-share me-1 ti-xs"></i>Export',
              buttons: [
                {
                  extend: 'print',
                  text: '<i class="ti ti-printer me-1 ti-xs text-primary"></i>Print',
                  className: 'dropdown-item',
                  exportOptions: { columns: [2, 3, 4, 5, 6] }
                },
                {
                  extend: 'csv',
                  text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                  className: 'dropdown-item',
                  exportOptions: { columns: [2, 3, 4, 5, 6] }
                },
                {
                  extend: 'excel',
                  text: '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                  className: 'dropdown-item',
                  exportOptions: { columns: [2, 3, 4, 5, 6] }
                },
                {
                  extend: 'pdf',
                  text: '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                  className: 'dropdown-item',
                  exportOptions: { columns: [2, 3, 4, 5, 6] }
                },
                {
                  extend: 'copy',
                  text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                  className: 'dropdown-item',
                  exportOptions: { columns: [2, 3, 4, 5, 6] }
                },
              ],
            },
            {
                  className: "btn btn-primary ms-2",
                  text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">SL</a></li><li><a class="dropdown-item" href="#" data-column="1">Offer</a></li><li><a class="dropdown-item" href="#" data-column="2">Campaign Name</a></li><li><a class="dropdown-item" href="#" data-column="3">Type</a></li><li><a class="dropdown-item" href="#" data-column="4">Phone Number</a></li><li><a class="dropdown-item" href="#" data-column="5">Status</a></li><li><a class="dropdown-item" href="#" data-column="6">Action</a></li></div></ul></div>',
                },
            ],
          });
        })
        .catch((e) => {
          return e;
        })
        .finally(()=>{
          this.getLoader = false;
        });
    },
    formatDates(date) {
      return moment(date).format('D MMMM YYYY');
    },
    
    attachEventListeners() {
      $('#admin_campaign_datatables').on('click', '.admin-campaign-action', (event) => {
        const target = $(event.target);
        const dataId = target.data('id');
        const dataClass = target.data('action');
        if (dataClass === 'pending-btn') {
          this.statusCampaign.data = dataId;
          this.statusCampaign.actionType = 'pending';
          this.statusChange('Are your sure pending?');
        }else if(dataClass === 'published-btn'){
          this.statusCampaign.data = dataId;
          this.statusCampaign.actionType = 'published';
          this.statusChange('Are your sure published?');
        }else if(dataClass === 'delete-campaign-btn'){
           this.campaignDelete.data = dataId;
          Swal.fire({
            text: 'Are you sure delete',
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
          }).then((result) => {
            if (result.value) {
              this.getLoader = true,
              axios
                .post(this.globalVariables.apiUrl+"admin/campaigns/delete", this.campaignDelete, {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                })
                .then((res) => {
                  if(res.data.status == 'success'){
                    toastr.success(res.data.message);
                    this.getCampain();
                  }else{
                    toastr.error(res.data.message);
                  }
                })
                .catch((e) => {
                  return e;
                })
                .finally(()=> {
                  this.getLoader = false;
                });
              } 
          });
        }
      });
    },

    attachEventListenersBlulkAction() {
      $('#admin_campaign_datatables').on('change', '.row-checkbox', (event) => {
        const id = parseInt(event.target.dataset.id);
        if (event.target.checked) {
          if (!this.bulkactionids.selectedIds.includes(id)) {
            this.bulkactionids.selectedIds.push(id);
          }
        } else {
          this.bulkactionids.selectedIds = this.bulkactionids.selectedIds.filter(item => item !== id);
        }

        this.toggleBulkActionVisibility();
      });

      $('#admin_campaign_datatables thead').on('change', 'input[type="checkbox"]', (event) => {
        const isChecked = event.target.checked;
        $('#admin_campaign_datatables tbody .row-checkbox').each((index, checkbox) => {
          checkbox.checked = isChecked;
          const id = parseInt(checkbox.dataset.id);

          if (isChecked) {
            if (!this.bulkactionids.selectedIds.includes(id)) {
              this.bulkactionids.selectedIds.push(id);
            }
          } else {
            this.bulkactionids.selectedIds = [];
          }
        });

        this.toggleBulkActionVisibility();
      });
    },

    attachEventListenersBlulkActionSubmit() {
      $('#bulk-action-select').off().on('change', (e) => {
        const action = e.target.value;
        if (!action || this.bulkactionids.selectedIds.length === 0) {
          return;
        }
        if (action === 'delete') {
          this.bulkDelete();
        } else {
          if (action === "1") {
            this.bulkactionids.status = '1';
            const alertTitle = "Offer Want to Approved";
            this.bulkStatusChange(alertTitle);
          } else if (action === "0") {
            this.bulkactionids.status = '0';
            const alertTitle = "Offer Want to Pending";
            this.bulkStatusChange(alertTitle);
          } else if (action === "4") {
            this.bulkactionids.status = '4';
            const alertTitle = "Offer Want to Resume";
            this.bulkStatusChange(alertTitle);
          } else if (action === "2") {
            this.bulkactionids.status = '2';
            const alertTitle = "Offer Want to Pause";
            this.bulkStatusChange(alertTitle);
          }else{
            this.bulkactionids.status = '3';
            const alertTitle = "Offer Want to Reject";
            this.bulkStatusChange(alertTitle);
          }
        }
        $('#bulk-action-select').val('');
      });
    },

    toggleBulkActionVisibility() {
      const bulkActionWrapper = $('#bulk-action-container');
      if (this.bulkactionids.selectedIds.length > 0) {
        bulkActionWrapper?.removeClass('d-none');
      } else {
        bulkActionWrapper?.addClass('d-none');
      }
    },

    bulkDelete() {
      Swal.fire({
        text: 'Are Sure Delete',
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.value) {
          (this.getLoader = true),
            axios
              .post(
                this.globalVariables.apiUrl + "admin/campaigns/bulk-delete",
                this.bulkactionids,
                {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }
              )
              .then((res) => {
                if (res.data.status == "success") {
                  toastr.success(res.data.message);
                  this.getCampain();
                } else {
                  toastr.error(res.data.message);
                }
              })
              .catch((e) => {
                return e;
              })
              .finally(() => {
                this.getLoader = false;
              });
        }
      });
    },

    bulkStatusChange(alertTitle) {
          Swal.fire({
            text: alertTitle,
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
          }).then((result) => {
            if (result.value) {
              (this.getLoader = true),
                axios
                  .post(
                    this.globalVariables.apiUrl + "admin/campaigns/bulk-status",
                    this.bulkactionids,
                    {
                      headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                      },
                    }
                  )
                  .then((res) => {
                    if (res.data.status == "success") {
                      toastr.success(res.data.message);
                      this.getCampain();
                    } else {
                      toastr.error(res.data.message);
                    }
                  })
                  .catch((e) => {
                    return e;
                  })
                  .finally(() => {
                    this.getLoader = false;
                  });
            }
          });
        },
    statusChange(title){
      Swal.fire({
      text: title,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.value) {
        this.getLoader = true,
        axios
          .post(this.globalVariables.apiUrl+"admin/campaigns/status", this.statusCampaign, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
            if(res.data.status == 'success'){
              toastr.success(res.data.message);
              this.getCampain();
            }else{
              toastr.error(res.data.message);
            }
          })
          .catch((e) => {
            return e;
          })
          .finally(()=> {
            this.getLoader = false;
          });
        } 
    });
    }
  },
};
</script>
<style>
.country-flag-of-admin{
  width:30px;
  margin-right : 5px;
}
#admin_campaign_datatables .dt-checkboxes-cell{
	padding: 0.7rem 0.5rem !important;
}
#admin_campaign colgroup:nth-of-type(2) {
	display: none !important;
}
#admin_campaign .country-flag {
  width: 10% !important;
}
#dropdownMenuButton {
	background: transparent;
}
#admin_campaign_datatables .dropdown-item{
	display: flex !important;
	align-items: center !important;
}
/* #admin_campaign_datatables {
  min-height: 200px;
} */
</style>
