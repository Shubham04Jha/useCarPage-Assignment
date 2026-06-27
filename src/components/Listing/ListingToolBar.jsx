import AppliedFilters from './AppliedFilters';
import SortDropdown from './SortDropdown';

function ListingToolbar() {
  return (
    <div className="listing-toolbar">
      <AppliedFilters />
      <SortDropdown />
    </div>
  );
}

export default ListingToolbar;


