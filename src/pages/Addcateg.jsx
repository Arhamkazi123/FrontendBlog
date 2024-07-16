import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Addcateg = () => {
  const nav = useNavigate();
  const [formdata, setfd] = useState({
    title: "",
  });
  const handlecateg = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:9000/api/auth/addnewcategory",
        formdata,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert(res.data.message);
      nav("/addblog");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else if (error.request) {
        alert("No response received from the server");
      } else {
        alert("Error: " + error.message);
      }
      console.error("Error: ", error);
    }
  };
  return (
    <>
      <div className="register-container">
        <h1>Add a category</h1>
        <form onSubmit={handlecateg}>
          <div className="form-group">
            <label htmlFor="title">Add Category</label>
            <input
              type="title"
              id="title"
              name="title"
              value={formdata.title}
              onChange={(e) =>
                setfd({ ...formdata, [e.target.name]: e.target.value })
              }
              required
              autoComplete="off"
            />
          </div>
          <button type="submit">ADD</button>
        </form>
      </div>
    </>
  );
};

export default Addcateg;
