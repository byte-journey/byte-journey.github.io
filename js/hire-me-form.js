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


// Form action feature
document.getElementById('hireMeForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Stop form from submitting the traditional way

    const form = e.target;
    const messageBox = document.getElementById('formMessage');

    // Convert form data to a JSON object
    const formData = {
        name: form.querySelector('[name="name"]').value,
        contact: form.querySelector('[name="contact"]').value,
        service: form.querySelector('[name="service"]').value,
        details: form.querySelector('[name="details"]').value,
        location: form.querySelector('[name="location"]').value
    };

    try {
        const response = await fetch('https://formspree.io/f/mbldnygj', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            messageBox.textContent = 'Thank you for your message! I will get back to you soon.';
            messageBox.style.display = 'block';
            form.reset(); // Clear form after submission
        } else {
            const errorData = await response.json();
            messageBox.textContent = `Error: ${errorData.error || 'Something went wrong!'}`;
            messageBox.style.display = 'block';
        }
    } catch (error) {
      console.error('Error:', error);
      messageBox.textContent = 'Error submitting form. Please check your internet connection.';
      messageBox.style.display = 'block';
    }
});