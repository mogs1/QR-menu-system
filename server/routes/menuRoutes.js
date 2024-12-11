const express = require('express');
const { getMenuItems, addMenuItem, deleteMenuItem } = require('../controllers/menuController');

const router = express.Router();

// Get all menu items
router.get('/', getMenuItems);

// Add a menu item
router.post('/', addMenuItem);

// Delete a menu item
router.delete('/:id', deleteMenuItem);

module.exports = router;
