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
            <div class="card-header pt-2">
              <h5 class="card-title mt-2 ms-1 mb-0">Differentiates List</h5>
            </div>
            <div class="card-body">
              <table
                class="align-middle mb-0 table table-hover"
                id="differentiates_tables"
              >
                <thead>
                  <tr>
                    <!-- <th></th> -->
                    <th></th>
                    <th>Image</th>
                    <th>Differentiates Title</th>
                    <th>Differentiates Description</th>
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
    <div class="modal fade" id="differentInfoCreate" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel1">Create Differentiates</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <label for="differentiates_title" class="required"
                  >Differentiates Title</label
                >
              </div>
              <div class="col-sm-8">
                <input
                  type="text"
                  required
                  v-model="differentiatesCreate.differentiates_title"
                  id="differentiates_title"
                  class="form-control"
                  placeholder="Enter Differentiates Title"
                />
                <div
                  v-if="validationErrors && validationErrors.differentiates_title"
                  class="text-danger"
                >
                  {{ validationErrors.differentiates_title[0] }}
                </div>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-sm-4">
                <label for="differentiates_description" class="required"
                  >Differentiates Description</label
                >
              </div>
              <div class="col-sm-8">
                <input
                  type="text"
                  required
                  v-model="differentiatesCreate.differentiates_description"
                  id="differentiates_description"
                  class="form-control"
                  placeholder="Enter Differentiates Description"
                />
                <div
                  v-if="validationErrors && validationErrors.differentiates_description"
                  class="text-danger"
                >
                  {{ validationErrors.differentiates_description[0] }}
                </div>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-sm-4">
                <label for="status" class="required">Status</label>
              </div>
              <div class="col-sm-8">
                <select
                  id="status"
                  v-model="differentiatesCreate.status"
                  class="form-select"
                >
                  <option value="">Select Status</option>
                  <option value="1">Publish</option>
                  <option value="0">Pending</option>
                </select>
                <div
                  v-if="validationErrors && validationErrors.status"
                  class="text-danger"
                >
                  {{ validationErrors.status[0] }}
                </div>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-sm-4">
                <label for="image" class="required">Image</label>
              </div>
              <div class="row col-sm-8">
                <div class="col-sm-12">
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
                    v-if="differentiatesShowImage.image"
                    :src="differentiatesShowImage.image"
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
            <button type="button" @click="typeCreate" class="btn btn-primary">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Edit -->
    <div class="modal fade" id="differentInfoEdit" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel1">Edit Differentiates</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <label for="differentiates_title" class="required"
                  >Differentiates Title</label
                >
              </div>
              <div class="col-sm-8">
                <input
                  type="text"
                  required
                  v-model="differentiatesUpdated.differentiates_title"
                  id="differentiates_title"
                  class="form-control"
                  placeholder="Enter Differentiates Title"
                />
                <div
                  v-if="validationErrors && validationErrors.differentiates_title"
                  class="text-danger"
                >
                  {{ validationErrors.differentiates_title[0] }}
                </div>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-sm-4">
                <label for="differentiates_description" class="required"
                  >Differentiates Description</label
                >
              </div>
              <div class="col-sm-8">
                <input
                  type="text"
                  required
                  v-model="differentiatesUpdated.differentiates_description"
                  id="differentiates_description"
                  class="form-control"
                  placeholder="Enter Differentiates Description"
                />
                <div
                  v-if="validationErrors && validationErrors.differentiates_description"
                  class="text-danger"
                >
                  {{ validationErrors.differentiates_description[0] }}
                </div>
              </div>
            </div>

            <div class="row mt-3">
              <div class="col-sm-4">
                <label for="status" class="required">Status</label>
              </div>
              <div class="col-sm-8">
                <select
                  id="status"
                  v-model="differentiatesUpdated.status"
                  class="form-select"
                >
                  <option value="">Select Status</option>
                  <option value="1">Publish</option>
                  <option value="0">Pending</option>
                </select>
                <div
                  v-if="validationErrors && validationErrors.status"
                  class="text-danger"
                >
                  {{ validationErrors.status[0] }}
                </div>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-sm-4">
                <label for="image" class="required">Image</label>
              </div>
              <div class="row col-sm-8">
                <div class="col-sm-8">
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
                <div class="col-sm-4">
                  <img
                    v-if="differentiatesShowImage.image"
                    :src="differentiatesShowImage.image"
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
              @click="offersDifferentiatesUpdate()"
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
        { label: "Differentiates", url: "" },
      ],
      differentiatesCreate: {
        differentiates_title: "",
        differentiates_description: "",
        status: "",
        image: null,
      },
      differentiatesShowImage: {
        image: null,
      },
      differentiatesUpdated: {
        differentiates_title: "",
        differentiates_description: "",
        status: "",
        image: null,
      },
      bulkactionids : {
        selectedIds: [],
        status: "",
      },
      userData : "",
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
    };
  },

   async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role == 'Super' || role == 'Admin') {
          this.getDifferentiates(); 
          this.$nextTick(() => {
            const dataTableWrapper = document.querySelectorAll(
              "#differentiates_tables_wrapper .row.mx-2"
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
    getDifferentiates() {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl + "admin/about/differentiates", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          if ($.fn.DataTable.isDataTable("#differentiates_tables")) {
            $("#differentiates_tables").DataTable().destroy();
          }
          var formateDate = this.formatDates;
          // Initialize DataTable and store the instance in a variable
          var table = $("#differentiates_tables").DataTable({
            data: res.data,
            columns: [
              // { data: 'id' },
              // { data: 'id' },
              { data: "id" },
              { data: "convart_image" },
              { data: "title" },
              { data: "convart_dis" },
              { data: "convart_status" },
              { data: "convart_date" },
              { data: "" },
            ],
            initComplete: () => {
              $('#differentiates_tables').wrap('<div class="commonDataTablesClass"></div>');
              const table = $("#differentiates_tables").DataTable();
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
                searchable: false,
              },
              {
                targets: -1,
                title: "Actions",
                searchable: false,
                orderable: false,
                render: function (data, type, full, meta) {
                  return (
                    '<div class="text-end differentiates-action-btn"><button title="Edit" data-bs-toggle="modal" data-bs-target="#differentInfoEdit" class="rounded-circle bg-transparent border-0 text-primary me-2" data-id=' +
                    full.id +
                    '><i class="far fa-edit fa-sm" data-id=' +
                    full.id +
                    '></i></button><button title="Delete" type="button"  data-id=' +
                    full.id +
                    ' class="differentiates_delete_btn border-0 rounded-circle text-danger   bg-transparent border-0"><i  data-id="' +
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
              searchPlaceholder: "Search Differentiates",
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
                      <option value="1">Bulk Publish</option>
                    </select>
                  </div>
                `,
                className: "me-2 p-0 btn-primary d-none",
                attr: { id: "bulk-action-container" },
              },
              {
                text:
                  '<span data-bs-toggle="modal" data-bs-target="#differentInfoCreate"><i class="ti ti-plus me-1 ti-xs"></i>New Differentiates</span>',
                className: "create-new btn btn-primary me-2",
                attr: { id: "create" },
              },
              {
                  className: "btn btn-primary mx-2 ",
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
        $("#differentiates_tables_wrapper").on("click", "button", (event) => {
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
              this.globalVariables.apiUrl + "admin/about/differentiates-search-get-data-all-filter",
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
    
              if ($.fn.DataTable.isDataTable("#differentiates_tables")) {
                const table = $("#differentiates_tables").DataTable();
                table.clear();
                table.rows.add(res.data ?? []);
                table.draw();
              } else {
                var table = $("#differentiates_tables").DataTable({
                  data: res.data,
                  columns: [
                    // { data: 'id' },
                    // { data: 'id' },
                    { data: "id" },
                    { data: "convart_image" },
                    { data: "title" },
                    { data: "convart_dis" },
                    { data: "convart_status" },
                    { data: "convart_date" },
                    { data: "" },
                  ],
                  initComplete: () => {
                    $('#differentiates_tables').wrap('<div class="commonDataTablesClass"></div>');
                    const table = $("#differentiates_tables").DataTable();
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
                      searchable: false,
                    },
                    {
                      targets: -1,
                      title: "Actions",
                      searchable: false,
                      orderable: false,
                      render: function (data, type, full, meta) {
                        return (
                          '<div class="text-end differentiates-action-btn"><button title="Edit" data-bs-toggle="modal" data-bs-target="#differentInfoEdit" class="rounded-circle bg-transparent border-0 text-primary me-2" data-id=' +
                          full.id +
                          '><i class="far fa-edit fa-sm" data-id=' +
                          full.id +
                          '></i></button><button title="Delete" type="button"  data-id=' +
                          full.id +
                          ' class="differentiates_delete_btn border-0 rounded-circle text-danger   bg-transparent border-0"><i  data-id="' +
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
                    searchPlaceholder: "Search Differentiates",
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
                            <option value="1">Bulk Publish</option>
                          </select>
                        </div>
                      `,
                      className: "me-2 p-0 btn-primary d-none",
                      attr: { id: "bulk-action-container" },
                    },
                    {
                      text:
                        '<span data-bs-toggle="modal" data-bs-target="#differentInfoCreate"><i class="ti ti-plus me-1 ti-xs"></i>New Differentiates</span>',
                      className: "create-new btn btn-primary me-2",
                      attr: { id: "create" },
                    },
                    {
                        className: "btn btn-primary mx-2 ",
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
      $("#differentiates_tables").on("click", ".differentiates-action-btn", (event) => {
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
              this.globalVariables.apiUrl + `admin/about/differentiates/edit/${dataId}`,
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
            )
            .then((res) => {
              this.differentiatesUpdated.id = res.data.differentiates.id;
              this.differentiatesUpdated.differentiates_title =
                res.data.differentiates.title;
              this.differentiatesUpdated.differentiates_description =
                res.data.differentiates.description;
              this.differentiatesUpdated.status = res.data.differentiates.status;
              this.differentiatesShowImage.image =
                this.globalVariables.appUrl + res.data.differentiates.image;
            })
            .catch((error) => {
              if (error.response && error.response.data && error.response.data.errors) {
                this.validationErrors = error.response.data.errors;
              }
            })
            .finally(() => {
              this.getLoader = false;
            });
        } else if (
          dataClass ===
            "differentiates_delete_btn border-0 rounded-circle btn-style-danger" ||
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
                    `admin/about/differentiates/delete/${dataId}`,
                  {
                    headers: {
                      Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                  }
                )
                .then((res) => {
                  toastr.success(res.data.message);
                  this.getDifferentiates();
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
      $('#differentiates_tables').on('change', '.row-checkbox', (event) => {
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
      $('#differentiates_tables thead').on('change', 'input[type="checkbox"]', (event) => {
        const isChecked = event.target.checked;
        $('#differentiates_tables tbody .row-checkbox').each((index, checkbox) => {
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
            const alertTitle = "Differentiate Want to Publish";
            this.bulkStatusChange(alertTitle);
          } else{
            this.bulkactionids.status = '0';
            const alertTitle = "Differentiate Want to Pending";
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
                this.globalVariables.apiUrl + "admin/about/differentiates/bulk/delete",
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
                  this.getDifferentiates();
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
                this.globalVariables.apiUrl + "admin/about/differentiates/bulk/status",
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
                  this.getDifferentiates();
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

    typeCreate() {
      this.getLoader = true;
      axios
        .post(
          this.globalVariables.apiUrl + "admin/about/differentiates/store",
          this.differentiatesCreate,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          toastr.success(res.data.message);
          this.getDifferentiates();

          // Reset form data and validation errors
          this.differentiatesCreate = {
            differentiates_title: "",
            differentiates_description: "",
            status: "",
            image: null,
          };
          this.validationErrors = null;
          this.differentiatesShowImage = {
            image: null,
          };
          // Close the modal
          const modal = document.getElementById("differentInfoCreate");
          const bootstrapModal = bootstrap.Modal.getInstance(modal);
          if (bootstrapModal) {
            bootstrapModal.hide();
          }
        })
        .catch((error) => {
          if (error.response && error.response.data && error.response.data.errors) {
            this.validationErrors = error.response.data.errors;
          }
        })
        .finally(() => {
          this.getLoader = false;
        });
    },
    offersDifferentiatesUpdate() {
      this.getLoader = true;
      axios
        .post(
          this.globalVariables.apiUrl +
            `admin/about/differentiates/update/${this.differentiatesUpdated.id}`,
          this.differentiatesUpdated,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          toastr.success(res.data.message);
          this.getDifferentiates();

          this.differentiatesShowImage = {
            image: null,
          };
          const modal = document.getElementById("differentInfoEdit");
          const bootstrapModal = bootstrap.Modal.getInstance(modal);
          if (bootstrapModal) {
            bootstrapModal.hide();
          }
        })
        .catch((error) => {
          if (error.response && error.response.data && error.response.data.errors) {
            this.validationErrors = error.response.data.errors;
          }
        })
        .finally(() => {
          this.getLoader = false;
        });
    },
    primaryLogo(event) {
      const file = event.target.files[0];
      this.differentiatesCreate.image = file;
      if (!file || file.type.indexOf("image/") === -1) return;
      const reader = new FileReader();
      reader.onload = () => {
        this.differentiatesShowImage.image = reader.result;
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
#differentiates_tables colgroup:nth-of-type(2) {
  display: none !important;
}
#differentiates_tables .dt-checkboxes-cell {
  padding: 0.7rem 0.5rem !important;
}
.imgpreview {
  width: 150px;
}
.rounded-circle {
	height: 32px !important;
	width: 32px !important;
}
</style>
