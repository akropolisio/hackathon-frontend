import Web3 from "web3";
import Contract from "web3/eth/contract";
import { Observable, interval, of, from, fromEventPattern } from "rxjs";
import BN from "bn.js";
import { switchMap, skipWhile } from 'rxjs/operators';
import { ApiRx } from '@polkadot/api';
import { web3Enable, web3AccountsSubscribe } from '@polkadot/extension-dapp';

import { ETH_NETWORK_CONFIG } from "~/env";
import c2fcAbi from "~/abis/c2fc.json";
import erc20Abi from "~/abis/erc20.json";
import { getContractData$ } from "~/util/getContractData$";
import { callPolkaApi } from './callPolkaApi';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';

export class Api {
  private _dai: Contract;
  private _c2fc: Contract;

  constructor(private _web3: Web3, private _substrateApi: Observable<ApiRx>) {
    this._dai = new this._web3.eth.Contract(
      erc20Abi,
      ETH_NETWORK_CONFIG.contracts.dai
    );
    this._c2fc = new this._web3.eth.Contract(
      c2fcAbi,
      ETH_NETWORK_CONFIG.contracts.c2fc
    );
  }

  public getEthBalance$(_address: string): Observable<BN> {
    const address = _address.toLowerCase();

    return getContractData$<BN>(this._dai, "balanceOf", {
      args: [address],
      eventsForReload: [
        ["Transfer", { filter: { _from: address } }],
        ["Transfer", { filter: { _to: address } }]
      ],
      convert: value => new BN(value),
    });
  }

  public getSubstrateBalance$(_address: string): Observable<BN> {
    return of(new BN(0));
    // return callPolkaApi(this._substrateApi, 'query.token.balance_of', _address);
  }

  public getEthAccount$(): Observable<string | null> {
    return from(getEthAccount(this._web3)).pipe(
      skipWhile(account => !account),
      switchMap(() => interval(1000).pipe(
        switchMap(() => getEthAccount(this._web3)),
      )),
    );
  }

  public getSubstrateAccounts$(): Observable<InjectedAccountWithMeta[]> {
    return from(web3Enable('Akropolis Network Dapp')).pipe(
      switchMap(() => fromEventPattern<InjectedAccountWithMeta[]>(
        emitter => web3AccountsSubscribe(emitter),
        (_, signal: ReturnType<typeof web3AccountsSubscribe>) => signal.then(unsubscribe => unsubscribe()),
      ))
    );
  }
}

async function getEthAccount(web3: Web3): Promise<string | null> {
  // Modern dapp browsers...
  if (window.ethereum) {
    try {
      // Request account access
      await window.ethereum.enable();
    } catch (error) {
      console.error('User denied account access');
      throw error;
    }
  }

  const accounts = await web3.eth.getAccounts();
  return accounts[0] || null;
}
