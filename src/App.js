import './App.css';
import Wrapper from './components/wrapper'
// import Dashboard from './components/dashboard'
// import Archived from './components/archived'
// import Sidebar from './components/sidebar'
// import Deleted from './components/deleted'
// import Signup from './components/signup'
// import { useSelector, useDispatch } from 'react-redux'
// import {checkLoggedStatus} from './redux'
import { BrowserRouter,  Switch } from "react-router-dom";
import {Provider} from 'react-redux'
import store from './redux/store'
const App = () => { 
  return (
    <BrowserRouter>
      <Switch>
          <Provider store = {store}>
            <Wrapper/>
          </Provider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
