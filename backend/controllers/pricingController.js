const { PricingConfig } = require("../models");

exports.createPricingConfig = async (req, res) => {
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
};

exports.getPricingConfig = async (req, res) => {
  try {
    const { id } = req.params;
    const pricingConfig = await PricingConfig.findByPk(id);

    if (!pricingConfig) return res.status(404).send("Not Found");

    res.status(200).send(pricingConfig);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.updatePricingConfig = async (req, res) => {
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
};

exports.deletePricingConfig = async (req, res) => {
  try {
    const { id } = req.params;
    const pricingConfig = await PricingConfig.findByPk(id);

    if (!pricingConfig) return res.status(404).send("Not Found");

    await pricingConfig.destroy();

    res.status(200).send("Deleted");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
