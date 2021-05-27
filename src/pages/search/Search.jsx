import React, { useState, useEffect } from 'react';

import Card from '../../components/card/Card.jsx';
import Pagination from '../../components/pagination/Pagination.jsx';
import InputSearch from '../../components/inputSearch/InputSearch.jsx';

const url = 'https://rickandmortyapi.com/api/episode?page=';
// const page = 1

const Search = () => {
  const [episodesInfo, setEpisodesInfo] = useState('');
  const [loading, setLoading] = useState(true);
    const [searchInput, setSearchInput] = useState('');

  const fetchEpisodes = async (page = 1) => {
    setLoading(true);
    const res = await fetch(url + page);
    const data = await res.json();
    console.log('Fatch ended');
    if (data.results) {
      setEpisodesInfo(data);
    } else {
      setEpisodesInfo('');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEpisodes();
  }, []);

  const paginate = (page) => {
    fetchEpisodes(page);
  };

  let searchedTitle = '';

  const inputHandler = (e) => {
    setSearchInput(e.target.value);
    console.log(searchInput);
  };

  console.log(episodesInfo);
  console.log(episodesInfo.results);
  console.log(episodesInfo.info);

  return (
    <div>
      <h1>Search Page</h1>
      <InputSearch inputHandler={inputHandler} />
      <Card episodesInfo={episodesInfo.results} loading={loading} searchInput={searchInput}/>
      <Pagination
        loading={loading}
        numOfPage={episodesInfo.info}
        paginate={paginate}
      />
    </div>
  );
};

export default Search;
