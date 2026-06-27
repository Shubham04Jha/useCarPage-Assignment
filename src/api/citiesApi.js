import { apiEndpoints } from "./apiConfig";

export async function getCities() {
  const response = await fetch(apiEndpoints.cities);
  if (!response.ok) {
    throw new Error("Failed to fetch cities");
  }
  return response.json();
}
