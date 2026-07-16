import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getCities } from '../../src/api/citiesApi';
import { apiEndpoints } from '../../src/api/apiConfig';

describe('getCities', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  it('should fetch cities and return data', async () => {
    const mockData = [{ id: 1, name: 'Mumbai' }];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const result = await getCities();
    expect(fetch).toHaveBeenCalledWith(apiEndpoints.cities);
    expect(result).toEqual(mockData);
  });

  it('should throw an error if the response is not ok', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    await expect(getCities()).rejects.toThrow('Failed to fetch cities');
  });
});
