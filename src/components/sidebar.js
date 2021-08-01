import React, { useState } from 'react'
import {  useHistory } from "react-router-dom";
import { BiArchiveIn } from "react-icons/bi";
import { AiOutlineBulb } from "react-icons/ai";

const Sidebar = () => {
    const[selected , setSelected] = useState('rDash');
    const handleRedirectToArchive = (event) => {
        setSelected(event.target.id);
        let path = `archive`
        history.push(path)
    }
    const handleRedirectToDashboard = (event) => {
        
        setSelected(event.target.id);
        let a = document.getElementsByClassName('sidebar__option');
        let path = `/`
        history.push(path)
    }
    const history = useHistory();

    return (
        <div className = 'sidebar sidebar__container'>
            <div className = 'sidebar__options'>
                <div className = 'sidebar__option sidebar__option--selected' id = 'rDash'  role = 'button' onClick = {handleRedirectToDashboard}>
                    <AiOutlineBulb />
                    <span> Notes</span>
                </div>
                <div className = 'sidebar__option' role = 'button' id = 'rArch'  onClick = {handleRedirectToArchive}>
                    <BiArchiveIn />
                    <span> Archive</span>
                </div>
            </div>
        </div>
    )

}

export default Sidebar;