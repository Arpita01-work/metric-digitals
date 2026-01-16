const db = require("../config/firebaseAdmin");

/* CREATE BLOG */
exports.createBlog = async (req, res) => {
  try {
    const {
      title,
      slug,
      content,
      excerpt,
      tags,
      seo,
      status,
    } = req.body;

    if (!title || !slug) {
      return res.status(400).json({ error: "Title and slug are required" });
    }

    // ✅ GET IMAGE PATH FROM req.file
    const featuredImagePath = req.file
      ? `/uploads/${req.file.filename}`
      : "";

    const blogRef = await db.collection("blogs").add({
      title,
      slug,
      content: content || "",
      excerpt: excerpt || "",
      featured_image: featuredImagePath, // ✅ FIXED
      tags: tags ? JSON.parse(tags) : [],
      seo: seo ? JSON.parse(seo) : {
        meta_title: "",
        meta_description: "",
      },
      status: status || "draft",
      createdAt: new Date(),
      publishedAt: status === "published" ? new Date() : null,
    });

    res.status(201).json({
      id: blogRef.id,
      message: "Blog created successfully",
    });
  } catch (err) {
    console.error("🔥 BLOG CREATE ERROR:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

/* GET ALL BLOGS */
exports.getBlogs = async (req, res) => {
  const snapshot = await db
    .collection("blogs")
    .orderBy("createdAt", "desc")
    .get();

  const blogs = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  res.json(blogs);
};

/* GET BLOG BY ID */
exports.getBlogById = async (req, res) => {
  try {
    const doc = await db.collection("blogs").doc(req.params.id).get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json({
      id: doc.id,
      ...doc.data(),
    });
  } catch (err) {
    console.error("🔥 BLOG FETCH BY ID ERROR:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
