const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./src/routes/users");
const authRoutes = require("./src/routes/auth");
const friendsRoutes = require("./src/routes/friendlist");
const bodyParser = require("body-parser")


const connectToDatabase = async () => {
  try {
    await connection();
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  
  }
};

connectToDatabase();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/friends", friendsRoutes);


const port = 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

