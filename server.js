import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

//config
dotenv.config();

//database config
connectDB();

//rest object
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./client/build")));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//rest api
// app.get("/", (req, res) => {
//   res.send("<h1>Welcome to ecommerce app</h1>");
// });
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//port
const PORT = process.env.PORT || 8080;

//running listen
app.listen(PORT, () => {
  console.log(
    `Server is running on ${process.env.DEV_MODE} mode on ${PORT}`.bgCyan.white
  );
});

//through node = npm start
//through nodemon so that changes will be appeared directly = npm run server
//client folder -> then run -> npm start
