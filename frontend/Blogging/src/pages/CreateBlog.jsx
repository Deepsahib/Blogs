import React, { useState } from "react";
import { createBlogService } from "../services/blogService.js";
import toast from "react-hot-toast";

const styles = {
  page: {
    minHeight: "100vh",
    padding: "48px 20px",
    background: "linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)",
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: "720px",
    margin: "0 auto",
    padding: "40px",
    boxSizing: "border-box",
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "24px",
    boxShadow: "0 20px 50px rgba(30, 41, 59, 0.1)",
  },
  eyebrow: {
    margin: "0 0 10px",
    color: "#6366f1",
    fontSize: "13px",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
  },
  title: {
    margin: "0",
    color: "#0f172a",
    fontSize: "clamp(28px, 5vw, 40px)",
    lineHeight: 1.15,
  },
  intro: {
    margin: "12px 0 32px",
    color: "#64748b",
    fontSize: "16px",
    lineHeight: 1.6,
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "22px",
  },
  label: {
    color: "#334155",
    fontSize: "14px",
    fontWeight: 700,
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "14px 16px",
    color: "#0f172a",
    backgroundColor: "#f8fafc",
    border: "1px solid #cbd5e1",
    borderRadius: "12px",
    outline: "none",
    fontSize: "15px",
    fontFamily: "inherit",
  },
  upload: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "16px",
    backgroundColor: "#f8fafc",
    border: "1px dashed #a5b4fc",
    borderRadius: "12px",
  },
  fileButton: {
    flexShrink: 0,
    padding: "10px 14px",
    color: "#4338ca",
    backgroundColor: "#eef2ff",
    borderRadius: "9px",
    fontSize: "14px",
    fontWeight: 700,
    cursor: "pointer",
  },
  fileName: {
    overflow: "hidden",
    color: "#64748b",
    fontSize: "14px",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  button: {
    width: "100%",
    marginTop: "8px",
    padding: "15px 20px",
    color: "#ffffff",
    background: "linear-gradient(135deg, #6366f1, #4f46e5)",
    border: 0,
    borderRadius: "12px",
    boxShadow: "0 8px 18px rgba(79, 70, 229, 0.25)",
    fontSize: "15px",
    fontWeight: 700,
    cursor: "pointer",
  },
};

const CreateBlog = () => {
  const [data, setdata] = useState({
    title: "",
    description: "",
    category:""
  });

  const [image, setimage] = useState(null);

  function handleDataChange(e) {
    const { value, name } = e.target;
    setdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleImageChange(e) {
    const files = e.target.files[0];
    setimage(files);
  }

  function Modifieddata() {
    const formdata = new FormData();
    formdata.append("title", data.title);
    formdata.append("description", data.description);
    formdata.append("category",data.category)
    formdata.append("imageUrl", image);

    return formdata;
  }

  async function hanldeFormSubmit(e) {
    try {
      e.preventDefault();
      
      let data = Modifieddata();
    
      if (data) {
        const response = await createBlogService(data);
        toast.success(response.data.message)
      }
      
    } catch (error) {
      console.log("error is", error.response);
    }
  }

  

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <p style={styles.eyebrow}>Share your story</p>
        <h1 style={styles.title}>Create a new blog</h1>
        <p style={styles.intro}>
          Turn your ideas into something worth reading. Add a title, tell your
          story, and choose a cover image.
        </p>

        <form action="" onSubmit={hanldeFormSubmit}>
          <div style={styles.field}>
            <label style={styles.label} htmlFor="blog-title">
              Blog title
            </label>
            <input
              id="blog-title"
              name="title"
              onChange={handleDataChange}
              value={data.title}
              type="text"
              placeholder="Give your blog a memorable title"
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label} htmlFor="blog-description">
              Your story
            </label>
            <textarea
              id="blog-description"
              name="description"
              onChange={handleDataChange}
              value={data.description}
              placeholder="What would you like to share?"
              rows="7"
              style={{ ...styles.input, resize: "vertical", lineHeight: 1.6 }}
            />
          </div>

          <div>
            <select onChange={handleDataChange} value={data.category} name="category" id="">
              <option value="option">Select Option</option>
              <option value="Technology">Technology</option>
              <option value="Fashion">Fashion</option>
              <option value="Fitness">Fitness</option>
            </select>
          </div>

          <div style={styles.field}>
            <span style={styles.label}>Cover image</span>
            <div style={styles.upload}>
              <label style={styles.fileButton} htmlFor="blog-image">
                Choose image
              </label>
              <span style={styles.fileName}>
                {image ? image.name : "JPG, PNG or WEBP"}
              </span>
              <input
                onChange={handleImageChange}
                type="file"
                name="imageUrl"
                id="blog-image"
                accept="image/*"
                hidden
              />
            </div>
          </div>

          <button type="submit" style={styles.button}>
            Publish blog
          </button>
        </form>
      </section>
    </main>
  );
};

export default CreateBlog;
