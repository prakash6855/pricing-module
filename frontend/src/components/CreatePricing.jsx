import { useState } from "react";
import { createPricingConfig } from "../api/pricingApi";

function CreatePricing() {
  const [formData, setFormData] = useState({
    distanceBasePrice: "",
    distanceAdditionalPrice: "",
    timeMultiplierFactor: "",
    waitingCharges: "",
    createdBy: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createPricingConfig(formData);
      alert("Pricing configuration created: " + JSON.stringify(result));
    } catch (error) {
      console.error("Error creating pricing config:", error);
    }
  };

  return (
    <div>
      <h2>Create Pricing Configuration</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Distance Base Price:
          <input
            type="text"
            name="distanceBasePrice"
            value={formData.distanceBasePrice}
            onChange={handleChange}
          />
        </label>
        <label>
          Distance Additional Price:
          <input
            type="text"
            name="distanceAdditionalPrice"
            value={formData.distanceAdditionalPrice}
            onChange={handleChange}
          />
        </label>
        <label>
          Time Multiplier Factor:
          <input
            type="text"
            name="timeMultiplierFactor"
            value={formData.timeMultiplierFactor}
            onChange={handleChange}
          />
        </label>
        <label>
          Waiting Charges:
          <input
            type="text"
            name="waitingCharges"
            value={formData.waitingCharges}
            onChange={handleChange}
          />
        </label>
        <label>
          Created By:
          <input
            type="text"
            name="createdBy"
            value={formData.createdBy}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreatePricing;
