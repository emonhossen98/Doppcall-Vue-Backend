<template>
  <div v-if="getLoader">
    <Loader></Loader>
  </div>
  <!-- Content wrapper -->
  <div class="content-wrapper">
    <!-- Content -->
    <div class="container-fluid flex-grow-1 container-p-y">
      <div class="row g-4 mb-4">
        <div class="col-sm-6 col-xl-3">
          <div class="card">
            <div class="card-body">
              <div class="d-flex align-items-start justify-content-between">
                <div class="content-left">
                  <span>Admin Offers</span>
                  <div class="d-flex align-items-center my-2">
                    <h3 class="mb-0 me-2">{{ countendData.allOfferCount ?? "00" }}</h3>
                  </div>
                  <p class="mb-0">Total Offers</p>
                </div>
                <div class="avatar">
                  <span class="avatar-initial rounded bg-label-primary">
                    <i class="fa-brands fa-buffer ti-sm"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-xl-3">
          <div class="card">
            <div class="card-body">
              <div class="d-flex align-items-start justify-content-between">
                <div class="content-left">
                  <span>Admin Offers</span>
                  <div class="d-flex align-items-center my-2">
                    <h3 class="mb-0 me-2">
                      {{ countendData.pendingOfferCount ?? "00" }}
                    </h3>
                  </div>
                  <p class="mb-0">Pending Offers</p>
                </div>
                <div class="avatar">
                  <span class="avatar-initial rounded bg-label-danger">
                    <i class="fa-brands fa-buffer ti-sm"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-xl-3">
          <div class="card">
            <div class="card-body">
              <div class="d-flex align-items-start justify-content-between">
                <div class="content-left">
                  <span>Admin Offers</span>
                  <div class="d-flex align-items-center my-2">
                    <h3 class="mb-0 me-2">
                      {{ countendData.activeOfferCount ?? "00" }}
                    </h3>
                  </div>
                  <p class="mb-0">Active Offers</p>
                </div>
                <div class="avatar">
                  <span class="avatar-initial rounded bg-label-success">
                    <i class="fa-brands fa-buffer ti-sm"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-xl-3 pe-0">
          <div class="card">
            <div class="card-body">
              <div class="d-flex align-items-start justify-content-between">
                <div class="content-left">
                  <span>Admin Offers</span>
                  <div class="d-flex align-items-center my-2">
                    <h3 class="mb-0 me-2">
                      {{ countendData.resumeOfferCount ?? "00" }}
                    </h3>
                  </div>
                  <p class="mb-0">Resume Offers</p>
                </div>
                <div class="avatar">
                  <span class="avatar-initial rounded bg-label-info">
                    <i class="fa-brands fa-buffer ti-sm"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-12">
          <div class="card px-0">
            <div class="card-body">
              <table class="datatables-products table position-relative" id="offer_datatables">
                <thead class="border-top">
                  <tr>
                    <th></th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Featured</th>
                    <th>Country</th>
                    <th>Assign</th>
                    <th>Pay</th>
                    <th>Phone</th>
                    <th>Owner</th>
                    <th>Status</th>
                    <th>Category</th>
                    <th>Type</th>
                    <th>Created at</th>
                    <th>Call Type</th>
                    <th>Call Limit</th>
                    <th>Allow Trafic</th>
                    <th>Appeal Period</th>
                    <th>Offer Price</th>
                    <th>Promotion Types</th>
                    <th>Tools</th>
                    <th>Traffic Source</th>
                    <th>Trafics</th>
                    <th>Actions</th>
                  </tr>
                </thead>
              </table>
              <div id="externalFilters" v-if="showHiddenExternalFilter">
                <div>
                  <div class="row">
                    <div class="d-flex justify-content-between align-items-center border-bottom mb-2 pb-2">
                      <h5 class="mb-0">Apply Filter <template v-if="applyfillters.length > 0"><span class="badge bg-dark text-white">{{ applyfillters.length ?? 0 }}</span></template></h5>
                      <a class="clearallexternalfilter" @click="externalfilterreset()">Clear All</a>
                    </div>
                  </div>
                  <div class="row" id="externalFiltersWrapper">
                    <div class="col-md-5">
                      <ul class="px-0" id="offer-extra-filter">
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Name' ? 'check-active' : ''"
                            @click="clickFilters('name', 'search', 'Name')">Name
                          </a>
                          <template v-if="applyfillters.includes('Name')">
                            <span @click="removeSearch('Name','name','search')" id="remove-to-search-list">x</span>
                          </template>
                          </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Featured' ? 'check-active' : ''"
                            @click="clickFilters('featured', 'select', 'Featured')">Featured
                          </a>
                          <template v-if="applyfillters.includes('Featured')">
                            <span @click="removeSearch('Featured','featured','select')" id="remove-to-search-list">x</span>
                          </template>
                          </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Country' ? 'check-active' : ''"
                            @click="clickFilters('primary_country', 'select', 'Country')">Country
                          </a>
                          <template v-if="applyfillters.includes('Country')">
                            <span @click="removeSearch('Country','country','select')" id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <!-- <li><a :class="checkfilter.showcolumn == 'Assign' ? 'check-active' : ''"
                            @click="clickFilters('assign_user_id', 'Assign')">Assign</a></li> -->
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Pay' ? 'check-active' : ''"
                            @click="clickFilters('pay_out', 'search', 'Pay')">Pay
                          </a>
                          <template v-if="applyfillters.includes('Pay')">
                            <span  @click="removeSearch('Pay','pay','search')" id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Phone' ? 'check-active' : ''"
                            @click="clickFilters('phone_no', 'search', 'Phone')">Phone
                          </a>
                          <template v-if="applyfillters.includes('Phone')">
                            <span  @click="removeSearch('Phone','phone','select')" id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <!-- <li><a :class="checkfilter.showcolumn == 'Owner' ? 'check-active' : ''"
                            @click="clickFilters('owner', 'Owner')">Owner</a></li> -->
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Category' ? 'check-active' : ''"
                            @click="clickFilters('category', 'select', 'Category')">Category
                          </a>
                          <template v-if="applyfillters.includes('Category')">
                            <span  @click="removeSearch('Category','category','select')" id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Type' ? 'check-active' : ''"
                            @click="clickFilters('type', 'select', 'Type')">Type
                          </a>
                          <template v-if="applyfillters.includes('Type')">
                            <span  @click="removeSearch('Type','type','select')" id="remove-to-search-list">x</span>
                          </template>
                        </li>
                      </ul>
                    </div>
                    <div class="col-md-7">
                      <div v-if="checkfilter.showcolumn != null && checkfilter.showcolumn != ''">
                        <p>{{ checkfilter.showcolumn ?? '' }}</p>
                        <template v-if="checkfilter.showcolumn == 'Name' && checkfilter.types.includes('search')"> 
                          <div class="form-check">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['name']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['name']" type="checkbox" value="0" id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <template v-if="checkfilter.showcolumn == 'Featured' && checkfilter.types.includes('select')"> 
                          <div class="form-check">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['featured']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['featured']" type="checkbox" value="0" id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <template v-if="checkfilter.showcolumn == 'Country' && checkfilter.types.includes('select')"> 
                          <div class="form-check">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['country']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['country']" type="checkbox" value="0" id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <template v-if="checkfilter.showcolumn == 'Pay' && checkfilter.types.includes('search')"> 
                          <div class="form-check">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['pay']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['pay']" type="checkbox" value="0" id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <template v-if="checkfilter.showcolumn == 'Phone' && checkfilter.types.includes('search')"> 
                          <div class="form-check">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['phone']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['phone']" type="checkbox" value="0" id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <template v-if="checkfilter.showcolumn == 'Category' && checkfilter.types.includes('select')"> 
                          <div class="form-check">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['category']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['category']" type="checkbox" value="0" id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <template v-if="checkfilter.showcolumn == 'Type' && checkfilter.types.includes('select')"> 
                          <div class="form-check">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['type']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['type']" type="checkbox" value="0" id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <hr>
                        <div>
                          <p>Have value</p>
                          <div>
                            <template v-if="checkfilter.showcolumn == 'Name' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['name']"
                                class="form-control mb-2" id="filtertext" placeholder="Search here..">
                            </template>
                            <template  v-if="checkfilter.showcolumn == 'Featured' && checkfilter.types.includes('select')">
                              <div class="form-check">
                                <input @change="clickCheckboxFilters(checkfilter.showcolumn)"  v-model="checkfilter.selectedValues['featured']" class="form-check-input" type="checkbox" value="1" id="featured">
                                <label  class="form-check-label" for="featured">
                                  Yes
                                </label>
                              </div>
                              <div class="form-check">
                                <input @change="clickCheckboxFilters(checkfilter.showcolumn)"  v-model="checkfilter.selectedValues['featured']" class="form-check-input" type="checkbox" value="0" id="featuredno">
                                <label class="form-check-label" for="featuredno">
                                  No
                                </label>
                              </div>
                            </template>
                            <template  v-if="checkfilter.showcolumn == 'Country' && checkfilter.types.includes('select')">
                              <template v-for="(countryOffer,index) in OfferIndex.countryOffers" :key="index">
                                <template v-if="countryOffer.primary_country != null && countryOffer.primary_country != ''">
                                  <div class="form-check">
                                    <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['primary_country']" class="form-check-input" type="checkbox" :value="countryOffer.primary_country" :id="'countryOffer'+countryOffer.primary_country">
                                    <label class="form-check-label" :for="'countryOffer'+countryOffer.primary_country">
                                    {{ countryOffer.primary_country ?? '' }}
                                    </label>
                                  </div>
                                </template>
                              </template>
                            </template>
                            <template v-if="checkfilter.showcolumn == 'Pay' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['pay_out']"
                                class="form-control mb-2" id="filtertext" placeholder="Search here..">
                            </template>
                            <template v-if="checkfilter.showcolumn == 'Phone' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['phone_no']"
                                class="form-control mb-2" id="filtertext" placeholder="Search here..">
                            </template>
                            <template  v-if="checkfilter.showcolumn == 'Category' && checkfilter.types.includes('select')">
                              <template v-for="(category,index) in OfferIndex.categoryOffers" :key="index">
                                <div class="form-check">
                                  <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['category']" class="form-check-input" type="checkbox" :value="category.id" :id="'category'+category.id">
                                  <label class="form-check-label" :for="'category'+category.id">
                                    {{ category.name ?? '' }}
                                  </label>
                                </div>
                              </template>
                            </template>
                            <template v-if="checkfilter.showcolumn == 'Type' && checkfilter.types.includes('select')">
                              <template v-for="(offerType,index) in OfferIndex.offerTypes" :key="index">
                                <div class="form-check">
                                  <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['type']" class="form-check-input" type="checkbox" :value="offerType.id" :id="'offertype'+offerType.id">
                                  <label class="form-check-label" :for="'offertype'+offerType.id">
                                    {{ offerType.type ?? '' }}
                                  </label>
                                </div>
                              </template>
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
                      <button class="page-link" @click="getOfferData(currentPage - 1)" :disabled="currentPage === 1">
                        <i class="fa-solid fa-chevron-left"></i>
                      </button>
                    </li>
                    <!-- Page Numbers -->
                    <template v-for="page in paginationPages" :key="page">
                      <li class="paginate_button page-item" :class="{ active: page === currentPage }">
                        <button class="page-link" @click="getOfferData(page)">
                          {{ page }}
                        </button>
                      </li>
                    </template>
                    <!-- Next Button -->
                    <li class="paginate_button page-item next" :class="{ disabled: currentPage === lastPage }">
                      <button class="page-link" @click="getOfferData(currentPage + 1)"
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
import "easy-skeleton-loader-vue/styles.css";
import { SkeletonShape } from "easy-skeleton-loader-vue";
import SkeletonDataTables from "../../../../../../../preloader/dataTablesPreLoade.vue";

