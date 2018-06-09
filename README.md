# EthereumPlaysPokemon.github.io

Reference frontend for interacting with the Ethereum Plays Pokemon smart contract.

## Running locally

Setup your Ethereum browser, install MetaMask in your web browser, or run a local node.
Configure its RPC provider appropriately.
For instance, for MetaMask + ganache, use a custom RPC provider of http://localhost:7545.

MetaMask can't inject web3 into a file served over the `file://` protocol, so you'll need to run a web server.
The easiest option is to install the `http-server` `npm` package and start it in this directory as follows:

```bash
npm install -g http-server
http-server
```

Then open your browser and navigate to http://localhost:8080

