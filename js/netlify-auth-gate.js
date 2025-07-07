// Quick helper
const goToUpload = () => {
  window.location.href = ("/pages/blog/upload.html");
};

const isAdmin = (user) =>
  Array.isArray(user?.app_metadata?.roles) &&
  user.app_metadata.roles.includes("admin");

// Run once widget is ready
netlifyIdentity.on("init", (user) => {
  // if we're already logged in AND admin → jump immediately
  if (user && isAdmin(user)) goToUpload();

  // Handle #invite_token or #confirmation_token links
  const h = window.location.hash || "";

  if (h.startsWith("#invite_token=")) {
    // netlifyIdentity.open();
    netlifyIdentity.open("invite");
    return;
  }

  if (h.startsWith("#confirmation_token=")) {
    netlifyIdentity.open("login");
  }
});

// Run after successful login / password‑set / email‑confirm
netlifyIdentity.on("login", (user) => {
  if (isAdmin(user)) goToUpload();
});

netlifyIdentity.init();