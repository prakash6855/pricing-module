const { PricingConfig } = require("../models");

exports.calculatePricing = async (req, res) => {
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
};
