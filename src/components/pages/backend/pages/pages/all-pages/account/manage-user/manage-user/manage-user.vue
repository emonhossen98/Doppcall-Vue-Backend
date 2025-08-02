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
              <h5 class="card-title mb-0 mt-2">
                Publishers
              </h5>
            </div>
            <div class="card-body">
              <div class="table-responsive-sm table-overflow-hidden">
                <table class="align-middle mb-0 table table-hover" id="publishers_tables">
                  <thead>
                    <tr>
                      <!-- <th></th> -->
                      <th></th>
                      <th>Company Name</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Phone Number</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>
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
                            <a :class="checkfilter.showcolumn == 'Company Name' ? 'check-active' : ''"
                              @click="clickFilters('company_name', 'search', 'Company Name')">Company Name
                            </a>
                            <template v-if="applyfillters.includes('Company Name')">
                              <span @click="removeSearch('Company Name', 'company_name', 'search')"
                                id="remove-to-search-list">x</span>
                            </template>
                          </li>

                          <li class="position-relative">
                            <a :class="checkfilter.showcolumn == 'First Name' ? 'check-active' : ''"
                              @click="clickFilters('first_name', 'search', 'First Name')">First Name
                            </a>
                            <template v-if="applyfillters.includes('First Name')">
                              <span @click="removeSearch('First Name', 'first_name', 'search')"
                                id="remove-to-search-list">x</span>
                            </template>
                          </li>

                          <li class="position-relative">
                            <a :class="checkfilter.showcolumn == 'Last Name' ? 'check-active' : ''"
                              @click="clickFilters('last_name', 'search', 'Last Name')">Last Name
                            </a>
                            <template v-if="applyfillters.includes('Last Name')">
                              <span @click="removeSearch('Last Name', 'last_name', 'search')"
                                id="remove-to-search-list">x</span>
                            </template>
                          </li>

                               <li class="position-relative">
                            <a :class="checkfilter.showcolumn == 'Email' ? 'check-active' : ''"
                              @click="clickFilters('email', 'search', 'Email')">Email
                            </a>
                            <template v-if="applyfillters.includes('Email')">
                              <span @click="removeSearch('Email', 'email', 'search')"
                                id="remove-to-search-list">x</span>
                            </template>
                          </li>

                                   <li class="position-relative">
                            <a :class="checkfilter.showcolumn == 'Phone Number' ? 'check-active' : ''"
                              @click="clickFilters('phone_number', 'search', 'Phone Number')">Phone Number
                            </a>
                            <template v-if="applyfillters.includes('Phone Number')">
                              <span @click="removeSearch('Phone Number', 'phone_number', 'search')"
                                id="remove-to-search-list">x</span>
                            </template>
                          </li>

                          <li class="position-relative">
                            <a :class="checkfilter.showcolumn == 'Status' ? 'check-active' : ''"
                              @click="clickFilters('status', 'select', 'Status')">Status <i
                                class="fa-solid fa-caret-down"></i>
                            </a>
                            <template v-if="applyfillters.includes('Status')">
                              <span @click="removeSearch('Status', 'status', 'select')"
                                id="remove-to-search-list">x</span>
                            </template>
                          </li>
                        
                        </ul>
                      </div>
                      <div class="col-md-6 ps-4">
                        <div v-if="checkfilter.showcolumn != null && checkfilter.showcolumn != ''">
                          <p class="mt-3 mb-1 font-class">{{ checkfilter.showcolumn ?? '' }}</p>
                          <template v-if="checkfilter.showcolumn == 'Company Name' && checkfilter.types.includes('search')">
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.emptyValues['company_name']" type="checkbox" value="1" id="isemptyvalue">
                              <label class="form-check-label" for="isemptyvalue">
                                is Empty
                              </label>
                            </div>
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.notemptyValues['company_name']" type="checkbox" value="0"
                                id="isnotemptyvalue">
                              <label class="form-check-label" for="isnotemptyvalue">
                                is not Empty
                              </label>
                            </div>
                          </template>

                               <template v-if="checkfilter.showcolumn == 'First Name ' && checkfilter.types.includes('search')">
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.emptyValues['first_name']" type="checkbox" value="1" id="isemptyvalue">
                              <label class="form-check-label" for="isemptyvalue">
                                is Empty
                              </label>
                            </div>

                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.notemptyValues['first_name']" type="checkbox" value="0"
                                id="isnotemptyvalue">
                              <label class="form-check-label" for="isnotemptyvalue">
                                is not Empty
                              </label>
                            </div>
                          </template>

                          <template v-if="checkfilter.showcolumn == 'Last Name ' && checkfilter.types.includes('search')">
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.emptyValues['last_name']" type="checkbox" value="1" id="isemptyvalue">
                              <label class="form-check-label" for="isemptyvalue">
                                is Empty
                              </label>
                            </div>

                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.notemptyValues['last_name']" type="checkbox" value="0"
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

                                <template v-if="checkfilter.showcolumn == 'Phone Number' && checkfilter.types.includes('search')">
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.emptyValues['phone_number']" type="checkbox" value="1" id="isemptyvalue">
                              <label class="form-check-label" for="isemptyvalue">
                                is Empty
                              </label>
                            </div>

                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.notemptyValues['phone_number']" type="checkbox" value="0"
                                id="isnotemptyvalue">
                              <label class="form-check-label" for="isnotemptyvalue">
                                is not Empty
                              </label>
                            </div>
                          </template>


                          <template v-if="checkfilter.showcolumn == 'Status' && checkfilter.types.includes('select')">
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.emptyValues['status']" type="checkbox" value="1" id="isemptyvalue">
                              <label class="form-check-label" for="isemptyvalue">
                                is Empty
                              </label>
                            </div>
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.notemptyValues['status']" type="checkbox" value="0"
                                id="isnotemptyvalue">
                              <label class="form-check-label" for="isnotemptyvalue">
                                is not Empty
                              </label>
                            </div>
                          </template>
                          <template
                            v-if="checkfilter.showcolumn == 'Created At' && checkfilter.types.includes('search')">
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
                              <template v-if="checkfilter.showcolumn == 'Company Name' && checkfilter.types.includes('search')">
                                <label for="filtertext">Contains</label>
                                <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                  v-model="checkfilter.searchValues['company_name']" class="form-control mb-2" id="filtertext"
                                  placeholder="Search here..">
                              </template>

                                  <template v-if="checkfilter.showcolumn == 'First Name' && checkfilter.types.includes('search')">
                                <label for="filtertext">Contains</label>
                                <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                  v-model="checkfilter.searchValues['first_name']" class="form-control mb-2" id="filtertext"
                                  placeholder="Search here..">
                              </template>

                                  <template v-if="checkfilter.showcolumn == 'Last Name' && checkfilter.types.includes('search')">
                                <label for="filtertext">Contains</label>
                                <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                  v-model="checkfilter.searchValues['last_name']" class="form-control mb-2" id="filtertext"
                                  placeholder="Search here..">
                              </template>

                               <template v-if="checkfilter.showcolumn == 'Email' && checkfilter.types.includes('search')">
                                <label for="filtertext">Contains</label>
                                <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                  v-model="checkfilter.searchValues['email']" class="form-control mb-2" id="filtertext"
                                  placeholder="Search here..">
                              </template>

                               <template v-if="checkfilter.showcolumn == 'Phone Number' && checkfilter.types.includes('search')">
                                <label for="filtertext">Contains</label>
                                <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                  v-model="checkfilter.searchValues['phone_number']" class="form-control mb-2" id="filtertext"
                                  placeholder="Search here..">
                              </template>

                              <template
                                v-if="checkfilter.showcolumn == 'Status' && checkfilter.types.includes('select')">
                                <div class="form-check mb-2">
                                  <input @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.selectedValues['status']" class="form-check-input"
                                    type="checkbox" value="0" id="dynamicidstatus0">
                                  <label class="form-check-label" for="dynamicidstatus0">
                                    Pending
                                  </label>
                                </div>
                                <div class="form-check mb-2">
                                  <input @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.selectedValues['status']" class="form-check-input"
                                    type="checkbox" value="1" id="dynamicidstatus1">
                                  <label class="form-check-label" for="dynamicidstatus1">
                                    Approved
                                  </label>
                                </div>
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
    <!-- / Content -->
    <div class="content-backdrop fade"></div>
  </div>
  <!-- Large Modal -->
  <div class="modal fade" id="statusChangeModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel3">{{ modalTitle }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div>
            <p class="font-class">Please verify your Account</p>
          </div>

          <div class="form-group">
            <label for="note">Note (optional)</label>
            <textarea rows="3" cols="1" class="form-control" placeholder="Send a note...." v-model="modalData.note"
              id="note"></textarea>
          </div>
          <div class="form-group mt-3">
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" role="switch" value="1" v-model="modalData.mailAction" />
              <label class="form-check-label" for="send-mail-btn">Send Mail</label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">
            Close
          </button>
          <button type="button" @click="submiteModal()" class="btn btn-primary"><i class="fas fa-check fa-sm me-1"></i>
            Confirm</button>
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
import Loader from "../../../../../../include/loader.vue";
import Breadcrumb from "../../../../../../include/breadcrumb.vue";
import { inject } from "vue";
import { fetchUserRoleAccountmanager } from "@/services/userServiceAccountmanager";

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
        { label: "Dashboard", url: "/account/dashboard" },
        { label: "Publishers", url: "" },
      ],
      getLoader: false,
      modalTitle: "",
      modalData: {
        data: "",
        action_type: "",
        email: " ",
        note: "",
        mailAction: "",
      },
      modalDisplay: "none",
      showHiddenExternalFilter: false,
      checkfilter: {
        columns: ['company_name'],
        showcolumn: "Company Name",
        types: ['search'],
        emptyValues: {
          company_name: [],
          first_name: [],
          last_name: [],
          email: [],
          phone_number: [],
          status: [],
          created_at: [],
        },
        notemptyValues: {
        company_name: [],
          first_name: [],
          last_name: [],
          email: [],
          phone_number: [],
          status: [],
          created_at: [],
        },
        searchValues: {
         company_name: [],
          first_name: [],
          last_name: [],
          email: [],
          phone_number: [],
          created_at: [],
        },
        selectedValues: {
          status: [],
        },
      },
      applyfillters: [],
    };
  },
  async mounted() {
    try {
      const { role, isAuthorized } = await fetchUserRoleAccountmanager();
      if (role == 'Account manager') {
        this.getManagePublsihers();
        this.$nextTick(() => {
          const dataTableWrapper = document.querySelectorAll('#publishers_tables_wrapper .row.mx-2');
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
    getManagePublsihers() {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl + "account-manager/manage/publishers/get-data", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          if ($.fn.DataTable.isDataTable("#publishers_tables")) {
            $('#publishers_tables').DataTable().destroy();
          }
          var table = $('#publishers_tables').DataTable({
            data: res.data.getDatas,
            columns: [
              { data: "id" },
              {
                data: "company_name",
                render: function (data, type, row) {
                  if (row.company_name != null) {
                    return row.company_name.length > 10
                      ? row.company_name.slice(0, 10) + '...'
                      : row.company_name;
                  }
                  return '----------';
                },
              },
              { data: "fname" },
              { data: "lname" },
              {
                data: "email",
                render: function (data, type, row) {
                  if (row.email != null) {
                    return row.email.length > 15
                      ? row.email.slice(0, 15) + '...'
                      : row.email;
                  }
                  return '----------';
                },
              },
              { data: "convart_phone" },
              { data: "convart_status" },
              { data: "convart_action" },

            ],
            initComplete: () => {
              $('#publishers_tables').wrap('<div class="commonDataTablesClass"></div>');
              const table = $("#publishers_tables").DataTable();
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
            },
            createdRow: function (row, data, dataIndex) {
              $('td:eq(0)', row).html(dataIndex + 1);
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
              searchPlaceholder: 'Search Publisher',
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
                    exportOptions: { columns: [1, 2, 3, 4, 5, 6] }
                  },
                  {
                    extend: 'csv',
                    text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                    className: 'dropdown-item',
                    exportOptions: { columns: [1, 2, 3, 4, 5, 6] }
                  },
                  {
                    extend: 'excel',
                    text: '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                    className: 'dropdown-item',
                    exportOptions: { columns: [1, 2, 3, 4, 5, 6] }
                  },
                  {
                    extend: 'pdf',
                    text: '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                    className: 'dropdown-item',
                    exportOptions: { columns: [1, 2, 3, 4, 5, 6] }
                  },
                  {
                    extend: 'copy',
                    text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                    className: 'dropdown-item',
                    exportOptions: { columns: [1, 2, 3, 4, 5, 6] }
                  }
                ]
              },
              {
                className: "btn btn-primary me-2",
                text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">Company Name</a></li><li><a class="dropdown-item" href="#" data-column="2">First Name</a></li><li><a class="dropdown-item" href="#" data-column="3">Last Name</a></li><li><a class="dropdown-item" href="#" data-column="4">Email</a></li><li><a class="dropdown-item" href="#" data-column="5">Phone Number</a></li><li><a class="dropdown-item" href="#" data-column="6">Status</a></li><li><a class="dropdown-item" href="#" data-column="7">Action</a></li></div></ul></div>',
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
      this.checkfilter.columns = ['company_name'],
        this.checkfilter.showcolumn = "Company Name",
        this.checkfilter.types = ['search'],
        this.checkfilter.emptyValues = {
        company_name: [],
          first_name: [],
          last_name: [],
          email: [],
          phone_number: [],
          status: [],
          created_at: [],
        },
        this.checkfilter.notemptyValues = {
          company_name: [],
          first_name: [],
          last_name: [],
          email: [],
          phone_number: [],
          status: [],
          created_at: [],
        },
        this.checkfilter.searchValues = {
           company_name: [],
          first_name: [],
          last_name: [],
          email: [],
          phone_number: [],
          created_at: [],
        },
        this.checkfilter.selectedValues = {
          status: [],
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
      $("#publishers_tables_wrapper").on("click", "button", (event) => {
        const target = $(event.target);
        const dataClass = target.attr("id");
        if (dataClass == 'all_filters') {
          this.showHiddenExternalFilter = !this.showHiddenExternalFilter;
        }
      });
    },



    attachEventListeners() {
      $("#publishers_tables").on("click", ".dropdown-item", (event) => {
        const target = $(event.target);
        const dataId = target.data("id");
        const dataClass = target.attr("class");
        const dataEmail = target.data("email");

        if (dataClass === 'dropdown-item approved-btn align-items-center') {
          this.modalData.data = dataId;
          this.modalData.email = dataEmail;
          this.modalData.action_type = "approved",
            this.modalTitle = "Want to Approved";
          this.modalDisplay = "block";

        } else if (dataClass === 'dropdown-item pending-btn align-items-center') {
          this.modalData.data = dataId;
          this.modalData.email = dataEmail;
          this.modalData.action_type = "pending",
            this.modalTitle = "Want to Pending";
          this.modalDisplay = "block";

        } else if (dataClass === 'dropdown-item unsuspend-btn align-items-center') {
          this.modalData.data = dataId;
          this.modalData.email = dataEmail;
          this.modalData.action_type = "unsuspend",
            this.modalTitle = "Want to Unsuspend";
          this.modalDisplay = "block";

        } else if (dataClass === 'dropdown-item suspend-btn align-items-center') {
          this.modalData.data = dataId;
          this.modalData.email = dataEmail;
          this.modalData.action_type = "suspend",
            this.modalTitle = "Want to Suspend";
          this.modalDisplay = "block";

        } else if (dataClass === 'dropdown-item resume-btn align-items-center') {
          this.modalData.data = dataId;
          this.modalData.email = dataEmail;
          this.modalData.action_type = "resume",
            this.modalTitle = "Want to Resume";
          this.modalDisplay = "block";

        } else if (dataClass === 'dropdown-item pause-btn align-items-center') {
          this.modalData.data = dataId;
          this.modalData.email = dataEmail;
          this.modalData.action_type = "pause",
            this.modalTitle = "Want to Push";
          this.modalDisplay = "block";
        } else if (dataClass === "dropdown-item publisher-view align-items-center") {
          this.$router.push('/account-view/' + dataId);
        }
      });
    },
    // Account Access Settings
    submiteModal() {
      this.getLoader = true;
      axios
        .post(
          this.globalVariables.apiUrl + "account-manager/manage/user/account-access",
          this.modalData,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          if (res.data.status == 'success') {
            this.getManagePublsihers();
            this.callToNext();
            toastr.success(res.data.message);
            const modalElement = document.getElementById('statusChangeModal');
            const modal = bootstrap.Modal.getInstance(modalElement);
            if (modal) {
              modal.hide();
            }
          } else {
            toastr.error(res.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    callToNext() {
      this.$nextTick(() => {
        const dataTableWrapper = document.querySelectorAll('#publishers_tables_wrapper .row.mx-2');
        if (dataTableWrapper.length > 0) {
          dataTableWrapper[0].style.display = 'none';
          dataTableWrapper[1].style.display = 'none';
        }
      });
    },

    // attachEventListenersOfButton() {
    //   $("#offer_datatables_wrapper").on("click", "button", (event) => {
    //     const target = $(event.target);
    //     const dataClass = target.attr("id");
    //     if (dataClass === "create") {
    //       this.$router.push("/admin-offers/create");
    //     }
    //   });
    // },
  },
};
</script>
<style>
#dropdownMenuButton {
  background: transparent;
}

#publishers_tables colgroup:nth-of-type(2) {
  display: none !important;
}

#publishers_tables .dt-checkboxes-cell {
  padding: 0.7rem 0.5rem !important;
}

.country-flagofPhone {
  width: 15%;
}
</style>