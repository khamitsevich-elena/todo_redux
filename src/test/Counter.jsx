function Counter({ count, setCount, setHistory }) {
  const increase = () => {
    setCount((count) => ++count);
    setCount((count) => ++count);
    setCount((count) => ++count);
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);

    setHistory((history) => [
      ...history,
      { id: crypto.randomUUID(), value: count },
    ]);
  };
  const reset = () => {
    setCount(0);
    setHistory((history) => [
      ...history,
      { id: crypto.randomUUID(), value: count },
    ]);
  };

  return (
    <>
      {count}
      <button onClick={increase}>+1</button>
      <button onClick={reset}>Reset</button>
    </>
  );
}

export default Counter;
