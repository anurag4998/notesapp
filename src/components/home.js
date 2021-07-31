import React, { Fragment, useEffect, useState , useRef} from 'react'
import {addNote,swapNote} from '../redux'
import {connect} from 'react-redux'
import Note from './note'

const Home = (props) => {
    const [dragId, setDragId] = useState();
    const[show , handleShow] = useState(false);
    const openbox = () => {
        handleShow(true);
    }
    let menu = useRef();
    useEffect(() => {
        console.log("in effect")
        function handleClickOutside(event)
        {
            console.log("in event handler ")
            if(!menu.current.contains(event.target) && show !== false)
            {
                console.log(show + "method ")
                let formElement  = document.getElementById("form");
                //console.log(formElement.getElementsByClassName("addnote__body")[0].value,formElement.getElementsByClassName("addnote__title")[0].value)
                if(formElement.getElementsByClassName("addnote__body")[0].value ||  formElement.getElementsByClassName("addnote__title")[0].value)
                    props.addNote(formElement.getElementsByClassName("addnote__title")[0].value,formElement.getElementsByClassName("addnote__body")[0].value , props.notes.length)

                //hidedata([...da])
                let element = document.getElementById("addnote__body");
                element.style.height = 30 + "px";
                handleShow(false)
            } 
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            console.log(show + "unmounted ")
            let element = document.getElementById("addnote__body");
            element.value = "";
            document.removeEventListener("mousedown", handleClickOutside);
        };
    })

    const handleSubmit = (e) =>{
        e.preventDefault();
        let title = e.target.addnote__title.value;
        let body = e.target.addnote__body.value;
        let order = props.notes.length
        props.addNote(title,body,order);
        // da.unshift({heading: title,description:body,order: da.length,id:da.length })
        // console.log(da);
        // hidedata([...da])
    }
    const handleDrag = (ev) => {
        //console.log(ev.currentTarget.id);
        setDragId(ev.currentTarget.id);
      };
    
    const handleDrop = (event) => {
        props.swapNote(dragId, event.currentTarget.id)
        //const draggedBox =  props.notes.find((box) => box.id == dragId);
        //const droponBox =  props.notes.find((box) => box.id == event.currentTarget.id)
        ///console.log(draggedBox,droponBox)
        // let temp = draggedBox.order;
        // draggedBox.order = droponBox.order;
        // droponBox.order = temp;
        //props.notes.sort((a,m) => a.order-m.order)
        //console.log(da)
        //hidedata([...da])
    }   
    const handleKeyPress = (event) =>{

        if (event.key === 'Enter') {
            let element  = document.getElementById("addnote__body")
            console.log(document.getElementById("addnote__body").innerText)
            let style = window.getComputedStyle(element)
            let length = parseInt ((style.height.substring(0, style.height.length-2 ))) + 20;
            element.style.height = length + "px";            
        }
    }
  
    return(
        <Fragment>
            <div>
                <form id = "form" className = "addnote" onClick = {openbox} onSubmit = {handleSubmit} ref = {menu} >
                        {show ? <input id = "addnote__title" className = "addnote__title"  name="addnote__title" placeholder= 'Title' autoComplete = 'off'></input> : undefined}
                        <textarea  onKeyDown={handleKeyPress} id = "addnote__body" name="addnote__body" className = 'addnote__body' placeholder = 'Take a note'  autoComplete = 'off' ></textarea>
                        {show ? <button className = 'addnote__submitbtn' type = 'submit' >Submit</button> : undefined}
                </form>
            </div>
            <div className = "notes-container" >
                {props.notes.length > 0 ? props.notes.sort((a,m) => a.order-m.order).map((note,index) => {
                    return(
                        <div key = {index} id = {note.id} draggable={true} onDragOver={(ev) => ev.preventDefault()} onDragStart={handleDrag} onDrop = {handleDrop}>
                            <Note noteprops = {note} />
                        </div>
                    )   
                }):undefined}
            </div>
        </Fragment>
    )
}
const mapStateToProps = state => {
    console.log(state)
    return{
        notes:state
    }
}
const mapDispatchToProps = dispatch => {
    return{
        addNote:(title,description,order) => dispatch(addNote({title,description,order})),
        swapNote:(draggedId, droppedId) => dispatch(swapNote(draggedId,droppedId ))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Home);

