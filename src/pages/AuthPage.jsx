import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, provider } from "../firebase/config";

const AuthPage = ({setIsAuth}) => {
  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        localStorage.setItem("token", res.user.refreshToken);
        setIsAuth(true);
      })
      .catch((err) => console.log("error occured when get user data", err));
  };

  return (
    <div className="container">
      <div className="auth">
        <h1>Chat Room</h1>
        <p>please login to continue</p>
        <button onClick={handleLogin}>
          <img src="./g-logo.png" alt="" />
          <span>Login with Google</span>
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
