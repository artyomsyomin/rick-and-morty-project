import React from 'react';
import './card.css';

import { Link } from 'react-router-dom';

const Card = ({ episodesInfo, loading, searchInput }) => {
  let cardInfo = '';

  if (!loading) {
    if (!episodesInfo.length) {
      cardInfo = '';
    } else {
      const seasons = [];

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
          <div key={seasonName}>
            <h1 className='season-number'>{seasonName}</h1>
            {episodesInfo
              .filter((episode) => {
                if (!searchInput) {
                  return episode;
                } else if (
                  episode.name.toLowerCase().includes(searchInput.toLowerCase())
                ) {
                  return episode;
                }
              })
              .map((episode) => {
                if (episode.episode.slice(0, 3) === seasonName) {
                  return (
                    <div key={episode.id} className="episodes-container">
                      <Link to={`/${episode.id}`}>
                        <div className="card">
                          <h2 className='item-b'>{episode.name}</h2>
                          <p className='item-c'>{episode.air_date}</p>
                          <p className='item-d'>Season: {episode.episode.slice(2, 3)}</p>
                          <p className='item-a'>{episode.episode.slice(4)}</p>
                        </div>
                      </Link>
                    </div>
                  );
                }
              })}
          </div>
        );
      });
    }
  }
  return <div className="card-container">{cardInfo}</div>;
};

export default Card;
