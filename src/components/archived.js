import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import Note from './note'
import Sidebar from './sidebar'

const Archived = () => {
    let archivedNotes = useSelector((state) => {
        let notes = state.archived.filter(x => x.id !== null)
        console.log(notes)
        return notes;
    })
    return(
        <Fragment>
          <div className = 'archive'>
                <div className = 'sidebar__wrapper'>
                    <Sidebar/>
                </div>
                <div className = 'archive__wrapper'>
                    <div className = 'archive__container'>
                            {archivedNotes.length > 0 ? archivedNotes.map( (note,index) => {
                                return(
                                    <div key = {index}>
                                        <Note isarchives = {true} noteprops = {note} />
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