<template>
  <div v-if="getLoader">
    <Loader></Loader>
  </div>
  <!-- Content wrapper -->
  <div class="content-wrapper">
    <!-- {{ jobcareers }} -->
    <!-- Content -->
    <div class="container-fluid flex-grow-1 container-p-y">
      <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
      <div class="row mt-4">
        <div class="col-md-12 mb-sm-0 mb-3">
          <div class="card">
            <div class="custom-card-header pb-0">
              <h5 class="card-title d-flex justify-content-between align-items-center mb-0 px-3 pt-3 ms-2">
                Job Career
              </h5>
            </div>
            <div class="card-body table-responsive pt-0 table-overflow-hidden">
              <table class="align-middle mb-0 table table-hover" id="job_careers_tables">
                <thead>
                  <!-- <th></th> -->
                  <th></th>
                  <!-- <th>Sl</th> -->
                  <th>Company Name</th>
                  <th>Company Logo</th>
                  <th>Company Phone</th>
                  <th>Company Email</th>
                  <th>Salary</th>
                  <th>Status</th>
                  <th>Action</th>
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
import "toastr/build/toastr.min.css";
import Swal from "sweetalert2";
import Loader from "../../../../../include/loader.vue";
import Breadcrumb from "../../../../../include/breadcrumb.vue";
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
      getLoader: false,
      breadcrumbs: [
        { label: "Dashboard", url: "/dashboard" },
        { label: "Job Career", url: "" },
      ],
      statusData: {
        id: "",
        status: "",
      },
      bulkactionids : {
        selectedIds: [],
        status: "",
      },
    };
  },
  async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role == 'Super' || role == 'Admin') {
          this.getLoader = true;
          this.getJobCareers();
          this.$nextTick(() => {
            const dataTableWrapper = document.querySelectorAll('#job_careers_tables_wrapper .row.mx-2');
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
    getJobCareers() {
      axios
        .get(this.globalVariables.apiUrl+"admin/career/jobcareer", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          var doaminName = this.globalVariables.appUrl;
          
          if ($.fn.DataTable.isDataTable("#job_careers_tables")) {
            $('#job_careers_tables').DataTable().destroy();
          }
          var table = $('#job_careers_tables').DataTable({
            data: res.data,
            columns: [
              // { data: 'id' },
              { data: 'id' },
              { data: 'company_name' },
              {
                data: 'company_logo',
                render: function (data, type, row) {
                  return (
                    '<img class="company_image" src="' +doaminName+
                    data +
                    '">'
                  );
                }
              },
              { data: 'company_phone' },
              { data: 'company_email' },
              { data: 'salary_range' },
              { data: 'convart_status' },
              { data: '' }
            ],

            initComplete: () => { // Using an arrow function here
              this.attachEventListeners();
              this.ListenersOfCheckbox();
              this.attachEventListenersOfButton();
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
                  return '<div class="text-end type-datatables-action"><a title="Edit"  data-vue-route href="/admin-career-jobcareer-edit/'+full.id+'" class="rounded-circle bg-transparent border-0 text-primary"><i class="far fa-edit fa-sm me-2"></i></a><button type="button" title="Delete"  data-id=' +
                    full.id +
                    ' class="type-delete-btn border-0 rounded-circle bg-transparent border-0 text-danger"><i  data-id="' +
                    full.id +
                    ' " class="far fa-trash-alt fa-sm"></i></button></div>'; 
                }
              }
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
              searchPlaceholder: 'Search Career',
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
                      <option value="0">Bulk Pending</option>
                      <option value="1">Bulk Active</option>
                    </select>
                  </div>
                `,
                className: "me-2 p-0 btn-primary d-none",
                attr: { id: "bulk-action-container" },
              },
              {
                text: '<span id="create"><i class="ti ti-plus me-1 ti-xs"></i>Create</span>',
                className: 'create-new btn btn-primary',
                attr: { id: 'create' },
              }
            ],
          });

           this.getLoader = false;
        })
        .catch((error) => {
          return error;
        })
        .finally(() => {
          this.getLoader = false;
        });
    },


    attachEventListenersBlulkAction() {
      $('#job_careers_tables').on('change', '.row-checkbox', (event) => {
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
      $('#job_careers_tables thead').on('change', 'input[type="checkbox"]', (event) => {
        const isChecked = event.target.checked;
        $('#job_careers_tables tbody .row-checkbox').each((index, checkbox) => {
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
            const alertTitle = "Job Career Want to Approved";
            this.bulkStatusChange(alertTitle);
          } else{
            this.bulkactionids.status = '0';
            const alertTitle = "Job Career Want to Pending";
            this.bulkStatusChange(alertTitle);
          }
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
                this.globalVariables.apiUrl + "admin/jobcareer/bulk/delete",
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
                  this.getJobCareers();
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
                this.globalVariables.apiUrl + "admin/jobcareer/bulk/status",
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
                  this.getJobCareers();
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
      $("#job_careers_tables").on("click", ".type-datatables-action", (event) => {
        const target = $(event.target);
        const dataId = target.data("id");
        const dataClass = target.attr("class");

        if (
          dataClass === "type-delete-btn border-0 rounded-circle btn-style-danger" ||
          dataClass === "far fa-trash-alt fa-sm"
        ) {
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
                    this.globalVariables.apiUrl+`admin/career/jobcareer/delete/${dataId}`,
                    {
                      headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                      },
                    }
                  )
                  .then((res) => {
                    toastr.success(res.data.message);
                    this.getJobCareers();
                  })
                  .catch((e) => {
                    return e;
                  })
                  .finally(() => {
                    this.getLoader = false;
                  });
            }
          });
        }
      });
    },

    ListenersOfCheckbox() {
      $("#job_careers_tables").on("click", ".status-change-btn", (event) => {
        const target = $(event.target);
        this.statusData.id = target.data("id");
        this.statusData.status = target.is(":checked") ? "1" : "2";
        this.getLoader = true;
        axios
          .post(this.globalVariables.apiUrl+`admin/career/status`, this.statusData, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
            this.getJobCareers();
            toastr.success(res.data.message);
            return;
          })
          .catch((e) => {
            return e;
          })
          .finally(() => {
            this.getLoader = false;
          });
      });
    },

    attachEventListenersOfButton(){
      $("#job_careers_tables_wrapper").on("click", "button", (event) => {
        const target = $(event.target);
        const dataClass = target.attr("id");
        if (dataClass === "create") {
          this.$router.push("/admin-career-jobcareer-create");
        } 
      });
    },
  },
};
</script>
<style>
#job_careers_tables colgroup:nth-of-type(2) {
	display: none !important;
}
#job_careers_tables .dt-checkboxes-cell{
	padding: 0.7rem 0.5rem !important;
}
.company_image {
  width: 40px !important;
}
</style>



