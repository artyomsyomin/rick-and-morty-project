import React from 'react';
import './card.css';

const Card = ({ episodesInfo, loading, searchInput }) => {
  //   console.log(episodesInfo);
  let cardInfo = '';

  if (!loading) {
    if (!episodesInfo.length) {
      cardInfo = '';
    } else {
      const seasons = [];

    //   let currentSeason = episodesInfo[0].episode.slice(0, 3);
      let currentSeason = '';
      seasons.push(currentSeason);

      episodesInfo
        .filter((episode) => {
          if (!searchInput) {
            return episode;
          } else if (
            episode.name.toLowerCase().includes(searchInput.toLowerCase())
          ) {
            return episode;
          }
        })
        .map((season) => {
          if (season.episode.slice(0, 3) !== currentSeason) {
            currentSeason = season.episode.slice(0, 3);
            seasons.push(currentSeason);
          }
        });

      console.log(seasons);

      cardInfo = seasons.map((seasonName) => {
        return (
          <div className="card-container" key={seasonName}>
            <div>
              <h1>{seasonName}</h1>
              {episodesInfo
                .filter((episode) => {
                  if (!searchInput) {
                    return episode;
                  } else if (
                    episode.name
                      .toLowerCase()
                      .includes(searchInput.toLowerCase())
                  ) {
                    return episode;
                  }
                })
                .map((episode) => {
                  if (episode.episode.slice(0, 3) === seasonName) {
                    return (
                      <div key={episode.id} className="card">
                        <h2>{episode.name}</h2>
                        <p>{episode.air_date}</p>
                        <p>Season: {episode.episode.slice(2, 3)}</p>
                        <p>Episode: {episode.episode.slice(4)}</p>
                      </div>
                    );
                  }
                })}
            </div>
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
