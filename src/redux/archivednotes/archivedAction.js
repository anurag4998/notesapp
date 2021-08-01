export const addToArchives = (notes) =>
 
 ({
  type: 'ADDTO_ARCHIVES',
  note: notes
});

export const deleteFromArchives = (id) => {
    console.log(id);
    return{
      type: 'ADDTO_ARCHIVES',
      id
    }
  };
