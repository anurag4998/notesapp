import axios from "axios";
let prodUrl = "https://anurag-gkeep.herokuapp.com/"
let devUrl = "http://localhost:5000/"
const addNote = (notes) => ({
  type: "ADD_NOTE",
  note: notes,
});

const removeNote = (id) => {
  return {
    type: "DELETE_NOTE",
    id,
  };
};

const editNote = (id, updates) => {
  return {
    type: "EDIT_NOTE",
    id,
    updates,
  };
};

const swapNote = (draggedID, droppedID) => {
  return {
    type: "SWAP_NOTE",
    draggedID,
    droppedID,
  };
};

const setNotes = (notes) => {
  return {
    type: "SET_NOTES",
    notes,
  };
};

const filterNotes = (searchString) => {
    return {
        type: "FILTER_NOTES",
        searchString
    };
}
const readToken = async () => {
  let cookies = document.cookie.split("; ");
  const token = cookies.find((cookies) => cookies.startsWith("notesapp"));
  return token.split("=")[1];
};
////////////////////////////////////////////////////////////////////////////////
export const startAddNote = (notes) => {
  return async (dispatch) => {
    let token = await readToken();
    let note = {
      description: notes.description,
      title: notes.title,
      order: notes.order,
      color: "white",
      isPinned: false,
      isArchived: false,
      isDeleted: false,
      deletedAt: null,
    };
    try {
      let noteCreated = await axios.post( prodUrl + "notes", note, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      noteCreated = noteCreated.data;
      dispatch(addNote({ ...noteCreated }));
    } catch (e) {
      console.log(e);
    }
  };
};

export const fetchNotes = () => {
  return async (dispatch) => {
    let token = await readToken();
    try {
      let notes = await axios.get(prodUrl + "notes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      notes = notes.data;
      dispatch(setNotes(notes));
    } catch (e) {
      console.log(e);
    }
  };
};

export const StartEditNote = (id, updates) => {
  return async (dispatch) => {
    console.log(id);
    let token = await readToken();
    try {
      await axios.put(prodUrl + "notes", {
        id,
        updates,
      },{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(editNote(id, updates));
    } catch (e) {
      console.log(e);
    }
  };
};

export const startDeletePermanently = (id) => {
  return async (dispatch) => {
    let token = await readToken();
    try {
      console.log(id);
        await axios.delete(prodUrl + "notes/" + id,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(removeNote(id));
    } catch (e) {
      console.log(e);
    }
  };
};

export const startSwapNote = (draggedID, droppedID) => {
  return async (dispatch) => {
    let token = await readToken();
    try {
      console.log(draggedID, droppedID);
      let note = await axios.put(prodUrl + "notes/reorder", {
        draggedID,
        droppedID,
      },{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(swapNote(note.data.draggednote._id, note.data.droppednote._id));
    } catch (e) {
      console.log(e);
    }
  };
};

export const searchNotes = (searchString) => 
{
    return async (dispatch) => {
        dispatch(filterNotes(searchString));
    }
}

export const startCopyNote = (note) => {
  //console.log(note)
  return async (dispatch) => {
    let token = await readToken();
    note.createdAt = Date.now();
    note.order = 0;
    try {
      let noteCreated = await axios.post( devUrl + "notes/copy", note, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      noteCreated = noteCreated.data;
      dispatch(addNote({ ...noteCreated }));
    } catch (e) {
      console.log(e);
    }
  }
 

}