import React from 'react';

const InputSearch = () => {
  return (
    <div>
      <h2 >JUST START TYPING...</h2>
      <input
        placeholder="Type episode's name"
        type="text"
        id="search"
        onChange={inputHandler}
        value={searchText}
      />
    </div>
  );
};
