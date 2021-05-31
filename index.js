const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const config = require("config");
const PORT = config.get("serverConfig.port");

// Connect to our mongo db
connectDB();

app.use(express.json({ extended: false }));

app.use(cors());

// Include user and identity apis
app.use("/api/user", require("./api/User"));
app.use("/api/identity", require("./api/Identity"));

app.listen(PORT, () =>
  console.log(`Server has started to listen on PORT ${PORT}`)
);
