import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageHeading from "../../components/pageHeading";
import { xhrGet } from "../../utils/xhr";
import { CommonContext } from "../../components/globalState";

import "./profile.scss";

const Signup = () => {
  const userId = useRef();
  const emailAddress = useRef();
  const password = useRef();
  const name = useRef();
  const phoneNumber = useRef();
  const address = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState({});
  const userName = window.sessionStorage.getItem("userId");
  const accessToken = window.sessionStorage.getItem("accessToken");

  useEffect(async () => {
    if (userName) {
      const { data } = await xhrGet(`/api/users/${userName}`, {
        headers: {
          "x-access-token": accessToken,
        },
      });
      setUser(data[0])
    }
  }, [userName]);

  const register = async (ev) => {
    ev.preventDefault();
    const data = {
      userId: userId.current.value,
      admin: false,
      name: name.current.value,
      email: emailAddress.current.value,
      phoneNumber: phoneNumber.current.value,
      address: address.current.value,
    };

    for (let item in data) {
      if (data[item].length < 1) {
        navigate("/signup?error=true");
        break;
      }
    }

    const { data: dataPostRegistration } = await xhrPost(
      "/api/users/login",
      data
    );
    if (dataPostRegistration.token) {
      navigate("/login");
    } else {
      navigate("/signup?error=true");
    }
  };

  return (
    <div className="container login-container">
      <PageHeading heading={"Your profile"} />
      <p>
        If you already have an account with us, please login at the login page.
      </p>
      <h4>Your Personal Details</h4>
      {location.search === "?error=true" && (
        <div className="error">There are some error occured</div>
      )}
      <form>
        <div className="mb-3">
          <label htmlFor="userId" className="form-label">
            User Id
          </label>
          <input
            type="userId"
            className="form-control"
            id="userId"
            ref={userId}
            value={user.username}
            disabled
          />
        </div>
        <div className="mb-3">
          <label htmlFor="emailAddress" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="emailAddress"
            ref={emailAddress}
            value={user.email}
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
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input type="name" className="form-control" id="name" ref={name} value={user.name} />
        </div>
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">
            Phone number
          </label>
          <input
            type="phoneNumber"
            className="form-control"
            id="phoneNumber"
            ref={phoneNumber}
            value={user.phoneNumber}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <textarea className="form-control" id="address" ref={address} value={user.address} />
        </div>
        <button
          type="submit"
          className="btn btn-primary override-theme"
          onClick={register}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Signup;
