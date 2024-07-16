import React from "react";
import { Link } from "react-router-dom";
import "./Nvbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const nav = useNavigate();
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("username");

  const handlelogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    nav("/login");
  };
  return (
    <nav>
      <div className="navbar-container">
        <h1>BLOGSBYARHAM</h1>
        <ul className="navbar-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/addblog">Add Blog</Link>
          </li>
          <li>
            <Link to="/addcategory">Add Category</Link>
          </li>
          {token && token !== null ? (
            <>
              <button>Welcome {user}</button>
              <button onClick={handlelogout}>Logout</button>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
