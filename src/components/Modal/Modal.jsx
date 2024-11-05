import { memo, useContext } from "react";
import { ModalContext, SetModalContext } from "../../hooks/context/context";
import Settings from "./Settings/Settings";
import classNames from "classnames";
import "./Modal.css";

const Modal = () => {
  const modalTab = useContext(ModalContext);
  const setModalTab = useContext(SetModalContext);

  console.log("xd");

  if (!modalTab) return null;

  const getTab = () => {
    switch (modalTab) {
      case "settings":
        return <Settings />;
      default:
        return null;
    }
  };

  const closeModal = () => setModalTab(null);

  return (
    <div
      className={classNames("modal-overlay", { active: modalTab })}
      onClick={closeModal}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {getTab()}
      </div>
    </div>
  );
};

export default memo(Modal);
