import { useEffect, useState } from "react";
import { Utils } from "alchemy-sdk";

function BlockTran({ alchemy }) {
  const [block, setBlock] = useState(null);
  const [blockTransaction, setBlockTransaction] = useState(null);
  useEffect(() => {
    let latestBlockNumber;
    async function getBlockWithTransactions() {
      let transactions = await alchemy.core.getBlockWithTransactions(
        latestBlockNumber
      );
      console.log(transactions.transactions.slice(0, 5));
      setBlockTransaction(transactions.transactions.slice(0, 5));
    }
    async function getBlock() {
      try {
        latestBlockNumber = await alchemy.core.getBlockNumber();
        const blockPromises = [];
        for (let i = 0; i < 5; i++) {
          blockPromises.push(alchemy.core.getBlock(latestBlockNumber - i));
        }
        const latestBlocks = await Promise.all(blockPromises);
        setBlock(latestBlocks);
      } catch (e) {
        console.log(e);
      }
    }
    getBlock();
    getBlockWithTransactions();
  }, [0]);
  if (!block || !blockTransaction) {
    return <>Loading...</>;
  }
  return (
    <section className="grid grid-cols-2 max-w-7xl mx-auto gap-4">
      {console.log(block)}
      <div className="grid grid-cols-1 border-2 border-gray-600 pl-4">
        <div>Latest Blocks</div>
        {block &&
          block.map((blockData, index) => {
            return (
              <div key={index} className="grid grid-cols-3 border-y-2 border-gray-400 ">
                <div>{blockData.number}</div>
                <div>
                  {Utils.formatUnits(blockData.gasUsed._hex, "gwei").slice(
                    0,
                    7
                  ) + " Gwei"}
                </div>
                <div>
                  {Math.floor(Date.now() / 1000) - blockData.timestamp} s ago
                </div>
              </div>
            );
          })}
      </div>

      <div className="grid grid-cols-1 border-2 border-gray-600 pl-4">
        <div>Latest Transactions</div>
        {blockTransaction &&
          blockTransaction.map((transaction, index) => {
            return (
              <div key={index} className="grid grid-cols-3 border-y-2 border-gray-400">
                <div>{transaction.hash.slice(0, 10) + "..."}</div>
                <div>
                  {"from: " + transaction.from.slice(0, 10) + "..."}
                  <br />
                  {"to: " + transaction.to.slice(0, 10) + "..."}
                </div>
                <div className="">
                  {Utils.formatUnits(transaction.value._hex, "ether").slice(
                    0,
                    7
                  ) + "eth"}
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
}
export default BlockTran;
