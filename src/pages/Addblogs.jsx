import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Addblogs = () => {
  const nav = useNavigate();
  const [formdata, setfd] = useState({
    title: "",
    category: "",
    description: "",
  });

  const [categ, setcateg] = useState([]);
  const [file, setfiles] = useState([]);
  useEffect(() => {
    const fetchCategs = async () => {
      try {
        const res = await axios.get(
          "http://localhost:9000/api/auth/getallcategories",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setcateg(res.data.message);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategs();
  }, []);

  const handleaddblog = async (e) => {
    e.preventDefault();
    try {
      const allform = new FormData();
      allform.append("title", formdata.title);
      allform.append("category", formdata.category);
      allform.append("description", formdata.description);
      allform.append("thumbnail", file);
      const res = await axios.post(
        "http://localhost:9000/api/auth/addnewblog",
        allform,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert(res.data.message);
      nav("/");
    } catch (error) {
      alert(error.res.data.message);
    }
  };
  return (
    <>
      <div className="register-container">
        <h1>Add Blog</h1>
        <form onSubmit={handleaddblog}>
          <div className="form-group">
            <label htmlFor="title">title</label>
            <input
              type="title"
              value={formdata.title}
              onChange={(e) =>
                setfd({ ...formdata, [e.target.name]: e.target.value })
              }
              id="title"
              name="title"
              required
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Category</label>
            <select
              name="category"
              value={formdata.category}
              onChange={(e) =>
                setfd({ ...formdata, [e.target.name]: e.target.value })
              }
            >
              <option>Select Category</option>
              {categ &&
                categ.map((item) => {
                  return (
                    <option value={item._id} key={item._id}>
                      {item.title}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="Description">Description</label>
            <textarea
              name="description" // Corrected typo: " description" -> "description"
              rows="5"
              cols="55"
              value={formdata.description}
              onChange={(e) =>
                setfd({ ...formdata, [e.target.name]: e.target.value })
              }
              required
              autoComplete="off"
              placeholder="Add Description"
            />
          </div>
          <div className="form-group">
            <label htmlFor="Fileupload">Thumbnail</label>
            <input
              type="file"
              name="thumbnail"
              required
              onChange={(e) => {
                setfiles(e.target.files[0]);
              }}
            />
          </div>
          <button type="submit">Add Blog</button>
        </form>
      </div>
    </>
  );
};

export default Addblogs;
