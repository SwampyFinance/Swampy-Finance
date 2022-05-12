import BigNumber from "bignumber.js";

export const getBalanceNumber = (balance, decimals = 18) => {
  const displayBalance = new BigNumber(balance).dividedBy(
    new BigNumber(10).pow(decimals)
  );
  return displayBalance.toNumber();
};

export const getBeans = (balance, decimals = 9) => {
  return balance.dividedBy(new BigNumber(10).pow(decimals)).toFixed(7);
};

export const getFullDisplayBalance = (balance, decimals = 18) => {
  return balance.dividedBy(new BigNumber(10).pow(decimals)).toFixed();
};

export const getFullDisplayBalanceFixed = (
  balance,
  decimals = 18,
  fixed = 0
) => {
  return balance.dividedBy(new BigNumber(10).pow(decimals)).toFixed(fixed);
};
