import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import Note from './note'

const Deleted = () => {
    let deletedNotes = useSelector((state) => {
        let notes = state.notes.notes.filter(x => x.id !== null)
        return notes;
    })
    return(
        <Fragment>
          <div className = 'archive'>
                <div className = 'archive__wrapper'>
                    <div className = 'archive__container'>
                            {deletedNotes.length > 0 ? deletedNotes.filter( x => x.isDeleted === true).map( (note,index) => {
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

export default Deleted;