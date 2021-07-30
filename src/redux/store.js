import {createStore} from 'redux';

import noteReducer from './notes/noteReducer'
// const rootreducer = combineReducers({
//     cake:cakeReducer,
//     icecream:iceCreamReducer
// })
const store = createStore(noteReducer);

export default store;
