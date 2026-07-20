import {
  ADD_FUEL,
  REMOVE_FUEL,

  ADD_MAKE,
  REMOVE_MAKE,

  SET_CITY,

  SET_BUDGET,

  SET_SORT,

  CLEAR_FILTERS,
} from '../types/listingType';

const initialState = {
  filters: {
    fuelIds: [],
    makeIds: [],
    cityId: null,
    budget: null,
  },
  sort: null,
};

export const listingReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FUEL:
      if (state.filters.fuelIds.includes(action.payload)) {
        return state;
      }

      return {
        ...state,
        filters: {
          ...state.filters,
          fuelIds: [...state.filters.fuelIds, action.payload],
        },
      };

    case REMOVE_FUEL:
      return {
        ...state,
        filters: {
          ...state.filters,
          fuelIds: state.filters.fuelIds.filter(id => id !== action.payload),
        },
      };

    case ADD_MAKE:
      if (state.filters.makeIds.includes(action.payload)) {
        return state;
      }

      return {
        ...state,
        filters: {
          ...state.filters,
          makeIds: [...state.filters.makeIds, action.payload],
        },
      };

    case REMOVE_MAKE:
      return {
        ...state,
        filters: {
          ...state.filters,
          makeIds: state.filters.makeIds.filter(id => id !== action.payload),
        },
      };
    case SET_CITY:
      return {
        ...state,
        filters: {
          ...state.filters,
          cityId: action.payload,
        },
      };
    case SET_BUDGET:
      return {
        ...state,
        filters: {
          ...state.filters,
          budget: action.payload,
        },
      };
    case SET_SORT:
      return {
        ...state,
        sort: action.payload,
      };
    case CLEAR_FILTERS:
      if (
        state.filters.fuelIds.length === 0 &&
        state.filters.makeIds.length === 0 &&
        state.filters.cityId === null &&
        state.filters.budget === null
      ) {
        return state;
      }
      return {
        ...state,
        filters: {
          ...initialState.filters,
        }
      };
    default:
      return state;
  }
}