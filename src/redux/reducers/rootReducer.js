import { combineReducers } from "redux";
import { carsReducer } from "./carsReducer";
import { listingReducer } from "./listingReducer";
import { cityReducer } from "./cityReducer";
import { makeReducer } from "./makeReducer";

export const rootReducer = combineReducers({
  cars: carsReducer,
  listing: listingReducer,
  cities: cityReducer,
  makes: makeReducer,
});