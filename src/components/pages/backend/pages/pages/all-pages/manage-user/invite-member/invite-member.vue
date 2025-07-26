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
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header pb-2">
                        <h5 class="card-title mb-0">Invite member</h5>
                    </div>
                    <div class="card-body">
                        <form class="mt-1">
                            <div class="row-mb">
                                <div class="form-group">
                                  <label for="email" class="required mb-0">Email</label>
                                  <input type="email" v-model="invaiteMemberCreate.email" id="email" class="form-control" required placeholder="Enter Email">
                                  <div v-if="validationErrors && validationErrors.email" class="text-danger">
                                    {{ validationErrors.email[0] }}
                                  </div>
                                </div>
                                <div class="form-group mt-3">
                                    <label for="role_name" class="required mb-0">Role Name</label>
                                    <select v-model="invaiteMemberCreate.role_name" id="role_name" class="form-select">
                                        <option value="">Select Role</option>
                                        <option v-for="role in InviteMember.roles" :value="role.id" :key="role.id">
                                        {{ role.secondary_name }}
                                        </option>
                                    </select>
                                    <div v-if="validationErrors && validationErrors.role_name" class="text-danger">
                                    {{ validationErrors.role_name[0] }}
                                  </div>
                                </div>
                                
                                <div class="row">
                                    <div class="col-12 text-end mt-3">
                                        <button type="button" @click="invaiteMemberSave()" class="btn btn-primary btn-sm">
                                            <i class="fas fa-check fa-sm me-1"></i>
                                                Invite
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
                <div class="card mt-4">
                  <div class="card-header pt-3">
                        <h5 class="card-title mb-0 mt-2">
                          Invitations
                        </h5>
                    </div>
                    <div class="card-body">
                        <table class="align-middle mb-0 table table-hover" id="invations_table">
                            <thead>
                            <tr>
                              <!-- <th></th> -->
                              <th></th>
                              <th>Id</th>
                              <th>Email</th>
                              <th>Expires at</th>
                              <th>Status</th>
                              <th>Created At</th>
                              <th id="action-incompleted">Operation</th>
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
                                    <a :class="checkfilter.showcolumn == 'Id' ? 'check-active' : ''"
                                      @click="clickFilters('id', 'search', 'Id')">Id 
                                    </a>
                                    <template v-if="applyfillters.includes('Id')">
                                      <span @click="removeSearch('Id','id','search')" id="remove-to-search-list">x</span>
                                    </template>
                                  </li>
                                  <li class="position-relative">
                                    <a :class="checkfilter.showcolumn == 'Email' ? 'check-active' : ''"
                                      @click="clickFilters('email', 'search', 'Email')">Email 
                                    </a>
                                    <template v-if="applyfillters.includes('Email')">
                                      <span @click="removeSearch('Email','email','search')" id="remove-to-search-list">x</span>
                                    </template>
                                  </li>
                                  <li class="position-relative">
                                    <a :class="checkfilter.showcolumn == 'Expires At' ? 'check-active' : ''"
                                      @click="clickFilters('expires_at', 'search', 'Expires At')">Expires At 
                                    </a>
                                    <template v-if="applyfillters.includes('Expires At')">
                                      <span @click="removeSearch('Expires At','expires_at','search')" id="remove-to-search-list">x</span>
                                    </template>
                                  </li>
                                  <li class="position-relative">
                                    <a :class="checkfilter.showcolumn == 'Status' ? 'check-active' : ''"
                                      @click="clickFilters('status ', 'search', 'Status')">Status 
                                    </a>
                                    <template v-if="applyfillters.includes('Status')">
                                      <span @click="removeSearch('Status','status ','search')" id="remove-to-search-list">x</span>
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
                                  <template v-if="checkfilter.showcolumn == 'Id' && checkfilter.types.includes('search')"> 
                                    <div class="form-check mb-2">
                                      <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['id']"
                                        type="checkbox" value="1" id="isemptyvalue">
                                      <label class="form-check-label" for="isemptyvalue">
                                        is Empty
                                      </label>
                                    </div>
                                    <div class="form-check mb-2">
                                      <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                        v-model="checkfilter.notemptyValues['id']" type="checkbox" value="0" id="isnotemptyvalue">
                                      <label class="form-check-label" for="isnotemptyvalue">
                                        is not Empty
                                      </label>
                                    </div>
                                  </template>
                                  <template v-if="checkfilter.showcolumn == 'Email' && checkfilter.types.includes('search')"> 
                                    <div class="form-check mb-2">
                                      <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['email']"
                                        type="checkbox" value="1" id="isemptyvalue">
                                      <label class="form-check-label" for="isemptyvalue">
                                        is Empty
                                      </label>
                                    </div>
                                    <div class="form-check mb-2">
                                      <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                        v-model="checkfilter.notemptyValues['email']" type="checkbox" value="0" id="isnotemptyvalue">
                                      <label class="form-check-label" for="isnotemptyvalue">
                                        is not Empty
                                      </label>
                                    </div>
                                  </template>
                                  <template v-if="checkfilter.showcolumn == 'Expires At' && checkfilter.types.includes('search')"> 
                                    <div class="form-check mb-2">
                                      <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['expires_at']"
                                        type="checkbox" value="1" id="isemptyvalue">
                                      <label class="form-check-label" for="isemptyvalue">
                                        is Empty
                                      </label>
                                    </div>
                                    <div class="form-check mb-2">
                                      <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                        v-model="checkfilter.notemptyValues['expires_at']" type="checkbox" value="0" id="isnotemptyvalue">
                                      <label class="form-check-label" for="isnotemptyvalue">
                                        is not Empty
                                      </label>
                                    </div>
                                  </template>
                                  <template v-if="checkfilter.showcolumn == 'Status' && checkfilter.types.includes('search')"> 
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
                                      <template v-if="checkfilter.showcolumn == 'Id' && checkfilter.types.includes('search')">
                                        <label for="filtertext">Contains</label>
                                        <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['id']"
                                          class="form-control mb-2" id="filtertext" placeholder="Search here..">
                                      </template>
                                      <template v-if="checkfilter.showcolumn == 'Email' && checkfilter.types.includes('search')">
                                        <label for="filtertext">Contains</label>
                                        <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['email']"
                                          class="form-control mb-2" id="filtertext" placeholder="Search here..">
                                      </template>
                                      <template v-if="checkfilter.showcolumn == 'Expires At' && checkfilter.types.includes('search')">
                                        <label for="filtertext">Contains</label>
                                        <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['expires_at']"
                                          class="form-control mb-2" id="filtertext" placeholder="Search here..">
                                      </template>
                                      <template v-if="checkfilter.showcolumn == 'Status' && checkfilter.types.includes('search')">
                                        <label for="filtertext">Contains</label>
                                        <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['status']"
                                          class="form-control mb-2" id="filtertext" placeholder="Search here..">
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
      <!-- / Content -->
      <div class="content-backdrop fade"></div>
    </div>
    <!-- Content wrapper -->
