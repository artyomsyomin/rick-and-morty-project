export const setCharData = (charData) => {
  return {
    type: 'SET_CHARACTER_INFORMATION',
    charData,
  };
};
export const removeCharData = () => {
  return {
    type: 'REMOVE_CHARACTER_INFORMATION',
  };
};
