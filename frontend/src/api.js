const API_URL = "http://localhost:5000/api";

export const fetchPricingList = async () => {
  const response = await fetch(`${API_URL}/pricing`);
  return response.json();
};

export const fetchPricingById = async (id) => {
  const response = await fetch(`${API_URL}/pricing/${id}`);
  return response.json();
};

export const createPricing = async (data) => {
  const response = await fetch(`${API_URL}/pricing`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const updatePricing = async (id, data) => {
  const response = await fetch(`${API_URL}/pricing/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const deletePricing = async (id) => {
  await fetch(`${API_URL}/pricing/${id}`, {
    method: "DELETE",
  });
};

export const calculatePrice = async (data) => {
  const response = await fetch(`${API_URL}/calculate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};
