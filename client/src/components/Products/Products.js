import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./products.css";

function Products() {
  const [products, setProducts] = useState([]);

  //fech all products
  useEffect(() => {
    axios
      .get("/products")
      .then((res) => {
        if (res.status === 200) {
          setProducts(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="products">
      <div className="title">
        <h1>
          {products.length < 1
            ? "Add some new Products"
            : "Check out all of these products"}
        </h1>
        <Link to="/upload">
          <p>Add new</p>
        </Link>
      </div>
      <div className="underline"></div>
      <div className="container">
        {products.map((el, i) => (
          <Link key={i} to={`/products/${el._id}`}>
            <div className="product">
              <h3>{el.name}</h3>
              <p className="desc">{el.description}</p>
              <p className="price">$ {el.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Products;
