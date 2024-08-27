const API_URL = "http://localhost:5000/api";

export const createPricingConfig = async (data) => {
  const response = await fetch(`${API_URL}/pricing`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const getPricingConfig = async (id) => {
  const response = await fetch(`${API_URL}/pricing/${id}`);
  return response.json();
};

export const updatePricingConfig = async (id, data) => {
  const response = await fetch(`${API_URL}/pricing/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const deletePricingConfig = async (id) => {
  const response = await fetch(`${API_URL}/pricing/${id}`, {
    method: "DELETE",
  });
  return response.text();
};

export const calculatePricing = async (data) => {
  const response = await fetch(`${API_URL}/calculate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};
