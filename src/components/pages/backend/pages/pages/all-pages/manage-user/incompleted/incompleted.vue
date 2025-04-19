<template>
  <div v-if="getLoader">
    <Loader></Loader>
  </div>
  <!-- Content wrapper -->
  <div class="content-wrapper">
    <!-- Content -->
    <div class="container-xxl flex-grow-1 container-p-y">
      <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
      <div class="row mt-4">
        <div class="col-12">
          <div class="card">
            <div class="card-header pt-3 pb-1">
              <h5 class="card-title mb-0">Incomplete Register Users</h5>
            </div>
            <div class="card-body table-responsive table-overflow-hidden">
              <table class="align-middle mb-0 table table-hover" :class="dataSteps == 1 ? 'dataTables_steps1' : 'dataTables_steps2'" id="incompletedusers">
                <thead>
                  <tr>
                    <!-- <th></th> -->
                    <th></th>
                    <th :class="dataSteps == 2 ? 'd-none' : ''">User Type</th>
                    <th :class="dataSteps == 2 ? 'd-none' : ''">First Name</th>
                    <th :class="dataSteps == 2 ? 'd-none' : ''">Last Name</th>
                    <th :class="dataSteps == 2 ? 'd-none' : ''">Email</th>
                    <th :class="dataSteps == 2 ? 'd-none' : ''">Phone</th>
                    <th :class="dataSteps == 2 ? 'd-none' : ''">Country</th>
                    <th :class="dataSteps == 2 ? 'd-none' : ''">Company Name</th>
                    <th :class="dataSteps == 2 ? 'd-none' : ''">Company Website</th>
                    <th :class="dataSteps == 2 ? 'd-none' : ''">Created At</th>
                    <th class="d-none">Address</th>
                    <th class="d-none">City</th>
                    <th class="d-none">State</th>
                    <th class="d-none">Zip Code</th>
                    <th class="d-none">Country</th>
                    <th class="d-none">Skype Id</th>
                    <th class="d-none">Linkedin Id</th>
                    <th :class="dataSteps == 2 ? 'd-none' : ''">Action</th>

                    <th :class="dataSteps == 1 ? 'd-none' : ''">User Type</th>
                    <th :class="dataSteps == 1 ? 'd-none' : ''">Address</th>
                    <th :class="dataSteps == 1 ? 'd-none' : ''">City</th>
                    <th :class="dataSteps == 1 ? 'd-none' : ''">State</th>
                    <th :class="dataSteps == 1 ? 'd-none' : ''">Zip Code</th>
                    <th :class="dataSteps == 1 ? 'd-none' : ''">Country</th>
                    <th :class="dataSteps == 1 ? 'd-none' : ''">Skype Id</th>
                    <th :class="dataSteps == 1 ? 'd-none' : ''">Linkedin Id</th>
                    <th :class="dataSteps == 1 ? 'd-none' : ''">Action</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
              <div class="row justify-content-between align-items-center">
                <div class="col-md-3">
                  Showing {{ startPage }} to {{ endPage }} of {{ recordsTotal }} entries
                </div>
                <div
                  class="pagination-controls col-md-9 d-flex justify-content-end align-items-center"
                >
                  <ul class="pagination mb-0">
                    <!-- Previous Button -->
                    <li
                      class="paginate_button page-item previous"
                      :class="{ disabled: currentPage === 1 }"
                    >
                      <button
                        class="page-link"
                        @click="getUserTrashs(currentPage - 1)"
                        :disabled="currentPage === 1"
                      >
                        <i class="fa-solid fa-chevron-left"></i>
                      </button>
                    </li>

                    <!-- Page Numbers -->
                    <template v-for="page in paginationPages" :key="page">
                      <li
                        class="paginate_button page-item"
                        :class="{ active: page === currentPage }"
                      >
                        <button class="page-link" @click="getUserTrashs(page)">
                          {{ page }}
                        </button>
                      </li>
                    </template>

                    <!-- Next Button -->
                    <li
                      class="paginate_button page-item next"
                      :class="{ disabled: currentPage === lastPage }"
                    >
                      <button
                        class="page-link"
                        @click="getUserTrashs(currentPage + 1)"
                        :disabled="currentPage === lastPage"
                      >
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
              Incomplete Register Details
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
                  <td class="font-weight-bold">First Name :</td>
                  <td id="f-name"></td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Last Name :</td>
                  <td id="l-name"></td>
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
                  <td class="font-weight-bold">Country Code :</td>
                  <td id="country_code"></td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Company Name :</td>
                  <td id="company_name"></td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Company Website :</td>
                  <td id="company_website"></td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Address :</td>
                  <td id="address"></td>
                </tr>
                <tr>
                  <td class="font-weight-bold">City :</td>
                  <td id="city"></td>
                </tr>
                <tr>
                  <td class="font-weight-bold">State :</td>
                  <td id="state"></td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Zip Code :</td>
                  <td id="zip_code"></td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Country :</td>
                  <td id="country"></td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Skype Id :</td>
                  <td id="skype_id"></td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Linkedin Id :</td>
                  <td id="linkedin_id"></td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Facebook Id :</td>
                  <td id="facebook_id"></td>
                </tr>
                <tr>
                  <td class="font-weight-bold">User Type :</td>
                  <td id="user_type"></td>
                </tr>
              </table>
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
import { format } from "date-fns";
import { fetchUserRole } from "@/services/userService";

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
        { label: "Incomplete Register Users ", url: "" },
      ],
      getLoader: false,
      currentPage: 1,
      lastPage: 1,
      recordsTotal: 0,
      startPage: 0,
      endPage: 0,
      searchInputValue: "",
      dataSteps: 1,
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
        if (start > 2) pages.splice(1, 0, "...");
      }
      if (end < this.lastPage) {
        pages.push("...");
        pages.push(this.lastPage);
      }
      return pages;
    },
  },
  async mounted() {
    try {
      const { role, isAuthorized } = await fetchUserRole();
      if (role == "Super" || role == "Admin") {
        this.getUserTrashs();
        this.$nextTick(() => {
          const dataTableWrapper = document.querySelectorAll(
            "#incompletedusers_wrapper .row.mx-2"
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
    changeTableStatus(status){
      this.dataSteps = status;
    },

    getUserTrashs(page = 1, perPage = 10, searchValue = "") {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl + "admin/manage/incompleted/users", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          params: { page: page, perPage: perPage, search: searchValue },
        })
        .then((res) => {
          const { data, current_page, last_page, recordsTotal } = res.data;
          this.currentPage = current_page;
          this.lastPage = last_page;
          this.recordsTotal = recordsTotal;
          this.startPage = (current_page - 1) * perPage + 1;
          this.endPage = Math.min(current_page * perPage, recordsTotal);

          if ($.fn.DataTable.isDataTable("#incompletedusers")) {
            $("#incompletedusers").DataTable().destroy();
          }
            var table = $("#incompletedusers").DataTable({
              data: data,
              columns: [
                { data: "id" },
                {
                  data: "updated_at",
                  render: function (data, type, row) {
                    if (row.user_type == "publisher-register") {
                      return '<span class="badge bg-success text-white">Publisher</span>';
                    } else {
                      return '<span class="badge bg-warning text-white">Advertiser</span>';
                    }
                  },
                },
                { data: "fname" },
                { data: "lname" },
                { data: "email" },
                { data: "phone_no" },
                { data: "country" },
                { data: "company_name" },
                { data: "company_website" },
                { data: "created_at" },
                { data: "address" },
                { data: "city" },
                { data: "state" },
                { data: "zip_code" },
                { data: "country" },
                { data: "skype_id" },
                { data: "linkedin_id" },
                {
                  data: "updated_at",
                  render: function (data, type, row) {
                    return (
                      '<div class="trans_action d-flex"><button title="View" type="button" id="view-btn" data-bs-toggle="modal" data-bs-target="#contactInfoShow"  data-id=' +
                      row.id +
                      ' class="btn text-info  p-0"><i id="view-btn"  data-id=' +
                      row.id +
                      ' class="fa-regular fa-eye text-info me-2"></i></button><button title="Delete" type="button" id="delete-btn"  data-id=' +
                      row.id +
                      ' class="btn text-danger delete-btn p-0"><i  id="delete-btn"  data-id=' +
                      row.id +
                      ' class="fa-solid fa-trash"></i></button></div>'
                    );
                  },
                },
              ],
              
              initComplete: () => {
                this.attachEventListeners();

                this.attachEventListenersForMenu();
                this.attachEventListenersForSearch();

                const searchInput = $("#incompletedusers_filter input");
                searchInput.val(this.searchInputValue);
                if (this.searchInputValue != "") {
                  searchInput.focus();
                }

                searchInput.off().on("keyup", (e) => {
                  const searchTerm = e.target.value;
                  this.searchInputValue = searchTerm;
                  this.getUserTrashs(1, perPage, searchTerm);
                });
              },
              columnDefs: [
                {
                  targets: 0,
                  orderable: false,
                  checkboxes: {
                    selectAllRender: '<input type="checkbox" class="form-check-input">',
                  },
                  render: function () {
                    return '<input type="checkbox" class="dt-checkboxes form-check-input" >';
                  },
                  searchable: false,
                },
              ],
              order: [[0, "desc"]],
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
                searchPlaceholder: "Search Publisher",
                paginate: {
                  previous: '<i class="fa-solid fa-chevron-left"></i>',
                  next: '<i class="fa-solid fa-chevron-right"></i>',
                },
              },
              buttons: [
                {
                  extend: "collection",
                  className: "btn btn-label-primary dropdown-toggle me-3",
                  text: '<i class="ti ti-screen-share me-1 ti-xs"></i>Export',
                  buttons: [
                    // {
                    //   extend: "print",
                    //   text: '<i class="ti ti-printer me-1 ti-xs text-primary"></i>Print',
                    //   className: "dropdown-item",
                    //   exportOptions: { columns: [2, 3, 4, 5, 6, 7,8,9,10,11,12,13,14,15] },
                    // },
                    {
                      extend: "csv",
                      text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                      className: "dropdown-item",
                      exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] },
                    },
                    {
                      extend: "excel",
                      text:
                        '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                      className: "dropdown-item",
                      exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] },
                    },
                    // {
                    //   extend: "pdf",
                    //   text:
                    //     '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                    //   className: "dropdown-item",
                    //   exportOptions: { columns: [2, 3, 4, 5, 6, 7,8,9,10,11,12,13,14,15] },
                    // },
                    {
                      extend: "copy",
                      text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                      className: "dropdown-item",
                      exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] },
                    },
                    // {
                    //   extend: "colvis",
                    //   text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>colvis',
                    //   className: "dropdown-item",
                    //   exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] },
                    // },
                  ],
                },
                {
                  text: '<i class="ti ti-copy me-1 ti-xs"></i>Select Step',
                  className: "btn btn-label-secondary dropdown-toggle dropbottom select_step_btn",
                  action: function (e, dt, node, config) {
                    $(".dropdown-menu").remove();
                    const dropdown = `
                          <div class="dropdown-menu show" style="position:absolute;z-index:1050;top:3.4rem;left:84%;">
                            <a class="dropdown-item" href="#" id="step-1">Step 1</a>
                            <a class="dropdown-item" href="#" id="step-2">Step 2</a>
                          </div>`;
                    const dropdownContainer = $(node).parent();
                    dropdownContainer.append(dropdown);

                    $(".dropdown-item")
                      .off()
                      .on("click", (event) => {
                        event.preventDefault();
                        const id = event.target.id;

                        if (id === "step-1") {
                          this.changeTableStatus(1);
                        } else if (id === "step-2") {
                          this.changeTableStatus(2);
                        }

                        $(".dropdown-menu").remove();
                      });

                    $(document).on("click.dropdown", (event) => {
                      if (!$(event.target).closest(".dropdown-menu, .btn").length) {
                        $(".dropdown-menu").remove();
                        $(document).off("click.dropdown");
                      }
                    });
                  }.bind(this),
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

    formatTime(dateString) {
      const date = new Date(dateString);
      return format(date, "dd MMMM yyyy");
    },
    attachEventListeners() {
      $("#incompletedusers").on("click", ".trans_action", (event) => {
        const target = $(event.target);
        const dataId = target.data("id");
        const dataClass = target.attr("id");
        if (dataClass === "delete-btn") {
          this.delteTranUser(dataId);
        } else if (dataClass === "view-btn") {
          this.getLoader = true;
          axios
            .get(
              this.globalVariables.apiUrl + `admin/manage/incompleted/details/${dataId}`,
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
            )
            .then((res) => {
              document.querySelector("#f-name").innerHTML =
                res.data.data.fname ?? "--------";
              document.querySelector("#l-name").innerHTML =
                res.data.data.lname ?? "--------";
              document.querySelector("#email").innerHTML =
                res.data.data.email ?? "--------";
              document.querySelector("#phone-number").innerHTML =
                res.data.data.phone_no ?? "--------";
              document.querySelector("#country_code").innerHTML =
                res.data.data.country_code ?? "--------";
              document.querySelector("#company_name").innerHTML =
                res.data.data.company_name ?? "--------";
              document.querySelector("#company_website").innerHTML =
                res.data.data.company_website ?? "--------";
              document.querySelector("#address").innerHTML =
                res.data.data.address ?? "--------";
              document.querySelector("#city").innerHTML =
                res.data.data.city ?? "--------";
              document.querySelector("#state").innerHTML =
                res.data.data.state ?? "--------";
              document.querySelector("#zip_code").innerHTML =
                res.data.data.zip_code ?? "--------";
              document.querySelector("#country").innerHTML =
                res.data.data.country ?? "--------";
              document.querySelector("#skype_id").innerHTML =
                res.data.data.skype_id ?? "--------";
              document.querySelector("#linkedin_id").innerHTML =
                res.data.data.linkedin_id ?? "--------";
              document.querySelector("#facebook_id").innerHTML =
                res.data.data.facebook_id ?? "--------";
              if (res.data.data.user_type == "advertiser-register") {
                document.querySelector("#user_type").innerHTML =
                  '<span class="badge bg-warning text-white">Advertiser</span>';
              } else {
                document.querySelector("#user_type").innerHTML =
                  '<span class="badge bg-success text-white">Publisher</span>';
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
    attachEventListenersForMenu() {
      $("#incompletedusers_wrapper [name='incompletedusers_length']").on(
        "change",
        (event) => {
          this.getLoader = true;
          const target = $(event.target);
          const getSelectedValue = target.val();
          this.getUserTrashs(1, getSelectedValue);
        }
      );
    },
    attachEventListenersForSearch() {
      $("#incompletedusers_wrapper #incompletedusers_filter input").on(
        "keyup",
        (event) => {
          const target = $(event.target);
          const getSearchValue = target.val();
          this.getUserTrashs(1, 10, getSearchValue);
        }
      );
    },
    // User Delete
    delteTranUser(id) {
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
            .get(this.globalVariables.apiUrl + `admin/manage/incompleted/delete/${id}`, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((res) => {
              if (res.data.status == "success") {
                toastr.success(res.data.message);
                this.getUserTrashs();
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
<style scoped>
td {
  padding: 6px 15px !important;
}
</style>
<style>
#incompletedusers td {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 70px;
}
#incompletedusers th {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 70px;
}
#incompletedusers colgroup:nth-of-type(2) {
  display: none !important;
}
#incompletedusers .dt-checkboxes-cell {
  padding: 0.7rem 0.5rem !important;
}
 .dataTables_steps1 tbody tr td:nth-child(11) , .dataTables_steps1 tbody tr td:nth-child(12) , .dataTables_steps1 tbody tr td:nth-child(13), .dataTables_steps1 tbody tr td:nth-child(14), .dataTables_steps1 tbody tr td:nth-child(15), .dataTables_steps1 tbody tr td:nth-child(16),.dataTables_steps1 tbody tr td:nth-child(17){
 display: none;
}

.dataTables_steps2 tbody tr td:nth-child(3), .dataTables_steps2 tbody tr td:nth-child(4) , .dataTables_steps2 tbody tr td:nth-child(5) , .dataTables_steps2 tbody tr td:nth-child(6), .dataTables_steps2 tbody tr td:nth-child(7), .dataTables_steps2 tbody tr td:nth-child(8), .dataTables_steps2 tbody tr td:nth-child(9),.dataTables_steps2 tbody tr td:nth-child(10){
 display: none;
}
.select_step_btn {
	background: #e9e7fd !important;
	color: #7367f0 !important;
}
.select_step_btn:hover {
	color: #0162e8 !important;
	background: #e9e7fd !important;
}
#incompletedusers {
	width: 100% !important;
}
</style>
