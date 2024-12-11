import { useState, useEffect } from "react";
import { Utils } from "alchemy-sdk";
function InfoTab({ alchemy }) {
  const [currentBlock, setCurrentBlock] = useState(null);
  const [gas, setGas] = useState(null);
  const [blockTransactions, setBlockTransactions] = useState(null);
  const [safeBlock, setSafeBlock] = useState(null);
  useEffect(() => {
    async function getInfo() {
      setCurrentBlock(await alchemy.core.getBlockNumber());
      setGas(await alchemy.core.getGasPrice());
      setSafeBlock(await alchemy.core.getBlock("safe"));
    }
    getInfo();
  }, []);
  //to solve multi rerender
  useEffect(() => {
    async function getBlock() {
      setBlockTransactions(await alchemy.core.getBlock(currentBlock));
    }
    getBlock();
  },[currentBlock])
  // Loader
  if (!currentBlock || !gas || !blockTransactions || !safeBlock) {
    return (
      <section className="bg-white min-h-32  max-w-screen-xl mx-auto rounded-xl mt-[-1rem] shadow-lg grid grid-cols-2  items-center divide-x-2">
        <div className="text-center">...</div>
        <div className="text-center">...</div>
        <div className="text-center">...</div>
        <div className="text-center">...</div>
      </section>
    );
  }
  return (
    <section className="bg-white min-h-32  max-w-screen-xl mx-auto rounded-xl mt-[-1rem] shadow-lg grid grid-cols-2  items-center divide-x-2">
      <div className="text-center text-gray-700">
       Block<span className="bg-clip-text bg-gradient-to-tl from-blue-500 to-violet-500 text-transparent">: {currentBlock}</span> 
      </div>
      <div className="text-center  text-gray-700">
        ⛽ Gas<span className="bg-clip-text bg-gradient-to-tl from-blue-500 to-violet-500 text-transparent">: {Utils.formatUnits(gas._hex, "gwei")} Gwei</span>
      </div>
      <div className="text-center  text-gray-700">
        Current Block Transactions<span className="bg-clip-text bg-gradient-to-tl from-blue-500 to-violet-500 text-transparent">: {blockTransactions.transactions.length}</span>
      </div>
      <div className="text-center  text-gray-700">Safe Block<span className="bg-clip-text bg-gradient-to-tl from-blue-500 to-violet-500 text-transparent">: {safeBlock.number}</span> </div>
    </section>
  );
}
export default InfoTab;
