import React, { useEffect, useState } from "react";
import styles from "../styles/BlogAdmin.module.css";
import { useNavigate } from "react-router-dom";
import { BlogAPI } from "../../api/blogApi";

const BlogAdmin = () => {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

const formatDate = (value) => {
  if (!value) return "-";

  // Firestore Timestamp (SDK)
  if (value.toDate && typeof value.toDate === "function") {
    return value.toDate().toLocaleDateString();
  }

  // Serialized Firestore Timestamp
  if (value.seconds) {
    return new Date(value.seconds * 1000).toLocaleDateString();
  }

  if (value._seconds) {
    return new Date(value._seconds * 1000).toLocaleDateString();
  }

  // ISO string / JS Date
  return new Date(value).toLocaleDateString();
};

  /* ---------- Fetch Blogs ---------- */
  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const res = await BlogAPI.list();

        // ✅ SAFELY EXTRACT ARRAY
        if (Array.isArray(res)) {
          setBlogs(res);
        } else if (Array.isArray(res.blogs)) {
          setBlogs(res.blogs);
        } else if (Array.isArray(res.data)) {
          setBlogs(res.data);
        } else {
          console.warn("Unexpected blogs response:", res);
          setBlogs([]);
        }
      } catch (err) {
        console.error("Failed to load blogs:", err);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  /* ---------- Filter ---------- */
  const filteredBlogs =
    filter === "all"
      ? blogs
      : blogs.filter((b) => b.status === filter);

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Blogs</h2>
          <p className={styles.subtitle}>Manage your blog content</p>
        </div>

        <button
          className={styles.newBlogBtn}
          onClick={() => navigate("/admin/blogeditor")}
        >
          + New Blog
        </button>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Search blogs..."
          className={styles.searchInput}
          disabled
        />

        <div className={styles.filterButtons}>
          {["all", "published", "draft"].map((f) => (
            <button
              key={f}
              className={`${styles.filterBtn} ${
                filter === f ? styles.active : ""
              }`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className={styles.empty}>
                  Loading blogs…
                </td>
              </tr>
            ) : filteredBlogs.length === 0 ? (
              <tr>
                <td colSpan="4" className={styles.empty}>
                  No blogs found
                </td>
              </tr>
            ) : (
              filteredBlogs.map((blog) => (
                <tr key={blog.id}>
                  <td>
                    <div className={styles.blogTitle}>{blog.title}</div>
                    <div className={styles.blogSlug}>/{blog.slug}</div>
                  </td>

                  <td>{blog.author || "Admin"}</td>

                  <td>
                    <span
                      className={`${styles.status} ${
                        blog.status === "published"
                          ? styles.published
                          : styles.draft
                      }`}
                    >
                      {blog.status}
                    </span>
                  </td>

                  <td>
                    {formatDate(blog.createdAt)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogAdmin;
