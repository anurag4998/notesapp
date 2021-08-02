import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import Note from './note'

const Archived = () => {
    let archivedNotes = useSelector((state) => {
        let notes = state.filter(x => x.id !== null)
        return notes;
    })
    return(
        <Fragment>
          <div className = 'archive'>
                <div className = 'archive__wrapper'>
                    <div className = 'archive__container'>
                            {archivedNotes.length > 0 ? archivedNotes.filter(x => x.isArchived === true).map( (note,index) => {
                                    return(
                                        <div key = {index}>
                                            <Note noteprops = {note} />
                                        </div>
                                    )  
                            }):undefined}
                    </div>
                 </div>
            </div>
        </Fragment>
    )
}

export default Archived;