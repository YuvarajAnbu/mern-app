import axios from "axios";
import React, { useEffect, useState } from "react";

function Upload() {
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
  });

  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

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
      .post("/api/products", data)
      .then((res) => {
        if (res.status === 201) {
          setSuccess("Added Product Successfully");
          setData({
            name: "",
            description: "",
            price: "",
          });
        }
      })
      .catch((err) => {
        console.log(err?.response?.data?.error);
        setErr(err?.response?.data?.error);
      });
  };

  return (
    <div className="user">
      <h1>Add a new Product</h1>
      <p className={`err-msg msg ${!err ? "hide" : ""}`}>{err}</p>
      <p className={`success-msg msg  ${!success ? "hide" : ""}`}>{success}</p>
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
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default Upload;
