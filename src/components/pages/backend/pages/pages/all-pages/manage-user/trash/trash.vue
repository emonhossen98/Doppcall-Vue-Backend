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
            <div class="card-header pt-3 pb-1">
              <h5 class="card-title mb-0">
                Trash User
              </h5>
            </div>
            <div class="card-body table-responsive table-overflow-hidden">
              <table class="align-middle mb-0 table table-hover" id="trashs_datatables">
                <thead>
                  <tr>
                    <!-- <th></th> -->
                    <th></th>
                    <th>User Type</th>
                    <th>First Name</th>
                    <th>Email</th>
                    <th>Country</th>
                    <th>Deleted By</th>
                    <th>Reason for Deletion</th> 
                    <th>Original Created Date</th>
                    <th>Deleted Time</th>
                    <th id="action-incompleted">Action</th>
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
import Loader from "../../../../../include/loader.vue";
import Breadcrumb from "../../../../../include/breadcrumb.vue";
import { inject } from "vue";
import { format } from "date-fns";
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
        { label: "Trash Users ", url: "" },
      ],
      getLoader: false,
      bulkactionids : {
        selectedIds: [],
      },
    };
  },
  async mounted() { 
    try {
      const { role, isAuthorized } = await fetchUserRole();
      if (role == 'Super' || role == 'Admin') {
        this.getUserTrashs();
        this.$nextTick(() => {
          const dataTableWrapper = document.querySelectorAll('#trashs_datatables_wrapper .row.mx-2');
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
    getUserTrashs() {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl+"admin/manage/user/trash", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          if ($.fn.DataTable.isDataTable("#trashs_datatables")) {
          $('#trashs_datatables').DataTable().destroy();
        }
        var formateDate = this.formatTime;
        var table = $('#trashs_datatables').DataTable({
          data: res.data.users,
          columns: [
            // { data: 'id' },
            { data: 'id' },
            {
              data: "role_id",
              render: function (data, type, row) {
                console.log(row)
                if(row.role_id == 1){
                  return '<span class="badge bg-success">Super Administrator</span>';
                }else if(row.role_id == 2){
                  return '<span class="badge bg-warning">Advertiser</span>';
                }else if(row.role_id == 3){
                  return '<span class="badge bg-primary">Publisher</span>';
                }else if(row.role_id == 4){
                  return '<span class="badge bg-info">Account Manager</span>';
                }else if(row.role_id == 5){
                  return '<span class="badge bg-success">System Administrator</span>';
                }else if(row.role_id == 6){
                  return '<span class="badge bg-info">Support Representative (Live Chat)</span>';
                }else{
                  return '<span class="badge bg-secondary">Author </span>';
                }
              },
            },
            {
              data: "fname",
              render: function (data, type, row) {
                if(row.role_id == 1){
                  return '<a data-vue-route title="Go To Profile">'+row?.fname+'</a>';
                }else if(row.role_id == 2){
                  return '<a data-vue-route href="/admin-manage-advertiser-view/'+row.id+'" title="Go To Profile">'+row?.fname+'</a>';
                }else if(row.role_id == 3){
                  return '<a data-vue-route href="/admin-manage-publishers-view/'+row.id+'" title="Go To Profile">'+row?.fname+'</a>';
                }else if(row.role_id == 4){
                  return '<a data-vue-route title="Go To Profile">'+row?.fname+'</a>';
                }else if(row.role_id == 5){
                  return '<a data-vue-route title="Go To Profile">'+row?.fname+'</a>';
                }else if(row.role_id == 6){
                  return '<a data-vue-route title="Go To Profile">'+row?.fname+'</a>';
                }else{
                  return '<a data-vue-route title="Go To Profile">'+row?.fname+'</a>';
                }

              },
            },
            { data: "email" },
            {
              data: "user_location",
              render: function (data, type, row) {
                if(row?.user_location?.country){
                  return row?.user_location?.country;
                }else{
                  return '-----';
                }
              },
            },
            {
              data: "deleted_by",
              render: function (data, type, row) {
                if(row?.deleted_by?.email){
                  return row?.deleted_by?.email;
                }else{
                  return '-----';
                }
              },
            },
            {
              data: "deleted_note",
              render: function (data, type, row) {
                if(row?.deleted_note != null){
                  return '<button type="button" title="Reason for Deletion Note" class="btn btn-info px-2 py-2" data-bs-toggle="modal" data-bs-target="#singleDeleteModal'+row.id+'"><i class="fa-solid fa-eye"></i></button><div class="modal fade" id="singleDeleteModal'+row.id+'" tabindex="-1" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="assignToManager3">Reason for Deletion</h5><button type="button"class="btn-close"data-bs-dismiss="modal"aria-label="Close"></button></div><div class="modal-body">'+row?.deleted_note+'</div></div></div></div>';
                }else{
                  return '-----';
                }
              },
            },
            {
              data: "created_at",
              render: function (data, type, row) {
                if (row.created_at!= null) {
                  return formateDate(row.created_at);
                }
                return '----------';
              },
            },
            {
              data: "deleted_at",
              render: function (data, type, row) {
                if (row.deleted_at!= null) {
                  return formateDate(row.deleted_at);
                }
                return '----------';
              },
            },
            {
                data: "updated_at",
                render: function (data, type, row) {
                   return (
                    '<div class="trans_action"><button title="Restore" type="button" data-action="restore" data-id='+row.id +' class="btn bg-transparent border-0 text-primary"><i data-action="restore" data-id='+row.id +' class="fa-solid fa-arrow-rotate-right"></i></button><button type="button" title="Delete"  data-action="delete" data-id='+row.id +' class="bg-transparent border-0 text-danger"><i data-action="delete" data-id='+row.id +' class="fa-regular fa-trash-can"></i></button></div>'
                  );
                }
              },
          ],
          initComplete: () => { 
            this.attachEventListeners();
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
          order: [[8, 'asc']],
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
            searchPlaceholder: 'Search Offer',
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
                  exportOptions: { columns: [2, 3, 4, 5] }
                },
                {
                  extend: 'csv',
                  text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                  className: 'dropdown-item',
                  exportOptions: { columns: [2, 3, 4, 5] }
                },
                {
                  extend: 'excel',
                  text: '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                  className: 'dropdown-item',
                  exportOptions: { columns: [2, 3, 4, 5] }
                },
                {
                  extend: 'pdf',
                  text: '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                  className: 'dropdown-item',
                  exportOptions: { columns: [2, 3, 4, 5] }
                },
                {
                  extend: 'copy',
                  text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                  className: 'dropdown-item',
                  exportOptions: { columns: [2, 3, 4, 5] }
                }
              ]
            },
          ],
        });
        this.getLoader = false;
        })
        .catch((error) => {
          console.log(error); ;
        })
        .finally(() => {
          this.getLoader = false;
        });
    },
    formatTime(dateString) {
      const date = new Date(dateString);
      return format(date, "dd MMMM yyyy"); 
    },
    attachEventListeners() {
      $("#trashs_datatables").on("click", ".trans_action", (event) => {
        const target = $(event.target);
        const dataId = target.data("id");
        const dataClass = target.data("action");
        if(dataClass === 'restore'){
         this.restoreUser(dataId);
        }else if(dataClass === 'delete'){
          this.delteTranUser(dataId);
        }
      });
    },

attachEventListenersBlulkAction() {
  $('#trashs_datatables').on('change', '.row-checkbox', (event) => {
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
  $('#trashs_datatables thead').on('change', 'input[type="checkbox"]', (event) => {
    const isChecked = event.target.checked;
    $('#trashs_datatables tbody .row-checkbox').each((index, checkbox) => {
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
            this.globalVariables.apiUrl + "admin/manage/user/trash/bulk/delete",
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
              this.getUserTrashs();
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


    restoreUser(id){
          this.getLoader = true;
          axios
            .get(this.globalVariables.apiUrl+`admin/manage/user/restore/${id}`, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((res) => {
              if(res.data.status == 'success'){
                toastr.success(res.data.message);
                this.getUserTrashs();
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
    },
     // User Delete
     delteTranUser(id) {
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
            .get(this.globalVariables.apiUrl+`admin/manage/user/forcedelete/${id}`, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((res) => {
              if(res.data.status == 'success'){
                toastr.success(res.data.message);
                this.getUserTrashs();
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
#trashs_datatables colgroup:nth-of-type(2) {
	display: none !important;
}
#trashs_datatables .dt-checkboxes-cell{
	padding: 0.7rem 0.5rem !important;
}
#trashs_datatables td {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 120px;
}
</style>
