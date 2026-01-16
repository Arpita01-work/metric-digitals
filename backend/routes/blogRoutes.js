const express = require("express");
const router = express.Router();
const db = require("../config/firebaseAdmin");
const multer = require("multer");
const blogController = require("../controllers/blogController");

/* ===============================
   MULTER CONFIG
================================ */ 
const upload = multer({
  dest: "uploads/", // make sure this folder exists
});

/* ===============================
   CREATE BLOG (FIXED IMAGE FLOW)
================================ */
router.post(
  "/blogs",
  upload.single("featured_image"), // MUST match FormData key
  blogController.createBlog
);

/* ===============================
   GET ALL BLOGS
================================ */
router.get("/blogs", async (req, res) => {
  try {
    const snapshot = await db
      .collection("blogs")
      .orderBy("createdAt", "desc")
      .get();

    const blogs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.status(200).json(blogs);
  } catch (error) {
    console.error("🔥 BLOG FETCH ERROR:", error);
    return res.status(500).json({ error: error.message });
  }
});

router.get("/blogs/:id", blogController.getBlogById);
  

module.exports = router;
