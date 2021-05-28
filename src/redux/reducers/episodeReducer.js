const INITIAL_STATE = {
  episodeInfo: '',
  charList: [],
};

const episodeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_EPISODE_INFO':
      return {
        ...state,
        episodeInfo: action.episodeInfo,
      };
    case 'SET_CHAR_LIST':
      return {
        ...state,
        charList: action.charList,
      };
    case 'REMOVE_EPISODE_INFO':
      return {
        ...state,
        episodeInfo: '',
        charList: [],
      };
    default:
      return state;
  }
};

export default episodeReducer;
