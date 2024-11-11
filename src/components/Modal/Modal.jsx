import { memo, useCallback, useContext, useEffect, useState } from "react";
import { ModalContext, SetModalContext } from "../../hooks/context/context";
import Settings from "./Settings/Settings";
import classNames from "classnames";
import "./Modal.css";

const Modal = () => {
  const modalTab = useContext(ModalContext);
  const setModalTab = useContext(SetModalContext);

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(!!modalTab);
  }, [modalTab]);

  const getTab = useCallback(() => {
    switch (modalTab) {
      case "settings":
        return <Settings />;
      default:
        return null;
    }
  }, [modalTab]);

  const closeModal = useCallback(() => setModalTab(null), [setModalTab]);

  return (
    <div
      className={classNames("modal-overlay", { active: isActive })}
      onClick={closeModal}
    >
      <div className="modal-display" onClick={(e) => e.stopPropagation()}>
        <header>
          <span className="green">CS</span>
          <span>Analyzer.gg</span>
        </header>
        <div className="modal-content">{getTab()}</div>
      </div>
    </div>
  );
};

export default memo(Modal);
