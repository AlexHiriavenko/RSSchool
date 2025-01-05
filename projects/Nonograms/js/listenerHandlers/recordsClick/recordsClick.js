import { openModal } from "../../components/modal/functions/openModal";
import { modal } from "../../App";
import { createRecordsTable } from "../../components/recordsTable/createRecordsTable";

export function recordsClick() {
  const emptyRecord = {
    playerName: "empty",
    name: "empty",
    difficulty: "empty",
    time: "empty",
  };

  const recordsData = JSON.parse(localStorage.getItem("records")) || [];

  if (recordsData.length < 5) {
    while (recordsData.length < 5) {
      recordsData.push(emptyRecord);
    }
  }

  if (recordsData.length < 5) {
    while (recordsData.length < 5) {
      recordsData.push(emptyRecord);
    }
  }

  const recordsTable = createRecordsTable(recordsData);

  modal.modalWindow.classList.add("records-bg");
  openModal(recordsTable);
}
