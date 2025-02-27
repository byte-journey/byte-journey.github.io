// Function to show the Hire Me form
function openHireMeForm() {
    document.getElementById("hireMeFormOverlay").style.display = "flex";
}

// Function to close the Hire Me form
function closeHireMeForm() {
    document.getElementById("hireMeFormOverlay").style.display = "none";
}

// Load the form dynamically if it doesn't exist already
function loadHireMeForm() {
    if (!document.getElementById("hireMeFormOverlay")) {
        fetch("/components/hire-me-form.html")
            .then(response => response.text())
            .then(data => {
                document.body.insertAdjacentHTML("beforeend", data);
                document.getElementById("hireMeFormOverlay").style.display = "flex";
            });
    } else {
        document.getElementById("hireMeFormOverlay").style.display = "flex";
    }
}

// Ensure the form appears when the index page loads
document.addEventListener("DOMContentLoaded", function() {
    setTimeout(loadHireMeForm, 2000); // Adjust delay if necessary
});


