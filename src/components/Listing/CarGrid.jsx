import { useMemo, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import CarCard from './CarCard';
import { sortCars } from '../../utils/sortCars';

import NoCarsFound from '../ui/NoCarsFound';

function CarsGrid({ onLoadMore, hasMore }) {
  const cars = useSelector((state) => state.cars?.data?.stocks ?? []);
  const sort = useSelector((state) => state.listing.sort);
  const loading = useSelector((state) => state.cars.loading);

  const totalCars = useSelector((state) => state.cars?.data?.totalCount ?? 0);

  const sortedCars = useMemo(() => sortCars(cars, sort), [cars, sort]);

  const observerRef = useRef(null);
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loading && onLoadMore) {
        onLoadMore();
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
  }, [hasMore, loading, onLoadMore]);

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
      <div ref={sentinelRef} style={{ height: '10px', margin: '5px 0' }} />
      {loading && (
        <div className="cars-grid__loading-more" style={{ textAlign: 'center', padding: '1rem', color: '#6b7280' }}>
          Loading more cars...
        </div>
      )}
    </div>
  );
}

export default CarsGrid;
