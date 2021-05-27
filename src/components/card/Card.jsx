import React from 'react';

const Card = ({ episodesInfo, loading }) => {
  //   console.log(episodesInfo);
  let cardInfo = '';

  if (!loading) {
    if (!episodesInfo.length) {
      cardInfo = '';
    } else {
      const seasons = [];

      let currentSeason = episodesInfo[0].episode.slice(0, 3);
      seasons.push(currentSeason);

      episodesInfo.map((season) => {
        if (season.episode.slice(0, 3) !== currentSeason) {
          currentSeason = season.episode.slice(0, 3);
          seasons.push(currentSeason);
        }
      });

      console.log(seasons);

      cardInfo = seasons.map((seasonName) => {
        return (
          <div key={seasonName}>
            <h1>{seasonName}</h1>
            {episodesInfo.map((episode) => {
              if (episode.episode.slice(0, 3) === seasonName) {
                return (
                  <div key={episode.id}>
                    <h2>{episode.name}</h2>
                    <p>{episode.air_date}</p>
                    <p>Season: {episode.episode.slice(1, 3)}</p>
                    <p>Episode: {episode.episode.slice(4)}</p>
                  </div>
                );
              }
            })}
          </div>
        );
      });
    }

    // !episodesInfo.length
    //   ? (cardInfo = '')
    //   : (cardInfo = episodesInfo.map((episode) => {
    //       return (
    //         <div key={episode.id}>
    //           <h2>{episode.name}</h2>
    //           <p>{episode.air_date}</p>
    //           <p>Season: {episode.episode.slice(1, 3)}</p>
    //           <p>Episode: {episode.episode.slice(4)}</p>
    //         </div>
    //       );
    //     }));
  }
  return cardInfo;
};

export default Card;
