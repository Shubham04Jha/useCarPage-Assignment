import {
  QUERY_KEY_FUEL,
  QUERY_KEY_CAR,
  QUERY_KEY_CITY,
  QUERY_KEY_BUDGET,
  QUERY_KEY_SORT_COLUMN,
  QUERY_KEY_SORT_ORDER
} from "../constants/filterKeys";

export const buildCarsQuery = (filters, sort = null) => {
  const query = [];

  if (filters?.fuelIds?.length)
    query.push(`${QUERY_KEY_FUEL}=${filters.fuelIds.join("+")}`);

  if (filters?.makeIds?.length)
    query.push(`${QUERY_KEY_CAR}=${filters.makeIds.join("+")}`);

  if (filters?.cityId !== null && filters?.cityId !== undefined)
    query.push(`${QUERY_KEY_CITY}=${filters.cityId}`);

  if (filters?.budget)
    query.push(`${QUERY_KEY_BUDGET}=${filters.budget.min}-${filters.budget.max ?? ''}`);

  if (sort && sort.sc != null && sort.so != null) {
    query.push(`${QUERY_KEY_SORT_COLUMN}=${sort.sc}`);
    query.push(`${QUERY_KEY_SORT_ORDER}=${sort.so}`);
  }

  return query.length ? `${query.join("&")}` : "";
};