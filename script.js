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
  updateDoc,
  increment
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


// 🔥 YOUR REAL CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyDV9R-csa_sdepCy0kt8e8yhZHz77HxY9w",
  authDomain: "gn-sci.firebaseapp.com",
  projectId: "gn-sci",
  storageBucket: "gn-sci.firebasestorage.app",
  messagingSenderId: "415043872292",
  appId: "1:415043872292:web:a9dd0a06270e4f83db1ab1",
  measurementId: "G-HGXJGSGPZC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


// ----------------------------
// UI ELEMENTS
// ----------------------------

const tokenAmountEl = document.getElementById("tokenAmount");
const tokenDisplay = document.getElementById("tokenDisplay");
const buyTokensBtn = document.getElementById("buyTokensBtn");

const authModal = document.getElementById("authModal");
const buyModal = document.getElementById("buyModal");

const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const closeModalBtn = document.getElementById("closeModal");


// ----------------------------
// AUTH STATE LISTENER
// ----------------------------

onAuthStateChanged(auth, async (user) => {

  if (user) {
    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
      await setDoc(userRef, {
        tokens: 100   // Give 100 starting tokens
      });

      tokenAmountEl.textContent = 100;
    } else {
      tokenAmountEl.textContent = snap.data().tokens || 0;
    }

    tokenDisplay.style.display = "flex";

  } else {
    tokenDisplay.style.display = "none";
  }

});


// ----------------------------
// OPEN AUTH WHEN CLICKING TOKEN AREA IF NOT LOGGED IN
// ----------------------------

tokenDisplay.addEventListener("click", () => {
  if (!auth.currentUser) {
    authModal.classList.add("show");
  }
});


// ----------------------------
// BUY TOKENS BUTTON
// ----------------------------

buyTokensBtn.addEventListener("click", (e) => {
  e.stopPropagation();

  if (!auth.currentUser) {
    authModal.classList.add("show");
    return;
  }

  buyModal.classList.add("show");
});


// ----------------------------
// CLOSE BUY MODAL
// ----------------------------

closeModalBtn.addEventListener("click", () => {
  buyModal.classList.remove("show");
});


// ----------------------------
// SIGN UP
// ----------------------------

signupBtn.addEventListener("click", async () => {
  const email = document.getElementById("authEmail").value;
  const password = document.getElementById("authPassword").value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    authModal.classList.remove("show");
  } catch (err) {
    alert(err.message);
  }
});


// ----------------------------
// LOGIN
// ----------------------------

loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("authEmail").value;
  const password = document.getElementById("authPassword").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    authModal.classList.remove("show");
  } catch (err) {
    alert(err.message);
  }
});


// ----------------------------
// TEMPORARY: Add 10 Tokens When Buying (for testing)
// ----------------------------

buyModal.addEventListener("click", async (e) => {
  if (e.target === buyModal) return;

  const user = auth.currentUser;
  if (!user) return;

  const userRef = doc(db, "users", user.uid);

  await updateDoc(userRef, {
    tokens: increment(10)
  });

  const snap = await getDoc(userRef);
  tokenAmountEl.textContent = snap.data().tokens;

  buyModal.classList.remove("show");
});
