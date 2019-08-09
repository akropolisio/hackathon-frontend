interface INetworkConfig {
  id: number;
  name: string;
  rpcUrl: string;
  contracts: {
    c2fc: string;
    dai: string;
  };
}

const networkConfigs: Record<number, INetworkConfig> = {
  "42": {
    id: 42,
    name: "Kovan",
    rpcUrl: "https://kovan.infura.io/",
    contracts: {
      c2fc: "0x174B2918417f150Ca19eC5915fe090E543df2eeb",
      dai: "0xC4375B7De8af5a38a93548eb8453a498222C4fF2"
    }
  },
  "1": {
    id: 1,
    name: "Mainnet",
    rpcUrl: "https://mainnet.infura.io/",
    contracts: {
      c2fc: "0x174B2918417f150Ca19eC5915fe090E543df2eeb",
      dai: "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359"
    }
  }
};

export const NETWORK_ID = 42;
export const NETWORK_CONFIG = networkConfigs[NETWORK_ID];
export const DEFAULT_DECIMALS = 18;
