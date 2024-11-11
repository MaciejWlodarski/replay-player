import Key from "../../../ui/Key/Key";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Space } from "lucide-react";
import "./Keybinds.css";

const Keybinds = () => {
  return (
    <div className="keybinds">
      <div className="title">
        <div className="line left" />
        <span>Keybinds</span>
        <div className="line right" />
      </div>
      <div className="content">
        <div className="key-interaction">
          <Key>
            <Space size={16} strokeWidth={2} />
          </Key>
        </div>
        <span className="action">Toggle Play/Stop</span>

        <div className="key-interaction">
          <Key>
            <ArrowUp size={16} strokeWidth={2} />
          </Key>
        </div>
        <span className="action">Speed up</span>

        <div className="key-interaction">
          <Key>
            <ArrowDown size={16} strokeWidth={2} />
          </Key>
        </div>
        <span className="action">Speed down</span>

        <div className="key-interaction">
          <span className="interaction">Hold</span>
          <Key>
            <ArrowRight size={16} strokeWidth={2} />
          </Key>
        </div>
        <span className="action">Play</span>

        <div className="key-interaction">
          <span className="interaction">Hold</span>
          <Key>
            <ArrowLeft size={16} strokeWidth={2} />
          </Key>
        </div>
        <span className="action">Reverse Play</span>
      </div>
    </div>
  );
};

export default Keybinds;
