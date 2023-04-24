import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Widgets from "../../components/widgets";
import PageHeading from "../../components/pageHeading";
import { CommonContext } from "../../components/globalState";

import "./products.scss";

const Products = () => {
  const { setCart, cart, user } = useContext(CommonContext);
  const removefromCart = (product, key) => {
    const updatedCart = [];

    cart.map((item) => {
      if (item.productId !== product.productId) {
        updatedCart.push(item);
      }
    });
    setCart(updatedCart);
  };

  const displayProducts = (product, key) => {
    const { image, name, price, productId, description, added } = product;
    return (
      <div className="container product" key={productId}>
        <div className="row">
          <div className="col">
            <img src={image} alt={name} />
          </div>
          <div className="col">
            <p>{name}</p>
            <p className="price">{price}</p>
            {added && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => removefromCart(product, key)}
              >
                Remove from cart
              </button>
            )}
          </div>
          <div className="col">
            <p>{description}</p>
          </div>
        </div>
      </div>
    );
  };

  const ProcessYourPayment = () => {
    const navigate = useNavigate();

    const processCart = () => {
      setCart([]);
      navigate("/payment-successful");
    };

    return (
      <div className="card-entry">
        <h4>Enter your details</h4>
        <div className="cart-name">
          <label className="form-label">Card name</label>
          <input type="text" className="form-control" />
        </div>
        <div className="card-number">
          <label className="form-label">Card number</label>
          <input type="text" className="form-control" /> -{" "}
          <input type="text" className="form-control" /> -{" "}
          <input type="text" className="form-control" />
        </div>
        <div className="expiry-date">
          <label className="form-label">Expiry date</label>
          <input type="text" className="form-control" />
        </div>
        <div className="place-order">
          <button className="btn btn-primary" onClick={processCart}>
            Place your order
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <PageHeading heading="Review your cart" />
      {cart.length < 1 && <div className="empty-cart">Your cart is empty</div>}
      {cart.map(displayProducts)}
      {cart.length > 0 && user && <ProcessYourPayment />}
      {cart.length > 0 && !user && (
        <div className="lgoin-btn">
          <Link to="/login" className="btn btn-primary">
            Login to process your payment
          </Link>
        </div>
      )}
      <Widgets />
    </div>
  );
};

export default Products;
