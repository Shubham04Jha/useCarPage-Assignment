import { getMakes } from "../../api/makesApi";
import {
  FETCH_MAKES_REQUEST,
  FETCH_MAKES_SUCCESS,
  FETCH_MAKES_FAILURE,
} from "../types/makeType";

const fetchMakesRequest = () => {
  return {
    type: FETCH_MAKES_REQUEST,
  };
};

const fetchMakesSuccess = (makes) => {
  return {
    type: FETCH_MAKES_SUCCESS,
    payload: makes,
  };
};

const fetchMakesFailure = (errorMessage) => {
  return {
    type: FETCH_MAKES_FAILURE,
    payload: errorMessage,
  };
};

export const fetchMakes = () => {
  return async (dispatch) => {
    dispatch(fetchMakesRequest());
    try {
      const data = await getMakes();
      dispatch(fetchMakesSuccess(data));
    } catch (err) {
      dispatch(fetchMakesFailure(err.message || "Failed to fetch makes"));
    }
  };
};