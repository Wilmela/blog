
const Reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        isFetching: !state.isFetching,
      };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
      };
      
    case "LOGIN_FAILURE":
      return {
        ...state,
        error: !state.error,
      };
    case "UPDATE_START":
      return {
        ...state,
        isFetching: !state.isFetching
      };

    case "UPDATE_SUCCESS":
      return {
        ...state,
        isFetching: !state.isFetching,
        user: action.payload,
      };
      
    case "UPDATE_FAILURE":
      return {
        ...state,
        isFetching: !state.isFetching,
        error: !state.error,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
 
    default:
      return state;
  }
};

export default Reducer;
