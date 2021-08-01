import {createStore,combineReducers} from 'redux';
import archivednoteReducer from './archivednotes/archivednoteReducer'
import noteReducer from './notes/noteReducer'

const rootreducer = combineReducers({
    archived:archivednoteReducer,
    notes:noteReducer
})
const store = createStore(rootreducer);

export default store;
