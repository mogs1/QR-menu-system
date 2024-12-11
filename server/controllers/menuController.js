// Import the MenuItem model
const MenuItem = require('../models/MenuItem');

// Get All Menu Items
const getMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu items', error });
  }
};

// Add a New Menu Item
const addMenuItem = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    if (!name || !price) {
      return res.status(400).json({ message: 'Name and price are required' });
    }

    const newMenuItem = new MenuItem({
      name,
      description,
      price,
    });

    const savedMenuItem = await newMenuItem.save();
    res.status(201).json(savedMenuItem);
  } catch (error) {
    res.status(500).json({ message: 'Error adding menu item', error });
  }
};

// Delete a Menu Item
const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMenuItem = await MenuItem.findByIdAndDelete(id);

    if (!deletedMenuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.status(200).json({ message: 'Menu item deleted successfully', deletedMenuItem });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting menu item', error });
  }
};

module.exports = {
  getMenuItems,
  addMenuItem,
  deleteMenuItem,
};
