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

export const addFuel = (fuelCode)=>{
  return {
    type: ADD_FUEL,
    payload: fuelCode,
  }
}

export const removeFuel = (fuelCode)=>{
  return {
    type: REMOVE_FUEL,
    payload: fuelCode,
  }
}

export const addMake = (makeId)=>{
  return {
    type: ADD_MAKE,
    payload: makeId,
  }
}

export const removeMake = (makeId)=>{
  return {
    type: REMOVE_MAKE,
    payload: makeId,
  }
}

export const setCity = (cityCode)=>{
  return {
    type: SET_CITY,
    payload: cityCode,
  }
}

export const setBudget = (budgetObject)=>{
  return{
    type: SET_BUDGET,
    payload: budgetObject,
  }
}

export const setSort = (sortObject)=>{
  return {
    type: SET_SORT,
    payload: sortObject,
  }
}

export const clearFilters = ()=>{
  return {
    type: CLEAR_FILTERS,
  }
}