import BN from "bignumber.js";
import { DEFAULT_DECIMALS } from "~/env";

export function toBaseUnit(value: BN, decimals = DEFAULT_DECIMALS): string {
  const decimalsBase = new BN(10).pow(decimals);
  return new BN(value).times(decimalsBase).toFixed(0);
}
