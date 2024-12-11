import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import BlockData from "./lib/BlockData";
import BlockTransaction from "./lib/BlockTransaction";
import Navebar from "./components/Navebar";
import SearchInput from "./components/SearchInput";
import "./App.css";
import InfoTab from "./components/InfoTab";
import BlockTran from "./components/BlockTran";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState(null);
  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    getBlockNumber();
  }, []);
  if (!blockNumber) {
    return (
      <>
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      </>
    );
  }
  return (
    <section className="bg-gradient-to-r from-cyan-500 to-blue-500 min-h-screen">
      {/* navegation bar */}
      <Navebar/>
      {/* search field */}
      <SearchInput alchemy={alchemy}/>
      {/* some info tab with latest block number of tansactions gase price */}
      <InfoTab alchemy={alchemy}/>
      {/* grid col 2 latest blocks, latest transactions */}
      <br />
      <BlockTran alchemy={alchemy}/>
      {/* block Info
      <BlockData blockNumber={blockNumber} alchemy={alchemy} /> */}
      {/* block transactions data */}
      {/* <BlockTransaction blockNumber={blockNumber} alchemy={alchemy} /> */}
    </section>
  );
}

export default App;
