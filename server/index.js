const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
// const authRoute = require("./routes/auth");
// const userRoute = require("./routes/users");
// const postRoute = require("./routes/posts");
// const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");

dotenv.config();
app.use(express.json());

mongoose
    .connect(
        "mongodb+srv://guest:guest12321@cluster0.moo5s.mongodb.net/nexus?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    .then(
        console.log("Connected to MongoDB")
    )
    .catch((err) => {
        console.log(err + "\nError brrr :(")
    });

app.listen("5000", () => {
  console.log("Backend server is running.");
});