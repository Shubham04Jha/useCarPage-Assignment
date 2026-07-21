import { useInfiniteQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { getCars } from '../api/carsApi';
import { sortCars } from '../utils/sortCars';

export const useCarsQuery = () => {
  const filters = useSelector((state) => state.listing.filters);
  const sort = useSelector((state) => state.listing.sort);

  return useInfiniteQuery({
    queryKey: ['cars', filters, sort],
    queryFn: async ({ pageParam = null, signal }) => {
      const data = await getCars(filters, pageParam, sort, { signal });
      if (data && data.stocks && sort) {
        data.stocks = sortCars(data.stocks, sort);
      }
      return data;
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage?.nextPageUrl ?? undefined,
  });
};
