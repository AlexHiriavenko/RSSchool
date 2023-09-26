import {
    btnsBuy,
    favoritesRadioBtns,
    seasonLists,
    containerModalLogIn,
    modalLogIn,
    logInOption,
    containerModalCreditCard,
    modalCreditCard,
    bonusCounter,
    booksCounter,
} from "../variables/variables.js";
import { openModal } from "../modals/modals.js";

for (const btn of favoritesRadioBtns) {
    btn.addEventListener("click", switchSeason);
}

function switchSeason(event) {
    const season = event.target.dataset.season;
    for (const list of seasonLists) {
        if (list.getAttribute("data-season") === season) {
            list.classList.add("visibility-on");
            list.classList.remove("visibility-off");
        } else {
            list.classList.remove("visibility-on");
            list.classList.add("visibility-off");
        }
    }
}

for (const btn of btnsBuy) {
    btn.addEventListener("click", openTargetModal);
}

function openTargetModal(e) {
    const btn = e.target.closest("button");
    const bookID = btn.id;
    const isLoggedIn = localStorage.getItem("isLoggedIn") || "false";
    const currentMail = localStorage.getItem("currentMail") || "";
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = allUsers.find((el) => el.mail === currentMail);
    const book = e.target.closest(".books__item");
    const bookTarget = book.querySelector(".books__book-name");
    const authorTarget = book.querySelector(".books__book-author");
    const bookName = bookTarget.textContent;
    const author = authorTarget.textContent.replace("By ", "");
    const currentBook = {};
    currentBook.author = author;
    currentBook.name = bookName;
    currentBook.bookID = bookID;

    if (isLoggedIn !== "true") {
        openModal(containerModalLogIn, modalLogIn, logInOption);
    } else if (isLoggedIn === "true") {
        if (!user.creditCard) {
            openModal(containerModalCreditCard, modalCreditCard, logInOption);
            localStorage.setItem("currentBook", JSON.stringify(currentBook));
            localStorage.setItem("currentBtnBuy", bookID);
        } else if (user.creditCard) {
            btn.classList.add("books__btn--bought");
            btn.textContent = "Own";
            btn.disabled = true;
            bonusCounter.textContent = +bonusCounter.textContent + 620;
            booksCounter.textContent = +booksCounter.textContent + 1;
            user.booksList.push(currentBook);
            user.booksCounter += 1;
            user.bonusCounter += 620;
            localStorage.setItem("users", JSON.stringify(allUsers));
            alert("оплата прошла автоматически");
        }
    }
}
