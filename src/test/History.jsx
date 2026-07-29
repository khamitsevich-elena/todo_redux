function History({ history }) {
  return (
    <ul>
      {history.map((i) => {
        <li key={i.id}>{i.value}</li>;
      })}
    </ul>
  );
}

export default History;
