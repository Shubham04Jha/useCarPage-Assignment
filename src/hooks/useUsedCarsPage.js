import { useSelector } from 'react-redux';
import { useCarsQuery } from './useCarsQuery';
import { useCitiesQuery } from './useCitiesQuery';

export const useUsedCarsPage = () => {
  const { data } = useCarsQuery();
  const { citiesById } = useCitiesQuery();

  const totalCars = data?.pages[0]?.totalCount ?? 0;
  const cityId = useSelector((state) => state.listing.filters.cityId);
  const cityObj = cityId ? citiesById[cityId] : null;
  const cityName = cityObj ? cityObj.cityName : null;

  return {
    cityName,
    totalCars,
  };
};
