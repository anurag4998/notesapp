import {createStore} from 'redux';
import noteReducer from './notes/noteReducer'

const store = createStore(noteReducer);

export default store;
