import React from 'react';

import Search from './pages/search/Search.jsx';
import EpisodeInfo from './pages/episodeInfo/EpisodeInfo.jsx';
import Header from './components/header/Header.jsx';
import CharInfo from './pages/charInfo/CharInfo.jsx';

import { Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Search} />
        <Route exact path={`/:episodeId`} component={EpisodeInfo} />
        <Route path={`/:episodeId/:charId`} component={CharInfo} />
      </Switch>
    </div>
  );
};

export default App;
