import React from "react";
import Login from "../components/Login.jsx";
import GoogleSignIn from "../components/GoogleSignIn.jsx";

const MainContainer = () => {
  return (
    <>
      <h2 className="text-center my-5">
        Pink Fairy Armidallo Password Manager
      </h2>
      <hr></hr>
      <Login />
      <GoogleSignIn />
    </>
  );
};
export default MainContainer;
