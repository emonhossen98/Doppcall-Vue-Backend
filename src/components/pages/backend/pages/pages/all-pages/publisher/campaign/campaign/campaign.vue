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
              <h5 class="card-title mt-2 mb-0">
                Campaigns
              </h5>
            </div>
            <div class="card-body">
              <table class="table mb-0" id="campaign_datatables">
                <thead>
                  <tr>
                    <!-- <th></th> -->
                    <th></th>
                    <th>SL</th>
                    <th>Campaign Name</th>
                    <th>Offer</th>
                    <th>Number</th>
                    <th>Trafic Source</th>
                    <th>Status</th>
                    <th>Approve date</th>
                    <th>Action</th>
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
                            <span @click="removeSearch('Name', 'name', 'search')"
                              id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Offer' ? 'check-active' : ''"
                            @click="clickFilters('offer_name', 'search', 'Offer')">Offer 
                          </a>
                          <template v-if="applyfillters.includes('Offer')">
                            <span @click="removeSearch('Offer', 'offer_name', 'select')"
                              id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Phone' ? 'check-active' : ''"
                            @click="clickFilters('phone_number', 'search', 'Phone')">Phone 
                          </a>
                          <template v-if="applyfillters.includes('Phone')">
                            <span @click="removeSearch('Phone', 'phone_number', 'search')"
                              id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Trafic Source' ? 'check-active' : ''"
                            @click="clickFilters('trafic_source', 'search', 'Trafic Source')">Trafic Source
                          </a>
                          <template v-if="applyfillters.includes('Trafic Source')">
                            <span @click="removeSearch('Trafic Source', 'trafic_source', 'search')"
                              id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Status' ? 'check-active' : ''"
                            @click="clickFilters('status', 'select', 'Status')">Status <i class="fa-solid fa-caret-down"></i>
                          </a>
                          <template v-if="applyfillters.includes('Status')">
                            <span @click="removeSearch('Status', 'status', 'select')"
                              id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Approve Reject Date' ? 'check-active' : ''"
                            @click="clickFilters('approve_or_reject_date', 'search', 'Approve Reject Date')">Approve Reject Date
                          </a>
                          <template v-if="applyfillters.includes('Approve Reject Date')">
                            <span @click="removeSearch('Approve Reject Date', 'approve_or_reject_date', 'search')"
                              id="remove-to-search-list">x</span>
                          </template>
                        </li>
                      </ul>
                    </div>
                    <div class="col-md-6 ps-4">
                      <div v-if="checkfilter.showcolumn != null && checkfilter.showcolumn != ''">
                        <p class="mt-3 mb-1 font-class">{{ checkfilter.showcolumn ?? '' }}</p>
                        <template v-if="checkfilter.showcolumn == 'Offer' && checkfilter.types.includes('search')">
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.emptyValues['offer_name']" type="checkbox" value="1"
                              id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['offer_name']" type="checkbox" value="0"
                              id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <template v-if="checkfilter.showcolumn == 'Name' && checkfilter.types.includes('search')">
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.emptyValues['name']" type="checkbox" value="1"
                              id="isemptyvalue">
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
                        <template v-if="checkfilter.showcolumn == 'Phone' && checkfilter.types.includes('search')">
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.emptyValues['phone_number']" type="checkbox" value="1"
                              id="isemptyvalue">
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
                        <template v-if="checkfilter.showcolumn == 'Trafic Source' && checkfilter.types.includes('search')">
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.emptyValues['trafic_source']" type="checkbox" value="1"
                              id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['trafic_source']" type="checkbox" value="0"
                              id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <template v-if="checkfilter.showcolumn == 'Status' && checkfilter.types.includes('search')">
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.emptyValues['status']" type="checkbox" value="1"
                              id="isemptyvalue">
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
                        <template v-if="checkfilter.showcolumn == 'Approve Reject Date' && checkfilter.types.includes('search')">
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.emptyValues['approve_or_reject_date']" type="checkbox" value="1"
                              id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['approve_or_reject_date']" type="checkbox" value="0"
                              id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <div>
                          <p>Have value</p>
                          <div>
                            <template v-if="checkfilter.showcolumn == 'Offer' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.searchValues['offer_name']" class="form-control mb-2"
                                id="filtertext" placeholder="Search here..">
                            </template>
                            <template v-if="checkfilter.showcolumn == 'Name' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.searchValues['name']" class="form-control mb-2"
                                id="filtertext" placeholder="Search here..">
                            </template>
                            <template v-if="checkfilter.showcolumn == 'Phone' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.searchValues['phone_number']" class="form-control mb-2"
                                id="filtertext" placeholder="Search here..">
                            </template>
                            <template v-if="checkfilter.showcolumn == 'Trafic Source' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.searchValues['trafic_source']" class="form-control mb-2"
                                id="filtertext" placeholder="Search here..">
                            </template>
                            <template v-if="checkfilter.showcolumn == 'Status' && checkfilter.types.includes('select')">
                              <div class="form-check mb-2">
                                  <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['account_access']" class="form-check-input" type="checkbox" value="0" id="dynamicidstatus0">
                                  <label class="form-check-label" for="dynamicidstatus0">
                                    Pending
                                  </label>
                                </div>
                                <div class="form-check mb-2">
                                  <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['account_access']" class="form-check-input" type="checkbox" value="1" id="dynamicidstatus1">
                                  <label class="form-check-label" for="dynamicidstatus1">
                                    Approved
                                  </label>
                                </div>
                                <div class="form-check mb-2">
                                  <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['account_access']" class="form-check-input" type="checkbox" value="2" id="dynamicidstatus2">
                                  <label class="form-check-label" for="dynamicidstatus2">
                                    Paused
                                  </label>
                                </div>
                                <div class="form-check mb-2">
                                  <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['account_access']" class="form-check-input" type="checkbox" value="3" id="dynamicidstatus3">
                                  <label class="form-check-label" for="dynamicidstatus3">
                                    Rejected
                                  </label>
                                </div>
                                <div class="form-check mb-2">
                                  <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['account_access']" class="form-check-input" type="checkbox" value="4" id="dynamicidstatus4">
                                  <label class="form-check-label" for="dynamicidstatus4">
                                    Resume
                                  </label>
                                </div>
                            </template>
                            <template v-if="checkfilter.showcolumn == 'Approve Reject Date' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.searchValues['approve_or_reject_date']" class="form-control mb-2"
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
import { fetchUserRolePublisher } from "@/services/userServicePublisher";

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
        { label: "Dashboard", url: "/publisher/dashboard" },
        { label: "Campaigns", url: "" },
      ],
      getLoader: false,
      campaignDelete : {
        data : "",
      },
      bulkactionids : {
        selectedIds: [],
      },
      showHiddenExternalFilter: false,
      checkfilter: {
      columns: ['name'],
      showcolumn: "Name",
      types: ['search'],
      emptyValues: {
        name : [],
        offer_name : [],
        phone_number : [],
        trafic_source : [],
        status : [],
        approve_or_reject_date : [],
      },
      notemptyValues: {
        offer_name : [],
        name : [],
        phone_number : [],
        trafic_source : [],
        status : [],
        approve_or_reject_date : [],
      },
      searchValues: {
        offer_name : [],
        name : [],
        phone_number : [],
        trafic_source : [],
        approve_or_reject_date : [],
      },
      selectedValues: {
        status : [],
      },
    },
    applyfillters: [],
    };
  },
  async mounted() { 
    try {
      const { role, isAuthorized } = await fetchUserRolePublisher();
      if (role == 'Publisher') {
        this.getPusbliserCampaignData();
        this.$nextTick(() => {
          const dataTableWrapper = document.querySelectorAll('#campaign_datatables_wrapper .row.mx-2');
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
    getPusbliserCampaignData() {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl+"publisher/offer/campaign", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          if ($.fn.DataTable.isDataTable("#campaign_datatables")) {
            $('#campaign_datatables').DataTable().destroy();
          }
          console.log(res.data);
        var table = $('#campaign_datatables').DataTable({
          data: res.data.campaignDatas,
          columns: [
            // { data: 'id' },
            { data: 'id' },
            { data: 'id' },
            {
              data: "name",
              render: function (data, type, row) {
                if (row.name != null) {
                  return row.name.length > 20 
                    ? row.name.slice(0, 20) + '...'  
                    : row.name; 
                }
                return '----------';
              },
            },
            { data: 'convert_flag_icon' },
            {
              data: "phone_number",
              render: function (data, type, row) {
                if (row.phone_number != null) {
                  return row.phone_number; 
                }
                return '----------';
              },
            },
            {
              data: "trafic_source",
              render: function (data, type, row) {
                if (row.trafic_source != null) {
                  return row.trafic_source; 
                }
                return '----------';
              },
            },
            { data: 'convert_status' },
            { data: 'approve_or_reject_date' },
            { data: 'convert_action' },
          ],
          initComplete: () => {
            $('#campaign_datatables').wrap('<div class="commonDataTablesClass"></div>'); 
            const table = $("#campaign_datatables").DataTable();
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
            this.attachEventListenersOfButton();
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
            searchPlaceholder: 'Search Campaign',
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
                  exportOptions: { columns: [2, 3, 4, 5, 6] }
                },
                {
                  extend: 'csv',
                  text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                  className: 'dropdown-item',
                  exportOptions: { columns: [2, 3, 4, 5, 6] }
                },
                {
                  extend: 'excel',
                  text: '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                  className: 'dropdown-item',
                  exportOptions: { columns: [2, 3, 4, 5, 6] }
                },
                {
                  extend: 'pdf',
                  text: '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                  className: 'dropdown-item',
                  exportOptions: { columns: [2, 3, 4, 5, 6] }
                },
                {
                  extend: 'copy',
                  text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                  className: 'dropdown-item',
                  exportOptions: { columns: [2, 3, 4, 5, 6] }
                }
              ]
            },
            {
              className: "btn btn-primary  me-2",
              text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">Sl</a></li><li><a class="dropdown-item" href="#" data-column="2">Offer</a></li><li><a class="dropdown-item" href="#" data-column="3">Campaign</a></li><li><a class="dropdown-item" href="#" data-column="4">Number</a></li><li><a class="dropdown-item" href="#" data-column="5">Status</a></li><li><a class="dropdown-item" href="#" data-column="6">Approve date</a></li><li><a class="dropdown-item" href="#" data-column="7">Action</a></li></div></ul></div>',
            },
             {
              text:
                '<span id="all_filters" class="all_filters"><i class="fa-solid fa-magnifying-glass me-1"></i>All Filters</span>',
              className: "btn btn-primary",
              attr: { id: "all_filters"},
            },
          ],
        });
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    attachEventListenersOfButton(){
      $("#campaign_datatables_wrapper").on("click", "button", (event) => {
        const target = $(event.target);
        const dataClass = target.attr("id");
        if(dataClass == 'all_filters'){
          this.showHiddenExternalFilter = !this.showHiddenExternalFilter;
        }
      });
    },

    externalfilterreset(){
      this.checkfilter.columns = ['name'],
      this.checkfilter.showcolumn = "Name",
      this.checkfilter.types = ['search'],
      this.checkfilter.emptyValues = {
        offer_name : [],
        name : [],
        phone_number : [],
        trafic_source : [],
        status : [],
        approve_or_reject_date : [],
      },
      this.checkfilter.notemptyValues = {
        offer_name : [],
        name : [],
        phone_number : [],
        trafic_source : [],
        status : [],
        approve_or_reject_date : [],
      },
      this.checkfilter.searchValues = {
        offer_name : [],
        name : [],
        phone_number : [],
        trafic_source : [],
        approve_or_reject_date : [],
      },
      this.checkfilter.selectedValues = {
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
              this.globalVariables.apiUrl + `publisher/offer/campaign/search-get-data-all-filter`,
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
    
              if ($.fn.DataTable.isDataTable("#publisher_offers_datatables")) {
                const table = $("#publisher_offers_datatables").DataTable();
                table.clear();
                table.rows.add(res.data.getDatas ?? []);
                table.draw();
              } else {
                var formateDate = this.formatDates;
                var table = $('#publisher_offers_datatables').DataTable({
                  data: res.data.getDatas,
                  columns: [
                    // { data: 'id' },
                    { data: 'id' },
                    { data: 'convart_flag_image' },
                    { data: 'name' },
                    {
                      data: "category",
                      render: function (data, type, row) {
                        if (row?.category?.name != null) {
                          return row?.category?.name 
                        }
                        return '----------';
                      },
                    },
                    { data: 'offer_type_name' },
                    { data: 'pay_out' },
                    { data: 'convart_status' },
                    { data: "created_at",
                      render: function (data, type, row) {
                        if (row?.created_at != null && row?.created_at != "") {
                          return formateDate(row?.created_at);
                        }
                        return '----------';
                      },
                    },
                    {
                      data: "updated_at",
                      render: function (data, type, row) {
                        return (
                          '<div class="publisher_apply_action d-flex align-items-center"><button type="button" class="py-1 px-2 btn-md btn-primary border-0 rounded-1 me-2" id="apply" data-id=' +
                          row.id +
                          ">Apply</button></div>"
                        );
                      },
                    },
                    {
                      data: "updated_at",
                      render: function (data, type, row) {
                        return (
                          '<div class="publisher_details_action d-flex align-items-center"><a data-vue-route href="/publisher-create-view/'+row.id+'" title="View Details" class="btn-md btn-secondary border-0 rounded-1 me-2 py-1 px-2">View Details</a></div>'
                        );
                      },
                    },
                  ],
                  initComplete: () => {
                    $('#publisher_offers_datatables').wrap('<div class="commonDataTablesClass"></div>');
                    const table = $("#publisher_offers_datatables").DataTable();
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

                    this.attachEventListenersOfButton();
                    $('.select-colunm-position').on('click', function (e) {
                      e.stopPropagation();
                    });

                    $('.select-colunm-position .dropdown-item').on('click', function (e) {
                      e.stopPropagation();
                    });
                    this.attachEventListeners();
                  },
                  order: [[6, 'asc']],
                  dom: '<"row mx-2"' +
                    '<"col-md-4 ps-0"f>' + 
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
                      className: "btn btn-primary me-2",
                      text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">ID</a></li><li><a class="dropdown-item" href="#" data-column="1">Primary Country</a></li><li><a class="dropdown-item" href="#" data-column="2">Offer</a></li><li><a class="dropdown-item" href="#" data-column="3">Offer Type</a></li><li><a class="dropdown-item" href="#" data-column="4">Payout</a></li><li><a class="dropdown-item" href="#" data-column="5">Status</a></li><li><a class="dropdown-item" href="#" data-column="6">Apply</a></li><li><a class="dropdown-item" href="#" data-column="7">View</a></li></div></ul></div>',
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


    attachEventListenersBlulkAction() {
          $('#campaign_datatables').on('change', '.row-checkbox', (event) => {
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
          $('#campaign_datatables thead').on('change', 'input[type="checkbox"]', (event) => {
            const isChecked = event.target.checked;
            $('#campaign_datatables tbody .row-checkbox').each((index, checkbox) => {
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
                this.globalVariables.apiUrl + "publisher/offer/campaign/bulk/delete",
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
                  this.getPusbliserCampaignData();
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
      $("#campaign_datatables").on("click", ".publisher-campaign-action", (event) => {
        const target = $(event.target);
        const dataId = target.data("id");
        const dataClass = target.attr("id");
        if(dataClass === "campaign-delete"){
          this.campaignDelete.data = dataId;
          this.deleteCampaign();
        }
      });
    },

    // Questions Delete
    deleteCampaign(id) {
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
            .post(
              this.globalVariables.apiUrl+`publisher/offer/campaign/delete`,this.campaignDelete,
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
            )
            .then((res) => {
              if(res.data.status == 'success'){
                toastr.success(res.data.message);
                this.getPusbliserCampaignData();
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
#campaign_datatables colgroup:nth-of-type(2) {
	display: none !important;
}
#campaign_datatables .dt-checkboxes-cell {
	padding: 0.9rem 0.5rem !important;
}
.country-flag {
	width: 5%;
  margin-right : 6px;
}
#dropdownMenuButton {
	background: transparent;
}
</style>
