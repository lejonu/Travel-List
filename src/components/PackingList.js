import { useState } from "react";
import Item from "./Item";

function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
  onDeleteItems
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
        {sortedItems.length
          ? sortedItems.map(item => (
              <Item
                item={item}
                key={item.id}
                onDeleteItem={onDeleteItem}
                onToggleItem={onToggleItem}
              />
            ))
          : null}
      </ul>
      <div className="actions">
        <select
          name="packingList"
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
        <button onClick={onDeleteItems}>Clear List</button>
      </div>
    </div>
  );
}

export default PackingList;
