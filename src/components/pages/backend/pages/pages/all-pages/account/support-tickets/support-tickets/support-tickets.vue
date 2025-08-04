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
                <div class="px-3 py-2">
                    <h5 class="card-title mt-2 mb-0">
                        Support Tickets
                    </h5>
                </div>
                <div class="card-body">
                    <table class="align-middle mb-0 table table-hover" id="support_tickets_tables">
                        <thead>
                            <tr>
                                <!-- <th></th>	 -->
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
                                <th class="text-end">Action</th>
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
                                  @click="clickFilters('priority', 'select', 'Priority')">Priority <i class="fa-solid fa-caret-down"></i>
                                </a>
                                <template v-if="applyfillters.includes('Priority')">
                                  <span @click="removeSearch('Priority', 'priority', 'select')"
                                    id="remove-to-search-list">x</span>
                                </template>
                              </li>
                              <li class="position-relative">
                                <a :class="checkfilter.showcolumn == 'Subject' ? 'check-active' : ''"
                                  @click="clickFilters('subject_ticket_id', 'select', 'Subject')">Subject <i class="fa-solid fa-caret-down"></i>
                                </a>
                                <template v-if="applyfillters.includes('Subject')">
                                  <span @click="removeSearch('Subject', 'subject_ticket_id', 'select')"
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
                                  @click="clickFilters('open_date', 'search', 'Date')">Date
                                </a>
                                <template v-if="applyfillters.includes('Date')">
                                  <span @click="removeSearch('Date', 'open_date', 'search')" id="remove-to-search-list">x</span>
                                </template>
                              </li>
                              <li class="position-relative">
                                <a :class="checkfilter.showcolumn == 'Status' ? 'check-active' : ''"
                                  @click="clickFilters('status', 'select', 'Status')">Status <i class="fa-solid fa-caret-down"></i>
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
                              <template v-if="checkfilter.showcolumn == 'Priority' && checkfilter.types.includes('select')">
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
                              <template v-if="checkfilter.showcolumn == 'Subject' && checkfilter.types.includes('select')">
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.emptyValues['subject_ticket_id']" type="checkbox" value="1" id="isemptyvalue">
                                  <label class="form-check-label" for="isemptyvalue">
                                    is Empty
                                  </label>
                                </div>
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.notemptyValues['subject_ticket_id']" type="checkbox" value="0"
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
                                    v-model="checkfilter.emptyValues['open_date']" type="checkbox" value="1" id="isemptyvalue">
                                  <label class="form-check-label" for="isemptyvalue">
                                    is Empty
                                  </label>
                                </div>
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.notemptyValues['open_date']" type="checkbox" value="0"
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
                                  <template v-if="checkfilter.showcolumn == 'Ticket No' && checkfilter.types.includes('search')">
                                    <label for="filtertext">Contains</label>
                                    <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                      v-model="checkfilter.searchValues['ticket_no']" class="form-control mb-2"
                                      id="filtertext" placeholder="Search here..">
                                  </template>
                                  <template v-if="checkfilter.showcolumn == 'Priority' && checkfilter.types.includes('select')">
                                    <div class="form-check mb-2">
                                      <input @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                        v-model="checkfilter.selectedValues['priority']" class="form-check-input"
                                        type="checkbox" value="Low" id="dynamicidpriority0">
                                      <label class="form-check-label" for="dynamicidpriority0">
                                        Low
                                      </label>
                                    </div>
                                    <div class="form-check mb-2">
                                      <input @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                        v-model="checkfilter.selectedValues['priority']" class="form-check-input"
                                        type="checkbox" value="Medium" id="dynamicidpriority1">
                                      <label class="form-check-label" for="dynamicidpriority1">
                                        Medium
                                      </label>
                                    </div>
                                    <div class="form-check mb-2">
                                      <input @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                        v-model="checkfilter.selectedValues['priority']" class="form-check-input"
                                        type="checkbox" value="High" id="dynamicidpriority2">
                                      <label class="form-check-label" for="dynamicidpriority2">
                                        High
                                      </label>
                                    </div>
                                  </template>
                                  <template v-if="checkfilter.showcolumn == 'Subject' && checkfilter.types.includes('select')">
                                    <template v-if="subjects?.length > 0">
                                      <template v-for="(subject,index) in subjects" :key="index">
                                        <div class="form-check mb-2">
                                          <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['subject_ticket_id']" class="form-check-input" type="checkbox" :value="subject.id" :id="'dynamicid'+subject.id">
                                          <label class="form-check-label" :for="'dynamicid'+subject.id">
                                            {{ subject.name ?? '' }}
                                          </label>
                                        </div>
                                      </template>
                                    </template>
                                  </template>
                                  <template v-if="checkfilter.showcolumn == 'Buyer' && checkfilter.types.includes('search')">
                                    <label for="filtertext">Contains</label>
                                    <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                      v-model="checkfilter.searchValues['buyer']" class="form-control mb-2" id="filtertext"
                                      placeholder="Search here..">
                                  </template>
                                  <template v-if="checkfilter.showcolumn == 'Role' && checkfilter.types.includes('select')">
                                    <template v-if="roles?.length > 0">
                                    <template v-for="(role,index) in roles" :key="index">
                                      <div class="form-check mb-2">
                                        <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['role']" class="form-check-input" type="checkbox" :value="role.id" :id="'dynamicid'+role.id">
                                        <label class="form-check-label" :for="'dynamicid'+role.id">
                                          {{ role.secondary_name ?? '' }}
                                        </label>
                                      </div>
                                    </template>
                                  </template>
                                  </template>
                                  <template v-if="checkfilter.showcolumn == 'Date' && checkfilter.types.includes('search')">
                                    <label for="filtertext">Contains</label>
                                    <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                      v-model="checkfilter.searchValues['open_date']" class="form-control mb-2" id="filtertext"
                                      placeholder="Search here..">
                                  </template>
                                  <template v-if="checkfilter.showcolumn == 'Status' && checkfilter.types.includes('select')">
                                    <div class="form-check mb-2">
                                      <input @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                        v-model="checkfilter.selectedValues['status']" class="form-check-input"
                                        type="checkbox" value="Open" id="dynamicidstatus0">
                                      <label class="form-check-label" for="dynamicidstatus0">
                                        Open
                                      </label>
                                    </div>
                                    <div class="form-check mb-2">
                                      <input @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                        v-model="checkfilter.selectedValues['status']" class="form-check-input"
                                        type="checkbox" value="Close" id="dynamicidstatus1">
                                      <label class="form-check-label" for="dynamicidstatus1">
                                        Close
                                      </label>
                                    </div>
                                    <div class="form-check mb-2">
                                      <input @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                        v-model="checkfilter.selectedValues['status']" class="form-check-input"
                                        type="checkbox" value="Re-Open" id="dynamicidstatus2">
                                      <label class="form-check-label" for="dynamicidstatus2">
                                        Re-Open
                                      </label>
                                    </div>
                                  </template>
                                  <template v-if="checkfilter.showcolumn == 'Created At' && checkfilter.types.includes('search')">
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
import Loader from "../../../../../../include/loader.vue";
  import Breadcrumb from "../../../../../../include/breadcrumb.vue";
  import { inject } from "vue";
  import { fetchUserRoleAccountmanager } from "@/services/userServiceAccountmanager";
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
        { label: "Dashboard", url: "/account/dashboard" },
        { label: "Support Tickets", url: "" },
      ],  
      getLoader: false,
      showHiddenExternalFilter: false,
      checkfilter: {
        columns: ['ticket_no'],
        showcolumn: "Ticket No",
        types: ['search'],
        emptyValues: {
          ticket_no : [],
          priority : [],
          subject_ticket_id : [],
          buyer : [],
          role : [],
          open_date : [],
          status : [],
          created_at : [],
        },
        notemptyValues: {
          ticket_no : [],
          priority : [],
          subject_ticket_id : [],
          buyer : [],
          role : [],
          open_date : [],
          status : [],
          created_at : [],
        },
        searchValues: {
          ticket_no : [],
          buyer : [],
          open_date : [],
          created_at : [],
        },
        selectedValues: {
          priority : [],
          subject_ticket_id : [],
          role : [],
          status : [],
        },
      },
      applyfillters: [],
      subjects: [],
      roles: [],
    };
  },
  async mounted() { 
    try {
      const { role, isAuthorized } = await fetchUserRoleAccountmanager();
      if (role == 'Account manager') {
        this.getSupportTicketsData();
        this.$nextTick(() => {
            const dataTableWrapper = document.querySelectorAll('#support_tickets_tables_wrapper .row.mx-2');
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
    getSupportTicketsData() {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl+"account-manager/tickets/get-data", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          if ($.fn.DataTable.isDataTable('#support_tickets_tables')) {
              $('#support_tickets_tables').DataTable().destroy();
            }
            this.subjects = res.data.subjects;
            this.roles = res.data.roles;
            var formateDate = this.formatDates;
            var table = $('#support_tickets_tables').DataTable({
              data: res.data.tickets,
              columns: [
                // { data: 'id' },
                { data: 'id' },
                { data: 'id' },
                { data: "convart_ticket_no" },
                { data: "priority" },
                { data: "subject.name" },
                {
                  data: "user",
                  render: function (data, type, row) {
                    if (row.user.fname != null) {
                      return row.user.fname;
                    }
                    return "--------";
                  },
                },
                {
                    data : "convart_role.name",
                    render: function (data, type, full, meta) {
                    return '<span class="badge bg-primary text-white">'+full.convart_role.name+'</span>'
                  }
                },
                { data: "convart_date" },
                { data: "convart_status" },
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
                  data: null, 
                  title: 'Actions',
                  searchable: false,
                  orderable: false,
                  render: function (data, type, full, meta) {
                    return '<div class="subject_action d-flex align-items-center justify-content-end">' +
                      '<div class="support_action d-flex align-items-center"><button type="button" id="view-btn"  data-id='+full.ticket_no +' class="rounded-circle btn-style-info me-2"><i class="fas fa-eye fa-sm" id="view-btn" data-id='+full.ticket_no +'></i></button><button type="button" id="edit-btn" class="btn-style-edit me-2 d-flex  align-items-center" data-id='+full.id+'><i id="edit-btn" class="far fa-edit fa-sm" data-id='+full.id+'></i></button><button type="button" id="delete-btn"  data-id='+full.ticket_no +' class="rounded-circle btn-style-info me-2 border-0"><i class="fa-solid fa-trash fa-sm text-danger" id="delete-btn" data-id='+full.ticket_no +'></i></button></div>';
                  }
                }
              ],
              initComplete: () => {
                $('#support_tickets_tables').wrap('<div class="commonDataTablesClass"></div>');
                  const table = $("#support_tickets_tables").DataTable();
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
              columnDefs: [
                {
                  targets: 0,
                  orderable: false,
                  checkboxes: {
                    selectAllRender: '<input type="checkbox" class="form-check-input">'
                  },
                  render: function () {
                    return '<input type="checkbox" class="dt-checkboxes form-check-input">';
                  },
                  searchable: false
                },

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
                searchPlaceholder: 'Search Ticket',
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
                      exportOptions: { columns: [2, 3, 4, 5, 6, 7] }
                    },
                    {
                      extend: 'csv',
                      text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                      className: 'dropdown-item',
                      exportOptions: { columns: [2, 3, 4, 5, 6, 7] }
                    },
                    {
                      extend: 'excel',
                      text: '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                      className: 'dropdown-item',
                      exportOptions: { columns: [2, 3, 4, 5, 6, 7] }
                    },
                    {
                      extend: 'pdf',
                      text: '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                      className: 'dropdown-item',
                      exportOptions: { columns: [2, 3, 4, 5, 6, 7] }
                    },
                    {
                      extend: 'copy',
                      text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                      className: 'dropdown-item',
                      exportOptions: { columns: [2, 3, 4, 5, 6, 7] }
                    }
                  ]
                },
                {
                  className: "btn btn-primary me-2",
                  text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">Sl</a></li><li><a class="dropdown-item" href="#" data-column="2">Ticket No</a></li><li><a class="dropdown-item" href="#" data-column="3">Subject</a></li><li><a class="dropdown-item" href="#" data-column="4">Role</a></li><li><a class="dropdown-item" href="#" data-column="5">Date</a></li><li><a class="dropdown-item" href="#" data-column="6">Status</a></li><li><a class="dropdown-item" href="#" data-column="7">Created At</a></li><li><a class="dropdown-item" href="#" data-column="8">Action</a></li></div></ul></div>',
                },
                {
                  text:
                    '<span id="all_filters" class="all_filters"><i class="fa-solid fa-magnifying-glass me-1"></i>All Filters</span>',
                  className: "btn btn-primary",
                  attr: { id: "all_filters"},
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

    attachEventListenersOfButton(){
      $("#support_tickets_tables_wrapper").on("click", "button", (event) => {
        const target = $(event.target);
        const dataClass = target.attr("id");
        if(dataClass == 'all_filters'){
          this.showHiddenExternalFilter = !this.showHiddenExternalFilter;
        }
      });
    },

    externalfilterreset(){
      this.checkfilter.columns = ['ticket_no'],
      this.checkfilter.showcolumn = "Ticket No",
      this.checkfilter.types = ['search'],
      this.checkfilter.emptyValues = {
          ticket_no : [],
          priority : [],
          subject_ticket_id : [],
          buyer : [],
          role : [],
          open_date : [],
          status : [],
          created_at : [],
      },
      this.checkfilter.notemptyValues = {
          ticket_no : [],
          priority : [],
          subject_ticket_id : [],
          buyer : [],
          role : [],
          open_date : [],
          status : [],
          created_at : [],
      },
      this.checkfilter.searchValues = {
          ticket_no : [],
          buyer : [],
          open_date : [],
          created_at : [],
      },
      this.checkfilter.selectedValues = {
          priority : [],
          subject_ticket_id : [],
          role : [],
          status : [],
      },
      this.checkfilter.applyfillters = [],
      this.showHiddenExternalFilter = !this.showHiddenExternalFilter;
      this.clickCheckboxFilters();
    },
        
    clickFilters(value,type, key) {
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
    
    getFiltarOfExtranalFilter(perPage = 10,) {
          axios
            .post(
              this.globalVariables.apiUrl + "account-manager/tickets/search-get-data-all-filter",
              this.checkfilter,
              {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") }
              }
            )
            .then((res) => {
              const { data, current_page, last_page,recordsTotal } = res.data;
              this.currentPage = current_page;
              this.lastPage = last_page;
              this.recordsTotal = recordsTotal;
              this.startPage = (current_page - 1) * perPage + 1;
              this.endPage = Math.min(current_page * perPage, recordsTotal);
    
              // if ($.fn.DataTable.isDataTable("#offer_datatables")) {
              //   $("#offer_datatables").DataTable().destroy();
              // }
    
              if ($.fn.DataTable.isDataTable("#support_tickets_tables")) {
                const table = $("#support_tickets_tables").DataTable();
                table.clear();
                table.rows.add(res.data.tickets ?? []);
                table.draw();
              } else {
                var formateDate = this.formatDates;
                var table = $('#support_tickets_tables').DataTable({
                  data: res.data.tickets,
                  columns: [
                    // { data: 'id' },
                    { data: 'id' },
                    { data: 'id' },
                    { data: "convart_ticket_no" },
                    { data: "priority" },
                    { data: "subject.name" },
                    {
                      data: "user",
                      render: function (data, type, row) {
                        if (row.user.fname != null) {
                          return row.user.fname;
                        }
                        return "--------";
                      },
                    },
                    {
                        data : "convart_role.name",
                        render: function (data, type, full, meta) {
                        return '<span class="badge bg-primary text-white">'+full.convart_role.name+'</span>'
                      }
                    },
                    { data: "convart_date" },
                    { data: "convart_status" },
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
                      data: null, 
                      title: 'Actions',
                      searchable: false,
                      orderable: false,
                      render: function (data, type, full, meta) {
                        return '<div class="subject_action d-flex align-items-center justify-content-end">' +
                          '<div class="support_action d-flex align-items-center"><button type="button" id="view-btn"  data-id='+full.ticket_no +' class="rounded-circle btn-style-info me-2"><i class="fas fa-eye fa-sm" id="view-btn" data-id='+full.ticket_no +'></i></button><button type="button" id="edit-btn" class="btn-style-edit me-2 d-flex  align-items-center" data-id='+full.id+'><i id="edit-btn" class="far fa-edit fa-sm" data-id='+full.id+'></i></button><button type="button" id="delete-btn"  data-id='+full.ticket_no +' class="rounded-circle btn-style-info me-2 border-0"><i class="fa-solid fa-trash fa-sm text-danger" id="delete-btn" data-id='+full.ticket_no +'></i></button></div>';
                      }
                    }
                  ],
                  initComplete: () => {
                    $('#support_tickets_tables').wrap('<div class="commonDataTablesClass"></div>');
                      const table = $("#support_tickets_tables").DataTable();
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
                  columnDefs: [
                    {
                      targets: 0,
                      orderable: false,
                      checkboxes: {
                        selectAllRender: '<input type="checkbox" class="form-check-input">'
                      },
                      render: function () {
                        return '<input type="checkbox" class="dt-checkboxes form-check-input">';
                      },
                      searchable: false
                    },

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
                    searchPlaceholder: 'Search Ticket',
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
                          exportOptions: { columns: [2, 3, 4, 5, 6, 7] }
                        },
                        {
                          extend: 'csv',
                          text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                          className: 'dropdown-item',
                          exportOptions: { columns: [2, 3, 4, 5, 6, 7] }
                        },
                        {
                          extend: 'excel',
                          text: '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                          className: 'dropdown-item',
                          exportOptions: { columns: [2, 3, 4, 5, 6, 7] }
                        },
                        {
                          extend: 'pdf',
                          text: '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                          className: 'dropdown-item',
                          exportOptions: { columns: [2, 3, 4, 5, 6, 7] }
                        },
                        {
                          extend: 'copy',
                          text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                          className: 'dropdown-item',
                          exportOptions: { columns: [2, 3, 4, 5, 6, 7] }
                        }
                      ]
                    },
                    {
                      className: "btn btn-primary me-2",
                      text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">Sl</a></li><li><a class="dropdown-item" href="#" data-column="2">Ticket No</a></li><li><a class="dropdown-item" href="#" data-column="3">Subject</a></li><li><a class="dropdown-item" href="#" data-column="4">Role</a></li><li><a class="dropdown-item" href="#" data-column="5">Date</a></li><li><a class="dropdown-item" href="#" data-column="6">Status</a></li><li><a class="dropdown-item" href="#" data-column="7">Created At</a></li><li><a class="dropdown-item" href="#" data-column="8">Action</a></li></div></ul></div>',
                    },
                    {
                      text:
                        '<span id="all_filters" class="all_filters"><i class="fa-solid fa-magnifying-glass me-1"></i>All Filters</span>',
                      className: "btn btn-primary",
                      attr: { id: "all_filters"},
                    },
                  ],
                });
              };
              this.getLoader = false;
            })
            .catch((error) => {
              console.error(error);
            })
            .finally(() => {
              // this.getSkeletonLoader = false;
              this.getLoader = false;
    });
    },

    formatDates(date) {
      return moment(date).format('D MMMM YYYY');
    },

    attachEventListeners() {
      $("#support_tickets_tables").on("click", ".support_action", (event) => {
        const target = $(event.target);
        const dataId = target.data("id");
        const dataClass = target.attr("id");
        if(dataClass === 'view-btn'){
         this.$router.push('/account-tickets-view/'+dataId);
        }else if(dataClass === 'edit-btn'){
          this.$router.push('/account-tickets-edit/'+dataId);
        }else if(dataClass === 'delete-btn'){
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
                .get(
                  this.globalVariables.apiUrl+`account-manager/tickets/delete/${dataId}`,
                  {
                    headers: {
                      Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                  }
                )
                .then((res) => {
                  toastr.success(res.data.message);
                  this.getSupportTicketsData();
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
  },
};
</script>

<style>
#support_tickets_tables colgroup:nth-of-type(2) {
	display: none !important;
}
.badge-info-inverse {
	background-color: rgba(61, 155, 251, 0.1);
	color: rgb(61, 155, 251) !important;
}
.badge-warning-inverse {
	background-color: rgba(247, 187, 77, 0.1);
	color: rgb(247, 187, 77) !important;
}
.badge-danger-inverse {
	background-color: rgba(249, 97, 109, 0.1);
	color: #f9616d !important;
}
#view-btn{
	border: none;
	background: #2ea33b;
	color: white;
}
</style>
