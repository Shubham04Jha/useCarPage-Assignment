import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "./reducers/rootReducer";
import { thunk } from "redux-thunk";
import { loadState, saveState, syncStateToUrl } from "../utils/persistence";

const preloadedState = {
  listing: loadState(),
};

export const store = createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(thunk)
);

// Sync initial state on load
syncStateToUrl(store.getState().listing);
saveState(store.getState().listing);

let lastListing = store.getState().listing;
store.subscribe(() => {
  const listing = store.getState().listing;
  if (listing !== lastListing) {
    lastListing = listing;
    saveState(listing);
    syncStateToUrl(listing);
  }
});
