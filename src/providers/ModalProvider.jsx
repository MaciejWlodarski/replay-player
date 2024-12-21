import { createContext, useState } from "react";

export const ModalContext = createContext();
export const SetModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [modalTab, setModalTab] = useState(null);

  return (
    <SetModalContext value={setModalTab}>
      <ModalContext value={modalTab}>{children}</ModalContext>
    </SetModalContext>
  );
};

export default ModalProvider;
