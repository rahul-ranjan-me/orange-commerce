import React, { useState, useEffect, useMemo } from "react";
import propTypes from "prop-types";

const CommonContext = React.createContext();
import { xhrGet } from "../../utils/xhr";

const GlobalState = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const userName = window.sessionStorage.getItem("userId");
  const accessToken = window.sessionStorage.getItem("accessToken");

  useEffect(async () => {
    if (userName && accessToken) {
      const { data } = await xhrGet(`/api/users/${userName}`, {
        headers: {
          "x-access-token": accessToken,
        },
      });
      setUser(data[0])
    }
  }, [userName])

  return (
    <CommonContext.Provider
      value={useMemo(() => {
        return {
          user,
          setUser,
          cart,
          setCart
        };
      })}
    >
      {children}
    </CommonContext.Provider>
  );
};

GlobalState.propTypes = {
  children: propTypes.node.isRequired,
};

export { GlobalState, CommonContext };
