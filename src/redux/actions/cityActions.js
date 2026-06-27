import { getCities } from "../../api/citiesApi";
import {
  FETCH_CITIES_REQUEST,
  FETCH_CITIES_SUCCESS,
  FETCH_CITIES_FAILURE,
} from "../types/cityType";

const fetchCitiesRequest = () => ({
  type: FETCH_CITIES_REQUEST,
});

const fetchCitiesSuccess = (cities) => ({
  type: FETCH_CITIES_SUCCESS,
  payload: cities,
});

const fetchCitiesFailure = (errorMessage) => ({
  type: FETCH_CITIES_FAILURE,
  payload: errorMessage,
});

export const fetchCities = () => {
  return async (dispatch) => {
    dispatch(fetchCitiesRequest());
    try {
      const data = await getCities();
      dispatch(fetchCitiesSuccess(data));
    } catch (err) {
      dispatch(fetchCitiesFailure(err.message || "Failed to fetch cities"));
    }
  };
};