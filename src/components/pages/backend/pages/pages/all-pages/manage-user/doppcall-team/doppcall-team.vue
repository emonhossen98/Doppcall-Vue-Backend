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
          <!-- <div class="card">
            <div class="card-header pb-2">
              <h5 class="card-title mb-1">Invite member</h5>
            </div>
            <div class="card-body">
              <form>
                <div class="row-mb">
                  <div class="form-group">
                    <label for="email" class="required">Email</label>
                    <input type="email" placeholder="Email" class="form-control" v-model="invaiteMember.email" />
                    <div   v-if="validationErrors && validationErrors.message" class="text-danger">
                      {{ validationErrors.message }}
                    </div>
                  </div>
                  <div class="form-group mt-3">
                    <label for="role_name" class="required">Role Name</label>
                    <select  v-model="invaiteMember.role_name" id="role_name" class="form-select">
                      <option value="">Select Role</option>
                      <option v-for="role in doppcallTeam.roles" :value="role.id" :key="role.id" >
                        {{ role.name }}
                      </option>
                    </select>
                    <div v-if="validationErrors && validationErrors.role_name" class="text-danger">
                      {{ validationErrors.role_name[0] }}
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-12 text-end mt-3">
                      <button type="button" class="btn btn-primary btn-sm" @click="invaiteMemberSave()">
                        <i class="fas fa-check fa-sm me-2"></i>
                        Invite
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div> -->
          <div class="card mt-4">
            <div class="card-header pt-3 pb-0">
              <h5 class="card-title ms-2">Invitations</h5>
            </div>
            <div class="card-body px-4 table-responsive table-overflow-hidden">
              <table class="align-middle mb-0 table table-hover" id="invitations_tables">
                <thead>
                  <tr>
                    <!-- <th></th> -->
                    <th></th>
                    <th>Email</th>
                    <th>Expires at</th>
                    <th>Status</th>
                    <th>Operation</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
          <div class="card mt-4">
            <div class="card-header pt-3 pb-0">
              <h5 class="card-title mb-0 ms-2">Manage Doppcall Team </h5>
            </div>
            <div class="card-body px-4 table-responsive table-overflow-hidden" >
              <table class="align-middle mb-0 table table-hover" id="super_admin_datatables">
                <thead>
                  <tr>
                    <!-- <th></th> -->
                    <th></th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Role Name</th>
                    <th>Status</th>
                    <th width="190px">Action</th>
                  </tr>
                </thead>
                <tbody>

                </tbody>
              </table>
            </div>
          </div>
          <!-- <div class="card mt-4">
            <div class="card-header pt-3 pb-0">
              <h5 class="card-title mb-0 ms-2">
                Account Managers
              </h5>
            </div>
            <div class="card-body px-4 table-responsive table-overflow-hidden">
              <table class="align-middle mb-0 table table-hover" id="account_manager_datatables">
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                    <th>Name</th>
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
          </div> -->
        </div>
      </div>
    </div>
    <!-- / Content -->
  </div>

  <div class="modal fade" id="inviteMemberModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel1">Invite Member</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="card-body px-3">
              <form>
                <div class="row-mb">
                  <div class="form-group">
                    <label for="email" class="required">Email</label>
                    <input type="email" placeholder="Email" class="form-control" v-model="invaiteMember.email" />
                    <div  v-if="validationErrors && validationErrors.message" class="text-danger">
                      {{ validationErrors.message }}
                    </div>
                  </div>
                  <div class="form-group mt-3">
                    <label for="role_name" class="required">Role Name</label>
                    <select  v-model="invaiteMember.role_name" id="role_name" class="form-select">
                      <option value="">Select Role</option>
                      <option v-for="role in doppcallTeam.roles" :value="role.id" :key="role.id" >
                        {{ role.secondary_name }}
                      </option>
                    </select>
                    <div v-if="validationErrors && validationErrors.role_name" class="text-danger">
                      {{ validationErrors.role_name[0] }}
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-12 text-end my-3">
                      <button type="button" class="btn btn-primary btn-sm" @click="invaiteMemberSave()">
                        <i class="fas fa-check fa-sm me-2"></i>
                        Invite
                      </button>
                    </div>
                  </div>
                </div>
              </form>
          </div>
        </div>
      </div>
  </div>
  <div class="modal fade" id="permissionModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel1">{{ modalTitle ?? 'Permission Create' }}</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body py-0">
              <div class="row mt-3">
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" v-model="allChecked" @change="toggleAll">
                        <label class="form-check-label">
                          All Check
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-check">
                        <input class="form-check-input" v-model="selectedValues"  type="checkbox" value="1" id="blogcreate">
                        <label class="form-check-label" for="blogcreate">
                          Blog Create
                        </label>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-check">
                        <input class="form-check-input" v-model="selectedValues" type="checkbox" value="2" id="pagecreate">
                        <label class="form-check-label" for="pagecreate">
                          Page Create
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button @click="createPermisstion()" type="button" class="btn btn-primary">
              Permission
            </button>
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
import Loader from "../../../../../include/loader.vue";
import Breadcrumb from "../../../../../include/breadcrumb.vue";
import { inject } from "vue";
import moment from "moment";
import { fetchUserRole } from "@/services/userService";

