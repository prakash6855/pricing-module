import { useState } from "react";
import { calculatePricing } from "../api/pricingApi";

function CalculatePricing() {
  const [formData, setFormData] = useState({
    distance: "",
    time: "",
    waitTime: "",
    pricingId: "",
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const pricingResult = await calculatePricing(formData);
      setResult(pricingResult);
    } catch (error) {
      console.error("Error calculating pricing:", error);
    }
  };

  return (
    <div>
      <h2>Calculate Pricing</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Distance:
          <input
            type="text"
            name="distance"
            value={formData.distance}
            onChange={handleChange}
          />
        </label>
        <label>
          Time:
          <input
            type="text"
            name="time"
            value={formData.time}
            onChange={handleChange}
          />
        </label>
        <label>
          Wait Time:
          <input
            type="text"
            name="waitTime"
            value={formData.waitTime}
            onChange={handleChange}
          />
        </label>
        <label>
          Pricing ID:
          <input
            type="text"
            name="pricingId"
            value={formData.pricingId}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Calculate</button>
      </form>
      {result && (
        <div>
          <h3>Calculation Result</h3>
          <p>Total Price: ${result.totalPrice}</p>
        </div>
      )}
    </div>
  );
}

export default CalculatePricing;
