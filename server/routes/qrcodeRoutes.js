const express = require('express');
const { getMenuItems, addMenuItem, deleteMenuItem, generateQRCode } = require('../controllers/qrcodeController');

const router = express.Router();

router.get('/qrcode', generateQRCode); // QR Code route

module.exports = router;
