import express, { response } from "express";
import { PORT, mongoURL } from "./config.js";
import mongoose from "mongoose";
import bookRoutes from "./routes/bookRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json());

// Middleware for handling CORS policy
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// Routes middleware
app.use("/books", bookRoutes);

app.get("/", (request, response) => {
  console.log(request);
  return response.status(243).send("Welcome to MERN stack tutorial");
});

// Setting up the server
// Connecting to mongo db
mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("App connected to mongo database");
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
