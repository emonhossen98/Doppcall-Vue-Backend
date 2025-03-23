<template>
  <div class="contact_page">
    <!-- Header Section -->
    <div class="d-flex justify-content-between align-items-center mb-3 contact_page_wapper">
      <div class="contact_page_wapper_search">
        <div class="d-flex align-items-center">
          <h6 class="mb-0">
            <i class="fa-solid fa-user-group"></i> {{ totalContacts }} Contacts
          </h6>
          <div class="contact_page_wapper_search_box">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Filter by name or city..." v-model="searchQuery" @input="filterContacts"/>
          </div>
        </div>
      </div>
      <!-- <div class="action-buttons d-flex align-items-center">
        <button class="contact-btn me-2" data-bs-toggle="modal" data-bs-target="#createNewContact">
          <i class="fa-solid fa-circle-plus me-2"></i> New Contact
        </button>
      </div> -->
    </div>

    <!-- Contact Table -->
    <div class="contact-tables px-5">
      <table class="table bg-white">
        <thead>
          <tr>
            <th></th>
            <th><i class="fas fa-user"></i> Full Name</th>
            <th><i class="fas fa-envelope"></i> Email</th>
            <th><i class="fas fa-map-marker-alt"></i> Location</th>
            <th><i class="fas fa-building"></i> Company</th>
            <th><i class="fa-regular fa-id-badge"></i> Profile</th>
            <th><i class="fa-regular fa-eye me-1"></i>Preview</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="filteredUsers.length === 0">
            <tr v-for="(user,index) in 15" :key="index">
              <td>
                <SkeletonShape type="text" animation="wave" :width="'16px'" :height="'16px'" :radius="2"/>
              </td>
              <td>
                <SkeletonShape type="text" animation="wave" :width="'100%'" :height="'25px'" :radius="2"/>
              </td>
              <td>
                <SkeletonShape type="text" animation="wave" :width="'100%'" :height="'25px'" :radius="2"/>
              </td>
              <td>
                <SkeletonShape type="text" animation="wave" :width="'100%'" :height="'25px'" :radius="2"/>
              </td>
              <td>
                <SkeletonShape type="text" animation="wave" :width="'100%'" :height="'25px'" :radius="2"/>
              </td>
              <td>
                <SkeletonShape type="text" animation="wave" :width="'100%'" :height="'25px'" :radius="2"/>
              </td>
              <td>
                <SkeletonShape type="text" animation="wave" :width="'100%'" :height="'25px'" :radius="2"/>
              </td>
              <td>
                <SkeletonShape type="text" animation="wave" :width="'100%'" :height="'25px'" :radius="2"/>
              </td>
            </tr>
          </template>
          <tr v-for="user in filteredUsers" :key="user.id">
            <td><input type="checkbox" class="form-check-input" /></td>
            <td>
              <template v-if="user.avatar">
                <img
                  id="contact-avatar"
                  :src="'https://api.doppcall.com/' + user.avatar"
                  alt="User Avatar"
                />
                {{ user.fname }} {{ user.lname }}
              </template>
              <template v-else>
                <img id="contact-avatar" :src="blankUser" alt="User Avatar" />
                {{ user.fname }} {{ user.lname }}
              </template>
            </td>
            <td>{{ user.email }}</td>
            <td>
              <template v-if="user.user_location">
                {{ user.user_location.city_name }}, {{ user.user_location.country }}
              </template>
            </td>
            <td>{{ user.company_name || "Unknown" }}</td>
            <td>
              <template v-if="user.role.name == 'Publisher'">
              <RouterLink :to="'/admin-manage-publishers-view/'+user.id"><button class="btn btn-preview">
                <i class="fa-solid fa-arrow-up-right-from-square me-1"></i>Profile
              </button></RouterLink>
            </template>
            <template v-else-if="user.role.name == 'Advertiser'">
              <RouterLink :to="'/admin-manage-advertiser-view/'+user.id"><button class="btn btn-preview">
                <i class="fa-solid fa-arrow-up-right-from-square me-1"></i>Profile
              </button></RouterLink>
            </template>
            </td>
            <td>
              <RouterLink :to="'/admin-chats/'+user.id"><button  class="btn btn-preview">
                <i class="fa-regular fa-comment-dots me-1"></i>View Coversation
              </button></RouterLink>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Pagination -->
      <!-- <div class="row justify-content-between align-items-center">
        <div class="col-md-3">
          Showing {{ startPage }} to {{ endPage }} of {{ recordsTotal }} entries
        </div>
        <div class="pagination-controls col-md-9 d-flex justify-content-end align-items-center ">
          <ul class="pagination mb-0">
            <li class="paginate_button page-item previous" :class="{ disabled: currentPage === 1 }">
              <button class="page-link" @click="getOfferData(currentPage - 1)" :disabled="currentPage === 1" >
                <i class="fa-solid fa-chevron-left"></i>
              </button>
            </li>

            <template v-for="page in paginationPages" :key="page">
              <li class="paginate_button page-item" :class="{ active: page === currentPage }">
                <button class="page-link" @click="getOfferData(page)">
                  {{ page }}
                </button>
              </li>
            </template>

            <li class="paginate_button page-item next" :class="{ disabled: currentPage === lastPage }">
              <button  class="page-link" @click="getOfferData(currentPage + 1)" :disabled="currentPage === lastPage">
                <i class="fa-solid fa-chevron-right"></i>
              </button>
            </li>
          </ul>
        </div>
      </div> -->

      <div
        id="contact-page-pagination"
        class="pagination mt-3 d-flex justify-content-end align-items-center mb-4"
        v-if="totalContacts > 0"
      >
        <button
          class="btn btn-primary me-2 border-1"
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          Previous
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button
          class="btn btn-primary ms-2 border-1"
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >
          Next
        </button>
      </div>
    </div>

    <!-- create New Chat Modal -->
    <div class="modal fade" id="createNewContact" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-md" role="document" >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Contact Create</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row px-2">
              <label for="conversation-type" class="required mb-1 px-2">Name of the Contact</label>
              <input type="text" v-model="contactcreate.name" class="form-control" placeholder="Enter the full name of the contact…">
            </div>
            <div class="row px-2 mt-2">
              <label for="conversation-type" class="required mb-1 px-2">Email of the Contact</label>
              <input type="email" v-model="contactcreate.email" class="form-control" placeholder="Enter the email of the contact…">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-md close_btn" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
            <button type="button"  :disabled="!contactcreate.name || !contactcreate.email" class="text-white btn btn-md create_btn"><i class="fa-solid fa-plus me-1 icons"></i>Create Conversation</button>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { onMounted, ref, computed, watch } from "vue";
