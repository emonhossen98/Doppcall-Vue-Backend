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
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header pb-2">
                        <h5 class="card-title mb-0">Invite member</h5>
                    </div>
                    <div class="card-body">
                        <form class="mt-1">
                            <div class="row-mb">
                                <div class="form-group">
                                  <label for="email" class="required mb-0">Email</label>
                                  <input type="email" v-model="invaiteMemberCreate.email" id="email" class="form-control" required placeholder="Enter Email">
                                  <div v-if="validationErrors && validationErrors.email" class="text-danger">
                                    {{ validationErrors.email[0] }}
                                  </div>
                                </div>
                                <div class="form-group mt-3">
                                    <label for="role_name" class="required mb-0">Role Name</label>
                                    <select v-model="invaiteMemberCreate.role_name" id="role_name" class="form-select">
                                        <option value="">Select Role</option>
                                        <option v-for="role in InviteMember.roles" :value="role.id" :key="role.id">
                                        {{ role.secondary_name }}
                                        </option>
                                    </select>
                                    <div v-if="validationErrors && validationErrors.role_name" class="text-danger">
                                    {{ validationErrors.role_name[0] }}
                                  </div>
                                </div>
                                
                                <div class="row">
                                    <div class="col-12 text-end mt-3">
                                        <button type="button" @click="invaiteMemberSave()" class="btn btn-primary btn-sm">
                                            <i class="fas fa-check fa-sm me-1"></i>
                                                Invite
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
                <div class="card mt-4">
                  <div class="card-header pt-3">
                        <h5 class="card-title mb-0 mt-2">
                          Invitations
                        </h5>
                    </div>
                    <div class="card-body">
                        <table class="align-middle mb-0 table table-hover" id="invations_table">
                            <thead>
                            <tr>
                              <!-- <th></th> -->
                              <th></th>
                              <th>SL</th>
                              <th>Email</th>
                              <th>Expires at</th>
                              <th>Status</th>
                              <th>Created At</th>
                              <th id="action-incompleted">Operation</th>
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
import "jquery-validation";
import axios from "axios";
import toastr from "toastr";
import Swal from "sweetalert2";
import "toastr/build/toastr.min.css";
import Loader from "../../../../../include/loader.vue";
import Breadcrumb from "../../../../../include/breadcrumb.vue";
import { inject } from "vue";
import { fetchUserRole } from "@/services/userService";
import moment from "moment";

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
        { label: "Invite Members ", url: "" },
      ],
      getLoader: false,
      invaiteMemberCreate: {
        email : "",
        role_name : "",
      },
      InviteMember : "",
      validationErrors : null,
      bulkactionids : {
        selectedIds: [],
      },
    };
  },
  async mounted() { 
    try {
      const { role, isAuthorized } = await fetchUserRole();
      if (role == 'Super' || role == 'Admin') {
        this.getInviteMemberData();
        this.$nextTick(() => {
          const dataTableWrapper = document.querySelectorAll('#invations_table_wrapper .row.mx-2');
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
    getInviteMemberData() {
      this.getLoader = true;
        axios.get(this.globalVariables.apiUrl+'admin/invite-member', 
        { headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}})
        .then((res) => {
          this.InviteMember = res.data
          if ($.fn.DataTable.isDataTable("#invations_table")) {
          $('#invations_table').DataTable().destroy();
        }
        var formateDate = this.formatDates;
        var table = $('#invations_table').DataTable({
          data: res.data.invitations,
          columns: [
            // { data: 'id' },
            { data: 'id' },
            { data: 'id' },
            { data: 'email',
              render: function (data, type, row) {
                  if (row?.email != null) {
                    return '<span title="'+row?.email+'">'+row?.email+'</span>';
                  }
                  return '----------';
                },
             },
            { data: 'expires_at',
              render: function (data, type, row) {
                  if (row?.expires_at != null) {
                    return '<span title="'+row?.expires_at+'">'+row?.expires_at+'</span>';
                  }
                  return '----------';
                },
             },
            { data: 'status' },
            {
                data: "created_at",
                render: function (data, type, row) {
                  if (row.created_at != null) {
                    return formateDate(row.created_at);
                  }
                  return "--------";
                },
              },
            { data: 'updated_at',
                render: function (data, type, row) {
                   return (
                    '<button title="Delete" type="button"  data-id=' +
                    row.id +
                    ' class="invaite-delete-btn border-0 rounded-circle bg-transparent border-0 text-danger"><i  data-id="' +
                    row.id +
                    ' " class="far fa-trash-alt fa-sm"></i></button>'
                  );
                } 
              }
            
          ],
          initComplete: () => { 
            $('#invations_table').wrap('<div class="commonDataTablesClass"></div>');
            const table = $("#invations_table").DataTable();
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
            searchPlaceholder: 'Search Invite Member',
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
              className: "btn btn-primary",
              text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">SL</a></li><li><a class="dropdown-item" href="#" data-column="2">Email</a></li><li><a class="dropdown-item" href="#" data-column="3">Expires at</a></li><li><a class="dropdown-item" href="#" data-column="4">Status</a></li><li><a class="dropdown-item" href="#" data-column="5">Created At</a></li><li><a class="dropdown-item" href="#" data-column="6">Operation</a></li></div></ul></div>',
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

    formatDates(date) {
      return moment(date).format('D MMMM YYYY');
    },
    attachEventListenersBlulkAction() {
      $('#invations_table').on('change', '.row-checkbox', (event) => {
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
      $('#invations_table thead').on('change', 'input[type="checkbox"]', (event) => {
        const isChecked = event.target.checked;
        $('#invations_table tbody .row-checkbox').each((index, checkbox) => {
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
                this.globalVariables.apiUrl + "admin/invitations/bulk/delete",
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
                  this.getInviteMemberData();
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
      $("#invations_table").on("click", ".invaite-delete-btn", (event) => {
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
                  this.getInviteMemberData();
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

    invaiteMemberSave() {
      this.getLoader = true;
      axios
        .post(this.globalVariables.apiUrl+"admin/invite-member/store", this.invaiteMemberCreate, {
          headers: { 
            Authorization: "Bearer " + localStorage.getItem("token")
         },
        })
        .then((res) => {
          this.getInviteMemberData();
          this.invaiteMemberCreate.email = '';
          this.invaiteMemberCreate.role_name = '';
          toastr.success(res.data.message);
        })
        .catch((error) => {
          if(error && error.response && error.response.data && error.response.data.errors){
            this.validationErrors = error.response.data.errors;
          }
        })
        .finally(() => {
          this.getLoader = false;
        });
    },
  },
};

</script>
<style>
#invations_table colgroup:nth-of-type(2) {
	display: none !important;
}
#invations_table .dt-checkboxes-cell{
	padding: 0.7rem 0.5rem !important;
}
</style>