// src/pages/Blog.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { ArrowRight, Calendar, User, Search } from "lucide-react";
import { BlogPublicAPI } from "../api/blogPublicApi";
import "../styles/Blog.css";

const categories = ["All", "SEO", "Marketing", "Content", "Social Media", "Email"];

export default function Blog() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  /* ---------- Date Formatter ---------- */
  const formatDate = (value) => {
    if (!value) return "";

    if (value.toDate) return value.toDate().toLocaleDateString();
    if (value.seconds) return new Date(value.seconds * 1000).toLocaleDateString();
    if (value._seconds) return new Date(value._seconds * 1000).toLocaleDateString();

    return new Date(value).toLocaleDateString();
  };

  /* ---------- Fetch Blogs ---------- */
  useEffect(() => {
    BlogPublicAPI.list()
      .then((data) => {
        setBlogs(data.filter((b) => b.status === "published"));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  /* ---------- Normalize Data ---------- */
  const normalizedBlogs = useMemo(() => {
    return blogs.map((b) => ({
      id: b.id,
      title: b.title,
      excerpt: b.excerpt,
      image: b.featured_image
        ? `http://localhost:5000${b.featured_image}`
        : "",
      author: b.author || "Admin",
      date: formatDate(b.createdAt),
      category: b.tags?.[0] || "Marketing",
    }));
  }, [blogs]);

  /* ---------- Filtering ---------- */
  const filteredArticles = normalizedBlogs.filter((article) => {
    const matchesCategory =
      activeCategory === "All" || article.category === activeCategory;

    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const featuredArticle = normalizedBlogs[0];

  if (loading) {
    return <div className="blog-page">Loading blogs...</div>;
  }

  return (
    <div className="blog-page">
      {/* ================= HERO ================= */}
      <section className="blog-hero">
        <div className="blog-container blog-hero-content">
          <span className="blog-section-tag">OUR BLOG</span>
          <h1 className="blog-hero-title">Latest News & Articles</h1>
          <p className="blog-hero-text">
            Stay updated with digital marketing & SEO insights.
          </p>
        </div>
      </section>

      {/* ================= FEATURED ================= */}
      {featuredArticle && (
        <section className="blog-featured-section">
          <div className="blog-container">
            <div className="blog-featured-card">

              <div className="blog-featured-image-wrapper">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="blog-featured-image"
                />
              </div>

              <div className="blog-featured-content">
                <span className="blog-featured-category">
                  {featuredArticle.category}
                </span>

                <h2 className="blog-featured-title">
                  {featuredArticle.title}
                </h2>

                <p className="blog-featured-excerpt">
                  {featuredArticle.excerpt}
                </p>

                <div className="blog-featured-meta">
                  <span className="blog-meta-item">
                    <User className="blog-meta-icon" />
                    {featuredArticle.author}
                  </span>
                  <span className="blog-meta-item">
                    <Calendar className="blog-meta-icon" />
                    {featuredArticle.date}
                  </span>
                </div>

                <Button
                  className="blog-featured-button"
                  onClick={() => navigate(`/blog/${featuredArticle.id}`)}
                >
                  Read Article
                  <ArrowRight className="blog-featured-button-icon" />
                </Button>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* ================= FILTERS ================= */}
      <section className="blog-filters">
        <div className="blog-container blog-filters-row">

          <div className="blog-categories">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`blog-category-chip ${
                  activeCategory === c ? "blog-category-chip--active" : ""
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="blog-search-wrapper">
            <Search className="blog-search-icon" />
            <Input
              className="blog-search-input"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

        </div>
      </section>

      {/* ================= GRID ================= */}
      <section className="blog-grid-section">
        <div className="blog-container blog-grid">

          {filteredArticles.map((article) => (
            <Card key={article.id} className="blog-card">

              <div className="blog-card-image-wrapper">
                <img
                  src={article.image}
                  alt={article.title}
                  className="blog-card-image"
                />
              </div>

              <CardContent className="blog-card-content">
                <div className="blog-card-meta">
                  <span className="blog-card-meta-item">
                    <User className="blog-card-meta-icon" />
                    {article.author}
                  </span>
                  <span className="blog-card-meta-item">
                    <Calendar className="blog-card-meta-icon" />
                    {article.date}
                  </span>
                </div>

                <h3 className="blog-card-title">{article.title}</h3>
                <p className="blog-card-excerpt">{article.excerpt}</p>

                <button
                  className="blog-card-read-more"
                  onClick={() => navigate(`/blog/${article.id}`)}
                >
                  Read More
                  <ArrowRight className="blog-card-read-more-icon" />
                </button>
              </CardContent>

            </Card>
          ))}

          {filteredArticles.length === 0 && (
            <div className="blog-empty-state">No articles found.</div>
          )}

        </div>
      </section>
    </div>
  );
}
