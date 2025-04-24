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
                <!-- <template v-if="!getSkeletonLoader">
                  <div class="content-left">
                    <SkeletonShape type="text" animation="wave" :width="'130px'" :height="'25px'" :radius="5"/>
                    <div class="d-flex align-items-center my-2">
                      <SkeletonShape type="text" animation="wave" :width="'50px'" :height="'30px'" :radius="5" />
                    </div>
                    <SkeletonShape type="text" animation="wave" :width="'130px'" :height="'25px'" :radius="5" />
                  </div>
                  <div class="avatar">
                    <SkeletonShape type="text" animation="wave" :width="'40px'" :height="'38px'" :radius="5" />
                  </div>
                </template>
                <template v-else> -->
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
                <!-- </template> -->
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-xl-3">
          <div class="card">
            <div class="card-body">
              <div class="d-flex align-items-start justify-content-between">
                <!-- <template v-if="!getSkeletonLoader">
                  <div class="content-left">
                    <SkeletonShape type="text" animation="wave" :width="'130px'" :height="'25px'" :radius="5"/>
                    <div class="d-flex align-items-center my-2">
                      <SkeletonShape type="text" animation="wave" :width="'50px'" :height="'30px'" :radius="5"/>
                    </div>
                    <SkeletonShape type="text" animation="wave" :width="'130px'" :height="'25px'" :radius="5"/>
                  </div>
                  <div class="avatar">
                    <SkeletonShape type="text" animation="wave" :width="'40px'" :height="'38px'" :radius="5"/>
                  </div>
                </template>
                <template v-else> -->
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
                <!-- </template> -->
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-xl-3">
          <div class="card">
            <div class="card-body">
              <div class="d-flex align-items-start justify-content-between">
                <!-- <template v-if="!getSkeletonLoader">
                  <div class="content-left">
                    <SkeletonShape type="text" animation="wave" :width="'130px'" :height="'25px'" :radius="5"/>
                    <div class="d-flex align-items-center my-2">
                      <SkeletonShape type="text" animation="wave" :width="'50px'" :height="'30px'" :radius="5"/>
                    </div>
                    <SkeletonShape type="text" animation="wave" :width="'130px'" :height="'25px'" :radius="5"/>
                  </div>
                  <div class="avatar">
                    <SkeletonShape type="text" animation="wave" :width="'40px'" :height="'38px'" :radius="5" />
                  </div>
                </template>
                <template v-else> -->
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
                <!-- </template> -->
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-6 col-xl-3 pe-0">
          <div class="card">
            <div class="card-body">
              <div class="d-flex align-items-start justify-content-between">
                <!-- <template v-if="!getSkeletonLoader">
                  <div class="content-left">
                    <SkeletonShape type="text" animation="wave" :width="'130px'" :height="'25px'" :radius="5"/>
                    <div class="d-flex align-items-center my-2">
                      <SkeletonShape type="text" animation="wave" :width="'50px'" :height="'30px'" :radius="5"/>
                    </div>
                    <SkeletonShape type="text" animation="wave" :width="'130px'" :height="'25px'" :radius="5"/>
                  </div>
                  <div class="avatar">
                    <SkeletonShape type="text" animation="wave" :width="'40px'" :height="'38px'" :radius="5"/>
                  </div>
                </template>
                <template v-else> -->
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
                <!-- </template> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-12">
          <div class="card px-0">
          <div class="card-header border-bottom">
            <!-- <template v-if="!getSkeletonLoader">
              <SkeletonShape
                type="text" animation="wave" :width="'130px'"  :height="'30px'" :radius="5"/>
            </template>
            <template v-else> -->
              <h5 class="card-title mb-0">Filter</h5>
            <!-- </template> -->
            <div
              class="d-flex justify-content-between align-items-center row py-3 gap-3 gap-md-0"
            >
              <div class="col-md-4">
                <!-- <template v-if="!getSkeletonLoader">
                  <SkeletonShape type="text"  animation="wave"  :width="'100%'" :height="'38px'" :radius="5" />
                </template>
                <template v-else> -->
                  <select v-model="filtarData.country" class="select2 form-select"  @change="getFiltarOffers()">
                    <option value="">Select Country</option>
                    <template v-for="(countryOffer,index) in OfferIndex.countryOffers" :key="index">
                      <template v-if="countryOffer.primary_country != null && countryOffer.primary_country != ''">
                        <option :value="countryOffer.primary_country">{{ countryOffer.primary_country }}</option>
                      </template>
                    </template>
                  </select>
                <!-- </template> -->
              </div>

              <div class="col-md-4">
                <!-- <template v-if="!getSkeletonLoader">
                  <SkeletonShape type="text" animation="wave" :width="'100%'" :height="'38px'" :radius="5"/>
                </template>
                <template v-else> -->
                  <select
                    v-model="filtarData.category"
                    class="select2 form-select"
                    @change="getFiltarOffers()"
                  >
                    <option value="">Select Category</option>
                    <option
                      v-for="category in OfferIndex.categoryOffers"
                      :value="category.id"
                      :key="category.id"
                    >
                      {{ category.name }}
                    </option>
                  </select>
                <!-- </template> -->
              </div>
              <div class="col-md-4">
                <!-- <template v-if="!getSkeletonLoader">
                  <SkeletonShape  type="text"  animation="wave"  :width="'100%'"  :height="'38px'" :radius="5" />
                </template>
                <template v-else> -->
                  <select
                    v-model="filtarData.type"
                    class="select2 form-select"
                    @change="getFiltarOffers()"
                  >
                    <option value="">Select Type</option>
                    <option
                      v-for="offerType in OfferIndex.offerTypes"
                      :value="offerType.id"
                      :key="offerType.id"
                    >
                      {{ offerType.type }}
                    </option>
                  </select>
                <!-- </template> -->
              </div>
            </div>
          </div>
          <div class="card-datatable table-responsive table-overflow-hidden">
            <!-- <template v-if="!getSkeletonLoader">
              <SkeletonDataTables></SkeletonDataTables>
            </template>
            <template v-else> -->
              <table class="datatables-products table" id="offer_datatables">
                <thead class="border-top">
                  <tr>
                    <th></th>
                    <!-- <th>ID</th> -->
                    <th>Name</th>
                    <th>Featured</th>
                    <th>Country</th>
                    <th>Assign</th>
                    <th>Pay</th>
                    <th>Phone</th>
                    <th>Owner</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
              </table>
              <div class="row justify-content-between align-items-center">
                <div class="col-md-3">
                  Showing {{ startPage }} to {{ endPage }} of {{ recordsTotal }} entries
                </div>
                <div class="pagination-controls col-md-9 d-flex justify-content-end align-items-center ">
                  <ul class="pagination mb-0">
                    <!-- Previous Button -->
                    <li class="paginate_button page-item previous" :class="{ disabled: currentPage === 1 }">
                      <button class="page-link" @click="getOfferData(currentPage - 1)" :disabled="currentPage === 1" >
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
                      <button  class="page-link" @click="getOfferData(currentPage + 1)" :disabled="currentPage === lastPage">
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
      bulkactionids : {
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
      },
      countendData: "",
      currentPage: 1,
      lastPage: 1,
      recordsTotal : 0,
      startPage : 0,
      endPage : 0,
      searchInputValue : "",
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
    getOfferData(page = 1, perPage = 10, searchValue = '') {
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

          if ($.fn.DataTable.isDataTable("#offer_datatables")) {
            $("#offer_datatables").DataTable().destroy();
          }
          var table = $("#offer_datatables").DataTable({
            data: res.data.getDatas,
            columns: [
              { 
                data: "id",
                className: 'dt-center select-checkbox',
                orderable: false
              },
              // { data: "id" },
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
                data: "updated_at",
                className: 'dt-center',
                orderable: false,
                render: function (data, type, row) {
                  return row.convart_action;
                },
              },
            ],
            initComplete: () => {
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
              { targets: 9, orderable: false, className: 'dt-center' }
            ],
            orderCellsTop: true,
            order: [[1, "asc"]], 
            dom:
              '<"row mx-2"' +
              '<"col-md-4"f>' +
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
                    exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8] },
                  },
                  {
                    extend: "csv",
                    text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                    className: "dropdown-item",
                    exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8] },
                  },
                  {
                    extend: "excel",
                    text:
                      '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                    className: "dropdown-item",
                    exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8] },
                  },
                  {
                    extend: "pdf",
                    text:
                      '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                    className: "dropdown-item",
                    exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8] },
                  },
                  {
                    extend: "copy",
                    text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                    className: "dropdown-item",
                    exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8] },
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
                className: "create-new btn btn-primary",
                attr: { id: "create" },
              },
            ],
          });
          this.getLoader = false;
        })
        .catch((error) => {
          console.error(error);
          this.getLoader = false;
        });
    },
    attachEventListenersForMenu() {
      $("#offer_datatables_wrapper [name='offer_datatables_length']").on("change", (event) => {
        this.getLoader = true;
        const target = $(event.target);
        const getSelectedValue = target.val();
        this.getOfferData(1,getSelectedValue);
      });
    },
    attachEventListenersForSearch() {
      $("#offer_datatables_wrapper #offer_datatables_filter input").on("keyup", (event) => {
        const target = $(event.target);
        const getSearchValue = target.val();
        this.getOfferData(1,10,getSearchValue);
      });
    },

    getFiltarOffers(page = 1, perPage = 10,searchValue = '') {
      if (
        this.filtarData.country === "" &&
        this.filtarData.category === "" &&
        this.filtarData.type === ""
      ) {
        this.getOfferData();
      } else {
        axios
          .post(
            this.globalVariables.apiUrl + "admin/offers/search-get-data",
            this.filtarData,
            {
              headers: { Authorization: "Bearer " + localStorage.getItem("token") },
              params: { page: page, perPage: perPage,search: searchValue},
            }
          )
          .then((res) => {
            // this.countendData = res.data.data;
            const { data, current_page, last_page,recordsTotal } = res.data;
            this.currentPage = current_page;
            this.lastPage = last_page;
            this.recordsTotal = recordsTotal;

            this.startPage = (current_page - 1) * perPage + 1;
            this.endPage = Math.min(current_page * perPage, recordsTotal);
            console.log(res.data);
            if ($.fn.DataTable.isDataTable("#offer_datatables")) {
              $("#offer_datatables").DataTable().destroy();
            }
            var table = $("#offer_datatables").DataTable({
              data: res.data.getDatas,
              columns: [
                  { 
                    data: "id",
                    className: 'dt-center select-checkbox',
                    orderable: false
                  },
                // { data: "id" },
                { data: "convart_offer_name" },
                { data: "convart_featured" },
                { data: "convart_primary_contry" },
                { data: "convart_assign_user" },
                {
                  data: "pay_out",
                  render: function (data, type, row) {
                    if (row.pay_out != null) {
                      return row.pay_out.slice(0, 5);
                    }
                    return "";
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
                  data: "updated_at",
                  render: function (data, type, row) {
                    return row.convart_action;
                  },
                },
              ],
              initComplete: () => {
                this.attachEventListeners();
                this.attachEventListenersOfButton();
                
                this.attachEventListenersForMenu();
                this.attachEventListenersForSearch();

                this.attachEventListenersBlulkAction();
                this.attachEventListenersBlulkActionSubmit();

                const searchInput = $("#offer_datatables_filter input");
                searchInput.val(this.searchInputValue);
                if(this.searchInputValue != ''){
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
                { targets: 9, orderable: false, className: 'dt-center' }
              ],
              orderCellsTop: true,
              order: [[1, "asc"]], 
              dom:
                '<"row mx-2"' +
                '<"col-md-4"f>' +
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
                  attr: { id: "bulk-action-container-second" },
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
                      text:
                        '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                      className: "dropdown-item",
                      exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8] },
                    },
                    {
                      extend: "pdf",
                      text:
                        '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
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
                  text:
                    '<span id="import"><i class="fa-solid fa-upload me-1"></i>Import</span>',
                  className: "create-new btn btn-primary me-3",
                  attr: { id: "import" },
                },
                {
                  text:
                    '<span id="create"><i class="ti ti-plus me-1 ti-xs"></i>Add Offer</span>',
                  className: "create-new btn btn-primary",
                  attr: { id: "create" },
                },
              ],
            });
            // this.getSkeletonLoader = false;
            this.getLoader = false;
          })
          .catch((error) => {
            console.error(error);
          })
          .finally(() => {
            // this.getSkeletonLoader = false;
            this.getLoader = false;
          });
      }
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
              toastr.success(res.data.message);
              this.$router.push("admin-offers-edit/" + res.data.id);
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
          }else{
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
.select2-container--default
  .select2-selection--multiple
  .select2-selection__choice__remove {
  background: #0162e8 !important;
  opacity: 1 !important;
  top: 0 !important;
  left: 0 !important;
}
.select2-container--default
  .select2-selection--multiple
  .select2-selection__choice__remove:hover {
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

#offer_datatables {
  min-height: 500px;
}
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
