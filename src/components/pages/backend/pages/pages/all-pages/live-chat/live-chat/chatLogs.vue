<template>
  <div v-if="getLoader">
    <Loader></Loader>
  </div>
  <!-- Content wrapper -->
  <div class="content-wrapper">
    <div class="container-fluid flex-grow-1 container-p-y">
      <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
      <div class="row mt-4">
        <div class="col-12">
          <div class="card">
            <div class="card-header py-2">
              <h5 class="card-title mb-0 mt-2">Chat Logs</h5>
            </div>
            <div class="card-body">
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
                    <th id="action-incompleted">Action</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
              <div id="externalFilters" v-if="showHiddenExternalFilter">
                <div>
                  <div class="row">
                    <div class="d-flex justify-content-between align-items-center border-bottom py-3 px-4">
                      <h5 class="mb-0">Apply Filter <template v-if="applyfillters.length > 0"><span
                            class="badge bg-dark text-white">{{ applyfillters.length ?? 0 }}</span></template>
                      </h5>
                      <a class="clearallexternalfilter" @click="externalfilterreset()">Clear All</a>
                    </div>
                  </div>
                  <div class="row px-3" id="externalFiltersWrapper">
                    <div class="col-md-6 border-right">
                      <ul class="px-0 mt-3" id="offer-extra-filter">
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Name' ? 'check-active' : ''"
                            @click="clickFilters('name', 'search', 'Name')">Name
                          </a>
                          <template v-if="applyfillters.includes('Name')">
                            <span @click="removeSearch('Name', 'name', 'search')" id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Email' ? 'check-active' : ''"
                            @click="clickFilters('email', 'search', 'Email')">Email
                          </a>
                          <template v-if="applyfillters.includes('Email')">
                            <span @click="removeSearch('Email', 'email', 'search')" id="remove-to-search-list">x</span>
                          </template>
                        </li>

                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Message' ? 'check-active' : ''"
                            @click="clickFilters('message', 'search', 'Message')">Message
                          </a>
                          <template v-if="applyfillters.includes('Message')">
                            <span @click="removeSearch('Message', 'message', 'search')"
                              id="remove-to-search-list">x</span>
                          </template>
                        </li>

                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Created At' ? 'check-active' : ''"
                            @click="clickFilters('created_at', 'search', 'Created At')">Created At
                          </a>
                          <template v-if="applyfillters.includes('Created At')">
                            <span @click="removeSearch('Created At', 'created_at', 'search')"
                              id="remove-to-search-list">x</span>
                          </template>
                        </li>
                      </ul>
                    </div>
                    <div class="col-md-6 ps-4">
                      <div v-if="checkfilter.showcolumn != null && checkfilter.showcolumn != ''">
                        <p class="mt-3 mb-1 font-class">{{ checkfilter.showcolumn ?? '' }}</p>
                        <template v-if="checkfilter.showcolumn == 'Name' && checkfilter.types.includes('search')">
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.emptyValues['name']" type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['name']" type="checkbox" value="0"
                              id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>

                        <template v-if="checkfilter.showcolumn == 'Email' && checkfilter.types.includes('search')">
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.emptyValues['email']" type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['email']" type="checkbox" value="0"
                              id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>


                        <template v-if="checkfilter.showcolumn == 'Message' && checkfilter.types.includes('search')">
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.emptyValues['message']" type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['message']" type="checkbox" value="0"
                              id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>



                        <template v-if="checkfilter.showcolumn == 'Created At' && checkfilter.types.includes('search')">
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.emptyValues['created_at']" type="checkbox" value="1"
                              id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['created_at']" type="checkbox" value="0"
                              id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <div>
                          <p>Have value</p>
                          <div>
                            <template v-if="checkfilter.showcolumn == 'Name' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.searchValues['name']" class="form-control mb-2" id="filtertext"
                                placeholder="Search here..">
                            </template>

                            <template v-if="checkfilter.showcolumn == 'Email' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.searchValues['email']" class="form-control mb-2" id="filtertext"
                                placeholder="Search here..">
                            </template>

                            <template
                              v-if="checkfilter.showcolumn == 'Message' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.searchValues['message']" class="form-control mb-2" id="filtertext"
                                placeholder="Search here..">
                            </template>
                            <template
                              v-if="checkfilter.showcolumn == 'Created At' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.searchValues['created_at']" class="form-control mb-2"
                                id="filtertext" placeholder="Search here..">
                            </template>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
      bulkactionids: {
        selectedIds: [],
      },
      blank_user,

      showHiddenExternalFilter: false,
      checkfilter: {
        columns: ['name'],
        showcolumn: "Name",
        types: ['search'],
        emptyValues: {
          name: [],
          email: [],
          message: [],
          created_at: [],
        },
        notemptyValues: {
          name: [],
          email: [],
          message: [],
          created_at: [],
        },
        searchValues: {
          name: [],
          email: [],
          message: [],
          created_at: [],
        },
        selectedValues: {
        },
      },
      applyfillters: [],
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
              {
                data: "sender.fname",
                render: function (data, type, full, meta) {
                  if (full?.sender?.fname != null) {
                    return '<span title="' + full?.sender?.fname + '">' + full?.sender?.fname + '</span>';
                  } else {
                    return '----';
                  }
                }
              },
              {
                data: "sender.email",
                render: function (data, type, full, meta) {
                  if (full?.sender?.email != null) {
                    return '<span title="' + full?.sender?.email + '">' + full?.sender?.email + '</span>';
                  } else {
                    return '----';
                  }
                }
              },
              {
                data: "message",
                render: function (data, type, row) {
                  if (row.type === 'audio') {
                    return '<audio src="https://api.doppcall.com/' + row.message + '" class="position-relative" controls></audio>';
                  } else if (row.type === 'image') {
                    return '<img id="chatLogsImage" src="https://api.doppcall.com/' + row.message + '" class="position-relative" alt="image" />';
                  } else {
                    return row.message;
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
                data: "action",
                render: function (data, type, full, meta) {
                  return (
                    '<div class="chat_logs_action d-flex align-items-center"><button title="Delete" type="button" id="delete-btn"  data-id=' +
                    full.id +
                    ' class="bg-transparent border-0 text-danger"><i class="far fa-trash-alt fa-sm" id="delete-btn" data-id=' +
                    full.id +
                    "></i></button></div>"
                  );
                },
              },
            ],
            initComplete: () => {
              $('#chat_logs_tables').wrap('<div class="commonDataTablesClass"></div>');
              const table = $("#chat_logs_tables").DataTable();
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
                searchable: false,
              },
            ],
            order: [[1, "desc"]],
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
                    exportOptions: { columns: [1, 2, 3, 4, 5] },
                  },
                  {
                    extend: "csv",
                    text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                    className: "dropdown-item",
                    exportOptions: { columns: [1, 2, 3, 4, 5] },
                  },
                  {
                    extend: "excel",
                    text:
                      '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                    className: "dropdown-item",
                    exportOptions: { columns: [1, 2, 3, 4, 5] },
                  },
                  {
                    extend: "pdf",
                    text:
                      '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                    className: "dropdown-item",
                    exportOptions: { columns: [1, 2, 3, 4, 5] },
                  },
                  {
                    extend: "copy",
                    text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                    className: "dropdown-item",
                    exportOptions: { columns: [1, 2, 3, 4, 5] },
                  },
                ],
              },
              {
                className: "btn btn-primary me-2",
                text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">SL</a></li><li><a class="dropdown-item" href="#" data-column="2">Name</a></li><li><a class="dropdown-item" href="#" data-column="3">Email</a></li><li><a class="dropdown-item" href="#" data-column="4">Message</a></li><li><a class="dropdown-item" href="#" data-column="5">Created At</a></li><li><a class="dropdown-item" href="#" data-column="6">Action</a></li></div></ul></div>',
              },
              {
                text:
                  '<span id="all_filters" class="all_filters"><i class="fa-solid fa-magnifying-glass me-1"></i>All Filters</span>',
                className: "btn btn-primary",
                attr: { id: "all_filters" },
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

    externalfilterreset() {
      this.checkfilter.columns = ['name'],
        this.checkfilter.showcolumn = "Name",
        this.checkfilter.types = ['search'],
        this.checkfilter.emptyValues = {
          name: [],
          email: [],
          message: [],
          created_at: [],
        },
        this.checkfilter.notemptyValues = {
          name: [],
          email: [],
          message: [],
          created_at: [],
        },
        this.checkfilter.searchValues = {
          name: [],
          email: [],
          message: [],
          created_at: [],
        },
        this.checkfilter.selectedValues = {

        },
        this.checkfilter.applyfillters = [],
        this.showHiddenExternalFilter = !this.showHiddenExternalFilter;
      this.clickCheckboxFilters();
    },

    clickFilters(value, type, key) {
      if (!Array.isArray(this.checkfilter.columns)) {
        this.checkfilter.columns = [];
      }
      if (!this.checkfilter.columns.includes(value)) {
        this.checkfilter.columns.push(value);
      }
      this.checkfilter.types.push(type);
      this.checkfilter.showcolumn = key;
      this.getFiltarOfExtranalFilter();
    },

    clickCheckboxFilters(value) {
      if (!Array.isArray(this.applyfillters)) {
        this.applyfillters = [];
      }
      if (value !== null && value !== undefined && !this.applyfillters.includes(value)) {
        this.applyfillters.push(value);
      }
      this.getFiltarOfExtranalFilter();
    },

    removeSearch(value, key, type) {
      if (!Array.isArray(this.applyfillters)) {
        this.applyfillters = [];
      }
      const index = this.applyfillters.indexOf(value);
      if (index > -1) {
        this.applyfillters.splice(index, 1);
        if (this.checkfilter.emptyValues.hasOwnProperty(key)) {
          this.checkfilter.emptyValues[key] = [];
        }

        if (this.checkfilter.notemptyValues.hasOwnProperty(key)) {
          this.checkfilter.notemptyValues[key] = [];
        }

        if (type == 'select') {
          if (this.checkfilter.selectedValues.hasOwnProperty(key)) {
            this.checkfilter.selectedValues[key] = [];
          }
        } else {
          if (this.checkfilter.searchValues.hasOwnProperty(key)) {
            this.checkfilter.searchValues[key] = [];
          }
        }
      }
      this.getFiltarOfExtranalFilter();
    },

    attachEventListenersOfButton() {
      $("#chat_logs_tables_wrapper").on("click", "button", (event) => {
        const target = $(event.target);
        const dataClass = target.attr("id");
        if (dataClass == 'all_filters') {
          this.showHiddenExternalFilter = !this.showHiddenExternalFilter;
        }
      });
    },


    attachEventListenersBlulkAction() {
      $('#chat_logs_tables').on('change', '.row-checkbox', (event) => {
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
      $('#chat_logs_tables thead').on('change', 'input[type="checkbox"]', (event) => {
        const isChecked = event.target.checked;
        $('#chat_logs_tables tbody .row-checkbox').each((index, checkbox) => {
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
                this.globalVariables.apiUrl + "admin/chat/message/bulk/delete",
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
                  this.getLogsData();
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
#chatLogsImage {
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
