import { useContext } from 'react';
import { UsedCarsContext } from '../context/UsedCarsContext';

export const useUsedCarsContext = () => {
  const context = useContext(UsedCarsContext);
  if (!context) {
    throw new Error('useUsedCarsContext must be used within a UsedCarsProvider');
  }
  return context;
};
