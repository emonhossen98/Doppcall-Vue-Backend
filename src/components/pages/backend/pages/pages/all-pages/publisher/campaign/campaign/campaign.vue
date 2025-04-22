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
              <h5 class="card-title mt-2 mb-0">
                Campaigns
              </h5>
            </div>
            <div class="card-body table-responsive table-overflow-hidden">
              <table class="table mb-0" id="campaign_datatables">
                <thead>
                  <tr>
                    <!-- <th></th> -->
                    <th></th>
                    <th>SL</th>
                    <th>Offer</th>
                    <th>Campaign</th>
                    <th>Number</th>
                    <th>Status</th>
                    <th>Approve date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody></tbody>
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
import Loader from "../../../../../../include/loader.vue";
import Breadcrumb from "../../../../../../include/breadcrumb.vue";
import { inject } from "vue";
import { fetchUserRolePublisher } from "@/services/userServicePublisher";

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
        { label: "Dashboard", url: "/publisher/dashboard" },
        { label: "Campaigns", url: "" },
      ],
      getLoader: false,
      campaignDelete : {
        data : "",
      },
      bulkactionids : {
        selectedIds: [],
      },
    };
  },
  async mounted() { 
    try {
      const { role, isAuthorized } = await fetchUserRolePublisher();
      if (role == 'Publisher') {
        this.getPusbliserCampaignData();
        this.$nextTick(() => {
          const dataTableWrapper = document.querySelectorAll('#campaign_datatables_wrapper .row.mx-2');
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
    getPusbliserCampaignData() {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl+"publisher/offer/campaign", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          if ($.fn.DataTable.isDataTable("#campaign_datatables")) {
            $('#campaign_datatables').DataTable().destroy();
          }
        var table = $('#campaign_datatables').DataTable({
          data: res.data.campaignDatas,
          columns: [
            // { data: 'id' },
            { data: 'id' },
            { data: 'id' },
            { data: 'convert_flag_icon' },
            {
                data: "name",
                render: function (data, type, row) {
                  if (row.name != null) {
                    return row.name.length > 20 
                      ? row.name.slice(0, 20) + '...'  
                      : row.name; 
                  }
                  return '----------';
                },
              },
            // { data: 'name' },
            { data: 'phone_number' },
            { data: 'convert_status' },
            { data: 'approve_or_reject_date' },
            { data: 'convert_action' },
          ],
          initComplete: () => { 
            this.attachEventListeners();
            this.attachEventListenersBlulkAction();
            this.attachEventListenersBlulkActionSubmit();
          },
          createdRow: function (row, data, dataIndex) {
            $("td:eq(0)", row).html(dataIndex + 1);
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
          ],
          order: [[2, 'desc']],
          dom: '<"row mx-2"' +
            '<"col-md-4"f>' + 
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
                }
              ]
            },
          ],
        });
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    attachEventListenersBlulkAction() {
          $('#campaign_datatables').on('change', '.row-checkbox', (event) => {
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
          $('#campaign_datatables thead').on('change', 'input[type="checkbox"]', (event) => {
            const isChecked = event.target.checked;
            $('#campaign_datatables tbody .row-checkbox').each((index, checkbox) => {
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
        }
        $('#bulk-action-select').val('');
      });
    },
    
    toggleBulkActionVisibility() {
      const bulkActionWrapper = $('#bulk-action-container');
      const bulkActionWrapperSecond = $('#bulk-action-container-second');
      if (this.bulkactionids.selectedIds.length > 0) {
        bulkActionWrapper?.removeClass('d-none');
      } else {
        bulkActionWrapper?.addClass('d-none');
      }

      if (this.bulkactionids.selectedIds.length > 0) {
        bulkActionWrapperSecond?.removeClass('d-none');
      } else {
        bulkActionWrapperSecond?.addClass('d-none');
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
                this.globalVariables.apiUrl + "publisher/offer/campaign/bulk/delete",
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
                  this.getPusbliserCampaignData();
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

    attachEventListeners() {
      $("#campaign_datatables").on("click", ".publisher-campaign-action", (event) => {
        const target = $(event.target);
        const dataId = target.data("id");
        const dataClass = target.attr("id");
        if(dataClass === "campaign-delete"){
          this.campaignDelete.data = dataId;
          this.deleteCampaign();
        }
      });
    },

    // Questions Delete
    deleteCampaign(id) {
      Swal.fire({
        text: "Are you sure delete",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.value) {
          this.getLoader = true;
          axios
            .post(
              this.globalVariables.apiUrl+`publisher/offer/campaign/delete`,this.campaignDelete,
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
            )
            .then((res) => {
              if(res.data.status == 'success'){
                toastr.success(res.data.message);
                this.getPusbliserCampaignData();
              }else{
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
  },
};
</script>
<style>
#campaign_datatables colgroup:nth-of-type(2) {
	display: none !important;
}
#campaign_datatables .dt-checkboxes-cell {
	padding: 0.9rem 0.5rem !important;
}
.country-flag {
	width: 5%;
  margin-right : 6px;
}
#dropdownMenuButton {
	background: transparent;
}
</style>
