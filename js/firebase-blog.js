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
const db = getDatabase(app);

// --- UTILITY FUNCTIONS ---
async function incrementViewCount(slug) {
  try {
    const viewsRef = ref(db, `views/${slug}`);
    const snapshot = await get(viewsRef);
    const count = snapshot.exists() ? snapshot.val() + 1 : 1;
    await set(viewsRef, count);
    return count;
  }
  catch (error) {
    console.error('Error incrementing view count:', error);
    return 0;
  }
}

async function getViewCount(slug) {
  try {
    const snapshot = await get(ref(db, `views/${slug}`));
    return snapshot.exists() ? snapshot.val() : 0;
  }
  catch (error) {
    console.error('Error getting view count:', error);
    return 0;
  }
}

async function getLikeCount(slug) {
  try {
    const snapshot = await get(ref(db, `likes/${slug}`));
    return snapshot.exists() ? snapshot.val() : 0;
  }
  catch (error) {
    console.error('Error getting like count', error);
    return 0;
  }
}

async function addLike(slug) {
  try {
    const likesRef = ref(db, `likes/${slug}`);
    const snapshot = await get(likesRef);
    const count = snapshot.exists() ? snapshot.val() + 1 : 1;
    await set(likesRef, count);
    return count;
  }
  catch (error) {
    console.error('Error adding like:', error);
    // Return current count on error
    return getLikeCount(slug);
  }
}

async function getEngagementData(slug) {
  try {
    const [viewSnapshot, likeSnapshot] = await Promise.all([
      get(ref(db, `views/${slug}`)),
      get(ref(db, `likes/${slug}`))
    ]);

    return {
      views: viewSnapshot.exists() ? viewSnapshot.val() : 0,
      likes: likeSnapshot.exists() ? likeSnapshot.val() : 0
    };
  }
  catch (error) {
    console.error('Error getting engagement data:', error);
    return { views: 0, likes: 0 };
  }  
}

export {
  db,
  ref as firebaseRef,
  get,
  set,
  update,
  incrementViewCount,
  getViewCount,
  getLikeCount,
  addLike,
  getEngagementData
};