const initialState = {
  user: null,
  isLoading: false,
  error: null,
  loggedIn: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_DATA":
      return { ...state, isLoading: true };
    case "LOGGED_IN":
      return { ...state, loggedIn: true, isLoading: false, error: null };
    case "LOGGED_OUT":
      return { ...state, loggedIn: false, isLoading: false, error: null };
    case "ACTION_FAILED":
      return { ...state, error: action.error, isLoading: false };
    default:
      return state;
  }
};
export default userReducer;
