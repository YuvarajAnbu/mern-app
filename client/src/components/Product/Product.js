import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../Products/products.css";
import "./product.css";

function Product() {
  let { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState();

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
  });

  // to show edit component
  const [edit, setEdit] = useState(false);

  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  //get product by id
  useEffect(() => {
    axios
      .get(`/products/${id}`)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log(res);
          setProduct(res.data);
        } else {
          throw new Error();
        }
      })
      .catch((err) => {
        console.log(err?.response?.data?.error);
        navigate(-1, { replace: true });
      });
  }, [id, navigate]);

  //hide alert msgs after a min if shown
  useEffect(() => {
    if (err)
      setTimeout(() => {
        setErr("");
      }, 3000);
    if (success)
      setTimeout(() => {
        setSuccess("");
      }, 3000);
  }, [err, success]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`/products/${id}`, data)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setSuccess("Product Updated Successfully");
          console.log(res.data, data);
          setProduct({ ...res.data, ...data });
          setData({
            name: "",
            description: "",
            price: "",
          });
          setEdit(false);
        }
      })
      .catch((err) => {
        console.log(err?.response?.data?.error);
        setErr(err?.response?.data?.error);
      });
  };

  const deleteProduct = () => {
    axios
      .delete(`/products/${id}`)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setSuccess("Product Deleted Successfully");

          setTimeout(() => {
            navigate(-1, { replace: true });
          }, 1000);
          setEdit(false);
        }
      })
      .catch((err) => {
        console.log(err?.response?.data?.error);
        setErr(err?.response?.data?.error);
      });
  };

  return !product ? (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  ) : (
    <>
      <p className={`err-msg msg ${!err ? "hide" : ""}`}>{err}</p>
      <p className={`success-msg msg  ${!success ? "hide" : ""}`}>{success}</p>
      {!edit ? (
        <div className="products single">
          <div className="title">
            <h1>Edit or delete the product</h1>
          </div>
          <div className="underline"></div>
          <div className="product">
            <h3>{product.name}</h3>
            <p className="desc">{product.description}</p>
            <p className="price">$ {product.price}</p>

            <button
              type="button"
              title="edit"
              className="edit"
              onClick={() => {
                setEdit(true);
                setData({
                  name: product.name,
                  description: product.description,
                  price: product.price,
                });
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={18}
                viewBox="0 0 512 512"
              >
                {/* <!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --> */}
                <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
              </svg>
            </button>

            <button
              type="button"
              className="delete"
              title="delete"
              onClick={() => {
                deleteProduct();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={18}
                viewBox="0 0 448 512"
              >
                {/* <!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --> */}
                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div className="user">
          <h1>Update Product</h1>
          <form onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Name"
              required
              value={data.name}
              onChange={(e) => {
                setData((prev) => {
                  return {
                    ...prev,
                    name: e.target.value,
                  };
                });
              }}
            />
            <textarea
              name="description"
              placeholder="Description"
              required
              value={data.description}
              onChange={(e) => {
                setData((prev) => {
                  return {
                    ...prev,
                    description: e.target.value,
                  };
                });
              }}
            />
            <input
              type="number"
              name="price"
              value={data.price}
              placeholder="Price in Dollars"
              required
              onChange={(e) => {
                setData((prev) => {
                  return {
                    ...prev,
                    price: e.target.value,
                  };
                });
              }}
            />
            <button type="submit">Update Product</button>
          </form>
        </div>
      )}
    </>
  );
}

export default Product;
