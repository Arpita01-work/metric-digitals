// src/components/BlogSection.jsx
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { BlogPublicAPI } from "../api/blogPublicApi";
import "../styles/BlogSection.css";

export default function BlogSection() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    BlogPublicAPI.list()
      .then((data) => {
        // Only published + latest 3
        const published = data
          .filter((b) => b.status === "published")
          .slice(0, 3);

        setBlogs(published);
      })
      .catch(console.error);
  }, []);

  return (
    <section className="blog">
      <div className="blog-container">
        {/* Header */}
        <div className="blog-header">
          <span className="blog-tag">BLOG</span>
          <h2 className="blog-title">Latest News & Articles</h2>
        </div>

        {/* Grid */}
        <div className="blog-grid">
          {blogs.map((blog) => {
            const date = blog.createdAt
              ? new Date(
                  blog.createdAt.seconds
                    ? blog.createdAt.seconds * 1000
                    : blog.createdAt
                ).toLocaleDateString()
              : "";

            return (
              <Card key={blog.id} className="blog-card">
                <div className="blog-image-wrapper">
                  <img
                    src={
                      blog.featured_image
                        ? `http://localhost:5000${blog.featured_image}`
                        : ""
                    }
                    alt={blog.title}
                    className="blog-image"
                  />
                  <div className="blog-category-wrapper">
                    <span className="blog-category-badge">
                      {blog.tags?.[0] || "Blog"}
                    </span>
                  </div>
                </div>

                <CardContent className="blog-card-content">
                  <div className="blog-meta">
                    <Calendar className="blog-meta-icon" />
                    <span>{date}</span>
                  </div>

                  <h3 className="blog-article-title">
                    {blog.title}
                  </h3>

                  <p className="blog-excerpt">
                    {blog.excerpt}
                  </p>

                  <Link to={`/blog/${blog.id}`} className="blog-read-more">
                    <span>Read More</span>
                    <ArrowRight className="blog-read-more-icon" />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Footer */}
        <div className="blog-footer">
          <Link to={createPageUrl("Blog")}>
            <button className="blog-view-all">
              <span>View All Articles</span>
              <ArrowRight className="blog-view-all-icon" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
