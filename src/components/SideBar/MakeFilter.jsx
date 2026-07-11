import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CollapsibleHeader } from "../ui/CollapsibleHeader";
import { POPULAR_PRIORITY_THRESHOLD } from "../../constants/make";
import { addMake, removeMake } from "../../redux/actions/listingActions";
import { SearchAutocomplete } from "../ui/SearchAutocomplete";

function MakeCheckboxItem({ make, checked, onChange }) {
  return (
    <label
      key={make.makeId}
      className="sidebar-option-label"
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(make.makeId, event.target.checked)}
      />
      <span>{make.makeName}</span>
    </label>
  );
}

export function MakeFilter() {
  const [showAllBrands, setShowAllBrands] = useState(false);
  const dispatch = useDispatch();
  const makes = useSelector((state) => state.makes.data);
  const makeIds = useSelector((state) => state.listing.filters.makeIds);

  const popularMakes = makes.filter(
    (make) => make.priorityOrder > POPULAR_PRIORITY_THRESHOLD
  );
  const allMakes = [...makes].sort((left, right) => left.makeName.localeCompare(right.makeName));

  const handleMakeChange = (makeId, checked) => {
    if (checked) {
      dispatch(addMake(makeId));
    } else {
      dispatch(removeMake(makeId));
    }
  };

  const handleSelectMake = (make) => {
    if (make) {
      const isCurrentlyChecked = makeIds.includes(make.makeId);
      handleMakeChange(make.makeId, !isCurrentlyChecked);
    }
  };

  const renderMakeList = (makeList) =>
    makeList.map((make) => (
      <MakeCheckboxItem
        key={make.makeId}
        make={make}
        checked={makeIds.includes(make.makeId)}
        onChange={handleMakeChange}
      />
    ));

  return (
    <CollapsibleHeader title="Make">
      <div className="filter-options-container">
        <SearchAutocomplete
          options={makes}
          value={null} // Keep it null so it acts as an action selector that clears after select
          onChange={(event, newValue) => handleSelectMake(newValue)}
          getOptionLabel={(make) => make?.makeName || ""}
          getSearchFields={(make) => [make.makeName, make.maskingName]}
          placeholder="Search brand"
          renderOption={(props, option) => {
            const { key, ...liProps } = props;
            const isChecked = makeIds.includes(option.makeId);
            return (
              <li key={option.makeId} {...liProps} className="autocomplete-item">
                <span className={`autocomplete-item-name ${isChecked ? 'autocomplete-item-name--selected' : ''}`}>
                  {option.makeName}
                </span>
                {isChecked && (
                  <span className="autocomplete-item-status">
                    ✓ Selected
                  </span>
                )}
              </li>
            );
          }}
        />

        <div className="filter-section-subtitle">
          Popular Brands
        </div>
        {renderMakeList(popularMakes)}

        {allMakes.length > 0 && (
          <>
            {showAllBrands && (
              <>
                <div className="filter-section-subtitle" style={{ marginTop: '0.5rem' }}>
                  All Brands
                </div>
                {renderMakeList(allMakes)}
              </>
            )}

            <button
              type="button"
              onClick={() => setShowAllBrands((prev) => !prev)}
              className="show-all-brands-btn"
            >
              {showAllBrands ? "Collapse" : "Show all brands"}
            </button>
          </>
        )}
      </div>
    </CollapsibleHeader>
  );
}
