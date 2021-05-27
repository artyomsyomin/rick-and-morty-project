import React from 'react';
import './inputSearch.css'

const InputSearch = ({inputHandler}) => {
  return (
    <div  className='input-search-container'>
      {/* <h2>Type title here...</h2> */}
      <input className='input-search'
        placeholder="Type episode's title"
        type="text"
        id="search"
        onChange={(e) => inputHandler(e)}
      />
    </div>
  );
};

export default InputSearch;