export default {
  setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
  props: ["OfferIndex"],
  components: {
    Loader,
    Breadcrumb,
    SkeletonShape,
    SkeletonDataTables,
  },
  data() {
    return {
      allOfffers: {},
      showFilter: false,
      breadcrumbs: [
        // { label: "Dashboard", url: "/dashboard" },
        // { label: "Offers", url: "" },
      ],
      getLoader: false,
      bulkactionids: {
        selectedIds: [],
        status: "",
      },
      getSkeletonLoader: false,
      changeStatus: {
        data: "",
        actionType: "",
      },
      deleteOffer: {
        data: "",
      },
      filtarData: {
        country: "",
        category: "",
        type: "",
        role_type: "publisher",
      },
      countendData: "",
      currentPage: 1,
      lastPage: 1,
      recordsTotal: 0,
      startPage: 0,
      endPage: 0,
      searchInputValue: "",
      showHiddenExternalFilter: false,
      checkfilter: {
        columns: ['name'],
        showcolumn: "Name",
        types : ['search'],
        role_type: "publisher",
        emptyValues : {
          name : [],
          featured : [],
          country : [],
          pay : [],
          phone : [],
          category : [],
          type : [],
        },
        notemptyValues : {
          name : [],
          featured : [],
          country : [],
          pay : [],
          phone : [],
          category : [],
          type : [],
        },
        searchValues : {
          name: [],
          pay_out: [],
          phone_no: [],
        },
        selectedValues: {
          primary_country: [],
          category: [],
          type: [],
          featured: [],
        },
      },
      applyfillters : [],
    };
  },
  async mounted() {
    try {
      // this.getSkeletonLoader = true; // Loader
      this.getLoader = true; // Loader
      const { role, isAuthorized } = await fetchUserRole();
      if (role == "Super" || role == "Admin") {
        this.getOfferData();
        this.$nextTick(() => {
          const dataTableWrapper = document.querySelectorAll(
            "#offer_datatables_wrapper .row.mx-2"
          );
          if (dataTableWrapper.length > 0) {
            dataTableWrapper[0].style.display = "none";
            dataTableWrapper[1].style.display = "none";
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
  watch: {
    getSkeletonLoader(newValue) {
      if (!newValue) {
        this.$nextTick(() => {
          this.getOfferData();
          this.$nextTick(() => {
            const dataTableWrapper = document.querySelectorAll(
              "#offer_datatables_wrapper .row.mx-2"
            );
            if (dataTableWrapper.length > 0) {
              dataTableWrapper[0].style.display = "none";
              dataTableWrapper[1].style.display = "none";
            }
          });
        });
      }
    },
  },
  methods: {
    getOfferData(page = 1, perPage = 20, searchValue = '') {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl + "admin/offers/get-data", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          params: { page: page, perPage: perPage, search: searchValue },
        })
        .then((res) => {
          this.countendData = res.data.data;
          const { data, current_page, last_page, recordsTotal } = res.data;
          this.currentPage = current_page;
          this.lastPage = last_page;
          this.recordsTotal = recordsTotal;

          this.startPage = (current_page - 1) * perPage + 1;
          this.endPage = Math.min(current_page * perPage, recordsTotal);

          // if ($.fn.DataTable.isDataTable("#offer_datatables")) {
          //   $("#offer_datatables").DataTable().destroy();
          // }
          if ($.fn.DataTable.isDataTable("#offer_datatables")) {
            const table = $("#offer_datatables").DataTable();
            table.clear();
            table.rows.add(res.data.getDatas ?? []);
            table.draw();
          } else {
            var table = $("#offer_datatables").DataTable({
              data: res.data.getDatas,
              columns: [
                {
                  data: "id",
                  className: 'dt-center select-checkbox',
                  orderable: false
                },
                { data: "id" },
                { data: "convart_offer_name" ?? '------' },
                { data: "convart_featured" },
                { data: "convart_primary_contry" ?? '------' },
                { data: "convart_assign_user" ?? '------' },
                {
                  data: "pay_out",
                  render: function (data, type, row) {
                    if (row.pay_out != null) {
                      return row.pay_out.slice(0, 5);
                    }
                    return "------";
                  },
                },
                {
                  data: "phone_no",
                  render: function (data, type, row) {
                    if (row.phone_no != null) {
                      return row.owner;
                    }
                    return "--------";
                  },
                },
                {
                  data: "owner",
                  render: function (data, type, row) {
                    if (row.owner != null) {
                      return row.owner.slice(0, 5);
                    }
                    return "--------";
                  },
                },
                { data: "convart_status" },
                {
                  data: "category",
                  render: function (data, type, row) {
                    if (row.category != null) {
                      return row.category.name;
                    }
                    return "--------";
                  },
                },
                {
                  data: "type",
                  render: function (data, type, row) {
                    if (row.type != null) {
                      return row.type.type;
                    }
                    return "--------";
                  },
                },
                {
                  data: "convart_create_at",
                  render: function (data, type, row) {
                    if (row.convart_create_at != null) {
                      return row.convart_create_at;
                    }
                    return "--------";
                  },
                },
                {
                  data: "call_type",
                  render: function (data, type, row) {
                    if (row.call_type != null) {
                      return row.call_type;
                    }
                    return "--------";
                  },
                },
                {
                  data: "call_limit",
                  render: function (data, type, row) {
                    if (row.call_limit != null) {
                      return row.call_limit;
                    }
                    return "--------";
                  },
                },
                {
                  data: "allow_trafic",
                  render: function (data, type, row) {
                    if (row.allow_trafic != null) {
                      return row.allow_trafic;
                    }
                    return "--------";
                  },
                },
                {
                  data: "appeal_period",
                  render: function (data, type, row) {
                    if (row.appeal_period != null) {
                      return row.appeal_period;
                    }
                    return "--------";
                  },
                },
                {
                  data: "offer_price",
                  render: function (data, type, row) {
                    if (row.offer_price != null) {
                      return row.offer_price;
                    }
                    return "--------";
                  },
                },
                {
                  data: "promotion_types",
                  render: function (data, type, row) {
                    if (row.promotion_types != null) {
                      return row.promotion_types;
                    }
                    return "--------";
                  },
                },
                {
                  data: "tools",
                  render: function (data, type, row) {
                    if (row.tools != null) {
                      return row.tools;
                    }
                    return "--------";
                  },
                },
                {
                  data: "traffic_source",
                  render: function (data, type, row) {
                    if (row.traffic_source != null) {
                      return row.traffic_source;
                    }
                    return "--------";
                  },
                },
                {
                  data: "trafics",
                  render: function (data, type, row) {
                    if (row.trafics != null) {
                      return row.trafics;
                    }
                    return "--------";
                  },
                },
                {
                  data: "updated_at",
                  className: 'dt-center',
                  orderable: false,
                  render: function (data, type, row) {
                    return row.convart_action;
                  },
                },
              ],
              initComplete: () => {
                $('#offer_datatables').wrap('<div class="commonDataTablesClass"></div>');
                const table = $("#offer_datatables").DataTable();
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

                const searchInput = $("#offer_datatables_filter input");
                searchInput.val(this.searchInputValue);
                if (this.searchInputValue != '') {
                  searchInput.focus();
                }

                searchInput.off().on("keyup", (e) => {
                  const searchTerm = e.target.value;
                  this.searchInputValue = searchTerm;
                  this.getOfferData(1, perPage, searchTerm);
                });

                $('<style>')
                  .prop('type', 'text/css')
                  .html(`
                    .select-checkbox .sorting_asc,
                    .select-checkbox .sorting_desc,
                    .select-checkbox .sorting {
                      display: none !important;
                    }
                  `)
                  .appendTo('head');
              },
              // createdRow: function (row, data, dataIndex) {
              //   const perPage = 10;
              //   const rowNumber = (dataIndex + 1) + (page - 1) * perPage;
              //   $('td:eq(1)', row).html(rowNumber);
              // },
              columnDefs: [
                {
                  targets: 0,
                  orderable: false,
                  className: 'select-checkbox',
                  checkboxes: {
                    selectAllRender: '<input type="checkbox" class="form-check-input ms-1">',
                  },
                  render: function (data, type, row) {
                    return `<input type="checkbox" class="dt-checkboxes form-check-input ms-1 row-checkbox" data-id="${row.id}">`;
                  },
                  searchable: false,
                },
                {
                  targets: 10,
                  visible: false,
                },
                {
                  targets: 11,
                  visible: false,
                },
                {
                  targets: 12,
                  visible: false,
                },
                {
                  targets: 13,
                  visible: false,
                },
                {
                  targets: 14,
                  visible: false,
                },
                {
                  targets: 15,
                  visible: false,
                },
                {
                  targets: 16,
                  visible: false,
                },
                {
                  targets: 17,
                  visible: false,
                },
                {
                  targets: 18,
                  visible: false,
                },
                {
                  targets: 19,
                  visible: false,
                },
                {
                  targets: 20,
                  visible: false,
                },
                {
                  targets: 21,
                  visible: false,
                },
                { targets: 22, orderable: false, className: 'dt-center' }
              ],
              orderCellsTop: true,
              order: [[1, "asc"]],
              dom:
                '<"row mx-2"' +
                '<"col-md-2"f>' +
                '<"col-md-10 dopp_tb d-flex justify-content-end align-items-center"l<"button-wrapper"B>>' +
                '<"col-md-3 d-none"p>>' +
                "t" +
                '<"row mx-2"' +
                '<"col-md-5 d-none"i>' +
                '<"col-md-7 d-none"p>>',
              displayLength: perPage,
              lengthMenu: [20, 50, 100, 200],
              language: {
                sLengthMenu: "_MENU_",
                search: "",
                searchPlaceholder: "Search Offer",
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
                        <option value="0">Bulk Pending</option>
                        <option value="1">Bulk Active</option>
                        <option value="2">Bulk Paused</option>
                        <option value="3">Bulk Resume</option>
                        <option value="4">Bulk Reject</option>
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
                      exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21] },
                    },
                    {
                      extend: "csv",
                      text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                      className: "dropdown-item",
                      exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21] },
                    },
                    {
                      extend: "excel",
                      text:
                        '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                      className: "dropdown-item",
                      exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21] },
                    },
                    {
                      extend: "pdf",
                      text:
                        '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                      className: "dropdown-item",
                      exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21] },
                    },
                    {
                      extend: "copy",
                      text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                      className: "dropdown-item",
                      exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21] },
                    },
                  ],
                },
                {
                  text:
                    '<span id="import"><i class="fa-solid fa-upload me-1"></i>Import</span>',
                  className: "create-new btn btn-primary me-3",
                  attr: { id: "import" },
                },
                {
                  text:
                    '<span id="create"><i class="ti ti-plus me-1 ti-xs"></i>Add Offer</span>',
                  className: "create-new btn btn-primary me-3",
                  attr: { id: "create" },
                },
                {
                  className: "create-new btn btn-primary me-3",
                  text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">ID</a></li><li><a class="dropdown-item" href="#" data-column="2">Name</a></li><li><a class="dropdown-item" href="#" data-column="3">Featured</a></li><li><a class="dropdown-item" href="#" data-column="4">Country</a></li><li><a class="dropdown-item" href="#" data-column="5">Assign</a></li><li><a class="dropdown-item" href="#" data-column="6">Pay</a></li><li><a class="dropdown-item" href="#" data-column="7">Phone</a></li><li><a class="dropdown-item" href="#" data-column="8">Owner</a></li><li><a class="dropdown-item" href="#" data-column="9">Status</a></li><li><a class="dropdown-item" href="#" data-column="10">Category</a></li><li><a class="dropdown-item" href="#" data-column="11">Type</a></li><li><a class="dropdown-item" href="#" data-column="12">Created at</a></li><li><a class="dropdown-item" href="#" data-column="13">Call Type</a></li><li><a class="dropdown-item" href="#" data-column="14">Call Limit</a></li><li><a class="dropdown-item" href="#" data-column="15">Allow Trafic</a></li><li><a class="dropdown-item" href="#" data-column="16">Appeal Period</a></li><li><a class="dropdown-item" href="#" data-column="17">Offer Price</a></li><li><a class="dropdown-item" href="#" data-column="18">Promotion Types</a></li><li><a class="dropdown-item" href="#" data-column="19">Tools</a></li><li><a class="dropdown-item" href="#" data-column="20">Traffic Source</a></li><li><a class="dropdown-item" href="#" data-column="21">Trafics</a></li><li><a class="dropdown-item" href="#" data-column="22">Actions</a></li></div></ul></div>',
                },
                {
                  text:
                    '<span id="all_filters"><i class="fa-solid fa-magnifying-glass me-1"></i>All Filters</span>',
                  className: "btn btn-primary",
                  attr: { id: "all_filters"},
                },
              ],
            });
          }
          this.getLoader = false;
        })
        .catch((error) => {
          this.getLoader = false;
        });
    },

    attachEventListenersForMenu() {
      $("#offer_datatables_wrapper [name='offer_datatables_length']").on("change", (event) => {
        this.getLoader = true;
        const target = $(event.target);
        const getSelectedValue = target.val();
        this.getOfferData(1, getSelectedValue);
      });
    },

    attachEventListenersForSearch() {
      $("#offer_datatables_wrapper #offer_datatables_filter input").on("keyup", (event) => {
        const target = $(event.target);
        const getSearchValue = target.val();
        this.getOfferData(1, 10, getSearchValue);
      });
    },

    externalfilterreset(){
      this.applyfillters = [],
      this.checkfilter.columns = ['name'],
      this.checkfilter.showcolumn = "Name",
      this.checkfilter.types = ['search'],
      this.checkfilter.role_type = "publisher",
      this.checkfilter.emptyValues = {
        name : [],
        featured : [],
        country : [],
        pay : [],
        phone : [],
        category : [],
        type : [],
      },

      this.checkfilter.notemptyValues = {
        name : [],
        featured : [],
        country : [],
        pay : [],
        phone : [],
        category : [],
        type : [],
      },
      this.checkfilter.searchValues = {
        name: [],
        pay_out: [],
        phone_no: [],
      },

      this.checkfilter.selectedValues = {
        primary_country: [],
        category: [],
        type: [],
        featured: [],
      },
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
          this.globalVariables.apiUrl + "admin/offers/search-get-data/all-filter",
          this.checkfilter,
          {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") }
          }
        )
        .then((res) => {
          const { data, current_page, last_page, recordsTotal } = res.data;
          this.currentPage = current_page;
          this.lastPage = last_page;
          this.recordsTotal = recordsTotal;

          this.startPage = (current_page - 1) * perPage + 1;
          this.endPage = Math.min(current_page * perPage, recordsTotal);

          // if ($.fn.DataTable.isDataTable("#offer_datatables")) {
          //   $("#offer_datatables").DataTable().destroy();
          // }

          if ($.fn.DataTable.isDataTable("#offer_datatables")) {
            const table = $("#offer_datatables").DataTable();
            table.clear();
            table.rows.add(res.data.getDatas ?? []);
            table.draw();
          } else {
            var table = $("#offer_datatables").DataTable({
              data: res.data.getDatas ?? [],
              columns: [
                {
                  data: "id",
                  className: 'dt-center select-checkbox',
                  orderable: false
                },
                { data: "id" },
                { data: "convart_offer_name" ?? '------' },
                { data: "convart_featured" },
                { data: "convart_primary_contry" ?? '------' },
                { data: "convart_assign_user" ?? '------' },
                {
                  data: "pay_out",
                  render: function (data, type, row) {
                    if (row.pay_out != null) {
                      return row.pay_out.slice(0, 5);
                    }
                    return "------";
                  },
                },
                {
                  data: "phone_no",
                  render: function (data, type, row) {
                    if (row.phone_no != null) {
                      return row.owner;
                    }
                    return "--------";
                  },
                },
                {
                  data: "owner",
                  render: function (data, type, row) {
                    if (row.owner != null) {
                      return row.owner.slice(0, 5);
                    }
                    return "--------";
                  },
                },
                { data: "convart_status" },
                {
                  data: "category",
                  render: function (data, type, row) {
                    if (row.category != null) {
                      return row.category.name;
                    }
                    return "--------";
                  },
                },
                {
                  data: "type",
                  render: function (data, type, row) {
                    if (row.type != null) {
                      return row.type.type;
                    }
                    return "--------";
                  },
                },
                {
                  data: "convart_create_at",
                  render: function (data, type, row) {
                    if (row.convart_create_at != null) {
                      return row.convart_create_at;
                    }
                    return "--------";
                  },
                },
                {
                  data: "call_type",
                  render: function (data, type, row) {
                    if (row.call_type != null) {
                      return row.call_type;
                    }
                    return "--------";
                  },
                },
                {
                  data: "call_limit",
                  render: function (data, type, row) {
                    if (row.call_limit != null) {
                      return row.call_limit;
                    }
                    return "--------";
                  },
                },
                {
                  data: "allow_trafic",
                  render: function (data, type, row) {
                    if (row.allow_trafic != null) {
                      return row.allow_trafic;
                    }
                    return "--------";
                  },
                },
                {
                  data: "appeal_period",
                  render: function (data, type, row) {
                    if (row.appeal_period != null) {
                      return row.appeal_period;
                    }
                    return "--------";
                  },
                },
                {
                  data: "offer_price",
                  render: function (data, type, row) {
                    if (row.offer_price != null) {
                      return row.offer_price;
                    }
                    return "--------";
                  },
                },
                {
                  data: "promotion_types",
                  render: function (data, type, row) {
                    if (row.promotion_types != null) {
                      return row.promotion_types;
                    }
                    return "--------";
                  },
                },
                {
                  data: "tools",
                  render: function (data, type, row) {
                    if (row.tools != null) {
                      return row.tools;
                    }
                    return "--------";
                  },
                },
                {
                  data: "traffic_source",
                  render: function (data, type, row) {
                    if (row.traffic_source != null) {
                      return row.traffic_source;
                    }
                    return "--------";
                  },
                },
                {
                  data: "trafics",
                  render: function (data, type, row) {
                    if (row.trafics != null) {
                      return row.trafics;
                    }
                    return "--------";
                  },
                },
                {
                  data: "updated_at",
                  className: 'dt-center',
                  orderable: false,
                  render: function (data, type, row) {
                    return row.convart_action;
                  },
                },
              ],
              initComplete: () => {
                $('#offer_datatables').wrap('<div class="commonDataTablesClass"></div>');
                const table = $("#offer_datatables").DataTable();
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

                const searchInput = $("#offer_datatables_filter input");
                searchInput.val(this.searchInputValue);
                if (this.searchInputValue != '') {
                  searchInput.focus();
                }

                searchInput.off().on("keyup", (e) => {
                  const searchTerm = e.target.value;
                  this.searchInputValue = searchTerm;
                  this.getOfferData(1, perPage, searchTerm);
                });

                $('<style>')
                  .prop('type', 'text/css')
                  .html(`
                    .select-checkbox .sorting_asc,
                    .select-checkbox .sorting_desc,
                    .select-checkbox .sorting {
                      display: none !important;
                    }
                  `)
                  .appendTo('head');
              },
              // createdRow: function (row, data, dataIndex) {
              //   const perPage = 10;
              //   const rowNumber = (dataIndex + 1) + (page - 1) * perPage;
              //   $('td:eq(1)', row).html(rowNumber);
              // },
              columnDefs: [
                {
                  targets: 0,
                  orderable: false,
                  className: 'select-checkbox',
                  checkboxes: {
                    selectAllRender: '<input type="checkbox" class="form-check-input ms-1">',
                  },
                  render: function (data, type, row) {
                    return `<input type="checkbox" class="dt-checkboxes form-check-input ms-1 row-checkbox" data-id="${row.id}">`;
                  },
                  searchable: false,
                },
                {
                  targets: 10,
                  visible: false,
                },
                {
                  targets: 11,
                  visible: false,
                },
                {
                  targets: 12,
                  visible: false,
                },
                {
                  targets: 13,
                  visible: false,
                },
                {
                  targets: 14,
                  visible: false,
                },
                {
                  targets: 15,
                  visible: false,
                },
                {
                  targets: 16,
                  visible: false,
                },
                {
                  targets: 17,
                  visible: false,
                },
                {
                  targets: 18,
                  visible: false,
                },
                {
                  targets: 19,
                  visible: false,
                },
                {
                  targets: 20,
                  visible: false,
                },
                {
                  targets: 21,
                  visible: false,
                },
                { targets: 22, orderable: false, className: 'dt-center' }
              ],
              orderCellsTop: true,
              order: [[1, "asc"]],
              dom:
                '<"row mx-2"' +
                '<"col-md-2"f>' +
                '<"col-md-10 dopp_tb d-flex justify-content-end align-items-center"l<"button-wrapper"B>>' +
                '<"col-md-3 d-none"p>>' +
                "t" +
                '<"row mx-2"' +
                '<"col-md-5 d-none"i>' +
                '<"col-md-7 d-none"p>>',
              displayLength: perPage,
              lengthMenu: [20, 50, 100, 200],
              language: {
                sLengthMenu: "_MENU_",
                search: "",
                searchPlaceholder: "Search Offer",
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
                        <option value="0">Bulk Pending</option>
                        <option value="1">Bulk Active</option>
                        <option value="2">Bulk Paused</option>
                        <option value="3">Bulk Resume</option>
                        <option value="4">Bulk Reject</option>
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
                      exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21] },
                    },
                    {
                      extend: "csv",
                      text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                      className: "dropdown-item",
                      exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21] },
                    },
                    {
                      extend: "excel",
                      text:
                        '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                      className: "dropdown-item",
                      exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21] },
                    },
                    {
                      extend: "pdf",
                      text:
                        '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                      className: "dropdown-item",
                      exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21] },
                    },
                    {
                      extend: "copy",
                      text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                      className: "dropdown-item",
                      exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21] },
                    },
                  ],
                },
                {
                  text:
                    '<span id="import"><i class="fa-solid fa-upload me-1"></i>Import</span>',
                  className: "create-new btn btn-primary me-3",
                  attr: { id: "import" },
                },
                {
                  text:
                    '<span id="create"><i class="ti ti-plus me-1 ti-xs"></i>Add Offer</span>',
                  className: "create-new btn btn-primary me-3",
                  attr: { id: "create" },
                },
                {
                  className: "create-new btn btn-primary me-3",
                  text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">ID</a></li><li><a class="dropdown-item" href="#" data-column="2">Name</a></li><li><a class="dropdown-item" href="#" data-column="3">Featured</a></li><li><a class="dropdown-item" href="#" data-column="4">Country</a></li><li><a class="dropdown-item" href="#" data-column="5">Assign</a></li><li><a class="dropdown-item" href="#" data-column="6">Pay</a></li><li><a class="dropdown-item" href="#" data-column="7">Phone</a></li><li><a class="dropdown-item" href="#" data-column="8">Owner</a></li><li><a class="dropdown-item" href="#" data-column="9">Status</a></li><li><a class="dropdown-item" href="#" data-column="10">Category</a></li><li><a class="dropdown-item" href="#" data-column="11">Type</a></li><li><a class="dropdown-item" href="#" data-column="12">Created at</a></li><li><a class="dropdown-item" href="#" data-column="13">Call Type</a></li><li><a class="dropdown-item" href="#" data-column="14">Call Limit</a></li><li><a class="dropdown-item" href="#" data-column="15">Allow Trafic</a></li><li><a class="dropdown-item" href="#" data-column="16">Appeal Period</a></li><li><a class="dropdown-item" href="#" data-column="17">Offer Price</a></li><li><a class="dropdown-item" href="#" data-column="18">Promotion Types</a></li><li><a class="dropdown-item" href="#" data-column="19">Tools</a></li><li><a class="dropdown-item" href="#" data-column="20">Traffic Source</a></li><li><a class="dropdown-item" href="#" data-column="21">Trafics</a></li><li><a class="dropdown-item" href="#" data-column="22">Actions</a></li></div></ul></div>',
                },
                {
                  text:
                    '<span id="all_filters"><i class="fa-solid fa-magnifying-glass me-1"></i>All Filters</span>',
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

    attachEventListeners() {
      $("#offer_datatables").on("click", ".offer-action", (event) => {
        const target = $(event.target);
        const dataId = target.data("id");
        const dataClass = target.data("action");
        if (dataClass === "approved-btn") {
          this.changeStatus.data = dataId;
          this.changeStatus.actionType = "approved";
          const alertTitle = "Offer Want to Approved";
          this.ActionMethod(alertTitle);
        } else if (dataClass === "pending-btn") {
          this.changeStatus.data = dataId;
          this.changeStatus.actionType = "pending";
          const alertTitle = "Offer Want to Pending";
          this.ActionMethod(alertTitle);
        } else if (dataClass === "resume-btn") {
          this.changeStatus.data = dataId;
          this.changeStatus.actionType = "resume";
          const alertTitle = "Offer Want to Resume";
          this.ActionMethod(alertTitle);
        } else if (dataClass === "pause-btn") {
          this.changeStatus.data = dataId;
          this.changeStatus.actionType = "pause";
          const alertTitle = "Offer Want to Pause";
          this.ActionMethod(alertTitle);
        } else if (dataClass === "delete-btn") {
          this.deleteOffer.data = dataId;
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
                  .post(
                    this.globalVariables.apiUrl + "admin/offers/delete",
                    this.deleteOffer,
                    {
                      headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                      },
                    }
                  )
                  .then((res) => {
                    if (res.data.status == "success") {
                      toastr.success(res.data.message);
                      this.getOfferData();
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
        } else if (dataClass === "duplicate-item") {
          this.getLoader = true;
          axios
            .get(this.globalVariables.apiUrl + `admin/offers/duplicatedata/${dataId}`, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((res) => {
              if (res?.data?.status == 'success') {
                toastr.success(res.data.message);
                this.$router.push("admin-offers-edit/" + res.data.id);
              } else {
                toastr.warning(res.data.message);
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

    attachEventListenersBlulkAction() {
      $('#offer_datatables').on('change', '.row-checkbox', (event) => {
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
      $('#offer_datatables thead').on('change', 'input[type="checkbox"]', (event) => {
        const isChecked = event.target.checked;
        $('#offer_datatables tbody .row-checkbox').each((index, checkbox) => {
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
            const alertTitle = "Offer Want to Approved";
            this.bulkStatusChange(alertTitle);
          } else if (action === "0") {
            this.bulkactionids.status = '0';
            const alertTitle = "Offer Want to Pending";
            this.bulkStatusChange(alertTitle);
          } else if (action === "3") {
            this.bulkactionids.status = '3';
            const alertTitle = "Offer Want to Resume";
            this.bulkStatusChange(alertTitle);
          } else if (action === "2") {
            this.bulkactionids.status = '2';
            const alertTitle = "Offer Want to Pause";
            this.bulkStatusChange(alertTitle);
          } else {
            this.bulkactionids.status = '4';
            const alertTitle = "Offer Want to Reject";
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

    attachEventListenersOfButton() {
      $("#offer_datatables_wrapper").on("click", "button", (event) => {
        const target = $(event.target);
        const dataClass = target.attr("id");
        if (dataClass === "create") {
          this.$router.push("/admin-offers/create");
        } else if (dataClass === "import") {
          this.$router.push("/admin-offers-import");
        }else if(dataClass == 'all_filters'){
          this.showHiddenExternalFilter = !this.showHiddenExternalFilter;
        }
      });
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
                this.globalVariables.apiUrl + "admin/offers/bulk/delete",
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
                  this.getOfferData();
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
                this.globalVariables.apiUrl + "admin/offers/status/bulk",
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
                  this.getOfferData();
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

    ActionMethod(alertTitle) {
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
                this.globalVariables.apiUrl + "admin/offers/status",
                this.changeStatus,
                {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }
              )
              .then((res) => {
                if (res.data.status == "success") {
                  toastr.success(res.data.message);
                  this.getOfferData();
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
.offer-view {
  border: none;
}

.create-campaign {
  border: none;
}
</style>
<style scoped>
#offer-filter-btn {
  padding-top: 0.7rem !important;
  padding-bottom: 0.7rem !important;
}

.filter-slide-enter-active,
.filter-slide-leave-active {
  transition: opacity 0.7s ease;
}

.filter-slide-enter,
.filter-slide-leave-to {
  transition: opacity 0.7s ease;
  opacity: 0;
}
</style>

<style>
#offer_datatables td {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;
}

#offer_datatables td:last-child {
  max-width: 250px !important;
}

.action-btn {
  width: 25px;
  height: 25px;
  text-align: center;
  line-height: 26px;
  border-radius: 50%;
  color: #fff;
  font-size: 12px;
}

.action-btn:hover {
  color: #fff;
}

/* .dataTables_length label select {
  border: 1px solid #e3e8f7;
  border-radius: 3px;
  appearance: none;
  font-weight: 400;
  line-height: 1.5;
  color: #4d5875;
  vertical-align: middle;
} */
input:focus {
  outline: 0;
  box-shadow: none;
}

.search-bar {
  width: 100% !important;
  height: 35px;
}

#admin_campaings .search-bar input {
  width: 100%;
  border: 1px solid #dddddd;
  padding: 3px 10px;
  border-radius: 3px 0 0 3px;
}

#admin_campaings .search-bar button {
  background: #045cd6;
  border: 1px solid #045cd6;
  color: #fff;
  padding: 0 10px;
  border-radius: 0 3px 3px 0;
}

button.btn-outline {
  border-radius: 4px !important;
  border: 1px solid #045cd6;
  color: #045cd6;
  font-weight: 600;
  font-size: 16px;
  padding: 12px 10px !important;
  transition: all 0.4s ease;
}

button.btn-outline:last-child {
  border-radius: 0 4px 0 0 !important;
  background: transparent;
}

button.btn-outline.active {
  color: #fff;
  background: #045cd6;
  border-radius: 4px !important;
  border: none;
  padding: 13px 0px !important;
}

.country-flag {
  width: 18px;
  margin-right: 5px;
}

.filter-btn {
  margin-top: 28px;
  height: 38px;
  font-size: 16px;
  font-weight: 500;
}

ul.filter-input-list li {
  margin-bottom: 15px;
  list-style: none;
}

ul.filter-input-list li:last-child {
  margin-bottom: 0;
}

.select2-container--default .select2-selection--multiple .select2-selection__choice {
  background: #0162e8 !important;
}

.select2-container--default .select2-selection--multiple .select2-selection__choice__remove {
  background: #0162e8 !important;
  opacity: 1 !important;
  top: 0 !important;
  left: 0 !important;
}

.select2-container--default .select2-selection--multiple .select2-selection__choice__remove:hover {
  color: #fff !important;
}

#filter-box {
  display: none;
}

ul.filter-input-list {
  width: 100%;
  height: 180px;
  overflow: auto;
  border: 1px solid #e7e5e5;
  padding: 15px !important;
}

/* #offer_datatables {
  min-height: 500px;
} */
#offer_datatables colgroup:nth-of-type(2) {
  display: none !important;
}

.sk-loader.skeleton .element {
  position: relative;
  background: var(--sk-primary-color);
  margin-block-end: unset !important;
  overflow: hidden;
}
</style>
