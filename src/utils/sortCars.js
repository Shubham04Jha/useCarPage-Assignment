import {
  SORT_BY_PRICE,
  SORT_BY_YEAR,
  SORT_ORDER_ASC
} from "../constants/filterKeys";

export function getCarValue(car, sortBy) {
  switch (sortBy) {
    case SORT_BY_PRICE:
      return Number(car.priceNumeric);
    case SORT_BY_YEAR:
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
    return sort.order === SORT_ORDER_ASC ? leftValue - rightValue : rightValue - leftValue;
  });
}
