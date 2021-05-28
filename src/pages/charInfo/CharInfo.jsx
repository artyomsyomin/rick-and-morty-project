import React, { useState, useEffect } from 'react';

import './charInfo.css';

import { connect } from 'react-redux';

import { setCharData } from '../../redux/actions/charAction';

const charUrl = 'https://rickandmortyapi.com/api/character/';

const CharInfo = ({ match, setCharData, charData }) => {
  //   const [charData, setCharData] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchCharInfo = async () => {
    setLoading(true);
    try {
      const res = await fetch(charUrl + match.params.charId);
      const data = await res.json();
      setCharData(data);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharInfo();
  }, []);

  let characterData = '';
  if (loading) {
    characterData = <h1>Loading...</h1>;
  } else if (error) {
    characterData = <h1>Something went wrong :(</h1>;
  } else {
    characterData = (
      <div className="char-card">
        <h2 className="char-name-info">{charData.name}</h2>
        <img
          className="char-info-image"
          src={charData.image}
          alt="character-avatar"
        />
        <p className="char-info-stats">Species: {charData.species}</p>
        <p className="char-info-stats">Status: {charData.status}</p>
        <p className="char-info-stats">Gender: {charData.gender}</p>
        <p className="char-info-stats">
          Appears in: {charData.episode.length}{' '}
          {charData.episode.length > 1 ? 'episodes' : 'episode'}
        </p>
        <div className="char-location">
          <p className="location-name">Location: {charData.location.name}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="char-info-container">
      <h1 className="info-title">Character Info</h1>
      {characterData}
    </div>
  );
};

export default connect(
  (state) => ({
    charData: state.charReducer.charData,
  }),
  { setCharData }
)(CharInfo);
