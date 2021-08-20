import React, { Fragment,  useState } from 'react'
import Pallete from './pallete'
import { IoColorPaletteOutline } from "react-icons/io5";
import { MdDelete,MdEdit } from "react-icons/md";
import { BiArchiveIn ,BiArchiveOut} from "react-icons/bi";
import { RiPushpin2Line,RiPushpin2Fill } from "react-icons/ri";
import Modal from './editmodal'
import { useSelector, useDispatch } from 'react-redux'
import {StartEditNote,startDeletePermanently} from '../redux'
import { FaTrashRestoreAlt } from "react-icons/fa";
import { IoTrashSharp } from "react-icons/io5";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import swal from 'sweetalert';

const Note = (props) => {

    const[showPallete, togglePallete] = useState(false);
    const[showOptions, toggleShowOptions] = useState(false);
    const[modalState, toggleModalState] = useState(false);
    const[hideNote, sethideNote] = useState(false);

    let backGroundColor = useSelector((state) => {
            let note = state.notes.notes.find(x => x._id === props.noteprops._id);
            return note.color;
    })

    let isPinned = useSelector((state) => {
            let note = state.notes.notes.find(x => x._id === props.noteprops._id);
            return note.isPinned;
    })
    const dispatch = useDispatch();

    
    const changebackgroundColor = (backColor) => {
            dispatch(StartEditNote(props.noteprops._id, {color:backColor}));
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
           dispatch(StartEditNote(props.noteprops._id, {isPinned :!isPinned}));
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
        dispatch(StartEditNote(props.noteprops._id, {isDeleted:true, deletedAt: Date.now()}));
    }

    const handleClicktoArchive = () => {
        dispatch(StartEditNote(props.noteprops._id, {isArchived : true}));
    }
    const handleClicktoUnArchive = () => {
        dispatch(StartEditNote(props.noteprops._id, {isArchived : false}));
    }
    const handleRestore = () => {
        dispatch(StartEditNote(props.noteprops._id, {isDeleted:false, deletedAt: null}));
    }
    const handlePermanentDelete = () =>{
        swal("Delete the note permanently?", {
            buttons: {
                cancel: "no",
                success:"yes"
        }}).
        then(() => {
            dispatch(startDeletePermanently(props.noteprops._id));

        }).catch(() => {
        })
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
                    {!props.noteprops.isDeleted ? 
                        <div className = {showOptions ?   "footer note--showoptions" : "footer note--hideoptions"}>
                                <Tippy placement="bottom"  content={'Change Color'} theme={'blue'}>
                                        <button className = "footer__btn" ><IoColorPaletteOutline onMouseEnter = {handleShowPallete} onMouseLeave = {handleHidePallete}/></button>
                                </Tippy>
                                <Tippy placement="bottom" content={'Delete'} theme={'blue'} >
                                        <button className = "footer__btn" onClick = {handleDelete}><MdDelete/></button>
                                </Tippy>
                           
                            {!props.noteprops.isArchived ? 
                                <Tippy placement="bottom" content={'Archive'} theme={'blue'} >
                                    <button className = "footer__btn" onClick = {handleClicktoArchive}><BiArchiveIn/></button>
                                </Tippy> : 
                                <Tippy placement="bottom" content={'Unarchive'} theme={'blue'} >
                                    <button className = "footer__btn" onClick = {handleClicktoUnArchive}><BiArchiveOut/></button> 
                                </Tippy> 
                            }
                            <Tippy placement="bottom" content={'Edit'} theme={'blue'}>
                                <button onClick = {showModal} className = "footer__btn"><MdEdit/></button>
                            </Tippy> 
                        </div> 
                    : 
                        <div className = {showOptions ?   "footer note--showoptions" : "footer note--hideoptions"}>
                            <button className = "footer__btn" onClick = {handleRestore}> <FaTrashRestoreAlt/> </button>
                            <button className = "footer__btn" onClick = {handlePermanentDelete} > <IoTrashSharp/>  </button>
                        </div>
                    }
                {!props.noteprops.isDeleted ?
                    <div className = "palette__container" >
                        <Pallete show = {showPallete} changeColor = {changebackgroundColor}/> 
                    </div>
                : undefined
                }  
                </div>
            </div> : undefined}
            <Modal show={modalState} handleClose={hideModal} noteprops = {props.noteprops} />
            
        </Fragment>
        
        
    )
}

export default Note