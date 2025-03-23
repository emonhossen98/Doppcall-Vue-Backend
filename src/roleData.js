import { reactive } from "vue"; // Ensure this line matches Vue 3 syntax

export const roleData = reactive({
  superAdmin: null,
  superAdminData: null,
  createMessage: { super_admin: null },
  authUser: null,
  create_chat: { user_id: null },
  authUserRole: null,
  userWithChats: null,
  AuthId: null,
  userRole: null,
  skype_config: null,
});
