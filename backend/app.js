import express from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./config/dbConnect.js";

// IMPORT ROUTES
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

// IMPORT MIDDLEWARE
import errorsMiddleware from "./middlewares/errors.middleware.js";
import cookieParser from "cookie-parser";

//FRONTEND FILE PATH
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config({ path: "backend/config/config.env" });

// Handle Uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err}`);
  console.log("Shutting down due to uncaught exception");
  process.exit(1);
});

//Connect to Database
connectDatabase();

//Register express.json
//Handling Json
app.use(
  express.json({
    limit: "10mb",
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);
app.use(cookieParser());

// Register Routes
app.use("/api/v1", userRoutes);
app.use("/api/v1", adminRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", reviewRoutes);

// Register Middleware
app.use(errorsMiddleware);

if (process.env.NODE_ENV === "PRODUCTION") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
  });
}
const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

// HANDLE UNHANDLED PROMISE REJECTION
process.on("unhandledRejection", (err) => {
  console.log("Error:", err);
  console.log("Shutting down server due to unhandled promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});
