import "./App.css";
import Wrapper from "./components/wrapper";
// import Dashboard from './components/dashboard'
// import Archived from './components/archived'
// import Sidebar from './components/sidebar'
// import Deleted from './components/deleted'
// import Signup from './components/signup'
import { useState, useEffect } from 'react'
// import {checkLoggedStatus} from './redux'
import { BrowserRouter, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
const App = () => {
  let [isScreenSmall, setIsScreenSmall] = useState(false);
  useEffect(() => {
    var width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    width = parseInt(width);
    if (width < 1200) {
      setIsScreenSmall(true);
    }
  }, []);
  if(isScreenSmall)
  {
    return(
      <div className = 'displaycheck'>
          <h1>This website currently only supports devices with width greater than 1200px</h1>
      </div>
    )
  }
  
  return (
    
    <Provider store={store}>
        <Wrapper />
     </Provider>  
  
  );
};

export default App;
