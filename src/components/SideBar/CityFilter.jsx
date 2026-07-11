import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCity } from "../../redux";
import { CollapsibleHeader } from "../ui/CollapsibleHeader";
import { SearchAutocomplete } from "../ui/SearchAutocomplete";

export function CityFilter() {
  const dispatch = useDispatch();
  const cities = useSelector((state) => state.cities?.data || []);
  const selectedCityId = useSelector((state) => state.listing.filters.cityId);

  const popularCities = useMemo(() => {
    return [...cities].filter((city) => city.IsPopular);
  }, [cities]);

  const selectedCity = useMemo(() => {
    return cities.find((city) => city?.CityId === selectedCityId) || null;
  }, [cities, selectedCityId]);

  const handleSelectCity = (city) => {
    dispatch(setCity(city ? city.CityId : null));
  };

  return (
    <CollapsibleHeader title="City">
      <div className="filter-options-container">
        <SearchAutocomplete
          options={cities}
          value={selectedCity}
          onChange={(event, newValue) => handleSelectCity(newValue)}
          getOptionLabel={(city) => city?.CityName || ""}
          getSearchFields={(city) => [city.CityName, city.StateName, city.CityMaskingName]}
          placeholder="Search city"
          renderOption={(props, option) => {
            const { key, ...liProps } = props;
            return (
              <li key={option.CityId} {...liProps} className="autocomplete-item">
                <span className="autocomplete-item-name">{option.CityName}</span>
                <span className="autocomplete-item-sub">{option.StateName}</span>
              </li>
            );
          }}
        />

        {selectedCity && (
          <div className="selected-city-label">
            Selected: <strong>{selectedCity.CityName}</strong>
          </div>
        )}

        <div className="city-pills-container">
          {popularCities.map((city) => {
            const isActive = selectedCityId === city.CityId;

            return (
              <CityPill
                key={city.CityId}
                city={city}
                isActive={isActive}
                onSelect={handleSelectCity}
              />
            );
          })}
        </div>
      </div>
    </CollapsibleHeader>
  );
}

function CityPill({ city, isActive, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(isActive ? null : city)}
      className={`city-pill-btn ${isActive ? 'city-pill-btn--active' : ''}`}
    >
      {city.CityName}
    </button>
  );
}