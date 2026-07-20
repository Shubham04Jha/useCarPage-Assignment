import { buildCarsQuery } from "./buildCarsQuery";
import { FUELS } from "../constants/fuel";
import {
  STORAGE_KEY_LISTING,
  QUERY_KEY_FUEL,
  QUERY_KEY_CAR,
  QUERY_KEY_CITY,
  QUERY_KEY_BUDGET,
  QUERY_KEY_SORT_COLUMN,
  QUERY_KEY_SORT_ORDER,
  SORT_COLUMN_PRICE,
  SORT_COLUMN_KM,
  SORT_COLUMN_YEAR,
  SORT_ORDER_ASC,
  SORT_ORDER_DESC
} from "../constants/filterKeys";
import { BUDGET_MIN_LAKHS, BUDGET_MAX_LAKHS } from "../constants/budgetLimits";

// parse url params => state
export const getStateFromUrl = () => {
  const params = new URLSearchParams(window.location.search);

  // Parse fuel
  let fuelIds = [];
  const fuelParam = params.get(QUERY_KEY_FUEL);
  if (fuelParam) {
    fuelIds = fuelParam
      .split(/[\s,+]+/)
      .map(Number)
      .filter(n => !isNaN(n) && n >= 0 && n < FUELS.length);
  }

  // Parse car (makeId)
  let makeIds = [];
  const makeParam = params.get(QUERY_KEY_CAR);
  if (makeParam) {
    makeIds = makeParam
      .split(/[\s,+]+/)
      .map(Number)
      .filter(n => !isNaN(n));
  }

  // Parse cityId
  let cityId = null;
  const cityParam = params.get(QUERY_KEY_CITY);
  if (cityParam) {
    const parsedCity = Number(cityParam);
    if (!isNaN(parsedCity)) {
      cityId = parsedCity;
    }
  }

  // Parse budget (format: min-max)
  let budget = null;
  const budgetParam = params.get(QUERY_KEY_BUDGET);
  if (budgetParam) {
    const parts = budgetParam.split("-");
    const parsedMin = parts[0] === "" ? 0 : Number(parts[0]);
    const parsedMax = (parts[1] === undefined || parts[1] === "") ? null : Number(parts[1]);
    if (
      !isNaN(parsedMin) && parsedMin >= BUDGET_MIN_LAKHS && parsedMin <= BUDGET_MAX_LAKHS &&
      (parsedMax === null || (!isNaN(parsedMax) && parsedMax >= BUDGET_MIN_LAKHS && parsedMax <= BUDGET_MAX_LAKHS)) &&
      (parsedMax === null || parsedMin <= parsedMax)
    ) {
      budget = { min: parsedMin, max: parsedMax };
    }
  }

  // Parse sort (sc and so parameters)
  let sort = null;
  const scParam = params.get(QUERY_KEY_SORT_COLUMN);
  const soParam = params.get(QUERY_KEY_SORT_ORDER);
  if (scParam !== null && soParam !== null) {
    const sc = Number(scParam);
    const so = Number(soParam);
    if (
      !isNaN(sc) && !isNaN(so) &&
      [SORT_COLUMN_PRICE, SORT_COLUMN_KM, SORT_COLUMN_YEAR].includes(sc) &&
      [SORT_ORDER_DESC, SORT_ORDER_ASC].includes(so)
    ) {
      sort = { sc, so };
    }
  }

  const hasValidParams =
    fuelIds.length > 0 ||
    makeIds.length > 0 ||
    cityId !== null ||
    budget !== null ||
    sort !== null;

  if (!hasValidParams) {
    return null;
  }

  return {
    filters: {
      fuelIds,
      makeIds,
      cityId,
      budget,
    },
    sort,
  };
};

// Convert state to query parameters search string
export const getSearchStringFromState = (state) => {
  try {
    const { filters, sort } = state;
    const queryString = buildCarsQuery(filters, sort);
    return queryString ? `?${queryString}` : '';
  } catch {
    return '';
  }
};

// state => url params
export const syncStateToUrl = (state) => {
  try {
    const newSearch = getSearchStringFromState(state);
    const newUrl = `${window.location.pathname}${newSearch}`;
    window.history.replaceState(null, "", newUrl);
  } catch {
    console.log('url serilization failed. Using default states')
  }
};

export const loadState = () => {
  // 1. Check URL parameters
  const urlState = getStateFromUrl();
  if (urlState !== null) {
    return urlState;
  }

  // 2. Check localStorage
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY_LISTING);
    if (serializedState === null) {
      return undefined;
    }
    const parsedState = JSON.parse(serializedState);

    // Validate structural integrity of the parsed state
    if (
      parsedState &&
      typeof parsedState === "object" &&
      parsedState.filters &&
      typeof parsedState.filters === "object"
    ) {
      return parsedState;
    }
    return undefined;
  } catch {
    console.error('Error getting saved data from localStorage');
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY_LISTING, serializedState);
  } catch {
    console.error('Error saving data to localStorage');
  }
};
