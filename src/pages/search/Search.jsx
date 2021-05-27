import React, { useState, useEffect } from 'react';

import Card from '../../components/card/Card.jsx';

const url = 'https://rickandmortyapi.com/api/episode?page=1';

const Search = () => {
  const [episodesInfo, setEpisodesInfo] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchEpisodes = async () => {
    setLoading(true);
    const res = await fetch(url);
    const data = await res.json();
    console.log("Fatch ended")
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

console.log(episodesInfo);
console.log(episodesInfo.results);


  return (
    <div>
      <h1>Search Page</h1>
      <Card episodesInfo={episodesInfo.results} loading={loading}/>
    </div>
  );
};

export default Search;
