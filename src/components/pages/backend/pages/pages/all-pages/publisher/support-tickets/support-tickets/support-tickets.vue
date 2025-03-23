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
                  '<div class="support_action d-flex align-items-center"><button type="button" id="view-btn"  data-id='+row.ticket_no +' class="rounded-circle btn-style-info me-2"><i class="fas fa-eye fa-sm" id="view-btn" data-id='+row.ticket_no +'></i></button><button type="button" id="edit-btn" class="btn-style-edit me-2 d-flex  align-items-center" data-id='+row.id+'><i id="edit-btn" class="far fa-edit fa-sm" data-id='+row.id+'></i></button></div>'
                );
              }
            },
          ],
          initComplete: () => {
            this.attachEventListeners();
            this.attachEventListenersOfButton();
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

    attachEventListeners() {
      $("#support_tickets_tables").on("click", ".support_action", (event) => {
        const target = $(event.target);
        const dataId = target.data("id");
        const dataClass = target.attr("id");
        if(dataClass === 'edit-btn'){
         this.$router.push('/publisher-support-ticket-edit/'+dataId);
        }else if(dataClass === 'view-btn'){
          this.$router.push('/publisher-support-ticket-view/'+dataId);
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


