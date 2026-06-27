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
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "0.5rem" }}>
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
              <li key={option.CityId} {...liProps} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <span style={{ fontSize: '0.875rem', color: '#1f2937', fontWeight: 500 }}>{option.CityName}</span>
                <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>{option.StateName}</span>
              </li>
            );
          }}
        />

        {selectedCity && (
          <div style={{ fontSize: "0.85rem", color: "#4b5563" }}>
            Selected: <strong style={{ color: "#e53935" }}>{selectedCity.CityName}</strong>
          </div>
        )}

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
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
      style={{
        border: isActive ? "1px solid #e53935" : "1px solid #d1d5db",
        backgroundColor: isActive ? "#fef2f2" : "#fff",
        color: isActive ? "#e53935" : "#374151",
        borderRadius: "999px",
        padding: "0.35rem 0.7rem",
        cursor: "pointer",
        fontSize: "0.8rem",
        fontWeight: isActive ? 600 : 400,
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.borderColor = "#e53935";
          e.currentTarget.style.color = "#e53935";
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.borderColor = "#d1d5db";
          e.currentTarget.style.color = "#374151";
        }
      }}
    >
      {city.CityName}
    </button>
  );
}