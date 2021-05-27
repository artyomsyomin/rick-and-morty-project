import React, { useEffect, useState } from 'react';

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
        console.log(chars)
        setCharList(chars);
    })
    console.log('OOOOOOOOOOOOOOOOOOO')
    // console.log(charsArray)
    // setCharList(charsArray);

    console.log('Fatch ended-===1');

    if (data) {
      setEpisodeInfo(data);
    } else {
      setEpisodeInfo('');
    }
    setLoading(false);
    console.log(data);
  };

//   const charsArray = [];

  const fetchCharData = async (charUrl) => {
    const charRes = await fetch(charUrl);
    const charData = await charRes.json();
     return charData;
    // console.log('charData')
    // console.log(charData)
    //  return charsArray.push(charData);
    // setCharList(charsArray);
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
          <div key={character.id}>
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
            <p>Появлялся в следующем количестве эпизодов: {character.episode.length} </p>
          </div>
        );
      }));

  return (
    <div>
      <h1>Episode Info</h1>
      <h2>{episodeInfo.name}</h2>
      <p>{episodeInfo.air_date}</p>
      <p>{episodeInfo.episode}</p>
      {episodeData}
    </div>
  );
};

export default EpisodeInfo;
