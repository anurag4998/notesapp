import React, { useEffect, useState } from 'react';
import { BiShow , BiHide} from "react-icons/bi";
import {FcAddressBook,FcPrivacy, FcBusinessContact, FcPodiumWithSpeaker} from "react-icons/fc"
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux'
import {startSignup} from '../redux'

// import swal from 'sweetalert';

const Signup = ()  => {
    const dispatch = useDispatch();

    const handleShowPassword = (e) => {
        let a = document.getElementById("password");
        setShowPwd(!showPwd)
        a.type === "password" ? a.type = "text" : a.type = "password";
    }
    const [disabled, setDisabled] = useState(false);
    let [flag, setFlag] = useState({});
    let[showPwd,setShowPwd] = useState(true)
    let [showError, setShowError] = useState(false)

    const history = useHistory();
    const handleRedirect = () => {
        let path = ``; 
        history.push(path);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setDisabled(true)
        let name = e.target.Name.value.trim();
        let username = e.target.username.value.trim();
        let email = e.target.email.value.trim();
        let password = e.target.password.value.trim();
        dispatch(startSignup({name,username,email,password}));
        setShowError(true)
        setDisabled(false)
        setTimeout( () => setShowError(false) , 3000 )

    }
    useEffect(() => {
        // if(flag.response === true){
        //     swal("Account Created!", "Verify email to continue", "success");
        //     document.getElementById("Name").value = "";
        //     document.getElementById("username").value = "";
        //     document.getElementById("email").value = "";
        //     document.getElementById("password").value = "";
        //     let path = ``; 
        //     history.push(path);
        // }
           
    })
    return(
        <div className = 'signup__wrapper'>
             <div className = 'signup__container'>    
                <h1 className='signup__form-heading'>Signup</h1>
                <form onSubmit={handleSubmit} className='signup__form'> 
                    <h5>{flag.response === false && showError === true ? flag.error : undefined }</h5>

                    <div className = "signup__input-container">
                        <span className="signup__input-container-icon">  <FcBusinessContact /> </span>                   
                        <input type='text' id = "Name" className='signupform__input' placeholder='Name' name="Name" autoComplete="off" required></input>
                    </div>

                    <div className = "signup__input-container">
                        <span className="signup__input-container-icon">  <FcPodiumWithSpeaker /> </span>                   
                        <input type='text' id = "username" className='signupform__input' placeholder='Username' name="username" autoComplete="off" required minLength="6"></input>
                    </div>

                    <div className = "signup__input-container">
                        <span className="signup__input-container-icon">  <FcAddressBook /> </span>                   
                        <input type='email' id = 'email' className='signupform__input' placeholder='Email' name="email" autoComplete="off" required></input>
                    </div>

                    <div className = "signup__input-container">
                        <span className="signup__input-container-icon"> <FcPrivacy /></span>                   
                        <div className='pwdcontainer'>
                            <input type='password' id='password' className='signupform__input' placeholder='Password' name="password" minLength="8" autoComplete="off" required></input>
                            {showPwd ? <BiShow onClick={handleShowPassword} className='signupform__togglepwd' /> :  <BiHide onClick={handleShowPassword} className='loginform__togglepwd' /> }
                         </div>
                    </div>  
                    <button className='signup__form__submitbtn btn-press' id='Submit' disabled={disabled}>Submit</button>
                    <button className="Loginsignupbtn" ><span> Joined us before? </span> <span className="Loginsignupbtn--textdeco" onClick={handleRedirect}>Login</span></button>

                </form>
            </div>
        </div>
    )
}

export default Signup   