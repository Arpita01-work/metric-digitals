// src/components/BlogSection.jsx
import React from "react";
import { Card, CardContent } from "../components/ui/card";
import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import "../styles/BlogSection.css";

const articles = [
  {
    title: "How to Boost Your SEO Rankings in 2024",
    excerpt:
      "Learn the latest strategies to improve your search engine visibility...",
    date: "Dec 15, 2024",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    category: "SEO",
  },
  {
    title: "The Future of Digital Marketing",
    excerpt:
      "Discover emerging trends that will shape marketing strategies...",
    date: "Dec 12, 2024",
    image:
      "https://images.unsplash.com/photo-1432888622747-4eb9a8f5a70d?w=400&h=300&fit=crop",
    category: "Marketing",
  },
  {
    title: "Email Marketing Best Practices",
    excerpt:
      "Master the art of email campaigns with proven techniques...",
    date: "Dec 10, 2024",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=300&fit=crop",
    category: "Email",
  },
];

export default function BlogSection() {
  return (
    <section className="blog">
      <div className="blog-container">
        {/* Section Header */}
        <div className="blog-header">
          <span className="blog-tag">BLOG</span>
          <h2 className="blog-title">Latest News &amp; Articles</h2>
        </div>

        {/* Articles Grid */}
        <div className="blog-grid">
          {articles.map((article, index) => (
            <Card key={index} className="blog-card">
              <div className="blog-image-wrapper">
                <img
                  src={article.image}
                  alt={article.title}
                  className="blog-image"
                />
                <div className="blog-category-wrapper">
                  <span className="blog-category-badge">
                    {article.category}
                  </span>
                </div>
              </div>

              <CardContent className="blog-card-content">
                <div className="blog-meta">
                  <Calendar className="blog-meta-icon" />
                  <span>{article.date}</span>
                </div>

                <h3 className="blog-article-title">
                  {article.title}
                </h3>

                <p className="blog-excerpt">
                  {article.excerpt}
                </p>

                <button className="blog-read-more">
                  <span>Read More</span>
                  <ArrowRight className="blog-read-more-icon" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
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
