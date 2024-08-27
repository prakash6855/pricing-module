import { useState } from "react";
import { updatePricingConfig } from "../api/pricingApi";
import "../styles/UpdatePricing.css";

function UpdatePricing() {
  const [id, setId] = useState("");
  const [formData, setFormData] = useState({
    distanceBasePrice: "",
    distanceAdditionalPrice: "",
    timeMultiplierFactor: "",
    waitingCharges: "",
    updatedBy: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await updatePricingConfig(id, formData);
      alert("Pricing configuration updated: " + JSON.stringify(result));
    } catch (error) {
      console.error("Error updating pricing config:", error);
    }
  };

  return (
    <div className="update-pricing">
      <h2>Update Pricing Configuration</h2>
      <form onSubmit={handleSubmit}>
        <label>
          ID:
          <input type="text" value={id} onChange={handleIdChange} />
        </label>
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
          Updated By:
          <input
            type="text"
            name="updatedBy"
            value={formData.updatedBy}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdatePricing;
