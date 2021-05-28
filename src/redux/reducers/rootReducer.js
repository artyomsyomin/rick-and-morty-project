import { combineReducers } from 'redux';

import searchReducer from './searchReducer';
import episodeReducer from './episodeReducer';
import charReducer from './charReducer';

export default combineReducers({ searchReducer, episodeReducer, charReducer });
