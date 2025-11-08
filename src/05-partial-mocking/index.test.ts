import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const spyOnLog = jest.spyOn(console, 'log').mockImplementation(() => {});
    mockOne(), mockTwo(), mockThree();
    expect(spyOnLog).not.toHaveBeenCalled();
    spyOnLog.mockRestore();
  });

  test('unmockedFunction should log into console', () => {
    const spyOnLog = jest.spyOn(console, 'log');
    unmockedFunction();
    expect(spyOnLog).toHaveBeenCalledWith('I am not mocked');
    spyOnLog.mockRestore();
  });
});
