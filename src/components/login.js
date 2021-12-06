import React , {useEffect, useState} from 'react';
import { useDispatch,useSelector } from 'react-redux'
import { BiShow , BiHide} from "react-icons/bi";
import { useHistory,Redirect,Link } from "react-router-dom";
import swal from 'sweetalert';
import Dashboard from "./dashboard"
import {startLogin} from '../redux'


const Login = () => {

    const dispatch = useDispatch();
    let user = useSelector((state) => {
        let user = state.user;
        return user;
    })
    
    let [showError, setShowError] = useState(false)
    let [disabled, setDisabled] = useState(false)
    let[showPwd,setShowPwd] = useState(true)
    const handleShowPassword = (e) => {
        let a = document.getElementById("password");
        setShowPwd(!showPwd)
        a.type === "password" ? a.type = "text" : a.type = "password";
    }
   
    const handlePassword = async() => {
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true)
        let email = e.target.email.value.trim();
        let password = e.target.password.value.trim();
        dispatch(startLogin({email,password}));
        setShowError(true)
        setDisabled(false)
        setTimeout( () => setShowError(false) , 3000 )
    };
  
   
    useEffect( () => () =>  null, [] );
    return (

        <div className= "login__wrapper" >
            {user.loggedIn === true ? ( <Redirect to="/dashboard" component={Dashboard} exact /> ) : undefined}           
            <div className='login__container'>
                    <h1 className='login__form__heading'>Sign in</h1>
                    <p className = 'login__form__subheading'>
                            Don't Have an account yet ?
                            <br/>
                        <Link to = "/Signup" className="redirect" > Create Your Account</Link>
                    </p>
                    <form className='login__form' onSubmit={handleSubmit}>
                            {user.error !=null && showError === true ? <div className='loginform__errormsg'> {user.error.errorMsg}  </div>: undefined }
                            <input type='email'  className='loginform__input' placeholder='Email' name="email" autoComplete="off" required minLength = '6'></input>
                            <div className='pwdcontainer'>
                                <input type='password'  id='password' className='loginform__input' placeholder='Password' name="password" minLength="8" autoComplete="off" required></input>
                                {showPwd ? <BiShow onClick={handleShowPassword} className='loginform__togglepwd' /> :  <BiHide onClick={handleShowPassword} className='loginform__togglepwd' /> }
                            </div>
                            {user.isLoading ? 
                                  <button disabled={disabled} className='loginform__submitbtn  submitbtn btn-press'>Logging In...</button> 
                                : <button disabled={disabled} className='loginform__submitbtn submitbtn btn-press'>Sign in</button>
                            }
                    </form>

                    <h4 className='logincontainer__forgotpwd' onClick ={handlePassword}>Forgot your password?</h4>

            </div>
                
        </div>

    )
}   

export default Login

// {flag.status && disable === true  ? <button className = 'btn btn--blue' onClick = {handleEmail}> Verify Email</button>  : true}
