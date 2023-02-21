import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  userType: "",
  user: {},
  isLogin: false,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  console.log(action.type, "payload");
  switch (action.type) {
    // case "LOGIN_START":
    //   return {
    //     userType: action.payload.usertype,
    //     user: action.payload.user,
    //   };
    case "LOGIN_SUCCESS":
      return {
        userType: action.payload.usertype,
        user: action.payload.userInfo,
        isLogin: true,
      };
    // case "LOGIN_FAILURE":
    //   return {
    //     userType: null,
    //     user: null,
    //     loading: false,
    //     error: action.payload,
    //   };
    case "LOGOUT":
      return {
        userType: "",
        user: {},
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        userType: state.userType,
        user: state.user,
        isLogin: state.isLogin,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
