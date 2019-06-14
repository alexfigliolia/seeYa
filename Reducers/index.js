import { combineReducers } from 'redux';
import Dimensions from './Dimensions';
import Proximity from './Proximity';
import User from './User';
import Header from './Header';
import Chat from './Chat';

export default combineReducers({
	Dimensions,
	Proximity,
	User,
	Header,
	Chat
});