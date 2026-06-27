import { useDispatch, useSelector } from "react-redux"
import { BudgetFilter } from "./BudgetFilter"
import { CityFilter } from "./CityFilter"
import { FuelFilter } from "./FuelFilter"
import { MakeFilter } from "./MakeFilter"
import { clearFilters } from "../../redux/actions/listingActions"

function SideBar() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.listing.filters || {});
  
  const hasActiveFilters = 
    (filters.fuelIds && filters.fuelIds.length > 0) ||
    (filters.makeIds && filters.makeIds.length > 0) ||
    filters.cityId !== null ||
    filters.budget !== null;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-header__title">Filters</h2>
        {hasActiveFilters && (
          <button
            type="button"
            className="sidebar-header__clear-btn"
            onClick={() => dispatch(clearFilters())}
          >
            Clear all
          </button>
        )}
      </div>

      <BudgetFilter />
      <FuelFilter />
      <MakeFilter />
      <CityFilter /> 
    </aside>
  )
}

export default SideBar