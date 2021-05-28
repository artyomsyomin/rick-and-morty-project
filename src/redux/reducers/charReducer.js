const INITIAL_STATE = {
  charData: '',
};

const charReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_CHARACTER_INFORMATION':
      return {
        ...state,
        charData: action.charData,
      };
    case 'REMOVE_CHARACTER_INFORMATION':
      return {
        ...state,
        charData: '',
      };
    default:
      return state;
  }
};

export default charReducer;
