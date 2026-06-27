export function getCarValue(car, sortBy) {
  switch (sortBy) {
    case 'price':
      return Number(car.priceNumeric);
    case 'makeYear':
      return car.makeYear;
    default:
      return 0;
  }
}

export function sortCars(cars, sort) {
  if (!cars) return [];
  if (!sort?.by || !sort?.order) {
    return cars;
  }

  return [...cars].sort((leftCar, rightCar) => {
    const leftValue = getCarValue(leftCar, sort.by);
    const rightValue = getCarValue(rightCar, sort.by);
    return sort.order === 'asc' ? leftValue - rightValue : rightValue - leftValue;
  });
}
