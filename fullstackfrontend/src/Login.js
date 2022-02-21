import React, { useState } from "react";

function Login(props) {
  
  const [disabled, cDisabled] = useState(false);

  const submitHandler = (e) => {
    console.log("submit");

    e.preventDefault();
    cDisabled(true);
    props.client
      .login(e.target.username.value,e.target.password.value)
      .then( (response) => {
        cDisabled(false);
        props.loggedIn(response.data.token);
      })
      .catch( (err) => {
        alert("an error has occurred");
        console.log(err);
        cDisabled(false);
      })
  };

  return (
    <>
      Login
      <br />
      <form onSubmit={(e) => submitHandler(e)}>
        username
        <br />
        <input type="text" name="username" disabled={disabled} />
        <br />
        password
        <br />
        <input type="password" name="password" disabled={disabled} />
        <br />
        <br />
        <button type="submit" disabled={disabled}>
          {" "}
          Submit{" "}
        </button>
      </form>
    </>
  );
}

export default Login;