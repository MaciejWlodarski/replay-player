export const configInitialState = {
  visibility: {
    secondary: true,
    primary: true,
    grenades: true,
  },
};

export const configReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_VISIBILITY": {
      const { key } = action.payload;
      return {
        ...state,
        visibility: {
          ...state.visibility,
          [key]: !state.visibility[key],
        },
      };
    }

    case "SET_VISIBILITY": {
      const { key, value } = action.payload;
      return {
        ...state,
        visibility: {
          ...state.visibility,
          [key]: value,
        },
      };
    }

    case "RESET_CONFIG": {
      return configInitialState;
    }

    default:
      return state;
  }
};
