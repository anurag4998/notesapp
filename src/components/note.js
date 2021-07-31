import React, { Fragment,  useState } from 'react'
import Pallete from './pallete'
import { IoColorPaletteOutline } from "react-icons/io5";
import { MdDelete,MdEdit } from "react-icons/md";
import { BiArchiveIn } from "react-icons/bi";
import { RiPushpin2Line,RiPushpin2Fill } from "react-icons/ri";
import Modal from './editmodal'
import { useSelector, useDispatch } from 'react-redux'
import {editNote,removeNote} from '../redux'

const Note = (props) => {

    const[showPallete, togglePallete] = useState(false);
    const[showOptions, toggleShowOptions] = useState(false);
    const[modalState, toggleModalState] = useState(false);
    const[hideNote, sethideNote] = useState(false);
    let backGroundColor = useSelector((state) => {
        let note = state.find(x => x.id === props.noteprops.id);
        return note.color;
    })

    let isPinned = useSelector((state) => {

        let note = state.find(x => x.id === props.noteprops.id);
        return note.isPinned;
    })
    const dispatch = useDispatch();

    
    const changebackgroundColor = (backColor) => {
        console.log(backColor)
        dispatch(editNote(props.noteprops.id, {color:backColor}));
    }
    const handleShowPallete = (event) => {
        togglePallete(true);
    }

    const handleHidePallete = (event) => {
        togglePallete(false);
    }

    const handleShowNoteOptions = (event) => {
        toggleShowOptions(true);
    }

    const handleHideNoteOptions = (event) => {
        toggleShowOptions(false);    
    }

    const togglePinState = () => {
        dispatch(editNote(props.noteprops.id, {isPinned :!isPinned}));
    }

    const showModal = () => {
        toggleModalState(true);
        sethideNote(true);
    }
    const hideModal = () => {
        toggleModalState(false);
        sethideNote(false);
    }
    const handleDelete = () => {
        dispatch(removeNote(props.noteprops.id));
    }
    return(
        <Fragment>
           {!hideNote ?  <div>
                <div className = {`note ${backGroundColor}`}  onMouseOver = {handleShowNoteOptions} onMouseLeave = {handleHideNoteOptions} >
                    <div className = "note__title">
                        {props.noteprops.title} 
                    </div>
                    <span style = {{cursor:"pointer"}} className =  {showOptions ?   "note__pin note--showoptions" : "note--hideoptions"} onClick = {togglePinState}>
                        {isPinned ? <RiPushpin2Fill/> : <RiPushpin2Line/>}
                    </span>
                    <div className = "note__text"  onClick = {showModal}>
                            {props.noteprops.description}
                    </div>
                
                    <div className = {showOptions ?   "footer note--showoptions" : "footer note--hideoptions"}>
                        <button className = "footer__btn" ><IoColorPaletteOutline onMouseEnter = {handleShowPallete} onMouseLeave = {handleHidePallete}/></button>
                        <button className = "footer__btn" onClick = {handleDelete}><MdDelete/></button>
                        <button className = "footer__btn"><BiArchiveIn/></button>
                        <button onClick = {showModal} className = "footer__btn"><MdEdit/></button>
                    </div>
                    <div className = "palette__container" >
                        <Pallete show = {showPallete} changeColor = {changebackgroundColor}/> 
                    </div>  
                </div>
            </div> : undefined}
            <Modal show={modalState} handleClose={hideModal} id = {props.noteprops.id} title = {props.noteprops.title} description = {props.noteprops.description} color = {backGroundColor} />
            
        </Fragment>
        
        
    )
}

export default Note