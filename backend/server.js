const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const pricingRoutes = require("./routes/pricingRoutes");
const calculationRoutes = require("./routes/calculationRoutes");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Use routes
app.use("/api/pricing", pricingRoutes);
app.use("/api/calculate", calculationRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
