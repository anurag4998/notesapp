import axios from "axios";
import createCookie from "../../cookies/createCookie";
import readCookie from "../../cookies/readCookie";

export const isLoggedIn = () => {
  return {
    type: "LOGGED_IN",
  };
};

const fetchUserData = () => {
  return {
    type: "FETCH_USER_DATA",
  };
};

export const startSignup = (user) => {
  return async (dispatch) => {
    try {
      dispatch(fetchUserData());
      let created = await axios.post("http://localhost:5000/user/signup", {
        user,
      });
      const jwt = created.data.token;
      createCookie("notesapp", jwt, 10);
      dispatch(isLoggedIn());
    } catch (e) {
      console.log(e);
    }
  };
};

export const checkLoggedStatus = () => {
  return async (dispatch) => {
    try {
      let loggedIn = await readCookie();
      if (loggedIn.loggedIn === true) 
          dispatch(isLoggedIn());
    } catch (e) {}
  };
};
