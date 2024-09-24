const btnCode = document.querySelector(".code__btn");
const btnClose = document.querySelector(".close");
const btnBurger = document.querySelector(".burger-btn");
const linkCert = document.querySelector(".cert");
const headerLinks = document.querySelectorAll(".nav-link");
const nav = document.querySelector("nav");

btnCode.addEventListener("click", onBtnCodeClick);

function onBtnCodeClick(e) {
    const codePreview = document.getElementById("code");
    codePreview.matches(".code-onClick")
        ? codePreview.classList.remove("code-onClick")
        : codePreview.classList.add("code-onClick");
}

btnClose.addEventListener("click", () => {
    const codePreview = document.getElementById("code");
    codePreview.classList.remove("code-onClick");
});

btnBurger.addEventListener("click", handleBurger);

function handleBurger() {
    if (nav.matches(".active")) {
        nav.classList.remove("active");
        document.body.removeEventListener("click", toggleBurger);
    } else {
        nav.classList.add("active");
        document.body.addEventListener("click", toggleBurger);
    }
}

headerLinks.forEach((link) => link.addEventListener("click", handleBurger));

function toggleBurger(e) {
    if (!e.target.closest(".burger-btn") && !e.target.closest("nav")) {
        nav.classList.remove("active");
        document.body.removeEventListener("click", toggleBurger);
    }
}
