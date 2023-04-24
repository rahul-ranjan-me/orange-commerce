import React, { useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageHeading from "../../components/pageHeading";
import { xhrPost } from "../../utils/xhr";
import { CommonContext } from "../../components/globalState";

import "./login.scss";

const NewCustomer = () => {

  return (
    <>
      <h4>New customer</h4>
      <p>
        <strong>Register</strong>
      </p>
      <p>
        By creating an account you will be able to shop faster, be up to date on
        an order's status, and keep track of the orders you have previously
        made.
      </p>
      <Link type="button" className="btn btn-primary override-theme" to="/signup">
        Continue
      </Link>
    </>
  );
};

const LoginForm = () => {
  const userId = useRef()
  const password = useRef()
  const navigate = useNavigate();
  const { setUser } = useContext(CommonContext)

  const submitForm = async (ev) => {
    ev.preventDefault();
    const data = {
      userId: userId.current.value,
      password: password.current.value
    } 

    for (let item in data) {
      if (data[item].length < 1) {
        navigate("/login?error=true");
        break;
      }
    }

    const { data: dataPostRegistration } = await xhrPost("/api/users/login", data);
    
    if (dataPostRegistration.token) {
      setUser(dataPostRegistration)
      window.sessionStorage.setItem("accessToken", dataPostRegistration.token)
      window.sessionStorage.setItem("userId", dataPostRegistration.user.username)
      navigate("/");
    } else {
      navigate("/login?error=true");
    }

  }

  return (
    <>
      <h4>Returning Customer</h4>
      <p>
        <strong>I am a returning customer</strong>
      </p>
      {location.search === "?error=true" && (
        <div className="error">There are some error occured</div>
      )}
      <form>
        <div className="mb-3">
          <label htmlFor="userId" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="userId"
            ref={userId}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            ref={password}
          />
        </div>
        <button type="submit" className="btn btn-primary override-theme" onClick={submitForm}>
          Submit
        </button>
      </form>
    </>
  );
};

const Login = () => {
  return (
    <div className="container login-container">
      <PageHeading heading={"Login"} />
      <div className="row">
        <div className="col">
          <NewCustomer />
        </div>
        <div className="col">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
