const initialState = [];


const notereducer =  (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'ADD_NOTE':
      return [
        ...state,
        action.note
      ];

    case 'DELETE_NOTE':
      return state.filter(({ id }) => id !== action.id);

    case 'EDIT_NOTE':
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
  

    case 'SWAP_NOTE':
      const draggedBox =  state.find((box) => box.id === action.draggedID);
      const droponBox =   state.find((box) => box.id === action.droppedID)

      let temp = draggedBox.order;
      draggedBox.order = droponBox.order;
      droponBox.order = temp;

     
      return state.filter(x => x.id !== null);

    default:
      return state;
  }
  
};

export default notereducer