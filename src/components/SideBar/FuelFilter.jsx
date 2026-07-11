import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CollapsibleHeader } from "../ui/CollapsibleHeader";
import { FUELS } from "../../constants/fuel";
import { addFuel, removeFuel } from "../../redux/actions/listingActions";

export function FuelFilter() {
  const dispatch = useDispatch();
  const fuelIds = useSelector((state) => state.listing.filters.fuelIds);

  const handleFuelChange = (fuelId, checked) => {
    if (checked) {
      dispatch(addFuel(fuelId));
    } else {
      dispatch(removeFuel(fuelId));
    }
  };

  return (
    <>
      <CollapsibleHeader
        title="Fuel"
      >
        <div className="filter-options-container">
          {FUELS.map((fuel) => (
            <label
              key={fuel.id}
              className="sidebar-option-label"
            >
              <input
                type="checkbox"
                checked={fuelIds.includes(fuel.id)}
                onChange={(event) => handleFuelChange(fuel.id, event.target.checked)}
              />
              <span>{fuel.name}</span>
            </label>
          ))}
        </div>
      </CollapsibleHeader>
    </>
  );
}
