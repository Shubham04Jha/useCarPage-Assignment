import { useMemo, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CarCard from './CarCard';
import { sortCars } from '../../utils/sortCars';
import { fetchCarsAsyncAction } from '../../redux';
import { MAX_CAR_FETCH_LIMIT } from '../../constants/infiniteFetch';

import NoCarsFound from '../ui/NoCarsFound';

function CarsGrid() {
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.cars?.data?.stocks ?? []);
  const sort = useSelector((state) => state.listing.sort);
  const loading = useSelector((state) => state.cars.loading);
  const totalCars = useSelector((state) => state.cars?.data?.totalCount ?? 0);
  const nextPageUrl = useSelector((state) => state.cars?.data?.nextPageUrl ?? null);
  const filters = useSelector((state) => state.listing.filters);

  const sortedCars = useMemo(() => sortCars(cars, sort), [cars, sort]);
  const hasMore = cars.length < Math.min(totalCars, MAX_CAR_FETCH_LIMIT);

  const observerRef = useRef(null);
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loading && nextPageUrl != null) {
        dispatch(fetchCarsAsyncAction(filters, true, nextPageUrl));
      }
    });

    if (sentinelRef.current) {
      observerRef.current.observe(sentinelRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, loading, nextPageUrl, filters, dispatch]);

  if (loading && sortedCars.length === 0) {
    return <div className="cars-grid__empty">Loading cars...</div>;
  }

  if (!loading && (sortedCars.length === 0 || totalCars === 0)) {
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
      {loading && (
        <div className="cars-grid__loading-more loading-more-label">
          Loading more cars...
        </div>
      )}
    </div>
  );
}

export default CarsGrid;
