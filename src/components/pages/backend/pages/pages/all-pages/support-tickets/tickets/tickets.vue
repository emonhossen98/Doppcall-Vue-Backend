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
            <div class="card-header py-2 d-flex justify-content-between align-items-center">
              <h5 class="card-title d-flex align-items-center mb-0 mt-2">Tickets</h5>
            </div>
            <div class="card-body">
              <table class="align-middle mb-0 table table-hover" id="ticket_datatables">
                <thead>
                  <tr>
                    <!-- <th></th> -->
                    <th></th>
                    <th>SL</th>
                    <th>Ticket No</th>
                    <th>Priority</th>
                    <th>Subject</th>
                    <th>Buyer</th>
                    <th>Role</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Created At</th>
                    <th id="action-incompleted">Actions</th>
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
                          <a :class="checkfilter.showcolumn == 'Ticket No' ? 'check-active' : ''"
                            @click="clickFilters('ticket_no', 'search', 'Ticket No')">Ticket No
                          </a>
                          <template v-if="applyfillters.includes('Ticket No')">
                            <span @click="removeSearch('Ticket No', 'ticket_no', 'search')"
                              id="remove-to-search-list">x</span>
                          </template>
                        </li>

                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Priority' ? 'check-active' : ''"
                            @click="clickFilters('priority', 'search', 'Priority')">Priority
                          </a>
                          <template v-if="applyfillters.includes('Priority')">
                            <span @click="removeSearch('Priority', 'priority', 'search')"
                              id="remove-to-search-list">x</span>
                          </template>
                        </li>

                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Subject' ? 'check-active' : ''"
                            @click="clickFilters('subject', 'search', 'Subject')">Subject
                          </a>
                          <template v-if="applyfillters.includes('Subject')">
                            <span @click="removeSearch('Subject', 'subject', 'search')"
                              id="remove-to-search-list">x</span>
                          </template>
                        </li>

                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Buyer' ? 'check-active' : ''"
                            @click="clickFilters('buyer', 'search', 'Buyer')">Buyer
                          </a>
                          <template v-if="applyfillters.includes('Buyer')">
                            <span @click="removeSearch('Buyer', 'buyer', 'search')" id="remove-to-search-list">x</span>
                          </template>
                        </li>

                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Role' ? 'check-active' : ''"
                            @click="clickFilters('role', 'select', 'Role')"> Role <i class="fa-solid fa-caret-down"></i>
                          </a>
                          <template v-if="applyfillters.includes(' Role')">
                            <span @click="removeSearch('Role', 'role', 'select')" id="remove-to-search-list">x</span>
                          </template>
                        </li>

                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Date' ? 'check-active' : ''"
                            @click="clickFilters('date', 'search', 'Date')">Date
                          </a>
                          <template v-if="applyfillters.includes('Date')">
                            <span @click="removeSearch('Date', 'date', 'search')" id="remove-to-search-list">x</span>
                          </template>
                        </li>

                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Status' ? 'check-active' : ''"
                            @click="clickFilters('status', 'select', 'Status')">Status <i
                              class="fa-solid fa-caret-down"></i>
                          </a>
                          <template v-if="applyfillters.includes('Status')">
                            <span @click="removeSearch('Status', 'status', 'select')" id="remove-to-search-list">x</span>
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
                        <template v-if="checkfilter.showcolumn == 'Ticket No' && checkfilter.types.includes('search')">
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.emptyValues['ticket_no']" type="checkbox" value="1"
                              id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['ticket_no']" type="checkbox" value="0"
                              id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>

                        <template v-if="checkfilter.showcolumn == 'Priority' && checkfilter.types.includes('search')">
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.emptyValues['priority']" type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['priority']" type="checkbox" value="0"
                              id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>

                        <template v-if="checkfilter.showcolumn == 'Subject' && checkfilter.types.includes('search')">
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.emptyValues['subject']" type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['subject']" type="checkbox" value="0"
                              id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>


                        <template v-if="checkfilter.showcolumn == 'Buyer' && checkfilter.types.includes('search')">
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.emptyValues['buyer']" type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['buyer']" type="checkbox" value="0"
                              id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>

                        <template v-if="checkfilter.showcolumn == 'Role' && checkfilter.types.includes('select')">
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.emptyValues['role']" type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['role']" type="checkbox" value="0"
                              id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>

                        <template v-if="checkfilter.showcolumn == 'Date' && checkfilter.types.includes('search')">
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.emptyValues['date']" type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['date']" type="checkbox" value="0"
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
                            <template
                              v-if="checkfilter.showcolumn == 'Ticket No' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.searchValues['ticket_no']" class="form-control mb-2"
                                id="filtertext" placeholder="Search here..">
                            </template>

                            <template
                              v-if="checkfilter.showcolumn == 'Priority' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.searchValues['priority']" class="form-control mb-2" id="filtertext"
                                placeholder="Search here..">
                            </template>

                            <template
                              v-if="checkfilter.showcolumn == 'Subject' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.searchValues['subject']" class="form-control mb-2" id="filtertext"
                                placeholder="Search here..">
                            </template>


                            <template v-if="checkfilter.showcolumn == 'Buyer' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.searchValues['buyer']" class="form-control mb-2" id="filtertext"
                                placeholder="Search here..">
                            </template>

                            <template v-if="checkfilter.showcolumn == 'Role' && checkfilter.types.includes('select')">
                              <div class="form-check mb-2">
                                <input @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                  v-model="checkfilter.selectedValues['role']" class="form-check-input" type="checkbox"
                                  value="0" id="dynamicidstatus0">
                                <label class="form-check-label" for="dynamicidstatus0">
                                  Publisher
                                </label>
                              </div>
                            </template>

                            <template v-if="checkfilter.showcolumn == 'Date' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.searchValues['date']" class="form-control mb-2" id="filtertext"
                                placeholder="Search here..">
                            </template>


                            <template v-if="checkfilter.showcolumn == 'Status' && checkfilter.types.includes('select')">
                              <div class="form-check mb-2">
                                <input @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                  v-model="checkfilter.selectedValues['status']" class="form-check-input"
                                  type="checkbox" value="0" id="dynamicidstatus0">
                                <label class="form-check-label" for="dynamicidstatus0">
                                  Open
                                </label>
                              </div>
                              <div class="form-check mb-2">
                                <input @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                  v-model="checkfilter.selectedValues['status']" class="form-check-input"
                                  type="checkbox" value="1" id="dynamicidstatus1">
                                <label class="form-check-label" for="dynamicidstatus1">
                                  Close
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
              <div class="row justify-content-between align-items-center">
                <div class="col-md-3">
                  Showing {{ startPage }} to {{ endPage }} of {{ recordsTotal }} entries
                </div>
                <div class="pagination-controls col-md-9 d-flex justify-content-end align-items-center ">
                  <ul class="pagination mb-0">
                    <!-- Previous Button -->
                    <li class="paginate_button page-item previous" :class="{ disabled: currentPage === 1 }">
                      <button class="page-link" @click="getSupportTickets(currentPage - 1)"
                        :disabled="currentPage === 1">
                        <i class="fa-solid fa-chevron-left"></i>
                      </button>
                    </li>

                    <!-- Page Numbers -->
                    <template v-for="page in paginationPages" :key="page">
                      <li class="paginate_button page-item" :class="{ active: page === currentPage }">
                        <button class="page-link" @click="getSupportTickets(page)">
                          {{ page }}
                        </button>
                      </li>
                    </template>

                    <!-- Next Button -->
                    <li class="paginate_button page-item next" :class="{ disabled: currentPage === lastPage }">
                      <button class="page-link" @click="getSupportTickets(currentPage + 1)"
                        :disabled="currentPage === lastPage">
                        <i class="fa-solid fa-chevron-right"></i>
                      </button>
                    </li>
                  </ul>
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
        { label: "Tickets", url: "" },
      ],
      getLoader: false,
      ticketDelete: {
        data: "",
      },
      currentPage: 1,
      lastPage: 1,
      recordsTotal: 0,
      startPage: 0,
      endPage: 0,
      searchInputValue: "",
      bulkactionids: {
        selectedIds: [],
        status: "",
      },

      showHiddenExternalFilter: false,
      checkfilter: {
        columns: ['ticket_no'],
        showcolumn: "Ticket No",
        types: ['search'],
        emptyValues: {
          ticket_no: [],
          priority: [],
          subject: [],
          buyer: [],
          role: [],
          date: [],
          status: [],
          created_at: [],
        },
        notemptyValues: {
          ticket_no: [],
          priority: [],
          subject: [],
          buyer: [],
          role: [],
          date: [],
          status: [],
          created_at: [],
        },
        searchValues: {
          ticket_no: [],
          priority: [],
          subject: [],
          buyer: [],
          date: [],
          created_at: [],
        },
        selectedValues: {
          role: [],
          status: [],
        },
      },
      applyfillters: [],
    };
  },
  async mounted() {
    try {
      const { role, isAuthorized } = await fetchUserRole();
      if (role == 'Super' || role == 'Admin') {
        this.getSupportTickets();
        this.$nextTick(() => {
          const dataTableWrapper = document.querySelectorAll('#ticket_datatables_wrapper .row.mx-2');
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
  computed: {
    paginationPages() {
      const pages = [];
      const range = 2;
      const start = Math.max(1, this.currentPage - range);
      const end = Math.min(this.lastPage, this.currentPage + range);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (start > 1) {
        pages.unshift(1);
        if (start > 2) pages.splice(1, 0, '...');
      }
      if (end < this.lastPage) {
        pages.push('...');
        pages.push(this.lastPage);
      }
      return pages;
    },
  },
  methods: {
    getSupportTickets(page = 1, perPage = 10, searchValue = '') {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl + "admin/tickets/get-data", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          params: { page: page, perPage: perPage, search: searchValue },
        })
        .then((res) => {
          const { data, current_page, last_page, recordsTotal } = res.data;
          this.currentPage = current_page;
          this.lastPage = last_page;
          this.recordsTotal = recordsTotal;

          this.startPage = (current_page - 1) * perPage + 1;
          this.endPage = Math.min(current_page * perPage, recordsTotal);

          if ($.fn.DataTable.isDataTable("#ticket_datatables")) {
            $('#ticket_datatables').DataTable().destroy();
          }
          var formateDate = this.formatDates;
          var table = $('#ticket_datatables').DataTable({
            data: data,
            columns: [
              // { data: 'id' },
              { data: 'id' },
              { data: 'id' },
              {
                data: 'convart_ticket_no',

              },
              {
                data: 'priority',
                render: function (data, type, row) {
                  if (row?.priority != null) {
                    return '<span title="' + row.priority + '">' + row.priority + '</span>';
                  } else {
                    return '----';
                  }
                }
              },
              {
                data: 'subject.name',
                render: function (data, type, row) {
                  if (row?.subject?.name != null) {
                    return '<span title="' + row?.subject?.name + '">' + row?.subject?.name + '</span>';
                  } else {
                    return '----';
                  }
                }
              },
              {
                data: 'user.fname',
                render: function (data, type, row) {
                  if (row?.user?.fname != null) {
                    return '<span title="' + row?.user?.fname + '">' + row?.user?.fname + '</span>';
                  } else {
                    return '----';
                  }
                }
              },
              {
                data: 'convart_role.name',
                render: function (data, type, row) {
                  if (row?.convart_role?.name != null) {
                    return '<span title="' + row?.convart_role?.name + '">' + row?.convart_role?.name + '</span>';
                  } else {
                    return '----';
                  }
                }
              },
              {
                data: 'convart_date',
                render: function (data, type, row) {
                  if (row?.convart_date != null) {
                    return '<span title="' + row?.convart_date + '">' + row?.convart_date + '</span>';
                  } else {
                    return '----';
                  }
                }
              },
              { data: 'convart_status' },
              {
                data: "created_at",
                render: function (data, type, row) {
                  if (row.created_at != null) {
                    return formateDate(row.created_at);
                  }
                  return "--------";
                },
              },
              {
                data: 'created_at',
                render: function (data, type, full, meta) {
                  return '<div class="ticket_action d-flex align-items-center"><a data-vue-route title="View" href="/admin-tickets-view/' + full.ticket_no + '" class="bg-transparent border-0 text-success me-2"><i class="fas fa-eye fa-sm"></i></a><a data-vue-route title="Edit" href="/admin-tickets-edit/' + full.id + '" class="bg-transparent border-0 text-primary me-2"><i class="far fa-edit fa-sm"></i></a><button id="delete-btn" type="button" title="Delete" data-id=' + full.id + ' class="bg-transparent border-0 text-danger"><i id="delete-btn" class="far fa-trash-alt fa-sm" data-id=' + full.id + '></i></button></div>';
                }
              },

            ],
            initComplete: () => {
              $('#ticket_datatables').wrap('<div class="commonDataTablesClass"></div>');
              const table = $("#ticket_datatables").DataTable();
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
              this.attachEventListenersForMenu();
              this.attachEventListenersForSearch();

              this.attachEventListenersBlulkAction();
              this.attachEventListenersBlulkActionSubmit();

              const searchInput = $("#ticket_datatables_filter input");
              searchInput.val(this.searchInputValue);
              if (this.searchInputValue != '') {
                searchInput.focus();
              }

              searchInput.off().on("keyup", (e) => {
                const searchTerm = e.target.value;
                this.searchInputValue = searchTerm;
                this.getSupportTickets(1, perPage, searchTerm);
              });
            },
            createdRow: function (row, data, dataIndex) {
              const perPage = 10;
              const rowNumber = (dataIndex + 1) + (page - 1) * perPage;
              $('td:eq(1)', row).html(rowNumber);
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
              '<"col-md-5 d-none"i>' +
              '<"col-md-7 d-none"p>>',
            displayLength: perPage,
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
                text: `
                  <div id="bulk-action-wrapper">
                    <select id="bulk-action-select" class="form-select form-select-sm">
                      <option value=""> ✓ Bulk Actions</option>
                       <option value="delete">Bulk Delete</option>
                      <option value="Open">Bulk Open</option>
                      <option value="Process">Bulk Process</option>
                      <option value="Close">Bulk Close</option>
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
                    exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8, 9] }
                  },
                  {
                    extend: 'csv',
                    text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                    className: 'dropdown-item',
                    exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8, 9] }
                  },
                  {
                    extend: 'excel',
                    text: '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                    className: 'dropdown-item',
                    exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8, 9] }
                  },
                  {
                    extend: 'pdf',
                    text: '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                    className: 'dropdown-item',
                    exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8, 9] }
                  },
                  {
                    extend: 'copy',
                    text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                    className: 'dropdown-item',
                    exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8, 9] }
                  }
                ]
              },
              {
                className: "btn btn-primary me-2",
                text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">Sl</a></li><li><a class="dropdown-item" href="#" data-column="2">Ticket No</a></li><li><a class="dropdown-item" href="#" data-column="3">Priority</a></li><li><a class="dropdown-item" href="#" data-column="4">Subject</a></li><li><a class="dropdown-item" href="#" data-column="5">Buyer</a></li><li><a class="dropdown-item" href="#" data-column="6">Role</a></li><li><a class="dropdown-item" href="#" data-column="7">Date</a></li><li><a class="dropdown-item" href="#" data-column="8">Status</a></li><li><a class="dropdown-item" href="#" data-column="9">Created At</a></li><li><a class="dropdown-item" href="#" data-column="10">Actions</a></li></div></ul></div>',
              },
              {
                text:
                  '<span id="all_filters" class="all_filters"><i class="fa-solid fa-magnifying-glass me-1"></i>All Filters</span>',
                className: "btn btn-primary",
                attr: { id: "all_filters" },
              },
              // {
              //   text: '<span id="create"><i class="ti ti-plus me-1 ti-xs"></i>Add Ticket</span>',
              //   className: 'create-new btn btn-primary',
              //   attr: { id: 'create' },
              // }
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

    externalfilterreset() {
      this.checkfilter.columns = ['ticket_no'],
        this.checkfilter.showcolumn = "Ticket No",
        this.checkfilter.types = ['search'],
        this.checkfilter.emptyValues = {
          ticket_no: [],
          priority: [],
          subject: [],
          buyer: [],
          role: [],
          date: [],
          status: [],
          created_at: [],
        },
        this.checkfilter.notemptyValues = {
          ticket_no: [],
          priority: [],
          subject: [],
          buyer: [],
          role: [],
          date: [],
          status: [],
          created_at: [],
        },
        this.checkfilter.searchValues = {
          ticket_no: [],
          priority: [],
          subject: [],
          buyer: [],
          date: [],
          created_at: [],
        },
        this.checkfilter.selectedValues = {
          role: [],
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
      $("#ticket_datatables_wrapper ").on("click", "button", (event) => {
        const target = $(event.target);
        const dataClass = target.attr("id");
        if (dataClass == 'all_filters') {
          this.showHiddenExternalFilter = !this.showHiddenExternalFilter;
        }
      });
    },

    attachEventListenersBlulkAction() {
      $('#ticket_datatables').on('change', '.row-checkbox', (event) => {
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
      $('#ticket_datatables thead').on('change', 'input[type="checkbox"]', (event) => {
        const isChecked = event.target.checked;
        $('#ticket_datatables tbody .row-checkbox').each((index, checkbox) => {
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
          if (action === "Close") {
            this.bulkactionids.status = 'Close';
            const alertTitle = "Ticket Want to Close";
            this.bulkStatusChange(alertTitle);
          } else if (action === "Open") {
            this.bulkactionids.status = 'Open';
            const alertTitle = "Ticket Want to Open";
            this.bulkStatusChange(alertTitle);
          } else {
            this.bulkactionids.status = 'Process';
            const alertTitle = "Ticket Want to Process";
            this.bulkStatusChange(alertTitle);
          }
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
                this.globalVariables.apiUrl + "admin/tickets/bulk/delete",
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
                  this.getSupportTickets();
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
                this.globalVariables.apiUrl + "admin/tickets/bulk/status",
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
                  this.getSupportTickets();
                  this.bulkactionids.selectedIds = [];
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
      $("#ticket_datatables").on("click", ".ticket_action", (event) => {
        const target = $(event.target);
        const dataId = target.data("id");
        const dataClass = target.attr("id");
        if (dataClass === 'delete-btn') {
          this.ticketDelete.data = dataId;
          this.deleteTicket();
        }
      });
    },
    attachEventListenersForMenu() {
      $("#ticket_datatables_wrapper [name='ticket_datatables_length']").on("change", (event) => {
        this.getLoader = true;
        const target = $(event.target);
        const getSelectedValue = target.val();
        this.getSupportTickets(1, getSelectedValue);
      });
    },
    attachEventListenersForSearch() {
      $("#ticket_datatables_wrapper #ticket_datatables_filter input").on("keyup", (event) => {
        const target = $(event.target);
        const getSearchValue = target.val();
        this.getSupportTickets(1, 10, getSearchValue);
      });
    },

    // attachEventListenersOfButton(){
    //   $("#ticket_datatables_wrapper").on("click", "button", (event) => {
    //     const target = $(event.target);
    //     const dataClass = target.attr("id");
    //     if (dataClass === "create") {
    //       this.$router.push("/admin-tickets-create");
    //     } 
    //   });
    // },

    //Ticket Delete
    deleteTicket() {
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
            .post(this.globalVariables.apiUrl + "admin/tickets/delete", this.ticketDelete, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((res) => {
              if (res.data.status == 'success') {
                toastr.success(res.data.message);
                this.getSupportTickets();
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
  },
};
</script>

<style>
#ticket_datatables colgroup:nth-of-type(2) {
  display: none !important;
}

#ticket_datatables .dt-checkboxes-cell {
  padding: 0.7rem 0.5rem !important;
}

.badge.bg-info-inverse {
  background-color: rgba(61, 155, 251, 0.1) !important;
  color: rgb(61, 155, 251) !important;
}

.badge.bg-warning-inverse {
  background-color: rgba(247, 187, 77, 0.1) !important;
  color: rgb(247, 187, 77) !important;
}

.badge.bg-danger-inverse {
  background-color: rgba(249, 97, 109, 0.1) !important;
  color: #f9616d !important;
}

#view-btn {
  border: none;
  background: #2ea33b;
  color: white;
}
</style>
