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
                    <h5 class="mt-2 card-title mb-0">
                        Index How To Work 
                    </h5>
                </div>
                <div class="card-body table-responsive table-overflow-hidden">
                    <table class="align-middle mb-0 table table-hover" id="how_to_work_tables">
                        <thead>
                            <tr>
                              <!-- <th></th> -->
                              <th></th>
                              <th>SL</th>
                              <th>Image</th>
                              <th>Title</th>
                              <th>Sub Title</th>
                              <th>Created At</th>
                              <th>Operation</th>
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
      breadcrumbs: [
        { label: "Dashboard", url: "/dashboard" },
        { label: "Appearance", url: "" },
        { label: "How To Work", url: "" },
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
          this.gethowToWorkData();
          this.$nextTick(() => {
            const dataTableWrapper = document.querySelectorAll('#how_to_work_tables_wrapper .row.mx-2');
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
    gethowToWorkData() {
      this.getLoader = true;
        axios.get(this.globalVariables.apiUrl+'admin/appearance/howtowork', { headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}})
        .then((res) => {
          if ($.fn.DataTable.isDataTable("#how_to_work_tables")) {
          $('#how_to_work_tables').DataTable().destroy();
        }
            var table = $('#how_to_work_tables').DataTable({
              data: res.data.getDatas,
              columns: [
                // { data: 'id' },
                { data: 'id' },
                { data: 'id' },
                { data: 'convart_image' },
                // { data: 'title' },
                {
                  data: "title",
                  render: function (data, type, row) {
                    if (row.title != null) {
                      return row.title.length > 15 
                        ? row.title.slice(0, 15) + '...'  
                        : row.title; 
                    }
                    return '----------';
                  },
                },
                {
                  data: "short_title",
                  render: function (data, type, row) {
                    if (row.short_title != null) {
                      return row.short_title.length > 15 
                        ? row.short_title.slice(0, 15) + '...'  
                        : row.short_title; 
                    }
                    return '----------';
                  },
                },
                // { data: 'short_title' },
                { data: 'convart_created_at' },
                {
                  data: null, 
                  title: 'Actions',
                  searchable: false,
                  orderable: false,
                  render: function (data, type, full, meta) {
                    return '<div class="how_to_work_action d-flex align-items-center"><a data-vue-route title="Edit" href="/admin-appearance-howtowork-edit/'+full.id+'" class="bg-transparent border-0 text-primary me-2"><i class="far fa-edit fa-sm"></i></a><button type="button" id="delete-btn" title="Delete"  data-id='+full.id +' class="bg-transparent border-0 text-danger"><i class="far fa-trash-alt fa-sm" id="delete-btn" data-id='+full.id +'></i></button></div>';
                  }
                }
              ],
              initComplete: () => { 
                this.attachEventListeners();
                this.attachEventListenersOfButton();
                this.attachEventListenersBlulkAction();
                this.attachEventListenersBlulkActionSubmit();
              },
              createdRow: function (row, data, dataIndex) {
                $("td:eq(1)", row).html(dataIndex + 1);
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
              order: [[1, 'desc']],
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
                searchPlaceholder: 'Search How To Work',
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
          console.log(error);
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    attachEventListenersBlulkAction() {
      $('#how_to_work_tables').on('change', '.row-checkbox', (event) => {
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
      $('#how_to_work_tables thead').on('change', 'input[type="checkbox"]', (event) => {
        const isChecked = event.target.checked;
        $('#how_to_work_tables tbody .row-checkbox').each((index, checkbox) => {
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
                this.globalVariables.apiUrl + "admin/appearance/howtowork/bulk/delete",
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
                  this.gethowToWorkData();
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
      $("#how_to_work_tables").on("click", ".how_to_work_action", (event) => {
        const target = $(event.target);
        const dataId = target.data("id");
        const dataClass = target.attr("id");
        if(dataClass === 'delete-btn'){
          this.delteLeadMethod(dataId);
        }
      });
    },

    attachEventListenersOfButton(){
      $("#how_to_work_tables_wrapper").on("click", "button", (event) => {
        const target = $(event.target);
        const dataClass = target.attr("id");
        if (dataClass === "create") {
          this.$router.push("/admin-appearance-howtowork-create");
        } 
      });
    },

     // Lead Method Delete
     delteLeadMethod(id) {
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
            .get(this.globalVariables.apiUrl+`admin/appearance/howtowork/delete/${id}`, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((res) => {
                toastr.success(res.data.message);
                this.gethowToWorkData();
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
}
</script>
<style>
#how_to_work_tables colgroup:nth-of-type(2) {
	display: none !important;
}
#how_to_work_tables .dt-checkboxes-cell{
	padding: 0.7rem 0.5rem !important;
}
</style>