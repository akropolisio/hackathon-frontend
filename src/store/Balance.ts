import BN from "bignumber.js";
import { observable } from "mobx";
import { fromStream, IStreamListener } from "mobx-utils";
import { Api } from "~/api";

export class Balance {
  constructor(private _api: Api) {}

  public balanceOf = observable.map<string, IStreamListener<BN | null>>(
    {},
    { deep: false }
  );

  public loadBalance(address: string) {
    this.balanceOf.set(
      address,
      fromStream<BN | null>(this._api.getBalance$(address), null)
    );
  }
}
