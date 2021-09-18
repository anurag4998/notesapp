import React from 'react'
import Search from '../components/search'
import {logout} from '../redux'
import {  useDispatch } from 'react-redux'

import { CgNotes } from "react-icons/cg";

const Header = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch (logout());
    }   
    return (
        <div className = 'header'>
            <div className = 'header__logo'>
                <span className = "header__logo--icon"> <CgNotes/></span>
                <span className = "header__logo--text"> Keep</span>
            </div>
            <div className ='header__search'>
                <Search/>
            </div>
            <div className = "header__account">
                <button onClick = {handleLogout}>Signout</button>
            </div>
        </div>
    )
}


export default Header