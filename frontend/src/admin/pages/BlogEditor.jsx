import React, { useState, useRef } from "react";
import styles from "../styles/BlogEditor.module.css";
import { useNavigate } from "react-router-dom";
import { BlogAPI } from "../../api/blogApi";

const BlogEditor = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState(
    "Discover the top SEO strategies to improve your website rankings."
  );

  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  const [tags, setTags] = useState(["SEO", "Digital Marketing", "2025"]);
  const [tagInput, setTagInput] = useState("");

  // 🔴 IMPORTANT: SEPARATE FILE & PREVIEW
  const [featuredImage, setFeaturedImage] = useState(null); // FILE
  const [imagePreview, setImagePreview] = useState(null);   // BLOB URL

  /* ===============================
     IMAGE HANDLERS
  =============================== */
  const handleImageSelect = (file) => {
    if (!file) return;

    setFeaturedImage(file); // ✅ FILE ONLY
    setImagePreview(URL.createObjectURL(file)); // ✅ PREVIEW ONLY
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    handleImageSelect(file);
  };

  /* ===============================
     SAVE BLOG
  =============================== */
  const handleSave = async (status) => {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("content", content);
    formData.append("excerpt", excerpt);
    formData.append("status", status);
    formData.append("tags", JSON.stringify(tags));
    formData.append(
      "seo",
      JSON.stringify({
        meta_title: metaTitle,
        meta_description: metaDescription,
      })
    );

    // ✅ SEND ONLY FILE
    if (featuredImage instanceof File) {
      formData.append("featured_image", featuredImage);
    }

    await BlogAPI.create(formData);
    navigate("admin/blogs");
  };

  /* ===============================
     TAG HANDLERS
  =============================== */
  const addTag = () => {
    const trimmed = tagInput.trim();
    if (!trimmed || tags.includes(trimmed)) return;
    setTags([...tags, trimmed]);
    setTagInput("");
  };

  const removeTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleTagKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.backArrow} onClick={() => navigate("../admin/blogs")}>
            ←
          </span>
          <h2>Edit Blog</h2>
        </div>

        <div className={styles.headerRight}>
          <button className={styles.draftBtn} onClick={() => handleSave("draft")}>
            Save Draft
          </button>
          <button
            className={styles.publishBtn}
            onClick={() => handleSave("published")}
          >
            Publish
          </button>
        </div>
      </div>

      <div className={styles.layout}>
        <div className={styles.left}>
          <div className={styles.card}>
            <label>Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />

            <label>Slug</label>
            <input value={slug} onChange={(e) => setSlug(e.target.value)} />

            <label>Content</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} />
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.card}>
            <h4>Featured Image</h4>

            {imagePreview ? (
              <div className={styles.imagePreview}>
                <img src={imagePreview} alt="Featured" />
                <button
                  className={styles.removeImage}
                  onClick={() => {
                    setFeaturedImage(null);
                    setImagePreview(null);
                  }}
                >
                  ×
                </button>
              </div>
            ) : (
              <>
                <div
                  className={styles.uploadBox}
                  onClick={() => fileInputRef.current.click()}
                >
                  <span>Upload Image</span>
                </div>
                <button
                  className={styles.mediaBtn}
                  onClick={() => fileInputRef.current.click()}
                >
                  Choose from Media
                </button>
              </>
            )}

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              hidden
              onChange={handleFileChange}
            />
          </div>

          <div className={styles.card}>
            <h4>Excerpt</h4>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
            />
          </div>

          <div className={styles.card}>
            <h4>Tags</h4>

            <div className={styles.tagInput}>
              <input
                type="text"
                placeholder="Add tag"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKey}
              />
              <button onClick={addTag}>Add</button>
            </div>

            <div className={styles.tags}>
              {tags.map((tag) => (
                <span key={tag} onClick={() => removeTag(tag)}>
                  {tag} ×
                </span>
              ))}
            </div>
          </div>

          <div className={styles.card}>
            <h4>SEO Settings</h4>

            <label>Meta Title</label>
            <input
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
            />
            <label>Meta Description</label>
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;
