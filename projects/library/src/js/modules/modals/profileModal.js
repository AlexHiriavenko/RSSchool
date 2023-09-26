import {
    containerModalProfile,
    modalProfile,
    btnCloseProfileModal,
} from "../variables/variables.js";
import { closeModal, openModal } from "./modals.js";

modalProfile.addEventListener("click", (e) => e.stopPropagation());

btnCloseProfileModal.addEventListener("click", () =>
    closeModal(containerModalProfile, modalProfile)
);
containerModalProfile.addEventListener("click", () =>
    closeModal(containerModalProfile, modalProfile)
);
