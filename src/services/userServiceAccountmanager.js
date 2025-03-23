export async function fetchUserRoleAccountmanager() {
  try {
    var authUser = JSON.parse(localStorage.getItem('authUserFromLocalStorage')) || {};
    const userRole = authUser?.role?.name;
    if (userRole && (userRole === 'Account manager')) {
      return { role: userRole, isAuthorized: true };
    } else {
      // Redirect if the role is not authorized
      window.location.href = `https://doppcall.com/?token=logout`;
      return { role: userRole, isAuthorized: false };
    }
  } catch (error) {
    window.location.href = `https://doppcall.com/?token=logout`;
  }
}
