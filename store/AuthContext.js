import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);

  function authenticate(token) {
    setAuthToken(token);
    // console.log("token is here : ", token);
    AsyncStorage.setItem("token", token); //key and value(must be stringify)
  }
  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem("token");
  }
  return (
    <AuthContext.Provider
      value={{
        token: authToken,
        authenticate: authenticate,
        logout: logout,
        isAuthenticate: !!authToken, //to make it a boolean value (true or false)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuthContext() {
  const context = useContext(AuthContext);
  if (context == undefined) {
    throw new Error("Auth context was used outside AuthContext Provider");
  }
  return context;
}

export { AuthProvider, useAuthContext };
