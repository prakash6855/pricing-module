import { useState } from "react";
import { createPricingConfig } from "../api/pricingApi";
import "../styles/CreatePricing.css";

function CreatePricing() {
  const [formData, setFormData] = useState({
    distanceBasePrice: "",
    distanceAdditionalPrice: "",
    timeMultiplierFactor: "",
    waitingCharges: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPricingConfig(formData);
      alert("Pricing configuration created successfully.");
    } catch (error) {
      console.error("Error creating pricing config:", error);
    }
  };

  return (
    <div className="create-pricing">
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
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreatePricing;
