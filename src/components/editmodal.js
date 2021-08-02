import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { IoColorPaletteOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { BiArchiveIn,BiArchiveOut } from "react-icons/bi";
import { editNote, removeNote } from "../redux";
import Pallete from "./pallete";

const EditModal = (props) => {
  const dispatch = useDispatch();
  const [showScroll, setShowScroll] = useState(false);
  const [showPallete, togglePallete] = useState(false);

  const closeModal = () => {
    let title = document.getElementById("edittitle" + props.noteprops.id);
    let description = document.getElementById(
      "editdescription" + props.noteprops.id
    );
    dispatch(
      editNote(props.noteprops.id, {
        title: title.value,
        description: description.value,
      })
    );
    props.handleClose();
  };

  const handleShowPallete = (event) => {
    togglePallete(true);
  };

  const handleHidePallete = (event) => {
    togglePallete(false);
  };

  const handleDelete = () => {
    dispatch(removeNote(props.id));
  };

  const changebackgroundColor = (backColor) => {
    dispatch(editNote(props.noteprops.id, { color: backColor }));
  };
  const handleClicktoArchive = () => {
    dispatch(editNote(props.noteprops.id, {isArchived : true}));
  }
  const handleClicktoUnArchive = () => {
    dispatch(editNote(props.noteprops.id, {isArchived : false}));
  }
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      let triggerer = event.target.id;
      let element = document.getElementById(triggerer);
      let style = window.getComputedStyle(element);
      let length =
        parseInt(style.height.substring(0, style.height.length - 2)) + 20;
      element.style.height = length + "px";
      if (length > 80) setShowScroll(true);
      else setShowScroll(false);
    }
  };
  return (
    <div
      className={
        props.show ? "modal modal--display-block" : "modal modal--display-none"
      }
    >
      <section className={`modal__wrapper ${props.noteprops.color}`}>
        <textarea
          id={"edittitle" + props.noteprops.id}
          onKeyDown={handleKeyPress}
          placeholder="Title"
          className={`${
            showScroll
              ? `modal__edit-title modal--editable modal--isScrollable ${props.noteprops.color}`
              : `modal__edit-title modal--editable ${props.noteprops.color}`
          }`}
          defaultValue={props.noteprops.title}
        ></textarea>
        <textarea
          id={"editdescription" + props.noteprops.id}
          onKeyDown={handleKeyPress}
          placeholder="Add your note here"
          className={`${
            showScroll
              ? `modal__edit-description modal--editable modal--isScrollable ${props.noteprops.color}`
              : `modal__edit-description modal--editable ${props.noteprops.color}`
          }`}
          defaultValue={props.noteprops.description}
        ></textarea>
        <div className="modal__footer">
          <button className="modal__footer-btn">
            <IoColorPaletteOutline
              onMouseEnter={handleShowPallete}
              onMouseLeave={handleHidePallete}
            />
          </button>
          <button className="modal__footer-btn" onClick={handleDelete}>
            <MdDelete />
          </button>
          {!props.noteprops.isArchived ? 
            <button className = "footer__btn" onClick = {handleClicktoArchive}><BiArchiveIn/></button> : 
            <button className = "footer__btn" onClick = {handleClicktoUnArchive}><BiArchiveOut/></button> 
        }
        </div>
        <div className="modal__palette palette__container">
          <Pallete show={showPallete} changeColor={changebackgroundColor} />
        </div>
        <button className="modal-btn" onClick={closeModal}>
          Close
        </button>
      </section>
    </div>
  );
};

export default EditModal;
