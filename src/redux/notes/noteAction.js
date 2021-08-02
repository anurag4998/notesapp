import { v4 as uuidv4 } from 'uuid';


export const addNote = (notes) =>
 
 ({
  type: 'ADD_NOTE',
  note: {
    id: uuidv4(),
    description: notes.description,
    title:notes.title,
    order: notes.order,
    color: 'white',
    isPinned: false,
    isArchived: false
  }
});

export const removeNote = ( id) => {
  console.log(id);
  return{
    type: 'DELETE_NOTE',
    id
  }
};

export const editNote = (id, updates) => {
  console.log(updates)
  return{
  type: 'EDIT_NOTE',
  id,
  updates
}};

export const swapNote = (draggedID, droppedID) => {
  return{
    
      type: 'SWAP_NOTE',
      draggedID,
      droppedID
    
  }
} 