import React from 'react'
import Addbar from './addData'
import Home from './home'
const Dashboard = () => {

    return(
        <div className = 'dashboard'>
            <div className = 'dashboard-notes__wrapper'>
                <div className = 'addnotes__wrapper'>
                    <Addbar/>
                </div>
                <div className = 'displaynotes__wrapper'>
                    <Home/>
                </div>
            </div>
        </div>
    )

}
export default Dashboard