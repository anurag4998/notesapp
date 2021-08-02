import React, { useState } from 'react'
import {  useHistory } from "react-router-dom";
import { BiArchiveIn } from "react-icons/bi";
import { AiOutlineBulb } from "react-icons/ai";
let classes = document.getElementsByClassName('sidebar__option');

const Sidebar = () => {
    const handleRedirectToArchive = (event) => {

        for(let i = 0 ; i < classes.length; i++)
        {
            if(classes[i].classList.contains('sidebar__option'))
            {
                classes[i].classList.remove('sidebar__option--selected');
            } 
        }
        let tab = document.getElementById(event.target.id);
        console.log(tab)
        tab.classList.add('sidebar__option--selected');
        let path = `archive`
        history.push(path)
    }
    const handleRedirectToDashboard = (event) => {

        for(let i = 0 ; i < classes.length; i++)
        {   
            if(classes[i].classList.contains('sidebar__option'))
            {
                classes[i].classList.remove('sidebar__option--selected');
            } 
        }
        let tab = document.getElementById(event.target.id);
        tab.classList.add('sidebar__option--selected');
        let path = `/`
        history.push(path)
    }
    const history = useHistory();

    return (
        <div className = 'sidebar sidebar__container'>
            <div className = 'sidebar__options'>
                
                <div className = 'sidebar__option sidebar__option--selected' id = 'rDash'  role = 'button' onClick = {handleRedirectToDashboard}>
                    <AiOutlineBulb style = {{pointerEvents: 'none'}}/>
                    <span style = {{pointerEvents: 'none'}}> Notes</span>
                </div>
                <div className = 'sidebar__option' role = 'button' id = 'rArch' onClick = {handleRedirectToArchive}>
                    <BiArchiveIn style = {{pointerEvents: 'none'}}/>
                    <span style = {{pointerEvents: 'none'}}> Archive</span>
                </div>
            </div>
        </div>
    )

}

export default Sidebar;