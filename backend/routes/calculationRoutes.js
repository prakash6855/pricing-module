const express = require("express");
const router = express.Router();
const calculationController = require("../controllers/calculationController");

router.post("/", calculationController.calculatePricing);

module.exports = router;
