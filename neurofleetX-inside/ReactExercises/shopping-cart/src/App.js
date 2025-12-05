import React, { useState } from "react";
import "./App.css";

const products = [
  { id: 1, name: "T-Shirt", price: 20 },
  { id: 2, name: "Jeans", price: 40 },
  { id: 3, name: "Shoes", price: 60 },
];

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (p) => {
    setCart([...cart, p]);
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="shop">
      <h1>🛍️ Shopping Cart</h1>
      <div className="container">
        <div className="products">
          <h2>Products</h2>
          {products.map((p) => (
            <div key={p.id} className="card">
              <p>{p.name}</p>
              <p>₹{p.price}</p>
              <button onClick={() => addToCart(p)}>Add to Cart</button>
            </div>
          ))}
        </div>

        <div className="cart">
          <h2>Your Cart</h2>
          {cart.length === 0 && <p>No items in cart.</p>}
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <span>{item.name}</span>
              <span>₹{item.price}</span>
              <button onClick={() => removeItem(item.id)}>❌</button>
            </div>
          ))}
          <h3>Total: ₹{total}</h3>
        </div>
      </div>
    </div>
  );
}

export default App;
