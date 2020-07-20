//import dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

// define the Express app
const app = express();

// enhance your app security with Helmet
app.use(helmet());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// enable all CORS requests
app.use(cors());

// log HTTP requests
app.use(morgan("combined"));

// Load Config
const config = require("./config.json");

// Set up mongoose connection
const mongoose = require("mongoose");
let db_url = config.db_url;
let mongoDB = process.env.MONGODB_URI || db_url;
mongoose.connect(mongoDB, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
});
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const zacksRoutes = require("./routes/zacks.route");

app.use("/zacks", zacksRoutes);
let port = 1234;

app.listen(port, () => {
  console.log("Server is up and running on port numner " + port);
});
