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

  const fetchEpisodeInfo = async () => {
    setLoading(true);
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

    if (data) {
      setEpisodeInfo(data);
    } else {
      setEpisodeInfo('');
    }
    setLoading(false);
  };

  const fetchCharData = async (charUrl) => {
    const charRes = await fetch(charUrl);
    const charData = await charRes.json();
    return charData;
  };

  useEffect(() => {
    removeSearchInput();
    fetchEpisodeInfo();
  }, []);

  let episodeData = '';

  loading
    ? (episodeData = <h1>Loading...</h1>)
    : (episodeData = charList.map((character) => {
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
      }));

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
