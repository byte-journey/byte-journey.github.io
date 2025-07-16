// firebase-blog.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getDatabase, ref, get, set, update } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

//Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyB1JwSKrRLWHfAqcOibBGGqwVkN4REtJ70",
    authDomain: "byte-journey-blog.firebaseapp.com",
    databaseURL: "https://byte-journey-blog-default-rtdb.firebaseio.com",
    projectId: "byte-journey-blog",
    storageBucket: "byte-journey-blog.firebasestorage.app",
    messagingSenderId: "204430286283",
    appId: "1:204430286283:web:6b0a293d6d4db521e16a4e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// View Counter
const slug = window.location.pathname.split('/').pop().replace('.html', '');
const viewsRef = ref(db, `views/${slug}`);

get(viewsRef).then(snapshot => {
  let count = snapshot.exists() ? snapshot.val() + 1 : 1;
  set(viewsRef, count);

  // Show count on page (if you want)
  const el = document.getElementById('view-count');
  if (el) el.textContent = `${count} view${count === 1 ? '' : 's'}`;
});

export { db };
export { ref as firebaseRef, get, set, update };