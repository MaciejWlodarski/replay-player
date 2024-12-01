import { createContext, useState } from "react";

export const ModalContext = createContext();
export const SetModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [modalTab, setModalTab] = useState(null);

  return (
    <SetModalContext.Provider value={setModalTab}>
      <ModalContext.Provider value={modalTab}>{children}</ModalContext.Provider>
    </SetModalContext.Provider>
  );
};

export default ModalProvider;
