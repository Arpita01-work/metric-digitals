import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { BlogAPI } from "../api/blogApi";
import "../styles/Blog.css"; // reuse existing styles

const formatDate = (value) => {
  if (!value) return "";

  if (value.toDate && typeof value.toDate === "function") {
    return value.toDate().toLocaleDateString();
  }

  if (value.seconds) {
    return new Date(value.seconds * 1000).toLocaleDateString();
  }

  if (value._seconds) {
    return new Date(value._seconds * 1000).toLocaleDateString();
  }

  return new Date(value).toLocaleDateString();
};

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    BlogAPI.getById(id)
      .then((data) => setBlog(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="blog-page">Loading article...</div>;
  }

  if (!blog) {
    return <div className="blog-page">Blog not found.</div>;
  }

  return (
    <div className="blog-page">
      <div className="blog-container">
        <button
          onClick={() => navigate(-1)}
          style={{ marginBottom: "20px" }}
        >
          <ArrowLeft /> Back
        </button>

        <h1>{blog.title}</h1>

        <div className="blog-card-meta" style={{ marginBottom: "20px" }}>
          <span>
            <User /> {blog.author || "Admin"}
          </span>
          <span>
            <Calendar /> {formatDate(blog.createdAt)}
          </span>
        </div>

        {blog.featured_image && (
          <img
            src={`http://localhost:5000${blog.featured_image}`}
            alt={blog.title}
            className="blog-featured-image"
            style={{ marginBottom: "20px" }}
          />
        )}

        <p>{blog.content}</p>

        {blog.tags && blog.tags.length > 0 && (
          <div style={{ marginTop: "30px" }}>
            {blog.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  marginRight: "10px",
                  padding: "6px 12px",
                  background: "#eee",
                  borderRadius: "20px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetail;
