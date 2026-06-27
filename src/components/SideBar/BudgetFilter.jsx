import { useState, useEffect, useCallback } from "react";
import { CollapsibleHeader } from "../ui/CollapsibleHeader";
import { useDebouncedCallback } from "../../hooks/useDebounceCallback";
import { useDispatch, useSelector } from "react-redux";
import { setBudget } from "../../redux/actions/listingActions";
import { BUDGET_FILTER_DEBOUNCE_RATE } from "../../constants/debounceRates";
import Slider from "@mui/material/Slider";


const createBudgetObject = (minValue, maxValue) => {
  if (minValue === "" && maxValue === "") return null;

  const min = minValue === "" ? 0 : Number(minValue);
  const max = maxValue === "" ? null : Number(maxValue);

  return { min, max };
};

export function BudgetFilter() {
  const budget = useSelector((state) => state.listing.filters.budget);
  const dispatch = useDispatch();

  const min = budget?.min?.toString() ?? "";
  const max = budget?.max?.toString() ?? "";

  const handleBudgetChange = useCallback((newMin, newMax) => {
    const budgetObject = createBudgetObject(newMin, newMax);
    dispatch(setBudget(budgetObject));
  }, [dispatch]);

  return (
    <CollapsibleHeader title="Budget (Lakhs)">
      <BudgetSlider
        min={min}
        max={max}
        onChangeRange={handleBudgetChange}
      />
      <MinMaxBudgetBox
        min={min}
        max={max}
        onChangeRange={handleBudgetChange}
      />
    </CollapsibleHeader>
  );
}

function BudgetSlider({ min, max, onChangeRange }) {
  // Local state for immediate smooth rendering of the slider handles (0 to 21)
  const [localMin, setLocalMin] = useState(
    min === "" ? 0 : Math.max(0, Math.min(21, Number(min)))
  );
  const [localMax, setLocalMax] = useState(
    max === "" ? 21 : Math.max(0, Math.min(21, Number(max)))
  );

  // Sync local state when min/max props change from elsewhere (like typing in input box)
  useEffect(() => {
    setLocalMin(min === "" ? 0 : Math.max(0, Math.min(21, Number(min))));
    setLocalMax(max === "" ? 21 : Math.max(0, Math.min(21, Number(max))));
  }, [min, max]);

  // Debounced parent updates to onChangeRange to avoid lagging during dragging
  const debouncedUpdate = useDebouncedCallback((newMinVal, newMaxVal) => {
    onChangeRange(newMinVal, newMaxVal);
  }, BUDGET_FILTER_DEBOUNCE_RATE);

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    // Ensure they don't cross
    let [newMin, newMax] = newValue;
    if (activeThumb === 0) {
      newMin = Math.min(newMin, localMax);
    } else {
      newMax = Math.max(newMax, localMin);
    }

    // Update local state instantly so the slider dragging is smooth
    setLocalMin(newMin);
    setLocalMax(newMax);

    // Calculate the target values for parent state based on the required budget shapes
    let nextMinProp = "";
    let nextMaxProp = "";

    if (newMin === 0 && newMax === 21) {
      nextMinProp = "";
      nextMaxProp = "";
    } else if (newMax === 21) {
      nextMinProp = newMin.toString();
      nextMaxProp = "";
    } else {
      nextMinProp = newMin.toString();
      nextMaxProp = newMax.toString();
    }

    // Call the debounced callback to update parent state (and dispatch redux)
    debouncedUpdate(nextMinProp, nextMaxProp);
  };

  return (
    <div style={{ padding: "0 0.75rem", marginBottom: "1rem" }}>
      <Slider
        value={[localMin, localMax]}
        onChange={handleChange}
        valueLabelDisplay="auto"
        valueLabelFormat={(val) => (val === 21 ? "20+ Lakh" : `${val} Lakh`)}
        min={0}
        max={21}
        step={1}
        disableSwap
        sx={{
          color: "#e53935",
          "& .MuiSlider-thumb": {
            backgroundColor: "#e53935",
            "&:hover, &.Mui-focusVisible": {
              boxShadow: "0px 0px 0px 8px rgba(229, 57, 53, 0.16)",
            },
            "&.Mui-active": {
              boxShadow: "0px 0px 0px 14px rgba(229, 57, 53, 0.16)",
            },
          },
          "& .MuiSlider-track": {
            backgroundColor: "#e53935",
          },
          "& .MuiSlider-rail": {
            backgroundColor: "#e0e0e0",
          },
          "& .MuiSlider-valueLabel": {
            backgroundColor: "#e53935",
            color: "#fff",
          },
        }}
      />
    </div>
  );
}




function preventInvalidKeys(e) {
  if (["e", "E", "+", "-", "."].includes(e.key)) {
    e.preventDefault();
  }
};

function parseBudgetValue(value) {
  if (value === "") return null;
  if (!/^[0-9]+$/.test(value)) return null;
  return Number(value);
};

function validateBudgetInput(localMin, localMax) {
  if (localMin !== "" && !/^[0-9]+$/.test(localMin)) {
    return { valid: false, errorMessage: "Min must be a non-negative integer." };
  }

  if (localMax !== "" && !/^[0-9]+$/.test(localMax)) {
    return { valid: false, errorMessage: "Max must be a non-negative integer." };
  }

  const min = parseBudgetValue(localMin);
  const max = parseBudgetValue(localMax);

  if (min !== null && max !== null && min > max) {
    return { valid: false, errorMessage: "Min cannot be greater than max." };
  }

  return { valid: true, min, max };
};

function MinMaxBudgetBox({ min, max, onChangeRange }) {
  const [localMin, setLocalMin] = useState(min);
  const [localMax, setLocalMax] = useState(max);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setLocalMin(min);
    setLocalMax(max);
  }, [min, max]);

  const commitValues = () => {
    const validation = validateBudgetInput(localMin, localMax);

    if (!validation.valid) {
      setErrorMessage(validation.errorMessage);
      setLocalMin(min);
      setLocalMax(max);
      return;
    }

    setErrorMessage("");

    if (localMin !== min || localMax !== max) {
      onChangeRange(localMin, localMax);
    }
  };

  const handleMinChange = (e) => {
    setErrorMessage("");
    setLocalMin(e.target.value);
  };

  const handleMaxChange = (e) => {
    setErrorMessage("");
    setLocalMax(e.target.value);
  };

  const handleKeyDown = (e) => {
    preventInvalidKeys(e);
    if (e.key === "Enter") {
      commitValues();
    }
  };

  const handleBlur = () => {
    commitValues();
  };

  return (
    <div>
      <div className="budget-input-container">
        <input
          type="number"
          min={0}
          max={2000}
          step={1}
          value={localMin}
          onChange={handleMinChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          placeholder="Min"
          className="budget-input"
        />

        <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>to</span>

        <input
          type="number"
          min={0}
          max={2000}
          step={1}
          value={localMax}
          onChange={handleMaxChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          placeholder="Max"
          className="budget-input"
        />
      </div>
      {errorMessage && <p style={{ color: "red", margin: "0.5rem 0 0", fontSize: "0.8rem" }}>{errorMessage}</p>}
    </div>
  );
}