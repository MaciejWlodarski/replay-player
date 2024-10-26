import { useContext, useEffect, useState } from "react";
import classNames from "classnames";
import {
  MatchContext,
  RoundContext,
  TickRefContext,
} from "../../../../../../hooks/context/context";
import { Check } from "lucide-react";
import CheckboxButton from "../../../../../CheckboxButton/CheckboxButton";
import { Tooltip } from "react-tooltip";
import "./ShareContent.css";

const ShareContent = ({ tooltipId }) => {
  const match = useContext(MatchContext);
  const round = useContext(RoundContext);
  const tickRef = useContext(TickRefContext);

  const [isVisible, setIsVisible] = useState(false);
  const [tickIncluded, setTickIncluded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedTick, setSelectedTick] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    setSelectedTick(Math.round(tickRef.current));
  }, [isVisible]);

  const handleChange = (e) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      setSelectedTick(value);
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(doneUrl);
  };

  const rootUrl = `https://replay.maciejwlodarski.com/match/${match.id}/${
    round.id + 1
  }`;
  const doneUrl = tickIncluded ? `${rootUrl}?tick=${selectedTick}` : rootUrl;

  return (
    <Tooltip
      id={tooltipId}
      place={"top-end"}
      opacity={1}
      noArrow={true}
      openEvents={{ click: true }}
      closeEvents={{ click: true }}
      clickable={true}
      afterShow={() => setIsVisible(true)}
      afterHide={() => setIsVisible(false)}
      delayShow={0.1}
      delayHide={0.1}
    >
      <div className="share-url">
        <span>{doneUrl}</span>
      </div>
      <div className="controller">
        <div className="tick-includer">
          <CheckboxButton
            label={
              <div className="includer">
                <Check
                  size={16}
                  className={classNames(
                    "check",
                    { excluded: !tickIncluded },
                    { hovered: isHovered }
                  )}
                />
                <span className={classNames({ excluded: !tickIncluded })}>
                  {`Start at tick `}
                </span>
              </div>
            }
            onButtonDown={() => setTickIncluded((prev) => !prev)}
            additionalClassName={"nohover"}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
          <input
            className={classNames({ included: tickIncluded })}
            type="text"
            value={selectedTick}
            onChange={handleChange}
            disabled={!tickIncluded}
          />
        </div>
        <CheckboxButton
          label={"Copy"}
          isChecked={true}
          onButtonDown={handleCopyUrl}
          additionalClassName={"copy"}
        />
      </div>
    </Tooltip>
  );
};

export default ShareContent;
