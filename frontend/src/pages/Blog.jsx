// src/pages/Blog.jsx
import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { ArrowRight, Calendar, User, Search } from "lucide-react";
import "../styles/Blog.css";

const categories = ["All", "SEO", "Marketing", "Content", "Social Media", "Email"];

const articles = [
  {
    title: "How to Boost Your SEO Rankings in 2024",
    excerpt:
      "Learn the latest strategies to improve your search engine visibility and drive organic traffic to your website.",
    date: "Dec 15, 2024",
    author: "Sarah Johnson",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    category: "SEO",
    featured: true,
  },
  {
    title: "The Future of Digital Marketing",
    excerpt:
      "Discover emerging trends that will shape marketing strategies in the coming years.",
    date: "Dec 12, 2024",
    author: "Michael Chen",
    image:
      "https://images.unsplash.com/photo-1432888622747-4eb9a8f5a70d?w=600&h=400&fit=crop",
    category: "Marketing",
  },
  {
    title: "Email Marketing Best Practices",
    excerpt:
      "Master the art of email campaigns with these proven techniques and strategies.",
    date: "Dec 10, 2024",
    author: "Emily Davis",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop",
    category: "Email",
  },
  {
    title: "Content Strategy That Converts",
    excerpt:
      "Create content that not only engages your audience but also drives conversions.",
    date: "Dec 8, 2024",
    author: "David Wilson",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
    category: "Content",
  },
  {
    title: "Social Media Trends to Watch",
    excerpt:
      "Stay ahead of the curve with these emerging social media marketing trends.",
    date: "Dec 5, 2024",
    author: "Sarah Johnson",
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop",
    category: "Social Media",
  },
  {
    title: "Maximizing ROI with PPC Campaigns",
    excerpt:
      "Optimize your pay-per-click advertising for better returns on investment.",
    date: "Dec 3, 2024",
    author: "Michael Chen",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop",
    category: "Marketing",
  },
];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      activeCategory === "All" || article.category === activeCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = articles.find((a) => a.featured);

  return (
    <div className="blog-page">
      {/* Hero Section */}
      <section className="blog-hero">
        <div className="blog-container">
          <div className="blog-hero-content">
            <span className="blog-section-tag">OUR BLOG</span>
            <h1 className="blog-hero-title">Latest News &amp; Articles</h1>
            <p className="blog-hero-text">
              Stay updated with the latest trends, strategies, and insights in
              digital marketing and SEO.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Article */}
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
                <div className="blog-featured-badge-wrapper">
                  <span className="blog-featured-badge">Featured</span>
                </div>
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
                  <div className="blog-meta-item">
                    <User className="blog-meta-icon" />
                    <span>{featuredArticle.author}</span>
                  </div>
                  <div className="blog-meta-item">
                    <Calendar className="blog-meta-icon" />
                    <span>{featuredArticle.date}</span>
                  </div>
                </div>

                <Button className="blog-featured-button">
                  <span>Read Article</span>
                  <ArrowRight className="blog-featured-button-icon" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filter & Search */}
      <section className="blog-filters">
        <div className="blog-container">
          <div className="blog-filters-row">
            {/* Categories */}
            <div className="blog-categories">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`blog-category-chip ${
                    activeCategory === category
                      ? "blog-category-chip--active"
                      : ""
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="blog-search-wrapper">
              <Search className="blog-search-icon" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="blog-search-input"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="blog-grid-section">
        <div className="blog-container">
          <div className="blog-grid">
            {filteredArticles.map((article, index) => (
              <Card key={index} className="blog-card">
                <div className="blog-card-image-wrapper">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="blog-card-image"
                  />
                  <div className="blog-card-category-wrapper">
                    <span className="blog-card-category-badge">
                      {article.category}
                    </span>
                  </div>
                </div>

                <CardContent className="blog-card-content">
                  <div className="blog-card-meta">
                    <div className="blog-card-meta-item">
                      <User className="blog-card-meta-icon" />
                      <span>{article.author}</span>
                    </div>
                    <div className="blog-card-meta-item">
                      <Calendar className="blog-card-meta-icon" />
                      <span>{article.date}</span>
                    </div>
                  </div>

                  <h3 className="blog-card-title">
                    {article.title}
                  </h3>

                  <p className="blog-card-excerpt">
                    {article.excerpt}
                  </p>

                  <button className="blog-card-read-more">
                    <span>Read More</span>
                    <ArrowRight className="blog-card-read-more-icon" />
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="blog-empty-state">
              <p>No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
