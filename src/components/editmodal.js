import React, {  useState } from 'react'
import {useDispatch } from 'react-redux'
import {editNote} from '../redux'

const EditModal = (props) => {

    const dispatch = useDispatch();

    const closeModal = () => {
        let title = document.getElementById('edittitle' + props.id);
        let description = document.getElementById('editdescription'+props.id);

        dispatch(editNote(props.id, {title:title.value,description:description.value}));

        props.handleClose()
    }
    const[showScroll, setShowScroll] = useState(false);

    const handleKeyPress = (event) =>{
        
        if (event.key === 'Enter') {
            let triggerer = event.target.id;
            let element  = document.getElementById(triggerer);
            let style = window.getComputedStyle(element)
            let length = parseInt ((style.height.substring(0, style.height.length-2 ))) + 20;
            element.style.height = length + "px";  
            if(length> 80)   
                setShowScroll(true) ;
            else
                setShowScroll(false);     
        }
    }
    return(
        <div className={props.show ? 'modal display-block' : 'modal display-none'}>
            <section className={ `modal-main ${props.color}` }>
                <textarea id = {'edittitle'+props.id } onKeyDown={handleKeyPress} placeholder = 'Title' className = {`${showScroll} ? edit-title editable isScroll ${props.color}: edit-title editable ${props.color}`}
                defaultValue = {props.title}></textarea>
                <textarea id = {'editdescription' + props.id}  onKeyDown={handleKeyPress} placeholder = 'Add your note here'  className  = {`${showScroll} ? edit-description editable isScroll ${props.color}: edit-description editable ${props.color}`} defaultValue = {props.description}></textarea>
            <button className = 'modal-btn' onClick = {closeModal}>
                Close
                </button>
            </section>
      </div>
    )

}   


export default EditModal
