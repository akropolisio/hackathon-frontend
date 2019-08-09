import BN from "bignumber.js";
import { DEFAULT_DECIMALS } from "~/env";

export function fromBaseUnit(
  value: string | number,
  decimals = DEFAULT_DECIMALS
): BN {
  const decimalsBase = new BN(10).pow(decimals);
  return new BN(value).div(decimalsBase);
}
