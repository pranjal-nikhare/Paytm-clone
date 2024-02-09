// backend/index.js
const express = require("express");
const rootRouter = require("./routes/index");
const accountRouter = require("./routes/index");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(cors());
app.use("/api/v1", rootRouter);
app.use("/api/v1", accountRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
