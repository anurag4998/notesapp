const initialState = {
    user: null,
    isLoading: false,
    error: null,
    loggedIn: false
  };

const userReducer = (state = initialState,action) => {
      switch(action.type)
      {
        case "FETCH_USER_DATA":
            return {...state, isLoading: true};
        case "LOGGED_IN":
          return { ...state, loggedIn: true, isLoading: false };
        
        case "LOGGED_OUT":
          return { ...state, loggedIn: false };

      default:
          return state;
      }
}
export default userReducer;