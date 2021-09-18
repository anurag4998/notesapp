import React from 'react'
import {searchNotes} from '../redux'
import {  useDispatch } from 'react-redux'
import { AiOutlineSearch } from "react-icons/ai";

const Search = () => {
    const dispatch = useDispatch();

    const handleChange = (e) => {
        let searchString = e.target.value;
        dispatch(searchNotes(searchString));
            
     }
    return(

        <div className = "searchbar">
            <span className = "searchbar__icon"><AiOutlineSearch/></span>
            <input className = "searchbar__input" type = "text" autoComplete = "false" placeholder = "Search" onChange = {handleChange} ></input>
        </div>
    )
}

export default Search