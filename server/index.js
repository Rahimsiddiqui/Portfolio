// Dotenv Configuration & DNS
import dotenv from "dotenv";
import dns from "dns";
dotenv.config();

// Fix for MongoDB Atlas connection issues locally (querySrv ECONNREFUSED)
dns.setDefaultResultOrder("ipv4first");
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch {
  console.warn("Could not set custom DNS servers, using system defaults.");
}

// Third-party packages 
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { createServer } from "http";

// Models
import Blog from "./models/blog.js";

// Configuration
const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Database Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Socket.io Setup
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("view-blog", async (slug) => {
    try {
      const cookieName = `viewed-blog-${slug}`;
      // Parse cookies from the handshake headers
      const cookies = socket.handshake.headers.cookie;
      const parsedCookies = cookies
        ? cookies.split(";").reduce((acc, cookie) => {
            const [key, value] = cookie.trim().split("=");
            acc[key] = value;
            return acc;
          }, {})
        : {};

      // If cookie exists, user has already viewed this blog recently
      if (parsedCookies[cookieName]) {
        const blog = await Blog.findOne({ slug });
        if (blog) {
          socket.emit("view-count-update", { slug, views: blog.views });
        }
        return;
      }

      // If cookie does not exist, increment view count
      const blog = await Blog.findOneAndUpdate(
        { slug },
        { $inc: { views: 1 } },
        { new: true }
      );

      if (blog) {
        // Emit updated view count to ALL clients viewing this blog
        io.emit("view-count-update", { slug, views: blog.views });
        
        // Instruct the specific client to set the cookie
        socket.emit("set-cookie", { 
          name: cookieName, 
          value: "true", 
          options: { maxAge: 20 * 60 * 1000 } // 20 minutes
        });
      }
    } catch (err) {
      console.error("Error handling view-blog event:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Get all blogs
app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find({ published: true }).sort({ createdAt: -1 }).lean();
    res.status(200).json(blogs);
  } catch {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

// Get single blog by slug or ID
app.get("/api/blog/:idOrSlug", async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    let blog;
    
    // Check if it's a valid ObjectId (for ID lookup)
    if (mongoose.Types.ObjectId.isValid(idOrSlug)) {
      blog = await Blog.findById(idOrSlug);
    } 
    
    // If not found by ID or not an ID, try lookup by slug
    if (!blog) {
      blog = await Blog.findOne({ slug: idOrSlug });
    }

    if (!blog) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    res.status(200).json(blog);
  } catch (err) {
    console.error("Error fetching single blog:", err);
    res.status(500).json({ error: "Failed to fetch blog post" });
  }
});

// Start Server
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
