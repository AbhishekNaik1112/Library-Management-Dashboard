require("dotenv").config();
const express = require("express");
const { connectSQL } = require("./config/dbConfig");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: "*" }));

app.use(express.json());

connectSQL();

const { authenticate } = require("./utils/auth");
const memberRoutes = require("./routes/memberRoute");
const bookRoutes = require("./routes/bookRoute");
const issuanceRoutes = require("./routes/issuanceRoute");

app.use("/member", authenticate, memberRoutes);
app.use("/book", authenticate, bookRoutes);
app.use("/issuance", authenticate, issuanceRoutes);

app.listen(port, () => {
  console.log(`Library backend running on port ${port}`);
});
