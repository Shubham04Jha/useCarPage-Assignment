import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCity } from "../../redux";
import { CollapsibleHeader } from "../ui/CollapsibleHeader";
import { SearchAutocomplete } from "../ui/SearchAutocomplete";
import { useCitiesQuery } from "../../hooks/useCitiesQuery";

export function CityFilter() {
  const dispatch = useDispatch();
  const { cities } = useCitiesQuery();
  const selectedCityId = useSelector((state) => state.listing.filters.cityId);

  const popularCities = useMemo(() => {
    return [...cities].filter((city) => city.isPopular);
  }, [cities]);

  const selectedCity = useMemo(() => {
    return cities.find((city) => city?.cityId === selectedCityId) || null;
  }, [cities, selectedCityId]);

  const handleSelectCity = (city) => {
    dispatch(setCity(city ? city.cityId : null));
  };

  return (
    <CollapsibleHeader title="City">
      <div className="filter-options-container">
        <SearchAutocomplete
          options={cities}
          value={selectedCity}
          onChange={(event, newValue) => handleSelectCity(newValue)}
          getOptionLabel={(city) => city?.cityName || ""}
          getSearchFields={(city) => [city.cityName, city.stateName, city.cityMaskingName]}
          placeholder="Search city"
          renderOption={(props, option) => {
            const { key, ...liProps } = props;
            return (
              <li key={option.cityId} {...liProps} className="autocomplete-item">
                <span className="autocomplete-item-name">{option.cityName}</span>
                <span className="autocomplete-item-sub">{option.stateName}</span>
              </li>
            );
          }}
        />

        {selectedCity && (
          <div className="selected-city-label">
            Selected: <strong>{selectedCity.cityName}</strong>
          </div>
        )}

        <div className="city-pills-container">
          {popularCities.map((city) => {
            const isActive = selectedCityId === city.cityId;

            return (
              <CityPill
                key={city.cityId}
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
      {city.cityName}
    </button>
  );
}