export const buildCarsQuery = (filters, page, excludeStockIds = []) => {
  const query = [];

  if (filters.fuelIds.length)
    query.push(`fuel=${filters.fuelIds.join("+")}`);

  if (filters.makeIds.length)
    query.push(`car=${filters.makeIds.join("+")}`);

  if (filters.cityId !== null)
    query.push(`city=${filters.cityId}`);

  if (filters.budget)
    query.push(`budget=${filters.budget.min}-${filters.budget.max ?? ''}`);

  if (page && page > 1) {
    query.push(`pn=${page}`);
  }

  if (excludeStockIds && excludeStockIds.length > 0) {
    query.push(`excludestocks=${excludeStockIds.join("+")}`);
  }

  return query.length ? `?${query.join("&")}` : "";
};