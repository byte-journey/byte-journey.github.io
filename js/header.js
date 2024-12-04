// Load the header from the external file
document.addEventListener("DOMContentLoaded", function () {
    fetch('../header.html')
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