import { fetchUserRole } from "@/services/userService";
import { SkeletonShape } from "easy-skeleton-loader-vue";
import blankUser from "../../../../../../../assets/backend/assets/chats/image/blank_user.png";

export default {
  components: {
    SkeletonShape,
  },
  setup() {
    const ChatAllUsers = ref([]);
    const filteredUsers = ref([]);
    const userLoading = ref(false);
    const currentPage = ref(1);
    const totalPages = ref(1);
    const totalContacts = ref(0);
    const itemsPerPage = 15;
    const searchQuery = ref("");
    const contactcreate = ref({
      name : '' ,
      email : '' ,
    });

    const fetchContactChatUsers = async () => {
      try {
        userLoading.value = true;
        // Fetch API with pagination params
        const response = await fetch(
          `https://api.doppcall.com/api/admin/crisp/chat/contactalluser?page=${currentPage.value}&per_page=${itemsPerPage}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const jsonResponse = await response.json();
        ChatAllUsers.value = jsonResponse.users || [];
        totalContacts.value = jsonResponse.total || 0;
        totalPages.value = Math.ceil(totalContacts.value / itemsPerPage);
        filteredUsers.value = [...ChatAllUsers.value];
      } catch (error) {
        console.error("Error fetching chat users:", error);
        ChatAllUsers.value = [];
        filteredUsers.value = [];
      } finally {
        userLoading.value = false;
      }
    };

    const filterContacts = () => {
      filteredUsers.value = ChatAllUsers.value.filter((user) => {
        const fullName = `${user.fname} ${user.lname}`.toLowerCase();
        const location = (user.user_location?.city_name ?? "").toLowerCase();
        const email = (user.email ?? "").toLowerCase();
        return (
          fullName.includes(searchQuery.value.toLowerCase()) ||
          location.includes(searchQuery.value.toLowerCase()) || 
          email.includes(searchQuery.value.toLowerCase())  
        );
      });
    };

    watch(currentPage, () => {
      fetchContactChatUsers();
    });

    onMounted(async () => {
      try {
        const { role } = await fetchUserRole();
        if (role === "Super" || role === "Admin") {
          await fetchContactChatUsers();
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    });

    return {
      blankUser,
      ChatAllUsers,
      filteredUsers,
      userLoading,
      currentPage,
      totalPages,
      totalContacts,
      searchQuery,
      filterContacts,
      contactcreate,
    };
  },
};
</script>

<style>
/* Add your custom styles here */
</style>
