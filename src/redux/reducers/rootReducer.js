import { combineReducers } from 'redux';

import searchReducer from './searchReducer';
import episodeReducer from './episodeReducer';

export default combineReducers({ searchReducer, episodeReducer });
