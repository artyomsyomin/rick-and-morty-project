import React, { useState, useEffect } from 'react';

import Card from '../../components/card/Card.jsx';
import Pagination from '../../components/pagination/Pagination.jsx';
import InputSearch from '../../components/inputSearch/InputSearch.jsx';

import {
  setEpisodesInfo,
  setSearchInput,
  removeSearchInput,
} from '../../redux/actions/searchAction';
import { removeEpisodeInfo } from '../../redux/actions/episodeAction';

const url = 'https://rickandmortyapi.com/api/episode?page=';

import { connect } from 'react-redux';

const Search = ({
  episodesInfo,
  searchInput,
  setEpisodesInfo,
  setSearchInput,
  removeEpisodeInfo,
  removeSearchInput,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchEpisodes = async (page = 1) => {
    setLoading(true);

    try {
      const res = await fetch(url + page);
      const data = await res.json();
      setEpisodesInfo(data);
    } catch (e) {
      setEpisodesInfo('');
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    removeSearchInput();
    fetchEpisodes();
    removeEpisodeInfo();
  }, []);

  const paginate = (page) => {
    fetchEpisodes(page);
  };

  const inputHandler = (e) => {
    setSearchInput(e.target.value);
  };
  let searchOutput = '';
  error
    ? (searchOutput = (
        <h1 style={{ textAlign: 'center' }}>Something went wrong :(</h1>
      ))
    : (searchOutput = (
        <div>
          <h1>Search Page</h1>
          <InputSearch inputHandler={inputHandler} />
          <Card
            episodesInfo={episodesInfo.results}
            loading={loading}
            searchInput={searchInput}
          />
          <Pagination
            loading={loading}
            numOfPage={episodesInfo.info}
            paginate={paginate}
          />
        </div>
      ));
  return searchOutput;
};

export default connect(
  (state) => ({
    episodesInfo: state.searchReducer.episodesInfo,
    searchInput: state.searchReducer.searchInput,
  }),
  { setSearchInput, setEpisodesInfo, removeEpisodeInfo, removeSearchInput }
)(Search);
