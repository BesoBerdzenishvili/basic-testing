import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

describe('throttledGetDataFromApi', () => {
  const mockGet = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (axios.create as jest.Mock).mockReturnValue({
      get: mockGet,
    });
  });

  test('should create instance with provided base URL', async () => {
    mockGet.mockResolvedValueOnce({ data: { id: 1 } });
    await throttledGetDataFromApi('/posts/1');

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided URL', async () => {
    mockGet.mockResolvedValueOnce({ data: { id: 2 } });
    await throttledGetDataFromApi('/posts/2');

    expect(mockGet).toHaveBeenCalledWith('/posts/2');
  });

  test('should return response data', async () => {
    const mockData = { title: 'Hello' };
    mockGet.mockResolvedValueOnce({ data: mockData });

    const result = await throttledGetDataFromApi('/posts/3');

    expect(result).toEqual(mockData);
  });
});
