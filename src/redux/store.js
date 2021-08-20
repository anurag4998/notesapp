import {createStore,combineReducers,applyMiddleware} from 'redux';
import noteReducer from './notes/noteReducer'
import userReducer from './users/userReducer'

import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
const rootreducer = combineReducers({
    
    notes:noteReducer,
    user:userReducer
})
const store = createStore(rootreducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
