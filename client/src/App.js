import "./App.css";

import { Routes, Route, BrowserRouter, Navigate, Link } from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import { createContext, useEffect, useState } from "react";
import Products from "./components/Products/Products";
import axios from "axios";
import Upload from "./components/Upload/Upload";
import Product from "./components/Product/Product";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState({});

  // show loading screen
  const [loaded, setLoaded] = useState(false);

  //verify token on when website starts
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get("/user/verify")
        .then((res) => {
          if (res.status === 200) {
            setUser({ ...res.data, token });
            setLoaded(true);
          }
        })
        .catch((err) => {
          setLoaded(true);
          console.log(err);
        });
    } else {
      setLoaded(true);
    }
  }, []);

  // save token to localstorage and update header to axios whenever user changes
  useEffect(() => {
    if (user.token) {
      localStorage.setItem("token", user.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
    }
  }, [user]);

  const logout = () => {
    localStorage.setItem("token", "");
    delete axios.defaults.headers.common["Authorization"];

    setUser({});
  };

  return !loaded ? (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  ) : (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <header>
            <Link to="/">
              <h1>Mern App</h1>
            </Link>
            {user && (
              <p
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </p>
            )}
          </header>
          <div className="main">
            <Routes>
              <Route
                path="*"
                element={
                  !user.email ? (
                    <Navigate to="user/login" replace />
                  ) : (
                    <Navigate to="/products" replace />
                  )
                }
              />
              <Route
                path="user/register"
                element={
                  !user.email ? (
                    <Register />
                  ) : (
                    <Navigate to="/products" replace />
                  )
                }
              />
              <Route
                path="user/login"
                element={
                  !user.email ? <Login /> : <Navigate to="/products" replace />
                }
              />
              {user.email && (
                <>
                  <Route path="/products" element={<Products />} />
                  <Route path="/upload" element={<Upload />} />
                  <Route path="/products/:id" element={<Product />} />
                </>
              )}
            </Routes>
          </div>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
