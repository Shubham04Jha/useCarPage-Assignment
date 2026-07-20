import { describe, it, expect } from 'vitest';
import { buildCarsQuery } from '../../src/utils/buildCarsQuery';

describe('buildCarsQuery', () => {
  it('should return empty string when filters are empty', () => {
    const filters = {
      fuelIds: [],
      makeIds: [],
      cityId: null,
      budget: null,
    };
    expect(buildCarsQuery(filters)).toBe('');
  });

  it('should format fuel query parameter with multiple ids', () => {
    const filters = {
      fuelIds: [1, 2],
      makeIds: [],
      cityId: null,
      budget: null,
    };
    expect(buildCarsQuery(filters)).toBe('fuel=1+2');
  });

  it('should format car query parameter with multiple ids', () => {
    const filters = {
      fuelIds: [],
      makeIds: [10, 20],
      cityId: null,
      budget: null,
    };
    expect(buildCarsQuery(filters)).toBe('car=10+20');
  });

  it('should format city query parameter', () => {
    const filters = {
      fuelIds: [],
      makeIds: [],
      cityId: 3,
      budget: null,
    };
    expect(buildCarsQuery(filters)).toBe('city=3');
  });

  it('should format budget query parameter when both min and max are provided', () => {
    const filters = {
      fuelIds: [],
      makeIds: [],
      cityId: null,
      budget: { min: 1, max: 5 },
    };
    expect(buildCarsQuery(filters)).toBe('budget=1-5');
  });

  it('should format budget query parameter when only min is provided', () => {
    const filters = {
      fuelIds: [],
      makeIds: [],
      cityId: null,
      budget: { min: 2, max: null },
    };
    expect(buildCarsQuery(filters)).toBe('budget=2-');
  });

  it('should combine multiple parameters correctly with &', () => {
    const filters = {
      fuelIds: [1],
      makeIds: [10],
      cityId: 3,
      budget: { min: 1, max: 5 },
    };
    expect(buildCarsQuery(filters)).toBe('fuel=1&car=10&city=3&budget=1-5');
  });

  it('should format sc and so query parameters when sort is provided', () => {
    const filters = {
      fuelIds: [],
      makeIds: [],
      cityId: null,
      budget: null,
    };
    const sort = { sc: 1, so: 1 };
    expect(buildCarsQuery(filters, sort)).toBe('sc=1&so=1');
  });

  it('should combine filter parameters and sort sc and so parameters correctly', () => {
    const filters = {
      fuelIds: [1],
      makeIds: [10],
      cityId: 3,
      budget: { min: 1, max: 5 },
    };
    const sort = { sc: 3, so: 0 };
    expect(buildCarsQuery(filters, sort)).toBe('fuel=1&car=10&city=3&budget=1-5&sc=3&so=0');
  });

  it('should omit sc and so parameters when sort is null (Best Match)', () => {
    const filters = {
      fuelIds: [1],
      makeIds: [],
      cityId: null,
      budget: null,
    };
    expect(buildCarsQuery(filters, null)).toBe('fuel=1');
  });
});
