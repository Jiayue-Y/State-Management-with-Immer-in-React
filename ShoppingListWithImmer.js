'use client'

import { useImmer } from "use-immer";
import React from 'react';

const ShoppingList = () => {
  const [shoppingList, updateShoppingList] = useImmer([
    {
      id: 1,
      name: 'Milk',
      quantity: 2,
      details: { category: 'Dairy', notes: 'Whole milk' },
    },
  ]);

  
  const addItem = () => {
    const newItem = {
      id: shoppingList.length + 1,
      name: 'Eggs',
      quantity: 12,
      details: { category: 'Dairy', notes: 'Free-range' },
    };
    updateShoppingList(draft => {
      draft.push(newItem);
    });
  };

  // Update item function
  const updateItem = (id, updatedProperties) => {
    updateShoppingList(draft => {
      const item = draft.find(item => item.id === id);
      if (item) {
        Object.assign(item, updatedProperties);
      }
    });
  };

  // Remove item function
  const removeItem = (id) => {
    updateShoppingList(draft => {
      const index = draft.findIndex(item => item.id === id);
      if (index !== -1) {
        draft.splice(index, 1);
      }
    });
  };

  return (
    <div>
      <h1>Shopping List</h1>
      <ul>
        {shoppingList.map(item => (
          <li key={item.id}>
            <div>
              <strong>{item.name}</strong>
              <p>Quantity: {item.quantity}</p>
              <p>Category: {item.details.category}</p>
              <p>Notes: {item.details.notes}</p>
            </div>
            <button onClick={() => updateItem(item.id, { quantity: item.quantity + 1 })}>Increase Quantity</button>
            <button onClick={() => removeItem(item.id)}>Remove Item</button>
          </li>
        ))}
      </ul>
      <button onClick={addItem}>Add New Item</button>
    </div>
  );
};

export default ShoppingList;
