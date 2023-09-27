import {
    btnCardsLogin,
    btnCardsRegister,
    btnCardsProfile,
    btnsBuy,
    userInitials,
    userImg,
    inputCard,
    inputUserName,
    cardData,
    btnCheckCard,
    bonusCounter,
    booksCounter,
    visitsCounter,
    readerCardTitle,
    readercardText,
    authCardText,
    authCardTitle,
} from "../variables/variables.js";

export default function setStateAfterLogIn(mail) {
    const active = "active";
    btnCardsLogin.classList.remove(active);
    btnCardsRegister.classList.remove(active);
    btnCardsProfile.classList.add(active);
    userImg.classList.remove(active);
    const AllUsers = JSON.parse(localStorage.getItem("users"));
    const user = AllUsers.find((el) => el.mail === mail);
    const firstName = user.firstName;
    const lastName = user.lastName;
    const userInitialsStorage = firstName[0].toUpperCase() + lastName[0].toUpperCase();
    userInitials.textContent = userInitialsStorage;
    userInitials.classList.add(active);
    localStorage.setItem("currentMail", mail);
    inputUserName.value = user.firstName + " " + user.lastName;
    inputCard.value = user.userID;
    inputUserName.readOnly = true;
    inputCard.readOnly = true;
    cardData.classList.add(active);
    btnCheckCard.classList.remove(active);
    bonusCounter.textContent = user.bonusCounter;
    visitsCounter.textContent = user.visitsCounter;
    booksCounter.textContent = user.booksCounter;
    readerCardTitle.textContent = authCardTitle;
    readercardText.textContent = authCardText;
    for (const btn of btnsBuy) {
        if (user?.booksList?.length)
            user.booksList.forEach((book) => {
                if (book.bookID === btn.id) {
                    btn.classList.add("books__btn--bought");
                    btn.textContent = "Own";
                    btn.disabled = true;
                }
            });
    }
}
