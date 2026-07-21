import { combineReducers } from "redux";
import { listingReducer } from "./listingReducer";
import { cityReducer } from "./cityReducer";
import { makeReducer } from "./makeReducer";

export const rootReducer = combineReducers({
  listing: listingReducer,
  cities: cityReducer,
  makes: makeReducer,
});