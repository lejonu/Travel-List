import { useState } from "react";

function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems(items => [...items, item]);
  }

  function handleDeleteItem(id) {
    // console.log(id);
    setItems(items => items.filter(item => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, packed: !item.packed }
          : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 🛍 </h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  // const [items, setItems] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now()
    };

    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form
      className="add-form"
      onSubmit={e => handleSubmit(e)}
    >
      <h3>What do you need for you 👓 </h3>

      <select
        name="quantity"
        value={quantity}
        onChange={e => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map(
          num => (
            <option value={num} key={num}>
              {num}
            </option>
          )
        )}
      </select>

      <input
        name="item"
        type="text"
        placeholder="Item..."
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({
  items,
  onDeleteItem,
  onToggleItem
}) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) =>
        a.description.localeCompare(b.description)
      );

  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map(item => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select
          name=""
          id=""
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
        >
          <option value="input">Sort by input order</option>
          <option value="description">
            Sort by description
          </option>
          <option value="packed">
            Sort by packed status
          </option>
        </select>
      </div>
    </div>
  );
}

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

export default App;
