// src/components/Modals/ModalRenderer.jsx
import { useModal } from "../../context/ModalContext";
import ConfirmacionModal from "./ConfirmacionModal";
import ErrorModal from "./ErrorModal";

const ModalRenderer = () => {
  const { modal, hideModal } = useModal();

  if (!modal) return null;

  const { type, props } = modal;

  switch (type) {
    case "error":
      return (
        <ErrorModal
          visible={true}
          onClose={hideModal}
          {...props}
        />
      );
    case "confirm":
      return (
        <ConfirmacionModal
          visible={true}
          onClose={hideModal}
          {...props}
        />
      );
    default:
      return null;
  }
};

export default ModalRenderer;
