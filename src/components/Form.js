import { useState } from "react";

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

export default Form;
