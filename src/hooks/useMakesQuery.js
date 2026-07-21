import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { getMakes } from '../api/makesApi';

export const useMakesQuery = () => {
  const query = useQuery({
    queryKey: ['makes'],
    queryFn: getMakes,
    staleTime: Infinity,
  });

  const makes = query.data ?? [];

  const makesById = useMemo(() => {
    return makes.reduce((acc, make) => {
      acc[make.makeId] = make;
      return acc;
    }, {});
  }, [makes]);

  return {
    ...query,
    makes,
    makesById,
  };
};
