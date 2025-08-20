import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/connectDB.js";
import userRoutes from "./routes/user.routes.js";
import sellerRoutes from "./routes/seller.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import addressRoutes from "./routes/address.routes.js";
import orderRoutes from "./routes/order.routes.js";
import { connectCloudinary } from "./config/cloudinary.js";

dotenv.config();

const app = express();

// Connect external services
await connectCloudinary();
await connectDB();

// Allowed origins (from env + localhost for dev)
const allowedOrigins = [
  process.env.CLIENT_URL, // e.g. https://your-frontend.vercel.app
  "http://localhost:5173",
].filter(Boolean);

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(cookieParser());
app.use(express.json());

// Static files (⚠️ works on Render but not on Vercel)
app.use("/images", express.static("uploads"));

// API routes
app.use("/api/user", userRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/order", orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
