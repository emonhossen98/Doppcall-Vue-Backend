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
                <div class="card-header py-3">
                    <h5 class="card-title mb-0">Industrial Contact</h5>
                </div>
                <div class="card-body">
                        <table class="aalign-middle mb-0 table table-hover" id="industrial_datatables">
                            <thead>
                              <!-- <th></th> -->
                              <!-- <th></th> -->
                              <th>SL</th>
                              <th>Company Name</th>
                              <th>First Name</th>
                              <th>Last Name</th>
                              <th>Email</th>
                              <th>Phone</th>
                              <th>Country</th>
                              <th>Buy Call</th>
                              <th>Page URL</th>
                              <th>Vertical Calls</th>
                              <th>Website</th>
                              <th>Submited</th>
                              <th>Created At</th>
                              <th id="action-incompleted">Action</th>
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
                                <button class="page-link" @click="getIndustialContacts(currentPage - 1)" :disabled="currentPage === 1" >
                                  <i class="fa-solid fa-chevron-left"></i>
                                </button>
                              </li>

                              <!-- Page Numbers -->
                              <template v-for="page in paginationPages" :key="page">
                                <li class="paginate_button page-item" :class="{ active: page === currentPage }">
                                  <button class="page-link" @click="getIndustialContacts(page)">
                                    {{ page }}
                                  </button>
                                </li>
                              </template>

                              <!-- Next Button -->
                              <li class="paginate_button page-item next" :class="{ disabled: currentPage === lastPage }">
                                <button  class="page-link" @click="getIndustialContacts(currentPage + 1)" :disabled="currentPage === lastPage">
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
 <div class="modal fade" id="industrialContactModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel3">Inindustrial Contact Informations</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <table class="table table-sm table-hover table-bordered industrial-modal">
                    <tr>
                        <td class="font-weight-bold">Company Name :</td>
                        <td id="company_name"></td>
                    </tr>
                    <tr>
                        <td class="font-weight-bold">First Name :</td>
                        <td id="first_name"></td>
                    </tr>
                    <tr>
                        <td class="font-weight-bold">Last Name :</td>
                        <td id="last_name"></td>
                    </tr>
                    <tr>
                        <td class="font-weight-bold">E-mail :</td>
                        <td id="email"></td>
                    </tr>
                    <tr>
                        <td class="font-weight-bold">Phone Number :</td>
                        <td id="phone_number"></td>
                    </tr>
                    <tr>
                        <td class="font-weight-bold">Website :</td>
                        <td id="website"></td>
                    </tr>
                    <tr>
                        <td class="font-weight-bold">Country :</td>
                        <td id="country"></td>
                    </tr>
                    <tr>
                        <td class="font-weight-bold">Are you looking to buy calls?</td>
                        <td id="buy_cell"></td>
                    </tr>
                    <tr>
                        <td class="font-weight-bold">What vertical calls do you need?</td>
                        <td id="vertical_cell"></td>
                    </tr>
                    <tr>
                        <td class="font-weight-bold">From Which State/Country you want to get calls?</td>
                        <td id="get_cell"></td>
                    </tr>
                </table>
        </div>
      </div>
    </div>
  </div>
    </div>
    <!-- Content wrapper -->
</template>
  <script>

