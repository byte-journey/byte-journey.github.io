// firebase-blog.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

console.log(' Loading firebase blog module... ')

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

console.log('🔥 Firebase initialized successfully!', { app, db });

// Test database connection
const testConnection = async () => {
    try {
        console.log('🔥 Testing database connection...');
        const testRef = ref(db, '.info/connected');
        const snapshot = await get(testRef);
        console.log('🔥 Database connection test result:', snapshot.val());
    } catch (error) {
        console.error('❌ Database connection test failed:', error);
    }
};

// Run connection test
testConnection();

// --- UTILITY FUNCTIONS ---
async function incrementViewCount(slug) {
  console.log('📈 Incrementing view count for:', slug);

  try {
    const viewsRef = ref(db, `views/${slug}`);
    console.log('📈 Getting current view count...');

    const snapshot = await get(viewsRef);
    console.log('📈 Current snapshot:', snapshot.exists(), snapshot.val());

    const count = snapshot.exists() ? snapshot.val() + 1 : 1;
    console.log('📈 New count will be:', count);

    await set(viewsRef, count);
    console.log('📈 Successfully set new view count:', count);

    return count;
  }
  catch (error) {
    console.error('Error incrementing view count:', error);
    console.error('❌ Error details:', error.code, error.message);
    return 0;
  }
}

// async function getViewCount(slug) {
//   try {
//     const snapshot = await get(ref(db, `views/${slug}`));
//     return snapshot.exists() ? snapshot.val() : 0;
//   }
//   catch (error) {
//     console.error('Error getting view count:', error);
//     return 0;
//   }
// }

async function getLikeCount(slug) {
  console.log('👍 Getting like count for:', slug);

  try {
    const snapshot = await get(ref(db, `likes/${slug}`));
    const count = snapshot.exists() ? snapshot.val() : 0;
    console.log('👍 Like count retrieved:', count);
    return snapshot.exists() ? snapshot.val() : 0;
  }
  catch (error) {
    console.error('Error getting like count', error);
    console.error('❌ Error details:', error.code, error.message);
    return 0;
  }
}

async function addLike(slug) {
  console.log('❤️ Adding like for:', slug);

  try {
    const likesRef = ref(db, `likes/${slug}`);
    const snapshot = await get(likesRef);
    const count = snapshot.exists() ? snapshot.val() + 1 : 1;

    console.log('❤️ New like count will be:', count);
    await set(likesRef, count);
    console.log('❤️ Successfully added like:', count);

    return count;
  }
  catch (error) {
    console.error('Error adding like:', error);
    console.error('❌ Error details:', error.code, error.message);
    // Return current count on error
    return getLikeCount(slug);
  }
}

// Test functions with a sample slug
const runTests = async () => {
    console.log('🧪 Running Firebase tests...');
    const testSlug = 'test-post-' + Date.now();
    
    try {
        // Test view increment
        const views = await incrementViewCount(testSlug);
        console.log('✅ View test result:', views);
        
        // Test like increment
        const likes = await addLike(testSlug);
        console.log('✅ Like test result:', likes);
        
        // Test retrieval
        const retrievedLikes = await getLikeCount(testSlug);
        console.log('✅ Retrieved likes:', retrievedLikes);
        
    } catch (error) {
        console.error('❌ Test failed:', error);
    }
};

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

// Run tests after a short delay
setTimeout(runTests, 1000);

export {
  db,
  ref as firebaseRef,
  get,
  set,
  //update,
  incrementViewCount,
  //getViewCount,
  getLikeCount,
  addLike,
  //getEngagementData
};