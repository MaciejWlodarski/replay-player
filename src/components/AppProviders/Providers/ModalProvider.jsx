import { useState } from "react";
import { ModalContext, SetModalContext } from "../../../hooks/context/context";

const ModalProvider = ({ children }) => {
  const [modalTab, setModalTab] = useState(null);

  return (
    <SetModalContext.Provider value={setModalTab}>
      <ModalContext.Provider value={modalTab}>{children}</ModalContext.Provider>
    </SetModalContext.Provider>
  );
};

export default ModalProvider;
