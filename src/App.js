import React from 'react';
import Web3 from 'web3';
import abi from './abi.json';
import './App.css';

function App() {

  const [symbol, setSymbol] = React.useState('');
  const [userWalletAddr, setUserWalletAddress] = React.useState("");

  React.useEffect(() => {
    (async () => {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const userWalletAddr = accounts[0];
      setUserWalletAddress(userWalletAddr);
    })();
  }, []);

  const handleConnect = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log(accounts);
  }


  const claimAirdrop = async () => {

    // todo: make request to backend with user wallet address

    // your backend code should look like this:
    /**
     * Your backend code should look like this
     */
    const _contactAddr = "0x96429570433Ba609069664df731CCb9bb2752220";
    // address of the contract owner
    const _contractOwner = "0x44Dae58a2AF8d222D8b99a0bC3F258D8685D8B81";
    const _provider = new Web3.providers.HttpProvider(
      "https://bsc-dataseed1.binance.org:443"
    );
    const _web3 = new Web3(_provider);
    const _contract = new _web3.eth.Contract(abi, _contactAddr, {
      from: _contractOwner,
    });

    // this should be done on the backend and the contract owerner should be the signer
    _contract.methods
      .transfer(userWalletAddr, 20)
      .send({ from: _contractOwner }, function (error, result) {
        console.log(error, "--transfer error--");
        console.log(result, "--transfer result--");
      });


      // more examples
    _contract.methods
      .owner()
      .call({ from: userWalletAddr }, function (error, result) {
        console.log(error, "--error--");
        console.log(result, "--result--");
      });

    _contract.methods
      .symbol()
      .call({ from: userWalletAddr }, function (error, result) {
        console.log(result, "--symbol result--");
      });
  }

  return (
    <div className="App">
      <h5>{symbol}</h5>
      <h5>{userWalletAddr}</h5>

      <button className="" onClick={handleConnect}>
        Connect to metamask
      </button>
      <button className="" onClick={claimAirdrop}>
        Claim Airdrop
      </button>
    </div>
  );
}

export default App;
