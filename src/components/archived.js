import React, { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Note from './note'

const Archived = () => {

  
    let archivedNotes = useSelector((state) => {

        let notes = state.archived.filter(x => x.id !== null)
        console.log(notes)
        return notes;
    })

    return(
        <Fragment>
            {archivedNotes.length > 0 ? archivedNotes.map( (note,index) => {
                return(
                    <div key = {index}>
                        <Note isarchives = {true} noteprops = {note} />
                    </div>
                )
            }):undefined}
        </Fragment>
    )
}

export default Archived;