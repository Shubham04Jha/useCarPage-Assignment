import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "./reducers/rootReducer";
import { thunk } from "redux-thunk";
import { buildCarsQuery } from "../utils/buildCarsQuery";
import { FUELS } from "../constants/fuel";

// parse url params => state
const getStateFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  // check current url param
  const hasUrlParam = [
    "fuel",
    "car",
    "budget",
    "sort"
  ].some(key => params.has(key));
  
  if (!hasUrlParam) {
    return null;
  }

  // Parse fuel
  let fuelIds = [];
  const fuelParam = params.get("fuel");
  if (fuelParam) {
    fuelIds = fuelParam
      .split(/[\s,+]+/)
      .map(Number)
      .filter(n => !isNaN(n)&&n>=0&&n<FUELS.length);
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
const syncStateToUrl = (state) => {
  try {
    const params = new URLSearchParams(window.location.search);
    
    // Clear old filter-related keys
    const keysToRemove = ["fuel", "car", "city", "budget", "sort"];
    keysToRemove.forEach(k => params.delete(k));

    const { filters, sort } = state;
    
    const filterParamString = buildCarsQuery(filters);
    
    const sortParamString = (sort && sort.by && sort.order)?`sort=${sort.by}-${sort.order}`:'';

    const newSearch = filterParamString+sortParamString;

    const newUrl = `${window.location.pathname}${newSearch ?('?'+ newSearch) : ""}`;

    window.history.replaceState(null, "", newUrl);
  } catch (err) {
    console.log('url serilization failed. Using default states')
  }
};

const loadState = () => {
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
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("listing", serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

const preloadedState = {
  listing: loadState(),
};

export const store = createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(thunk)
);

let lastListing = store.getState().listing;
store.subscribe(() => {
  const listing = store.getState().listing;
  if (listing !== lastListing) {
    lastListing = listing;
    saveState(listing);
    syncStateToUrl(listing);
  }
});
