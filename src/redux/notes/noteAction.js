import axios from "axios";

export const addNote = (notes) => ({
  type: "ADD_NOTE",
  note: notes,
});

export const removeNote = (id) => {
  return {
    type: "DELETE_NOTE",
    id,
  };
};

export const editNote = (id, updates) => {
  return {
    type: "EDIT_NOTE",
    id,
    updates,
  };
};

export const swapNote = (draggedID, droppedID) => {
  return {
    type: "SWAP_NOTE",
    draggedID,
    droppedID,
  };
};

export const setNotes = (notes) => {
  return {
    type: "SET_NOTES",
    notes,
  };
};
////////////////////////////////////////////////////////////////////////////////
export const startAddNote = (notes) => {
  return async (dispatch) => {
    let note = {
      description: notes.description,
      title: notes.title,
      order: notes.order,
      color: "white",
      isPinned: false,
      isArchived: false,
      isDeleted: false,
      deletedAt: null,
      owner: "610af6a552e627225027e023",
    };
    try {
      let noteCreated = await axios.post("http://localhost:5000/notes", note);
      noteCreated = noteCreated.data;
      dispatch(addNote({ id: noteCreated._id, ...noteCreated }));
    } catch (e) {
      console.log(e);
    }
  };
};

export const fetchNotes = () => {
  return async (dispatch) => {
    try {
      let notes = await axios.get("http://localhost:5000/notes");
      notes = notes.data;
      dispatch(setNotes(notes));
    } catch (e) {
      console.log(e);
    }
  };
};

export const StartEditNote = (id, updates) => {
  return async (dispatch) => {
    try {
      let note = await axios.put("http://localhost:5000/notes", {
        id,
        updates,
      });
      dispatch(editNote(id, updates));
    } catch (e) {
      console.log(e);
    }
  };
};

export const startDeletePermanently = (id) => {
  return async (dispatch) => {
    try {
      console.log(id);
      let note = await axios.delete("http://localhost:5000/notes/" + id);
      dispatch(removeNote(id));
    } catch (e) {
      console.log(e);
    }
  };
};

export const startSwapNote = (draggedID, droppedID) => {
  return async (dispatch) => {
    try {
      let note = await axios.put("http://localhost:5000/notes/reorder", {
        draggedID,
        droppedID,
      });

      dispatch(swapNote(note.data.draggednote._id, note.data.droppednote._id));
    } catch (e) {
      console.log(e);
    }
  };
};
