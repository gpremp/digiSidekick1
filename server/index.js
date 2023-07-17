require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/user-route");
const personRoutes = require("./routes/person-route");

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/", userRoutes);
app.use("/",personRoutes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));