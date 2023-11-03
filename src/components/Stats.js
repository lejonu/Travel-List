function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>
          Start adding some items to your packing list 🚀{" "}
        </em>
      </p>
    );

  const numItems = items.length;
  const numPacked = items.filter(
    item => item.packed
  ).length;
  const percentage = parseFloat(
    ((numPacked / numItems) * 100).toFixed(2)
  );

  return (
    <footer className="stats">
      {percentage === 100 ? (
        <em>You got everything! Ready to go 🛫 </em>
      ) : (
        <em>
          🛍 You have {numItems} items on your list, and you
          already packed {numPacked} ({percentage}%)
        </em>
      )}
    </footer>
  );
}

export default Stats;
