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
          <div class="card ">
            <div class="card-header pt-3 pb-0">
              <h5 class="card-title mb-0 ms-1">Campaigns</h5>
            </div>
            <div class="card-body">
              <table class="table mb-0" id="admin_campaign_datatables">
                <thead>
                  <tr>
                    <th></th>
                    <th>Campaign Name</th>
                    <th>Company Name</th>
                    <th>Person Name</th>
                    <th>Traffic Source</th>
                    <th>Offer Category</th>
                    <th>DID Number</th>
                    <th>Status</th>
                    <th>Date</th>
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
                      <h5 class="mb-0">Apply Filter <template v-if="applyfillters.length > 0"><span class="badge bg-dark text-white">{{ applyfillters.length ?? 0 }}</span></template></h5>
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
                            <span @click="removeSearch('Name','name','search')" id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Company Name' ? 'check-active' : ''"
                            @click="clickFilters('company_name', 'search', 'Company Name')">Company Name
                          </a>
                          <template v-if="applyfillters.includes('Company Name')">
                            <span @click="removeSearch('Company Name','company_name','search')" id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Created By' ? 'check-active' : ''"
                            @click="clickFilters('created_by', 'select', 'Created By')">Created By <i class="fa-solid fa-caret-down"></i>
                          </a>
                          <template v-if="applyfillters.includes('Created By')">
                            <span  @click="removeSearch('Created By','created_by','select')" id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Trafic Source' ? 'check-active' : ''"
                            @click="clickFilters('trafic_source', 'search', 'Trafic Source')">Trafic Source
                          </a>
                          <template v-if="applyfillters.includes('Trafic Source')">
                            <span  @click="removeSearch('Trafic Source','trafic_source','search')" id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Category' ? 'check-active' : ''"
                            @click="clickFilters('category', 'select', 'Category')">Category <i class="fa-solid fa-caret-down"></i>
                          </a>
                          <template v-if="applyfillters.includes('Category')">
                            <span  @click="removeSearch('Category','category','select')" id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'DID Number' ? 'check-active' : ''"
                            @click="clickFilters('phone_number', 'search', 'DID Number')">DID Number 
                          </a>
                          <template v-if="applyfillters.includes('DID Number')">
                            <span  @click="removeSearch('DID Number','phone_number','search')" id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Status' ? 'check-active' : ''"
                            @click="clickFilters('status', 'select', 'Status')">Status <i class="fa-solid fa-caret-down"></i>
                          </a>
                          <template v-if="applyfillters.includes('Status')">
                            <span  @click="removeSearch('Status','status','select')" id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Created At' ? 'check-active' : ''"
                            @click="clickFilters('created_at', 'search', 'Created At')">Created At 
                          </a>
                          <template v-if="applyfillters.includes('Created At')">
                            <span @click="removeSearch('Created At','created_at','search')" id="remove-to-search-list">x</span>
                          </template>
                        </li>
                      </ul>
                    </div>
                    <div class="col-md-6 ps-4">
                      <div v-if="checkfilter.showcolumn != null && checkfilter.showcolumn != ''">
                        <p class="mt-3 mb-1">{{ checkfilter.showcolumn ?? '' }}</p>
                        <template v-if="checkfilter.showcolumn == 'Name' && checkfilter.types.includes('search')"> 
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['name']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['name']" type="checkbox" value="0" id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <template v-if="checkfilter.showcolumn == 'Company Name' && checkfilter.types.includes('search')"> 
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['company_name']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['company_name']" type="checkbox" value="0" id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <template v-if="checkfilter.showcolumn == 'Created By' && checkfilter.types.includes('select')"> 
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['created_by']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['created_by']" type="checkbox" value="0" id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <template v-if="checkfilter.showcolumn == 'Trafic Source' && checkfilter.types.includes('search')"> 
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['trafic_source']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['trafic_source']" type="checkbox" value="0" id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <template v-if="checkfilter.showcolumn == 'Category' && checkfilter.types.includes('select')"> 
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['category']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['category']" type="checkbox" value="0" id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <template v-if="checkfilter.showcolumn == 'DID Number' && checkfilter.types.includes('search')"> 
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['phone_number']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['phone_number']" type="checkbox" value="0" id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <template v-if="checkfilter.showcolumn == 'Status' && checkfilter.types.includes('select')"> 
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['status']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['status']" type="checkbox" value="0" id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <template v-if="checkfilter.showcolumn == 'Created At' && checkfilter.types.includes('search')"> 
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['created_at']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['created_at']" type="checkbox" value="0" id="isnotemptyvalue">
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
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['name']"
                                class="form-control mb-2" id="filtertext" placeholder="Search here..">
                            </template>
                            <template v-if="checkfilter.showcolumn == 'Company Name' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['company_name']"
                                class="form-control mb-2" id="filtertext" placeholder="Search here..">
                            </template>
                            <template  v-if="checkfilter.showcolumn == 'Created By' && checkfilter.types.includes('select')">
                              <template v-if="getcreators.length > 0">
                                <template v-for="(creator,index) in getcreators" :key="index">
                                  <div class="form-check mb-2">
                                    <input @change="clickCheckboxFilters(checkfilter.showcolumn)"  v-model="checkfilter.selectedValues['created_by']" class="form-check-input" type="checkbox" :value="creator.id" :id="'creator'+creator.id">
                                    <label  class="form-check-label" :for="'creator'+creator.id">
                                      {{ creator.fname ?? '' }} {{ creator.lname ?? '' }} 
                                    </label>
                                  </div>
                                </template>
                              </template>
                            </template>
                            <template v-if="checkfilter.showcolumn == 'Trafic Source' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['trafic_source']"
                                class="form-control mb-2" id="filtertext" placeholder="Search here..">
                            </template>
                            <template  v-if="checkfilter.showcolumn == 'Category' && checkfilter.types.includes('select')">
                              <template v-if="categoris.length > 0">
                                <template v-for="(category,index) in categoris" :key="index">
                                  <div class="form-check mb-2">
                                    <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['category']" class="form-check-input" type="checkbox" :value="category.id" :id="'category'+category.id">
                                    <label class="form-check-label" :for="'category'+category.id">
                                      {{ category.name ?? '' }}
                                    </label>
                                  </div>
                                </template>
                              </template>
                            </template>
                            <template v-if="checkfilter.showcolumn == 'DID Number' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['phone_number']"
                                class="form-control mb-2" id="filtertext" placeholder="Search here..">
                            </template>
                            <template v-if="checkfilter.showcolumn == 'Status' && checkfilter.types.includes('select')">
                            	<div class="form-check mb-2">
                                  <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['status']" class="form-check-input" type="checkbox" value="0" id="0">
                                  <label class="form-check-label" for="0">
                                    Pending
                                  </label>
                                </div>
                                <div class="form-check mb-2">
                                  <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['status']" class="form-check-input" type="checkbox" value="1" id="1">
                                  <label class="form-check-label" for="1">
                                    Approved
                                  </label>
                                </div>
                                <div class="form-check mb-2">
                                  <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['status']" class="form-check-input" type="checkbox" value="2" id="2">
                                  <label class="form-check-label" for="2">
                                    Pause
                                  </label>
                                </div>
                                <div class="form-check">
                                  <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['status']" class="form-check-input" type="checkbox" value="3" id="3">
                                  <label class="form-check-label" for="3">
                                    Reject
                                  </label>
                                </div>
                            </template>
                            <template v-if="checkfilter.showcolumn == 'Created At' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['created_at']"
                                class="form-control mb-2" id="filtertext" placeholder="Search here..">
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
                      <button class="page-link" @click="getCampain(currentPage - 1)" :disabled="currentPage === 1" >
                        <i class="fa-solid fa-chevron-left"></i>
                      </button>
                    </li>

                    <!-- Page Numbers -->
                    <template v-for="page in paginationPages" :key="page">
                      <li class="paginate_button page-item" :class="{ active: page === currentPage }">
                        <button class="page-link" @click="getCampain(page)">
                          {{ page }}
                        </button>
                      </li>
                    </template>

                    <!-- Next Button -->
                    <li class="paginate_button page-item next" :class="{ disabled: currentPage === lastPage }">
                      <button  class="page-link" @click="getCampain(currentPage + 1)" :disabled="currentPage === lastPage">
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
import Loader from '../../../../../include/loader.vue';
import Breadcrumb from '../../../../../include/breadcrumb.vue';
import { inject } from "vue";
import { fetchUserRole } from "@/services/userService";
import moment from "moment";

