import { useEffect,useState } from "react";
import '../App.css';
function BlockData({ blockNumber, alchemy }) {
  const [blockData, setBlockData] = useState("");
  useEffect(() => {
    async function getBlock() {
      setBlockData(await alchemy.core.getBlock(blockNumber));
    }
    getBlock();
  },[]);
  return (<section>
    <div className="App">Block data</div>
    <div><span>Hash : </span> {JSON.stringify(blockData.hash)}</div>
  </section>)
}
export default BlockData;
