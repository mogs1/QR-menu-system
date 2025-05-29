import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';

function Admin() {
  const [menu, setMenu] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', description: '', price: '' });

  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const fetchMenu = async () => {
    const res = await axios.get(`${apiUrl}/menu`);
    if (res.data === 'No menu items found') {
      alert('No menu items found. Please add some items.');
      return;
    }
    setMenu(res.data);
  };

  const fetchOrders = async () => {
    const res = await axios.get(`${apiUrl}/order`);
    if (res.data === 'No orders found') {
      alert('No orders found.'); 
      return;
    }
    setOrders(res.data);
  };

  const addMenuItem = async () => {
    if (newItem.name && newItem.price) {
      await axios.post(`${apiUrl}/menu`, newItem);
      setNewItem({ name: '', description: '', price: '' });
      fetchMenu();
    } else {
      alert('Please provide a valid name and price');
    }
  };

  const deleteMenuItem = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      await axios.delete(`${apiUrl}/menu/${id}`);
      fetchMenu(); // Refresh the menu
    }
  };

  useEffect(() => {
    fetchMenu();
    fetchOrders();
  }, []);

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>

      <h2>Menu</h2>
      <ul>
        {menu?.map((item) => (
          <li key={item._id}>
            <span className="menu-item">{item.name}</span>
            <span className="price">${item.price}</span>
            <button onClick={() => deleteMenuItem(item._id)} style={{ backgroundColor: '#dc3545' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <h2>Add Menu Item</h2>
      <input
        placeholder="Name"
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
      />
      <input
        placeholder="Description"
        value={newItem.description}
        onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={newItem.price}
        onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
      />
      <button onClick={addMenuItem}>Add</button>

      <h2>Orders</h2>
      <ul>
        {orders?.map((order) => (
          <li key={order._id}>
            <span>Order #{order._id}</span>
            <span>Total: ${order.totalAmount.toFixed(2)}</span>
            <ul>
              {menu.map((item, index) => (
                <li key={index}>
                  {item.name} - ${item.price.toFixed(2)} (x{item.quantity})
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Admin;
