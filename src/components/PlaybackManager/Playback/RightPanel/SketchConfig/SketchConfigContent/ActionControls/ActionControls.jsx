import { memo, useContext } from "react";
import { Redo, Undo, X } from "lucide-react";
import Button from "../../../../../../ui/Button/Button";
import {
  SketchReducerDispatchContext,
  SketchReducerStateContext,
} from "../../../../../../../providers/SketchProvider";

const ActionControls = () => {
  const dispatch = useContext(SketchReducerDispatchContext);
  const { paths, redoStack } = useContext(SketchReducerStateContext);

  return (
    <div className="action-controls">
      <Button
        onLeftClick={() => dispatch({ type: "UNDO_PATH" })}
        isDisabled={paths.length === 0}
      >
        <Undo strokeWidth={1.5} />
      </Button>
      <Button
        onLeftClick={() => dispatch({ type: "REDO_PATH" })}
        isDisabled={redoStack.length === 0}
      >
        <Redo strokeWidth={1.5} />
      </Button>
      <Button
        onLeftClick={() => dispatch({ type: "CLEAR_PATHS" })}
        isDisabled={paths.length === 0 && redoStack.length === 0}
      >
        <X strokeWidth={1.5} />
      </Button>
    </div>
  );
};

export default memo(ActionControls);
