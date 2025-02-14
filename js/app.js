const roles = [
    "Mobile Software Developer",
    "Embedded Systems Programmer",
    "Web Developer (Frontend)",
    "Photographer",
    "WordPress Web Dev"   
];

const dynamicText = document.querySelector('.dynamic-text');
let currentIndex = 0;

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



// Load the header from the external file
document.addEventListener("DOMContentLoaded", function () {
    fetch('header.html')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch header: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('header').innerHTML = data;
        })
        .catch(error => console.error('Error loading header:', error));
});

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