</template>
<script>
import "jquery-validation";
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
        { label: "Invite Members ", url: "" },
      ],
      getLoader: false,
      invaiteMemberCreate: {
        email : "",
        role_name : "",
      },
      InviteMember : "",
      validationErrors : null,
      bulkactionids : {
        selectedIds: [],
      },
      showHiddenExternalFilter: false,
      checkfilter: {
        columns: ['id'],
        showcolumn: "Id",
        types : ['search'],
        emptyValues : {
          id : [],
          email : [],
          expires_at : [],
          status : [],
          created_at : [],
        },
        notemptyValues : {
          id : [],
          email : [],
          expires_at : [],
          status : [],
          created_at : [],
        },
        searchValues : {
          id : [],
          email : [],
          expires_at : [],
          status : [],
          created_at : [],
        },
        selectedValues: {
        },
      },
      applyfillters : [],
    };
  },
  async mounted() { 
    try {
      const { role, isAuthorized } = await fetchUserRole();
      if (role == 'Super' || role == 'Admin') {
        this.getInviteMemberData();
        this.$nextTick(() => {
          const dataTableWrapper = document.querySelectorAll('#invations_table_wrapper .row.mx-2');
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
    getInviteMemberData() {
      this.getLoader = true;
        axios.get(this.globalVariables.apiUrl+'admin/invite-member', 
        { headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}})
        .then((res) => {
          this.InviteMember = res.data
          if ($.fn.DataTable.isDataTable("#invations_table")) {
          $('#invations_table').DataTable().destroy();
        }
        var formateDate = this.formatDates;
        var table = $('#invations_table').DataTable({
          data: res.data.invitations,
          columns: [
            // { data: 'id' },
            { data: 'id' },
            { data: 'id' },
            { data: 'email',
              render: function (data, type, row) {
                  if (row?.email != null) {
                    return '<span title="'+row?.email+'">'+row?.email+'</span>';
                  }
                  return '----------';
                },
             },
             {
                data: "expires_at",
                render: function (data, type, row) {
                  if (row?.expires_at != null) {
                    return formateDate(row?.expires_at);
                  }
                  return "--------";
                },
              },
            { data: 'status' },
            {
                data: "created_at",
                render: function (data, type, row) {
                  if (row.created_at != null) {
                    return formateDate(row.created_at);
                  }
                  return "--------";
                },
              },
            { data: 'updated_at',
                render: function (data, type, row) {
                   return (
                    '<button title="Delete" type="button"  data-id=' +
                    row.id +
                    ' class="invaite-delete-btn border-0 rounded-circle bg-transparent border-0 text-danger"><i  data-id="' +
                    row.id +
                    ' " class="far fa-trash-alt fa-sm"></i></button>'
                  );
                } 
              }
            
          ],
          initComplete: () => { 
            $('#invations_table').wrap('<div class="commonDataTablesClass"></div>');
            const table = $("#invations_table").DataTable();
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
            this.attachEventListenersBlulkAction();
            this.attachEventListenersBlulkActionSubmit();
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
            searchPlaceholder: 'Search Invite Member',
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
              className: "btn btn-primary me-2",
              text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">SL</a></li><li><a class="dropdown-item" href="#" data-column="2">Email</a></li><li><a class="dropdown-item" href="#" data-column="3">Expires at</a></li><li><a class="dropdown-item" href="#" data-column="4">Status</a></li><li><a class="dropdown-item" href="#" data-column="5">Created At</a></li><li><a class="dropdown-item" href="#" data-column="6">Operation</a></li></div></ul></div>',
            },{
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

    externalfilterreset(){
      this.checkfilter.columns = ['id'],
      this.checkfilter.showcolumn = "Id",
      this.checkfilter.types = ['search'],
      this.checkfilter.emptyValues = {
          id : [],
          email : [],
          expires_at : [],
          status : [],
          created_at : [],
      },
      this.checkfilter.notemptyValues = {
          id : [],
          email : [],
          expires_at : [],
          status : [],
          created_at : [],
      },
      this.checkfilter.searchValues = {
          id : [],
          email : [],
          expires_at : [],
          status : [],
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
        this.globalVariables.apiUrl + "admin/invitations-search-get-data-all-filter",
        this.checkfilter,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        }
      )
      .then((res) => {
        if ($.fn.DataTable.isDataTable("#invations_table")) {
          const table = $("#invations_table").DataTable();
          table.clear();
          table.rows.add(res.data.invitations ?? []);
          table.draw();
        } else {
          var table = $('#invations_table').DataTable({
          data: res.data.invitations,
          columns: [
            // { data: 'id' },
            { data: 'id' },
            { data: 'id' },
            { data: 'email',
              render: function (data, type, row) {
                  if (row?.email != null) {
                    return '<span title="'+row?.email+'">'+row?.email+'</span>';
                  }
                  return '----------';
                },
             },
             {
                data: "expires_at",
                render: function (data, type, row) {
                  if (row?.expires_at != null) {
                    return formateDate(row?.expires_at);
                  }
                  return "--------";
                },
              },
            { data: 'status' },
            {
                data: "created_at",
                render: function (data, type, row) {
                  if (row.created_at != null) {
                    return formateDate(row.created_at);
                  }
                  return "--------";
                },
              },
            { data: 'updated_at',
                render: function (data, type, row) {
                   return (
                    '<button title="Delete" type="button"  data-id=' +
                    row.id +
                    ' class="invaite-delete-btn border-0 rounded-circle bg-transparent border-0 text-danger"><i  data-id="' +
                    row.id +
                    ' " class="far fa-trash-alt fa-sm"></i></button>'
                  );
                } 
              }
            
          ],
          initComplete: () => { 
            $('#invations_table').wrap('<div class="commonDataTablesClass"></div>');
            const table = $("#invations_table").DataTable();
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
            this.attachEventListenersBlulkAction();
            this.attachEventListenersBlulkActionSubmit();
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
            searchPlaceholder: 'Search Invite Member',
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
              className: "btn btn-primary me-2",
              text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">SL</a></li><li><a class="dropdown-item" href="#" data-column="2">Email</a></li><li><a class="dropdown-item" href="#" data-column="3">Expires at</a></li><li><a class="dropdown-item" href="#" data-column="4">Status</a></li><li><a class="dropdown-item" href="#" data-column="5">Created At</a></li><li><a class="dropdown-item" href="#" data-column="6">Operation</a></li></div></ul></div>',
            }
            ,{
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
      $("#invations_table_wrapper").on("click", "button", (event) => {
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
    attachEventListenersBlulkAction() {
      $('#invations_table').on('change', '.row-checkbox', (event) => {
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
      $('#invations_table thead').on('change', 'input[type="checkbox"]', (event) => {
        const isChecked = event.target.checked;
        $('#invations_table tbody .row-checkbox').each((index, checkbox) => {
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
                this.globalVariables.apiUrl + "admin/invitations/bulk/delete",
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
                  this.getInviteMemberData();
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
      $("#invations_table").on("click", ".invaite-delete-btn", (event) => {
        const target = $(event.target);
        const dataId = target.data("id");
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
                .delete(
                  this.globalVariables.apiUrl+"admin/invitations/delete/"+dataId,{
                    headers: {
                      Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                  }
                )
                .then((res) => {
                  toastr.success(res.data.message);
                  this.getInviteMemberData();
                })
                .catch((e) => {
                  return e;
                })
                .finally(() => {
                  this.getLoader = false;
            });
          }
        });
      });
    },

    invaiteMemberSave() {
      this.getLoader = true;
      axios
        .post(this.globalVariables.apiUrl+"admin/invite-member/store", this.invaiteMemberCreate, {
          headers: { 
            Authorization: "Bearer " + localStorage.getItem("token")
         },
        })
        .then((res) => {
          this.getInviteMemberData();
          this.invaiteMemberCreate.email = '';
          this.invaiteMemberCreate.role_name = '';
          toastr.success(res.data.message);
        })
        .catch((error) => {
          if(error && error.response && error.response.data && error.response.data.errors){
            this.validationErrors = error.response.data.errors;
          }
        })
        .finally(() => {
          this.getLoader = false;
        });
    },
  },
};

</script>
<style>
#invations_table colgroup:nth-of-type(2) {
	display: none !important;
}
#invations_table .dt-checkboxes-cell{
	padding: 0.7rem 0.5rem !important;
}
</style>