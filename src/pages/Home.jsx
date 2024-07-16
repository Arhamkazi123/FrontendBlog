import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Home.css";
const Home = () => {
  const [blogs, setblogs] = useState([]);
  useEffect(() => {
    const fetchblogs = async () => {
      try {
        const res = await axios.get(
          "http://localhost:9000/api/auth/getallblogs",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setblogs(res.data.message);
      } catch (error) {
        alert(error.res.data.message);
      }
    };
    fetchblogs();
  }, []);

  return (
    <div className="card-container">
      {blogs.map((blog) => (
        <div className="card" key={blog._id}>
          <img
            src={`http://localhost:9000/${blog.thumbnail}`}
            alt={blog.title}
          />
          <div className="card-content">
            <h2>{blog.title}</h2>
            <p>{blog.description}</p>
            <button
              className="read-more"
              onClick={() => navigate(`/article/${blog._id}`)}
            >
              Read more
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
