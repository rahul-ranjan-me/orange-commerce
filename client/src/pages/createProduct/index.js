import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageHeading from "../../components/pageHeading";
import { xhrPost } from "../../utils/xhr";

import "./createProduct.scss";

const Signup = () => {
  const name = useRef();
  const image = useRef();
  const productId = useRef();
  const tags = useRef();
  const price = useRef();
  const description = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const userName = window.sessionStorage.getItem("userId");
  const accessToken = window.sessionStorage.getItem("accessToken");

  const createProduct = async (ev) => {
    ev.preventDefault();
    const data = {
      name: name.current.value,
      image: image.current.value,
      productId: productId.current.value,
      tagged: tags.current.value,
      price: price.current.value,
      description: description.current.value
    };

    for (let item in data) {
      if (data[item].length < 1) {
        navigate("/create-product?error=true");
        break;
      }
    }

    const { data: dataPostProduct } = await xhrPost("/api/products", {
      details: data
    }, {
      headers: {
        "x-access-token": accessToken,
      },
    });
    if (dataPostProduct) {
      navigate("/");
    } else {
      navigate("/signup?error=true");
    }
  };

  return (
    <div className="container login-container">
      <PageHeading heading={"Create Product"} />
      <p>
        Create your product catalogue here.
      </p>
      <h4>Product Details</h4>
      {location.search === "?error=true" && (
        <div className="error">There are some error occured</div>
      )}
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input type="text" className="form-control" id="name" ref={name} />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <input type="text" className="form-control" id="image" ref={image} />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input type="text" className="form-control" id="price" ref={price} />
        </div>
        <div className="mb-3">
          <label htmlFor="productId" className="form-label">
            Product Id
          </label>
          <input type="text" className="form-control" id="productId" ref={productId} />
        </div>
        <div className="mb-3">
          <label htmlFor="tags" className="form-label">
            Tags
          </label>
          <input type="text" className="form-control" id="tags" ref={tags} />
        </div>
        <div className="mb-3">
          <label htmlFor="tags" className="form-label">
            Description
          </label>
          <textarea type="text" className="form-control" id="tags" ref={description} />
        </div>
        <button
          type="submit"
          className="btn btn-primary override-theme"
          onClick={createProduct}
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default Signup;
