import React, { Fragment, useEffect, useState } from "react";
import { fetchNotes, startSwapNote } from "../redux";
import { connect } from "react-redux";
import Note from "./note";
import notereducer from "../redux/notes/noteReducer";

const Home = (props) => {
  const [dragId, setDragId] = useState();

  const handleDrag = (ev) => {
    setDragId(ev.currentTarget.id);
  };
  const handleDrop = (event) => {
    props.startSwapNote(dragId, event.currentTarget.id);
  };
  useEffect(() => {
    props.fetchNotes();
  }, []);
  return (
    <Fragment>

      <div className = "notes-container notes-isPinned">
      {
        props.notes.length > 0
          ?props.notes
            .sort((a, m) => a.order - m.order)
            .filter((x) => x.isArchived === false && x.isDeleted === false && x.isPinned === true)
            .map((note,index) => {
              return (
                <Fragment>
                  {index === 0 ? <h4 key = "pinned">PINNED</h4> : undefined}
                  <div key = {note._id} id = {note._id}>
                      <Note noteprops={note} />
                  </div>
                </Fragment>
              )
            })
          :undefined
      }
      </div>
      <div className="notes-container">
        {props.notes.length > 0
          ? props.notes
              .sort((a, m) => a.order - m.order)
              .filter((x) => x.isArchived === false && x.isDeleted === false && x.isPinned === false) 
              .map((note, index) => {
                return (
                  <div
                    key={index}
                    id={note._id}
                    draggable={true}
                    onDragOver={(ev) => ev.preventDefault()}
                    onDragStart={handleDrag}
                    onDrop={handleDrop}
                  >
                    <Note noteprops={note} />
                  </div>
                );
              })
          : undefined}
      </div>
    </Fragment>
  );
};
const mapStateToProps = (state) => {
  
  //console.log(state)
  if(state.notes.filteredText)
    return {
      notes: state.notes.notes.filter(x => x.description.toString().includes(state.notes.filteredText)),
    };
  else
    return {
      notes: state.notes.notes
    };
};
const mapDispatchToProps = (dispatch) => {
  return {
    startSwapNote: (draggedId, droppedId) =>
      dispatch(startSwapNote(draggedId, droppedId)),
    fetchNotes: () => dispatch(fetchNotes()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
