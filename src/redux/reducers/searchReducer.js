const INITIAL_STATE = {
  episodesInfo: '',
  searchInput: '',
};

const searchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_SEARCH_INFO':
      return {
        ...state,
        episodesInfo: action.episodesInfo,
      };
    case 'SET_SEARCH_INPUT':
      return {
        ...state,
        searchInput: action.searchInput,
      };
    case 'REMOVE_SEARCH_INPUT':
      return {
        ...state,
        searchInput: '',
      };
    default:
      return state;
  }
};

export default searchReducer;
