import { useDispatch, useSelector } from 'react-redux';
import { setSort } from '../../redux/actions/listingActions';

function parseSortValue(value) {
  if (!value) {
    return null;
  }

  const [by, order] = value.split('-');
  if (!by || !order) {
    return null;
  }

  return { by, order };
}

function getSortValue(sort) {
  if (!sort || !sort.by || !sort.order) {
    return '';
  }

  return `${sort.by}-${sort.order}`;
}

function SortDropdown() {
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.listing.sort);

  const handleChange = (event) => {
    const sortPayload = parseSortValue(event.target.value);
    dispatch(setSort(sortPayload));
  };

  return (
    <div className="sort-dropdown-container">
      <select value={getSortValue(sort)} onChange={handleChange} className="sort-dropdown-select">
        <option value="">Best Match</option>
        <option value="price-asc">Price - Low to High</option>
        <option value="price-desc">Price - High to Low</option>
        <option value="makeYear-asc">Year - Old to New</option>
        <option value="makeYear-desc">Year - New to Old</option>
      </select>
    </div>
  );
}

export default SortDropdown;
