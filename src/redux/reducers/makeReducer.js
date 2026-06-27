import {
  FETCH_MAKES_FAILURE,
  FETCH_MAKES_REQUEST,
  FETCH_MAKES_SUCCESS,
} from "../types/makeType";

const initialState = {
  loading: false,
  data: [],
  byId: {},
  error: "",
};

export const makeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MAKES_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case FETCH_MAKES_FAILURE:
      return {
        data: [],
        byId: {},
        loading: false,
        error: action.payload,
      };
    case FETCH_MAKES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        byId: action.payload.reduce((acc,cur)=>{
          acc[cur.makeId] = cur;
          return acc;
        },{}),
        loading: false,
        error: "",
      };
    default:
      return state;
  }
};