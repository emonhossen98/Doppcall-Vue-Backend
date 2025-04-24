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
              <h5 class="card-title mb-0 mt-3">Blog Title</h5>
            </div>
            <div class="card-body">
              <form>
                <div class="row-mb">
                  <div class="row mb-4 mt-3">
                    <div class="col-sm-2">
                      <label for="title">Title</label>
                    </div>
                    <div class="col-sm-10">
                      <input
                        type="text"
                        v-model="blogTitles.title"
                        id="title"
                        class="form-control"
                        placeholder="Enter Title"
                      />
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-sm-2">
                      <label for="subtitle">Subtitle</label>
                    </div>
                    <div class="col-sm-10">
                      <textarea
                        v-model="blogTitles.subtitle"
                        id="subtitle"
                        cols="30"
                        rows="3"
                        class="form-control"
                        placeholder="Enter Subtitle"
                      ></textarea>
                    </div>
                  </div>
                  <div class="row mt-3">
                    <div class="col-12 text-end">
                      <button
                        type="button"
                        @click="TitleSave()"
                        class="btn btn-primary btn-sm"
                      >
                        <i class="fas fa-check fa-sm me-2"></i> Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="card mt-4">
            <div class="card-header py-2">
              <h5 class="card-title mt-2 mb-0">Blog Posts</h5>
            </div>
            <div class="card-body table-responsive table-overflow-hidden">
              <table class="align-middle mb-0 table table-hover" id="posts_tables">
                <thead>
                  <tr>
                    <!-- <th></th> -->
                    <th></th>
                    <th>SL</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Status</th>
                    <th>View</th>
                    <th>Created at</th>
                    <th>Operations</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
              <div class="row justify-content-between align-items-center">
                <div class="col-md-3">
                  Showing {{ startPage }} to {{ endPage }} of {{ recordsTotal }} entries
                </div>
                <div class="pagination-controls col-md-9 d-flex justify-content-end align-items-center ">
                  <ul class="pagination mb-0">
                    <!-- Previous Button -->
                    <li class="paginate_button page-item previous" :class="{ disabled: currentPage === 1 }">
                      <button class="page-link" @click="getPostData(currentPage - 1)" :disabled="currentPage === 1" >
                        <i class="fa-solid fa-chevron-left"></i>
                      </button>
                    </li>

                    <!-- Page Numbers -->
                    <template v-for="page in paginationPages" :key="page">
                      <li class="paginate_button page-item" :class="{ active: page === currentPage }">
                        <button class="page-link" @click="getPostData(page)">
                          {{ page }}
                        </button>
                      </li>
                    </template>

                    <!-- Next Button -->
                    <li class="paginate_button page-item next" :class="{ disabled: currentPage === lastPage }">
                      <button  class="page-link" @click="getPostData(currentPage + 1)" :disabled="currentPage === lastPage">
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
        { label: "Blog", url: "" },
      ],
      getLoader: false,
      blogTitles: {
        title: "",
        subtitle: "",
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
        this.getPostData();
        this.$nextTick(() => {
          const dataTableWrapper = document.querySelectorAll(
            "#posts_tables_wrapper .row.mx-2"
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
  methods: {
    TitleSave() {
      this.getLoader = true;
      axios
        .post(this.globalVariables.apiUrl + "admin/blog/post-title", this.blogTitles, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          toastr.success(res.data.message);
          this.getPostData();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    getPostData(page = 1, perPage = 10,searchValue = '') {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl + "admin/blog/posts", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          params: { page: page, perPage: perPage,search: searchValue},
        })
        .then((res) => {

          this.blogTitles.title = res.data.blog_title;
          this.blogTitles.subtitle = res.data.blog_subtitle;

          const { data, current_page, last_page,recordsTotal } = res.data;
          this.currentPage = current_page;
          this.lastPage = last_page;
          this.recordsTotal = recordsTotal;

          this.startPage = (current_page - 1) * perPage + 1;
          this.endPage = Math.min(current_page * perPage, recordsTotal);

          if ($.fn.DataTable.isDataTable("#posts_tables")) {
            $("#posts_tables").DataTable().destroy();
          }
          var table = $("#posts_tables").DataTable({
            data: data,
            columns: [
              // { data: 'id' },
              { data: "id" },
              { data: "id" },
              { data: "title" },
              { data: "canvart_image" },
              { data: "convat_status" },
              { data: "views" },
              { data: "convart_date" },
              {
                data: null, // Specify null for custom rendering
                title: "Actions",
                searchable: false,
                orderable: false,
                render: function (data, type, full, meta) {
                  return (
                    '<div class="posts_action d-flex align-items-center"><a data-vue-route title="Edit" href="/admin-blog-posts-edit/'+full.id+'" class="bg-transparent border-0 text-primary me-2"><i class="far fa-edit fa-sm"></i></a><button type="button" id="delete-btn"  data-id=' +
                    full.id +
                    ' class="bg-transparent border-0 text-danger" title="Delete"><i class="far fa-trash-alt fa-sm" id="delete-btn" data-id=' +
                    full.id +
                    "></i></button></div>"
                  );
                },
              },
            ],
            initComplete: () => {
              this.attachEventListeners();
              this.attachEventListenersOfButton();

              this.attachEventListenersForMenu();
              this.attachEventListenersForSearch();

              const searchInput = $("#posts_tables_filter input");
              searchInput.val(this.searchInputValue);
              if(this.searchInputValue != ''){
                  searchInput.focus();
              }

              searchInput.off().on("keyup", (e) => {
                const searchTerm = e.target.value;
                this.searchInputValue = searchTerm;
                this.getPostData(1, perPage, searchTerm);
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
              '<"col-md-5 d-none"i>' +
              '<"col-md-7 d-none"p>>',
            displayLength: perPage,
            lengthMenu: [10, 20, 50, 100, 200],
            language: {
              sLengthMenu: "_MENU_",
              search: "",
              searchPlaceholder: "Search Blog Post",
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
                    text: '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                    className: "dropdown-item",
                    exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8] },
                  },
                  {
                    extend: "pdf",
                    text: '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
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
                  '<span id="create"><i class="ti ti-plus me-1 ti-xs"></i>Create</span>',
                className: "create-new btn btn-primary",
                attr: { id: "create" },
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
      $("#posts_tables").on("click", ".posts_action", (event) => {
        const target = $(event.target);
        const dataId = target.data("id");
        const dataClass = target.attr("id");
        if (dataClass === "delete-btn") {
          this.deleteQuestions(dataId);
        }
      });
    },

    attachEventListenersOfButton() {
      $("#posts_tables_wrapper").on("click", "button", (event) => {
        const target = $(event.target);
        const dataClass = target.attr("id");
        if (dataClass === "create") {
          this.$router.push("/admin-blog-posts-create");
        }
      });
    },

    attachEventListenersForMenu() {
      $("#posts_tables_wrapper [name='posts_tables_length']").on("change", (event) => {
        this.getLoader = true;
        const target = $(event.target);
        const getSelectedValue = target.val();
        this.getPostData(1,getSelectedValue);
      });
    },
    attachEventListenersForSearch() {
      $("#posts_tables_wrapper #posts_tables_filter input").on("keyup", (event) => {
        const target = $(event.target);
        const getSearchValue = target.val();
        this.getPostData(1,10,getSearchValue);
      });
    },

    // Questions Delete
    deleteQuestions(id) {
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
            .delete(this.globalVariables.apiUrl + `admin/blog/posts/delete/${id}`, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((res) => {
              toastr.success(res.data.message);
              this.getPostData();
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
#posts_tables colgroup:nth-of-type(2) {
  display: none !important;
}

#posts_tables .dt-checkboxes-cell {
  padding: 0.7rem 0.5rem !important;
}
</style>
<style scoped>
#blogimage {
  width: 70px;
}
</style>
