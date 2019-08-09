import { Balance } from "./Balance";
import { Api } from "~/api";

export class Store {
  public balance: Balance;

  constructor(private _api: Api) {
    this.balance = new Balance(this._api);
  }
}
