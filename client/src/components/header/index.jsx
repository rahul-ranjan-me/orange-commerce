import React, { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CommonContext } from "../globalState";

import "./headers.scss";

const Search = () => {
  const navigate = useNavigate();
  const searchValue = useRef();
  const searchTerm = () => {
    navigate(`/products/${searchValue.current.value}`);
  };
  return (
    <div className="search">
      <form onSubmit={searchTerm}>
        <input type="text" placeholder="Search" ref={searchValue} />
        <i className="bi bi-search search-icon" onClick={searchTerm}></i>
      </form>
    </div>
  );
};

const Logo = () => {
  return (
    <div className="logo-container">
      <Link to="/">
        <div className="horizontal-line"></div>
        <div className="text normal-height">XINO</div>
        <div className="text maximum-height">Orange</div>
        <div className="horizontal-line"></div>
      </Link>
    </div>
  );
};

const RightIcon = () => {
  const isLoggedIn = window.sessionStorage.getItem("userId");
  const toHref = isLoggedIn ? "/profile" : "/login";
  const { cart, setUser } = useContext(CommonContext);
  const navigate = useNavigate();

  const logout = () => {
    window.sessionStorage.removeItem("userId")
    window.sessionStorage.removeItem("accessToken")
    setUser(null)
    navigate("/")
  }

  return (
    <div className="right-component">
      <span>
        <Link to={toHref}>
          <i className="bi bi-person"></i>
        </Link>
      </span>
      <span className="cart-item">
        <Link to="/cart">
          <b>{cart.length}</b>
          <i className="bi bi-basket-fill"></i>
        </Link>
      </span>
      {isLoggedIn && (
        <span className="logout" onClick={logout}>
          <i class="bi bi-box-arrow-right"></i>
        </span>
      )}
    </div>
  );
};

const Header = () => {
  const { user } = useContext(CommonContext);
  return (
    <div>
      <div className="header-container container text-center">
        <div className="row">
          <div className="col">
            <Search />
          </div>
          <div className="col-6">
            <Logo />
          </div>
          <div className="col">
            <RightIcon />
          </div>
        </div>
      </div>
      <div className="top-navigation container text-center">
        <div className="row">
          <div className="col no-padding-left categories">
            <div className="dropdown">
              <a
                className="btn btn-secondary dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categories
              </a>

              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/products/men">
                    Men
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/products/women">
                    Women
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/products/accessories">
                    Accessories
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/products/bags">
                    Bags
                  </Link>
                </li>
                {user?.admin && (
                  <li>
                    <Link className="dropdown-item" to="/create-product">
                      Create Product
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div className="col-7 top-nav-link">
            <nav className="nav">
              <Link
                className="nav-link dropdown-toggle"
                aria-current="page"
                to="/products/men"
              >
                Men
              </Link>
              <Link className="nav-link dropdown-toggle" to="/products/women">
                Women
              </Link>
              <Link
                className="nav-link dropdown-toggle"
                to="/products/accessories"
              >
                Accessories
              </Link>
              <Link className="nav-link dropdown-toggle" to="/products/bags">
                Bags
              </Link>
              {user?.admin && (
                <li>
                  <Link className="nav-link" to="/create-product">
                    Create Product
                  </Link>
                </li>
              )}
            </nav>
          </div>
          <div className="col top-nav-link">
            <nav className="nav right-component">
              <a className="nav-link" aria-current="page" href="#">
                Blog
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
