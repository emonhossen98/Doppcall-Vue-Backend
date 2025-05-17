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
          <div class="card mt-4 mypublisher">
            <div class="card-header pt-3">
              <h5 class="card-title mb-0">Filter By</h5>
            </div>
            <div class="card-body">
              <form id="user-filter-form">
                <div class="row gap-3 gap-md-0">
                  <div class="col-lg-4">
                    <select @change="SearchData()" v-model="myData.order_by" class="form-control">
                      <option value="">Order By</option>
                      <option value="newest">Newest</option>
                      <option value="old">Old</option>
                    </select>
                  </div>
                  <div class="col-lg-4">
                    <select  @change="SearchData()" v-model="myData.manager" class="form-control">
                      <option value="">Select Manager</option>
                      <option v-for="manager in publisherIndex.accountManagers" :value="manager.id":key="manager.id">
                        {{ manager.fname }} {{ manager.lname }}
                      </option>
                    </select>
                  </div>
                  <div class="col-lg-4">
                    <select  @change="SearchData()" v-model="myData.status" class="form-control">
                      <option value="">Select Action</option>
                      <option value="6">Pending</option>
                      <option value="1">Approved</option>
                      <option value="2">Suspend</option>
                      <option value="3">Unsuspend</option>
                      <option value="4">Pause</option>
                      <option value="5">Resume</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
            <div class="card-header pt-3 pb-0">
              <h5 class="card-title d-flex justify-content-between align-items-center mb-0">
                Manage Publishers
              </h5>
            </div>
            <div class="card-body table-responsive table-overflow-hidden">
              <table class="align-middle mb-0 table table-hover" id="publisher_datatables" style="width: 100%;">
                <thead>
                  <tr>
                    <!-- <th></th> -->
                    <th></th>
                    <th>SL</th>
                    <th>User Type</th>
                    <th>Company</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Balance</th>
                    <th>Manager</th>
                    <th>Traffic Source</th>
                    <th>City</th>
                    <th>Country</th>
                    <th>Status</th>
                    <th style="width: 20%;" id="action-incompleted">Action</th>
                  </tr>
                </thead>
                <tbody>
                  
                </tbody>
              </table>
              <div class="row justify-content-between align-items-center">
                  <div class="col-md-3">
                    Showing {{ startPage }} to {{ endPage }} of {{ recordsTotal }} entries
                  </div>
                  <div class="pagination-controls col-md-9 d-flex justify-content-end align-items-center ">
                    <ul class="pagination mb-0">
                      <!-- Previous Button -->
                      <li class="paginate_button page-item previous" :class="{ disabled: currentPage === 1 }">
                        <button class="page-link" @click="getPublisherData(currentPage - 1)" :disabled="currentPage === 1" >
                          <i class="fa-solid fa-chevron-left"></i>
                        </button>
                      </li>

                      <!-- Page Numbers -->
                      <template v-for="page in paginationPages" :key="page">
                        <li class="paginate_button page-item" :class="{ active: page === currentPage }">
                          <button class="page-link" @click="getPublisherData(page)">
                            {{ page }}
                          </button>
                        </li>
                      </template>

                      <!-- Next Button -->
                      <li class="paginate_button page-item next" :class="{ disabled: currentPage === lastPage }">
                        <button  class="page-link" @click="getPublisherData(currentPage + 1)" :disabled="currentPage === lastPage">
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
    <div>

      <!-- Large Modal -->
      <div class="modal fade" id="singleDeleteModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="assignToManager3">Publisher Delete Note</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <label for="deletenote" class="required">Note</label>
              <textarea v-model="deleteUser.deleted_note" id="deletenote" class="form-control" placeholder="Enter Your Note" rows="5"></textarea>
              <div v-if="validationErrorsForNote && validationErrorsForNote.deleted_note" class="text-danger">
                {{ validationErrorsForNote.deleted_note[0] }}
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" @click="deletePublisherWithNote()" class="btn btn-primary"><i class="fas fa-check fa-sm me-1"></i> Submit</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Large Modal -->
      <div class="modal fade" id="bulkDeleteModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="assignToManager3">Publisher Delete Note</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <label for="deletenote" class="required">Note</label>
              <textarea v-model="bulkactionids.deleted_note" id="deletenote" class="form-control" placeholder="Enter Your Note" rows="5"></textarea>
              <div v-if="validationErrorsForNote && validationErrorsForNote.deleted_note" class="text-danger">
                {{ validationErrorsForNote.deleted_note[0] }}
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" @click="bulkactionsubmission()" class="btn btn-primary"><i class="fas fa-check fa-sm me-1"></i> Submit</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Large Modal -->
      <div class="modal fade" id="assignToManager" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="assignToManager3">Assign To Manager</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <template v-if="publisherIndex?.accountManagers">
                <select v-model="assignuser.managerid" class="form-control">
                    <option value="">Select Manager</option>
                    <template v-if="publisherIndex.accountManagers.length > 0">
                      <option v-for="manager in publisherIndex.accountManagers" :value="manager.id" :key="manager.id">
                      {{ manager.fname }} {{ manager.lname }}
                      </option>
                    </template>
                    <template v-else>
                      <option value="" class="text-danger">No account manager found</option>
                    </template>
                </select>
              </template>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" @click="assignAccountManager()" class="btn btn-primary"><i class="fas fa-check fa-sm me-1"></i> Assign Now</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Large Modal -->
      <div class="modal fade" id="statusChangeModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel3">{{ modalTitle }}</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div v-if="publisherIndex.access_status == 1">
                <p class="font-class" v-html="publisherIndex.access_content"></p>
              </div>

              <div class="form-group">
                <label for="note">Note (optional)</label>
                <textarea rows="3" cols="1" class="form-control" placeholder="Send a note...." v-model="modalData.note"  id="note"></textarea>
              </div>
              <div class="form-group mt-3">
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" role="switch" value="1" v-model="modalData.mailAction"/>
                  <label class="form-check-label" for="send-mail-btn">Send Mail</label>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" @click="submiteModal()" class="btn btn-primary"><i class="fas fa-check fa-sm me-1"></i> Confirm</button>
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

