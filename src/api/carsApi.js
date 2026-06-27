import { buildCarsQuery } from "../utils/buildCarsQuery";
import { apiEndpoints } from "./apiConfig";

export async function getCars(filters, page, excludeStockIds = []) {
  const query = buildCarsQuery(filters, page, excludeStockIds);
  const response = await fetch(apiEndpoints.stocks + query);
  if (!response.ok) {
    throw new Error("Failed to fetch cars");
  }
  return response.json();
}