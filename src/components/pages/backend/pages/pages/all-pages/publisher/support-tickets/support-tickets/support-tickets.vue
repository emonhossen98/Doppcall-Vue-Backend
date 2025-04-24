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
                <div class="px-3 py-2">
                    <h5 class="card-title mt-2 mb-0">
                        Support Tickets
                    </h5>
                </div>
                <div class="card-body table-responsive table-overflow-hidden">
                    <table class="align-middle mb-0 table table-hover" id="support_tickets_tables">
                        <thead>
                            <tr>	
                                <!-- <th></th> -->
                                <th></th>
                                <th>SL</th>
                                <th>Ticket No</th>
                                <th>Subject</th>
                                <th>Date</th>
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
        { label: "Support Tickets", url: "" },
      ],  
      getLoader: false,
      bulkactionids : {
        selectedIds: [],
        status: "",
      },
    };
  },
  async mounted() { 
    try {
      const { role, isAuthorized } = await fetchUserRolePublisher();
      if (role == 'Publisher') {
        this.getSupportTicketsData();
        this.$nextTick(() => {
          const dataTableWrapper = document.querySelectorAll('#support_tickets_tables_wrapper .row.mx-2');
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
    getSupportTicketsData() {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl+"publisher/support-tickets/get-data", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          if ($.fn.DataTable.isDataTable("#support_tickets_tables")) {
          $('#support_tickets_tables').DataTable().destroy();
        }
        var table = $('#support_tickets_tables').DataTable({
          data: res.data.tickets,
          columns: [
            // { data: 'id' },
            { data: 'id' },
            { data: 'id' },
            { data: "convart_ticket_no" },
            { data: "subject.name" },
            { data: "convart_open_date" },
            { data: "convart_status" },
            {
              data: "updated_at",
              render: function (data, type, row) {
                  return (
                  '<div class="support_action d-flex align-items-center"><a data-vue-route href="/publisher-support-ticket-view/'+row.ticket_no +'" title="View" class="rounded-circle btn-style-info me-2"><i class="fas fa-eye fa-sm"></i></a></div>'
                );
              }
            },
          ],
          initComplete: () => {
            this.attachEventListenersOfButton();
            this.attachEventListenersBlulkAction();
            this.attachEventListenersBlulkActionSubmit();
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
            searchPlaceholder: 'Search Ticket',
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
                    <option value="Open">Bulk Open</option>
                    <option value="Process">Bulk Process</option>
                    <option value="Close">Bulk Close</option>
                    <option value="Re-Open">Bulk Re-Open</option>
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
            {
              text: '<span id="create"><i id="create" class="ti ti-plus me-1 ti-xs"></i>Create</span>',
              className: 'create-new btn btn-primary',
              attr: { id: 'create' },
            }
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
      $('#support_tickets_tables').on('change', '.row-checkbox', (event) => {
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
      $('#support_tickets_tables thead').on('change', 'input[type="checkbox"]', (event) => {
        const isChecked = event.target.checked;
        $('#support_tickets_tables tbody .row-checkbox').each((index, checkbox) => {
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

          if (action === "Close") {
            this.bulkactionids.status = 'Close';
            const alertTitle = "Ticket Want to Close";
            this.bulkStatusChange(alertTitle);
          }else if(action === "Open"){
            this.bulkactionids.status = 'Open';
            const alertTitle = "Ticket Want to Open";
            this.bulkStatusChange(alertTitle);
          }else if(action === "Process"){
            this.bulkactionids.status = 'Process';
            const alertTitle = "Ticket Want to Process";
            this.bulkStatusChange(alertTitle);
          }else{
            this.bulkactionids.status = 'Re-Open';
            const alertTitle = "Ticket Want to Re-Open";
            this.bulkStatusChange(alertTitle);
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
                this.globalVariables.apiUrl + "publisher/support-tickets/bulk/status",
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
                  this.getSupportTicketsData();
                  this.bulkactionids.selectedIds = [];
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

    attachEventListenersOfButton() {
      $("#support_tickets_tables_wrapper").on("click", "button", (event) => {
        const target = $(event.target);
        const dataClass = target.attr("id");
        if (dataClass === "create") {
          this.$router.push("/publisher-support-ticket-create");
        }
      });
    },
  },
};
</script>
<style>
#support_tickets_tables colgroup:nth-of-type(2) {
	display: none !important;
}
#support_tickets_tables .dt-checkboxes-cell {
	padding: 0.9rem 0.5rem !important;
}
#view-btn {
	border: none;
	background: #2ea33b;
	color: white;
}
</style>


