import {
  FETCH_CITIES_FAILURE,
  FETCH_CITIES_REQUEST,
  FETCH_CITIES_SUCCESS,
} from "../types/cityType";

const initialState = {
  loading: false,
  data: [],
  byId: {},
  error: "",
};

export const cityReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CITIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case FETCH_CITIES_FAILURE:
      return {
        data: [],
        byId: {},
        loading: false,
        error: action.payload,
      };
    case FETCH_CITIES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        byId: action.payload.reduce((acc,cur)=>{
          acc[cur.CityId] = cur;
          return acc;
        },{}),
        loading: false,
        error: "",
      };
    default:
      return state;
  }
};