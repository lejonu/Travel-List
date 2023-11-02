import { useState } from "react";

// const initialItems = [
//   {
//     id: 1,
//     description: "Passports",
//     quantity: 2,
//     packed: false
//   },
//   {
//     id: 2,
//     description: "Socks",
//     quantity: 12,
//     packed: true
//   },
//   {
//     id: 3,
//     description: "Charger",
//     quantity: 1,
//     packed: false
//   }
// ];

function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems(items => [...items, item]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} />
      <Stats />
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

    // console.log(newItem);
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
        name={quantity}
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

function PackingList({ items }) {
  return (
    <div className="list">
      <ul>
        {items.map(item => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span
        style={
          item.packed
            ? { textDecoration: "line-through" }
            : {}
        }
      >
        {item.quantity} {item.description}
        <button>❌</button>
      </span>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>
        🛍 You have X items on your list, and you already
        packed x (x%)
      </em>
    </footer>
  );
}

export default App;
