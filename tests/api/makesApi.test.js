import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getMakes } from '../../src/api/makesApi';
import { apiEndpoints } from '../../src/api/apiConfig';

describe('getMakes', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  it('should fetch makes and return data', async () => {
    const mockData = [{ id: 1, name: 'Maruti Suzuki' }];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const result = await getMakes();
    expect(fetch).toHaveBeenCalledWith(apiEndpoints.makes);
    expect(result).toEqual(mockData);
  });

  it('should throw an error if the response is not ok', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    await expect(getMakes()).rejects.toThrow('Failed to fetch makes');
  });
});
