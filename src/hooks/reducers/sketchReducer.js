export const sketchInitialState = {
  paths: [],
  redoStack: [],
};

export const sketchReducer = (state, action) => {
  switch (action.type) {
    case "ADD_PATH":
      return {
        paths: [...state.paths, action.payload],
        redoStack: [],
      };
    case "UNDO_PATH":
      if (state.paths.length === 0) return state;
      return {
        paths: state.paths.slice(0, -1),
        redoStack: [...state.redoStack, state.paths[state.paths.length - 1]],
      };
    case "REDO_PATH":
      if (state.redoStack.length === 0) return state;
      return {
        paths: [...state.paths, state.redoStack[state.redoStack.length - 1]],
        redoStack: state.redoStack.slice(0, -1),
      };
    case "CLEAR_PATHS":
      return {
        paths: [],
        redoStack: [],
      };
    default:
      return state;
  }
};
