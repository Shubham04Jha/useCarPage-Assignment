import { useDispatch, useSelector } from 'react-redux';
import { setSort } from '../../redux/actions/listingActions';
import {
  SORT_COLUMN_PRICE,
  SORT_COLUMN_KM,
  SORT_COLUMN_YEAR,
  SORT_ORDER_ASC,
  SORT_ORDER_DESC
} from '../../constants/filterKeys';

function parseSortValue(value) {
  if (!value) {
    return null;
  }

  const [scStr, soStr] = value.split('-');
  const sc = Number(scStr);
  const so = Number(soStr);
  if (isNaN(sc) || isNaN(so)) {
    return null;
  }

  return { sc, so };
}

function getSortValue(sort) {
  if (!sort || sort.sc == null || sort.so == null) {
    return '';
  }

  return `${sort.sc}-${sort.so}`;
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
        <option value={`${SORT_COLUMN_PRICE}-${SORT_ORDER_ASC}`}>Price - Low to High</option>
        <option value={`${SORT_COLUMN_PRICE}-${SORT_ORDER_DESC}`}>Price - High to Low</option>
        <option value={`${SORT_COLUMN_KM}-${SORT_ORDER_ASC}`}>Kms Driven - Low to High</option>
        <option value={`${SORT_COLUMN_KM}-${SORT_ORDER_DESC}`}>Kms Driven - High to Low</option>
        <option value={`${SORT_COLUMN_YEAR}-${SORT_ORDER_ASC}`}>Year - Old to New</option>
        <option value={`${SORT_COLUMN_YEAR}-${SORT_ORDER_DESC}`}>Year - New to Old</option>
      </select>
    </div>
  );
}

export default SortDropdown;
