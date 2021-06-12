import { combineReducers } from 'redux';
import posts from './posts';
import auth from './auth';
import user from './user';
import friends from './friends';

export default combineReducers({ posts, auth, user, friends });
