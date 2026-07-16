import { FETCH_CAR_FAILURE, FETCH_CAR_REQUEST, FETCH_CAR_SUCCESS } from "../types/carsType"

const initialState = {
  data: {
    stocks: [],
    newPageUrl: null,
    totalCount: 0,
  },
  loading: false,
  error: '',
}

export const carsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CAR_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case FETCH_CAR_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case FETCH_CAR_SUCCESS: {
      let mergedStocks = [];
      if (action.payload.isPageLoad) {
        const seen = new Set(state.data.stocks.map(c => c.stockId));
        const newStocks = (action.payload.stocks ?? []).filter(c => !seen.has(c.stockId));
        mergedStocks = [...state.data.stocks, ...newStocks];
      } else {
        const seen = new Set();
        mergedStocks = (action.payload.stocks ?? []).filter(c => {
          if (seen.has(c.stockId)) return false;
          seen.add(c.stockId);
          return true;
        });
      }
      return {
        ...state,
        data: {
          ...action.payload,
          stocks: mergedStocks,
        },
        loading: false,
        error: '',
      };
    }
    default:
      return state;
  }
}