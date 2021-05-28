import React, { useEffect, useState } from 'react';

import './episodeInfo.css';
import { connect } from 'react-redux';

import { removeSearchInput } from '../../redux/actions/searchAction';
import { setEpisodeInfo, setCharList } from '../../redux/actions/episodeAction';

const EpisodeInfo = ({
  match,
  removeSearchInput,
  setEpisodeInfo,
  setCharList,
  charList,
  episodeInfo,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchEpisodeInfo = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        'https://rickandmortyapi.com/api/episode' + match.url
      );
      const data = await res.json();
      const charsArray = data.characters.map((charUrl) => {
        return fetchCharData(charUrl);
      });
      Promise.all(charsArray).then((chars) => {
        setCharList(chars);
      });
      setEpisodeInfo(data);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchCharData = async (charUrl) => {
    try {
      const charRes = await fetch(charUrl);
      const charData = await charRes.json();
      return charData;
    } catch (e) {
      setError(true);
    }
  };

  useEffect(() => {
    removeSearchInput();
    fetchEpisodeInfo();
  }, []);

  let episodeData = '';
  if (loading) {
    episodeData = <h1>Loading...</h1>;
  } else if (error) {
    episodeData = <h1>Something went wrong :(</h1>;
  } else {
    episodeData = charList.map((character) => {
      return (
        <div key={character.id} className="episode-info-item">
          <h1>{character.name}</h1>
          <img
            className="info-image"
            src={character.image}
            alt="character-avatar"
          />
          <p>Gender: {character.gender}</p>
          <p>Species: {character.species}</p>
          <p>Status: {character.status}</p>
          <p>Location: {character.location.name}</p>
          <p>Episodes: {character.episode.length} </p>
        </div>
      );
    });
  }

  return (
    <div className="episode-info-container">
      <div className="episode-info-description">
        <h2>Episode Title: {episodeInfo.name}</h2>
        <p>Release Date: {episodeInfo.air_date}</p>
        <p>Season/Episode: {episodeInfo.episode}</p>
      </div>
      <div className="character-info-container">{episodeData}</div>
    </div>
  );
};

export default connect(
  (state) => ({
    episodeInfo: state.episodeReducer.episodeInfo,
    charList: state.episodeReducer.charList,
  }),
  { removeSearchInput, setEpisodeInfo, setCharList }
)(EpisodeInfo);
