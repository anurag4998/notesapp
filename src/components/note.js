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
    let backGroundColor = useSelector((state) => {
        let note = state.find(x => x.id === props.noteprops.id);
        //console.log(note.color)
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

    const handleShowOptions = (event) => {
        toggleShowOptions(true);
    }

    const handleHideOptions = (event) => {
        toggleShowOptions(false);    
    }

    const togglePinState = () => {
        dispatch(editNote(props.noteprops.id, {isPinned :!isPinned}));
    }

    const showModal = () => {
        toggleModalState(true);
    }
    const hideModal = () => {
        toggleModalState(false);
    }
    const handleDelete = () => {
        dispatch(removeNote(props.noteprops.id));
    }
    return(
        <Fragment>
            <div>
                <div className = {`note ${backGroundColor}`}  onMouseOver = {handleShowOptions} onMouseLeave = {handleHideOptions} >
                    <div className = "notetitle">
                        {props.noteprops.title} 
                    </div>
                    <span style = {{cursor:"pointer"}} className =  {showOptions ?   "pin showOptions" : "hideOptions"} onClick = {togglePinState}>
                        {isPinned ? <RiPushpin2Fill/> : <RiPushpin2Line/>}
                    </span>
                    <div className = "notetext"  onClick = {showModal}>
                            {props.noteprops.description}
                    </div>
                
                    <div className = {showOptions ?   "footer showOptions" : "footer hideOptions"}>
                        <button className = "footer--btn" ><IoColorPaletteOutline onMouseEnter = {handleShowPallete} onMouseLeave = {handleHidePallete}/></button>
                        <button className = "footer--btn" onClick = {handleDelete}><MdDelete/></button>
                        <button className = "footer--btn"><BiArchiveIn/></button>
                        <button onClick = {showModal} className = "footer--btn"><MdEdit/></button>
                    </div>
                    <div className = "palette-container" >
                        <Pallete show = {showPallete} changeColor = {changebackgroundColor}/> 
                    </div>  
                </div>
        </div>
        <Modal show={modalState} handleClose={hideModal} id = {props.noteprops.id} title = {props.noteprops.title} description = {props.noteprops.description} color = {backGroundColor}>
            
        </Modal>
        </Fragment>
        
        
    )
}

export default Note