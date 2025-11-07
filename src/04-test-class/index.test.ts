import { random } from 'lodash';
import { getBankAccount, SynchronizationFailedError } from '.';

jest.mock('lodash', () => ({
  random: jest.fn(),
}));

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const balance = 1000;
    const account = getBankAccount(balance);
    expect(account.getBalance()).toBe(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const balance = 1000;
    const account = getBankAccount(balance);
    expect(() => account.withdraw(balance * 2)).toThrow(
      `Insufficient funds: cannot withdraw more than ${balance}`,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const balance = 1000;
    const account = getBankAccount(balance);
    expect(() => account.transfer(balance * 2, account)).toThrow(
      'Transfer failed',
    );
  });

  test('should throw error when transferring to the same account', () => {
    const balance = 1000;
    const account = getBankAccount(balance);
    expect(() => account.transfer(account.getBalance(), account)).toThrow(
      'Transfer failed',
    );
  });

  test('should deposit money', () => {
    const balance = 1000;
    const deposit = 100;
    const account = getBankAccount(balance);
    account.deposit(deposit);
    expect(account.getBalance()).toBe(balance + deposit);
  });

  test('should withdraw money', () => {
    const balance = 1000;
    const withdraw = 100;
    const account = getBankAccount(balance);
    account.withdraw(withdraw);
    expect(account.getBalance()).toBe(balance - withdraw);
  });

  test('should transfer money', () => {
    const transfer = 100;
    const balance = 1000;
    const balanceTwo = 1000;
    const account = getBankAccount(balance);
    const accountTwo = getBankAccount(balanceTwo);
    account.transfer(transfer, accountTwo);
    expect({
      account: account.getBalance(),
      accountTwo: accountTwo.getBalance(),
    }).toEqual({
      account: balance - transfer,
      accountTwo: balanceTwo + transfer,
    });
  });

  test('fetchBalance should return number in case request did not fail', async () => {
    const account = getBankAccount(1000);

    (random as jest.Mock).mockReturnValueOnce(99).mockReturnValueOnce(1);

    const fetchedBalance = await account.fetchBalance();

    expect(typeof fetchedBalance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const balance = 1000;
    const account = getBankAccount(balance);

    (random as jest.Mock).mockReturnValueOnce(balance).mockReturnValueOnce(1);

    const fetchedBalance = await account.fetchBalance();

    expect(fetchedBalance).toBe(balance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const balance = 1000;
    const account = getBankAccount(balance);

    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(null);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
