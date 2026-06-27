import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export function SearchAutocomplete({
  options,
  value,
  onChange,
  getOptionLabel = (option) => option?.label || "",
  getSearchFields = (option) => [getOptionLabel(option)],
  renderOption,
  placeholder = "Search...",
  noOptionsText = "No results found",
  ...props
}) {
  const filterOptions = (options, { inputValue }) => {
    const normalizedQuery = (inputValue || "").toLowerCase().trim();
    if (!normalizedQuery) return options;

    const queryTerms = normalizedQuery.split(/\s+/);

    return options.filter((option) => {
      const searchFields = getSearchFields(option).filter(Boolean);
      const allWords = searchFields.flatMap((field) =>
        field.toLowerCase().trim().split(/\s+/)
      );

      return queryTerms.every((term) =>
        allWords.some((word) => word.startsWith(term))
      );
    });
  };

  return (
    <Autocomplete
      options={options}
      value={value}
      onChange={onChange}
      getOptionLabel={getOptionLabel}
      filterOptions={filterOptions}
      noOptionsText={noOptionsText}
      renderOption={renderOption}
      // Make sure the popup has custom styling matching the project and does not shift the layout
      sx={{
        width: '100%',
        '& .MuiOutlinedInput-root': {
          borderRadius: '999px', // round pill shape matching the project style
          paddingRight: '14px !important',
          backgroundColor: '#fff',
          transition: 'all 0.2s ease',
          '& fieldset': {
            borderColor: '#d7d7d7',
          },
          '&:hover fieldset': {
            borderColor: '#e53935', // Match red slider color
          },
          '&.Mui-focused fieldset': {
            borderColor: '#e53935',
            borderWidth: '1px',
            boxShadow: '0 0 0 2px rgba(229, 57, 53, 0.12)',
          },
        },
        '& .MuiInputBase-input': {
          fontSize: '0.9rem',
          padding: '0.35rem 0.5rem !important',
          color: '#1f2937',
        },
      }}
      slotProps={{
        paper: {
          sx: {
            boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
            borderRadius: '0.75rem',
            border: '1px solid #e5e7eb',
            marginTop: '6px',
            backgroundColor: '#fff',
            '& .MuiAutocomplete-noOptions': {
              fontSize: '0.85rem',
              color: '#6b7280',
              padding: '10px 16px',
            },
            '& .MuiAutocomplete-option': {
              padding: '8px 16px',
              '&[aria-selected="true"]': {
                backgroundColor: '#fef2f2', // Light red selection color
                color: '#e53935',
                fontWeight: 600,
              },
              '&.Mui-focused, &[aria-selected="true"].Mui-focused': {
                backgroundColor: '#f3f4f6', // Light gray hover color
              },
            },
          },
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          variant="outlined"
          fullWidth
          size="small"
        />
      )}
      {...props}
    />
  );
}
