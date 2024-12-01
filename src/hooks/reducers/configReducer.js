const accData = {
  visibility: {
    secondary: true,
    primary: true,
    grenades: true,
  },
};

const webData = {};

export const configInitialState = {
  account: accData,
  web: webData,
};

export const configReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_VISIBILITY": {
      const { key } = action.payload;
      return {
        ...state,
        account: {
          ...state.account,
          visibility: {
            ...state.account.visibility,
            [key]: !state.account.visibility[key],
          },
        },
      };
    }

    case "SET_VISIBILITY": {
      const { key, value } = action.payload;
      return {
        ...state,
        account: {
          ...state.account,
          visibility: {
            ...state.account.visibility,
            [key]: value,
          },
        },
      };
    }

    case "SET_WEB_DATA": {
      const { webData } = action.payload;
      return {
        ...state,
        web: {
          ...state.web,
          ...webData,
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
