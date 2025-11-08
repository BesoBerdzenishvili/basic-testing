import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const input = ['a', 'b', 'c'];

    const result = generateLinkedList(input);

    const expected = {
      value: 'a',
      next: {
        value: 'b',
        next: {
          value: 'c',
          next: { value: null, next: null },
        },
      },
    };

    expect(result).toStrictEqual(expected);
  });

  test('should generate linked list from values 2', () => {
    const input = [1, 2, 3, 4];

    const result = generateLinkedList(input);

    expect(result).toMatchSnapshot();
  });
});
