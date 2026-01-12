const express = require("express");
const cors = require("cors");
require("dotenv").config();


const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

const leadRoutes = require("./routes/leadRoutes");
app.use("/api", leadRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
