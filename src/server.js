const express = require("express");
const cors = require("cors");
const connectToDb = require("./utils/db");
require("dotenv").config({ path: `${__dirname}/config/.env` });
const todoRoutes = require("./routes/todo_routes");
const authRoutes = require("./routes/auth_routes");
const app = express();
app.use(express.json());
app.use(cors());
connectToDb();

app.use("/api/v1/todos", todoRoutes);
app.use("/api/v1/auth", authRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
