import {
  QUERY_KEY_FUEL,
  QUERY_KEY_CAR,
  QUERY_KEY_CITY,
  QUERY_KEY_BUDGET
} from "../constants/filterKeys";

export const buildCarsQuery = (filters) => {
  const query = [];

  if (filters.fuelIds.length)
    query.push(`${QUERY_KEY_FUEL}=${filters.fuelIds.join("+")}`);

  if (filters.makeIds.length)
    query.push(`${QUERY_KEY_CAR}=${filters.makeIds.join("+")}`);

  if (filters.cityId !== null)
    query.push(`${QUERY_KEY_CITY}=${filters.cityId}`);

  if (filters.budget)
    query.push(`${QUERY_KEY_BUDGET}=${filters.budget.min}-${filters.budget.max ?? ''}`);

  return query.length ? `${query.join("&")}` : "";
};