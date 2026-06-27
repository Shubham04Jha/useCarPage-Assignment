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

export const fetchCarsAsyncAction = (filters, page = 1, isPageLoad = false)=>{
  return async (dispatch, getState)=>{
    dispatch(fetchCarsRequest());
    try {
      const existingStocks = getState().cars?.data?.stocks ?? [];
      const excludeStockIds = isPageLoad ? existingStocks.map(car => car.profileId).filter(Boolean) : [];
      const data = await getCars(filters, page, excludeStockIds);
      const sort = getState().listing?.sort;
      if (data && data.stocks && sort) {
        data.stocks = sortCars(data.stocks, sort);
      }
      dispatch(fetchCarsSuccess(data, isPageLoad));
    } catch (err) {
      dispatch(fetchCarsFailure(err.message || "Failed to fetch cars"));
    }
  }
}