// header
export const btnBurger = document.querySelector(".btn-burger");
export const navbar = document.querySelector(".header__nav");
export const navbarLinks = document.querySelectorAll(".nav__link");
export const btnUserProfile = document.querySelector(".btn-user-profile");
// login menu
export const loginMenu = document.querySelector(".logIn-menu");
export const logInOption = document.querySelector(".logIn");
export const registerOption = document.querySelector(".register");
export const logOutOption = document.querySelector(
    ".logIn-menu__option.LogOut"
);
export const toProfileOption = document.querySelector(
    ".logIn-menu__option.profile"
);
export const userInitials = document.querySelector(".user-initials");
export const userImg = document.querySelector(".user-img");

// modal register
export const containerModalRegister = document.querySelector(".modal-register");
export const modalRegister = document.querySelector(".modal__register");
export const btnCloseRegisterModal = document.querySelector(
    ".btn-close-register-modal"
);
export const linkToLogIn = document.querySelector(".add-log-btn");
// modal login
export const containerModalLogIn = document.querySelector(".modal-logIn");
export const modalLogIn = document.querySelector(".modal__logIn");
export const btnCloseLogInModal = document.querySelector(
    ".btn-close-logIn-modal"
);
export const linkToRegister = document.querySelector(".add-reg-btn");
// modalProfile
export const containerModalProfile = document.querySelector(".modal-profile");
export const modalProfile = document.querySelector(".modal__profile");
export const btnCloseProfileModal = document.querySelector(
    ".btn-close-profile-modal"
);
// modalCreditCard
export const containerModalCreditCard =
    document.querySelector(".modal-creditCard");
export const modalCreditCard = document.querySelector(".modal__creditCard");
export const btnCloseCreditModal = document.querySelector(
    ".modal-buyacard__btn"
);
// favorites
export const btnsBuy = document.querySelectorAll(".books__btn");
export const favoritesRadioBtns = document.querySelectorAll(
    ".radio-label[data-season]"
);
export const seasonLists = document.querySelectorAll(".books");
export const btnsSliderAbout = document.querySelectorAll(".btn-wrapper");
// about
export const photosList = document.querySelector(".photos-list");
export const btnMoveRight = document.querySelector(".btn-pagination.right");
export const btnMoveLeft = document.querySelector(".btn-pagination.left");
export const sliderSircles = document.querySelectorAll(".btn-carousel");
// cards
export const btnCardsRegister = document.querySelector(
    ".get-card__btn.register"
);
export const btnCardsLogin = document.querySelector(".get-card__btn.login");
export const btnCardsProfile = document.querySelector(".get-card__btn.profile");
export const inputUserName = document.querySelector(".form__input.user-name");
export const inputCard = document.querySelector(".form__input.card-number");
export const cardData = document.querySelector(".card-data");
export const booksCounter = document.querySelector(".card-books-count");
export const bonusCounter = document.querySelector(".card-bonuses-count");
export const visitsCounter = document.querySelector(".card-visits-count");
export const btnCheckCard = document.querySelector(".check-card");
export const readerCardTitle = document.querySelector(".get-card__title");
export const readercardText = document.querySelector(".get-card__text");
export const defaultCardTitle = "Get a reader card";
export const defaultCardText =
    "You will be able to see a reader card after logging into account or you can register a new account";
export const authCardTitle = "Visit your profile";
export const authCardText =
    "With a digital library card you get free access to the Library’s wide array of digital resources including e-books, databases, educational resources, and more.";
export const cardForm = document.getElementById("cardForm");
