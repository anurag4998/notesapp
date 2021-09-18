import React, { useEffect, useState } from 'react';
import { BiShow , BiHide} from "react-icons/bi";
import {FcAddressBook,FcPrivacy, FcBusinessContact, FcPodiumWithSpeaker} from "react-icons/fc"
import { Link } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux'
import {startSignup} from '../redux'
import { FaQuoteLeft } from "react-icons/fa";
import swal from 'sweetalert';
import {useHistory } from "react-router-dom";


const Signup = ()  => {
    const dispatch = useDispatch();
    let history = useHistory()

    let user = useSelector((state) => {
        let user = state.user;
        return user;
    })
    const handleShowPassword = (e) => {
        let a = document.getElementById("password");
        setShowPwd(!showPwd)
        a.type === "password" ? a.type = "text" : a.type = "password";
    }
    const [disabled, setDisabled] = useState(false);
    let[showPwd,setShowPwd] = useState(true)
    let [showError, setShowError] = useState(false)
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
        if(!user.error)
        {
            swal({
                title: "Success",
                text: "Your account has been created",
                icon: "success",
                showCancelButton: false,
                showConfirmButton: false
              });
              history.push("/dashboard");
        }
       
    }
    useEffect( () => () =>  null, [] );

    return(

        <section>
        <div className = 'signup__wrapper'>
             <div className = 'signup__container'>    
                <h1 className='signup__form__heading'>Signup</h1>
                <p className = 'signup__form__subheading'>
                        Already have an account?
                        <Link to = "/" className="redirect" > Sign In</Link>
                </p>
                <form onSubmit={handleSubmit} className='signup__form'> 
                    {user.error != null && showError === true ? <div className='signupform__errormsg'>  {user.error.errorMsg} </div>: undefined}
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

                </form>
            </div>
        </div>
        <div className = 'reviews'>
            <p>
                <FaQuoteLeft/>
                 Keep is a simple, yet satisfying note-taking app. It’s great for getting random notes down quickly, and organizes them pretty well, too.
            </p>
            
        </div>
        </section>

    )
}

export default Signup   

// <button className="Loginsignupbtn" ><span> Joined us before? </span> <span className="Loginsignupbtn--textdeco" onClick={handleRedirect}>Login</span></button>
