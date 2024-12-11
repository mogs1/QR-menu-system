import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';

function Menu() {
  const [menu, setMenu] = useState([]);
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchMenu = async () => {
    const res = await axios.get('http://localhost:5000/menu');
    setMenu(res.data);
  };

  const addItem = (item) => {
    setOrder([...order, item]);
    setTotal(total + item.price);
  };

  const placeOrder = async () => {
    if (order.length > 0) {
      await axios.post('http://localhost:5000/order', {
        items: order,
        totalAmount: total,
      });
      alert('Order placed successfully!');
      setOrder([]);
      setTotal(0);
    } else {
      alert('Please add items to your order');
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <div className="container">
      <h1>Menu</h1>
      <ul>
        {menu.map((item) => (
          <li key={item._id}>
            <span className="menu-item">{item.name}</span>
            <span className="price">${item.price}</span>
            <button onClick={() => addItem(item)}>Add</button>
          </li>
        ))}
      </ul>

      <div className="order-summary">
        <h2>Your Order</h2>
        <ul>
          {order.map((item, idx) => (
            <li key={idx}>
              <span className="menu-item">{item.name}</span>
              <span className="price">${item.price}</span>
            </li>
          ))}
        </ul>
        <h3>Total: ${total}</h3>
        <button onClick={placeOrder}>Place Order</button>
      </div>
    </div>
  );
}

export default Menu;
