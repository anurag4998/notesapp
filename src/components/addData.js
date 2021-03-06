import React, {useEffect, useState , useRef} from 'react'
import {startAddNote} from '../redux'
import {connect} from 'react-redux'

const Adddata = (props) => {

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
                if(formElement.getElementsByClassName("addnote__body")[0].value ||  formElement.getElementsByClassName("addnote__title")[0].value)
                    props.startAddNote(formElement.getElementsByClassName("addnote__title")[0].value,formElement.getElementsByClassName("addnote__body")[0].value , 1)

                let element = document.getElementById("addnote__body");
                element.style.height = 40 + "px";
                handleShow(false)
            } 
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            console.log(show + "unmounted ")
            if(document.getElementById("addnote__body"))
            {
                let element = document.getElementById("addnote__body");
                element.value = "";
            }
            document.removeEventListener("mousedown", handleClickOutside);
        };
    })
    const handleSubmit = (e) =>{
        e.preventDefault();
        let title = e.target.addnote__title.value;
        let body = e.target.addnote__body.value;
        let order = 1;
        if(title || body)
            props.startAddNote(title,body,order);
        handleShow(false);
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
        <div>
                <form id = "form" className = "addnote" onClick = {openbox} onSubmit = {handleSubmit} ref = {menu} >
                        {show ? <input id = "addnote__title" className = "addnote__title"  name="addnote__title" placeholder= 'Title' autoComplete = 'off'></input> : undefined}
                        <textarea  onKeyDown={handleKeyPress} id = "addnote__body" name="addnote__body" className = 'addnote__body' placeholder = 'Take a note'  autoComplete = 'off' ></textarea>
                        {show ? <button className = 'addnote__submitbtn' type = 'submit' >Submit</button> : undefined}
                </form>
        </div>
    )

}

const mapStateToProps = state => {
    return{
        notes:state.notes.notes
    }
}
const mapDispatchToProps = dispatch => {
    return{
        startAddNote:(title,description,order) => dispatch(startAddNote({title,description,order}))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Adddata);