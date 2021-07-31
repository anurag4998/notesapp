import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editNote } from "../redux";
import { IoColorPaletteOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { BiArchiveIn } from "react-icons/bi";

import Pallete from "./pallete";

const EditModal = (props) => {
  const dispatch = useDispatch();
  const [showScroll, setShowScroll] = useState(false);
  const [showPallete, togglePallete] = useState(false);

  const closeModal = () => {
    let title = document.getElementById("edittitle" + props.id);
    let description = document.getElementById("editdescription" + props.id);
    dispatch(
      editNote(props.id, { title: title.value, description: description.value })
    );
    props.handleClose();
  };
  const handleShowPallete = (event) => {
    togglePallete(true);
  };

  const handleHidePallete = (event) => {
    togglePallete(false);
  };

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
      <section className={`modal__wrapper ${props.color}`}>
        <textarea
          id={"edittitle" + props.id}
          onKeyDown={handleKeyPress}
          placeholder="Title"
          className={`${showScroll} ? modal__edit-title modal--editable modal--isScrollable ${props.color}: modal__edit-title modal--editable ${props.color}`}
          defaultValue={props.title}
        ></textarea>
        <textarea
          id={"editdescription" + props.id}
          onKeyDown={handleKeyPress}
          placeholder="Add your note here"
          className={`${showScroll} ? modal__edit-description modal--editable modal--isScrollable ${props.color}: modal__edit-description modal--editable ${props.color}`}
          defaultValue={props.description}
        ></textarea>
        <div className="footer showOptions">
          <button className="footer--btn">
            <IoColorPaletteOutline
              onMouseEnter={handleShowPallete}
              onMouseLeave={handleHidePallete}
            />
          </button>
          <button className="footer--btn">
            <MdDelete />
          </button>
          <button className="footer--btn">
            <BiArchiveIn />
          </button>
        </div>
        <div className="palette-container">
          <Pallete show={showPallete} />
        </div>
        <button className="modal-btn" onClick={closeModal}>
          Close
        </button>
      </section>
    </div>
  );
};

export default EditModal;
