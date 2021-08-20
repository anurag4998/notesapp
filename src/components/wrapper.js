import React, { useEffect } from 'react';
import Dashboard from '../components/dashboard'
import Archived from '../components/archived'
import Sidebar from '../components/sidebar'
import Deleted from '../components/deleted'
import Signup from '../components/signup'
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
                  {isLogged ? <Redirect to="/dashboard" /> : <Signup />}
              </Route>
              <div className = 'wrapper' >
                  {isLogged ? <div className = 'sidebar__wrapper'>
                    <Sidebar/>
                  </div> : undefined}
                  <Route exact path = "/dashboard" component = {Dashboard} ></Route>
                  <Route exact path = "/archive" component = {Archived} />
                  <Route exact path = "/deleted" component = {Deleted} />
              </div>
      </Switch>
    </BrowserRouter>
  );
}

export default Wrapper;
