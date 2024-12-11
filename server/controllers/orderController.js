const Order = require('../models/Order');

// Place an Order
exports.placeOrder = async (req, res) => {
  const { items, totalAmount } = req.body;

  
  // Validate that items and totalAmount are provided
  if (!items || !totalAmount) {
    return res.status(400).json({ message: 'Items and total amount are required.' });
  }

  try {
    const order = new Order({ items, totalAmount });
    const savedOrder = await order.save(); // Save the order to the database
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ error: 'Failed to place order' });
  }
};

// Get All Orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};
