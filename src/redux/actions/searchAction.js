export const setEpisodesInfo = (episodesInfo) => {
  return {
    type: 'SET_SEARCH_INFO',
    episodesInfo,
  };
};

export const setSearchInput = (searchInput) => {
  return {
    type: 'SET_SEARCH_INPUT',
    searchInput,
  };
};

export const removeSearchInput = () => {
  return {
    type: 'REMOVE_SEARCH_INPUT',
  };
};
