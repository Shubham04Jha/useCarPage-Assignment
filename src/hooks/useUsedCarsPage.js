import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCities, fetchMakes, fetchCarsAsyncAction } from '../redux';
import { MAX_CAR_FETCH_LIMIT } from '../constants/infiniteFetch';

export const useUsedCarsPage = () => {
  const filters = useSelector((state) => state.listing.filters);
  const dispatch = useDispatch();

  const cars = useSelector((state) => state.cars.data.stocks ?? []);
  const loading = useSelector((state) => state.cars.loading);
  const totalCars = useSelector((state) => state.cars.data.totalCount ?? 0);
  const nextPageUrl = useSelector((state) => state.cars.data.nextPageUrl ?? null);
  const cityName = useSelector((state) => {
    const cityId = state.listing.filters.cityId;
    const cityObj = state.cities.byId[cityId];
    return cityObj ? cityObj.CityName : 'India';
  });

  const hasMore = cars.length < Math.min(totalCars, MAX_CAR_FETCH_LIMIT);

  useEffect(() => {
    dispatch(fetchCarsAsyncAction(filters, false, null));
  }, [filters, dispatch]);

  const handleLoadMore = () => {
    if (loading || !hasMore || !nextPageUrl) return;
    dispatch(fetchCarsAsyncAction(filters, true, nextPageUrl));
  };

  useEffect(() => {
    dispatch(fetchCities());
    dispatch(fetchMakes());
  }, [dispatch]);

  return {
    cityName,
    onLoadMore: handleLoadMore,
    hasMore,
    totalCars,
    loading,
  };
};
