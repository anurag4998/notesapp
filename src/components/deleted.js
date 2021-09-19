import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import Note from './note'
import { MdDelete } from "react-icons/md";

const Deleted = () => {
    let deletedNotes = useSelector((state) => {
        let notes = state.notes.notes.filter(x => x.id !== null && x.isDeleted === true)
        return notes;
    })
    return(
        <Fragment>
          <div className = 'modnotes'>
                <div className = { deletedNotes.length > 0 ? 'modnotes__wrapper modnotes__wrapper--top' : 'modnotes__wrapper' }>
                    <div className = "modnotes__container">
                            {deletedNotes.length > 0 ? deletedNotes.filter( x => x.isDeleted === true).map( (note,index) => {

                                    return(
                                            <div key = {index}>
                                                <Note noteprops = {note} />
                                             </div>
                                    )  
                            }):<div className = 'modnotes__empty modnotes__container--center' >
                                    <MdDelete className = 'modnotes__empty-icon'/>
                                    <h1  className = 'modnotes__empty-text'> Trashed Notes will be removed in 7 days</h1>
                                </div>
                            }
                    </div>
                 </div>
                </div>
        </Fragment>
    )
}

export default Deleted;