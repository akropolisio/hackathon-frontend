import React, { useEffect } from "react";
import { useObserver } from "mobx-react-lite";

import { useStore } from "../context";

interface IProps {
  address: string;
}

export function Balance({ address }: IProps) {
  const store = useStore();
  const balance = useObserver(() => store.balance.balanceOf.get(address));

  useEffect(() => {
    if (!balance) {
      store.balance.loadBalance(address);
    }
  }, []);

  return useObserver(() =>
    balance && balance.current ? (
      <span>
        Balance for {address} is {balance.current.toFixed(4)} DAI
      </span>
    ) : (
      <span>Loading ...</span>
    )
  );
}
