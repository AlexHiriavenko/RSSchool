import {
    btnCardsLogin,
    btnCardsRegister,
    btnCardsProfile,
    btnCheckCard,
    containerModalLogIn,
    containerModalRegister,
    modalLogIn,
    modalRegister,
    loginMenu,
    containerModalProfile,
    modalProfile,
    inputCard,
    inputUserName,
    cardForm,
    cardData,
    bonusCounter,
    visitsCounter,
    booksCounter,
} from "../variables/variables.js";
import { openModal } from "../modals/modals.js";
import { setUserProfileModal } from "../modals/logInDropMenu.js";

btnCardsLogin.addEventListener("click", () =>
    openModal(containerModalLogIn, modalLogIn, loginMenu)
);
btnCardsRegister.addEventListener("click", () =>
    openModal(containerModalRegister, modalRegister, loginMenu)
);

btnCardsProfile.addEventListener("click", () => {
    openModal(containerModalProfile, modalProfile, loginMenu);
    setUserProfileModal();
});

cardForm.addEventListener("submit", showUserData);

function showUserData(e) {
    e.preventDefault();
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
        const inputUserValue = inputUserName.value;
        const inputCardNumber = inputCard.value;
        const allUsers = JSON.parse(localStorage.getItem("users")) || [];
        const user = allUsers.find((el) => el.userID === inputCardNumber);
        function isValidName() {
            return (
                inputUserValue === user.firstName ||
                inputUserValue === user.lastName ||
                inputUserValue === user.firstName + " " + user.lastName
            );
        }
        if (!user) {
            alert("пользователь не найден");
        } else if (user) {
            if (!isValidName()) {
                alert("пользователь не найден");
            } else if (isValidName()) {
                const active = "active";
                cardData.classList.add(active);
                btnCheckCard.classList.remove(active);
                bonusCounter.textContent = user.bonusCounter;
                visitsCounter.textContent = user.visitsCounter;
                booksCounter.textContent = user.booksCounter;
                inputUserName.readOnly = true;
                inputCard.readOnly = true;
                setTimeout(() => {
                    cardData.classList.remove(active);
                    btnCheckCard.classList.add(active);
                    inputUserName.readOnly = false;
                    inputCard.readOnly = false;
                    inputUserName.value = "";
                    inputCard.value = "";
                }, 9000);
            }
        }
    }
}
