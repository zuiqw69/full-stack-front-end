import React from "react";
import Dashboard from "./Dashboard";
import { ApiClient } from "./apiClient";
import { useState} from 'react'
import Login from "./Login";

function App() {
  const [token,changeToken] = useState(window.localStorage.getItem["token"])
  const logout = () => {
    window.localStorage.removeItem("token")
    changeToken("")
  }

  const loggedIn = (newToken) => {
    window.localStorage.setItem("token",newToken)
    changeToken(newToken);
  }

  const client = new ApiClient(
    token,
    logout
  );

  return (
    <>
      {token ? (
        <Dashboard client={client} />
      ) : (
        <Login client={client} loggedIn={loggedIn} />
      )}
      
    </>
  );
}

export default App;