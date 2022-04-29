const express = require("express");
require("dotenv").config();
const cors = require("cors");

//imported modules
const routes = require("./routes/routes");

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use("/api/images", express.static("./public/images"));
app.use(express.json());
app.use(cors());
//routes
app.use("/api", routes);
//test route
app.use("/", (req, res) => {
  console.log("someone is checking the server");
  res.send("Hello world");
});

//used to handle a non-exiting route
// app.use(notFound);
// app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});
