export const addToArchives = (notes) =>
 
 ({
  type: 'ADDTO_ARCHIVES',
  note: notes
});

export const deleteFromArchives = (id) => {
    return{
      type: 'DELETEFROM_ARCHIVES',
      id
    }
  };

export const editArchivedNote = (id, updates) => {
    return{
    type: 'EDIT_ARCHIVEDNOTE',
    id,
    updates
  }};