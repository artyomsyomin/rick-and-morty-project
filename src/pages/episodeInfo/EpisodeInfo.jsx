import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import './episodeInfo.css';
import { connect } from 'react-redux';

import { removeCharData } from '../../redux/actions/charAction';
import { removeSearchInput } from '../../redux/actions/searchAction';
import { setEpisodeInfo, setCharList } from '../../redux/actions/episodeAction';

const EpisodeInfo = ({
  match,
  removeSearchInput,
  setEpisodeInfo,
  setCharList,
  charList,
  episodeInfo,
  removeCharData,
}) => {
  const [loading, setLoading] = useState(false);
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
    removeCharData();
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
        <Link key={character.id} to={`${character.name}/${character.id}`}>
          <div className="episode-info-item">
            <h1 className="char-name">{character.name}</h1>
            <img
              className="info-image"
              src={character.image}
              alt="character-avatar"
            />
            <p>Gender: {character.gender}</p>
            <p>Species: {character.species}</p>
            <p>Status: {character.status}</p>
            <p>Location: {character.location.name}</p>
            <p>
              Appears in: {character.episode.length}{' '}
              {character.episode.length > 1 ? 'episodes' : 'episode'}
            </p>
          </div>
        </Link>
      );
    });
  }

  return (
    <div className="episode-info-container">
      <h1 className="episode-info-title">Episode Info</h1>
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
  { removeSearchInput, setEpisodeInfo, setCharList, removeCharData }
)(EpisodeInfo);
