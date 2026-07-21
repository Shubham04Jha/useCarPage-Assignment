import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { getCities } from '../api/citiesApi';

export const useCitiesQuery = () => {
  const query = useQuery({
    queryKey: ['cities'],
    queryFn: getCities,
    staleTime: Infinity,
  });

  const cities = query.data ?? [];

  const citiesById = useMemo(() => {
    return cities.reduce((acc, city) => {
      acc[city.cityId] = city;
      return acc;
    }, {});
  }, [cities]);

  return {
    ...query,
    cities,
    citiesById,
  };
};
