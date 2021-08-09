const initialState = {
  notes: [],
  isLoading: false,
  error: null,
};

const notereducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_NOTE":
      return { ...state, notes: [...state.notes, action.note] };

    case "DELETE_NOTE":
      return {
        ...state,
        notes: state.notes.filter(({ _id }) => _id !== action.id),
      };

    case "EDIT_NOTE": {
      return {
        ...state,
        notes: state.notes.map((note) => {
          if (note._id === action.id) {
            return {
              ...note,
              ...action.updates,
            };
          } else {
            return note;
          }
        }),
      };
    }
    case "SWAP_NOTE": {
      const draggedBox = state.notes.find(
        (box) => box._id === action.draggedID
      );
      const droponBox = state.notes.find((box) => box._id === action.droppedID);
      let temp = draggedBox.order;
      draggedBox.order = droponBox.order;
      droponBox.order = temp;
      return { ...state, notes: state.notes.filter((x) => x._id !== null) };
    }

    case "SET_NOTES":
      return { ...state, notes: action.notes };

    default:
      return state;
  }
};

export default notereducer;
