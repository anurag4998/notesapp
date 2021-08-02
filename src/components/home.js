import React, { Fragment,useState } from 'react'
import {addNote,swapNote} from '../redux'
import {connect} from 'react-redux'
import Note from './note'


const Home = (props) => {
    const [dragId, setDragId] = useState();

    const handleDrag = (ev) => {
        setDragId(ev.currentTarget.id);
      };
    const handleDrop = (event) => {
        props.swapNote(dragId, event.currentTarget.id)
    }   
  
    return(
        <Fragment>           
            <div className = "notes-container" >
                {props.notes.length > 0 ? props.notes.sort((a,m) => a.order-m.order).filter(x => x.isArchived === false).map((note,index) => {
                    
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

