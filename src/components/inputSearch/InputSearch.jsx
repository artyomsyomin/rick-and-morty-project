import React from 'react';

const InputSearch = ({inputHandler}) => {
  return (
    <div>
      <h2>JUST START TYPING...</h2>
      <input
        placeholder="Type episode's name"
        type="text"
        id="search"
        onChange={(e) => inputHandler(e)}
      />
    </div>
  );
};

export default InputSearch;
