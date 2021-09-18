import React, { Fragment} from 'react'
import { useSelector } from 'react-redux'
import Note from './note'
import { BiArchiveIn } from "react-icons/bi";

const Archived = () => {
   
    let archivedNotes = useSelector((state) => {
        let notes = [];
        if(state.notes.filteredText)
            notes = state.notes.notes.filter(x => x.description.toString().includes(state.notes.filteredText))
        else 
             notes = state.notes.notes.filter(x => x.id !== null && x.isArchived === true)
        return notes;
    })
    //console.log(archivedNotes)
    return(
        <Fragment>
          <div className = 'modnotes'>
                <div className = 'modnotes__wrapper'>
                    <div className = 'modnotes__container'>
                            {archivedNotes.length > 0 ? archivedNotes.filter(x => x.isArchived === true ).map( (note,index) => {
                                    return(
                                        <div key = {index}>
                                            <Note noteprops = {note} />
                                        </div>
                                    )  
                            }):
                            <div className = 'modnotes__empty modnotes__container--center' >
                                <BiArchiveIn className = 'modnotes__empty-icon'/>
                                <h1  className = 'modnotes__empty-text'> Your Archived notes Appear Here</h1>
                            </div>
                        }
                    </div>
                 </div>
            </div>
        </Fragment>
    )
}

export default Archived;