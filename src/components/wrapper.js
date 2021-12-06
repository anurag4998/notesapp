import React, { useEffect,Fragment , } from 'react';
import Dashboard from '../components/dashboard'
import Archived from '../components/archived'
import Sidebar from '../components/sidebar'
import Deleted from '../components/deleted'
import Signup from '../components/signup'
import Login from '../components/login'
import Header from '../components/header'
import ProtectedRoute from '../components/protectedroute';
import { useSelector, useDispatch } from 'react-redux'
import {checkLoggedStatus} from '../redux'
import { BrowserRouter, Route, Switch,Redirect } from "react-router-dom";

const Wrapper = () => { 
  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(checkLoggedStatus());
  }, [])
  
  let isLogged = useSelector((state) => {
    return state.user.loggedIn;
  })
  return (
     
      <BrowserRouter>
      <Switch>

              <Route exact path = "/">
                  {isLogged ? <Redirect to="/dashboard" /> : <Login /> }
              </Route>

              <Route exact path = "/signup" component = {Signup}/>
              <Fragment>
                <div className = 'wrapper' >
                  <Header />
                  <div className = "body">
                    {isLogged ? <div className = 'sidebar__wrapper'>
                      <Sidebar/>
                    </div> : undefined}
                    <ProtectedRoute exact path = "/dashboard" component = {Dashboard} ></ProtectedRoute>
                    <ProtectedRoute exact path = "/archive" component = {Archived} />
                    <ProtectedRoute exact path = "/deleted" component = {Deleted} />
                    </div>

                </div>
              </Fragment>

      </Switch>
    </BrowserRouter>
  );
}

export default Wrapper;
