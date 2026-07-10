import { createContext } from 'react';

export const UsedCarsContext = createContext();

export function UsedCarsProvider({ children, value }) {
  return (
    <UsedCarsContext.Provider value={value}>
      {children}
    </UsedCarsContext.Provider>
  );
}
