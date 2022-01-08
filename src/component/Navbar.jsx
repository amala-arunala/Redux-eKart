import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { GiShoppingBag } from "react-icons/gi";
import { useHistory } from "react-router-dom";

const Navbar = () => {
  const history = useHistory();
  const cartNumber = useSelector((state) => state.cartSlice.cartTotalQuantity);

  const logoutHandler = () => {
    localStorage.clear();
    history.push("/");
    window.location.reload(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 shadow-sm">
        <div className="container">
          <GiShoppingBag size={30} />
          <NavLink className="navbar-brand fw-bold fs-4 pl-4" to="/">
            e-Kart
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item"></li>
            </ul>

            {localStorage.getItem("email") ? (
              <NavLink to="/cart" className="btn btn-outline-dark">
                <i className="fa fa-shopping-cart me-1 mx-2"></i>Cart
                {cartNumber >= 1 ? cartNumber : ""}
              </NavLink>
            ) : null}

            <div className="buttons">
              {!localStorage.getItem("email") ? (
                <NavLink to="/login" className="btn btn-outline-dark">
                  Login
                </NavLink>
              ) : (
                <NavLink
                  to="/login"
                  className="btn btn-outline-dark"
                  onClick={logoutHandler}
                >
                  Logout
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
