function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        name="item"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span
        style={
          item.packed
            ? { textDecoration: "line-through" }
            : {}
        }
      >
        {item.quantity} {item.description}
        <button onClick={e => onDeleteItem(item.id)}>
          ❌
        </button>
      </span>
    </li>
  );
}

export default Item;
