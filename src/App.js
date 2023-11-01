const initialItems = [
  {
    id: 1,
    description: "Passports",
    quantity: 2,
    packed: false
  },
  {
    id: 2,
    description: "Socks",
    quantity: 12,
    packed: true
  },
  {
    id: 3,
    description: "Charger",
    quantity: 1,
    packed: false
  }
];

function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 🛍 </h1>;
}

function Form() {
  return (
    <div className="add-form">
      <h3>What do you need for you 👓 </h3>
    </div>
  );
}

function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map(item => (
          <Item item={item} />
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
        <button>❌ </button>
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
