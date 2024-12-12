import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import Button from "@/components/ui/Button/Button";
import { Check } from "lucide-react";
import { Tooltip } from "react-tooltip";
import { colorMap } from "@/utils/utils";
import "./ShareContent.css";
import { MatchContext, RoundContext } from "@/providers/GameDataProvider";
import { TickRefContext } from "@/providers/TickProvider";
import { MainRefContext } from "@/providers/RefProvider";

const ShareContent = ({ tooltipId, isOpen, setIsOpen }) => {
  const match = useContext(MatchContext);
  const round = useContext(RoundContext);
  const tickRef = useContext(TickRefContext);
  const mainRef = useContext(MainRefContext);

  const [isVisible, setIsVisible] = useState(false);
  const [tickIncluded, setTickIncluded] = useState(false);
  const [selectedTick, setSelectedTick] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    setSelectedTick(Math.round(tickRef.current));
  }, [isVisible]);

  useEffect(() => {
    const handleMouseDown = () => {
      setIsOpen(false);
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
  }, [URL, urlPart]);

  const handleChange = useCallback(
    (e) => {
      const value = e.target.value;

      if (/^\d*$/.test(value)) {
        setSelectedTick(value);
      }
    },
    [setSelectedTick]
  );

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
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <div className="share-url">
        <span>{`...${urlPart}`}</span>
      </div>
      <div className="controller">
        <div className="tick-includer">
          <Button
            isChecked={tickIncluded}
            onLeftClick={() => setTickIncluded((prev) => !prev)}
          >
            <Check size={16} className="check" />
            <span>{"Start at tick"}</span>
          </Button>
          <input
            id="tick-input"
            className={classNames({ included: tickIncluded })}
            type="text"
            value={selectedTick}
            onChange={handleChange}
            disabled={!tickIncluded}
          />
        </div>
        <Button className={"copy"} onLeftClick={handleCopyUrl}>
          <span>{"Copy"}</span>
        </Button>
      </div>
    </Tooltip>
  );
};

export default ShareContent;
