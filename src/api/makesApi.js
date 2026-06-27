import { apiEndpoints } from "./apiConfig";

export async function getMakes() {
  const response = await fetch(apiEndpoints.makes);
  if (!response.ok) {
    throw new Error("Failed to fetch cities");
  }
  return response.json();
}