export default {
  setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
  components:{
    Loader,
    Breadcrumb,
  },
  data() {
    return {
      getLoader : false,
      showFilter : false,
      breadcrumbs: [
        { label: "Dashboard", url: "/dashboard" },
        { label: "Admin Campaigns", url: "" },
      ],

      campain: "",
      statusCampaign : {
        data : "",
        actionType : "",
      },
      campaignDelete : {
        data : "",
      },
      bulkactionids : {
        selectedIds: [],
        status : "",
      },
      showHiddenExternalFilter: false,
      checkfilter: {
        columns: ['name'],
        showcolumn: "Name",
        requested_type : '=',
        types : ['search'],
        emptyValues : {
          name : [],
          company_name : [],
          created_by : [],
          trafic_source : [],
          category : [],
          phone_number : [],
          status : [],
          created_at : [],
        },
        notemptyValues : {
          name : [],
          company_name : [],
          created_by : [],
          trafic_source : [],
          category : [],
          phone_number : [],
          status : [],
          created_at : [],
        },
        searchValues : {
          name : [],
          company_name : [],
          trafic_source : [],
          phone_number : [],
          created_at : [],
        },
        selectedValues: {
          created_by : [],
          category : [],
          status : [],
        },
      },
      applyfillters : [],
      categoris : [],
      getcreators : [],
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
        this.getCampain();
        this.$nextTick(() => {
          const dataTableWrapper = document.querySelectorAll('#admin_campaign_datatables_wrapper .row.mx-2');
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
    getCampain(page = 1, perPage = 10,searchValue = '') {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl+"admin/campaigns/get-data", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
           params: { page: page, perPage: perPage,search: searchValue},
        })
        .then((res) => {
          this.categoris = res.data.categoris;
          this.getcreators = res.data.getcreators;
          const { data, current_page, last_page,recordsTotal } = res.data;
          this.currentPage = current_page;
          this.lastPage = last_page;
          this.recordsTotal = recordsTotal;
          this.startPage = (current_page - 1) * perPage + 1;
          this.endPage = Math.min(current_page * perPage, recordsTotal);

          if ($.fn.DataTable.isDataTable("#admin_campaign_datatables")) {
            $('#admin_campaign_datatables').DataTable().destroy();
          }
          var formateDate = this.formatDates;
          var table = $('#admin_campaign_datatables').DataTable({
            data: data,
            columns: [
              // { data: 'id' },
              // { data: 'id' },
              // { data: 'id' },
              { data: 'convart_offer' },
              {
                data: "name",
                render: function (data, type, row) {
                  if (row.name != null) {
                    return row.name.length > 25 
                     ? '<span title="'+row.name +'">'+row.name.slice(0, 25) + '...'+'</span>'   
                      : '<span title="'+row.name +'">'+row.name +'</span>'; 
                  }
                  return '----------';
                },
              },
              {
                data: "index_number",
                render: function (data, type, row) {
                  if (row?.user?.company_name != null) {
                    if(row?.user?.role_id == 3){
                      return '<a title="'+row?.user?.company_name+'" data-vue-route href="/admin-manage-publishers-view/'+row?.user?.id+'">'+row?.user?.company_name+'</a>';
                    }else{
                      return '<a title="'+row?.user?.company_name+'" data-vue-route href="/admin-manage-advertiser-view/'+row?.user?.id+'">'+row?.user?.company_name+'</a>';
                    }
                  }
                  return '----------';
                },
              },
              {
                data: "user",
                render: function (data, type, row) {
                  if (row?.user?.fname != null) {
                    if(row?.user?.role_id == 3){
                      return '<a title="'+row?.user?.fname+'" data-vue-route href="/admin-manage-publishers-view/'+row?.user?.id+'">'+row?.user?.fname+'</a>';
                    }else if(row?.user?.role_id == 2){
                      return '<a title="'+row?.user?.fname+'" data-vue-route href="/admin-manage-advertiser-view/'+row?.user?.id+'">'+row?.user?.fname+'</a>';
                    }else{
                       return row?.user?.fname;
                    }
                  }
                  return '----------';
                },
              },
              {
                data: "trafic_source",
                render: function (data, type, row) {
                  if (row?.trafic_source != null) {
                    return row.trafic_source.length > 25 
                      ? '<span title="'+row.trafic_source +'">'+row.trafic_source.slice(0, 25) + '...' +'</span>' 
                      : '<span title="'+row.trafic_source +'">'+row.trafic_source +'</span>'; 
                  }
                  return '----------';
                },
              },
              {
                data: "offer",
                render: function (data, type, row) {
                  if (row?.offer?.category?.name != null) {
                    return '<span title="'+row?.offer?.category?.name +'">'+row?.offer?.category?.name +'</span>';
                  }
                  return '----------';
                },
              },
              {
                data: "phone_number",
                render: function (data, type, row) {
                  if (row?.phone_number != null) {
                    return row.phone_number.length > 15 
                      ? '<span title="'+row.phone_number +'">'+row.phone_number.slice(0, 15) + '...' +'</span>' 
                      : '<span title="'+row.phone_number +'">'+row.phone_number +'</span>'; 
                  }
                  return '----------';
                },
              },

              { data: 'convart_status' },
              { data: 'convart_date' },
              { data: '' }
            ],
            initComplete: () => { 
              $('#users_campaign_datatables').wrap('<div class="commonDataTablesClass"></div>');
              const table = $("#users_campaign_datatables").DataTable();
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
              this.attachEventListenersForSearch();
              this.attachEventListenersBlulkAction();
              this.attachEventListenersBlulkActionSubmit();
              const searchInput = $("#users_campaign_datatables_filter input");
              searchInput.val(this.searchInputValue);
              if(this.searchInputValue != ''){
                  searchInput.focus();
              }

              searchInput.off().on("keyup", (e) => {
                const searchTerm = e.target.value;
                this.searchInputValue = searchTerm;
                this.getUserCampaigen(1, perPage, searchTerm);
              });
              
              this.attachEventListeners();
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
                checkboxes: {
                  selectAllRender: '<input type="checkbox" class="form-check-input ms-1">',
                },
                render: function (data, type, row) {
                  return `<input type="checkbox" class="dt-checkboxes form-check-input ms-1 row-checkbox" data-id="${row.id}">`;
                },
                searchable: false
              },
              { targets: 5, orderable: false, className: 'dt-center' },
              {
                targets: -1,
                title: 'Actions',
                searchable: false,
                orderable: false,
                render: function (data, type, full, meta) {
                  return full.convart_action;
                }
              }
            ],
            orderCellsTop: true,
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
                      <option value="0">Pending</option>
                      <option value="1">Approved</option>
                      <option value="2">Pause</option>
                      <option value="3">Reject</option>
                      <option value="4">Resume</option>
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
                  exportOptions: { columns: [1, 2, 3, 4, 5, 6,7,8] }
                },
                {
                  extend: 'csv',
                  text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                  className: 'dropdown-item',
                  exportOptions: { columns: [1, 2, 3, 4, 5, 6,7,8] }
                },
                {
                  extend: 'excel',
                  text: '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                  className: 'dropdown-item',
                  exportOptions: { columns: [1, 2, 3, 4, 5, 6,7,8] }
                },
                {
                  extend: 'pdf',
                  text: '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                  className: 'dropdown-item',
                  exportOptions: { columns: [1, 2, 3, 4, 5, 6,7,8] }
                },
                {
                  extend: 'copy',
                  text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                  className: 'dropdown-item',
                  exportOptions: { columns: [1, 2, 3, 4, 5, 6,7,8] }
                }
              ]
            },
            {
                  className: "btn btn-primary me-2",
                  text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">SL</a></li><li><a class="dropdown-item" href="#" data-column="1">Campaign Name</a></li><li><a class="dropdown-item" href="#" data-column="2">Company Name</a></li><li><a class="dropdown-item" href="#" data-column="3">Person Name</a></li><li><a class="dropdown-item" href="#" data-column="4">Traffic Source</a></li><li><a class="dropdown-item" href="#" data-column="5">Offer Category</a></li><li><a class="dropdown-item" href="#" data-column="6">DID Number</a></li><li><a class="dropdown-item" href="#" data-column="7">Status</a></li><li><a class="dropdown-item" href="#" data-column="8">Date</a></li><li><a class="dropdown-item" href="#" data-column="9">Action</a></li></div></ul></div>',
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
        .catch((e) => {
          return e;
        })
        .finally(()=>{
          this.getLoader = false;
        });
    },

    externalfilterreset(){
      this.checkfilter.columns = ['name'],
      this.checkfilter.showcolumn = "Name",
      this.checkfilter.requested_type = '=',
      this.checkfilter.types = ['search'],
      this.checkfilter.emptyValues = {
          name : [],
          company_name : [],
          created_by : [],
          trafic_source : [],
          category : [],
          phone_number : [],
          status : [],
          created_at : [],
      },
      this.checkfilter.notemptyValues = {
          name : [],
          company_name : [],
          created_by : [],
          trafic_source : [],
          category : [],
          phone_number : [],
          status : [],
          created_at : [],
      },
      this.checkfilter.searchValues = {
          name : [],
          company_name : [],
          trafic_source : [],
          phone_number : [],
          created_at : [],
      },
      this.checkfilter.selectedValues = {
          created_by : [],
          category : [],
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
          this.globalVariables.apiUrl + "admin/campaigns/search-get-data-dal-filter",
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

          if ($.fn.DataTable.isDataTable("#admin_campaign_datatables")) {
            const table = $("#admin_campaign_datatables").DataTable();
            table.clear();
            table.rows.add(data ?? []);
            table.draw();
          } else {
            var table = $('#admin_campaign_datatables').DataTable({
            data: data,
            columns: [
              // { data: 'id' },
              // { data: 'id' },
              // { data: 'id' },
              { data: 'convart_offer' },
              {
                data: "name",
                render: function (data, type, row) {
                  if (row.name != null) {
                    return row.name.length > 25 
                     ? '<span title="'+row.name +'">'+row.name.slice(0, 25) + '...'+'</span>'   
                      : '<span title="'+row.name +'">'+row.name +'</span>'; 
                  }
                  return '----------';
                },
              },
              {
                data: "index_number",
                render: function (data, type, row) {
                  if (row?.user?.company_name != null) {
                    if(row?.user?.role_id == 3){
                      return '<a title="'+row?.user?.company_name+'" data-vue-route href="/admin-manage-publishers-view/'+row?.user?.id+'">'+row?.user?.company_name+'</a>';
                    }else{
                      return '<a title="'+row?.user?.company_name+'" data-vue-route href="/admin-manage-advertiser-view/'+row?.user?.id+'">'+row?.user?.company_name+'</a>';
                    }
                  }
                  return '----------';
                },
              },
              {
                data: "user",
                render: function (data, type, row) {
                  if (row?.user?.fname != null) {
                    if(row?.user?.role_id == 3){
                      return '<a title="'+row?.user?.fname+'" data-vue-route href="/admin-manage-publishers-view/'+row?.user?.id+'">'+row?.user?.fname+'</a>';
                    }else{
                      return '<a title="'+row?.user?.fname+'" data-vue-route href="/admin-manage-advertiser-view/'+row?.user?.id+'">'+row?.user?.fname+'</a>';
                    }
                  }
                  return '----------';
                },
              },
              {
                data: "trafic_source",
                render: function (data, type, row) {
                  if (row?.trafic_source != null) {
                    return row.trafic_source.length > 25 
                      ? '<span title="'+row.trafic_source +'">'+row.trafic_source.slice(0, 25) + '...' +'</span>' 
                      : '<span title="'+row.trafic_source +'">'+row.trafic_source +'</span>'; 
                  }
                  return '----------';
                },
              },
              {
                data: "offer",
                render: function (data, type, row) {
                  if (row?.offer?.category?.name != null) {
                    return '<span title="'+row?.offer?.category?.name +'">'+row?.offer?.category?.name +'</span>';
                  }
                  return '----------';
                },
              },
              {
                data: "phone_number",
                render: function (data, type, row) {
                  if (row?.phone_number != null) {
                    return row.phone_number.length > 15 
                      ? '<span title="'+row.phone_number +'">'+row.phone_number.slice(0, 15) + '...' +'</span>' 
                      : '<span title="'+row.phone_number +'">'+row.phone_number +'</span>'; 
                  }
                  return '----------';
                },
              },

              { data: 'convart_status' },
              { data: 'convart_date' },
              { data: '' }
            ],
            initComplete: () => { 
              $('#users_campaign_datatables').wrap('<div class="commonDataTablesClass"></div>');
              const table = $("#users_campaign_datatables").DataTable();
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
              this.attachEventListenersForSearch();
              this.attachEventListenersBlulkAction();
              this.attachEventListenersBlulkActionSubmit();
              const searchInput = $("#users_campaign_datatables_filter input");
              searchInput.val(this.searchInputValue);
              if(this.searchInputValue != ''){
                  searchInput.focus();
              }

              searchInput.off().on("keyup", (e) => {
                const searchTerm = e.target.value;
                this.searchInputValue = searchTerm;
                this.getUserCampaigen(1, perPage, searchTerm);
              });
              
              this.attachEventListeners();
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
                checkboxes: {
                  selectAllRender: '<input type="checkbox" class="form-check-input ms-1">',
                },
                render: function (data, type, row) {
                  return `<input type="checkbox" class="dt-checkboxes form-check-input ms-1 row-checkbox" data-id="${row.id}">`;
                },
                searchable: false
              },
              { targets: 5, orderable: false, className: 'dt-center' },
              {
                targets: -1,
                title: 'Actions',
                searchable: false,
                orderable: false,
                render: function (data, type, full, meta) {
                  return full.convart_action;
                }
              }
            ],
            orderCellsTop: true,
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
                      <option value="0">Pending</option>
                      <option value="1">Approved</option>
                      <option value="2">Pause</option>
                      <option value="3">Reject</option>
                      <option value="4">Resume</option>
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
                  exportOptions: { columns: [1, 2, 3, 4, 5, 6,7,8] }
                },
                {
                  extend: 'csv',
                  text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                  className: 'dropdown-item',
                  exportOptions: { columns: [1, 2, 3, 4, 5, 6,7,8] }
                },
                {
                  extend: 'excel',
                  text: '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                  className: 'dropdown-item',
                  exportOptions: { columns: [1, 2, 3, 4, 5, 6,7,8] }
                },
                {
                  extend: 'pdf',
                  text: '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                  className: 'dropdown-item',
                  exportOptions: { columns: [1, 2, 3, 4, 5, 6,7,8] }
                },
                {
                  extend: 'copy',
                  text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                  className: 'dropdown-item',
                  exportOptions: { columns: [1, 2, 3, 4, 5, 6,7,8] }
                }
              ]
            },
            {
                  className: "btn btn-primary me-2",
                  text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">SL</a></li><li><a class="dropdown-item" href="#" data-column="1">Campaign Name</a></li><li><a class="dropdown-item" href="#" data-column="2">Company Name</a></li><li><a class="dropdown-item" href="#" data-column="3">Person Name</a></li><li><a class="dropdown-item" href="#" data-column="4">Traffic Source</a></li><li><a class="dropdown-item" href="#" data-column="5">Offer Category</a></li><li><a class="dropdown-item" href="#" data-column="6">DID Number</a></li><li><a class="dropdown-item" href="#" data-column="7">Status</a></li><li><a class="dropdown-item" href="#" data-column="8">Date</a></li><li><a class="dropdown-item" href="#" data-column="9">Action</a></li></div></ul></div>',
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

    attachEventListenersOfButton() {
      $("#admin_campaign_datatables_wrapper").on("click", "button", (event) => {
        const target = $(event.target);
        const dataClass = target.attr("id");
        if(dataClass == 'all_filters'){
          this.showHiddenExternalFilter = !this.showHiddenExternalFilter;
        }
      });
    },

    formatDates(date) {
      return moment(date).format('D MMMM YYYY');
    },
    
    attachEventListeners() {
      $('#admin_campaign_datatables').on('click', '.admin-campaign-action', (event) => {
        const target = $(event.target);
        const dataId = target.data('id');
        const dataClass = target.data('action');
        if (dataClass === 'pending-btn') {
          this.statusCampaign.data = dataId;
          this.statusCampaign.actionType = 'pending';
          this.statusChange('Are your sure pending?');
        }else if(dataClass === 'published-btn'){
          this.statusCampaign.data = dataId;
          this.statusCampaign.actionType = 'published';
          this.statusChange('Are your sure published?');
        }else if(dataClass === 'delete-campaign-btn'){
           this.campaignDelete.data = dataId;
          Swal.fire({
            text: 'Are you sure delete',
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
          }).then((result) => {
            if (result.value) {
              this.getLoader = true,
              axios
                .post(this.globalVariables.apiUrl+"admin/campaigns/delete", this.campaignDelete, {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                })
                .then((res) => {
                  if(res.data.status == 'success'){
                    toastr.success(res.data.message);
                    this.getCampain();
                  }else{
                    toastr.error(res.data.message);
                  }
                })
                .catch((e) => {
                  return e;
                })
                .finally(()=> {
                  this.getLoader = false;
                });
              } 
          });
        }
      });
    },

    attachEventListenersBlulkAction() {
      $('#admin_campaign_datatables').on('change', '.row-checkbox', (event) => {
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

      $('#admin_campaign_datatables thead').on('change', 'input[type="checkbox"]', (event) => {
        const isChecked = event.target.checked;
        $('#admin_campaign_datatables tbody .row-checkbox').each((index, checkbox) => {
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
          } else if (action === "4") {
            this.bulkactionids.status = '4';
            const alertTitle = "Offer Want to Resume";
            this.bulkStatusChange(alertTitle);
          } else if (action === "2") {
            this.bulkactionids.status = '2';
            const alertTitle = "Offer Want to Pause";
            this.bulkStatusChange(alertTitle);
          }else{
            this.bulkactionids.status = '3';
            const alertTitle = "Offer Want to Reject";
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
                this.globalVariables.apiUrl + "admin/campaigns/bulk-delete",
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
                  this.getCampain();
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
                    this.globalVariables.apiUrl + "admin/campaigns/bulk-status",
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
                      this.getCampain();
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
    statusChange(title){
      Swal.fire({
      text: title,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.value) {
        this.getLoader = true,
        axios
          .post(this.globalVariables.apiUrl+"admin/campaigns/status", this.statusCampaign, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
            if(res.data.status == 'success'){
              toastr.success(res.data.message);
              this.getCampain();
            }else{
              toastr.error(res.data.message);
            }
          })
          .catch((e) => {
            return e;
          })
          .finally(()=> {
            this.getLoader = false;
          });
        } 
    });
    }
  },
};
</script>
<style>
.country-flag-of-admin{
  width:30px;
  margin-right : 5px;
}
#admin_campaign_datatables .dt-checkboxes-cell{
	padding: 0.7rem 0.5rem !important;
}
#admin_campaign colgroup:nth-of-type(2) {
	display: none !important;
}
#admin_campaign .country-flag {
  width: 10% !important;
}
#dropdownMenuButton {
	background: transparent;
}
#admin_campaign_datatables .dropdown-item{
	display: flex !important;
	align-items: center !important;
}
/* #admin_campaign_datatables {
  min-height: 200px;
} */
</style>
