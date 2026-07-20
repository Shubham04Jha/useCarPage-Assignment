import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getCars } from '../../src/api/carsApi';
import { apiEndpoints } from '../../src/api/apiConfig';

describe('getCars', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  it('should fetch with nextPageUrl if provided', async () => {
    const mockData = { stocks: [], nextPageUrl: null, totalCount: 0 };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const result = await getCars({}, 'https://example.com/next');
    expect(fetch).toHaveBeenCalledWith('https://example.com/next');
    expect(result).toEqual(mockData);
  });

  it('should fetch with filters query params when nextPageUrl is not provided', async () => {
    const mockData = { stocks: [], nextPageUrl: null, totalCount: 0 };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const filters = { fuelIds: [1], makeIds: [2], cityId: 3, budget: { min: 1, max: 5 } };
    const result = await getCars(filters);
    expect(fetch).toHaveBeenCalledWith(`${apiEndpoints.stocks}?fuel=1&car=2&city=3&budget=1-5`);
    expect(result).toEqual(mockData);
  });

  it('should fetch without query params if filters are empty', async () => {
    const mockData = { stocks: [], nextPageUrl: null, totalCount: 0 };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const filters = { fuelIds: [], makeIds: [], cityId: null, budget: null };
    const result = await getCars(filters);
    expect(fetch).toHaveBeenCalledWith(apiEndpoints.stocks);
    expect(result).toEqual(mockData);
  });

  it('should fetch with filters and sort query params (sc and so)', async () => {
    const mockData = { stocks: [], nextPageUrl: null, totalCount: 0 };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const filters = { fuelIds: [1], makeIds: [], cityId: null, budget: null };
    const sort = { sc: 1, so: 1 };
    const result = await getCars(filters, null, sort);
    expect(fetch).toHaveBeenCalledWith(`${apiEndpoints.stocks}?fuel=1&sc=1&so=1`);
    expect(result).toEqual(mockData);
  });

  it('should throw an error if the response is not ok', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    const filters = { fuelIds: [], makeIds: [], cityId: null, budget: null };
    await expect(getCars(filters)).rejects.toThrow('Failed to fetch cars');
  });
});
