import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBcFd8wzvt3kmQeNvAicPxaK_KElATNyVc",
  authDomain: "authentication-20535.firebaseapp.com",
  databaseURL: "https://authentication-20535-default-rtdb.firebaseio.com",
  projectId: "authentication-20535",
  storageBucket: "authentication-20535.firebasestorage.app",
  messagingSenderId: "264252863743",
  appId: "1:264252863743:web:104790eec35a93b0b2c8ca"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const signupForm = document.getElementById("signup");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      userId: user.uid,
      createdAt: serverTimestamp()
    });

    console.log("User created successfully");
    console.log(user);

    signupForm.reset();

  } catch (error) {
    console.error("Error:", error.code);
    console.error("Message:", error.message);
  }
});