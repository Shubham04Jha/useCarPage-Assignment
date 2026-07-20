import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCities, fetchMakes, fetchCarsAsyncAction } from '../redux';

export const useUsedCarsPage = () => {
  const filters = useSelector((state) => state.listing.filters);
  const sort = useSelector((state) => state.listing.sort);
  const dispatch = useDispatch();

  const totalCars = useSelector((state) => state.cars.data.totalCount ?? 0);
  const cityName = useSelector((state) => {
    const cityId = state.listing.filters.cityId;
    const cityObj = state.cities.byId[cityId];
    return cityObj ? cityObj.cityName : null;
  });

  useEffect(() => {
    dispatch(fetchCarsAsyncAction());
  }, [filters, sort, dispatch]);

  useEffect(() => {
    dispatch(fetchCities());
    dispatch(fetchMakes());
  }, [dispatch]);

  return {
    cityName,
    totalCars,
  };
};
