import { buildCarsQuery } from "../utils/buildCarsQuery";
import { apiEndpoints } from "./apiConfig";

export async function getCars(filters, nextPageUrl = null) {
  const url = nextPageUrl || (apiEndpoints.stocks + ((buildCarsQuery(filters).length) ? '?' + buildCarsQuery(filters) : ''));
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch cars");
  }
  return response.json();
}