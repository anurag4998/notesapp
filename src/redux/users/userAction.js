import axios from "axios";
import createCookie from "../../cookies/createCookie";
import readCookie from "../../cookies/readCookie";
import deleteCookie from "../../cookies/deleteCookie"
let prodUrl = "https://anurag-gkeep.herokuapp.com/"
let devUrl = "http://localhost:5000/"
export const isLoggedIn = () => {
  return {
    type: "LOGGED_IN",
  };
};

const loadData = () => {
  return {
    type: "LOAD_DATA",
  };
};

const actionFailed = (error) => {
  return {
    type: "ACTION_FAILED",
    error : {error : true, errorMsg : error}
  };
}

const loggedOut = () => {
  return {
    type:"LOGGED_OUT"
  };
}

const readToken = async () => {
  let cookies = document.cookie.split("; ");
  const token = cookies.find((cookies) => cookies.startsWith("notesapp"));
  return token.split("=")[1];
};


export const startSignup = (user) => {
  return async (dispatch) => {
    try {
      dispatch(loadData());
      let created = await axios.post(prodUrl + "user/signup", {
        user,
      });
      const jwt = created.data.token;
      createCookie("notesapp", jwt, 10);
      dispatch(isLoggedIn());
    } catch (e) {
      console.log( e.response.data.error);
      dispatch(actionFailed(e.response.data.error));
    }
  };
};

export const startLogin = ({email, password}) => {
  return async (dispatch) => {
    try {
      dispatch(loadData());
      let User = await axios.post(prodUrl + "user/login", {
        email,password
      });
      const jwt = User.data.token;
      createCookie("notesapp", jwt, 10);
      dispatch(isLoggedIn());
    } catch (e) {
      //console.log(e.response.data.error);
      dispatch(actionFailed(e.response.data.error));
    }
  };
};

export const checkLoggedStatus = () => {
  return async (dispatch) => {
    try {
      let loggedIn = await readCookie();
      if (loggedIn.loggedIn === true) dispatch(isLoggedIn());
    } catch (e) {}
  };
};

export const logout = () => {
  return async (dispatch) => {
      try {
        let token = await readToken();
        await axios.post( prodUrl + "user/logout",{token},{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        await deleteCookie();
        dispatch (loggedOut());
        window.location.href = '/';
      }
      catch(e){

      }
  }
}