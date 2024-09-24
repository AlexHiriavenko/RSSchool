let btnBurger = document.querySelector(".burger-btn");
const linkCert = document.querySelector(".cert");
const nav = document.querySelector("nav");

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

const modal = document.querySelector(".modal");
const certs = document.querySelectorAll(".img-cert");
const currentCert = document.querySelector(".modal-cert");
const btnCloseModal = document.querySelector(".btn-close-modal");

modal.addEventListener("click", closeModal);
btnCloseModal.addEventListener("click", closeModal);

for (const cert of certs) {
    cert.addEventListener("click", openModal);
}

function openModal(event) {
    event.stopPropagation();
    currentCert.src = event.target.src;
    modal.classList.add("active");
    removeScroll();
}

function closeModal(e) {
    if (!e.target.matches(".modal-cert")) {
        modal.classList.remove("active");
        currentCert.classList.remove("zoom");
        enableScroll();
    }
}

function removeScroll() {
    document.body.style.overflow = "hidden";
}

function enableScroll() {
    document.body.style.overflow = "auto";
}

function toggleBurger(e) {
    if (!e.target.closest(".burger-btn") && !e.target.closest("nav")) {
        nav.classList.remove("active");
        document.body.removeEventListener("click", toggleBurger);
    }
}
