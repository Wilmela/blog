import { createContext, useState, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

const INITIAL = {
  user: JSON.parse(window.localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

export const AppContext = createContext(INITIAL);

export const ContextProvider = ({ children }) => {
  const [toggle, setToggle] = useState(false);
  const [state, dispatch] = useReducer(Reducer, INITIAL);
  
  useEffect(() => {
    window.localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AppContext.Provider
      value={{
        toggle,
        setToggle,
        dispatch,
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
