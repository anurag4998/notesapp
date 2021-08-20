import React, { Fragment,useEffect } from 'react'
import { useSelector } from 'react-redux'
import Note from './note'
import { BiArchiveIn } from "react-icons/bi";

const Archived = () => {

    useEffect(() => {
        
    })
    let archivedNotes = useSelector((state) => {
        let notes = state.notes.notes.filter(x => x.id !== null)
        return notes;
    })
    return(
        <Fragment>
          <div className = 'archive'>
                <div className = 'archive__wrapper'>
                    <div className = 'archive__container'>
                            {archivedNotes.length > 0 ? archivedNotes.filter(x => x.isArchived === true && x.isDeleted === false).map( (note,index) => {
                                    return(
                                        <div key = {index}>
                                            <Note noteprops = {note} />
                                        </div>
                                    )  
                            }):
                            <div className = 'archive__empty archive__container--center' >
                                <BiArchiveIn className = 'archive__empty-icon'/>
                                <h1  className = 'archive__empty-text'> Your Archived notes Appear Here</h1>
                            </div>
                        }
                    </div>
                 </div>
            </div>
        </Fragment>
    )
}

export default Archived;