// 🔥 Firebase Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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

// 🔥 Firebase Config
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
// UI Elements
// ----------------------------
const tokenAmountEl = document.getElementById("tokenAmount");
const tokenDisplay = document.getElementById("tokenDisplay");
const buyTokensBtn = document.getElementById("buyTokensBtn");
const buyModal = document.getElementById("buyModal");
const buyConfirmBtn = document.getElementById("buyConfirmBtn");
const closeBuyModal = document.getElementById("closeBuyModal");

const authModal = document.getElementById("authModal");
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const closeAuthModal = document.getElementById("closeAuthModal");

const searchBar = document.getElementById("searchBar");
const gameLinks = document.querySelectorAll(".game-link");
const themeToggle = document.getElementById("themeToggle");

// ----------------------------
// AUTH STATE
// ----------------------------
onAuthStateChanged(auth, async user => {
  if(user){
    const userRef = doc(db,"users",user.uid);
    const snap = await getDoc(userRef);
    if(!snap.exists()){
      await setDoc(userRef,{tokens:100});
      tokenAmountEl.textContent = 100;
    } else {
      tokenAmountEl.textContent = snap.data().tokens || 0;
    }
    tokenDisplay.style.display = "flex";
  } else {
    tokenDisplay.style.display = "none";
  }
});

// Open login if clicking token display
tokenDisplay.addEventListener("click",()=>{
  if(!auth.currentUser) authModal.classList.add("show");
});

// Buy tokens
buyTokensBtn.addEventListener("click",()=>{
  if(!auth.currentUser){
    authModal.classList.add("show");
    return;
  }
  buyModal.classList.add("show");
});

// Close modals
closeBuyModal.addEventListener("click",()=>buyModal.classList.remove("show"));
closeAuthModal.addEventListener("click",()=>authModal.classList.remove("show"));

// Add tokens
buyConfirmBtn.addEventListener("click", async ()=>{
  const user = auth.currentUser;
  if(!user) return;
  const userRef = doc(db,"users",user.uid);
  await updateDoc(userRef,{tokens:increment(10)});
  const snap = await getDoc(userRef);
  tokenAmountEl.textContent = snap.data().tokens;
  buyModal.classList.remove("show");
});

// Sign up
signupBtn.addEventListener("click", async ()=>{
  const email = document.getElementById("authEmail").value;
  const password = document.getElementById("authPassword").value;
  try{
    await createUserWithEmailAndPassword(auth,email,password);
    authModal.classList.remove("show");
  } catch(err){ alert(err.message); }
});

// Login
loginBtn.addEventListener("click", async ()=>{
  const email = document.getElementById("authEmail").value;
  const password = document.getElementById("authPassword").value;
  try{
    await signInWithEmailAndPassword(auth,email,password);
    authModal.classList.remove("show");
  } catch(err){ alert(err.message); }
});

// ----------------------------
// SEARCH FILTER
// ----------------------------
searchBar.addEventListener("input", e => {
  const term = e.target.value.toLowerCase();
  gameLinks.forEach(link => {
    const text = link.textContent.toLowerCase();
    link.style.display = text.includes(term) ? "flex" : "none";
  });
});

// ----------------------------
// DAY/NIGHT THEME TOGGLE
// ----------------------------
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  // Optional: store theme in localStorage
  if(document.body.classList.contains("light")){
    localStorage.setItem("theme","light");
  } else {
    localStorage.setItem("theme","dark");
  }
});

// Load saved theme on page load
if(localStorage.getItem("theme") === "light"){
  document.body.classList.add("light");
}
