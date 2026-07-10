import { useDispatch, useSelector } from 'react-redux';
import { clearFilters } from '../../redux/actions/listingActions';

export default function NoCarsFound() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.listing.filters || {});

  const hasActiveFilters =
    (filters.fuelIds && filters.fuelIds.length > 0) ||
    (filters.makeIds && filters.makeIds.length > 0) ||
    filters.cityId != null ||
    filters.budget != null;

  return (
    <div className="no-cars-container">
      <div className="no-cars-card">
        <h3 className="no-cars-title">No Cars Found</h3>
        <p className="no-cars-description">
          We couldn't find any cars matching your current filters. Try relaxing your budget constraints, choosing other fuel types, or broadening your search.
        </p>
        {hasActiveFilters && (
          <button
            type="button"
            className="no-cars-btn"
            onClick={() => dispatch(clearFilters())}
          >
            Clear all filters
          </button>
        )}
      </div>
    </div>
  );
}
