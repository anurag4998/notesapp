import React, { Fragment, useEffect , useState} from 'react'
import readcookie from '../cookies/readCookie'
import { Redirect , Route} from "react-router-dom";

const ProtectedRoute = ({component: Component, ...rest }) => {
    let[isAuthenticated, setIsAuthenticated] = useState()
    useEffect(()=> {
        async function fetchcookie()
        {
            let isAuthenticated =  await readcookie()
            setIsAuthenticated(isAuthenticated)

        }
        fetchcookie()
    }, [])
     
    return(
        <Fragment>
            { isAuthenticated ? <Route
                {...rest}
                render={props =>
                    isAuthenticated.loggedIn === true ? (
                    <Component {...props} />
                  ) : (
                    <Redirect to={{ pathname: '/', state: { from: props.location } }} />
                  )
                }
              />  :  undefined}
         
        </Fragment>
      
    )}

export default ProtectedRoute