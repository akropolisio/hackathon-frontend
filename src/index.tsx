import "reflect-metadata";
import Web3 from "web3";
import * as React from "react";
import { render } from "react-dom";

import { Api } from "~/api";
import { Store } from "~/store";
import { StoreContext } from "~/components/context";
import { Balance } from "~/components/Balance";
import { ErrorBoundary } from "~/components/ErrorBoundary";

import "./styles.css";

function App() {
  // Detect if Web3 is found, if not, ask the user to install Metamask
  if (window.web3) {
    const web3 = new Web3(window.web3.currentProvider);
    const api = new Api(web3);
    const store = new Store(api);

    return (
      <ErrorBoundary>
        <StoreContext.Provider value={store}>
          <div>Initialized</div>
          <pre>
            <Balance address="0x5D507818B52A891fe296463adC01EeD9C51e218b" />
          </pre>
          <pre>
            <Balance address="0xC21367e98bb94A5FbA946b2af345339Dfb2F024F" />
          </pre>
        </StoreContext.Provider>
      </ErrorBoundary>
    );
  } else {
    return <div>You need to install Metamask</div>;
  }
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
