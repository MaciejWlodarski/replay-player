import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import {
  MainRefContext,
  MatchContext,
  RoundContext,
  TickRefContext,
} from "../../../../../../hooks/context/context";
import { Check } from "lucide-react";
import CheckboxButton from "../../../../../CheckboxButton/CheckboxButton";
import { Tooltip } from "react-tooltip";
import { colorMap } from "../../../../../../utils/utils";
import "./ShareContent.css";

const ShareContent = ({ tooltipId }) => {
  const match = useContext(MatchContext);
  const round = useContext(RoundContext);
  const tickRef = useContext(TickRefContext);
  const mainRef = useContext(MainRefContext);

  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [tickIncluded, setTickIncluded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedTick, setSelectedTick] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    setSelectedTick(Math.round(tickRef.current));
  }, [isVisible]);

  useEffect(() => {
    const handleMouseDown = () => {
      setIsTooltipOpen(false);
    };

    const main = mainRef.current;
    main.addEventListener("mousedown", handleMouseDown);

    return () => {
      main.removeEventListener("mousedown", handleMouseDown);
    };
  }, [mainRef]);

  const URL = `https://replay.maciejwlodarski.com`;

  const urlPart = useMemo(() => {
    const roundPart = `/match/${match.id}/${round.id + 1}`;
    const tickPart = `?tick=${selectedTick}`;

    return !tickIncluded ? roundPart : roundPart + tickPart;
  }, [match, round, selectedTick, tickIncluded]);

  const handleCopyUrl = useCallback(() => {
    navigator.clipboard.writeText(URL + urlPart);
  }, [urlPart]);

  const handleChange = useCallback((e) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      setSelectedTick(value);
    }
  }, []);

  return (
    <Tooltip
      id={tooltipId}
      place={"top-end"}
      opacity={1}
      border={`1px solid ${colorMap.border}`}
      openEvents={{ click: true }}
      closeEvents={{ click: true }}
      globalCloseEvents={{ clickOutsideAnchor: true }}
      clickable={true}
      afterShow={() => setIsVisible(true)}
      afterHide={() => setIsVisible(false)}
      delayShow={0.1}
      delayHide={0.1}
      offset={6}
      isOpen={isTooltipOpen}
      setIsOpen={setIsTooltipOpen}
    >
      <div className="share-url">
        <span>{`...${urlPart}`}</span>
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
            id="tick-input"
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
