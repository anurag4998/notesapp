import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { IoColorPaletteOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { BiArchiveIn, BiArchiveOut } from "react-icons/bi";
import {StartEditNote,startDeletePermanently} from '../redux'
import Pallete from "./pallete";
import { FaTrashRestoreAlt } from "react-icons/fa";
import { IoTrashSharp } from "react-icons/io5";

const EditModal = (props) => {
  const dispatch = useDispatch();
  const [showScroll, setShowScroll] = useState(false);
  const [showPallete, togglePallete] = useState(false);

  const closeModal = () => {
    let title = document.getElementById("edittitle" + props.noteprops._id);
    let description = document.getElementById(
      "editdescription" + props.noteprops._id
    );
    dispatch(
      StartEditNote(props.noteprops._id, {
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
    dispatch(
      StartEditNote(props.noteprops._id, { isDeleted: true, deletedAt: Date.now() })
    );
    props.handleClose();

  };

  const changebackgroundColor = (backColor) => {
    dispatch(StartEditNote(props.noteprops._id, { color: backColor }));
  };
  
  const handleClicktoArchive = () => {
    dispatch(StartEditNote(props.noteprops._id, { isArchived: true }));
    props.handleClose();

  };
  const handleClicktoUnArchive = () => {
    dispatch(StartEditNote(props.noteprops._id, { isArchived: false }));
    props.handleClose();

  };
  const handleRestore = () => {
    dispatch(
      StartEditNote(props.noteprops._id, { isDeleted: false, deletedAt: null })
    );
    props.handleClose();

  };
  const handlePermanentDelete = () =>{
    dispatch(startDeletePermanently(props.noteprops._id));
    props.handleClose();

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
          id={"edittitle" + props.noteprops._id}
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
          id={"editdescription" + props.noteprops._id}
          onKeyDown={handleKeyPress}
          placeholder="Add your note here"
          className={`${
            showScroll
              ? `modal__edit-description modal--editable modal--isScrollable ${props.noteprops.color}`
              : `modal__edit-description modal--editable ${props.noteprops.color}`
          }`}
          defaultValue={props.noteprops.description}
        ></textarea>
        {!props.noteprops.isDeleted ? (
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
            {!props.noteprops.isArchived ? (
              <button
                className="modal__footer-btn"
                onClick={handleClicktoArchive}
              >
                <BiArchiveIn />
              </button>
            ) : (
              <button
                className="modal__footer-btn"
                onClick={handleClicktoUnArchive}
              >
                <BiArchiveOut />
              </button>
            )}
          </div>
        ) : (
          <div className="modal__footer">
            <button className="modal__footer-btn" onClick={handleRestore}>
              {" "}
              <FaTrashRestoreAlt />{" "}
            </button>
            <button className = "footer__btn" onClick = {handlePermanentDelete} > <IoTrashSharp/>  </button>
          </div>
        )}
        {!props.noteprops.isDeleted ? (
          <div className="modal__palette palette__container">
            <Pallete show={showPallete} changeColor={changebackgroundColor} />
          </div>
        ) : undefined}
        <button className="modal-btn" onClick={closeModal}>
          Close
        </button>
      </section>
    </div>
  );
};

export default EditModal;
