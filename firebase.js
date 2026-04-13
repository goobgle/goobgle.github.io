import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateEmail,
  updatePassword,
  deleteUser
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

/* AUTH */
export const register = (e,p) => createUserWithEmailAndPassword(auth,e,p);
export const login = (e,p) => signInWithEmailAndPassword(auth,e,p);
export const logout = () => signOut(auth);
export const currentUser = (cb) => onAuthStateChanged(auth, cb);

/* DATA */
export async function saveSearch(user, query) {
  if (!user) return;

  await updateDoc(doc(db,"users",user.uid), {
    history: arrayUnion(query),
    searchesToday: increment(1)
  });
}

export async function getAllUsers() {
  const snap = await getDocs(collection(db,"users"));
  let users = [];
  snap.forEach(d => users.push(d.data()));
  return users;
}

/* ACCOUNT ACTIONS */
export { updateEmail, updatePassword, deleteUser };
