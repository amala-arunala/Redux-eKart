import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../redux/reducer/cartSlice";
import { NavLink, useParams } from "react-router-dom";
import Footer from "./Footer";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const response = await fetch(
        `https://makeup-api.herokuapp.com/api/v1/products/${id}.json`
      );
      setProduct(await response.json());
      setLoading(false);
    };
    getProduct();
  }, [id]);

  const Loading = () => {
    return <>Loading.....</>;
  };

  const ShowProduct = () => {
    return (
      <div className="product">
        <div>
          <img
            src={product.image_link}
            alt={product.name}
            height="250px"
            width="250px"
          />
        </div>
        <div className="prod-detail">
          <h4>{product.name}</h4>
          <p className="prod-rating">Rating: {product.rating}</p>
          <h3 className="prod-price">Price: ${product.price}</h3>
          <p>{product.description}</p>
          <button
            className="btn btn-outline-dark mx-2 px-4 py-2"
            onClick={() => handleAddToCart(product)}
          >
            Add to cart
          </button>
          <NavLink to="/cart" className="btn btn-dark mx-3 px-5 py-2">
            Go to cart
          </NavLink>
        </div>
        <button
          onClick={() => dispatch(addToCart(product))}
          className="btn btn-primary mx-2 my-2 px-2"
        >
          +
        </button>

        <button
          onClick={() => dispatch(removeFromCart(product))}
          className="btn btn-primary mx-2 my-2 px-3"
        >
          -
        </button>
      </div>
    );
  };

  return (
    <div>
      <div className="container">
        <div className="row">{loading ? <Loading /> : <ShowProduct />}</div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
