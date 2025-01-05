import { openModal } from "../../components/modal/functions/openModal";
import { createSolutionAlert } from "../../components/modal/solutionAlert/createSolutionAlert";

export function showSolutionClick() {
  const solutionAlert = createSolutionAlert();

  openModal(solutionAlert);
}
