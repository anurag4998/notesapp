const initialState = [];

const archivednoteReducer = (state = initialState, action) => {

    switch(action.type){
        case 'ADDTO_ARCHIVES': 
            return [
                ...state,
                action.note
            ];
        
        case 'DELETEFROM_ARCHIVES':
            return state.filter(({ id }) => id !== action.id);
        
        default:
            return state;
    }

}

export default archivednoteReducer;