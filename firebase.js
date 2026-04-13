import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  increment,
  arrayUnion,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCHTAeV10kjYPLTZo8xsQsuTwMiMUGHJ5Q",
  authDomain: "goobgleacc.firebaseapp.com",
  projectId: "goobgleacc",
  storageBucket: "goobgleacc.firebasestorage.app",
  messagingSenderId: "474972109718",
  appId: "1:474972109718:web:502e9d0116fcf278997bb7",
  measurementId: "G-L632MLR6CG"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export async function register(email, password) {
  const userCred = await createUserWithEmailAndPassword(auth, email, password);

  await setDoc(doc(db, "users", userCred.user.uid), {
    email,
    username: email.split("@")[0],
    isAdmin: false,
    searchesToday: 0,
    history: []
  });

  return userCred.user;
}

export async function login(email, password) {
  const userCred = await signInWithEmailAndPassword(auth, email, password);
  return userCred.user;
}

export function logout() {
  return signOut(auth);
}

export function currentUser(cb) {
  return onAuthStateChanged(auth, cb);
}

export async function saveSearch(user, query) {
  if (!user) return;

  await updateDoc(doc(db, "users", user.uid), {
    history: arrayUnion(query),
    searchesToday: increment(1)
  });
}

export async function getUserData(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? snap.data() : null;
}

export async function getAllUsers() {
  const snap = await getDocs(collection(db, "users"));

  let users = [];

  snap.forEach(d => {
    users.push({
      username: d.data().username,
      searchesToday: d.data().searchesToday || 0
    });
  });

  return users;
}
