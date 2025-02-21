const roles = [
    "Mobile Software Developer",
    "Embedded Systems Programmer",
    "Web Developer (Frontend)",
    "Photographer",
    "WordPress Developer"   
];

const dynamicText = document.querySelector('.dynamic-text');
let currentIndex = 0;

//Roles change animation on home page
function updateText() {
    dynamicText.classList.add('animate-down');
    
    setTimeout(() => {
        currentIndex = (currentIndex + 1) % roles.length;
        dynamicText.textContent = roles[currentIndex];
        dynamicText.classList.remove('animate-down');
        dynamicText.classList.add('animate-up');
    }, 500);

    setTimeout(() => {
        dynamicText.classList.remove('animate-up');
    }, 1000);
}

// Set initial text
dynamicText.textContent = roles[0];

// Start animation loop
setInterval(updateText, 3000);

// Block to handle sticky navigation bar
window.addEventListener('scroll', function () {
    const navHeader = document.querySelector('.nav-header');
    const navBottom = navHeader.getBoundingClientRect().top;

    if (navBottom <= 0) {
        navHeader.classList.add('sticky');
    } else {
        navHeader.classList.remove('sticky');
    }
});

// Menu toggle button functionality for small screens
// document.addEventListener('DOMContentLoaded', () => {
//     const menuToggle = document.querySelector('.hamburger');
//     const navMenu = document.querySelector('.nav-header ul');

//     // Check if elements exist
//     if (menuToggle && navMenu) {
//         menuToggle.addEventListener("click", () => {
//             navMenu.classList.toggle("active"); // Toggle menu visibility
//         });
//     } else {
//         console.warn("Menu elements not found on this page.");
//     }

//     // Sticky navigation bar scroll effect
//     window.addEventListener('scroll', () => {
//         const navHeader = document.querySelector('.nav-header');
//         const navBottom = navHeader.getBoundingClientRect().top;

//         if (navBottom <= 0) {
//             navHeader.classList.add('sticky');
//         } else {
//             navHeader.classList.remove('sticky');
//         }
//     });

//     console.log('JavaScript code is being executed');
// });

//Mobile menu toggle function
function toggleMenu() {
    const menuToggle = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-header ul');

    // Check if elements exist
    if (menuToggle && navMenu) {
        navMenu.classList.toggle("active"); // Toggle menu visibility
        menuToggle.classList.toggle("open"); // Toggle button animation
    } else {
        console.warn("Menu elements not found on this page.");
    }
}

//Event listener for mobile menu toggle hamburger
document.addEventListener("DOMContentLoaded", function () {
    const menuCheckbox = document.querySelector('.hamburger .checkbox');
    const navMenu = document.querySelector('.nav-header ul');

    if (menuCheckbox && navMenu) {
        // Ensure the checkbox is unchecked when navigating back
        if (menuCheckbox.checked) {
            menuCheckbox.checked = false;
        }
    }
});

//Expandable div toggle function on skills page
function toggleSkill(skillId) {
    const skillDiv = document.getElementById(skillId);
    const content = skillDiv.querySelector('.skill-content');
    const toggleText = skillDiv.querySelector('.toggle-text');
    const icon = skillDiv.querySelector('.toggle-icon');

    if (skillDiv.classList.contains('expanded')) {
        // Collapse the section
        skillDiv.classList.remove('expanded');
        toggleText.textContent = 'Show more';
    } else {
        // Expand the section
        skillDiv.classList.add('expanded');
        toggleText.textContent = 'Show less';
    }
}

// Function to handle button tap color effect on mobile screens
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        this.style.backgroundColor = "#ff5733"; // Temporary color change
        setTimeout(() => {
            this.style.backgroundColor = ""; // Reverts to original
        }, 200); // Reset after 200ms
    });
});

// Function to show the "Hire Me" pop-up
function showHireMeForm() {
    document.getElementById("hireMePopup").classList.add("active");
}

// Function to hide the "Hire Me" pop-up
function closeHireMeForm() {
    document.getElementById("hireMePopup").classList.remove("active");
}





