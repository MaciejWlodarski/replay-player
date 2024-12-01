import Config from "./Config/Config";
import Keybinds from "./Keybinds/Keybinds";
import "./Settings.css";

const Settings = () => {
  return (
    <div className="settings">
      <Config />
      <Keybinds />
    </div>
  );
};

export default Settings;
