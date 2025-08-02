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
                Campaigns
              </h5>
            </div>
            <div class="card-body">
              <div class="table-responsive-sm table-overflow-hidden">
                <table class="align-middle mb-0 table table-hover" id="publishers_tables">
                  <thead>
                    <tr>
                      <!-- <th></th> -->
                      <th></th>
                      <th>Offer</th>
                      <th>Campaign Name</th>
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
                            <a :class="checkfilter.showcolumn == 'Offer' ? 'check-active' : ''"
                              @click="clickFilters('offer', 'search', 'Offer')">Offer
                            </a>
                            <template v-if="applyfillters.includes('Offer')">
                              <span @click="removeSearch('Offer', 'offer', 'search')"
                                id="remove-to-search-list">x</span>
                            </template>
                          </li>

                          <li class="position-relative">
                            <a :class="checkfilter.showcolumn == 'Campaign Name' ? 'check-active' : ''"
                              @click="clickFilters('campaign_name', 'search', 'Campaign Name')">Campaign Name
                            </a>
                            <template v-if="applyfillters.includes('Campaign Name')">
                              <span @click="removeSearch('Campaign Name', 'campaign_name', 'search')"
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
                          <template v-if="checkfilter.showcolumn == 'Offer' && checkfilter.types.includes('search')">
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.emptyValues['offer']" type="checkbox" value="1" id="isemptyvalue">
                              <label class="form-check-label" for="isemptyvalue">
                                is Empty
                              </label>
                            </div>
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.notemptyValues['offer']" type="checkbox" value="0"
                                id="isnotemptyvalue">
                              <label class="form-check-label" for="isnotemptyvalue">
                                is not Empty
                              </label>
                            </div>
                          </template>

                           <template v-if="checkfilter.showcolumn == 'Campaign Name' && checkfilter.types.includes('search')">
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.emptyValues['campaign_name']" type="checkbox" value="1" id="isemptyvalue">
                              <label class="form-check-label" for="isemptyvalue">
                                is Empty
                              </label>
                            </div>
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.notemptyValues['campaign_name']" type="checkbox" value="0"
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


                          <div>
                            <p>Have value</p>
                            <div>
                              <template
                                v-if="checkfilter.showcolumn == 'Offer' && checkfilter.types.includes('search')">
                                <label for="filtertext">Contains</label>
                                <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                  v-model="checkfilter.searchValues['offer']" class="form-control mb-2" id="filtertext"
                                  placeholder="Search here..">
                              </template>

                              <template
                                v-if="checkfilter.showcolumn == 'Campaign Name' && checkfilter.types.includes('search')">
                                <label for="filtertext">Contains</label>
                                <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                  v-model="checkfilter.searchValues['campaign_name']" class="form-control mb-2"
                                  id="filtertext" placeholder="Search here..">
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
        { label: "Campaigns", url: "" },
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
        columns: ['offer'],
        showcolumn: "Offer",
        types: ['search'],
        emptyValues: {
          offer: [],
          campaign_name: [],
          status: [],
        },
        notemptyValues: {
          offer: [],
          campaign_name: [],
          status: [],
        },
        searchValues: {
          offer: [],
          campaign_name: [],
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
        .get(this.globalVariables.apiUrl + "account-manager/campaigns/get-data", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          if ($.fn.DataTable.isDataTable("#publishers_tables")) {
            $('#publishers_tables').DataTable().destroy();
          }
          console.log(res.data)
          var table = $('#publishers_tables').DataTable({
            data: res.data,
            columns: [
              { data: "id" },
              { data: "convart_campign_name" },
              { data: "name" },
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
              searchPlaceholder: 'Search Advertiser',
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
                    exportOptions: { columns: [1, 2, 3] }
                  },
                  {
                    extend: 'csv',
                    text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                    className: 'dropdown-item',
                    exportOptions: { columns: [1, 2, 3] }
                  },
                  {
                    extend: 'excel',
                    text: '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                    className: 'dropdown-item',
                    exportOptions: { columns: [1, 2, 3] }
                  },
                  {
                    extend: 'pdf',
                    text: '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                    className: 'dropdown-item',
                    exportOptions: { columns: [1, 2, 3] }
                  },
                  {
                    extend: 'copy',
                    text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                    className: 'dropdown-item',
                    exportOptions: { columns: [1, 2, 3] }
                  }
                ]
              },
              {
                className: "btn btn-primary me-2",
                text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">Offer</a></li><li><a class="dropdown-item" href="#" data-column="2">Campaign Name</a></li><li><a class="dropdown-item" href="#" data-column="3">Status</a></li><li><a class="dropdown-item" href="#" data-column="4">Action</a></li></div></ul></div>',
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
      this.checkfilter.columns = ['offer'],
        this.checkfilter.showcolumn = "Offer",
        this.checkfilter.types = ['search'],
        this.checkfilter.emptyValues = {
          offer: [],
          campaign_name: [],
          status: [],
        },
        this.checkfilter.notemptyValues = {
          offer: [],
          campaign_name: [],
          status: [],
        },
        this.checkfilter.searchValues = {
          offer: [],
          campaign_name: [],
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
        if (dataClass === "dropdown-item publisher-view align-items-center") {
          this.$router.push('/account-campaigns-view/' + dataId);
        } else if (dataClass === "dropdown-item publisher-edit align-items-center") {
          this.$router.push('/account-campaigns-edit/' + dataId);
        }
      });
    },
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

.country-flagofPhonecampagin {
  width: 7%;
}
</style>