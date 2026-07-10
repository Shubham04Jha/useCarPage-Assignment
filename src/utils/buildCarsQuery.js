export const buildCarsQuery = (filters) => {
  const query = [];

  if (filters.fuelIds.length)
    query.push(`fuel=${filters.fuelIds.join("+")}`);

  if (filters.makeIds.length)
    query.push(`car=${filters.makeIds.join("+")}`);

  if (filters.cityId !== null)
    query.push(`city=${filters.cityId}`);

  if (filters.budget)
    query.push(`budget=${filters.budget.min}-${filters.budget.max ?? ''}`);

  return query.length ? `${query.join("&")}` : "";
};