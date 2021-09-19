import React, { useEffect } from 'react'
import {  useHistory } from "react-router-dom";
import { BiArchiveIn,BiTrash } from "react-icons/bi";
import { AiOutlineBulb } from "react-icons/ai";
let classes = document.getElementsByClassName('sidebar__option');

const Sidebar = () => {
    useEffect(() => {
         let  a = (window.location.href.split('0/'));
         for(let i = 0 ; i < classes.length; i++)
        {
            if(classes[i].classList.contains('sidebar__option'))
            {
                classes[i].classList.remove('sidebar__option--selected');
            } 
        }
        let tab = document.getElementById(a[1].toString());
        tab.classList.add('sidebar__option--selected');

    },[])
    const handleRedirectToArchive = (event) => {

        for(let i = 0 ; i < classes.length; i++)
        {
            if(classes[i].classList.contains('sidebar__option'))
            {
                classes[i].classList.remove('sidebar__option--selected');
            } 
        }
        let tab = document.getElementById(event.target.id);
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

    const handleRedirectToDeleted = (event) => {
        for(let i = 0 ; i < classes.length; i++)
        {   
            if(classes[i].classList.contains('sidebar__option'))
            {
                classes[i].classList.remove('sidebar__option--selected');
            } 
        }
        let tab = document.getElementById(event.target.id);
        tab.classList.add('sidebar__option--selected');
        let path = `/deleted`
        history.push(path)
    }
    const history = useHistory();

    return (
        <div className = 'sidebar sidebar__container'>
            <div className = 'sidebar__options'>
                
                <div className = 'sidebar__option sidebar__option--selected' id = 'dashboard'  role = 'button' onClick = {handleRedirectToDashboard}>
                    <AiOutlineBulb style = {{pointerEvents: 'none'}}/>
                    <span style = {{pointerEvents: 'none'}}> Notes</span>
                </div>
                <div className = 'sidebar__option' role = 'button' id = 'archive' onClick = {handleRedirectToArchive}>
                    <BiArchiveIn style = {{pointerEvents: 'none'}}/>
                    <span style = {{pointerEvents: 'none'}}> Archive</span>
                </div>
                <div className = 'sidebar__option' role = 'button' id = 'deleted' onClick = {handleRedirectToDeleted}>
                    <BiTrash style = {{pointerEvents: 'none'}}/>
                    <span style = {{pointerEvents: 'none'}}> Trash</span>
                </div>
            </div>
        </div>
    )

}

export default Sidebar;