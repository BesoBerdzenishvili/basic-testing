import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 4, b: 2, action: Action.Add, expected: 6 },
  { a: 5, b: 2, action: Action.Add, expected: 7 },
  { a: 6, b: 2, action: Action.Add, expected: 8 },
];

describe.each(testCases)('.add(%i, %i)', (param) => {
  test(`Should ${param.action} ${param.a} to ${param.b} and return ${param.expected}`, () => {
    expect(
      simpleCalculator({ a: param.a, b: param.b, action: param.action }),
    ).toBe(param.expected);
  });
});
