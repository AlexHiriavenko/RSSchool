import { containerModalLogIn, modalLogIn } from "../variables/variables.js";
import { closeModal } from "./modals.js";
import { isExistUser } from "./registerForm.js";
import setStateAfterLogIn from "./setStateAfterLogin.js";

const logInForm = document.getElementById("login-form");

logInForm.addEventListener("submit", logInUser);
const alertNotUser = logInForm.querySelector(".modal-auth__error.mail");
const alertPassword = logInForm.querySelector(".modal-auth__error.pswrd");
const emailInput = document.getElementById("log-email");
const pswrdInput = document.getElementById("log-password");
emailInput.addEventListener("focus", () => alertNotUser.classList.add("hidden"));
pswrdInput.addEventListener("focus", () => alertPassword.classList.add("hidden"));

function logInUser(e) {
    e.preventDefault();
    const mail = document.getElementById("log-email").value;
    const password = document.getElementById("log-password").value;
    const isValidForm = validateForm();
    if (isValidForm && !isExistUser(mail)) {
        alertNotUser.classList.remove("hidden");
    } else if (isValidForm && isExistUser(mail) && !isCorrectPassword(mail, password)) {
        alertPassword.classList.remove("hidden");
    } else if (isValidForm && isExistUser(mail) && isCorrectPassword(mail, password)) {
        localStorage.setItem("isLoggedIn", true);
        setVisitsCount(mail);
        setStateAfterLogIn(mail);
        closeModal(containerModalLogIn, modalLogIn);
    }
}

function validateForm() {
    const inputs = logInForm.querySelectorAll("input[required]");
    let isValid = true;

    inputs.forEach((input) => {
        const tooltip = input.nextElementSibling;
        const span = tooltip.firstElementChild;
        input.addEventListener("focus", () => tooltip.classList.add("hidden"));
        if (!input.checkValidity()) {
            isValid = false;
            span.textContent = input.validationMessage;
            tooltip.classList.remove("hidden");
        }
    });
    return isValid;
}

function isCorrectPassword(mail, password) {
    const user = isExistUser(mail);
    return password === user.password;
}

function setVisitsCount(mail) {
    try {
        const allUsers = JSON.parse(localStorage.getItem("users"));

        if (Array.isArray(allUsers)) {
            const user = allUsers.find((el) => el.mail === mail);

            if (user && user.visitsCounter !== undefined) {
                user.visitsCounter += 1;

                // Перезаписываем только конкретного пользователя
                localStorage.setItem("users", JSON.stringify(allUsers));
            }
        }
    } catch (error) {
        console.error("Произошла ошибка настройки стчетчика визитов:", error);
    }
}
