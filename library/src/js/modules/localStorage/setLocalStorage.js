const users = JSON.parse(localStorage.getItem("users"));
import setStateAfterLogIn from "../modals/setStateAfterLogin.js";

if (!users || !users.length) {
    localStorage.setItem("users", JSON.stringify([]));
}

const currentMail = localStorage.getItem("currentMail");
const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

if (currentMail && isLoggedIn) {
    setStateAfterLogIn(currentMail);
}
