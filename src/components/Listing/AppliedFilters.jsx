import { useDispatch, useSelector } from 'react-redux';
import { FUEL_BY_ID } from '../../constants/fuel';
import {
  removeFuel,
  removeMake,
  setBudget,
  setCity,
  clearFilters,
} from '../../redux/actions/listingActions';

function getFuelName(fuelId) {
  const fuel = FUEL_BY_ID[fuelId];
  return fuel ? fuel.name : 'Fuel';
}

function formatBudgetLabel(budget) {
  if (!budget) {
    return '';
  }

  const { min, max } = budget;
  if (max === null) {
    return `${min}+ Lakhs`;
  }

  return `${min} - ${max} Lakhs`;
}

function AppliedFilters() {
  const dispatch = useDispatch();
  const { fuelIds, makeIds, cityId, budget } = useSelector(
    (state) => state.listing.filters
  );
  const makesById = useSelector((state) => state.makes.byId);
  const citiesById = useSelector((state) => state.cities.byId);

  const filterPills = [];

  fuelIds.forEach((fuelId) => {
    filterPills.push({
      key: `fuel-${fuelId}`,
      label: getFuelName(fuelId),
      onRemove: () => dispatch(removeFuel(fuelId)),
    });
  });

  makeIds.forEach((makeId) => {
    const make = makesById[makeId];
    filterPills.push({
      key: `make-${makeId}`,
      label: make?.makeName ?? 'Make',
      onRemove: () => dispatch(removeMake(makeId)),
    });
  });

  if (cityId !== null && cityId !== undefined) {
    const city = citiesById[cityId];
    filterPills.push({
      key: `city-${cityId}`,
      label: city?.CityName ?? 'City',
      onRemove: () => dispatch(setCity(null)),
    });
  }

  if (budget) {
    filterPills.push({
      key: 'budget',
      label: formatBudgetLabel(budget),
      onRemove: () => dispatch(setBudget(null)),
    });
  }

  if (filterPills.length === 0) {
    return null;
  }

  return (
    <div className="applied-filters-container">
      {filterPills.map(({ key, label, onRemove }) => (
        <div key={key} className="applied-filter-pill">
          <span>{label}</span>
          <button type="button" className="applied-filter-pill__close" onClick={onRemove}>
            ×
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => dispatch(clearFilters())}
        className="sidebar-header__clear-btn"
        style={{ marginLeft: '0.5rem' }}
      >
        Clear all
      </button>
    </div>
  );
}

export default AppliedFilters;
