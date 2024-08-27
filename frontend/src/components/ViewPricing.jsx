import { useState } from "react";
import { getPricingConfig } from "../api/pricingApi";
import "../styles/ViewPricing.css";
function ViewPricing() {
  const [id, setId] = useState("");
  const [pricingConfig, setPricingConfig] = useState(null);

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handleFetch = async () => {
    try {
      const result = await getPricingConfig(id);
      setPricingConfig(result);
    } catch (error) {
      console.error("Error fetching pricing config:", error);
    }
  };

  return (
    <div className="view-pricing">
      <h2>View Pricing Configuration</h2>
      <label>
        ID:
        <input type="text" value={id} onChange={handleIdChange} />
      </label>
      <button onClick={handleFetch}>Fetch</button>
      {pricingConfig && (
        <div className="pricing-config">
          <h3>Pricing Configuration</h3>
          <pre>{JSON.stringify(pricingConfig, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default ViewPricing;
