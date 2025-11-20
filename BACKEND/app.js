import express from "express";
import { nanoid } from "nanoid";
import dotenv from "dotenv";
import connectDB from "./src/config/monogo.config.js";
import short_url from "./src/routes/short_url.route.js";
import user_routes from "./src/routes/user.routes.js";
import auth_routes from "./src/routes/auth.routes.js";
import { redirectFromShortUrl } from "./src/controller/short_url.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import cors from "cors";
import { attachUser } from "./src/utils/attachUser.js";
import cookieParser from "cookie-parser";

dotenv.config();  // No need to pass "./.env"

const app = express();

// CORS FIX
app.use(
  cors({
    origin: [
      "http://localhost:5173",            // for development
      // "https://your-frontend.netlify.app" // uncomment when deployed
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Attach Middleware
app.use(attachUser);

// Routes
app.use("/api/user", user_routes);
app.use("/api/auth", auth_routes);
app.use("/api/create", short_url);
app.get("/:id", redirectFromShortUrl);

// Error Handler
app.use(errorHandler);

// PORT FIX (IMPORTANT for Render!)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
