const express = require("express");
const router = express.Router();
const pricingController = require("../controllers/pricingController");

router.post("/", pricingController.createPricingConfig);
router.get("/:id", pricingController.getPricingConfig);
router.put("/:id", pricingController.updatePricingConfig);
router.delete("/:id", pricingController.deletePricingConfig);

module.exports = router;
