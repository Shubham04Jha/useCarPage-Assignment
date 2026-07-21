import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getCars } from '../api/carsApi';
import { sortCars } from '../utils/sortCars';

export const useCarsQuery = () => {
  const filters = useSelector((state) => state.listing.filters);
  const sort = useSelector((state) => state.listing.sort);

  // Normalize array filter order (fuelIds, makeIds) so selection order produces the exact same cache key!
  const normalizedFilters = useMemo(() => ({
    ...filters,
    fuelIds: filters.fuelIds ? [...filters.fuelIds].sort((a, b) => Number(a) - Number(b)) : [],
    makeIds: filters.makeIds ? [...filters.makeIds].sort((a, b) => Number(a) - Number(b)) : [],
  }), [filters]);

  return useInfiniteQuery({
    queryKey: ['cars', normalizedFilters, sort],
    queryFn: async ({ pageParam = null, signal }) => {
      const data = await getCars(normalizedFilters, pageParam, sort, { signal });
      if (data && data.stocks && sort) {
        data.stocks = sortCars(data.stocks, sort);
      }
      return data;
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage?.nextPageUrl ?? undefined,
  });
};
