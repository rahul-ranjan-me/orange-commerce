import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { xhrGet } from "../../utils/xhr";

import PageHeading from "../../components/pageHeading";
import { CommonContext } from "../../components/globalState";

import "./products.scss";

const Products = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const { setCart, cart } = useContext(CommonContext)
  const { pathname } = location;
  const accessToken = window.sessionStorage.getItem("accessToken");
  const type = pathname.substring(
    pathname.lastIndexOf("/") + 1,
    pathname.length
  );

  useEffect(async () => {
    const { data: products } = await xhrGet(`/api/products/search?q=${type}`, {
      headers: {
        "x-access-token": accessToken,
      },
    });
    setProducts(products);
  }, [type]);

  const addToCart = (product, key) => {
    const updatedProducts = [...products]
    updatedProducts[key].added = true
    setProducts(updatedProducts)
    const cartItem = [...cart, ...[product]]
    setCart(cartItem)
  }

  const removefromCart = (product, key) => {
    const updatedProducts = [...products]
    delete updatedProducts[key].added
    setProducts(updatedProducts)
    const updatedCart = []
    
    cart.map((item) => {
      if(item.productId !== product.productId) {
        updatedCart.push(item)
      }
    })
    setCart(updatedCart)
  }

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
            {!added && <button type="button" className="btn btn-primary" onClick={() => addToCart(product, key)}>Add to cart</button>}
            {added && <button type="button" className="btn btn-secondary" onClick={() => removefromCart(product, key)}>Remove from cart</button>}
          </div>
          <div className="col">
            <p>{description}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <PageHeading heading={type.toUpperCase()} />
      {products.map(displayProducts)}
      {products.length < 1 && <h4 className="no-results">No result found.</h4>}
    </div>
  );
};

export default Products;
