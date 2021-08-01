import './App.css';
import Home from './components/home'
import Archived from './components/archived'
import { BrowserRouter, Route, Switch } from "react-router-dom";

import {Provider} from 'react-redux'
import store from './redux/store'
function App() { 
  return (
    <BrowserRouter>
      <Switch>
          <Provider store = {store}>
            <Route exact path = "/" component = {Home} />
            <Route exact path = "/archived" component = {Archived} />
        </Provider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
