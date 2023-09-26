import {
    containerModalCreditCard,
    modalCreditCard,
    bonusCounter,
    booksCounter,
} from "../variables/variables.js";
import { closeModal } from "./modals.js";

const creditCardForm = document.querySelector(".modal-buyacard__form");

const errorMessages = document.querySelectorAll(".error-message");

creditCardForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;

    creditCardForm.querySelectorAll("input").forEach((input, index) => {
        if (!input.checkValidity()) {
            isValid = false;
            errorMessages[index].textContent = input.validationMessage;
        } else {
            errorMessages[index].textContent = "";
        }
    });

    if (isValid) {
        addCreditCard();
    }
});

creditCardForm.querySelectorAll("input").forEach((input, index) => {
    input.addEventListener("input", function () {
        if (input.checkValidity()) {
            errorMessages[index].textContent = "";
        }
    });
});

function addCreditCard() {
    const currentMail = localStorage.getItem("currentMail");
    const currentBook = JSON.parse(localStorage.getItem("currentBook"));
    const allUsers = JSON.parse(localStorage.getItem("users"));
    const user = allUsers.find((el) => el.mail === currentMail);
    user.booksCounter += 1;
    user.bonusCounter += 620;
    bonusCounter.textContent = +bonusCounter.textContent + 620;
    booksCounter.textContent = +booksCounter.textContent + 1;
    user.booksList.push(currentBook);
    user.creditCard = true;
    localStorage.setItem("users", JSON.stringify(allUsers));
    const currentBtnBuy = localStorage.getItem("currentBtnBuy");
    const btnOwn = document.getElementById(currentBtnBuy);
    btnOwn.textContent = "Own";
    btnOwn.classList.add("books__btn--bought");
    btnOwn.disabled = true;
    localStorage.setItem("currentBtnBuy", "");
    localStorage.setItem("currentBook", "{}");
    closeModal(containerModalCreditCard, modalCreditCard);
}
