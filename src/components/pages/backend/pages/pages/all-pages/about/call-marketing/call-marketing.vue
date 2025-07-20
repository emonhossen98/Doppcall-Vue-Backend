<template>
  <div v-if="getLoader">
    <Loader></Loader>
  </div>
  <!-- Content wrapper -->
  <div class="content-wrapper">
    <!-- {{ callmarketing }}  -->
    <!-- Content -->
    <div class="container-fluid flex-grow-1 container-p-y">
      <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
      <div class="row mt-4">
        <div class="col-12">
          <div class="card">
            <div class="card-header pt-2">
              <h5
                class="card-title d-flex justify-content-between align-items-center mb-0 mt-2 ms-1"
              >
                Call Marketing List
              </h5>
            </div>
            <div class="card-body">
              <table
                class="align-middle mb-0 table table-hover"
                id="call_marketing_tables"
              >
                <thead>
                  <tr>
                    <!-- <th></th> -->
                    <th></th>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Created At</th>
                    <th>Operation</th>
                  </tr>
                </thead>
                <tbody></tbody>
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
                          <a :class="checkfilter.showcolumn == 'Title' ? 'check-active' : ''"
                            @click="clickFilters('title', 'search', 'Title')">Title 
                          </a>
                          <template v-if="applyfillters.includes('Title')">
                            <span @click="removeSearch('Title','title','search')" id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Description' ? 'check-active' : ''"
                            @click="clickFilters('description', 'search', 'Description')">Description
                          </a>
                          <template v-if="applyfillters.includes('Description')">
                            <span @click="removeSearch('Description','description','search')" id="remove-to-search-list">x</span>
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
                        <p class="mt-3 mb-1 font-class">{{ checkfilter.showcolumn ?? '' }}</p>
                        <template v-if="checkfilter.showcolumn == 'Title' && checkfilter.types.includes('search')"> 
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['title']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['title']" type="checkbox" value="0" id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <template v-if="checkfilter.showcolumn == 'Description' && checkfilter.types.includes('search')"> 
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['description']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['description']" type="checkbox" value="0" id="isnotemptyvalue">
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
                            <template v-if="checkfilter.showcolumn == 'Title' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['title']"
                                class="form-control mb-2" id="filtertext" placeholder="Search here..">
                            </template>
                            <template v-if="checkfilter.showcolumn == 'Description' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['description']"
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
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Create -->
    <div class="modal fade" id="callInfoCreate" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel1">Create Call Marketing</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-3">
                <label for="call_marketing_title" class="required"
                  >Call Marketing Title</label
                >
              </div>
              <div class="col-sm-9">
                <input
                  type="text"
                  required
                  v-model="callMarketingCreate.call_marketing_title"
                  id="call_marketing_title"
                  class="form-control"
                />
                <div
                  v-if="validationErrors && validationErrors.call_marketing_title"
                  class="text-danger"
                >
                  {{ validationErrors.call_marketing_title[0] }}
                </div>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-sm-3">
                <label for="call_marketing_description" class="required"
                  >Call Marketing Description</label
                >
              </div>
              <div class="col-sm-9">
                <input
                  type="text"
                  required
                  v-model="callMarketingCreate.call_marketing_description"
                  id="call_marketing_description"
                  class="form-control"
                />
                <div
                  v-if="validationErrors && validationErrors.call_marketing_description"
                  class="text-danger"
                >
                  {{ validationErrors.call_marketing_description[0] }}
                </div>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-sm-3">
                <label for="status" class="required">Status</label>
              </div>
              <div class="col-sm-9">
                <select
                  id="status"
                  v-model="callMarketingCreate.status"
                  class="form-select"
                >
                  <option value="">Select Status</option>
                  <option value="1">Publish</option>
                  <option value="0">Pending</option>
                </select>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-sm-3">
                <label for="image" class="required">Image</label>
              </div>
              <div class="row col-sm-9">
                <div class="col-sm-6">
                  <input
                    type="file"
                    accept="image/*"
                    ref="myFile"
                    @change="primaryLogo($event)"
                    class="form-control"
                    id="image"
                  />
                  <span
                    style="background: #e9fff7; font-size: 12px; cursor: help"
                    class="py-1 px-2 d-block"
                    >Valid image: jpg,png,svg,jpeg</span
                  >
                  <div
                    v-if="validationErrors && validationErrors.image"
                    class="text-danger"
                  >
                    {{ validationErrors.image[0] }}
                  </div>
                </div>
                <div class="col-sm-6">
                  <img
                    v-if="callMarketingShowImage.image"
                    :src="callMarketingShowImage.image"
                    class="imgpreview"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button type="button" @click="callCreate()" class="btn btn-primary">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Edit -->
    <div class="modal fade" id="callInfoEdit" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel1">Edit Call Marketing</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-3">
                <label for="call_marketing_title" class="required"
                  >Call Marketing Title</label
                >
              </div>
              <div class="col-sm-9">
                <input
                  type="text"
                  required
                  v-model="callMarketingUpdate.call_marketing_title"
                  id="call_marketing_title"
                  class="form-control"
                />
                <div
                  v-if="validationErrors && validationErrors.call_marketing_title"
                  class="text-danger"
                >
                  {{ validationErrors.call_marketing_title[0] }}
                </div>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-sm-3">
                <label for="call_marketing_description" class="required"
                  >Call Marketing Description</label
                >
              </div>
              <div class="col-sm-9">
                <input
                  type="text"
                  required
                  v-model="callMarketingUpdate.call_marketing_description"
                  id="call_marketing_description"
                  class="form-control"
                />
                <div
                  v-if="validationErrors && validationErrors.call_marketing_description"
                  class="text-danger"
                >
                  {{ validationErrors.call_marketing_description[0] }}
                </div>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-sm-3">
                <label for="status" class="required">Status</label>
              </div>
              <div class="col-sm-9">
                <select
                  id="status"
                  v-model="callMarketingUpdate.status"
                  class="form-select"
                >
                  <option value="">Select Status</option>
                  <option value="1">Publish</option>
                  <option value="0">Pending</option>
                </select>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-sm-3">
                <label for="image" class="required">Image</label>
              </div>
              <div class="row col-sm-9">
                <div class="col-sm-6">
                  <input
                    type="file"
                    accept="image/*"
                    ref="myFile"
                    @change="primaryLogoUpdate($event)"
                    class="form-control"
                    id="image"
                  />
                  <span
                    style="background: #e9fff7; font-size: 12px; cursor: help"
                    class="py-1 px-2 d-block"
                    >Valid image: jpg,png,svg,jpeg</span
                  >
                  <div
                    v-if="validationErrors && validationErrors.image"
                    class="text-danger"
                  >
                    {{ validationErrors.image[0] }}
                  </div>
                </div>
                <div class="col-sm-6">
                  <img
                    v-if="callMarketingShowImage.image"
                    :src="callMarketingShowImage.image"
                    class="imgpreview"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button
              type="button"
              @click="CallUpdate()"
              class="btn btn-primary"
            >
              Update
            </button>
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
      getLoader: false,
      breadcrumbs: [
        { label: "Dashboard", url: "/dashboard" },
        { label: "Call Marketing", url: "" },
      ],
      callMarketingCreate: {
        call_marketing_title: "",
        call_marketing_description: "",
        status: "",
        image: null,
      },
      callMarketingShowImage: {
        image: null,
      },
      bulkactionids : {
        selectedIds: [],
        status: "",
      },
      showHiddenExternalFilter: false,
      checkfilter: {
        columns: ['title'],
        showcolumn: "Title",
        types : ['search'],
        emptyValues : {
          title : [],
          description : [],
          status : [],
          created_at : [],
        },
        notemptyValues : {
          title : [],
          description : [],
          status : [],
          created_at : [],
        },
        searchValues : {
          title : [],
          description : [],
          created_at : [],
        },
        selectedValues: {
          status : [],
        },
      },
      applyfillters : [],
      validationErrors : null,
      callMarketingUpdate: {
          call_marketing_title: "",
          call_marketing_description: "",
          status: "",
          image: null,
        },
        callMarketingShowImage : {
          image: null,
        },
    };
  },
  async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role == 'Super' || role == 'Admin') {
          this.getCallMarketing();
          this.$nextTick(() => {
            const dataTableWrapper = document.querySelectorAll(
              "#call_marketing_tables_wrapper .row.mx-2"
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
  },
  methods: {
    getCallMarketing() {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl + "admin/about/call-marketing", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          if ($.fn.DataTable.isDataTable("#call_marketing_tables")) {
            $("#call_marketing_tables").DataTable().destroy();
          }
          var formateDate = this.formatDates;
          // Initialize DataTable and store the instance in a variable
          var table = $("#call_marketing_tables").DataTable({
            data: res.data,
            columns: [
              // { data: 'id' },
              // { data: 'id' },
              { data: "id" },
              { data: "convart_image" },
              { 
                data: "title",
                render: function (data, type, row) {
                  if (row?.title != null) {
                    return '<span title="'+row?.title+'">'+row?.title+'</span>';
                  }
                  return '----------';
                },
               },
              {
                data: "convart_dis",
                render: function (data, type, row) {
                  if (row?.convart_dis != null) {
                    return '<span title="'+row?.convart_dis+'">'+row?.convart_dis+'</span>';
                  }
                  return '----------';
                },
               },
              { data: "convart_status" },
              { data: "convart_date" },
              { data: "" },
            ],
            initComplete: () => {
              $('#call_marketing_tables').wrap('<div class="commonDataTablesClass"></div>');
              const table = $("#call_marketing_tables").DataTable();
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
            // createdRow: function (row, data, dataIndex) {
            //   $("td:eq(0)", row).html(dataIndex + 1);
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
                searchable: false,
              },
              {
                targets: -1,
                title: "Actions",
                searchable: false,
                orderable: false,
                render: function (data, type, full, meta) {
                  return (
                    '<div class="text-end call-marketing-action"><button title="Edit" data-bs-toggle="modal" data-bs-target="#callInfoEdit" data-id="' +
                    full.id +
                    '" class="rounded-circle bg-transparent border-0 text-primary"><i class="far fa-edit fa-sm" data-id="' +
                    full.id +
                    '"></i></button><button type="button" title="Delete" data-id=' +
                    full.id +
                    ' class="call_marketing_delete_btn border-0 rounded-circle bg-transparent border-0 text-danger"><i  data-id="' +
                    full.id +
                    ' " class="far fa-trash-alt fa-sm"></i></button></div>'
                  );
                },
              },
            ],
            order: [[2, "desc"]],
            dom:
              '<"row mx-2"' +
              '<"col-md-4"f>' +
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
              searchPlaceholder: "Search Call Marketing",
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
                      <option value="1">Bulk Approved</option>
                    </select>
                  </div>
                `,
                className: "me-2 p-0 btn-primary d-none",
                attr: { id: "bulk-action-container" },
              },
              {
                text:
                  '<span data-bs-toggle="modal" data-bs-target="#callInfoCreate"><i class="ti ti-plus me-1 ti-xs"></i>New Call Marketing</span>',
                className: "create-new btn btn-primary me-2",
               
              },
              {
                  className: "btn btn-primary me-2",
                  text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">Image</a></li><li><a class="dropdown-item" href="#" data-column="2">Differentiates Title</a></li><li><a class="dropdown-item" href="#" data-column="3">Differentiates Description</a></li><li><a class="dropdown-item" href="#" data-column="4">Status</a></li><li><a class="dropdown-item" href="#" data-column="5">Created At</a></li><li><a class="dropdown-item" href="#" data-column="6">Action</a></li></div></ul></div>',
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
          return error;
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    attachEventListenersOfButton() {
        $("#call_marketing_tables_wrapper").on("click", "button", (event) => {
          const target = $(event.target);
          const dataClass = target.attr("id");
          if(dataClass == 'all_filters'){
            this.showHiddenExternalFilter = !this.showHiddenExternalFilter;
          }
        });
    },

    externalfilterreset(){
      this.checkfilter.columns = ['title'],
      this.checkfilter.showcolumn = "Title",
      this.checkfilter.types = ['search'],
      this.checkfilter.emptyValues = {
          title : [],
          description : [],
          status : [],
          created_at : [],
      },
      this.checkfilter.notemptyValues = {
          title : [],
          description : [],
          status : [],
          created_at : [],
      },
      this.checkfilter.searchValues = {
          title : [],
          description : [],
          created_at : [],
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
              this.globalVariables.apiUrl + "admin/about/call-marketing-search-get-data-all-filter",
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
    
              if ($.fn.DataTable.isDataTable("#call_marketing_tables")) {
                const table = $("#call_marketing_tables").DataTable();
                table.clear();
                table.rows.add(res.data ?? []);
                table.draw();
              } else {
                var table = $("#call_marketing_tables").DataTable({
                data: res.data,
                columns: [
                  // { data: 'id' },
                  // { data: 'id' },
                  { data: "id" },
                  { data: "convart_image" },
                  { 
                    data: "title",
                    render: function (data, type, row) {
                      if (row?.title != null) {
                        return '<span title="'+row?.title+'">'+row?.title+'</span>';
                      }
                      return '----------';
                    },
                  },
                  {
                    data: "convart_dis",
                    render: function (data, type, row) {
                      if (row?.convart_dis != null) {
                        return '<span title="'+row?.convart_dis+'">'+row?.convart_dis+'</span>';
                      }
                      return '----------';
                    },
                  },
                  { data: "convart_status" },
                  { data: "convart_date" },
                  { data: "" },
                ],
                initComplete: () => {
                  $('#call_marketing_tables').wrap('<div class="commonDataTablesClass"></div>');
                  const table = $("#call_marketing_tables").DataTable();
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
                // createdRow: function (row, data, dataIndex) {
                //   $("td:eq(0)", row).html(dataIndex + 1);
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
                    searchable: false,
                  },
                  {
                    targets: -1,
                    title: "Actions",
                    searchable: false,
                    orderable: false,
                    render: function (data, type, full, meta) {
                      return (
                        '<div class="text-end call-marketing-action"><button title="Edit" data-bs-toggle="modal" data-bs-target="#callInfoEdit" data-id="' +
                        full.id +
                        '" class="rounded-circle bg-transparent border-0 text-primary"><i class="far fa-edit fa-sm" data-id="' +
                        full.id +
                        '"></i></button><button type="button" title="Delete" data-id=' +
                        full.id +
                        ' class="call_marketing_delete_btn border-0 rounded-circle bg-transparent border-0 text-danger"><i  data-id="' +
                        full.id +
                        ' " class="far fa-trash-alt fa-sm"></i></button></div>'
                      );
                    },
                  },
                ],
                order: [[2, "desc"]],
                dom:
                  '<"row mx-2"' +
                  '<"col-md-4"f>' +
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
                  searchPlaceholder: "Search Call Marketing",
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
                          <option value="1">Bulk Approved</option>
                        </select>
                      </div>
                    `,
                    className: "me-2 p-0 btn-primary d-none",
                    attr: { id: "bulk-action-container" },
                  },
                  {
                    text:
                      '<span data-bs-toggle="modal" data-bs-target="#callInfoCreate"><i class="ti ti-plus me-1 ti-xs"></i>New Call Marketing</span>',
                    className: "create-new btn btn-primary me-2",
                  
                  },
                  {
                      className: "btn btn-primary me-2",
                      text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">Image</a></li><li><a class="dropdown-item" href="#" data-column="2">Differentiates Title</a></li><li><a class="dropdown-item" href="#" data-column="3">Differentiates Description</a></li><li><a class="dropdown-item" href="#" data-column="4">Status</a></li><li><a class="dropdown-item" href="#" data-column="5">Created At</a></li><li><a class="dropdown-item" href="#" data-column="6">Action</a></li></div></ul></div>',
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
      $("#call_marketing_tables").on("click", ".call-marketing-action", (event) => {
        const target = $(event.target);
        const dataId = target.data("id");
        const dataClass = target.attr("class");
        if (
          dataClass === "rounded-circle btn-style-edit" ||
          dataClass === "far fa-edit fa-sm"
        ) {
          this.getLoader = true;
        axios
          .get(
            this.globalVariables.apiUrl+`admin/about/call-marketing/edit/${dataId}`, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
              },
            }
          )
          .then((res) => {
            this.callMarketingUpdate.id = res.data.call_merketing.id;
            this.callMarketingUpdate.call_marketing_title = res.data.call_merketing.title;
            this.callMarketingUpdate.call_marketing_description = res.data.call_merketing.description;
            this.callMarketingUpdate.status = res.data.call_merketing.status;
            this.callMarketingShowImage.image = this.globalVariables.appUrl+res.data.call_merketing.image;
          })
          .catch((error) => {
            return error;
          })
          .finally(() => {
            this.getLoader = false;
        });
        } else if (
          dataClass ===
            "call_marketing_delete_btn border-0 rounded-circle btn-style-danger" ||
          dataClass === "far fa-trash-alt fa-sm"
        ) {
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
                  this.globalVariables.apiUrl +
                    `admin/about/call-marketing/delete/${dataId}`,
                  {
                    headers: {
                      Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                  }
                )
                .then((res) => {
                  toastr.success(res.data.message);
                  this.getCallMarketing();
                })
                .catch((error) => {
                  return error;
                })
                .finally(() => {
                  this.getLoader = false;
                });
            }
          });
        }
      });
    },

    attachEventListenersBlulkAction() {
      $('#call_marketing_tables').on('change', '.row-checkbox', (event) => {
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
      $('#call_marketing_tables thead').on('change', 'input[type="checkbox"]', (event) => {
        const isChecked = event.target.checked;
        $('#call_marketing_tables tbody .row-checkbox').each((index, checkbox) => {
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
            const alertTitle = "Call Marketing Want to Approved";
            this.bulkStatusChange(alertTitle);
          } else{
            this.bulkactionids.status = '0';
            const alertTitle = "Call Marketing Want to Pending";
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
                this.globalVariables.apiUrl + "admin/about/call-marketing/bulk/delete",
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
                  this.getCallMarketing();
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
                this.globalVariables.apiUrl + "admin/about/call-marketing/bulk/status",
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
                  this.getCallMarketing();
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

    callCreate() {
      this.getLoader = true;
      axios
        .post(
          this.globalVariables.apiUrl+"admin/about/call-marketing/store",
          this.callMarketingCreate,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          toastr.success(res.data.message);
          this.getCallMarketing();

          this.callMarketingCreate = {
            call_marketing_title: "",
            call_marketing_description: "",
            status: "",
            image: null,
          };
          this.validationErrors = null;
          this.callMarketingShowImage = {
            image: null,
          };
          // Close the modal
          const modal = document.getElementById("callInfoCreate");
          const bootstrapModal = bootstrap.Modal.getInstance(modal);
          if (bootstrapModal) {
            bootstrapModal.hide();
          }
        })
        .catch((error) => {
          return error;
        })
        .finally(() => {
          this.getLoader = false;
      });
    },
    CallUpdate() {
        this.getLoader = true;
        axios
          .post(
            this.globalVariables.apiUrl+`admin/about/call-marketing/update/${this.callMarketingUpdate.id}`,
            this.callMarketingUpdate,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((res) => {
            toastr.success(res.data.message);
            this.getCallMarketing();
            // Reset form data and validation errors
          this.callMarketingUpdate = {
            call_marketing_title: "",
            call_marketing_description: "",
            status: "",
            image: null,
          };
          this.validationErrors = null;
          this.callMarketingShowImage = {
            image: null,
          };
          // Close the modal
          const modal = document.getElementById("callInfoEdit");
          const bootstrapModal = bootstrap.Modal.getInstance(modal);
          if (bootstrapModal) {
            bootstrapModal.hide();
          }
          })
          .catch((error) => {
            return error;
          })
          .finally(() => {
            this.getLoader = false;
        });
    },

    primaryLogo(event) {
        const file = event.target.files[0];
        this.callMarketingCreate.image = file;
        if (!file || file.type.indexOf('image/') === -1) return;
        const reader = new FileReader();
        reader.onload = () => {
          this.callMarketingShowImage.image = reader.result;
        };
        reader.readAsDataURL(file);
    },
      primaryLogoUpdate(event) {
      const file = event.target.files[0];
      this.differentiatesUpdated.image = file;
      if (!file || file.type.indexOf("image/") === -1) return;
      const reader = new FileReader();
      reader.onload = () => {
        this.differentiatesShowImage.image = reader.result;
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>
<style>
#call_marketing_tables colgroup:nth-of-type(2) {
  display: none !important;
}
#call_marketing_tables .dt-checkboxes-cell {
  padding: 0.7rem 0.5rem !important;
}
.imgpreview{
  width: 150px;
}
</style>
