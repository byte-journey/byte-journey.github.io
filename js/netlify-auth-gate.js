<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
  // Quick helper
  const goToUpload = () =>
    (window.location.href = "/pages/blog/upload.html");

  function isAdmin(u) {
    return Array.isArray(u?.app_metadata?.roles) &&
           u.app_metadata.roles.includes("admin");
  }

  // Fired once widget is ready
  netlifyIdentity.on("init", (user) => {
    if (user && isAdmin(user)) goToUpload();
  });

  // Fired after login / password‑set / email‑confirm
  netlifyIdentity.on("login", (user) => {
    if (isAdmin(user)) goToUpload();
  });

  netlifyIdentity.init();