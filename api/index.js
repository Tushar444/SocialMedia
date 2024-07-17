import express from "express";
import authRoutes from "./routes/auth.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import relationshipsRoutes from "./routes/relationships.js";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import newsRoutes from "./routes/news.js";
import uploadRoutes from "./routes/upload.js";
import activityRoutes from "./routes/latestActivites.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(
  cors({
    origin: "https://socio-sapiens-web-app.netlify.app",
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/relationships", relationshipsRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/latestActivities", activityRoutes);

app.listen(8800, () => {
  console.log("Connected to backend!");
});
