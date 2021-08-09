import {createStore,combineReducers,applyMiddleware} from 'redux';
import noteReducer from './notes/noteReducer'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

const store = createStore(noteReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
