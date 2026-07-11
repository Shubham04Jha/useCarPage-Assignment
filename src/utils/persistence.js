import { buildCarsQuery } from "./buildCarsQuery";
import { FUELS } from "../constants/fuel";

// parse url params => state
export const getStateFromUrl = () => {
  const params = new URLSearchParams(window.location.search);

  // Parse fuel
  let fuelIds = [];
  const fuelParam = params.get("fuel");
  if (fuelParam) {
    fuelIds = fuelParam
      .split(/[\s,+]+/)
      .map(Number)
      .filter(n => !isNaN(n) && n >= 0 && n < FUELS.length);
  }

  // Parse car (makeId)
  let makeIds = [];
  const makeParam = params.get("car");
  if (makeParam) {
    makeIds = makeParam
      .split(/[\s,+]+/)
      .map(Number)
      .filter(n => !isNaN(n));
  }

  // Parse cityId
  let cityId = null;
  const cityParam = params.get("city");
  if (cityParam) {
    const parsedCity = Number(cityParam);
    if (!isNaN(parsedCity)) {
      cityId = parsedCity;
    }
  }

  // Parse budget (format: min-max)
  let budget = null;
  const budgetParam = params.get("budget");
  if (budgetParam) {
    const parts = budgetParam.split("-");
    const min = parts[0] === "" ? 0 : Number(parts[0]);
    const max = (parts[1] === undefined || parts[1] === "") ? null : Number(parts[1]);
    if (!isNaN(min) && (max === null || !isNaN(max))) {
      budget = { min, max };
    }
  }

  // Parse sort (format: by-order)
  let sort = null;
  const sortParam = params.get("sort");
  if (sortParam) {
    const [by, order] = sortParam.split("-");
    if (by && order && (by === "price" || by === "makeYear") && (order === "asc" || order === "desc")) {
      sort = { by, order };
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

// state => url params
export const syncStateToUrl = (state) => {
  try {
    const params = new URLSearchParams(window.location.search);

    // Clear old filter-related keys
    const keysToRemove = ["fuel", "car", "city", "budget", "sort"];
    keysToRemove.forEach(k => params.delete(k));

    const { filters, sort } = state;

    const filterParamString = buildCarsQuery(filters);

    const sortParamString = (sort && sort.by && sort.order) ? `sort=${sort.by}-${sort.order}` : '';

    const newSearch = [filterParamString, sortParamString].filter(Boolean).join("&");

    const newUrl = `${window.location.pathname}${newSearch ? ('?' + newSearch) : ""}`;

    window.history.replaceState(null, "", newUrl);
  } catch (err) {
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
    const serializedState = localStorage.getItem("listing");
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
  } catch (err) {
    console.error('Error getting saved data from localStorage');
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("listing", serializedState);
  } catch (err) {
    console.error('Error saving data to localStorage');
  }
};
