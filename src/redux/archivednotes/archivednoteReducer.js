const initialState = [];

const archivednoteReducer = (state = initialState, action) => {

    switch(action.type){
        case 'ADDTO_ARCHIVES': 
            return [
                ...state,
                action.note
            ];

        case 'EDIT_ARCHIVEDNOTE':
                return state.map((note) => {
                  if (note.id === action.id) {
                      return  {
                      ...note,
                      ...action.updates
                    };
                  } else {
                    return note;
                  };
                });
            
        case 'DELETEFROM_ARCHIVES':
            return state.filter(({ id }) => id !== action.id);
        
        default:
            return state;
    }

}

export default archivednoteReducer;