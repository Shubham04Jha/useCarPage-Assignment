import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCities, fetchMakes } from '../redux';
import { useCarsQuery } from './useCarsQuery';

export const useUsedCarsPage = () => {
  const dispatch = useDispatch();
  const { data } = useCarsQuery();

  const totalCars = data?.pages[0]?.totalCount ?? 0;
  const cityName = useSelector((state) => {
    const cityId = state.listing.filters.cityId;
    const cityObj = state.cities.byId[cityId];
    return cityObj ? cityObj.cityName : null;
  });

  useEffect(() => {
    dispatch(fetchCities());
    dispatch(fetchMakes());
  }, [dispatch]);

  return {
    cityName,
    totalCars,
  };
};