import axios from "axios";
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
        { label: "Industrial Contact", url: "" },
      ],
      getLoader: false,
      showModal: false,
      industialView : {
        data_id : "",
      },
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
      const { role, isAuthorized } = await fetchUserRole();
      if (role == 'Super' || role == 'Admin') {
        this.getIndustialContacts();
        this.$nextTick(() => {
          const dataTableWrapper = document.querySelectorAll('#industrial_datatables_wrapper .row.mx-2');
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
    getIndustialContacts(page = 1, perPage = 10,searchValue = '') {
      this.getLoader =  true;
      axios
        .get(this.globalVariables.apiUrl+"admin/mailsettings/industrial-contacts/get-data", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },  
          params: { page: page, perPage: perPage,search: searchValue},
        })
        .then((res) => {
          const { data, current_page, last_page,recordsTotal } = res.data;
          this.currentPage = current_page;
          this.lastPage = last_page;
          this.recordsTotal = recordsTotal;
          this.startPage = (current_page - 1) * perPage + 1;
          this.endPage = Math.min(current_page * perPage, recordsTotal);

            if ($.fn.DataTable.isDataTable("#industrial_datatables")) {
            $('#industrial_datatables').DataTable().destroy();
          }
          var formateDate = this.formatDates;
        var table = $('#industrial_datatables').DataTable({
          data: data,
          columns: [
            // { data: 'id' },
            // { data: 'id' },
            { data: 'id' },
            { data: "company_name",
              render: function (data, type, row) {
                    if (row?.company_name != null) {
                      return '<span title="'+row.company_name+'">'+row.company_name+'</span>';
                    } else {
                      return '----';
                    }
                } 
             }, 
            { data: "first_name",
              render: function (data, type, row) {
                    if (row?.company_name != null) {
                      return '<span title="'+row.first_name+'">'+row.first_name+'</span>';
                    } else {
                      return '----';
                    }
                } 
             },
            { data: "last_name",
              render: function (data, type, row) {
                    if (row?.last_name != null) {
                      return '<span title="'+row.last_name+'">'+row.last_name+'</span>';
                    } else {
                      return '----';
                    }
                } 
             },
            { data: "email",
              render: function (data, type, row) {
                    if (row?.email != null) {
                      return '<span title="'+row.email+'">'+row.email+'</span>';
                    } else {
                      return '----';
                    }
                } 
             },
            { data: "phone",
              render: function (data, type, row) {
                    if (row?.phone != null) {
                      return '<span title="'+row.phone+'">'+row.phone+'</span>';
                    } else {
                      return '----';
                    }
                } 
             },
            { data: "country",
              render: function (data, type, row) {
                    if (row?.country != null) {
                      return '<span title="'+row.country+'">'+row.country+'</span>';
                    } else {
                      return '----';
                    }
                } 
             },
            { data: "buy_call",
              render: function (data, type, row) {
                    if (row?.buy_call != null) {
                      return '<span title="'+row.buy_call+'">'+row.buy_call+'</span>';
                    } else {
                      return '----';
                    }
                } 
             },
            { data: "page_url",
              render: function (data, type, row) {
                    if (row?.page_url != null) {
                      return '<span title="'+row.page_url+'">'+row.page_url+'</span>';
                    } else {
                      return '----';
                    }
                } 
             },
            { data: "vertical_calls",
              render: function (data, type, row) {
                    if (row?.vertical_calls != null) {
                      return '<span title="'+row.vertical_calls+'">'+row.vertical_calls+'</span>';
                    } else {
                      return '----';
                    }
                } 
             },
            { data: "website",
              render: function (data, type, row) {
                    if (row?.website != null) {
                      return '<span title="'+row.website+'">'+row.website+'</span>';
                    } else {
                      return '----';
                    }
                } 
             },
            { data: "submited_data",
              render: function (data, type, row) {
                    if (row?.submited_data != null) {
                      return '<span title="'+row.submited_data+'">'+row.submited_data+'</span>';
                    } else {
                      return '----';
                    }
                } 
             },
             {
                data: "created_at",
                render: function (data, type, row) {
                  if (row.created_at != null) {
                    return formateDate(row.created_at);
                  }
                  return "--------";
                },
              },
                   {
                 data : "updated_at",
                 render: function (data, type, row) {
                  return '<button data-id="'+row.id+'" title="View" id="industial_contact_view" data-action="industial_contact_view" data-bs-toggle="modal" data-bs-target="#industrialContactModal" class="bg-transparent border-0 text-success"><i class="fas fa-eye fa-sm" data-action="industial_contact_view" data-id="'+row.id+'"></i></button>'
                 }
              }
          ],
          initComplete: () => { 
            $('#industrial_datatables').wrap('<div class="commonDataTablesClass"></div>');
            const table = $("#industrial_datatables").DataTable();
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

            const searchInput = $("#industrial_datatables_filter input");
            searchInput.val(this.searchInputValue);
            if(this.searchInputValue != ''){
                searchInput.focus();
            }

            searchInput.off().on("keyup", (e) => {
              const searchTerm = e.target.value;
              this.searchInputValue = searchTerm;
              this.getIndustialContacts(1, perPage, searchTerm);
            });
          },
            createdRow: function (row, data, dataIndex) {
              const perPage = 10; 
              const rowNumber = (dataIndex + 1) + (page - 1) * perPage;
              $('td:eq(0)', row).html(rowNumber);
            },
            columnDefs: [
              {
                targets: 7, 
                visible: false,
              },
              {
                targets: 8, 
                visible: false,
              },
              {
                targets: 9, 
                visible: false,
              },
              {
                targets: 10, 
                visible: false,
              },
              ],
          order: [[0, 'desc']],
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
            searchPlaceholder: 'Search Contact',
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
                  exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8, 9] }
                },
                {
                  extend: 'csv',
                  text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                  className: 'dropdown-item',
                  exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8, 9] }
                },
                {
                  extend: 'excel',
                  text: '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                  className: 'dropdown-item',
                  exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8, 9] }
                },
                {
                  extend: 'pdf',
                  text: '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                  className: 'dropdown-item',
                  exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8, 9] }
                },
                {
                  extend: 'copy',
                  text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                  className: 'dropdown-item',
                  exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8, 9] }
                }
              ]
            },
            {
                  className: "btn btn-primary",
                  text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">SL</a></li><li><a class="dropdown-item" href="#" data-column="1">Company Name</a></li><li><a class="dropdown-item" href="#" data-column="2">First Name</a></li><li><a class="dropdown-item" href="#" data-column="3">Last Name</a></li><li><a class="dropdown-item" href="#" data-column="4">Email</a></li><li><a class="dropdown-item" href="#" data-column="5">Phone</a></li><li><a class="dropdown-item" href="#" data-column="6">Country</a></li><li><a class="dropdown-item" href="#" data-column="7">Buy Call</a></li><li><a class="dropdown-item" href="#" data-column="8">Page URL</a></li><li><a class="dropdown-item" href="#" data-column="9">Vertical Calls</a></li><li><a class="dropdown-item" href="#" data-column="10">Website</a></li><li><a class="dropdown-item" href="#" data-column="11">Submited</a></li><li><a class="dropdown-item" href="#" data-column="12">Created At</a></li><li><a class="dropdown-item" href="#" data-column="13">Action</a></li></div></ul></div>',
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

    formatDates(date) {
      return moment(date).format('D MMMM YYYY');
    },

    attachEventListeners() {
      $('#industrial_datatables').on('click', '#industial_contact_view', (event) => {
        const target = $(event.target);
        const dataId = target.data('id');
        const dataClass = target.data('action');
        this.industialView.data_id = dataId;
        if(dataClass === 'industial_contact_view'){
          this.getContactInformation();
        }
      });
    },
    attachEventListenersForMenu() {
      $("#industrial_datatables_wrapper [name='industrial_datatables_length']").on("change", (event) => {
        this.getLoader = true;
        const target = $(event.target);
        const getSelectedValue = target.val();
        this.getIndustialContacts(1,getSelectedValue);
      });
    },
    attachEventListenersForSearch() {
      $("#industrial_datatables_wrapper #industrial_datatables_filter input").on("keyup", (event) => {
        const target = $(event.target);
        const getSearchValue = target.val();
        this.getIndustialContacts(1,10,getSearchValue);
      });
    },

    getContactInformation(){
      this.getLoader = true;
      axios
        .post(this.globalVariables.apiUrl+"admin/mailsettings/industrial-contacts/view",this.industialView, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },  
        })
        .then((res) => {
          document.querySelector('#company_name').innerHTML = res.data.company_name ?? '';
          document.querySelector('#first_name').innerHTML = res.data.first_name ?? '';
          document.querySelector('#last_name').innerHTML = res.data.last_name ?? '';
          document.querySelector('#email').innerHTML = res.data.email ?? '';
          document.querySelector('#phone_number').innerHTML = res.data.phone ?? '';
          document.querySelector('#website').innerHTML = res.data.website ?? '';
          document.querySelector('#country').innerHTML = res.data.country ?? '';
          document.querySelector('#buy_cell').innerHTML = res.data.buy_call ?? '';
          document.querySelector('#vertical_cell').innerHTML = res.data.vertical_calls ?? '';
          document.querySelector('#get_cell').innerHTML = res.data.get_calls ?? '';
          this.showModal = true;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.getLoader = false;
        });
    }
  },
};
</script>
<style>
#industrial_datatables td {
  white-space: nowrap; /* Prevents wrapping */
  overflow: hidden; /* Hides overflow */
  text-overflow: ellipsis; /* Adds "..." for overflow */
  max-width: 100px; /* Set max width for cell */
}
#industrial_datatables colgroup:nth-of-type(2) {
	display: none !important;
}
#industrial_datatables .dt-checkboxes-cell{
	padding: 0.7rem 0.5rem !important;
}
#industrialContactModal table td {
  padding : 10px 25px !important;
}
.industial_contact_view {
	border: none;
	background: #2ea33b;
	color: white;
}
</style>
