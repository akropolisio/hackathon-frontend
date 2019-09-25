import "reflect-metadata";
import Web3 from "web3";
import * as React from "react";
import { render } from "react-dom";
import { MuiThemeProvider, createMuiTheme, CssBaseline } from '@material-ui/core';

import { Api } from "~/api";
import { Store } from "~/store";

import App from '~components/App';
import { StoreContext, ApiContext } from "~/components/context";
import { ErrorBoundary } from "~/components/ErrorBoundary";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#6931b6',
    },
  },
});

function Root() {
  // Detect if Web3 is found, if not, ask the user to install Metamask
  if (window.web3) {
    const web3 = new Web3(window.web3.currentProvider);
    const api = new Api(web3);
    const store = new Store(api);

    return (
      <ErrorBoundary>
        <MuiThemeProvider theme={theme}>
          <StoreContext.Provider value={store}>
            <ApiContext.Provider value={api}>
              <CssBaseline />
              <App />
            </ApiContext.Provider>
          </StoreContext.Provider>
        </MuiThemeProvider>
      </ErrorBoundary>
    );
  } else {
    return <div>You need to install Metamask</div>;
  }
}

const rootElement = document.getElementById("root");
render(<Root />, rootElement);