export default {
  setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
  props: ["publisherIndex"],
  components: {
    Loader,
    Breadcrumb,
  },
  data() {
    return {
      breadcrumbs: [
        { label: "Dashboard", url: "/dashboard" },
        { label: "Publishers ", url: "" },
      ],
      getLoader: false,
      modalDisplay: "none",
      modalTitle: "",
      myData: {
        draw: "1",
        "columns[0][data]": "0",
        "columns[0][name]": "",
        "columns[0][searchable]": "true",
        "columns[0][orderable]": "false",
        "columns[0][search][value]": "",
        "columns[0][search][regex]": "false",
        "columns[1][data]": "1",
        "columns[1][name]": "",
        "columns[1][searchable]": "true",
        "columns[1][orderable]": "false",
        "columns[1][search][value]": "",
        "columns[1][search][regex]": "false",
        "columns[2][data]": "2",
        "columns[2][name]": "",
        "columns[2][searchable]": "true",
        "columns[2][orderable]": "false",
        "columns[2][search][value]": "",
        "columns[2][search][regex]": "false",
        "columns[3][data]": "3",
        "columns[3][name]": "",
        "columns[3][searchable]": "true",
        "columns[3][orderable]": "false",
        "columns[3][search][value]": "",
        "columns[3][search][regex]": "false",
        "columns[4][data]": "4",
        "columns[4][name]": "",
        "columns[4][searchable]": "true",
        "columns[4][orderable]": "false",
        "columns[4][search][value]": "",
        "columns[4][search][regex]": "false",
        "columns[5][data]": "5",
        "columns[5][name]": "",
        "columns[5][searchable]": "true",
        "columns[5][orderable]": "false",
        "columns[5][search][value]": "",
        "columns[5][search][regex]": "false",
        "columns[6][data]": "6",
        "columns[6][name]": "",
        "columns[6][searchable]": "true",
        "columns[6][orderable]": "false",
        "columns[6][search][value]": "",
        "columns[6][search][regex]": "false",
        "columns[7][data]": "7",
        "columns[7][name]": "",
        "columns[7][searchable]": "true",
        "columns[7][orderable]": "false",
        "columns[7][search][value]": "",
        "columns[7][search][regex]": "false",
        "columns[8][data]": "8",
        "columns[8][name]": "",
        "columns[8][searchable]": "true",
        "columns[8][orderable]": "false",
        "columns[8][search][value]": "",
        "columns[8][search][regex]": "false",
        "columns[9][data]": "9",
        "columns[9][name]": "",
        "columns[9][searchable]": "true",
        "columns[9][orderable]": "false",
        "columns[9][search][value]": "",
        "columns[9][search][regex]": "false",
        "columns[10][data]": "10",
        "columns[10][name]": "",
        "columns[10][searchable]": "true",
        "columns[10][orderable]": "false",
        "columns[10][search][value]": "",
        "columns[10][search][regex]": "false",
        "columns[11][data]": "11",
        "columns[11][name]": "",
        "columns[11][searchable]": "true",
        "columns[11][orderable]": "false",
        "columns[11][search][value]": "",
        "columns[11][search][regex]": "false",
        start: "0",
        length: "",
        search: "",
        start_date: "",
        end_date: "",
        order_by: "",
        manager: "",
        status: "",
      },
      modalData: {
        data: "",
        action_type: "",
        email: " ",
        note: "",
        mailAction: "",
      },
      deleteUser:{
        user_id : '',
        deleted_note: ''
      },
      currentPage: 1,
      lastPage: 1,
      recordsTotal : 0,
      startPage : 0,
      endPage : 0,
      searchInputValue : "",
      bulkactionids : {
        selectedIds: [],
        status: "",
        deleted_note : "",
      },
      validationErrorsForNote : null,
      assignuser : {
        userid : "",
        managerid : "",
      }
    };
  },
  async mounted() { 
    try {
      const { role, isAuthorized } = await fetchUserRole();
      if (role == 'Super' || role == 'Admin') {
        this.getPublisherData();
        this.$nextTick(() => {
          const dataTableWrapper = document.querySelectorAll('#publisher_datatables_wrapper .row.mx-2');
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
  methods: {
    getPublisherData(page = 1, perPage = 10,searchValue = '') {
      this.getLoader = true;
      axios
        .post(
          this.globalVariables.apiUrl+"admin/manage/publishers/get-data",
          this.myData,
          { 
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
            params: { page: page, perPage: perPage,search: searchValue},
          }
        )
        .then((res) => {
          const { data, current_page, last_page,recordsTotal } = res.data;
          this.currentPage = current_page;
          this.lastPage = last_page;
          this.recordsTotal = recordsTotal;

          this.startPage = (current_page - 1) * perPage + 1;
          this.endPage = Math.min(current_page * perPage, recordsTotal);

          if ($.fn.DataTable.isDataTable("#publisher_datatables")) {
            $('#publisher_datatables').DataTable().destroy();
          }
        var table = $('#publisher_datatables').DataTable({
          data: data,
          columns: [
            // { data: "1" }, 
            { data: "1" }, 
            { data: "1" },
            {
                data: "12",
                render: function (data, type, row) {
                  return '<span class="badge bg-success">'+row['12']+'</span>';
                },
              }, 
            {
                data: "2",
                render: function (data, type, row) {
                  return '<a data-vue-route title="'+row['2']+'" href="/admin-manage-publishers-view/'+row['3']+'">'+row['2']+'</a>';
                },
              },
              {
                data: "4",
                render: function (data, type, row) {
                  return '<a data-vue-route title="'+row['4']+'" href="/admin-manage-publishers-view/'+row['3']+'">'+row['4']+'</a>';
                },
              },
            // { data: "2" }, 
            // { data: "4" }, 
            { 
              data: "5",
              render: function (data, type, row) {
                if (row['5'] != null) {
                  return '<span title="'+row['5']+'">'+row['5']+'</span>';
                }
                return '----------';
              },
            }, 
            { data: "6" }, 
            { data: "7" }, 
            { data: "8" }, 
            // {
            //     data: "11",
            //     render: function (data, type, row) {
            //       return '<a data-vue-route title="View" href="/admin-manage-publishers-view/'+row['3']+'">'+row['4']+'</a>';
            //     },
            //   },
            { data: "11",
              render: function (data, type, row) {
                  return '<span  title="'+row['11']+'">'+row['11']+'</span>';
                },
             }, 
            { data: "14",
              render: function (data, type, row) {
                  return '<span  title="'+row['14']+'">'+row['14']+'</span>';
                },
             }, 
            { data: "13",
              render: function (data, type, row) {
                  return '<span  title="'+row['13']+'">'+row['13']+'</span>';
                },
             }, 
            
            { data: "9" }, 
            // { data: "9" }, 
            { data: "10" }, 
            // { data: "11" }, 
          ],
          initComplete: () => { 
            this.attachEventListeners();
            this.attachEventListenersAssigModal();
            this.attachEventListenersForMenu();
            this.attachEventListenersForSearch();
            this.attachEventListenersBlulkAction();
            this.attachEventListenersBlulkActionSubmit();

            const searchInput = $("#publisher_datatables_filter input");
            searchInput.val(this.searchInputValue);
            if(this.searchInputValue != ''){
              searchInput.focus();
            }
            searchInput.off().on("keyup", (e) => {
              const searchTerm = e.target.value;
              this.searchInputValue = searchTerm;
              this.getPublisherData(1, perPage, searchTerm);
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
                return `<input type="checkbox" class="dt-checkboxes form-check-input ms-1 row-checkbox" data-id="${row[3]}">`;
              },
              searchable: false
            },
            { targets: 9, orderable: false, className: 'dt-center' }
          ],
          order: [[1, 'asc']],
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
            searchPlaceholder: 'Search Publisher',
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
                      <option value="0">Bulk Pending</option>
                      <option value="1">Bulk Approved</option>
                      <option value="2">Bulk Suspend</option>
                      <option value="3">Bulk Unsuspend</option>
                      <option value="4">Bulk Pause</option>
                      <option value="5">Bulk Resume</option>
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
                  exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8,9] }
                },
                {
                  extend: 'csv',
                  text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                  className: 'dropdown-item',
                  exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8,9] }
                },
                {
                  extend: 'excel',
                  text: '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                  className: 'dropdown-item',
                  exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8,9] }
                },
                {
                  extend: 'pdf',
                  text: '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                  className: 'dropdown-item',
                  exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8,9] }
                },
                {
                  extend: 'copy',
                  text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                  className: 'dropdown-item',
                  exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8,9] }
                }
              ]
            },
          ],
        });
        this.getLoader = false;
        })
        .catch((e) => {
          return e;
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    attachEventListeners() {
      $("#publisher_datatables").on("click", ".publisher-action", (event) => {
        const target = $(event.target);
        const dataId = target.data("id");
        const dataClass = target.data("action");
        const dataEmail = target.data("email");
        if(dataClass === 'payment-btn'){
          this.paymentsDtails(dataId);
        }else if(dataClass === 'delete-btn'){
          this.deltePublisher(dataId);
        }else if(dataClass === 'approved-btn'){
          this.modalData.data = dataId;
          this.modalData.email = dataEmail;
          this.modalData.action_type = "approved",
          this.modalTitle = "Want to Approved";
          this.modalDisplay = "block";

        }else if(dataClass === 'pending-btn'){
          this.modalData.data = dataId;
          this.modalData.email = dataEmail;
          this.modalData.action_type = "pending",
          this.modalTitle = "Want to Pending";
          this.modalDisplay = "block";

        }else if(dataClass === 'unsuspend-btn'){
          this.modalData.data = dataId;
          this.modalData.email = dataEmail;
          this.modalData.action_type = "unsuspend",
          this.modalTitle = "Want to Unsuspend";
          this.modalDisplay = "block";

        }else if(dataClass === 'suspend-btn'){
          this.modalData.data = dataId;
          this.modalData.email = dataEmail;
          this.modalData.action_type = "suspend",
          this.modalTitle = "Want to Suspend";
          this.modalDisplay = "block";

        }else if(dataClass === 'resume-btn'){
          this.modalData.data = dataId;
          this.modalData.email = dataEmail;
          this.modalData.action_type = "resume",
          this.modalTitle = "Want to Resume";
          this.modalDisplay = "block";

        }else if(dataClass === 'pause-btn'){
          this.modalData.data = dataId;
          this.modalData.email = dataEmail;
          this.modalData.action_type = "pause",
          this.modalTitle = "Want to Push";
          this.modalDisplay = "block";

        }else if(dataClass === 'log-in-publisher'){
          this.loginAsPublisher(dataId);
        }
      });
    },

    attachEventListenersAssigModal() {
      $("#publisher_datatables").on("click", "#assign-manager", (event) => {
        const target = $(event.target);
        const dataId = target.data("id");
        const dataManager = target.data("manager");
        this.assignuser.userid = dataId;
        this.assignuser.managerid = dataManager ? dataManager : "";
      });
    },
    
    attachEventListenersForSearch() {
      $("#publisher_datatables_wrapper #publisher_datatables_filter input").on("keyup", (event) => {
        const target = $(event.target);
        const getSearchValue = target.val();
        this.getPublisherData(1,10,getSearchValue);
      });
    },

    attachEventListenersForMenu() {
      $("#publisher_datatables_wrapper [name='publisher_datatables_length']").on("change", (event) => {
        this.getLoader = true;
        const target = $(event.target);
        const getSelectedValue = target.val();
        this.getPublisherData(1,getSelectedValue);
      });
    },
    attachEventListenersBlulkAction() {
      $('#publisher_datatables').on('change', '.row-checkbox', (event) => {
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
      $('#publisher_datatables thead').on('change', 'input[type="checkbox"]', (event) => {
        const isChecked = event.target.checked;
        $('#publisher_datatables tbody .row-checkbox').each((index, checkbox) => {
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
          if (action === "0") {
            this.bulkactionids.status = '0';
            const alertTitle = "User Want to Pending";
            this.bulkStatusChange(alertTitle);
          } else if (action === "1") {
            this.bulkactionids.status = '1';
            const alertTitle = "User Want to Approved";
            this.bulkStatusChange(alertTitle);
          } else if (action === "2") {
            this.bulkactionids.status = '2';
            const alertTitle = "User Want to Suspend";
            this.bulkStatusChange(alertTitle);
          } else if (action === "3") {
            this.bulkactionids.status = '3';
            const alertTitle = "User Want to Unsuspend";
            this.bulkStatusChange(alertTitle);
          }else if (action === "4"){
            this.bulkactionids.status = '4';
            const alertTitle = "User Want to Pause";
            this.bulkStatusChange(alertTitle);
          }else{
            this.bulkactionids.status = '5';
            const alertTitle = "User Want to Resume";
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
          const modalElement = document.getElementById('bulkDeleteModal');
          const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
          if(modal){
            modal.show();
          }
        }
      });
    },

    bulkactionsubmission(){
      (this.getLoader = true),
            axios
              .post(
                this.globalVariables.apiUrl + "admin/manage/super-admin/delete/bulk",
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
                  this.getPublisherData();
                  const modalElement = document.getElementById('bulkDeleteModal');
                  const modals = bootstrap.Modal.getInstance(modalElement);
                  if(modals){
                    modals.hide();
                  }
                } else {
                  toastr.error(res.data.message);
                }
              })
              .catch((error) => {
                if (error?.response?.data?.errors) {
                  this.validationErrorsForNote = error.response.data.errors;
                }
              })
              .finally(() => {
                this.getLoader = false;
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
                this.globalVariables.apiUrl + "admin/manage/super-admin/status/bulk",
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
                  this.getPublisherData();
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

    // Account Manager Settings
    assignAccountManager() {
      this.getLoader = true;
      axios
        .post(
          this.globalVariables.apiUrl+"admin/manage/user/assign-account-manager",
          this.assignuser,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          if(res.data.status == 'success'){
            this.getPublisherData();
            toastr.success(res.data.message);
            const modalElement = document.getElementById('assignToManager');
            const modal = bootstrap.Modal.getInstance(modalElement);
            if(modal){
              modal.hide();
            }
          }else{
            toastr.error(res.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    // Account Access Settings
    submiteModal() {
      this.getLoader = true;
      axios
        .post(
          this.globalVariables.apiUrl+"admin/manage/user/account-access",
          this.modalData,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          if(res.data.status == 'success'){
            this.getPublisherData();
            toastr.success(res.data.message);
            const modalElement = document.getElementById('statusChangeModal');
            const modal = bootstrap.Modal.getInstance(modalElement);
            if(modal){
              modal.hide();
            }
          }else{
            toastr.error(res.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.getLoader = false;
        });
    },
    //Payment Detailse View 
    paymentsDtails(id){
      this.getLoader = true;
      axios
        .get(
          this.globalVariables.apiUrl+"admin/payment/history/"+id,
          { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
        )
        .then((res) => {
          if(res.data.status == 'error'){
            toastr.error(res.data.message);
          }else{
            window.open("/admin-manage-publishers-pay-details/" + id, "_blank");
          }
        })
        .catch((error) => {
          console.log(error);;
        })
        .finally (() => {
          this.getLoader = false;
        });
    },
    // Reset Search 
    SearchData(){
      this.getPublisherData();
    },
    //Login As Publisher
    loginAsPublisher(publisherId) {
      this.getLoader =  true;
      axios
        .get(this.globalVariables.apiUrl+`admin/login/${publisherId}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if(res.data.status == 'success'){
            localStorage.setItem("admin_Id", res.data.admin_id);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem('authUserFromLocalStorage', JSON.stringify(res.data));
            this.$router.push("/publisher/dashboard/user");
          }else{
            window.location.href = 'https://doppcall.com/login?token=logout';
            toastr.error(res.data.message);
          }
        })
        .catch((e) => {
          return e;
        })
        .finally(() => {
          this.getLoader = false;
        });
    },
    
    // User Delete
    deltePublisher(id) {
      this.deleteUser.user_id = id; 
      Swal.fire({
        text: "Are you sure delete",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.value) {
          const modalElement = document.getElementById('singleDeleteModal');
          const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
          if(modal){
            modal.show();
          }
        } 
      });
    },
    deletePublisherWithNote(){
      this.getLoader = true;
        axios
          .post(this.globalVariables.apiUrl+"admin/manage/user/delete", this.deleteUser, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
            toastr.success(res.data.message);
            this.getPublisherData();
            const modalElement = document.getElementById('singleDeleteModal');
            const modals = bootstrap.Modal.getInstance(modalElement);
            if(modals){
              modals.hide();
            }
          })
          .catch((error) => {
            if (error?.response?.data?.errors) {
              this.validationErrorsForNote = error.response.data.errors;
            }
          })
          .finally(() => {
            this.getLoader = false;
          });
    },
    // Model Close
    modalClose() {
      this.modalDisplay = "none";
    },

    
  },
};
</script>

<style>
.dropdown-item {
	display: flex !important;
	align-items: center  !important;
}
#publisher_datatables colgroup:nth-of-type(2) {
	display: none !important;
}
#publisher_datatables .dt-checkboxes-cell{
	padding: 0.7rem 0.5rem !important;
}
.modal-title {
  font-size: 18px;
  font-weight: 700;
  color: #242f48;
  line-height: 1;
}
.font-class {
  font-family: Raleway, sans-serif !important;
}
.admin-publish-country-flag {
	width: 20px;
}
#dropdownMenuButton {
	background: transparent;
}
.sorting{
  width: 10rem;
}
#publisher_datatables td {
  white-space: nowrap; 
  overflow: hidden; 
  text-overflow: ellipsis; 
  max-width: 120px; 
}
/* #publisher_datatables  {
  min-height: 500px;
} */
</style>
