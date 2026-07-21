import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import CarCard from './CarCard';
import { sortCars } from '../../utils/sortCars';
import { useCarsQuery } from '../../hooks/useCarsQuery';
import NoCarsFound from '../ui/NoCarsFound';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';

function CarsGrid() {
  const { 
    data, 
    isLoading, 
    isFetchingNextPage, 
    fetchNextPage, 
    hasNextPage 
  } = useCarsQuery();

  const sort = useSelector((state) => state.listing.sort);
  const filters = useSelector((state) => state.listing.filters);

  // Flatten infinite scroll pages into a single stocks array
  const cars = useMemo(() => {
    return data?.pages.flatMap((page) => page.stocks ?? []) ?? [];
  }, [data]);

  const totalCars = data?.pages[0]?.totalCount ?? 0;
  const sortedCars = useMemo(() => sortCars(cars, sort), [cars, sort]);

  // Scroll to the top of the window when filters or sort change
  useScrollToTop([filters, sort]);

  // Infinite Scroll Observer using custom hook withLatestRef pattern
  const sentinelRef = useInfiniteScroll({
    callback: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    hasMore: hasNextPage,
    loading: isFetchingNextPage,
  });

  if (isLoading && sortedCars.length === 0) {
    return <div className="cars-grid__empty">Loading cars...</div>;
  }

  if (!isLoading && (sortedCars.length === 0 || totalCars === 0)) {
    return <NoCarsFound />;
  }

  return (
    <div className="cars-grid-container">
      <div className="cars-grid" role="list">
        {sortedCars.map((car) => (
          <CarCard
            key={car.stockId}
            car={car}
          />
        ))}
      </div>
      {/* Sentinel element for infinite scroll */}
      <div ref={sentinelRef} className="sentinel-spacer" />
      {isFetchingNextPage && (
        <div className="cars-grid__loading-more loading-more-label">
          Loading more cars...
        </div>
      )}
    </div>
  );
}

export default CarsGrid;
