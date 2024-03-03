function updateTime() {
    var now = new Date();
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    var dayOfWeek = days[now.getDay()];
    var month = months[now.getMonth()];
    var dayOfMonth = now.getDate();
    var year = now.getFullYear();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();

    // Format date string
    var dateString = dayOfWeek + ', ' + month + ' ' + dayOfMonth + ', ' + year;

    // Format time string
    var timeString = hours + ':' + (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;

    document.getElementById('date').innerHTML = dateString;
    document.getElementById('time').innerHTML = timeString;
}

// Initial call to display date and time
updateTime();

// Update date and time every second
setInterval(updateTime, 1000);

// function for buttons toggle pages on the site
function navigatePage(page) {
    window.location.href = "pages/" + page;
}

// document.addEventListener("DOMContentLoaded", function() {
//     var menuToggle = document.getElementById("menu-toggle");
//     var sidebar = document.getElementById("side-bar");
//     var sidebarItems = document.querySelectorAll('.sidebar-btn');

//     menuToggle.addEventListener("change", function() {
//         if (menuToggle.checked) {
//             sidebar.style.display = "block"; // Show the sidebar when the menu button is checked
//         } else {
//             sidebar.style.display = "none"; // Hide the sidebar when the menu button is unchecked
//         }
//     });
// });

document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.getElementById("menu-toggle");
    const sidebar = document.getElementById("side-bar");
    const sidebarItems = document.querySelectorAll('.sidebar-btn');

    
    // Function to toggle the sidebar
    function toggleSidebar() {
        sidebar.style.display = menuToggle.checked ? "block" : "none";
    }

    // Function to close the sidebar when an item is selected
    function closeSidebar() {
        menuToggle.checked = false;
        sidebar.style.display = "none";
    }

    // Event listener for the menu button
    menuToggle.addEventListener('change', toggleSidebar);

    // Event listeners for sidebar items
    sidebarItems.forEach(function (item) {
        item.addEventListener('click', closeSidebar);
    });
});

