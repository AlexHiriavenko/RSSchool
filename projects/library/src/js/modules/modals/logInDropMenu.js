import {
    btnUserProfile,
    loginMenu,
    logInOption,
    registerOption,
    containerModalRegister,
    modalRegister,
    containerModalLogIn,
    modalLogIn,
    containerModalProfile,
    modalProfile,
    logOutOption,
    toProfileOption,
    inputUserName,
    readerCardTitle,
    readercardText,
} from "../variables/variables.js";
import { openModal } from "./modals.js";
import setStateAfterLogOut from "./setStateAfterLogOut.js";

btnUserProfile.addEventListener("click", toggleLoginMenu);
btnUserProfile.addEventListener(
    "mouseover",
    () => (btnUserProfile.title = inputUserName.value)
);

function toggleLoginMenu(event) {
    const target = event.target.closest("button");
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (target) {
        const active = "logIn-menu--active";
        const isActive = loginMenu.matches("." + active);

        if (isActive) {
            loginMenu.classList.remove(active);
        } else {
            loginMenu.classList.add(active);
            document.body.addEventListener("click", setModalVisible);
            setStateMenu(isLoggedIn);
        }
    }
}

function setStateMenu(isLoggedIn) {
    if (isLoggedIn !== "true") {
        registerOption.classList.add("active");
        registerOption.addEventListener("click", () =>
            openModal(containerModalRegister, modalRegister, registerOption)
        );
        logInOption.classList.add("active");
        logInOption.addEventListener("click", () =>
            openModal(containerModalLogIn, modalLogIn, logInOption)
        );
    }
    if (isLoggedIn === "true") {
        registerOption.classList.remove("active");
        logInOption.classList.remove("active");
        logOutOption.classList.add("active");
        toProfileOption.classList.add("active");
        toProfileOption.addEventListener("click", () => {
            openModal(containerModalProfile, modalProfile, loginMenu);
            setUserProfileModal();
        });
        logOutOption.addEventListener("click", logOut);
        const currentMail = localStorage.getItem("currentMail");
        const AllUsers = JSON.parse(localStorage.getItem("users"));
        const user = AllUsers.find((el) => el.mail === currentMail);
        const dropMenuTitle = document.querySelector(".logIn-menu__title");
        dropMenuTitle.textContent = user.userID;
        dropMenuTitle.style.fontSize = "14px";
        dropMenuTitle.style.fontWeight = 400;
    }
}

function setModalVisible(event) {
    const isModal = event.target.closest(".logIn-menu");
    const isBtnBurger = event.target.closest(".btn-user-profile");
    if (!isModal && !isBtnBurger) {
        loginMenu.classList.remove("logIn-menu--active");
        document.body.removeEventListener("click", setModalVisible);
    }
}

function logOut() {
    localStorage.setItem("isLoggedIn", false);
    loginMenu.classList.remove("logIn-menu--active");
    setStateAfterLogOut();
}

export function setUserProfileModal() {
    const currentMail = localStorage.getItem("currentMail");
    const AllUsers = JSON.parse(localStorage.getItem("users"));
    const user = AllUsers.find((el) => el.mail === currentMail);
    const firstName = user.firstName;
    const lastName = user.lastName;
    const userInitials = firstName[0].toUpperCase() + lastName[0].toUpperCase();
    const modalProfileInitials = modalProfile.querySelector(
        ".modal-profile__photo"
    );
    modalProfileInitials.textContent = userInitials;
    const modalProfileName = modalProfile.querySelector(".modal-profile__name");
    modalProfileName.textContent = firstName + " " + lastName;
    const visits = modalProfile.querySelector(".stat__visits");
    const bonus = modalProfile.querySelector(".stat__bonuses");
    const books = modalProfile.querySelector(".stat__books");
    const cardNumber = modalProfile.querySelector(
        ".modal-profile__card-number"
    );
    visits.textContent = user.visitsCounter;
    bonus.textContent = user.bonusCounter;
    books.textContent = user.booksCounter;
    cardNumber.textContent = user.userID;
    renderBooksList(user);
    const btnCopy = modalProfile.querySelector(
        ".modal-profile__copy-number-btn"
    );
    btnCopy.addEventListener("click", () => copyCardNumber(user.userID));
}

function copyCardNumber(id) {
    const message = modalProfile.querySelector(".copy-tooltip");
    message.classList.add("active");
    setTimeout(() => message.classList.remove("active"), 1600);
    navigator.clipboard.writeText(id);
}

function renderBooksList(user) {
    const ul = modalProfile.querySelector(".modal-profile__booklist");

    if (!user.booksList.length) {
        const noBooks = modalProfile.querySelector(".no-books");
        noBooks.classList.add("active");
    } else {
        ul.innerHTML = ""; // Очищаем список, чтобы избежать дублирования элементов
        user.booksList.forEach((book) => {
            const li = document.createElement("li");
            li.textContent = `${book.author}: ${book.name}`;
            ul.appendChild(li);
        });
    }
}
