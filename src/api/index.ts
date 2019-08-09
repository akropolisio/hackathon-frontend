import Web3 from "web3";
import Contract from "web3/eth/contract";
import { Observable } from "rxjs";
import BN from "bignumber.js";

import { NETWORK_CONFIG } from "~/env";
import c2fcAbi from "~/abis/c2fc.json";
import erc20Abi from "~/abis/erc20.json";
import { fromBaseUnit } from "~/util/fromBaseUnit";
import { getContractData$ } from "~/util/getContractData$";

export class Api {
  private _dai: Contract;
  private _c2fc: Contract;

  constructor(private _web3: Web3) {
    this._dai = new this._web3.eth.Contract(
      erc20Abi,
      NETWORK_CONFIG.contracts.dai
    );
    this._c2fc = new this._web3.eth.Contract(
      c2fcAbi,
      NETWORK_CONFIG.contracts.c2fc
    );
  }

  public getBalance$(_address: string): Observable<BN> {
    const address = _address.toLowerCase();

    return getContractData$<BN>(this._dai, "balanceOf", {
      args: [address],
      eventsForReload: [
        ["Transfer", { filter: { _from: address } }],
        ["Transfer", { filter: { _to: address } }]
      ],
      convert: fromBaseUnit
    });
  }
}
