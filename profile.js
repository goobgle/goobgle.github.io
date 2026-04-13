import {
  auth,
  logout,
  updateEmail,
  updatePassword,
  deleteUser
} from "./firebase.js";

/* MENU */
window.toggleProfileMenu = () => {
  document.getElementById("profileMenu").classList.toggle("show");
};

/* LOGOUT */
window.logoutUser = async () => {
  await logout();
  location.href = "index.html";
};

/* DELETE */
window.deleteAccount = async () => {
  await deleteUser(auth.currentUser);
  location.href = "index.html";
};

/* THEME PLACEHOLDER */
window.toggleTheme = () => {
  document.body.classList.toggle("dark");
};
