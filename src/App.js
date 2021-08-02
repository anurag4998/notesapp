import './App.css';
import Dashboard from './components/dashboard'
import Archived from './components/archived'
import Sidebar from './components/sidebar'
import Deleted from './components/deleted'

import { BrowserRouter, Route, Switch } from "react-router-dom";

import {Provider} from 'react-redux'
import store from './redux/store'
function App() { 
  return (
    <BrowserRouter>
      <Switch>
         
          <Provider store = {store}>
          <div className = 'wrapper' >
              <div className = 'sidebar__wrapper'>
                <Sidebar/>
              </div>
              <Route exact path = "/" component = {Dashboard} />
              <Route exact path = "/archive" component = {Archived} />
              <Route exact path = "/deleted" component = {Deleted} />
          </div>
           
        </Provider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
