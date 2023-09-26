import {
    btnsSliderAbout,
    photosList,
    btnMoveRight,
    btnMoveLeft,
    sliderSircles,
} from "../variables/variables.js";

const sliderPosition = {
    toPhoto1: "first",
    toPhoto2: "second",
    toPhoto3: "third",
    toPhoto4: "fourth",
    toPhoto5: "fifth",
};
const sliderPositionValues = Object.values(sliderPosition);
const lastElement = sliderPositionValues[sliderPositionValues.length - 1];
const firstElement = sliderPositionValues[0];
const lastIndex = sliderPositionValues.length - 1;

for (const btn of btnsSliderAbout) {
    btn.addEventListener("click", slider);
}

btnMoveRight.addEventListener("click", moveRigth);
btnMoveLeft.addEventListener("click", moveLeft);

function slider(event) {
    const btn = event.currentTarget;
    const span = btn.firstElementChild;

    const prev = document.querySelector(".btn-carousel--active");
    prev.classList.remove("btn-carousel--active");
    span.classList.add("btn-carousel--active");
    photosList.className = "photos-list " + sliderPosition[btn.id];
    if (sliderPosition[btn.id] === lastElement) {
        btnMoveRight.disabled = true;
        btnMoveRight.style.pointerEvents = "none";
        btnMoveLeft.disabled = false;
        btnMoveLeft.style.pointerEvents = "auto";
    } else if (sliderPosition[btn.id] === firstElement) {
        btnMoveLeft.disabled = true;
        btnMoveLeft.style.pointerEvents = "none";
        btnMoveRight.disabled = false;
        btnMoveRight.style.pointerEvents = "auto";
    } else {
        btnMoveRight.disabled = false;
        btnMoveRight.style.pointerEvents = "auto";
        btnMoveLeft.disabled = false;
        btnMoveLeft.style.pointerEvents = "auto";
    }
    const bntGroup = document.querySelector(".btn-group");
    const prevBtn = bntGroup.querySelector("button[disabled]");
    prevBtn.disabled = false;
    prevBtn.style.pointerEvents = "auto";
    btn.disabled = true;
    btn.style.pointerEvents = "none";
}

function moveRigth() {
    const index = sliderPositionValues.findIndex((el) => photosList.classList.contains(el));
    if (index < lastIndex) {
        btnMoveLeft.style.pointerEvents = "auto";
        btnMoveLeft.disabled = false;
        photosList.className = "photos-list " + sliderPositionValues[index + 1];
        const prev = document.querySelector(".btn-carousel--active");
        prev.classList.remove("btn-carousel--active");
        sliderSircles[index + 1].classList.add("btn-carousel--active");
        const bntGroup = document.querySelector(".btn-group");
        const prevBtn = bntGroup.querySelector("button[disabled]");
        prevBtn.disabled = false;
        prevBtn.style.pointerEvents = "auto";
        const currentBtn = btnsSliderAbout[index + 1];
        currentBtn.disabled = true;
        currentBtn.style.pointerEvents = "none";
        if (index === lastIndex - 1) {
            btnMoveRight.disabled = true;
            btnMoveRight.style.pointerEvents = "none";
        }
    }
}

function moveLeft() {
    const index = sliderPositionValues.findIndex((el) => photosList.classList.contains(el));
    if (index > 0) {
        btnMoveRight.style.pointerEvents = "auto";
        btnMoveRight.disabled = false;
        photosList.className = "photos-list " + sliderPositionValues[index - 1];
        const prev = document.querySelector(".btn-carousel--active");
        prev.classList.remove("btn-carousel--active");
        sliderSircles[index - 1].classList.add("btn-carousel--active");
        const bntGroup = document.querySelector(".btn-group");
        const prevBtn = bntGroup.querySelector("button[disabled]");
        prevBtn.disabled = false;
        prevBtn.style.pointerEvents = "auto";
        const currentBtn = btnsSliderAbout[index - 1];
        currentBtn.disabled = true;
        currentBtn.style.pointerEvents = "none";
        if (index === 1) {
            btnMoveLeft.disabled = true;
            btnMoveLeft.style.pointerEvents = "none";
        }
    }
}
