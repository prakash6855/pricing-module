const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { PricingConfig, Log, sequelize } = require("./models");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// CRUD routes for pricing configuration
app.post("/api/pricing", async (req, res) => {
  try {
    const {
      distanceBasePrice,
      distanceAdditionalPrice,
      timeMultiplierFactor,
      waitingCharges,
      createdBy,
    } = req.body;

    const newPricingConfig = await PricingConfig.create({
      distance_base_price: distanceBasePrice,
      distance_additional_price: distanceAdditionalPrice,
      time_multiplier_factor: timeMultiplierFactor,
      waiting_charges: waitingCharges,
      created_by: createdBy,
    });

    res.status(201).send(newPricingConfig);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/api/pricing/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const pricingConfig = await PricingConfig.findByPk(id);

    if (!pricingConfig) return res.status(404).send("Not Found");

    res.status(200).send(pricingConfig);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.put("/api/pricing/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      distanceBasePrice,
      distanceAdditionalPrice,
      timeMultiplierFactor,
      waitingCharges,
      updatedBy,
    } = req.body;

    const pricingConfig = await PricingConfig.findByPk(id);

    if (!pricingConfig) return res.status(404).send("Not Found");

    await pricingConfig.update({
      distance_base_price: distanceBasePrice,
      distance_additional_price: distanceAdditionalPrice,
      time_multiplier_factor: timeMultiplierFactor,
      waiting_charges: waitingCharges,
      updated_by: updatedBy,
    });

    res.status(200).send(pricingConfig);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.delete("/api/pricing/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const pricingConfig = await PricingConfig.findByPk(id);

    if (!pricingConfig) return res.status(404).send("Not Found");

    await pricingConfig.destroy();

    res.status(200).send("Deleted");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// API to calculate pricing
app.post("/api/calculate", async (req, res) => {
  try {
    const { distance, time, waitTime, pricingId } = req.body;

    const pricing = await PricingConfig.findByPk(pricingId);

    if (!pricing)
      return res.status(404).send("Pricing configuration not found");

    const {
      distance_base_price,
      distance_additional_price,
      time_multiplier_factor,
      waiting_charges,
    } = pricing;

    const basePrice =
      JSON.parse(distance_base_price).find(
        (config) => distance <= config.maxDistance
      )?.price || 0;
    const additionalDistance = Math.max(
      0,
      distance -
        (JSON.parse(distance_base_price).find(
          (config) => distance <= config.maxDistance
        )?.maxDistance || 0)
    );
    const distanceCost = additionalDistance * distance_additional_price;
    const timeCost =
      time *
      (time < 60
        ? 1
        : JSON.parse(time_multiplier_factor).find((t) =>
            t.timeRange.includes(time)
          )?.multiplier || 1);
    const waitCost = Math.max(0, (waitTime - 3) / 3) * waiting_charges;

    const totalPrice = basePrice + distanceCost + timeCost + waitCost;
    res.send({ totalPrice });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
