import { combineReducers } from 'redux';
import posts from './posts';
import auth from './auth';
import user from './user';
import friends from './friends';
import search from './search';
import chat from './chat';

export default combineReducers({ posts, auth, user, friends, search, chat });
