// $(document).ready(function(){
//     // Function to handle the click event on menu items
//     function handleMenuClick() {
//         // Remove "open" class from all menu items
//         $(".menu-item").removeClass("open");

//         // Remove "active" class from all menu links
//         $(".menu-link").removeClass("active");

//         // Add "open" class to the parent menu item of the clicked link
//         $(this).closest(".menu-item").addClass("open");

//         // Add "active" class to the clicked menu link
//         $(this).addClass("active");

//         // Store the id or index of the clicked menu item in localStorage
//         var menuItemId = $(this).closest(".menu-item").index();
//         localStorage.setItem("activeMenuItem", menuItemId);
//     }

//     // Attach click event handler to menu links
//     $(".menu-link.menu-toggle").click(handleMenuClick);

//     // Retrieve the active menu item from localStorage and add "open" class
//     var activeMenuItemId = localStorage.getItem("activeMenuItem");
//     if (activeMenuItemId !== null) {
//         $(".menu-item").eq(activeMenuItemId).addClass("open");
//     }

//     // Add "active" class to the current page link
//     var currentUrl = window.location.pathname;
//     $(".menu-link[href='" + currentUrl + "']").addClass("active");
// });
