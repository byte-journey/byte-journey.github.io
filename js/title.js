document.addEventListener("DOMContentLoaded", function () {
    const siteName = "Byte Journey"; // Change this to your main site name
    const pageTitle = document.title || document.querySelector("h1")?.innerText || "Page"; 

    document.title = `${pageTitle} - ${siteName}`;
});
