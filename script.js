// 🔥 Firebase Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc,
  updateDoc 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// 🔥 Your Config
const firebaseConfig = {
  apiKey: "PASTE",
  authDomain: "PASTE",
  projectId: "PASTE",
  storageBucket: "PASTE",
  messagingSenderId: "PASTE",
  appId: "PASTE"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ----------------------------
// TOKEN UI REFERENCES
// ----------------------------

const tokenAmountEl = document.getElementById("tokenAmount");
const tokenDisplay = document.getElementById("tokenDisplay");

// ----------------------------
// AUTH STATE
// ----------------------------

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        tokens: 0,
        createdAt: new Date()
      });
      tokenAmountEl.textContent = 0;
    } else {
      tokenAmountEl.textContent = userSnap.data().tokens;
    }

    tokenDisplay.style.display = "flex";
  } else {
    tokenDisplay.style.display = "none";
  }
});

// ----------------------------
// SIMPLE LOGIN SYSTEM
// ----------------------------

window.signup = async (email, password) => {
  await createUserWithEmailAndPassword(auth, email, password);
};

window.login = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password);
};

window.logout = async () => {
  await signOut(auth);
};

const authModal = document.getElementById("authModal");
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");

loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("authEmail").value;
  const password = document.getElementById("authPassword").value;
  await login(email, password);
  authModal.classList.remove("show");
});

signupBtn.addEventListener("click", async () => {
  const email = document.getElementById("authEmail").value;
  const password = document.getElementById("authPassword").value;
  await signup(email, password);
  authModal.classList.remove("show");
});
