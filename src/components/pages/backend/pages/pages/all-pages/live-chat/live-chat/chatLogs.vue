<template>
  <div v-if="getLoader">
    <Loader></Loader>
  </div>
  <!-- Content wrapper -->
  <div class="content-wrapper">
    <div class="container-xxl flex-grow-1 container-p-y">
      <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
      <div class="row mt-4">
        <div class="col-12">
          <div class="card">
            <div class="card-header py-2">
              <h5 class="card-title mb-0 mt-2">Chat Logs</h5>
            </div>
            <div class="card-body table-responsive table-overflow-hidden">
              <table class="align-middle mb-0 table table-hover" id="chat_logs_tables">
                <thead>
                  <tr>
                    <!-- <th></th> -->
                    <th></th>
                    <th>SL</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Message</th>
                    <th>Created At</th>
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
  </div>
  <!-- Content wrapper -->
</template>

<script>
import axios from "axios";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import Loader from "../../../../../include/loader.vue";
import Breadcrumb from "../../../../../include/breadcrumb.vue";
import blank_user from "../../../../../../../../assets/backend/assets/img/blank_user.png";
import Swal from "sweetalert2";
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
        { label: "Chats", url: "/admin-chats" },
        { label: "Chats Logs", url: "" },
      ],
      getLoader: false,
      blank_user,
    };
  },
  async mounted() { 
    try {
      const { role, isAuthorized } = await fetchUserRole();
      if (role == 'Super' || role == 'Admin') {
        this.getLogsData();
        this.$nextTick(() => {
          const dataTableWrapper = document.querySelectorAll('#chat_logs_tables_wrapper .row.mx-2');
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
    getLogsData() {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl + "admin/chat/message/deleted/data", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          if ($.fn.DataTable.isDataTable("#chat_logs_tables")) {
            $("#chat_logs_tables").DataTable().destroy();
          }
          const formatTimestamp = this.formatTimestamp; 
          var table = $("#chat_logs_tables").DataTable({
            data: res.data.messages,
            columns: [
              // { data: 'id' },
              { data: "id" },
              { data: "id" },
              { data: "sender.fname" },
              { data: "sender.email" },
              {
                  data: "message",
                  render: function (data, type, row) {
                    if (row.type === 'audio') {
                      return '<audio src="https://api.doppcall.com/' + row.message + '" class="position-relative" controls></audio>';
                    } else if (row.type === 'image') {
                      return '<img id="chatLogsImage" src="https://api.doppcall.com/' + row.message + '" class="position-relative" alt="image" />';
                    } else {
                      return  row.message;
                    }
                  }
                },
                {
                  data: "created_at",
                  render: function (data, type, row) {
                    if (row.created_at != null) {
                      return formatTimestamp(row.created_at);
                    }
                  }
                },
              {
                data:"action",
                render: function (data, type, full, meta) {
                  return (
                    '<div class="chat_logs_action d-flex align-items-center"><button type="button" id="delete-btn"  data-id=' +
                    full.id +
                    ' class="btn-style-danger"><i class="far fa-trash-alt fa-sm" id="delete-btn" data-id=' +
                    full.id +
                    "></i></button></div>"
                  );
                },
              },
            ],
            initComplete: () => {
              this.attachEventListeners();
            },
            createdRow: function (row, data, dataIndex) {
              $("td:eq(1)", row).html(dataIndex + 1);
            },
            columnDefs: [
              {
                targets: 0,
                orderable: false,
                checkboxes: {
                  selectAllRender: '<input type="checkbox" class="form-check-input">',
                },
                render: function () {
                  return '<input type="checkbox" class="dt-checkboxes form-check-input">';
                },
                searchable: false,
              },
            ],
            order: [[2, "desc"]],
            dom:
              '<"row mx-2"' +
              '<"col-md-4 px-0"f>' +
              '<"col-md-8 dopp_tb d-flex justify-content-end align-items-center"l<"button-wrapper"B>>' +
              '<"col-md-3 d-none"p>>' +
              "t" +
              '<"row mx-2"' +
              '<"col-md-5"i>' +
              '<"col-md-7"p>>',
            displayLength: 10,
            lengthMenu: [10, 20, 50, 100, 200],
            language: {
              sLengthMenu: "_MENU_",
              search: "",
              searchPlaceholder: "Search Chat Logs",
              paginate: {
                previous: '<i class="fa-solid fa-chevron-left"></i>',
                next: '<i class="fa-solid fa-chevron-right"></i>',
              },
            },
            buttons: [
              {
                extend: "collection",
                className: "btn btn-label-primary dropdown-toggle me-3",
                text: '<i class="ti ti-screen-share me-1 ti-xs"></i>Export',
                buttons: [
                  {
                    extend: "print",
                    text: '<i class="ti ti-printer me-1 ti-xs text-primary"></i>Print',
                    className: "dropdown-item",
                    exportOptions: { columns: [2, 3, 4, 5] },
                  },
                  {
                    extend: "csv",
                    text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                    className: "dropdown-item",
                    exportOptions: { columns: [2, 3, 4, 5] },
                  },
                  {
                    extend: "excel",
                    text:
                      '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                    className: "dropdown-item",
                    exportOptions: { columns: [2, 3, 4, 5] },
                  },
                  {
                    extend: "pdf",
                    text:
                      '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                    className: "dropdown-item",
                    exportOptions: { columns: [2, 3, 4, 5] },
                  },
                  {
                    extend: "copy",
                    text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                    className: "dropdown-item",
                    exportOptions: { columns: [2, 3, 4, 5] },
                  },
                ],
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
    formatTimestamp(timestamp) {
      const messageDate = new Date(timestamp);
      const now = new Date();
      const timeDiff = now - messageDate;
      const oneHour = 1000 * 60 * 60;
      const oneDay = 1000 * 60 * 60 * 24;
      if (timeDiff < oneHour) {
        const minutesAgo = Math.floor(timeDiff / (1000 * 60));
        return `${minutesAgo} Minutes`;
      } else if (timeDiff < oneDay) {
        return `${Math.floor(timeDiff / oneHour)} Hours`;
      } else if (timeDiff < oneDay * 2) {
        return 'Yesterday';
      } else {
        return messageDate.toLocaleDateString(); 
      }
    },
    attachEventListeners() {
      $("#chat_logs_tables").on("click", ".chat_logs_action", (event) => {
        const target = $(event.target);
        const dataId = target.data("id");
        const dataClass = target.attr("id");
        if (dataClass === "delete-btn") {
          this.deleteChatMessage(dataId);
        } 
      });
    },
    // Menu Delete
    deleteChatMessage(id) {
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
            .get(this.globalVariables.apiUrl + `admin/chat/message/deleted/data/${id}`, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((res) => {
              toastr.success(res.data.messages);
              this.getLogsData();
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
#chatLogsImage{
	width: 15%;
	border-radius: 50%;
}
#chat_logs_tables .dt-checkboxes-cell {
	padding: 0.7rem 0.5rem !important;
}
#chat_logs_tables colgroup:nth-of-type(2) {
	display: none !important;
}

</style>
