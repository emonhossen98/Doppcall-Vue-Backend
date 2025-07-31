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
                  Blocked Ip
                </h5>
              </div>
              <div class="card-body">
                <table class="align-middle mb-0 table table-hover" id="blockedip_datatables">
                  <thead>
                    <tr>
                      <!-- <th></th> -->
                      <th></th>
                      <th>SL</th>
                      <th width="20%">Blocked Date & Time</th>
                      <th>Country</th>
                      <th>Location</th>
                      <th>Attempted Username(s)</th>
                      <th>Number of Attempts</th>
                      <th>User Agent / Device</th>
                      <th>Status</th>
                      <th width="20%">Ip Address</th>
                      <th class="text-end" id="action-incompleted">Action</th>
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
          { label: "Blocked Ip", url: "" },
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
          this.getUserBlockedIp();
          this.$nextTick(() => {
            const dataTableWrapper = document.querySelectorAll('#blockedip_datatables_wrapper .row.mx-2');
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
      getUserBlockedIp() {
        this.getLoader = true;
        axios
          .get(this.globalVariables.apiUrl+"admin/manage/user/blockedip", {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          })
          .then((res) => {
          if ($.fn.DataTable.isDataTable("#blockedip_datatables")) {
              $('#blockedip_datatables').DataTable().destroy();
          }
          console.log(res.data)
          var table = $('#blockedip_datatables').DataTable({
            data: res.data.blockedips,
            columns: [
              // { data: 'id' },
              { data: 'id' },
              { data: 'id' },
              {
                data: 'updated_at',
                render: function (data, type, row) {
                  if (data) {
                    const date = new Date(data);
                    const day = String(date.getDate()).padStart(2, '0'); 
                    const month = date.toLocaleString('en-US', { month: 'long' }); 
                    const year = date.getFullYear();
                    
                    let hours = date.getHours();
                    const minutes = String(date.getMinutes()).padStart(2, '0');
                    const ampm = hours >= 12 ? 'PM' : 'AM';
                    
                    hours = hours % 12;
                    hours = hours ? hours : 12;
                    
                    return '<span title="'+`${day} ${month} ${year} ${String(hours).padStart(2, '0')}:${minutes} ${ampm}`+'">'+`${day} ${month} ${year} ${String(hours).padStart(2, '0')}:${minutes} ${ampm}`+'</span>';
                  } else {
                    return '';
                  }
                }
              },
              { 
                data: 'user_country',
                render: function(data, type, row) {
                  return data ? '<span title="'+data+'">'+data+'</span>' : '------';
                }
              },
              { 
                data: 'user_address',
                render: function(data, type, row) {
                  return data ? '<span title="'+data+'">'+data+'</span>' : '------';
                }
              },
              { 
                data: 'user_name',
                render: function(data, type, row) {
                  return data ? '<span title="'+data+'">'+data+'</span>' : '------';
                }
              },
              { 
                data: 'attempts',
                render: function(data, type, row) {
                  return data ? '<span title="'+data+'">'+data+'</span>' : '------';
                }
              },
              {
                data: "user_agent",
                render: function (data, type, row) {
                  if (data != null) {
                    return '<span title="'+data+'">'+ data.slice(0, 20)+'</span>';
                  }
                  return "--------";
                },
              },
              {
                  data: "action",
                  render: function (data, type, row) {
                    if(row.blocked_until != null){
                      return '<span title="Block" class="badge bg-danger">Block</span>'
                    }else{
                      return '<span title="Unblock" class="badge bg-success">Unblock</span>'
                    }
                  }
                },
              {
                data: "ip_address",
                render: function (data, type, row) {
                  if (data != null) {
                    return data.slice(0, 20);
                  }
                  return "--------";
                },
              },
              {
                  data: "action",
                  render: function (data, type, row) {
                     return (
                      '<div class="blocked_action text-end"><button title="Unblock" type="button" id="delete_btn"  data-id='+row.id +' class="bg-transparent border-0 text-danger"><i class="fa-solid fa-unlock-keyhole" id="delete_btn" data-id='+row.id +'></i></button></div>'
                    );
                  }
                },
            ],
            initComplete: () => { 
              $('#blockedip_datatables').wrap('<div class="commonDataTablesClass"></div>');
              const table = $("#blockedip_datatables").DataTable();
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
                $('td:eq(1)', row).html(dataIndex + 1);
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
              { targets: 3, orderable: false, className: 'dt-center' }
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
                    exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9] }
                  },
                  {
                    extend: 'csv',
                    text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                    className: 'dropdown-item',
                    exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9] }
                  },
                  {
                    extend: 'excel',
                    text: '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                    className: 'dropdown-item',
                    exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9] }
                  },
                  {
                    extend: 'pdf',
                    text: '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                    className: 'dropdown-item',
                    exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9] }
                  },
                  {
                    extend: 'copy',
                    text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                    className: 'dropdown-item',
                    exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9] }
                  }
                ]
              },
               {
              className: "btn btn-primary",
              text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">Sl</a></li><li><a class="dropdown-item" href="#" data-column="2">Blocked Date & Time</a></li><li><a class="dropdown-item" href="#" data-column="3">Country</a></li><li><a class="dropdown-item" href="#" data-column="4">Location</a></li><li><a class="dropdown-item" href="#" data-column="5">Attempted Username(s)</a></li><li><a class="dropdown-item" href="#" data-column="6">Number of Attempts</a></li><li><a class="dropdown-item" href="#" data-column="7">User Agent / Device</a></li><li><a class="dropdown-item" href="#" data-column="8">Status</a></li><li><a class="dropdown-item" href="#" data-column="9">Ip Address</a></li><li><a class="dropdown-item" href="#" data-column="10">Action</a></li></div></ul></div>',
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

    attachEventListenersBlulkAction() {
      $('#blockedip_datatables').on('change', '.row-checkbox', (event) => {
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
      $('#blockedip_datatables thead').on('change', 'input[type="checkbox"]', (event) => {
        const isChecked = event.target.checked;
        $('#blockedip_datatables tbody .row-checkbox').each((index, checkbox) => {
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
                this.globalVariables.apiUrl + "admin/manage/blockedip/bulk/delete",
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
                  this.getUserBlockedIp();
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
        $("#blockedip_datatables").on("click", ".blocked_action", (event) => {
          const target = $(event.target);
          const dataId = target.data("id");
          const dataClass = target.attr("id");
          if(dataClass === 'delete_btn'){
            this.delteTranUser(dataId);
          }
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
              .get(this.globalVariables.apiUrl+`admin/manage/user/blockedip/delete/${id}`, {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              })
              .then((res) => {
                if(res.data.status == 'success'){
                  toastr.success(res.data.message);
                  this.getUserBlockedIp();
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
  #blockedip_datatables colgroup:nth-of-type(2) {
      display: none !important;
  }
  #blockedip_datatables .dt-checkboxes-cell{
      padding: 0.7rem 0.5rem !important;
  }
  </style>
  