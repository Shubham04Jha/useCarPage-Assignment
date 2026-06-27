import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "./reducers/rootReducer";
import { thunk } from "redux-thunk";

const loadState = () => {
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
    // Ignore write errors (e.g. storage full)
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
  }
});