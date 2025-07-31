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
              <h5 class="card-title mb-0 mt-2">Contacts</h5>
            </div>
            <div class="card-body">
              <table class="aalign-middle mb-0 table table-hover" id="contact_datatables">
                <thead>
                  <!-- <th></th> -->
                  <th></th>
                  <th>ID</th>
                  <th>Full Name</th>
                  <th>Company Name</th>
                  <th>Buy calls (Advertiser or Publisher)</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Country</th>
                  <th>Created At</th>
                  <th>Action</th>
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
                            <a :class="checkfilter.showcolumn == 'Full Name' ? 'check-active' : ''"
                              @click="clickFilters('full_name', 'search', 'Full Name')">Full Name
                            </a>
                            <template v-if="applyfillters.includes('Full Name')">
                              <span @click="removeSearch('Full Name', 'full_name', 'search')"
                                id="remove-to-search-list">x</span>
                            </template>
                          </li>
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
                            <a :class="checkfilter.showcolumn == 'Buy Sell' ? 'check-active' : ''"
                              @click="clickFilters('buy_sell', 'search', 'Buy Sell')">Buy Sell
                            </a>
                            <template v-if="applyfillters.includes('Buy Sell')">
                              <span @click="removeSearch('Buy Sell', 'buy_sell', 'search')"
                                id="remove-to-search-list">x</span>
                            </template>
                          </li>
                          <li class="position-relative">
                            <a :class="checkfilter.showcolumn == 'Country' ? 'check-active' : ''"
                              @click="clickFilters('country', 'search', 'Country')">Country
                            </a>
                            <template v-if="applyfillters.includes('Country')">
                              <span @click="removeSearch('Country', 'country', 'search')"
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
                          <template v-if="checkfilter.showcolumn == 'Full Name' && checkfilter.types.includes('search')">
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.emptyValues['full_name']" type="checkbox" value="1"
                                id="isemptyvalue">
                              <label class="form-check-label" for="isemptyvalue">
                                is Empty
                              </label>
                            </div>
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.notemptyValues['full_name']" type="checkbox" value="0"
                                id="isnotemptyvalue">
                              <label class="form-check-label" for="isnotemptyvalue">
                                is not Empty
                              </label>
                            </div>
                          </template>
                          <template v-if="checkfilter.showcolumn == 'Company Name' && checkfilter.types.includes('search')">
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.emptyValues['company_name']" type="checkbox" value="1"
                                id="isemptyvalue">
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
                          <template v-if="checkfilter.showcolumn == 'Email' && checkfilter.types.includes('search')">
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.emptyValues['email']" type="checkbox" value="1"
                                id="isemptyvalue">
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
                          <template v-if="checkfilter.showcolumn == 'Buy Sell' && checkfilter.types.includes('search')">
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.emptyValues['buy_sell']" type="checkbox" value="1"
                                id="isemptyvalue">
                              <label class="form-check-label" for="isemptyvalue">
                                is Empty
                              </label>
                            </div>
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.notemptyValues['buy_sell']" type="checkbox" value="0"
                                id="isnotemptyvalue">
                              <label class="form-check-label" for="isnotemptyvalue">
                                is not Empty
                              </label>
                            </div>
                          </template>
                          <template v-if="checkfilter.showcolumn == 'Country' && checkfilter.types.includes('search')">
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.emptyValues['country']" type="checkbox" value="1"
                                id="isemptyvalue">
                              <label class="form-check-label" for="isemptyvalue">
                                is Empty
                              </label>
                            </div>
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.notemptyValues['country']" type="checkbox" value="0"
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
                              <template v-if="checkfilter.showcolumn == 'Full Name' && checkfilter.types.includes('search')">
                                <label for="filtertext">Contains</label>
                                <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                  v-model="checkfilter.searchValues['full_name']" class="form-control mb-2"
                                  id="filtertext" placeholder="Search here..">
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Company Name' && checkfilter.types.includes('search')">
                                <label for="filtertext">Contains</label>
                                <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                  v-model="checkfilter.searchValues['company_name']" class="form-control mb-2"
                                  id="filtertext" placeholder="Search here..">
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Email' && checkfilter.types.includes('search')">
                                <label for="filtertext">Contains</label>
                                <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                  v-model="checkfilter.searchValues['email']" class="form-control mb-2"
                                  id="filtertext" placeholder="Search here..">
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Phone Number' && checkfilter.types.includes('search')">
                                <label for="filtertext">Contains</label>
                                <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                  v-model="checkfilter.searchValues['phone_number']" class="form-control mb-2"
                                  id="filtertext" placeholder="Search here..">
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Buy Sell' && checkfilter.types.includes('search')">
                                <label for="filtertext">Contains</label>
                                <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                  v-model="checkfilter.searchValues['buy_sell']" class="form-control mb-2"
                                  id="filtertext" placeholder="Search here..">
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Country' && checkfilter.types.includes('search')">
                                <label for="filtertext">Contains</label>
                                <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                  v-model="checkfilter.searchValues['country']" class="form-control mb-2"
                                  id="filtertext" placeholder="Search here..">
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
              <div class="row justify-content-between align-items-center">
                <div class="col-md-3">
                  Showing {{ startPage }} to {{ endPage }} of {{ recordsTotal }} entries
                </div>
                <div class="pagination-controls col-md-9 d-flex justify-content-end align-items-center ">
                  <ul class="pagination mb-0">
                    <!-- Previous Button -->
                    <li class="paginate_button page-item previous" :class="{ disabled: currentPage === 1 }">
                      <button class="page-link" @click="getcontactData(currentPage - 1)" :disabled="currentPage === 1" >
                        <i class="fa-solid fa-chevron-left"></i>
                      </button>
                    </li>

                    <!-- Page Numbers -->
                    <template v-for="page in paginationPages" :key="page">
                      <li class="paginate_button page-item" :class="{ active: page === currentPage }">
                        <button class="page-link" @click="getcontactData(page)">
                          {{ page }}
                        </button>
                      </li>
                    </template>

                    <!-- Next Button -->
                    <li class="paginate_button page-item next" :class="{ disabled: currentPage === lastPage }">
                      <button  class="page-link" @click="getcontactData(currentPage + 1)" :disabled="currentPage === lastPage">
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

    <!-- Large Modal -->
    <div class="modal fade" id="contactInfoShow" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel3">
              Details : {{ modelTitle }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="card card-body border-0 p-0 table-responsive table-overflow-hidden">
              <table class="table table-sm table-hover table-bordered">
                <tr>
                  <td class="font-weight-bold">Company Name :</td>
                  <td id="company-name"></td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Full Name :</td>
                  <td id="full-name"></td>
                </tr>
                <tr>
                  <td class="font-weight-bold">E-mail :</td>
                  <td id="email"></td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Phone Number :</td>
                  <td id="phone-number"></td>
                </tr>
                <tr>
                  <td class="font-weight-bold" colspan="2">
                    Are You Looking To Buy Calls (Advertiser) or Sell Calls (Publisher)?
                  </td>
                </tr>
                <tr>
                  <td id="buy-sell" colspan="2"></td>
                </tr>
                <tr>
                  <td class="font-weight-bold" colspan="2">
                    Preferred Industry Verticals
                  </td>
                </tr>
                <tr>
                  <td id="preferred-vertical" colspan="2"></td>
                </tr>
                <tr>
                  <td class="font-weight-bold" colspan="2">How Did You Find Us :</td>
                </tr>
                <tr>
                  <td id="how-did-you" colspan="2"></td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Country :</td>
                  <td id="country"></td>
                </tr>
                <tr>
                  <td class="font-weight-bold" colspan="2">Description :</td>
                </tr>
                <tr>
                  <td id="description" class="ps-3" colspan="2"></td>
                </tr>
              </table>
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
  data: () => {
    return {
      breadcrumbs: [
        { label: "Dashboard", url: "/dashboard" },
        { label: "Contacts", url: "" },
      ],
      getLoader: false,
      contactDelete: {
        data: "",
      },
      showModal: false,
      contactView: {
        data: "",
      },
      modelTitle: "",
      currentPage: 1,
      lastPage: 1,
      recordsTotal : 0,
      startPage : 0,
      endPage : 0,
      searchInputValue : "",
      bulkactionids : {
        selectedIds: [],
      },
      showHiddenExternalFilter: false,
      checkfilter: {
        columns: ['full_name'],
        showcolumn: "Full Name",
        types: ['search'],
        emptyValues: {
          full_name   : [],
          company_name  : [],
          email : [],
          phone_number : [],
          buy_sell : [],
          country : [],
          created_at : [],
        },
        notemptyValues: {
          full_name   : [],
          company_name  : [],
          email : [],
          phone_number : [],
          buy_sell : [],
          country : [],
          created_at : [],
        },
        searchValues: {
          full_name   : [],
          company_name  : [],
          email : [],
          phone_number : [],
          buy_sell : [],
          country : [],
          created_at : [],
        },
        selectedValues: {
          status : [],
        },
      },
      applyfillters: [],
    };
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
  async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role == 'Super' || role == 'Admin') {
          this.getLoader = true;
          this.getcontactData();
          this.$nextTick(() => {
            const dataTableWrapper = document.querySelectorAll("#contact_datatables_wrapper .row.mx-2");
            if (dataTableWrapper.length > 0) {
              dataTableWrapper[0].style.display = "none";
              dataTableWrapper[1].style.display = "none";
            }
          });
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    },
  methods: {
    getcontactData(page = 1, perPage = 10,searchValue = '') {
      this.getLoader = true;
      axios
      .get(`${this.globalVariables.apiUrl}admin/contacts/get-data/two`, {
            headers: { Authorization: "Bearer " + localStorage.getItem("token"), },
            params: { page: page, perPage: perPage,search: searchValue},
        })
        .then((res) => {
          const { data, current_page, last_page,recordsTotal } = res.data;
          this.currentPage = current_page;
          this.lastPage = last_page;
          this.recordsTotal = recordsTotal;

          this.startPage = (current_page - 1) * perPage + 1;
          this.endPage = Math.min(current_page * perPage, recordsTotal);
          
          if ($.fn.DataTable.isDataTable("#contact_datatables")) {
            $("#contact_datatables").DataTable().destroy();
          }
          var formateDate = this.formatDates;
          var table = $("#contact_datatables").DataTable({
            data: data,
            columns: [
              // { data: 'id' },
              { data: "id" },
              { data: "id" },
              { data: "full_name",
                render: function (data, type, row) {
                if (row?.full_name != null) {
                  return '<span title="'+row?.full_name+'">'+row?.full_name+'</span>';
                }
                return '----------';
              },
               },
              { data: "company_name",
                render: function (data, type, row) {
                if (row?.company_name != null) {
                  return '<span title="'+row?.company_name+'">'+row?.company_name+'</span>';
                }
                return '----------';
              },
               },
              { data: "buy_sell",
                render: function (data, type, row) {
                if (row?.buy_sell != null) {
                  return '<span title="'+row?.buy_sell+'">'+row?.buy_sell+'</span>';
                }
                return '----------';
              },
               },
              { data: "email",
                render: function (data, type, row) {
                if (row?.email != null) {
                  return '<span title="'+row?.email+'">'+row?.email+'</span>';
                }
                return '----------';
              },
               },
              { data: "phone_number",
                render: function (data, type, row) {
                if (row?.phone_number != null) {
                  return '<span title="'+row?.phone_number+'">'+row?.phone_number+'</span>';
                }
                return '----------';
              },
               },
              { data: "country",
                render: function (data, type, row) {
                if (row?.country != null) {
                  return '<span title="'+row?.country+'">'+row?.country+'</span>';
                }
                return '----------';
              },
               },
              { data: "created_at",
                render: function (data, type, row) {
                if (row?.created_at != null) {
                  return formateDate(row.created_at);
                }
                return '----------';
              },
               },
              {
                data: "updated_at",
                render: function (data, type, full, meta) {
                  return (
                    '<div class="contact_action rounded-circle  d-flex"><button title="View" data-bs-toggle="modal" data-bs-target="#contactInfoShow" type="button" id="view-btn" class="bg-transparent border-0 text-info me-2" data-id=' +
                    full.id +
                    '><i id="view-btn" class="fas fa-eye fa-sm" data-id=' +
                    full.id +
                    '></i></button><button title="Delete" type="button" id="delete-btn"  data-id=' +
                    full.id +
                    ' class="bg-transparent border-0 text-danger"><i class="far fa-trash-alt fa-sm" id="delete-btn" data-id=' +
                    full.id +
                    "></i></button></div>"
                  );
                },
              },
            ],
            initComplete: () => {
              $('#contact_datatables').wrap('<div class="commonDataTablesClass"></div>');
              const table = $("#contact_datatables").DataTable();
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
              this.attachEventListenersForMenu();
              this.attachEventListenersForSearch();
              this.attachEventListenersOfButton();
              this.attachEventListenersBlulkAction();
              this.attachEventListenersBlulkActionSubmit();

              const searchInput = $("#contact_datatables_filter input");
              searchInput.val(this.searchInputValue);
              if(this.searchInputValue != ''){
                  searchInput.focus();
              }

              searchInput.off().on("keyup", (e) => {
                const searchTerm = e.target.value;
                this.searchInputValue = searchTerm;
                this.getcontactData(1, perPage, searchTerm);
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
              '<"col-md-5 d-none"i>' +
              '<"col-md-7 d-none"p>>',
            displayLength: perPage,
            lengthMenu: [10, 20, 50, 100, 200],
            language: {
              sLengthMenu: "_MENU_",
              search: "",
              searchPlaceholder: "Search Contact",
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
                    exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8] },
                  },
                  {
                    extend: "csv",
                    text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                    className: "dropdown-item",
                    exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8] },
                  },
                  {
                    extend: "excel",
                    text: '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                    className: "dropdown-item",
                    exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8] },
                  },
                  {
                    extend: "pdf",
                    text: '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                    className: "dropdown-item",
                    exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8] },
                  },
                  {
                    extend: "copy",
                    text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                    className: "dropdown-item",
                    exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8] },
                  },
                ],
              },
              {
                  className: "btn btn-primary me-2",
                  text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">ID</a></li><li><a class="dropdown-item" href="#" data-column="2">Full Name</a></li><li><a class="dropdown-item" href="#" data-column="3">Company Name</a></li><li><a class="dropdown-item" href="#" data-column="4">Buy calls (Advertiser or Publisher)</a></li><li><a class="dropdown-item" href="#" data-column="5">Email</a></li><li><a class="dropdown-item" href="#" data-column="6">Phone</a></li><li><a class="dropdown-item" href="#" data-column="7">Country</a></li><li><a class="dropdown-item" href="#" data-column="8">Action</a></li></div></ul></div>',
                },
                {
                  text:
                    '<span id="all_filters" class="all_filters"><i class="fa-solid fa-magnifying-glass me-1"></i>All Filters</span>',
                  className: "btn btn-primary",
                  attr: { id: "all_filters"},
                },
            ],
          });
          this.currentPage = current_page;
          this.lastPage = last_page;
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
      $("#contact_datatables_wrapper").on("click", "button", (event) => {
        const target = $(event.target);
        const dataClass = target.attr("id");
        if(dataClass == 'all_filters'){
          this.showHiddenExternalFilter = !this.showHiddenExternalFilter;
        }
      });
    },
    
    externalfilterreset(){
      this.checkfilter.columns = ['full_name'],
      this.checkfilter.showcolumn = "Full Name",
      this.checkfilter.types = ['search'],
      this.checkfilter.emptyValues = {
        full_name   : [],
        company_name  : [],
        email : [],
        phone_number : [],
        buy_sell : [],
        country : [],
        created_at : [],
      },
      this.checkfilter.notemptyValues = {
        full_name   : [],
        company_name  : [],
        email : [],
        phone_number : [],
        buy_sell : [],
        country : [],
        created_at : [],
      },
      this.checkfilter.searchValues = {
        full_name   : [],
        company_name  : [],
        email : [],
        phone_number : [],
        buy_sell : [],
        country : [],
        created_at : [],
      },
      this.checkfilter.selectedValues = {
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
              this.globalVariables.apiUrl + "admin/contacts/contact-search-get-data-all-filter",
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
    
              if ($.fn.DataTable.isDataTable("#contact_datatables")) {
                const table = $("#contact_datatables").DataTable();
                table.clear();
                table.rows.add(data ?? []);
                table.draw();
              } else {
               var formateDate = this.formatDates;
                var table = $("#contact_datatables").DataTable({
                  data: data,
                  columns: [
                    // { data: 'id' },
                    { data: "id" },
                    { data: "id" },
                    { data: "full_name",
                      render: function (data, type, row) {
                      if (row?.full_name != null) {
                        return '<span title="'+row?.full_name+'">'+row?.full_name+'</span>';
                      }
                      return '----------';
                    },
                    },
                    { data: "company_name",
                      render: function (data, type, row) {
                      if (row?.company_name != null) {
                        return '<span title="'+row?.company_name+'">'+row?.company_name+'</span>';
                      }
                      return '----------';
                    },
                    },
                    { data: "buy_sell",
                      render: function (data, type, row) {
                      if (row?.buy_sell != null) {
                        return '<span title="'+row?.buy_sell+'">'+row?.buy_sell+'</span>';
                      }
                      return '----------';
                    },
                    },
                    { data: "email",
                      render: function (data, type, row) {
                      if (row?.email != null) {
                        return '<span title="'+row?.email+'">'+row?.email+'</span>';
                      }
                      return '----------';
                    },
                    },
                    { data: "phone_number",
                      render: function (data, type, row) {
                      if (row?.phone_number != null) {
                        return '<span title="'+row?.phone_number+'">'+row?.phone_number+'</span>';
                      }
                      return '----------';
                    },
                    },
                    { data: "country",
                      render: function (data, type, row) {
                      if (row?.country != null) {
                        return '<span title="'+row?.country+'">'+row?.country+'</span>';
                      }
                      return '----------';
                    },
                    },
                    { data: "created_at",
                      render: function (data, type, row) {
                      if (row?.created_at != null) {
                        return formateDate(row.created_at);
                      }
                      return '----------';
                    },
                    },
                    {
                      data: "updated_at",
                      render: function (data, type, full, meta) {
                        return (
                          '<div class="contact_action rounded-circle  d-flex"><button title="View" data-bs-toggle="modal" data-bs-target="#contactInfoShow" type="button" id="view-btn" class="bg-transparent border-0 text-info me-2" data-id=' +
                          full.id +
                          '><i id="view-btn" class="fas fa-eye fa-sm" data-id=' +
                          full.id +
                          '></i></button><button title="Delete" type="button" id="delete-btn"  data-id=' +
                          full.id +
                          ' class="bg-transparent border-0 text-danger"><i class="far fa-trash-alt fa-sm" id="delete-btn" data-id=' +
                          full.id +
                          "></i></button></div>"
                        );
                      },
                    },
                  ],
                  initComplete: () => {
                    $('#contact_datatables').wrap('<div class="commonDataTablesClass"></div>');
                    const table = $("#contact_datatables").DataTable();
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
                    this.attachEventListenersForMenu();
                    this.attachEventListenersForSearch();
                    this.attachEventListenersOfButton();
                    this.attachEventListenersBlulkAction();
                    this.attachEventListenersBlulkActionSubmit();

                    const searchInput = $("#contact_datatables_filter input");
                    searchInput.val(this.searchInputValue);
                    if(this.searchInputValue != ''){
                        searchInput.focus();
                    }

                    searchInput.off().on("keyup", (e) => {
                      const searchTerm = e.target.value;
                      this.searchInputValue = searchTerm;
                      this.getcontactData(1, perPage, searchTerm);
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
                    '<"col-md-5 d-none"i>' +
                    '<"col-md-7 d-none"p>>',
                  displayLength: perPage,
                  lengthMenu: [10, 20, 50, 100, 200],
                  language: {
                    sLengthMenu: "_MENU_",
                    search: "",
                    searchPlaceholder: "Search Contact",
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
                          exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8] },
                        },
                        {
                          extend: "csv",
                          text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                          className: "dropdown-item",
                          exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8] },
                        },
                        {
                          extend: "excel",
                          text: '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                          className: "dropdown-item",
                          exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8] },
                        },
                        {
                          extend: "pdf",
                          text: '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                          className: "dropdown-item",
                          exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8] },
                        },
                        {
                          extend: "copy",
                          text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                          className: "dropdown-item",
                          exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8] },
                        },
                      ],
                    },
                    {
                        className: "btn btn-primary me-2",
                        text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">ID</a></li><li><a class="dropdown-item" href="#" data-column="2">Full Name</a></li><li><a class="dropdown-item" href="#" data-column="3">Company Name</a></li><li><a class="dropdown-item" href="#" data-column="4">Buy calls (Advertiser or Publisher)</a></li><li><a class="dropdown-item" href="#" data-column="5">Email</a></li><li><a class="dropdown-item" href="#" data-column="6">Phone</a></li><li><a class="dropdown-item" href="#" data-column="7">Country</a></li><li><a class="dropdown-item" href="#" data-column="8">Action</a></li></div></ul></div>',
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

    attachEventListenersBlulkAction() {
      $('#contact_datatables').on('change', '.row-checkbox', (event) => {
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
      $('#contact_datatables thead').on('change', 'input[type="checkbox"]', (event) => {
        const isChecked = event.target.checked;
        $('#contact_datatables tbody .row-checkbox').each((index, checkbox) => {
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
                this.globalVariables.apiUrl + "admin/contacts/get-data/two/bulk/delete",
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
                  this.getcontactData();
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
      $("#contact_datatables").on("click", ".contact_action", (event) => {
        const target = $(event.target);
        const dataId = target.data("id");
        const dataClass = target.attr("id");
        if (dataClass === "view-btn") {
          this.contactView.data = dataId;
          this.getLoader = true;
          axios
            .post(
              this.globalVariables.apiUrl + `admin/contacts/view-data`,
              this.contactView,
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
            )
            .then((res) => {
              this.modelTitle = res.data.company_name ?? "";
              document.querySelector("#company-name").innerHTML =
                res.data.company_name ?? "";
              document.querySelector("#full-name").innerHTML = res.data.full_name ?? "";
              document.querySelector("#email").innerHTML = res.data.email ?? "";
              document.querySelector("#phone-number").innerHTML =
                res.data.phone_number ?? "";
              document.querySelector("#buy-sell").innerHTML = res.data.buy_sell ?? "";
              document.querySelector("#preferred-vertical").innerHTML =
                res.data.preferred_verticals ?? "";
              document.querySelector("#how-did-you").innerHTML =
                res.data.how_did_find_us ?? "";
              document.querySelector("#country").innerHTML = res.data.country ?? "";
              document.querySelector("#description").innerHTML =
                res.data.description ?? "";
            })
            .catch((e) => {
              return e;
            })
            .finally(() => {
              this.getLoader = false;
            });
        } else if (dataClass === "delete-btn") {
          this.contactDelete.data = dataId;
          this.deleteContact();
        }
      });
    },
    attachEventListenersForMenu() {
      $("#contact_datatables_wrapper [name='contact_datatables_length']").on("change", (event) => {
        this.getLoader = true;
        const target = $(event.target);
        const getSelectedValue = target.val();
        this.getcontactData(1,getSelectedValue);
      });
    },
    attachEventListenersForSearch() {
      $("#contact_datatables_wrapper #contact_datatables_filter input").on("keyup", (event) => {
        const target = $(event.target);
        const getSearchValue = target.val();
        this.getcontactData(1,10,getSearchValue);
      });
    },

    deleteContact() {
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
              this.globalVariables.apiUrl + `admin/contacts/delete`,
              this.contactDelete,
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
            )
            .then((res) => {
              toastr.success(res.data.message);
              this.getcontactData();
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
#contact_datatables colgroup:nth-of-type(2) {
  display: none !important;
}
#contact_datatables .dt-checkboxes-cell {
  padding: 0.7rem 0.5rem !important;
}
#contact_datatables td {
  white-space: nowrap; /* Prevents wrapping */
  overflow: hidden; /* Hides overflow */
  text-overflow: ellipsis; /* Adds "..." for overflow */
  max-width: 100px; /* Set max width for cell */
}
</style>
<style scoped>
.modal-dialog {
  max-width: 800px !important;
  width: 100% !important;
}
.contact-modal {
  margin-top: 10rem !important;
}
.contact_action button {
  width: 32px !important;
  height: 31px !important;
}
</style>
