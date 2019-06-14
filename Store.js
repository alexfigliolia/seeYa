import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Reducers from './Reducers';

export default createStore(Reducers, applyMiddleware(thunk));