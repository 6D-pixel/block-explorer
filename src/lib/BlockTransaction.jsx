import { useEffect, useState } from "react";
const { Utils } = require("alchemy-sdk");
function BlockTransaction({ blockNumber, alchemy }) {
  const [blockTransaction, setBlockTransaction] = useState(null);
  useEffect(() => {
    async function getBlockWithTransactions() {
      setBlockTransaction(
        await alchemy.core.getBlockWithTransactions(blockNumber)
      );
    }
    getBlockWithTransactions();
  }, []);
  if (!blockTransaction) {
    return (
      <>
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      </>
    );
  }
  return (
    <section>
      {/* <div>
        blockTransaction: {JSON.stringify(blockTransaction.transactions)}
      </div> */}
      <DiaplyTransaction transaction={blockTransaction.transactions} />
    </section>
  );
}
function DiaplyTransaction({ transaction }) {
  return (
    <div>
      {console.log(transaction[0])}
      <table border="1">
        <thead>
          <tr>
            <th>Hash</th>
            <th>from</th>
            <th>to</th>
            <th>value</th>
            <th>gasPrice</th>
          </tr>
        </thead>
        <tbody>
        {transaction.map((tx) => (
            <tr>
              <td>{tx.hash}</td>
              <td>{tx.from}</td>
              <td>{tx.to}</td>
              <td>{Utils.formatUnits(tx.value._hex,"ether")+" ETH"}</td>
              <td>{Utils.formatUnits(tx.gasPrice._hex,"ether")+" ETH"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default BlockTransaction;
