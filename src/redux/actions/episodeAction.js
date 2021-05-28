export const setEpisodeInfo = (episodeInfo) => {
  return {
    type: 'SET_EPISODE_INFO',
    episodeInfo,
  };
};

export const setCharList = (charList) => {
  return {
    type: 'SET_CHAR_LIST',
    charList,
  };
};

export const removeEpisodeInfo = () => {
  return {
    type: 'REMOVE_EPISODE_INFO',
  };
};
