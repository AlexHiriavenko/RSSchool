import { containerModalRegister, modalRegister } from "../variables/variables.js";
import { closeModal } from "./modals.js";
import setStateAfterLogIn from "./setStateAfterLogin.js";

const registerForm = document.getElementById("register-form");
registerForm.addEventListener("submit", registerUser);

const emailInput = document.getElementById("reg-email");
const alertMailExist = registerForm.querySelector(".modal-auth__error");
const users = JSON.parse(localStorage.getItem("users")) || [];

function registerUser(e) {
    e.preventDefault();
    const firstName = document.getElementById("reg-name").value;
    const lastName = document.getElementById("reg-lastname").value;
    const mail = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;
    const isValidForm = validateForm();
    if (isValidForm && isExistUser(mail)) {
        alertMailExist.classList.remove("hidden");
        emailInput.addEventListener("focus", () => alertMailExist.classList.add("hidden"));
    } else if (isValidForm) {
        localStorage.setItem("isLoggedIn", true);

        const newUser = {
            userID: generateRandomId(),
            firstName: firstName,
            lastName: lastName,
            mail: mail,
            password: password,
            visitsCounter: 1,
            booksCounter: 0,
            bonusCounter: 0,
            booksList: [],
            creditCard: false,
        };

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        setStateAfterLogIn(mail);
        closeModal(containerModalRegister, modalRegister);
    }
}

function validateForm() {
    const inputs = registerForm.querySelectorAll("input[required]");
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

function generateRandomId() {
    const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // 65 is the ASCII code for 'A'
    const randomNumber = Math.floor(10000000 + Math.random() * 90000000); // Гарантируем, что число имеет 8 цифр
    const randomId = randomLetter + randomNumber.toString();
    return randomId;
}

export function isExistUser(mail) {
    const AllUsers = JSON.parse(localStorage.getItem("users")) || [];
    return AllUsers.find((el) => el.mail === mail);
}
