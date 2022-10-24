import React, { useContext, useState } from "react";
import { BiLogInCircle } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider/AuthProvider";
import "../../styles/login.css";

const Login = () => {
  const { emailLogin, googleLogin } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const [err, setErr] = useState({
    password: "",
    email: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const handelEmailInput = (e) => {
    const email = e.target.value;
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setErr({ ...err, email: "Please provide a valid email address" });
      setUserInfo({ ...userInfo, email: "" });
    } else {
      setErr({ ...err, email: "" });
      setUserInfo({ ...userInfo, email: e.target.value });
    }
  };

  const handelPasswordInput = (e) => {
    const InputPassword = e.target.value;
    const noSymbolError = !/[\!\@\#\$\%\^\&\*]{1,}/.test(InputPassword);
    const noCapitalLetterError = !/[A-Z]{1,}/.test(InputPassword);
    const lengthError = InputPassword.length < 6;

    if (lengthError) {
      setErr({ ...err, password: "Password Must be at least 6 characters" });
      setUserInfo({ ...userInfo, password: "" });
    } else if (noSymbolError) {
      setErr({ ...err, password: "Password Must have a symbol" });
      setUserInfo({ ...userInfo, password: "" });
    } else if (noCapitalLetterError) {
      setErr({ ...err, password: "Password Must have a Capital Letter" });
      setUserInfo({ ...userInfo, password: "" });
    } else {
      setErr("");
      setUserInfo({ ...userInfo, password: e.target.value });
    }
  };

  const handelGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleLogin = (e) => {
    const form = e.target;
    e.preventDefault();
    navigate(location.state?.from?.pathname);
    emailLogin()
      .then((res) => {
        const user = res.user;
        console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login-container">
      <div className="login-title">
        Login
        <BiLogInCircle />
      </div>
      <form className="login-form" onSubmit={handleLogin}>
        <input type="text" placeholder="Your Email" onChange={handelEmailInput} />
        <input onChange={handelPasswordInput} type="password" placeholder="password" />
        {err.email && <p className="error-message">{err.email} </p>}
        {err.password && <p className="error-message">{err.password} </p>}

        <button>Login</button>

        <p>
          Don't have an account? <Link to="/signup">Sign up first</Link>
        </p>
      </form>

      <button onClick={handelGoogleLogin}>Google</button>
    </div>
  );
};

export default Login;
