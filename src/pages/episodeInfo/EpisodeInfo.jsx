import React, { useEffect, useState } from 'react';

import './episodeInfo.css';

const EpisodeInfo = ({ match }) => {
  console.log(match);

  const [episodeInfo, setEpisodeInfo] = useState('');
  const [loading, setLoading] = useState(true);
  const [charList, setCharList] = useState([]);
  //   const episodeUrl = 'https://rickandmortyapi.com/api/episode';

  const fetchEpisodeInfo = async () => {
    setLoading(true);
    const res = await fetch(
      'https://rickandmortyapi.com/api/episode' + match.url
    );
    const data = await res.json();
    console.log(data.characters);
    const charsArray = data.characters.map((charUrl) => {
      return fetchCharData(charUrl);
    });
    Promise.all(charsArray).then((chars) => {
      console.log(chars);
      setCharList(chars);
    });

    if (data) {
      setEpisodeInfo(data);
    } else {
      setEpisodeInfo('');
    }
    setLoading(false);
    console.log(data);
  };

  const fetchCharData = async (charUrl) => {
    const charRes = await fetch(charUrl);
    const charData = await charRes.json();
    return charData;
  };
  console.log(charList);

  useEffect(() => {
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
            <p>
              Episodes:{' '}
              {character.episode.length}{' '}
            </p>
          </div>
        );
      }));

  return (
    <div className="episode-info-container">
        <div className='episode-info-description'>
            
      <h2>Episode Title: {episodeInfo.name}</h2>
      <p>Release Date: {episodeInfo.air_date}</p>
      <p>Season/Episode: {episodeInfo.episode}</p>
        </div>
      <div className="character-info-container">{episodeData}</div>
    </div>
  );
};

export default EpisodeInfo;
