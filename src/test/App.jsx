import Counter from "./Counter";
import History from "./History";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([]);
  useEffect(() => console.log(`Count изменнен ${count}`), [count]);
  useEffect(() => {
    return () => {
      console.log("компонент был удален!");
    };
  }, []);
  return (
    <>
      <Counter count={count} setCount={setCount} setHistory={setHistory} />
      <History history={history} />
    </>
  );
}

export default App;
