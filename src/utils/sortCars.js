import {
  SORT_COLUMN_PRICE,
  SORT_COLUMN_KM,
  SORT_COLUMN_YEAR,
  SORT_ORDER_ASC
} from "../constants/filterKeys";

export function getCarValue(car, sortColumn) {
  switch (Number(sortColumn)) {
    case SORT_COLUMN_PRICE:
      return Number(car.priceNumeric ?? 0);
    case SORT_COLUMN_KM:
      return Number(car.kmDriven ?? 0);
    case SORT_COLUMN_YEAR:
      return Number(car.makeYear ?? 0);
    default:
      return 0;
  }
}

export function sortCars(cars, sort) {
  if (!cars) return [];
  if (!sort || sort.sc == null || sort.so == null) {
    return cars;
  }

  return [...cars].sort((leftCar, rightCar) => {
    const leftValue = getCarValue(leftCar, sort.sc);
    const rightValue = getCarValue(rightCar, sort.sc);
    return Number(sort.so) === SORT_ORDER_ASC ? leftValue - rightValue : rightValue - leftValue;
  });
}
