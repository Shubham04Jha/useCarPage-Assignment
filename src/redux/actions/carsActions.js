import { getCars } from "../../api/carsApi";
import { 
  FETCH_CAR_FAILURE,
  FETCH_CAR_REQUEST,
  FETCH_CAR_SUCCESS 
} from "../types/carsType";
import { sortCars } from "../../utils/sortCars";

const fetchCarsRequest = ()=>{
  return {
    type: FETCH_CAR_REQUEST,
  }
}; 

const fetchCarsFailure = (errorMessage)=>{
  return {
    type: FETCH_CAR_FAILURE,
    payload: errorMessage,
  }
};

const fetchCarsSuccess = (carsData, isPageLoad = false)=>{
  return {
    type: FETCH_CAR_SUCCESS,
    payload: { ...carsData, isPageLoad },
  }
};

export const fetchCarsAsyncAction = (isPageLoad = false) => {
  return async (dispatch, getState) => {
    dispatch(fetchCarsRequest());
    try {
      const state = getState();
      const { filters, sort } = state.listing;
      const nextPageUrl = isPageLoad ? (state.cars?.data?.nextPageUrl ?? null) : null;
      const data = await getCars(filters, nextPageUrl, sort);
      if (data && data.stocks && sort) {
        data.stocks = sortCars(data.stocks, sort);
      }
      dispatch(fetchCarsSuccess(data, isPageLoad));
    } catch (err) {
      dispatch(fetchCarsFailure(err.message || "Failed to fetch cars"));
    }
  };
};