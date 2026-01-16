const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const adminRoutes = require("./routes/adminRoutes");
const blogRoutes = require("./routes/blogRoutes");
const leadRoutes = require("./routes/leadRoutes");
const contactRouter = require("./routes/contactRouter");
const newsletterRouter = require("./routes/newsletterRouter");
const requestRoutes = require("./routes/requestRoutes");


const app = express();

console.log("🔥 SERVER FILE LOADED");

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use((req, res, next) => {
  console.log("➡️ Incoming:", req.method, req.url);
  next();
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
/* ✅ ROUTES */
app.use("/api/admin", adminRoutes);
app.use("/api", blogRoutes);
app.use("/api", leadRoutes);
app.use("/api", contactRouter);
app.use("/api", newsletterRouter);
app.use("/api/requests", requestRoutes);


app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
