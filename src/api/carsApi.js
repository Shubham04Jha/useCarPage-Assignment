import { buildCarsQuery } from "../utils/buildCarsQuery";
import { apiEndpoints } from "./apiConfig";

export async function getCars(filters, nextPageUrl = null, sort = null, options = {}) {
  const queryStr = buildCarsQuery(filters, sort);
  const url = nextPageUrl || (apiEndpoints.stocks + (queryStr.length ? '?' + queryStr : ''));
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Failed to fetch cars");
  }
  return response.json();
}