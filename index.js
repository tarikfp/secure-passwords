const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const config = require("config");
const PORT = config.get("serverConfig.port");

app.use(express.json());

// Connect to our mongo db
connectDB();

app.use(cors());

//Include identity api
app.use("/api/identity", require("./api/Identity"));
app.use("/api/user", require("./api/User"));

app.listen(PORT, () =>
  console.log(`Server has started to listen on PORT ${PORT}`)
);
