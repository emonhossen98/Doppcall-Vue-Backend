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
              <div class="card-body table-responsive table-overflow-hidden">
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
                    <th>Action</th>
                  </thead>
                  <tbody></tbody>
                </table>
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
          { label: " Contacts", url: "" },
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
      };
    },
    async mounted() { 
        try {
          const { role, isAuthorized } = await fetchUserRole();
          if (role == 'Super' || role == 'Admin') {
            this.getcontactData();
            this.$nextTick(() => {
              const dataTableWrapper = document.querySelectorAll(
                "#contact_datatables_wrapper .row.mx-2"
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
      getcontactData() {
        this.getLoader = true;
        axios
          .get(this.globalVariables.apiUrl + "admin/contacts/get-data", {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          })
          .then((res) => {
            if ($.fn.DataTable.isDataTable("#contact_datatables")) {
              $("#contact_datatables").DataTable().destroy();
            }
            var table = $("#contact_datatables").DataTable({
              data: res.data,
              columns: [
                // { data: 'id' },
                { data: "id" },
                { data: "id" },
                { data: "full_name" },
                { data: "company_name" },
                { data: "buy_sell" },
                { data: "email" },
                { data: "phone_number" },
                { data: "country" },
                {
                  data: null, // Specify null for custom rendering
                  title: "Actions",
                  searchable: false,
                  orderable: false,
                  render: function (data, type, full, meta) {
                    return (
                      '<div class="contact_action rounded-circle  d-flex"><button  data-bs-toggle="modal" data-bs-target="#contactInfoShow" type="button" id="view-btn" class="btn-style-edit me-2 d-flex  align-items-center" data-id=' +
                      full.id +
                      '><i id="view-btn" class="fas fa-eye fa-sm" data-id=' +
                      full.id +
                      '></i></button><button type="button" id="delete-btn"  data-id=' +
                      full.id +
                      ' class="btn-style-danger"><i class="far fa-trash-alt fa-sm" id="delete-btn" data-id=' +
                      full.id +
                      "></i></button></div>"
                    );
                  },
                },
              ],
              initComplete: () => {
                // Using an arrow function here
                this.attachEventListeners();
              },
              createdRow: function (row, data, dataIndex) {
                $('td:eq(1)', row).html(dataIndex + 1);
              },
              columnDefs: [
                {
                  targets: 0,
                  orderable: false,
                  checkboxes: {
                    selectAllRender: '<input type="checkbox" class="form-check-input">',
                  },
                  render: function () {
                    return '<input type="checkbox" class="dt-checkboxes form-check-input">';
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
                '<"col-md-5"i>' +
                '<"col-md-7"p>>',
              displayLength: 10,
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
                  extend: "collection",
                  className: "btn btn-label-primary dropdown-toggle me-3",
                  text: '<i class="ti ti-screen-share me-1 ti-xs"></i>Export',
                  buttons: [
                    {
                      extend: "print",
                      text: '<i class="ti ti-printer me-1 ti-xs"></i>Print',
                      className: "dropdown-item",
                      exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8] },
                    },
                    {
                      extend: "csv",
                      text: '<i class="ti ti-file me-1 ti-xs"></i>Csv',
                      className: "dropdown-item",
                      exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8] },
                    },
                    {
                      extend: "excel",
                      text: '<i class="ti ti-file-spreadsheet me-1 ti-xs"></i>Excel',
                      className: "dropdown-item",
                      exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8] },
                    },
                    {
                      extend: "pdf",
                      text: '<i class="ti ti-file-description me-1 ti-xs"></i>Pdf',
                      className: "dropdown-item",
                      exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8] },
                    },
                    {
                      extend: "copy",
                      text: '<i class="ti ti-copy me-1 ti-xs"></i>Copy',
                      className: "dropdown-item",
                      exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8] },
                    },
                  ],
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
  
      // Questions Delete
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
  