export default {
  setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
  props: ["doppcallTeam"],
  components: {
    Loader,
    Breadcrumb,
  },
  data() {
    return {
      invaiteMember: {
        email: "",
        role_name: "",
        invited_id : "",
      },
      breadcrumbs: [
        { label: "Dashboard", url: "/dashboard" },
        { label: "Super Admin ", url: "" },
      ],
      getLoader: false,
      validationErrors: null,
      deleteUser : {
        data : "",
      },
      changeStatus:{
        data : "",
        action_type : "",
      },
      selectedValues: [], 
      allChecked: false, 
      checkBoxOptions: ["1", "2"],
      modalTitle : 'Permission Create',
      createUserPermission : {
        user_id : '',
        permisstion : [],
      },
      bulkactionids : {
        selectedIds: [],
      },
      bulkactionadminids : {
        selectedIds: [],
      },
    };
  },
  watch: {
    selectedValues(newValues) {
      this.allChecked = newValues.length === this.checkBoxOptions.length;
    }
  },
  async mounted() { 
    try {
      const { role, isAuthorized } = await fetchUserRole();
      if (role == 'Super' || role == 'Admin') {
        this.getInvitations();
        this.getDoppcallTeams();
        this.getUserData();
        this.$nextTick(() => {
          const dataTableWrapper = document.querySelectorAll('#invitations_tables_wrapper .row.mx-2');
          if (dataTableWrapper.length > 0) {
            dataTableWrapper[0].style.display = 'none';
            dataTableWrapper[1].style.display = 'none';
          }
        });
        this.$nextTick(() => {
          const dataTableWrapper = document.querySelectorAll('#super_admin_datatables_wrapper .row.mx-2');
          if (dataTableWrapper.length > 0) {
            dataTableWrapper[0].style.display = 'none';
            dataTableWrapper[1].style.display = 'none';
          }
        });
        this.$nextTick(() => {
          const dataTableWrapper = document.querySelectorAll('#account_manager_datatables_wrapper .row.mx-2');
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
    getUserData() {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl + "auth/user/data", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          this.invaiteMember.invited_id =  res.data.data.id;
        })
        .catch((error) => {
          return error;
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    invaiteMemberSave() {
      this.getLoader = true;
      axios
        .post(
          this.globalVariables.apiUrl+"admin/invite-member/store",
          this.invaiteMember,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          toastr.success(res.data.message);
          this.invaiteMember.email = "";
          this.invaiteMember.role_name = "";
          this.getInvitations();
          this.callAllNext();
          const modal = document.getElementById("inviteMemberModal");
          const bootstrapModal = bootstrap.Modal.getInstance(modal);
          if (bootstrapModal) {
            bootstrapModal.hide();
          }
        })
        .catch((error) => {
          if (error && error.response && error.response.data) {
            this.validationErrors = error.response.data;
          }
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    getInvitations() {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl+"admin/manage/doppcall-team", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          if ($.fn.DataTable.isDataTable("#invitations_tables")) {
          $('#invitations_tables').DataTable().destroy();
        }
        var formateDate = this.formatDates;
        var table = $('#invitations_tables').DataTable({
          data: res.data.invitations,
          columns: [
            // { data: 'id' },
            { data: null },
            { data: 'email' },
            // { data: 'expires_at' },
            {
              data: "expires_at",
              render: function (data, type, row) {
                return formateDate(row.expires_at);
              },
            },
            {
              data: "status",
              render: function (data, type, row) {
                return `<span class="badge bg-danger">${row.status}</span>`;;
              },
            },
            {
              data: "id",
              render: function (data, type, row) {
                return (
                  '<button type="button" title="Delete" data-id=' +
                  row.id +
                  ' class="invaite-delete-btn border-0 rounded-circle bg-transparent border-0 text-danger"><i  data-id="' +
                  row.id +
                  ' " class="far fa-trash-alt fa-sm"></i></button>'
                );
              },
            },
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
            searchPlaceholder: 'Search Invitations',
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
                extend: "collection",
                className: "btn btn-label-primary dropdown-toggle me-3",
                text: '<i class="ti ti-screen-share me-1 ti-xs"></i>Export',
                buttons: [
                  {
                    extend: "print",
                    text: '<i class="ti ti-printer me-1 ti-xs text-primary"></i>Print',
                    className: "dropdown-item",
                    exportOptions: { columns: [1, 2, 3] },
                  },
                  {
                    extend: "csv",
                    text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                    className: "dropdown-item",
                    exportOptions: { columns: [1, 2, 3] },
                  },
                  {
                    extend: "excel",
                    text:
                      '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                    className: "dropdown-item",
                    exportOptions: { columns: [1, 2, 3] },
                  },
                  {
                    extend: "pdf",
                    text:
                      '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                    className: "dropdown-item",
                    exportOptions: { columns: [1, 2, 3] },
                  },
                  {
                    extend: "copy",
                    text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                    className: "dropdown-item",
                    exportOptions: { columns: [1, 2, 3] },
                  },
                ],
              },
              {
                text:
                  '<span><i class="ti ti-plus me-1 ti-xs"></i>Add Invite Member</span>',
                className: "btn btn-primary",
                action: function () {
                  const modalElement = document.getElementById("inviteMemberModal");
                  const modalInstance = new bootstrap.Modal(modalElement);
                  modalInstance.show();
                },
              },
          ],
        });
        this.getLoader = false;
        })
        .catch((e) => {
          return e;
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    attachEventListenersBlulkAction() {
      $('#invitations_tables').on('change', '.row-checkbox', (event) => {
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
      $('#invitations_tables thead').on('change', 'input[type="checkbox"]', (event) => {
        const isChecked = event.target.checked;
        $('#invitations_tables tbody .row-checkbox').each((index, checkbox) => {
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
                this.globalVariables.apiUrl + "admin/manage/doppcall-team/bulk/delete",
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
                  this.getInvitations();
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

    formatDates(date) {
      return moment(date).format('D MMMM YYYY');
    },

    attachEventListeners() {
      $("#invitations_tables").on("click", ".invaite-delete-btn", (event) => {
        const target = $(event.target);
        const dataId = target.data("id");
        Swal.fire({
          text: "Are you sure delete",
          icon: "info",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "Cancel",
        }).then((result) => {
          if (result.value) {
            (this.getLoader = true),
              axios
                .delete(
                  this.globalVariables.apiUrl+"admin/invitations/delete/"+dataId,{
                    headers: {
                      Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                  }
                )
                .then((res) => {
                  toastr.success(res.data.message);
                  this.getInvitations();
                })
                .catch((e) => {
                  return e;
                })
                .finally(() => {
                  this.getLoader = false;
                });
          }
        });
      });
    },

    callAllNext(){
      this.$nextTick(() => {
      const dataTableWrapper = document.querySelectorAll('#invitations_tables_wrapper .row.mx-2');
      if (dataTableWrapper.length > 0) {
        dataTableWrapper[0].style.display = 'none';
        dataTableWrapper[1].style.display = 'none';
      }
    });
    this.$nextTick(() => {
      const dataTableWrapper = document.querySelectorAll('#super_admin_datatables_wrapper .row.mx-2');
      if (dataTableWrapper.length > 0) {
        dataTableWrapper[0].style.display = 'none';
        dataTableWrapper[1].style.display = 'none';
      }
    });
    this.$nextTick(() => {
      const dataTableWrapper = document.querySelectorAll('#account_manager_datatables_wrapper .row.mx-2');
      if (dataTableWrapper.length > 0) {
        dataTableWrapper[0].style.display = 'none';
        dataTableWrapper[1].style.display = 'none';
      }
    });
    },

    getDoppcallTeams() {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl+"admin/manage/super-admin/get-data", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          if ($.fn.DataTable.isDataTable("#super_admin_datatables")) {
            $('#super_admin_datatables').DataTable().destroy();
          }
        var table = $('#super_admin_datatables').DataTable({
          data: res.data,
          columns: [
            // { data: 'id' },
            { data: null},
            { data: "full_name" },
            { data: "email" },
            {
                data: "phone_no",
                render: function (data, type, row) {
                  if (row.phone_no != null) {
                    return row.phone_no;
                  }
                  return "--------";
                },
            },
            {
              data: "secondary_name",
              render: function (data, type, row) {
                return `<span class="badge bg-success">${row.role.secondary_name}</span>`;
              },
            },
            { data: "convart_status" },
            { data: "convart_action" },
          ],
          initComplete: () => { 
            this.attachEventDoppCallTeam();
            this.attachEventListenersDoppCallTeamBlulkAction();
            this.attachEventListenersDoppCallTeamBlulkActionSubmit();
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
            searchPlaceholder: 'Search Manage Doppcall Team',
            paginate: { 
              previous: '<i class="fa-solid fa-chevron-left"></i>',
              next: '<i class="fa-solid fa-chevron-right"></i>'
            }
          },
          buttons: [
              {
                text: `
                  <div id="bulk-action-wrapper">
                    <select id="bulk-action-select-second" class="form-select form-select-sm">
                      <option value=""> ✓ Bulk Actions</option>
                      <option value="delete">Bulk Delete</option>
                      <option value="0">Bulk Pending</option>
                      <option value="1">Bulk Approved</option>
                      <option value="2">Bulk Suspend</option>
                      <option value="3">Bulk Unsuspend</option>
                      <option value="4">Bulk Pause</option>
                      <option value="5">Bulk Resume</option>
                    </select>
                  </div>
                `,
                className: "me-2 p-0 btn-primary d-none",
                attr: { id: "bulk-action-container-second" },
              },
              {
                extend: "collection",
                className: "btn btn-label-primary dropdown-toggle me-3",
                text: '<i class="ti ti-screen-share me-1 ti-xs"></i>Export',
                buttons: [
                  {
                    extend: "print",
                    text: '<i class="ti ti-printer me-1 ti-xs text-primary"></i>Print',
                    className: "dropdown-item",
                    exportOptions: { columns: [1, 2, 3, 4] },
                  },
                  {
                    extend: "csv",
                    text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                    className: "dropdown-item",
                    exportOptions: { columns: [1, 2, 3, 4] },
                  },
                  {
                    extend: "excel",
                    text:
                      '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                    className: "dropdown-item",
                    exportOptions: { columns: [1, 2, 3, 4] },
                  },
                  {
                    extend: "pdf",
                    text:
                      '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                    className: "dropdown-item",
                    exportOptions: { columns: [1, 2, 3, 4] },
                  },
                  {
                    extend: "copy",
                    text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                    className: "dropdown-item",
                    exportOptions: { columns: [1, 2, 3, 4] },
                  },
                ],
              },
          ],
        });
        this.getLoader = false;
        })
        .catch((e) => {
          return e;
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    attachEventListenersDoppCallTeamBlulkAction() {
      $('#super_admin_datatables').on('change', '.row-checkbox', (event) => {
        const id = parseInt(event.target.dataset.id);
        if (event.target.checked) {
          if (!this.bulkactionadminids.selectedIds.includes(id)) {
            this.bulkactionadminids.selectedIds.push(id);
          }
        } else {
          this.bulkactionadminids.selectedIds = this.bulkactionadminids.selectedIds.filter(item => item !== id);
        }

        this.toggleBulkActionAdminVisibility();
      });
      $('#super_admin_datatables thead').on('change', 'input[type="checkbox"]', (event) => {
        const isChecked = event.target.checked;
        $('#super_admin_datatables tbody .row-checkbox').each((index, checkbox) => {
          checkbox.checked = isChecked;
          const id = parseInt(checkbox.dataset.id);

          if (isChecked) {
            if (!this.bulkactionadminids.selectedIds.includes(id)) {
              this.bulkactionadminids.selectedIds.push(id);
            }
          } else {
            this.bulkactionadminids.selectedIds = [];
          }
        });

        this.toggleBulkActionAdminVisibility();
      });
    },

    attachEventListenersDoppCallTeamBlulkActionSubmit() {
      $('#bulk-action-select-second').off().on('change', (e) => {
        const action = e.target.value;
        if (!action || this.bulkactionadminids.selectedIds.length === 0) {
          return;
        }
        
        if (action === 'delete') {
          this.bulkAdminDelete();
        } else {
          if (action === "1") {
            this.bulkactionadminids.status = '1';
            const alertTitle = "Offer Want to Approved";
            this.bulkAdminStatusChange(alertTitle);
          } else if (action === "0") {
            this.bulkactionadminids.status = '0';
            const alertTitle = "Offer Want to Pending";
            this.bulkAdminStatusChange(alertTitle);
          } else if (action === "3") {
            this.bulkactionadminids.status = '3';
            const alertTitle = "Offer Want to Resume";
            this.bulkAdminStatusChange(alertTitle);
          } else if (action === "2") {
            this.bulkactionadminids.status = '2';
            const alertTitle = "Offer Want to Pause";
            this.bulkAdminStatusChange(alertTitle);
          }else{
            this.bulkactionadminids.status = '4';
            const alertTitle = "Offer Want to Reject";
            this.bulkAdminStatusChange(alertTitle);
          }
        }
        $('#bulk-action-select-second').val('');
      });
    },

    toggleBulkActionAdminVisibility() {
      const bulkActionWrapperSecond = $('#bulk-action-container-second');
      if (this.bulkactionadminids.selectedIds.length > 0) {
        bulkActionWrapperSecond?.removeClass('d-none');
      } else {
        bulkActionWrapperSecond?.addClass('d-none');
      }
    },

    bulkAdminDelete() {
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
                this.globalVariables.apiUrl + "admin/offers/bulk/delete",
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
                  this.getDoppcallTeams();
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

    bulkAdminStatusChange(alertTitle) {
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
                this.globalVariables.apiUrl + "admin/offers/status/bulk",
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
                  this.getDoppcallTeams();
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

    // actions (){
    //   <template></template>
    // },

    attachEventDoppCallTeam() {
      $("#super_admin_datatables").on("click", ".super-admin-action", (event) => {
        const target = $(event.target);
        const dataId = target.data("id");
        const dataClass = target.data('action');
        this.deleteUser.data = dataId;
        if(dataClass === 'edit-btn'){
          this.$router.push('/admin-manage-publishers-edit/'+dataId);
        }else if(dataClass === 'delete-btn'){
          Swal.fire({
            text: "Are you sure delete",
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
          }).then((result) => {
            if (result.value) {
              (this.getLoader = true),
                axios
                  .post(
                    this.globalVariables.apiUrl+"admin/manage/user/delete",this.deleteUser,{
                      headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                      },
                    }
                  )
                  .then((res) => {
                    if(res.data.status == 'success'){
                      toastr.success(res.data.message);
                      this.getDoppcallTeams();
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
        }else if(dataClass === 'pause-btn'){
          this.changeStatus.data = dataId;
          this.changeStatus.action_type = 'pause';
          const alertTitle = 'Want to Push';
          this.ActionMethod(alertTitle);

        }else if(dataClass === 'resume-btn'){
          this.changeStatus.data = dataId;
          this.changeStatus.action_type = 'resume';
          const alertTitle = 'Want to Resume';
          this.ActionMethod(alertTitle);

        }else if(dataClass === 'approved-btn'){
          this.changeStatus.data = dataId;
          this.changeStatus.action_type = 'approved';
          const alertTitle = 'Want to Approved';
          this.ActionMethod(alertTitle);

        }else if(dataClass === 'pending-btn'){
          this.changeStatus.data = dataId;
          this.changeStatus.action_type = 'pending';
          const alertTitle = 'Want to Pending';
          this.ActionMethod(alertTitle);

        }else if(dataClass === 'suspend-btn'){
          this.changeStatus.data = dataId;
          this.changeStatus.action_type = 'suspend';
          const alertTitle = 'Want to Suspend';
          this.ActionMethod(alertTitle);

        }else if(dataClass === 'unsuspend-btn'){
          this.changeStatus.data = dataId;
          this.changeStatus.action_type = 'unsuspend';
          const alertTitle = 'Want to Unsuspend';
          this.ActionMethod(alertTitle);

        }else if(dataClass === 'permission-create-model'){
          this.createUserPermission.user_id = dataId;
        }else if(dataClass === 'permission-edit-model'){
          this.createUserPermission.user_id = dataId;
          this.modalTitle = 'Permission Edit';
          axios
            .get(this.globalVariables.apiUrl+"admin/manage/user-permission/"+dataId, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((res) => {
              if(res.data.status == 'success'){
                this.selectedValues = res && res.data && res.data.user;
              }
            })
            .catch((e) => {
              return e;
            })
        }
      });
    },

    // getAccountManagers() {
    //   this.getLoader = true;
    //   axios
    //     .get(this.globalVariables.apiUrl+"admin/manage/account-manager/get-data", {
    //       headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    //     })
    //     .then((res) => {
    //       if ($.fn.DataTable.isDataTable("#account_manager_datatables")) {
    //       $('#account_manager_datatables').DataTable().destroy();
    //     }
    //     var table = $('#account_manager_datatables').DataTable({
    //       data: res.data,
    //       columns: [
    //         // { data: 'id' },
    //         { data: null},
    //         { data: "full_name" },
    //         { data: "email" },
    //         { data: "phone_no" },
    //         { data: "convart_status" },
    //         { data: "convart_action" },
    //       ],
    //       initComplete: () => { 
    //         this.attachEventAccountManager();
    //         this.attachEventListenersOfButton();
    //       },
    //       createdRow: function (row, data, dataIndex) {
    //           $("td:eq(0)", row).html(dataIndex + 1);
    //         },
    //       columnDefs: [
    //         {
    //           targets: 0,
    //           orderable: false,
    //           checkboxes: {
    //             selectAllRender: '<input type="checkbox" class="form-check-input">'
    //           },
    //           render: function () {
    //             return '<input type="checkbox" class="dt-checkboxes form-check-input" >';
    //           },
    //           searchable: false
    //         },
    //       ],
    //       order: [[2, 'desc']],
    //       dom: '<"row mx-2"' +
    //         '<"col-md-4 px-0"f>' + 
    //         '<"col-md-8 dopp_tb d-flex justify-content-end align-items-center"l<"button-wrapper"B>>' + 
    //         '<"col-md-3 d-none"p>>' +
    //         't' + 
    //         '<"row mx-2"' +
    //         '<"col-md-5"i>' + 
    //         '<"col-md-7"p>>', 
    //       displayLength: 10, 
    //       lengthMenu: [10, 20, 50, 100, 200], 
    //       language: {
    //         sLengthMenu: '_MENU_',
    //         search: '', 
    //         searchPlaceholder: 'Search Account Managers',
    //         paginate: { 
    //           previous: '<i class="fa-solid fa-chevron-left"></i>',
    //           next: '<i class="fa-solid fa-chevron-right"></i>'
    //         }
    //       },
    //       buttons: [
    //         {
    //           text: '<span id="create"><i class="ti ti-plus me-1 ti-xs"></i>Create</span>',
    //           className: 'create-new btn btn-primary',
    //           attr: { id: 'create' },
    //         }
    //       ],
    //     });
    //     this.getLoader = false;
    //     })
    //     .catch((e) => {
    //       return e;
    //     })
    //     .finally(() => {
    //       this.getLoader = false;
    //     });
    // },

    attachEventAccountManager() {
      $("#account_manager_datatables").on("click", ".dropdown-item", (event) => {
        const target = $(event.target);
        const dataId = target.data("id");
        const dataClass = target.attr('class');
        this.deleteUser.data = dataId;
        if(dataClass === 'dropdown-item edit-btn'){
          this.$router.push('/admin-manage-publishers-edit/'+dataId);
        }else if(dataClass === 'dropdown-item delete-btn'){
          Swal.fire({
            text: "Are you sure delete",
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
          }).then((result) => {
            if (result.value) {
              (this.getLoader = true),
                axios
                  .post(
                    this.globalVariables.apiUrl+"admin/manage/user/delete",this.deleteUser,{
                      headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                      },
                    }
                  )
                  .then((res) => {
                    if(res.data.status == 'success'){
                      toastr.success(res.data.message);
                      // this.getAccountManagers();
                      this.callAllNext();
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
        }else if(dataClass === 'dropdown-item pause-btn'){
          this.changeStatus.data = dataId;
          this.changeStatus.action_type = 'pause';
          const alertTitle = 'Want to Push';
          this.ActionMethod(alertTitle);

        }else if(dataClass === 'dropdown-item resume-btn'){
          this.changeStatus.data = dataId;
          this.changeStatus.action_type = 'resume';
          const alertTitle = 'Want to Resume';
          this.ActionMethod(alertTitle);

        }else if(dataClass === 'dropdown-item approved-btn'){
          this.changeStatus.data = dataId;
          this.changeStatus.action_type = 'approved';
          const alertTitle = 'Want to Approved';
          this.ActionMethod(alertTitle);

        }else if(dataClass === 'dropdown-item pending-btn'){
          this.changeStatus.data = dataId;
          this.changeStatus.action_type = 'pending';
          const alertTitle = 'Want to Pending';
          this.ActionMethod(alertTitle);

        }else if(dataClass === 'dropdown-item suspend-btn'){
          this.changeStatus.data = dataId;
          this.changeStatus.action_type = 'suspend';
          const alertTitle = 'Want to Suspend';
          this.ActionMethod(alertTitle);

        }else if(dataClass === 'dropdown-item unsuspend-btn'){
          this.changeStatus.data = dataId;
          this.changeStatus.action_type = 'unsuspend';
          const alertTitle = 'Want to Unsuspend';
          this.ActionMethod(alertTitle);

        }
      });
    },

    attachEventListenersOfButton(){
      $("#account_manager_datatables_wrapper").on("click", "button", (event) => {
        const target = $(event.target);
        const dataClass = target.attr("id");
        if (dataClass === "create") {
          this.$router.push("/manage/account/manager/create");
        } 
      });
    },

    ActionMethod(alertTitle){
      Swal.fire({
        text: alertTitle,
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.value) {
          this.getLoader = true,
          axios
            .post(this.globalVariables.apiUrl+"admin/manage/user/account-access", this.changeStatus, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((res) => {
              if(res.data.status == 'success'){
                toastr.success(res.data.message);
                this.getDoppcallTeams();
                // this.getAccountManagers();
                this.callAllNext();
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
    },

    toggleAll() {
      if (this.allChecked) {
        this.selectedValues = [...this.checkBoxOptions]; 
      } else {
        this.selectedValues = []; 
      }
    },

    createPermisstion(){
      this.createUserPermission.permisstion = this.selectedValues;
      if(this.selectedValues != null && this.selectedValues != ''){
        this.getLoader = true;
        axios
            .post(this.globalVariables.apiUrl+"admin/manage/user-permissions", this.createUserPermission, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((res) => {
              if(res.data.status == 'success'){
                toastr.success(res.data.message);
                this.getDoppcallTeams();
                // this.getAccountManagers();
                this.callAllNext();
                this.selectedValues = [];
                const modal = document.getElementById("permissionModal");
                const bootstrapModal = bootstrap.Modal.getInstance(modal);
                if (bootstrapModal) {
                  bootstrapModal.hide();
                }
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
      }else{
        toastr.warning('Select any permisstion');
      }
    },
  },
};
</script>
<style>

#invitations_tables colgroup:nth-of-type(2) {
	display: none !important;
}

#super_admin_datatables colgroup:nth-of-type(2) {
	display: none !important;
}

#account_manager_datatables colgroup:nth-of-type(2) {
	display: none !important;
}
#invitations_tables .dt-checkboxes-cell{
	padding: 0.7rem 0.5rem !important;
}
#super_admin_datatables .dt-checkboxes-cell{
	padding: 0.7rem 0.5rem !important;
}
#account_manager_datatables .dt-checkboxes-cell{
	padding: 0.7rem 0.5rem !important;
}
  .dropdown-item {
	align-items: center;
}
#dropdownMenuButton {
	background: transparent;
}
</style>
