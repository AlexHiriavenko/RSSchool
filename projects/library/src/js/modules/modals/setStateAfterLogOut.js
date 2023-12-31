import {
    btnCardsLogin,
    btnCardsRegister,
    btnCardsProfile,
    btnsBuy,
    userInitials,
    userImg,
    toProfileOption,
    logOutOption,
    inputCard,
    inputUserName,
    cardData,
    btnCheckCard,
    readerCardTitle,
    readercardText,
    defaultCardText,
    defaultCardTitle,
} from "../variables/variables.js";

function setStateAfterLogOut() {
    const active = "active";
    btnCardsLogin.classList.add(active);
    btnCardsRegister.classList.add(active);
    btnCardsProfile.classList.remove(active);
    userImg.classList.add(active);
    userInitials.classList.remove(active);
    toProfileOption.classList.remove(active);
    logOutOption.classList.remove(active);
    localStorage.setItem("currentMail", "");
    inputCard.value = "";
    inputCard.readOnly = false;
    inputUserName.readOnly = false;
    inputUserName.value = "";
    cardData.classList.remove(active);
    btnCheckCard.classList.add(active);
    readerCardTitle.textContent = defaultCardTitle;
    readercardText.textContent = defaultCardText;
    for (const btn of btnsBuy) {
        btn.textContent = "Buy";
        btn.classList.remove("books__btn--bought");
        btn.disabled = false;
    }
}

export default setStateAfterLogOut;
