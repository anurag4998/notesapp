import React, { Fragment,useState } from 'react'
import {addNote,swapNote} from '../redux'
import {connect} from 'react-redux'
import Note from './note'
import AddData from './addData'

import {  useHistory } from "react-router-dom";

const Home = (props) => {
    const [dragId, setDragId] = useState();
    const history = useHistory();

    const handleDrag = (ev) => {
        setDragId(ev.currentTarget.id);
      };
    const handleDrop = (event) => {
        props.swapNote(dragId, event.currentTarget.id)
    }   
    const archive = () => {
        let path = `archived`
        history.push(path)
    }
    return(
        <Fragment>
            <button onClick = {archive}>Archived</button>
            <AddData/>
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
        notes:state.notes
    }
}
const mapDispatchToProps = dispatch => {
    return{
        addNote:(title,description,order) => dispatch(addNote({title,description,order})),
        swapNote:(draggedId, droppedId) => dispatch(swapNote(draggedId,droppedId ))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Home);

