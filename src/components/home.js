import React, { Fragment, useEffect, useState , useRef} from 'react'
import {addNote,swapNote} from '../redux'
import {connect} from 'react-redux'
//import { useSelector, useDispatch } from 'react-redux'
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

                //console.log(formElement.getElementsByClassName("notebody")[0].value,formElement.getElementsByClassName("taskTitle")[0].value)
                if(formElement.getElementsByClassName("notebody")[0].value ||  formElement.getElementsByClassName("taskTitle")[0].value)
                    props.addNote(formElement.getElementsByClassName("taskTitle")[0].value,formElement.getElementsByClassName("notebody")[0].value , props.notes.length)

                //hidedata([...da])
                let element = document.getElementById("notebody");

                element.style.height = 30 + "px";
                handleShow(false)
            } 
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            console.log(show + "unmounted ")
            let element = document.getElementById("notebody");
            element.value = "";
            document.removeEventListener("mousedown", handleClickOutside);
        };
    })
    const handleSubmit = (e) =>{
        e.preventDefault();
        let title = e.target.taskTitle.value;
        let body = e.target.notebody.value;
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
     

        //const draggedBox =  props.notes.find((box) => box.id == dragId);
        //const droponBox =  props.notes.find((box) => box.id == event.currentTarget.id)

        ///console.log(draggedBox,droponBox)
        // let temp = draggedBox.order;
        // draggedBox.order = droponBox.order;
        // droponBox.order = temp;
        props.swapNote(dragId, event.currentTarget.id)
        //props.notes.sort((a,m) => a.order-m.order)
        //console.log(da)
        //hidedata([...da])

    }   
    const handleKeyPress = (event) =>{
        if(event.key === 'Backspace' )
        {
            console.log(2)
        }
        if (event.key === 'Enter') {
            let element  = document.getElementById("notebody")
            console.log(document.getElementById("notebody").innerText)
            let style = window.getComputedStyle(element)
            let length = parseInt ((style.height.substring(0, style.height.length-2 ))) + 20;
            element.style.height = length + "px";            
        }
    }
  
    return(
        <Fragment>
        
            <div>
                    <form id = "form"  onClick = {openbox} onSubmit = {handleSubmit} ref = {menu} >
                        {show ? <input id = "taskTitle" className = "taskTitle"  name="taskTitle" placeholder= 'Title' autoComplete = 'off'></input> : undefined}
                        <textarea   onKeyDown={handleKeyPress} id = "notebody" name="notebody" className = 'notebody' placeholder = 'Take a note'  autoComplete = 'off' ></textarea>
                        {show ? <button className = 'addnote' type = 'submit' >Submit</button> : undefined}
                    </form>
                
            </div>

            <div className = "notes-container" >
                { props.notes.length > 0 ? props.notes.sort((a,m) => a.order-m.order).map((note,index) => {
                    return(
                        <div key = {index} id = {note.id} draggable={true} onDragOver={(ev) => ev.preventDefault()} onDragStart={handleDrag} onDrop = {handleDrop}>
                            <Note noteprops = {note} />
                        </div>
                    )   
                }): undefined}
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

//title = {x.heading} description = {x.description} color = {x.color}